import {
  User, Shield, Zap, Skull, Ghost, Box, Camera, Car, Coffee, Compass, Cpu, Crown, Eye, Feather,
  Fingerprint, Flame, Gift, GlassWater, Hammer, Heart, Key, Lightbulb, Lock, Map, Moon, Music,
  Package, PenTool, Phone, Rocket,
  // Weapon icons
  Syringe, Sword, Crosshair, Zap as ZapW, Shirt, Wrench, Usb, Pen, Layers, Wine,
  Star, Axe, BookOpen, FlaskConical, Bone, Flame as FlameW,
  Pipette, Target, Wind, Scissors, Anchor, Dumbbell,
  // Location icons  
  Building2, Server, ParkingSquare, Leaf, Archive, Settings, Coffee as CoffeeL, Landmark,
  Bath, Loader as Ladder, TreeDeciduous, Mountain, Castle, Ship, Tent, Library, ChefHat
} from 'lucide-react';
import type { ThemeDef } from './types';

export const SUSPECT_ICONS: any = {
  User, Shield, Zap, Skull, Ghost, Box, Camera, Car, Coffee, Compass, Cpu, Crown, Eye, Feather,
  Fingerprint, Flame, Gift, GlassWater, Hammer, Heart, Key, Lightbulb, Lock, Map, Moon, Music,
  Package, PenTool, Phone, Rocket
};

export const WEAPON_ICONS: any = {
  Syringe, Sword, Crosshair, Shirt, Wrench, Usb, Pen, Layers, Wine, Star,
  Axe, BookOpen, FlaskConical, Bone, Pipette, Target, Wind,
  Scissors, Anchor, Dumbbell, Flame: FlameW, ZapW,
  // Aliases used in data
  Knife: Sword, Bow: Target, Wand2: Wind
};

export const LOCATION_ICONS: any = {
  Building2, Server, ParkingSquare, Leaf, Archive, Settings, Coffee: CoffeeL, Landmark,
  Bath, Ladder, TreeDeciduous, Mountain, Castle, Ship, Tent, Library, ChefHat,
  Star, Wind, Anchor, Moon
};

export const PROFESSIONS: Record<string, string[]> = {
  "Tech Mogul": [
    "Clawed their way to the top long before the company had a logo. Negotiated the original patents, pushed out three co-founders, and rewrote history in the annual reports.",
    "A self-proclaimed visionary who believes the rules of physics apply to others, but not to their disruptive startup.",
    "Known for 'move fast and break things', though lately, the things being broken are increasingly legal in nature."
  ],
  "Security Consultant": [
    "Three tours. Two commendations. One dishonorable discharge that somehow stayed off his record. Does not ask questions -- just stands where told and watches who moves.",
    "Specializes in 'physical penetration testing', which is a polite way of saying they get paid to break into secure vaults.",
    "Ex-intelligence officer who still scans every room for exits and cameras before sitting down."
  ],
  "Lead Researcher": [
    "Hired to find vulnerabilities. Found seventeen. After submitting the report, only eleven were patched. Kept the other six -- just in case.",
    "Obsessed with a project the board cancelled months ago. Still uses the lab after hours, claiming the data 'isn't finished with them yet'.",
    "Brilliant, erratic, and deeply suspicious of anyone who doesn't understand high-level quantum encryption."
  ],
  "PR Specialist": [
    "Gets called when headlines need to disappear. Once managed four simultaneous crises across three time zones before noon. Keeps a burner phone for personal use only.",
    "Can spin a disaster into a 'learning opportunity' with a single press release. Their smile never quite reaches their eyes.",
    "Knows exactly where the bodies are buried, mostly because they were the one who hired the shovel."
  ],
  "Investigative Journalist": [
    "Junior accounts manager cover fooled everyone for eight months. Real employer is a watchdog publication that hasn't lost a suit in twelve years. Records everything.",
    "Following a lead on a kickback scheme that leads straight to the executive floor. They aren't here for the networking.",
    "Has a reputation for never giving up on a story, even when it becomes dangerous to keep asking questions."
  ],
  "System Architect": [
    "Rewritten the authentication layer four times this year. Each time, something new breaks. Suspects it is not a coincidence. Suspects a lot of things.",
    "Remembers every line of code they've written since 2004. Remembers every person who tried to take credit for them, too.",
    "Often found talking to the servers as if they were children. Worressly, the servers seem to listen."
  ],
  "Logistics Manager": [
    "Deliveries are always on time and never traced. Clients pay a premium for that. They also pay to not ask what's in the other packages.",
    "Manages the flow of goods and people with mathematical precision. Any deviation from the schedule is an insult to their craft.",
    "Known for being able to procure anything from vintage wine to industrial-grade acid with six hours' notice."
  ],
  "Audit Specialist": [
    "Found the discrepancy buried in a 900-page audit by accident -- a single mismatched decimal. Told one person. The next morning their access badge stopped working.",
    "Lives for the thrill of a balanced ledger. They find numbers honest, unlike the people who report them.",
    "Has a photographic memory for tax codes and a very low tolerance for 'creative accounting'."
  ],
  "Janitorial Lead": [
    "People talk as if they aren't there. They've heard more secrets while emptying bins than the board has in ten years of meetings.",
    "Knows the building's layout better than the architects. Every secret passage and disabled camera is logged in their head.",
    "Always carries a heavy ring of keys and a spray bottle that smells more like industrial solvent than lemons."
  ],
  "Executive Assistant": [
    "Handles the schedule of a man who hasn't made his own coffee in a decade. They know his password, his mistress's phone number, and his true net worth.",
    "The gatekeeper. Nobody gets in or out without their approval. They are the most powerful person in the room that nobody looks at.",
    "Highly efficient, perfectly dressed, and currently carrying a letter that would end several careers if it were opened."
  ]
};

