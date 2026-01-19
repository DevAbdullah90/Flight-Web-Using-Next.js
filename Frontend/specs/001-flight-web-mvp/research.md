# Research: Amadeus API Integration

## Decisions

### 1. Flight Search Endpoint
- **Decision**: Use `GET /v2/shopping/flight-offers`
- **Rationale**: Standard endpoint for searching flight availability and pricing. Supports simple one-way search parameters (`originLocationCode`, `destinationLocationCode`, `departureDate`, `adults`).
- **Parameters**:
  - `originLocationCode`: IATA code (e.g., JFK)
  - `destinationLocationCode`: IATA code (e.g., LHR)
  - `departureDate`: YYYY-MM-DD
  - `adults`: Integer (default 1 for MVP)
  - `max`: Limit results (e.g., 10) to improve performance.

### 2. Authentication
- **Decision**: OAuth2 Client Credentials Flow
- **Rationale**: Server-to-Server authentication is required to keep API keys secure.
- **Flow**:
  1. App starts/Request received.
  2. Check if valid token exists in memory.
  3. If not, POST to `/v1/security/oauth2/token` with `grant_type=client_credentials`, `client_id`, `client_secret`.
  4. Use `access_token` in `Authorization: Bearer <token>` header for search requests.

### 3. Backend Proxy Strategy
- **Decision**: FastAPI Proxy
- **Rationale**:
  - Hides Amadeus credentials from the frontend (Security Principle).
  - Can cache tokens to avoid rate limits/latency.
  - Transforms complex Amadeus response into a simpler frontend-friendly contract if needed (but for MVP, passing through or lightweight filtering is best).

## Alternatives Considered

- **Direct Frontend Call**: Rejected due to security risk (exposing API keys) and CORS issues.
- **Amadeus Node SDK**: Rejected to minimize dependencies (Principle II) and because `httpx` in Python is sufficient and lightweight for a simple proxy.

## References
- Amadeus for Developers Docs: https://developers.amadeus.com/self-service/category/air/api-doc/flight-offers-search/
