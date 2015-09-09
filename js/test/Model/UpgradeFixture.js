/*globals describe, it, expect, C, Upgrade */
describe('Upgrade', function() {
	it('sets properties on a Upgrade from constructor', function() {
		var name = 'name',
			factionList = [C.Guild],
			restrictionsList = [C.Living],
			cost = 3,
			upgrade = new Upgrade(name, factionList, restrictionsList, cost);
			
		expect(upgrade.name).toEqual(name);
		expect(upgrade.factionList.length).toEqual(factionList.length);
		expect(upgrade.factionList[0]).toEqual(factionList[0]);
		expect(upgrade.restrictionsList.length).toEqual(restrictionsList.length);
		expect(upgrade.restrictionsList[0]).toEqual(restrictionsList[0]);
		expect(upgrade.cost).toEqual(cost);
	});
	
	it('can clone an upgrade', function() {
		var name = 'name',
			factionList = [C.Guild],
			restrictionsList = [C.Living],
			cost = 3,
			upgrade = new Upgrade(name, factionList, restrictionsList, cost),
			newUpgrade = upgrade.clone();
			
		expect(newUpgrade.name).toEqual(upgrade.name);
		expect(newUpgrade.factionList.length).toEqual(upgrade.factionList.length);
		expect(newUpgrade.factionList[0]).toEqual(upgrade.factionList[0]);
		expect(newUpgrade.restrictionsList.length).toEqual(upgrade.restrictionsList.length);
		expect(newUpgrade.restrictionsList[0]).toEqual(upgrade.restrictionsList[0]);
		expect(newUpgrade.cost).toEqual(cost);
	});
	
	it('an Upgrade has a type of Upgrade', function() {
		var upgrade = new Upgrade();
		
		expect(upgrade.type).toEqual('Upgrade');
	});
	
	it('can tell if it is included in a campaign crew', function() {
		var upgrade = new Upgrade();
		expect(upgrade.includeInCampaignCrew()).toBe(false);
	});
			
	it('can tell if it is an Injury', function() {
		var upgrade = new Upgrade(null, [], [C.Injury], 0, 0);
		
		expect(upgrade.isInjury()).toBe(true);
	});
	
	it('can tell if it is not a Injury', function() {
		var upgrade = new Upgrade(null, [], [], 0, 0);
		
		expect(upgrade.isInjury()).toBe(false);
	});
	
	it('can tell if it is a Campaign upgrade', function() {
		var upgrade = new Upgrade(null, [], [C.Campaign], 0, 0);
		
		expect(upgrade.isCampaign()).toBe(true);
	});
	
	it('can tell if it is not a Campaign upgrade', function() {
		var upgrade = new Upgrade(null, [], [], 0, 0);
		
		expect(upgrade.isCampaign()).toBe(false);
	});
	
	it('can tell if it is an Avatar upgrade', function() {
		var upgrade = new Upgrade(null, [], [C.Avatar], 0, 0);
		
		expect(upgrade.isAvatar()).toBe(true);
	});
	
	it('can tell if it is not an Avatar upgrade', function() {
		var upgrade = new Upgrade(null, [], [], 0, 0);
		
		expect(upgrade.isAvatar()).toBe(false);
	});
});