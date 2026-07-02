# AI Composition Workflow

This document describes how Claude, Codex, and Gemini should work together in this workspace.

## Purpose

The `ai-agents` folder is an experimentation lab for AI-agentic design, game development, and multi-agent workflows.

The current game project lives in:

- `game-ai/`

Future prototypes should live in:

- `experiments/<experiment-name>/`

## Agent Roles

### Claude: Planner and Critic

Claude is best used before and after implementation.

Responsibilities:

- Clarify user goals.
- Turn ideas into specs.
- Define acceptance criteria.
- Review architecture and user experience.
- Identify risks, gaps, and unclear requirements.

Typical output:

- Feature brief.
- Game design note.
- Acceptance checklist.
- Review findings.

### Codex: Builder and Verifier

Codex is best used for local project work.

Responsibilities:

- Edit files.
- Move and organize project structure.
- Implement features.
- Run commands and tests.
- Verify that the project still works.
- Summarize changed files and verification results.

Typical output:

- Code changes.
- Refactors.
- Test results.
- Local run instructions.

### Gemini: Researcher and Option Generator

Gemini is best used when there are several possible approaches.

Responsibilities:

- Compare frameworks, libraries, and workflow patterns.
- Suggest alternative designs.
- Check assumptions.
- Summarize tradeoffs.
- Recommend a direction before work starts.

Typical output:

- Comparison table.
- Recommendation.
- Risk list.
- Research summary.

## Recommended Workflow

1. Idea capture with Claude.

   Claude turns the rough idea into a short spec:

   - Goal.
   - Target user or player.
   - Core loop.
   - Constraints.
   - Acceptance criteria.

2. Option check with Gemini.

   Gemini compares approaches only when the direction is uncertain:

   - Framework choice.
   - AI-agent architecture.
   - Prompting strategy.
   - Tooling or runtime choices.

3. Implementation with Codex.

   Codex makes the actual local changes:

   - Creates or edits files.
   - Keeps project folders organized.
   - Runs available verification.
   - Reports what changed.

4. Review with Claude.

   Claude reviews the result against the original goal:

   - Does the user experience match the spec?
   - Are there missing states or edge cases?
   - Is the workflow understandable?

5. Final polish with Codex.

   Codex fixes review findings and updates documentation.

## Handoff Template

Use this format when one agent passes work to another:

```md
## Handoff

Agent from:
Agent to:

Goal:
Context:
Files involved:
Constraints:
Completed:
Blocked:
Next step:
```

## File Ownership Guidelines

- Game implementation files belong inside `game-ai/` or a specific experiment folder.
- Shared workflow documentation belongs inside `docs/`.
- Agent behavior belongs in `CLAUDE.md`, `CODEX.md`, and `GEMINI.md`.
- New prototypes should not be placed at the workspace root.

## Example: Game Feature Workflow

1. Claude writes a feature brief for a new enemy behavior.
2. Gemini compares simple state machines, behavior trees, and utility AI.
3. Codex implements the chosen behavior in `game-ai/`.
4. Claude reviews the feature against player experience goals.
5. Codex fixes issues and records the result in `docs/`.
