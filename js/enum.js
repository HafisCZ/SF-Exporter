const PLAYER_CLASS = [
    '',
    'Warrior',
    'Mage',
    'Scout',
    'Assassin',
    'Battle Mage',
    'Berserker',
    'Demon Hunter'
];

const PLAYER_ACTIONS = [
    'Idle',
    'Working',
    'Questing'
];

const PLAYER_CLASS_SEARCH = [
    '',
    'warrior',
    'mage',
    'scout',
    'assassin',
    'battle mage',
    'berserker',
    'demon hunter'
];

const PLAYER_MOUNT = [
    '',
    '10',
    '20',
    '30',
    '50'
];

function getMirrorPieces (value) {
    for (var i = 0; i < 15; i++) {
        if ((value >> i) & 1) return i + 1;
    }
    return 0;
}

const POTIONS = [
    '',
    'Strength',
    'Dexterity',
    'Intelligence',
    'Constitution',
    'Luck',
    'Life'
];

const GEMTYPES = [
    '',
    'Strength',
    'Dexterity',
    'Intelligence',
    'Constitution',
    'Luck',
    'Black'
];

const GEMATTRIBUTES = [
    '',
    'Strength',
    'Dexterity',
    'Intelligence',
    'Constitution',
    'Luck',
    'All'
];

const RUNETYPES = [
    '',
    'Gold',
    'Epic Chance',
    'Item Quality',
    'XP',
    'Health',
    'Fire Resist',
    'Cold Resist',
    'Lightning Resist',
    'Total Resist',
    'Fire Damage',
    'Cold Damage',
    'Lightning Damage'
];

const GROUP_ROLES = [
    '',
    'Leader',
    'Officer',
    'Member',
    'Invited'
];

const FIGHT_TYPES = {
    PlayerVsPlayer: 0,
    Quest: 1,
    Battle: 2,
    Raid: 3,
    Dungeon: 4,
    Tower: 5,
    PlayerPortal: 6,
    GuildPortal: 7,
    FortAttack: 8,
    FortDefend: 9,
    Shadow: 12,
    PetsDungeon: 13,
    PetsAttack: 14,
    PetsDefend: 15,
    Underworld: 16,
    GuildPet: 17,
    FortRevenge: 109
};

function getFightTargetName (type, name, face) {
    if (NAME_UNIT_COMPANION[face]) {
        return NAME_UNIT_COMPANION[face];
    } else if (type == FIGHT_TYPES.Shadow) {
        return `Shadow ${ NAME_MONSTER[face] }`;
    } else if (NAME_MONSTER[face]) {
        return NAME_MONSTER[face];
    } else {
        return 'Unknown';
    }
}

const ITEM_TYPES = [
    '',
    'Weapon',
    'Shield',
    'Armor',
    'Shoes',
    'Gloves',
    'Helmet',
    'Belt',
    'Necklace',
    'Ring',
    'Talisman',
    'Key',
    'Potion',
    'Scrapbook',
    'Scroll',
    'Gem',
    'Egg',
    'Hourglass',
    'Heart',
    'Wheel'
];

const NAME_UNIT_UNDERWORLD = {
    0: 'Goblin',
    1: 'Troll',
    2: 'Keeper'
}

const NAME_UNIT_COMPANION = {
    391: 'Bert',
    392: 'Mark',
    393: 'Kunigunde'
}

