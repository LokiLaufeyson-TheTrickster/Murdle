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



export interface EntityDetails {
  backstory?: string;
  height?: string;
  profession?: string;
  trait?: string;
  type?: string;     // Heaviness, light, etc
  material?: string; // What it's made of (wax, steel, etc)
  setting?: string;  // Indoor/Outdoor
  feature?: string;  // Notable feature
}

export type AssetInfo = {
  name: string;
  icon: string;
  color?: string;
  details: EntityDetails;
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
};
