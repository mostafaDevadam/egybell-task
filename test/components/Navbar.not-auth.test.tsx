import { beforeEach, describe, expect, it, test, vi } from "vitest";
import * as router from 'react-router'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";


const mockUseAppSelector = vi.fn()


vi.mock('../../src/store/store', () => {
    return {
        useAppSelector: (fn: any) => ({ isAuth: false, role: Role.ADMIN }),
    }
})




beforeEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
})


import Navbar from "../../src/components/layouts/Navbar";
import { Role } from "../../src/enums";


describe("Navbar not Auth", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks()
    })

    it("show login and register links", async () => {
        //(StoreMock as any).setAuthState({isAuth: false, role: Role.USER})
        mockUseAppSelector.mockImplementation(() => ({ isAuth: false, role: Role.USER }))
        render(<router.MemoryRouter><Navbar /></router.MemoryRouter>)

        expect(screen.getByTestId('login-link')).toBeTruthy()
        expect(screen.getByTestId('register-link')).toBeTruthy()

    })
})


