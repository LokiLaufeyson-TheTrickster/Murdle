import React from 'react';
import type { Difficulty } from '../engine/types';
import { RefreshCw, ShieldAlert, Database, Crosshair } from 'lucide-react';

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
}

export const TopBar: React.FC<TopBarProps> = ({ 
  seed, 
  difficulty, 
  setDifficulty, 
  size, 
  setSize, 
  theme,
  setTheme,
  charges, 
  onNewGame, 
  onUseContradiction,
  onOpenDatabase,
  onOpenAccuse
}) => {
  return (
    <div className="top-bar glass">
      <div className="brand-section">
        <h1 className="logo-text">OMEN <span className="logo-v">v3.2</span></h1>
        <div className="badges-row">
          <div className="badge seed mono">{seed}</div>
          <div className="badge status mono success">DETERMINISTIC</div>
        </div>
      </div>
      
      <div className="controls-group glass-card">
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
          <label className="mono label-tiny">WORKSPACE</label>
          <select value={size} onChange={(e) => setSize(parseInt(e.target.value))}>
            {[3, 4, 5, 6, 7, 8, 9].map(num => (
              <option key={num} value={num}>{num}x{num}</option>
            ))}
          </select>
        </div>

        <div className="control">
          <label className="mono label-tiny">FLAVOR</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="Modern">MODERN DETECTIVE</option>
            <option value="Noir">NOIR MYSTERY</option>
            <option value="Fantasy">FANTASY REALM</option>
          </select>
        </div>
      </div>

      <div className="actions">
        <button className="btn-modern" style={{ borderColor: 'var(--error)', color: 'var(--error)' }} onClick={onOpenAccuse}>
          <Crosshair size={18} />
          <span>FILE ACCUSATION</span>
        </button>
        <button className="btn-modern" style={{ background: 'transparent', borderColor: 'var(--accent-primary)', color: 'var(--text-bright)' }} onClick={onOpenDatabase}>
          <Database size={18} color="var(--accent-primary)" />
          <span>VIEW DOSSIERS</span>
        </button>
        <button className="btn-modern hypothesis" onClick={onUseContradiction} disabled={charges === 0}>
          <ShieldAlert size={18} />
          <span>HYPOTHESIS ({charges})</span>
        </button>
        <button className="btn-modern icon-only" onClick={onNewGame} title="REGENERATE SEED">
          <RefreshCw size={20} />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .actions { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 40px;
          border-bottom: 1px solid var(--border-bright);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .brand-section {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .logo-text {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          letter-spacing: -1px;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .logo-v { font-size: 0.8rem; opacity: 0.6; -webkit-text-fill-color: var(--text-dim); }
        .badges-row { display: flex; gap: 8px; }
        .badge {
          font-size: 0.6rem;
          padding: 2px 8px;
          border-radius: 4px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-dim);
          color: var(--text-dim);
        }
        .badge.success { color: var(--success); border-color: rgba(0, 255, 163, 0.2); }
        
        .controls-group {
          display: flex;
          padding: 4px 20px;
          gap: 24px;
        }
        .control {
          display: flex;
          flex-direction: column;
        }
        .label-tiny { font-size: 0.55rem; color: var(--text-dim); opacity: 0.7; }
        .controls-group select {
          background: transparent;
          border: none;
          color: var(--text-main);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 700;
          outline: none;
          cursor: pointer;
        }
        .controls-group select option { background: var(--bg-color); }
        
        .btn-modern {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 24px;
          border-radius: 8px;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid var(--border-bright);
        }
        .btn-modern.hypothesis {
          background: linear-gradient(135deg, rgba(255, 45, 85, 0.2), rgba(157, 80, 187, 0.2));
          color: white;
          border-color: rgba(255, 45, 85, 0.4);
        }
        .btn-modern.hypothesis:hover:not(:disabled) {
          background: var(--error);
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(255, 45, 85, 0.4);
        }
        .btn-modern.icon-only {
          padding: 10px;
          background: rgba(255,255,255,0.05);
        }
        .btn-modern.icon-only:hover {
          background: var(--accent-primary);
          color: var(--bg-color);
          transform: rotate(180deg);
        }
        .btn-modern:disabled { opacity: 0.2; cursor: not-allowed; transform: none !important; }
      `}} />
    </div>
  );
};
