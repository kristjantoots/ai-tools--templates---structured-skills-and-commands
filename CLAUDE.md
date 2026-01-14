# Template: Structured Skills and Commands

**This is a template repository, not a working project.**

## Purpose

Reference implementation showing patterns for building Claude Code workflow tools. Files here are **examples to learn from and adapt**, not code to run directly.

## How to Use This Template

### Creating a New Tool

1. Copy this folder to a new location
2. Replace placeholders (see table below)
3. Delete this CLAUDE.md - real projects don't need template instructions
4. Customize for your domain

### Learning Patterns

Study these files for patterns:
- Command playbook structure: `.claude/commands/<domain>/example-command.md`
- Read-only command pattern: `.claude/commands/<domain>/status.md`
- Documentation separation: `docs/` (plan vs spec vs learnings)
- Session management: `src/lib/context.ts`
- Security settings: `.claude/settings.json`

## Placeholder Reference

| Placeholder | Replace With | Example |
|-------------|--------------|---------|
| `<tool-name>` | Display name | `Invoice Parser` |
| `<domain>` | Command namespace | `invoice` |
| `<api-key-name>` | Env var name (if using APIs) | `OPENAI_API_KEY` |
| `<YYYY-MM-DD>` | Actual date | `2026-01-14` |

## File Status

| Path | Type | Action |
|------|------|--------|
| `CLAUDE.md` | Template instruction | Delete after copying |
| `README.md` | Template to customize | Rewrite for your tool |
| `.claude/commands/<domain>/*.md` | Example patterns | Study, then create your own |
| `docs/<YYYY-MM-DD>--*.md` | Documentation templates | Create with real dates and content |
| `src/lib/context.ts` | Starter code | Customize types for your domain |
| `src/example-script.ts` | Starter code | Rename and customize |
| `.claude/settings.json` | Production-ready | Keep; add your own rules |

## Adaptation Guidance

### Adapt these patterns:
- Command structure (prerequisites → workflow → results → next steps)
- Two-tier documentation (plan for design, spec for tracking)
- Learnings folder for capturing discoveries
- Security deny rules for secrets

### Don't copy verbatim:
- Example command content (create your own workflows)
- Session schema (design for your domain's state)
- README "Template Principles" section (rewrite or remove)

### Make optional based on your tool:
- Session/context management (only if multi-step workflow)
- API configuration (only if using external services)
- Cost tracking (only if paid APIs involved)
- Artifacts folder (only if generating files)

## Recognizing Template Content

If you see these, it's template content to replace:
- `<angle-bracket>` placeholders
- `<YYYY-MM-DD>` in filenames
- HTML comments with `<!-- ... -->`
- Generic text like "Your tool's display name"

## Origin

Part of [ai-tools](https://github.com/kristjantoots/ai-tools) - patterns for AI-assisted workflow tools.
