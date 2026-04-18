import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Swords, MapPin, Weight, Fingerprint, MapPinned, Trees, Building, Eye, EyeOff, Star, Sun } from 'lucide-react';
import type { AssetInfo, SuspectDetails, WeaponDetails, LocationDetails } from '../engine/types';
import { SUSPECT_ICONS, WEAPON_ICONS, LOCATION_ICONS } from '../engine/narrative';

interface EvidenceBoardProps {
  suspects: AssetInfo[];
  weapons: AssetInfo[];
  locations: AssetInfo[];
  onClose: () => void;
}

const isSuspectDetails = (d: any): d is SuspectDetails => 'handedness' in d;
const isWeaponDetails = (d: any): d is WeaponDetails => 'madeOf' in d;
const isLocationDetails = (d: any): d is LocationDetails => 'traceFeature' in d;

const WeightBadge: React.FC<{ weight: string }> = ({ weight }) => {
  const colors: Record<string, string> = {
    heavy: '#ff4444',
    medium: '#ffaa00',
    light: '#00ffa3',
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      background: `${colors[weight]}22`,
      border: `1px solid ${colors[weight]}55`,
      color: colors[weight],
      padding: '2px 8px', borderRadius: '4px',
      fontFamily: 'JetBrains Mono', fontSize: '0.65rem', fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '1px'
    }}>
      <Weight size={10} />
      {weight}
    </span>
  );
};

const SettingBadge: React.FC<{ setting: string }> = ({ setting }) => {
  const colors: Record<string, string> = {
    indoor: '#00d2ff',
    outdoor: '#34c759',
    underground: '#ff9500',
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      background: `${colors[setting] || '#888'}22`,
      border: `1px solid ${colors[setting] || '#888'}55`,
      color: colors[setting] || '#888',
      padding: '2px 8px', borderRadius: '4px',
      fontFamily: 'JetBrains Mono', fontSize: '0.65rem', fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '1px'
    }}>
      {setting === 'indoor' ? <Building size={10} /> : setting === 'outdoor' ? <Trees size={10} /> : <Building size={10} />}
      {setting}
    </span>
  );
};

