import type { Clue, LogicVariable } from './types';

export interface Deduction {
  variable: LogicVariable;
  isPositive: boolean;
  reason: string;
}

/**
 * Heuristic solver to check if human can solve it.
 * This simulates the 'Grid logic' a human uses.
 */
export function simulateHuman(size: number, clues: Clue[], maxDepth = 9): Deduction[] {
  // Grids: sw[i][j], wl[j][k], sl[i][k]
  // 0: Unknown, 1: Positive, -1: Negative
  const sw = Array.from({ length: size }, () => new Int8Array(size));
  const wl = Array.from({ length: size }, () => new Int8Array(size));
  const sl = Array.from({ length: size }, () => new Int8Array(size));

  const deductions: Deduction[] = [];

  // Initial Clues
  for (const clue of clues) {
    for (const v of clue.variables) {
      if (v.type === 'SW') sw[v.i][v.j] = clue.isNegative ? -1 : 1;
      if (v.type === 'WL') wl[(v as any).j][(v as any).k] = clue.isNegative ? -1 : 1;
      if (v.type === 'SL') sl[(v as any).i][(v as any).k] = clue.isNegative ? -1 : 1;
    }
  }

  let changed = true;
  let depth = 0;

  while (changed && depth < maxDepth) {
    changed = false;
    depth++;

    // Rule 1: Row/Column exclusion (Level 1)
    // If a row has N-1 negatives, the last item is positive.
    // If a row has a positive, all other items are negative.
    const grids = [
      { data: sw, type: 'SW' as const },
      { data: wl, type: 'WL' as const },
      { data: sl, type: 'SL' as const }
    ];

    for (const grid of grids) {
      for (let r = 0; r < size; r++) {
        // Check row
        let posIdx = -1;
        let negCount = 0;
        for (let c = 0; c < size; c++) {
          if (grid.data[r][c] === 1) posIdx = c;
          if (grid.data[r][c] === -1) negCount++;
        }

        if (posIdx !== -1) {
          for (let c = 0; c < size; c++) {
            if (c !== posIdx && grid.data[r][c] === 0) {
              grid.data[r][c] = -1;
              changed = true;
            }
          }
        } else if (negCount === size - 1) {
          for (let c = 0; c < size; c++) {
            if (grid.data[r][c] === 0) {
              grid.data[r][c] = 1;
              changed = true;
            }
          }
        }

        // Check column (transpose)
        posIdx = -1;
        negCount = 0;
        for (let ri = 0; ri < size; ri++) {
          if (grid.data[ri][r] === 1) posIdx = ri;
          if (grid.data[ri][r] === -1) negCount++;
        }
        if (posIdx !== -1) {
          for (let ri = 0; ri < size; ri++) {
            if (ri !== posIdx && grid.data[ri][r] === 0) {
              grid.data[ri][r] = -1;
              changed = true;
            }
          }
        } else if (negCount === size - 1) {
          for (let ri = 0; ri < size; ri++) {
            if (grid.data[ri][r] === 0) {
              grid.data[ri][r] = 1;
              changed = true;
            }
          }
        }
      }
    }

    // Rule 2: Cross-grid inference (Level 2)
    // sw[i][j] = 1 AND wl[j][k] = 1 => sl[i][k] = 1
    // sw[i][j] = 1 AND sl[i][k] = 1 => wl[j][k] = 1
    // wl[j][k] = 1 AND sl[i][k] = 1 => sw[i][j] = 1
    // ... plus negative cases
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        for (let k = 0; k < size; k++) {
          // Positive chaining
          if (sw[i][j] === 1 && wl[j][k] === 1 && sl[i][k] === 0) {
            sl[i][k] = 1; changed = true;
          }
          if (sw[i][j] === 1 && sl[i][k] === 1 && wl[j][k] === 0) {
            wl[j][k] = 1; changed = true;
          }
          if (wl[j][k] === 1 && sl[i][k] === 1 && sw[i][j] === 0) {
            sw[i][j] = 1; changed = true;
          }
          
          // Negative chaining
          // If S_i has W_j, and W_j is NOT at L_k, then S_i is NOT at L_k
          if (sw[i][j] === 1 && wl[j][k] === -1 && sl[i][k] === 0) {
            sl[i][k] = -1; changed = true;
          }
          // If S_i has W_j, and S_i is NOT at L_k, then W_j is NOT at L_k
          if (sw[i][j] === 1 && sl[i][k] === -1 && wl[j][k] === 0) {
            wl[j][k] = -1; changed = true;
          }
          // If W_j is at L_k, and S_i is NOT at L_k, then S_i does NOT have W_j
          if (wl[j][k] === 1 && sl[i][k] === -1 && sw[i][j] === 0) {
            sw[i][j] = -1; changed = true;
          }
          // If W_j is at L_k, and S_i has W_j, then S_i IS at L_k
          // (Handled by positive chaining)
        }
      }
    }
  }

  // Final check: Is it fully solved?
  // We can return the deductions made.
  // ...
  return deductions;
}