const NAME_MONSTER = {
    1: 'Dirty Bat',
    2: 'Bat Out of hell',
    3: 'Dusty Bat',
    4: 'Flesh Golem',
    5: 'Zombie',
    6: 'Undead',
    7: 'Firelog',
    8: 'Frost Demon',
    9: 'Rattling Cobra',
    10: 'Shadow Cobra',
    11: 'Nutty Natter',
    12: 'Spittle Cobra',
    13: 'Polar Bear',
    14: 'Problem Bear',
    15: 'Brown Bear',
    16: 'Infected Brown Bear',
    17: 'Green Rex',
    18: 'Red Rex',
    19: 'Grey Rex',
    20: 'Snow Troll',
    21: 'Night Troll',
    22: 'Mountain Troll',
    23: 'Stone Troll',
    24: 'Grey Vulture',
    25: 'Culture Vulture',
    26: 'Pack Rat',
    27: 'Albino Rat',
    28: ' Sewer Rat',
    29: 'Forest Muncher',
    30: 'Swamp Muncher',
    31: 'Night Ghoul',
    32: 'Grey Ghoul',
    33: 'Swamp Ghoul',
    34: 'Snapping Raptor',
    35: 'Jumping Raptor',
    36: 'Roaring Raptor',
    37: 'Bigfoot',
    38: 'Yeti',
    39: 'Mean Monster Rabbit',
    40: 'Choleric Monster Rabbit',
    41: 'Killer Monster Rabbit',
    42: 'Pink Monster Rabbit',
    43: 'Lunatic Monster Rabbit',
    44: 'Toxic Monster Rabbit',
    45: 'Pirate Dark Beard',
    46: 'Sturdy Swashbuckler',
    47: 'Pirate Blood Nose',
    48: 'Evil Taurus',
    49: 'Sulky Taurus',
    50: 'Total Bull',
    51: 'Stone Giant',
    52: 'Lava Giant',
    53: 'Green Gnoll',
    54: 'Grey Gnoll',
    55: 'Red Gnoll',
    56: 'Giant Spider',
    57: 'Terror Tarantula',
    58: 'Tree Spider',
    59: 'Snow Lion',
    60: 'Tiger',
    61: 'Panther',
    62: 'Mountain Lion',
    63: 'Hell Scorpion',
    64: 'Jungle Scorpion',
    65: 'Shadow Scorpion',
    66: 'Fire Scorpion',
    67: 'Redlight Succubus',
    68: 'Swamp Nymphomaniac',
    69: 'Bride From Hell',
    70: 'Witch',
    71: 'Brown Centaur',
    72: 'Green Centaur',
    73: 'Grey Centaur',
    74: 'Banshee',
    75: 'Biting Mutt',
    76: 'Ice Wolf',
    77: 'Rabid Wolf',
    78: 'Grim Wolf',
    79: 'Mud Blob',
    80: 'Sand Blob',
    81: 'Slime Blob',
    82: 'Lava Blob',
    83: 'Blood-thirsty Vampire',
    84: 'Devious Vampire',
    85: 'Sinister Vampire',
    86: 'Ugly Gremlin',
    87: 'Cruel Gremlin',
    88: 'Greedy Gremlin',
    89: 'Greenish Gremlin',
    90: 'Demoralizing Demon',
    91: 'Terrifying Demon',
    92: 'Abhorrent Demon',
    93: 'Bad Bandit',
    94: 'Rowdy Robber',
    95: 'Thoughtless Thief',
    96: 'Basilisk',
    97: 'Fire Basilisk',
    98: 'Twilight Alien',
    99: 'Hell Alien',
    100: 'Toxic Alien',
    101: 'Dark Rider',
    102: 'Fire Elemental',
    103: 'Gray Gargoyle',
    104: 'Brown Gargoyle',
    105: 'Swamp Crocodile',
    106: 'Frost Alligator',
    107: 'Shadow Alligator',
    108: 'Mud Crocodile',
    109: 'White Gorilla',
    110: 'Forest Gorilla',
    1100: 'Eloquent Hat',
    1101: 'Sour Argus',
    1102: 'Fluffy Friend',
    1103: 'A. van Blame',
    1104: 'Phony Locky',
    1105: 'Killer Stare',
    1106: 'Bad Kisser',
    1107: 'Guardian of the Golden Egg',
    1108: 'Gentle Giant',
    1109: 'Pedigree Bad Boy',
    111: 'Mountain Gorilla',
    1110: 'Unrepentant Penitent',
    1111: 'The Gifted One (and Ron)',
    1112: 'Stumbledoor',
    1113: 'Petey Rat',
    1114: 'Diabolical Dolores',
    1115: 'Inconveniently Infinite Inferi',
    1116: 'Bella the Beastly',
    1117: 'Lucius the Pure-Blood',
    1118: 'Cutsie Cuddler',
    1119: 'You Should Know Who ...',
    112: 'Skeleton',
    113: 'Voodoo Skeleton',
    114: 'Voodoo Master',
    115: 'Skeleton Warrior',
    116: 'Skeleton Soldier',
    117: 'Horror of the Night',
    118: 'Swamp Gorgon',
    119: 'Night Gorgon',
    120: 'Baby Elephant',
    1200: 'Orc on Warg',
    1201: 'Troll Trio',
    1202: 'The King',
    1203: 'Smollum',
    1204: 'Spiders again',
    1205: 'Orc Boss',
    1206: 'Bezog',
    1207: 'Smoulder',
    1208: 'Nazguls...Nazgulses?',
    1209: 'Monster in the Lake',
    121: 'Lion',
    1210: 'Valaraukar',
    1211: 'Urcsi the Uruk',
    1212: 'Prompter Splittongue',
    1213: 'Samowar the Pale',
    1214: 'Oliphaunt Tamer',
    1215: 'Undead Army',
    1216: 'Shelantula',
    1217: 'Ruler of the Nine',
    1218: 'Mauron\'s Maw',
    1219: 'The Necromancer',
    122: 'Wild Boar',
    123: 'Wild Sod',
    124: 'Wind Elemental',
    125: 'Sandstorm',
    126: 'Blowflies',
    127: 'Terror Tree',
    128: 'Toxic Tree',
    129: 'Ghost',
    130: 'Fire Glompf',
    1300: 'One-headed Hydra',
    1301: 'Two-headed Hydra',
    1302: 'Three-headed Hydra',
    1303: 'Four-headed Hydra',
    1304: 'Five-headed Hydra',
    1305: 'Six-headed Hydra',
    1306: 'Seven-headed Hydra',
    1307: 'Eight-headed Hydra',
    1308: 'Nine-headed Hydra',
    1309: 'Ten-headed Hydra',
    131: 'Water Glompf',
    1310: 'Eleven-headed Hydra',
    1311: 'Twelve-headed Hydra',
    1312: 'Thirteen-headed Hydra',
    1313: 'Fourteen-headed Hydra',
    1314: 'Fifteen-headed Hydra',
    1315: 'Sixteen-headed Hydra',
    1316: 'Seventeen-headed Hydra',
    1317: 'Eighteen-headed Hydra',
    1318: 'Nineteen-headed Hydra',
    1319: 'Countless-headed Hydra',
    132: 'Swamp Glompf',
    1320: 'DoctorBenx',
    1321: 'Zakreble',
    1322: 'Golden Gianpy',
    1323: 'Willyrex',
    1324: 'Alvaro845',
    1325: 'Paul Terra',
    1326: 'Spieletrend',
    1327: 'Fatty Pillow',
    1328: 'Gimper',
    1329: 'Unge',
    133: 'Cycling Cyclops',
    134: 'Sand Cyclops',
    135: 'Hell Cyclops',
    136: 'Cave Cyclops',
    137: 'Octopus',
    138: 'Timmy Suprino',
    139: 'Gray Dragon',
    140: 'Dirty Rotten Scoundrel',
    1400: 'Heimdall',
    1401: 'Valkyries',
    1402: 'Hel',
    1403: 'Thor',
    1404: 'Odin',
    1405: 'Loki',
    1406: 'Ymir',
    1407: 'Midgard Serpent',
    1408: 'Fenris Wolf',
    1409: 'Surtr',
    141: 'Cutthroat',
    142: 'Grave Robber',
    143: 'Black Phantom',
    144: 'Unholy Monk',
    145: 'Guy in a cowl',
    146: 'Dragon of Madness',
    147: 'Dragon of Cold',
    148: 'Dragon of Hell',
    149: 'Giant Dragon',
    150: 'Slashing Saurus',
    151: 'Saurus Rogue',
    152: 'Mountain Warrior',
    153: 'Swamp Warrior',
    154: 'The Extraterrestrial',
    155: 'Illegal Alien',
    156: 'Out of State Alien',
    157: 'Little Green Man',
    158: 'Dragon of Darkness',
    159: 'Black Skull Warrior',
    160: 'Toxic Dragon',
    161: 'Swamp Dragon',
    162: 'Beastie',
    163: 'Man-Eater',
    164: 'Killing Machine',
    165: 'Knight of the Black Skull',
    166: 'Lord of Darkness',
    167: 'Terrible Toxic Gremlin',
    168: 'Ghost of the Volcano',
    169: 'Hell Beast',
    170: 'Robber Chief',
    171: 'King Saurus',
    172: 'Pirate Leader',
    173: 'Happy Slappy the Clown',
    174: 'The Blind Knife Thrower',
    175: 'Miniature Gnome',
    176: 'The Bearded Lady',
    177: 'The Psycho Juggler',
    178: 'Siamese Twins',
    179: 'Bronco the Joker',
    180: 'The Snake-man',
    181: 'Madame Mystique',
    182: 'Bozo the Terror Clown',
    183: 'Restless Soul',
    184: 'Furious Soul',
    185: 'Old Soul',
    186: 'Pest',
    187: 'Soul Clump',
    188: 'Scourge',
    189: 'Hellhound',
    190: 'The Fuehrer\'s Heap',
    191: 'The Devil\'s Advocate',
    192: 'Beelzeboss',
    193: 'Hobgoblin\'s boat',
    194: 'Starfish of death',
    195: 'Neon yellow death',
    196: 'Terror from the deep',
    197: 'Beastly brat',
    198: 'King of the dark dwarves',
    199: 'Invisible threat',
    200: 'Biggie the Pimp',
    201: 'The Count',
    202: 'Goblin mage',
    203: 'Djinn',
    204: 'Ninja gnome',
    205: 'Titan',
    206: 'Super-assassin',
    207: 'The Dead Baron',
    208: 'Hydra',
    209: 'Blind Cyclops',
    210: 'Klomann the Barbarian',
    211: 'Cerberus',
    212: 'Zombie Berserker',
    213: 'The thing',
    214: 'Cute kitten',
    215: 'Armored dragon',
    216: 'Butthead',
    217: 'Pets',
    218: 'Bat hags',
    219: 'Dancing ogre brothers',
    220: 'Ungorth the Merciless',
    221: 'Cybernetic zombie',
    222: 'War ogre of war',
    223: 'Archdemon of confusion',
    224: 'Valkyrie',
    225: 'Big-mouth of doom',
    226: 'Ping Pong',
    227: 'Boogerus the Booger Giant',
    228: 'Shniva',
    229: 'AfterDarkor',
    230: 'Armored fire dragon',
    231: 'Werewolf',
    232: 'Crococopter',
    233: 'Gripcut the Ghastly',
    234: 'Gragosh the Destroyer',
    235: 'Ragorth the Vengeful',
    236: 'Slobba the Mudd',
    237: 'Fat Elke',
    238: 'The mother-in-law',
    239: 'Reaper man',
    240: 'Debugger\'s Doom',
    241: 'AI',
    242: 'The boss',
    243: 'Hellgore the Hellish',
    244: 'Henry the Magic Fairy',
    245: 'Jet the Panty Raider',
    246: 'Clapper van Hellsing',
    247: 'The KOma KOmmander',
    248: 'Roughian the Ruthless',
    249: 'Ben the Marketeer',
    250: 'Hector the Contractor',
    251: 'Motu with a Club',
    252: 'Jack the Hammerer',
    400: 'Living Cake Man',
    401: 'Green Fairy Drinkerbell',
    402: 'Tinvalid',
    403: 'Harmless Teddy Bear',
    404: 'Flowerlina',
    405: 'Tooth Fairy',
    406: 'Ugly Chick',
    407: 'Warbling Birdie',
    408: 'Well-Meaning Fairy',
    409: 'Trickeribook\'s Cheatinchild',
    410: 'Singing Dumpling',
    411: 'Puppeteer\'s Right',
    412: 'Grinning Cat',
    413: 'Ambitious Frog',
    414: 'Pinociwhatsit',
    415: '3x3 Wishes',
    416: 'Bootlegged Puss',
    417: 'Dotty from Kansas',
    418: 'The Last Airgazer',
    419: 'A Rabbit and a Hedgehog',
    420: 'Holger Nilsson',
    421: 'High-Spirited Ghost',
    422: 'Blood-Red Riding Hood',
    423: 'Snowflake',
    424: 'Star Money',
    425: 'Miss Match',
    426: 'Ice Queen',
    427: 'Badly Raised Boys',
    428: 'Lambikins and Fishy',
    429: 'Donkey Shot',
    430: 'Street Thief with Monkey',
    431: 'Alice in Wonder',
    432: 'Penterabbit',
    433: 'Dynamic Peter',
    434: 'Foolish Princess',
    435: 'Pleasure Addict',
    436: 'Amnastasia Rubliovka',
    437: 'Useless Livestock',
    438: 'Humpty Dumpty',
    439: 'King Chinbeard',
    440: 'Sandman',
    441: 'John or Tom?',
    442: 'Scarecrow',
    443: 'Mirrored Fool',
    444: 'Three Little Pigs',
    445: 'Goose in Luck',
    446: 'Simpleminded Chicken Thief',
    447: 'Baba Yaga',
    448: 'Merlin',
    449: 'Julio and Romy',
    450: 'Prince in Shepherd\'s Skin',
    451: 'Robin the Redistributor',
    452: 'Ali the Sesame Opener',
    453: 'Freshly Dressed Emperor',
    454: 'Dumbo',
    455: 'Hansel and Gretel',
    456: 'Bear Fear',
    457: 'Pokerhontas',
    458: 'Mass Fly Murderer',
    459: 'Cinderella',
    460: 'The Enchanting Genie',
    461: 'Bronycorn',
    462: 'Hulda the Cloud Fairy',
    463: 'Leprechore',
    464: 'Robber Hopsenplops',
    465: 'Thorny Lion',
    466: 'Aquirella the Dazzler',
    467: 'Prince Charming',
    468: 'B. O. Wolf',
    469: 'Peter the Wolf',
    470: 'Beautiful Princess',
    471: 'Fearless Wanderer',
    472: 'Red&White Forever',
    473: 'Friendly Snowman',
    474: 'Parsifal',
    475: 'Brother Barfly',
    476: 'King Arthur',
    477: 'Sigi Musclehead',
    478: 'Pied Piper',
    479: 'The Guys from Oz',
    480: '"Little" John',
    481: 'The Easter Bunny',
    482: 'Honey Robbear',
    483: 'Shirk the Ogre',
    484: 'Cozy Bear',
    485: 'Number Nip',
    486: 'Three Hungry Bears',
    487: 'Seven Hostages',
    488: 'Seven Dwarfs',
    489: 'Respectable Dragon Slayer',
    490: 'Ducat Donkey',
    491: 'Bean Counter',
    492: 'Happy Dragon',
    493: 'Shockheaded Jack',
    494: 'Papa Frost',
    495: 'Dream Couple',
    496: 'Three Ghosts',
    497: 'Sleepy Princess',
    498: 'Nanobot Porridge',
    499: 'Barbpunzel',
    500: 'Prickly Beast',
    501: 'Rotten Crow',
    502: 'Skinny Skeleton',
    503: 'Cellar Zombie',
    504: 'Horned One',
    505: 'Toppled One',
    506: 'Bloodlusty Butcher',
    507: 'Dark Archer',
    508: 'Lance Strongarm',
    509: 'Femme Fatariel',
    510: 'Bad Bat',
    511: 'Sabertoothed Kitty',
    512: 'Sand Roach',
    513: 'Mummed Mummy',
    514: 'Plunderblargh',
    515: 'Snailing',
    516: 'Slashing Serpent',
    517: 'Quadroslayer',
    518: 'Lambent Limbeater',
    519: 'Torturiel',
    520: 'Little Badgerer',
    521: 'Big Badgerer',
    522: 'Terrifying Toad',
    523: 'B00n Demon',
    524: 'Goggly Beast',
    525: 'Clubber',
    526: 'Reckless Reaper',
    527: 'Eight-legged Arachnid',
    528: 'Deep Priest',
    529: 'Mephissimo',
    530: 'Bottomcreeper',
    531: 'Evil Enchantress',
    532: 'Ruminant',
    533: 'Old Purplehand',
    534: 'Mega Balrog',
    535: 'Archfallen',
    536: 'Phantasto the Blacksmith',
    537: 'Great Uncle of Untidiness',
    538: 'Terrible Tinkerer',
    539: 'Variablo',
    540: 'Impulsive Imp',
    541: 'Henchdemon',
    542: 'Horror on Ice',
    543: 'Furious Fury',
    544: 'Flayer',
    545: 'Stomper',
    546: 'Bloodthirsty Baron',
    547: 'Brain Leech',
    548: 'Executor',
    549: 'Evil Eel',
    550: 'Beast',
    551: 'Hunchbacked Zombie',
    552: 'Full Duplex Zombie',
    553: 'Thorny Devourer',
    554: 'Sinister Smasher',
    555: 'Unspeakable',
    556: 'Corpus Eruptus',
    557: 'Masterful Massacrist',
    558: 'Eight Legged Ariane',
    559: 'King Knuckelbone',
    560: 'Ritualist',
    561: 'Desert Devourer',
    562: 'Snaker',
    563: 'Snake Mage',
    564: 'Gory Gatherer',
    565: 'Lithic Leviathan',
    566: 'Ghastly Grey',
    567: 'Malicious Martha',
    568: 'Big Z',
    569: 'Father of Lies',
    570: 'Spikey Spiteful',
    571: 'Hellmutt',
    572: 'Soldier of Doom',
    573: 'Blood Occultist',
    574: 'Biting Batbuck',
    575: 'His Pestilence',
    576: 'Obstructor',
    577: 'Martyrdom\'s Maiden',
    578: 'Muscular Muzzle',
    579: 'Azmo Fantasmo',
    580: 'Premature Hellspawn',
    581: 'Angel of Pain',
    582: 'h4xx0r',
    583: 'Loricate Biter',
    584: 'Slender Person',
    585: 'Hammerer',
    586: 'Horrendous Hag',
    587: 'Deeply Fallen',
    588: 'Demon of Terror',
    589: 'Exitus Prime',
    590: 'Brute',
    591: 'Nasty Trapper',
    592: 'Executor',
    593: 'Fatty on the Rocks',
    594: 'Ex-Exorcist',
    595: 'Death Dispenser',
    596: 'Shadow of Power',
    597: 'Horned Witch',
    598: 'Death\'s Best Buddy',
    599: 'Devourer of Souls',
    600: 'Robert Drunkatheon',
    601: 'Lefty Lennister',
    602: 'Petyr the Pimp',
    603: 'Holundor',
    604: 'Drogo the Threatening',
    605: 'The Ginger Slowworm',
    606: 'Queen Mother',
    607: 'The Miniature Poodle',
    608: 'The Riding Mountainrange',
    609: 'Joffrey the Kid Despot',
    610: 'Cool Villain',
    611: 'Brygitte',
    612: 'Snowman and Shadow Wolf',
    613: 'The Woman in Red',
    614: 'Boyish Brienne',
    615: 'Ramsay the Degrader',
    616: 'Faceless',
    617: 'Vicious Gnome',
    618: 'The Protector',
    619: 'The Hard to Burn',
    700: 'Pathetic palisades',
    701: 'Palisades with a view',
    702: 'Improvised border post',
    703: 'Secured border post',
    704: 'Reinforced border post',
    705: 'Official border wall',
    706: 'Strong border wall',
    707: 'Fort rampart',
    708: 'Stronghold rampart',
    709: 'Dangerous rampart',
    710: 'Ordinary foot soldier',
    711: 'Experienced warrior',
    712: 'Elite infantry',
    720: 'Talented mageling',
    721: 'Old warlock',
    722: 'Grand Maester of Magic',
    730: 'Short bow amateur',
    731: 'Precision sniper',
    732: 'Pincusheneress of the Night',
    740: 'Semirigid palisade trench',
    741: 'Puny Picket Fence',
    742: 'Puny Picket Fence with look-out',
    743: 'Improvised border fortifications',
    744: 'Secure border fortifications',
    745: 'Enhanced border fortifications',
    746: 'Border wall',
    747: 'Strong border wall',
    748: 'Castle defense wall',
    749: 'Town wall',
    750: 'Strong town wall',
    751: 'Very strong town wall',
    752: 'Incredibly strong town wall',
    753: 'Totally incredible town wall',
    754: 'Last wall standing',
    755: 'Great Wall of China',
    756: 'Extensive barrier',
    757: 'Gigantic barrier',
    758: 'Megalomaniac barrier',
    759: 'Colossal barrier',
    800: 'Slurp',
    801: 'Digmol',
    802: 'Toothey',
    803: 'Okultacle',
    804: 'Spidor',
    805: 'Jackobu',
    806: 'Shrimpfly',
    807: 'Reaprim',
    808: 'Petdacat',
    809: 'Mykon',
    810: 'Fishorr',
    811: 'Cuckooly',
    812: 'Battlutter',
    813: 'Pinklynx',
    814: 'Pharamumm',
    815: 'Ninstarr',
    816: 'Luchtablong',
    817: 'Angrack',
    818: 'Devilsatt',
    819: 'Poisnake',
    820: 'Shaggyll',
    821: 'Jellclops',
    822: 'Tinck',
    823: 'Cloudning',
    824: 'Nevorfull',
    825: 'Plutoid',
    826: 'Djinntonic',
    827: 'Blaxta',
    828: 'Lampcess',
    829: 'Teslarr',
    830: 'Sunnya',
    831: 'Buckfoxion',
    832: 'Birdychirp',
    833: 'Eyeorwhat',
    834: 'Mesmerit',
    835: 'Antlar',
    836: 'Liphant',
    837: 'Knilight',
    838: 'Heraldon',
    839: 'Unikor',
    840: 'Mamoton',
    841: 'Monkorrage',
    842: 'Smaponyck',
    843: 'Bittnutz',
    844: 'Roarear',
    845: 'Muscudon',
    846: 'Apstick',
    847: 'Horrnington',
    848: 'Boaringg',
    849: 'Mameloth',
    850: 'Rheynooh',
    851: 'Rockastonn',
    852: 'Redwoofox',
    853: 'Lilbeatzup',
    854: 'Forror',
    855: 'Nipprabs',
    856: 'Armoruck',
    857: 'Canocle',
    858: 'Tricerawood',
    859: 'Mouthrexor',
    860: 'Firimp',
    861: 'Gullps',
    862: 'Pyrophibus',
    863: 'Flamechirr',
    864: 'Tectospit',
    865: 'Pyroplant',
    866: 'Kokofire',
    867: 'Peppryon',
    868: 'Boomywoomy',
    869: 'Tikiricky',
    870: 'Matchlit',
    871: 'Birblazey',
    872: 'Infernox',
    873: 'Humbuzzish',
    874: 'Dragopyr',
    875: 'Mantiflame',
    876: 'Finnettle',
    877: 'Etrock',
    878: 'Blazingtongues',
    879: 'Devastor',
    880: 'Goldy',
    881: 'Orcahle',
    882: 'Ocodile',
    883: 'Penguwater',
    884: 'Walrophin',
    885: 'Colsnail',
    886: 'Aquaphant',
    887: 'Naar',
    888: 'Octoboss',
    889: 'Ewilgryn',
    890: 'Seapard',
    891: 'Shellzy',
    892: 'Mingho',
    893: 'Angbite',
    894: 'Mermoid',
    895: 'Watnake',
    896: 'Cannoturtle',
    897: 'Unhere',
    898: 'Tritosting',
    899: 'Hydrospir'
}

