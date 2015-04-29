/*globals _,describe, it, expect, Model, ModelList */
describe('ModelList', function() {
	it('contains only Model objects', function() {
		_.each(ModelList.data, function(model) {
			expect(model instanceof Model).toBe(true);
		});
	});
});