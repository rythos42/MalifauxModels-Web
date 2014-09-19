/*globals _, TextFieldSearchOption */
/*exported MultipleTextFieldSearchOption */
var MultipleTextFieldSearchOption = function(displayName, multipleFieldsList) {
	var self = this;
	
	self.displayName = displayName;
	
	var textSearchList = _.map(multipleFieldsList, function(fieldName) {
		return new TextFieldSearchOption(displayName, fieldName);
	});
	
	self.isMatch = function(addable, searchCriteria) {
		if(searchCriteria.isNot()) {
			var foundNotTextExists = false;
			_.each(textSearchList, function(textSearch) {
				if(!textSearch.isMatch(addable, searchCriteria))
					foundNotTextExists = true;
			});
			return !foundNotTextExists;
		}
		else {
			return _.find(textSearchList, function(textSearch) {
				return textSearch.isMatch(addable, searchCriteria);
			});
		}
	
	};
};