const ATTACK_TYPES = {
    0: 'Normal',
    1: 'Critical',
    2: 'Catapult',
    3: 'Blocked',
    4: 'Evaded',
    10: 'Normal',
    11: 'Critical',
    13: 'Blocked',
    14: 'Evaded',
    15: 'Fireball',
    16: 'Fireball blocked',
    20: 'Normal',
    21: 'Critical',
    23: 'Blocked',
    24: 'Evaded'
};

const ACHIEVEMENTS = [
  "WANDERER",
  "LORD",
  "KING",
  "RAIDER",
  "STORYTELLER",
  "HEROOFOSTEROS",
  "DARKWANDERER",
  "SHADOWPLAY",
  "HURRIKAN",
  "MUSHROOMER",
  "LUCKYMUSHROOM",
  "PLAYER",
  "EPIC",
  "UNBEATABLE",
  "JUWLER",
  "DRUDGE",
  "DRAGONRIDER",
  "LOADOFPETS",
  "PETTRAINER",
  "WELLFEEDED",
  "GOTTHETURN",
  "HERO",
  "ELITE",
  "TOPOFTHEICEBERG",
  "SUPERHERO",
  "SUPERSUPERHERO",
  "COLLECTOR",
  "BIGSPENDER",
  "SEVENDAYONLINEINAROW",
  "THIRTYDAYSONLINE",
  "KINGOFKINGS",
  "GROUPHOUR",
  "PETSHOPBOY",
  "SONGOFTHESMITH",
  "SKYISTHELIMIT",
  "ANUAL",
  "PETFRIEND",
  "FINALYEIGHTEEN",
  "SHADOWTRAVELER",
  "THATWASABOUTTIME",
  "MYSELFANDME",
  "FKK",
  "EPICCOMPANION",
  "LUCKYLORD",
  "MINEEXPERT",
  "DRESSED",
  "BLACKSTONE",
  "BEWITCHED",
  "TRUSTED",
  "GOTTOCATCHTHEMALL",
  "UNDERWORLDALL15",
  "UNDERWORLDALL10",
  "UNDERWORLDALL5",
  "UNDERWORLDHARVEST25000000GOLD",
  "UNDERWORLDHARVEST25000000SOULS",
  "UNDERWORLDBEATNUMBERONE",
  "UNDERWORLDBEATTOP100",
  "UNDERWORLDBEATTOP1000",
  "UNDERWORLDKILL1000HEROS",
  "UNDERWORLDKILL25ADVENTURES",
  "WITCHCRAFTUNDONE",
  "MORDOR",
  "YOUTUBER",
  "HYDRAKILLER",
  "LORDOFDIGGER",
  "DAILYRUSH",
  "NIKOLAUS",
  "MRBIGWHEEL",
  "CROSSPLATTFORM",
  "SUPPORTER",
  "IDLERUNES1",
  "IDLERUNES2",
  "IDLERUNES3",
  "IDLERUNES4",
  "IDLERUNES5",
  "IDLEBUILDING25",
  "FINDTHEGRAIL",
  "CHOCOLATEFLASH",
  "NORDICDUNGEON",
  "NORDICSHADOW"
];

