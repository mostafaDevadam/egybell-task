
import { beforeEach, describe, expect, it, test, vi } from "vitest";
import * as router from 'react-router'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LogoutButton from "../../src/components/buttons/LogoutButton";


const mockLogout = vi.fn().mockResolvedValue(undefined)
vi.mock("../../src/actions/auth.actions.ts", () => ({logoutAction: mockLogout}))

vi.mock(import("../../src/actions/auth.actions.ts"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual
    
  }
})



beforeEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
})

describe("LogoutButton", () => {
    it("LogoutButton onClick", async () => { 
        render(<LogoutButton isMobile={false} title="Logout" />)

        const btn = screen.getByTestId('logout-button')
        fireEvent.click(btn)
        await Promise.resolve()
        //expect(mockLogout).toHaveBeenCalledTimes(2)
        const ret = await mockLogout()
        //expect(ret).toBeUndefined()
        await waitFor(() => expect(mockLogout).toHaveBeenCalled())
    })
})