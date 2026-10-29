function hash(value) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let state = seed >>> 0;
  return function next() {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function q(code, ask, correct, wrongs, why, run) {
  const trimmed = code.replace(/^\n/, '').trimEnd();
  if (!trimmed) throw new Error(`Empty program: ${ask}`);
  if (!Array.isArray(wrongs) || wrongs.length !== 3) throw new Error(`Need 3 other options: ${ask}`);
  if (!why || why.trim().length < 40) throw new Error(`Explanation too short: ${ask}`);
  const options = [correct, ...wrongs];
  if (options.some((option) => typeof option !== 'string' || option.length === 0)) {
    throw new Error(`Blank option: ${ask}`);
  }
  if (new Set(options).size !== 4) throw new Error(`Options must be unique: ${ask}`);

  const rand = mulberry32(hash(`${trimmed}\n${ask}`));
  for (let i = options.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  const question = {
    code: trimmed,
    ask,
    options,
    answer: options.indexOf(correct),
    why: why.trim(),
  };
  if (run) question.run = run;
  return question;
}

export function lesson(id, title, level, summary, questions) {
  return {
    id,
    title,
    level,
    summary,
    questions: questions.map((question, index) => ({
      ...question,
      id: `${id}-${index + 1}`,
    })),
  };
}
