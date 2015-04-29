/*globals describe, it, expect, TextFieldSearchOption, SearchCriteria, NotOrIs */
describe('TextFieldSearchOption', function() {
	it('has a display name', function() {
		var option = new TextFieldSearchOption('Name', 'name'); 
		
		expect(option.displayName).toEqual('Name');
	});
	
	it('can match a number', function() {
		var option = new TextFieldSearchOption('Name', 'name'),
			addable = { name: 3 },
			searchCriteria = new SearchCriteria(option, '3', true, NotOrIs.Is);
					
		expect(option.isMatch(addable, searchCriteria)).toBe(true);
	});	
	
	it('fails to match a number', function() {
		var option = new TextFieldSearchOption('Name', 'name'),
			addable = { name: 3 },
			searchCriteria = new SearchCriteria(option, '4', true, NotOrIs.Is);
					
		expect(option.isMatch(addable, searchCriteria)).toBe(false);
	});
			
	it('can match not a number', function() {
		var option = new TextFieldSearchOption('Name', 'name'),
			addable = { name: 3 },
			searchCriteria = new SearchCriteria(option, '4', true, NotOrIs.Not);
					
		expect(option.isMatch(addable, searchCriteria)).toBe(true);
	});
	
	it('fails to match not a number', function() {
		var option = new TextFieldSearchOption('Name', 'name'),
			addable = { name: 3 },
			searchCriteria = new SearchCriteria(option, '3', true, NotOrIs.Not);
					
		expect(option.isMatch(addable, searchCriteria)).toBe(false);
	});
	
	it('can match a string', function() {
		var option = new TextFieldSearchOption('Name', 'name'),
			addable = { name: 'Arcane Effigy' },
			searchCriteria = new SearchCriteria(option, 'Arcane Effigy', true, NotOrIs.Is);
					
		expect(option.isMatch(addable, searchCriteria)).toBe(true);
	});
	
	it('can match not a string', function() {
		var option = new TextFieldSearchOption('Name', 'name'),
			addable = { name: 'Arcane Effigy' },
			searchCriteria = new SearchCriteria(option, 'who knows', true, NotOrIs.Not);
					
		expect(option.isMatch(addable, searchCriteria)).toBe(true);
	});
	
	it('can match a partial string', function() {
		var option = new TextFieldSearchOption('Name', 'name'),
			addable = { name: 'Arcane Effigy' },
			searchCriteria = new SearchCriteria(option, 'Effigy', true, NotOrIs.Is);
					
		expect(option.isMatch(addable, searchCriteria)).toBe(true);
	});
	
	it('fails to match a string', function() {
		var option = new TextFieldSearchOption('Name', 'name'),
			addable = { name: 'Arcane Effigy' },
			searchCriteria = new SearchCriteria(option, 'Whatever', true, NotOrIs.Is);
					
		expect(option.isMatch(addable, searchCriteria)).toBe(false);
	});
	
	it('can match a string case insensitive', function() {
		var option = new TextFieldSearchOption('Name', 'name'),
			addable = { name: 'arcane effigy' },
			searchCriteria = new SearchCriteria(option, 'ArCane EfFigy', true, NotOrIs.Is);
					
		expect(option.isMatch(addable, searchCriteria)).toBe(true);
	});	
	
	it('fails to not match a string', function() {
		var option = new TextFieldSearchOption('Name', 'name'),
			addable = { name: 'Arcane Effigy' },
			searchCriteria = new SearchCriteria(option, 'Arcane Effigy', true, NotOrIs.Not);
					
		expect(option.isMatch(addable, searchCriteria)).toBe(false);
	});
	
	it('fails to not match a partial string', function() {
		var option = new TextFieldSearchOption('Name', 'name'),
			addable = { name: 'Arcane Effigy' },
			searchCriteria = new SearchCriteria(option, 'Effigy', true, NotOrIs.Not);
					
		expect(option.isMatch(addable, searchCriteria)).toBe(false);
	});
	
	it('fails to not match a string case insensitive', function() {
		var option = new TextFieldSearchOption('Name', 'name'),
			addable = { name: 'arcane effigy' },
			searchCriteria = new SearchCriteria(option, 'ArCane EfFigy', true, NotOrIs.Not);
					
		expect(option.isMatch(addable, searchCriteria)).toBe(false);
	});
	
	it('can match a property on an array', function() {
		var option = new TextFieldSearchOption('Name', 'name'),
			addable = { name: ['Guild'] },
			searchCriteria = new SearchCriteria(option, 'Guild', true, NotOrIs.Is);
					
		expect(option.isMatch(addable, searchCriteria)).toBe(true);
	});
	
	it('fails to match a property on an array', function() {
		var option = new TextFieldSearchOption('Name', 'name'),
			addable = { name: ['Guild'] },
			searchCriteria = new SearchCriteria(option, 'NottheG', true, NotOrIs.Is);
					
		expect(option.isMatch(addable, searchCriteria)).toBe(false);
	});
	
	it('can match not a property on an array', function() {
		var option = new TextFieldSearchOption('Name', 'name'),
			addable = { name: ['Guild'] },
			searchCriteria = new SearchCriteria(option, 'NottheG', true, NotOrIs.Not);
					
		expect(option.isMatch(addable, searchCriteria)).toBe(true);
	});
	
	it('can match a property deeper in an array', function() {
		var option = new TextFieldSearchOption('Name', 'name'),
			addable = { name: ['Filthy ressers', 'Guild'] },
			searchCriteria = new SearchCriteria(option, 'Guild', true, NotOrIs.Is);
					
		expect(option.isMatch(addable, searchCriteria)).toBe(true);
	});
	
	it('can match a property in an object', function() {
		var option = new TextFieldSearchOption('Name', 'name'),
			addable = { name: { anotherName: 'Guild' } },
			searchCriteria = new SearchCriteria(option, 'Guild', true, NotOrIs.Is);
					
		expect(option.isMatch(addable, searchCriteria)).toBe(true);
	});
	
	it('can match a Faction', function() {
		var factionOption = new TextFieldSearchOption('Faction', 'factionList'),
			addable = { factionList: ['Guild'] },
			searchCriteria = new SearchCriteria(factionOption, 'Guild', true, NotOrIs.Is);
					
		expect(factionOption.isMatch(addable, searchCriteria)).toBe(true);
	});
	
	it('can match a Cost', function() {
		var costOption = new TextFieldSearchOption('Cost', 'cost'),
			addable = { cost: 5 },
			searchCriteria = new SearchCriteria(costOption, '5', true, NotOrIs.Is);
					
		expect(costOption.isMatch(addable, searchCriteria)).toBe(true);
	});
	
	it('can match a Cache', function() {
		var cacheOption = new TextFieldSearchOption('Cache', 'cache'),
			addable = { cache: 15 },
			searchCriteria = new SearchCriteria(cacheOption, '15', true, NotOrIs.Is);
					
		expect(cacheOption.isMatch(addable, searchCriteria)).toBe(true);
	});
});