/*exported BooleanSearchOption */
var BooleanSearchOption = function(displayName, booleanFunction) {
	var self = this;
	
	self.displayName = displayName;
	
	self.isMatch = function(addable, searchCriteria) {
		var searchBoolean = searchCriteria.searchBoolean();
		
		return (booleanFunction(addable) + '') === searchBoolean;
	};
};