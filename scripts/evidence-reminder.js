#!/usr/bin/env node
/**
 * Hook: Stop (all)
 * Advisory reminder if no evidence has been collected this session.
 * Non-blocking — outputs a reminder message, does not block.
 *
 * Fail-open: errors → silent exit 0
 */

'use strict';

const path = require('path');
const { exists, listFiles, getModTime, advise } = require('./lib/fs-utils');

// Session window: files modified within last 8 hours are considered "this session"
const SESSION_WINDOW_MS = 8 * 60 * 60 * 1000;

function getProjectDir() {
  return process.env.CLAUDE_PROJECT_DIR || process.cwd();
}

function hasRecentEvidence(projectDir) {
  const evidenceDir = path.join(projectDir, 'evidence');
  if (!exists(evidenceDir)) return false;

  const cutoff = Date.now() - SESSION_WINDOW_MS;

  // Check subdirectories for recent index files
  let dirs;
  try {
    const fs = require('fs');
    dirs = fs.readdirSync(evidenceDir, { withFileTypes: true })
      .filter(e => e.isDirectory())
      .map(e => path.join(evidenceDir, e.name));
  } catch {
    return false;
  }

  for (const dir of dirs) {
    const files = listFiles(dir);
    for (const file of files) {
      const mtime = getModTime(file);
      if (mtime && mtime.getTime() > cutoff) {
        return true;
      }
    }
  }

  return false;
}

function hasPendingHandoffs(projectDir) {
  const handoffsDir = path.join(projectDir, 'handoffs');
  if (!exists(handoffsDir)) return false;

  const { parse } = require('./lib/yaml-frontmatter');
  const { readFile } = require('./lib/fs-utils');

  const files = listFiles(handoffsDir, '.md');
  for (const file of files) {
    const content = readFile(file);
    if (!content) continue;
    const result = parse(content);
    if (result && result.data.status === 'received') {
      return true;
    }
  }
  return false;
}

function main() {
  try {
    const projectDir = getProjectDir();
    const hasEvidence = hasRecentEvidence(projectDir);
    const hasPending = hasPendingHandoffs(projectDir);

    const reminders = [];

    if (!hasEvidence) {
      reminders.push(
        '📋 Evidence Reminder: No evidence collected in this session.\n' +
        '   If you implemented a feature or fixed a bug, run /verification-bundle\n' +
        '   to collect test results and create an evidence bundle.'
      );
    }

    if (hasPending) {
      reminders.push(
        '📬 Handoff Reminder: There are handoffs with status "received" pending completion.\n' +
        '   Run /final-walkthrough to complete them or /handoff-create to report back.'
      );
    }

    if (reminders.length > 0) {
      advise('\n' + reminders.join('\n\n') + '\n');
    }
  } catch {
    // Silent fail-open
  }
  process.exit(0);
}

main();
