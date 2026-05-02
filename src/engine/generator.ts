import type { LogicState, Clue, Difficulty, Puzzle, SuspectDetails } from './types';
import { solve, seededRandom } from './solver';
import { THEMES, PROFESSIONS } from './narrative';

const SHUFFLE = <T>(array: T[], random: () => number): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export function generatePuzzle(seed: string, difficulty: Difficulty, size: number, themeName = 'Modern'): Puzzle {
  const rng = seededRandom(seed);
  
  // 1. Pick Assets
  const theme = THEMES[themeName] || THEMES.Modern;
  const suspects = SHUFFLE(theme.suspects, rng).slice(0, size);
  const weapons = SHUFFLE(theme.weapons, rng).slice(0, size);
  const locations = SHUFFLE(theme.locations, rng).slice(0, size);

  // Assign backstories from pools
  suspects.forEach((s, idx) => {
    const details = s.details as SuspectDetails;
    const prof = details.profession;
    const backstories = PROFESSIONS[prof] || ["A mysterious past shrouded in secrets."];
    details.backstory = backstories[Math.floor(rng() * backstories.length)];
    });

  // 2. Generate Truth
  const swTruth = SHUFFLE(Array.from({ length: size }, (_, i) => i), rng);
  const wlTruth = SHUFFLE(Array.from({ length: size }, (_, i) => i), rng);
  const slTruth = swTruth.map(wIdx => wlTruth[wIdx]);
  const solution: LogicState = { sw: swTruth, wl: wlTruth, sl: slTruth };

  // Derived killer logic: Killer is the one with the highest index (arbitrary but derived)
  const murdererIdx = (seed.length + seed.charCodeAt(0)) % size;
    
  // 3. Clue Pool Generation
  const allPossibleClues: Clue[] = [];
  const addClue = (type: any, variables: any[], isNegative: boolean) => {
    allPossibleClues.push({
      id: `${type}-${variables.map(v => `${v.i || v.j}-${v.j || v.k}`).join('-')}-${isNegative}-${rng()}`,
      type, variables, isNegative, text: ''
    });
  };

  // SW clues
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      addClue(swTruth[i] === j ? 'DIRECT' : 'NEGATIVE', [{ type: 'SW', i, j }], swTruth[i] !== j);
    }
  }
  // WL clues
  for (let j = 0; j < size; j++) {
    for (let k = 0; k < size; k++) {
      addClue('LOCATION_WEAPON', [{ type: 'WL', j, k }], wlTruth[j] !== k);
    }
  }
  // SL clues
  for (let i = 0; i < size; i++) {
    for (let k = 0; k < size; k++) {
      addClue('SUSPECT_LOCATION', [{ type: 'SL', i, k }], slTruth[i] !== k);
    }
  }

  // 4. Constructive Addition
  let cluePool = SHUFFLE(allPossibleClues.filter(c => {
    const v = c.variables[0];
    if (v.type === 'SW') return c.isNegative ? swTruth[v.i] !== v.j : swTruth[v.i] === v.j;
    if (v.type === 'WL') return c.isNegative ? wlTruth[v.j] !== v.k : wlTruth[v.j] === v.k;
    if (v.type === 'SL') return c.isNegative ? slTruth[v.i] !== v.k : slTruth[v.i] === v.k;
    return false;
  }), rng);

  const selectedClues: Clue[] = [];
  const isResolved = (clues: Clue[]) => {
    const sols = solve(size, clues, 10);
    if (sols.length === 0) return false;
    
    // Easy modes require full grid resolution
    if (difficulty === 'Cadet' || difficulty === 'Sergeant') {
      return sols.length === 1;
    }
    
    // Harder modes only require catching the killer (suspect, weapon, location triad)
    const killerW = swTruth[murdererIdx];
    const killerL = slTruth[murdererIdx];
    return sols.every(s => s.sw[murdererIdx] === killerW && s.sl[murdererIdx] === killerL);
  };

  for (const clue of cluePool) {
    selectedClues.push(clue);
    if (isResolved(selectedClues)) break;
  }

  // 5. Destructive Pruning (Keep it challenging)
  for (let i = selectedClues.length - 1; i >= 0; i--) {
    const testClues = selectedClues.filter((_, idx) => idx !== i);
    if (isResolved(testClues)) {
      selectedClues.splice(i, 1);
    }
  }

  // Final Clue Sorting: Push clues involving the murderer to the end
  selectedClues.sort((a, b) => {
    const aInvolvesKiller = a.variables.some(v => (v.type === 'SW' && v.i === murdererIdx) || (v.type === 'SL' && v.i === murdererIdx) || (v.type === 'WL' && v.j === swTruth[murdererIdx]));
    const bInvolvesKiller = b.variables.some(v => (v.type === 'SW' && v.i === murdererIdx) || (v.type === 'SL' && v.i === murdererIdx) || (v.type === 'WL' && v.j === swTruth[murdererIdx]));
    if (aInvolvesKiller && !bInvolvesKiller) return 1;
    if (!aInvolvesKiller && bInvolvesKiller) return -1;
    return 0;
  });

  // Calculate Inference Count (Simplified: 1.5x per clue + negative multiplier)
  const inferenceCount = selectedClues.reduce((acc, c) => acc + (c.isNegative ? 2 : 1), 0) + (size - 3) * 2;

  return {
    seed,
    difficulty,
    size,
    solution,
    clues: selectedClues,
    suspects,
    weapons,
    locations,
    theme: themeName,
    murdererIdx,
    inferenceCount
  };
}
