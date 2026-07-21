# UI Quality Standards

## Must

- Use semantic landmarks, headings, lists, tables, buttons, links, and form controls before adding ARIA.
- Give every control an accessible name and keep the full flow usable by keyboard with visible focus.
- Target WCAG 2.2 AA contrast, reflow, target size, status-message, and input-assistance expectations.
- Support narrow mobile, tablet, and wide desktop layouts without page-level horizontal overflow.
- Provide understandable loading, empty, error, success, disabled, and retry behavior wherever those states can occur.
- Keep client-side data deterministic in examples, validate untrusted input, avoid unsafe HTML, and never place secrets in a browser bundle.
- Run the repository's lint, type, unit, browser, accessibility, and production-build checks before declaring completion.

## Should

- Reuse design tokens and existing components; keep new patterns visually and behaviorally consistent.
- Provide a text summary or data table for charts and other information-rich visuals.
- Respect reduced-motion preferences and avoid motion that is required to understand the interface.
- Prefer small, well-supported dependencies and lazy-load code only when it improves the actual user path.
- Test critical navigation, filtering, submission, recovery, and state transitions at the behavior level.
- Document any deliberate exception with its reason, impact, and follow-up owner.

## Review output

Summarize findings in this order: blocking must-fix issues, important should-fix issues, checks completed, and manual checks still required. Point to exact files or components when possible.
