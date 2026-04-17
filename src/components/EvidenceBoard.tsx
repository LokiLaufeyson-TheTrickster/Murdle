import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Box, Map } from 'lucide-react';
import type { AssetInfo } from '../engine/types';
import { SUSPECT_ICONS } from '../engine/narrative';

interface EvidenceBoardProps {
  suspects: AssetInfo[];
  weapons: AssetInfo[];
  locations: AssetInfo[];
  onClose: () => void;
}

export const EvidenceBoard: React.FC<EvidenceBoardProps> = ({ suspects, weapons, locations, onClose }) => {
  const [activeTab, setActiveTab] = useState<'suspects' | 'weapons' | 'locations'>('suspects');
  const [selectedAsset, setSelectedAsset] = useState<AssetInfo | null>(null);

  const getAssets = () => {
    if (activeTab === 'suspects') return suspects;
    if (activeTab === 'weapons') return weapons;
    return locations;
  };

  const renderIcon = (item: AssetInfo, isSuspect: boolean) => {
    if (isSuspect) {
      const IconComp = SUSPECT_ICONS[item.icon] || SUSPECT_ICONS['User'];
      return <IconComp size={48} style={{ color: item.color }} />;
    }
    return <span style={{ fontSize: '3rem' }}>{item.icon}</span>;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="evidence-board-overlay glass"
      onClick={onClose}
    >
      <div className="evidence-board-container glass-card" onClick={e => e.stopPropagation()}>
        <div className="evidence-header">
          <h2 className="mono">TheDeductionist DOSSIER ACCESS</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="evidence-tabs mono">
          <button className={activeTab === 'suspects' ? 'active' : ''} onClick={() => { setActiveTab('suspects'); setSelectedAsset(null); }}>
            <User size={18} /> SUSPECTS
          </button>
          <button className={activeTab === 'weapons' ? 'active' : ''} onClick={() => { setActiveTab('weapons'); setSelectedAsset(null); }}>
            <Box size={18} /> WEAPONS
          </button>
          <button className={activeTab === 'locations' ? 'active' : ''} onClick={() => { setActiveTab('locations'); setSelectedAsset(null); }}>
            <Map size={18} /> LOCATIONS
          </button>
        </div>

        <div className="evidence-content">
          <div className="asset-grid">
            {getAssets().map((asset, idx) => (
              <motion.div 
                key={asset.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`asset-card ${selectedAsset?.name === asset.name ? 'selected' : ''}`}
                onClick={() => setSelectedAsset(asset)}
              >
                {renderIcon(asset, activeTab === 'suspects')}
                <span className="mono asset-name">{asset.name}</span>
              </motion.div>
            ))}
          </div>

          <div className="asset-details-pane glass-accent">
            <AnimatePresence mode="wait">
              {selectedAsset ? (
                <motion.div 
                  key={selectedAsset.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="details-content"
                >
                  <div className="details-hero">
                    {renderIcon(selectedAsset, activeTab === 'suspects')}
                    <h3 className="mono">{selectedAsset.name}</h3>
                  </div>
                  
                  <div className="details-grid">
                    {Object.entries(selectedAsset.details).map(([key, val]) => (
                      <div className="detail-item" key={key}>
                        <span className="mono detail-label">{key.toUpperCase()}</span>
                        <span className="detail-value">{val as string}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="empty-details mono">SELECT AN ENTRY TO VIEW COMPREHENSIVE DOSSIER</div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .evidence-board-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.8);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        .evidence-board-container {
          width: 100%;
          max-width: 1200px;
          height: 100%;
          max-height: 800px;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--accent-primary);
          box-shadow: 0 0 50px rgba(0,210,255,0.1);
        }
        .evidence-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid var(--border-bright);
        }
        .evidence-header h2 { color: var(--accent-primary); font-size: 1.4rem; letter-spacing: 4px; }
        .close-btn { background: none; border: none; color: var(--text-dim); cursor: pointer; transition: color 0.2s; }
        .close-btn:hover { color: var(--error); }
        
        .evidence-tabs {
          display: flex;
          border-bottom: 1px solid var(--border-dim);
          background: rgba(0,0,0,0.2);
        }
        .evidence-tabs button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 16px;
          background: none;
          border: none;
          color: var(--text-dim);
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .evidence-tabs button:hover { background: rgba(255,255,255,0.05); color: var(--text-main); }
        .evidence-tabs button.active {
          background: rgba(0,210,255,0.1);
          color: var(--accent-primary);
          border-bottom: 2px solid var(--accent-primary);
        }

        .evidence-content {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        .asset-grid {
          width: 50%;
          padding: 24px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 16px;
          overflow-y: auto;
          border-right: 1px solid var(--border-dim);
        }
        .asset-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-dim);
          border-radius: 8px;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .asset-card:hover {
          background: rgba(255,255,255,0.08);
          transform: translateY(-4px);
        }
        .asset-card.selected {
          border-color: var(--accent-primary);
          background: rgba(0,210,255,0.05);
          box-shadow: 0 0 20px rgba(0,210,255,0.2);
        }
        .asset-name { font-size: 0.8rem; font-weight: 700; }

        .asset-details-pane {
          width: 50%;
          padding: 40px;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
        .empty-details {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-dim);
          opacity: 0.5;
          text-align: center;
          letter-spacing: 2px;
        }
        .details-hero {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 40px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-dim);
        }
        .details-hero h3 { font-size: 2rem; color: var(--text-main); }
        
        .details-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .detail-label {
          color: var(--accent-primary);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 1px;
        }
        .detail-value {
          color: var(--text-bright);
          font-size: 1.1rem;
          line-height: 1.6;
          font-family: 'Outfit', sans-serif;
        }
      `}} />
    </motion.div>
  );
};
