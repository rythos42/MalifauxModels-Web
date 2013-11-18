var SearchCriteriaViewModel = function(searchCriteria) {
	var self = this;
	
	self.selectedSearchOption = searchCriteria.selectedSearchOption;
	self.searchText = searchCriteria.searchText;
	
	self.hasFocus = ko.observable(false);
			
	function isSingleValueMatch(value, searchText) {
		switch(typeof(value)) {
			case 'number':
				if(value === parseInt(searchText, 10))
					return true;
				break;
			case 'string':
				if(value.toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
					return true;
				break;
			case 'object':
				var isSubMatch = false;
				_.each(value, function(arrayItem) {
					if(isSingleValueMatch(arrayItem, searchText)) {
						isSubMatch = true;
						return false;
					}
					return true;
				});
				return isSubMatch;
		}
		return false;
	}
	
	self.isMatch = function(addable) {
		var searchField = self.selectedSearchOption().fieldName,
			searchText = self.searchText();
	
		if(searchField !== '')
			return isSingleValueMatch(addable[searchField], searchText);
		else
			return _.find(addable, function(value, fieldName) { return isSingleValueMatch(value, searchText); });
	};
};