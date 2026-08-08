import React from 'react';

interface GlassPrismProps {
  className?: string;
}

export const GlassPrism: React.FC<GlassPrismProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center select-none pointer-events-none ${className}`}>
      {/* Soft Ambient Radial Halo Glow */}
      <div className="absolute w-52 h-52 bg-gradient-to-tr from-[#8ba88e]/35 via-[#e2efe4]/25 to-[#f3e0c2]/35 rounded-full blur-3xl animate-pulse" />

      {/* Floating 3D Scene Wrapper */}
      <div className="relative animate-prism-float flex flex-col items-center">
        {/* 3D Perspective Container */}
        <div className="perspective-container w-36 h-44 flex items-center justify-center">
          {/* Continuous Rotating 3D Prism Rig */}
          <div className="preserve-3d w-20 h-36 relative animate-spin-prism transition-transform duration-700">
            {/* Facet 1 (Front Face) */}
            <div
              className="absolute inset-0 w-20 h-36 facet-shimmer backdrop-blur-md rounded-sm border border-white/80"
              style={{
                transform: 'rotateY(0deg) translateZ(23px)',
                background:
                  'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(139, 168, 142, 0.25) 45%, rgba(176, 196, 222, 0.25) 75%, rgba(243, 224, 194, 0.35) 100%)',
                boxShadow:
                  'inset 0 0 15px rgba(255, 255, 255, 0.6), 0 4px 20px rgba(45, 69, 49, 0.1)',
              }}
            >
              {/* Internal Refraction Highlight Ray */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-12 opacity-70" />
            </div>

            {/* Facet 2 (Right-Back Face) */}
            <div
              className="absolute inset-0 w-20 h-36 facet-shimmer backdrop-blur-md rounded-sm border border-white/75"
              style={{
                transform: 'rotateY(120deg) translateZ(23px)',
                background:
                  'linear-gradient(135deg, rgba(243, 224, 194, 0.4) 0%, rgba(255, 255, 255, 0.3) 40%, rgba(139, 168, 142, 0.3) 80%, rgba(200, 220, 240, 0.3) 100%)',
                boxShadow:
                  'inset 0 0 15px rgba(255, 255, 255, 0.5), 0 4px 20px rgba(45, 69, 49, 0.08)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform skew-x-12 opacity-60" />
            </div>

            {/* Facet 3 (Left-Back Face) */}
            <div
              className="absolute inset-0 w-20 h-36 facet-shimmer backdrop-blur-md rounded-sm border border-white/75"
              style={{
                transform: 'rotateY(240deg) translateZ(23px)',
                background:
                  'linear-gradient(135deg, rgba(176, 196, 222, 0.35) 0%, rgba(139, 168, 142, 0.35) 50%, rgba(255, 255, 255, 0.4) 100%)',
                boxShadow:
                  'inset 0 0 15px rgba(255, 255, 255, 0.55), 0 4px 20px rgba(45, 69, 49, 0.08)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent transform -skew-x-6 opacity-65" />
            </div>

            {/* Top Triangular Cap */}
            <div
              className="absolute top-0 left-0 w-20 h-20 border border-white/90 backdrop-blur-md"
              style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                transform: 'translateY(-40px) rotateX(90deg)',
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(139, 168, 142, 0.3) 100%)',
                boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.7)',
              }}
            />

            {/* Bottom Triangular Cap */}
            <div
              className="absolute bottom-0 left-0 w-20 h-20 border border-white/80 backdrop-blur-md"
              style={{
                clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)',
                transform: 'translateY(40px) rotateX(-90deg)',
                background:
                  'linear-gradient(0deg, rgba(255, 255, 255, 0.5) 0%, rgba(243, 224, 194, 0.3) 100%)',
                boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.6)',
              }}
            />
          </div>
        </div>

        {/* Soft Faint Ground Shadow Beneath Prism */}
        <div className="w-28 h-5 mt-2 bg-[#2d4531]/25 rounded-[100%] blur-md animate-shadow-breath" />
      </div>
    </div>
  );
};
