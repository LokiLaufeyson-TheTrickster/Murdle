import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crosshair, User, Box, Map } from 'lucide-react';
import type { AssetInfo } from '../engine/types';

interface AccuseModalProps {
  suspects: AssetInfo[];
  weapons: AssetInfo[];
  locations: AssetInfo[];
  trueMurderer: string;
  murderWeapon: string;
  murderLocation: string;
  onClose: () => void;
  onVictory: () => void;
  onDefeat: () => void;
}

export const AccuseModal: React.FC<AccuseModalProps> = ({ 
  suspects, weapons, locations, 
  trueMurderer, murderWeapon, murderLocation, 
  onClose, onVictory, onDefeat 
}) => {
  const [selectedS, setSelectedS] = useState<string>('');
  const [selectedW, setSelectedW] = useState<string>('');
  const [selectedL, setSelectedL] = useState<string>('');

  const submitAccusation = () => {
    if (!selectedS || !selectedW || !selectedL) return;
    
    if (selectedS === trueMurderer && selectedW === murderWeapon && selectedL === murderLocation) {
      onVictory();
    } else {
      onDefeat();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="accuse-overlay"
      onClick={onClose}
    >
      <div className="accuse-modal glass-card" onClick={e => e.stopPropagation()}>
        <div className="accuse-header">
          <Crosshair className="icon-pulse" size={32} color="var(--error)" />
          <h2 className="mono">FILE OFFICIAL ACCUSATION</h2>
          <p className="mono-sub">Declare the final findings of your investigation. This action is irreversible.</p>
        </div>

        <div className="accuse-form">
          <div className="form-group">
            <label><User size={16}/> THE CULPRIT</label>
            <select value={selectedS} onChange={e => setSelectedS(e.target.value)} className="glass-accent mono">
              <option value="">-- SELECT SUSPECT --</option>
              {suspects.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label><Box size={16}/> THE MURDER WEAPON</label>
            <select value={selectedW} onChange={e => setSelectedW(e.target.value)} className="glass-accent mono">
              <option value="">-- SELECT WEAPON --</option>
              {weapons.map(w => <option key={w.name} value={w.name}>{w.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label><Map size={16}/> THE CRIME SCENE</label>
            <select value={selectedL} onChange={e => setSelectedL(e.target.value)} className="glass-accent mono">
              <option value="">-- SELECT LOCATION --</option>
              {locations.map(l => <option key={l.name} value={l.name}>{l.name}</option>)}
            </select>
          </div>
        </div>

        <div className="accuse-actions">
          <button className="btn-modern secondary" onClick={onClose}>CANCEL</button>
          <button 
            className="btn-modern primary" 
            style={{ borderColor: 'var(--error)', background: 'rgba(255, 45, 85, 0.1)' }}
            disabled={!selectedS || !selectedW || !selectedL}
            onClick={submitAccusation}
          >
            CONFIRM ACCUSATION
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .accuse-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.85);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .accuse-modal {
          width: 100%;
          max-width: 600px;
          padding: 40px;
          border: 1px solid var(--error);
          box-shadow: 0 0 50px rgba(255, 45, 85, 0.2);
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .accuse-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
        }
        .accuse-header h2 { color: var(--error); font-size: 1.5rem; letter-spacing: 4px; }
        .mono-sub { color: var(--text-dim); font-size: 0.8rem; }
        
        .accuse-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--accent-primary);
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 2px;
        }
        .form-group select {
          padding: 16px;
          border-radius: 4px;
          border: 1px solid var(--border-bright);
          color: var(--text-main);
          font-size: 1rem;
          cursor: pointer;
          appearance: none;
        }
        .form-group select option {
          background: var(--bg-color);
          color: var(--text-bright);
        }
        .form-group select:focus {
          border-color: var(--error);
          outline: none;
        }

        .accuse-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .btn-modern.primary:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}} />
    </motion.div>
  );
};
