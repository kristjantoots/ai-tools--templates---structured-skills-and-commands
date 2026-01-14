# <Command Name>

<!--
TEMPLATE: This is an example command showing the playbook structure.
Rename this file to match your command (e.g., process.md, analyze.md, export.md).

Commands are detailed playbooks - step-by-step guides that Claude follows.
They're not API documentation. Include enough detail that:
1. Claude knows exactly what to do at each step
2. Users know what to expect
3. Error recovery is clear
-->

<One-line description of what this command does>

## Arguments

<!--
List all arguments the command accepts.
Mark each as required or optional.
Include default values where applicable.
-->

- `--<arg1> <value>`: <Description> (required)
- `--<arg2> <value>`: <Description> (optional, default: <default>)

## Prerequisites

<!--
What must be true before this command can run?
Examples: files must exist, previous commands must have run, API configured
-->

- <Prerequisite 1>
- <Prerequisite 2>

## Workflow

<!--
Numbered steps describing exactly what happens.
Be specific - include file paths, data structures, validation logic.
Each step should be actionable and verifiable.
-->

### Step 1: <Action Name>

<What to do in this step>

1. <Sub-step with specific details>
2. <Sub-step with specific details>
3. <Sub-step with specific details>

### Step 2: <Action Name>

<What to do in this step>

<!--
Include code blocks for commands to run:
-->

```bash
bun run src/<script>.ts <args>
```

### Step 3: <Action Name>

<What to do in this step>

<!--
Include expected data structures:
-->

```json
{
  "field": "value",
  "status": "completed"
}
```

### Step N: Present Results

<!--
Always end by showing results and suggesting next actions.
Never leave the user wondering "what now?"
-->

```
=== <Command> Complete ===

<Summary of what was done>

Output: <path or result>

Next steps:
- <Option 1> -> /<domain> <command1>
- <Option 2> -> /<domain> <command2>
```

## Example Output

<!--
Show realistic example of what the user will see.
This helps users understand what to expect.
Include the "next steps" pattern - this is crucial for UX.
-->

```
Loading context: my-project
Processing input...

  [1/3] Step one complete
  [2/3] Step two complete
  [3/3] Step three complete

=== Process Complete ===

Processed: 3 items
Output saved to: artifacts/my-project/output/

Next steps:
- View results      -> /<domain> status --context my-project
- Export data       -> /<domain> export --context my-project
- Process more      -> /<domain> process --context my-project --continue
```

## Error Handling

<!--
Document specific error conditions and how to recover.
Format: condition, error message, solution.
Be concrete - users need exact recovery steps.
-->

**Context not found:**
```
Context 'unknown' not found.

Available contexts:
- my-project
- client-demo

Create new: /<domain> init --context <name>
```

**Missing prerequisite:**
```
Cannot process: no input configured.

Run first: /<domain> setup --context my-project --input <path>
```

**API error (if applicable):**
```
API Error: Rate limit exceeded

Retry in 60 seconds, or reduce batch size:
/<domain> process --context my-project --batch-size 5
```

## Notes

<!--
Additional context that doesn't fit elsewhere:
- Cost information (if API calls involved)
- Limitations or constraints
- Tips for best results
- Related commands
-->

- <Note 1>
- <Note 2>
