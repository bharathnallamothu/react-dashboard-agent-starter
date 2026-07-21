# Engineering Pulse: React Dashboard + AI Guardrails

A beginner-friendly React single-page application used in a 30-minute team learning session. It connects four ideas through one example: SPA navigation, React components and state, AI-assisted development, and reusable UI quality standards.

Public GitHub template: [react-dashboard-agent-starter](https://github.com/bharathnallamothu/react-dashboard-agent-starter)

## Quick start

```bash
npm ci
npm run dev
```

Open `http://localhost:5173`. Run the complete local quality gate with:

```bash
npm run check
npm run test:e2e
npm run build
```

## The beginner mental model

- **SPA:** the browser loads one document, then React and React Router update the visible view without a full-page reload.
- **Component:** a reusable part of the screen, such as a metric card, filter, chart, or activity table.
- **State:** information that can change while the app is open. Here, the selected team and time range are state.
- **Route:** a URL mapped to a view. This starter provides `/` and `/activity`.
- **Data flow:** a filter changes state, the mock service returns data, and React renders the new result.

Try `/?demo=empty` and `/?demo=error` to inspect complete data states.

## Use an AI coding agent

The repository gives an agent two kinds of reusable context:

- `AGENTS.md` contains always-on repository conventions. Claude Code reads the same guidance through `CLAUDE.md`.
- `build-quality-react-ui/SKILL.md` contains an on-demand workflow for building or reviewing interface changes.

The skill is mirrored for automatic project discovery:

- Codex: `.agents/skills/build-quality-react-ui/`
- Claude Code: `.claude/skills/build-quality-react-ui/`

Three useful prompts:

1. `Use $build-quality-react-ui to add a deployment-frequency metric. Reuse the existing card pattern and run the repository checks.`
2. `Review the dashboard filters with $build-quality-react-ui. Fix keyboard, focus, responsive, or state-handling problems you find.`
3. `Use $build-quality-react-ui to add a service-health view at /services with loading, empty, error, and success states.`

## UI quality checklist

**Must:** semantic structure, keyboard support, visible focus, WCAG 2.2 AA target, responsive layout, complete data states, safe client behavior, and passing checks.

**Should:** shared design tokens, accessible chart alternatives, reduced-motion support, performance-conscious dependencies, critical-flow tests, and documented exceptions.

## Training materials

- [Editable PowerPoint](training/engineering-pulse-react-ai-guardrails.pptx)
- [Verified PDF](output/pdf/engineering-pulse-react-ai-guardrails.pdf)
- [Speaker notes](training/speaker-notes.md)

## References

- [React: Build a React app from scratch](https://react.dev/learn/build-a-react-app-from-scratch)
- [Agent Skills specification](https://agentskills.io/specification)
- [Claude Code skills](https://code.claude.com/docs/en/slash-commands)
- [Codex manual](https://developers.openai.com/codex/codex-manual.md)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
