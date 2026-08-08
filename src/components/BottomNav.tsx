import React from 'react';
import { HeartPulse, Wind, TrendingUp, Moon, Sparkles, ShieldAlert } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const isDarkRestMode = activeTab === 'rest';

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      id: 'breathe',
      label: 'Breathe',
      icon: <Wind className="w-5 h-5" />,
    },
    {
      id: 'care',
      label: 'Care',
      icon: <HeartPulse className="w-5 h-5" />,
    },
    {
      id: 'mirror',
      label: 'Mirror',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      id: 'rest',
      label: 'Rest',
      icon: <Moon className="w-5 h-5" />,
    },
    {
      id: 'support',
      label: 'Support',
      icon: <ShieldAlert className="w-5 h-5" />,
    },
  ];

  return (
    <div className="fixed bottom-0 md:bottom-4 left-0 right-0 z-50 px-0 md:px-4 pointer-events-none">
      <nav
        className={`w-full md:max-w-md mx-auto pointer-events-auto transition-all duration-500 rounded-none md:rounded-full border-t md:border px-4 py-2 flex justify-around items-center ${
          isDarkRestMode ? 'glass-nav-dark text-[#e2d8c3]' : 'glass-nav-light text-[#191c1c]'
        }`}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center p-2.5 rounded-full transition-all duration-300 relative group focus:outline-none ${
                isActive
                  ? isDarkRestMode
                    ? 'glass-chip-dark text-[#e2d8c3] scale-110 shadow-sm'
                    : 'glass-chip text-[#36533a] scale-110 shadow-sm'
                  : isDarkRestMode
                  ? 'text-[#8b958e] hover:text-[#e2d8c3]'
                  : 'text-[#626e64] hover:text-[#36533a]'
              }`}
            >
              {item.icon}
              <span className="sr-only">{item.label}</span>
              {isActive && (
                <span
                  className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full ${
                    isDarkRestMode ? 'bg-[#e2d8c3]' : 'bg-[#36533a]'
                  }`}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
