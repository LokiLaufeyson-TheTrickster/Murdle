import React, { useState, useEffect } from 'react'; // v5.0 Build
import type { Difficulty, Puzzle } from './engine/types';
import { generatePuzzle } from './engine/generator';
import { getNarrative } from './engine/narrative';
import { UnifiedGrid } from './components/UnifiedGrid';
import { ClueList } from './components/ClueList';
import { TopBar } from './components/TopBar';
import { BackgroundParticles } from './components/BackgroundParticles';
import { EvidenceBoard } from './components/EvidenceBoard';
import { AccuseModal } from './components/AccuseModal';
import { SolutionWalkthrough } from './components/SolutionWalkthrough';
import { StartMenu } from './components/StartMenu';
import { TutorialModal } from './components/TutorialModal';
import { SettingsProvider } from './context/SettingsContext';
import { AnimatePresence, motion } from 'framer-motion';

const MURDER_INTRO_POOL = [
  (w: string) => `A body has been found. The <strong>${w}</strong> is missing — and someone in this room knows where it went.`,
  (l: string) => `A murder was committed inside the <strong>${l}</strong>. One person here did it. The rest are lying about something else entirely.`,
  (w: string) => `The <strong>${w}</strong> was the instrument. The killer is still among us, waiting to see if you're as sharp as you think.`,
  (l: string) => `Blood was found at the <strong>${l}</strong>. The timeline doesn't add up, and alibis are already crumbling.`,
  (w: string) => `The <strong>${w}</strong> has vanished from the scene. So has the truth — but not for long.`,
];

