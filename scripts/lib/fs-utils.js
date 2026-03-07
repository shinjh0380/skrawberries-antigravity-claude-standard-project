/**
 * File system utilities for hook scripts.
 * Zero-dependency, Node.js built-ins only.
 */

'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Check if a path exists (file or directory).
 * @param {string} filePath
 * @returns {boolean}
 */
function exists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Read a file as UTF-8 string. Returns null on error.
 * @param {string} filePath
 * @returns {string|null}
 */
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

/**
 * List files in a directory with optional extension filter.
 * Returns empty array on error.
 * @param {string} dirPath
 * @param {string} [ext] - Extension filter (e.g., '.md')
 * @returns {string[]} Absolute file paths
 */
function listFiles(dirPath, ext) {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    return entries
      .filter(e => e.isFile() && (!ext || e.name.endsWith(ext)))
      .map(e => path.join(dirPath, e.name));
  } catch {
    return [];
  }
}

/**
 * Get the modification time of a file. Returns null on error.
 * @param {string} filePath
 * @returns {Date|null}
 */
function getModTime(filePath) {
  try {
    return fs.statSync(filePath).mtime;
  } catch {
    return null;
  }
}

/**
 * Find files modified within the last N milliseconds.
 * @param {string} dirPath
 * @param {number} withinMs
 * @returns {string[]} Recently modified file paths
 */
function recentFiles(dirPath, withinMs) {
  const cutoff = Date.now() - withinMs;
  const files = listFiles(dirPath);
  return files.filter(f => {
    const mtime = getModTime(f);
    return mtime && mtime.getTime() > cutoff;
  });
}

/**
 * Read stdin as a string. Returns '' on error.
 * @returns {string}
 */
function readStdin() {
  try {
    return fs.readFileSync('/dev/stdin', 'utf8');
  } catch {
    try {
      // Windows fallback
      const buf = [];
      const fd = fs.openSync('\\\\.\\pipe\\stdin', 'r');
      let chunk;
      while ((chunk = fs.readSync(fd, Buffer.alloc(4096))) > 0) {
        buf.push(chunk);
      }
      return Buffer.concat(buf).toString('utf8');
    } catch {
      return '';
    }
  }
}

/**
 * Parse stdin JSON. Returns null on error.
 * @returns {Object|null}
 */
function parseStdinJson() {
  try {
    const raw = process.stdin.read ? readStdinSync() : '';
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Synchronously read all stdin data (blocking).
 * @returns {string}
 */
function readStdinSync() {
  const CHUNK_SIZE = 65536;
  const chunks = [];
  let bytesRead;
  while (true) {
    try {
      const buf = Buffer.alloc(CHUNK_SIZE);
      bytesRead = fs.readSync(0, buf, 0, CHUNK_SIZE, null);
      if (bytesRead === 0) break;
      chunks.push(buf.slice(0, bytesRead));
    } catch {
      break;
    }
  }
  return Buffer.concat(chunks).toString('utf8');
}

/**
 * Emit a hook block response to stdout.
 * @param {string} reason
 */
function blockWith(reason) {
  process.stdout.write(JSON.stringify({ decision: 'block', reason }));
}

/**
 * Emit an informational message to stdout (non-blocking advisory).
 * @param {string} message
 */
function advise(message) {
  process.stdout.write(message);
}

module.exports = {
  exists,
  readFile,
  listFiles,
  getModTime,
  recentFiles,
  readStdinSync,
  blockWith,
  advise,
};
