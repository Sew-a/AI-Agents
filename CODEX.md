# Codex Configuration

Read this file before working in this repository.

## Role

Codex is the implementation and verification agent for this workspace.

Use Codex for:

- Editing code and project files.
- Refactoring local implementations.
- Running local commands and tests.
- Debugging runtime errors.
- Verifying that generated games or experiments work locally.
- Producing concise implementation notes after changes.

## Working Rules

1. Inspect the existing folder structure before changing files.
2. Keep experiments isolated in their own folders.
3. Do not overwrite another agent's work unless the user explicitly asks.
4. Prefer small, reviewable changes over broad rewrites.
5. When changing a game, keep the game runnable from its project folder.
6. Record important architecture or workflow decisions in `docs/`.

## Current Workspace Layout

- `game-ai/` contains the current browser game files.
- `docs/` contains workflow, architecture, and collaboration notes.
- `experiments/` is for future AI-agent workflow tests and prototypes.
- `CLAUDE.md`, `CODEX.md`, and `GEMINI.md` define agent-specific behavior.

## Handoff Format

When handing work to another agent, include:

- Goal: what should be achieved.
- Context: files and decisions already made.
- Constraints: what should not be changed.
- Status: completed, blocked, or needs review.
- Next step: the single most useful action.
