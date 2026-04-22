import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Fingerprint, Swords, MapPin, Weight, Trees, Building, Eye, Sun, CircleUser, Sparkles, Binary } from 'lucide-react';
import type { AssetInfo, SuspectDetails, WeaponDetails, LocationDetails } from '../engine/types';
import { SUSPECT_ICONS, WEAPON_ICONS, LOCATION_ICONS } from '../engine/narrative';
import { ProceduralPrint } from './ProceduralPrint';

interface EvidenceBoardProps {
  suspects: AssetInfo[];
  weapons: AssetInfo[];
  locations: AssetInfo[];
  onClose: () => void;
  initialTab?: 'suspects' | 'weapons' | 'locations';
  initialAsset?: string;
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

export const EvidenceBoard: React.FC<EvidenceBoardProps> = ({ suspects, weapons, locations, onClose, initialTab, initialAsset }) => {
  const [activeTab, setActiveTab] = useState<'suspects' | 'weapons' | 'locations'>(initialTab || 'suspects');
  const [selectedAsset, setSelectedAsset] = useState<AssetInfo | null>(null);

  useEffect(() => {
    if (initialAsset) {
      const all = [...suspects, ...weapons, ...locations];
      const found = all.find(a => a.name === initialAsset);
      if (found) {
        if (suspects.find(s => s.name === found.name)) setActiveTab('suspects');
        else if (weapons.find(w => w.name === found.name)) setActiveTab('weapons');
        else if (locations.find(l => l.name === found.name)) setActiveTab('locations');
        setSelectedAsset(found);
      }
    }
  }, [initialAsset, suspects, weapons, locations]);

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
      const IconComp = WEAPON_ICONS[item.icon] || WEAPON_ICONS['Target'];
      return <IconComp size={size} style={{ color: item.color || '#FFC107' }} />;
    }
    const IconComp = LOCATION_ICONS[item.icon] || LOCATION_ICONS['Wind'];
    return <IconComp size={size} style={{ color: item.color || '#00E5FF' }} />;
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Fingerprint size={20} color="var(--accent-primary)" />
            <h2 className="mono">CENTRAL DATABASE</h2>
          </div>
          <button className="close-btn" onClick={onClose}><X size={22} /></button>
        </div>

