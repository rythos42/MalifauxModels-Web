/*globals _, describe, it, expect, Upgrade, InjuryList */
describe('InjuryList', function() {
	it('contains only Upgrade objects which are Campaign Injury', function() {
		_.each(InjuryList.data, function(upgrade) {
			expect(upgrade instanceof Upgrade).toBe(true);
						
			expect(upgrade.isInjury()).toBe(true);
			expect(upgrade.isCampaign()).toBe(true);
		});
	});
});