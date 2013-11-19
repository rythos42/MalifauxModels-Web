var IndexViewModel = function() {
	var self = this,
		crew = new Crew();
		
	AddableListManager.addSearchData(ModelListMapper.get());
	AddableListManager.addSearchData(UpgradeListMapper.get());
	
	self.searchCriteriaList = ko.observableArray();
	
	function criteriaListHasChanged() {
		self.searchCriteriaList.valueHasMutated();
	}
	
	self.addCriteria = function(setFocus) {
		var criteriaList = self.searchCriteriaList,
			newCriteria = new SearchCriteria(),
			newCriteriaViewModel = new SearchCriteriaViewModel(newCriteria, criteriaList().length === 0, criteriaList);		
		
		newCriteria.selectedSearchOption.subscribe(criteriaListHasChanged);
		newCriteria.searchText.subscribe(criteriaListHasChanged);
		newCriteria.searchBoolean.subscribe(criteriaListHasChanged);
		
		if(setFocus)
			newCriteriaViewModel.hasFocus(true);
	
		self.searchCriteriaList.push(newCriteriaViewModel);
	};
	self.addCriteria(false);

		
	self.addableList = ko.computed(function() {
		var list = AddableListManager.search(self.searchCriteriaList());
		return _.map(list, function(addable) {
			return new AddableViewModel(addable, crew);
		});
	}).extend({throttle: 1});
	
	
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