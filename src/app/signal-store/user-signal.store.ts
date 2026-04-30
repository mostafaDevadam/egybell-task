import { computed } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState,  } from "@ngrx/signals";
import { createSelector } from "@ngrx/store";

export const UserSignalStore = signalStore(
    { providedIn: 'root' },
    withState({
        name: 'John Doe',
        age: 30
    }),
    withComputed((state) => ({
        info:computed(() => `${state.name()} ${state.age()}`),
    })),
    withMethods((store) => ({
        setName(name: string) { patchState(store, oldState => ({ name })) },
        updateUser(user: Partial<{name: string, age: number}>){ patchState(store, user)},
        selectName(){ return computed(() => store.name())},
        selectAge(){ return computed(() => store.age())}
    })),
    
    

)

// selectors
