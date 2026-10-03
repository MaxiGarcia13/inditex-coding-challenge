import { expect, test } from '@playwright/test';
import { fillProductFormAndAddToCart } from './utils/product-form';

test('updates the cart total when adding and removing products', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('product-card').nth(0).click();
  const price1 = await fillProductFormAndAddToCart(page);

  await expect(page).toHaveURL('/cart');
  await expect(page.getByTestId('cart-total')).toHaveText(`${price1} EUR`);

  await page.getByTestId('continue-shopping').click();
  await page.getByTestId('product-card').nth(1).click();
  const price2 = await fillProductFormAndAddToCart(page);

  await expect(page.getByTestId('cart-total')).toHaveText(`${price1 + price2} EUR`);

  await page.getByTestId('cart-item-remove').first().click();

  await expect(page.getByTestId('cart-total')).toHaveText(`${price2} EUR`);
});
