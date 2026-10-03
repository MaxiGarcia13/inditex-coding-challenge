import { expect, test } from '@playwright/test';

test('clicking a similar product navigates to its detail view', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('product-card').first().click();
  await expect(page).toHaveURL(/\/products\/.+/);

  const currentUrl = page.url();
  const similarProduct = page.getByTestId('similar-products').getByTestId('product-card').first();

  await similarProduct.click();

  await expect(page).toHaveURL(/\/products\/.+/);
  await expect(page).not.toHaveURL(currentUrl);
});
