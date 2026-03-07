#!/usr/bin/env node
/**
 * Hook: SessionStart (all)
 * Loads session context: pending handoffs, git state, warnings.
 * Output is injected into Claude's context at session start.
 *
 * Fail-open: errors → minimal output or silent exit 0
 */

'use strict';

const path = require('path');
const { execSync } = require('child_process');
const { exists, listFiles, readFile, advise } = require('./lib/fs-utils');
const { parse } = require('./lib/yaml-frontmatter');

function getProjectDir() {
  return process.env.CLAUDE_PROJECT_DIR || process.cwd();
}

function getGitLog(projectDir) {
  try {
    return execSync('git log --oneline -5', {
      cwd: projectDir,
      encoding: 'utf8',
      timeout: 5000,
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
  } catch {
    return '(git log unavailable)';
  }
}

function getGitStatus(projectDir) {
  try {
    const status = execSync('git status --short', {
      cwd: projectDir,
      encoding: 'utf8',
      timeout: 5000,
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
    return status || '(clean working tree)';
  } catch {
    return '(git status unavailable)';
  }
}

function getPendingHandoffs(projectDir) {
  const handoffsDir = path.join(projectDir, 'handoffs');
  if (!exists(handoffsDir)) return [];

  const files = listFiles(handoffsDir, '.md');
  const pending = [];

  for (const file of files) {
    const content = readFile(file);
    if (!content) continue;
    const result = parse(content);
    if (!result) continue;

    const { data } = result;
    if (data.status === 'pending' || data.status === 'received') {
      pending.push({
        file: path.basename(file),
        taskId: data['task-id'] || '?',
        direction: data.direction || '?',
        status: data.status || '?',
        priority: data.priority || 'normal',
      });
    }
  }

  return pending;
}

function buildContextSummary(projectDir) {
  const lines = [
    '═══════════════════════════════════════════════════════',
    '  SESSION CONTEXT — Antigravity + Claude Code Framework',
    '═══════════════════════════════════════════════════════',
  ];

  // Git state
  lines.push('\n## Git State\n');
  lines.push('Recent commits:');
  lines.push(getGitLog(projectDir));
  lines.push('\nUncommitted changes:');
  lines.push(getGitStatus(projectDir));

  // Pending handoffs
  const pending = getPendingHandoffs(projectDir);
  lines.push('\n## Pending Handoffs\n');
  if (pending.length === 0) {
    lines.push('(없음)');
  } else {
    for (const h of pending) {
      const priorityMark = h.priority === 'critical' ? ' ⚠ CRITICAL' :
                           h.priority === 'high' ? ' ! HIGH' : '';
      lines.push(`- [${h.status.toUpperCase()}] ${h.file} (${h.taskId})${priorityMark}`);
    }
    lines.push('\n핸드오프 처리: /handoff-review');
  }

  // Evidence directory
  const evidenceDir = path.join(projectDir, 'evidence');
  lines.push('\n## Evidence Directory\n');
  if (!exists(evidenceDir)) {
    lines.push('(없음 — 기능 구현 후 /verification-bundle 실행)');
  } else {
    let bundles;
    try {
      const fs = require('fs');
      bundles = fs.readdirSync(evidenceDir, { withFileTypes: true })
        .filter(e => e.isDirectory())
        .map(e => e.name)
        .slice(-3); // Last 3
    } catch {
      bundles = [];
    }
    if (bundles.length === 0) {
      lines.push('(빈 디렉토리)');
    } else {
      lines.push(`최근 번들: ${bundles.join(', ')}`);
    }
  }

  // Session tips
  lines.push('\n## Session Tips\n');
  lines.push('- 세션 시작: /session-init');
  lines.push('- 완료 전: /final-walkthrough');
  lines.push('- 핸드오프 수신: /handoff-review');

  lines.push('\n═══════════════════════════════════════════════════════\n');
  return lines.join('\n');
}

function main() {
  try {
    const projectDir = getProjectDir();
    const summary = buildContextSummary(projectDir);
    advise(summary);
  } catch {
    // Silent fail-open
  }
  process.exit(0);
}

main();
