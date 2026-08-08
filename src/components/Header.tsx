import React from 'react';
import { Menu, Sparkles, LogIn } from 'lucide-react';
import { StudentProfile, TabType } from '../types';

interface HeaderProps {
  profile: StudentProfile;
  activeTab: TabType;
  onOpenSidebar: () => void;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
  isAuthenticated: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  activeTab,
  onOpenSidebar,
  onOpenProfile,
  onOpenAuth,
  isAuthenticated,
}) => {
  const isDarkRestMode = activeTab === 'rest';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isDarkRestMode
          ? 'glass-card-dark rounded-none border-b border-white/10 text-[#e2d8c3]'
          : 'glass-card rounded-none border-b border-white/40 text-[#191c1c]'
      } shadow-md`}
    >
      <div className="w-full max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Left Hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors focus:outline-none ${
              isDarkRestMode ? 'glass-chip-dark text-[#e2d8c3]' : 'glass-chip text-[#36533a]'
            }`}
            title="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              isDarkRestMode ? 'glass-chip-dark text-[#e2d8c3]' : 'glass-chip text-[#36533a]'
            }`}
          >
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Center Title */}
        <h1
          className={`text-xl font-bold tracking-tight font-['Quicksand'] ${
            isDarkRestMode ? 'text-[#d6c4a7]' : 'text-[#4a654e]'
          }`}
        >
          Serena
        </h1>

        {/* Right User Controls */}
        <div className="flex items-center gap-2">
          {!isAuthenticated && (
            <button
              onClick={onOpenAuth}
              className="px-3 py-1.5 rounded-full bg-[#36533a] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-[#273d2a]"
            >
              <LogIn className="w-3.5 h-3.5" /> Sign In
            </button>
          )}

          <button
            onClick={onOpenProfile}
            className="relative group focus:outline-none focus:ring-2 focus:ring-[#4a654e]/30 rounded-full transition-transform active:scale-95"
            title="Open Profile & Settings"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/60 shadow-sm bg-[#e7e8e7] flex items-center justify-center">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
                }}
              />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#4a654e] border-2 border-white rounded-full flex items-center justify-center text-[8px] text-white font-bold">
              ⚡
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

