# Loom Walkthrough Outline

**Goal**: Demonstrate the Flight Search Engine MVP's capabilities, focusing on the technical challenge requirements.

## 1. Introduction (0:00 - 0:30)
- **Hook**: "Hi, I'm [Name]. This is my submission for the Frontend Engineering Challenge: a high-performance Flight Search Engine."
- **Stack**: Briefly mention Next.js App Router, Tailwind, Recharts, and Amadeus API.

## 2. Core Search Demo (0:30 - 1:30)
- **Action**: Enter "JFK" -> "LHR" -> Select Date -> Click Search.
- **Highlight**:
  - Auto-suggest behavior (if implemented) or smooth input.
  - Loading skeleton state (Perceived performance).
  - Successful data load (List + Graph appearing).

## 3. Data Visualization & Filtering (1:30 - 3:00)
- **Action**: Drag the "Max Price" slider.
- **Highlight**: **"Live Update"**. Point out how the Graph AND List update instantly without reloading.
- **Action**: Uncheck an Airline.
- **Highlight**: Graph re-scales (Y-Axis changes) based on the new data subset.
- **Action**: Filter by "Morning" flights.
- **Explain**: "This filtering happens client-side using a normalized data model for maximum speed."

## 4. Mobile Responsiveness (3:00 - 3:45)
- **Action**: Switch DevTools to Mobile View (iPhone).
- **Highlight**:
  - Clean vertical layout.
  - "Filters" button appearing.
  - Drawer/Modal opening for filters.
  - Graph adapting to screen width.

## 5. Code Walkthrough (3:45 - 5:00)
- **Architecture**: Show `api/search/route.ts`. Explain the Proxy pattern for hiding secrets.
- **Normalization**: Show `normalize.ts`. Explain mapping dictionaries to flat objects.
- **State**: Show `useFlightStore.ts` and `selectors.ts`. Explain specific Separation of Concerns (Raw vs Derived Data).

## 6. Closing (5:00+)
- **Summary**: "The app meets all functional requirements: Live Graph, Complex Filtering, Responsive Design, and robust Error Handling."
- **Outro**: "Thank you for reviewing."
