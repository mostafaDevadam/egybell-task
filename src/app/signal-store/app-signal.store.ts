import { Injectable, signal, WritableSignal } from "@angular/core";
import { signalStore, withState, patchState, withMethods, signalState, } from '@ngrx/signals';



@Injectable({ providedIn: 'root' })
export class AppSGStore {
    readonly state = signal([])

    add(item: any) {
        this.state.update((oldState: any) => oldState.map((i: any) => i.id === item.id ? item : i))
    }

    delete(item: any) {
        this.state.update(oldState => oldState.filter((i: any) => i.id !== item.id))
    }

    update(item: any) {
        this.state.update((oldState: any) =>
            oldState.map((i: any) => i.id === item.id ? item : i))
    }


}

type ITEM = {
    name: string
    id: number
}
@Injectable({ providedIn: 'root' })
export class AppSignalStore {
    private readonly stateSignal: WritableSignal<{ items: ITEM[] }> = signal({ items: [] })
    readonly state = this.stateSignal.asReadonly()
    readonly mState = signalState<{ items: ITEM[] }>({ items: [] })


    add(item: ITEM) {
        patchState(this.mState, oldState => ({ items: [...oldState.items, item] }))
    }

    remove(item: ITEM) {
        patchState(this.mState, oldState => ({ items: oldState.items.filter(i => i.name !== item.name) }))
    }

    update(item: ITEM) {
        patchState(this.mState, oldState => ({ items: oldState.items.map(i => i.name === item.name ? item : i) }))
    }

    //
    addToStore(item: ITEM) {
        this.stateSignal.update(oldState => ({ items: [...oldState.items, item] }))
    }



    removeFromStore(item: ITEM) {
        this.stateSignal.update(oldState => ({ items: oldState.items.filter(i => i.name !== item.name) }))
    }

    updateStore(item: ITEM) {
        this.stateSignal.update(oldState => ({ items: oldState.items.map(i => i.name === item.name ? item : i) }))
    }

    getItems() {
        return this.stateSignal().items
    }

    getItemByName(name: string) {
        return this.stateSignal().items.find(i => i.name === name)
    }

    getItemById(id: number) {
        return this.stateSignal().items.find(i => i.id === id)
    }
}

interface IAppState {
    items: ITEM[]
}

const initialState: IAppState = {
    items: []
}
export const AppMSignalStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        addToStore(item: ITEM) {
            patchState(store, oldState => ({ items: [...oldState.items, item] }))
        },
        removeFromStore(itemId: string | number) {
            patchState(store, oldState => ({ items: oldState.items.filter(i => i.id !== itemId) }))
        },
        updateInStore(item: ITEM) {
            patchState(store, oldState => ({ items: oldState.items.map(i => i.id === item.id ? item : i) }))
        }

    })

    ))