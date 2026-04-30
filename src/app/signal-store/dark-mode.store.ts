import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

type DarkModeState = {
  isDarkMode: boolean;
};

const initialState: DarkModeState = {
  isDarkMode: false
};

export const DarkModeSignalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    toggle(): void {
      const newValue = !store.isDarkMode();
      patchState(store, { isDarkMode: newValue });
      localStorage.setItem('darkMode', String(newValue));
      
      // Apply to DOM
      if (newValue) {
        document.documentElement.classList.add('dark');
        //document.body.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark');
        // document.body.classList.remove('dark-mode');
      }
    },
    
    set(value: boolean): void {
      patchState(store, { isDarkMode: value });
      localStorage.setItem('darkMode', String(value));
      
      if (value) {
        document.documentElement.classList.add('dark');
         document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
    },
    
    init(): void {
      const saved = localStorage.getItem('darkMode');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialValue = saved !== null ? saved === 'true' : prefersDark;
      
      patchState(store, { isDarkMode: initialValue });
      
      if (initialValue) {
        document.documentElement.classList.add('dark');
      }
    }
  }))
);