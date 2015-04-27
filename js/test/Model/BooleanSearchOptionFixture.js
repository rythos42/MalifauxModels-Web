/*globals describe, it, expect, BooleanSearchOption, Upgrade, Model */
describe('BooleanSearchOption', function() {
	it('has a displayName', function() {
		var displayName = 'display name';
		var option = new BooleanSearchOption(displayName, undefined);
		
		expect(option.displayName).toEqual(displayName);
	});
	
	it('matches when the given boolean function returns what the criteria says to return and both are true', function() {
		var booleanFunction = function() {
			return true;	// this is used in the model to determine if the given addable fulfills the given function
		};
		var option = new BooleanSearchOption('name', booleanFunction);
		var searchCriteria = {
			searchBoolean: function() {
				return 'true';	// this comes from the UI drop down list
			}
		};
		
		expect(option.isMatch('', searchCriteria)).toBe(true);		
	});
	
	it('matches when the given boolean function returns what the criteria says to return and both are false', function() {
		var booleanFunction = function() {
			return false;	// this is used in the model to determine if the given addable fulfills the given function
		};
		var option = new BooleanSearchOption('name', booleanFunction);
		var searchCriteria = {
			searchBoolean: function() {
				return 'false';	// this comes from the UI drop down list
			}
		};
		
		expect(option.isMatch('', searchCriteria)).toBe(true);		
	});
	
	it('does not match when the given boolean function does not return what the criteria says to return', function() {
		var booleanFunction = function() {
			return true;	// this is used in the model to determine if the given addable fulfills the given function
		};
		var option = new BooleanSearchOption('name', booleanFunction);
		var searchCriteria = {
			searchBoolean: function() {
				return 'false';	// this comes from the UI drop down list
			}
		};
		
		expect(option.isMatch('', searchCriteria)).toBe(false);		
	});
	
	it('matches the Is Upgrade function with an Upgrade', function() {
		// Test that this specific configuration from the SearchOption list works
		var option = new BooleanSearchOption('Is Upgrade', function(addable) {
			return addable.restrictionsList !== undefined;
		});
		var searchCriteria = {
			searchBoolean: function() {
				return 'true';	// this comes from the UI drop down list
			}
		};
		
		var upgrade = new Upgrade('name', ['Guild'], ['Living'], 3);
			
		expect(option.isMatch(upgrade, searchCriteria)).toBe(true);
	});	
	
	it('does not match the Is Upgrade function with a Model', function() {
		// Test that this specific configuration from the SearchOption list works
		var option = new BooleanSearchOption('Is Upgrade', function(addable) {
			return addable.restrictionsList !== undefined;
		});
		var searchCriteria = {
			searchBoolean: function() {
				return 'true';	// this comes from the UI drop down list
			}
		};
		
		var model = new Model('name', ['Guild'], ['Living'], 3);
			
		expect(option.isMatch(model, searchCriteria)).toBe(false);
	});
});