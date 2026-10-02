# Inditex coding challenge solution by Maximiliano Garcia Mortigliengo

## Requirements

### 1. Phone Listing View

- Implement a grid with cards showing the first 20 phones
  from the API.
  - Each card should include image, name, brand, and base price.
- Implement a real-time search that filters phones by name or brand
  (use API filtering).
- The search should include an indicator with the number of results found.
- Implement a navigation bar that contains:
  - An icon with a link to the home panel.
  - An icon that shows the number of phones in the cart.
    - The cart must be persistent; its state can be managed using
      localStorage.
- Clicking a phone should redirect to its detail view.

### 2. Phone Detail View

Show details of the selected phone, including:

- Device name and brand.
- Large phone image, with the ability to change dynamically based on the selected
  color.
- Selectors for storage and color, with real-time price updates.
- Detailed technical specifications, base price, and variations by storage.
- An "Add to cart" button that is only enabled once color and
  storage have been selected.
- A "Similar products" section at the bottom.

### 3. Cart View

Show the phones added to the cart, with:

- Image, name, selected specifications (storage / color), and individual
  price.
- Implement a button to remove individual products from the cart.
- Show the total purchase price.
- A "Continue shopping" button that redirects to the main view.

## Design

[Figma](https://www.figma.com/design/Nuic7ePgOfUQ0hcBrUUQrb/Labs---Zara-Web-Challenge--Smartphones-?node-id=0-1&p=f&t=sS48OvEMhvgYx92Y-0)

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
