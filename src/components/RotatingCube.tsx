import React from 'react';
import './RotatingCube.css';

interface RotatingCubeProps {
  size?: number;
  color?: string;
  label?: string;
}

export const RotatingCube: React.FC<RotatingCubeProps> = ({
  size = 220,
  color = '#4a654e',
  label = 'Take a breath',
}) => {
  const halfSize = size / 2;

  const faces = [
    { transform: `translateZ(${halfSize}px)` },
    { transform: `rotateY(180deg) translateZ(${halfSize}px)` },
    { transform: `rotateY(90deg) translateZ(${halfSize}px)` },
    { transform: `rotateY(-90deg) translateZ(${halfSize}px)` },
    { transform: `rotateX(90deg) translateZ(${halfSize}px)` },
    { transform: `rotateX(-90deg) translateZ(${halfSize}px)` },
  ];

  return (
    <div className="cube-scene my-4">
      <div
        className="cube-wrapper"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {faces.map((faceStyle, index) => (
          <div
            key={index}
            className="cube-face"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              borderColor: color,
              ...faceStyle,
            }}
          />
        ))}
      </div>
      {label && (
        <span
          className="mt-6 text-xs font-semibold tracking-wider uppercase opacity-80 select-none"
          style={{ color }}
        >
          {label}
        </span>
      )}
    </div>
  );
};
