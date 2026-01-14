# <Domain> Status

<!--
PATTERN: Read-only command that displays state and suggests next actions.
Every tool benefits from a "where am I?" command that helps users recover context.
This command never modifies files - it only reads and reports.
-->

Display current session status and available actions.

## Arguments

- `<context-name>`: Context to check (required)
- `--list`: List all available contexts instead (optional)

## Prerequisites

- For status: Context folder must exist
- For --list: artifacts/ folder must exist

## Workflow

### Step 1: Handle List Mode

If `--list` flag provided:

1. Scan `artifacts/` directory for context folders
2. For each folder with `session.json`, extract:
   - Context name
   - Last activity timestamp
   - Current phase (if tracked)
3. Display summary:

```
Available contexts:

  Name                 Last Activity        Phase
  ─────────────────────────────────────────────────
  project-alpha        2026-01-14 14:22     processing
  client-demo          2026-01-13 09:15     complete
  experiment-v2        2026-01-14 16:00     setup

Resume with: /<domain> status <context-name>
```

If no contexts found:
```
No contexts found in artifacts/

Create one with: /<domain> <your-start-command> --context <name>
```

### Step 2: Load Session

1. Load `artifacts/<context-name>/session.json`
2. If not found:
   ```
   Context '<name>' not found.

   Use --list to see available contexts:
   /<domain> status --list
   ```

### Step 3: Display Status

<!--
Customize this section for your domain's session structure.
Show the most useful information for understanding current state.
-->

```
=== <Domain> Status: <context-name> ===

Created: <created_at>
Last activity: <last_activity>

--- Configuration ---
<Display relevant settings>

--- Current State ---
<Display domain-specific state summary>

--- Progress ---
<Display any tracking info: items processed, phases completed, etc.>
```

### Step 4: Suggest Next Actions

<!--
KEY PATTERN: Always end with clear options for what to do next.
Base suggestions on current state - different states = different options.
-->

Based on current state, suggest appropriate actions:

```
Available actions:
- <Action based on state> -> /<domain> <command> --context <name>
- <Another option>        -> /<domain> <command> --context <name>
- <Help option>           -> /<domain> help
```

## Example Output

```
=== <Domain> Status: my-project ===

Created: 2026-01-14T10:30:00Z
Last activity: 2026-01-14T14:22:00Z

--- Configuration ---
Output format: json
Quality: standard

--- Current State ---
Items processed: 12 of 15
Current phase: processing

--- Progress ---
[████████████░░░░░░░░] 80% complete

Available actions:
- Continue processing -> /<domain> process --context my-project
- View results so far -> /<domain> export --context my-project --partial
- Abort and cleanup   -> /<domain> cleanup --context my-project
```

## Error Handling

**Context not found:**
```
Context 'unknown-name' not found.

Available contexts:
- project-alpha
- client-demo

Or create new: /<domain> <start-command> --context <name>
```

## Notes

- This command is **read-only** - it never modifies files
- Use this to recover context when returning to a project
- Timestamps help identify stale vs active contexts
