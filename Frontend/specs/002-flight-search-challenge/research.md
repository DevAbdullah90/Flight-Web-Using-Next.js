# Research: Flight Search Engine Implementation Details

## Decisions

### 1. Amadeus Response Normalization
- **Challenge**: Amadeus separates entity data (Airline names, Aircraft types) into a `dictionaries` root object to reduce payload size.
- **Decision**: Normalization function must ingest both `data` (offers) and `dictionaries`.
- **Logic**:
  - Iterate through `data[i].itineraries[0].segments[j]`.
  - Extract `carrierCode`.
  - Lookup `carrierCode` in `dictionaries.carriers`.
  - Store full Airline Name in the internal `Flight` model.
  - *Rationale*: Frontend UI needs "United Airlines", not "UA". Doing this once during fetch prevents repetitive lookups during rendering.

### 2. Live Price Graph - Time Bucketing
- **Goal**: Visualize price trends throughout the day.
- **Strategy**: Aggregate `filteredFlights` into 4 buckets based on `departureAt`.
- **Buckets**:
  - **Early Morning** (00:00 - 05:59)
  - **Morning** (06:00 - 11:59)
  - **Afternoon** (12:00 - 17:59)
  - **Evening/Night** (18:00 - 23:59)
- **Data Point**: For each bucket, calculate the **Minimum Price** available. (Users care about the cheapest flight in that slot).
- **Recharts Config**:
  - X-Axis: Categorical (The 4 buckets).
  - Y-Axis: Price (Linear).
  - Data Structure: `[{ time: 'Morning', minPrice: 120, count: 5 }, ...]`

### 3. State Management (Zustand)
- **Store Structure**:
  ```typescript
  interface FlightStore {
    rawFlights: Flight[];
    filters: FilterState;
    setFlights: (flights: Flight[]) => void;
    setFilter: (key: keyof FilterState, value: any) => void;
    // Selectors
    getFilteredFlights: () => Flight[];
    getPriceStats: () => { min: number, max: number };
  }
  ```
- **Rationale**: Keeps component logic clean. Selectors handle the "Live Update" requirement efficiently.

## Alternatives Considered
- **Chart.js**: Rejected in favor of Recharts (Constraint).
- **Client-side Fetching (Frontend calls Amadeus)**: Rejected due to security (exposed secret) and CORS.

## References
- Amadeus Dictionary Docs: https://developers.amadeus.com/self-service/category/air/api-doc/flight-offers-search/api-reference
