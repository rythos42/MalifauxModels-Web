/*globals describe, it, expect, Upgrade */
describe('Upgrade', function() {
	it('sets properties on a Upgrade from constructor', function() {
		var name = 'name',
			factionList = ['Guild'],
			restrictionsList = ['Living'],
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
			factionList = ['Guild'],
			restrictionsList = ['Living'],
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
});