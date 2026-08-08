import React, { useState, useEffect } from 'react';
import { Wind, Sparkles, CheckCircle2, Eye, Droplet, Moon, BookOpen, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MoodValue, StudentProfile, MoodLog } from '../types';
import { audioSynth } from '../utils/audioSynth';
import { CopingToolkit } from './CopingToolkit';

interface BreatheTabProps {
  profile: StudentProfile;
  onLogMood: (moodValue: MoodValue, label: string, note?: string, tag?: string, sleepHours?: number, isAcademicDeadline?: boolean) => void;
  onIncrementBreak: () => void;
  recentMoods: MoodLog[];
}

export const BreatheTab: React.FC<BreatheTabProps> = ({
  profile,
  onLogMood,
  onIncrementBreak,
}) => {
  // Breathing session state
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [breathSecondsLeft, setBreathSecondsLeft] = useState(120);

  // Mood & Journal selection state
  const [selectedMoodValue, setSelectedMoodValue] = useState<MoodValue | null>(null);
  const [moodNote, setMoodNote] = useState('');
  const [triggerTag, setTriggerTag] = useState<string>('Exams/Deadlines');
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [isAcademicDeadline, setIsAcademicDeadline] = useState<boolean>(false);
  const [moodSaved, setMoodSaved] = useState(false);

  // Guided prompts list
  const reflectionPrompts = [
    "What's one main thing that affected your mood today?",
    "What is one tiny victory you had during study hours?",
    "Where in your body are you holding physical tension?",
  ];
  const [activePromptIdx, setActivePromptIdx] = useState(0);

  // Quick student refreshers
  const [activeRefresher, setActiveRefresher] = useState<'eye' | 'water' | null>(null);

  // Guided breathing logic
  useEffect(() => {
    let interval: number | undefined;
    let phaseTimer: number | undefined;

    if (isBreathing) {
      audioSynth.playBreathingTone(220);
      const phases: ('Inhale' | 'Hold' | 'Exhale' | 'Pause')[] = ['Inhale', 'Hold', 'Exhale', 'Pause'];
      let currentPhaseIdx = 0;

      phaseTimer = window.setInterval(() => {
        currentPhaseIdx = (currentPhaseIdx + 1) % phases.length;
        const newPhase = phases[currentPhaseIdx];
        setBreathPhase(newPhase);

        if (newPhase === 'Inhale') {
          audioSynth.playBreathingTone(220);
        } else if (newPhase === 'Exhale') {
          audioSynth.playBreathingTone(176);
        }
      }, 4000);

      interval = window.setInterval(() => {
        setBreathSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsBreathing(false);
            onIncrementBreak();
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
            return 120;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathPhase('Inhale');
    }

    return () => {
      if (interval) clearInterval(interval);
      if (phaseTimer) clearInterval(phaseTimer);
    };
  }, [isBreathing, onIncrementBreak]);

  const toggleBreathing = () => {
    if (isBreathing) {
      setIsBreathing(false);
    } else {
      setBreathSecondsLeft(120);
      setIsBreathing(true);
    }
  };

  const handleSelectMood = (value: MoodValue) => {
    setSelectedMoodValue(value);
    setMoodSaved(false);
  };

  const submitMoodLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMoodValue) return;

    const labels: Record<MoodValue, string> = {
      1: 'Exhausted',
      2: 'Anxious',
      3: 'Busy',
      4: 'Calm',
      5: 'Balanced',
    };

    onLogMood(
      selectedMoodValue,
      labels[selectedMoodValue],
      moodNote,
      triggerTag,
      sleepHours,
      isAcademicDeadline
    );
    setMoodSaved(true);
    setTimeout(() => {
      setSelectedMoodValue(null);
      setMoodNote('');
      setMoodSaved(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto px-5 pt-20 pb-32 flex flex-col items-center">
      {/* Header Banner */}
      <div className="w-full mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-chip text-[#2d4531] text-xs font-bold mb-2">
          <Wind className="w-3.5 h-3.5 text-[#36533a]" />
          <span>Page 2: Breathe, Check-In & Toolkit</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#2d4531] tracking-tight font-['Quicksand']">
          Guided Calm & Mood Logging
        </h2>
        <p className="text-sm font-medium text-[#455448] mt-0.5">
          Regulate your pulse and log daily factors affecting your mind.
        </p>
      </div>

      {/* Guided Breathing Hero Ring */}
      <section className="flex flex-col items-center justify-center w-full mb-8">
        <div
          onClick={toggleBreathing}
          className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center group cursor-pointer select-none"
        >
          <div className="absolute inset-0 bg-[#4a654e]/20 rounded-full blur-3xl opacity-60 group-hover:opacity-85 transition-opacity duration-1000" />
          <div
            className={`absolute w-full h-full bg-[#8ba88e] rounded-full transition-all duration-1000 ${
              isBreathing ? 'breathing-pulse-active opacity-40 scale-105' : 'breathing-pulse opacity-30'
            }`}
            style={{ animationDelay: '0s' }}
          />
          <div
            className={`absolute w-[82%] h-[82%] bg-[#8ba88e] rounded-full transition-all duration-1000 ${
              isBreathing ? 'breathing-pulse-active opacity-60' : 'breathing-pulse opacity-40'
            }`}
            style={{ animationDelay: '-2s' }}
          />

          <div
            className={`relative w-[62%] h-[62%] rounded-full flex flex-col items-center justify-center z-10 transition-all duration-500 glass-card border border-white/80 ${
              isBreathing
                ? 'scale-110 bg-white/40 border-white ring-4 ring-[#4a654e]/30'
                : 'group-hover:scale-105 bg-white/30'
            }`}
          >
            <div className="w-12 h-12 rounded-full glass-chip flex items-center justify-center mb-1">
              <Wind
                className={`w-6 h-6 transition-all duration-500 ${
                  isBreathing ? 'text-[#2d4531] animate-spin-slow' : 'text-[#36533a]'
                }`}
              />
            </div>
            <span className="text-base font-bold text-[#2d4531]">
              {isBreathing ? breathPhase : 'Breathe'}
            </span>
            {isBreathing && (
              <span className="text-xs text-[#2d4531] font-semibold mt-0.5">
                {Math.floor(breathSecondsLeft / 60)}:
                {(breathSecondsLeft % 60).toString().padStart(2, '0')}
              </span>
            )}
          </div>
        </div>

        <p className="text-sm font-semibold text-[#455448] mt-6 text-center max-w-[280px]">
          {isBreathing
            ? 'Follow the rhythm. Inhale deeply, release gently.'
            : 'Tap to begin a guided moment of calm.'}
        </p>
      </section>

      {/* Coping Toolkit Section */}
      <CopingToolkit />

      {/* Mood & Factors Check-in Section */}
      <section className="w-full glass-card rounded-3xl p-6 border border-white/60 flex flex-col items-center">
        <h3 className="text-lg font-bold text-[#2d4531] mb-1 text-center">
          How do you feel today?
        </h3>
        <p className="text-xs font-semibold text-[#5a6b5d] mb-4 text-center">
          Tap a mood blob to check in (gentle daily tracking)
        </p>

        <div className="flex justify-between items-center w-full px-1 gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => handleSelectMood(val as MoodValue)}
              className={`w-11 h-11 rounded-full transition-all duration-300 hover:scale-110 ${
                val === 1
                  ? 'bg-[#f3e0c2]'
                  : val === 2
                  ? 'bg-[#b09f83]'
                  : val === 3
                  ? 'bg-[#e1e3e2]'
                  : val === 4
                  ? 'bg-[#8ba88e]'
                  : 'bg-[#cceace]'
              } ${
                selectedMoodValue === val
                  ? 'ring-4 ring-[#4a654e]/40 scale-110 shadow-md'
                  : 'opacity-80 hover:opacity-100'
              }`}
            />
          ))}
        </div>

        {selectedMoodValue && (
          <form onSubmit={submitMoodLog} className="w-full flex flex-col gap-3.5 animate-fade-in">
            {/* Trigger / Context Tagging */}
            <div>
              <label className="block text-xs font-bold text-[#2d4531] mb-1 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#36533a]" /> Primary Trigger / Context:
              </label>
              <div className="flex gap-1.5 flex-wrap">
                {['Exams/Deadlines', 'Sleep Deficit', 'Social/Friends', 'Heavy Workload', 'Personal'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setTriggerTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                      triggerTag === tag
                        ? 'bg-[#36533a] text-white border-[#36533a]'
                        : 'glass-chip text-[#36533a] hover:bg-white/60'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Student Specific: Sleep & Academic Correlation */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 glass-card rounded-2xl border border-white/80">
                <label className="block text-[11px] font-bold text-[#2d4531] mb-1 flex items-center gap-1">
                  <Moon className="w-3 h-3 text-[#36533a]" /> Sleep Hours:
                </label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(parseFloat(e.target.value) || 7)}
                  className="w-full px-3 py-1.5 bg-white/60 rounded-xl text-xs font-bold text-[#191c1c] border border-white/80 focus:outline-none"
                />
              </div>

              <div className="p-3 glass-card rounded-2xl border border-white/80 flex flex-col justify-center">
                <label className="flex items-center gap-2 text-[11px] font-bold text-[#2d4531] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAcademicDeadline}
                    onChange={(e) => setIsAcademicDeadline(e.target.checked)}
                    className="rounded text-[#36533a] focus:ring-0"
                  />
                  <span>Exam / Project Deadline Active</span>
                </label>
              </div>
            </div>

            {/* Guided Prompt + Journal Entry */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#2d4531] flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#36533a]" /> Reflection Prompt:
                </span>
                <button
                  type="button"
                  onClick={() => setActivePromptIdx((prev) => (prev + 1) % reflectionPrompts.length)}
                  className="text-[10px] font-bold text-[#36533a] underline"
                >
                  Shuffle Prompt
                </button>
              </div>
              <p className="text-xs italic text-[#5a6b5d] mb-1.5 font-medium">"{reflectionPrompts[activePromptIdx]}"</p>

              <textarea
                rows={2}
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
                placeholder="Free text reflection..."
                className="w-full text-xs font-medium text-[#191c1c] p-3 rounded-2xl bg-white/60 border border-white/80 focus:outline-none focus:ring-2 focus:ring-[#4a654e]/40 placeholder:text-[#5a6b5d]/70 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={moodSaved}
              className="w-full py-3 bg-[#36533a] text-white rounded-2xl font-bold text-xs hover:bg-[#273d2a] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              {moodSaved ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Sparkles className="w-4 h-4" />}
              {moodSaved ? 'Check-in Recorded!' : 'Save Check-in & Factors'}
            </button>
          </form>
        )}
      </section>

    </div>
  );
};
