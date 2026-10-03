import { expect, test } from '@playwright/test';

test('back button returns to the list with the previous search', async ({ page }) => {
  await page.goto('/');

  const searchResponse = page.waitForResponse(
    (response) =>
      response.url().includes('/api/v1/products')
      && response.url().includes('search=Apple')
      && response.ok(),
  );

  await page.getByTestId('search-input').fill('Apple');
  await searchResponse;

  await page.getByTestId('product-card').first().click();
  await expect(page).toHaveURL(/\/products\/.+/);

  await page.getByTestId('back-button').click();

  await expect(page).toHaveURL(/q=Apple/);
  await expect(page.getByTestId('search-input')).toHaveValue('Apple');
});
