import React, { useState, useEffect } from 'react';
import { CloudRain, Trees, Wind, Activity, Play, Pause, CheckCircle2, ArrowLeft, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MicroBreak } from '../types';
import { audioSynth } from '../utils/audioSynth';

interface BreaksTabProps {
  onCompleteBreak: () => void;
}

export const BREAK_ITEMS: MicroBreak[] = [
  {
    id: 'rain-sounds',
    title: 'Rain Sounds',
    subtitle: 'Wash away stress',
    category: 'audio',
    icon: 'water_drop',
    colorClass: 'text-[#4a654e]',
    bgColorClass: 'bg-[#8ba88e]/20 group-hover:bg-[#8ba88e]/40',
    durationSeconds: 120,
    description: 'Immerse in gentle rain synth to clear mental clutter after long study hours.',
  },
  {
    id: 'forest-walk',
    title: 'Forest Walk',
    subtitle: 'Ground your thoughts',
    category: 'grounding',
    icon: 'eco',
    colorClass: 'text-[#6a5d45]',
    bgColorClass: 'bg-[#b09f83]/20 group-hover:bg-[#b09f83]/40',
    durationSeconds: 120,
    description: 'A 5-4-3-2-1 sensory grounding exercise to re-center anxious study minds.',
  },
  {
    id: 'box-breathing',
    title: 'Box Breathing',
    subtitle: 'Find your center',
    category: 'breathing',
    icon: 'air',
    colorClass: 'text-[#5d5c79]',
    bgColorClass: 'bg-[#dfdcff]/30 group-hover:bg-[#dfdcff]/50',
    durationSeconds: 120,
    description: 'Navy SEALs technique: 4s inhale, 4s hold, 4s exhale, 4s hold.',
  },
  {
    id: 'gentle-stretch',
    title: 'Gentle Stretch',
    subtitle: 'Release physical tension',
    category: 'stretch',
    icon: 'self_improvement',
    colorClass: 'text-[#4a654e]',
    bgColorClass: 'bg-[#cceace]/40 group-hover:bg-[#cceace]/60',
    durationSeconds: 120,
    description: 'Desk-friendly neck rolls, shoulder shrugs, and spinal twists for posture relief.',
  },
];

