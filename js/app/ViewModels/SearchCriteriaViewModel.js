/*globals _, ko, TextFieldSearchOption, MultipleTextFieldSearchOption, BooleanSearchOption */
/*exported SearchCriteriaViewModel */
var SearchCriteriaViewModel = function(searchCriteria, criteriaList) {
	var self = this;
	
	self.searchCriteria = searchCriteria;
	self.selectedSearchOption = searchCriteria.selectedSearchOption;
	self.searchText = searchCriteria.searchText;
	self.searchBoolean = searchCriteria.searchBoolean;
	self.notOrIs = searchCriteria.notOrIs;
	self.hasFocus = ko.observable(false);
	self.notFirstCriteria = ko.computed(function() {
		return _.indexOf(criteriaList(), searchCriteria) !== 0;
	});
		
	self.isTextFieldSearch = ko.computed(function() {
		var searchOption = self.selectedSearchOption();
		return searchOption instanceof TextFieldSearchOption || searchOption instanceof MultipleTextFieldSearchOption;
	});
	
	self.isBooleanSearch = ko.computed(function() {
		return self.selectedSearchOption() instanceof BooleanSearchOption;
	});
	
	self.isMatch = function(addable) {
		return self.selectedSearchOption().isMatch(addable, searchCriteria);
	};
	
	self.removeCriteria = function() {
		criteriaList.remove(searchCriteria);
	};
};