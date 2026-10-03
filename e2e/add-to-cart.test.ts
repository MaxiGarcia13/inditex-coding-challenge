import { expect, test } from '@playwright/test';

test('adds a configured phone to the cart and updates the cart counter', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('product-card').first().click();
  await expect(page).toHaveURL(/\/products\/.+/);

  const addToCart = page.getByTestId('add-to-cart');

  await expect(addToCart).toBeDisabled();

  await page.getByTestId('storage-selector').locator('[role="radio"]').first().click();

  await expect(addToCart).toBeEnabled();

  await addToCart.click();

  await expect(page).toHaveURL('/cart');
  await expect(page.getByTestId('cart-trigger-counter')).toHaveText('1');
});
