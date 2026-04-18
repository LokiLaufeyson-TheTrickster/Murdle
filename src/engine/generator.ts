import type { LogicState, Clue, Difficulty, Puzzle } from './types';
import { solve, seededRandom } from './solver';
import { THEMES } from './narrative';

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
  
  // 1. Pick Assets based on Theme
  const theme = THEMES[themeName] || THEMES.Modern;
  const suspects = SHUFFLE(theme.suspects, rng).slice(0, size);
  const weapons = SHUFFLE(theme.weapons, rng).slice(0, size);
  const locations = SHUFFLE(theme.locations, rng).slice(0, size);

  // 2. Generate Truth
  const swTruth = SHUFFLE(Array.from({ length: size }, (_, i) => i), rng);
  const wlTruth = SHUFFLE(Array.from({ length: size }, (_, i) => i), rng);
  const slTruth = swTruth.map(wIdx => wlTruth[wIdx]);

  const solution: LogicState = { sw: swTruth, wl: wlTruth, sl: slTruth };

  // 3. Clue Pool Generation
  const allPossibleClues: Clue[] = [];

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const isTrue = swTruth[i] === j;
      allPossibleClues.push({
        id: `sw-${i}-${j}-${isTrue}`,
        type: isTrue ? 'DIRECT' : 'NEGATIVE',
        variables: [{ type: 'SW', i, j }],
        isNegative: !isTrue,
        text: '',
      });
    }
  }

  for (let j = 0; j < size; j++) {
    for (let k = 0; k < size; k++) {
      const isTrue = wlTruth[j] === k;
      allPossibleClues.push({
        id: `wl-${j}-${k}-${isTrue}`,
        type: 'LOCATION_WEAPON',
        variables: [{ type: 'WL', j, k }],
        isNegative: !isTrue,
        text: '',
      });
    }
  }

  for (let i = 0; i < size; i++) {
    for (let k = 0; k < size; k++) {
      const isTrue = slTruth[i] === k;
      allPossibleClues.push({
        id: `sl-${i}-${k}-${isTrue}`,
        type: 'SUSPECT_LOCATION',
        variables: [{ type: 'SL', i, k }],
        isNegative: !isTrue,
        text: '',
      });
    }
  }

  // 4. Constructive Addition
  let cluePool = allPossibleClues.filter(c => {
    const v = c.variables[0];
    if (v.type === 'SW') {
      const match = swTruth[v.i] === v.j;
      return c.isNegative ? !match : match;
    }
    if (v.type === 'WL') {
      const match = wlTruth[v.j] === v.k;
      return c.isNegative ? !match : match;
    }
    if (v.type === 'SL') {
      const match = slTruth[v.i] === v.k;
      return c.isNegative ? !match : match;
    }
    return false;
  });

  cluePool = SHUFFLE(cluePool, rng);

  const selectedClues: Clue[] = [];
  for (const clue of cluePool) {
    selectedClues.push(clue);
    const solutions = solve(size, selectedClues, 2);
    if (solutions.length === 1) break; 
  }

  // Destructive Pruning: Minimize clue set
  for (let i = selectedClues.length - 1; i >= 0; i--) {
    const testClues = selectedClues.filter((_, idx) => idx !== i);
    const solutions = solve(size, testClues, 2);
    if (solutions.length === 1) {
      selectedClues.splice(i, 1);
    }
  }

  const redundancyMap: any = { 'Cadet': 1, 'Sergeant': 0, 'Inspector': 0, 'Special Agent': 0 };
  const extraNeeded = redundancyMap[difficulty] || 0;
  let extraAdded = 0;
  for (const clue of cluePool) {
    if (extraAdded >= extraNeeded) break;
    if (!selectedClues.includes(clue)) {
      selectedClues.push(clue);
      extraAdded++;
    }
  }

  const murdererIdx = seed.charCodeAt(0) % size;

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
    murdererIdx
  };
}
