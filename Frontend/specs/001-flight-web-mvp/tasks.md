---
description: "Task list for Flight Web MVP implementation"
---

# Tasks: Flight Web MVP

**Input**: Design documents from `specs/001-flight-web-mvp/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/, research.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and environment configuration

- [ ] T001 Create project directories (`backend/`, `frontend/`)
- [ ] T002 Initialize Backend: Setup Python venv, install FastAPI, Uvicorn, httpx in `backend/`
- [ ] T003 Initialize Frontend: Create React+Vite app with Tailwind CSS in `frontend/`
- [ ] T004 [P] Configure Backend Environment: Create `.env` loading for AMADEUS_CLIENT_ID/SECRET in `backend/config.py`

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core Amadeus integration that MUST be complete before user stories can operate

**⚠️ CRITICAL**: No user story work can begin until the backend proxy is functional

- [ ] T005 Define Pydantic Models: Create `FlightOffer`, `Itinerary`, `Segment` schemas in `backend/models.py`
- [ ] T006 Implement Amadeus Auth: Create `AmadeusClient` class with OAuth2 token handling in `backend/amadeus_client.py`
- [ ] T007 Implement Search Proxy: Add `search_flights` method to `AmadeusClient` calling `GET /v2/shopping/flight-offers` in `backend/amadeus_client.py`
- [ ] T008 Expose API Endpoint: Implement `GET /api/search` route using `AmadeusClient` in `backend/main.py`
- [ ] T009 [P] Configure CORS: Allow frontend origin in `backend/main.py`

**Checkpoint**: Backend API is running and can return flight data from Amadeus (verify via Swagger UI)

## Phase 3: User Story 1 - Flight Search (Priority: P1)

**Goal**: Users can enter search criteria and trigger a search request

**Independent Test**: Verify Search Form renders and logs correct parameters on submit

- [ ] T010 [P] [US1] Create API Service: Implement `searchFlights` function using fetch/axios in `frontend/src/services/api.ts`
- [ ] T011 [P] [US1] Create Search Form: Build component with Origin, Destination, Date inputs in `frontend/src/components/SearchForm.tsx`
- [ ] T012 [US1] Implement Validation: Prevent same origin/dest and past dates in `frontend/src/components/SearchForm.tsx`
- [ ] T013 [US1] Integrate Search: Connect Form submit to `searchFlights` API call in `frontend/src/App.tsx`

**Checkpoint**: User can submit form and see API response in console network tab

## Phase 4: User Story 2 - Flight Results Display (Priority: P1)

**Goal**: Users can see the list of available flights

**Independent Test**: Verify Flight Cards display correct data from mock/real response

- [ ] T014 [P] [US2] Create Flight Card: Build UI component to display Price, Airline, Duration in `frontend/src/components/FlightCard.tsx`
- [ ] T015 [P] [US2] Create Results List: Component to map over offers and render Cards in `frontend/src/components/ResultsList.tsx`
- [ ] T016 [US2] Implement Loading State: specific UI for "Searching..." in `frontend/src/App.tsx`
- [ ] T017 [US2] Implement Empty State: Display "No flights found" message in `frontend/src/components/ResultsList.tsx`

**Checkpoint**: Search results are rendered visually on the page

## Phase 5: User Story 3 - Flight Selection (Priority: P2)

**Goal**: Users can select a flight and see confirmation

**Independent Test**: Clicking "Select" updates UI state

- [ ] T018 [P] [US3] Create Selection State: Add `selectedFlight` state in `frontend/src/App.tsx`
- [ ] T019 [US3] Implement Select Action: Add "Select" button to `FlightCard.tsx` and handle click
- [ ] T020 [US3] Create Summary View: Component to display selected flight details in `frontend/src/components/FlightSummary.tsx`

**Checkpoint**: User can select a flight and see the summary view

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Error handling and UI refinement

- [ ] T021 Implement Error Handling: Display API errors (e.g., Amadeus down) via toast/alert in `frontend/src/App.tsx`
- [ ] T022 [P] Refine UI Styling: Polish Tailwind classes for spacing and typography in all components
- [ ] T023 Run Quickstart Verification: Validate full flow against `specs/001-flight-web-mvp/quickstart.md`

## Dependencies & Execution Order

1. **Setup & Foundation**: T001-T009 must be done first. Backend is the critical path.
2. **Frontend Parallelism**: Once T008 is done, US1 (Search Form) and US2 (Flight Card) can technically be built in parallel using the agreed contract.
3. **Integration**: T013 connects US1 and Backend.

## Implementation Strategy

1. **Backend First**: Build the Proxy API to Amadeus. This de-risks the external dependency.
2. **Frontend MVP**: Build Search Form + Raw JSON Display (US1).
3. **UI Polish**: Convert Raw JSON to Flight Cards (US2).
4. **Interaction**: Add Selection logic (US3).
