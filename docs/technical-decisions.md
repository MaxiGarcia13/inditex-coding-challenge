# Technical decisions

## Why Next.js?

- **SEO**: the listing and detail pages benefit from server-rendered HTML and metadata, which helps search engines index product content.
- **API gateway (BFF)**: an internal `/api/v1/products` proxies the external products API so `PRODUCTS_API_KEY` and `PRODUCTS_API_URL` stay server-only, upstream quirks can be normalized (e.g. duplicate products), and the frontend keeps a stable contract even if the external API shape changes.

## Why TanStack Query?

- Simpler data fetching for client-side needs (e.g. search).
- Built-in caching, request deduplication, and loading/error states without custom boilerplate.

## Why deduplicate products in the list API route?

The upstream products API sometimes returns duplicate items with the same `id`. Showing the same phone twice in the grid does not make sense, so the route normalizes the response with `uniqueBy(..., 'id')` before mapping it to the client shape. The reported `total` is based on the deduplicated list so the result count stays consistent.

## Why Zustand instead of React Context?

- Storing frequently mutated data (like a cart) in React Context is generally not a good practice: updates re-render every consumer of that context.
- Less boilerplate for shared cart state (no provider nesting or custom reducers).
- Straightforward persistence to `localStorage`, matching the cart persistence requirement.
- Clearer separation: server/product state stays in TanStack Query; client/cart state lives in Zustand.

## How is the BFF protected?

The BFF is publicly reachable, so protection is layered:

- **Vercel Firewall — origin allowlist**: rejects cross-origin browser requests that are not from the app’s allowed origins.
- **Vercel Firewall — rate limiting**: throttles abusive traffic by IP so scripts and scrapers cannot freely burn the upstream API quota.
- **Short-lived session cookie**: `proxy.ts` sets an HttpOnly signed cookie on page loads and requires it on `/api/*`, so casual `curl` without a browser session gets `401`. Server-side renders pass a server-only header for the same check.

CORS alone cannot stop `curl` or forged `Origin` headers; the session cookie and rate limiting cover that gap.

Feel free to reach out if you have any questions about this challenge:

- **LinkedIn:** [linkedin.com/in/maximilianogarcia13](https://www.linkedin.com/in/maximilianogarcia13/)
- **Portfolio / CV:** [maxi-garcia-mortigliengo-cv.vercel.app](https://maxi-garcia-mortigliengo-cv.vercel.app/)
