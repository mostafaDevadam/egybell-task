import { signalStore, withState, withMethods, withHooks, patchState, withProps } from '@ngrx/signals';
import { effect, inject } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment.development';
import { AuthService } from '../auth/auth-service';
import { RESPONSE_TYPE, USER_TYPE } from '../shared/types';
import { Store } from '@ngrx/store';

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
        let socket: Socket | null;

        return {

            connect(): void {

                if (socket?.connected) return; // Don't connect if already active

                const token = store._authService.getAccessTokenFromCookie();
                if (!token) return; // Don't attempt if we don't have a token yet

                socket = io(store._url, {
                    auth: { token, lang: 'en' },
                    reconnection: true,
                    reconnectionAttempts: 5,
                    transports: ['websocket'] // Force WebSocket to avoid polling-to-websocket upgrade issues
                });


                //socket = io(store._url, { auth: { token, lang: 'en' }, reconnection: true });

                socket.on('connect', () => patchState(store, { isConnected: true }));
                socket.on('disconnect', () => patchState(store, { isConnected: false }));

                socket.on('connect_error', (err) => {
                    console.error('Socket Connection Error:', err.message);
                    /*store._authService.refreshTokenAPI().subscribe(response => {
                        if (response?.access_token) {
                            this.updateToken(response.access_token);
                        }
                    });*/

                    // If the error is "unauthorized", you might need to logout
                    if (err.message === 'xhr poll error' || err.message === 'unauthorized') {
                        patchState(store, { lastError: err.message });
                    }
                });

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

                   socket.on('read-notification', (payload: RESPONSE_TYPE<any>) => {
                            console.log("socket read-notification: ", payload)
                })
            },
            // The Interceptor calls this when a new token is received
            updateToken(newToken: string): void {
                if (socket) {
                    // 1. Update the auth object for future reconnection attempts
                    //socket.auth = { ...socket.auth, token: newToken , };
                    /*socket = io(store._url, {
                        auth: { token: newToken, lang: 'en' },
                        reconnection: true,
                        reconnectionAttempts: 5,
                        transports: ['websocket'] // Force WebSocket to avoid polling-to-websocket upgrade issues
                    });*/


                    // 1. Hard-set the new token
                    socket.auth = { ...socket.auth, token: newToken };

                    // 2. Clear any internal 'unauthorized' cache and force a new session
                    socket.disconnect();

                    // Give the browser a tiny micro-task to clear the buffer
                    setTimeout(() => {
                        socket?.connect();
                        console.log('Socket: Attempting handshake with new token...');
                    }, 10);




                    // Only disconnect if we are actually connected or connecting
                    /*if (socket.connected) {
                        // 2. Manually cycle the connection to apply the new token immediately
                        socket.disconnect().connect();
                        console.log('Socket reconnecting with fresh token...');
                        this.loadNotifications()
                        socket.on('connect', () => patchState(store, { isConnected: true }));
                        socket.on('disconnect', () => patchState(store, { isConnected: false }));
                    } else {
                        // If it's already disconnected or failed, just start a fresh connection
                        socket.connect();
                        socket.on('connect', () => patchState(store, { isConnected: true }));
                        socket.on('disconnect', () => patchState(store, { isConnected: false }));
                        this.loadNotifications()
                    }*/





                }
            },
            markAsReadNotification(id: number){
                if(socket){
                    socket.emit('read-notification', {id})
                }
            },
            loadNotifications(): void {

                if (socket) {

                    socket.on('notification', (payload: RESPONSE_TYPE<any[]>) => {
                        console.log("notifications:", payload)
                        patchState(store, (state) => ({
                            notifications: [...state.notifications!!, payload.data]
                        }))
                    })

                    socket.on('notifications', (payload: RESPONSE_TYPE<any[]>) => {
                        console.log("notifications:", payload)
                        patchState(store, (state) => {
                            console.log("notifications:", payload)
                            return { notificationsList: payload.data }
                        })
                    })
                }
            },

            sendMessage(msg: string): void {
                socket?.emit('message', msg);
            },

            disconnect(): void {
                socket?.disconnect();
            },

            getUnreadCount(): number {
                return 0
            }
        };
    }),
    withHooks({
        onInit(store) {
            store.connect(); // Auto-connect when the store is initialized
            store.updateToken(store._authService.getAccessTokenFromCookie()!!);
            store.loadNotifications()
            effect(() => {


                console.log('SocketStore effect state changed to:', store.lastError());
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