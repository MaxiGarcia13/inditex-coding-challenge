# Technical decisions

## Why Next.js?

- **SEO**: the listing and detail pages benefit from server-rendered HTML and metadata, which helps search engines index product content.
- **API gateway (BFF)**: an internal `/api/v1/products` proxies the external products API so `PRODUCTS_API_KEY` and `PRODUCTS_API_URL` stay server-only, upstream quirks can be normalized (e.g. duplicate products), and the frontend keeps a stable contract even if the external API shape changes.

## Why `PRODUCTS_API_URL` and `PRODUCTS_API_KEY` as env vars?

Both are read from the environment so the same codebase can point at different upstreams (local, CI, staging, production) without code changes. The key stays server-only and can be rotated or swapped per environment; the URL can target a mock, a shared test API, or the real products API depending on where the app runs.

## How is the API protected?

The BFF is publicly reachable, so protection is layered:

- **Vercel Firewall — origin allowlist**: denies `/api/*` when the request sends an `Origin` that is not the app. This blocks cross-origin browser calls; same-origin `GET` often omits `Origin`, so we do not deny missing Origin.
- **Vercel Firewall — rate limiting**: throttles abusive traffic by IP so scripts cannot freely burn the upstream API quota.
- **Short-lived access-token cookie**: `proxy.ts` sets an HttpOnly signed cookie on page loads and requires it on `/api/*`, so casual `curl` without a browser visit gets `401`.

This is basic covering, not hard security: `Origin` and cookies can be forged or copied. The real goal is keeping `PRODUCTS_API_KEY` server-side and making casual abuse harder.

## Why TanStack Query?

- Simpler data fetching for client-side needs (e.g. search).
- Built-in caching, request deduplication, and loading/error states without custom boilerplate.

## Why debounce the search input?

Without debounce, every keystroke would trigger a search request. Waiting ~500ms after the user stops typing cuts down unnecessary calls to the products endpoint while typing, and keeps the UI responsive.

## Why deduplicate products in the list API route?

The upstream products API sometimes returns duplicate items with the same `id`. Showing the same phone twice in the grid does not make sense, so the route normalizes the response with `uniqueBy(..., 'id')` before mapping it to the client shape. The reported `total` is based on the deduplicated list so the result count stays consistent.

## Why Zustand instead of React Context?

- Storing frequently mutated data (like a cart) in React Context is generally not a good practice: updates re-render every consumer of that context.
- Less boilerplate for shared cart state (no provider nesting or custom reducers).
- Straightforward persistence to `localStorage`, matching the cart persistence requirement.
- Clearer separation: server/product state stays in TanStack Query; client/cart state lives in Zustand.

Feel free to reach out if you have any questions about this challenge:

- **LinkedIn:** [linkedin.com/in/maximilianogarcia13](https://www.linkedin.com/in/maximilianogarcia13/)
- **Portfolio / CV:** [maxi-garcia-mortigliengo-cv.vercel.app](https://maxi-garcia-mortigliengo-cv.vercel.app/)
