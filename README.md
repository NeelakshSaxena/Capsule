# Capsule - Personal AI Dashboard

## React Implementation Plan - Phases 0, 1, 2

To implement Phases 0, 1, and 2 as defined in `pagePhases.md` and `blueprint.md`, we built a React frontend using Vite and Tailwind CSS. The previously downloaded `stitch_page.html` served as a visual and markup reference, but we componentized it correctly.

### 1. Setup Phase
- Initialized Vite React + TypeScript project in `frontend/`.
- Installed `tailwindcss`, `postcss`, `autoprefixer`, and `lucide-react` (for icons).
- Moved the downloaded images (`neelaksh_avatar.jpg`, `lora_avatar.jpg`) to `frontend/public/assets/`.
- Moved the `stitch_page.html` reference code to `frontend/reference.html` out of the way.

### Phase 0: Design System Foundation
We configured `tailwind.config.ts` to include the specific colors, `fontFamily` (Inter), and `borderRadius` attributes defined in the Stitch dashboard.

**Core Components (`frontend/src/ui/`)**
- `Card.tsx`: The base glassmorphic card component with proper blur, padding, and subtle borders.
- `MetricCard.tsx`: Reusable component for the four top-level metrics.
- `IconButton.tsx`: Standardized buttons for actions (settings, notifications).
- `ProgressBar.tsx`: Reusable segmented and circular progress visualizers.

### Phase 1: Global Layout
We constructed the application shell into which all pages will be rendered.

**Layout Components (`frontend/src/layout/`)**
- `MainLayout.tsx`: The parent shell component. Include the Top Navigation bar.
- `Navbar.tsx`: Holds the Logo, Tabs, and Profile section. Includes active tab logic.

### Phase 2: Dashboard Overview Page
We built out the Dashboard as defined in the visual design.

**Dashboard Core (`frontend/src/pages/dashboard/`)**
- `DashboardPage.tsx`: Coordinates the sections below.

**Dashboard Widgets (`frontend/src/widgets/`)**
- `ProfileWidget.tsx`: User profile and compute usage bar.
- `ProgressWidget.tsx`: System activity horizontal bar chart.
- `TimeTrackerWidget.tsx`: Circular active compute timer.
- `TaskProgressWidget.tsx`: Segmented pipeline view and list of recent tasks.
- `TimelineWidget.tsx`: Weekly roadmap view.
- `ActivityFeedWidget.tsx`: Recent system activity list.
- `DevicesWidget.tsx`: Connected nodes list.
- `ResourcesWidget.tsx`: Accordions detailing core infrastructure.

### Verification
- Served the app via Vite (`npm run dev`) and ensured all layouts match the design of the original Stitch page across standard desktop breakpoints.
- Ensured state updates in `lastSteps.md` reflect Phase completion correctly.

---

## Capsule Project Initialized

The initial folder structure for the Personal AI Dashboard (Capsule) has been successfully created based on `blueprint.md` and the Stitch UI screenshot.

### What was done

**Virtual Environment:**
- A local `.venv` has been initialized using `python -m venv .venv`.
- Core backend dependencies (`fastapi`, `uvicorn`, `redis`, `qdrant-client`, `requests`, `pydantic`) have been successfully installed into it.

**Backend Structure:**
- `backend/main.py` created for the FastAPI server entrypoint.
- `backend/config.py` created to hold basic environment configuration.
- Folders `core/`, `database/`, `llm/`, and `modules/` created and staged with `.gitkeep`.

**Frontend Integration:**
- Pulled the HTML file and saved it as `frontend/index.html`.
- Downloaded the external avatar images (`neelaksh_avatar.jpg` and `lora_avatar.jpg`) into `frontend/assets/` to ensure offline capability and speed.
- Updated the HTML file to rely on these local assets.

**Platform Directories:**
- Created `docker/` and `modules_store/` placeholders for future development.
- Created a `.gitignore`.

### Validation
- Tested the activation state and pip installation successfully.
- You can test your backend API by navigating to the project directory, activating the virtual environment, and running:
```powershell
.\.venv\Scripts\activate
uvicorn backend.main:app --reload
```

---

## Initial Setup Phase Details
* Created core infrastructure according to `blueprint.md`
* Set up virtual environment and `fastapi`/`qdrant`/`redis` dependencies in `backend/`
* Extracted the design code from `stitch_page.html`

### Phase 0: Design System Foundation Details
* Initialized a React application using Vite + TypeScript in `frontend/`.
* Installed `tailwindcss` v4, `@tailwindcss/vite`, `clsx`, `tailwind-merge`, and `lucide-react`.
* Set up root variables matching the brand spec in `index.css` (primary `#f6c446`, display font Inter).
* Built foundational UI components in `src/ui/`:
  * `Card.tsx` - Reusable glassmorphic panel.
  * `IconButton.tsx` - Consistent action buttons.
  * `MetricCard.tsx` - Small stat display blocks.
  * `ProgressBar.tsx` - Consistent loading/data state visuals.

### Phase 1: Global Layout Details
* Configured the shell layout (`src/layout/MainLayout.tsx`) utilizing the maximum width setting (`max-w-[1600px]`).
* Created the sticky top navigation (`src/layout/Navbar.tsx`) containing the global branding, responsive page tabs, and user profile utilities.

### Phase 2: Dashboard Overview Page Details
* Created `src/pages/dashboard/DashboardPage.tsx` integrating all widgets into a responsive 12-column grid.
* Implemented the following data widgets:
  * `ProfileWidget.tsx` - User details and compute usage gauge.
  * `ProgressWidget.tsx` - Weekly activity bar chart.
  * `TimeTrackerWidget.tsx` - Circular active compute timer.
  * `TaskProgressWidget.tsx` - Current pipeline execution visualizer.
  * `TimelineWidget.tsx` - Weekly chronological roadmap.
  * `ActivityFeedWidget.tsx` - Chronological feed of system tasks.
  * `DevicesWidget.tsx` - Status list of connected computing nodes.
  * `ResourcesWidget.tsx` - Expandable accordions detailing core infrastructure.

**Status:** The frontend compiles successfully (`npm run build` exits 0) with strict TypeScript checking enabled. All components mapped from `stitch_page.html` have been modularized cleanly into their respective Phase components.
