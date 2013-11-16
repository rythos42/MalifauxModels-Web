var AddableListManager = {
	addSearchData: function(data) {
		if(!this._searchData)
			this._searchData = [];
			
		this._searchData.push.apply(this._searchData, data);
	},

	search: function(searchText, searchField) {
		var searchList = [],
			data = this._searchData;
			
		function isMatch(value, searchText) {
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
						if(isMatch(arrayItem, searchText)) {
							isSubMatch = true;
							return false;
						}
						return true;
					});
					return isSubMatch;
			}
			return false;
		}
	
		if(searchField !== '') {
			_.each(data, function(addable) {
				var value = addable[searchField];
				if(isMatch(value, searchText))
					searchList.push(addable);
			});
		}
		else {
			_.each(data, function(addable) {
				if(_.find(addable, function(value, fieldName) { return isMatch(value, searchText); }))
					searchList.push(addable);
			});
		}
		
		return searchList;
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