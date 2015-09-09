/*globals _, describe, it, expect, C, Upgrade, SkillList */
describe('SkillList', function() {
	it('contains only Upgrade objects which are Campaign Skills', function() {
		_.each(SkillList.data, function(upgrade) {
			expect(upgrade instanceof Upgrade).toBe(true);
						
			var isSkill = _.find(upgrade.restrictionsList, function(restriction) { return restriction === C.Skill; }) !== undefined;
			expect(isSkill).toBe(true);
			expect(upgrade.isCampaign()).toBe(true);
		});
	});
});