export const THEMES: Record<string, ThemeDef> = {
  Modern: {
    suspects: [
      {
        name: 'Victor Hale', icon: 'Crown', color: '#ff2d55',
        details: { profession: "Tech Mogul", backstory: "", gender: 'male', height: '6ft 1in', sunSign: 'Scorpio', eyeColor: 'grey-green', hairColor: 'silver', handedness: 'right-handed' }
      },
      {
        name: 'Dana Mercer', icon: 'Phone', color: '#00d2ff',
        details: { profession: "Audit Specialist", backstory: "", gender: 'female', height: '5ft 8in', sunSign: 'Virgo', eyeColor: 'brown', hairColor: 'dark brown', handedness: 'left-handed' }
      },
      {
        name: 'Rex Colton', icon: 'Shield', color: '#9aa0b0',
        details: { profession: "Security Consultant", backstory: "", gender: 'male', height: '6ft 3in', sunSign: 'Aries', eyeColor: 'steel blue', hairColor: 'black (buzzed)', handedness: 'right-handed' }
      },
      {
        name: 'Zara Novak', icon: 'Cpu', color: '#00ffa3',
        details: { profession: "Lead Researcher", backstory: "", gender: 'female', height: '5ft 6in', sunSign: 'Aquarius', eyeColor: 'green', hairColor: 'platinum blonde', handedness: 'left-handed' }
      },
      {
        name: 'Marcus Bell', icon: 'Hammer', color: '#ff9500',
        details: { profession: "PR Specialist", backstory: "", gender: 'male', height: '5ft 11in', sunSign: 'Sagittarius', eyeColor: 'amber', hairColor: 'chestnut', handedness: 'right-handed' }
      },
      {
        name: 'Cleo Vance', icon: 'Camera', color: '#34c759',
        details: { profession: "Investigative Journalist", backstory: "", gender: 'female', height: '5ft 7in', sunSign: 'Gemini', eyeColor: 'hazel', hairColor: 'auburn', handedness: 'right-handed' }
      },
      {
        name: 'Elliot Marsh', icon: 'Eye', color: '#5856d6',
        details: { profession: "Executive Assistant", backstory: "", gender: 'male', height: '6ft 0in', sunSign: 'Libra', eyeColor: 'pale blue', hairColor: 'dark grey', handedness: 'right-handed' }
      },
      {
        name: 'Owen Rast', icon: 'Ghost', color: '#8e8e93',
        details: { profession: "System Architect", backstory: "", gender: 'non-binary', height: '5ft 9in', sunSign: 'Cancer', eyeColor: 'brown', hairColor: 'disheveled auburn', handedness: 'left-handed' }
      },
      {
        name: 'Juno Park', icon: 'Package', color: '#ffcc00',
        details: { profession: "Logistics Manager", backstory: "", gender: 'female', height: '5ft 10in', sunSign: 'Taurus', eyeColor: 'dark brown', hairColor: 'jet black', handedness: 'right-handed' }
      },
      {
        name: 'Felix Crane', icon: 'Coffee', color: '#af52de',
        details: { profession: "Janitorial Lead", backstory: "", gender: 'male', height: '6ft 4in', sunSign: 'Pisces', eyeColor: 'grey', hairColor: 'unkempt brown', handedness: 'left-handed' }
      }
    ],
    weapons: [
      {
        name: 'Poisoned Coffee', icon: 'Syringe', color: '#8B4513',
        details: {
          description: "A perfectly brewed espresso laced with a fast-acting compound derived from bitter almonds. Odorless when hot, detectable only after the damage is done.",
          weight: 'light', madeOf: 'liquid compounds in a ceramic cup',
          locationClue: "a faint chemical residue and the scent of burnt almonds linger near the cup"
        }
      },
      {
        name: 'Kitchen Knife', icon: 'Knife', color: '#C0C0C0',
        details: {
          description: "A commercial-grade chef\'s knife taken from the breakroom. Eight inches of high-carbon stainless steel -- the kind that holds an edge and stays quiet.",
          weight: 'medium', madeOf: 'stainless steel with polymer grip',
          locationClue: "a thin smear of blood and a single steel shaving indicate where it rested"
        }
      },
      {
        name: 'Suppressed Pistol', icon: 'Target', color: '#555555',
        details: {
          description: "A ghost gun with filed serials and an aftermarket suppressor. Someone knew what they were doing -- there\'s no registration to trace and the slide shows professional cleaning.",
          weight: 'medium', madeOf: 'polymer frame with steel barrel',
          locationClue: "a faint smell of gunpowder solvent and a single brass casing rolled under the edge"
        }
      },
      {
        name: 'Stun Baton', icon: 'ZapW', color: '#FFD700',
        details: {
          description: "A modified taser baton with the voltage limiter bypassed. The kind of modification that\'s illegal in eleven countries and leaves no visible mark on the victim.",
          weight: 'light', madeOf: 'reinforced ABS plastic with lithium cell',
          locationClue: "a faint ozone smell and scorch-mark on the floor reveal where it discharged"
        }
      },
      {
        name: 'Silk Garrote', icon: 'Shirt', color: '#8B0000',
        details: {
          description: "What looks like a high-end necktie from the right angle. What it actually is requires getting considerably closer. Monogrammed initials on the inside panel.",
          weight: 'light', madeOf: 'woven silk cord',
          locationClue: "a single silk thread caught on the door frame marks exactly where it was used"
        }
      },
      {
        name: 'Titanium Driver', icon: 'Wrench', color: '#888877',
        details: {
          description: "A top-of-the-line golf driver, now bent at a violent angle. Whoever swung it wasn\'t keeping score. The grip tape still carries the ghost of a handprint.",
          weight: 'heavy', madeOf: 'aerospace-grade titanium with rubber grip',
          locationClue: "a deep crescent-shaped dent in the surface and some rubber grip residue remain"
        }
      },
      {
        name: 'USB Kill Stick', icon: 'Usb', color: '#333399',
        details: {
          description: "Disguised as a standard flash drive, this device conceals a capacitor that discharges 300V when plugged in. Whoever built this knew their electronics intimately.",
          weight: 'light', madeOf: 'metal casing with lethal capacitor array',
          locationClue: "a scorched USB port and melted plastic marks the exact socket it was plugged into"
        }
      },
      {
        name: 'Brass Letter Opener', icon: 'Pen', color: '#B8860B',
        details: {
          description: "An antique letter opener -- pointed, heavy, and kept razor-sharp. It lives on every executive desk. It should not be on a crime scene.",
          weight: 'light', madeOf: 'solid brass',
          locationClue: "a dark smear of old brass polish left a streak where it was wiped clean"
        }
      },
      {
        name: 'Crystal Ashtray', icon: 'Layers', color: '#88AACC',
        details: {
          description: "A collectors item. Lead crystal, hand-cut, weighing just over two kilograms. After tonight, it is evidence.",
          weight: 'heavy', madeOf: 'lead crystal glass',
          locationClue: "fine crystal powder and a crescent shard mark the impact point precisely"
        }
      },
      {
        name: 'Shattered Wine Bottle', icon: 'Wine', color: '#722F37',
        details: {
          description: "A vintage bottle of something expensive, now simply a weapon. The label is from a private estate. The jagged break is forensically consistent with a deliberate strike.",
          weight: 'medium', madeOf: 'thick glass, partially filled',
          locationClue: "a red wine stain spreading from shards of dark glass still wet at the edges"
        }
      }
    ],
    locations: [
      {
        name: 'Corner Office', icon: 'Building2', color: '#334466',
        details: { setting: 'indoor', descriptor: "Panoramic glass office on the 40th floor.", traceFeature: "a fine layer of dust disturbed on the mahogany desk surface" }
      },
      {
        name: 'Server Room', icon: 'Server', color: '#112233',
        details: { setting: 'indoor', descriptor: "Freezing cold and deafeningly loud.", traceFeature: "a scuff mark on the raised floor tiles near the access terminal" }
      },
      {
        name: 'Underground Parking', icon: 'ParkingSquare', color: '#444444',
        details: { setting: 'outdoor', descriptor: "Level B3. Flickering fluorescents.", traceFeature: "a fresh tire-rubber smear on the concrete where someone backed in quickly" }
      },
      {
        name: 'Rooftop Garden', icon: 'Leaf', color: '#1a4a1a',
        details: { setting: 'outdoor', descriptor: "Forty stories up, above the cameras.", traceFeature: "trampled soil and a torn leaf near the planter where someone crouched" }
      },
      {
        name: 'Archive Room', icon: 'Archive', color: '#554433',
        details: { setting: 'indoor', descriptor: "A forgotten labyrinth of filing cabinets.", traceFeature: "a displaced stack of folders and dusty footprints on the tile floor" }
      },
      {
        name: 'Maintenance Shaft', icon: 'Settings', color: '#333333',
        details: { setting: 'indoor', descriptor: "Claustrophobic and reeking of machine oil.", traceFeature: "oil residue on the hatch frame and a smeared handprint on the metal ladder" }
      },
      {
        name: 'Espresso Bar', icon: 'Coffee', color: '#4a2c0a',
        details: { setting: 'indoor', descriptor: "Office espresso bar, abandoned mid-afternoon.", traceFeature: "a still-warm cup and a spilled coffee ring on the marble counter" }
      },
      {
        name: 'Corporate Lobby', icon: 'Landmark', color: '#223355',
        details: { setting: 'indoor', descriptor: "Marble floors that echo every footstep.", traceFeature: "a scuff on the polished marble and a disturbed floral arrangement near the pillar" }
      },
      {
        name: 'Executive Restroom', icon: 'Bath', color: '#112233',
        details: { setting: 'indoor', descriptor: "Alabaster tiles and shattered glass.", traceFeature: "mirror fragments swept to one side and a damp towel dropped behind the door" }
      },
      {
        name: 'Fire Escape', icon: 'Ladder', color: '#5a3000',
        details: { setting: 'outdoor', descriptor: "Rusted iron stairs slick with drizzle.", traceFeature: "orange rust flakes disturbed on the grating and a wet bootprint on the landing" }
      }
    ],
    templates: { SW: { pos: [], neg: [] }, WL: { pos: [], neg: [] }, SL: { pos: [], neg: [] } }
  },
  Fantasy: {
    suspects: [
      {
        name: 'Mage Aldous', icon: 'Flame', color: '#ff2d55',
        details: { profession: "Lead Researcher", backstory: "", gender: 'male', height: '6ft 2in', sunSign: 'Scorpio', eyeColor: 'amber', hairColor: 'white and wild', handedness: 'right-handed' }
      },
      {
        name: 'Nyx Shadowblade', icon: 'Moon', color: '#8e8e93',
        details: { profession: "Security Consultant", backstory: "", gender: 'female', height: '5ft 6in', sunSign: 'Capricorn', eyeColor: 'violet', hairColor: 'ink black', handedness: 'left-handed' }
      },
      {
        name: 'Faelar Greenshield', icon: 'Feather', color: '#34c759',
        details: { profession: "Logistics Manager", backstory: "", gender: 'non-binary', height: '6ft 5in', sunSign: 'Taurus', eyeColor: 'leaf green', hairColor: 'copper brown', handedness: 'right-handed' }
      },
      {
        name: 'Thorin Ironfist', icon: 'Hammer', color: '#ff9500',
        details: { profession: "PR Specialist", backstory: "", gender: 'male', height: '4ft 5in', sunSign: 'Virgo', eyeColor: 'coal black', hairColor: 'braided red', handedness: 'right-handed' }
      },
      {
        name: 'King Alaric', icon: 'Crown', color: '#ffd700',
        details: { profession: "Tech Mogul", backstory: "", gender: 'male', height: '5ft 10in', sunSign: 'Leo', eyeColor: 'cold grey', hairColor: 'blond going grey', handedness: 'right-handed' }
      },
      {
        name: 'Gribble The Sly', icon: 'Package', color: '#5856d6',
        details: { profession: "Investigative Journalist", backstory: "", gender: 'male', height: '3ft 8in', sunSign: 'Gemini', eyeColor: 'yellow', hairColor: 'patchy grey', handedness: 'left-handed' }
      },
      {
        name: 'Puck Merryweather', icon: 'Music', color: '#ffcc00',
        details: { profession: "Executive Assistant", backstory: "", gender: 'male', height: '5ft 7in', sunSign: 'Libra', eyeColor: 'bright blue', hairColor: 'flame-red curls', handedness: 'left-handed' }
      },
      {
        name: 'Lord Malacor', icon: 'Skull', color: '#af52de',
        details: { profession: "Audit Specialist", backstory: "", gender: 'non-binary', height: '6ft 1in', sunSign: 'Aquarius', eyeColor: 'bone white', hairColor: 'none', handedness: 'left-handed' }
      },
      {
        name: 'Sir Galahad', icon: 'Shield', color: '#00d2ff',
        details: { profession: "Security Consultant", backstory: "", gender: 'male', height: '6ft 4in', sunSign: 'Aries', eyeColor: 'pale blue', hairColor: 'golden', handedness: 'right-handed' }
      },
      {
        name: 'Lyra Heartstring', icon: 'PenTool', color: '#00ffa3',
        details: { profession: "PR Specialist", backstory: "", gender: 'female', height: '5ft 9in', sunSign: 'Pisces', eyeColor: 'sea green', hairColor: 'silver-auburn', handedness: 'right-handed' }
      }
    ],
    weapons: [
      { name: 'Poisoned Apple', icon: 'Pipette', color: '#cc2200', details: { description: "Crimson and perfect.", weight: 'light', madeOf: 'enchanted organic matter', locationClue: "crimson apple core" } },
      { name: 'Runed Broadsword', icon: 'Sword', color: '#aaaacc', details: { description: "Ancient and pulsing.", weight: 'heavy', madeOf: 'Valyrian alloy', locationClue: "glowing rune impression" } },
      { name: 'Enchanted Bow', icon: 'Target', color: '#cc8800', details: { description: "Carved from Ironwood.", weight: 'medium', madeOf: 'Ironwood', locationClue: "white feather" } },
      { name: 'Cracked Magic Staff', icon: 'Wind', color: '#8855ff', details: { description: "Mana-leaking staff.", weight: 'medium', madeOf: 'Elderwood', locationClue: "wisps of mana" } },
      { name: 'Dwarven Greataxe', icon: 'Axe', color: '#886633', details: { description: "Built for a chieftain.", weight: 'heavy', madeOf: "Dwarven iron", locationClue: "deep axe gouges" } },
      { name: 'Forbidden Spellbook', icon: 'BookOpen', color: '#330066', details: { description: "Actively burning pages.", weight: 'medium', madeOf: 'dragon leather', locationClue: "black smoke residue" } },
      { name: 'Vial of Nightshade', icon: 'FlaskConical', color: '#004444', details: { description: "Concentrated venom.", weight: 'light', madeOf: 'glass', locationClue: "ring of frost" } },
      { name: 'Obsidian Dagger', icon: 'Knife', color: '#111111', details: { description: "Volcanic glass blade.", weight: 'light', madeOf: 'obsidian', locationClue: "obsidian shards" } },
      { name: 'War Crossbow', icon: 'Crosshair', color: '#664422', details: { description: "Steel-prod crossbow.", weight: 'heavy', madeOf: 'oak and steel', locationClue: "embedded bolt" } },
      { name: 'Dragon Tooth Shard', icon: 'Bone', color: '#ccaa44', details: { description: "Elder dragon fragment.", weight: 'light', madeOf: 'fossilized bone', locationClue: "amber glow" } }
    ],
    locations: [
      { name: 'Throne Room', icon: 'Castle', color: '#332200', details: { setting: 'indoor', descriptor: "Marble halls.", traceFeature: "displaced ceremonial standard" } },
      { name: 'Wizard Tower', icon: 'Wind', color: '#110033', details: { setting: 'indoor', descriptor: "Floating orbs.", traceFeature: "disturbed magical glyph" } },
      { name: 'Dark Dungeon', icon: 'Anchor', color: '#111111', details: { setting: 'underground', descriptor: "Damp stone.", traceFeature: "disturbed chain links" } },
      { name: 'Enchanted Forest', icon: 'TreeDeciduous', color: '#0a3300', details: { setting: 'outdoor', descriptor: "Rearrange themselves.", traceFeature: "broken vines" } },
      { name: 'Local Tavern', icon: 'Coffee', color: '#332200', details: { setting: 'indoor', descriptor: "Smoky and loud.", traceFeature: "overturned stool" } },
      { name: 'Blacksmith Forge', icon: 'Dumbbell', color: '#330000', details: { setting: 'indoor', descriptor: "Blistering heat.", traceFeature: "fresh hammer marks" } },
      { name: 'Treasure Vault', icon: 'Star', color: '#553300', details: { setting: 'indoor', descriptor: "Gold stacked high.", traceFeature: "sprung floor tile" } },
      { name: 'Decrepit Graveyard', icon: 'Moon', color: '#112211', details: { setting: 'outdoor', descriptor: "Mist clings low.", traceFeature: "freshly turned earth" } },
      { name: 'Magic Academy', icon: 'BookOpen', color: '#221133', details: { setting: 'indoor', descriptor: "Shifting stairs.", traceFeature: "illusory sparks" } },
      { name: 'Dragon Cave', icon: 'Mountain', color: '#221100', details: { setting: 'outdoor', descriptor: "Sulphurous fumes.", traceFeature: "sulfur residue" } }
    ],
    templates: { SW: { pos: [], neg: [] }, WL: { pos: [], neg: [] }, SL: { pos: [], neg: [] } }
  }
};

