/*globals describe, it, expect, UpgradeList, UpgradeListMapper */
describe('UpgradeListMapper', function() {
	it('returns the model list', function() {
		expect(UpgradeListMapper.get()).toBe(UpgradeList.data);
	});
});