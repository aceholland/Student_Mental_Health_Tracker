import React, { useState } from 'react';
import { X, Award, Target, Flame, CheckCircle2, User, LogIn } from 'lucide-react';
import { StudentProfile } from '../types';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  onOpenAuth: () => void;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onOpenAuth,
}) => {
  const [name, setName] = useState(profile.name);
  const [gradeLevel, setGradeLevel] = useState(profile.gradeLevel);
  const [dailyTarget, setDailyTarget] = useState(profile.dailyBreakTarget);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name,
      gradeLevel,
      dailyBreakTarget: dailyTarget,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-md rounded-3xl shadow-2xl border border-white/80 overflow-hidden flex flex-col bg-white/40">
        {/* Modal Header */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-white/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#36533a] text-white flex items-center justify-center font-bold text-lg shadow-md">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#2d4531]">{profile.name}'s ZenPulse</h2>
              <p className="text-xs font-semibold text-[#5a6b5d]">{profile.gradeLevel}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-chip flex items-center justify-center text-[#36533a] hover:bg-white/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="px-6 py-4 grid grid-cols-2 gap-3">
          <div className="glass-card rounded-2xl p-3 flex items-center gap-3 border border-white/60">
            <div className="w-10 h-10 rounded-xl glass-chip flex items-center justify-center text-[#36533a]">
              <Flame className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-lg font-bold text-[#191c1c]">{profile.streakDays} Days</div>
              <div className="text-[11px] font-semibold text-[#5a6b5d]">Mindful Streak</div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-3 flex items-center gap-3 border border-white/60">
            <div className="w-10 h-10 rounded-xl glass-chip flex items-center justify-center text-[#6a5d45]">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-[#191c1c]">
                {profile.completedBreaksToday}/{profile.dailyBreakTarget}
              </div>
              <div className="text-[11px] font-semibold text-[#5a6b5d]">Breaks Today</div>
            </div>
          </div>
        </div>

        {/* Firebase Account Banner */}
        <div className="px-6">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenAuth();
            }}
            className="w-full py-2.5 px-4 glass-chip rounded-2xl border border-white/80 text-xs font-bold text-[#2d4531] flex items-center justify-between hover:bg-white/60 transition-all shadow-sm"
          >
            <span className="flex items-center gap-2">
              <LogIn className="w-4 h-4 text-[#36533a]" /> Firebase Student Sign-In
            </span>
            <span className="text-[10px] text-[#36533a] underline">Sync Cloud →</span>
          </button>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} className="p-6 pt-4 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2d4531] mb-1.5">
              Student Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3 text-[#36533a]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/50 rounded-xl border border-white/70 text-sm font-medium text-[#191c1c] focus:outline-none focus:ring-2 focus:ring-[#4a654e]/50 backdrop-blur-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2d4531] mb-1.5">
              Grade / School Level
            </label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/50 rounded-xl border border-white/70 text-sm font-medium text-[#191c1c] focus:outline-none focus:ring-2 focus:ring-[#4a654e]/50 backdrop-blur-md"
            >
              <option value="Middle School Student">Middle School Student</option>
              <option value="High School Freshman/Sophomore">High School Freshman/Sophomore</option>
              <option value="High School Senior">High School Senior</option>
              <option value="College / University Student">College / University Student</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2d4531] mb-1.5">
              Daily Micro-Break Target
            </label>
            <div className="flex items-center gap-3">
              {[2, 3, 4, 5].map((target) => (
                <button
                  type="button"
                  key={target}
                  onClick={() => setDailyTarget(target)}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                    dailyTarget === target
                      ? 'bg-[#36533a] text-white shadow-md'
                      : 'glass-chip text-[#2d4531] hover:bg-white/60'
                  }`}
                >
                  {target} / day
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-[#36533a] text-white rounded-2xl font-bold text-sm hover:bg-[#273d2a] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#36533a]/25"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" /> Saved Preferences
                </>
              ) : (
                <>
                  <Award className="w-5 h-5" /> Update Profile
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
