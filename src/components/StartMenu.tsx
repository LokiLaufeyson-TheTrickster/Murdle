import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Settings, X, Eye, EyeOff, Key } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface StartMenuProps {
  onStart: () => void;
  onOpenTutorial: () => void;
}

// Image Logo Component
const DetectiveLogo: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <img 
    src="/logo.png" 
    alt="The Deductionist Logo" 
    style={{ width: size, height: size, objectFit: 'contain' }} 
  />
);

const FLAVOR_TEXTS = [
  "A body has been found. The truth won't surface on its own.",
  "Someone in this room is lying. Your job is to find out who.",
  "Every alibi has a crack. Every killer leaves a trace.",
  "The crime was calculated. The investigator must be more so.",
  "There are no coincidences in murder. Only clues you haven't placed yet.",
  "The killer believes they were careful. Prove them wrong.",
  "One person knows exactly what happened. Everyone else is guessing.",
];

export const StartMenu: React.FC<StartMenuProps> = ({ onStart, onOpenTutorial }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const { geminiApiKey, setGeminiApiKey } = useSettings();
  const [keyInput, setKeyInput] = useState(geminiApiKey);
  const [flavorIdx] = useState(() => Math.floor(Math.random() * FLAVOR_TEXTS.length));

  const saveKey = () => {
    setGeminiApiKey(keyInput.trim());
    setShowSettings(false);
  };

  return (
    <div className="start-menu-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="menu-card glass-card"
      >
        <div className="menu-header">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="menu-icon"
          >
            <DetectiveLogo size={90} />
          </motion.div>
          <h1 className="logo-text large">TheDeductionist</h1>
          <p className="mono-sub">UNRAVEL THE TRUTH. ONE MARK AT A TIME.</p>
          <p className="flavor-sub">{FLAVOR_TEXTS[flavorIdx]}</p>
        </div>

        <div className="menu-actions">
          <button className="menu-btn primary" id="btn-start-new-case" onClick={onStart}>
            <Search size={20} />
            <span>OPEN NEW CASE FILE</span>
          </button>

          <button className="menu-btn secondary" id="btn-how-to-investigate" onClick={onOpenTutorial}>
            <BookOpen size={20} />
            <span>HOW TO INVESTIGATE</span>
          </button>

          <button className="menu-btn tertiary" id="btn-settings" onClick={() => setShowSettings(true)}>
            <Settings size={18} />
            <span>SETTINGS</span>
            {geminiApiKey && <span className="key-badge">AI</span>}
          </button>
        </div>

        <div className="menu-footer mono">
          <span>CONNECTION SECURE</span>
          <span className="dot" />
          <span>CASE AWAITS</span>
        </div>
      </motion.div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="settings-overlay"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="settings-modal glass-card"
              onClick={e => e.stopPropagation()}
            >
              <div className="settings-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Settings size={20} color="var(--accent-primary)" />
                  <h2 className="mono">AGENCY SETTINGS</h2>
                </div>
                <button className="close-btn" onClick={() => setShowSettings(false)}><X size={20} /></button>
              </div>

              <div className="settings-body">
                <div className="settings-section">
                  <div className="settings-section-title mono">AI FLAVOR ENGINE</div>
                  <p className="settings-desc">
                    Provide a Gemini API key to unlock AI-generated flavor text for your cases. 
                    The free tier is sufficient — no billing required.
                  </p>
                  <div className="key-input-row">
                    <Key size={16} color="var(--accent-primary)" />
                    <div className="key-input-wrapper">
                      <input
                        id="gemini-api-key"
                        type={showKey ? 'text' : 'password'}
                        value={keyInput}
                        onChange={e => setKeyInput(e.target.value)}
                        placeholder="AIza..."
                        className="key-input mono"
                        onKeyDown={e => e.key === 'Enter' && saveKey()}
                      />
                      <button className="toggle-eye" onClick={() => setShowKey(!showKey)}>
                        {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  {keyInput && (
                    <div className="key-status mono">
                      {keyInput.startsWith('AIza') ? '✓ KEY FORMAT VALID' : '⚠ KEY FORMAT UNEXPECTED'}
                    </div>
                  )}
                </div>
              </div>

              <div className="settings-footer">
                <button className="menu-btn secondary sm" onClick={() => setShowSettings(false)}>CANCEL</button>
                <button className="menu-btn primary sm" onClick={saveKey}>SAVE SETTINGS</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .start-menu-container {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-color);
          z-index: 5000;
          overflow: hidden;
          padding: 16px;
        }
        .start-menu-container::before {
          content: '';
          position: absolute;
          width: 200%; height: 200%;
          background: radial-gradient(circle at center, var(--accent-glow) 0%, transparent 50%);
          opacity: 0.15;
          animation: rotateBg 20s linear infinite;
          pointer-events: none;
          z-index: 1;
        }
        @keyframes rotateBg {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .menu-card {
          width: 100%;
          max-width: 480px;
          padding: 48px 36px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          align-items: center;
          text-align: center;
          border: 1px solid var(--border-bright);
          box-shadow: 0 0 80px rgba(0,210,255,0.08);
          position: relative;
          z-index: 10;
        }
        .menu-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .logo-text.large {
          font-size: clamp(2rem, 5vw, 3rem);
          margin: 8px 0 4px;
        }
        .mono-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 3px;
          color: var(--text-dim);
          text-transform: uppercase;
        }
        .flavor-sub {
          font-size: 0.9rem;
          color: var(--text-dim);
          font-style: italic;
          max-width: 340px;
          line-height: 1.5;
          opacity: 0.7;
        }
        .menu-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
        .menu-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 18px 20px;
          border-radius: 10px;
          font-weight: 800;
          font-family: 'Outfit', sans-serif;
          font-size: 1rem;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid var(--border-bright);
          position: relative;
        }
        .menu-btn.sm {
          padding: 12px 24px;
          font-size: 0.85rem;
        }
        .menu-btn.primary {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          color: white;
          border: none;
        }
        .menu-btn.secondary {
          background: rgba(255,255,255,0.05);
          color: var(--text-main);
        }
        .menu-btn.tertiary {
          background: rgba(255,255,255,0.02);
          color: var(--text-dim);
          border-color: var(--border-dim);
          font-size: 0.85rem;
          padding: 12px 20px;
        }
        .menu-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .key-badge {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: var(--accent-primary);
          color: var(--bg-color);
          font-size: 0.6rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
          letter-spacing: 1px;
        }
        .menu-footer {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.6rem;
          color: var(--text-dim);
          opacity: 0.5;
          letter-spacing: 2px;
        }
        .dot { width: 4px; height: 4px; background: var(--success); border-radius: 50%; box-shadow: 0 0 8px var(--success); }

        /* Settings Modal */
        .settings-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.7);
          z-index: 6000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .settings-modal {
          width: 100%;
          max-width: 480px;
          border: 1px solid var(--accent-primary);
          box-shadow: 0 0 40px rgba(0,210,255,0.1);
        }
        .settings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-dim);
        }
        .settings-header h2 { font-size: 0.9rem; letter-spacing: 3px; color: var(--accent-primary); }
        .close-btn { background: none; border: none; color: var(--text-dim); cursor: pointer; }
        .close-btn:hover { color: var(--error); }
        .settings-body { padding: 24px; }
        .settings-section { display: flex; flex-direction: column; gap: 12px; }
        .settings-section-title { font-size: 0.7rem; letter-spacing: 2px; color: var(--accent-primary); }
        .settings-desc { font-size: 0.85rem; color: var(--text-dim); line-height: 1.5; }
        .key-input-row { display: flex; align-items: center; gap: 10px; }
        .key-input-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          background: rgba(0,0,0,0.3);
          border: 1px solid var(--border-bright);
          border-radius: 8px;
          padding: 0 12px;
        }
        .key-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-main);
          font-size: 0.85rem;
          padding: 12px 8px;
        }
        .toggle-eye { background: none; border: none; color: var(--text-dim); cursor: pointer; padding: 4px; }
        .key-status {
          font-size: 0.65rem;
          letter-spacing: 1px;
          color: var(--success);
          opacity: 0.8;
        }
        .settings-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 16px 24px;
          border-top: 1px solid var(--border-dim);
        }

        @media (max-width: 480px) {
          .menu-card { padding: 36px 20px; }
          .logo-text.large { font-size: 2rem; }
        }
      `}} />
    </div>
  );
};
