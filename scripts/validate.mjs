import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { track as python } from '../src/data/python.mjs';
import { track as javascript } from '../src/data/javascript.mjs';
import { track as java } from '../src/data/java.mjs';

const tracks = [python, javascript, java];
const failures = [];

function normalize(stdout) {
  return stdout.endsWith('\n') ? stdout.slice(0, -1) : stdout;
}

function run(kind, code) {
  const dir = mkdtempSync(join(tmpdir(), 'techshala-'));
  const file = join(dir, kind === 'python' ? 'main.py' : 'main.mjs');
  writeFileSync(file, code);
  const result = spawnSync(kind === 'python' ? 'python3' : 'node', [file], {
    encoding: 'utf8',
    timeout: 5000,
  });
  rmSync(dir, { recursive: true, force: true });
  return result;
}

for (const track of tracks) {
  if (track.lessons.length < 26) {
    failures.push(`${track.name} has ${track.lessons.length} lessons, expected at least 26`);
  }
  const levels = new Set(track.lessons.map((lesson) => lesson.level));
  for (const level of ['basic', 'intermediate', 'advanced']) {
    if (!levels.has(level)) failures.push(`${track.name} is missing ${level} lessons`);
  }

  for (const lesson of track.lessons) {
    if (lesson.questions.length < 8) {
      failures.push(`${track.name} / ${lesson.title} has ${lesson.questions.length} programs, expected at least 8`);
    }
    for (const question of lesson.questions) {
      const where = `${track.name} / ${lesson.title} / ${question.ask}`;
      if (question.options.length !== 4) failures.push(`${where} does not have 4 options`);
      if (question.answer < 0 || question.answer > 3) failures.push(`${where} has a bad answer index`);
      if (!question.why || question.why.length < 40) failures.push(`${where} explanation is too short`);
      const expectsRun = track.id === 'java' ? undefined : track.id === 'python' ? 'python' : 'node';
      if (question.run !== expectsRun) failures.push(`${where} has run=${question.run}, expected ${expectsRun}`);
      if (!question.run) continue;

      const result = run(question.run, question.code);
      if (result.error || result.status !== 0) {
        failures.push(`${where} failed to run\n${result.stderr || result.error}`);
        continue;
      }
      const actual = normalize(result.stdout);
      const expected = question.options[question.answer];
      if (actual !== expected) {
        failures.push(`${where}\n  expected ${JSON.stringify(expected)}\n  actual   ${JSON.stringify(actual)}`);
      }
    }
  }
}

if (failures.length) {
  console.error(failures.join('\n\n'));
  console.error(`\n${failures.length} problem(s).`);
  process.exit(1);
}

const total = tracks.reduce((sum, track) => sum + track.lessons.reduce((count, lesson) => count + lesson.questions.length, 0), 0);
console.log(`Validated ${total} programs across ${tracks.map((track) => track.name).join(', ')}.`);
