import React, { useState } from 'react';
import { Wind, Shield, Activity, Anchor, Flame, Sparkles } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export const CopingToolkit: React.FC = () => {
  const [activeTechnique, setActiveTechnique] = useState<'grounding' | 'reset' | 'muscle' | null>(null);
  const [groundingStep, setGroundingStep] = useState(0);

  const groundingPrompts = [
    '5 Things you can SEE right now in your room',
    '4 Things you can PHYSICALLY TOUCH (desk, sweater, feet on floor)',
    '3 Things you can HEAR around you (fan, breath, typing)',
    '2 Things you can SMELL or enjoy the scent of',
    '1 Deep breath releasing all shoulder tightness',
  ];

  return (
    <div className="w-full glass-card rounded-3xl p-5 border border-white/70 my-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/60">
        <div className="w-8 h-8 rounded-full glass-chip flex items-center justify-center text-[#36533a]">
          <Anchor className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-[#2d4531]">Emergency Coping Toolkit</h4>
          <p className="text-[11px] font-semibold text-[#5a6b5d]">Quick grounding techniques when anxiety or mood dips low</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <button
          onClick={() => {
            setActiveTechnique('grounding');
            setGroundingStep(0);
          }}
          className={`p-3 rounded-2xl text-left border transition-all ${
            activeTechnique === 'grounding'
              ? 'bg-[#36533a] text-white border-[#36533a]'
              : 'glass-chip text-[#2d4531] hover:bg-white/60'
          }`}
        >
          <Anchor className="w-4 h-4 mb-1" />
          <div className="text-xs font-bold">5-4-3-2-1 Ground</div>
          <div className="text-[10px] opacity-80 font-medium">Sensory focus</div>
        </button>

        <button
          onClick={() => {
            setActiveTechnique('reset');
            audioSynth.playBreathingTone(176);
          }}
          className={`p-3 rounded-2xl text-left border transition-all ${
            activeTechnique === 'reset'
              ? 'bg-[#36533a] text-white border-[#36533a]'
              : 'glass-chip text-[#2d4531] hover:bg-white/60'
          }`}
        >
          <Wind className="w-4 h-4 mb-1" />
          <div className="text-xs font-bold">Physiological Sigh</div>
          <div className="text-[10px] opacity-80 font-medium">2 Inhales, 1 Long Exhale</div>
        </button>

        <button
          onClick={() => setActiveTechnique('muscle')}
          className={`p-3 rounded-2xl text-left border transition-all ${
            activeTechnique === 'muscle'
              ? 'bg-[#36533a] text-white border-[#36533a]'
              : 'glass-chip text-[#2d4531] hover:bg-white/60'
          }`}
        >
          <Shield className="w-4 h-4 mb-1" />
          <div className="text-xs font-bold">Muscle Unclench</div>
          <div className="text-[10px] opacity-80 font-medium">Drop jaw & shoulders</div>
        </button>
      </div>

      {/* Active Technique Interactive Box */}
      {activeTechnique === 'grounding' && (
        <div className="p-4 glass-card rounded-2xl border border-white/80 text-xs bg-white/50 animate-fade-in">
          <div className="font-bold text-[#2d4531] mb-1">
            Step {groundingStep + 1} of 5:
          </div>
          <p className="text-sm font-semibold text-[#191c1c] mb-3">
            {groundingPrompts[groundingStep]}
          </p>
          <button
            onClick={() => setGroundingStep((prev) => (prev + 1) % 5)}
            className="px-4 py-1.5 bg-[#36533a] text-white rounded-xl font-bold text-xs hover:bg-[#273d2a]"
          >
            {groundingStep === 4 ? 'Complete Grounding ✓' : 'Next Sense →'}
          </button>
        </div>
      )}

      {activeTechnique === 'reset' && (
        <div className="p-4 glass-card rounded-2xl border border-white/80 text-xs bg-white/50 animate-fade-in">
          <div className="font-bold text-[#2d4531] mb-1">The Physiological Sigh</div>
          <p className="text-xs font-medium text-[#191c1c] mb-2 leading-relaxed">
            Take two quick consecutive inhales through your nose, then one long slow exhale through mouth. Repeat 3 times to immediately lower heart rate.
          </p>
          <button
            onClick={() => setActiveTechnique(null)}
            className="px-3 py-1 glass-chip text-[#36533a] rounded-xl font-bold text-xs"
          >
            Done ✓
          </button>
        </div>
      )}

      {activeTechnique === 'muscle' && (
        <div className="p-4 glass-card rounded-2xl border border-white/80 text-xs bg-white/50 animate-fade-in">
          <div className="font-bold text-[#2d4531] mb-1">Targeted Release</div>
          <p className="text-xs font-medium text-[#191c1c] mb-2 leading-relaxed">
            1. Unclench your teeth & lower your jaw. <br />
            2. Drop your shoulders away from your ears. <br />
            3. Unfurl your forehead and hands.
          </p>
          <button
            onClick={() => setActiveTechnique(null)}
            className="px-3 py-1 glass-chip text-[#36533a] rounded-xl font-bold text-xs"
          >
            I feel looser ✓
          </button>
        </div>
      )}
    </div>
  );
};
