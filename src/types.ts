export type LevelName = 'basic' | 'intermediate' | 'advanced';

export type Question = {
  id: string;
  code: string;
  ask: string;
  options: string[];
  answer: number;
  why: string;
  run?: 'python' | 'node';
};

export type Lesson = {
  id: string;
  title: string;
  level: LevelName;
  summary: string;
  questions: Question[];
};

export type LanguageId = 'python' | 'javascript' | 'java';

export type LanguageTrack = {
  id: LanguageId;
  name: string;
  blurb: string;
  lessons: Lesson[];
};

export type LessonProgress = {
  bestCorrect: number;
  bestTotal: number;
  attempts: number;
  passed: boolean;
};

export type Attempt = {
  id: string;
  at: number;
  languageId: LanguageId;
  languageName: string;
  lessonId: string;
  lessonTitle: string;
  correct: number;
  total: number;
  passed: boolean;
};

export type Store = {
  lessons: Record<string, LessonProgress>;
  history: Attempt[];
  unlockAll: boolean;
};
