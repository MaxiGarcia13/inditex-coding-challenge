# Inditex coding challenge by Maxi Garcia Mortigliengo 🚀

## Live demo

[https://inditex-coding-challenge.vercel.app](https://inditex-coding-challenge.vercel.app)

## Requirements

See [docs/requirements.md](./docs/requirements.md) for the full challenge requirements and design reference.

## Technical decisions

See [docs/technical-decisions.md](./docs/technical-decisions.md) for the main technical choices behind this solution.

## Stack

- **Next.js** — App Router, React Server Components, and API routes
- **React** — UI components
- **TypeScript** — typed domain, services, and components
- **TanStack Query** — server state and data fetching
- **Zustand** — cart state with localStorage persistence
- **CSS Modules** — component-scoped styles
- **Vitest** + **Testing Library** — unit and component tests
- **ESLint** — linting

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file in the project root with:

```
APP_URL=http://localhost:3000
PRODUCTS_API_KEY=api-key
PRODUCTS_API_URL=api-url
```

Replace `api-key` and `api-url` with the products API credentials provided for the challenge.

### 3. Run the project

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

### Lint

```bash
npm run lint
```

To auto-fix lint issues when possible:

```bash
npm run lint:fix
```

### Tests

```bash
npm test
```
