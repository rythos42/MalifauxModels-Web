/*globals C, Upgrade */
/*exported InjuryList */
var InjuryList = {
	data: [
		new Upgrade('Fragile', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Shaky Nerves', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Amputation', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Knocked Out', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Hearing Voices', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Crippling Pain', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Not Quite Right', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Blow to the Head', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Slowed Reflexes', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Cursed', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Swamp Hex', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Blood Hex', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Shaken', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Broken Arm', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Fractured Wrist', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Missing Fingers', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Baggage', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Big Head', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Accident Prone', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Easily Distracted', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Flashbacks', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Wanted', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Unfocused', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('Wanders off', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		new Upgrade('A Wayward Adventure', [], [C.Upgrade, C.Campaign, C.Injury, C.Wave3], 0),
		
		new Upgrade('Martyr', [C.Guild], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('In the Name of Research', [C.Guild], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Reltentless', [C.Guild], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Secret Directive', [C.Guild], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Deep Pockets', [C.Guild], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		
		new Upgrade('My Lucky Stitches', [C.Resurrectionist], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Too Many Pieces', [C.Resurrectionist], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Embalmed', [C.Resurrectionist], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Pounce', [C.Resurrectionist], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Spirit', [C.Resurrectionist], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		
		new Upgrade('Hydraulic Limb', [C.Arcanist], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Armor', [C.Arcanist], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('December\'s Hunger', [C.Arcanist], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Bestial Rage', [C.Arcanist], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Steamborg Executioner', [C.Arcanist], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		
		new Upgrade('To The Death', [C.Neverborn], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Silent', [C.Neverborn], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Ravenous', [C.Neverborn], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Slippery', [C.Neverborn], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Doppleganger', [C.Neverborn], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		
		new Upgrade('The Hunter', [C.Outcast], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('The Scholar', [C.Outcast], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('The Scavenger', [C.Outcast], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('The Murderer', [C.Outcast], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('The Chosen', [C.Outcast], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		
		new Upgrade('Stop Hitting Yourself!', [C.Gremlin], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Lowered Expectations', [C.Gremlin], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Twitchy', [C.Gremlin], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Fast Runner', [C.Gremlin], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Scapegoat', [C.Gremlin], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		
		new Upgrade('Out of the Fire', [C.TenThunders], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Arcane Disturbance', [C.TenThunders], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Clear Mind, Pure Body', [C.TenThunders], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Reserves', [C.TenThunders], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0),
		new Upgrade('Ninja Attack!', [C.TenThunders], [C.Upgrade, C.Campaign, C.Injury, C.LuckyMiss, C.Wave3], 0)
	]
};