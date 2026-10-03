import { expect, test } from '@playwright/test';
import { waitForProductsResponse } from './utils/products';

test('back button returns to the list with the previous search', async ({ page }) => {
  await page.goto('/');

  const searchResponse = waitForProductsResponse(page, 'Apple');

  await page.getByTestId('search-input').fill('Apple');
  await searchResponse;

  await page.getByTestId('product-card').first().click();
  await expect(page).toHaveURL(/\/products\/.+/);

  await page.getByTestId('back-button').click();

  await expect(page).toHaveURL(/q=Apple/);
  await expect(page.getByTestId('search-input')).toHaveValue('Apple');
});
