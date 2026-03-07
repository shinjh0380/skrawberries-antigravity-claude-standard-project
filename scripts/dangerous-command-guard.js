#!/usr/bin/env node
/**
 * Hook: PreToolUse (Bash)
 * Inspects shell commands for dangerous operations and blocks them.
 * Override: include [override:DANGEROUS-CMD] in the request context.
 *
 * Fail-open: errors → allow (exit 0)
 */

'use strict';

const { readStdinSync, blockWith } = require('./lib/fs-utils');

// Dangerous patterns with labels and safe exceptions
const DANGEROUS_RULES = [
  {
    label: 'rm -rf (recursive force delete)',
    // Match rm -rf / rm -fr / rm -r -f variants
    pattern: /\brm\s+(-\w*r\w*f\w*|-\w*f\w*r\w*)\s+/i,
    // Allow deleting known safe directories
    exceptions: [
      /\brm\s+(-\w*[rf]\w*\s+){1,2}(node_modules|dist|build|\.next|coverage|\.cache|__pycache__|\.pytest_cache)\b/,
    ],
  },
  {
    label: 'git push --force / git push -f',
    pattern: /\bgit\s+push\s+.*(-f\b|--force\b)/i,
    exceptions: [],
  },
  {
    label: 'git reset --hard',
    pattern: /\bgit\s+reset\s+--hard\b/i,
    exceptions: [],
  },
  {
    label: 'DROP TABLE / DROP DATABASE (destructive SQL)',
    pattern: /\b(DROP\s+TABLE|DROP\s+DATABASE|TRUNCATE\s+TABLE)\b/i,
    exceptions: [],
  },
  {
    label: 'chmod 777 (open permissions)',
    pattern: /\bchmod\s+(777|a\+rwx)\b/i,
    exceptions: [],
  },
];

function checkCommand(command) {
  for (const rule of DANGEROUS_RULES) {
    if (!rule.pattern.test(command)) continue;

    // Check exceptions
    const isException = rule.exceptions.some(exc => exc.test(command));
    if (isException) continue;

    return rule.label;
  }
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

  if (!command) {
    process.exit(0);
  }

  const matched = checkCommand(command);
  if (!matched) {
    process.exit(0);
  }

  // Check for override tag
  const inputStr = JSON.stringify(input);
  if (inputStr.includes('[override:DANGEROUS-CMD]')) {
    process.exit(0);
  }

  blockWith(
    `Dangerous command detected: ${matched}\n` +
    `Command: ${command.slice(0, 200)}${command.length > 200 ? '...' : ''}\n` +
    `To proceed, include [override:DANGEROUS-CMD] in your request with a reason.\n` +
    `See docs/standards/10-override-policy.md for details.`
  );
  process.exit(0);
}

main();
