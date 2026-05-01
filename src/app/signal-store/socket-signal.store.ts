import { signalStore, withState, withMethods, withHooks, patchState, withProps } from '@ngrx/signals';
import { effect, inject } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../auth/auth-service';
import { RESPONSE_TYPE, USER_TYPE } from '../shared/types';

export interface AppNotification {
    id: number | null
    //message: string | null
    type: 'info' | 'success' | 'warning' | 'error';
    date: string | null
    read: boolean | null
    state: string | null
    user: USER_TYPE | null
}


type SocketState = {
    isConnected: boolean;
    messages: string[];
    notifications: any[]
    notificationsList: any[]
    lastError: string | null;
};

const initialState: SocketState = {
    isConnected: false,
    messages: [],
    notifications: [],
    notificationsList: [],
    lastError: null,
};

export const SocketSignalStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withProps(() => ({
        _url: environment.socketUrl,
        _authService: inject(AuthService),
    })),
    withMethods((store) => {
        // We can hold the socket instance here via a private variable 
        // or inject a dedicated SocketService
        let socket: Socket;

        return {

            connect(): void {

                const token = store._authService.getAccessTokenFromCookie();
                socket = io(store._url, { auth: { token }, reconnection: true });

                socket.on('connect', () => patchState(store, { isConnected: true }));
                socket.on('disconnect', () => patchState(store, { isConnected: false }));

                // Listen for data and update state reactively
                socket.on('message', (msg: string) => {
                    patchState(store, (state) => ({
                        messages: [...state.messages, msg]
                    }));
                });
                // 
                socket.on('notification', (payload: RESPONSE_TYPE<any[]>) => {
                    patchState(store, (state) => ({
                        notifications: [...state.notifications!!, payload.data]
                    }))
                })

                 socket.on('notifications', (payload: RESPONSE_TYPE<any[]>) => {
                    patchState(store, (state) => ({
                        notificationsList: payload.data
                    }))
                })
            },

            sendMessage(msg: string): void {
                socket.emit('message', msg);
            },

            disconnect(): void {
                socket.disconnect();
            },

            getUnreadCount(): number {
                return 0
            }
        };
    }),
    withHooks({
        onInit(store) {
            store.connect(); // Auto-connect when the store is initialized
            effect(() => {
                console.log('SocketStore effect state changed to:', store.isConnected());
                console.log("SocketStore effect notifications:", store.notifications())
                console.log("SocketStore effect notificationsList:", store.notificationsList())
            })
        },
        onDestroy(store) {
            store.disconnect(); // Cleanup to prevent memory leaks/multiple connections
        }
    })
);