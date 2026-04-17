import { 
  User, Shield, Zap, Skull, Ghost, Box, Camera, Car, Coffee, Compass, Cpu, Crown, Eye, Feather, Fingerprint, Flame, Gift, GlassWater, Hammer, Heart, Key, Lightbulb, Lock, Map, Moon, Music, Package, PenTool, Phone, Rocket 
} from 'lucide-react';
import type { ThemeDef } from './types';

export const SUSPECT_ICONS: any = {
  User, Shield, Zap, Skull, Ghost, Box, Camera, Car, Coffee, Compass, Cpu, Crown, Eye, Feather, Fingerprint, Flame, Gift, GlassWater, Hammer, Heart, Key, Lightbulb, Lock, Map, Moon, Music, Package, PenTool, Phone, Rocket 
};

export const THEMES: Record<string, ThemeDef> = {
  Modern: {
    suspects: [
      { name: 'Victor Hale', icon: 'Crown', color: '#ff2d55', details: { backstory: 'A ruthless executive who built an empire on crushed competitors.', height: '6ft 1in', profession: 'Corporate Aristocrat', trait: 'Arrogant' } },
      { name: 'Dana Mercer', icon: 'Phone', color: '#00d2ff', details: { backstory: 'A nervous analyst who uncovered massive accounting fraud.', height: '5ft 8in', profession: 'Data Analyst', trait: 'Paranoid' } },
      { name: 'Rex Colton', icon: 'Shield', color: '#9aa0b0', details: { backstory: 'Ex-military, intensely loyal to the company paycheck.', height: '6ft 3in', profession: 'Head of Security', trait: 'Stoic' } },
      { name: 'Zara Novak', icon: 'Cpu', color: '#00ffa3', details: { backstory: 'Hired to penetration-test the network... or maybe more.', height: '5ft 6in', profession: 'Cyber Mercenary', trait: 'Cynical' } },
      { name: 'Marcus Bell', icon: 'Hammer', color: '#ff9500', details: { backstory: 'The person called when executive problems need quiet solutions.', height: '5ft 11in', profession: 'Crisis Manager', trait: 'Pragmatic' } },
      { name: 'Cleo Vance', icon: 'Camera', color: '#34c759', details: { backstory: 'Going undercover to expose the company shell companies.', height: '5ft 7in', profession: 'Investigative Reporter', trait: 'Inquisitive' } },
      { name: 'Elliot Marsh', icon: 'Eye', color: '#5856d6', details: { backstory: 'Looking for a missing heir linked to the corporation.', height: '6ft 0in', profession: 'Private Investigator', trait: 'Observant' } },
      { name: 'Owen Rast', icon: 'Ghost', color: '#8e8e93', details: { backstory: 'Fired last week without severance. Wants revenge.', height: '5ft 9in', profession: 'Disgruntled Engineer', trait: 'Angry' } },
      { name: 'Juno Park', icon: 'Package', color: '#ffcc00', details: { backstory: 'Delivers highly sensitive physical drops. Sees everything.', height: '5ft 10in', profession: 'Courier', trait: 'Silent' } },
      { name: 'Felix Crane', icon: 'Coffee', color: '#af52de', details: { backstory: 'Overworked, underpaid, and ready to snap at any moment.', height: '6ft 4in', profession: 'Software Architect', trait: 'Exhausted' } }
    ],
    weapons: [
      { name: 'Poisoned Coffee', icon: '☕', details: { type: 'Chemical', material: 'Liquid', feature: 'Smells faintly of almonds' } },
      { name: 'Kitchen Knife', icon: '🔪', details: { type: 'Blade', material: 'Stainless Steel', feature: 'Missing from the breakroom' } },
      { name: 'Suppressed Pistol', icon: '🔫', details: { type: 'Firearm', material: 'Polymer/Metal', feature: 'Ghost gun with filed serials' } },
      { name: 'Taser', icon: '⚡', details: { type: 'Electronic', material: 'Plastic', feature: 'High voltage limit removed' } },
      { name: 'Silk Tie', icon: '👔', details: { type: 'Garrote', material: 'Woven Silk', feature: 'Corporate monogrammed' } },
      { name: 'Golf Club', icon: '🏌️', details: { type: 'Blunt', material: 'Titanium', feature: 'Bent at a 45 degree angle' } },
      { name: 'USB Drive', icon: '💾', details: { type: 'Digital/Lethal', material: 'Metal', feature: 'Contains a lethal power-surge capacitor' } },
      { name: 'Letter Opener', icon: '🗡️', details: { type: 'Blade', material: 'Brass', feature: 'Stained with dark ink and blood' } },
      { name: 'Heavy Ashtray', icon: '🧱', details: { type: 'Blunt', material: 'Crystal', feature: 'Weighs over 5 pounds' } },
      { name: 'Broken Glass', icon: '🍷', details: { type: 'Improvised', material: 'Glass', feature: 'A shattered vintage wine bottle' } }
    ],
    locations: [
      { name: 'Corner Office', icon: '🏢', details: { setting: 'Indoor', feature: 'Panoramic city view, soundproofed doors' } },
      { name: 'Server Room', icon: '❄️', details: { setting: 'Indoor', feature: 'Freezing cold, deafening fan noise' } },
      { name: 'Underground Parking', icon: '🚗', details: { setting: 'Outdoor/Subterranean', feature: 'Flickering lights, blind spots everywhere' } },
      { name: 'Rooftop Garden', icon: '🌿', details: { setting: 'Outdoor', feature: 'High wind, isolated from the cameras' } },
      { name: 'Archive Room', icon: '📚', details: { setting: 'Indoor', feature: 'Dusty, maze-like, forgotten' } },
      { name: 'Maintenance Shaft', icon: '🔧', details: { setting: 'Indoor', feature: 'Claustrophobic, smells of oil' } },
      { name: 'Espresso Bar', icon: '☕', details: { setting: 'Indoor', feature: 'Currently abandoned, steam hissing' } },
      { name: 'Corporate Lobby', icon: '🏛️', details: { setting: 'Indoor', feature: 'Marble floors, echoing footsteps' } },
      { name: 'Restroom', icon: '🚻', details: { setting: 'Indoor', feature: 'Mirrors shattered, pristine white tiles' } },
      { name: 'Fire Escape', icon: '🪜', details: { setting: 'Outdoor', feature: 'Rusty, slippery in the rain' } }
    ],
    templates: { SW: { pos: [], neg: [] }, WL: { pos: [], neg: [] }, SL: { pos: [], neg: [] } }
  },
  Fantasy: {
    suspects: [
      { name: 'Mage Aldous', icon: 'Flame', color: '#ff2d55', details: { backstory: 'Master of the arcane, blinded by the pursuit of eternal life.', height: '6ft 2in', profession: 'Archmage', trait: 'Prideful' } },
      { name: 'Nyx Shadowblade', icon: 'Moon', color: '#8e8e93', details: { backstory: 'A silent shadow hired by the opposing kingdom.', height: '5ft 6in', profession: 'Shadowblade', trait: 'Lethal' } },
      { name: 'Faelar Greenshield', icon: 'Feather', color: '#34c759', details: { backstory: 'Protector of the ancient woods, despises city dwellers.', height: '6ft 5in', profession: 'Warden', trait: 'Aloof' } },
      { name: 'Thorin Ironfist', icon: 'Hammer', color: '#ff9500', details: { backstory: "Forged the King's crown, bitter about not being paid.", height: '4ft 5in', profession: 'Runesmith', trait: 'Grumpy' } },
      { name: 'King Alaric', icon: 'Crown', color: '#ffd700', details: { backstory: 'A paranoid monarch who sees treason in every shadow.', height: '5ft 10in', profession: 'Ruler', trait: 'Paranoid' } },
      { name: 'Gribble The Sly', icon: 'Package', color: '#5856d6', details: { backstory: 'Trades in cursed artifacts and illegal potions.', height: '3ft 8in', profession: 'Smuggler', trait: 'Greedy' } },
      { name: 'Puck Merryweather', icon: 'Music', color: '#ffcc00', details: { backstory: 'Hides dark secrets behind a painted smile and bells.', height: '5ft 7in', profession: 'Entertainer', trait: 'Two-faced' } },
      { name: 'Lord Malacor', icon: 'Skull', color: '#af52de', details: { backstory: 'Exiled from the academy for raising the dean from the dead.', height: '6ft 1in', profession: 'Death Weaver', trait: 'Morbid' } },
      { name: 'Sir Galahad', icon: 'Shield', color: '#00d2ff', details: { backstory: 'Sworn to absolute justice, even if it means execution.', height: '6ft 4in', profession: 'Crusader', trait: 'Zealous' } },
      { name: 'Lyra Heartstring', icon: 'PenTool', color: '#00ffa3', details: { backstory: 'A charming spy using songs to steal state secrets.', height: '5ft 9in', profession: 'Spy', trait: 'Charismatic' } }
    ],
    weapons: [
      { name: 'Poisoned Apple', icon: '🍎', details: { type: 'Consumable', material: 'Organic', feature: 'Deep crimson hue, smells of ash' } },
      { name: 'Broadsword', icon: '🗡️', details: { type: 'Blade', material: 'Valyrian Steel', feature: 'Runes glowing faintly along the edge' } },
      { name: 'Enchanted Bow', icon: '🏹', details: { type: 'Projectile', material: 'Ironwood', feature: 'Fires arrows of pure light' } },
      { name: 'Magic Staff', icon: '🪄', details: { type: 'Arcane Focus', material: 'Elderwood', feature: 'Crystal core is cracked and leaking mana' } },
      { name: 'Heavy Greataxe', icon: '🪓', details: { type: 'Blunt/Blade', material: 'Dwarven Iron', feature: 'Requires immense strength to lift' } },
      { name: 'Spellbook', icon: '📘', details: { type: 'Arcane', material: 'Dragon Leather', feature: 'Pages are burning with dark energy' } },
      { name: 'Potion of Death', icon: '🧪', details: { type: 'Chemical', material: 'Glass/Liquid', feature: 'Vial is cold to the touch' } },
      { name: 'Hidden Dagger', icon: '🔪', details: { type: 'Blade', material: 'Obsidian', feature: 'Coated in manticore venom' } },
      { name: 'Crossbow', icon: '🏹', details: { type: 'Mechanical', material: 'Oak & Steel', feature: 'String is drawn incredibly tight' } },
      { name: 'Dragon Tooth', icon: '🦴', details: { type: 'Improvised', material: 'Bone', feature: 'Serrated and unnaturally sharp' } }
    ],
    locations: [
      { name: 'Throne Room', icon: '🪑', details: { setting: 'Indoor', feature: 'Echoing halls, guarded continuously' } },
      { name: 'Wizard Tower', icon: '🗼', details: { setting: 'Indoor', feature: 'Filled with floating orbs and strange smells' } },
      { name: 'Dark Dungeon', icon: '⛓️', details: { setting: 'Underground', feature: 'Dank, screaming echoes in the distance' } },
      { name: 'Enchanted Forest', icon: '🌲', details: { setting: 'Outdoor', feature: 'Trees that shift when nobody is looking' } },
      { name: 'Local Tavern', icon: '🍺', details: { setting: 'Indoor', feature: 'Crowded, loud, smelling of stale ale' } },
      { name: 'Blacksmith Forge', icon: '⚒️', details: { setting: 'Indoor', feature: 'Blisteringly hot, blinding sparks' } },
      { name: 'Treasure Room', icon: '👑', details: { setting: 'Indoor', feature: 'Filled with gold, trapped floorboards' } },
      { name: 'Decrepit Graveyard', icon: '🪦', details: { setting: 'Outdoor', feature: 'Mist clinging to the ankles, restless spirits' } },
      { name: 'Magic Academy', icon: '🏫', details: { setting: 'Indoor', feature: 'Illusory walls and shifting staircases' } },
      { name: 'Dragon Cave', icon: '🐉', details: { setting: 'Outdoor/Cave', feature: 'Smells of sulfur and ash' } }
    ],
    templates: { SW: { pos: [], neg: [] }, WL: { pos: [], neg: [] }, SL: { pos: [], neg: [] } }
  },
  Noir: {
    suspects: [
      { name: 'Baron Blackwood', icon: 'User', color: '#2c3e50', details: { backstory: 'Old money patriarch clutching his inheritance.', height: '5ft 10in', profession: 'Aristocrat', trait: 'Greedy' } },
      { name: 'Madame Rose', icon: 'GlassWater', color: '#e74c3c', details: { backstory: 'A former opera singer with a scandalous past.', height: '5ft 6in', profession: 'Socialite', trait: 'Manipulative' } },
      { name: 'The Butler', icon: 'Shield', color: '#7f8c8d', details: { backstory: 'Served the family for 40 years, knows too much.', height: '6ft 0in', profession: 'Butler', trait: 'Loyal' } },
      { name: 'Inspector Graves', icon: 'Eye', color: '#95a5a6', details: { backstory: 'A tired detective who drinks to forget.', height: '6ft 2in', profession: 'Police Inspector', trait: 'Depressed' } },
      { name: 'Dolly Diamonds', icon: 'Gift', color: '#f1c40f', details: { backstory: 'A jazz singer who associates with dangerous men.', height: '5ft 5in', profession: 'Singer', trait: 'Ambitious' } },
      { name: 'Slick Vinnie', icon: 'Fingerprint', color: '#2ecc71', details: { backstory: 'A low-level mob enforcer trying to move up.', height: '5ft 9in', profession: 'Enforcer', trait: 'Violent' } },
      { name: 'Professor Plum', icon: 'Crown', color: '#8e44ad', details: { backstory: 'Academic stripped of his tenure for unethical experiments.', height: '5ft 8in', profession: 'Disgraced Academic', trait: 'Eccentric' } },
      { name: 'Silas Shadow', icon: 'Moon', color: '#34495e', details: { backstory: 'An informant who sells information to the highest bidder.', height: '5ft 7in', profession: 'Informant', trait: 'Cowardly' } },
      { name: 'Lady Scarlett', icon: 'Heart', color: '#e74c3c', details: { backstory: 'A widow mourning her third extremely wealthy husband.', height: '5ft 4in', profession: 'Black Widow', trait: 'Charming' } },
      { name: 'Private Eye Jack', icon: 'Map', color: '#34495e', details: { backstory: 'Down on his luck investigator operating out of a messy office.', height: '6ft 1in', profession: 'Private Investigator', trait: 'Cynical' } }
    ],
    weapons: [
      { name: 'Lead Pipe', icon: '🚰', details: { type: 'Blunt', material: 'Lead', feature: 'Rusted and exceptionally heavy' } },
      { name: 'Rusty Revolver', icon: '🔫', details: { type: 'Firearm', material: 'Iron', feature: 'Missing two bullets from the chamber' } },
      { name: 'Poison Vial', icon: '🧪', details: { type: 'Chemical', material: 'Glass', feature: 'Label is torn, smells of bitter almonds' } },
      { name: 'Dagger', icon: '🗡️', details: { type: 'Blade', material: 'Steel', feature: 'Ornate ivory handle' } },
      { name: 'Candlestick', icon: '🕯️', details: { type: 'Blunt', material: 'Brass', feature: 'Bent off-center from a heavy impact' } },
      { name: 'Wrench', icon: '🔧', details: { type: 'Blunt', material: 'Iron', feature: 'Covered in dark engine grease' } },
      { name: 'Rope', icon: '🧵', details: { type: 'Garrote', material: 'Hemp', feature: 'Frayed at both ends' } },
      { name: 'Cleaver', icon: '🔪', details: { type: 'Blade', material: 'Steel', feature: 'Recently sharpened but stained' } },
      { name: 'Sniper Rifle', icon: '🔭', details: { type: 'Firearm', material: 'Wood/Metal', feature: 'Smells of freshly fired gunpowder' } },
      { name: 'Letter Opener', icon: '🗡️', details: { type: 'Blade', material: 'Silver', feature: 'Engraved with family initials' } }
    ],
    locations: [
      { name: 'The Ballroom', icon: '💃', details: { setting: 'Indoor', feature: 'Chandeliers flickering ominously' } },
      { name: 'Library', icon: '📚', details: { setting: 'Indoor', feature: 'Secret bookcase door slightly ajar' } },
      { name: 'Conservatory', icon: '🌿', details: { setting: 'Indoor/Glass', feature: 'Humid, heavy smell of exotic orchids' } },
      { name: 'Billiard Room', icon: '🎱', details: { setting: 'Indoor', feature: 'Pool cues scattered, spilled scotch on the floor' } },
      { name: 'Dark Alley', icon: '🛣️', details: { setting: 'Outdoor', feature: 'Rain slicked cobblestones and overflowing bins' } },
      { name: 'Mansion Roof', icon: '🏠', details: { setting: 'Outdoor', feature: 'Slippery slate tiles, roaring thunder' } },
      { name: 'Wine Cellar', icon: '🍷', details: { setting: 'Underground', feature: 'Pitch black, cobwebs everywhere' } },
      { name: 'Kitchen', icon: '🍳', details: { setting: 'Indoor', feature: 'Knives missing from the butcher block' } },
      { name: 'Study', icon: '📖', details: { setting: 'Indoor', feature: 'A safe is cracked open behind a painting' } },
      { name: 'Secret Passage', icon: '🚪', details: { setting: 'Indoor', feature: 'Narrow, dusty, footprints on the floor' } }
    ],
    templates: { SW: { pos: [], neg: [] }, WL: { pos: [], neg: [] }, SL: { pos: [], neg: [] } }
  }
};

