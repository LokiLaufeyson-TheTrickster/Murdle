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

  // Simple deterministic random from seed string
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
    // Generate concentric or arching loops
    const loopCount = 8 + (n % 6);
    const centerX = 50;
    const centerY = 60;
    
    for (let i = 0; i < loopCount; i++) {
      const radiusX = 5 + i * 5;
      const radiusY = 8 + i * 7;
      const noise = (hashString(seed + i) % 10) - 5;
      
      // Arc path
      paths.push(
        <ellipse
          key={i}
          cx={centerX + noise/2}
          cy={centerY}
          rx={radiusX}
          ry={radiusY}
          fill="none"
          stroke={activeColor}
          strokeWidth="1.5"
          strokeDasharray={`${20 + (n % 20)} ${10 + (i % 5)}`}
          style={{ opacity: 0.6 - (i * 0.05) }}
        />
      );
    }
  } else {
    // Generate shoeprint tread patterns
    const gridSize = 4 + (n % 3);
    const step = 80 / gridSize;
    
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize * 1.5; y++) {
        const posX = 10 + x * step;
        const posY = 10 + y * step;
        const subSeed = seed + x + y;
        const shapeType = hashString(subSeed) % 3;
        
        if (shapeType === 0) {
          paths.push(<rect key={`${x}-${y}`} x={posX} y={posY} width={step*0.6} height={step*0.3} rx={2} fill={activeColor} style={{ opacity: 0.4 }} />);
        } else if (shapeType === 1) {
          paths.push(<circle key={`${x}-${y}`} cx={posX} cy={posY} r={step*0.2} fill={activeColor} style={{ opacity: 0.4 }} />);
        } else {
          paths.push(<path key={`${x}-${y}`} d={`M ${posX} ${posY} L ${posX+step*0.4} ${posY+step*0.4}`} stroke={activeColor} strokeLinecap="round" strokeWidth="2" style={{ opacity: 0.4 }} />);
        }
      }
    }
  }

  return (
    <div className="procedural-print" style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '10px', border: '1px solid var(--border-dim)' }}>
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        <defs>
          <filter id="distort">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>
        <g filter="url(#distort)">
          {paths}
        </g>
      </svg>
    </div>
  );
};
