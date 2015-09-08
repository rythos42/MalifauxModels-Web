/*globals C, Upgrade */
/*exported EquipmentList */
var EquipmentList = {
	data: [
		new Upgrade('Can O\' Beans', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Coffee', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 0),
		new Upgrade('Whiskey', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 0),
		new Upgrade('Helmet', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Clockwork Seeker', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Tool Kit', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Flammenwerfer', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Collier Pistol', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Soulstone Ale', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 0),
		new Upgrade('Katanas', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Machete', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 0),
		new Upgrade('Ancient Scrolls', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Freikorps Suit', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 0),
		new Upgrade('Metal Plate', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Greatsword', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 2),
		new Upgrade('Scope', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 0),
		new Upgrade('Extended Blade', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Aetheric Disruptor', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Snares', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Dynamite', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 0),
		new Upgrade('Flak Jacket', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 0),
		new Upgrade('Hydraulics', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Grotesque Trophy', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Jetpack', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 0),
		new Upgrade('Healing Salve', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 0),
		new Upgrade('Relic Hammer', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Gatling Gun', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Those Who Thirst: Edict', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 2),
		new Upgrade('Those Who Thirst: Insight', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 2),
		new Upgrade('Those Who Thirst: Blight', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 2),
		new Upgrade('Those Who Thirst: Covenant', [], [C.Upgrade, C.Campaign, C.Equipment, C.Wave3], 2),
		
		new Upgrade('Retribution', [C.Guild], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Modified Barrel', [C.Guild], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Improvised Explosives', [C.Guild], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		
		new Upgrade('Restless Dead', [C.Resurrectionist], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Anaphylactic Shock', [C.Resurrectionist], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Extra Limbs', [C.Resurrectionist], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Edge of Eternity', [C.Resurrectionist], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		
		new Upgrade('Tools of the Trade', [C.Arcanist], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Welding Torch', [C.Arcanist], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('A Cold Wind', [C.Arcanist], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Stage Makeup', [C.Arcanist], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		
		new Upgrade('Echoes of Madness', [C.Neverborn], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Our Commands', [C.Neverborn], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('On Our Ground', [C.Neverborn], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		
		new Upgrade('Aetheric Feed', [C.Outcast], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Paid in Advance', [C.Outcast], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		
		new Upgrade('Dolly Makin\' Time', [C.Gremlin], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Extra Powder', [C.Gremlin], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Long-Lost Cousin', [C.Gremlin], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Swamp Gas', [C.Gremlin], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		
		new Upgrade('Combo', [C.TenThunders], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Debts Paid', [C.TenThunders], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		new Upgrade('Lead From the Front', [C.TenThunders], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 1),
		
		new Upgrade('Favors of Steel', [], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 0),
		new Upgrade('Favors of Wind', [], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 0),
		new Upgrade('Favors of Fate', [], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 2),
		new Upgrade('Favors of Death', [], [C.Upgrade, C.Reward, C.Campaign, C.Equipment, C.Wave3], 0)		
	]
};