const setupMasterTemplates = () => {
  const S_W_POS = [
    "A witness saw {S} leave the scene clutching the {W}.",
    "{S}'s fingerprints were lifted clean off the {W}.",
    "Someone matching {S}'s description was seen buying the {W} that same morning.",
    "{S} had been spotted practicing with the {W} just days before.",
    "The {W} was registered in {S}'s name — no question about it.",
    "A note found near the body linked {S} directly to the {W}.",
    "{S} was overheard arguing about the {W} the night before.",
    "The {W} had gone missing from {S}'s quarters shortly before the murder.",
    "{S} was the only person present who had both motive and access to the {W}.",
    "A witness claims {S} was seen hiding the {W} under a coat."
  ];
  
  const S_W_NEG = [
    "{S} was nowhere near the {W} when the incident took place.",
    "Multiple people swear {S} never so much as touched the {W}.",
    "{S}'s hands were full — there's simply no way they could have carried the {W}.",
    "The {W} requires a strength or skill {S} clearly does not possess.",
    "{S} was seen miles away at the exact time the {W} was used.",
    "Not a single mark on the {W} could be traced back to {S}.",
    "{S} openly dismissed the {W} as beneath their style — witnesses agree.",
    "The {W} was locked in a room only certain people could access, and {S} wasn't one of them.",
    "{S} had no reason to ever handle the {W} and nothing suggests they did.",
    "Everyone at the scene confirmed {S} arrived empty-handed — no {W} in sight."
  ];

  const W_L_POS = [
    "The {W} was found hidden inside the {L}.",
    "Marks on the floor of the {L} matched the shape of the {W}.",
    "Someone was spotted carrying the {W} into the {L} earlier that evening.",
    "The {W} turned up during a search of the {L}.",
    "Dust patterns in the {L} suggest the {W} had been resting there a long while.",
    "The {W} was discovered underneath something in the {L}.",
    "The condition of the {W} matched the environment inside the {L}.",
    "A smear of something from the {W} was found on the wall of the {L}.",
    "The {W} and the damage in the {L} are consistent with each other.",
    "The {W} was tucked away in a corner of the {L}, partially concealed."
  ];

  const W_L_NEG = [
    "A thorough search of the {L} turned up no sign of the {W}.",
    "The {W} simply couldn't have fit through the entrance of the {L}.",
    "The {L} was checked thoroughly — the {W} was not there.",
    "No one could explain how the {W} might have gotten into the {L}.",
    "There's no evidence the {W} was ever brought near the {L}.",
    "The {L} showed no sign of the {W} — not even a scratch.",
    "The {W} was accounted for elsewhere long before anyone entered the {L}.",
    "Guards at the entrance to the {L} are certain the {W} never passed through.",
    "Someone who had been in the {L} all night never saw the {W} once.",
    "The {W} was found far from the {L} — it never made it there."
  ];

  const S_L_POS = [
    "A witness placed {S} inside the {L} around the time in question.",
    "{S} was seen entering the {L} and not returning for some time.",
    "Something belonging to {S} was found inside the {L}.",
    "Someone recognised {S} in the {L} — they weren't supposed to be there.",
    "{S} was known to frequent the {L} when they needed to be alone.",
    "A staff member saw {S} near the {L} shortly before the discovery.",
    "{S} had been asking about the {L} earlier in the day — which struck people as odd.",
    "The {L} showed signs of a recent visit, and {S} was the last known to be nearby.",
    "{S} was caught trying to leave the {L} through a side exit.",
    "Someone fitting {S}'s description was spotted lingering outside the {L}."
  ];

  const S_L_NEG = [
    "{S} has a solid alibi — they were nowhere near the {L}.",
    "Half a dozen people confirm {S} never went anywhere near the {L}.",
    "There's no plausible way {S} could have reached the {L} in time.",
    "{S} was seen heading in the opposite direction of the {L}.",
    "The {L} was somewhere {S} would never go — everyone who knows them agrees.",
    "{S} didn't even know the {L} existed, let alone how to get there.",
    "Someone was with {S} the entire evening — far from the {L}.",
    "Not a single trace of {S} was found in or around the {L}.",
    "{S} was already in custody before anyone went near the {L}.",
    "The {L} was locked tight, and {S} had no key."
  ];

  return { 
    SW: { pos: S_W_POS, neg: S_W_NEG }, 
    WL: { pos: W_L_POS, neg: W_L_NEG }, 
    SL: { pos: S_L_POS, neg: S_L_NEG } 
  };
};

