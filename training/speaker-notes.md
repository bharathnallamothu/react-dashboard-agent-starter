# React UI Skills That Help

Teaching target: 24 minutes, followed by 6 minutes of Q&A. The connected example is one request to add a Deployment status widget to the Engineering Pulse React dashboard.

## Slide 1 - React UI Skills That Help (0:00-1:00)

Today we will follow one small request: add a deployment status widget to a React dashboard. That request will connect four beginner ideas - SPA, component, state, and complete UI states - to one developer practice: encoding a repeated workflow as a skill.

The goal is not to make everyone a frontend specialist in 30 minutes. The goal is to make the workflow understandable, reusable, and reviewable.

Transition: first agree on what the requested widget means and what done really includes.

## Slide 2 - The Request Is Small. Done Is Not. (1:00-3:00)

Read the feature request literally: show **Ready** when there are no incidents and build success is at least 98 percent; otherwise show **Needs attention**. That is the product rule.

A real UI is not done when one card looks correct on one laptop. It should reuse the existing visual language, adapt to smaller screens, expose meaning to assistive technology, behave during loading or failure, and have evidence from checks.

This distinction matters because prompts often describe the product rule but omit the repeatable quality bar. Do not blame the prompt or agent; make expectations observable.

Use two columns in your explanation: **product done** and **engineering done**. Product done is the status rule and the words shown to the user. Engineering done is how that rule behaves inside the existing application. Ask the audience to call out one missing concern. Accept answers such as mobile layout, keyboard use, loading, tests, color contrast, or error recovery. The point is that every answer is reasonable, yet none appears in the short feature sentence. That gap is the repeated problem the later skill will address.

## Slide 3 - An SPA Changes the View, Not the Document (3:00-5:00)

SPA means single-page application. Here the browser loads one application document. React Router connects the root URL to the dashboard and `/activity` to the detailed activity view. Navigation changes the URL and visible React tree without requesting a completely new document.

Single page does not mean one screen, and it does not mean no network requests. It describes the document and navigation model. A route is simply the mapping between a URL and a view.

Ask: If the URL changes but the application shell remains, what handled navigation? Answer: the client-side router.

Connect this to the widget. The Deployment status card belongs to the dashboard route, but its inputs come from shared dashboard data. When the user visits `/activity`, the router renders a different page component while navigation and the application shell remain. If the page is refreshed directly on `/activity`, the hosting setup must still return the SPA document so the router can select the correct view. That deployment detail is out of scope today, but it prevents the common misunderstanding that client-side routing is only a menu animation.

