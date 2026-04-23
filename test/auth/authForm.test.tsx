import { beforeEach, expect, test, vi } from "vitest";
import * as router from 'react-router'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AuthForm from "../../src/components/forms/AuthForm";
import { loginAction, registerAction } from "../../src/actions/auth.actions";

beforeEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
})
/*
test('authForm login', async () => {
    const navMock = vi.fn()
    console.log("navMock:", navMock.mock.calls)
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navMock)

    vi.mock('../../src/actions/auth.actions.ts', () => ({
        loginAction: vi.fn(() => Promise.resolve({ success: true, data: { message: "Login successful" } }))
    }))

    render(<AuthForm action={loginAction} buttonTitle="Login" formTitle="Login" isConfirm={false} isRole={false} />)

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "email" } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password" } })
    fireEvent.click(screen.getByTestId("submit-button"))

    console.log("navMock:", navMock.mock.calls)

    await waitFor(() => {
        //expect(navMock).toHaveBeenCalledWith('/', {replace: true})
    })
    

})
*/


test('authForm register', async () => {
    const navMock = vi.fn()
    console.log("navMock:", navMock.mock.calls)
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navMock)

    vi.mock('../../src/actions/auth.actions.ts', () => ({
        registerAction: vi.fn(() => Promise.resolve({ success: true, data: { message: "register successful" } }))
    }))

    render(<AuthForm action={registerAction} buttonTitle="Register" formTitle="Register" isConfirm={true} isRole={true} />)

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "email" } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password" } })
    fireEvent.change(screen.getByTestId("confirm-password"))
    fireEvent.click(screen.getByTestId("submit-button"))

    console.log("navMock:", navMock.mock.calls)

    await waitFor(() => {
        //expect(navMock).toHaveBeenCalledWith('/', {replace: true})
    })
    

})