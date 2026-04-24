import { beforeEach, describe, expect, it, test, vi } from "vitest";
import * as router from 'react-router'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";


const mockUseAppSelector = vi.fn()

type AuthState = { isAuth: boolean, role: Role }
let state: AuthState = { isAuth: true, role: Role.ADMIN }

vi.mock('../../src/store/store', () => {
    return {
        useAppSelector: (fn: any) => ({ isAuth: true, role: Role.ADMIN }),
    }
})



/*
vi.mock('../../src/store/store', () => {
    return {
        useAppSelector: (fn: any) => fn(state),
        // If you need to update state in tests:
        __esModule: true,
        setState: (newState: AuthState) => { state = newState }
    }
})*/


/*
vi.mock('../../src/store/store', () => {
    let current = {isAuth: true, role: Role.ADMIN as const}
    return {
        __esModule: true,
        useAppSelector_: (fn: any) => fn(current),
        __setAuthState: (s: any) => { current = s}
    }
})*/

//const mockLogoutAction = vi.fn().mockResolvedValue(undefined)
vi.mock("../../src/components/buttons/LogoutButton", () => {
    const mockLogout = vi.fn().mockResolvedValue(undefined)
    const MockComponent = (props: any) => (
        <button data-testid="logout-button" onClick={() => mockLogout()}>{props.title}</button>
    )
    //let current = {isAuth: true, role: Role.USER }
    return {
        __esModule: true,
        default: MockComponent,
        mockLogout,
        //__setAuthState: (s: any) => { current = s}
    }
})
/*
vi.mock(import("../../src/actions/auth.actions.ts"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual
    
  }
})
*/


beforeEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
})



/*
vi.mock("../../src/components/buttons/LogoutButton", () => {
    const mockLogout = vi.fn().mockResolvedValue(undefined)
   return {
    default: (props: any) => <button data-testid="logout-button" onClick={() => mockLogout()}>{props.title}</button>
   }
})*/

/*vi.mock("../../src/components/buttons/LogoutButton", () => {
    return {
        __esModule: true,
        default: (props: any) => <button data-testid="logout-button" onClick={() => mockLogout()}>{props.title}</button>,
        mockLogout,
    }
})*/

import Navbar from "../../src/components/layouts/Navbar";
import { Role } from "../../src/enums";
import * as StoreMock from "../../src/store/store"
import { useDispatch } from "react-redux";

describe("Navbar", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks()
        //(StoreMock as any).__setAuthState({isAuth: true, role: Role.USER})

    })

    it("show logout button", async () => {
        mockUseAppSelector.mockImplementation(() => ({ isAuth: true, role: Role.USER }))
        render(<router.MemoryRouter><Navbar /></router.MemoryRouter>)

        const btn = screen.getByTestId('logout-button')
        fireEvent.click(btn)

        await Promise.resolve()
        //expect(mockLogoutAction).toHaveBeenCalledTimes(1)
        const mBtn = await import("../../src/components/buttons/LogoutButton")
        expect((mBtn as any).mockLogout).toHaveBeenCalledTimes(1)

    })

    it("show dashboard link", async () => {
        mockUseAppSelector.mockImplementation(() => ({ isAuth: true, role: Role.USER }))
        render(<router.MemoryRouter><Navbar /></router.MemoryRouter>)
        //const el = screen.getByTestId("users-link") 
        //expect(el && el.getAttribute('href')).toBe('/users')
        expect(screen.getByTestId('dashboard')).toBeTruthy()
    })

    it("show users and activity logs links when role is admin", async () => {
        mockUseAppSelector.mockImplementation(() => ({ isAuth: true, role: Role.ADMIN }))
        render(<router.MemoryRouter><Navbar /></router.MemoryRouter>)
        expect(screen.getByTestId('users-link')).toBeTruthy()
        expect(screen.getByTestId("logs-link")).toBeTruthy()
    })

    it("show profile link", async () => {
        mockUseAppSelector.mockImplementation(() => ({ isAuth: true, role: Role.USER }))
        render(<router.MemoryRouter><Navbar /></router.MemoryRouter>)
        expect(screen.getByTestId('profile')).toBeTruthy()
    })


})