const AppInner: React.FC = () => {
  const [seed, setSeed] = useState(() => Math.random().toString(36).substring(7).toUpperCase());
  const [difficulty, setDifficulty] = useState<Difficulty>('Sergeant');
  const [size, setSize] = useState(5);
  const [theme, setTheme] = useState('Modern');
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [userState, setUserState] = useState<{ [key: string]: { val: number, auto?: boolean } }>({});
  const [charges, setCharges] = useState(2);
  const [errorHighlight, setErrorHighlight] = useState<string | null>(null);
  const [showEvidenceBoard, setShowEvidenceBoard] = useState(false);
  const [showAccuseWindow, setShowAccuseWindow] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [endgameState, setEndgameState] = useState<'playing' | 'victory' | 'defeat'>('playing');
  const [gameState, setGameState] = useState<'menu' | 'playing'>('menu');
  const [showTutorial, setShowTutorial] = useState(false);
  const [contextHtml, setContextHtml] = useState('');
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [initialEvidence, setInitialEvidence] = useState<{type: 'suspects'|'weapons'|'locations', name: string} | null>(null);

  useEffect(() => {
    const newPuzzle = generatePuzzle(seed, difficulty, size, theme);
    newPuzzle.clues = newPuzzle.clues.map(c => {
      const v = c.variables[0];
      let logicDisplay = '';
      if (v.type === 'SW') logicDisplay = `${newPuzzle.suspects[v.i].name} ${c.isNegative ? '≠ ' : '= '} ${newPuzzle.weapons[v.j].name}`;
      if (v.type === 'WL') logicDisplay = `${newPuzzle.weapons[v.j].name} ${c.isNegative ? '≠ ' : '= '} ${newPuzzle.locations[v.k].name}`;
      if (v.type === 'SL') logicDisplay = `${newPuzzle.suspects[v.i].name} ${c.isNegative ? '≠ ' : '= '} ${newPuzzle.locations[v.k].name}`;

      return {
        ...c,
        text: getNarrative(c, newPuzzle.suspects, newPuzzle.weapons, newPuzzle.locations),
        logicDisplay
      };
    });
    setPuzzle(newPuzzle);
    setUserState({});
    setIsReviewMode(false);
    setEndgameState('playing');
    setCharges(difficulty === 'Cadet' ? 5 : difficulty === 'Sergeant' ? 2 : difficulty === 'Inspector' ? 1 : 0);
  }, [seed, difficulty, size, theme]);

  useEffect(() => {
    if (puzzle) {
      const { murdererIdx } = puzzle;
      const wName = puzzle.weapons[puzzle.solution.sw[murdererIdx]].name;
      const lName = puzzle.locations[puzzle.solution.sl[murdererIdx]].name;
      
      const poolIdx = Math.floor((puzzle.seed.charCodeAt(1) || 0) % MURDER_INTRO_POOL.length);
      // Even templates (0, 2, 4) expect a weapon; Odd templates (1, 3) expect a location
      const isWeaponTemplate = poolIdx % 2 === 0;
      const html = MURDER_INTRO_POOL[poolIdx](isWeaponTemplate ? wName : lName);
      
      setContextHtml(html);
    }
  }, [puzzle]);

  const handleCellClick = (gridType: string, row: number, col: number) => {
    const key = `${gridType}-${row}-${col}`;
    const currentEntry = userState[key] || { val: 0 };
    const nextVal = (currentEntry.val + 1) % 4;
    
    const newState = { ...userState };
    newState[key] = { val: nextVal, auto: false };

    if (nextVal === 2) {
      for (let i = 0; i < size; i++) {
        if (i !== col) {
          const k = `${gridType}-${row}-${i}`;
          if (!newState[k] || newState[k].val === 0) newState[k] = { val: 1, auto: true };
        }
        if (i !== row) {
          const k = `${gridType}-${i}-${col}`;
          if (!newState[k] || newState[k].val === 0) newState[k] = { val: 1, auto: true };
        }
      }
    }

    if (currentEntry.val === 2 && nextVal !== 2) {
      for (let i = 0; i < size; i++) {
        const rowK = `${gridType}-${row}-${i}`;
        const colK = `${gridType}-${i}-${col}`;
        if (newState[rowK]?.auto) delete newState[rowK];
        if (newState[colK]?.auto) delete newState[colK];
      }
      Object.keys(newState).forEach(k => {
        if (k.startsWith(gridType) && newState[k].val === 2) {
          const [,,r,c] = k.split('-');
          const rv = parseInt(r);
          const cv = parseInt(c);
          for (let i = 0; i < size; i++) {
            if (i !== cv) {
              const rk = `${gridType}-${rv}-${i}`;
              if (!newState[rk] || newState[rk].val === 0) newState[rk] = { val: 1, auto: true };
            }
            if (i !== rv) {
              const ck = `${gridType}-${i}-${cv}`;
              if (!newState[ck] || newState[ck].val === 0) newState[ck] = { val: 1, auto: true };
            }
          }
        }
      });
    }

    setUserState(newState);
  };

  const useContradiction = () => {
    if (charges <= 0) return;
    setCharges(prev => prev - 1);
    
    let foundError = false;
    if (puzzle) {
      Object.entries(userState).forEach(([key, entry]) => {
        if (entry.val === 2) {
          const [type, r, c] = key.split('-');
          const row = parseInt(r);
          const col = parseInt(c);
          
          if (type === 'SW' && puzzle.solution.sw[row] !== col) foundError = true;
          if (type === 'WL' && puzzle.solution.wl[row] !== col) foundError = true;
          if (type === 'SL' && puzzle.solution.sl[row] !== col) foundError = true;
        }
      });
    }

    setErrorHighlight(foundError ? "HYPOTHESIS CONTRADICTED" : "LOGIC HOLDS — CONTINUE");
    setTimeout(() => setErrorHighlight(null), 2500);
  };

  if (!puzzle && gameState === 'playing') return <div className="loading mono">INITIALIZING CASE FILE...</div>;

  return (
    <div className={`game-container theme-${theme}`}>
      <BackgroundParticles />

      <AnimatePresence>
        {showTutorial && (
          <TutorialModal onClose={() => setShowTutorial(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {gameState === 'menu' ? (
          <StartMenu
            key="menu"
            onStart={() => setGameState('playing')}
            onOpenTutorial={() => setShowTutorial(true)}
          />
        ) : puzzle ? (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="game-inner-wrapper"
          >
            <TopBar
              seed={seed}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              size={size}
              setSize={setSize}
              theme={theme}
              setTheme={setTheme}
              charges={charges}
              onNewGame={() => { setSeed(Math.random().toString(36).substring(7).toUpperCase()); setEndgameState('playing'); }}
              onUseContradiction={useContradiction}
              onOpenDatabase={() => { setInitialEvidence(null); setShowEvidenceBoard(true); }}
              onOpenAccuse={() => setShowAccuseWindow(true)}
              onBackToMenu={() => setGameState('menu')}
              inferenceCount={puzzle.inferenceCount}
            />
            
            <main className="game-main">
              <UnifiedGrid
                puzzle={puzzle}
                userState={userState}
                onCellClick={handleCellClick}
                onHeaderClick={(type, name) => {
                  setInitialEvidence({ type, name });
                  setShowEvidenceBoard(true);
                }}
                isReviewMode={isReviewMode}
              />
              
              <ClueList
                clues={puzzle.clues}
                contextHtml={contextHtml}
                onShowWalkthrough={() => setShowWalkthrough(true)}
                suspects={puzzle.suspects}
                weapons={puzzle.weapons}
                locations={puzzle.locations}
                theme={puzzle.theme}
              />
            </main>
          </motion.div>
        ) : (
          <div className="loading mono">LOADING CASE FILE...</div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {errorHighlight && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -10 }}
            className={`alert-toast ${errorHighlight.includes('CONTRADICTED') ? 'error' : 'success'}`}
          >
            <div className="toast-content">
              <span className="toast-icon">{errorHighlight.includes('CONTRADICTED') ? '⚠' : '✓'}</span>
              {errorHighlight}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEvidenceBoard && puzzle && (
          <EvidenceBoard
            suspects={puzzle.suspects}
            weapons={puzzle.weapons}
            locations={puzzle.locations}
            onClose={() => setShowEvidenceBoard(false)}
            initialTab={initialEvidence?.type}
            initialAsset={initialEvidence?.name}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWalkthrough && puzzle && (
          <SolutionWalkthrough
            clues={puzzle.clues}
            suspects={puzzle.suspects}
            weapons={puzzle.weapons}
            locations={puzzle.locations}
            solution={puzzle.solution}
            murdererIdx={puzzle.murdererIdx}
            onClose={() => setShowWalkthrough(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAccuseWindow && puzzle && (
          <AccuseModal
            suspects={puzzle.suspects}
            weapons={puzzle.weapons}
            locations={puzzle.locations}
            trueMurderer={puzzle.suspects[puzzle.murdererIdx].name}
            murderWeapon={puzzle.weapons[puzzle.solution.sw[puzzle.murdererIdx]].name}
            murderLocation={puzzle.locations[puzzle.solution.sl[puzzle.murdererIdx]].name}
            onClose={() => setShowAccuseWindow(false)}
            onVictory={() => { setShowAccuseWindow(false); setEndgameState('victory'); }}
            onDefeat={() => { setShowAccuseWindow(false); setEndgameState('defeat'); }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {endgameState !== 'playing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="endgame-overlay"
            onClick={() => setEndgameState('playing')}
          >
            <div className="endgame-modal glass-card" style={{ borderColor: endgameState === 'victory' ? 'var(--accent-primary)' : 'var(--error)' }}>
              <h1 className="mono" style={{ color: endgameState === 'victory' ? 'var(--accent-primary)' : 'var(--error)' }}>
                {endgameState === 'victory' ? 'CASE CLOSED' : 'WRONG ACCUSATION'}
              </h1>
              <p className="mono" style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-dim)' }}>
                {endgameState === 'victory'
                  ? `Your deductive reasoning was flawless. The case is sealed. The guilty party won't see daylight for a long time.`
                  : `Your accusation was wrong. The true culprit is still out there — and now they know you're looking.`}
              </p>
                <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '12px' }}>
                  {endgameState === 'defeat' && (
                    <button 
                      className="btn-modern" 
                      style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-bright)' }}
                      onClick={() => {
                        setIsReviewMode(true);
                        setEndgameState('playing');
                      }}
                    >
                      REVIEW CASE
                    </button>
                  )}
                  <button 
                    className="btn-modern primary-btn" 
                    style={{ flex: 1 }}
                    onClick={() => { 
                      setSeed(Math.random().toString(36).substring(7).toUpperCase()); 
                    }}
                  >
                    {endgameState === 'victory' ? 'NEXT CASE' : 'TRY NEW CASE'}
                  </button>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .endgame-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.92);
          z-index: 3000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .endgame-modal {
          max-width: 480px; width: 100%;
          text-align: center;
          display: flex; flex-direction: column; gap: 24px; padding: 48px 32px;
          border-radius: 12px;
        }
        .endgame-modal h1 { font-size: 2rem; letter-spacing: 4px; }
        .primary-btn {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          border: none;
          color: white;
          padding: 14px 28px;
          border-radius: 8px;
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 1px;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          transition: all 0.2s;
        }
        .primary-btn:hover { transform: scale(1.04); }
        
        .game-inner-wrapper {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }

        .game-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          position: relative;
          z-index: 10;
          overflow: hidden;
        }

        .game-main {
          display: grid;
          grid-template-columns: 1fr 390px;
          gap: 0;
          flex: 1;
          overflow: hidden;
          min-height: 0;
        }

        .loading {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: var(--accent-primary);
          text-shadow: 0 0 20px var(--accent-glow);
          letter-spacing: 3px;
        }

        .alert-toast {
          position: fixed;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          padding: 14px 28px;
          border-radius: 10px;
          backdrop-filter: blur(20px);
          font-family: 'JetBrains Mono', monospace;
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 1px;
          z-index: 4000;
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          white-space: nowrap;
        }
        .alert-toast.error { background: rgba(255,45,85,0.92); color: white; }
        .alert-toast.success { background: rgba(0,255,163,0.92); color: #03040a; }
        .toast-content { display: flex; align-items: center; gap: 10px; }
        .toast-icon { font-size: 1.2rem; }

        /* Theme Overrides */
        .theme-Modern {
          --bg-color: #03040a;
          --accent-primary: #00d2ff;
          --accent-secondary: #9d50bb;
          --accent-glow: rgba(0, 210, 255, 0.3);
          --accent-purple-glow: rgba(157, 80, 187, 0.3);
          --surface-1: rgba(10, 12, 20, 0.6);
          --surface-2: rgba(25, 28, 45, 0.8);
        }
        .theme-Noir {
          --bg-color: #0d0d0d;
          --accent-primary: #e6e6e6;
          --accent-secondary: #ff3333;
          --accent-glow: rgba(255,255,255,0.1);
          --accent-purple-glow: rgba(255,51,51,0.15);
          --surface-1: rgba(30,30,30,0.7);
          --surface-2: rgba(45,45,45,0.9);
          --text-main: #d1d1d1;
          --border-bright: rgba(255,255,255,0.1);
        }
        .theme-Fantasy {
          --bg-color: #1a0b2e;
          --accent-primary: #f9d423;
          --accent-secondary: #21e6c1;
          --accent-glow: rgba(249,212,35,0.2);
          --accent-purple-glow: rgba(33,230,193,0.2);
          --surface-1: rgba(45,20,80,0.6);
          --surface-2: rgba(60,30,100,0.8);
          --text-main: #e8dff5;
        }

        .game-container::before {
          content: '';
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none; z-index: -1;
          background: 
            radial-gradient(circle at 10% 10%, var(--accent-glow) 0%, transparent 40%),
            radial-gradient(circle at 90% 90%, var(--accent-purple-glow) 0%, transparent 40%);
          opacity: 0.5;
          transition: all 1s ease;
        }
        .game-main::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.06) 50%),
            linear-gradient(90deg, rgba(255,0,0,0.02), rgba(0,255,0,0.01), rgba(0,0,255,0.02));
          background-size: 100% 2px, 3px 100%;
          pointer-events: none; z-index: 5; opacity: 0.25;
        }

        /* Mobile responsive */
        @media (max-width: 900px) {
          .game-main {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 40vh;
          }
        }
        @media (max-width: 600px) {
          .game-main {
            grid-template-rows: 1fr 45vh;
          }
        }

        .glass-accent {
          background: rgba(0, 210, 255, 0.03);
          border: 1px solid rgba(0, 210, 255, 0.1);
        }
      `}} />
    </div>
  );
};

const App: React.FC = () => (
  <SettingsProvider>
    <AppInner />
  </SettingsProvider>
);

export default App;
