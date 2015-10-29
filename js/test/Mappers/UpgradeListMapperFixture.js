/*globals describe, it, expect, UpgradeList, EquipmentList, SkillList, InjuryList, LuckyMissList, UpgradeListMapper */
describe('UpgradeListMapper', function() {
	it('returns the model list', function() {
		var list = UpgradeList.data.concat(EquipmentList.data, SkillList.data, InjuryList.data, LuckyMissList.data);
		expect(UpgradeListMapper.get()).toEqual(list);
	});
});