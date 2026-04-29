import { ActionReducerMap } from "@ngrx/store";
import { authReducer, IAuthState } from "./auth.store";

export interface IAppState {
    auth: IAuthState
}

export const reducers: ActionReducerMap<IAppState> = {
    auth: authReducer,
}