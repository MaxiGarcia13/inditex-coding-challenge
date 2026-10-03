import { expect, test } from '@playwright/test';

test('back button returns to the list with the previous search', async ({ page }) => {
  await page.goto('/');

  const searchResponse = page.waitForResponse(
    (response) =>
      response.url().includes('/api/v1/products')
      && response.url().includes('search=Apple')
      && response.ok(),
  );

  await page.getByLabel('Search for a smartphone').fill('Apple');
  await searchResponse;

  await page.getByRole('listitem').first().click();
  await expect(page).toHaveURL(/\/products\/.+/);

  await page.getByRole('button', { name: 'Back' }).click();

  await expect(page).toHaveURL(/q=Apple/);
  await expect(page.getByLabel('Search for a smartphone')).toHaveValue('Apple');
});
