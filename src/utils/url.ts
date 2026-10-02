type Params = Record<string, string | number | boolean | undefined | null>;

export function buildUrl(baseUrl: string, params: Params = {}) {
  const paramsString = buildParams(params);

  if (paramsString) {
    return `${baseUrl}?${paramsString}`;
  }

  return baseUrl;
}

function buildParams(params: Params) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    const stringValue = value?.toString().trim();

    if (stringValue && stringValue.length > 0) {
      searchParams.set(key, stringValue);
    }
  }

  if (searchParams.size > 0) {
    return searchParams.toString();
  }

  return null;
}
