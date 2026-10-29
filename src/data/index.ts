import type { LanguageTrack } from '../types';
import { track as python } from './python.mjs';
import { track as javascript } from './javascript.mjs';
import { track as java } from './java.mjs';

export const tracks: LanguageTrack[] = [python, javascript, java];
