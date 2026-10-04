# Inditex coding challenge by Maxi Garcia Mortigliengo 🚀

## Live demo

[https://inditex-coding-challenge.vercel.app](https://inditex-coding-challenge.vercel.app)

## Requirements

See [docs/requirements.md](./docs/requirements.md) for the full challenge requirements and design reference.

## Technical decisions

See [docs/technical-decisions.md](./docs/technical-decisions.md) for the main technical choices behind this solution.

Feel free to reach out if you have any questions about this challenge:

- **LinkedIn:** [linkedin.com/in/maximilianogarcia13](https://www.linkedin.com/in/maximilianogarcia13/)
- **Portfolio / CV:** [maxi-garcia-mortigliengo-cv.vercel.app](https://maxi-garcia-mortigliengo-cv.vercel.app/)

## Stack

- **Next.js** — App Router, React Server Components, and API routes
- **React** — UI components
- **TypeScript** — typed domain, services, and components
- **TanStack Query** — server state and data fetching
- **Zustand** — cart state with localStorage persistence
- **CSS Modules** — component-scoped styles
- **Vitest** + **Testing Library** — unit and component tests
- **Playwright** — end-to-end tests
- **ESLint** — linting

## Getting started

We recommend **Node.js 24 or later**.

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file in the project root with:

```
APP_URL=http://localhost:3000
PRODUCTS_API_URL=https://prueba-tecnica-api-tienda-moviles.onrender.com
PRODUCTS_API_KEY=api-key
ACCESS_TOKEN_SECRET=any-long-random-string
```

Replace `api-key` with the products API credentials provided for the challenge. Set a strong `ACCESS_TOKEN_SECRET` in production (locally it falls back to a dev default if omitted).

### 3. Run the project

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

### Production

Build the app for production:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

### Lint

```bash
npm run lint
```

To auto-fix lint issues when possible:

```bash
npm run lint:fix
```

### Tests

Run unit and e2e tests together:

```bash
npm test
```

#### Unit tests

```bash
npm run test:unit
```

#### E2E tests

Playwright starts the Next.js app automatically (or reuses one already running on `APP_URL`). Install browsers once before the first run:

```bash
npx playwright install chromium
```

Then run the e2e suite:

```bash
npm run test:e2e
```

For the interactive Playwright UI:

```bash
npm run test:e2e:ui
```
