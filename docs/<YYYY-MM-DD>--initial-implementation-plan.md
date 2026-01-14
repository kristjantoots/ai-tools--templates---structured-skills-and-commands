# Initial Implementation Plan

<!--
This is the high-level design document. Focus on WHAT to build and WHY.
Replace <YYYY-MM-DD> in filename with actual date when creating.
-->

**Created:** <YYYY-MM-DD> | **Version:** 1

---

## Goal

<!--
One paragraph describing what you're building and the primary use case.
Include v1 scope boundaries - what's included and what's explicitly excluded.
-->

<tool-description>

**v1 scope:**
- Included: <list of features in v1>
- Excluded: <list of features deferred to later versions>

**Key insight:** <The core technical or conceptual approach>

---

## Context Folder Structure

<!--
Explain the "context" concept - a working unit/project folder.
Show the folder structure that will be created for each context.
-->

Each <domain> project operates within a context folder:

```
artifacts/<context-name>/
├── references/          # Input: reference files (optional)
├── <outputs>/           # Output: generated items
├── final/               # Output: finalized items
└── session.json         # Metadata: state tracking
```

**Why context folders?**
- Isolates each project's files
- Enables resuming work across sessions
- Keeps artifacts organized and gitignored

---

## session.json Schema (Aspirational)

<!--
Show the target data structure. This guides implementation.
Use comments to explain each section's purpose.
-->

```json
{
  "strategy": {
    "<input-info>": {
      // Domain-specific input metadata
    },
    "concepts": [
      {
        "id": 1,
        "approach": "<approach-type>",
        "elements": ["..."],
        "status": "proposed|selected|rejected"
      }
    ]
  },
  "meta": {
    "created_at": "ISO timestamp",
    "last_activity": "ISO timestamp",
    "phase": "strategy|generation|review|finalized",
    "iteration_count": 0
  },
  "settings": {
    "variant_count": 3
  },
  "descriptions": [
    { "id": 1, "text": "generation input/prompt" }
  ],
  "variants": [
    { "file": "001_low.<ext>", "description_id": 1, "status": "pending" }
  ],
  "final": {
    "file": "001_final.<ext>",
    "source_variant": "001_low.<ext>",
    "generated_at": "ISO timestamp"
  }
}
```

---

## Input Modes

<!--
How users provide input to the tool. Start simple, expand later.
-->

**v1 (Primary):** <Primary input method>
- <How it works>
- <Why this is the starting point>

**Future:**
- <Additional input methods for later versions>

---

## Workflow

<!--
High-level phases the user goes through. Number them for reference.
-->

1. **Context init** - Create project folder and initialize session
2. **Strategy** - Define approach through collaborative discussion
3. **Generate** - Create preview outputs using <api-provider>
4. **Review** - User evaluates outputs
5. **Iterate** - Refine based on feedback (optional, repeatable)
6. **Finalize** - Generate high-quality final output

---

## Technology

<!--
What tools and services power this implementation.
-->

**Orchestration:** Claude Code
- Commands defined in `.claude/commands/<domain>/`
- Session state in JSON files
- Scripts invoked via Bash

**<Service Category>:** <api-provider>
- Model: `<model-name>`
- Key capabilities:
  - <Capability 1>
  - <Capability 2>
- Limitations:
  - <Limitation 1>
  - <Limitation 2>

**API:**
- Auth: `<api-key-name>` environment variable
- Pricing: <pricing info>

---

## Implementation Phases

<!--
Ordered sequence of implementation work. Each phase should be completable
and verifiable before moving to the next.
-->

| Phase | Description |
|-------|-------------|
| **1** | Environment setup (Bun, TypeScript, API access) |
| **2** | Context and session management (`src/lib/context.ts`) |
| **3** | Generation script (`src/<generate-script>.ts`) |
| **4** | Finalization script (`src/<finalize-script>.ts`) |
| **5** | Claude Code commands (after workflow validated) |
| **6** | Documentation and polish |

---

## Configuration

<!--
Environment variables and default values.
-->

```bash
# Required
<api-key-name>=your_api_key_here
```

**Defaults:**
- Variant count: 3
- Preview model: `<preview-model>`
- Final model: `<final-model>`

---

## Future Expansion

<!--
Ideas for later versions. Keep brief - just bullet points.
Don't elaborate or commit to timelines.
-->

- <Future feature 1>
- <Future feature 2>
- <Future feature 3>

---

## Open Questions

<!--
Decisions still to be made. Tag with when they need resolution.
-->

**Before implementation:**
- <Question 1>?
- <Question 2>?

**During implementation:**
- <Question 3>?

---

## Sources

<!--
Reference documentation and resources used in planning.
-->

- [<api-provider> Documentation](<url>)
- [<Related resource>](<url>)