const FORTRESS_BUILDINGS = [
    'Fortress',
    'Laborers\' Quarters',
    'Woodcutter Guild',
    'Quarry',
    'Gem Mine',
    'Academy',
    'Archery Guild',
    'Barracks',
    'Mages\' Tower',
    'Treasury',
    'Smithy',
    'Fortifications'
];

// Guild Roles
const GUILD_ROLE_NONE = 0;
const GUILD_ROLE_LEADER = 1;
const GUILD_ROLE_OFFICER = 2;
const GUILD_ROLE_MEMBER = 3;
const GUILD_ROLE_INVITED = 4;

// Constants
const SCRAPBOOK_COUNT = 2180;
const ACHIEVEMENT_COUNT = 80;

// Attributes
const ATTRIBUTE_NONE = 0;
const ATTRIBUTE_STRENGTH = 1;
const ATTRIBUTE_DEXTERITY = 2;
const ATTRIBUTE_INTELLIGENCE = 3;
const ATTRIBUTE_CONSTITUTION = 4;
const ATTRIBUTE_LUCK = 5;

// Classes
const CLASS_NONE = 0;
const CLASS_WARRIOR = 1;
const CLASS_MAGE = 2;
const CLASS_SCOUT = 3;
const CLASS_ASSASSIN = 4;
const CLASS_WARLOCK = 5;
const CLASS_BERSERKER = 6;

