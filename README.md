# Daily Sales Log

A responsive sales dashboard for recording transactions, reviewing daily KPIs, and tracking chronological running totals. Sales are stored in MongoDB through an Express REST API.

## Features

- Record an item name, amount in Nigerian naira, and transaction date/time.
- View total sales today, all-time transaction count, average sale value, and the total for the currently filtered ledger.
- Search transactions by item and filter them by date; the KPI total and count follow these filters.
- Review transactions in a ledger with chronological running totals and delete individual sales.
- Use the matching custom logo and favicon.

## Notes

### What I built

A sales logging dashboard with a React and TypeScript frontend, an Express API backed by MongoDB, KPI cards, and a searchable, date-filtered transaction ledger with running totals.

### Decisions

- I used a modal for sale entry to keep the ledger in view and make browsing transactions the primary experience.
- I chose React with Vite instead of Next.js because the application is a single-page app and does not need server-side rendering or framework-level routing.

### With one more day

I would add pagination to make the transaction ledger easier to browse as the number of sales grows.

## Tech stack

- **Frontend:** React, TypeScript, Vite, Zustand, Axios, Tailwind CSS v4, and react-icons
- **Backend:** Express, TypeScript, and MongoDB via Mongoose

## Getting started

Requirements: Node.js, npm, and a MongoDB connection.

1. Configure the backend environment in `server/.env`:

   ```dotenv
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/daily-sales-log
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

2. Optionally configure the frontend API URL in `client/.env`:

   ```dotenv
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

   The URL must use the same port as the backend. If omitted, the client defaults to `http://localhost:5000/api`.

3. Install dependencies and run the backend and frontend in separate terminals:

   ```bash
   cd server
   npm install
   npm run dev
   ```

   ```bash
   cd client
   npm install
   npm run dev
   ```

   Open the frontend URL printed by Vite (typically `http://localhost:5173`).

To create a production frontend build, run `npm run build` from `client`. To compile the backend, run `npm run build` from `server`.

## Seed data

The backend includes a script for loading 15 fixed sample transactions:

```bash
cd server
npm run seed
```

**Warning:** the seed script deletes all existing sales before inserting the sample records. It connects to the MongoDB URI configured in `server/.env` (or the local default).

## API

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sales` | Fetch sales ordered by timestamp ascending |
| POST | `/api/sales` | Create a sale with `item_name`, positive numeric `amount`, and optional ISO `timestamp` |
| DELETE | `/api/sales/:id` | Delete one sale |
| DELETE | `/api/sales` | Delete all sales |

The API does not currently expose a sample-data seed endpoint; use the backend seed script above when appropriate.
