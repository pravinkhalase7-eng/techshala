import { tracks } from '../data';
import type { LanguageTrack, Lesson, Store } from '../types';

export function lessonKey(languageId: string, lessonId: string) {
  return `${languageId}:${lessonId}`;
}

export function neededToPass(total: number) {
  return Math.ceil((total * 70) / 100);
}

export function getTrack(id: string | undefined) {
  return tracks.find((track) => track.id === id);
}

export function isUnlocked(track: LanguageTrack, index: number, store: Store) {
  if (store.unlockAll || index <= 0) return true;
  const previous = track.lessons[index - 1];
  return Boolean(store.lessons[lessonKey(track.id, previous.id)]?.passed);
}

export function continueLesson(track: LanguageTrack, store: Store): Lesson {
  const open = track.lessons.find((lesson, index) => {
    return isUnlocked(track, index, store) && !store.lessons[lessonKey(track.id, lesson.id)]?.passed;
  });
  return open ?? track.lessons[track.lessons.length - 1];
}

export function programCount(track?: LanguageTrack) {
  const list = track ? [track] : tracks;
  return list.reduce(
    (sum, item) => sum + item.lessons.reduce((count, lesson) => count + lesson.questions.length, 0),
    0,
  );
}

export function passedLessons(track: LanguageTrack, store: Store) {
  return track.lessons.filter((lesson) => store.lessons[lessonKey(track.id, lesson.id)]?.passed).length;
}

export const LEVELS = [
  { id: 'basic', label: 'Basic' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
] as const;
