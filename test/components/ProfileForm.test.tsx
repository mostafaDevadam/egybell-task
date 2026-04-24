import { beforeEach, expect, test, vi } from "vitest";
import * as router from 'react-router'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";


beforeEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
})


vi.mock(import("../../src/actions/user.actions.ts"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual
    
  }
})

import ProfileForm from "../../src/components/forms/ProfileForm";
import { updateUserAction } from "../../src/actions/user.actions";
import { Role } from "../../src/enums.ts";

test('ProfileForm Edit', async () => {
    const navMock = vi.fn()
    console.log("navMock:", navMock.mock.calls)
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navMock)

    const user = { id: 1, email: "user1@gmail.com", role: Role.USER }
    render(<ProfileForm action={updateUserAction} buttonTitle='Update' title="Edit Profile" user={user} />)

    fireEvent.change(screen.getByTestId("role"))
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "email" } })
    fireEvent.click(screen.getByTestId("submit-button"))

    console.log("navMock:", navMock.mock.calls)

    await waitFor(() => {
        //expect(navMock).toHaveBeenCalledWith('/', {replace: true})
    })


})



