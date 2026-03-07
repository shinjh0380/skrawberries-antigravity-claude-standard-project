#!/usr/bin/env node
/**
 * Hook: Stop (all)
 * Advisory checks for active agent team charters:
 *   - TeammateIdle: prompts status log update and next-step notes
 *   - TaskCompleted: checks evidence exists and acceptance criteria reviewed
 *
 * Fail-open: all errors → silent exit 0
 * Advisory only: uses advise(), never blockWith()
 * Low-noise: completely silent when no active charter found
 */

'use strict';

const path = require('path');
const { exists, listFiles, advise } = require('./lib/fs-utils');
const { parse } = require('./lib/yaml-frontmatter');
const { readFile } = require('./lib/fs-utils');

function getProjectDir() {
  return process.env.CLAUDE_PROJECT_DIR || process.cwd();
}

function findActiveCharter(projectDir) {
  const handoffsDir = path.join(projectDir, 'handoffs');
  if (!exists(handoffsDir)) return null;

  let files;
  try {
    files = listFiles(handoffsDir, '.md');
  } catch {
    return null;
  }

  for (const file of files) {
    if (!path.basename(file).startsWith('charter-')) continue;
    const content = readFile(file);
    if (!content) continue;
    const result = parse(content);
    if (
      result &&
      result.data.status === 'active' &&
      result.data.experimental === true
    ) {
      return { file, data: result.data, body: result.content };
    }
  }
  return null;
}

function hasTaskEvidence(projectDir, taskId) {
  if (!taskId) return true; // can't check without ID — don't false-alarm
  const evidenceDir = path.join(projectDir, 'evidence');
  if (!exists(evidenceDir)) return false;

  let fs;
  try {
    fs = require('fs');
  } catch {
    return false;
  }

  try {
    const entries = fs.readdirSync(evidenceDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name.includes(taskId)) {
        return true;
      }
    }
  } catch {
    return false;
  }
  return false;
}

function main() {
  try {
    const projectDir = getProjectDir();
    const charter = findActiveCharter(projectDir);

    // Low-noise: completely silent when no active charter
    if (!charter) return;

    const taskId = charter.data['task-id'] || '';
    const advisories = [];

    // TeammateIdle advisory: always remind when charter is active
    advisories.push(
      '👥 Team Status Check: 활성 agent team charter가 감지되었습니다.\n' +
      '   - charter Status Log에 현재 팀 작업 진행 상태를 기록하세요.\n' +
      '   - 미완료 팀원 작업이 있으면 next-step 노트를 남기세요.\n' +
      '   - 완료된 팀원은 즉시 종료하세요 (TEAM-13: 유휴 팀원 = 토큰 낭비).'
    );

    // TaskCompleted advisory: check evidence
    const evidenceExists = hasTaskEvidence(projectDir, taskId);
    if (!evidenceExists) {
      advisories.push(
        '📋 Team Evidence Check: 팀 작업 증거가 수집되지 않았습니다.\n' +
        '   - evidence/ 디렉토리에 task-id(' + (taskId || '?') + ') 관련 증거를 수집하세요.\n' +
        '   - 팀 작업 완료 전에 /verification-bundle을 실행하세요.\n' +
        '   - charter의 success criteria(acceptance criteria)를 확인하세요.'
      );
    }

    if (advisories.length > 0) {
      advise('\n' + advisories.join('\n\n') + '\n');
    }
  } catch {
    // Silent fail-open
  }
  process.exit(0);
}

main();
