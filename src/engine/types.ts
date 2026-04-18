export type Difficulty = 'Cadet' | 'Sergeant' | 'Inspector' | 'Special Agent';

export type LogicState = {
  // sw[suspectIndex] = weaponIndex
  sw: number[];
  // wl[weaponIndex] = locationIndex
  wl: number[];
  // sl[suspectIndex] = locationIndex (derived: sl[i] = wl[sw[i]])
  sl: number[];
};

export type LogicVariable = 
  | { type: 'SW'; i: number; j: number } // Suspect i has Weapon j
  | { type: 'WL'; j: number; k: number } // Weapon j is at Location k
  | { type: 'SL'; i: number; k: number }; // Suspect i is at Location k

export type ClueType = 
  | 'DIRECT'            // S_i has W_j
  | 'NEGATIVE'          // S_i does not have W_j
  | 'TRANSITIVE'        // S_i was at L_k (implies SW_i_j AND WL_j_k)
  | 'LOCATION_WEAPON'   // W_j is at L_k
  | 'SUSPECT_LOCATION'; // S_i is at L_k

export type Clue = {
  id: string;
  type: ClueType;
  variables: LogicVariable[];
  isNegative: boolean;
  text: string;
  logicDisplay?: string;
};

// ── Suspect attributes ────────────────────────────────────────────
export interface SuspectDetails {
  backstory: string;
  height: string;           // e.g. "5ft 9in"
  sunSign: string;          // e.g. "Scorpio"
  eyeColor: string;         // e.g. "hazel"
  hairColor: string;        // e.g. "auburn"
  handedness: 'left-handed' | 'right-handed';
}

// ── Weapon attributes ─────────────────────────────────────────────
export interface WeaponDetails {
  description: string;      // Flavour text about the weapon
  weight: 'heavy' | 'medium' | 'light';
  madeOf: string;           // e.g. "stainless steel"
  locationClue: string;     // What trace evidence is left at the scene
}

// ── Location attributes ────────────────────────────────────────────
export interface LocationDetails {
  setting: 'indoor' | 'outdoor' | 'underground';
  descriptor: string;       // Short atmospheric note
  traceFeature: string;     // Unique environmental feature used in clues (e.g. "vines")
}

export type EntityDetails = SuspectDetails | WeaponDetails | LocationDetails;

export type AssetInfo = {
  name: string;
  icon: string;
  color?: string;
  details: SuspectDetails | WeaponDetails | LocationDetails;
};

export type NarrativeTemplate = {
  SW: { pos: string[]; neg: string[] };
  WL: { pos: string[]; neg: string[] };
  SL: { pos: string[]; neg: string[] };
};

export type ThemeDef = {
  suspects: AssetInfo[];
  weapons: AssetInfo[];
  locations: AssetInfo[];
  templates: NarrativeTemplate;
};

export type Puzzle = {
  seed: string;
  difficulty: Difficulty;
  size: number;
  solution: LogicState;
  clues: Clue[];
  suspects: AssetInfo[];
  weapons: AssetInfo[];
  locations: AssetInfo[];
  theme: string;
  murdererIdx: number;
};