const setupMasterTemplates = () => {
  const S_W_POS = [
    "A witness saw {S} leaving the scene with the {W} concealed beneath their coat.",
    "A clean set of fingerprints matching {S} was lifted off the handle of the {W}.",
    "According to the forensics team, {S}'s fingerprints were the only ones present on the {W}.",
    "Someone matching {S}'s description was seen purchasing the {W} that same morning.",
    "{S} had been observed handling the {W} on multiple occasions.",
    "The {W} was found registered to {S}.",
    "A note recovered near the body linked {S} directly to the {W}."
  ];
  
  const S_W_NEG = [
    "{S} was nowhere near the {W} when the incident occurred.",
    "The forensics report is conclusive: no fingerprints from {S} were found on the {W}.",
    "Multiple witnesses are consistent: {S} never once touched the {W}.",
    "The {W} was locked in a location {S} had no access credentials for."
  ];

  const W_L_POS = [
    "The {W} was discovered concealed inside the {L}.",
    "Marks consistent with the {W} were found on the floor of the {L}.",
    "The {W} turned up during a methodical search of the {L}.",
    "Material from the {W} was found smeared along the wall inside the {L}."
  ];

  const W_L_NEG = [
    "A thorough search of the {L} produced no sign whatsoever of the {W}.",
    "The {W} could not have been brought through the entrance of the {L} unnoticed.",
    "The {L} showed no trace of the {W}. Not so much as a scratch."
  ];

  const S_L_POS = [
    "A witness positively placed {S} inside the {L} around the time in question.",
    "A muddy shoeprint matching {S}'s boots was found on the floor of the {L}.",
    "Forensics recovered a partial shoeprint in the {L} that matches {S}.",
    "{S} was seen entering the {L} and did not emerge for some time.",
    "Something belonging to {S} was recovered from inside the {L}."
  ];

  const S_L_NEG = [
    "{S} has a solid alibi -- they were demonstrably nowhere near the {L}.",
    "No shoeprints matching {S} were found anywhere in the vicinity of the {L}.",
    "Everyone who knows {S} agrees -- the {L} is somewhere they would never go.",
    "No trace of {S} was found anywhere in or around the {L}."
  ];

  return { SW: { pos: S_W_POS, neg: S_W_NEG }, WL: { pos: W_L_POS, neg: W_L_NEG }, SL: { pos: S_L_POS, neg: S_L_NEG } };
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
      if (count >= 1 && count <= 3) return myVal;
    }
    return obj.name;
  };

  const getS = () => {
    const obj = suspects[v.i];
    if (!obj) return '';
    if (Math.random() < 0.3) return obj.name;
    return getUniqueTrait(obj, suspects, [
      (o: any) => o.details.height ? `the suspect standing ${o.details.height}` : null,
      (o: any) => o.details.eyeColor ? `the suspect with ${o.details.eyeColor} eyes` : null,
      (o: any) => o.details.hairColor ? `the individual with ${o.details.hairColor} hair` : null,
      (o: any) => o.details.profession ? `the ${o.details.profession}` : null,
      (o: any) => o.details.handedness ? `the ${o.details.handedness} suspect` : null,
    ]);
  };

  const getW = () => {
    const obj = weapons[v.j];
    if (!obj) return '';
    if (Math.random() < 0.5) return obj.name;
    return getUniqueTrait(obj, weapons, [
      (o: any) => o.details.weight ? `the ${o.details.weight}-weight weapon` : null,
      (o: any) => o.details.madeOf ? `the instrument made of ${o.details.madeOf}` : null,
    ]);
  };

  const getL = () => {
    const obj = locations[v.k];
    if (!obj) return '';
    if (Math.random() < 0.7) return obj.name;
    return getUniqueTrait(obj, locations, [
      (o: any) => o.details.setting ? `the ${o.details.setting} area` : null,
      (o: any) => o.details.traceFeature ? `the location where ${o.details.traceFeature}` : null,
    ]);
  };

  const lookupType = type === 'NEGATIVE' ? 'DIRECT' : type;
  let pool: string[] = [];
  if (lookupType === 'DIRECT') pool = isNegative ? coreTemplates.SW.neg : coreTemplates.SW.pos;
  else if (lookupType === 'LOCATION_WEAPON') pool = isNegative ? coreTemplates.WL.neg : coreTemplates.WL.pos;
  else if (lookupType === 'SUSPECT_LOCATION') pool = isNegative ? coreTemplates.SL.neg : coreTemplates.SL.pos;

  if (!pool || pool.length === 0) return "The evidence is fragmented.";
  const sentence = pool[Math.floor(Math.random() * pool.length)];
  return sentence.replace(/{S}/g, getS()).replace(/{W}/g, getW()).replace(/{L}/g, getL());
}
