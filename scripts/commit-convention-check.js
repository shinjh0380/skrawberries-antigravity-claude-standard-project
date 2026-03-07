#!/usr/bin/env node
/**
 * Hook: PreToolUse (Bash)
 * Validates git commit message format against Conventional Commits.
 * Only activates when command contains "git commit".
 * Override: include [override:COMMIT-FORMAT] in the request context.
 *
 * Fail-open: errors → allow (exit 0)
 */

'use strict';

const { readStdinSync, blockWith } = require('./lib/fs-utils');

const CONVENTIONAL_PREFIX = /^(feat|fix|refactor|chore|docs|style|test|perf|ci|build)(\(.+\))?!?:\s+\S/;

// WIP commits are allowed on personal branches
const WIP_PREFIX = /^wip:/i;

/**
 * Extract commit message from a git commit command string.
 * Handles: git commit -m "msg", git commit -m 'msg', git commit --message="msg"
 * Returns null if -m flag not found (interactive commit).
 */
function extractMessage(command) {
  // --message="..." or --message '...'
  let m = command.match(/--message[= ]["'](.+?)["']/);
  if (m) return m[1];

  // -m "..." or -m '...'
  m = command.match(/-m\s+["'](.+?)["']/);
  if (m) return m[1];

  // -m without quotes (single word)
  m = command.match(/-m\s+(\S+)/);
  if (m) return m[1];

  return null;
}

function main() {
  let input = {};
  try {
    const raw = readStdinSync();
    if (raw.trim()) {
      input = JSON.parse(raw);
    }
  } catch {
    process.exit(0);
  }

  const command = (input.tool_input && input.tool_input.command) || '';

  // Only check git commit commands
  if (!command.includes('git commit')) {
    process.exit(0);
  }

  // --amend without -m: allow (amending message interactively)
  if (command.includes('--amend') && !command.includes('-m') && !command.includes('--message')) {
    process.exit(0);
  }

  const message = extractMessage(command);

  // Interactive commit (no -m flag): allow — can't validate
  if (message === null) {
    process.exit(0);
  }

  // Allow WIP commits
  if (WIP_PREFIX.test(message)) {
    process.exit(0);
  }

  // Validate conventional prefix
  if (CONVENTIONAL_PREFIX.test(message)) {
    process.exit(0);
  }

  // Check for override
  const inputStr = JSON.stringify(input);
  if (inputStr.includes('[override:COMMIT-FORMAT]')) {
    process.exit(0);
  }

  blockWith(
    `Commit message does not follow Conventional Commits format.\n` +
    `Got: "${message}"\n` +
    `Expected: {type}({scope}): {description}\n` +
    `Allowed types: feat|fix|refactor|chore|docs|style|test|perf|ci|build\n` +
    `Example: feat(auth): add JWT refresh token rotation\n` +
    `See docs/standards/08-naming-conventions.md for details.`
  );
  process.exit(0);
}

main();
