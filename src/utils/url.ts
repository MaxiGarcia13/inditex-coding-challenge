export function buildUrl(baseUrl: string, params?: Record<string, string | number | boolean | undefined | null>) {
  const url = new URL(baseUrl);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      const stringValue = value?.toString();

      if (stringValue) {
        url.searchParams.set(key, stringValue);
      }
    }
  }

  return url.toString();
}
