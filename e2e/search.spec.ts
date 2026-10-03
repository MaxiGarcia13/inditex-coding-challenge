import { expect, test } from '@playwright/test';
import { waitForProductsResponse } from './utils/products';

test('filters phones by name or brand via API search', async ({ page }) => {
  await page.goto('/');

  const searchResponse = waitForProductsResponse(page, 'Apple');

  await page.getByTestId('search-input').fill('Apple');
  await searchResponse;

  await expect(page.getByTestId('product-card').first()).toContainText(/Apple/i);
});
