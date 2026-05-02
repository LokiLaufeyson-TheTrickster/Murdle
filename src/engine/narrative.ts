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
  Knife: Sword, Bow: Target, Wand2: Wind
};

export const LOCATION_ICONS: any = {
  Building2, Server, ParkingSquare, Leaf, Archive, Settings, Coffee: CoffeeL, Landmark,
  Bath, Ladder, TreeDeciduous, Mountain, Castle, Ship, Tent, Library, ChefHat,
  Star, Wind, Anchor, Moon
};

export const PROFESSIONS: Record<string, string[]> = {
  "Tech Mogul": [
    "A self-proclaimed 'Titan of the Cloud' who spends 90% of their time manifesting synergy and the other 10% avoiding subpoena servers.",
    "Once attempted to disrupt the industry of breathing by patenting 'Air 2.0'. It failed, but they still charge a subscription fee for their presence.",
    "Claims their high-frequency trading algorithm is actually a sentient digital ghost named 'Barnaby'."
  ],
  "Security Consultant": [
    "A man who treats every revolving door like a high-stakes tactical breach and communicates exclusively in encryption-grade metaphors.",
    "Has successfully 'infiltrated' several birthday parties just to prove balloons are a liability.",
    "Wears three watches, all set to different time zones of people currently trying to sue him."
  ],
  "Lead Researcher": [
    "Dedicated their career to proving that subatomic particles have feelings. The particles remain indifferent, but the researcher is deeply offended.",
    "Often seen arguing with an empty centrifuge about the socioeconomic implications of cold fusion.",
    "Believes the laboratory mice are plotting a hostile takeover of the breakroom coffee machine."
  ],
  "PR Specialist": [
    "A master of 'perception management' who once convinced a small town that an industrial spill was actually a 'localized holographic rainbow experiment'.",
    "Can speak for forty minutes without using a single noun that isn't a brand name. Pure, distilled charisma and corporate static.",
    "Their smile is so perfectly symmetrical that it's frequently used by junior accountants to calibrate their rulers."
  ],
  "Investigative Journalist": [
    "Spends more time under floorboards than in their own apartment. Currently working on a Pulitzer-winning expose regarding missing office staplers.",
    "Has a collection of burner phones that they've named after characters from 1940s noir films.",
    "Known for 'deep cover' operations that mostly involve wearing a fake mustache and holding a very large fern."
  ],
  "System Architect": [
    "Built a server architecture so complex it allegedly began reciting poetry in archaic Latin during a stress test.",
    "Treats every lines of code like a fragile, temperamental orchid. Has recurring nightmares about a single missing semicolon.",
    "Convinced that the internet is just a series of very busy tubes managed by a cabal of highly educated pigeons."
  ],
  "Logistics Manager": [
    "Can move three tons of industrial glitter across international borders without alerting a single customs official. A master of the mundane shadow trade.",
    "Their personal calendar is a masterpiece of efficiency, scheduled down to the microsecond for maximum existential throughput.",
    "Believes that the shortest distance between two points is a well-placed bribe and a very fast delivery drone."
  ],
  "Audit Specialist": [
    "A human calculator with a grudge. They don't just find discrepancies; they hunt them with the quiet intensity of a coastal predator.",
    "Once audited their own childhood lemonade stand and found several counts of fruit-juice fraud. They still haven't forgiven their younger self.",
    "Views the world as a complex ledger where every interaction must be perfectly balanced, or someone gets a very sternly worded email."
  ],
  "Janitorial Lead": [
    "The undisputed ruler of the custodial arts. They see every scuff mark as a personal insult to the sanctity of the polished laminate.",
    "Quotes Nietzsche while buffing the floors, finding deep philosophical meaning in the constant struggle against dust and chaos.",
    "Rumored to have a secret map of the building's vents where they keep their 'special' extra-strength floor wax."
  ],
  "Executive Assistant": [
    "The invisible hand that actually runs the empire. They manage the CEO's calendar, ego, and occasionally, their sense of objective reality.",
    "Can schedule a four-way conference call across six dimensions while simultaneously filtering the boss's spam calls from 'The Void'.",
    "Carries a notepad filled with observations that could either collapse the company or start a very successful catering business."
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
        name: 'Poisoned Espresso', icon: 'Syringe', color: '#8B4513',
        details: {
          description: "A ridiculously overpriced triple-shot flat white, topped with artisanal foam and a dash of untraceable paralytic. It was almost too pretty to drink. Almost.",
          weight: 'light', madeOf: 'suspiciously bitter liquid in a gold-rimmed ceramic cup',
          locationClue: "a lingering aroma of roasted beans mixed with a sharp, medicinal tang"
        }
      },
      {
        name: 'Letter Opener', icon: 'Pen', color: '#B8860B',
        details: {
          description: "An antique brass instrument originally intended for opening bills, but it turns out it's quite efficient at closing accounts permanently.",
          weight: 'light', madeOf: 'hand-forged solid brass with an alarming point',
          locationClue: "a faint residue of vintage metal polish and a singular, sharp scratch"
        }
      },
      {
        name: 'USB Drive', icon: 'Usb', color: '#333399',
        details: {
          description: "Looking like a standard office-issue drive, this 'little helper' packs enough stored voltage to reboot a person instead of a computer.",
          weight: 'light', madeOf: 'brushed metal casing housing a lethal capacitor array',
          locationClue: "the faint scent of ionized air and a distinct, singular scorch mark"
        }
      },
      {
        name: 'Crystal Award', icon: 'Layers', color: '#88AACC',
        details: {
          description: "A 'Manager of the Year' trophy. Ironically, it has now become the tool used to ensure there won't be a next year for the recipient.",
          weight: 'heavy', madeOf: 'solid lead crystal with dangerously sharp aesthetic edges',
          locationClue: "a fine dusting of crystalline shimmer and a heavy indentation"
        }
      },
      {
        name: 'Seven-Iron', icon: 'Wrench', color: '#888877',
        details: {
          description: "A golf club that has seen better days and more violent swings. The shaft is bent into a shape that would make any pro golfer weep and any detective take notes.",
          weight: 'heavy', madeOf: 'aerospace-grade titanium with a suspiciously damp rubber grip',
          locationClue: "a crescent-shaped scuff and a few tiny fragments of rubber"
        }
      },
      {
        name: 'Silk Tie', icon: 'Shirt', color: '#8B0000',
        details: {
          description: "A 100% mulberry silk necktie that offers a luxurious feel and an even more luxurious lack of fingerprints. A silent, stylish farewell.",
          weight: 'light', madeOf: 'finely woven silk with reinforced double-stitching',
          locationClue: "a single, microscopic silk fiber caught on a jagged edge"
        }
      }
    ],
    locations: [
      {
        name: 'Corner Office', icon: 'Building2', color: '#334466',
        details: { setting: 'indoor', descriptor: "A glass-walled monument to corporate ego, offering a 360-degree view of things that shouldn't be happening.", traceFeature: "a fine layer of expensive dust disturbed on the mahogany desk" }
      },
      {
        name: 'Server Room', icon: 'Server', color: '#112233',
        details: { setting: 'indoor', descriptor: "A freezing digital forest where the only sound is the constant, judgmental hum of a million processors.", traceFeature: "a faint scuff on the anti-static floor tiles near the coolant intake" }
      },
      {
        name: 'Rooftop Garden', icon: 'Leaf', color: '#1a4a1a',
        details: { setting: 'outdoor', descriptor: "A patch of manicured nature perched dangerously high above the city, where the air is thin and the secrets are thick.", traceFeature: "a crushed exotic fern and several displaced decorative pebbles" }
      },
      {
        name: 'Underground Parking', icon: 'ParkingSquare', color: '#444444',
        details: { setting: 'underground', descriptor: "A bleak expanse of gray where the echoes never quite find a way out and the light is always flickering.", traceFeature: "a fresh oil drip and a singular, frantic scuff of a rubber sole" }
      },
      {
        name: 'Archive Room', icon: 'Archive', color: '#554433',
        details: { setting: 'indoor', descriptor: "A forgotten catacomb of paperwork where the past is shelved alphabetically and left to slowly disintegrate.", traceFeature: "a disturbed stack of folders and a lingering scent of old parchment" }
      }
    ],
    templates: { SW: { pos: [], neg: [] }, WL: { pos: [], neg: [] }, SL: { pos: [], neg: [] } }
  }
};