export const BreaksTab: React.FC<BreaksTabProps> = ({ onCompleteBreak }) => {
  const [activeBreak, setActiveBreak] = useState<MicroBreak | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const [stretchStep, setStretchStep] = useState(0);

  // Sensory Grounding Steps for Forest Walk
  const groundingSteps = [
    '5 Things you can SEE around your desk',
    '4 Things you can TOUCH right now',
    '3 Things you can HEAR in your room',
    '2 Things you can SMELL or imagine',
    '1 Thing you are GRATEFUL for today',
  ];
  const [groundingIdx, setGroundingIdx] = useState(0);

  // Stretching Steps
  const stretchSteps = [
    { title: 'Neck Side Stretch', instruction: 'Gently tilt left ear to left shoulder for 20s, then right.' },
    { title: 'Shoulder Rolls', instruction: 'Roll shoulders backwards 10 times to release desk strain.' },
    { title: 'Seated Spine Twist', instruction: 'Gently turn torso left, holding chair back, then right.' },
    { title: 'Wrist & Finger Flex', instruction: 'Extend arm forward and gently pull back fingers for typing relief.' },
  ];

  // Active Break Timer Effect
  useEffect(() => {
    let timer: number | undefined;

    if (activeBreak && isRunning) {
      // Trigger sound if audio break
      if (activeBreak.id === 'rain-sounds') {
        audioSynth.playSound('rainstorm');
      } else if (activeBreak.id === 'forest-walk') {
        audioSynth.playSound('forest');
      }

      timer = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            audioSynth.stopAll();
            onCompleteBreak();
            confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      audioSynth.stopAll();
    }

    return () => {
      if (timer) clearInterval(timer);
      audioSynth.stopAll();
    };
  }, [activeBreak, isRunning, onCompleteBreak]);

  const handleStartBreak = (item: MicroBreak) => {
    setActiveBreak(item);
    setSecondsLeft(item.durationSeconds);
    setIsRunning(true);
    setGroundingIdx(0);
    setStretchStep(0);
  };

  const handleCloseBreak = () => {
    setIsRunning(false);
    audioSynth.stopAll();
    setActiveBreak(null);
  };

  const renderBreakIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'water_drop':
        return <CloudRain className={`w-8 h-8 ${className}`} />;
      case 'eco':
        return <Trees className={`w-8 h-8 ${className}`} />;
      case 'air':
        return <Wind className={`w-8 h-8 ${className}`} />;
      case 'self_improvement':
      default:
        return <Activity className={`w-8 h-8 ${className}`} />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-5 pt-20 pb-32 flex flex-col items-center">
      {/* Header */}
      <div className="text-center w-full mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2d4531] mb-1.5 tracking-tight">
          Take a micro-break
        </h2>
        <p className="text-sm font-semibold text-[#455448]">
          2-minute refreshes for your mind.
        </p>
      </div>

      {/* Micro-Breaks List */}
      <div className="w-full space-y-4">
        {BREAK_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleStartBreak(item)}
            className="w-full glass-card rounded-2xl p-5 md:p-6 flex items-center gap-5 hover:scale-[1.015] transition-all duration-300 group text-left focus:outline-none focus:ring-2 focus:ring-[#4a654e]/40 border border-white/60"
          >
            <div
              className="w-14 h-14 md:w-16 md:h-16 rounded-full glass-chip flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0"
            >
              {renderBreakIcon(item.icon, item.colorClass)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-[#2d4531] mb-0.5 group-hover:text-[#36533a] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm font-medium text-[#5a6b5d]">
                {item.subtitle}
              </p>
            </div>
            <div className="w-9 h-9 rounded-full glass-chip flex items-center justify-center text-[#36533a] group-hover:scale-110 transition-all shrink-0">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
          </button>
        ))}
      </div>

      {/* Active Interactive Micro-Break Modal Overlay */}
      {activeBreak && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="glass-card w-full max-w-lg rounded-3xl p-6 md:p-8 border border-white/80 flex flex-col items-center relative overflow-hidden bg-white/40">
            {/* Top Close Button */}
            <button
              onClick={handleCloseBreak}
              className="absolute top-5 left-5 text-[#36533a] hover:text-[#191c1c] flex items-center gap-1 text-xs font-bold glass-chip px-3 py-1.5 rounded-full transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> End Early
            </button>

            {/* Header */}
            <div className="mt-8 text-center mb-6">
              <div className="w-16 h-16 rounded-full glass-chip mx-auto flex items-center justify-center mb-3">
                {renderBreakIcon(activeBreak.icon, activeBreak.colorClass)}
              </div>
              <h3 className="text-2xl font-bold text-[#2d4531]">{activeBreak.title}</h3>
              <p className="text-xs font-medium text-[#5a6b5d] mt-1 max-w-xs mx-auto">
                {activeBreak.description}
              </p>
            </div>

            {/* Interactive Content Area Based on Break Type */}
            <div className="w-full my-4 flex flex-col items-center justify-center min-h-[140px]">
              {activeBreak.id === 'forest-walk' && (
                <div className="glass-card p-5 rounded-2xl border border-white/70 w-full text-center">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#6a5d45] mb-2">
                    Grounding Step {groundingIdx + 1} of 5
                  </div>
                  <p className="text-base font-bold text-[#191c1c] mb-3">
                    {groundingSteps[groundingIdx]}
                  </p>
                  <button
                    onClick={() => setGroundingIdx((prev) => (prev + 1) % groundingSteps.length)}
                    className="text-xs font-bold text-[#2d4531] glass-chip px-4 py-1.5 rounded-full hover:bg-white/50 transition-colors"
                  >
                    Next Sensory Point →
                  </button>
                </div>
              )}

              {activeBreak.id === 'gentle-stretch' && (
                <div className="glass-card p-5 rounded-2xl border border-white/70 w-full text-center">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#36533a] mb-2">
                    Stretch {stretchStep + 1} of {stretchSteps.length}: {stretchSteps[stretchStep].title}
                  </div>
                  <p className="text-sm font-semibold text-[#191c1c] mb-3">
                    {stretchSteps[stretchStep].instruction}
                  </p>
                  <button
                    onClick={() => setStretchStep((prev) => (prev + 1) % stretchSteps.length)}
                    className="text-xs font-bold text-[#2d4531] glass-chip px-4 py-1.5 rounded-full hover:bg-white/50 transition-colors"
                  >
                    Next Stretch Move →
                  </button>
                </div>
              )}

              {activeBreak.id === 'box-breathing' && (
                <div className="flex flex-col items-center">
                  <div className="w-28 h-28 border-4 border-[#5d5c79] rounded-2xl flex items-center justify-center animate-pulse glass-card">
                    <span className="text-sm font-bold text-[#5d5c79]">4s Box Flow</span>
                  </div>
                </div>
              )}

              {activeBreak.id === 'rain-sounds' && (
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-16 h-16 rounded-full bg-[#8ba88e]/30 flex items-center justify-center animate-ping text-[#4a654e] mb-3">
                    <CloudRain className="w-8 h-8" />
                  </div>
                  <p className="text-xs text-[#737972]">Synthesizing soothing rain & distant thunder...</p>
                </div>
              )}
            </div>

            {/* Timer & Controls */}
            <div className="w-full flex flex-col items-center gap-3 mt-4">
              <div className="text-3xl font-extrabold text-[#4a654e] font-mono">
                {Math.floor(secondsLeft / 60)}:
                {(secondsLeft % 60).toString().padStart(2, '0')}
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-[#e7e8e7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4a654e] transition-all duration-1000"
                  style={{
                    width: `${((120 - secondsLeft) / 120) * 100}%`,
                  }}
                />
              </div>

              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="px-6 py-2.5 bg-[#4a654e] text-white rounded-full font-semibold text-xs flex items-center gap-2 hover:bg-[#334d38] shadow-md transition-all"
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isRunning ? 'Pause Session' : 'Resume'}
                </button>

                <button
                  onClick={() => setSecondsLeft(120)}
                  className="p-2.5 bg-[#edeeed] text-[#737972] rounded-full hover:bg-[#e1e3e2] transition-colors"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {secondsLeft === 0 && (
                <button
                  onClick={handleCloseBreak}
                  className="w-full py-3 bg-emerald-700 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 mt-2 shadow-lg animate-bounce"
                >
                  <CheckCircle2 className="w-5 h-5" /> Completed! Return to App
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
