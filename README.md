# <tool-name>

<!-- Replace <tool-name> with your tool's display name -->

<tool-description>

<!-- Replace <tool-description> with a one-line description of what your tool does -->

---

## Template Principles

This template follows proven patterns for building AI-assisted tools with Claude Code. These principles emerged from real-world tool development and are designed to create maintainable, user-friendly workflows.

### 1. Commands as Detailed Playbooks

Commands are not API documentation - they're step-by-step workflow guides. Each command file includes:

- **Clear prerequisites** - What must exist before running
- **Numbered workflow steps** - Exactly what happens and in what order
- **Example output** - Realistic examples showing expected results
- **Error handling** - Specific error messages and recovery instructions
- **Notes** - Cost info, limitations, and tips

This ensures Claude can execute workflows consistently and users know what to expect.

### 2. Security-First: Protect Secrets

- `.claude/settings.json` denies Claude from reading `.env` files
- API keys never appear in session data or logs
- `.gitignore` excludes `.env` files (except `.env.example` template)
- Sensitive operations are explicitly scoped in `settings.local.json`

### 3. Two-Tier Documentation

- **Implementation Plan** (`docs/<YYYY-MM-DD>--*-plan.md`): High-level design describing what to build and why
- **Implementation Spec** (`docs/<YYYY-MM-DD>--*-spec.md`): Checkboxes tracking progress with decisions log

This separation keeps planning separate from execution tracking.

### 4. Learnings Folder

`docs/learnings/` captures discoveries during implementation:

- **Problem encountered** - What went wrong or was unexpected
- **Solution found** - What fixed it or was learned
- **Takeaway** - One-line summary for future reference

This prevents repeating mistakes and builds institutional knowledge.

### 5. Session-Based State Management

For multi-step workflows, `artifacts/<context>/session.json` tracks state:

- Configuration and settings
- Intermediate results and metadata
- Progress through workflow phases

This enables resuming work and maintaining context across sessions.

### 6. Cost Transparency

When using paid APIs, document costs:

- Show cost per operation in command output
- Include cost estimates in documentation

Users should always know the cost implications of their actions.

### 7. User Feedback at Each Step

Commands present results and suggest logical next actions:

```
=== Operation Complete ===

<Summary of what was done>

Output: <path or result>

Next steps:
- <Option 1> -> /<domain> <command1>
- <Option 2> -> /<domain> <command2>
```

Never leave users wondering "what now?"

---

## Project Structure

```
<tool-name>/
├── .claude/
│   ├── settings.json                 # Claude permission denials (security)
│   ├── settings.local.json           # Claude permission allows (local dev)
│   └── commands/<domain>/            # Command playbook files
│       └── *.md                      # One file per command
├── docs/
│   ├── <YYYY-MM-DD>--*-plan.md       # Implementation plan
│   ├── <YYYY-MM-DD>--*-spec.md       # Implementation spec with checkboxes
│   └── learnings/                    # Discovery logs
├── src/
│   ├── lib/                          # Shared utilities and types
│   └── *.ts                          # Scripts invoked by commands
├── artifacts/                        # Output folder (gitignored)
├── README.md                         # This file
├── package.json                      # Bun project configuration
├── tsconfig.json                     # TypeScript configuration
├── .env.example                      # Environment variable template
├── .gitignore
└── LICENSE
```

---

## Quick Start

### Prerequisites

1. **Bun runtime**: Install from [bun.sh](https://bun.sh)
2. **Claude Code**: This tool is designed to be used with Claude Code CLI
3. **API key** (if using external services): Configure in `.env`

### Setup

1. Clone/copy the template:
   ```bash
   # Rename <domain> folder to your domain name
   mv .claude/commands/'<domain>' .claude/commands/your-domain
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Configure environment (if using APIs):
   ```bash
   cp .env.example .env
   # Edit .env with your API key
   ```

4. Replace placeholders throughout:
   - `<domain>` → your domain name
   - `<tool-name>` → your tool's display name
   - `<api-key-name>` → your environment variable name

---

## Creating Commands

Commands live in `.claude/commands/<domain>/` as markdown files.

### Command Structure

See `example-command.md` for the full template. Key sections:

```markdown
# Command Name

<One-line description>

## Arguments
- `--arg <value>`: Description (required/optional)

## Prerequisites
- What must exist before running

## Workflow
### Step 1: ...
### Step 2: ...
### Step N: Present Results

## Example Output
## Error Handling
## Notes
```

### Tips

- **Be specific** - Include exact file paths, data structures, validation logic
- **Show don't tell** - Use code blocks for commands and expected output
- **Handle errors** - Document what can go wrong and how to recover
- **Suggest next steps** - End with clear options for what to do next

---

## Configuration

### Environment Variables

| Variable | Description |
|----------|-------------|
| `<api-key-name>` | API key for `<api-provider>` (if applicable) |

### Claude Settings

- **settings.json**: Permission denials (checked into git)
  ```json
  { "permissions": { "deny": ["Read(./.env)", "Read(./.env.*)"] } }
  ```

- **settings.local.json**: Permission allows (user-specific)
  ```json
  { "permissions": { "allow": ["Bash(~/.bun/bin/bun run:*)"] } }
  ```

---

## Development

### Adding Commands

1. Copy `example-command.md` to a new file (e.g., `process.md`)
2. Fill in the playbook structure
3. Test the workflow manually first
4. Update this README if needed

### Session Management

If your tool needs state across commands, use `src/lib/context.ts`:

- Define types for your domain
- Use `loadSession()` / `saveSession()` for persistence
- Store artifacts in `artifacts/<context-name>/`

### Scripts

Scripts in `src/` are invoked by commands via bash:

```bash
bun run src/your-script.ts <args>
```

Keep scripts focused on a single operation. Let commands orchestrate the workflow.

---

## License

MIT License - See [LICENSE](./LICENSE) file
