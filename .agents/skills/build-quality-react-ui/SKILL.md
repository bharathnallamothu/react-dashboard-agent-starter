---
name: build-quality-react-ui
description: Build or review accessible, responsive React interfaces with complete data states and reliable verification. Use for creating pages or components, changing interactive UI, reviewing frontend quality, or fixing accessibility, responsive, loading, empty, error, and consistency issues in React applications.
---

# Build Quality React UI

## Workflow

1. Read the closest repository guidance and inspect existing components, tokens, routes, tests, and commands.
2. Read [the UI standards](references/ui-standards.md) before implementing or reviewing an interface.
3. Preserve established patterns unless a requested change clearly requires a new one.
4. Implement the smallest coherent change, including every applicable data and interaction state.
5. Verify semantics, keyboard flow, visible focus, responsive behavior, contrast, safe client behavior, and accessible alternatives for visual information.
6. Run the repository's lint, type, unit, browser, accessibility, and build checks that apply.
7. Report the behavior changed, checks run, remaining exceptions, and any manual verification still needed.

Treat automated accessibility results as evidence, not proof. Perform a focused manual check for keyboard use, focus order, labels, reading order, and responsive reflow.

Do not add a dependency when the existing platform, component system, or a small local implementation can solve the problem clearly.
