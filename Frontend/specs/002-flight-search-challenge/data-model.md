# Data Model (Normalized)

## Internal Application Model

### Flight
The single source of truth for the frontend UI, normalized from Amadeus JSON.

| Field | Type | Description | Source (Amadeus) |
|-------|------|-------------|------------------|
| `id` | `string` | Unique ID | `data.id` |
| `airline` | `string` | Full Airline Name | `data...carrierCode` + `dictionaries.carriers` |
| `flightNumber` | `string` | Flight Number (e.g., "UA 123") | `data...number` |
| `departureAt` | `string` | Departure ISO Timestamp | `data...departure.at` |
| `arrivalAt` | `string` | Arrival ISO Timestamp | `data...arrival.at` |
| `duration` | `string` | Human readable duration (e.g., "2h 45m") | `data...duration` (Parsed ISO PT2H45M) |
| `price` | `number` | Total Price (float) | `data.price.total` (Parsed string) |
| `currency` | `string` | Currency Code | `data.price.currency` |
| `stops` | `number` | Number of stops | `data...segments.length - 1` |

### FilterState
State object controlling the displayed subset of flights.

| Field | Type | Description |
|-------|------|-------------|
| `minPrice` | `number` | Minimum price slider value |
| `maxPrice` | `number` | Maximum price slider value |
| `airlines` | `string[]` | Selected airline names (empty = all) |
| `stops` | `number[]` | Selected stop counts (e.g. [0, 1]) |
| `timeRanges` | `string[]` | Selected buckets (e.g. ["Morning"]) |

## Transformation Logic
1.  **Parsing**: Convert `price` string "120.50" to float `120.50` for sorting/filtering.
2.  **Lookup**: Resolve airline codes against dictionaries.
3.  **Formatting**: Convert PT format durations to readable strings.
