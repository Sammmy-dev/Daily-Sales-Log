# Daily Sales Log

## Product Summary

Daily Sales Log is a single-tenant sales dashboard for small business owners. It records sales in MongoDB through an Express REST API and presents daily metrics and a searchable transaction ledger.

The visual design uses a minimalist white layout with deep navy (`#0E1C36`), royal blue (`#2563EB`), coral (`#E05A2B`), and golden yellow (`#F59E0B`).

## Current Functionality

- Create a sale with an item name, positive amount in Nigerian naira, and a date/time using the sale-entry modal.
- View today's revenue and count, all-time transaction count and average transaction value.
- Search the ledger by item name and filter by date. The filtered total and count reflect the visible matching records.
- View sales in timestamp order with a cumulative running total; delete an individual sale.
- Persist records in MongoDB through the Express API.
- Load 15 fixed sample records with `cd server && npm run seed`. This script **deletes all existing sales** before inserting the samples; there is no seed API endpoint or in-app seed button.

The API supports clearing all sales with `DELETE /api/sales`, but the dashboard does not currently expose a clear-ledger control.

## Architecture and Conventions

### Frontend

- React, TypeScript, and Vite SPA.
- Zustand holds the shared sales list, loading state, and API errors. Sales are added to or removed from client state after the API request succeeds; updates are not optimistic.
- Axios handles REST requests and normalizes API errors.
- Tailwind CSS v4 provides styling. Use the existing color tokens in `client/src/index.css` and follow `client/design.md`.
- Keep the transaction ledger easy to browse: sale entry belongs in a modal, not as an inline form in the ledger flow.

#### rules
* components should be created when necessary
* use predefined style in global.css
* follow design.md for UI 

### Backend

- Express REST API using TypeScript and MongoDB via Mongoose.
- Routes and controllers follow the MVC structure under `server/src`.
- The Mongoose sale model stores `itemName`, `amount`, `timestamp`, and automatic `createdAt`/`updatedAt` timestamps. The API accepts `item_name` for sale creation and returns MongoDB's `itemName` field.
- Validate non-empty item names and positive numeric amounts on the server.

## API

All routes are mounted under `/api`.

| Method | Endpoint | Behavior |
| --- | --- | --- |
| `GET` | `/api/sales` | Return all sales ordered by timestamp ascending in `{ success, data }`. |
| `POST` | `/api/sales` | Create a sale from `{ item_name, amount, timestamp? }`; return `{ success, data }`. |
| `DELETE` | `/api/sales/:id` | Delete one sale; return `{ success, data: { id } }`. |
| `DELETE` | `/api/sales` | Delete all sales; return a success message. |
