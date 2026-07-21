# Repository Guidance

## Purpose

Maintain this repository as a beginner-friendly React SPA and teaching example. Prefer plain language, small components, and visible UI states over clever abstractions.

## Commands

- Install with `npm ci`.
- Develop with `npm run dev`.
- Run the standard quality gate with `npm run check`.
- Run browser and accessibility tests with `npm run test:e2e`.
- Build the production bundle with `npm run build`.

## UI expectations

- Use semantic HTML, labeled controls, keyboard access, visible focus, and WCAG 2.2 AA contrast targets.
- Keep layouts usable from 320px through wide desktop screens without page-level horizontal overflow.
- Handle loading, empty, error, success, and retry states for data-driven UI.
- Reuse existing CSS variables and components before adding a new pattern or dependency.
- Keep fictional data deterministic and never place secrets in client code.

Use the `build-quality-react-ui` skill for UI creation or review work. A change is complete only after relevant automated checks pass and manual behavior has been reviewed.
