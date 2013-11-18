var SearchCriteriaViewModel = function(searchCriteria) {
	var self = this;
	
	self.selectedSearchOption = searchCriteria.selectedSearchOption;
	self.searchText = searchCriteria.searchText;
	self.searchBoolean = searchCriteria.searchBoolean;
		
	self.isTextFieldSearch = ko.computed(function() {
		var searchOption = self.selectedSearchOption();
		return searchOption instanceof TextFieldSearchOption || searchOption instanceof MultipleTextFieldSearchOption;
	});
	
	self.isBooleanSearch = ko.computed(function() {
		return self.selectedSearchOption() instanceof BooleanSearchOption;
	});
	
	self.hasFocus = ko.observable(false);
	
	self.isMatch = function(addable) {
		return self.selectedSearchOption().isMatch(addable, searchCriteria);
	};	
};