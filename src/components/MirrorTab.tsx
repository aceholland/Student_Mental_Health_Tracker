import React, { useState } from 'react';
import { Sparkles, HeartHandshake, PenTool, Send, Calendar, CheckCircle2, Flame, TrendingUp, Filter } from 'lucide-react';
import { MoodLog, JournalEntry } from '../types';
import { PeerCircle } from './PeerCircle';

interface MirrorTabProps {
  moodLogs: MoodLog[];
  journalEntries: JournalEntry[];
  onAddJournalEntry: (text: string) => void;
}

export const MirrorTab: React.FC<MirrorTabProps> = ({
  moodLogs,
  journalEntries,
  onAddJournalEntry,
}) => {
  const [selectedLog, setSelectedLog] = useState<MoodLog | null>(null);
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');
  const [selectedFilterTag, setSelectedFilterTag] = useState<string>('All');
  const [newJournalText, setNewJournalText] = useState('');
  const [journalSaved, setJournalSaved] = useState(false);

  // Filtered mood logs
  const filteredLogs = selectedFilterTag === 'All'
    ? moodLogs
    : moodLogs.filter((m) => m.contextTag === selectedFilterTag);

  // Count peace / calm / balanced entries
  const peaceCount = filteredLogs.filter((m) => m.moodValue >= 4).length;

  const handleJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJournalText.trim()) return;
    onAddJournalEntry(newJournalText.trim());
    setNewJournalText('');
    setJournalSaved(true);
    setTimeout(() => setJournalSaved(false), 1500);
  };

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Map mood value (1 to 5) to Y position in SVG 300px height
  const getYPos = (val: number) => {
    return 240 - ((val - 1) / 4) * 160;
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-5 pt-20 pb-32 flex flex-col items-center">
      {/* Header */}
      <div className="text-center w-full mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2d4531] mb-1 tracking-tight font-['Quicksand']">
          The Mirror Analytics
        </h2>
        <p className="text-sm font-semibold text-[#455448]">
          Visualize your mental patterns & triggers over time
        </p>
      </div>

      {/* Gentle Encouragement Streak Banner (No Gamified Pressure) */}
      <div className="w-full glass-card rounded-2xl p-4 mb-6 border border-amber-300/40 bg-amber-50/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-amber-950">Gentle Daily Check-in Streak</div>
            <div className="text-xs font-semibold text-amber-800">You've checked in for 4 consecutive days. Keep going at your own pace!</div>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-amber-200/50 text-amber-900 text-xs font-extrabold shrink-0 self-start md:self-auto">
          4 Days
        </span>
      </div>

      {/* Controls: Weekly/Monthly Toggle & Trigger Filter */}
      <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-4">
        <div className="flex bg-white/50 p-1 rounded-2xl border border-white/80 w-full md:w-auto">
          <button
            onClick={() => setViewMode('weekly')}
            className={`flex-1 md:flex-none px-3 py-2 rounded-xl text-xs font-bold transition-all text-center ${
              viewMode === 'weekly' ? 'bg-[#36533a] text-white shadow-sm' : 'text-[#36533a]'
            }`}
          >
            Weekly Trend
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={`flex-1 md:flex-none px-3 py-2 rounded-xl text-xs font-bold transition-all text-center ${
              viewMode === 'monthly' ? 'bg-[#36533a] text-white shadow-sm' : 'text-[#36533a]'
            }`}
          >
            Monthly Trend
          </button>
        </div>

        {/* Trigger Correlation Filter */}
        <div className="flex items-center justify-between md:justify-start gap-2 text-xs font-bold text-[#36533a] w-full md:w-auto bg-white/40 p-2 rounded-2xl border border-white/70">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            <span>Trigger Filter:</span>
          </div>
          <select
            value={selectedFilterTag}
            onChange={(e) => setSelectedFilterTag(e.target.value)}
            className="bg-white/80 text-[#2d4531] border border-white/80 rounded-xl px-2.5 py-1.5 focus:outline-none text-xs font-bold"
          >
            <option value="All">All Triggers</option>
            <option value="Exams/Deadlines">Exams / Deadlines</option>
            <option value="Sleep Deficit">Sleep Deficit</option>
            <option value="Heavy Workload">Heavy Workload</option>
          </select>
        </div>
      </div>

      {/* Wavy Organic Line Chart Container */}
      <section className="w-full glass-card rounded-3xl p-5 md:p-6 mb-6 relative overflow-hidden border border-white/60">
        <div className="w-full h-64 md:h-72 relative">
          {/* Days on X-Axis */}
          <div className="absolute bottom-2 left-0 w-full flex justify-between px-6 text-xs font-bold text-[#455448] z-10">
            {viewMode === 'weekly'
              ? daysOfWeek.map((day, idx) => <span key={idx}>{day}</span>)
              : ['W1', 'W2', 'W3', 'W4'].map((w, idx) => <span key={idx}>{w}</span>)}
          </div>

          {/* Floating Mood Badges on Wave */}
          {filteredLogs.slice(0, viewMode === 'weekly' ? 7 : 14).map((log, idx) => {
            const xPercent = 8 + idx * (viewMode === 'weekly' ? 14 : 7);
            const yPos = getYPos(log.moodValue);
            return (
              <button
                key={log.id}
                onClick={() => setSelectedLog(log)}
                style={{
                  left: `${xPercent}%`,
                  top: `${yPos - 25}px`,
                }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-[11px] font-bold glass-chip border transition-all duration-300 hover:scale-110 z-20 ${
                  selectedLog?.id === log.id
                    ? 'bg-[#36533a] text-white border-white ring-2 ring-[#36533a]/30 scale-110'
                    : log.moodValue >= 4
                    ? 'text-[#2d4531] border-[#8ba88e]/60'
                    : log.moodValue === 3
                    ? 'text-[#6a5d45] border-[#b09f83]/60'
                    : 'text-amber-900 border-amber-300'
                }`}
              >
                {log.label}
              </button>
            );
          })}

          {/* Smooth SVG Wave Path */}
          <svg className="w-full h-full block" preserveAspectRatio="none" viewBox="0 0 1000 300">
            <defs>
              <linearGradient id="wave-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#b09f83" />
                <stop offset="50%" stopColor="#4a654e" />
                <stop offset="100%" stopColor="#8ba88e" />
              </linearGradient>
            </defs>

            <path
              d="M 50,200 C 200,80 300,240 450,180 C 600,120 700,260 850,100 C 920,40 980,140 980,140"
              fill="none"
              stroke="url(#wave-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              className="drop-shadow-sm"
            />
          </svg>
        </div>

        {/* Selected Log Detail Banner */}
        {selectedLog && (
          <div className="mt-2 p-3.5 glass-card rounded-2xl border border-white/80 text-xs flex flex-col gap-1 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#2d4531]">{selectedLog.label} Mood</span>
              {selectedLog.contextTag && (
                <span className="px-2 py-0.5 rounded-full bg-[#36533a]/10 text-[#36533a] font-bold text-[10px]">
                  {selectedLog.contextTag}
                </span>
              )}
            </div>
            {selectedLog.sleepHours && (
              <div className="text-[11px] font-semibold text-[#5a6b5d]">
                Sleep: {selectedLog.sleepHours} hrs | {selectedLog.isAcademicDeadline ? 'Exam deadline active' : 'Normal day'}
              </div>
            )}
            {selectedLog.note && (
              <p className="text-[#191c1c] italic font-medium mt-1">"{selectedLog.note}"</p>
            )}
          </div>
        )}
      </section>

      {/* Insight Card */}
      <section className="w-full glass-card rounded-3xl p-6 md:p-8 text-center flex flex-col items-center justify-center relative overflow-hidden mb-6 border border-white/60">
        <div className="w-12 h-12 rounded-full glass-chip text-[#36533a] flex items-center justify-center mb-3">
          <HeartHandshake className="w-6 h-6" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-[#2d4531] mb-1.5">
          You've recorded peace {peaceCount} times this {viewMode}.
        </h3>
        <p className="text-sm font-medium text-[#455448]">
          Correlations show sleep above 7 hours yields 40% higher calm entries.
        </p>
      </section>

      {/* Moderated Anonymous Peer Support Circle */}
      <PeerCircle />

      {/* Private Student Reflection Micro-Journal */}
      <section className="w-full glass-card rounded-3xl p-5 md:p-6 border border-white/60">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full glass-chip flex items-center justify-center text-[#36533a]">
            <PenTool className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-[#2d4531]">Daily Unload Journal</h4>
        </div>

        <form onSubmit={handleJournalSubmit} className="flex flex-col gap-2.5">
          <textarea
            rows={3}
            value={newJournalText}
            onChange={(e) => setNewJournalText(e.target.value)}
            placeholder="What's one thing that affected your mood today? Free-text entry..."
            className="w-full p-3 bg-white/40 rounded-2xl border border-white/60 text-xs font-medium text-[#191c1c] focus:outline-none focus:ring-2 focus:ring-[#4a654e]/40 backdrop-blur-md resize-none placeholder-[#626e64]"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newJournalText.trim()}
              className="px-4 py-2 bg-[#36533a] text-white rounded-xl text-xs font-bold hover:bg-[#273d2a] disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-md"
            >
              {journalSaved ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> Stored Safely
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> Save Reflection
                </>
              )}
            </button>
          </div>
        </form>

        {/* Previous Journal Entries */}
        {journalEntries.length > 0 && (
          <div className="mt-4 pt-3 border-t border-white/50 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#455448]">
              Recent Journal Entries
            </div>
            {journalEntries.slice(0, 3).map((entry) => (
              <div
                key={entry.id}
                className="p-3 glass-card rounded-xl border border-white/60 text-xs text-[#191c1c]"
              >
                <div className="flex items-center justify-between text-[10px] text-[#5a6b5d] mb-1 font-semibold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#36533a]" />
                    {new Date(entry.timestamp).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <p className="italic font-medium">"{entry.content}"</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
