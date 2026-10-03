import { expect, test } from '@playwright/test';
import { waitForProductsResponse } from './utils/products';

test('clicking a phone redirects to its detail view', async ({ page }) => {
  const productsResponse = waitForProductsResponse(page);

  await page.goto('/');
  await productsResponse;

  await page.getByTestId('product-card').first().click();

  await expect(page).toHaveURL(/\/products\/.+/);
});
