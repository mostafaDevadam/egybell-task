import { beforeEach, expect, test, vi } from "vitest";
import * as router from 'react-router'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";


beforeEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
})



import { Role } from "../../src/enums.ts";
import ViewProfile from "../../src/components/views/ViewProfile.tsx";

test('ViewProfile', async () => {
    const navMock = vi.fn()
    console.log("navMock:", navMock.mock.calls)
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navMock)

    const user = { id: 1, email: "user1@gmail.com", role: Role.USER }
    render(<ViewProfile user={user} />)
           
            expect(screen.getByTestId('title').innerHTML).toBe("Profile")
            expect(screen.getByTestId('email').innerHTML).toBe(`Email: ${user.email}`)
            expect(screen.getByTestId('role').innerHTML).toBe(`Role: ${user.role}`)
            expect(screen.getByTestId('bio')).toBeTruthy()
            expect(screen.getByTestId('bio-content')).toBeTruthy()
        


    await waitFor(() => {
        //expect(navMock).toHaveBeenCalledWith('/', {replace: true})
    })


})



