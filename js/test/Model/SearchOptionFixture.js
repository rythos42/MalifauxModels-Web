/*globals describe, it, expect, SearchOption */
describe('SearchOption', function() { 
	it('has a default search option defined', function() {
		expect(SearchOption.Default.displayName).toEqual('Any');
	});
	
	it('has a list of available search options', function() {
		expect(SearchOption.List.length).toBe(7);
		expect(SearchOption.List[0].displayName).toEqual('Any');
		expect(SearchOption.List[1].displayName).toEqual('Name');
		expect(SearchOption.List[2].displayName).toEqual('Faction');
		expect(SearchOption.List[3].displayName).toEqual('Extras');
		expect(SearchOption.List[4].displayName).toEqual('Cost');
		expect(SearchOption.List[5].displayName).toEqual('Cache');
		expect(SearchOption.List[6].displayName).toEqual('Is Upgrade');
	});
});