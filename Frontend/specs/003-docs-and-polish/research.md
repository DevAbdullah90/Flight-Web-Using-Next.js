# Research: Documentation Strategy

## Decisions

### 1. Architecture Diagram
- **Decision**: Use Mermaid.js `graph TD` in README.
- **Rationale**: GitHub renders Mermaid natively. It's editable as code.

### 2. Loom Outline Structure
- **Decision**: Scripted "talking points" rather than full screenplay.
- **Sections**:
  1. **Hook**: "This is a production-ready Flight Search MVP..."
  2. **Tech**: "Built with Next.js App Router for security..."
  3. **Demo**: "Watch the live graph update instantly..."
  4. **Code**: "Here is the normalization logic..."

## Alternatives Considered
- **PNG Diagrams**: Hard to update. Rejected.
- **PDF Docs**: Not web-native. Rejected.
