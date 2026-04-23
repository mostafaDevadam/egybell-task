import { describe, expect, it, vi } from "vitest";

describe('id', () => {
    it('getID', () => {
        import('../../src/lib/id').then(({getID}) => {
            expect(getID()).toBe('1')
        })
    })

    it('setID', () => {
        import('../../src/lib/id').then(({setID}) => {
            expect(setID("1")).toHaveBeenCalledOnce()
        })
    })

     it('removeID', () => {
        import('../../src/lib/id').then(({removeID}) => {
            expect(removeID()).toHaveBeenCalledOnce()
        })
    })
})