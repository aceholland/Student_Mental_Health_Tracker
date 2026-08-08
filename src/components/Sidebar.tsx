import React from 'react';
import { X, HeartPulse, Wind, TrendingUp, Moon, LogIn, LogOut, User, Sparkles, BookOpen, ShieldCheck, Zap, ShieldAlert } from 'lucide-react';
import { TabType, StudentProfile } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isAuthenticated: boolean;
  profile: StudentProfile;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  isAuthenticated,
  profile,
  onOpenAuth,
  onLogout,
}) => {
  if (!isOpen) return null;

  const features: { id: TabType; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'home',
      label: '1. Serena Home',
      desc: '3D Cube & Serena visual',
      icon: <Sparkles className="w-5 h-5 text-[#36533a]" />,
    },
    {
      id: 'breathe',
      label: '2. Breathe & Mood',
      desc: 'Guided box breathing & check-in',
      icon: <Wind className="w-5 h-5 text-[#36533a]" />,
    },
    {
      id: 'care',
      label: '3. Micro-Breaks',
      desc: 'Stretch & sensory grounding',
      icon: <HeartPulse className="w-5 h-5 text-[#36533a]" />,
    },
    {
      id: 'mirror',
      label: '4. Analytics & Journal',
      desc: 'Mood history & daily reflections',
      icon: <TrendingUp className="w-5 h-5 text-[#36533a]" />,
    },
    {
      id: 'rest',
      label: '5. Evening Rest',
      desc: 'Sleep sounds & light mode toggle',
      icon: <Moon className="w-5 h-5 text-[#36533a]" />,
    },
    {
      id: 'support',
      label: '6. Support',
      desc: 'Crisis resources & helplines',
      icon: <ShieldAlert className="w-5 h-5 text-[#36533a]" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-80 max-w-[85vw] bg-white/85 backdrop-blur-xl h-full shadow-2xl flex flex-col z-10 border-r border-white/80 p-6">
        <div className="flex items-center justify-between pb-6 border-b border-[#2d4531]/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full glass-chip flex items-center justify-center text-[#36533a]">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#2d4531] font-['Quicksand']">
              Serena
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-chip flex items-center justify-center text-[#36533a] hover:bg-white/80"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Auth Card in Sidebar */}
        <div className="my-6 p-4 rounded-2xl glass-card border border-white/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#36533a] text-white flex items-center justify-center font-bold text-sm overflow-hidden shrink-0">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              profile.name.charAt(0)
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-[#2d4531] truncate">{profile.name}</h4>
            <p className="text-[11px] font-semibold text-[#5a6b5d] truncate">
              {isAuthenticated ? profile.email || 'Google Auth Active' : 'Guest Account'}
            </p>
          </div>
          {isAuthenticated ? (
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              title="Sign Out"
              className="p-2 rounded-xl text-rose-700 hover:bg-rose-50 font-bold text-xs"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                onOpenAuth();
                onClose();
              }}
              title="Sign In with Google"
              className="p-2 rounded-xl text-[#36533a] hover:bg-[#36533a]/10 font-bold text-xs"
            >
              <LogIn className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Features Navigation */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#5a6b5d] px-1">
            Features & Navigation
          </span>
          {features.map((feat) => {
            const isActive = activeTab === feat.id;
            return (
              <button
                key={feat.id}
                onClick={() => {
                  onSelectTab(feat.id);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-2xl flex items-center gap-3 transition-all ${
                  isActive
                    ? 'bg-[#36533a] text-white shadow-md'
                    : 'hover:bg-white/60 text-[#2d4531]'
                }`}
              >
                <div className={`p-2 rounded-xl ${isActive ? 'bg-white/20 text-white' : 'glass-chip'}`}>
                  {feat.icon}
                </div>
                <div>
                  <div className="text-sm font-bold">{feat.label}</div>
                  <div className={`text-[11px] ${isActive ? 'text-white/80' : 'text-[#5a6b5d]'}`}>
                    {feat.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Auth action button bottom */}
        <div className="pt-4 border-t border-[#2d4531]/10">
          {!isAuthenticated ? (
            <button
              onClick={() => {
                onOpenAuth();
                onClose();
              }}
              className="w-full py-3 bg-[#36533a] text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#273d2a]"
            >
              <LogIn className="w-4 h-4" /> Sign In with Google
            </button>
          ) : (
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2.5 glass-chip rounded-2xl font-bold text-xs text-rose-700 flex items-center justify-center gap-2 border border-rose-200 hover:bg-rose-50"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
