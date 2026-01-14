/**
 * Context Management Library
 *
 * Provides utilities for session-based state management.
 * Customize the types and functions for your domain.
 */

import * as fs from "node:fs";
import * as path from "node:path";

// =============================================================================
// Session Types
// =============================================================================

/**
 * Session settings - customize for your domain.
 */
export interface SessionSettings {
  // Add your settings here, e.g.:
  // output_format?: string;
  // quality_level?: "draft" | "standard" | "high";
}

/**
 * Session metadata - tracks workflow state.
 */
export interface SessionMeta {
  created_at: string;
  last_activity: string;
  // Add workflow-specific fields, e.g.:
  // phase?: string;
  // iteration_count?: number;
}

/**
 * Complete session state.
 * Customize this for your domain's needs.
 */
export interface Session {
  settings: SessionSettings;
  meta: SessionMeta;
  // Add domain-specific fields, e.g.:
  // items: Item[];
  // results: Result[];
}

// =============================================================================
// Context Management
// =============================================================================

const DEFAULT_SETTINGS: SessionSettings = {
  // Set defaults here
};

/**
 * Initialize a context folder with required structure.
 *
 * @param contextPath - Path to context folder
 * @param subdirs - Subdirectories to create (customize for your domain)
 */
export function initContext(
  contextPath: string,
  subdirs: string[] = []
): void {
  // Create main folder
  if (!fs.existsSync(contextPath)) {
    fs.mkdirSync(contextPath, { recursive: true });
  }

  // Create subdirectories
  for (const subdir of subdirs) {
    const subdirPath = path.join(contextPath, subdir);
    if (!fs.existsSync(subdirPath)) {
      fs.mkdirSync(subdirPath);
    }
  }

  // Initialize session.json
  const sessionPath = path.join(contextPath, "session.json");
  if (!fs.existsSync(sessionPath)) {
    const session: Session = {
      settings: DEFAULT_SETTINGS,
      meta: {
        created_at: new Date().toISOString(),
        last_activity: new Date().toISOString(),
      },
    };
    fs.writeFileSync(sessionPath, JSON.stringify(session, null, 2));
  }
}

/**
 * Load session from context folder.
 */
export function loadSession(contextPath: string): Session {
  const sessionPath = path.join(contextPath, "session.json");
  const content = fs.readFileSync(sessionPath, "utf-8");
  return JSON.parse(content) as Session;
}

/**
 * Save session to context folder.
 */
export function saveSession(contextPath: string, session: Session): void {
  // Update last_activity timestamp
  session.meta.last_activity = new Date().toISOString();

  const sessionPath = path.join(contextPath, "session.json");
  fs.writeFileSync(sessionPath, JSON.stringify(session, null, 2));
}

/**
 * Check if a context exists.
 */
export function contextExists(contextPath: string): boolean {
  const sessionPath = path.join(contextPath, "session.json");
  return fs.existsSync(sessionPath);
}

// =============================================================================
// Add your domain-specific helpers below
// =============================================================================

// Example: Helper to add an item to session
// export function addItem(session: Session, item: Omit<Item, "id">): Item {
//   const id = session.items.length + 1;
//   const fullItem = { id, ...item };
//   session.items.push(fullItem);
//   return fullItem;
// }