// Potions
const POTION_NONE = 0;
const POTION_STRENGTH = 1;
const POTION_DEXTERITY = 2;
const POTION_INTELLIGENCE = 3;
const POTION_CONSTITUTION = 4;
const POTION_LUCK = 5;
const POTION_LIFE = 16;

// Potion sizes
const POTION_SMALL = 5;
const POTION_MEDIUM = 15;
const POTION_LARGE = 25;

// Potion variations
const POTION_STRENGTH_SMALL = 1;
const POTION_DEXTERITY_SMALL = 2;
const POTION_INTELLIGENCE_SMALL = 3;
const POTION_CONSTITUTION_SMALL = 4;
const POTION_LUCK_SMALL = 5;
const POTION_STRENGTH_MEDIUM = 6;
const POTION_DEXTERITY_MEDIUM = 7;
const POTION_INTELLIGENCE_MEDIUM = 8;
const POTION_CONSTITUTION_MEDIUM = 9;
const POTION_LUCK_MEDIUM = 10;
const POTION_STRENGTH_LARGE = 11;
const POTION_DEXTERITY_LARGE = 12;
const POTION_INTELLIGENCE_LARGE = 13;
const POTION_CONSTITUTION_LARGE = 14;
const POTION_LUCK_LARGE = 15;

