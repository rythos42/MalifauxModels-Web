/*globals _, ko, AddedViewModel, DeviceManager, TabsManager, PersistenceManager, CrewAssembler */
/*exported CrewViewModel */
var CrewViewModel = function(crew, crewTabId) {
	var self = this;
	
	self.crew = crew;
	self.availableSoulstones = crew.availableSoulstones;
	self.crewTotal = crew.totalCost;
	self.crewName = crew.name;
	self.crewMemberViewModels = ko.observableArray();
	self.crewTabId = ko.observable(crewTabId);
	self.hrefCrewTabId = ko.computed(function() { return '#' + self.crewTabId(); });
	
	self.isMenuOpen = ko.observable(false);
	self.openMenu = function() {
		self.isMenuOpen(!self.isMenuOpen());
	};
	
	self.isDefault = ko.observable(false);
	self.setAsDefault = function() {
		self.isDefault(true);
		self.isMenuOpen(false);
	};
	
	self.onDeleteCrew = ko.observable(false);
	self.deleteCrew = function() {
		self.onDeleteCrew(true);
	};
	
	function doRenameCrew(results) {
		self.crewName(results.input1);
		self.isMenuOpen(false);
	}
	
	self.renameCrew = function() {
		if(DeviceManager.instance.isCordova()) {
			navigator.notification.prompt('New name:', doRenameCrew, 'Rename Crew', ['Ok','Cancel']);
		} 
		else {
			var newName = prompt('New name:');
			if(newName)
				doRenameCrew({buttonIndex: 1, input1: newName});
		}
	};
	
	self.onCopyCrew = ko.observable(false);
	self.copyCrew = function() {
		self.isMenuOpen(false);
		
		self.onCopyCrew(true);
		self.onCopyCrew(false);
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
	
	var preventCrewAddedSubscription = false;
	crew.added.subscribe(function(changes) {
		if(!preventCrewAddedSubscription)
			_.each(changes, updateAddedCrewList);
	}, null, 'arrayChange');
	
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
			cache = (leader ? leader.cache : 0);
			
		var available = parseInt(crew.availableSoulstones(), 10);
		return available - crew.totalCost() - (7 - cache);
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
	
		preventCrewAddedSubscription = true;
		crew.added.splice(targetIndex, 0, crew.added.splice(sourceIndex, 1)[0]);
		preventCrewAddedSubscription = false;
	};
	
	self.plainTextCrew = ko.observable('');
	self.showPlainText = ko.computed(function() { return self.plainTextCrew() !== ''; } );
	
	self.hidePlainText = function() {
		self.plainTextCrew('');
	};
	
	self.shareCrew = function() {
		// Ran into a problem where in the app, the crew was an older version compared to what was shared.
		PersistenceManager.instance.save();
	
		var crewText = '-- ' + self.crewName() + ' --\r\n\r\n';
		
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

		if(DeviceManager.instance.isCordova()) {
			// Use the Share mobile feature
			window.plugins.socialsharing.share(crewText);
		} 
		else {
			self.plainTextCrew(crewText);
		}
	};
	
	self.saveCrew = function() {
		var crewString = encodeURIComponent(ko.toJSON(crew));
		
		var pom = document.createElement('a');
		pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + crewString);
		pom.setAttribute('download', self.crewName() + '.json');
		pom.click();
	};
	
	self.onUploadCrew = function(crewJsonString) {
		CrewAssembler.fromJson(self.crew, JSON.parse(crewJsonString));
	};
};