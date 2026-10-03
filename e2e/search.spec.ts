import { expect, test } from '@playwright/test';

test('filters phones by name or brand via API search', async ({ page }) => {
  await page.goto('/');

  const searchResponse = page.waitForResponse(
    (response) =>
      response.url().includes('/api/v1/products')
      && response.url().includes('search=Apple')
      && response.ok(),
  );

  await page.getByLabel('Search for a smartphone').fill('Apple');
  await searchResponse;

  await expect(page.getByRole('listitem').first()).toContainText(/Apple/i);
});
