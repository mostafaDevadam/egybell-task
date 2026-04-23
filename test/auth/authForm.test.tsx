import { beforeEach, expect, test, vi } from "vitest";
import * as router from 'react-router'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";


beforeEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
})


/*vi.mock('../../src/actions/auth.actions.ts', async () => ({
    loginAction: vi.fn(() => Promise.resolve({ success: true, data: { message: "Login successful" } }))
}))

vi.mock('../../src/actions/auth.actions.ts', () => ({
    registerAction: vi.fn(() => Promise.resolve({ success: true, data: { message: "register successful" } }))
}))*/

vi.mock(import("../../src/actions/auth.actions.ts"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual
    
  }
})

import AuthForm from "../../src/components/forms/AuthForm";
import { loginAction, registerAction } from "../../src/actions/auth.actions";

test('authForm login', async () => {
    const navMock = vi.fn()
    console.log("navMock:", navMock.mock.calls)
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navMock)







    render(<AuthForm action={loginAction} buttonTitle="Login" formTitle="Login" isConfirm={false} isRole={false} />)

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "email" } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password" } })
    fireEvent.click(screen.getByTestId("submit-button"))

    console.log("navMock:", navMock.mock.calls)

    await waitFor(() => {
        //expect(navMock).toHaveBeenCalledWith('/', {replace: true})
    })


})



test('authForm register', async () => {
    const navMock = vi.fn()
    console.log("navMock:", navMock.mock)
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navMock)



    render(<AuthForm action={registerAction} buttonTitle="Register" formTitle="Register" isConfirm={true} isRole={true} />)

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "email" } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password" } })
    fireEvent.change(screen.getByTestId("confirm-password"))
    fireEvent.click(screen.getByTestId("submit-button"))

    console.log("navMock:", navMock.mock.calls)

    await waitFor(() => {
        //expect(navMock).toHaveBeenCalledWith('/login', {replace: true})
    })


})