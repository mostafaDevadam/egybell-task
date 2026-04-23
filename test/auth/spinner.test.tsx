import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe('spinner', () => {
    it('Spinner', () => {
        import('../../src/components/Spinner').then((Spinner) => {
            expect(Spinner).toBeTruthy()
            expect(screen.getByRole('spinner')).toBeTruthy()
            expect(screen.getByTestId('container-spinner')).toBeTruthy()
            expect(screen.getByTestId('sub-spinner')).toBeTruthy()
            expect(screen.getByTestId('title-spinner').textContent).toBe("loading")
        })
    })
})