import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import type { Clue, AssetInfo } from '../engine/types';

interface SolutionStep {
  clueIndex: number;
  clueText: string;
  deduction: string;
  conclusion: string;
  type: 'positive' | 'negative' | 'inference';
}

interface SolutionWalkthroughProps {
  clues: Clue[];
  suspects: AssetInfo[];
  weapons: AssetInfo[];
  locations: AssetInfo[];
  solution: { sw: number[]; wl: number[]; sl: number[] };
  onClose: () => void;
}

function buildSteps(
  clues: Clue[],
  suspects: AssetInfo[],
  weapons: AssetInfo[],
  locations: AssetInfo[],
  solution: { sw: number[]; wl: number[]; sl: number[] }
): SolutionStep[] {
  const steps: SolutionStep[] = [];

  clues.forEach((clue, idx) => {
    const v = clue.variables[0];
    const { type, isNegative } = clue;

    let deduction = '';
    let conclusion = '';
    let stepType: 'positive' | 'negative' | 'inference' = isNegative ? 'negative' : 'positive';

    // Safely extract suspect/weapon/location from the discriminated union
    const sIdx = (v.type === 'SW' || v.type === 'SL') ? v.i : undefined;
    const wIdx = (v.type === 'SW' || v.type === 'WL') ? v.j : undefined;
    const lIdx = (v.type === 'WL' || v.type === 'SL') ? v.k : undefined;

    const S = sIdx !== undefined ? (suspects[sIdx]?.name ?? '?') : '?';
    const W = wIdx !== undefined ? (weapons[wIdx]?.name ?? '?') : '?';
    const L = lIdx !== undefined ? (locations[lIdx]?.name ?? '?') : '?';

    if (type === 'DIRECT' || type === 'NEGATIVE') {
      if (!isNegative) {
        deduction = `This directly tells us ${S} used the ${W}.`;
        conclusion = `✓ ${S} → ${W}`;
      } else {
        deduction = `This rules out ${S} as the user of the ${W}.`;
        conclusion = `✗ ${S} ≠ ${W}`;
        stepType = 'negative';
      }
    } else if (type === 'LOCATION_WEAPON') {
      if (!isNegative) {
        deduction = `The ${W} was at the ${L}. Combined with other clues linking suspects to the ${W} or the ${L}, we can narrow down the killer's location.`;
        conclusion = `✓ ${W} → ${L}`;
      } else {
        deduction = `The ${W} was NOT at the ${L}. This eliminates the ${L} as a possible hiding spot for the ${W}.`;
        conclusion = `✗ ${W} ≠ ${L}`;
        stepType = 'negative';
      }
    } else if (type === 'SUSPECT_LOCATION') {
      if (!isNegative) {
        deduction = `${S} was at the ${L}. If we also know which weapon ${S} had, we can conclude where the murder took place.`;
        conclusion = `✓ ${S} → ${L}`;
      } else {
        deduction = `${S} was not at the ${L}, so the crime did not happen there if ${S} is the killer.`;
        conclusion = `✗ ${S} ≠ ${L}`;
        stepType = 'negative';
      }
    }

    steps.push({ clueIndex: idx + 1, clueText: clue.text, deduction, conclusion, type: stepType });
  });

  // Add final inference step
  const murdererIdx = solution.sw.findIndex((wIdx, sIdx) => solution.wl[wIdx] === solution.sl[sIdx]);
  const murderer = suspects[murdererIdx]?.name ?? suspects[0]?.name;
  const murderWeapon = weapons[solution.sw[murdererIdx]]?.name ?? weapons[0]?.name;
  const murderLocation = locations[solution.sl[murdererIdx]]?.name ?? locations[0]?.name;

  steps.push({
    clueIndex: clues.length + 1,
    clueText: 'Final Deduction',
    deduction: `By process of elimination across all clues, only one combination remains consistent: ${murderer} committed the crime with the ${murderWeapon} in the ${murderLocation}.`,
    conclusion: `🎯 ${murderer} · ${murderWeapon} · ${murderLocation}`,
    type: 'inference'
  });

  return steps;
}

export const SolutionWalkthrough: React.FC<SolutionWalkthroughProps> = ({
  clues, suspects, weapons, locations, solution, onClose
}) => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const steps = buildSteps(clues, suspects, weapons, locations, solution);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="walkthrough-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        className="walkthrough-modal glass-card"
        onClick={e => e.stopPropagation()}
      >
        <div className="walkthrough-header">
          <h2 className="mono">CASE WALKTHROUGH</h2>
          <p className="walkthrough-sub">Step-by-step breakdown of how each clue narrows the solution.</p>
        </div>

        <div className="walkthrough-steps">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`step-card ${step.type} ${expanded === i ? 'open' : ''}`}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="step-header">
                <div className="step-badge mono">{step.clueIndex === clues.length + 1 ? '★' : step.clueIndex}</div>
                <div className="step-conclusion mono">{step.conclusion}</div>
                {step.type === 'positive' && <CheckCircle size={16} className="step-icon pos" />}
                {step.type === 'negative' && <XCircle size={16} className="step-icon neg" />}
                {step.type === 'inference' && <ArrowRight size={16} className="step-icon inf" />}
                {expanded === i ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="step-body"
                  >
                    <p className="step-clue-text">"{step.clueText}"</p>
                    <p className="step-deduction">{step.deduction}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <button className="btn-modern" onClick={onClose} style={{ margin: '0 auto', display: 'block' }}>
          CLOSE
        </button>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .walkthrough-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.88);
          z-index: 2500;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          overflow-y: auto;
        }
        .walkthrough-modal {
          width: 100%; max-width: 680px;
          padding: 36px; border-radius: 12px;
          display: flex; flex-direction: column; gap: 24px;
          border: 1px solid var(--border-bright);
          max-height: 90vh; overflow-y: auto;
        }
        .walkthrough-header { text-align: center; }
        .walkthrough-header h2 { font-size: 1.4rem; letter-spacing: 4px; color: var(--accent-primary); }
        .walkthrough-sub { color: var(--text-dim); font-size: 0.85rem; margin-top: 8px; }

        .walkthrough-steps { display: flex; flex-direction: column; gap: 10px; }

        .step-card {
          border-radius: 8px; border: 1px solid var(--border-dim);
          background: rgba(255,255,255,0.02);
          cursor: pointer; transition: all 0.2s;
          overflow: hidden;
        }
        .step-card:hover { background: rgba(255,255,255,0.04); }
        .step-card.positive { border-left: 3px solid var(--accent-primary); }
        .step-card.negative { border-left: 3px solid var(--error); }
        .step-card.inference { border-left: 3px solid #ffd700; }

        .step-header {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 16px;
        }
        .step-badge {
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem; font-weight: 800; flex-shrink: 0;
        }
        .step-conclusion { flex: 1; font-size: 0.9rem; color: var(--text-main); }
        .step-icon.pos { color: var(--accent-primary); }
        .step-icon.neg { color: var(--error); }
        .step-icon.inf { color: #ffd700; }

        .step-body {
          padding: 0 16px 16px 56px;
          display: flex; flex-direction: column; gap: 10px;
          overflow: hidden;
        }
        .step-clue-text {
          font-style: italic; color: var(--text-dim);
          font-size: 0.85rem; border-left: 2px solid var(--border-dim);
          padding-left: 12px;
        }
        .step-deduction { color: var(--text-main); font-size: 0.9rem; line-height: 1.6; }
      `}} />
    </motion.div>
  );
};
