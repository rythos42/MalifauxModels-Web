var IndexViewModel = function() {
	var self = this,
		crew = new Crew();
		
	AddableListManager.addSearchData(ModelListMapper.get());
	AddableListManager.addSearchData(UpgradeListMapper.get());

	self.searchText = ko.observable('');

	self.searchList = ko.observableArray();
	self.search = function() {
		var list = AddableListManager.search(self.searchText(), self.selectedSearchOption().fieldName);
		self.searchList(_.map(list, function(addable) {
			return new AddableViewModel(addable, crew);
		}));
	};

	self.selectedSearchOption = ko.observable(null);
	self.searchOptions = [
		new SearchOption('Any', ''),
		new SearchOption('Name', 'name'),
		new SearchOption('Faction', 'factionList'),
		new SearchOption('Extras', 'characteristicList'),
		new SearchOption('Cost', 'cost'),
		new SearchOption('Cache', 'cache')
	];

	self.searchTextSuggestions = AddableListManager.searchTextList();

	var currentSort = null;
	self.sortBy = function(fieldName) {
		var list = self.searchList();
		
		if(fieldName === currentSort)
			self.searchList(self.searchList().reverse());
		else 		
			self.searchList(_.sortBy(list, function(addableViewModel) { 
				var fieldValue = addableViewModel[fieldName];
				if(ko.isObservable(fieldValue))
					fieldValue = fieldValue();
			
				return fieldValue; 
			}));
			
		currentSort = fieldName;
	};

	self.crewViewModel = new CrewViewModel(crew);
};