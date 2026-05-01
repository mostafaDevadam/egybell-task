// shared/app-initializer.ts
import { inject } from "@angular/core";
import { firstValueFrom, tap } from "rxjs";
import { AuthService } from "../auth/auth-service";
import { Store } from "@ngrx/store";
import { loadUserFromTokenAction, selectUser, setAuthFromCookiesAction } from "../store/auth.store";
import { Role } from "./enums";
import { AuthSignalStore } from "../signal-store/auth-signal.store";

export function appInitializer() {


    return async (): Promise<void> => {
        console.log('App Initializer - Starting...');
        const service = inject(AuthService);
        const store = inject(Store);
        const authSignalStore = inject(AuthSignalStore)

        try {
            // Initialize cookie monitoring
            service.initCookieMonitoring();

            const hasToken = service.getAccessToken();
            const refreshToken = service.getRefreshTokenFromCookie()
            const role$ = service.getUserRoleFromCookie() as Role
            const id = service.getUserIDFromCookie()
            console.log("Has token:", hasToken);

            if (hasToken) {
                console.log("Token found, fetching user data...");

                console.log('App Initializer - Cookie values:', {
                    hasToken,
                    role$,
                    id
                });

                store.dispatch(setAuthFromCookiesAction({
                    access_token: hasToken,
                    refresh_token: refreshToken,
                    role: role$,
                    userId: Number(id),
                    isAuth: Boolean(hasToken)
                }))

                // Convert observable to promise for cleaner async/await
                try {
                    //const user = await firstValueFrom(await service.fetchAuthUser());
                    //console.log("User data:", user);
                    // Save user data in Redux/store
                    // store.dispatch(setUser(user));
                    store.dispatch(loadUserFromTokenAction());
                    const u = store.select(selectUser)
                    u.pipe(tap(user => console.log("app init tap u:", user)))
                    .subscribe(user => {
                        if(user){
                            console.log("u:", user)
                            authSignalStore.updateUser({...user, id: Number(user.id)})
                        }
                        
                    })

                } catch (error) {
                    console.error("Error fetching user data:", error);
                    // Clear invalid token on error
                    // clear redux store/states
                    service.logout();
                }

                const user$$ = store.select(selectUser)
                user$$.pipe(tap(user => console.log("app init tap user$$:", user))).subscribe(user => console.log("user$$:", user))





                // Optionally save role in store as well
                const role = service.getUserRole();
                // store.dispatch(setRole(role));
            } else {
                console.log("No token found");
            }
        } catch (error) {
            console.error("App Initializer error:", error);
            // Clear invalid token on error
            service.logout();
        }

        console.log('App Initializer - Complete');
    };
}