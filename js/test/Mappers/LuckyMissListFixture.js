/*globals _, describe, it, expect, C, Upgrade, LuckyMissList */
describe('LuckyMissList', function() {
	it('contains only Upgrade objects which are LuckyMisses', function() {
		_.each(LuckyMissList.data, function(upgrade) {
			expect(upgrade instanceof Upgrade).toBe(true);
						
			var isSkill = _.find(upgrade.restrictionsList, function(restriction) { return restriction === C.LuckyMiss; }) !== undefined;
			expect(isSkill).toBe(true);
			expect(upgrade.isCampaign()).toBe(true);
		});
	});
});