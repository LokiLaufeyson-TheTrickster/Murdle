import type { LogicState, Clue } from './types';

/**
 * A simple seeded random number generator.
 */
export function seededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }

  return function() {
    h = Math.imul(48271, h) | 0 & 2147483647;
    return (h & 2147483647) / 2147483648;
  };
}

/**
 * Checks if a partial mapping is consistent with a list of clues.
 */
export function isConsistent(
  sw: (number|null)[], 
  wl: (number|null)[], 
  clues: Clue[]
): boolean {
  for (const clue of clues) {
    if (!clue.variables || clue.variables.length === 0) continue;

    // For DIRECT/NEGATIVE clues (SW or WL or SL)
    // We only check clues where ALL involved variables are assigned.
    // However, some clues are simpler to check than others.
    
    for (const v of clue.variables) {
      if (v.type === 'SW') {
        if (sw[v.i] !== null) {
          const match = sw[v.i] === v.j;
          if (clue.isNegative && match) return false;
          if (!clue.isNegative && !match) return false;
        }
      } else if (v.type === 'WL') {
        if (wl[v.j] !== null) {
          const match = wl[v.j] === v.k;
          if (clue.isNegative && match) return false;
          if (!clue.isNegative && !match) return false;
        }
      } else if (v.type === 'SL') {
        const suspectHasWeapon = sw[v.i];
        if (suspectHasWeapon !== null) {
          const weaponAtLocation = wl[suspectHasWeapon];
          if (weaponAtLocation !== null) {
            const match = weaponAtLocation === v.k;
            if (clue.isNegative && match) return false;
            if (!clue.isNegative && !match) return false;
          }
        }
      }
    }
  }
  return true;
}

/**
 * Finds all solutions for the given size and clues.
 */
export function solve(size: number, clues: Clue[], maxSolutions = 2): LogicState[] {
  const solutions: LogicState[] = [];
  
  const sw = new Array(size).fill(null);
  const wl = new Array(size).fill(null);
  const usedW = new Array(size).fill(false);
  const usedL = new Array(size).fill(false);

  function backtrack(idx: number, stage: 'SW' | 'WL') {
    if (solutions.length >= maxSolutions) return;

    if (stage === 'SW') {
      if (idx === size) {
        backtrack(0, 'WL');
        return;
      }

      for (let j = 0; j < size; j++) {
        if (!usedW[j]) {
          sw[idx] = j;
          usedW[j] = true;
          if (isConsistent(sw, wl, clues)) {
            backtrack(idx + 1, 'SW');
          }
          usedW[j] = false;
          sw[idx] = null;
        }
      }
    } else {
      if (idx === size) {
        // Found a complete consistent state
        const sl = sw.map((w_idx: number) => wl[w_idx]);
        solutions.push({
          sw: [...sw],
          wl: [...wl],
          sl: sl
        });
        return;
      }

      for (let k = 0; k < size; k++) {
        if (!usedL[k]) {
          wl[idx] = k;
          usedL[k] = true;
          if (isConsistent(sw, wl, clues)) {
            backtrack(idx + 1, 'WL');
          }
          usedL[k] = false;
          wl[idx] = null;
        }
      }
    }
  }

  backtrack(0, 'SW');
  return solutions;
}
