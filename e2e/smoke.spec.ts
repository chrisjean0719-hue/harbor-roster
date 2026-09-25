import { expect, test } from '@playwright/test';

test('renders the roster week', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Feb 9 – 15, 2026' })).toBeVisible();
  await expect(page.locator('.day-col')).toHaveCount(7);
});

test('role filter narrows the board', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Technician' }).click();
  await expect(page.locator('.shift.role-nurse')).toHaveCount(0);
});
