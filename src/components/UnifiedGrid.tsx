import React from 'react';
import { SUSPECT_ICONS } from '../engine/narrative';
import type { Puzzle } from '../engine/types';

interface UnifiedGridProps {
  puzzle: Puzzle;
  userState: { [key: string]: { val: number, auto?: boolean } };
  onCellClick: (gridType: string, row: number, col: number) => void;
}

export const UnifiedGrid: React.FC<UnifiedGridProps> = ({ puzzle, userState, onCellClick }) => {
  const { size, suspects, weapons, locations } = puzzle;

  const renderCell = (gridType: 'SW' | 'WL' | 'SL', localR: number, localC: number, globalR: number, globalC: number) => {
    const key = `${gridType}-${localR}-${localC}`;
    const cell = userState[key] || { val: 0 };
    const { val } = cell;

    // Determine border styles for separators using global axes
    const isBottomEdge = globalR === size - 1;
    const isRightEdge = globalC === size - 1;

    return (
      <div 
        key={key} 
        className={`grid-cell ${val === 1 ? 'is-x' : val === 2 ? 'is-check' : val === 3 ? 'is-maybe' : ''}`}
        style={{
          borderRight: isRightEdge ? '3px solid var(--grid-line-bold)' : '1px solid var(--grid-line)',
          borderBottom: isBottomEdge ? '3px solid var(--grid-line-bold)' : '1px solid var(--grid-line)'
        }}
        onClick={() => onCellClick(gridType, localR, localC)}
      >
        {val === 1 && <span className="cell-mark x">✕</span>}
        {val === 2 && <span className="cell-mark check">✓</span>}
        {val === 3 && <span className="cell-mark maybe">?</span>}
      </div>
    );
  };

  const renderIcon = (item: any, isSuspect = false) => {
    if (isSuspect) {
      const IconComp = SUSPECT_ICONS[item.icon] || SUSPECT_ICONS['User'];
      return <IconComp size={24} style={{ color: item.color }} />;
    }
    return <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>;
  };

  return (
    <div className="unified-grid-container glass-card">
      <div className="scroll-wrapper">
        <div className="grid-master-layout" style={{ 
          gridTemplateColumns: `140px repeat(${size * 2}, 48px)`,
          gridTemplateRows: `140px repeat(${size * 2}, 48px)`
        }}>
          {/* Top-Left Corner */}
          <div className="corner-label glass" style={{ borderRight: '3px solid var(--grid-line-bold)', borderBottom: '3px solid var(--grid-line-bold)' }}></div>

          {/* Top Headers: Suspects */}
          {suspects.map((s, i) => (
            <div key={`th-s-${i}`} className="header-cell top" style={{ borderRight: i === size - 1 ? '3px solid var(--grid-line-bold)' : '1px solid var(--grid-line)', borderBottom: '3px solid var(--grid-line-bold)' }}>
              <div className="header-content top">
                <span className="mono label top-label">{s.name}</span>
                {renderIcon(s, true)}
              </div>
            </div>
          ))}

          {/* Top Headers: Locations */}
          {locations.map((l, i) => (
            <div key={`th-l-${i}`} className="header-cell top" style={{ borderRight: i === size - 1 ? '3px solid var(--grid-line-bold)' : '1px solid var(--grid-line)', borderBottom: '3px solid var(--grid-line-bold)' }}>
              <div className="header-content top">
                <span className="mono label top-label">{l.name}</span>
                {renderIcon(l)}
              </div>
            </div>
          ))}

          {/* Rows */}
          {Array.from({ length: size * 2 }).map((_, r) => (
            <React.Fragment key={`row-${r}`}>
              {/* Side Header */}
              <div className="header-cell side" style={{ borderBottom: r === size - 1 ? '3px solid var(--grid-line-bold)' : '1px solid var(--grid-line)', borderRight: '3px solid var(--grid-line-bold)' }}>
                <div className="header-content side">
                  <span className="mono label">{r < size ? weapons[r].name : locations[r - size].name}</span>
                  {r < size ? renderIcon(weapons[r]) : renderIcon(locations[r - size])}
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
                }}></div>;
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .unified-grid-container {
          margin: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: calc(100vh - 120px);
          box-shadow: 0 0 50px rgba(0,0,0,0.5);
        }
        .scroll-wrapper {
          overflow: auto;
          flex: 1;
        }
        .grid-master-layout {
          display: grid;
          width: fit-content;
          background: rgba(0,0,0,0.2);
        }
        .header-cell {
          background: rgba(255,255,255,0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .header-cell.top {
          height: 140px;
        }
        .header-cell.side {
          width: 140px;
          justify-content: flex-end;
          padding-right: 12px;
        }
        .header-content.top {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding-bottom: 8px;
          height: 100%;
          width: 100%;
        }
        .header-cell .label.top-label {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          margin-bottom: 8px;
          max-height: 90px;
        }
        .header-content.side {
          display: flex;
          align-items: center;
          gap: 12px;
          text-align: right;
        }
        .header-cell .label {
          font-size: 0.6rem;
          color: var(--text-dim);
          text-transform: uppercase;
          max-width: 130px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .grid-cell {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: rgba(255,255,255,0.01);
          transition: all 0.1s;
        }
        .grid-cell:hover {
          background: rgba(255,255,255,0.1);
          box-shadow: inset 0 0 10px var(--accent-glow);
        }
        .grid-empty {
          background: transparent;
        }
        
        .cell-mark {
          font-size: 1.4rem;
          font-weight: 800;
        }
        .cell-mark.x { color: var(--error); opacity: 0.8; }
        .cell-mark.check { 
          color: var(--success); 
          text-shadow: 0 0 12px var(--success); 
        }
        .cell-mark.maybe { color: var(--accent-primary); }
        
        .is-check { background: rgba(0, 255, 163, 0.08) !important; }
        .is-x { background: rgba(255, 45, 85, 0.04) !important; }
      `}} />
    </div>
  );
};
