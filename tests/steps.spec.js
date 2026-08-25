import { test, expect } from '@playwright/test'

test.describe('step by step test', () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await page.evaluate(() => localStorage.clear())
        await page.reload()
    })

    test('nav and buttons are visible', async ({ page }) => {
        await expect(page.getByTestId('nav-container')).toBeVisible();
        await expect(page.getByTestId('desktop-buttons')).toBeVisible();
        await expect(page.getByTestId('step-0')).toHaveAttribute('aria-current', 'step');
    });

    test.describe('step 0', () => {
        test('page to render errors on nav click without filling form', async ({ page }) => {

            await page.getByTestId('step-1').click()

            await expect(page.getByText(/name is required/i)).toBeVisible()
            await expect(page.getByText(/email is required/i)).toBeVisible()
            await expect(page.getByText(/phone number is required/i)).toBeVisible()

            const step0 = page.getByTestId('step-0')
            await expect(step0).toHaveAttribute('aria-current', 'step')
            await expect(page.getByTestId('step-1')).not.toHaveAttribute('aria-current', 'step')
            await expect(page.getByLabel(/name/i)).toBeVisible()

        })

        test('page to render errors on next click without filling form', async ({ page }) => {

            const nextBtn = page.getByTestId('desktop-buttons').getByRole('button', { name: /next page/i })

            await nextBtn.click()

            await expect(page.getByText(/name is required/i)).toBeVisible()
            await expect(page.getByText(/email is required/i)).toBeVisible()
            await expect(page.getByText(/phone number is required/i)).toBeVisible()

            const step0 = page.getByTestId('step-0')
            await expect(step0).toHaveAttribute('aria-current', 'step')
            await expect(page.getByTestId('step-1')).not.toHaveAttribute('aria-current', 'step')
            await expect(page.getByLabel(/name/i)).toBeVisible()
        })

        test('show error for missing fields only', async ({ page }) => {
            await page.getByLabel(/name/i).fill('Star')

            await page.getByTestId('desktop-buttons').getByRole('button', { name: /next page/i }).click()

            await expect(page.getByText(/email is required/i)).toBeVisible()
            await expect(page.getByText(/phone number is required/i)).toBeVisible()
        })

        test('shows error for wrong email', async ({ page }) => {
            await page.getByLabel(/email/i).fill('star.com')

            await page.getByTestId('desktop-buttons').getByRole('button', { name: /next page/i }).click()

            await expect(page.getByText(/Please enter a valid email/i)).toBeVisible()

        })

        test('shows error for wrong phone format', async ({ page }) => {
            await page.getByLabel(/phone/i).fill('12345')

            await page.getByTestId('desktop-buttons').getByRole('button', { name: /next page/i }).click()

            await expect(page.getByText(/Phone number must start with +/i)).toBeVisible()

        })

        test('goes to next step when valid', async ({ page }) => {
            await page.getByLabel(/name/i).fill('Star')
            await page.getByLabel(/email/i).fill('star@gmail.com')
            await page.getByLabel(/phone/i).fill('+27727377555')

            await page.getByTestId('desktop-buttons').getByRole('button', { name: /next page/i }).click()

            await expect(page.getByLabel(/name/i)).not.toBeVisible()
            await expect(page.getByTestId('step-1')).toHaveAttribute('aria-current', 'step')
        })

        test('local storage persistance', async ({ page }) => {

            await page.getByLabel('Name').fill('John');

            const saved = await page.evaluate(() => {
                return JSON.parse(localStorage.getItem('multi-step'));
            });

            expect(saved.name).toBe('John');

            await page.reload()

            const savedAfter = await page.evaluate(() => {
                return JSON.parse(localStorage.getItem('multi-step'));
            });
            expect(savedAfter.name).toBe('John');

            await expect(page.getByLabel('Name')).toHaveValue('John');

        })

    })

    test.describe('step 1', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByLabel(/name/i).fill('Stephen King');
            await page.getByLabel(/email/i).fill('syephen@king.com');
            await page.getByLabel(/phone/i).fill('+1234567890');
            await page.getByRole('button', { name: /next page/i }).click();
            await expect(page.getByTestId('step-1')).toHaveAttribute('aria-current', 'step');
        })

        test('show plans', async ({ page }) => {
            await expect(page.getByText(/arcade/i)).toBeVisible();
            await expect(page.getByText(/pro/i)).toBeVisible();
            await expect(page.getByText(/advanced/i)).toBeVisible();
        })

        test('has a default plan', async ({ page }) => {
            await expect(page.getByText(/arcade/i)).toBeChecked()
            await expect(page.getByText(/advanced/i)).not.toBeChecked()
            await expect(page.getByText(/pro/i)).not.toBeChecked()
        })

        test('can select a different plan', async ({ page }) => {
            await page.getByText(/advanced/i).click()

            await expect(page.getByText(/advanced/i)).toBeChecked()
            await expect(page.getByText(/arcade/i)).not.toBeChecked()
        })

        test('billing monthly default', async ({ page }) => {
            await page.getByRole('button', { name: /billing frequency: monthly/i }).click()

            await expect(page.getByText(/2 months free/i)).toHaveCount(3)
        })

        test('can go back one page', async ({ page }) => {
            await page.getByRole('button', { name: /previous page/i }).click();

            await expect(page.getByTestId('step-0')).toHaveAttribute('aria-current', 'step')
            await expect(page.getByTestId('step-1')).not.toHaveAttribute('aria-current', 'step')
            await expect(page.getByLabel(/name/i)).toBeVisible()
            await expect(page.getByRole('button', { name: /previous page/i })).toHaveText('')
        })

        test('to go to next step', async ({ page }) => {
            await page.getByRole('button', { name: /next page/i }).click();

            await expect(page.getByTestId('step-2')).toHaveAttribute('aria-current', 'step')
            await expect(page.getByTestId('step-1')).not.toHaveAttribute('aria-current', 'step')

            await expect(page.getByText(/online service/i)).toBeVisible();

        })
    })

    test.describe('step 2', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByLabel(/name/i).fill('Stephen King');
            await page.getByLabel(/email/i).fill('syephen@king.com');
            await page.getByLabel(/phone/i).fill('+1234567890');
            await page.getByRole('button', { name: /next page/i }).click();
            await expect(page.getByTestId('step-1')).toHaveAttribute('aria-current', 'step');
            await page.getByRole('button', { name: /next page/i }).click();
            await expect(page.getByTestId('step-2')).toHaveAttribute('aria-current', 'step');
        })

        test('renders 3 addons', async ({ page }) => {
            await expect(page.getByRole('checkbox', { name: /online service/i })).toBeVisible()
            await expect(page.getByRole('checkbox', { name: /larger storage/i })).toBeVisible()
            await expect(page.getByRole('checkbox', { name: /customizable profile/i })).toBeVisible()
        })
        test('no addon to be selected at render', async ({ page }) => {
            await expect(page.getByRole('checkbox', { name: /online service/i })).not.toBeChecked();
            await expect(page.getByRole('checkbox', { name: /larger storage/i })).not.toBeChecked();
            await expect(page.getByRole('checkbox', { name: /customizable profile/i })).not.toBeChecked();
        })
        test('can select and unselect addon', async ({ page }) => {
            await page.getByRole('checkbox', { name: /online service/i }).check()

            await expect(page.getByRole('checkbox', { name: /online service/i })).toBeChecked();

            await page.getByRole('checkbox', { name: /online service/i }).uncheck()

            await expect(page.getByRole('checkbox', { name: /online service/i })).not.toBeChecked();
        })
        test('can select multiple addons', async ({ page }) => {
            await expect(page.getByRole('checkbox', { name: /online service/i })).not.toBeChecked();
            await expect(page.getByRole('checkbox', { name: /larger storage/i })).not.toBeChecked();
            await expect(page.getByRole('checkbox', { name: /customizable profile/i })).not.toBeChecked();

            await page.getByRole('checkbox', { name: /online service/i }).check()
            await page.getByRole('checkbox', { name: /larger storage/i }).check()

            await expect(page.getByRole('checkbox', { name: /online service/i })).toBeChecked();
            await expect(page.getByRole('checkbox', { name: /larger storage/i })).toBeChecked();
        })
        test('addon persists onlocal storage', async ({ page }) => {
            await page.getByRole('checkbox', { name: /online service/i }).check()

            const saved = await page.evaluate(() => {
                return JSON.parse(localStorage.getItem('multi-step'))
            })

            expect(saved.addons.onlineService).toBeTruthy()

            await page.reload()

            const savedAfter = await page.evaluate(() => {
                return JSON.parse(localStorage.getItem('multi-step'))
            })

            expect(savedAfter.addons.onlineService).toBeTruthy()
        })
        test('can go to next page without addon', async ({ page }) => {
            await page.getByRole('button', { name: /next page/i }).click();

            await expect(page.getByTestId('step-3')).toHaveAttribute('aria-current', 'step');
            await expect(page.getByText(/finishing up/i)).toBeVisible()
        })
    })

    test.describe('step 3', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByLabel(/name/i).fill('Stephen King');
            await page.getByLabel(/email/i).fill('syephen@king.com');
            await page.getByLabel(/phone/i).fill('+1234567890');
            await page.getByRole('button', { name: /next page/i }).click();
            await page.getByRole('button', { name: /next page/i }).click();
            await page.getByRole('checkbox', { name: /online service/i }).check()
            await page.getByRole('button', { name: /next page/i }).click();
            await expect(page.getByTestId('step-3')).toHaveAttribute('aria-current', 'step');
        })

        test('shows correct summary on page', async ({ page }) => {
            await expect(page.getByText(/arcade/i)).toBeVisible()
            await expect(page.getByText(/online service/i)).toBeVisible()
        })
        test('shows total calculations monthly', async ({ page }) => {
            await expect(page.getByText('$9/mo')).toBeVisible()
            await expect(page.getByText('+$1/mo')).toBeVisible()
            await expect(page.getByText('+$10/mo')).toBeVisible()
        })

        test('change plan link goes to step 1', async ({ page }) => {
            await page.getByRole('button', { name: /change/i }).click()

            await expect(page.getByTestId('step-1')).toHaveAttribute('aria-current', 'step');
        })
        test('next page button becoms confirm', async ({ page }) => {
            await expect(page.getByTestId('step-3')).toHaveAttribute('aria-current', 'step')

            await expect(page.getByRole('button', { name: /next page/i })).toHaveText(/confirm/i)
        })

        test('confrm button show thank you', async ({ page }) => {
            await page.getByRole('button', { name: /next page/i }).click()

            await expect(page.getByTestId('step-3')).toHaveAttribute('aria-current', 'step')
            expect(page.getByText(/thank you!/i))
        })
    })
})