Reference: [React - Build a React app from scratch](https://react.dev/learn/build-a-react-app-from-scratch)

## Slide 4 - Components Give Each Part One Job (5:00-7:00)

React becomes easier when the page is divided into responsibilities. Filters own selection controls. `MetricCard` renders one consistent summary. `TrendChart` shows change over time. `ActivityTable` shows detailed events.

Each component receives a small input and has one job. The widget request should normally extend the existing metric-card pattern instead of inventing a second card design.

A component is not just code reuse; it is a boundary for reasoning, testing, and change. The tiny React example is `<MetricCard metric={metric} />`: render the standard card using this data.

For the new widget, separate the status calculation from the presentation. The calculation asks whether incidents equal zero and build success meets the threshold. The component turns that result into a heading, status text, and supporting values. This makes the boundary condition - exactly 98 percent - easy to test. Warn against the opposite extreme: React does not require a new component for every line of markup. Create a boundary when it gives a part a clear responsibility or reuse value.

## Slide 5 - Production-Ready Means Every State (7:00-10:00)

State is information that changes while the app is open: selected team, time range, loaded data, and current view state. Changing a filter updates state, calls `loadDashboard(filters)`, and causes React to render the returned data.

Walk across the screenshots:

- Desktop has a clear hierarchy.
- Mobile reflows instead of forcing page-level horizontal scrolling.
- Empty explains that no result matches and offers reset.
- Error explains the problem and offers retry.

Add loading and success to the spoken checklist. Accessibility also belongs here: semantic controls, keyboard operation, visible focus, meaningful status text, and an accessible chart summary. These are not separate polish tasks; they are part of the behavior the widget joins.

Name all five data states explicitly: loading, empty, error, success, and recovery. Recovery means a user can reset filters or retry and return to useful content; it is not merely another screenshot. Then describe a 30-second keyboard check: start at the browser address bar, press Tab through navigation and filters, confirm focus is visible, activate controls with the keyboard, and verify the order follows what is seen. Automated accessibility tests can catch many rule violations, but they cannot decide whether this sequence feels logical or whether the status wording is understandable.

## Slide 6 - One Prompt Solves One Task (10:00-12:00)

A normal prompt can describe the status rule very well. It may not repeat every team expectation about responsive behavior, keyboard use, data states, tests, and manual review.

Repeating a giant checklist in every prompt is expensive and inconsistent. A skill is useful when the same specialized workflow keeps returning. It packages the method, not the product decision.

The prompt still says what to build today. The skill adds the reusable way the team expects this class of work to be inspected, implemented, verified, and reported.

Show the difference using two spoken prompts. First: “Add a Deployment status widget. Ready means zero incidents and at least 98 percent build success.” That is a valid task prompt. Second: the same sentence plus “Use `$build-quality-react-ui`.” The feature request has not changed. The added token selects a maintained workflow containing UI expectations that the team should not have to remember word for word. A skill is therefore closer to a reusable operating procedure than a reusable mega-prompt. It can instruct the agent to read repository context and report evidence instead of pasting a fixed solution.

## Slide 7 - Put Guidance at the Right Lifetime (12:00-14:00)

Use a prompt for the current outcome: add this widget with this rule.

Use `AGENTS.md` for repository facts that apply to every task: commands, architecture, naming, and required gates. `CLAUDE.md` can import `AGENTS.md` so the same rule is not copied.

Use a skill for a reusable specialized workflow that should activate only for matching tasks.

Memory aid: prompt is **now**, `AGENTS.md` is **always in this repository**, skill is **on demand**. Keeping these lifetimes separate prevents a skill from becoming a dumping ground for every instruction.

Give three quick placement tests. “Use npm and run `npm run check`” belongs in `AGENTS.md` because it is true for every repository task. “Make the status threshold 98 percent” belongs in this prompt because it is a product decision for this feature. “When changing interactive React UI, inspect semantics, responsive behavior, complete states, and verification” belongs in a skill because it is a portable method used only for matching work. If one sentence mixes all three lifetimes, split it before publishing the guidance.

## Slide 8 - Create a Skill Only When Work Repeats (14:00-16:00)

Before creating a folder, ask four questions:

1. Does this workflow repeat?
2. Is it specialized enough to need a method?
3. Are important steps easy to omit?
4. Can we define observable verification?

If yes, a skill may help. Keep a one-off desired result in the prompt. Keep repository-specific commands or facts in `AGENTS.md`. Do not package general knowledge the model already has.

Then collect three realistic requests that should trigger and two that should not. Those examples shape the description before you write the body.

Walk through the creation sequence in order: identify the repeated omissions; write positive and negative trigger examples; run the standard initializer to create the directory; choose the action-oriented name; write only portable frontmatter; draft the shortest useful workflow; add references, scripts, or assets only when the workflow needs them; validate the folder; and forward-test it on a realistic request. Starting with examples prevents a common mistake: writing a long body first and discovering later that the description cannot reliably select the skill.

## Slide 9 - The Description Decides When It Runs (16:00-18:00)

The name should be short, lowercase, and action-oriented: `build-quality-react-ui`.

The description is the trigger. A weak description such as `Helps with UI work.` says neither the real capability nor when it applies.

A strong description contains what the skill does and explicit situations that should activate it:

> Build or review accessible, responsive React interfaces with complete data states and reliable verification. Use when creating pages, changing interactive UI, or fixing accessibility and responsive issues.

Trigger checks:

- Should trigger: create a dashboard component.
- Should trigger: fix mobile overflow and focus.
- Should trigger: review loading, empty, and error states.
- Should not trigger: rotate a PDF.
- Should not trigger: summarize a backend incident.

The body is loaded after the trigger, so hiding trigger guidance only inside the body is too late.

Explain both parts of the good description. “Build or review accessible, responsive React interfaces with complete data states and reliable verification” states the capability. “Use when creating pages, changing interactive UI, or fixing accessibility and responsive issues” states the situations. Include review and repair verbs if the workflow supports them; otherwise the skill may activate only for greenfield creation. Avoid product names, repository commands, or temporary team facts in this portable field. After drafting it, read each trigger example aloud and ask whether a developer would be surprised if the skill ran.

## Slide 10 - Write the Body as an Operating Sequence (18:00-20:00)

Write the body in imperative verbs: **inspect, read, implement, verify, report**.

Start with existing repository patterns. Define required states and accessibility behavior. Reuse components and tokens. Run the repository's real gates. Report executed checks, manual review, and remaining gaps.

Match the guardrail to the risk. High-level inspection can allow judgment. A fragile validation or file transformation should be more deterministic. End with a clear definition of done.

Avoid vague motivation, duplicated reference material, and instructions with no observable exit condition.

The actual workflow can be summarized as four passes. **Inspect:** read `AGENTS.md`, existing components, tokens, tests, and data contracts. **Implement:** make one coherent change, reuse patterns, preserve public interfaces, and include required states. **Verify:** run lint, types, unit tests, browser tests, accessibility automation, build, and targeted manual checks in proportion to the change. **Report:** list what ran, what was manually observed, and what remains unverified. The definition of done is evidence, not the phrase “looks good.” For high-risk actions, replace broad advice with a script or exact command so the result is deterministic.

## Slide 11 - Keep SKILL.md Lean (20:00-21:00)

This is progressive disclosure:

```text
build-quality-react-ui/
|-- SKILL.md
|-- agents/openai.yaml
`-- references/ui-standards.md
```

Name and description are lightweight metadata used for discovery. After the skill triggers, the concise `SKILL.md` body provides the workflow. Detailed standards are read from `references/` only when needed.

Put repeatable deterministic automation in `scripts/`. Put reusable output material such as templates in `assets/`. A smaller body is easier to trigger, read, maintain, and improve.

Clarify that progressive disclosure is not permission to hide important steps. The concise body should still tell the agent when to read the standards reference and what must be true at the end. The reference carries detail such as semantic HTML examples, focus guidance, responsive review sizes, and the must/should checklist. A script is appropriate for repeatable validation, such as checking two mirrored skill folders for drift. An asset is appropriate when the workflow copies or adapts a reusable template rather than merely reading guidance.

Reference: [Agent Skills specification](https://agentskills.io/specification)

## Slide 12 - The Same Request Produces Different Evidence (21:00-23:00)

This comparison used temporary copies of the same repository and the same status-widget request.

Both runs implemented the rule, reused the card pattern, passed automated accessibility checks, and added tests. The baseline also completed visual review at desktop and mobile sizes.

The skill-enabled run added a deterministic Product-team path so **Ready** could be seen in the live UI, reviewed semantic reading and announcement behavior, and explicitly reported that visual inspection was unavailable.

It was not better on every measure. That is the honest lesson: a skill does not guarantee quality; it makes a preferred workflow and its remaining gaps easier to see and review.

Describe the isolation before interpreting the result. Both agents received temporary copies of the same starting project and the same widget requirement. The baseline was told not to use a skill. The other was explicitly told to use the copied UI skill. Neither result was merged into the real application. The comparison records changed files, behavior, tests, automated checks, manual review, and omissions. The baseline completed desktop and mobile visual inspection. The skill-enabled run could not access the visual browser and said so. That disclosure is useful evidence, but it is not a substitute for the missing review. The strongest skill culture rewards accurate gaps as much as passing checks.

## Slide 13 - Validate the Skill and the Behavior (23:00-24:00)

Validation has two layers. Structural validation checks the folder and frontmatter. Trigger testing checks whether matching and unrelated requests behave as intended.

Forward-testing gives a fresh agent a realistic task, then compares the result against observable expectations. Improve the description or workflow from evidence, not preference alone.

Publish the skill in the team's discovery folder and automate any required mirror check. In this starter, the agent and Claude copies are compared so they cannot drift.

A skill is a maintained developer tool, not a document written once and forgotten.

## Slide 14 - Questions (24:00-30:00)

Keep the repository link and QR visible during questions. The public template includes the runnable React app, `AGENTS.md`, `CLAUDE.md`, mirrored `build-quality-react-ui` skill, UI standards reference, tests, deck, PDF, and notes.

Suggested first exercise: use `$build-quality-react-ui` to add a deployment-frequency metric with the existing card pattern, then inspect its states and verification report.

If questions are slow, ask:

- Which repeated workflow should become your first skill?
- Which rule belongs in `AGENTS.md` instead?
- What evidence would convince a reviewer that a UI change is complete?

Repository: [react-dashboard-agent-starter](https://github.com/bharathnallamothu/react-dashboard-agent-starter)
