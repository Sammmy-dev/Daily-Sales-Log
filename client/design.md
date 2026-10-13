# Daily Sales Log — Design System & UI Architecture

## 1. Overview & Vision
The **Daily Sales Log** is a minimal, high-efficiency dashboard designed for small business owners and shop managers to log daily transactions and view running financial totals in real time. 

The design aesthetic is highly structured, uncluttered, and lightweight. Pure white serves as the primary canvas, balanced with deep navy typography and subtle multi-color brand accents.

---

## 2. Color Palette & Design Tokens

### Primary Canvas
- **Background Canvas (`--color-background`):** `#FFFFFF` (Pure White)
- **Card / Surface Base (`--color-surface`):** `#F8FAFC` (Slate 50 — clean neutral background for cards)
- **Borders & Dividers (`--color-border`):** `#E2E8F0` (Slate 200)

### Typography & Neutrals
- **Primary Text (`--color-text-main`):** `#0E1C36` (Deep Brand Navy)
- **Muted Text (`--color-text-muted`):** `#64748B` (Slate 500)

### Brand Accents (Extracted from Opsuite Logo Symbol)
- **Primary Brand / Navy (`--color-opsuite-navy`):** `#0E1C36` — Used for main headers, primary CTA buttons, and key focus outlines.
- **Accent Blue (`--color-opsuite-blue`):** `#2563EB` — Top left logo mark diamond. Used for active badges, links, and transaction highlights.
- **Accent Coral/Orange (`--color-opsuite-coral`):** `#E05A2B` — Top right logo mark diamond. Used for real-time running totals and energetic callouts.
- **Accent Gold/Yellow (`--color-opsuite-yellow`):** `#F59E0B` — Bottom logo mark diamond. Used for warnings, metrics highlights, and secondary tags.

### Feedback Colors
- **Success (`--color-success`):** `#10B981` (Emerald 500)
- **Error / Danger (`--color-danger`):** `#EF4444` (Red 500)

---

## 3. Typography & Hierarchy

- **Font Family:** `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`
- **Headings (`h1`, `h2`, `h3`):** Semi-bold / Bold (`font-semibold` / `font-bold`), color `#0E1C36`, tracking slightly tight (`tracking-tight`).
- **Data & Numbers:** Tabular numbers (`tabular-nums`) enabled across all monetary tables and KPI cards to prevent UI jitter when totals update dynamically.

---

## 4. UI Components Specification

### A. Navigation Header
- Crisp border bottom (`border-slate-200`) on white.
- Logo badge combining the iconic 3-diamond tile layout (Blue, Coral, Yellow) with bold `#0E1C36` logotype text.
- Mode indicator / DB status badge on top right.

### B. Input Form (Log New Sale)
- Minimal 1-row or clean grid layout.
- High contrast inputs with clean light gray borders (`#E2E8F0`), smooth focus ring utilizing Opsuite Navy (`focus:ring-2 focus:ring-[#0E1C36]`).
- Quick preset seeder button with yellow/orange accent outline for testing 10–15 records instantly.

### C. Dashboard Metrics (KPI Cards)
- White card background with subtle light slate borders.
- Top colored indicator bar using brand accent colors (Coral for Running Total, Blue for Total Items, Green for Avg Order Value).
- High visibility tabular text size (`text-3xl font-extrabold`).

### D. Transactions & Running Total Table
- Sticky table header (`bg-slate-50`).
- Clear distinction between individual transaction amounts (`text-slate-900`) and the **Running Total** column (`text-[#E05A2B]` / Coral).
- Chronological ordering indicator with instant delete/clear capabilities.

---

## 5. Responsiveness & Accessibility

- **Mobile First:** On small viewports (<648px), the transaction table switches or scrolls smoothly while keeping total summary cards pinned.
- **High Contrast Ratios:** All text elements adhere strictly to WCAG AA standard contrast ratios against white backgrounds.
- **Focus States:** High visibility focus rings on all interactive form inputs and action buttons.