        <div className="evidence-tabs mono">
          <button className={activeTab === 'suspects' ? 'active' : ''} onClick={() => { setActiveTab('suspects'); setSelectedAsset(null); }}>
            <CircleUser size={16} /> SUSPECTS
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.03 }}
                className={`asset-card ${selectedAsset?.name === asset.name ? 'selected' : ''}`}
                onClick={() => setSelectedAsset(asset)}
              >
                <div className="asset-icon-wrapper" style={{ borderColor: asset.color }}>
                   {(() => {
                      const IconComp = (activeTab === 'suspects' ? SUSPECT_ICONS[asset.icon] : activeTab === 'weapons' ? WEAPON_ICONS[asset.icon] : LOCATION_ICONS[asset.icon]) || Fingerprint;
                      return <IconComp size={32} style={{ color: asset.color }} />;
                   })()}
                </div>
                <span className="mono asset-name">{asset.name}</span>
              </motion.div>
            ))}
          </div>

          <div className="asset-details-pane glass-accent">
            <AnimatePresence mode="wait">
              {selectedAsset ? (
                <motion.div
                  key={selectedAsset.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="details-content"
                >
                  <div className="details-hero">
                    <div className="details-hero-icon" style={{ boxShadow: `0 0 30px ${selectedAsset.color}44` }}>
                      {renderIcon(selectedAsset, 64)}
                    </div>
                    <div>
                      <h3 className="mono">{selectedAsset.name}</h3>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                        {activeTab === 'weapons' && isWeaponDetails(selectedAsset.details) && (
                          <WeightBadge weight={selectedAsset.details.weight} />
                        )}
                        {activeTab === 'locations' && isLocationDetails(selectedAsset.details) && (
                          <SettingBadge setting={selectedAsset.details.setting} />
                        )}
                        {activeTab === 'suspects' && isSuspectDetails(selectedAsset.details) && (
                          <>
                            <span className="badge-modern grey">{selectedAsset.details.profession}</span>
                            <span className="badge-modern outline">{selectedAsset.details.gender?.toUpperCase() || 'UNKNOWN'}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="details-grid">
                    {activeTab === 'suspects' && isSuspectDetails(selectedAsset.details) && (() => {
                      const d = selectedAsset.details;
                      const attrPool = [
                        { label: 'HEIGHT', val: d.height, icon: <Binary size={12} /> },
                        { label: 'SUN SIGN', val: d.sunSign, icon: <Sun size={12} /> },
                        { label: 'EYE COLOR', val: d.eyeColor, icon: <Eye size={12} /> },
                        { label: 'HAIR', val: d.hairColor, icon: <Sparkles size={12} /> },
                        { label: 'HAND', val: d.handedness, icon: <Fingerprint size={12} /> }
                      ];
                      return (
                        <>
                          <div className="detail-item dossier-section">
                            <span className="mono detail-label">PERSONNEL FILE</span>
                            <span className="detail-value backstory-display">{d.backstory}</span>
                          </div>

                          <div className="attr-grid-container">
                            {attrPool.map((a, i) => (
                              <div key={i} className="attr-chip-modern">
                                <span className="attr-label mono">{a.icon} {a.label}</span>
                                <span className="attr-val">{a.val}</span>
                              </div>
                            ))}
                          </div>

                          <div className="detail-item dossier-section" style={{ marginTop: '32px' }}>
                            <span className="mono detail-label">FORENSIC PROFILES</span>
                            <div className="trace-evidence-section">
                              <div className="evidence-item">
                                <div className="print-box">
                                  <ProceduralPrint 
                                    seed={d.fingerprintPattern} 
                                    type="fingerprint" 
                                    size={120} 
                                    color={selectedAsset.color} 
                                  />
                                </div>
                                <div className="mono pattern-id">DIGITAL DERMATOGLYPHIC: {d.fingerprintPattern}</div>
                              </div>
                              <div className="evidence-item">
                                <div className="print-box">
                                  <ProceduralPrint 
                                    seed={d.shoeprintPattern} 
                                    type="shoeprint" 
                                    size={120} 
                                    color={selectedAsset.color} 
                                  />
                                </div>
                                <div className="mono pattern-id">TREAD GEOMETRY: {d.shoeprintPattern}</div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })()}

                    {activeTab === 'weapons' && isWeaponDetails(selectedAsset.details) && (() => {
                      const d = selectedAsset.details;
                      return (
                        <>
                          <div className="detail-item">
                            <span className="mono detail-label">INTEL REPORT</span>
                            <span className="detail-value narrative-text">
                              {d.description} Forensic sweeps of the scene noted {d.locationClue}.
                            </span>
                          </div>

                          <div className="attr-grid-container">
                            <div className="attr-chip-modern">
                              <span className="attr-label mono"><Weight size={12} /> WEIGHT</span>
                              <span className="attr-val" style={{ textTransform: 'capitalize' }}>{d.weight}</span>
                            </div>
                            <div className="attr-chip-modern">
                              <span className="attr-label mono"><Binary size={12} /> COMPOSITION</span>
                              <span className="attr-val">{d.madeOf}</span>
                            </div>
                          </div>
                        </>
                      );
                    })()}

                    {activeTab === 'locations' && isLocationDetails(selectedAsset.details) && (() => {
                      const d = selectedAsset.details;
                      return (
                        <>
                          <div className="detail-item">
                            <span className="mono detail-label">SURVEILLANCE LOG</span>
                            <span className="detail-value narrative-text">
                              {d.descriptor} The environment exhibits {d.traceFeature}, which has been logged for investigative reference.
                            </span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </motion.div>
              ) : (
                <div className="empty-details">
                  <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ repeat: Infinity, duration: 2 }} style={{ textAlign: 'center' }}>
                    <Binary size={48} style={{ marginBottom: '16px', opacity: 0.1 }} />
                    <div className="mono" style={{ fontSize: '0.8rem', letterSpacing: '4px' }}>ACCESSING DATA... SELECT ENTRY</div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .evidence-board-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.85); backdrop-filter: blur(10px);
          z-index: 2000; display: flex; align-items: center; justify-content: center;
          padding: 40px;
        }
        .evidence-board-container {
          width: 100%; max-width: 1200px; height: 85vh;
          display: flex; flex-direction: column;
          border: 1px solid var(--border-bright);
          background: rgba(10,12,18,0.95);
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
          overflow: hidden; border-radius: 16px;
        }
        .evidence-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 24px 32px; border-bottom: 1px solid var(--border-dim);
        }
        .evidence-header h2 { color: var(--accent-primary); font-size: 0.9rem; letter-spacing: 5px; margin: 0; }
        .close-btn { background: none; border: none; color: var(--text-dim); cursor: pointer; transition: all 0.2s; }
        .close-btn:hover { color: var(--error); transform: rotate(90deg); }
        
        .evidence-tabs { display: flex; background: rgba(0,0,0,0.4); }
        .evidence-tabs button {
          flex: 1; padding: 18px; border: none; background: none;
          color: var(--text-dim); cursor: pointer; transition: all 0.3s;
          font-weight: 800; font-size: 0.75rem; letter-spacing: 2px;
          display: flex; align-items: center; justify-content: center; gap: 12px;
          border-bottom: 2px solid transparent;
        }
        .evidence-tabs button.active {
          color: var(--accent-primary); background: rgba(0,210,255,0.05);
          border-bottom-color: var(--accent-primary);
        }

        .evidence-content { display: flex; flex: 1; overflow: hidden; }
        .asset-grid {
          width: 380px; padding: 24px; display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 16px; overflow-y: auto; background: rgba(0,0,0,0.2); border-right: 1px solid var(--border-dim);
        }
        .asset-card {
          padding: 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-dim);
          border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 12px;
          cursor: pointer; transition: all 0.2s;
        }
        .asset-card:hover { border-color: var(--accent-primary); background: rgba(0,210,255,0.03); transform: scale(1.02); }
        .asset-card.selected { border-color: var(--accent-primary); background: rgba(0,210,255,0.08); box-shadow: 0 0 20px rgba(0,210,255,0.1); }
        
        .asset-icon-wrapper {
          padding: 12px; border-radius: 12px;
          background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05);
        }

        .asset-details-pane { flex: 1; padding: 40px; overflow-y: auto; }
        .details-content { display: flex; flex-direction: column; gap: 32px; }
        .details-hero { display: flex; align-items: flex-start; gap: 32px; }
        .details-hero-icon {
          padding: 24px; background: rgba(0,0,0,0.3); border-radius: 20px;
          border: 1px solid var(--border-bright); flex-shrink: 0;
        }
        .details-hero h3 { font-size: 2.2rem; color: var(--text-bright); margin: 0; }
        
        .badge-modern {
          padding: 4px 10px; border-radius: 4px; font-family: 'JetBrains Mono';
          font-size: 0.65rem; font-weight: 800; letter-spacing: 1px;
        }
        .badge-modern.grey { background: rgba(255,255,255,0.05); color: var(--text-dim); }
        .badge-modern.outline { border: 1px solid var(--accent-primary); color: var(--accent-primary); }

        .dossier-section { margin-bottom: 24px; }
        .backstory-display {
          font-size: 1.1rem; line-height: 1.8; color: var(--text-dim);
          font-style: italic; font-family: 'Outfit', sans-serif;
        }
        .narrative-text {
          font-size: 1rem; line-height: 1.7; color: var(--text-main); font-weight: 400;
        }

        .trace-evidence-section {
          display: flex; gap: 20px; margin-bottom: 32px;
        }
        .evidence-item {
          flex: 1; display: flex; flex-direction: column; gap: 10px; align-items: center;
          background: rgba(255,255,255,0.02); border: 1px solid var(--border-dim);
          padding: 20px; border-radius: 12px;
        }
        .print-box {
          background: rgba(0,0,0,0.4); border-radius: 8px; padding: 8px;
          box-shadow: inset 0 0 15px rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.05);
        }
        .pattern-id { font-size: 0.55rem; opacity: 0.3; letter-spacing: 1px; }

        .attr-grid-container { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .attr-chip-modern {
          background: rgba(255,255,255,0.02); border: 1px solid var(--border-dim);
          border-radius: 8px; padding: 14px 18px; display: flex; flex-direction: column; gap: 6px;
        }
        .attr-label { color: var(--accent-primary); font-size: 0.65rem; letter-spacing: 2px; display: flex; align-items: center; gap: 6px; }
        .attr-val { color: var(--text-main); font-size: 1rem; font-weight: 600; }

        .detail-label { color: var(--accent-primary); font-size: 0.7rem; font-weight: 800; letter-spacing: 4px; margin-bottom: 12px; display: block; }
        
        @media (max-width: 900px) {
          .evidence-board-overlay { padding: 10px; }
          .evidence-board-container { height: 95vh; }
          .asset-grid { width: 100%; border-right: none; height: 180px; flex-shrink: 0; display: flex; overflow-x: auto; }
          .asset-card { min-width: 120px; aspect-ratio: unset; flex-shrink: 0; }
          .evidence-content { flex-direction: column; }
          .comparison-layout { flex-direction: column; }
          .recovered-sample { width: 100%; }
        }
      `}} />
    </motion.div>
  );
};
