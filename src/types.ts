export type TabType = 'home' | 'breathe' | 'care' | 'mirror' | 'rest' | 'support';

export type MoodValue = 1 | 2 | 3 | 4 | 5; // 1: Exhausted, 2: Stressed/Busy, 3: Neutral, 4: Calm/Good, 5: Balanced/Focused

export interface MoodLog {
  id: string;
  timestamp: number; // Date.now()
  dayOfWeek: 'M' | 'T' | 'W' | 'T' | 'F' | 'S' | 'S';
  moodValue: MoodValue;
  label: string; // "Exhausted" | "Anxious" | "Busy" | "Calm" | "Balanced"
  note?: string;
  contextTag?: string; // "Exams", "Sleep", "Social", "Workload", etc.
  sleepHours?: number;
  isAcademicDeadline?: boolean;
}

export interface MicroBreak {
  id: string;
  title: string;
  subtitle: string;
  category: 'audio' | 'grounding' | 'breathing' | 'stretch';
  icon: string;
  colorClass: string;
  bgColorClass: string;
  durationSeconds: number;
  description: string;
}

export interface NightSound {
  id: 'rainstorm' | 'whitenoise' | 'campfire';
  title: string;
  subtitle: string;
  icon: string;
}

export interface StudentProfile {
  name: string;
  gradeLevel: string; // "High School Senior", "Middle School", "College Freshmen", etc.
  dailyBreakTarget: number;
  avatarUrl: string;
  sleepModeEnabled: boolean;
  activeNightSound: string | null;
  nightSoundVolume: number; // 0 to 1
  completedBreaksToday: number;
  streakDays: number;
}

export interface JournalEntry {
  id: string;
  timestamp: number;
  content: string;
  moodTag?: string;
  prompt?: string;
  tags?: string[];
}
