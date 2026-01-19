# Feature Specification: Flight Search Engine MVP (Frontend Challenge)

**Feature Branch**: `002-flight-search-challenge`
**Created**: 2026-01-16
**Status**: Draft
**Context**: Frontend Engineering Challenge - Senior Web Developer Role

## 1. Product Overview

**Goal**: Build a high-performance, data-heavy Flight Search Engine MVP.
**Target Audience**: Users searching for one-way flights who need advanced filtering and price analysis tools.
**Problem Solved**: Demonstrates the ability to handle live API data, normalize complex JSON structures, and visualize price trends efficiently in a modern React application.

## 2. User Scenarios & Testing (User Flow)

### User Story 1 - Search & Discovery (Priority: P1)
As a user, I want to search for flights and see results immediately so I can evaluate options.

**Acceptance Scenarios**:
1. **Search**: User enters Origin, Destination, Date, Passengers. Click "Search".
2. **Loading**: "Searching for flights..." skeleton loader appears.
3. **Empty**: If no flights, display "No flights found for this criteria".
4. **Error**: If API fails, display "Unable to fetch flights. Please try again."
5. **Results**: List of flight cards appears with Live Price Graph above it.

### User Story 2 - Advanced Filtering (Priority: P1)
As a user, I want to filter results by price, airline, and duration to find the best flight.

**Acceptance Scenarios**:
1. **Filter Application**: Changing the "Max Price" slider instantly updates the Results List and Price Graph.
2. **Synchronization**: The Price Graph X/Y axis re-scales based on the filtered dataset.
3. **No Matches**: If filters exclude all flights, show "No flights match your filters".

## 3. Requirements (Functional)

### Functional Requirements
- **FR-001 Search Inputs**:
  - Origin/Destination: Text input (IATA code validation).
  - Date: Date picker (Future dates only).
  - Passengers: Number input (1-9).
- **FR-002 Flight Results List**:
  - Display Flight Card: Airline Logo, Name, Dep/Arr Time, Duration, Price.
  - Pagination/Infinite Scroll is NOT required (render all, virtualize if needed).
- **FR-003 Live Price Graph**:
  - Visualization: Line/Area chart using Recharts.
  - X-Axis: Departure Time bucket (e.g., morning, afternoon).
  - Y-Axis: Price.
  - Tooltip: Show specific flight details on hover.
- **FR-004 Complex Filtering**:
  - **Price Range**: Slider (Min/Max).
  - **Airlines**: Multi-select checkboxes (derived from current result set).
  - **Stops**: Checkbox (Direct, 1 Stop, 2+ Stops).
  - **Departure Time**: Ranges (Morning, Afternoon, Evening).

## Technical Architecture & Logic (Sections 4-10)

### 4. Data Source & Backend Interaction
- **Source**: Amadeus Self-Service API (Test Env).
- **Proxy Requirement**: A Next.js API Route (`/api/search`) is MANDATORY to:
  1. Hide Amadeus `client_secret`.
  2. Handle OAuth2 Token exchange/caching on the server.
  3. Avoid CORS issues with external APIs.
- **Lifecycle**: Frontend calls Next.js API -> Next.js calls Amadeus -> Returns JSON to Frontend.

### 5. Data Normalization
**Requirement**: Convert raw Amadeus nested JSON into a flat, type-safe internal model.
**Internal Model (`Flight` interface)**:
- `id`: string
- `airline`: string (Name)
- `flightNumber`: string
- `departureAt`: ISO String
- `arrivalAt`: ISO String
- `duration`: string (formatted)
- `price`: number (float)
- `stops`: number
**Why**: Decouples UI from API schema changes and simplifies filtering logic.

### 6. Filtering Logic
- **Principle**: Client-side filtering on the *normalized* dataset.
- **Truth**: `normalizedFlights` is the immutable source. `filteredFlights` is the derived state displayed in UI.
- **Composition**: Filters are additive (AND logic). A flight must pass ALL active filters to be shown.

### 7. Live Price Graph Behavior
- **Representation**: Visualizes the distribution of flight prices over the day.
- **Sync**: Must observe `filteredFlights`. If user filters out "United Airlines", the graph removes United's data points immediately.
- **"Live Update"**: Refers to instantaneous client-side UI updates upon filter interaction, not websocket real-time pricing.

### 8. State Management Strategy
- **Store**: React Context or Zustand (recommended for cleaner separation).
- **Separation**:
  - `rawFlights`: Immutable, fetched once.
  - `filters`: Object storing current filter values.
  - `filteredFlights`: Memoized selector (`useMemo`) derived from `rawFlights` + `filters`.
- **Performance**: Avoid re-rendering the entire app on every slider move (debounce if necessary, though <100 items is fast).

### 9. Responsive Design Requirements
- **Desktop**: Split view or Dashboard layout. Filters on sidebar/top, Results + Graph in main area.
- **Mobile**:
  - Filters collapse into a Drawer/Modal.
  - Graph stacks above or below results (or hides on very small screens if specified).
  - Flight Cards optimized for narrow width (vertical layout).

### 10. Non-Goals
- User Authentication / User Accounts.
- Flight Booking / Payment Processing.
- Round-trip or Multi-city search.
- SSR for search results (Client-side fetching is acceptable for this dynamic search tool).
- Persistent state (refreshing clears results).

## 11. Success Criteria

### Measurable Outcomes
- **SC-001 Quality**: 0 Type errors (Strict TypeScript).
- **SC-002 Completeness**: All 4 filter types function correctly and update Graph + List simultaneously.
- **SC-003 Performance**: Google Lighthouse Performance score > 90.
- **SC-004 Code**: Separation of concerns (UI components vs Data logic vs API logic) is evident.