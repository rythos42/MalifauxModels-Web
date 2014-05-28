var CrewViewModel = function(crew, crewTabId) {
	var self = this;
	
	self.crew = crew;
	self.availableSoulstones = crew.availableSoulstones;
	self.crewTotal = crew.totalCost;
	self.crewMemberViewModels = ko.observableArray();
	self.crewTabId = ko.observable(crewTabId);
	self.hrefCrewTabId = ko.computed(function() { return '#' + self.crewTabId(); });
	
	var thisTabIndex = crewTabId.substring(crewTabId.lastIndexOf('-') + 1);
	self.crewName = ko.observable('Crew ' + thisTabIndex);
	
	self.isMenuOpen = ko.observable(false);
	self.openMenu = function() {
		self.isMenuOpen(!self.isMenuOpen());
	};
	
	self.isDefault = ko.observable(false);
	self.setAsDefault = function() {
		self.isDefault(true);
		self.isMenuOpen(false);
	};
	
	self.onDeleteTab = ko.observable(false);
	self.deleteTab = function() {
		self.onDeleteTab(true);
	};
	
	function updateAddedCrewList(change) {
		var crewList = crew.added();
		switch(change.status) {
			case 'added':
				// We always add to the end of the array.
				var addedModel = change.value;
				self.crewMemberViewModels.push(new AddedViewModel(addedModel, crew));
				break;
			case 'deleted':
				var addable = change.value;
				var removedViewModel = _.findWhere(self.crewMemberViewModels(), {addable: addable});
				self.crewMemberViewModels.remove(removedViewModel);
				
				// Set a new leader if we just removed one
				if(addable.isLeader && addable.isLeader()) {
					_.each(crewList, function(crewModel) {
						if(crewModel.canBeLeader && crewModel.canBeLeader())
							crewModel.isLeader(true);
					});
				}	
				break;
		}
	}
	
	crew.added.subscribe(function(changes) {
		_.each(changes, updateAddedCrewList);
	}, null, "arrayChange");
	
	if(crew.added().length !== 0) {
		_.each(crew.added(), function(member) {
			updateAddedCrewList({
				status: 'added',
				value: member
			});			
		});
	}

	self.hasCrew = ko.computed(function() {
		return crew.added().length > 0;
	});
		
	self.remainingSoulstones = ko.computed(function() {
		return parseInt(crew.availableSoulstones(), 10) - crew.totalCost();
	});
	
	self.remainingSoulstonesWithMaximumPool = ko.computed(function() {
		var leader = crew.getLeader(),
			cache = (leader ? leader.cache : 0),
			remaining = self.remainingSoulstones();
			
		var available = parseInt(crew.availableSoulstones(), 10);
		return available - crew.totalCost() - (7 - cache)
	});
	
	self.soulstonePool = ko.computed(function() {
		var leader = crew.getLeader(),
			cache = (leader ? leader.cache : 0),
			remaining = self.remainingSoulstones();
		
		return Math.min(remaining + cache, 7);
	});
	
	self.clearCrew = function() {
		crew.added.removeAll();
		TabsManager.refresh();
	};
	
	self.updateModel = function(arg) {
		var sourceIndex = arg.sourceIndex,
			targetIndex = arg.targetIndex;
	
		crew.added.splice(targetIndex, 0, crew.added.splice(sourceIndex, 1)[0]);
	};
	
	
	/*
	Code used for PhoneGap implementation
	*/
	self.canShare = ko.computed(function() {
		return DeviceManager.instance.isCordova();
	});
	
	self.shareCrew = function() {
		// Ran into a problem where in the app, the crew was an older version compared to what was shared.
		PersistenceManager.instance.save();
	
		var crewText = '';
		
		_.each(self.crewMemberViewModels(), function(addedViewModel) {
			if(addedViewModel.isUpgrade)
				crewText += '\t';
		
			crewText += addedViewModel.name;
			
			if(addedViewModel.cost)
				crewText += ', ' + addedViewModel.cost + 'SS';
			
			crewText += '\r\n';
		});
		
		crewText += '\r\n';
		crewText += 'Available Soulstones: ' + self.availableSoulstones() + '\r\n';
		crewText += 'Total: ' + self.crewTotal() + '\r\n';
		crewText += 'Pool: ' + self.soulstonePool() + '\r\n';
		crewText += '\r\n';
		crewText += 'Shared from MalifauxModels (geeksong.com/Malifaux, or Google Play).\r\n';

		window.plugins.socialsharing.share(crewText);
	};
};