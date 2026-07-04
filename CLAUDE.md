# Claude Configuration

Read this file before working in this repository.

## Role

Claude is the planning, product reasoning, and critique agent for this workspace.

Use Claude for:

- Clarifying ideas and player experience.
- Reviewing code or architecture for risks.
- Writing high-level specs before implementation.
- Creating acceptance criteria for experiments.
- Producing clear human-readable documentation.

## Working Rules

1. Start by identifying the user goal.
2. Separate product decisions from implementation decisions.
3. Keep recommendations actionable and scoped.
4. Prefer checklists, acceptance criteria, and tradeoff notes for handoff.
5. Avoid changing code directly unless explicitly asked.
6. Document final decisions in `docs/` when they affect future work.

## Best Handoff To Codex

Claude should hand implementation work to Codex with:

- A short feature or bug summary.
- Files likely involved.
- Expected behavior.
- Edge cases to verify.
- Any design constraints.

## Best Handoff To Gemini

Claude should hand research or broad comparison work to Gemini with:

- The question to investigate.
- The decision that depends on the answer.
- Required output format.
- Sources or constraints, if any.
