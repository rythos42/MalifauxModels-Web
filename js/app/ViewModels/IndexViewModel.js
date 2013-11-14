var IndexViewModel = function() {
	var self = this,
		crew = new Crew();
	
	self.searchText = ko.observable('');

	self.searchList = ko.observableArray();
	self.search = function() {
		var list = ModelListManager.search(self.searchText(), self.selectedSearchOption().fieldName);
		self.searchList(_.map(list, function(model) {
			return new ModelViewModel(model, crew);
		}));
	};
	
	self.selectedSearchOption = ko.observable(null);
	self.searchOptions = [
		new SearchOption('Any', ''),
		new SearchOption('Name', 'name'),
		new SearchOption('Faction', 'faction'),
		new SearchOption('Characteristics', 'characteristicList'),
		new SearchOption('Cost', 'cost'),
		new SearchOption('Cache', 'cache')
	];
	
	self.searchTextSuggestions = ModelListManager.searchTextList();
	
	self.getFieldNameForDisplayName = function(displayName) {
		var option = _.find(self.searchOptions, function(option) { return option.displayName === displayName; });
		if(option === undefined)
			return null;
		return option.fieldName;
	};
	
	var currentSort = null;
	self.sortBy = function(fieldName) {
		var list = self.searchList();
		
		if(fieldName === currentSort)
			self.searchList(self.searchList().reverse());
		else 		
			self.searchList(_.sortBy(list, function(modelViewModel) { return modelViewModel[fieldName]; }));
			
		currentSort = fieldName;
	};
	
	self.crewViewModel = new CrewViewModel(crew);
};