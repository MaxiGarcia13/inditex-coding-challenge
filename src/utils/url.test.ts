import { describe, expect, it } from 'vitest';
import { buildUrl } from './url';

const baseUrl = 'https://api.example.com/products';

describe('buildUrl', () => {
  it('should build a url with params', () => {
    const url = buildUrl(baseUrl, {
      search: 'test',
      number: 10,
      zeroNumber: 0,
      boolean: true,
      empty: null,
      undefinedValue: undefined,
      emptyString: '',
    });
    expect(url).toBe(`${baseUrl}?search=test&number=10&zeroNumber=0&boolean=true`);
  });
});
