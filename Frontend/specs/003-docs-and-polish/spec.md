# Feature Specification: Documentation & Polish

**Feature Branch**: `003-docs-and-polish`
**Created**: 2026-01-16
**Status**: Draft
**Context**: Finalizing the Flight Search Engine MVP for handover.

## User Scenarios & Testing

### User Story 1 - Error Handling (Priority: P1)
As a user, I want to see clear messages when something goes wrong (e.g., API failure, no flights) so I know what to do next.

**Acceptance Scenarios**:
1. **API Error**: If Amadeus fails (500), show a red error alert: "Unable to search flights. Please try again later."
2. **Empty State**: If search returns 0 results, show "No flights found for [Origin] to [Dest] on [Date]."
3. **Recovery**: Clicking "Search" again clears the error state.

### User Story 2 - Documentation (Priority: P1)
As a developer/reviewer, I want a comprehensive README so I can understand the architecture, data flow, and how to run the project.

**Acceptance Scenarios**:
1. **README**: Contains "Architecture" section explaining Next.js Proxy -> Amadeus.
2. **Setup**: Contains clear "Getting Started" steps (Env vars, npm run dev).
3. **Data Flow**: Explains Normalization logic (Dictionaries -> Flat Model).

### User Story 3 - Demo Prep (Priority: P2)
As a presenter, I want a structured outline for the Loom walkthrough so I can demonstrate the features effectively.

**Acceptance Scenarios**:
1. **Outline**: `LOOM_OUTLINE.md` exists with script for: Intro, Tech Stack, Search Demo, Filtering Demo, Graph Sync, Mobile View, Code Walkthrough.

## Requirements

### Functional Requirements
- **FR-001**: Implement global error state in Zustand store (`error` string).
- **FR-002**: Display error alerts in `page.tsx` (above results).
- **FR-003**: Create `README.md` at root (overwrite default Next.js one).
- **FR-004**: Create `LOOM_OUTLINE.md` in root.

## Success Criteria

### Measurable Outcomes
- **SC-001**: `README.md` passes visual review (Headings, Code blocks).
- **SC-002**: Simulating an API error (disconnect network or bad URL) triggers the Error Alert.
- **SC-003**: `LOOM_OUTLINE.md` covers all 11 specs from the Challenge prompt.