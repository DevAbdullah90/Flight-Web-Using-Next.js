---
description: "Task list for Flight Search Challenge MVP"
---

# Tasks: Flight Search Challenge MVP

**Input**: Design documents from `specs/002-flight-search-challenge/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/, research.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize Next.js environment and dependencies

- [ ] T001 Initialize Next.js App: Create project with `npx create-next-app` (App Router, Tailwind) in `src/`
- [ ] T002 Install Dependencies: Add `recharts`, `zustand`, `axios`, `lucide-react`, `clsx`, `tailwind-merge`
- [ ] T003 Configure Environment: Setup `.env.local` loading for Amadeus keys in `src/lib/config.ts`

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core Data Model, State Management, and Backend Proxy

**⚠️ CRITICAL**: Must normalize Amadeus data before UI can render anything

- [ ] T004 Define Types: Create `Flight` and `FilterState` interfaces in `src/lib/types.ts` (match `data-model.md`)
- [ ] T005 Implement Normalization: Write `normalizeFlightData` function to map API response + dictionaries to `Flight[]` in `src/lib/normalize.ts`
- [ ] T006 Implement Backend Proxy: Create GET handler for Amadeus Auth + Search in `src/app/api/search/route.ts`
- [ ] T007 Create Zustand Store: Setup `useFlightStore` with `rawFlights`, `filters`, and actions in `src/store/useFlightStore.ts`

**Checkpoint**: `GET /api/search` returns normalized JSON. Store is ready to receive data.

## Phase 3: User Story 1 - Search & Discovery (Priority: P1)

**Goal**: Users can search for flights and see a list of results

**Independent Test**: Enter "JFK" -> "LHR" and see flight cards appear

- [ ] T008 [P] [US1] Create API Client: Implement `fetchFlights` calling `/api/search` in `src/lib/api.ts`
- [ ] T009 [P] [US1] Create Search Form: Component with Origin, Dest, Date, Passengers inputs in `src/components/SearchForm.tsx`
- [ ] T010 [P] [US1] Create Flight Card: Component displaying Airline, Time, Price, Duration in `src/components/FlightCard.tsx`
- [ ] T011 [P] [US1] Create Results List: Component to map and render FlightCards in `src/components/ResultsList.tsx`
- [ ] T012 [US1] Integrate Search Flow: Connect SearchForm to API and Store updates in `src/app/page.tsx`

**Checkpoint**: Full search loop working. Data flows from API -> Store -> UI.

## Phase 4: User Story 2 - Advanced Filtering (Priority: P1)

**Goal**: Users can filter results and see live updates in List and Graph

**Independent Test**: Dragging slider updates Graph and List instantly

- [ ] T013 [P] [US2] Implement Filter Logic: Create `selectFilteredFlights` selector in `src/store/selectors.ts`
- [ ] T014 [US2] Create Filter Sidebar: UI with Price Slider, Airline Checkboxes, Time Buttons in `src/components/FilterSidebar.tsx`
- [ ] T015 [P] [US2] Implement Analytics Logic: Create `aggregatePriceBuckets` function for Graph data in `src/lib/analytics.ts`
- [ ] T016 [US2] Create Price Graph: Recharts component using aggregated data in `src/components/PriceGraph.tsx`
- [ ] T017 [US2] Integrate Filters: Connect Sidebar to Store and render Graph in `src/app/page.tsx`

**Checkpoint**: Filters affect both List and Graph. Graph re-scales dynamically.

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Responsive Design and Performance

- [ ] T018 Implement Mobile Layout: Wrap FilterSidebar in a Drawer/Sheet for mobile in `src/components/MobileFilterDrawer.tsx`
- [ ] T019 Implement Loading States: Add Skeleton loaders for Card and Graph in `src/components/ui/Skeleton.tsx`
- [ ] T020 Optimize Performance: Ensure filter selectors are memoized to prevent re-renders

## Dependencies & Execution Order

1. **Foundational**: Backend Proxy (T006) and Normalization (T005) block everything.
2. **Parallel**:
   - UI Components (T009, T010, T014, T016) can be built in parallel with Store logic.
   - Graph Logic (T015) is independent of UI.
3. **Integration**: T012 and T017 are the integration points.

## Implementation Strategy

1. **Backend & Data**: Get normalized data flowing first.
2. **Search UI**: Build the basic search loop.
3. **Filter Logic**: Implement the "Client-side Truth" logic.
4. **Visuals**: Add the Graph and Polish.
