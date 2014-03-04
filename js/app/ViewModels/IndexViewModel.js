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
		newCriteria.notOrIs.subscribe(criteriaListHasChanged);
		
		self.searchCriteriaList.push(newCriteriaViewModel);

		if(setFocus)
			newCriteriaViewModel.hasFocus(true);

	};
	self.addCriteria(false);
	
	self.addableList = ko.observableArray();
	
	var currentModelList = [];
	self.searchCriteriaList.subscribe(function(criteria) {
		currentModelList = AddableListManager.search(criteria)
		
		var viewModelList = _.first(currentModelList, 100);
		self.addableList(_.map(viewModelList, function(addable) {
			return new AddableViewModel(addable, crew);
		}));
	});
	
	self.addNextModelItems = function() {
		var start = self.addableList().length + 1;
		if(start >= currentModelList.length)
			return;
		
		var nextViewModelList = currentModelList.slice(start, start+100);
		
		self.addableList.push.apply(self.addableList, _.map(nextViewModelList, function(addable) {
			return new AddableViewModel(addable, crew);
		}));
	};
		
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