const setupMasterTemplates = () => {
  const S_W_POS = [
    "A witness observed {S} juggling the {W} with suspicious enthusiasm.",
    "A personal item belonging to {S} was found snagged on the {W}.",
    "According to a confidential informant, {S} was seen polishing the {W} just before the lights went out.",
    "Security footage clearly shows {S} skipping away from the scene, dropping the {W} into a nearby bin.",
    "The {W} was found wrapped in a handkerchief belonging to {S}.",
    "A trail of evidence points to {S} as the sole owner of the {W}.",
    "The peculiar weight associated with {S} matches the handling marks on the {W}.",
    "Records show {S} checked out the {W} from the central armory for 'personal research'.",
    "A local merchant recalls {S} complaining about the specific grip of the {W}.",
    "Thermal imaging detected {S}'s heat signature still lingering on the handle of the {W}."
  ];
  
  const S_W_NEG = [
    "Digital logs confirm {S} was nowhere near the {W} when it was activated.",
    "The forensic scan is absolute: not even a single skin cell from {S} is on the {W}.",
    "Witnesses are adamant that {S} was occupied elsewhere when the {W} was deployed.",
    "The {W} was locked in a reinforced vault that {S} lacked the biometric clearance for.",
    "A comprehensive sweep revealed zero physical contact between {S} and the {W}.",
    "Surprisingly, {S} seems to have a profound allergy to the material the {W} is made of.",
    "{S} was busy arguing with a vending machine while the {W} was being used elsewhere.",
    "The {W} was found in a pristine state, completely untouched by {S}.",
    "There is a documented restraining order between {S} and the {W}.",
    "A satellite scan places {S} in a completely different city from where the {W} was recovered."
  ];

  const W_L_POS = [
    "The {W} was discovered tucked behind a decorative planter in the {L}.",
    "Evidence of the {W} having been fired or used was found in the {L}.",
    "The {W} left a very distinctive, whimsical indentation on the floor of the {L}.",
    "A maintenance worker accidentally sat on the {W} while resting in the {L}.",
    "The {W} was found floating in an ornamental fountain within the {L}.",
    "Scraps of material from the {W} were found snagged on a door handle in the {L}.",
    "The {W} was recovered from an air vent deep within the {L}.",
    "Surveillance shows the {W} being spirited away into the shadows of the {L}.",
    "A singular, incriminating trace of the {W} was lifted from a surface in the {L}.",
    "The {W} was found abandoned right in the center of the {L}, as if for dramatic effect."
  ];

  const W_L_NEG = [
    "A team of expert bloodbounds failed to find any scent of the {W} in the {L}.",
    "The {W} is far too large to have ever fit through the narrow apertures of the {L}.",
    "The {L} was being monitored by high-frequency sonar, which detected no sign of the {W}.",
    "A thorough search of the {L} resulted in nothing but dust and disappointment; no {W} found.",
    "The {W} was strictly prohibited in the {L}, and the detectors confirm it stayed away.",
    "Not a single molecule associated with the {W} was recovered from the environment of the {L}.",
    "The {L} remained a {W}-free zone according to all available forensic records.",
    "The {W} was seen on camera leaving the building, far from the {L}.",
    "If the {W} was ever in the {L}, it left no more trace than a ghost in a blizzard.",
    "A sweep of the {L} only revealed some forgotten sandwiches, certainly no {W}."
  ];

  const S_L_POS = [
    "A disgruntled barista recalls serving a very nervous {S} in the {L}.",
    "A witness reported seeing {S} lurking near the entrance of the {L}.",
    "CCTV captured {S} doing what appeared to be a victory dance in the {L}.",
    "{S} left a personalized business card inside the {L} by mistake.",
    "A sample of DNA belonging to {S} was recovered from a discarded cup in the {L}.",
    "The unique scent of {S}'s cologne still lingers near the entrance of the {L}.",
    "{S} was seen on a high-speed transit log heading directly toward the {L}.",
    "A witness saw {S} attempting to hide behind a very small curtain in the {L}.",
    "Forensics found a fiber from {S}'s expensive scarf inside the {L}.",
    "{S} was observed lingering in the shadows of the {L} for over an hour."
  ];

  const S_L_NEG = [
    "{S} was busy hosting a live-streamed knitting workshop, far from the {L}.",
    "Electronic heart-rate monitors prove {S} stayed at home, miles away from the {L}.",
    "No prints, no scent, and no traces of {S} were found within the {L}.",
    "Witnesses place {S} at a nearby gala while the events in the {L} unfolded.",
    "The {L} was under lockdown, and {S} was confirmed to be on the outside.",
    "{S} has a documented phobia of the specific type of architecture found in the {L}.",
    "GPS data from {S}'s phone confirms they never entered the radius of the {L}.",
    "The security guard at the {L} is certain that {S} never passed their post.",
    "A spectral scan shows the {L} was empty of all human life, including {S}.",
    "There is absolutely no evidence placing {S} anywhere near the vicinity of the {L}."
  ];

  return { SW: { pos: S_W_POS, neg: S_W_NEG }, WL: { pos: W_L_POS, neg: W_L_NEG }, SL: { pos: S_L_POS, neg: S_L_NEG } };
};

