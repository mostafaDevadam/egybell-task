import { describe, expect, it, vi } from "vitest";
import { removeToken, setToken } from "../../src/lib/token";

/*
vi.mock(import('../../src/lib/token'), () => {
    return {
        getToken: () => 'token'
    }
})
*/
describe('token', () => {
    it('getToken', () => {
        import('../../src/lib/token').then(({getToken}) => {
            expect(getToken()).toBe('token')
        })
    })

    it('setToken', () => {
        import('../../src/lib/token').then(({setToken}) => {
            expect(setToken("token")).toHaveBeenCalledOnce()
        })
    })

     it('removeToken', () => {
        import('../../src/lib/token').then(({removeToken}) => {
            expect(removeToken()).toHaveBeenCalledOnce()
        })
    })
})