const RUNE_VALUE = {
    GOLD: function (rune) {
        return rune < 2 ? 0 : (3 + 2 * (rune - 2));
    },
    EPIC_FIND: function (rune) {
        return rune < 2 ? 0 : (3 + 2 * (rune - 2));
    },
    ITEM_QUALITY: function (rune) {
        if (rune > 2) return 19;
        switch (rune) {
            case 1: return 3;
            case 2: return 19;
            default: return 0;
        }
    },
    XP: function (rune) {
        if (rune > 5) return 45;
        switch (rune) {
            case 1: return 3;
            case 2: return 9;
            case 3: return 25;
            case 4: return 35;
            case 5: return 45;
            default: return 0;
        }
    },
    HEALTH: function (rune) {
        if (rune > 7) return 43;
        switch (rune) {
            case 1: return 3;
            case 2: return 6;
            case 3: return 17;
            case 4: return 23;
            case 5: return 30;
            case 6: return 36;
            case 7: return 43;
            default: return 0;
        }
    },
    SINGLE_RESISTANCE: function (rune) {
        if (rune > 35) return 46;
        switch (rune) {
            case 3: return 3;
            case 4: return 4;
            case 5: return 6;
            case 6: return 8;
            case 7: return 9;
            case 8: return 10;
            case 9: return 12;
            case 10: return 13;
            case 11: return 14;
            case 12: return 15;
            case 13: return 17;
            case 14: return 18;
            case 15: return 20;
            case 16: return 21;
            case 17: return 22;
            case 18: return 23;
            case 19: return 25;
            case 20: return 26;
            case 21: return 27;
            case 22: return 28;
            case 23: return 30;
            case 24: return 31;
            case 25: return 32;
            case 26: return 33;
            case 27: return 35;
            case 28: return 36;
            case 29: return 38;
            case 30: return 40;
            case 31: return 41;
            case 32: return 42;
            case 33: return 43;
            case 34: return 45;
            case 35: return 46;
            default: return 0;
        }
    },
    TOTAL_RESISTANCE: function (rune) {
        if (rune > 11) return 42;
        switch (rune) {
            case 2: return 3;
            case 3: return 12;
            case 4: return 15;
            case 5: return 20;
            case 6: return 23;
            case 7: return 27;
            case 8: return 31;
            case 9: return 34;
            case 10: return 38;
            case 11: return 42;
            default: return 0;
        }
    },
    ELEMENTAL_DAMAGE: function (rune) {
        if (rune > 28) return 46;
        switch (rune) {
            case 2: return 3;
            case 3: return 4;
            case 4: return 6;
            case 5: return 8;
            case 6: return 10;
            case 7: return 11;
            case 8: return 12;
            case 9: return 15;
            case 10: return 16;
            case 11: return 17;
            case 12: return 19;
            case 13: return 21;
            case 14: return 23;
            case 15: return 24;
            case 16: return 26;
            case 17: return 28;
            case 18: return 29;
            case 19: return 31;
            case 20: return 32;
            case 21: return 34;
            case 22: return 36;
            case 23: return 38;
            case 24: return 39;
            case 25: return 40;
            case 26: return 42;
            case 27: return 44;
            case 28: return 46;
            default: return 0;
        }
    }
}
