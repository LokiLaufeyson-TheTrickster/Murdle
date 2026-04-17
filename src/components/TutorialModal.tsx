import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Check, Info } from 'lucide-react';

interface TutorialModalProps {
  onClose: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);

  const slides = [
    {
      title: "THE BASICS",
      content: "Welcome, Detective! Your goal is to find out **WHO** did it, with **WHAT**, and **WHERE**. Every puzzle has exactly one correct answer.",
      example: (
        <div className="tutorial-grid-box">
          <div className="mini-grid">
            <div className="m-cell header"></div>
            <div className="m-cell header">KNIFE</div>
            <div className="m-cell header side">VICTOR</div>
            <div className="m-cell check">✓</div>
          </div>
          <p className="eli5">If you find a **Check (✓)**, it means Victor has the Knife. This also means Victor has **NO OTHER** weapon, and **NOBODY ELSE** has the Knife!</p>
        </div>
      )
    },
    {
      title: "CROSSING OUT",
      content: "Use the **X** to mark things that are impossible. This is your most powerful tool!",
      example: (
        <div className="tutorial-grid-box">
          <div className="mini-grid">
            <div className="m-cell header"></div>
            <div className="m-cell header">POISON</div>
            <div className="m-cell header">GUN</div>
            <div className="m-cell header side">DANA</div>
            <div className="m-cell x">✕</div>
            <div className="m-cell"></div>
          </div>
          <p className="eli5">A clue says: 'Dana hates Poison.' So we put an **X** there. Dana might have the Gun, but she definitely doesn't have the Poison!</p>
        </div>
      )
    },
    {
      title: "SMART CONNECTIONS",
      content: "Connect the dots! If you know two things, you might find a third.",
      example: (
        <div className="tutorial-grid-box">
          <div className="logic-row">
            <div className="logic-item">VICTOR <Check size={12}/> LIBRARY</div>
            <div className="plus">+</div>
            <div className="logic-item">LIBRARY <Check size={12}/> KNIFE</div>
            <div className="arrow">→</div>
            <div className="logic-item result">VICTOR <Check size={12}/> KNIFE</div>
          </div>
          <p className="eli5">If Victor was in the Library, and the Knife was in the Library, then Victor **MUST** have the Knife! The grid will help you see these links.</p>
        </div>
      )
    },
    {
      title: "READY TO SOLVE?",
      content: "When you are 100% sure, click **FILE ACCUSATION** in the top bar. One mistake and the case is lost!",
      example: (
        <div className="final-slide">
          <div className="big-icon-circle">
            <Check size={48} color="var(--success)" />
          </div>
          <p className="eli5">Trust your logic, not your gut. Good luck, Detective!</p>
        </div>
      )
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="tutorial-overlay glass"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="tutorial-card glass-card"
        onClick={e => e.stopPropagation()}
      >
        <div className="tutorial-header">
          <h2 className="mono">ACADEMY TRAINING</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="tutorial-content-wrapper">
          <AnimatePresence mode="wait">
            <motion.div 
              key={step}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="slide-content"
            >
              <h3 className="slide-title">{slides[step].title}</h3>
              <p className="slide-text" dangerouslySetInnerHTML={{ __html: slides[step].content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              <div className="slide-example">{slides[step].example}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="tutorial-footer">
          <div className="step-indicator">
            {slides.map((_, i) => (
              <div key={i} className={`dot ${step === i ? 'active' : ''}`} onClick={() => setStep(i)} />
            ))}
          </div>
          <div className="nav-buttons">
            {step > 0 && (
              <button className="nav-btn" onClick={() => setStep(s => s - 1)}>
                <ChevronLeft size={20} /> BACK
              </button>
            )}
            {step < slides.length - 1 ? (
              <button className="nav-btn primary" onClick={() => setStep(s => s + 1)}>
                NEXT <ChevronRight size={20} />
              </button>
            ) : (
              <button className="nav-btn success" onClick={onClose}>
                UNDERSTOOD
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .tutorial-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.9);
          z-index: 6000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .tutorial-card {
          width: 100%;
          max-width: 600px;
          height: auto;
          display: flex;
          flex-direction: column;
          padding: 40px;
          gap: 32px;
          border: 1px solid var(--accent-primary);
        }
        .tutorial-header {
          display: flex; justify-content: space-between; align-items: center;
        }
        .tutorial-header h2 { color: var(--accent-primary); letter-spacing: 2px; font-size: 1.2rem; }

        .slide-content {
          display: flex; flex-direction: column; gap: 20px;
        }
        .slide-title { font-size: 1.8rem; font-weight: 800; }
        .slide-text { line-height: 1.6; color: var(--text-main); font-size: 1.1rem; }
        
        .tutorial-grid-box {
          background: rgba(0,0,0,0.3);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid var(--border-dim);
          margin-top: 10px;
        }
        .mini-grid {
          display: grid;
          grid-template-columns: 80px 80px 80px;
          grid-template-rows: 80px 80px;
          gap: 4px;
          margin-bottom: 20px;
          justify-content: center;
        }
        .m-cell {
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          font-weight: 800;
          border-radius: 4px;
        }
        .m-cell.header { font-size: 0.7rem; color: var(--text-dim); background: transparent; }
        .m-cell.header.side { justify-content: flex-end; padding-right: 8px; }
        .m-cell.check { color: var(--success); font-size: 2rem; background: rgba(0,255,163,0.1); }
        .m-cell.x { color: var(--error); font-size: 2rem; background: rgba(255,45,85,0.1); }
        
        .eli5 { font-size: 0.9rem; color: var(--text-dim); border-left: 3px solid var(--accent-secondary); padding-left: 12px; font-style: italic; }

        .logic-row {
          display: flex; align-items: center; gap: 12px; justify-content: center; margin-bottom: 20px;
        }
        .logic-item { padding: 8px 12px; background: rgba(255,255,255,0.05); border-radius: 6px; font-size: 0.8rem; font-weight: 700; }
        .logic-item.result { border: 1px solid var(--success); color: var(--success); }
        
        .tutorial-footer {
          display: flex; justify-content: space-between; align-items: center;
          margin-top: 20px; padding-top: 24px; border-top: 1px solid var(--border-dim);
        }
        .step-indicator { display: flex; gap: 8px; }
        .step-indicator .dot { width: 8px; height: 8px; background: var(--border-bright); border-radius: 50%; cursor: pointer; }
        .step-indicator .dot.active { background: var(--accent-primary); width: 24px; border-radius: 4px; }
        
        .nav-buttons { display: flex; gap: 12px; }
        .nav-btn {
          padding: 10px 20px; border-radius: 8px; font-weight: 700; border: 1px solid var(--border-bright); background: transparent; color: var(--text-main); cursor: pointer;
          display: flex; align-items: center; gap: 8px;
        }
        .nav-btn.primary { background: var(--accent-primary); color: var(--bg-color); border: none; }
        .nav-btn.success { background: var(--success); color: var(--bg-color); border: none; }
        
        .big-icon-circle {
          width: 100px; height: 100px; border-radius: 50%; border: 4px solid var(--success); display: flex; align-items: center; justify-content: center; margin: 0 auto 30px;
          background: rgba(0,255,163,0.05);
        }
      `}} />
    </motion.div>
  );
};
