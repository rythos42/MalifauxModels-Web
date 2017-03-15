/*globals describe, it, expect, SearchCriteria, SearchOption, NotOrIs, TextFieldSearchOption */
describe('SearchCriteria', function() {
	it('has reasonable defaults', function() {
		var searchCriteria = new SearchCriteria();
		
		expect(searchCriteria.selectedSearchOption()).toBe(SearchOption.Default);
		expect(searchCriteria.searchText()).toEqual('');
		expect(searchCriteria.searchBoolean()).toBe('false');
		expect(searchCriteria.notOrIs()).toBe(NotOrIs.Is);
		expect(searchCriteria.isNot()).toBe(false);
		expect(searchCriteria.isIs()).toBe(true);
	});
	
	it('takes values from constructor', function() {
		var searchOption = new TextFieldSearchOption('Name', 'name'),
			searchText = 'Arcane Effigy',
			searchCriteria = new SearchCriteria(searchOption, 'Arcane Effigy', true, NotOrIs.Not);
		
		expect(searchCriteria.selectedSearchOption()).toBe(searchOption);
		expect(searchCriteria.searchText()).toEqual(searchText);
		expect(searchCriteria.searchBoolean()).toBe('true');
		expect(searchCriteria.notOrIs()).toBe(NotOrIs.Not);
		expect(searchCriteria.isNot()).toBe(true);
		expect(searchCriteria.isIs()).toBe(false);
	});
});