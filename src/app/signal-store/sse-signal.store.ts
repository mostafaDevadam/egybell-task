import { inject, NgZone } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';

type SseState = {
  latestObject: any;
  historyArray: any[];
  objectStatus: 'loading' | 'connected' | 'error';
  arrayStatus: 'loading' | 'connected' | 'error';
};

const initialState: SseState = {
  latestObject: null,
  historyArray: [],
  objectStatus: 'loading',
  arrayStatus: 'loading',
};

export const MultiSseStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(() => ({
    _zone: inject(NgZone),
  })),
  withMethods((store) => {
    let objectSource: EventSource | null = null;
    let arraySource: EventSource | null = null;

    return {
      // Stream 1: Handles the Object
      connectToObjectStream(url: string) {
        if (objectSource) objectSource.close();
        objectSource = new EventSource(url);

        objectSource.onmessage = (event) => {
          // Re-entering the Angular Zone
          store._zone.run(() => {
            try {
              const data = JSON.parse(event.data);
              patchState(store, { 
                latestObject: data, 
                objectStatus: 'connected' 
              });
            } catch (e) {
              console.error('Object Parse Error', e);
            }
          });
        };

        objectSource.onerror = () => {
          store._zone.run(() => patchState(store, { objectStatus: 'error' }));
        };
      },

      // Stream 2: Handles the Array
      connectToArrayStream(url: string) {
        if (arraySource) arraySource.close();
        arraySource = new EventSource(url);

        arraySource.onmessage = (event) => {
          // Re-entering the Angular Zone
          store._zone.run(() => {
            try {
              const data = JSON.parse(event.data);
              patchState(store, { 
                historyArray: data, 
                arrayStatus: 'connected' 
              });
            } catch (e) {
              console.error('Array Parse Error', e);
            }
          });
        };

        arraySource.onerror = () => {
          store._zone.run(() => patchState(store, { arrayStatus: 'error' }));
        };
      },

      disconnectAll() {
        objectSource?.close();
        arraySource?.close();
        patchState(store, { objectStatus: 'loading', arrayStatus: 'loading' });
      }
    };
  })
);