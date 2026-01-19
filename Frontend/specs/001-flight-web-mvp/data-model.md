# Data Model

## Entities

### FlightOffer
Represents a bookable flight option displayed to the user.

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Unique identifier from Amadeus |
| `price` | Object | Price details |
| `price.total` | String | Total price value |
| `price.currency` | String | Currency code (e.g., EUR, USD) |
| `itineraries` | List[Itinerary] | List of trip legs (only 1 for one-way) |

### Itinerary
Represents the journey.

| Field | Type | Description |
|-------|------|-------------|
| `duration` | String | ISO 8601 duration (e.g., PT2H30M) |
| `segments` | List[Segment] | Individual flights in the itinerary |

### Segment
Represents a single flight leg.

| Field | Type | Description |
|-------|------|-------------|
| `departure` | Object | Departure details |
| `departure.iataCode` | String | Origin airport code |
| `departure.at` | String | Departure timestamp (ISO) |
| `arrival` | Object | Arrival details |
| `arrival.iataCode` | String | Destination airport code |
| `arrival.at` | String | Arrival timestamp (ISO) |
| `carrierCode` | String | Airline code |
| `number` | String | Flight number |

## Validation Rules
- `origin` != `destination`
- `date` >= Today
- `origin`, `destination`: 3-letter IATA code format (Regex: `^[A-Z]{3}$`)
