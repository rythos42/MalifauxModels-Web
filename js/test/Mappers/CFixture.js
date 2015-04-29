/*globals describe, it, expect, C */
describe('C', function() {
	it('creates a totem name', function() {
		var totemName = C.TotemFor('Hoffman');
		
		expect(totemName).toEqual(C.Totem + ' (Hoffman)');
	});
});