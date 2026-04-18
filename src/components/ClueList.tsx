import React, { useState } from 'react';
import type { Clue } from '../engine/types';
import { BookOpen, Eye, Lightbulb, Sparkles, Loader, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

interface ClueListProps {
  clues: Clue[];
  contextHtml?: string;
  onShowWalkthrough?: () => void;
  suspects: any[];
  weapons: any[];
  locations: any[];
  theme: string;
}

async function callGeminiAPI(
  apiKey: string,
  clues: Clue[],
  customPrompt: string,
  themeName: string
): Promise<string> {
  const clueTexts = clues.map((c, i) => `Clue ${i + 1}: ${c.text}`).join('\n');
  const systemInstruction = `You are a world-class narrator specializing in ${themeName} detective fiction. 
You will receive a list of investigation clues. 
Your task: rewrite these clues as atmospheric narrative entries.

CRITICAL REQUIREMENTS:
1. FACTUAL INTEGRITY: You MUST NOT change the meaning. Every name, weapon, location, and logical relationship (e.g., "was not at", "was with", "was left-handed") MUST be preserved perfectly.
2. THEME ADHERENCE: Use vocabulary and tone appropriate for the "${themeName}" setting.
${customPrompt ? `3. ADDITIONAL STYLE: Follow this direction: "${customPrompt}"` : ''}

FORMAT:
Return ONLY the flavored clues, each separated by a blank line, prefixed with its clue number like "CLUE 1:" etc.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${systemInstruction}\n\nCLUES TO REWRITE:\n${clueTexts}` }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
      })
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.error?.message || 'API request failed');
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