const coreTemplates = setupMasterTemplates();

export function getNarrative(clue: any, suspects: any[], weapons: any[], locations: any[]): string {
  const { type, variables, isNegative } = clue;
  const v = variables[0];

  const getUniqueTrait = (obj: any, pool: any[], extractors: ((o: any) => string | null)[]) => {
    const shuffled = [...extractors].sort(() => Math.random() - 0.5);
    for (const ext of shuffled) {
      const myVal = ext(obj);
      if (!myVal) continue;
      const count = pool.filter(o => ext(o) === myVal).length;
      if (count === 1) return myVal;
    }
    return obj.name;
  };

  const getS = () => {
    const obj = suspects[v.i];
    if (!obj) return '';
    if (Math.random() < 0.4) return obj.name;
    return getUniqueTrait(obj, suspects, [
      o => o.details.height ? `individual exactly ${o.details.height} tall` : null,
      o => o.details.trait ? `notably ${o.details.trait.toLowerCase()} suspect` : null,
      o => o.details.profession ? `the ${o.details.profession.toLowerCase()}` : null
    ]);
  };

  const getW = () => {
    const obj = weapons[v.j];
    if (!obj) return '';
    if (Math.random() < 0.4) return obj.name;
    return getUniqueTrait(obj, weapons, [
      o => o.details.material ? `weapon constructed of ${o.details.material.toLowerCase()}` : null,
      o => o.details.type ? `item classified as ${o.details.type.toLowerCase()}` : null
    ]);
  };

  const getL = () => {
    const obj = locations[v.k];
    if (!obj) return '';
    if (Math.random() < 0.4) return obj.name;
    return getUniqueTrait(obj, locations, [
      o => o.details.setting ? `location described as ${o.details.setting.toLowerCase()}` : null
    ]);
  };

  const lookupType = type === 'NEGATIVE' ? 'DIRECT' : type;

  let pool: string[] = [];
  
  if (lookupType === 'DIRECT') pool = isNegative ? coreTemplates.SW.neg : coreTemplates.SW.pos;
  else if (lookupType === 'LOCATION_WEAPON') pool = isNegative ? coreTemplates.WL.neg : coreTemplates.WL.pos;
  else if (lookupType === 'SUSPECT_LOCATION') pool = isNegative ? coreTemplates.SL.neg : coreTemplates.SL.pos;

  if (!pool || pool.length === 0) return "Fragmented data: logical inconsistency detected.";

  const sentence = pool[Math.floor(Math.random() * pool.length)];

  const finalString = sentence
    .replace(/{S}/g, getS())
    .replace(/{W}/g, getW())
    .replace(/{L}/g, getL());
    
  return finalString.charAt(0).toUpperCase() + finalString.slice(1);
}
