/*global describe, it, expect, NotOrIs */
describe('NotOrIs', function() {
	it('has Not defined', function() {
		expect(NotOrIs.Not).toBeDefined();
	});
	
	it('has Is defined', function() {
		expect(NotOrIs.Is).toBeDefined();
	});
	
	it('has Not different from Is', function() {
		expect(NotOrIs.Is).not.toEqual(NotOrIs.Not);
	});	
});