export const EvidenceBoard: React.FC<EvidenceBoardProps> = ({ suspects, weapons, locations, onClose }) => {
  const [activeTab, setActiveTab] = useState<'suspects' | 'weapons' | 'locations'>('suspects');
  const [selectedAsset, setSelectedAsset] = useState<AssetInfo | null>(null);
  const [showBackstory, setShowBackstory] = useState(false);

  const getAssets = () => {
    if (activeTab === 'suspects') return suspects;
    if (activeTab === 'weapons') return weapons;
    return locations;
  };

  const renderIcon = (item: AssetInfo, size = 40) => {
    if (activeTab === 'suspects') {
      const IconComp = SUSPECT_ICONS[item.icon] || SUSPECT_ICONS['User'];
      return <IconComp size={size} style={{ color: item.color || 'var(--accent-primary)' }} />;
    }
    if (activeTab === 'weapons') {
      const IconComp = WEAPON_ICONS[item.icon] || WEAPON_ICONS['Knife'];
      return <IconComp size={size} style={{ color: item.color || '#cc8866' }} />;
    }
    // Location
    const IconComp = LOCATION_ICONS[item.icon] || LOCATION_ICONS['Building2'];
    return <IconComp size={size} style={{ color: item.color || '#5577aa' }} />;
  };

  const renderGridIcon = (item: AssetInfo) => renderIcon(item, 32);

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Fingerprint size={20} color="var(--accent-primary)" />
            <h2 className="mono">CASE DOSSIER</h2>
          </div>
          <button className="close-btn" onClick={onClose}><X size={22} /></button>
        </div>

        <div className="evidence-tabs mono">
          <button className={activeTab === 'suspects' ? 'active' : ''} onClick={() => { setActiveTab('suspects'); setSelectedAsset(null); }}>
            <User size={16} /> SUSPECTS
          </button>
          <button className={activeTab === 'weapons' ? 'active' : ''} onClick={() => { setActiveTab('weapons'); setSelectedAsset(null); }}>
            <Swords size={16} /> WEAPONS
          </button>
          <button className={activeTab === 'locations' ? 'active' : ''} onClick={() => { setActiveTab('locations'); setSelectedAsset(null); }}>
            <MapPin size={16} /> LOCATIONS
          </button>
        </div>

        <div className="evidence-content">
          <div className="asset-grid">
            {getAssets().map((asset, idx) => (
              <motion.div
                key={asset.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className={`asset-card ${selectedAsset?.name === asset.name ? 'selected' : ''}`}
                onClick={() => { setSelectedAsset(asset); setShowBackstory(false); }}
              >
                {renderGridIcon(asset)}
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
                    <div className="details-hero-icon">
                      {renderIcon(selectedAsset, 52)}
                    </div>
                    <div>
                      <h3 className="mono">{selectedAsset.name}</h3>
                      {/* Tab-specific badges */}
                      {activeTab === 'weapons' && isWeaponDetails(selectedAsset.details) && (
                        <WeightBadge weight={selectedAsset.details.weight} />
                      )}
                      {activeTab === 'locations' && isLocationDetails(selectedAsset.details) && (
                        <SettingBadge setting={selectedAsset.details.setting} />
                      )}
                      {activeTab === 'suspects' && isSuspectDetails(selectedAsset.details) && (
                        <span style={{
                          fontFamily: 'JetBrains Mono', fontSize: '0.65rem',
                          color: 'var(--text-dim)', letterSpacing: '1px'
                        }}>
                          {selectedAsset.details.handedness.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="details-grid">
                    {/* SUSPECT */}
                    {activeTab === 'suspects' && isSuspectDetails(selectedAsset.details) && (() => {
                      const d = selectedAsset.details;
                      return (
                        <>
                          <button className="backstory-toggle" onClick={() => setShowBackstory(!showBackstory)}>
                            {showBackstory ? <EyeOff size={14} /> : <Eye size={14} />}
                            <span className="mono">{showBackstory ? 'HIDE BACKSTORY' : 'READ DOSSIER'}</span>
                          </button>
                          {showBackstory && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              className="backstory-text"
                            >
                              {d.backstory}
                            </motion.div>
                          )}
                          <div className="attr-row">
                            <div className="attr-chip">
                              <span className="attr-label mono">HEIGHT</span>
                              <span className="attr-val">{d.height}</span>
                            </div>
                            <div className="attr-chip">
                              <span className="attr-label mono">
                                <Sun size={12} style={{ display: 'inline', marginRight: '4px' }} />
                                SUN SIGN
                              </span>
                              <span className="attr-val">{d.sunSign}</span>
                            </div>
                          </div>
                          <div className="attr-row">
                            <div className="attr-chip">
                              <span className="attr-label mono">EYE COLOR</span>
                              <span className="attr-val">{d.eyeColor}</span>
                            </div>
                            <div className="attr-chip">
                              <span className="attr-label mono">HAIR</span>
                              <span className="attr-val">{d.hairColor}</span>
                            </div>
                          </div>
                          <div className="attr-chip">
                            <span className="attr-label mono">DOMINANT HAND</span>
                            <span className="attr-val" style={{ color: 'var(--accent-primary)' }}>{d.handedness}</span>
                          </div>
                        </>
                      );
                    })()}

                    {/* WEAPON */}
                    {activeTab === 'weapons' && isWeaponDetails(selectedAsset.details) && (() => {
                      const d = selectedAsset.details;
                      return (
                        <>
                          <div className="detail-item">
                            <span className="mono detail-label">DESCRIPTION</span>
                            <span className="detail-value">{d.description}</span>
                          </div>
                          <div className="attr-row">
                            <div className="attr-chip">
                              <span className="attr-label mono">WEIGHT CLASS</span>
                              <WeightBadge weight={d.weight} />
                            </div>
                            <div className="attr-chip">
                              <span className="attr-label mono">MATERIAL</span>
                              <span className="attr-val">{d.madeOf}</span>
                            </div>
                          </div>
                          <div className="detail-item scene-clue">
                            <span className="mono detail-label">
                              <MapPinned size={12} style={{ display: 'inline', marginRight: '6px' }} />
                              SCENE TRACE
                            </span>
                            <span className="detail-value scene-trace">{d.locationClue}</span>
                          </div>
                        </>
                      );
                    })()}

                    {/* LOCATION */}
                    {activeTab === 'locations' && isLocationDetails(selectedAsset.details) && (() => {
                      const d = selectedAsset.details;
                      return (
                        <>
                          <div className="detail-item">
                            <span className="mono detail-label">DESCRIPTION</span>
                            <span className="detail-value">{d.descriptor}</span>
                          </div>
                          <div className="detail-item scene-clue">
                            <span className="mono detail-label">
                              <Star size={12} style={{ display: 'inline', marginRight: '6px' }} />
                              TRACE FEATURE
                            </span>
                            <span className="detail-value scene-trace">{d.traceFeature}</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </motion.div>
              ) : (
                <div className="empty-details mono">SELECT A DOSSIER ENTRY TO VIEW DETAILS</div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .evidence-board-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.85);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .evidence-board-container {
          width: 100%;
          max-width: 1100px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--accent-primary);
          box-shadow: 0 0 60px rgba(0,210,255,0.08);
          overflow: hidden;
        }
        .evidence-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 24px;
          border-bottom: 1px solid var(--border-bright);
          flex-shrink: 0;
        }
        .evidence-header h2 { color: var(--accent-primary); font-size: 1rem; letter-spacing: 4px; }
        .close-btn { background: none; border: none; color: var(--text-dim); cursor: pointer; transition: color 0.2s; }
        .close-btn:hover { color: var(--error); }
        
        .evidence-tabs {
          display: flex;
          border-bottom: 1px solid var(--border-dim);
          background: rgba(0,0,0,0.2);
          flex-shrink: 0;
        }
        .evidence-tabs button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px;
          background: none;
          border: none;
          color: var(--text-dim);
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .evidence-tabs button:hover { background: rgba(255,255,255,0.04); color: var(--text-main); }
        .evidence-tabs button.active {
          background: rgba(0,210,255,0.07);
          color: var(--accent-primary);
          border-bottom: 2px solid var(--accent-primary);
        }

        .evidence-content {
          display: flex;
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }
        .asset-grid {
          width: 440px; /* Fixed width for structured 3-column grid */
          padding: 20px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: min-content;
          gap: 12px;
          overflow-y: auto;
          border-right: 1px solid var(--border-dim);
          background: rgba(0,0,0,0.1);
        }
        .asset-card {
          aspect-ratio: 1 / 1.1; /* Keep them square-ish */
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-dim);
          border-radius: 10px;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.18s;
        }
        .asset-card:hover {
          background: rgba(255,255,255,0.06);
          transform: translateY(-3px);
          border-color: var(--border-bright);
        }
        .asset-card.selected {
          border-color: var(--accent-primary);
          background: rgba(0,210,255,0.04);
          box-shadow: 0 0 16px rgba(0,210,255,0.12);
        }
        .asset-name { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.5px; color: var(--text-dim); }

        .asset-details-pane {
          width: 55%;
          padding: 28px;
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
          opacity: 0.35;
          text-align: center;
          letter-spacing: 2px;
          font-size: 0.75rem;
        }
        .details-hero {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-dim);
        }
        .details-hero-icon {
          padding: 12px;
          background: rgba(255,255,255,0.03);
          border-radius: 12px;
          border: 1px solid var(--border-dim);
          flex-shrink: 0;
        }
        .details-hero h3 { font-size: 1.4rem; color: var(--text-main); margin-bottom: 6px; }
        
        .details-grid { display: flex; flex-direction: column; gap: 18px; }
        .detail-item { display: flex; flex-direction: column; gap: 6px; }
        .detail-label {
          color: var(--accent-primary);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          display: flex;
          align-items: center;
        }
        .detail-value {
          color: var(--text-bright);
          font-size: 0.95rem;
          line-height: 1.6;
          font-family: 'Outfit', sans-serif;
        }

        .scene-clue {
          background: rgba(0,210,255,0.04);
          border: 1px solid rgba(0,210,255,0.15);
          border-radius: 8px;
          padding: 12px 14px;
        }
        .scene-trace {
          font-style: italic;
          color: var(--text-dim) !important;
          font-size: 0.9rem !important;
        }

        /* Suspect attrs */
        .backstory-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border-dim);
          border-radius: 6px;
          color: var(--text-dim);
          padding: 8px 14px;
          cursor: pointer;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 1px;
          transition: all 0.2s;
        }
        .backstory-toggle:hover { border-color: var(--accent-primary); color: var(--accent-primary); }
        .backstory-text {
          font-size: 0.9rem;
          line-height: 1.7;
          color: var(--text-dim);
          font-style: italic;
          padding: 12px 0;
          border-bottom: 1px solid var(--border-dim);
          overflow: hidden;
        }
        .attr-row { display: flex; gap: 12px; flex-wrap: wrap; }
        .attr-chip { display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 120px; }
        .attr-label { font-size: 0.6rem; color: var(--accent-primary); letter-spacing: 1px; display: flex; align-items: center; }
        .attr-val { font-size: 0.9rem; color: var(--text-main); font-family: 'Outfit', sans-serif; }

        /* Mobile */
        @media (max-width: 700px) {
          .evidence-content { flex-direction: column; }
          .asset-grid { width: 100%; border-right: none; border-bottom: 1px solid var(--border-dim); max-height: 220px; }
          .asset-details-pane { width: 100%; }
          .evidence-board-overlay { padding: 8px; align-items: flex-start; }
          .evidence-board-container { max-height: 96vh; }
        }
      `}} />
    </motion.div>
  );
};
