import React from 'react';

interface ProceduralPrintProps {
  seed?: string;
  type: 'fingerprint' | 'shoeprint';
  color?: string;
  size?: number;
  grayscale?: boolean;
}

export const ProceduralPrint: React.FC<ProceduralPrintProps> = ({ seed, type, color = 'var(--accent-primary)', size = 100, grayscale = false }) => {
  if (!seed) return null;
  const activeColor = grayscale ? '#888888' : color;

  // Deterministic hash
  const hashString = (s: string) => {
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
      hash = ((hash << 5) - hash) + s.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const n = hashString(seed);
  const paths = [];

  if (type === 'fingerprint') {
    // Variety: Whorl, Loop, Arch
    const patternType = n % 3; // 0: Whorl, 1: Loop, 2: Arch
    const lineCount = 10 + (n % 5);
    const centerX = 50;
    const centerY = 55;

    for (let i = 0; i < lineCount; i++) {
      const radiusX = 4 + i * 4.5;
      const radiusY = 6 + i * 6;
      const noise = (hashString(seed + i) % 6) - 3;

      if (patternType === 0) { // Whorl (Concentric ellipses)
        paths.push(
          <ellipse
            key={i}
            cx={centerX + noise/3}
            cy={centerY}
            rx={radiusX}
            ry={radiusY}
            fill="none"
            stroke={activeColor}
            strokeWidth="1.2"
            strokeDasharray={`${30 + (n % 40)} ${5 + (i % 8)}`}
            style={{ opacity: 0.7 - (i * 0.04) }}
          />
        );
      } else if (patternType === 1) { // Loop (Narrower, tilted)
        const tilt = (n % 20) - 10;
        paths.push(
          <path
            key={i}
            d={`M ${centerX - radiusX/2} ${centerY + radiusY} Q ${centerX + tilt} ${centerY - radiusY} ${centerX + radiusX/2} ${centerY + radiusY}`}
            fill="none"
            stroke={activeColor}
            strokeWidth="1.2"
            strokeDasharray={`${25 + (n % 30)} ${8 + (i % 6)}`}
            style={{ opacity: 0.7 - (i * 0.04) }}
          />
        );
      } else { // Arch (Broad curves)
        paths.push(
          <path
            key={i}
            d={`M ${centerX - radiusX} ${centerY + 20} Q ${centerX} ${centerY - radiusY + 20} ${centerX + radiusX} ${centerY + 20}`}
            fill="none"
            stroke={activeColor}
            strokeWidth="1.2"
            strokeDasharray={`${40 + (n % 20)} ${10 + (i % 10)}`}
            style={{ opacity: 0.7 - (i * 0.04) }}
          />
        );
      }
    }
  } else {
    // Shoeprint variety: Sneaker, Stiletto, Boot, Workshoe
    // Deriving shoe category from seed text if possible, else random
    const category = seed.toLowerCase().includes('stiletto') ? 'stiletto' : 
                     seed.toLowerCase().includes('lug') ? 'boot' : 
                     seed.toLowerCase().includes('honeycomb') ? 'sneaker' : 
                     ['sneaker', 'stiletto', 'boot', 'workshoe'][n % 4];

    if (category === 'stiletto') {
      // Pointed toe + small heel
      paths.push(
        <path key="heel" d="M 45 80 L 55 80 L 52 95 L 48 95 Z" fill={activeColor} style={{ opacity: 0.5 }} />,
        <path key="sole" d="M 35 45 Q 50 10 65 45 Q 60 70 50 70 Q 40 70 35 45" fill={activeColor} style={{ opacity: 0.4 }} />
      );
      // Add fine tread dots
      for(let i=0; i<8; i++) {
        paths.push(<circle key={i} cx={40 + (hashString(seed+i)%20)} cy={20 + (hashString(seed+i*2)%40)} r="1" fill={activeColor} style={{ opacity: 0.3 }} />);
      }
    } else if (category === 'boot') {
      // Rugged lug sole pattern
      paths.push(<path key="base" d="M 30 20 Q 50 5 70 20 L 75 70 Q 50 95 25 70 Z" fill={activeColor} style={{ opacity: 0.2 }} />);
      for (let y = 20; y < 80; y += 12) {
        paths.push(
          <rect key={`lug-l-${y}`} x={32} y={y} width={15} height={6} rx={2} fill={activeColor} style={{ opacity: 0.5 }} />,
          <rect key={`lug-r-${y}`} x={53} y={y} width={15} height={6} rx={2} fill={activeColor} style={{ opacity: 0.5 }} />
        );
      }
    } else { // Sneaker / General
      // Wavy / Honeycomb patterns
      paths.push(<path key="base" d="M 32 15 Q 50 5 68 15 L 72 80 Q 50 95 28 80 Z" fill={activeColor} style={{ opacity: 0.2 }} />);
      const grid = 6;
      const step = 60 / grid;
      for (let x = 0; x < grid; x++) {
        for (let y = 0; y < grid * 1.5; y++) {
          const px = 35 + x * step * 0.8;
          const py = 20 + y * step * 0.8;
          if (py > 75) continue;
          const subSeed = seed + x + y;
          const subN = hashString(subSeed);
          if (subN % 2 === 0) {
            paths.push(<circle key={`${x}-${y}`} cx={px} cy={py} r={step/3} fill={activeColor} style={{ opacity: 0.3 }} />);
          } else {
            paths.push(<rect key={`${x}-${y}`} x={px-step/4} y={py-step/4} width={step/2} height={step/2} rx={1} fill={activeColor} style={{ opacity: 0.3 }} />);
          }
        }
      }
    }
  }

  return (
    <div className="procedural-print" style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.1)', borderRadius: '12px', padding: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        <defs>
          <filter id="forensic-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
            <feGaussianBlur stdDeviation="0.2" />
          </filter>
        </defs>
        <g filter="url(#forensic-filter)">
          {paths}
        </g>
      </svg>
    </div>
  );
};
