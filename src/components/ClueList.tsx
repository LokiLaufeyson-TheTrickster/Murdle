import React, { useState } from 'react';
import type { Clue } from '../engine/types';
import { BookOpen, Eye, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClueListProps {
  clues: Clue[];
  contextHtml?: string;
  onShowWalkthrough?: () => void;
}

export const ClueList: React.FC<ClueListProps> = ({ clues, contextHtml, onShowWalkthrough }) => {
  const [showLogic, setShowLogic] = useState(false);
  const [crossedOut, setCrossedOut] = useState<Record<string, boolean>>({});

  const toggleCross = (id: string) => {
    setCrossedOut(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="clue-list-container glass">
      <div className="clue-header">
        <div className="title-group">
          <BookOpen className="icon-pulse" size={20} />
          <h2 className="mono">INTELLIGENCE BRIEFING</h2>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className={`toggle-logic ${showLogic ? 'active' : ''}`}
            onClick={() => setShowLogic(!showLogic)}
          >
            <Eye size={16} />
            <span>{showLogic ? 'HIDE' : 'LOGIC'}</span>
          </button>
          {onShowWalkthrough && (
            <button className="toggle-logic" onClick={onShowWalkthrough} title="Step-by-step solution">
              <Lightbulb size={16} />
              <span>SOLVE</span>
            </button>
          )}
        </div>
      </div>

      <div className="clue-list">
        {contextHtml && (
          <div className="context-card glass-card" dangerouslySetInnerHTML={{ __html: contextHtml }} />
        )}
        <AnimatePresence mode="popLayout">
          {clues.map((clue, idx) => (
            <motion.div 
              key={clue.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.1 }}
              className={`clue-card glass-card ${crossedOut[clue.id] ? 'crossed' : ''}`}
              onClick={() => toggleCross(clue.id)}
            >
              <div className="clue-number mono">{idx + 1}</div>
              <div className="clue-content">
                <p className="clue-text">
                  {clue.text}</p>
                {showLogic && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="logic-reveal mono"
                  >
                    {clue.logicDisplay}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .clue-list-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          max-height: 100vh;
          overflow: hidden;
          border-left: 1px solid var(--border-bright);
          box-shadow: -10px 0 30px rgba(0,0,0,0.2);
        }
        .clue-header {
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-dim);
        }
        .title-group { display: flex; align-items: center; gap: 12px; }
        .title-group h2 { font-size: 1rem; letter-spacing: 2px; color: var(--accent-primary); }
        
        .toggle-logic {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-dim);
          color: var(--text-dim);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.65rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .toggle-logic.active {
          background: var(--accent-primary);
          color: var(--bg-color);
          border-color: var(--accent-primary);
        }
        
        .context-card {
          padding: 16px;
          margin-bottom: 24px;
          border-left: 4px solid var(--accent-primary);
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--text-bright);
        }

        .clue-list { flex: 1; overflow-y: auto; overflow-x: hidden; padding: 24px; display: flex; flex-direction: column; gap: 16px; min-height: 0; }
        .clue-card {
          display: flex;
          gap: 16px;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid var(--border-dim);
          background: rgba(255,255,255,0.02);
          transition: all 0.2s;
          cursor: pointer;
        }
        .clue-card:hover {
          background: rgba(255,255,255,0.04);
          transform: translateX(4px);
        }
        .clue-card.crossed {
          opacity: 0.4;
          background: rgba(0,0,0,0.2);
        }
        .clue-card.crossed .clue-text {
          text-decoration: line-through;
          color: var(--text-dim);
        }
        .clue-number { color: var(--accent-primary); font-weight: 800; font-size: 0.8rem; opacity: 0.6; }
        .clue-text { font-size: 0.95rem; line-height: 1.5; color: var(--text-main); font-weight: 400; }
        .logic-reveal {
          margin-top: 10px;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--success);
          background: rgba(0, 255, 163, 0.05);
          padding: 8px 12px;
          border-radius: 4px;
          border-left: 2px solid var(--success);
        }
        .icon-pulse { animation: pulse 2s infinite; color: var(--accent-primary); }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}} />
    </div>
  );
};
