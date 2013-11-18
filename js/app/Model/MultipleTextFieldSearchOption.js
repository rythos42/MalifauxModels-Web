var MultipleTextFieldSearchOption = function(displayName, multipleFieldsList) {
	var self = this;
	
	self.displayName = displayName;
	
	var textSearchList = _.map(multipleFieldsList, function(fieldName) {
		return new TextFieldSearchOption(displayName, fieldName);
	});
	
	self.isMatch = function(addable, searchCriteria) {
		return _.find(textSearchList, function(textSearch) {
			return textSearch.isMatch(addable, searchCriteria);
		});
	};
};