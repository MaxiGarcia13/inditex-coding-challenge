import { expect, test } from '@playwright/test';

test('adds a configured phone to the cart and updates the cart counter', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('listitem').first().click();
  await expect(page).toHaveURL(/\/products\/.+/);

  const addToCart = page.getByRole('button', { name: 'Add to cart' });

  await expect(addToCart).toBeDisabled();

  await page
    .getByRole('radiogroup', { name: 'Storage capacity' })
    .getByRole('radio')
    .first()
    .click();

  await expect(addToCart).toBeEnabled();

  await addToCart.click();

  await expect(page).toHaveURL('/cart');
  await expect(page.locator('a[href="/cart"]')).toContainText('1');
});
