#!/usr/bin/env node
/**
 * Hook: PreToolUse (Write|Edit)
 * Blocks writes to protected framework paths.
 * Override: include [override:PROTECTED-PATH] in the request context.
 *
 * Exit codes:
 *   0 = allow (no output or empty output)
 *   stdout JSON with decision:block = block
 */

'use strict';

const { readStdinSync, blockWith } = require('./lib/fs-utils');

// Paths protected from modification without explicit override
const PROTECTED_PATTERNS = [
  /^\.claude-plugin\//,
  /^hooks\/hooks\.json$/,
  /^docs\/governance\/rule-manifest\.md$/,
  /^docs\/governance\/enforcement-matrix\.md$/,
];

function normalizePath(rawPath) {
  if (!rawPath) return '';
  // Normalize to forward slashes, strip leading ./
  return rawPath.replace(/\\/g, '/').replace(/^\.\//, '');
}

function isProtected(filePath) {
  const normalized = normalizePath(filePath);
  return PROTECTED_PATTERNS.some(pattern => pattern.test(normalized));
}

function main() {
  let input = {};
  try {
    const raw = readStdinSync();
    if (raw.trim()) {
      input = JSON.parse(raw);
    }
  } catch {
    // Fail-open: can't parse input → allow
    process.exit(0);
  }

  const filePath = (input.tool_input && input.tool_input.file_path) || '';

  if (!filePath) {
    process.exit(0);
  }

  if (isProtected(filePath)) {
    // Check for override tag in tool_input or parent context
    const inputStr = JSON.stringify(input);
    if (inputStr.includes('[override:PROTECTED-PATH]')) {
      // Override accepted — allow
      process.exit(0);
    }

    blockWith(
      `Protected path: "${filePath}" cannot be modified without explicit override.\n` +
      `To proceed, include [override:PROTECTED-PATH] in your request with a reason.\n` +
      `See docs/standards/10-override-policy.md for details.`
    );
    process.exit(0);
  }

  // Not protected — allow
  process.exit(0);
}

main();
