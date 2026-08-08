import { useState, useEffect } from 'react';
import { TabType, StudentProfile, MoodLog, JournalEntry, MoodValue } from './types';
import {
  getStoredProfile,
  saveProfile,
  getStoredMoodLogs,
  saveMoodLog,
  getStoredJournal,
  addJournalEntry,
} from './utils/storage';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ProfileDrawer } from './components/ProfileDrawer';
import { AuthModal } from './components/AuthModal';
import { Sidebar } from './components/Sidebar';
import { HomeTab } from './components/HomeTab';
import { BreatheTab } from './components/BreatheTab';
import { BreaksTab } from './components/BreaksTab';
import { MirrorTab } from './components/MirrorTab';
import { RestTab } from './components/RestTab';
import { SupportTab } from './components/SupportTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile);
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>(getStoredMoodLogs);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(getStoredJournal);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sync profile changes to state
  const handleUpdateProfile = (updated: Partial<StudentProfile>) => {
    const saved = saveProfile(updated);
    setProfile(saved);
  };

  // OAuth login success handler
  const handleAuthSuccess = (user: { name: string; email: string; avatarUrl?: string }) => {
    setIsAuthenticated(true);
    handleUpdateProfile({
      name: user.name,
      avatarUrl: user.avatarUrl || profile.avatarUrl,
    });
  };

  // Sign out handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    handleUpdateProfile({
      name: 'Student',
    });
  };

  // Handler for logging mood
  const handleLogMood = (
    moodValue: MoodValue,
    label: string,
    note?: string,
    contextTag?: string
  ) => {
    const dayMap: ('M' | 'T' | 'W' | 'T' | 'F' | 'S' | 'S')[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const currentDay = dayMap[new Date().getDay()];

    const newLog = saveMoodLog({
      dayOfWeek: currentDay,
      moodValue,
      label,
      note,
      contextTag,
    });
    setMoodLogs((prev) => [newLog, ...prev]);
  };

  // Handler for incrementing break count
  const handleIncrementBreak = () => {
    const updatedCount = profile.completedBreaksToday + 1;
    handleUpdateProfile({ completedBreaksToday: updatedCount });
  };

  // Handler for adding journal reflection
  const handleAddJournal = (text: string) => {
    const newEntry = addJournalEntry(text);
    setJournalEntries((prev) => [newEntry, ...prev]);
  };

  // Toggle sleep mode
  const handleToggleSleepMode = () => {
    handleUpdateProfile({ sleepModeEnabled: !profile.sleepModeEnabled });
  };

  // Dynamically set background body color based on active tab
  useEffect(() => {
    if (activeTab === 'rest') {
      document.body.style.backgroundColor = '#0b0f0d';
      document.body.style.color = '#e2d8c3';
    } else {
      document.body.style.backgroundColor = '#eef2ed';
      document.body.style.color = '#191c1c';
    }
  }, [activeTab]);

  return (
    <div
      className={`min-h-screen flex flex-col font-['Quicksand',sans-serif] relative overflow-x-hidden transition-colors duration-700 ${
        activeTab === 'rest' ? 'bg-[#0b0f0d] text-[#e2d8c3]' : 'bg-[#eef2ed] text-[#191c1c]'
      }`}
    >
      {/* Background Refraction Orbs - Sage Green & Cream Palette for Glassmorphism */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {activeTab === 'rest' ? (
          <>
            <div className="absolute -top-24 -left-20 w-[450px] h-[450px] bg-gradient-to-br from-[#1e293b] to-[#1e1b4b] opacity-60 blur-[100px] rounded-full animate-pulse" />
            <div className="absolute top-[30%] -right-24 w-[500px] h-[500px] bg-gradient-to-tr from-[#2d3a31] to-[#0f172a] opacity-65 blur-[120px] rounded-full" />
            <div className="absolute -bottom-24 left-[15%] w-[420px] h-[420px] bg-gradient-to-t from-[#111827] to-[#1e293b] opacity-70 blur-[90px] rounded-full" />
          </>
        ) : (
          <>
            <div className="absolute -top-32 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-[#8ba88e] to-[#a3bfa6] opacity-45 blur-[110px] rounded-full" />
            <div className="absolute top-[25%] -right-24 w-[550px] h-[550px] bg-gradient-to-bl from-[#d6c4a7] to-[#e8dcc4] opacity-55 blur-[130px] rounded-full" />
            <div className="absolute -bottom-32 left-[10%] w-[500px] h-[500px] bg-gradient-to-tr from-[#c8dacb] to-[#b09f83] opacity-40 blur-[120px] rounded-full" />
          </>
        )}
      </div>

      {/* Top App Header */}
      <Header
        profile={profile}
        activeTab={activeTab}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        isAuthenticated={isAuthenticated}
      />

      {/* Left Drawer Hamburger Menu */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isAuthenticated={isAuthenticated}
        profile={profile}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Tab Content Canvas */}
      <main className="flex-1 flex flex-col relative z-10">
        {activeTab === 'home' && (
          <HomeTab profile={profile} />
        )}

        {activeTab === 'breathe' && (
          <BreatheTab
            profile={profile}
            onLogMood={handleLogMood}
            onIncrementBreak={handleIncrementBreak}
            recentMoods={moodLogs}
          />
        )}

        {activeTab === 'care' && (
          <BreaksTab onCompleteBreak={handleIncrementBreak} />
        )}

        {activeTab === 'mirror' && (
          <MirrorTab
            moodLogs={moodLogs}
            journalEntries={journalEntries}
            onAddJournalEntry={handleAddJournal}
          />
        )}

        {activeTab === 'rest' && (
          <RestTab
            sleepModeEnabled={profile.sleepModeEnabled}
            onToggleSleepMode={handleToggleSleepMode}
          />
        )}

        {activeTab === 'support' && <SupportTab />}
      </main>

      {/* Profile & Settings Drawer Modal */}
      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Firebase Sign-In / Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Fixed Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
