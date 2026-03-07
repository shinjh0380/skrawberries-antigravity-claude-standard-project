/**
 * Zero-dependency YAML frontmatter parser.
 * Supports simple key: value pairs and quoted string values.
 * Does NOT support nested objects, arrays, or multiline values.
 */

'use strict';

/**
 * Parse a YAML frontmatter block from markdown content.
 * @param {string} content - Raw file content
 * @returns {{ data: Object, body: string } | null} Parsed frontmatter and body, or null if no frontmatter
 */
function parse(content) {
  if (typeof content !== 'string') return null;

  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return null;

  const yamlBlock = match[1];
  const body = match[2] || '';

  const data = {};
  const lines = yamlBlock.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;

    const key = trimmed.slice(0, colonIdx).trim();
    let value = trimmed.slice(colonIdx + 1).trim();

    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data, body };
}

/**
 * Stringify an object to YAML frontmatter format.
 * @param {Object} data - Key-value pairs
 * @returns {string} YAML frontmatter block
 */
function stringify(data) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(data)) {
    const strValue = String(value);
    // Quote values that contain special characters
    const needsQuote = /[:#\[\]{}|>&*!,?]/.test(strValue) || strValue.trim() !== strValue;
    lines.push(needsQuote ? `${key}: "${strValue.replace(/"/g, '\\"')}"` : `${key}: ${strValue}`);
  }
  lines.push('---');
  return lines.join('\n');
}

module.exports = { parse, stringify };

// Self-test when run directly
if (require.main === module) {
  const testContent = `---
direction: "ag-to-cc"
source-tool: "antigravity"
task-id: task-2025-001
status: "pending"
---

# Test Document

Body content here.
`;

  const result = parse(testContent);
  console.log('Parse result:', JSON.stringify(result, null, 2));

  const roundtrip = stringify(result.data) + '\n' + result.body;
  console.log('\nRoundtrip:\n', roundtrip);

  console.log('\nSelf-test passed.');
}
