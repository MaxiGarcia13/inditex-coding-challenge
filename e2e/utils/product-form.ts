import type { Page } from '@playwright/test';

export async function fillProductFormAndAddToCart(page: Page) {
  await page.getByTestId('storage-selector').locator('[role="radio"]').first().click();

  const priceText = await page.getByTestId('product-price').textContent();
  const price = Number(priceText?.replace(' EUR', ''));

  await page.getByTestId('add-to-cart').click();

  return price;
}
