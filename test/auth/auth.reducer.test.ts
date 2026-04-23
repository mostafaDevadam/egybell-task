import { beforeEach, describe, expect, it, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import reducer, { clearAll, clearUser, login, logout, setAuth, setAuthToken, setRole, setUser } from '../../src/store/auth.reducer'
import { Role } from "../../src/enums";


describe('authReducer', () => {
    it('has corrent initial state', () => {
        const inital = reducer(undefined, { type: '@@INIT' } as any)
        expect(inital).toEqual({ user: null, token: null, role: Role.USER, isAuth: false })
    })
    it('login sets user, token, role and isAuth', () => {
        const payload = { user: { id: 1, email: "user@gmail.com", role: Role.USER }, token: "token", role: Role.USER }
        const next = reducer(undefined, login(payload))
        expect(next.user).toEqual(payload.user)
        expect(next.token).toEqual(payload.token)
        expect(next.role).toEqual(payload.role)
        expect(next.isAuth).toEqual(true)
    })

    it("setAuth sets as isAuth", () => {
        const next = reducer(undefined, setAuth(true))
        expect(next.isAuth).toEqual(true)
    })

    it("setUser sets as user", () => {
        const user = { id: 1, email: "user@gmail.com", role: Role.USER }
        const next = reducer(undefined, setUser(user))
        expect(next.user).toEqual(user)
    })

    it("setAuthToken sets as token", () => {
        const next = reducer(undefined, setAuthToken("token"))
        expect(next.token).toBe("token")
    })

    it("setRole sets as role", () => {
        const next = reducer(undefined, setRole(Role.USER))
        expect(next.role).toBe(Role.USER)
    })

    it('clearUser clears values of user and isAuth', () => {
        const state = {
            user: { id: 1, email: "user@gmail.com", role: Role.USER },
            token: "token",
            role: Role.USER,
            isAuth: true
        }
        const next = reducer(state, clearUser())
        expect(next.user).toBe(null)
        expect(next.token).toBe("token")
        expect(next.role).toBe(Role.USER)
        expect(next.isAuth).toBe(false)
    })

    it("clearAll clears all values", () => {
        const state = {
            user: { id: 1, email: "user@gmail.com", role: Role.USER },
            token: "token",
            role: Role.USER,
            isAuth: true
        }
        const next = reducer(state, clearAll())
        expect(next.user).toBe(null)
        expect(next.token).toBe(null)
        expect(next.role).toBe(null)
        expect(next.isAuth).toBe(false)
    })

    it("logout clears users, token and role", () => {
        const state = {
            user: { id: 1, email: "user@gmail.com", role: Role.USER },
            token: "token",
            role: Role.USER,
            isAuth: true
        }
        const next = reducer(state, logout())
        expect(next.user).toBe(null)
        expect(next.token).toBe(null)
        expect(next.role).toBe(null)
    })




})