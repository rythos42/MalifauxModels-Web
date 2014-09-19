/*globals _, ko, Crew, CrewViewModel, TabsManager */
/*exported MultipleCrewsViewModel*/
var MultipleCrewsViewModel = function(crewList) {
	var self = this,
		lastAddedIndex = 0;
	
	self.defaultCrew = ko.observable(null);
	self.crewViewModels = ko.observableArray();
	
	function setFirstAsDefault() {
		self.defaultCrew(crewList()[0]);
		self.crewViewModels()[0].isDefault(true);
	}

	function setOtherTabsAsNotDefault(isDefault, newViewModel) {
		// Don't go through list if changing to not default
		if(!isDefault)
			return;
		
		// Set all the other ones to not default
		_.each(self.crewViewModels(), function(crewViewModel) {
			if(crewViewModel !== newViewModel)
				crewViewModel.isDefault(false);
		});
		
		self.defaultCrew(newViewModel.crew);
	}
	
	function setOtherMenusAsNotOpen(isMenuOpen, newViewModel) {
		// Don't go through list if changing to not default
		if(!isMenuOpen)
			return;
			
		// Set all the other ones to not open
		_.each(self.crewViewModels(), function(crewViewModel) {
			if(crewViewModel !== newViewModel)
				crewViewModel.isMenuOpen(false);
		});
	}
	
	self.closeAllMenus = function() {
		setOtherMenusAsNotOpen(true, null);
	};
	
	crewList.subscribe(function(changes) {
		_.each(changes, function(change) {
			switch(change.status) {
				case 'added':
					var addedCrew = change.value;
					lastAddedIndex++;
					
					var currentName = addedCrew.name();
					if(currentName === '' || currentName === undefined || currentName === null)
						addedCrew.name('Crew ' + lastAddedIndex);
					
					var crewViewModel = new CrewViewModel(addedCrew, 'crew-list-' + lastAddedIndex);
					
					crewViewModel.isDefault.subscribe(function(isDefault) {
						setOtherTabsAsNotDefault(isDefault, crewViewModel);
					});
					
					crewViewModel.isMenuOpen.subscribe(function(isMenuOpen) {
						setOtherMenusAsNotOpen(isMenuOpen, crewViewModel);
					});
			
					crewViewModel.onDeleteCrew.subscribe(function(deleting) {
						if(!deleting)
							return;
							
						crewList.remove(addedCrew);
						TabsManager.refresh();
					});
					
					crewViewModel.onCopyCrew.subscribe(function(copying) {
						if(!copying)
							return;
							
						crewList.push(addedCrew.clone());
						TabsManager.refresh();
					});
					
					self.crewViewModels.push(crewViewModel);
				
					break;
				case 'deleted':
					var removingCrew = change.value;
					var removedViewModel = _.findWhere(self.crewViewModels(), {crew: removingCrew});
										
					if(removedViewModel) {
						self.crewViewModels.remove(removedViewModel);

						// Set new default if we just removed it.
						if(removedViewModel.isDefault())
							setFirstAsDefault();
					}
					
					break;
			}
		});
	}, null, 'arrayChange');
	
	self.addNewCrew = function() {
		crewList.push(new Crew());
	};
	
	crewList.subscribe(function() {
		setTimeout(function() {
			if(self.defaultCrew() === null)
				setFirstAsDefault();
		}, 0);
	});
};