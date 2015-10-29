/*globals UpgradeList, EquipmentList, SkillList, InjuryList */
/*exported UpgradeListMapper */
var UpgradeListMapper = {
	get: function() {
		return UpgradeList.data.concat(EquipmentList.data, SkillList.data, InjuryList.data, LuckyMissList.data);
	}
};