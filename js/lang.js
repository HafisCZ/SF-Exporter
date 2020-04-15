/*
    A part of localization was extracted from game localization.
    Everything is owned exclusively by Playa Games and by using it you acknowledge that you have usage rights to this content.
    Playa Games has a right to request takedown of this content at support@mar21.eu if needed.
*/
const Loca = {
    fill: function (co, ze, text = co.toString()) {
        return '0'.repeat(Math.max(0, ze - text.length)) + text;
    },
    get : function (type, pic, cl) {
        if (cl == undefined || type >= 8) {
            return Loca[`item type ${ Loca.fill(type, 2) } pic ${ Loca.fill(pic, 3) }`];
        } else {
            return Loca[`item type ${ Loca.fill(type, 2) } class ${ cl } pic ${ Loca.fill(pic, 3) }`];
        }
    },
    'item type 01 class 1 pic 001': 'Old Club',
    'item type 01 class 1 pic 002': 'Toy Sword',
    'item type 01 class 1 pic 003': 'Flimsy Flail',
    'item type 01 class 1 pic 004': 'Spiked Club',
    'item type 01 class 1 pic 005': 'Molly\'s Hatchet',
    'item type 01 class 1 pic 006': 'Assassination Dagger',
    'item type 01 class 1 pic 007': 'Fight Club',
    'item type 01 class 1 pic 008': 'Handy Axe',
    'item type 01 class 1 pic 009': 'Kitchen Knife',
    'item type 01 class 1 pic 010': 'Mace',
    'item type 01 class 1 pic 011': 'Double Axe',
    'item type 01 class 1 pic 012': 'Ridiculous Rapier',
    'item type 01 class 1 pic 013': 'Fine Flail',
    'item type 01 class 1 pic 014': 'Silverblade',
    'item type 01 class 1 pic 015': 'Longsword',
    'item type 01 class 1 pic 016': 'Thunder Thingy',
    'item type 01 class 1 pic 017': 'Executioner\'s Axe',
    'item type 01 class 1 pic 018': 'Slice-and-Dicer',
    'item type 01 class 1 pic 019': 'Skull Cracker',
    'item type 01 class 1 pic 020': 'Hard Hammer',
    'item type 01 class 1 pic 021': 'King\'s Sword',
    'item type 01 class 1 pic 022': 'Thorn Blade',
    'item type 01 class 1 pic 023': 'Hefty Hammer',
    'item type 01 class 1 pic 024': 'Dragonslayer',
    'item type 01 class 1 pic 025': 'Cursed Axe',
    'item type 01 class 1 pic 026': 'Heroic Sword',
    'item type 01 class 1 pic 027': 'Counter-Argument',
    'item type 01 class 1 pic 028': 'Deathbringer',
    'item type 01 class 1 pic 029': 'Status Symbol',
    'item type 01 class 1 pic 030': 'Demonblade',
    'item type 01 class 1 pic 050': 'Soul Cutter of the Unholy Death Curse',
    'item type 01 class 1 pic 051': 'Hook of the Ship\'s Kobold',
    'item type 01 class 1 pic 052': 'Bone Breaker of Brute Force',
    'item type 01 class 1 pic 053': 'Mr. Massacre 2000',
    'item type 01 class 1 pic 054': 'Snapping turtle on a stick',
    'item type 01 class 1 pic 055': 'Extra strong can opener of penetration',
    'item type 01 class 1 pic 056': 'Morning skull of hangovers',
    'item type 01 class 1 pic 057': 'Demon sword of the evil eye',
    'item type 01 class 1 pic 058': 'The Househusband\'s All-purpose Tool',
    'item type 01 class 1 pic 059': 'Chemical Mace',
    'item type 01 class 1 pic 060': 'Big Butcher\'s Knife',
    'item type 01 class 1 pic 061': 'Brush of Oafishness',
    'item type 01 class 1 pic 062': 'Cleaver of Discord',
    'item type 01 class 1 pic 063': 'Crook of Deceitfulness',
    'item type 01 class 1 pic 064': 'Blade of Pure Gold',
    'item type 01 class 1 pic 065': 'Punisher\'s Blade',
    'item type 01 class 1 pic 066': 'Blue Broadsword of the Drunkard',
    'item type 01 class 1 pic 067': 'Ranged Slapper',
    'item type 01 class 2 pic 001': 'Walking Stick',
    'item type 01 class 2 pic 002': 'Zaza\'s Magic Wand',
    'item type 01 class 2 pic 003': 'Crystal Staff',
    'item type 01 class 2 pic 004': 'Root of All Evil',
    'item type 01 class 2 pic 005': 'Water Staff',
    'item type 01 class 2 pic 006': 'Fire Staff',
    'item type 01 class 2 pic 007': 'Voodoo Staff',
    'item type 01 class 2 pic 008': 'Astral Staff',
    'item type 01 class 2 pic 009': 'Evil Finger',
    'item type 01 class 2 pic 010': 'Soul Eater',
    'item type 01 class 2 pic 050': 'Staff of the Shrunken Head',
    'item type 01 class 2 pic 051': 'Silver Soul Harvester of the Grim Reaper',
    'item type 01 class 2 pic 052': 'Fiery Flame Staff of the Dragon Lord',
    'item type 01 class 2 pic 053': 'Staff of the Swarm',
    'item type 01 class 2 pic 054': 'The Flash',
    'item type 01 class 2 pic 055': 'The janitor\'s wet mop',
    'item type 01 class 2 pic 056': 'The guitar hero\'s murder weapon',
    'item type 01 class 2 pic 057': 'The school girl\'s heart wand',
    'item type 01 class 2 pic 058': 'The Clown\'s Fun Killer',
    'item type 01 class 2 pic 059': 'Dust Thrower of the Leaky Bag',
    'item type 01 class 2 pic 060': 'Candy Cane of Evilness',
    'item type 01 class 2 pic 061': 'Brush of Oafishness',
    'item type 01 class 2 pic 062': 'Cleaver of Discord',
    'item type 01 class 2 pic 063': 'Crook of Deceitfulness',
    'item type 01 class 2 pic 064': 'Enchanter for Skeptics',
    'item type 01 class 2 pic 065': 'The Flasher',
    'item type 01 class 2 pic 066': 'Golden Crutch',
    'item type 01 class 2 pic 067': 'Confetti Cannon',
    'item type 01 class 3 pic 001': 'Slingshot',
    'item type 01 class 3 pic 002': 'Toy Bow',
    'item type 01 class 3 pic 003': 'Short Bow',
    'item type 01 class 3 pic 004': 'Crossbow',
    'item type 01 class 3 pic 005': 'Longbow',
    'item type 01 class 3 pic 006': 'Hunter Bow',
    'item type 01 class 3 pic 007': 'War Bow',
    'item type 01 class 3 pic 008': 'William\'s Crossbow',
    'item type 01 class 3 pic 009': 'Precision Bow',
    'item type 01 class 3 pic 010': 'Poison Spreader',
    'item type 01 class 3 pic 050': 'Dragon Fire',
    'item type 01 class 3 pic 051': 'Kill-o-Matic 5000',
    'item type 01 class 3 pic 052': 'Glowing Neon Bow of Wisdom',
    'item type 01 class 3 pic 053': 'Scout Bow of the Burning Marshmallow',
    'item type 01 class 3 pic 054': 'Piranha Bow of the Gutter',
    'item type 01 class 3 pic 055': 'Realistic rocket bow',
    'item type 01 class 3 pic 056': 'Chicken Master 3000',
    'item type 01 class 3 pic 057': 'Vuvuzela of death',
    'item type 01 class 3 pic 058': 'Shark Harpoon',
    'item type 01 class 3 pic 059': 'Crossbow of the Sniper',
    'item type 01 class 3 pic 060': 'Pocket Catapult',
    'item type 01 class 3 pic 061': 'Brush of Oafishness',
    'item type 01 class 3 pic 062': 'Cleaver of Discord',
    'item type 01 class 3 pic 063': 'Crook of Deceitfulness',
    'item type 01 class 3 pic 064': 'Long-range Gadget',
    'item type 01 class 3 pic 065': 'Infernal Bow',
    'item type 01 class 3 pic 066': 'Crab Piece',
    'item type 01 class 3 pic 067': 'Confetti Cannon',
    'item type 02 class 1 pic 001': 'Hole-riddled Plank',
    'item type 02 class 1 pic 002': 'Trashcan Lid',
    'item type 02 class 1 pic 003': 'Wooden Shield',
    'item type 02 class 1 pic 004': 'Iron Shield',
    'item type 02 class 1 pic 005': 'Warrior\'s Shield',
    'item type 02 class 1 pic 006': 'Skull Shield',
    'item type 02 class 1 pic 007': 'Light Shield',
    'item type 02 class 1 pic 008': 'Heroic Shield',
    'item type 02 class 1 pic 009': 'Chieftain\'s Shield',
    'item type 02 class 1 pic 010': 'Demon Face',
    'item type 02 class 1 pic 050': 'Watchmen Shield of Watching',
    'item type 02 class 1 pic 051': 'Shield of Future Generations',
    'item type 02 class 1 pic 052': 'Shield of Eternal Light',
    'item type 02 class 1 pic 053': 'Diabolic Protection Devil',
    'item type 02 class 1 pic 054': 'Nail Shield of the Fakir',
    'item type 02 class 1 pic 055': 'The wall',
    'item type 02 class 1 pic 056': 'Voodoo grimace of deterrence',
    'item type 02 class 1 pic 057': 'Demonic shield of deformation',
    'item type 02 class 1 pic 058': 'Magnetic Shield of Repulsion',
    'item type 02 class 1 pic 059': 'Distorting Mirror of Deformation',
    'item type 02 class 1 pic 060': 'Portable Bunker',
    'item type 02 class 1 pic 061': 'Color Palette of the Hare',
    'item type 02 class 1 pic 062': 'Killer Pumpkin Warning',
    'item type 02 class 1 pic 063': 'Gift Returnable',
    'item type 02 class 1 pic 064': 'Shield of Determination',
    'item type 02 class 1 pic 065': 'Indestructible shield',
    'item type 02 class 1 pic 066': 'Flames of Justice',
    'item type 02 class 1 pic 067': 'Book of Funny Games',
    'item type 03 class 1 pic 001': 'Full Metal Jacket',
    'item type 03 class 1 pic 002': 'Steel Plate Armor',
    'item type 03 class 1 pic 003': 'Useful Armor',
    'item type 03 class 1 pic 004': 'Tournament Armor',
    'item type 03 class 1 pic 005': 'Pretentious Armor',
    'item type 03 class 1 pic 006': 'Vanity Armor',
    'item type 03 class 1 pic 007': 'Plate Armor',
    'item type 03 class 1 pic 008': 'Hero\'s Armor',
    'item type 03 class 1 pic 009': 'Warrior\'s Armor',
    'item type 03 class 1 pic 010': 'Victory Armor',
    'item type 03 class 1 pic 050': 'Chromatic Chrome Armor',
    'item type 03 class 1 pic 051': 'Flame Steel Armor',
    'item type 03 class 1 pic 052': 'Golden Obesity Armor of the Hedonist',
    'item type 03 class 1 pic 053': 'Costume of the Unknown Hero',
    'item type 03 class 1 pic 054': 'Armor of failed Anger Management',
    'item type 03 class 1 pic 055': 'Glass armor of transparency',
    'item type 03 class 1 pic 056': 'English mailbox of the pun',
    'item type 03 class 1 pic 057': 'Demon armor of the big mouth',
    'item type 03 class 1 pic 058': 'The Plumber\'s Turtle Shell',
    'item type 03 class 1 pic 061': 'Frightful Hare Costume',
    'item type 03 class 1 pic 062': 'Murderer\'s Frock',
    'item type 03 class 1 pic 063': 'North Pole Garb',
    'item type 03 class 1 pic 064': 'Junk Armor of the Plate Brawler',
    'item type 03 class 1 pic 065': 'Mean-looking Armor',
    'item type 03 class 1 pic 066': 'Big Cat Lion Armor',
    'item type 03 class 1 pic 067': 'Jubilarian\'s Best Suit ',
    'item type 03 class 2 pic 001': 'Pajama',
    'item type 03 class 2 pic 002': 'Smock',
    'item type 03 class 2 pic 003': 'Adept\'s Robe',
    'item type 03 class 2 pic 004': 'Shirt',
    'item type 03 class 2 pic 005': 'Stylish Shirt',
    'item type 03 class 2 pic 006': 'Journeyman\'s Robe',
    'item type 03 class 2 pic 007': 'Assistant\'s Robe',
    'item type 03 class 2 pic 008': 'Master\'s Robe',
    'item type 03 class 2 pic 009': 'Grandmaster\'s Robe',
    'item type 03 class 2 pic 010': 'Uber Robe',
    'item type 03 class 2 pic 050': 'Arcane Robe of the Legendary Grand Master',
    'item type 03 class 2 pic 051': 'Fidget\'s Robe',
    'item type 03 class 2 pic 052': 'Freezer Burn Robe of the Cold Store Worker',
    'item type 03 class 2 pic 053': 'Holy Robe of the Unholy',
    'item type 03 class 2 pic 054': 'Terror Tunic of the Grim Reaper',
    'item type 03 class 2 pic 055': 'The attention whore\'s conspicuous jacket',
    'item type 03 class 2 pic 056': 'The magician\'s dapper tailcoat',
    'item type 03 class 2 pic 057': 'Ghostly cape',
    'item type 03 class 2 pic 058': 'Dressing Material of the Mummy',
    'item type 03 class 2 pic 061': 'Frightful Hare Costume',
    'item type 03 class 2 pic 062': 'Murderer\'s Frock',
    'item type 03 class 2 pic 063': 'North Pole Garb',
    'item type 03 class 2 pic 064': 'Oversize Cloak ',
    'item type 03 class 2 pic 065': 'Magic Dressing Gown',
    'item type 03 class 2 pic 066': 'Tapered Rag',
    'item type 03 class 2 pic 067': 'Jubilarian\'s Best Suit ',
    'item type 03 class 3 pic 001': 'Rags',
    'item type 03 class 3 pic 002': 'Cheap Vest',
    'item type 03 class 3 pic 003': 'Cute Vest',
    'item type 03 class 3 pic 004': 'Hunter Jacket',
    'item type 03 class 3 pic 005': 'Serious Armor',
    'item type 03 class 3 pic 006': 'Outdoor Jacket',
    'item type 03 class 3 pic 007': 'Stylish Armor',
    'item type 03 class 3 pic 008': 'Pretentious Armor',
    'item type 03 class 3 pic 009': 'Designer Armor',
    'item type 03 class 3 pic 010': 'Hero\'s Armor',
    'item type 03 class 3 pic 050': 'Bodo Bulk\'s Cuirass',
    'item type 03 class 3 pic 051': 'Bush Stalker\'s Armor of the Bush Stalker',
    'item type 03 class 3 pic 052': 'Demon Massacre Armor',
    'item type 03 class 3 pic 053': 'Leather Harness of the Barbarian King',
    'item type 03 class 3 pic 054': 'Leather Pants of the Beer Consumption',
    'item type 03 class 3 pic 055': 'The frequent flyer\'s pilot jacket',
    'item type 03 class 3 pic 056': 'The graverobber\'s cadaver jacket',
    'item type 03 class 3 pic 057': 'Deadly tentacle jacket',
    'item type 03 class 3 pic 058': 'Dragon Costume of Cuddliness',
    'item type 03 class 3 pic 061': 'Frightful Hare Costume',
    'item type 03 class 3 pic 062': 'Murderer\'s Frock',
    'item type 03 class 3 pic 063': 'North Pole Garb',
    'item type 03 class 3 pic 064': 'Leather Jerkin with Armor',
    'item type 03 class 3 pic 065': 'Vigilantes\' Armor',
    'item type 03 class 3 pic 066': 'Green Danger',
    'item type 03 class 3 pic 067': 'Jubilarian\'s Best Suit ',
    'item type 04 class 1 pic 001': 'Slippers',
    'item type 04 class 1 pic 002': 'Rubber Boots',
    'item type 04 class 1 pic 003': 'Leather Boots',
    'item type 04 class 1 pic 004': 'Plate Boots',
    'item type 04 class 1 pic 005': 'Pretentious Boots',
    'item type 04 class 1 pic 006': 'Warrior\'s Boots',
    'item type 04 class 1 pic 007': 'Knight\'s Boots',
    'item type 04 class 1 pic 008': 'Chieftain\'s Boots',
    'item type 04 class 1 pic 009': 'Hero\'s Boots',
    'item type 04 class 1 pic 010': 'King\'s Boots',
    'item type 04 class 1 pic 050': 'Chromatic Chrome Boots',
    'item type 04 class 1 pic 051': 'Flame Steel Boots',
    'item type 04 class 1 pic 052': 'Golden Obesity Boots',
    'item type 04 class 1 pic 053': 'Robot Feet',
    'item type 04 class 1 pic 054': 'Boots of Uncontrolled Rage',
    'item type 04 class 1 pic 055': 'Unicorn boots',
    'item type 04 class 1 pic 056': 'Steam-powered boots of traction',
    'item type 04 class 1 pic 057': 'Demonic demon boots of the demon',
    'item type 04 class 1 pic 058': 'Stabber\'s Boots',
    'item type 04 class 1 pic 061': 'Rabbit Slippers',
    'item type 04 class 1 pic 062': 'Gourd Clogs',
    'item type 04 class 1 pic 063': 'Boots of Glogg',
    'item type 04 class 1 pic 064': 'Armor Item of Foot',
    'item type 04 class 1 pic 065': 'Stamping Boots of the Lump',
    'item type 04 class 1 pic 066': 'Iron Clubfeet',
    'item type 04 class 1 pic 067': 'Ankle Boots of the Birthday Child',
    'item type 04 class 2 pic 001': 'Sandals',
    'item type 04 class 2 pic 002': 'Slippers',
    'item type 04 class 2 pic 003': 'Leggings',
    'item type 04 class 2 pic 004': 'Fool\'s Footwear',
    'item type 04 class 2 pic 005': 'Adept\'s Boots',
    'item type 04 class 2 pic 006': 'Journeyman\'s Boots',
    'item type 04 class 2 pic 007': 'Assistant\'s Boots',
    'item type 04 class 2 pic 008': 'Master\'s Boots',
    'item type 04 class 2 pic 009': 'Grandmaster\'s Shoes',
    'item type 04 class 2 pic 010': 'Grandmaster\'s Boots',
    'item type 04 class 2 pic 050': 'Arcane Storm Boots of the Battle Mage',
    'item type 04 class 2 pic 051': 'Slippers of the Hero',
    'item type 04 class 2 pic 052': 'Freezer Burn Boots of the Ice-Cream Man',
    'item type 04 class 2 pic 053': 'Giant Hooves of the Sad Clown',
    'item type 04 class 2 pic 054': 'Shoes of the Fire Walker',
    'item type 04 class 2 pic 055': 'Fluffy slippers of cuteness',
    'item type 04 class 2 pic 056': 'Old shoes of bad taste',
    'item type 04 class 2 pic 057': 'The illusionist\'s elegant boots',
    'item type 04 class 2 pic 058': 'Patent-leather Shoes of the Flashy Dude',
    'item type 04 class 2 pic 061': 'Rabbit Slippers',
    'item type 04 class 2 pic 062': 'Gourd Clogs',
    'item type 04 class 2 pic 063': 'Boots of Glogg',
    'item type 04 class 2 pic 064': 'Charming Stinkers',
    'item type 04 class 2 pic 065': 'Evil Stinker',
    'item type 04 class 2 pic 066': 'Richly Ornamented Boots',
    'item type 04 class 2 pic 067': 'Ankle Boots of the Birthday Child',
    'item type 04 class 3 pic 001': 'Slippers',
    'item type 04 class 3 pic 002': 'Smelly Boots',
    'item type 04 class 3 pic 003': 'Hooves',
    'item type 04 class 3 pic 004': 'Solid Shoes',
    'item type 04 class 3 pic 005': 'Decent Boots',
    'item type 04 class 3 pic 006': 'Nice Boots',
    'item type 04 class 3 pic 007': 'Premium Boots',
    'item type 04 class 3 pic 008': 'Designer Boots',
    'item type 04 class 3 pic 009': 'Pretentious Boots',
    'item type 04 class 3 pic 010': 'Hero\'s Boots',
    'item type 04 class 3 pic 050': 'Yellow Rubber Boots of Intensity',
    'item type 04 class 3 pic 051': 'Bush Stalker\'s boots of the Bush Stalker',
    'item type 04 class 3 pic 052': 'Demon Massacre Boots',
    'item type 04 class 3 pic 053': 'Leather Boots of the Barbarian King',
    'item type 04 class 3 pic 054': 'Leather Boots of Dominance',
    'item type 04 class 3 pic 055': 'Cowboy boots',
    'item type 04 class 3 pic 056': 'Treacherous foot parasites',
    'item type 04 class 3 pic 057': 'The express messenger\'s winged boots',
    'item type 04 class 3 pic 058': 'Boots of the Silent Steps',
    'item type 04 class 3 pic 061': 'Rabbit Slippers',
    'item type 04 class 3 pic 062': 'Gourd Clogs',
    'item type 04 class 3 pic 063': 'Boots of Glogg',
    'item type 04 class 3 pic 064': 'Hiking Boots of Progress',
    'item type 04 class 3 pic 065': 'Enemy Territory Invaders',
    'item type 04 class 3 pic 066': 'Undergrowth Strider',
    'item type 04 class 3 pic 067': 'Ankle Boots of the Birthday Child',
    'item type 05 class 1 pic 001': 'Grimy Hooves',
    'item type 05 class 1 pic 002': 'Old Gloves',
    'item type 05 class 1 pic 003': 'New Gloves',
    'item type 05 class 1 pic 004': 'Elegant Gloves',
    'item type 05 class 1 pic 005': 'Chain Gloves',
    'item type 05 class 1 pic 006': 'Warrior\'s Gloves',
    'item type 05 class 1 pic 007': 'Knight\'s Gloves',
    'item type 05 class 1 pic 008': 'Chieftain\'s Gloves',
    'item type 05 class 1 pic 009': 'Heroic Gloves',
    'item type 05 class 1 pic 010': 'Dragon Choker',
    'item type 05 class 1 pic 050': 'Chromatic Chrome Gloves',
    'item type 05 class 1 pic 051': 'Flame Steel Gloves',
    'item type 05 class 1 pic 052': 'Golden Obesity Gloves',
    'item type 05 class 1 pic 053': 'Gloves of the Swiss Army',
    'item type 05 class 1 pic 054': 'Gloves of Boundless Wickedness',
    'item type 05 class 1 pic 055': 'Iron boxing gloves',
    'item type 05 class 1 pic 056': 'Gloves of the bread cutter',
    'item type 05 class 1 pic 057': 'Demonic tentacle gloves',
    'item type 05 class 1 pic 058': 'Mysterious Gloves',
    'item type 05 class 1 pic 061': 'Fluffy Mittens',
    'item type 05 class 1 pic 062': 'Freddy\'s Finger Dings',
    'item type 05 class 1 pic 063': 'Gloves of Contemplation',
    'item type 05 class 1 pic 064': 'Fierce Gauntlet',
    'item type 05 class 1 pic 065': 'Razor-sharp Gloves',
    'item type 05 class 1 pic 066': 'Preciousplatepomppaw',
    'item type 05 class 1 pic 067': 'Manatini',
    'item type 05 class 2 pic 001': 'Disposable Gloves',
    'item type 05 class 2 pic 002': 'Cloth Gloves',
    'item type 05 class 2 pic 003': 'Leather Gloves',
    'item type 05 class 2 pic 004': 'Adept\'s Gloves',
    'item type 05 class 2 pic 005': 'Glory Gloves',
    'item type 05 class 2 pic 006': 'Adjutant\'s Gloves',
    'item type 05 class 2 pic 007': 'Journeyman\'s Gloves',
    'item type 05 class 2 pic 008': 'Assistant\'s Gloves',
    'item type 05 class 2 pic 009': 'Master\'s Gloves',
    'item type 05 class 2 pic 010': 'Grandmaster\'s Gloves',
    'item type 05 class 2 pic 050': 'Arcane Storm Gloves of the Magician',
    'item type 05 class 2 pic 051': 'Arcane Lotion of the Homeopath',
    'item type 05 class 2 pic 052': 'Giant Finger Gloves of the Master Nose Picker',
    'item type 05 class 2 pic 053': 'Cuddly Fleece Gloves of the Damned',
    'item type 05 class 2 pic 054': 'Eerie Mummy Grasp of Osiris',
    'item type 05 class 2 pic 055': 'Shock sock puppets',
    'item type 05 class 2 pic 056': 'Spooky gloves',
    'item type 05 class 2 pic 057': 'The show magician\'s posh gloves',
    'item type 05 class 2 pic 058': 'Inside-out Fingerless Gloves',
    'item type 05 class 2 pic 061': 'Fluffy Mittens',
    'item type 05 class 2 pic 062': 'Freddy\'s Finger Dings',
    'item type 05 class 2 pic 063': 'Gloves of Contemplation',
    'item type 05 class 2 pic 064': 'Glove with Orbit',
    'item type 05 class 2 pic 065': 'Denier of the Arch-Mage ',
    'item type 05 class 2 pic 066': 'Portal Gloves',
    'item type 05 class 2 pic 067': 'Manatini',
    'item type 05 class 3 pic 001': 'Wristband',
    'item type 05 class 3 pic 002': 'Cloth Gloves',
    'item type 05 class 3 pic 003': 'Comfy Gloves',
    'item type 05 class 3 pic 004': 'Fur Gloves',
    'item type 05 class 3 pic 005': 'Leather Gloves',
    'item type 05 class 3 pic 006': 'Hunting Gloves',
    'item type 05 class 3 pic 007': 'Reinforced Gloves',
    'item type 05 class 3 pic 008': 'Archer\'s Gloves',
    'item type 05 class 3 pic 009': 'Chain Gloves',
    'item type 05 class 3 pic 010': 'Glory Gloves',
    'item type 05 class 3 pic 050': 'Gloves of the Bat Guy',
    'item type 05 class 3 pic 051': 'Bush Stalker\'s Gloves of the Bush Stalker',
    'item type 05 class 3 pic 052': 'Demon Massacre Gloves',
    'item type 05 class 3 pic 053': 'Bracers of the Barbarian King',
    'item type 05 class 3 pic 054': 'Burning Fire Gloves of Hell',
    'item type 05 class 3 pic 055': 'Freddy\'s killer gloves',
    'item type 05 class 3 pic 056': 'Ghastly hand parasites',
    'item type 05 class 3 pic 057': 'The snooty person\'s expensive leather gloves',
    'item type 05 class 3 pic 058': 'Equipment of Self-destruction',
    'item type 05 class 3 pic 061': 'Fluffy Mittens',
    'item type 05 class 3 pic 062': 'Freddy\'s Finger Dings',
    'item type 05 class 3 pic 063': 'Gloves of Contemplation',
    'item type 05 class 3 pic 064': 'Very Good Glove',
    'item type 05 class 3 pic 065': 'Model ZX-12',
    'item type 05 class 3 pic 066': 'Nimble-fingered Fiddling Helper',
    'item type 05 class 3 pic 067': 'Manatini',
    'item type 06 class 1 pic 001': 'Cooking Pot',
    'item type 06 class 1 pic 002': 'Steel Hat with Crank',
    'item type 06 class 1 pic 003': 'Helmet and Cap',
    'item type 06 class 1 pic 004': 'Steel Bucket',
    'item type 06 class 1 pic 005': 'Thorn Helm',
    'item type 06 class 1 pic 006': 'Horn Helm',
    'item type 06 class 1 pic 007': 'Chaos Helm',
    'item type 06 class 1 pic 008': 'Jagged Helm',
    'item type 06 class 1 pic 009': 'Grim Mask',
    'item type 06 class 1 pic 010': 'Grim Helm',
    'item type 06 class 1 pic 050': 'Chromatic Chrome Helmet',
    'item type 06 class 1 pic 051': 'Flame Steel Helmet',
    'item type 06 class 1 pic 052': 'Golden Obesity Helmet of the Hedonist',
    'item type 06 class 1 pic 053': 'Hockey Mask of the Lunatic',
    'item type 06 class 1 pic 054': 'Helmet of Violent Temper',
    'item type 06 class 1 pic 055': 'Scary mask of severe fright',
    'item type 06 class 1 pic 056': 'Splendid tournament helmet',
    'item type 06 class 1 pic 057': 'Horned demon helmet',
    'item type 06 class 1 pic 058': 'Armored Goggles of Foresight',
    'item type 06 class 1 pic 061': 'Elongated Ears',
    'item type 06 class 1 pic 062': 'Pumpkin Head',
    'item type 06 class 1 pic 063': 'Punisher\'s Cap',
    'item type 06 class 1 pic 064': 'Helmut\'s Helmet',
    'item type 06 class 1 pic 065': 'Unfriendly Helmet with Underbite',
    'item type 06 class 1 pic 066': 'Bigmouth\'s Bumper Helmet',
    'item type 06 class 1 pic 067': 'Party Hat of Good Mood',
    'item type 06 class 2 pic 001': 'Hat',
    'item type 06 class 2 pic 002': 'Hood',
    'item type 06 class 2 pic 003': 'Little Hat',
    'item type 06 class 2 pic 004': 'Antenna Hat',
    'item type 06 class 2 pic 005': 'Adept\'s Hat',
    'item type 06 class 2 pic 006': 'Journeyman\'s Hat',
    'item type 06 class 2 pic 007': 'Assistant\'s Hat',
    'item type 06 class 2 pic 008': 'Master\'s Hat',
    'item type 06 class 2 pic 009': 'Grandmaster\'s Hat',
    'item type 06 class 2 pic 010': 'Grandmaster\'s Cap',
    'item type 06 class 2 pic 050': 'Alien Laser Deflector Helmet of the Paranoid',
    'item type 06 class 2 pic 051': 'The Anonymizer',
    'item type 06 class 2 pic 052': 'Hat of the Archmage',
    'item type 06 class 2 pic 053': 'Swashbuckler Hat of the Pirate Captain',
    'item type 06 class 2 pic 054': 'Xecl\'Poxle\'s Voodoo Mask',
    'item type 06 class 2 pic 055': '3D glasses for the color blind',
    'item type 06 class 2 pic 056': 'The respectable person\'s noble wig',
    'item type 06 class 2 pic 057': 'Enchanting hat of amazement',
    'item type 06 class 2 pic 058': 'High-born Hat',
    'item type 06 class 2 pic 061': 'Elongated Ears',
    'item type 06 class 2 pic 062': 'Pumpkin Head',
    'item type 06 class 2 pic 063': 'Punisher\'s Cap',
    'item type 06 class 2 pic 064': 'Cap of the Snail Witcher',
    'item type 06 class 2 pic 065': 'Little Bell\'s Magic Cap',
    'item type 06 class 2 pic 066': 'Hat with Own Personality',
    'item type 06 class 2 pic 067': 'Party Hat of Good Mood',
    'item type 06 class 3 pic 001': 'Piece of Cloth with a Ribbon',
    'item type 06 class 3 pic 002': 'Primitive Hood',
    'item type 06 class 3 pic 003': 'Light Cap',
    'item type 06 class 3 pic 004': 'Horned Cap',
    'item type 06 class 3 pic 005': 'Neat Cap',
    'item type 06 class 3 pic 006': 'Neat Helmet',
    'item type 06 class 3 pic 007': 'Imposing Helmet',
    'item type 06 class 3 pic 008': 'Armored Helmet',
    'item type 06 class 3 pic 009': 'Superior Helm',
    'item type 06 class 3 pic 010': 'Hero\'s Helmet',
    'item type 06 class 3 pic 050': 'Draconian Helmet of the Goat Skull',
    'item type 06 class 3 pic 051': 'Bush Stalker\'s Helmet of the Bush Stalker',
    'item type 06 class 3 pic 052': 'Demon Massacre Helmet',
    'item type 06 class 3 pic 053': 'Leather Mask of Dirty Little Secrets',
    'item type 06 class 3 pic 054': 'Swanky Sombrero',
    'item type 06 class 3 pic 055': 'The test pilot\'s experimental cap',
    'item type 06 class 3 pic 056': 'Brain stimulator',
    'item type 06 class 3 pic 057': 'Robin\'s hat',
    'item type 06 class 3 pic 058': 'Portable Observatory',
    'item type 06 class 3 pic 061': 'Elongated Ears',
    'item type 06 class 3 pic 062': 'Pumpkin Head',
    'item type 06 class 3 pic 063': 'Punisher\'s Cap',
    'item type 06 class 3 pic 064': 'Relatively Noticeable Helmet',
    'item type 06 class 3 pic 065': 'An Epic Helmet.',
    'item type 06 class 3 pic 066': 'Hat of Green Hell',
    'item type 06 class 3 pic 067': 'Party Hat of Good Mood',
    'item type 07 class 1 pic 001': 'Old Belt',
    'item type 07 class 1 pic 002': 'Chain Belt',
    'item type 07 class 1 pic 003': 'Stylish Belt',
    'item type 07 class 1 pic 004': 'Warrior\'s Belt',
    'item type 07 class 1 pic 005': 'Pretentious Belt',
    'item type 07 class 1 pic 006': 'Thorn Belt',
    'item type 07 class 1 pic 007': 'Impressive Belt',
    'item type 07 class 1 pic 008': 'Designer Belt',
    'item type 07 class 1 pic 009': 'Hero\'s Belt',
    'item type 07 class 1 pic 010': 'King\'s Belt',
    'item type 07 class 1 pic 050': 'Chromatic Chrome Belt',
    'item type 07 class 1 pic 051': 'Flame Steel Belt',
    'item type 07 class 1 pic 052': 'Briefs of Doubtful Hygiene',
    'item type 07 class 1 pic 053': 'Offensive Belt of Defense',
    'item type 07 class 1 pic 054': 'Furiosity Belt of the Reddening Face',
    'item type 07 class 1 pic 055': 'Blade belt of sharpness',
    'item type 07 class 1 pic 056': 'Belt of the shields',
    'item type 07 class 1 pic 057': 'Demonic belt of fright',
    'item type 07 class 1 pic 058': 'Clingy Fanboy',
    'item type 07 class 1 pic 061': 'Egg Wreath',
    'item type 07 class 1 pic 062': 'Belt of Darkness',
    'item type 07 class 1 pic 063': 'Santa\'s Belt',
    'item type 07 class 1 pic 064': 'Belt of Linkage',
    'item type 07 class 1 pic 065': 'Belt of Fearlessness',
    'item type 07 class 1 pic 066': 'Belt of Obstinacy',
    'item type 07 class 1 pic 067': 'Booze Belt',
    'item type 07 class 2 pic 001': 'Cord',
    'item type 07 class 2 pic 002': 'Cloth Belt',
    'item type 07 class 2 pic 003': 'Leather Belt',
    'item type 07 class 2 pic 004': 'Adept\'s Belt',
    'item type 07 class 2 pic 005': 'Ornate Belt',
    'item type 07 class 2 pic 006': 'Gorgeous Belt',
    'item type 07 class 2 pic 007': 'Journeyman\'s Belt',
    'item type 07 class 2 pic 008': 'Assistant\'s Belt',
    'item type 07 class 2 pic 009': 'Master\'s Belt',
    'item type 07 class 2 pic 010': 'Grandmaster\'s Belt',
    'item type 07 class 2 pic 050': 'Inflatable Swim Ring of the Nonswimmer',
    'item type 07 class 2 pic 051': 'Fidget\'s Belt',
    'item type 07 class 2 pic 052': 'Freezer Burn Belt of the Refrigerator Technician',
    'item type 07 class 2 pic 053': 'Hula Costume of the Accidental Tourist',
    'item type 07 class 2 pic 054': 'Belt of the Mutated Battle Turtle',
    'item type 07 class 2 pic 055': 'Emergency parachute of liquidity',
    'item type 07 class 2 pic 056': 'Belt made of pure magic',
    'item type 07 class 2 pic 057': 'Belt of confident superiority',
    'item type 07 class 2 pic 058': 'Lacy Elven Hair Belt',
    'item type 07 class 2 pic 061': 'Egg Wreath',
    'item type 07 class 2 pic 062': 'Belt of Darkness',
    'item type 07 class 2 pic 063': 'Santa\'s Belt',
    'item type 07 class 2 pic 064': 'All-seeing Belt',
    'item type 07 class 2 pic 065': 'Hypnotic Belt',
    'item type 07 class 2 pic 066': 'Stomach Holder',
    'item type 07 class 2 pic 067': 'Booze Belt',
    'item type 07 class 3 pic 001': 'Patched Belt',
    'item type 07 class 3 pic 002': 'Simple Belt',
    'item type 07 class 3 pic 003': 'Modest Belt',
    'item type 07 class 3 pic 004': 'Thorn Belt',
    'item type 07 class 3 pic 005': 'Decent Belt',
    'item type 07 class 3 pic 006': 'Quality Belt',
    'item type 07 class 3 pic 007': 'Designer Belt',
    'item type 07 class 3 pic 008': 'Chieftain\'s Belt',
    'item type 07 class 3 pic 009': 'Superior Belt',
    'item type 07 class 3 pic 010': 'Hero\'s Belt',
    'item type 07 class 3 pic 050': 'All-purpose Belt of the Bat Guy',
    'item type 07 class 3 pic 051': 'Bush Stalker\'s Belt of the Bush Stalker',
    'item type 07 class 3 pic 052': 'Demon Massacre Belt',
    'item type 07 class 3 pic 053': 'Loincloth of the Barbarian King',
    'item type 07 class 3 pic 054': 'Weapon Belt of the Sheriff',
    'item type 07 class 3 pic 055': 'Green poison belt',
    'item type 07 class 3 pic 056': 'Survival belt of completion',
    'item type 07 class 3 pic 057': 'Parasite Belt',
    'item type 07 class 3 pic 058': 'Tiger Tail Belt',
    'item type 07 class 3 pic 061': 'Egg Wreath',
    'item type 07 class 3 pic 062': 'Belt of Darkness',
    'item type 07 class 3 pic 063': 'Santa\'s Belt',
    'item type 07 class 3 pic 064': 'Belt of Cardinal Directions',
    'item type 07 class 3 pic 065': 'Angler\'s Belt',
    'item type 07 class 3 pic 066': 'One Fits All Belt',
    'item type 07 class 3 pic 067': 'Booze Belt',
    'item type 08 pic 001': 'Magic Tree',
    'item type 08 pic 002': 'Gangster\'s Necklace',
    'item type 08 pic 003': 'Writer\'s Necklace',
    'item type 08 pic 004': 'Bunny Amulet',
    'item type 08 pic 005': 'Ego Necklace',
    'item type 08 pic 006': 'Do-it-yourself Amulet',
    'item type 08 pic 007': 'Mushroom Necklace',
    'item type 08 pic 008': 'Stopwatch',
    'item type 08 pic 009': 'Dog Tag',
    'item type 08 pic 010': 'Sailor\'s Necklace',
    'item type 08 pic 011': 'Gem Amulet',
    'item type 08 pic 012': 'Rune Necklace',
    'item type 08 pic 013': 'Horn of Plenty',
    'item type 08 pic 014': 'Hornshield Necklace',
    'item type 08 pic 015': 'Key Amulet',
    'item type 08 pic 016': 'Granny\'s Pearl Necklace',
    'item type 08 pic 017': 'Rock Amulet',
    'item type 08 pic 018': 'Voodoo Amulet',
    'item type 08 pic 019': 'Staring Necklace',
    'item type 08 pic 020': 'Shiny Amulet',
    'item type 08 pic 021': 'Rock Amulet',
    'item type 08 pic 050': 'Glorious Scarf of the Critic',
    'item type 08 pic 051': 'Snappish Dragon Necklace of the Tooth Fairy',
    'item type 08 pic 052': 'Blinking Chain of Lights',
    'item type 08 pic 053': 'Decadent Necklace of the Oligarch',
    'item type 08 pic 054': 'Cujo\'s Collar of Biting',
    'item type 08 pic 055': 'Epic backstage pass of importance',
    'item type 08 pic 056': 'Demonic necklace',
    'item type 08 pic 057': 'Disgusting leech of the blood game',
    'item type 08 pic 058': 'Classy Bow-tie of the Agent',
    'item type 08 pic 059': 'Burden of Eternal Love',
    'item type 08 pic 060': 'Tie of Integrity',
    'item type 08 pic 061': 'Carrot Chains',
    'item type 08 pic 062': 'Bat Charm',
    'item type 08 pic 063': 'Bushy Beard',
    'item type 08 pic 064': 'Rapture of the Deep',
    'item type 08 pic 065': 'Good Wine',
    'item type 08 pic 066': 'Glow of the Green Fairy',
    'item type 08 pic 067': 'Paper Snake',
    'item type 09 pic 001': 'Lucky Knot',
    'item type 09 pic 002': 'Gumball Machine Ring',
    'item type 09 pic 003': 'Tinfoil Ring',
    'item type 09 pic 004': 'Rubber Ducky Ring',
    'item type 09 pic 005': 'Helix Ring',
    'item type 09 pic 006': 'Star Ring',
    'item type 09 pic 007': 'Noble Ring',
    'item type 09 pic 008': 'Ornament Ring',
    'item type 09 pic 009': 'Massive Ring',
    'item type 09 pic 010': 'Rock Ring',
    'item type 09 pic 011': 'Snake Ring',
    'item type 09 pic 012': 'Diamond Ring',
    'item type 09 pic 013': 'Wing Ring',
    'item type 09 pic 014': 'Skull Ring',
    'item type 09 pic 015': 'Sparkling Ring',
    'item type 09 pic 016': 'Swanky Ring',
    'item type 09 pic 050': 'THE Ring',
    'item type 09 pic 051': 'Golden Skull Ring of Captain Blue Beard',
    'item type 09 pic 052': 'Giant Diamond Ring of the Show-Off',
    'item type 09 pic 053': 'Toxic Thorn Ring of Resistance',
    'item type 09 pic 054': 'Steel Knuckles of the Bar Brawler',
    'item type 09 pic 055': 'Demonic ring of impunity',
    'item type 09 pic 056': 'Curly ring',
    'item type 09 pic 057': 'Ring of fire',
    'item type 09 pic 058': 'Boxing Ring',
    'item type 09 pic 059': 'Eye Ring of the Observer',
    'item type 09 pic 060': 'Invisible Ring',
    'item type 09 pic 061': 'Egg Ring',
    'item type 09 pic 062': 'Ring of Malice',
    'item type 09 pic 063': 'Rudolph\'s Nose Ring',
    'item type 09 pic 064': 'Bug-eyed Ring',
    'item type 09 pic 065': 'Raven Ring With Hole',
    'item type 09 pic 066': 'Dewy-eyed Ring',
    'item type 09 pic 067': 'Ring of the Bottle Cracker',
    'item type 10 pic 001': 'Eye',
    'item type 10 pic 002': 'Dirt',
    'item type 10 pic 003': 'Potted Plant',
    'item type 10 pic 004': 'Half-eaten Sandwich',
    'item type 10 pic 005': 'King\'s Wig',
    'item type 10 pic 006': 'Fake Mustache',
    'item type 10 pic 007': 'Thimble',
    'item type 10 pic 008': 'Red Herring',
    'item type 10 pic 009': 'Holy Grail',
    'item type 10 pic 010': 'Glossy Magazine',
    'item type 10 pic 011': 'Quality Dung',
    'item type 10 pic 012': 'Stumbling Block',
    'item type 10 pic 013': 'Chicken Wing',
    'item type 10 pic 014': 'Half Sword',
    'item type 10 pic 015': 'Ketchup',
    'item type 10 pic 016': 'Flimsy Something',
    'item type 10 pic 017': 'Mysterious Artifact',
    'item type 10 pic 018': 'Silver Spoon',
    'item type 10 pic 019': 'Nail Clipper',
    'item type 10 pic 020': 'Gordian Bra',
    'item type 10 pic 021': 'Crumpled Paper',
    'item type 10 pic 022': 'Funny Nose',
    'item type 10 pic 023': 'Band-Aid',
    'item type 10 pic 024': 'Plunger',
    'item type 10 pic 025': 'Cool Glasses',
    'item type 10 pic 026': 'Icky Cotton Bud',
    'item type 10 pic 027': 'Dick\'s Skull',
    'item type 10 pic 028': 'Marvin\'s Skull',
    'item type 10 pic 029': 'Oscar\'s Skull',
    'item type 10 pic 030': 'Pacifier',
    'item type 10 pic 031': 'Bolt',
    'item type 10 pic 032': 'Useless Stick',
    'item type 10 pic 033': 'Razor Blade',
    'item type 10 pic 034': 'Bruno',
    'item type 10 pic 035': 'Triangle',
    'item type 10 pic 036': 'Cubes',
    'item type 10 pic 037': 'Wisdom Tooth',
    'item type 10 pic 050': 'Treasure Map of Empty Promises',
    'item type 10 pic 051': 'The Forbidden Book',
    'item type 10 pic 052': 'Epic Bathroom Tissue of Superiority',
    'item type 10 pic 053': 'Hilarious Pocket Explosion',
    'item type 10 pic 054': 'David the Talking Zombie Head',
    'item type 10 pic 055': 'Demonic key chain',
    'item type 10 pic 056': 'Hello doggy doll',
    'item type 10 pic 057': 'Voodoo doll of bribery',
    'item type 10 pic 058': 'Pushy Groupie',
    'item type 10 pic 059': 'Toast of the Creator',
    'item type 10 pic 060': 'Black Hole',
    'item type 10 pic 061': 'Dragon Eggs',
    'item type 10 pic 062': 'Sweet Sour',
    'item type 10 pic 063': 'Sack Presents',
    'item type 10 pic 064': 'Epic Lunch',
    'item type 10 pic 065': 'Really Impressive Stone',
    'item type 10 pic 066': 'Triumphant Trump Card',
    'item type 10 pic 067': 'Inflatable Bowels'
}
