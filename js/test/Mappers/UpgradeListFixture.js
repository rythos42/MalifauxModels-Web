/*globals _,describe, it, expect, Upgrade, UpgradeList */
describe('UpgradeList', function() {
	it('contains only Upgrade objects', function() {
		_.each(UpgradeList.data, function(upgrade) {
			expect(upgrade instanceof Upgrade).toBe(true);
		});
	});
});