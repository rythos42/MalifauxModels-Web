var IndexViewModel = function() {
	var self = this,
		crew = new Crew();
		
	AddableListManager.addSearchData(ModelListMapper.get());
	AddableListManager.addSearchData(UpgradeListMapper.get());
	
	self.addableList = ko.observableArray();
	self.searchCriteriaList = ko.observableArray();

	function search() {
		var list = AddableListManager.search(self.searchCriteriaList());
		self.addableList(_.map(list, function(addable) {
			return new AddableViewModel(addable, crew);
		}));
	};
	search();
	
	
	self.addCriteria = function() {
		var newCriteria = new SearchCriteria(),
			newCriteriaViewModel = new SearchCriteriaViewModel(newCriteria);		
		
		newCriteria.selectedSearchOption.subscribe(search);
		newCriteria.searchText.subscribe(search);
		newCriteriaViewModel.hasFocus(true);
	
		self.searchCriteriaList.push(newCriteriaViewModel);
	};
	self.addCriteria();

	
	self.searchTextSuggestions = AddableListManager.searchTextList();

	var currentSort = null;
	self.sortBy = function(fieldName) {
		var list = self.addableList();
		
		if(fieldName === currentSort)
			self.addableList(self.addableList().reverse());
		else 		
			self.addableList(_.sortBy(list, function(addableViewModel) { 
				var fieldValue = addableViewModel[fieldName];
				if(ko.isObservable(fieldValue))
					fieldValue = fieldValue();
			
				return fieldValue; 
			}));
			
		currentSort = fieldName;
	};

	self.crewViewModel = new CrewViewModel(crew);
};