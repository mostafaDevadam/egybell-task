import { describe, expect, it, vi } from "vitest";

describe('role', () => {
    it('getRole', () => {
        import('../../src/lib/role').then(({getRole}) => {
            expect(getRole()).toBe('admin')
        })
    })

    it('setRole', () => {
        import('../../src/lib/role').then(({setRole}) => {
            expect(setRole("admin")).toHaveBeenCalledOnce()
        })
    })

     it('removeRole', () => {
        import('../../src/lib/role').then(({removeRole}) => {
            expect(removeRole()).toHaveBeenCalledOnce()
        })
    })
})