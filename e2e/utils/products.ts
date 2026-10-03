import type { Page } from '@playwright/test';

export function waitForProductsResponse(page: Page, search?: string) {
  return page.waitForResponse(
    (response) =>
      response.url().includes('/api/v1/products')
      && (search == null || response.url().includes(`search=${search}`))
      && response.ok(),
  );
}
