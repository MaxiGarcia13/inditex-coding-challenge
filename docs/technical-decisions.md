# Technical decisions

## Why Next.js?

- **SEO**: the listing and detail pages benefit from server-rendered HTML and metadata, which helps search engines index product content.
- **API gateway (BFF)**: Next.js Route Handlers let the app proxy the products API so the `x-api-key` stays on the server and is never exposed to the browser.

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

## Why an internal `/api/v1/products` instead of calling the external API from the client?

- Keeps `PRODUCTS_API_KEY` and `PRODUCTS_API_URL` server-only via environment variables.
- Lets the app normalize upstream quirks (e.g. duplicate products) and map responses before they reach the UI.
- Gives a stable contract for the frontend (`/api/v1/products`) even if the external API shape changes.

###

Feel free to reach out if you have any questions about this challenge:

LinkedIn: linkedin.com/in/maximilianogarcia13
Portfolio / CV: maxi-garcia-mortigliengo-cv.vercel.app
