---
description: "Task list for Documentation and Polish"
---

# Tasks: Documentation & Polish

**Input**: Design documents from `specs/003-docs-and-polish/`
**Prerequisites**: plan.md, spec.md, research.md

## Phase 1: User Story 1 - Error Handling (Priority: P1)

**Goal**: Ensure users are informed of errors and empty states clearly

**Independent Test**: Disconnect network/use bad API key and see Error Alert

- [ ] T001 [US1] Update Store: Ensure `error` state is cleared on new search in `src/store/useFlightStore.ts`
- [ ] T002 [US1] Implement Error UI: Add dismissible red error alert to `src/app/page.tsx`
- [ ] T003 [US1] Verify Empty State: Ensure "No flights found" message appears in `src/components/ResultsList.tsx`

**Checkpoint**: Error handling is robust and visible

## Phase 2: User Story 2 - Documentation (Priority: P1)

**Goal**: Comprehensive developer documentation

**Independent Test**: Read README and successfully setup project

- [ ] T004 [US2] Create README: Write `README.md` at root with Architecture (Mermaid), Data Flow, and Setup steps

## Phase 3: User Story 3 - Demo Prep (Priority: P2)

**Goal**: Structured walkthrough guide

**Independent Test**: Review outline against feature set

- [ ] T005 [US3] Create Loom Outline: Write `LOOM_OUTLINE.md` with script for the demo video

## Implementation Strategy

1.  **Code First**: Fix the Error UI.
2.  **Docs Second**: Write the README based on the final code state.
3.  **Script Last**: Outline the demo based on the finished product.
