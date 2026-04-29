import { createAction, createReducer, props, on, createFeatureSelector, createSelector, select } from "@ngrx/store";
import { Role } from "../shared/enums";
import { USER_TYPE } from "../shared/types";
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../auth/auth-service";
import { catchError, from, map, mergeMap, of, switchMap, tap } from "rxjs";
import { environment } from "../../environments/environment.development";
import { create } from "domain";
import { Router } from "@angular/router";

// state
export interface IAuthState {
    user?: USER_TYPE | null;
    isAuth: boolean;
    access_token: string | null;
    refresh_token: string | null;
    userId: number | null;
    role: Role | null;
    loading: boolean;
    error: string | null;
}



export const initialState: IAuthState = {
    //user: null,
    isAuth: false,
    access_token: null,
    refresh_token: null,
    userId: null,
    role: null,
    loading: false,
    error: null
}
// actions
export const loginAction = createAction(
    '[Auth] Login',
    props<{ email: string, password: string }>()
)

export const loginSuccessAction = createAction(
    '[Auth] Login Success',
    props<{ isAuth: boolean, userId: number, role: Role, access_token: string, refresh_token: string }>()
)

export const loginFailureAction = createAction(
    '[Auth] Login Failure',
    props<{ error: string }>()
)

export const logoutAction = createAction('[Auth] Logout')

export const loadUserFromTokenAction = createAction('[Auth] Load User from Token')

export const loadUserFromTokenSuccessAction = createAction(
    '[Auth] Load User from Token Success',
    props<{ user: USER_TYPE }>()
)

export const loadUserFromTokenFailureAction = createAction(
    '[Auth] Load User from Token Failure',
    props<{ error: string }>()
)

export const clearErrorAction = createAction('[Auth] Clear Error')

export const loadAuthFromCookiesAction = createAction(
    '[Auth] Load Auth from Cookies'
)

export const setAuthFromCookiesAction = createAction(
    '[Auth] Set Auth from Cookies',
    props<{ isAuth: boolean, userId: number | null, role: Role | null, access_token: string | null, refresh_token: string | null }>()
)

// reducer
export const authReducer = createReducer(
    initialState,

    on(loginAction, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),

    on(loginSuccessAction, (state, { role, userId, access_token, refresh_token }) => ({
        ...state,
        access_token,
        refresh_token,
        role,
        userId,
        isAuth: Boolean(access_token),
        loading: false,
        error: null,
    })),

    on(loginFailureAction, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(logoutAction, () => initialState),

    on(loadUserFromTokenAction, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),

    on(loadUserFromTokenSuccessAction, (state, { user }) => {

        console.log("on loadUserFromTokenSuccessAction#:", state, user)

        return ({
            ...state,
            user,
            isAuth: true,
            loading: false,
            error: null,
        })
    }
    ),

    on(loadUserFromTokenFailureAction, (state, { error }) => ({
        ...state,
        loading: false,
        isAuth: false,
        error,
    })),

    on(clearErrorAction, (state) => ({
        ...state,
        error: null,
    })),

    on(loadAuthFromCookiesAction, (state) => ({
        ...state,
        loading: true,
    })),

    on(setAuthFromCookiesAction, (state, { userId, role, access_token, refresh_token }) => ({
        ...state,
        access_token,
        refresh_token,
        role,
        userId,
        isAuth: Boolean(access_token),
        loading: false,
    }))



);

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private keys = environment.keys
    private router = inject(Router)



    login$ = createEffect(() => {
        console.log("login effect")
        return this.actions$.pipe(
            ofType(loginAction),
            mergeMap(({ email, password }) =>
                from(this.authService.login(email, password)).pipe(
                    tap((res) => console.log("tap login effect res:", res)),
                    mergeMap((obs) => obs),
                    map((res) => loginSuccessAction({
                        role: res.data.role,
                        userId: res.data.id,
                        access_token: res.data.access_token,
                        refresh_token: res.data.refresh_token,
                        isAuth: Boolean(res.data.access_token),

                    })),
                    catchError((err) => of(loginFailureAction({ error: err.message })))
                )
                /*this.authService.login$(email, password).pipe(
                  map((res) =>
                    loginSuccessAction({
                      role: res.data.role,
                      userId: res.data.id,
                      access_token: res.data.access_token,
                      refresh_token: res.data.refresh_token,
                    })
                  ),
                  catchError((err) =>
                    of(loginFailureAction({ error: err.message }))
                  )
                )*/
            )
        )
    }
    )


    saveAuth$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loginSuccessAction),
                tap((action) => {
                    console.log("saveAuth$ tap:", action)
                }),
                map(({ access_token, refresh_token, role, userId }) => {
                    this.authService.saveInCookie(this.keys.NG_ACCESSTOKEN, access_token)
                    this.authService.saveInCookie(this.keys.NG_REFRESHTOKEN, refresh_token)
                    this.authService.saveInCookie(this.keys.NG_USERROLE, role)
                    this.authService.saveInCookie(this.keys.NG_USERID, String(userId))
                    this.authService.isAuth.set(Boolean(access_token))
                })
            ),
        { dispatch: false }
    )

    loadUserFromToken$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(loadUserFromTokenAction),
                switchMap(() => {
                    const token = this.authService.getAccessTokenFromCookie();

                    if (!token) {
                        this.router.navigate(['/login'])
                        return of(loadUserFromTokenFailureAction({ error: "No token found" }));
                    }

                    // Convert Promise to Observable properly
                    return from(this.authService.fetchAuthUser()).pipe(
                        switchMap((userObservable) => userObservable), // Flatten the inner observable
                        map((response: any) => {
                            console.log("User data received:", response);
                            const { data } = response;

                            return loadUserFromTokenSuccessAction({
                                user: {
                                    id: data.id,
                                    email: data.email,
                                    role: data.role
                                }
                            });
                        }),
                        catchError((err) => {
                            console.error("Error loading user:", err);
                            clearErrorAction()
                            loadUserFromTokenFailureAction({ error: err.message })
                             this.router.navigate(['/login'])
                            return of(loadUserFromTokenFailureAction({ error: err.message }));
                        })
                    );
                })
            )
      
    )
}

// selectors
export const selectAuthState = createFeatureSelector<IAuthState>('auth')
export const selectToken = createSelector(selectAuthState, (state) => state.access_token)
export const selectIsAuth = createSelector(selectAuthState, (state) => state.isAuth)
export const selectRole = createSelector(selectAuthState, (state) => state.role)
export const selectUserId = createSelector(selectAuthState, (state) => state.userId)

export const selectIsAdmin = createSelector(selectRole, (role) => role === Role.ADMIN)
export const selectIsUser = createSelector(selectRole, (role) => role === Role.USER)

export const selectUser = createSelector(selectAuthState, (state) => state.user)

export const selectAuthInfo = createSelector(
    selectIsAuth,
    selectToken,
    selectRole,
    selectUser,
    selectUserId,
    (isAuth, token, role, user, userId) => ({ isAuth, token, role, user, userId })
)

export const selectAuth = (state: any) => state.auth
export const selectRole$ = createSelector(selectAuth, (auth) => auth.role)
export const selectUserId$ = createSelector(selectAuth, (state) => state.userId)
