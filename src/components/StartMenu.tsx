import React from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Ghost } from 'lucide-react';

interface StartMenuProps {
  onStart: () => void;
  onOpenTutorial: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ onStart, onOpenTutorial }) => {
  return (
    <div className="start-menu-container">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="menu-card glass-card"
      >
        <div className="menu-header">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="menu-icon"
          >
            <Ghost size={64} color="var(--accent-primary)" />
          </motion.div>
          <h1 className="logo-text large">TheDeductionist</h1>
          <p className="mono-sub">UNRAVEL THE TRUTH. ONE MARK AT A TIME.</p>
        </div>

        <div className="menu-actions">
          <button className="menu-btn primary" onClick={onStart}>
            <Play size={20} />
            <span>START NEW CASE</span>
          </button>
          
          <button className="menu-btn secondary" onClick={onOpenTutorial}>
            <BookOpen size={20} />
            <span>HOW TO INVESTIGATE</span>
          </button>
        </div>

        <div className="menu-footer mono">
          <span>ENCRYPTED CONNECTION ESTABLISHED</span>
          <span className="dot"></span>
          <span>READY FOR DEPLOYMENT</span>
        </div>
      </motion.div>

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
        }
        .start-menu-container::before {
          content: '';
          position: absolute;
          width: 200%; height: 200%;
          background: radial-gradient(circle at center, var(--accent-glow) 0%, transparent 50%);
          opacity: 0.2;
          animation: rotateBg 20s linear infinite;
        }
        @keyframes rotateBg {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .menu-card {
          width: 100%;
          max-width: 500px;
          padding: 60px 40px;
          display: flex;
          flex-direction: column;
          gap: 40px;
          align-items: center;
          text-align: center;
          border: 1px solid var(--border-bright);
          box-shadow: 0 0 100px rgba(0,210,255,0.1);
        }

        .logo-text.large {
          font-size: 3rem;
          margin: 20px 0 10px;
        }

        .menu-actions {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }

        .menu-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 20px;
          border-radius: 12px;
          font-weight: 800;
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid var(--border-bright);
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

        .menu-btn:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .menu-footer {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.65rem;
          color: var(--text-dim);
          opacity: 0.6;
        }
        .dot { width: 4px; height: 4px; background: var(--success); border-radius: 50%; box-shadow: 0 0 8px var(--success); }
      `}} />
    </div>
  );
};
