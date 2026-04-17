import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface TutorialModalProps {
  onClose: () => void;
}

// A small self-contained grid for tutorial purposes
const TutorialGrid: React.FC<{
  rowLabels: string[];
  colLabels: string[];
  cells: number[][]; // 0=empty, 1=X, 2=check
  highlightCell?: [number, number];
}> = ({ rowLabels, colLabels, cells, highlightCell }) => {
  const CELL = 52;
  const HEADER = 100;
  return (
    <div style={{ overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `${HEADER}px repeat(${colLabels.length}, ${CELL}px)`,
        gridTemplateRows: `${HEADER}px repeat(${rowLabels.length}, ${CELL}px)`,
        border: '3px solid rgba(255,255,255,0.2)',
        borderRadius: 8,
        overflow: 'hidden',
        width: 'fit-content',
      }}>
        {/* Corner */}
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRight: '3px solid rgba(255,255,255,0.2)', borderBottom: '3px solid rgba(255,255,255,0.2)' }} />
        {/* Column headers */}
        {colLabels.map((label, ci) => (
          <div key={ci} style={{
            background: 'rgba(255,255,255,0.06)',
            borderRight: `${ci < colLabels.length - 1 ? '1px' : '0'} solid rgba(255,255,255,0.1)`,
            borderBottom: '3px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            paddingBottom: 8,
          }}>
            <span style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontSize: '0.72rem',
              fontFamily: "'JetBrains Mono', monospace",
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 400,
              color: 'var(--text-main)',
            }}>{label}</span>
          </div>
        ))}
        {/* Rows */}
        {rowLabels.map((label, ri) => (
          <React.Fragment key={ri}>
            {/* Row header */}
            <div style={{
              background: 'rgba(255,255,255,0.06)',
              borderRight: '3px solid rgba(255,255,255,0.2)',
              borderBottom: `${ri < rowLabels.length - 1 ? '1px' : '0'} solid rgba(255,255,255,0.1)`,
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
              paddingRight: 10, gap: 6,
            }}>
              <span style={{
                fontSize: '0.72rem',
                fontFamily: "'JetBrains Mono', monospace",
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 400,
                color: 'var(--text-main)',
              }}>{label}</span>
            </div>
            {/* Cells */}
            {colLabels.map((_, ci) => {
              const val = cells[ri]?.[ci] ?? 0;
              const isHL = highlightCell && highlightCell[0] === ri && highlightCell[1] === ci;
              return (
                <div key={ci} style={{
                  width: CELL, height: CELL,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRight: `${ci < colLabels.length - 1 ? '1px' : '0'} solid rgba(255,255,255,0.08)`,
                  borderBottom: `${ri < rowLabels.length - 1 ? '1px' : '0'} solid rgba(255,255,255,0.08)`,
                  background: isHL ? 'rgba(255,200,0,0.12)' : val === 2 ? 'rgba(0,255,163,0.08)' : val === 1 ? 'rgba(255,45,85,0.05)' : 'rgba(255,255,255,0.01)',
                  outline: isHL ? '2px solid rgba(255,200,0,0.5)' : 'none',
                }}>
                  {val === 1 && <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--error)', opacity: 0.85 }}>✕</span>}
                  {val === 2 && <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)', textShadow: '0 0 10px var(--success)' }}>✓</span>}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const TutorialModal: React.FC<TutorialModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);

  const slides = [
    {
      title: "THE BASICS",
      text: (<>Welcome, Detective. Your job: figure out <strong>WHO</strong> did it, with <strong>WHAT</strong> weapon, and <strong>WHERE</strong>. Every puzzle has exactly one correct answer. You use the grid to track what's possible and what isn't.</>),
      caption: "Each row is a suspect (or weapon). Each column is a weapon (or location). Cells track what goes together.",
      grid: (
        <TutorialGrid
          rowLabels={['Victor', 'Dana', 'Rosa']}
          colLabels={['Knife', 'Poison', 'Gun']}
          cells={[[0,0,0],[0,0,0],[0,0,0]]}
        />
      )
    },
    {
      title: "MARKING A MATCH (✓)",
      text: (<>Click a cell twice to place a <strong>Check (✓)</strong>. This means those two things are <strong>definitely linked</strong>. Place one and the grid auto-fills the rest of the row and column with <strong>X</strong>s — because a suspect can only have one weapon.</>),
      caption: "Victor has the Knife. So he can't have Poison or the Gun. And nobody else has the Knife.",
      grid: (
        <TutorialGrid
          rowLabels={['Victor', 'Dana', 'Rosa']}
          colLabels={['Knife', 'Poison', 'Gun']}
          cells={[[2,1,1],[1,0,0],[1,0,0]]}
          highlightCell={[0,0]}
        />
      )
    },
    {
      title: "CROSSING OUT (✕)",
      text: (<>Click a cell once to place an <strong>X (✕)</strong>. This means these two things are <strong>impossible</strong> to pair. Use clues to eliminate options. As you eliminate enough, the truth becomes obvious.</>),
      caption: "A clue says 'Dana was not near the Poison'. Cross it out. Now Dana can only have the Knife or the Gun.",
      grid: (
        <TutorialGrid
          rowLabels={['Victor', 'Dana', 'Rosa']}
          colLabels={['Knife', 'Poison', 'Gun']}
          cells={[[2,1,1],[1,1,0],[1,0,0]]}
          highlightCell={[1,1]}
        />
      )
    },
    {
      title: "CONNECTING THE DOTS",
      text: (<>The puzzle has <strong>three grids</strong>: Suspects × Weapons, Weapons × Locations, and Suspects × Locations. Info from one grid unlocks info in another. Chain them to close the case.</>),
      caption: "Victor has the Knife → The Knife was in the Library → Therefore Victor was in the Library.",
      grid: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textAlign: 'center', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Suspects × Weapons</p>
              <TutorialGrid
                rowLabels={['Victor']}
                colLabels={['Knife']}
                cells={[[2]]}
              />
            </div>
            <span style={{ fontSize: '2rem', color: 'var(--accent-primary)' }}>+</span>
            <div>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textAlign: 'center', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Weapons × Locations</p>
              <TutorialGrid
                rowLabels={['Knife']}
                colLabels={['Library']}
                cells={[[2]]}
              />
            </div>
            <span style={{ fontSize: '2rem', color: 'var(--success)' }}>→</span>
            <div>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textAlign: 'center', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Result</p>
              <TutorialGrid
                rowLabels={['Victor']}
                colLabels={['Library']}
                cells={[[2]]}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "FILING YOUR ACCUSATION",
      text: (<>When you've deduced all three answers — <strong>culprit</strong>, <strong>weapon</strong>, and <strong>location</strong> — click <strong>FILE ACCUSATION</strong> in the top bar. You only get one shot. Make sure your grid is complete before accusing.</>),
      caption: "Wrong accusation = CASE CLOSED AGAINST YOU. Don't guess. Deduce.",
      grid: (
        <TutorialGrid
          rowLabels={['Victor', 'Dana', 'Rosa']}
          colLabels={['Library', 'Garden', 'Cellar']}
          cells={[[2,1,1],[1,1,2],[1,2,1]]}
        />
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="tutorial-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="tutorial-card glass-card"
        onClick={e => e.stopPropagation()}
      >
        <div className="tut-header">
          <h2 className="mono">DETECTIVE ACADEMY — <span style={{ color: 'var(--accent-primary)' }}>CASE {step + 1} / {slides.length}</span></h2>
          <button className="tut-close" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="tut-body">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="tut-slide"
            >
              <h3 className="tut-title mono">{slides[step].title}</h3>
              <p className="tut-text">{slides[step].text}</p>
              <div className="tut-grid-area">
                {slides[step].grid}
                {slides[step].caption && (
                  <p className="tut-caption">{slides[step].caption}</p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="tut-footer">
          <div className="tut-dots">
            {slides.map((_, i) => (
              <button key={i} className={`tut-dot${step === i ? ' active' : ''}`} onClick={() => setStep(i)} />
            ))}
          </div>
          <div className="tut-nav">
            {step > 0 && (
              <button className="tut-btn" onClick={() => setStep(s => s - 1)}>
                <ChevronLeft size={16} /> BACK
              </button>
            )}
            {step < slides.length - 1 ? (
              <button className="tut-btn primary" onClick={() => setStep(s => s + 1)}>
                NEXT <ChevronRight size={16} />
              </button>
            ) : (
              <button className="tut-btn success" onClick={onClose}>
                BEGIN INVESTIGATION
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .tutorial-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.92);
          z-index: 6000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .tutorial-card {
          width: 100%; max-width: 860px;
          display: flex; flex-direction: column;
          border: 1px solid var(--accent-primary) !important;
          box-shadow: 0 0 60px rgba(0,210,255,0.1);
          overflow: hidden;
        }
        .tut-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px 28px; border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .tut-header h2 { font-size: 0.85rem; letter-spacing: 2px; }
        .tut-close {
          background: none; border: none; cursor: pointer;
          color: var(--text-dim); padding: 4px;
          border-radius: 4px; transition: color 0.2s;
        }
        .tut-close:hover { color: var(--error); }

        .tut-body { padding: 28px; overflow-y: auto; max-height: 70vh; }
        .tut-slide { display: flex; flex-direction: column; gap: 20px; }
        .tut-title { font-size: 1.6rem; letter-spacing: 2px; color: var(--text-bright); }
        .tut-text {
          font-size: 1rem; line-height: 1.7;
          color: var(--text-main);
        }
        .tut-text strong { color: var(--accent-primary); font-weight: 700; }
        .tut-grid-area {
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 24px;
          display: flex; flex-direction: column; gap: 16px;
        }
        .tut-caption {
          font-size: 0.82rem;
          color: var(--text-dim);
          border-left: 3px solid var(--accent-secondary);
          padding-left: 12px;
          font-style: italic;
          line-height: 1.5;
        }

        .tut-footer {
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px 28px; border-top: 1px solid rgba(255,255,255,0.08);
        }
        .tut-dots { display: flex; gap: 8px; align-items: center; }
        .tut-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,0.2); border: none; cursor: pointer;
          transition: all 0.2s;
        }
        .tut-dot.active { background: var(--accent-primary); width: 22px; border-radius: 4px; }

        .tut-nav { display: flex; gap: 10px; }
        .tut-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 10px 20px; border-radius: 8px;
          font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;
          font-weight: 700; letter-spacing: 1px;
          border: 1px solid rgba(255,255,255,0.15);
          background: transparent; color: var(--text-main); cursor: pointer;
          transition: all 0.2s;
        }
        .tut-btn:hover { background: rgba(255,255,255,0.08); }
        .tut-btn.primary {
          background: var(--accent-primary); color: var(--bg-color); border-color: transparent;
        }
        .tut-btn.primary:hover { opacity: 0.85; }
        .tut-btn.success {
          background: var(--success); color: var(--bg-color); border-color: transparent;
        }
      `}} />
    </motion.div>
  );
};
