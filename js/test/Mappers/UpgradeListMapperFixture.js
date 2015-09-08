/*globals describe, it, expect, UpgradeList, EquipmentList, SkillList, InjuryList, UpgradeListMapper */
describe('UpgradeListMapper', function() {
	it('returns the model list', function() {
		var list = UpgradeList.data.concat(EquipmentList.data, SkillList.data, InjuryList.data);
		expect(UpgradeListMapper.get()).toEqual(list);
	});
});