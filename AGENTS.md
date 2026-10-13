# Product Requirement Document (PRD)

## Project Name
**Daily Sales Log**

---

## 1. Product Summary & Goal
**Daily Sales Log** is a streamlined, single-tenant daily transaction logger and real-time financial tracking dashboard designed for small business owners and retail operators. Built as part of a technical evaluation, the system enables users to log daily sales (item name, amount, timestamp), maintain persistent transaction records in a real database, and view dynamically computed running totals alongside key sales metrics.

The visual design follows a clean, minimalist white architecture (Deep Navy `#0E1C36`, Royal Blue `#2563EB`, Coral `#E05A2B`, and Golden Yellow `#F59E0B`).

---

## 2. Core User Stories & Functional Requirements

### 2.1 Core Requirements
* **Log a Sale:** As a shop owner, I can enter an item name, sale amount (in ₦ Naira), and time/date to log a new sales transaction.
* **View Transactions List:** As a shop owner, I can view all recorded sales listed in a chronological, easy-to-read table.
* **Running Total Calculation:** As a shop owner, I can see a dynamic, cumulative running total column calculated for every transaction on the log.
* **Daily Summary Metrics:** As a shop owner, I can view overall daily summary cards (Total Revenue, Total Sales Count, Average Transaction Value).
* **Persistent Data:** As a shop owner, all sales records persist in a live external database (PostgreSQL / MongoDB) via an Express REST API.

### 2.2 Non-Functional Requirements
* **Performance:** Sub-100ms UI update latency using optimistic local state management (Zustand) synced with backend REST APIs via Axios.
* **Minimalist & Responsive UI:** Fully responsive layout (desktop & mobile) adhering to Opsuite's white minimalist style guidelines.
* **Data Integrity:** Strict server-side validation ensuring non-empty item names and positive numeric sale amounts.

---

## 3. Tech Stack & System Architecture

### Frontend Architecture
* **Framework:** React.js with typescript
* **State Management:** Zustand (handling global sales state, UI optimistic updates, and metrics calculation)
* **HTTP Client:** Axios (configured with custom interceptors and error handling)
* **Styling:** Tailwind CSS v4 + react-icons

#### rules
* components should be created when necessary
* use predefined styles in global.css
* follow design.md for UI 

### Backend Architecture
* **Server Framework:** Express.js (Node.js REST API)
* **Database:** MongoDB (via Mongoose)
* **Deployment Platform:** Vercel (Frontend Next.js) + Render
* **Structure:** MVC

---

## 4. API Endpoints Specification (Express Backend)

| Method | Endpoint | Description | Request Body | Response |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/sales` | Fetch all sales ordered by timestamp ASC | N/A | `{ success: true, data: [Sale] }` |
| `POST` | `/api/sales` | Record a new sale transaction | `{ item_name: string, amount: number, timestamp?: string }` | `{ success: true, data: Sale }` |
| `POST` | `/api/sales/seed` | Seed 10–15 sample sales for testing | `{ count?: number }` | `{ success: true, count: number, data: [Sale] }` |
| `DELETE` | `/api/sales/:id` | Delete a specific sale item | N/A | `{ success: true, id: string }` |
| `DELETE` | `/api/sales` | Clear all recorded sales (reset) | N/A | `{ success: true, message: "Cleared" }` |

---

## 5. Database Schema

### `sales` Table / Collection

```sql
CREATE TABLE sales (
  id VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid(),
  item_name VARCHAR(255) NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);