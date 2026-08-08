import { MoodLog, StudentProfile, JournalEntry } from '../types';

const STORAGE_KEYS = {
  MOOD_LOGS: 'zenpulse_mood_logs',
  PROFILE: 'zenpulse_profile',
  JOURNAL: 'zenpulse_journal',
};

// Initial default profile for students
export const DEFAULT_PROFILE: StudentProfile = {
  name: 'Anushka',
  gradeLevel: 'High School Senior',
  dailyBreakTarget: 3,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  sleepModeEnabled: false,
  activeNightSound: null,
  nightSoundVolume: 0.7,
  completedBreaksToday: 2,
  streakDays: 4,
};

// Initial default mood logs for the week to render a beautiful wave trend
export const DEFAULT_MOOD_LOGS: MoodLog[] = [
  {
    id: 'm-1',
    timestamp: Date.now() - 6 * 86400000,
    dayOfWeek: 'M',
    moodValue: 2,
    label: 'Anxious',
    contextTag: 'Math Mock Test',
    note: 'Stressed about physics homework',
  },
  {
    id: 'm-2',
    timestamp: Date.now() - 5 * 86400000,
    dayOfWeek: 'T',
    moodValue: 3,
    label: 'Busy',
    contextTag: 'Late assignment',
    note: 'Studying 14 hours back to back',
  },
  {
    id: 'm-3',
    timestamp: Date.now() - 4 * 86400000,
    dayOfWeek: 'W',
    moodValue: 2,
    label: 'Exhausted',
    contextTag: 'Chemistry Lab',
    note: 'Tired eyes after screen time',
  },
  {
    id: 'm-4',
    timestamp: Date.now() - 3 * 86400000,
    dayOfWeek: 'T',
    moodValue: 1,
    label: 'Resting',
    contextTag: 'Rain sound break',
    note: 'Took a 10 min breather',
  },
  {
    id: 'm-5',
    timestamp: Date.now() - 2 * 86400000,
    dayOfWeek: 'F',
    moodValue: 4,
    label: 'Calm',
    contextTag: 'Box Breathing',
    note: 'Felt much more centered',
  },
  {
    id: 'm-6',
    timestamp: Date.now() - 1 * 86400000,
    dayOfWeek: 'S',
    moodValue: 5,
    label: 'Balanced',
    contextTag: 'Weekend walk',
    note: 'Mind feels clearer',
  },
  {
    id: 'm-7',
    timestamp: Date.now(),
    dayOfWeek: 'S',
    moodValue: 4,
    label: 'Focused',
    contextTag: 'Study session',
    note: 'Ready for the week ahead',
  },
];

export const DEFAULT_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'j-1',
    timestamp: Date.now() - 86400000,
    content: 'Finished my calculus assignment! Taking a moment to breathe before biology.',
    moodTag: 'Calm',
  },
];

export function getStoredMoodLogs(): MoodLog[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MOOD_LOGS);
    return data ? JSON.parse(data) : DEFAULT_MOOD_LOGS;
  } catch (e) {
    console.error(e);
    return DEFAULT_MOOD_LOGS;
  }
}

export function saveMoodLog(log: Omit<MoodLog, 'id' | 'timestamp'>): MoodLog {
  const existing = getStoredMoodLogs();
  const newLog: MoodLog = {
    ...log,
    id: 'm-' + Date.now(),
    timestamp: Date.now(),
  };
  const updated = [newLog, ...existing];
  try {
    localStorage.setItem(STORAGE_KEYS.MOOD_LOGS, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return newLog;
}

export function getStoredProfile(): StudentProfile {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? { ...DEFAULT_PROFILE, ...JSON.parse(data) } : DEFAULT_PROFILE;
  } catch (e) {
    console.error(e);
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: Partial<StudentProfile>): StudentProfile {
  const current = getStoredProfile();
  const updated = { ...current, ...profile };
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return updated;
}

export function getStoredJournal(): JournalEntry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.JOURNAL);
    return data ? JSON.parse(data) : DEFAULT_JOURNAL_ENTRIES;
  } catch (e) {
    console.error(e);
    return DEFAULT_JOURNAL_ENTRIES;
  }
}

export function addJournalEntry(content: string, moodTag?: string): JournalEntry {
  const existing = getStoredJournal();
  const entry: JournalEntry = {
    id: 'j-' + Date.now(),
    timestamp: Date.now(),
    content,
    moodTag,
  };
  const updated = [entry, ...existing];
  try {
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return entry;
}
