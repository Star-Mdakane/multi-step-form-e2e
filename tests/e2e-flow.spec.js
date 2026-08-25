import { test, expect } from '@playwright/test'

test('full happy path', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    //Step 0: Personal Info
    await page.getByLabel(/name/i).fill('Stephen King');
    await page.getByLabel(/email/i).fill('stephen@king.com');
    await page.getByLabel(/phone/i).fill('+1234567890');
    await page.getByRole('button', { name: /next page/i }).click();
    await expect(page.getByTestId('step-1')).toHaveAttribute('aria-current', 'step');

    //step 1: Select Plan
    await page.getByRole('radio', { name: /arcade/i }).check();
    await page.getByRole('button', { name: /billing frequency: monthly/i }).click();
    await page.getByRole('button', { name: /next page/i }).click();
    await expect(page.getByTestId('step-2')).toHaveAttribute('aria-current', 'step');

    //step 2: Add-ons
    await page.getByRole('checkbox', { name: /online service/i }).check();
    await page.getByRole('checkbox', { name: /larger storage/i }).check();
    await page.getByRole('button', { name: /next page/i }).click();
    await expect(page.getByTestId('step-3')).toHaveAttribute('aria-current', 'step');

    //step 3: Summary
    await expect(page.getByText(/arcade/i)).toBeVisible();
    await expect(page.getByText(/online service/i)).toBeVisible();
    await expect(page.getByText(/total/i)).toBeVisible();
    await page.getByRole('button', { name: /confirm/i }).click();

    //Finished
    await expect(page.getByText(/thank you/i)).toBeVisible();
})