/**
 * Example Script Template
 *
 * Scripts are invoked by commands via bash:
 *   bun run src/example-script.ts <args>
 *
 * Rename this file and customize for your domain.
 */

import * as path from "node:path";
import {
  initContext,
  loadSession,
  saveSession,
  contextExists,
} from "./lib/context";

// =============================================================================
// Configuration
// =============================================================================

const ARTIFACTS_DIR = "artifacts";

// =============================================================================
// Helpers
// =============================================================================

/**
 * Resolve context path from input.
 * Supports both simple names and full paths.
 */
function resolveContextPath(input: string): string {
  if (input.includes("/") || input.includes("\\")) {
    return input;
  }
  return path.join(ARTIFACTS_DIR, input);
}

// =============================================================================
// Main
// =============================================================================

async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  if (args.length < 1) {
    console.error("Usage: bun run src/example-script.ts <context-name> [options]");
    process.exit(1);
  }

  const contextPath = resolveContextPath(args[0]);

  // Check environment (if using APIs)
  // const apiKey = process.env["YOUR_API_KEY"];
  // if (!apiKey) {
  //   console.error("Error: YOUR_API_KEY not found in environment");
  //   process.exit(1);
  // }

  // Initialize or load context
  if (!contextExists(contextPath)) {
    console.log(`Initializing context: ${contextPath}`);
    initContext(contextPath, ["output"]); // Add subdirs as needed
  }

  const session = loadSession(contextPath);

  // ==========================================================================
  // Your logic here
  // ==========================================================================

  console.log("Processing...");

  // Example: Do something and update session
  // session.results.push({ ... });

  // ==========================================================================
  // Save and report
  // ==========================================================================

  saveSession(contextPath, session);
  console.log(`\nSession saved to: ${path.join(contextPath, "session.json")}`);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
