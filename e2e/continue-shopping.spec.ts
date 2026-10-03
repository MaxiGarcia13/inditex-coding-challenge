import { expect, test } from '@playwright/test';

test('continue shopping redirects to the main view', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('product-card').first().click();
  await page.getByTestId('storage-selector').locator('[role="radio"]').first().click();
  await page.getByTestId('add-to-cart').click();

  await expect(page).toHaveURL('/cart');

  await page.getByTestId('continue-shopping').click();

  await expect(page).toHaveURL('/');
});
