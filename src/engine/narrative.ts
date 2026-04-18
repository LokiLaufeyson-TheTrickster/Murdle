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
  Bath, Ladder, TreeDeciduous, Mountain, Castle, Ship, Tent, Library, ChefHat
};

export const THEMES: Record<string, ThemeDef> = {
  Modern: {
    suspects: [
      {
        name: 'Victor Hale', icon: 'Crown', color: '#ff2d55',
        details: {
          backstory: "Victor clawed his way to the top long before the company had a logo. He negotiated the original patents, pushed out three co-founders, and rewrote history in the annual reports. Rumor has it his penthouse has a framed photo of every enemy he outlasted.",
          height: '6ft 1in', sunSign: 'Scorpio', eyeColor: 'grey-green', hairColor: 'silver', handedness: 'right-handed'
        }
      },
      {
        name: 'Dana Mercer', icon: 'Phone', color: '#00d2ff',
        details: {
          backstory: "Dana found the discrepancy buried in a 900-page audit by accident -- a single mismatched decimal. She told one person. The next morning her access badge stopped working. She has not slept well since.",
          height: '5ft 8in', sunSign: 'Virgo', eyeColor: 'brown', hairColor: 'dark brown', handedness: 'left-handed'
        }
      },
      {
        name: 'Rex Colton', icon: 'Shield', color: '#9aa0b0',
        details: {
          backstory: "Three tours. Two commendations. One dishonorable discharge that somehow stayed off his record. Rex does not ask questions -- he just stands where he is told and watches who moves.",
          height: '6ft 3in', sunSign: 'Aries', eyeColor: 'steel blue', hairColor: 'black (buzzed)', handedness: 'right-handed'
        }
      },
      {
        name: 'Zara Novak', icon: 'Cpu', color: '#00ffa3',
        details: {
          backstory: "Zara was hired to find vulnerabilities. She found seventeen. After submitting the report, only eleven were patched. She kept the other six to herself -- just in case.",
          height: '5ft 6in', sunSign: 'Aquarius', eyeColor: 'green', hairColor: 'platinum blonde', handedness: 'left-handed'
        }
      },
      {
        name: 'Marcus Bell', icon: 'Hammer', color: '#ff9500',
        details: {
          backstory: "Marcus gets called when headlines need to disappear. He once managed four simultaneous PR crises across three time zones before noon. He keeps a burner phone for personal use only.",
          height: '5ft 11in', sunSign: 'Sagittarius', eyeColor: 'amber', hairColor: 'chestnut', handedness: 'right-handed'
        }
      },
      {
        name: 'Cleo Vance', icon: 'Camera', color: '#34c759',
        details: {
          backstory: "Cleo's cover as 'junior accounts manager' fooled everyone for eight months. Her real employer is a watchdog publication that hasn't lost a defamation suit in twelve years. She records everything.",
          height: '5ft 7in', sunSign: 'Gemini', eyeColor: 'hazel', hairColor: 'auburn', handedness: 'right-handed'
        }
      },
      {
        name: 'Elliot Marsh', icon: 'Eye', color: '#5856d6',
        details: {
          backstory: "Elliot's been looking for the missing heir of the Carmichael estate for six months. The trail led here. He won't say how much he's being paid, but his shoes cost more than most rent checks.",
          height: '6ft 0in', sunSign: 'Libra', eyeColor: 'pale blue', hairColor: 'dark grey', handedness: 'right-handed'
        }
      },
      {
        name: 'Owen Rast', icon: 'Ghost', color: '#8e8e93',
        details: {
          backstory: "Owen gave the company seven years and three failed relationships. They returned the favor with a termination notice slid under his door on a Friday. He still has his keycard. Nobody noticed.",
          height: '5ft 9in', sunSign: 'Cancer', eyeColor: 'brown', hairColor: 'disheveled auburn', handedness: 'left-handed'
        }
      },
      {
        name: 'Juno Park', icon: 'Package', color: '#ffcc00',
        details: {
          backstory: "Juno's deliveries are always on time and never traced. Clients pay a premium for that. They also pay to not ask what's in the other packages she sometimes carries alongside their items.",
          height: '5ft 10in', sunSign: 'Taurus', eyeColor: 'dark brown', hairColor: 'jet black', handedness: 'right-handed'
        }
      },
      {
        name: 'Felix Crane', icon: 'Coffee', color: '#af52de',
        details: {
          backstory: "Felix has rewritten the authentication layer four times this year. Each time, something new breaks. He suspects it is not a coincidence. He suspects a lot of things.",
          height: '6ft 4in', sunSign: 'Pisces', eyeColor: 'grey', hairColor: 'unkempt brown', handedness: 'left-handed'
        }
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
        details: {
          setting: 'indoor', descriptor: "A panoramic glass office on the 40th floor. Soundproofed doors, no cameras inside. A fine layer of dust is disturbed on the mahogany desk surface.",
          traceFeature: "a fine layer of dust disturbed on the mahogany desk surface"
        }
      },
      {
        name: 'Server Room', icon: 'Server', color: '#112233',
        details: {
          setting: 'indoor', descriptor: "Freezing cold and deafeningly loud. The hum of spinning drives masks any sound. A scuff mark is visible on the raised floor tiles near the access terminal.",
          traceFeature: "a scuff mark on the raised floor tiles near the access terminal"
        }
      },
      {
        name: 'Underground Parking', icon: 'ParkingSquare', color: '#444444',
        details: {
          setting: 'outdoor', descriptor: "Level B3. Flickering fluorescents and oil-slicked concrete. A fresh tire-rubber smear marks where someone backed in quickly.",
          traceFeature: "a fresh tire-rubber smear on the concrete where someone backed in quickly"
        }
      },
      {
        name: 'Rooftop Garden', icon: 'Leaf', color: '#1a4a1a',
        details: {
          setting: 'outdoor', descriptor: "Forty stories up, above the cameras. The only sound is wind. Trampled soil and a torn leaf near the planter suggest someone crouched here.",
          traceFeature: "trampled soil and a torn leaf near the planter where someone crouched"
        }
      },
      {
        name: 'Archive Room', icon: 'Archive', color: '#554433',
        details: {
          setting: 'indoor', descriptor: "A forgotten labyrinth of filing cabinets. A displaced stack of folders and dusty footprints remain on the tile floor.",
          traceFeature: "a displaced stack of folders and dusty footprints on the tile floor"
        }
      },
      {
        name: 'Maintenance Shaft', icon: 'Settings', color: '#333333',
        details: {
          setting: 'indoor', descriptor: "Claustrophobic and reeking of machine oil. Oil residue on the hatch frame and a smeared handprint on the metal ladder mark a forced entry.",
          traceFeature: "oil residue on the hatch frame and a smeared handprint on the metal ladder"
        }
      },
      {
        name: 'Espresso Bar', icon: 'Coffee', color: '#4a2c0a',
        details: {
          setting: 'indoor', descriptor: "The office espresso bar, abandoned mid-afternoon. A still-warm cup and a spilled coffee ring linger on the marble counter.",
          traceFeature: "a still-warm cup and a spilled coffee ring on the marble counter"
        }
      },
      {
        name: 'Corporate Lobby', icon: 'Landmark', color: '#223355',
        details: {
          setting: 'indoor', descriptor: "Marble floors that echo every footstep. A scuff on the polished marble and a disturbed floral arrangement near the pillar are the only signs of struggle.",
          traceFeature: "a scuff on the polished marble and a disturbed floral arrangement near the pillar"
        }
      },
      {
        name: 'Executive Restroom', icon: 'Bath', color: '#112233',
        details: {
          setting: 'indoor', descriptor: "Alabaster tiles and shattered glass. Mirror fragments swept to one side and a damp towel dropped behind the door reveal a hasty cleanup.",
          traceFeature: "mirror fragments swept to one side and a damp towel dropped behind the door"
        }
      },
      {
        name: 'Fire Escape', icon: 'Ladder', color: '#5a3000',
        details: {
          setting: 'outdoor', descriptor: "Rusted iron stairs slick with drizzle. Orange rust flakes and a wet bootprint on the landing mark exactly where they passed through.",
          traceFeature: "orange rust flakes disturbed on the grating and a wet bootprint on the landing"
        }
      }
    ],
    templates: { SW: { pos: [], neg: [] }, WL: { pos: [], neg: [] }, SL: { pos: [], neg: [] } }
  },

  Fantasy: {
    suspects: [
      {
        name: 'Mage Aldous', icon: 'Flame', color: '#ff2d55',
        details: {
          backstory: "Aldous has spent four decades in pursuit of a spell that reverses death. The academy called it obsession. He called it dedication. After the third failed experiment killed two students, they called it expulsion.",
          height: '6ft 2in', sunSign: 'Scorpio', eyeColor: 'amber', hairColor: 'white and wild', handedness: 'right-handed'
        }
      },
      {
        name: 'Nyx Shadowblade', icon: 'Moon', color: '#8e8e93',
        details: {
          backstory: "Nobody knows Nyx real name, age, or origin kingdom. Contracts are paid in advance, always in unmarked coin. She has never failed to complete an assignment.",
          height: '5ft 6in', sunSign: 'Capricorn', eyeColor: 'violet', hairColor: 'ink black', handedness: 'left-handed'
        }
      },
      {
        name: 'Faelar Greenshield', icon: 'Feather', color: '#34c759',
        details: {
          backstory: "Faelar watched a logging company fell three ancient groves before deciding diplomacy was insufficient. He has since taken a more direct approach to forest preservation.",
          height: '6ft 5in', sunSign: 'Taurus', eyeColor: 'leaf green', hairColor: 'copper brown', handedness: 'right-handed'
        }
      },
      {
        name: 'Thorin Ironfist', icon: 'Hammer', color: '#ff9500',
        details: {
          backstory: "Thorin forged the crown that sits on the King head, the throne he sits on, and the chains in the dungeon. He was never paid for the chains. He has not forgotten.",
          height: '4ft 5in', sunSign: 'Virgo', eyeColor: 'coal black', hairColor: 'braided red', handedness: 'right-handed'
        }
      },
      {
        name: 'King Alaric', icon: 'Crown', color: '#ffd700',
        details: {
          backstory: "Alaric inherited the throne, the wars, and the debts. He has been fighting one of the three ever since. He sees traitors in the eyes of every advisor and trusts no one who has not bled for him.",
          height: '5ft 10in', sunSign: 'Leo', eyeColor: 'cold grey', hairColor: 'blond going grey', handedness: 'right-handed'
        }
      },
      {
        name: 'Gribble The Sly', icon: 'Package', color: '#5856d6',
        details: {
          backstory: "Gribble once sold a cursed ring to a duke without mentioning the curse. He considers this good salesmanship. He has fourteen aliases and uses them all regularly.",
          height: '3ft 8in', sunSign: 'Gemini', eyeColor: 'yellow', hairColor: 'patchy grey', handedness: 'left-handed'
        }
      },
      {
        name: 'Puck Merryweather', icon: 'Music', color: '#ffcc00',
        details: {
          backstory: "Puck entertains nobles with songs that seem harmless until you parse the second verse. He has been collecting their secrets for twenty years and has never told a single one. Yet.",
          height: '5ft 7in', sunSign: 'Libra', eyeColor: 'bright blue', hairColor: 'flame-red curls', handedness: 'left-handed'
        }
      },
      {
        name: 'Lord Malacor', icon: 'Skull', color: '#af52de',
        details: {
          backstory: "The Academy refused to admit that their finest thesis on death magic was written by a student they expelled. Lord Malacor refuses to let them forget. He sends them a copy every year.",
          height: '6ft 1in', sunSign: 'Aquarius', eyeColor: 'bone white', hairColor: 'none', handedness: 'left-handed'
        }
      },
      {
        name: 'Sir Galahad', icon: 'Shield', color: '#00d2ff',
        details: {
          backstory: "Galahad has brought seventeen criminals to trial this year. Fourteen were executed. He considers the other three a failure not yet corrected. He sleeps peacefully.",
          height: '6ft 4in', sunSign: 'Aries', eyeColor: 'pale blue', hairColor: 'golden', handedness: 'right-handed'
        }
      },
      {
        name: 'Lyra Heartstring', icon: 'PenTool', color: '#00ffa3',
        details: {
          backstory: "Lyra once extracted battle plans from a general using only a lute and a slow song. She works for the highest bidder, but sometimes for personal amusement.",
          height: '5ft 9in', sunSign: 'Pisces', eyeColor: 'sea green', hairColor: 'silver-auburn', handedness: 'right-handed'
        }
      }
    ],
    weapons: [
      {
        name: 'Poisoned Apple', icon: 'Pipette', color: '#cc2200',
        details: {
          description: "Deep crimson and unnaturally perfect, this apple holds a sleeping toxin woven into its skin. A single bite renders the victim unconscious for days -- if they wake at all.",
          weight: 'light', madeOf: 'enchanted organic matter',
          locationClue: "a single crimson apple core, half-eaten and still faintly glowing, left behind"
        }
      },
      {
        name: 'Runed Broadsword', icon: 'Sword', color: '#aaaacc',
        details: {
          description: "Ancient runes run the length of the blade, pulsing faintly with residual enchantment. The edge never dulls. The bloodstains never fully wash out.",
          weight: 'heavy', madeOf: 'Valyrian-grade alloy',
          locationClue: "a glowing rune impression scorched into the floor where the blade last rested"
        }
      },
      {
        name: 'Enchanted Bow', icon: 'Target', color: '#cc8800',
        details: {
          description: "Carved from Ironwood old enough to have memory, strung with a single silverthread. The arrows it fires are made of solidified moonlight and leave no wound, only silence.",
          weight: 'medium', madeOf: 'Ironwood and silverthread',
          locationClue: "a faint silver residue and a single white feather mark where the shot was loosed"
        }
      },
      {
        name: 'Cracked Magic Staff', icon: 'Wind', color: '#8855ff',
        details: {
          description: "The crystal core at the heart of this staff is visibly fractured. Mana leaks from it in thin tendrils of light. Whoever used it risked as much as their target.",
          weight: 'medium', madeOf: 'Elderwood and fractured mana crystal',
          locationClue: "wisps of expelled mana still curl in the air where the staff was unleashed"
        }
      },
      {
        name: 'Dwarven Greataxe', icon: 'Axe', color: '#886633',
        details: {
          description: "An axe built for a Dwarven war-chieftain. Few outside their bloodline possess the shoulder span to use it properly. Fewer still have the temperament.",
          weight: 'heavy', madeOf: "forged Dwarven iron",
          locationClue: "deep axe-shaped gouges in the stone floor mark exactly where it was swung"
        }
      },
      {
        name: 'Forbidden Spellbook', icon: 'BookOpen', color: '#330066',
        details: {
          description: "The pages are actively burning -- not with fire, but with dark arcane energy. Opening it is said to drive the reader to madness. Evidence suggests someone already did.",
          weight: 'medium', madeOf: 'dragon leather and silver-inked vellum',
          locationClue: "scorched pages and black smoke residue linger at the site of its use"
        }
      },
      {
        name: 'Vial of Nightshade', icon: 'FlaskConical', color: '#004444',
        details: {
          description: "A glass vial cold to the touch, filled with a viscous purple liquid that smells of nothing and tastes of nothing. The effect is immediate and impossible to dispute.",
          weight: 'light', madeOf: 'blown glass and concentrated nightshade extract',
          locationClue: "a small ring of frost on the floor and a purple drop still wet on the stone"
        }
      },
      {
        name: 'Obsidian Dagger', icon: 'Knife', color: '#111111',
        details: {
          description: "Volcanic glass shaped into a weapon, coated in manticore venom. It breaks apart on contact with bone -- intentionally. The shards stay behind.",
          weight: 'light', madeOf: 'volcanic obsidian with manticore venom coating',
          locationClue: "obsidian shards and a faint caustic discolouration show where it struck"
        }
      },
      {
        name: 'War Crossbow', icon: 'Crosshair', color: '#664422',
        details: {
          description: "Heavy oak frame with a steel prod drawn so tight it takes a ratchet mechanism to cock. The bolt has a range of three hundred yards. The wielder doesn\'t need to be close.",
          weight: 'heavy', madeOf: 'seasoned oak and forged steel',
          locationClue: "a bolt embedded in the wall and a crushed patch of soil mark the firing position"
        }
      },
      {
        name: 'Dragon Tooth Shard', icon: 'Bone', color: '#ccaa44',
        details: {
          description: "A fragment from a tooth of an elder dragon, serrated along one edge and supernaturally hard. It feels warm to the touch and leaves no forensic trace recognizable to human investigators.",
          weight: 'light', madeOf: 'fossilized dragon bone',
          locationClue: "a faint amber glow fades from the ground where the shard passed through"
        }
      }
    ],
    locations: [
      {
        name: 'Throne Room', icon: 'Castle', color: '#332200',
        details: {
          setting: 'indoor', descriptor: "Echoing marble halls flanked by standing armor. A ceremonial standard is knocked from its mount near the dais.",
          traceFeature: "a displaced ceremonial standard knocked from its mount near the dais"
        }
      },
      {
        name: 'Wizard Tower', icon: 'Wind', color: '#110033',
        details: {
          setting: 'indoor', descriptor: "Filled with floating orbs and humming scrolls. A disturbed magical glyph on the floor no longer holds its original shape.",
          traceFeature: "a disturbed magical glyph on the floor that no longer holds its original shape"
        }
      },
      {
        name: 'Dark Dungeon', icon: 'Anchor', color: '#111111',
        details: {
          setting: 'underground', descriptor: "Damp stone and rusted iron. Chain links are disturbed and rusted dust is scattered from a forced movement along the floor.",
          traceFeature: "chain links disturbed and rusted dust scattered from a forced movement along the floor"
        }
      },
      {
        name: 'Enchanted Forest', icon: 'TreeDeciduous', color: '#0a3300',
        details: {
          setting: 'outdoor', descriptor: "The trees rearrange themselves when unwatched. Broken vines and bark-sap ooze from a trunk damaged during a struggle.",
          traceFeature: "broken vines and bark-sap oozing from a tree damaged during someone forced passage"
        }
      },
      {
        name: 'Local Tavern', icon: 'Coffee', color: '#332200',
        details: {
          setting: 'indoor', descriptor: "Smoky and loud. A spilled drink is still spreading across a table next to an overturned stool.",
          traceFeature: "a spilled drink still spreading and an overturned stool mark the exact table"
        }
      },
      {
        name: 'Blacksmith Forge', icon: 'Dumbbell', color: '#330000',
        details: {
          setting: 'indoor', descriptor: "Blistering heat and flying sparks. Fresh hammer marks on the cold metal floor show where something was struck and dragged.",
          traceFeature: "fresh hammer marks on the cold metal floor where something was struck and dragged"
        }
      },
      {
        name: 'Treasure Vault', icon: 'Star', color: '#553300',
        details: {
          setting: 'indoor', descriptor: "Gold stacked to the ceiling. A sprung floor tile and scattered coins mark the path to the forced vault door.",
          traceFeature: "a sprung floor tile and scattered gold coins across the path to the vault door"
        }
      },
      {
        name: 'Decrepit Graveyard', icon: 'Moon', color: '#112211',
        details: {
          setting: 'outdoor', descriptor: "Mist clings ankle-high. Freshly turned earth near the old yew tree and disturbed grave-moss suggest a recent burial.",
          traceFeature: "fresh freshly turned earth near the old yew tree and disturbed grave-moss on the path"
        }
      },
      {
        name: 'Magic Academy', icon: 'BookOpen', color: '#221133',
        details: {
          setting: 'indoor', descriptor: "Illusory walls and shifting stairs. A trail of shifting illusory sparks was left behind by an unauthorized spell.",
          traceFeature: "a trail of shifting illusory sparks left behind by an unauthorized spell being cast"
        }
      },
      {
        name: 'Dragon Cave', icon: 'Mountain', color: '#221100',
        details: {
          setting: 'outdoor', descriptor: "Sulphurous fumes and claw-marks. Sulfur residue and crushed bones at the entrance show where something was dragged in.",
          traceFeature: "sulfur residue and crushed bones at the cave entrance where something was dragged in"
        }
      }
    ],
    templates: { SW: { pos: [], neg: [] }, WL: { pos: [], neg: [] }, SL: { pos: [], neg: [] } }
  },

  Noir: {
    suspects: [
      {
        name: 'Baron Blackwood', icon: 'User', color: '#2c3e50',
        details: {
          backstory: "Three generations of Blackwood money, and the Baron is determined to spend it all before his creditors get to it first. He has been declared insolvent twice and recovered both times -- through means he does not discuss.",
          height: '5ft 10in', sunSign: 'Capricorn', eyeColor: 'watery blue', hairColor: 'white, oiled back', handedness: 'right-handed'
        }
      },
      {
        name: 'Madame Rose', icon: 'GlassWater', color: '#e74c3c',
        details: {
          backstory: "Rose sang on three continents before a scandal ended her career. Nobody could prove anything. She prefers it that way. She has since made her money in other performances entirely.",
          height: '5ft 6in', sunSign: 'Leo', eyeColor: 'dark brown', hairColor: 'deep red', handedness: 'left-handed'
        }
      },
      {
        name: 'The Butler', icon: 'Shield', color: '#7f8c8d',
        details: {
          backstory: "Forty years of service means forty years of secrets. He has witnessed two affairs, one blackmail scheme, and one hushed-up accidental death. He has advised the family on all three.",
          height: '6ft 0in', sunSign: 'Virgo', eyeColor: 'grey', hairColor: 'white and perfectly parted', handedness: 'right-handed'
        }
      },
      {
        name: 'Inspector Graves', icon: 'Eye', color: '#95a5a6',
        details: {
          backstory: "Graves has closed forty-seven cases, opened none himself, and buried the files on two he should never have touched. He drinks because he remembers and drinks more because he wants to forget.",
          height: '6ft 2in', sunSign: 'Scorpio', eyeColor: 'bloodshot brown', hairColor: 'silver-grey stubble', handedness: 'right-handed'
        }
      },
      {
        name: 'Dolly Diamonds', icon: 'Gift', color: '#f1c40f',
        details: {
          backstory: "Dolly stage name is borrowed from a stolen necklace. She sings jazz at the Velvet Lounge, keeps company with dangerous men, and always knows which way the door swings.",
          height: '5ft 5in', sunSign: 'Libra', eyeColor: 'dark hazel', hairColor: 'platinum blonde', handedness: 'right-handed'
        }
      },
      {
        name: 'Slick Vinnie', icon: 'Fingerprint', color: '#2ecc71',
        details: {
          backstory: "Vinnie broke his first kneecap at fifteen. He has been moving steadily up since, though still not quite where he wants to be. He carries a grudge the way others carry a wallet -- always.",
          height: '5ft 9in', sunSign: 'Aries', eyeColor: 'dark brown', hairColor: 'slick black', handedness: 'right-handed'
        }
      },
      {
        name: 'Professor Plum', icon: 'Crown', color: '#8e44ad',
        details: {
          backstory: "His experiments were unethical. His results were remarkable. The university disagreed about which fact mattered more. He now runs experiments in private with no oversight and surprisingly better funding.",
          height: '5ft 8in', sunSign: 'Gemini', eyeColor: 'pale grey', hairColor: 'disheveled lavender-grey', handedness: 'left-handed'
        }
      },
      {
        name: 'Silas Shadow', icon: 'Moon', color: '#34495e',
        details: {
          backstory: "In this city, information is currency. Silas deals in both. He has files on a judge, a senator, and two mob bosses. He keeps them as insurance. He also keeps this fact as insurance.",
          height: '5ft 7in', sunSign: 'Pisces', eyeColor: 'pale blue', hairColor: 'mousy brown', handedness: 'left-handed'
        }
      },
      {
        name: 'Lady Scarlett', icon: 'Heart', color: '#e74c3c',
        details: {
          backstory: "Her first husband vanished. Her second died of natural causes -- the coroner was well-compensated. Her third is still alive and deeply unhappy about it.",
          height: '5ft 4in', sunSign: 'Taurus', eyeColor: 'cat green', hairColor: 'auburn waves', handedness: 'right-handed'
        }
      },
      {
        name: 'Private Eye Jack', icon: 'Map', color: '#34495e',
        details: {
          backstory: "Three open cases, one divorce, nowhere near enough whiskey. Jack worked homicide for twelve years before they pushed him out. He has been working the same broken streets ever since, just with fewer rules.",
          height: '6ft 1in', sunSign: 'Sagittarius', eyeColor: 'bloodshot blue', hairColor: 'dirty brown', handedness: 'right-handed'
        }
      }
    ],
    weapons: [
      {
        name: 'Lead Pipe', icon: 'Dumbbell', color: '#888888',
        details: {
          description: "Heavy, rusted, and deeply unglamorous. Found in the basement of every old building in town. It doesn\'t leave fingerprints -- it leaves impressions.",
          weight: 'heavy', madeOf: 'solid lead piping',
          locationClue: "a rust-red mark and lead dust scraped against the wall where it was swung"
        }
      },
      {
        name: 'Rusty Revolver', icon: 'Target', color: '#886644',
        details: {
          description: "A six-shot revolver missing two rounds from the chamber. The rust on the barrel doesn\'t diminish its accuracy. At close range, accuracy barely matters.",
          weight: 'medium', madeOf: 'aged iron with walnut grip',
          locationClue: "a faint ring of carbon residue on the floor and one spent shell casing remain"
        }
      },
      {
        name: 'Poison Vial', icon: 'FlaskConical', color: '#004444',
        details: {
          description: "A glass vial with a torn label and the faint bitter-almond scent of a cyanide compound. Someone knew their chemistry too well.",
          weight: 'light', madeOf: 'blown glass with concentrated compound',
          locationClue: "a broken glass shard and a bitter chemical smell mark the exact surface it touched"
        }
      },
      {
        name: 'Ivory Dagger', icon: 'Knife', color: '#CCBB88',
        details: {
          description: "An ornate blade with an ivory handle and a family crest on the guard. Far too distinguished to be owned by the right person.",
          weight: 'light', madeOf: 'steel blade with ivory handle',
          locationClue: "ivory dust ground into the floor and a monogrammed wax seal rubbing left behind"
        }
      },
      {
        name: 'Brass Candlestick', icon: 'Pen', color: '#B8860B',
        details: {
          description: "Solid brass, candlestick-shaped, and bent off-center from an impact that would have required considerable force. The candle wax dripped long after it was last used as God intended.",
          weight: 'heavy', madeOf: 'solid brass',
          locationClue: "melted wax pooled on the floor and a brass dent-mark on the wall or surface"
        }
      },
      {
        name: 'Iron Wrench', icon: 'Wrench', color: '#555555',
        details: {
          description: "A 14-inch spanner covered in dark engine grease. The grease is from the pipes in the basement. The stain on the handle is not.",
          weight: 'medium', madeOf: 'forged iron',
          locationClue: "black grease smeared on the wall and a heavy metallic dent indicate where it struck"
        }
      },
      {
        name: 'Hemp Garrote', icon: 'Scissors', color: '#886633',
        details: {
          description: "A length of hemp rope, frayed at both ends, twisted into a loop. Whoever fashioned this knew exactly what they were making.",
          weight: 'light', madeOf: 'twisted hemp rope',
          locationClue: "hemp fibers caught on a sharp surface and a rope-burn mark remain as evidence"
        }
      },
      {
        name: 'Butcher\'s Cleaver', icon: 'Knife', color: '#CC3333',
        details: {
          description: "Recently sharpened and recently stained. Someone took it from the kitchen and returned something very different.",
          weight: 'medium', madeOf: 'high-carbon steel',
          locationClue: "a dark stain on the floor and steel shavings from the recently honed edge remain"
        }
      },
      {
        name: 'Sniper Rifle', icon: 'Crosshair', color: '#443322',
        details: {
          description: "A bolt-action wood-and-steel rifle, smelling of freshly fired propellant. The scope is military grade. Someone with serious training left this here -- or made it look that way.",
          weight: 'heavy', madeOf: 'walnut stock and steel barrel',
          locationClue: "a brass casing and a fresh powder-burn mark on the window frame"
        }
      },
      {
        name: 'Silver Letter Opener', icon: 'Pen', color: '#CCCCDD',
        details: {
          description: "Engraved with family initials on the blade and a tasteful floral pattern on the handle. It was made for correspondence. It has since expanded its function.",
          weight: 'light', madeOf: 'sterling silver',
          locationClue: "silver polish residue on the surface and faint initials pressed into soft upholstery nearby"
        }
      }
    ],
    locations: [
      {
        name: 'The Ballroom', icon: 'Star', color: '#221100',
        details: {
          setting: 'indoor', descriptor: "Crystal chandeliers flicker. A champagne flute is shattered on the parquet with a heel-mark in the spilled liquid.",
          traceFeature: "a champagne flute shattered on the parquet and a heel-mark in the spilled liquid"
        }
      },
      {
        name: 'Library', icon: 'BookOpen', color: '#221100',
        details: {
          setting: 'indoor', descriptor: "A secret bookcase door sits slightly ajar. A disturbed bookshelf with a specific volume out of place conceals a note.",
          traceFeature: "a disturbed bookshelf with a specific volume out of place, concealing a pressed note"
        }
      },
      {
        name: 'Conservatory', icon: 'Leaf', color: '#112200',
        details: {
          setting: 'indoor', descriptor: "Humid and transparent. Fresh soil is disturbed near an orchid planter and condensation is wiped from the glass.",
          traceFeature: "fresh soil disturbed near an orchid planter and condensation wiped from the glass pane"
        }
      },
      {
        name: 'Billiard Room', icon: 'Target', color: '#002200',
        details: {
          setting: 'indoor', descriptor: "Scattered cue balls and spilled Scotch. Whisky is pooled under the table edge and a billiard cue is left at an odd angle.",
          traceFeature: "Scotch whisky pooled under the table edge and a billiard cue left at an odd angle"
        }
      },
      {
        name: 'Dark Alley', icon: 'Anchor', color: '#111111',
        details: {
          setting: 'outdoor', descriptor: "Rain-slicked cobblestones. A wet footprint is preserved in a puddle near a bin before the rain washes it away.",
          traceFeature: "a wet footprint preserved in a puddle near the bin before the rain washes it away"
        }
      },
      {
        name: 'Mansion Roof', icon: 'Mountain', color: '#222222',
        details: {
          setting: 'outdoor', descriptor: "Slippery slate tiles. A wet slide mark and a jemmied roof hatch latch mark an entry point.",
          traceFeature: "a wet slide mark on the tiles and a jemmied roof hatch latch still bent outward"
        }
      },
      {
        name: 'Wine Cellar', icon: 'Wine', color: '#330022',
        details: {
          setting: 'underground', descriptor: "Pitch black and cobweb-laced. A disturbed wine rack and a broken wax seal on the floor reveal a search.",
          traceFeature: "a disturbed wine rack with bottles shifted and a broken wax bottle-seal on the floor"
        }
      },
      {
        name: 'Kitchen', icon: 'ChefHat', color: '#111111',
        details: {
          setting: 'indoor', descriptor: "Cold stoves and a missing cleaver. Flour footprints on the kitchen tiles lead toward the pantry.",
          traceFeature: "a missing knife slot in the butcher block and flour footprints on the kitchen tiles"
        }
      },
      {
        name: 'Study', icon: 'Library', color: '#221100',
        details: {
          setting: 'indoor', descriptor: "A tilted oil painting hides a safe. Fingerprints in the dust and a torn paper corner caught in the hinge tell of a theft.",
          traceFeature: "safe-dial fingerprints in dust and a torn paper corner caught in the safe door hinge"
        }
      },
      {
        name: 'Secret Passage', icon: 'Ladder', color: '#111111',
        details: {
          setting: 'indoor', descriptor: "Narrow and dusty. Two sets of footprints lead in opposite directions -- one fresh, one partially obscured.",
          traceFeature: "two sets of footprints in the dust -- one fresh, one partially obscured -- lead in opposite directions"
        }
      }
    ],
    templates: { SW: { pos: [], neg: [] }, WL: { pos: [], neg: [] }, SL: { pos: [], neg: [] } }
  }
};