const MASTER_TEMPLATES = setupMasterTemplates();

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
    // Fallback to name but ensure no "the" prefix for flexible insertion
    return obj.name;
  };

  const getS = () => {
    const obj = suspects[v.i];
    if (!obj) return '';
    if (Math.random() < 0.25) return obj.name;
    return getUniqueTrait(obj, suspects, [
      (o: any) => o.details.height ? `suspect standing ${o.details.height}` : null,
      (o: any) => o.details.eyeColor ? `suspect with ${o.details.eyeColor} eyes` : null,
      (o: any) => o.details.hairColor ? `individual with ${o.details.hairColor} hair` : null,
      (o: any) => o.details.profession ? `${o.details.profession}` : null,
      (o: any) => o.details.handedness ? `${o.details.handedness} suspect` : null,
    ]);
  };

  const getW = () => {
    const obj = weapons[v.j];
    if (!obj) return '';
    if (Math.random() < 0.45) return obj.name;
    return getUniqueTrait(obj, weapons, [
      (o: any) => o.details.weight ? `${o.details.weight}-weight weapon` : null,
      (o: any) => o.details.madeOf ? `instrument made of ${o.details.madeOf}` : null,
    ]);
  };

  const getL = () => {
    const obj = locations[v.k];
    if (!obj) return '';
    if (Math.random() < 0.65) return obj.name;
    return getUniqueTrait(obj, locations, [
      (o: any) => o.details.setting ? `${o.details.setting} area` : null,
      (o: any) => o.details.traceFeature ? `location containing ${o.details.traceFeature}` : null,
    ]);
  };

  const lookupType = type === 'NEGATIVE' ? 'DIRECT' : type;
  let pool: string[] = [];
  
  if (lookupType === 'DIRECT') pool = isNegative ? MASTER_TEMPLATES.SW.neg : MASTER_TEMPLATES.SW.pos;
  else if (lookupType === 'LOCATION_WEAPON') pool = isNegative ? MASTER_TEMPLATES.WL.neg : MASTER_TEMPLATES.WL.pos;
  else if (lookupType === 'SUSPECT_LOCATION') pool = isNegative ? MASTER_TEMPLATES.SL.neg : MASTER_TEMPLATES.SL.pos;

  if (!pool || pool.length === 0) return "The evidence is fragmented.";
  
  const sentenceTemplate = pool[Math.floor(Math.random() * pool.length)];
  
  // Clean up potential "double the" by checking the template and trait
  let final = sentenceTemplate
    .replace(/{S}/g, getS())
    .replace(/{W}/g, getW())
    .replace(/{L}/g, getL());
    
  // Sanitize "the the" or "The the" to just "the" or "The"
  final = final.replace(/[Tt]he [Tt]he/g, (match) => match.split(' ')[0]);
  
  return final;
}
