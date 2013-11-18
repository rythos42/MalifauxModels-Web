var TextFieldSearchOption = function(displayName, fieldName) {
	var self = this;
	
	self.displayName = displayName;
	
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
	
	self.isMatch = function(addable, searchCriteria) {
		return isSingleValueMatch(addable[fieldName], searchCriteria.searchText());
	};	
};