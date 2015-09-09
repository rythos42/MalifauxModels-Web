/*globals _, describe, it, expect, C, Upgrade, EquipmentList */
describe('EquipmentList', function() {
	it('contains only Upgrade objects which are Campaign Equipment', function() {
		_.each(EquipmentList.data, function(upgrade) {
			expect(upgrade instanceof Upgrade).toBe(true);
						
			var isEquipment = _.find(upgrade.restrictionsList, function(restriction) { return restriction === C.Equipment; }) !== undefined;
			expect(isEquipment).toBe(true);
			expect(upgrade.isCampaign()).toBe(true);
		});
	});
});