var IndexViewModel = function(crew, criteriaList) {
	var self = this;
		
	AddableListManager.addSearchData(ModelListMapper.get());
	AddableListManager.addSearchData(UpgradeListMapper.get());
	
	self.searchCriteriaList = ko.observableArray();
	
	function criteriaListHasChanged() {
		self.searchCriteriaList.valueHasMutated();
	}
	
	self.addBlankCriteria = function() {
		criteriaList.push(new SearchCriteria());
	};
	
	criteriaList.subscribe(function(changes) {
		var crewList = crew.added();
		
		_.each(changes, function(change) {
			switch(change.status) {
				case 'added':
					var newCriteria = change.value;
					
					newCriteria.selectedSearchOption.subscribe(criteriaListHasChanged);
					newCriteria.searchText.subscribe(criteriaListHasChanged);
					newCriteria.searchBoolean.subscribe(criteriaListHasChanged);
					newCriteria.notOrIs.subscribe(criteriaListHasChanged);
					
					newCriteriaViewModel = new SearchCriteriaViewModel(newCriteria, criteriaList);
					
					self.searchCriteriaList.push(newCriteriaViewModel);

					// If not the first item, set the focus to the text box.
					if(self.searchCriteriaList().length !== 1)
						newCriteriaViewModel.hasFocus(true);
						
					break;

				case 'deleted':
					var deletingCriteria = change.value;
					var removedViewModel = _.findWhere(self.searchCriteriaList(), {searchCriteria: deletingCriteria});
					self.searchCriteriaList.remove(removedViewModel);
					break;
			}
		});
	}, null, "arrayChange");

	self.addBlankCriteria();
	
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