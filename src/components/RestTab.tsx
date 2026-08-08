import React, { useState, useEffect } from 'react';
import { Moon, Volume2, Waves, Flame, CloudRain, Play, Pause, Clock } from 'lucide-react';
import { NightSound } from '../types';
import { audioSynth } from '../utils/audioSynth';

interface RestTabProps {
  sleepModeEnabled: boolean;
  onToggleSleepMode: () => void;
}

export const NIGHT_SOUNDS: NightSound[] = [
  {
    id: 'whitenoise',
    title: 'White Noise',
    subtitle: 'Gentle static',
    icon: 'waves',
  },
  {
    id: 'campfire',
    title: 'Campfire',
    subtitle: 'Crackling embers',
    icon: 'fire',
  },
  {
    id: 'rainstorm',
    title: 'Rainstorm',
    subtitle: 'Distant thunder',
    icon: 'rain',
  },
];

export const RestTab: React.FC<RestTabProps> = ({
  sleepModeEnabled,
  onToggleSleepMode,
}) => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [activeSound, setActiveSound] = useState<'rainstorm' | 'whitenoise' | 'campfire' | null>(
    null
  );
  const [volume, setVolume] = useState(0.7);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [sleepTimerSecondsLeft, setSleepTimerSecondsLeft] = useState<number | null>(null);

  // Sound toggle handler
  const handleToggleSound = (soundId: 'rainstorm' | 'whitenoise' | 'campfire') => {
    if (activeSound === soundId) {
      audioSynth.stopSound(soundId);
      setActiveSound(null);
    } else {
      if (activeSound) {
        audioSynth.stopSound(activeSound);
      }
      audioSynth.playSound(soundId);
      setActiveSound(soundId);
    }
  };

  // Volume change handler
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    audioSynth.setVolume(newVol);
  };

  // Sleep Timer countdown effect
  useEffect(() => {
    let timer: number | undefined;

    if (sleepTimerSecondsLeft !== null && sleepTimerSecondsLeft > 0) {
      timer = window.setInterval(() => {
        setSleepTimerSecondsLeft((prev) => {
          if (prev === null || prev <= 1) {
            audioSynth.stopAll();
            setActiveSound(null);
            setSleepTimerMinutes(null);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [sleepTimerSecondsLeft]);

  const setSleepTimer = (mins: number) => {
    if (sleepTimerMinutes === mins) {
      setSleepTimerMinutes(null);
      setSleepTimerSecondsLeft(null);
    } else {
      setSleepTimerMinutes(mins);
      setSleepTimerSecondsLeft(mins * 60);
    }
  };

  const renderSoundIcon = (iconName: string) => {
    switch (iconName) {
      case 'waves':
        return <Waves className="w-6 h-6 text-[#d6c4a7]" />;
      case 'fire':
        return <Flame className="w-6 h-6 text-[#d6c4a7]" />;
      case 'rain':
      default:
        return <CloudRain className="w-6 h-6 text-[#d6c4a7]" />;
    }
  };

  return (
    <div
      className={`w-full min-h-screen px-5 pt-20 pb-36 flex flex-col items-center relative overflow-hidden transition-colors duration-500 ${
        isLightMode ? 'bg-[#f4f7f4] text-[#191c1c]' : 'bg-[#0b0f0d] text-[#e2d8c3]'
      }`}
    >
      {/* Dim Screen Overlay if Sleep Mode is On */}
      {sleepModeEnabled && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-none z-40 transition-opacity duration-1000" />
      )}

      {/* Main Container */}
      <div className="w-full max-w-xl mx-auto flex flex-col gap-6 relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center space-y-3 mt-2">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Preparing for rest
            </h2>
            <button
              onClick={() => setIsLightMode(!isLightMode)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                isLightMode
                  ? 'bg-[#2d4531] text-white border-[#2d4531]'
                  : 'bg-white/10 text-[#e2d8c3] border-white/20 hover:bg-white/20'
              }`}
            >
              {isLightMode ? 'Dark mode' : 'Light mode'}
            </button>
          </div>
          <p className={`text-sm font-medium ${isLightMode ? 'text-[#455448]' : 'text-[#c4cfc6]'}`}>
            Settle into the evening. Dim the lights, take a deep breath, and let the day drift away.
          </p>
        </section>

        {/* Sleep Mode Toggle Card */}
        <section className="glass-card-dark rounded-3xl p-6 flex items-center justify-between transition-all duration-500 border border-white/12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full glass-chip-dark flex items-center justify-center text-[#e2d8c3]">
              <Moon className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#e2d8c3]">Sleep Mode</h3>
              <p className="text-xs font-medium text-[#c4cfc6]">Mute notifications and dim screen</p>
            </div>
          </div>

          {/* Toggle Button */}
          <button
            onClick={onToggleSleepMode}
            className={`w-12 h-6 rounded-full transition-colors p-0.5 relative focus:outline-none ${
              sleepModeEnabled ? 'bg-[#b09f83]' : 'bg-[#404c43]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-md ${
                sleepModeEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </section>

        {/* Night Sounds Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#e2d8c3]">
              Night Sounds
            </span>

            {/* Volume Control */}
            {activeSound && (
              <div className="flex items-center gap-2 text-xs font-bold text-[#e2d8c3]">
                <Volume2 className="w-4 h-4 text-[#b09f83]" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-20 accent-[#b09f83] cursor-pointer"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {NIGHT_SOUNDS.map((sound) => {
              const isPlaying = activeSound === sound.id;
              return (
                <button
                  key={sound.id}
                  onClick={() => handleToggleSound(sound.id)}
                  className={`glass-card-dark rounded-2xl p-4 flex items-center gap-4 text-left transition-all duration-300 focus:outline-none border ${
                    isPlaying
                      ? 'border-[#b09f83] bg-white/10 scale-[1.01] shadow-xl'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full glass-chip-dark flex items-center justify-center shrink-0">
                    {renderSoundIcon(sound.icon)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-[#e2d8c3]">{sound.title}</h4>
                    <p className="text-xs font-medium text-[#c4cfc6]">{sound.subtitle}</p>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isPlaying
                        ? 'bg-[#b09f83] text-[#0b0f0d] shadow-md'
                        : 'glass-chip-dark text-[#e2d8c3] hover:bg-white/20'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Bedtime Sleep Timer */}
        <section className="glass-card-dark rounded-3xl p-5 border border-white/12 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#e2d8c3]">
            <Clock className="w-4 h-4 text-[#b09f83]" />
            <span>Sleep Timer (Fade Sound)</span>
            {sleepTimerSecondsLeft !== null && (
              <span className="ml-auto font-mono text-[#b09f83]">
                {Math.floor(sleepTimerSecondsLeft / 60)}m {sleepTimerSecondsLeft % 60}s
              </span>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[15, 30, 45, 60].map((mins) => (
              <button
                key={mins}
                onClick={() => setSleepTimer(mins)}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                  sleepTimerMinutes === mins
                    ? 'bg-[#b09f83] text-[#0b0f0d] shadow-md'
                    : 'glass-chip-dark text-[#e2d8c3] hover:bg-white/20'
                }`}
              >
                {mins} m
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
