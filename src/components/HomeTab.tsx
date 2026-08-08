import React from 'react';
import { BookOpen } from 'lucide-react';
import { StudentProfile } from '../types';
import { RotatingCube } from './RotatingCube';

interface HomeTabProps {
  profile: StudentProfile;
}

export const HomeTab: React.FC<HomeTabProps> = ({ profile }) => {
  return (
    <div className="w-full max-w-md mx-auto px-5 pt-24 pb-32 flex flex-col items-center justify-center min-h-[75vh]">
      {/* Serna Welcome Banner */}
      <div className="w-full my-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-chip text-[#2d4531] text-xs font-bold mb-3">
          <BookOpen className="w-3.5 h-3.5 text-[#36533a]" />
          <span>Mindful Student Space</span>
        </div>
        <h2 className="text-4xl font-extrabold text-[#2d4531] tracking-tight font-['Quicksand']">
          Serena
        </h2>
        <p className="text-sm font-medium text-[#455448] mt-2">
          Hello {profile.name}, find your calm & balance.
        </p>
      </div>

      {/* Rotating 3D Wireframe Cube Hero Visual */}
      <div className="my-12 py-4 flex items-center justify-center">
        <RotatingCube size={220} color="#4a654e" label="" />
      </div>
    </div>
  );
};
