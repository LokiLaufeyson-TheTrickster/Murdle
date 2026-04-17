import React, { useState, useEffect } from 'react';
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
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
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

  useEffect(() => {
    const newPuzzle = generatePuzzle(seed, difficulty, size, theme);
    newPuzzle.clues = newPuzzle.clues.map(c => {
      const v = c.variables[0];
      let logicDisplay = '';
      if (v.type === 'SW') logicDisplay = `${newPuzzle.suspects[v.i].name} ${c.isNegative ? '!= ' : '== '} ${newPuzzle.weapons[v.j].name}`;
      if (v.type === 'WL') logicDisplay = `${newPuzzle.weapons[v.j].name} ${c.isNegative ? '!= ' : '== '} ${newPuzzle.locations[v.k].name}`;
      if (v.type === 'SL') logicDisplay = `${newPuzzle.suspects[v.i].name} ${c.isNegative ? '!= ' : '== '} ${newPuzzle.locations[v.k].name}`;

      return {
        ...c,
        text: getNarrative(c, newPuzzle.suspects, newPuzzle.weapons, newPuzzle.locations),
        logicDisplay
      };
    });
    setPuzzle(newPuzzle);
    setUserState({});
    setCharges(difficulty === 'Cadet' ? 5 : difficulty === 'Sergeant' ? 2 : 1);
  }, [seed, difficulty, size, theme]);

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

  useEffect(() => {
    if (puzzle) {
      const killerIdx = puzzle.seed.charCodeAt(0) % puzzle.size;
      const initialHtml = (() => {
        const wName = puzzle.weapons[puzzle.solution.sw[killerIdx]].name;
        const lName = puzzle.locations[puzzle.solution.sl[killerIdx]].name;
        const showWeapon = puzzle.solution.sw[0] % 2 === 0;
        if (showWeapon) {
          return `A highly classified incident occurred involving the <strong>${wName}</strong>. Identify the culprit, secure the primary scene of the crime, and piece together everyone else's whereabouts!`;
        } else {
          return `A highly classified incident occurred at the <strong>${lName}</strong>. Identify the culprit, locate the missing weapon, and piece together everyone else's whereabouts!`;
        }
      })();
      setContextHtml(initialHtml);
    }
  }, [puzzle]);

  const [contextHtml, setContextHtml] = useState('');

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

    setErrorHighlight(foundError ? "HYPOTHESIS CONTRADICTED" : "NO IMMEDIATE CONTRADICTION");
    setTimeout(() => setErrorHighlight(null), 2500);
  };

  if (!puzzle) return <div className="loading mono">INITIALIZING ENGINE...</div>;

  return (
    <div className="game-container">
      <BackgroundParticles />
      
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
        onOpenDatabase={() => setShowEvidenceBoard(true)}
        onOpenAccuse={() => setShowAccuseWindow(true)}
      />
      
      <main className="game-main">
        <UnifiedGrid 
          puzzle={puzzle}
          userState={userState}
          onCellClick={handleCellClick}
        />
        
        <ClueList 
          clues={puzzle.clues} 
          contextHtml={contextHtml}
          onShowWalkthrough={() => setShowWalkthrough(true)}
        />
      </main>

      <AnimatePresence>
        {errorHighlight && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className={`alert-toast ${errorHighlight.includes('NO') ? 'success' : 'error'}`}
          >
            <div className="toast-content">
              <span className="toast-icon">{errorHighlight.includes('NO') ? '✓' : '⚠'}</span>
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
            trueMurderer={puzzle.suspects[puzzle.seed.charCodeAt(0) % puzzle.size].name}
            murderWeapon={puzzle.weapons[puzzle.solution.sw[puzzle.seed.charCodeAt(0) % puzzle.size]].name}
            murderLocation={puzzle.locations[puzzle.solution.sl[puzzle.seed.charCodeAt(0) % puzzle.size]].name}
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
                {endgameState === 'victory' ? 'CASE CLOSED' : 'FALSE ACCUSATION'}
              </h1>
              <p className="mono">
                {endgameState === 'victory' 
                  ? 'Your deductive reasoning is flawless. The culprit has been secured.' 
                  : 'Your logic was flawed. The true culprit remains at large, and your rank has been suspended.'}
              </p>
              <button className="btn-modern" onClick={() => { setEndgameState('playing'); setSeed(Math.random().toString(36).substring(7).toUpperCase()); }}>
                NEW ASSIGNMENT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .endgame-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.9);
          z-index: 3000;
          display: flex; align-items: center; justify-content: center;
        }
        .endgame-modal {
          max-width: 500px; text-align: center; display: flex; flex-direction: column; gap: 24px; padding: 40px; border-radius: 8px;
        }
        .endgame-modal h1 { font-size: 2.5rem; letter-spacing: 4px; }
        
        .game-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          position: relative;
          z-index: 10;
        }
        .game-main {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 0;
          flex: 1;
          overflow: hidden;
        }
        .loading {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: var(--accent-primary);
          text-shadow: 0 0 20px var(--accent-glow);
        }
        .alert-toast {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          padding: 16px 32px;
          border-radius: 12px;
          backdrop-filter: blur(20px);
          font-weight: 800;
          letter-spacing: 1px;
          z-index: 1000;
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }
        .alert-toast.error { background: rgba(255, 45, 85, 0.9); color: white; }
        .alert-toast.success { background: rgba(0, 255, 163, 0.9); color: #03040a; }
        .toast-content { display: flex; align-items: center; gap: 12px; }
        .toast-icon { font-size: 1.5rem; }
        
        @media (max-width: 1200px) {
          .game-main { grid-template-columns: 1fr; }
          .game-main .unified-grid-container { height: 60vh; }
        }
      `}} />
    </div>
  );
};

export default App;
