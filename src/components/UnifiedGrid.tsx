import React from 'react';
import { SUSPECT_ICONS, WEAPON_ICONS, LOCATION_ICONS } from '../engine/narrative';
import type { Puzzle } from '../engine/types';

interface UnifiedGridProps {
  puzzle: Puzzle;
  userState: { [key: string]: { val: number, auto?: boolean } };
  onCellClick: (gridType: string, row: number, col: number) => void;
  isReviewMode?: boolean;
}

export const UnifiedGrid: React.FC<UnifiedGridProps> = ({ puzzle, userState, onCellClick, isReviewMode }) => {
  const { size, suspects, weapons, locations, solution } = puzzle;

  const renderCell = (gridType: 'SW' | 'WL' | 'SL', localR: number, localC: number, globalR: number, globalC: number) => {
    const key = `${gridType}-${localR}-${localC}`;
    const cell = userState[key] || { val: 0 };
    const { val } = cell;

    // Check for errors in review mode
    let isError = false;
    if (isReviewMode && val > 0 && val < 3) {
      const isActuallyPair = gridType === 'SW' ? solution.sw[localR] === localC
                           : gridType === 'WL' ? solution.wl[localR] === localC
                           : solution.sl[localR] === localC;
      
      // Error if: marked Check but not pair, or marked X but IS pair
      if ((val === 2 && !isActuallyPair) || (val === 1 && isActuallyPair)) {
        isError = true;
      }
    }

    const isBottomEdge = globalR === size - 1;
    const isRightEdge = globalC === size - 1;

    return (
      <div 
        key={key} 
        className={`grid-cell ${val === 1 ? 'is-x' : val === 2 ? 'is-check' : val === 3 ? 'is-maybe' : ''} ${isError ? 'is-error' : ''}`}
        style={{
          borderRight: isRightEdge ? '3px solid var(--grid-line-bold)' : '1px solid var(--grid-line)',
          borderBottom: isBottomEdge ? '3px solid var(--grid-line-bold)' : '1px solid var(--grid-line)'
        }}
        onClick={() => !isReviewMode && onCellClick(gridType, localR, localC)}
      >
        {val === 1 && <span className="cell-mark x">✕</span>}
        {val === 2 && <span className="cell-mark check">✓</span>}
        {val === 3 && <span className="cell-mark maybe">?</span>}
        {isError && <div className="error-pulse" />}
      </div>
    );
  };

  const renderSuspectIcon = (item: any, size: number = 22) => {
    const IconComp = SUSPECT_ICONS[item.icon] || SUSPECT_ICONS['User'];
    return <IconComp size={size} style={{ color: item.color || 'var(--accent-primary)' }} />;
  };

  const renderWeaponIcon = (item: any, sz: number = 20) => {
    const IconComp = WEAPON_ICONS[item.icon] || WEAPON_ICONS['Target'];
    return <IconComp size={sz} style={{ color: item.color || '#FFC107' }} />;
  };

  const renderLocationIcon = (item: any, sz: number = 20) => {
    const IconComp = LOCATION_ICONS[item.icon] || LOCATION_ICONS['Wind'];
    return <IconComp size={sz} style={{ color: item.color || '#00E5FF' }} />;
  };

  return (
    <div className="unified-grid-container glass-card">
      <div className="scroll-wrapper">
        <div className="grid-master-layout" style={{ 
          gridTemplateColumns: `var(--header-w) repeat(${size * 2}, var(--cell-sz))`,
          gridTemplateRows: `var(--header-h) repeat(${size * 2}, var(--cell-sz))`
        }}>
          {/* Top-Left Corner */}
          <div className="corner-label glass" style={{ borderRight: '3px solid var(--grid-line-bold)', borderBottom: '3px solid var(--grid-line-bold)' }} />

          {/* Top Headers: Suspects */}
          {suspects.map((s, i) => (
            <div key={`th-s-${i}`} className="header-cell top" style={{ borderRight: i === size - 1 ? '3px solid var(--grid-line-bold)' : '1px solid var(--grid-line)', borderBottom: '3px solid var(--grid-line-bold)' }}>
              <div className="header-content top">
                <span className="handwritten label top-label">{s.name}</span>
                <div style={{ transform: i % 2 === 0 ? 'rotate(5deg)' : 'rotate(-5deg)' }}>{renderSuspectIcon(s)}</div>
              </div>
            </div>
          ))}

          {/* Top Headers: Locations */}
          {locations.map((l, i) => (
            <div key={`th-l-${i}`} className="header-cell top" style={{ borderRight: i === size - 1 ? '3px solid var(--grid-line-bold)' : '1px solid var(--grid-line)', borderBottom: '3px solid var(--grid-line-bold)' }}>
              <div className="header-content top">
                <span className="handwritten label top-label">{l.name}</span>
                <div style={{ transform: i % 2 === 0 ? 'rotate(-3deg)' : 'rotate(3deg)' }}>{renderLocationIcon(l)}</div>
              </div>
            </div>
          ))}

          {/* Rows */}
          {Array.from({ length: size * 2 }).map((_, r) => (
            <React.Fragment key={`row-${r}`}>
              {/* Side Header */}
              <div className="header-cell side" style={{ borderBottom: r === size - 1 ? '3px solid var(--grid-line-bold)' : '1px solid var(--grid-line)', borderRight: '3px solid var(--grid-line-bold)' }}>
                <div className="header-content side">
                  <span className="handwritten label">{r < size ? weapons[r].name : locations[r - size].name}</span>
                  <div style={{ transform: r % 2 === 0 ? 'rotate(4deg)' : 'rotate(-4deg)', flexShrink: 0 }}>
                    {r < size ? renderWeaponIcon(weapons[r]) : renderLocationIcon(locations[r - size])}
                  </div>
                </div>
              </div>

              {/* Grid Cells */}
              {Array.from({ length: size * 2 }).map((_, c) => {
                if (r < size && c < size) return renderCell('SW', c, r, r, c); 
                if (r < size && c >= size) return renderCell('WL', r, c - size, r, c); 
                if (r >= size && c < size) return renderCell('SL', c, r - size, r, c); 
                
                return <div key={`empty-${r}-${c}`} className="grid-empty" style={{
                  borderLeft: c === size ? '3px solid var(--grid-line-bold)' : 'none',
                  borderTop: r === size ? '3px solid var(--grid-line-bold)' : 'none'
                }} />;
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --header-w: 150px;
          --header-h: 150px;
          --cell-sz: 48px;
        }
        @media (max-width: 900px) {
          :root {
            --header-w: 110px;
            --header-h: 110px;
            --cell-sz: 40px;
          }
        }
        @media (max-width: 600px) {
          :root {
            --header-w: 90px;
            --header-h: 90px;
            --cell-sz: 34px;
          }
        }
        .unified-grid-container {
          margin: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          border: none;
          background: transparent;
          box-shadow: none;
          justify-content: center;
          align-items: center;
        }
        .scroll-wrapper {
          overflow: auto;
          flex: 1;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 16px 16px;
        }
        .grid-master-layout {
          display: grid;
          width: fit-content;
          background: rgba(0,0,0,0.4);
          border: 4px solid var(--grid-line-bold);
          border-radius: 8px;
          margin: auto;
          position: relative;
        }
        .grid-master-layout::before {
          content: 'CASE FILE — RESTRICTED';
          position: absolute;
          top: -26px;
          left: 0;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          color: var(--accent-primary);
          opacity: 0.5;
          letter-spacing: 3px;
        }
        .header-cell {
          background: rgba(255,255,255,0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .header-cell.top {
          height: var(--header-h);
          background: rgba(255,255,255,0.04);
        }
        .header-cell.side {
          width: var(--header-w);
          justify-content: flex-end;
          padding-right: 10px;
          background: rgba(255,255,255,0.04);
        }
        .header-content.top {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding-bottom: 6px;
          height: 100%;
          width: 100%;
        }
        .header-cell .label.top-label {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          margin-bottom: 6px;
          max-height: 80px;
        }
        .header-content.side {
          display: flex;
          align-items: center;
          gap: 8px;
          text-align: right;
          width: 100%;
          padding-right: 8px;
          justify-content: flex-end;
        }
        .header-cell .label {
          font-size: 0.75rem;
          color: var(--text-main);
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        @media (max-width: 600px) {
          .header-cell .label { font-size: 0.6rem; max-width: 75px; }
        }
        
        .grid-cell {
          width: var(--cell-sz);
          height: var(--cell-sz);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: rgba(255,255,255,0.01);
          transition: all 0.1s;
        }
        .grid-cell:hover {
          background: rgba(255,255,255,0.08);
          box-shadow: inset 0 0 8px var(--accent-glow);
        }
        .grid-empty { background: transparent; }
        
        .cell-mark { font-size: 1.2rem; font-weight: 800; }
        @media (max-width: 600px) { .cell-mark { font-size: 1rem; } }
        .cell-mark.x { color: var(--error); opacity: 0.8; }
        .cell-mark.check { color: var(--success); text-shadow: 0 0 10px var(--success); }
        .cell-mark.maybe { color: var(--accent-primary); }
        
        .is-check { background: rgba(0, 255, 163, 0.07) !important; }
        .is-x { background: rgba(255, 45, 85, 0.03) !important; }
      `}} />
    </div>
  );
};
