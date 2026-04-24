import { beforeEach, describe, expect, it, test, vi } from "vitest";
import * as router from 'react-router'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

vi.mock("router", () =>({ Link: ({children, to}: any) => <a href={to}>{children}</a> }))


beforeEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
})



import { Role } from "../../src/enums.ts";
import Table from "../../src/components/data-tables/Table.tsx";
import { store, useAppDispatch, useAppSelector } from "../../src/store/store.ts";
import { Provider } from "react-redux";


const mockSelector = vi.fn()
vi.mock("../../src/store/store.ts", () => ({
    useAppSelector: (fn: any) => mockSelector(fn)
}))


describe("Table", () => {
    it("users", () => {
        mockSelector.mockImplementation((fn) => ({ role: Role.ADMIN }))
        const users = [{ id: 1, email: "user1@gmail.com", role: Role.USER/*, timestamp: "2022-01-01T00:00:00.000Z"*/ }]
        const fields = ["id", "email", "role", "actions"]
        render(<Table fields={fields} docs={users} isActions={false} />)

        expect(screen.getByTestId('container')).toBeTruthy()
        expect(screen.getByTestId('header')).toBeTruthy()
        expect(screen.getByTestId('table')).toBeTruthy()
        //expect(screen.getByTestId('table').textContent).toContain("2022-01-01")
        //expect(screen.getByTestId('table').textContent).toContain("user1@gmail.com")
        //expect(screen.getByTestId("view").textContent).toBe("View")
    })

     it("actions links", () => {
        mockSelector.mockImplementation((fn) => ({ role: Role.ADMIN }))
        const logs = [{ id: 1, action: "login", user_id: 1, timestamp: "2022-01-01T00:00:00.000Z",user: { id: 1, email: "user1@gmail.com", role: Role.USER }}]
        const fields = ["id", "action", "timestamp", "user", "actions"]
        render(<router.MemoryRouter><Table fields={fields} docs={logs} isActions={true} /></router.MemoryRouter>)

        expect(screen.getByTestId('container')).toBeTruthy()
        expect(screen.getByTestId('header')).toBeTruthy()
        expect(screen.getByTestId('table')).toBeTruthy()
        expect(screen.getByTestId('table').textContent).toContain("2022-01-01")
        expect(screen.getByTestId('table').textContent).toContain("user1@gmail.com")
        expect(screen.getByTestId("view").textContent).toBe("View")
        expect(screen.queryByText("View")).toBeTruthy()
        expect(screen.queryByText("Edit")).toBeTruthy()
        const view = screen.getByText("View")
        expect(view && view.getAttribute('href')).toBe('/profile/1/view')
        expect(screen.getByText("Edit").getAttribute('href')).toBe('/profile/1/edit')
    })

    it("cannot render actions links when role is not admin", () => {
         mockSelector.mockImplementation((fn) => ({ role: Role.USER }))
        const users = [{ id: 1, email: "user1@gmail.com", role: Role.USER/*, timestamp: "2022-01-01T00:00:00.000Z"*/ }]
        const fields = ["id", "email", "role", "actions"]
        render(<Table fields={fields} docs={users} isActions={true} />)
        expect(screen.queryByText("View")).toBeNull()
        expect(screen.queryByText("Edit")).toBeNull()
         
    })

})
/*
test('Table', async () => {

    const users = [{ id: 1, email: "user1@gmail.com", role: Role.USER }]
    const fields = ["id", "email", "role", "actions"]
    render(<TestComponent fields={fields} docs={users} />)



    expect(screen.getByTestId('container')).toBeTruthy()
    expect(screen.getByTestId('header')).toBeTruthy()
    expect(screen.getByTestId('table')).toBeTruthy()


})
*/


