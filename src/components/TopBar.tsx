import React, { useState } from 'react';
import type { Difficulty } from '../engine/types';
import { RefreshCw, ShieldAlert, Database, Crosshair, Menu, X } from 'lucide-react';

interface TopBarProps {
  seed: string;
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  size: number;
  setSize: (s: number) => void;
  theme: string;
  setTheme: (t: string) => void;
  charges: number;
  onNewGame: () => void;
  onUseContradiction: () => void;
  onOpenDatabase: () => void;
  onOpenAccuse: () => void;
  onBackToMenu: () => void;
}

// Compact logo for TopBar
const LogoMark: React.FC = () => (
  <img 
    src="/logo.png" 
    alt="Logo" 
    style={{ width: 32, height: 32, objectFit: 'contain' }} 
  />
);

export const TopBar: React.FC<TopBarProps> = ({ 
  seed, difficulty, setDifficulty, size, setSize, theme, setTheme,
  charges, onNewGame, onUseContradiction, onOpenDatabase, onOpenAccuse, onBackToMenu
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="top-bar glass">
        <div className="brand-section">
          <LogoMark />
          <div>
            <h1 className="logo-text">TheDeductionist</h1>
            <div className="badge seed mono">{seed}</div>
          </div>
        </div>
        
        <div className="controls-group glass-card desktop-controls">
          <div className="control">
            <label className="mono label-tiny">RANK</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
              <option value="Cadet">CADET</option>
              <option value="Sergeant">SERGEANT</option>
              <option value="Inspector">INSPECTOR</option>
              <option value="Special Agent">AGENT</option>
            </select>
          </div>

          <div className="control">
            <label className="mono label-tiny">SUSPECTS</label>
            <select value={size} onChange={(e) => setSize(parseInt(e.target.value))}>
              {[3, 4, 5, 6, 7].map(num => (
                <option key={num} value={num}>{num} — {num}x{num}</option>
              ))}
            </select>
          </div>

          <div className="control">
            <label className="mono label-tiny">SETTING</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="Modern">MODERN DETECTIVE</option>
              <option value="Noir">NOIR MYSTERY</option>
              <option value="Fantasy">FANTASY REALM</option>
            </select>
          </div>
        </div>

        <div className="actions desktop-controls">
          <button className="btn-modern accuse" onClick={onOpenAccuse} id="btn-accuse">
            <Crosshair size={16} />
            <span className="btn-label">ACCUSE</span>
          </button>
          <button className="btn-modern dossier" onClick={onOpenDatabase} id="btn-dossier">
            <Database size={16} color="var(--accent-primary)" />
            <span className="btn-label">DOSSIERS</span>
          </button>
          <button className="btn-modern hypothesis" onClick={onUseContradiction} disabled={charges === 0} id="btn-hypothesis">
            <ShieldAlert size={16} />
            <span className="btn-label">VERIFY ({charges})</span>
          </button>
          <button className="btn-modern icon-only" onClick={onNewGame} title="New Case" id="btn-new-game">
            <RefreshCw size={18} />
          </button>
          <button className="btn-modern menu-back" onClick={onBackToMenu} id="btn-back-to-menu">
            <span>HQ</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile action drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer glass">
          <div className="mobile-controls-row">
            <div className="control">
              <label className="mono label-tiny">RANK</label>
              <select value={difficulty} onChange={(e) => { setDifficulty(e.target.value as Difficulty); }}>
                <option value="Cadet">CADET</option>
                <option value="Sergeant">SERGEANT</option>
                <option value="Inspector">INSPECTOR</option>
                <option value="Special Agent">AGENT</option>
              </select>
            </div>
            <div className="control">
              <label className="mono label-tiny">SIZE</label>
              <select value={size} onChange={(e) => { setSize(parseInt(e.target.value)); }}>
                {[3,4,5,6,7].map(n => <option key={n} value={n}>{n}x{n}</option>)}
              </select>
            </div>
            <div className="control">
              <label className="mono label-tiny">SETTING</label>
              <select value={theme} onChange={(e) => { setTheme(e.target.value); }}>
                <option value="Modern">MODERN</option>
                <option value="Noir">NOIR</option>
                <option value="Fantasy">FANTASY</option>
              </select>
            </div>
          </div>
          <div className="mobile-actions-row">
            <button className="btn-modern accuse" onClick={() => { onOpenAccuse(); setMobileMenuOpen(false); }}>
              <Crosshair size={15} /><span>ACCUSE</span>
            </button>
            <button className="btn-modern dossier" onClick={() => { onOpenDatabase(); setMobileMenuOpen(false); }}>
              <Database size={15} /><span>DOSSIERS</span>
            </button>
            <button className="btn-modern hypothesis" onClick={() => { onUseContradiction(); setMobileMenuOpen(false); }} disabled={charges === 0}>
              <ShieldAlert size={15} /><span>VERIFY ({charges})</span>
            </button>
            <button className="btn-modern icon-only" onClick={() => { onNewGame(); setMobileMenuOpen(false); }}>
              <RefreshCw size={15} />
            </button>
            <button className="btn-modern menu-back" onClick={() => { onBackToMenu(); setMobileMenuOpen(false); }}>
              <span>HQ</span>
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          border-bottom: 1px solid var(--border-bright);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          gap: 12px;
          flex-shrink: 0;
          position: relative;
          z-index: 100;
        }
        .brand-section {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .logo-text {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.3rem;
          letter-spacing: -0.5px;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
          margin-bottom: 3px;
        }
        .badge {
          font-size: 0.55rem;
          padding: 1px 6px;
          border-radius: 3px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-dim);
          color: var(--text-dim);
          display: inline-block;
        }
        
        .controls-group {
          display: flex;
          padding: 4px 16px;
          gap: 20px;
        }
        .control { display: flex; flex-direction: column; }
        .label-tiny { font-size: 0.5rem; color: var(--text-dim); opacity: 0.6; letter-spacing: 1px; }
        .controls-group select {
          background: transparent;
          border: none;
          color: var(--text-main);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          outline: none;
          cursor: pointer;
        }
        .controls-group select option { background: var(--bg-color); }
        
        .actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .btn-modern {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 14px;
          border-radius: 7px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          cursor: pointer;
          transition: all 0.25s;
          border: 1px solid var(--border-bright);
          color: var(--text-bright);
          letter-spacing: 0.5px;
          background: rgba(255,255,255,0.03);
          white-space: nowrap;
        }
        .btn-modern.accuse {
          border-color: rgba(255,45,85,0.4);
          color: var(--error);
        }
        .btn-modern.accuse:hover {
          background: rgba(255,45,85,0.15);
          transform: scale(1.04);
        }
        .btn-modern.dossier {
          border-color: rgba(0,210,255,0.3);
        }
        .btn-modern.dossier:hover {
          background: rgba(0,210,255,0.08);
          transform: scale(1.04);
        }
        .btn-modern.hypothesis {
          background: linear-gradient(135deg, rgba(255,45,85,0.15), rgba(157,80,187,0.15));
          border-color: rgba(255,45,85,0.35);
        }
        .btn-modern.hypothesis:hover:not(:disabled) {
          background: rgba(255,45,85,0.25);
          transform: scale(1.04);
          box-shadow: 0 0 16px rgba(255,45,85,0.3);
        }
        .btn-modern.icon-only {
          padding: 8px 10px;
        }
        .btn-modern.icon-only:hover {
          background: var(--accent-primary);
          color: var(--bg-color);
          transform: rotate(180deg);
        }
        .btn-modern.menu-back {
          padding: 8px 12px;
          font-size: 0.6rem;
          opacity: 0.6;
        }
        .btn-modern.menu-back:hover { opacity: 1; }
        .btn-modern:disabled { opacity: 0.2; cursor: not-allowed; transform: none !important; }

        .mobile-menu-btn {
          display: none;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-dim);
          color: var(--text-main);
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .mobile-menu-btn:hover { background: rgba(255,255,255,0.1); }

        .mobile-drawer {
          display: none;
          flex-direction: column;
          gap: 12px;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-bright);
          background: var(--surface-1);
        }
        .mobile-controls-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .mobile-controls-row .control {
          flex: 1;
          min-width: 100px;
        }
        .mobile-controls-row select {
          background: rgba(0,0,0,0.3);
          border: 1px solid var(--border-dim);
          border-radius: 4px;
          color: var(--text-main);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          outline: none;
          cursor: pointer;
          padding: 4px 6px;
          width: 100%;
        }
        .mobile-actions-row {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .mobile-actions-row .btn-modern { flex: 1; min-width: 80px; justify-content: center; }

        @media (max-width: 900px) {
          .desktop-controls { display: none !important; }
          .mobile-menu-btn { display: flex; }
          .mobile-drawer { display: flex; }
        }
        @media (min-width: 901px) {
          .mobile-drawer { display: none !important; }
        }

        .handwritten {
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
          font-weight: 400;
          letter-spacing: 1px;
        }
      `}} />
    </>
  );
};
