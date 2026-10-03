import { expect, test } from '@playwright/test';

test('clicking a phone redirects to its detail view', async ({ page }) => {
  await page.goto('/');

  const searchResponse = page.waitForResponse(
    (response) =>
      response.url().includes('/api/v1/products') && response.ok(),
  );

  await searchResponse;

  await page.getByTestId('product-card').first().click();

  await expect(page).toHaveURL(/\/products\/.+/);
});
