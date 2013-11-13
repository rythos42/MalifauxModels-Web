var ModelListManager = {
	search: function(searchText, searchField) {
		var searchList = [],
			data = ModelListMapper.get();
		
		function isMatch(value, searchText) {
			switch(typeof(value)) {
				case 'number':
					if(value === parseInt(searchText, 10))
						return true;
					break;
				case 'string':
					if(value.indexOf(searchText) >= 0)
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
			_.each(data, function(model) {
				var value = model[searchField];
				if(isMatch(value, searchText))
					searchList.push(model);
			});
		}
		else {
			_.each(data, function(model) {
				if(_.find(model, function(value, fieldName) { return isMatch(value, searchText); }))
					searchList.push(model);
			});
		}
		
		return searchList;
	},
	
	_searchTextList: null,	
	searchTextList: function() {
		var self = this;
		
		if(self._searchTextList !== null)
			return self._searchTextList;
			
		var data = ModelListMapper.get();
			
		function split(text) {
			return _.map(text.split(' '), function(string) {
				return string.replace('(', '').replace(')', '');
			});
		}
			
		self._searchTextList = [];
		_.each(data, function(model) {
			self._searchTextList.push.apply(self._searchTextList, split(model.name));
			self._searchTextList.push.apply(self._searchTextList, split(model.faction));
			
			_.each(model.characteristicList, function(characteristic) {
				self._searchTextList.push.apply(self._searchTextList, split(characteristic));
			});
			
			if(model.cost)
				self._searchTextList.push(model.cost + "");
				
			if(model.cache)
				self._searchTextList.push(model.cache + "");
		});
		
		this._searchTextList.sort();
		
		this._searchTextList = _.uniq(this._searchTextList, true);
		return this._searchTextList;
	}
};