import { createContext, useContext, useMemo, useState } from 'react';
import type { Attempt, LanguageId, Store } from '../types';
import { lessonKey } from './curriculum';

const STORAGE_KEY = 'techshala-progress-v1';

const EMPTY: Store = { lessons: {}, history: [], unlockAll: false };

function loadStore(): Store {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Store>;
    if (!parsed || typeof parsed !== 'object' || !parsed.lessons || !Array.isArray(parsed.history)) return EMPTY;
    return {
      lessons: parsed.lessons,
      history: parsed.history,
      unlockAll: Boolean(parsed.unlockAll),
    };
  } catch {
    return EMPTY;
  }
}

function saveStore(store: Store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

type NewAttempt = Omit<Attempt, 'id' | 'at'>;

type ProgressApi = {
  store: Store;
  record: (attempt: NewAttempt) => void;
  setUnlockAll: (unlockAll: boolean) => void;
};

const ProgressContext = createContext<ProgressApi | null>(null);

function applyAttempt(current: Store, attempt: NewAttempt): Store {
  const key = lessonKey(attempt.languageId, attempt.lessonId);
  const previous = current.lessons[key];
  const ratio = attempt.correct / attempt.total;
  const previousRatio = previous ? previous.bestCorrect / previous.bestTotal : -1;
  const better = ratio >= previousRatio;
  return {
    ...current,
    lessons: {
      ...current.lessons,
      [key]: {
        bestCorrect: !previous || better ? attempt.correct : previous.bestCorrect,
        bestTotal: !previous || better ? attempt.total : previous.bestTotal,
        attempts: (previous?.attempts ?? 0) + 1,
        passed: Boolean(previous?.passed) || ratio >= 0.7,
      },
    },
    history: [
      { ...attempt, id: `${Date.now()}`, at: Date.now() },
      ...current.history,
    ].slice(0, 40),
  };
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<Store>(loadStore);

  const api = useMemo<ProgressApi>(() => ({
    store,
    record(attempt) {
      setStore((current) => {
        const next = applyAttempt(current, attempt);
        saveStore(next);
        return next;
      });
    },
    setUnlockAll(unlockAll) {
      setStore((current) => {
        const next = { ...current, unlockAll };
        saveStore(next);
        return next;
      });
    },
  }), [store]);

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const api = useContext(ProgressContext);
  if (!api) throw new Error('Progress is unavailable');
  return api;
}

export type { LanguageId };
