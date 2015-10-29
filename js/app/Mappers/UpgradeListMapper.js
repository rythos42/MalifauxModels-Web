/*globals UpgradeList, EquipmentList, SkillList, InjuryList, LuckyMissList */
/*exported UpgradeListMapper */
var UpgradeListMapper = {
	get: function() {
		return UpgradeList.data.concat(EquipmentList.data, SkillList.data, InjuryList.data, LuckyMissList.data);
	}
};