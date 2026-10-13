# Daily Sales Log - Opsuite Take-Home

A minimal, fast, and responsive **Daily Sales Log** web application built for business owners to log transactions, monitor daily KPIs, and track a cumulative running total ledger.

## 📝 Technical Notes

### 1. What I Built
- **Sales Logging Form:** Input item name, category, amount (₦), and customizable timestamp.
- **Real-Time KPI Cards:** Displays Today's Total Sales, Transaction Counts, Average Ticket Size, and Filtered Totals.
- **Ledger with Live Running Total:** Interactive data table featuring a dynamic running total column calculated chronologically.
- **1-Click Sample Seed:** Populates 12 realistic African SME transactions for fast reviewer evaluation.

### 2. Architectural Decisions
1. **Chronological Ledger & Deterministic Running Totals:** Entries are timestamp-sorted before running totals are computed, guaranteeing ledger accuracy regardless of insertion order.
2. **Pluggable Repository Architecture:** Built using a repository pattern. By default, it operates with Zustand + REST API, with clean abstract interfaces to hook into PostgreSQL/Supabase or Node REST backends.
3. **Minimal Opsuite Visual Identity:** Styled with a clean white primary aesthetic with the exact accent colors extracted from the Opsuite logo (Royal Blue, Coral/Orange, and Amber) for a polished enterprise feel.

### 3. What I Would Build With One More Day
1. **Payment Method Reconciliation:** Tag sales by payment channel (POS Terminal, Direct Transfer, Cash) for end-of-day register balancing.
2. **CSV & PDF Ledger Export:** Enable single-click accounting statement downloads.
3. **Offline Progressive Web App (PWA):** Queue offline transactions via IndexedDB and sync automatically.

## 🛠 Tech Stack
- **Frontend:** Next.js 16 (App Router) + TypeScript
- **State:** Zustand with optimistic updates
- **API:** Axios with interceptors
- **Styling:** Tailwind CSS v4 + react-icons
- **Backend:** Express.js + MongoDB (Mongoose)
- **Deployment:** Vercel (Frontend) + Render (Backend)

## 🚀 Getting Started
```bash
# Install dependencies
pnpm install

# Run development servers
pnpm dev          # Frontend (Next.js)
pnpm --filter Server dev  # Backend (Express + nodemon)
```

## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/sales | Fetch all sales ordered by timestamp ASC |
| POST | /api/sales | Record a new sale transaction |
| POST | /api/sales/seed | Seed 10-15 sample sales for testing |
| DELETE | /api/sales/:id | Delete a specific sale item |
| DELETE | /api/sales | Clear all recorded sales (reset) |