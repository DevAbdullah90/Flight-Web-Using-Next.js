# Feature Specification: Flight Web MVP

**Feature Branch**: `001-flight-web-mvp`
**Created**: 2026-01-16
**Status**: Draft
**Input**: User description: "i sucessfully connected the git repo with this now you can proceed with your operation" (Context: Project named "Flight Web")

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Flight Search (Priority: P1)

As a traveler, I want to search for flights by entering my origin, destination, and travel dates so that I can see available options.

**Why this priority**: Core functionality of any flight application. Without search, the application provides no value.

**Independent Test**: Can be tested by entering valid/invalid search criteria and verifying the results list is populated or appropriate error messages are shown.

**Acceptance Scenarios**:

1. **Given** the user is on the homepage, **When** they enter a valid Origin (e.g., "JFK"), Destination (e.g., "LHR"), and Date, **Then** a list of available flights matches the criteria is displayed.
2. **Given** the user is on the homepage, **When** they attempt to search without filling mandatory fields, **Then** a validation error prevents the search.
3. **Given** the user enters the same Origin and Destination, **When** they click search, **Then** an error message explains that origin and destination must be different.

---

### User Story 2 - Flight Results Display (Priority: P1)

As a user, I want to view key details for each flight option (price, duration, airline) so that I can compare them effectively.

**Why this priority**: Users need specific information to make a decision.

**Independent Test**: Verify that the search results card contains all required fields (Price, Time, Carrier) formatted correctly.

**Acceptance Scenarios**:

1. **Given** a list of search results, **When** the page loads, **Then** each flight card displays the Airline Name, Departure Time, Arrival Time, Duration, and Price.
2. **Given** no flights match the search criteria, **When** the search completes, **Then** a "No flights found" message is displayed clearly.

---

### User Story 3 - Flight Selection (Priority: P2)

As a user, I want to select a flight and see a summary of my selection so that I can proceed towards booking.

**Why this priority**: The next step in the funnel after search.

**Independent Test**: Select a flight and verify the selection state/summary page.

**Acceptance Scenarios**:

1. **Given** a list of flights, **When** the user clicks "Select" on a specific flight, **Then** the flight details are highlighted or the user is navigated to a summary view.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow users to input 3-letter IATA airport codes or city names for Origin and Destination.
- **FR-002**: The system MUST allow users to select a travel date via a date picker.
- **FR-003**: The system MUST prevent selection of past dates for departure.
- **FR-004**: The system MUST retrieve flight offers from the **Amadeus Self-Service API** based on the user's search criteria.
- **FR-005**: The system MUST show a loading state while fetching flight data.
- **FR-006**: The system MUST support **One-way** flight searches only for this MVP.

### Key Entities

- **Flight**: Represents a single flight option (ID, Airline, Flight Number, Departure Time, Arrival Time, Price, Origin, Destination).
- **SearchCriteria**: The user's input parameters (Origin, Destination, Date).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can perform a search and see results (or empty state) in under 2 seconds (excluding external API latency).
- **SC-002**: 100% of valid searches return a structured list of flights from Amadeus.
- **SC-003**: Invalid inputs (empty fields, past dates) trigger validation errors 100% of the time.

## Assumptions

- **Data Source**: The application will use the **Amadeus Self-Service API** (Test environment). User/System must provide valid API credentials.
- **Auth**: No user authentication is required for the MVP search functionality.
- **Payment**: Payment processing is out of scope for this MVP; "Booking" stops at selection/summary.
- **Scope**: Round-trip flights are explicitly out of scope for the MVP.

## Resolved Clarifications

- **Data Source**: Amadeus Self-Service API selected.
- **Scope**: One-way flights only selected.