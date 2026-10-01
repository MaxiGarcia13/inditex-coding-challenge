import { describe, expect, it } from 'vitest';
import { buildUrl } from './url';

const URLS = ['https://api.example.com/products', '/api/v1/products'];

describe('buildUrl', () => {
  for (const baseUrl of URLS) {
    it(`should build a url with params for ${baseUrl}`, () => {
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
  }

  it('should return the base url if no params are provided', () => {
    const url = buildUrl(URLS[0]);

    expect(url).toBe(URLS[0]);
  });
});
