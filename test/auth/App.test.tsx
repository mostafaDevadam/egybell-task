import { useEffect } from "react"
import { getID } from "../../src/lib/id"
import { getRole } from "../../src/lib/role"
import { getToken } from "../../src/lib/token"
import { useAppDispatch } from "../../src/store/store"
import { getUserProfileAPI } from "../../src/api/user.api"
import reducer, { setAuth, setAuthToken, setRole, setUser } from "../../src/store/auth.reducer"
import { afterEach, beforeEach, expect, test, vi } from "vitest"
import * as TokenSelectors from "../../src/lib/token"
import * as RoleSelectors from "../../src/lib/role"
import * as IDSelectors from '../../src/lib/id'
import { Role } from "../../src/enums"
import * as reduxHooks from '../../src/store/store'
import { render, waitFor } from "@testing-library/react"
import { loginAPI } from "../../src/api/auth.api"
import * as UserAPIs from '../../src/api/user.api'
import { APP_ACCESS_TOKEN } from "../../src/key"



const TestComponent = () => {
    const token = getToken(APP_ACCESS_TOKEN)
    const id = getID()
    const role = getRole()
    const dispatch = useAppDispatch()

    useEffect(() => {
        loginAPI({ email: "user1@gmail.com", password: "123123" }).then((th) => console.log("th:", th))
        if (token && id && role) {
            console.log("token:", token, "id:", id, "role:", role)
            dispatch(setAuthToken(token))
            dispatch(setRole(role))
            dispatch(setAuth(true))
            getUserProfileAPI(2).then((th) => {
                console.log("th:", th)
                dispatch(setUser(th.data))
            })
        }
    }, [token, id, role])

    return null
}

beforeEach(() => {
    vi.restoreAllMocks()
    TokenSelectors.setToken(APP_ACCESS_TOKEN,'123')
    console.log("token:", TokenSelectors.getToken(APP_ACCESS_TOKEN))
    console.log("token:", getToken(APP_ACCESS_TOKEN))
})

afterEach(() => {
    vi.clearAllMocks()
})

test('dispatches Auth slice/reducer with fetching user profile data api', async () => {

    vi.spyOn(TokenSelectors, 'getToken').mockImplementation(() => "123")
    vi.spyOn(IDSelectors, 'getID').mockImplementation(() => "1")
    vi.spyOn(RoleSelectors, 'getRole').mockImplementation(() => "admin")

    const user = { id: 1, email: "user@gmail.com", role: Role.USER }
    vi.spyOn(UserAPIs, 'getUserProfileAPI').mockResolvedValue({data: user, statusCode: 200, message: "get user profile data"})
    const dispatchMock = vi.fn()
    vi.spyOn(reduxHooks, 'useAppDispatch').mockReturnValue(dispatchMock as any)

    render(<TestComponent />)

    await waitFor(() => {
        expect(dispatchMock).toHaveBeenCalledWith(setAuthToken("123"))
        expect(dispatchMock).toHaveBeenCalledWith(setRole(Role.ADMIN))
        expect(dispatchMock).toHaveBeenCalledWith(setAuth(true))
        expect(dispatchMock).toHaveBeenCalledWith(setUser(user))
    })



})