const setupMasterTemplates = () => {
  const S_W_POS = [
    "A witness saw {S} leaving the scene with the {W} concealed beneath their coat.",
    "{S}'s prints were lifted clean off the {W} -- three partial matches, none disputed.",
    "Someone matching {S}'s description was seen purchasing the {W} that same morning.",
    "{S} had been observed handling the {W} on multiple occasions in the days prior.",
    "The {W} was found registered to {S} -- there was no question about it.",
    "A note recovered near the body linked {S} directly to the {W}.",
    "{S} was overheard in an argument specifically about the {W} the night before.",
    "The {W} vanished from {S}'s possession shortly before the killing took place.",
    "{S} was the only person present with both the means and the motive to use the {W}.",
    "A witness later testified that {S} was spotted concealing the {W} under some outerwear."
  ];
  
  const S_W_NEG = [
    "{S} was nowhere near the {W} when the incident occurred -- two people confirm it.",
    "Multiple witnesses are consistent: {S} never once touched the {W}.",
    "{S}'s hands were otherwise occupied -- carrying the {W} would have been physically impossible.",
    "The {W} requires a specific kind of strength or training that {S} clearly does not possess.",
    "{S} was verified to be miles from the scene when the {W} was used.",
    "Not a single trace connecting {S} to the {W} could be recovered.",
    "{S} openly dismissed the {W} as beneath their abilities -- witnesses found this specific.",
    "The {W} was locked in a location {S} had no access credentials for.",
    "{S} had no recorded history with the {W} and nothing at the scene suggests otherwise.",
    "Everyone present confirmed {S} arrived empty-handed -- the {W} was not with them."
  ];

  const W_L_POS = [
    "The {W} was discovered concealed inside the {L}.",
    "Marks consistent with the {W} were found on the floor of the {L}.",
    "Someone was seen carrying something matching the {W} into the {L} earlier that evening.",
    "The {W} turned up during a methodical search of the {L}.",
    "Dust patterns in the {L} indicate the {W} had rested there for some time.",
    "The {W} was found partially concealed beneath the main surface inside the {L}.",
    "The condition of the {W} was entirely consistent with the environment of the {L}.",
    "Material from the {W} was found smeared along the wall inside the {L}.",
    "The {W} and the damage pattern inside the {L} match perfectly.",
    "The {W} was recovered from a corner of the {L}, partially hidden from view."
  ];

  const W_L_NEG = [
    "A thorough search of the {L} produced no sign whatsoever of the {W}.",
    "The {W} could not have been brought through the entrance of the {L} unnoticed.",
    "The {L} was checked with meticulous care -- the {W} was not there.",
    "No reasonable account explains how the {W} might have reached the {L}.",
    "There is no evidence -- physical or testimonial -- that the {W} ever entered the {L}.",
    "The {L} showed no trace of the {W}. Not so much as a scratch.",
    "The {W} was fully accounted for elsewhere before anyone approached the {L}.",
    "Personnel at the {L} entrance are confident the {W} never crossed the threshold.",
    "A witness who remained in the {L} all evening never once saw the {W}.",
    "The {W} was later found far from the {L} -- it never made it there."
  ];

  const S_L_POS = [
    "A witness positively placed {S} inside the {L} around the time in question.",
    "{S} was seen entering the {L} and did not emerge for some considerable time.",
    "Something belonging to {S} was recovered from inside the {L}.",
    "A staff member recognised {S} in the {L} -- they should not have been there.",
    "{S} was known to frequent the {L} when privacy was required.",
    "Someone saw {S} near the {L} shortly before the discovery was made.",
    "{S} had asked about the {L} earlier that day -- people found it oddly specific.",
    "The {L} showed fresh signs of disturbance, and {S} was the last person known nearby.",
    "{S} was caught attempting to exit the {L} via a side exit.",
    "A person matching {S}'s description was spotted lingering just outside the {L}."
  ];

  const S_L_NEG = [
    "{S} has a solid alibi -- they were demonstrably nowhere near the {L}.",
    "Half a dozen people independently confirm {S} never went near the {L}.",
    "There is no plausible route by which {S} could have reached the {L} in time.",
    "{S} was seen moving in the opposite direction from the {L} entirely.",
    "Everyone who knows {S} agrees -- the {L} is somewhere they would never go.",
    "{S} had no knowledge the {L} even existed, let alone how to access it.",
    "{S} was accompanied by witnesses all evening -- nowhere near the {L}.",
    "No trace of {S} was found anywhere in or around the {L}.",
    "{S} was already in custody before anyone set foot near the {L}.",
    "The {L} was fully secured, and {S} possessed no key or credentials."
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
    if (Math.random() < 0.7) return obj.name;
    return getUniqueTrait(obj, suspects, [
      (o: any) => o.details.height ? `the individual standing exactly ${o.details.height}` : null,
      (o: any) => o.details.handedness ? `the ${o.details.handedness} suspect` : null,
      (o: any) => o.details.eyeColor ? `the suspect with ${o.details.eyeColor} eyes` : null,
      (o: any) => o.details.hairColor ? `the person with ${o.details.hairColor} hair` : null,
      (o: any) => o.details.sunSign ? `the ${o.details.sunSign}` : null,
    ]);
  };

  const getW = () => {
    const obj = weapons[v.j];
    if (!obj) return '';
    if (Math.random() < 0.7) return obj.name;
    return getUniqueTrait(obj, weapons, [
      (o: any) => o.details.madeOf ? `the weapon crafted from ${o.details.madeOf}` : null,
      (o: any) => o.details.weight ? `the ${o.details.weight}-weight instrument` : null,
    ]);
  };

  const getL = () => {
    const obj = locations[v.k];
    if (!obj) return '';
    // High probability of using the actual name for clarity
    if (Math.random() < 0.7) return obj.name;
    return getUniqueTrait(obj, locations, [
      (o: any) => o.details.setting ? `the ${o.details.setting} location` : null,
      (o: any) => o.details.traceFeature ? `the place where ${o.details.traceFeature}` : null,
    ]);
  };

  const lookupType = type === 'NEGATIVE' ? 'DIRECT' : type;

  let pool: string[] = [];
  
  if (lookupType === 'DIRECT') pool = isNegative ? coreTemplates.SW.neg : coreTemplates.SW.pos;
  else if (lookupType === 'LOCATION_WEAPON') pool = isNegative ? coreTemplates.WL.neg : coreTemplates.WL.pos;
  else if (lookupType === 'SUSPECT_LOCATION') pool = isNegative ? coreTemplates.SL.neg : coreTemplates.SL.pos;

  if (!pool || pool.length === 0) return "The evidence is fragmented -- something here does not add up.";

  const sentence = pool[Math.floor(Math.random() * pool.length)];

  const finalString = sentence
    .replace(/{S}/g, getS())
    .replace(/{W}/g, getW())
    .replace(/{L}/g, getL());
    
  return finalString.charAt(0).toUpperCase() + finalString.slice(1);
}




