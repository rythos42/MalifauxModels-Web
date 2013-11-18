var AddableListManager = {
	addSearchData: function(data) {
		if(!this._searchData)
			this._searchData = [];
			
		this._searchData.push.apply(this._searchData, data);
	},

	search: function(searchCriteriaList) {
		var searchList = [],
			data = this._searchData;
			
		function isMatch(addable) {
			// if we ever return a truthy value from the find, it is NOT a match
			return !_.find(searchCriteriaList, function(searchCriteria) {
				// if it matches, return false to continue through criteria list
				return !searchCriteria.isMatch(addable);
			});
		}
		
		var list = _.filter(data, function(addable) {
			return isMatch(addable);
		});
		return list;
	},
	
	_searchTextList: null,	
	searchTextList: function() {
		var self = this;
		
		if(self._searchTextList !== null)
			return self._searchTextList;
			
		var data = this._searchData;
			
		function split(text) {
			return _.map(text.split(' '), function(string) {
				return string.replace('(', '').replace(')', '');
			});
		}
			
		self._searchTextList = [];
		_.each(data, function(addable) {
			_.each(addable, function(value, name) {
				if(value !== 0 && !value)
					return;
			
				switch(typeof(value)) {
					case 'string':
						self._searchTextList.push.apply(self._searchTextList, split(value));
						break;
					case 'number':
						self._searchTextList.push(value + "");
						break;
					case 'object':
						_.each(value, function(arrayItem) {
							self._searchTextList.push.apply(self._searchTextList, split(arrayItem));
						});
						break;
				}
			});
		});
		
		this._searchTextList.sort();
		
		this._searchTextList = _.uniq(this._searchTextList, true);
		return this._searchTextList;
	}
};