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
            test.use({ viewport: { width: 375, height: 800 } });

            test('should be at the top', async () => {
                const box = await nav.boundingBox()

                expect(box?.x).toBeLessThan(100)
                expect(box?.y).toBeLessThan(100)
            })

            test('should be horizontal', async () => {
                await expect(nav).toHaveCSS('display', 'flex')
                await expect(nav).toHaveCSS('flex-direction', 'row')
            })

            test('step labels hidden on mobile', async ({ page }) => {
                await expect(page.getByText(/YOUR INFO/i)).toBeHidden();
            })

        })

        test.describe('desktop', () => {
            test.use({ viewport: { width: 1280, height: 800 } });

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

    test.describe('button container', () => {
        let mobBtns, deskBtns;

        test.beforeEach(async ({ page }) => {
            deskBtns = page.getByTestId('desktop-buttons')
            mobBtns = page.getByTestId('mobile-buttons')
        })

        test.describe('mobile view', () => {

            test.use({ viewport: { width: 375, height: 800 } })

            test('mobile buttons to be on screen', async () => {
                const prevBtn = mobBtns.getByRole('button', { name: /previous page/i })
                const nextBtn = mobBtns.getByRole('button', { name: /next page/i })

                await expect(mobBtns).toBeVisible()
                await expect(deskBtns).toBeHidden()
                await expect(prevBtn).toHaveText('')
                await expect(nextBtn).toHaveText(/next step/i)
            })

            test('mobile button container to be at the bottom', async () => {
                const box = await mobBtns.boundingBox()

                expect(box?.y).toBeGreaterThan(724)
            })
        })

        test.describe('desktop view', () => {

            test.use({ viewport: { width: 1280, height: 800 } })

            test('desktop button container to be visible on render', async () => {
                const prevBtn = deskBtns.getByRole('button', { name: /previous page/i })
                const nextBtn = deskBtns.getByRole('button', { name: /next page/i })

                await expect(deskBtns).toBeVisible()
                await expect(mobBtns).toBeHidden()
                await expect(nextBtn).toHaveText(/next step/i)
                await expect(prevBtn).toHaveText('')
            })

            test('no horizontal scroll on any viewport', async ({ page }) => {
                for (const width of [375, 768, 1280]) {
                    await page.setViewportSize({ width, height: 800 })
                    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
                    expect(scrollWidth).toBeLessThanOrEqual(width + 1) // +1 for rounding
                }
            })
        })


    })
})