export const ClueList: React.FC<ClueListProps> = ({
  clues,
  contextHtml,
  onShowWalkthrough,
  suspects: _suspects,
  weapons: _weapons,
  locations: _locations,
  theme
}) => {
  const [showLogic, setShowLogic] = useState(false);
  const [crossedOut, setCrossedOut] = useState<Record<string, boolean>>({});
  const [revealedOriginals, setRevealedOriginals] = useState<Record<string, boolean>>({});
  const { geminiApiKey } = useSettings();

  // Reset all states when clues change (new case)
  React.useEffect(() => {
    setCrossedOut({});
    setRevealedOriginals({});
    setAiResult(null);
    setAiError(null);
    setCountdown(0);
    setShowAiPanel(false);
  }, [clues]);

  // AI Flavor state
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [customFlavor, setCustomFlavor] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  const toggleCross = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setCrossedOut(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleOriginal = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setRevealedOriginals(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const runAiFlavor = async () => {
    if (!geminiApiKey || aiLoading) return;
    setAiLoading(true);
    setAiResult(null);
    setAiError(null);
    setCountdown(30);

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);

    try {
      const result = await Promise.race([
        callGeminiAPI(geminiApiKey, clues, customFlavor, theme),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Request timed out after 30 seconds')), 30000))
      ]);
      setAiResult(result as string);
    } catch (e: any) {
      setAiError(e.message || 'AI request failed');
    } finally {
      setAiLoading(false);
      clearInterval(timer);
      setCountdown(0);
    }
  };

  // Parse AI result into per-clue segments
  const parsedAiClues = aiResult
    ? clues.map((_, i) => {
        const pattern = new RegExp(`CLUE ${i + 1}:([\\s\\S]*?)(?=CLUE ${i + 2}:|$)`, 'i');
        const match = aiResult.match(pattern);
        return match ? match[1].trim() : null;
      })
    : null;

  return (
    <div className="clue-list-container glass">
      <div className="clue-header">
        <div className="title-group">
          <BookOpen className="icon-pulse" size={18} />
          <h2 className="mono">CASE INTELLIGENCE</h2>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {geminiApiKey && (
            <button
              className={`toggle-logic ai-toggle ${showAiPanel ? 'active' : ''}`}
              onClick={() => setShowAiPanel(!showAiPanel)}
              title="AI Flavor Engine"
            >
              <Sparkles size={14} />
              <span>AI</span>
              <ChevronDown size={12} style={{ transform: showAiPanel ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </button>
          )}
          <button
            className={`toggle-logic ${showLogic ? 'active' : ''}`}
            onClick={() => setShowLogic(!showLogic)}
          >
            <Eye size={14} />
            <span>{showLogic ? 'HIDE' : 'LOGIC'}</span>
          </button>
          {onShowWalkthrough && (
            <button className="toggle-logic" onClick={onShowWalkthrough} title="Step-by-step solution">
              <Lightbulb size={14} />
              <span>SOLVE</span>
            </button>
          )}
        </div>
      </div>

      {/* AI Panel */}
      <AnimatePresence>
        {showAiPanel && geminiApiKey && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="ai-panel"
          >
            <div className="ai-panel-inner">
              <div className="ai-title mono">
                <Sparkles size={14} color="var(--accent-primary)" />
                AI NARRATIVE ENGINE ({(theme || 'Standard').toUpperCase()})
              </div>
              <p className="ai-desc">
                The AI will rephrase clues in the <strong>{theme || 'current'}</strong> style. Add a sub-tone if desired.
              </p>
              <div className="ai-input-row">
                <input
                  type="text"
                  value={customFlavor}
                  onChange={e => setCustomFlavor(e.target.value)}
                  placeholder='optional tone: e.g. "gritty", "humorous"'
                  className="ai-input mono"
                  disabled={aiLoading}
                  onKeyDown={e => e.key === 'Enter' && runAiFlavor()}
                />
                <button
                  className={`ai-run-btn ${aiLoading ? 'loading' : ''}`}
                  onClick={runAiFlavor}
                  disabled={aiLoading}
                >
                  {aiLoading ? (
                    <>
                      <Loader size={14} className="spin" />
                      <span>{countdown}s</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      <span>PROCESS</span>
                    </>
                  )}
                </button>
              </div>
              {aiError && <div className="ai-error mono">{aiError}</div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="clue-list">
        {contextHtml && (
          <div className="context-card glass-card" dangerouslySetInnerHTML={{ __html: contextHtml }} />
        )}
        <AnimatePresence mode="popLayout">
          {clues.map((clue, idx) => {
            const aiClueText = parsedAiClues?.[idx];
            const isOriginalRevealed = revealedOriginals[clue.id];
            
            return (
              <motion.div
                key={clue.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.06 }}
                className={`clue-card glass-card ${crossedOut[clue.id] ? 'crossed' : ''}`}
                onClick={(e) => toggleCross(e, clue.id)}
              >
                <div className="clue-number mono">{idx + 1}</div>
                <div className="clue-content">
                  <p className={`clue-text typewriter ${isOriginalRevealed ? 'dimmed' : ''}`}>
                    {(aiClueText && !isOriginalRevealed) ? aiClueText : clue.text}
                  </p>
                  
                  <div className="clue-actions">
                    {aiClueText && (
                      <button 
                        className={`action-link mono ${isOriginalRevealed ? 'active' : ''}`}
                        onClick={(e) => toggleOriginal(e, clue.id)}
                      >
                        {isOriginalRevealed ? 'SHOW AI VERSION' : 'VIEW ORIGINAL CLUE'}
                      </button>
                    )}
                  </div>

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
            );
          })}
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
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-dim);
          gap: 8px;
          flex-wrap: wrap;
        }
        .title-group { display: flex; align-items: center; gap: 10px; }
        .title-group h2 { font-size: 0.85rem; letter-spacing: 2px; color: var(--accent-primary); }
        
        .toggle-logic {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border-dim);
          color: var(--text-dim);
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.6rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'JetBrains Mono', monospace;
          white-space: nowrap;
        }
        .toggle-logic.active {
          background: var(--accent-primary);
          color: var(--bg-color);
          border-color: var(--accent-primary);
        }
        .toggle-logic.ai-toggle { border-color: rgba(157,80,187,0.4); color: var(--accent-secondary); }
        .toggle-logic.ai-toggle.active { background: var(--accent-secondary); color: white; border-color: var(--accent-secondary); }

        .ai-panel { overflow: hidden; border-bottom: 1px solid var(--border-dim); }
        .ai-panel-inner {
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: rgba(157,80,187,0.05);
        }
        .ai-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.7rem;
          letter-spacing: 2px;
          color: var(--accent-primary);
        }
        .ai-desc { font-size: 0.8rem; color: var(--text-dim); line-height: 1.4; }
        .ai-input-row { display: flex; gap: 8px; }
        .ai-input {
          flex: 1;
          background: rgba(0,0,0,0.3);
          border: 1px solid var(--border-bright);
          border-radius: 6px;
          color: var(--text-main);
          padding: 8px 12px;
          font-size: 0.8rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .ai-input:focus { border-color: var(--accent-secondary); }
        .ai-run-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 14px;
          background: linear-gradient(135deg, var(--accent-secondary), var(--accent-primary));
          border: none;
          border-radius: 6px;
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 100px;
        }
        .ai-run-btn:disabled { opacity: 0.6; cursor: wait; }
        .ai-run-btn.loading { background: rgba(157,80,187,0.3); border: 1px solid var(--accent-secondary); }
        .ai-error { font-size: 0.7rem; color: var(--error); letter-spacing: 1px; }

        .clue-list { 
          flex: 1; overflow-y: auto; overflow-x: hidden; padding: 16px; 
          display: flex; flex-direction: column; gap: 12px; min-height: 0; 
        }
        .clue-card {
          display: flex;
          gap: 14px;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid var(--border-dim);
          background: rgba(255,255,255,0.02);
          transition: all 0.2s;
          cursor: pointer;
        }
        .clue-card:hover { background: rgba(255,255,255,0.04); transform: translateX(3px); }
        .clue-card.crossed { opacity: 0.35; background: rgba(0,0,0,0.2); }
        .clue-card.crossed .clue-text { text-decoration: line-through; color: var(--text-dim); }
        
        .clue-number { 
          color: var(--accent-primary); font-weight: 800; font-size: 0.7rem; 
          opacity: 0.5; font-family: 'JetBrains Mono', monospace;
          flex-shrink: 0; padding-top: 2px;
        }
        .typewriter {
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 0.82rem !important;
          line-height: 1.6 !important;
          color: var(--text-main);
          font-weight: 400;
          letter-spacing: 0.3px;
        }
        .typewriter.dimmed { color: var(--text-dim); font-style: italic; }

        .clue-actions { margin-top: 10px; display: flex; gap: 12px; }
        .action-link {
          background: none;
          border: none;
          color: var(--accent-primary);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          opacity: 0.5;
          text-decoration: underline;
          padding: 0;
        }
        .action-link:hover { opacity: 1; }
        .action-link.active { color: var(--accent-secondary); }

        .logic-reveal {
          margin-top: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--success);
          background: rgba(0, 255, 163, 0.05);
          padding: 6px 10px;
          border-radius: 4px;
          border-left: 2px solid var(--success);
          letter-spacing: 0.5px;
        }
        .icon-pulse { animation: pulse 2s infinite; color: var(--accent-primary); }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}} />
    </div>
  );
};

