import { expect, test } from '@playwright/test';
import { fillProductFormAndAddToCart } from './utils/product-form';

test('continue shopping redirects to the main view', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('product-card').first().click();
  await fillProductFormAndAddToCart(page);

  await expect(page).toHaveURL('/cart');

  await page.getByTestId('continue-shopping').click();

  await expect(page).toHaveURL('/');
});
