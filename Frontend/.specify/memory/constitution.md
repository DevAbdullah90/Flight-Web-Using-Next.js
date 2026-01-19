<!--
Sync Impact Report:
- Version change: New -> 1.0.0
- Added Principles:
  - Conventions & Consistency
  - Minimal Dependencies
  - Idiomatic Implementation
  - Verification & Quality
  - Security First
  - Documentation & Transparency
  - Operational Safety
- Templates checked:
  - plan-template.md: ✅
  - spec-template.md: ✅
  - tasks-template.md: ✅
-->

# Flight Web Constitution

## Core Principles

### I. Conventions & Consistency
Rigorously adhere to existing project conventions when reading or modifying code. Analyze surrounding code, tests, and configuration first. Mimic the style (formatting, naming), structure, framework choices, typing, and architectural patterns of existing code.

### II. Minimal Dependencies
NEVER assume a library or framework is available or appropriate. Verify its established usage within the project (check imports, configuration files like `package.json`, `Cargo.toml`, etc.) before employing it. Do not introduce new dependencies without explicit necessity and user confirmation.

### III. Idiomatic Implementation
When editing, understand the local context (imports, functions/classes) to ensure changes integrate naturally and idiomatically. Comments should focus on *why*, not *what*, and be added sparingly. Do not revert changes unless explicitly requested or to fix an error caused by the agent.

### IV. Verification & Quality
Fulfill requests thoroughly, including adding tests to ensure quality. Verification is mandatory: identify and execute project-specific build, linting, and type-checking commands (e.g., `tsc`, `npm run lint`) after changes. Never assume standard test commands; discover them from context.

### V. Security First
Always apply security best practices. Never introduce code that exposes, logs, or commits secrets, API keys, or other sensitive information. Prioritize user safety in all operations.

### VI. Documentation & Transparency
Record every user input verbatim in a Prompt History Record (PHR). For architecturally significant decisions (impacting long-term maintenance, security, or structure), suggest creating an Architectural Decision Record (ADR) using `/sp.adr`. Do not auto-create ADRs.

### VII. Operational Safety
Before executing commands that modify the file system or system state, provide a brief explanation of the command's purpose and impact. Use `save_memory` only for user-specific facts, not general project context.

## Governance

### Amendment Process
Amendments to this Constitution require explicit user approval and must be documented with a version bump.
- **Major (X.0.0)**: Fundamental changes to principles or governance.
- **Minor (x.Y.0)**: Addition of new principles or significant expansion of guidance.
- **Patch (x.y.Z)**: Clarifications, typos, or non-semantic refinements.

### Compliance
All plans (`/sp.plan`) must include a Constitution Check to verify alignment with these principles. Deviations must be explicitly justified in the complexity tracking section of the plan.

**Version**: 1.0.0 | **Ratified**: 2026-01-16 | **Last Amended**: 2026-01-16