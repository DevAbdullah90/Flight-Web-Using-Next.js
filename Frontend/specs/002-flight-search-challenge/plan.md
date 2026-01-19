# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a high-performance Flight Search Engine MVP using Next.js App Router, Tailwind CSS, and Recharts. The solution features a normalized data model, client-side filtering, and a live price graph synchronized with search results, proxying Amadeus API requests via Next.js API routes for security.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+
**Primary Dependencies**: Next.js 14+ (App Router), Tailwind CSS, Recharts, Zustand (State), Axios/Fetch
**Storage**: N/A (In-memory state)
**Testing**: Vitest (Unit), React Testing Library
**Target Platform**: Vercel (Web)
**Project Type**: Full-stack Next.js Application
**Performance Goals**: Lighthouse > 90, Instant filter updates (<100ms)
**Constraints**: One-way flights only, No Auth/Payments, Live Price Graph
**Scale/Scope**: Challenge MVP (Single user session focus)

**Research Needed**:
- [NEEDS CLARIFICATION: Amadeus 'dictionaries' parsing strategy for Airline names]
- [NEEDS CLARIFICATION: Recharts time-bucketing for X-Axis (Morning/Afternoon/Evening)]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Conventions**: Next.js App Router structure (`app/`).
- **Dependencies**: Recharts (Mandated), Zustand (Mandated). Matches "Minimal Dependencies" principle by avoiding heavy UI component libraries where Tailwind suffices.
- **Security**: Amadeus `client_secret` hidden in Next.js API route.
- **Verification**: Strict TypeScript checks (SC-001).

## Project Structure

### Documentation (this feature)

```text
specs/002-flight-search-challenge/
├── plan.md              # This file
├── research.md          # Implementation details
├── data-model.md        # Normalized schema
├── quickstart.md        # Setup guide
├── contracts/           # API schemas
└── tasks.md             # Implementation steps
```

### Source Code (repository root)

```text
# Next.js App Router Structure
src/
├── app/
│   ├── api/
│   │   └── search/      # Backend Proxy
│   ├── components/      # UI Components
│   ├── lib/             # Utilities (Normalization, API Client)
│   ├── store/           # Zustand State
│   └── page.tsx         # Main Search Page
```

**Structure Decision**: Standard Next.js App Router with `src/` directory.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
