import React, { useState } from 'react';
import type { Clue } from '../engine/types';
import { BookOpen, Eye, Lightbulb, Sparkles, Loader, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import { ProceduralPrint } from './ProceduralPrint';

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
  const systemInstruction = `You are a world-class narrator specializing in detective fiction. 
Your goal is to rewrite investigation clues as atmospheric narrative entries.

STYLE GUIDELINE:
${customPrompt 
  ? `CRITICAL STYLE OVERWRITE: You must narrate exclusively in the style of: "${customPrompt}". Ignore the default "${themeName}" setting for your prose and vocabulary.`
  : `The current case setting is: "${themeName}". Use vocabulary and tone appropriate for this era/genre.`
}

CRITICAL REQUIREMENTS:
1. FACTUAL INTEGRITY: You MUST NOT change the meaning. Every name, weapon, location, and logical relationship (e.g., "was not at", "was with", "was left-handed") MUST be preserved perfectly.
2. FORMAT: Return ONLY the flavored clues, each separated by a blank line, prefixed with its clue number like "CLUE 1:" etc.`;

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
  const [selectedForensicClue, setSelectedForensicClue] = useState<Clue | null>(null);
  const { geminiApiKey } = useSettings();

  // Reset all states when clues change (new case)
  React.useEffect(() => {
    setCrossedOut({});
    setRevealedOriginals({});
    setSelectedForensicClue(null);
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

  const renderClueText = (clue: Clue, text: string) => {
    if (!text.includes('{This}')) return text;
    
    const parts = text.split('{This}');
    return (
      <>
        {parts[0]}
        <button 
          className="forensic-link" 
          onClick={(e) => {
            e.stopPropagation();
            setSelectedForensicClue(clue);
          }}
        >
          THIS
        </button>
        {parts[1]}
      </>
    );
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
                Set a <strong>Main Narrative Tone</strong> below. This will determine the voice and era of the entire case file.
              </p>
              <div className="ai-input-row">
                <input
                  type="text"
                  value={customFlavor}
                  onChange={e => setCustomFlavor(e.target.value)}
                  placeholder='e.g. "Cyberpunk", "Victorian Mystery", "Gritty Noir"'
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
                    {renderClueText(clue, (aiClueText && !isOriginalRevealed) ? aiClueText : clue.text)}
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

      {/* Forensic Comparison Modal */}
      <AnimatePresence>
        {selectedForensicClue && (
          <motion.div 
            className="forensic-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedForensicClue(null)}
          >
            <motion.div 
              className="forensic-modal"
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
            >
              <div className="forensic-modal-header mono">
                <Sparkles size={16} /> FORENSIC COMPARISON UNIT
                <button className="close-x" onClick={() => setSelectedForensicClue(null)}>×</button>
              </div>
              <div className="forensic-comparison-container">
                <div className="forensic-clue-summary mono">
                  {selectedForensicClue.text.replace('{This}', 'RECOVERED')}
                </div>
                
                <div className="comparison-columns">
                  <div className="recovered-column">
                    <div className="column-label mono">RECOVERED FROM SCENE</div>
                    <div className="print-magnifier">
                       <ProceduralPrint 
                         seed={selectedForensicClue.metadata?.pattern} 
                         type={selectedForensicClue.metadata?.type || 'fingerprint'} 
                         size={220} 
                         grayscale
                       />
                       <div className="scanline" />
                    </div>
                  </div>

                  <div className="suspects-column">
                    <div className="column-label mono">SUSPECT DATABASE MATCHES</div>
                    <div className="suspect-comparison-grid">
                      {_suspects.map(s => {
                        const pattern = selectedForensicClue.metadata?.type === 'fingerprint'
                          ? s.details.fingerprintPattern
                          : s.details.shoeprintPattern;
                        return (
                          <div key={s.name} className="suspect-match-item">
                            <div className="match-print-box">
                              <ProceduralPrint 
                                seed={pattern} 
                                type={selectedForensicClue.metadata?.type || 'fingerprint'} 
                                size={80}
                                color={s.color}
                              />
                            </div>
                            <div className="mono mini-desc">SUBJECT: ???</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="forensic-footer mono">
                   VISUAL COMPARISON ONLY. NAMES REDACTED BY BUREAU PROTOCOL.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
        .clue-header { padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-dim); }
        .title-group { display: flex; align-items: center; gap: 10px; }
        .title-group h2 { font-size: 0.85rem; letter-spacing: 2px; color: var(--accent-primary); }
        
        .forensic-link {
          background: none; border: none; color: var(--accent-primary); text-decoration: underline;
          font-weight: 900; font-family: 'JetBrains Mono'; cursor: pointer; padding: 0 4px;
          transition: all 0.2s; text-transform: uppercase;
        }
        .forensic-link:hover { color: var(--success); filter: drop-shadow(0 0 5px var(--success)); }

        .clue-list { flex: 1; overflow-y: auto; overflow-x: hidden; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
        .clue-card { display: flex; gap: 14px; padding: 16px; border-radius: 8px; border: 1px solid var(--border-dim); transition: all 0.2s; cursor: pointer; }
        .clue-card:hover { background: rgba(255,255,255,0.04); }
        .clue-card.crossed { opacity: 0.35; }
        .clue-card.crossed .clue-text { text-decoration: line-through; }

        .forensic-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px);
          z-index: 3000; display: flex; align-items: center; justify-content: center; padding: 40px;
        }
        .forensic-modal {
          width: 100%; max-width: 900px; background: #0a0c12; border: 1px solid var(--border-bright);
          box-shadow: 0 50px 100px rgba(0,0,0,0.8); border-radius: 16px; overflow: hidden;
        }
        .forensic-modal-header {
          padding: 16px 24px; border-bottom: 1px solid var(--border-dim); background: rgba(0,210,255,0.05);
          display: flex; align-items: center; gap: 12px; color: var(--accent-primary); letter-spacing: 4px;
        }
        .close-x { margin-left: auto; background: none; border: none; color: var(--text-dim); font-size: 24px; cursor: pointer; }
        
        .forensic-comparison-container { padding: 32px; display: flex; flex-direction: column; gap: 24px; }
        .forensic-clue-summary { padding: 16px; border-radius: 8px; background: rgba(255,255,255,0.03); color: var(--text-main); font-size: 0.9rem; border-left: 4px solid var(--accent-primary); }
        
        .comparison-columns { display: grid; grid-template-columns: 260px 1fr; gap: 40px; }
        .column-label { font-size: 0.65rem; color: var(--accent-primary); margin-bottom: 16px; letter-spacing: 2px; }
        
        .print-magnifier {
          position: relative; background: #000; border-radius: 12px; padding: 20px;
          border: 1px solid var(--border-dim); box-shadow: inset 0 0 40px rgba(0,0,0,1); overflow: hidden;
          display: flex; justify-content: center;
        }
        .scanline {
          position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: var(--accent-primary);
          opacity: 0.3; animation: scan 3s linear infinite; pointer-events: none;
        }
        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }

        .suspect-comparison-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 16px; }
        .suspect-match-item { display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .match-print-box { 
          background: rgba(255,255,255,0.02); border-radius: 8px; padding: 8px; 
          border: 1px solid transparent; transition: all 0.2s; 
          display: flex; justify-content: center;
        }
        .match-print-box:hover { border-color: var(--accent-primary); background: rgba(0,210,255,0.05); }
        .mini-desc { font-size: 0.55rem; color: var(--text-dim); letter-spacing: 1px; }

        .forensic-footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-dim); font-size: 0.6rem; color: var(--text-dim); opacity: 0.5; text-align: center; }

        @media (max-width: 800px) {
          .comparison-columns { grid-template-columns: 1fr; }
          .recovered-column { order: 2; }
          .suspects-column { order: 1; }
        }

        .clue-number { color: var(--accent-primary); font-weight: 800; font-size: 0.7rem; opacity: 0.5; font-family: 'JetBrains Mono', monospace; flex-shrink: 0; padding-top: 2px; }
        .typewriter { font-family: 'JetBrains Mono', monospace !important; font-size: 0.82rem !important; line-height: 1.6 !important; color: var(--text-main); font-weight: 400; letter-spacing: 0.3px; }
        .logic-reveal { margin-top: 12px; font-size: 0.75rem; font-weight: 700; color: var(--success); background: rgba(0, 255, 163, 0.05); padding: 6px 10px; border-radius: 4px; border-left: 2px solid var(--success); letter-spacing: 0.5px; }
        .icon-pulse { animation: pulse 2s infinite; color: var(--accent-primary); }
      `}} />
    </div>
  );
};

