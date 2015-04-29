/*globals describe, it, expect, ModelList, ModelListMapper */
describe('ModelListMapper', function() {
	it('returns the model list', function() {
		expect(ModelListMapper.get()).toBe(ModelList.data);
	});
});