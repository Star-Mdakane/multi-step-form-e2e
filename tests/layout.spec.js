import { test, expect } from "@playwright/test"

test.describe('layout', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/')
    })

    test.describe('nav', () => {

        let nav;
        test.beforeEach(async ({ page }) => {
            nav = page.getByTestId('nav-container')
        })

        test('to be on page', async () => {
            expect(nav).toBeVisible()
        })

        test.describe('mobile', () => {
            test.beforeEach(async ({ page }) => {
                await page.setViewportSize({ width: 375, height: 800 });
            })

            test('should be at the top', async () => {
                const box = await nav.boundingBox()

                expect(box?.x).toBeLessThan(100)
                expect(box?.y).toBeLessThan(100)
            })

            test('should be horizontal', async () => {
                expect(nav).toHaveCSS('display', 'flex')
                expect(nav).toHaveCSS('flex-direction', 'row')
            })

            test('step labels hidden on mobile', async ({ page }) => {
                await expect(page.getByText(/YOUR INFO/i)).toBeHidden();
            })

        })

        test.describe('desktop', () => {
            test.beforeEach(async ({ page }) => {
                await page.setViewportSize({ width: 1280, height: 800 });
            })

            test('should be on the left', async () => {
                const box = await nav.boundingBox()

                expect(box?.x).toBeLessThan(200)
                expect(box?.y).toBeLessThan(150)
            })

            test('should be vertical', async () => {
                expect(nav).toHaveCSS('display', 'flex')
                expect(nav).toHaveCSS('flex-direction', 'column')
            })

            test('step labels visible on desktop', async ({ page }) => {
                await expect(page.getByText(/YOUR INFO/i)).toBeVisible();
                await expect(page.getByText(/SELECT PLAN/i)).toBeVisible();
            });
        })

        test.describe('states', () => {

            let step1, step2, step3, step4

            test.beforeEach(async ({ page }) => {
                step1 = page.getByTestId('step-0')
                step2 = page.getByTestId('step-1')
                step3 = page.getByTestId('step-2')
                step4 = page.getByTestId('step-3')
            })

            test('step0 to be ctive on render', async () => {
                await expect(step1).toHaveAttribute('aria-current', 'step');
                await expect(step2).not.toHaveAttribute('aria-current', 'step');
                await expect(step3).not.toHaveAttribute('aria-current', 'step');
                await expect(step4).not.toHaveAttribute('aria-current', 'step');
            })
        })
    })
})