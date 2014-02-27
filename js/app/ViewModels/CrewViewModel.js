var CrewViewModel = function(crew) {
	var self = this;
	
	self.availableSoulstones = crew.availableSoulstones;
	self.crewTotal = crew.totalCost;
	self.crewViewModels = ko.observableArray();
	
	crew.added.subscribe(function(changes) {
		_.each(changes, function(change) {
			switch(change.status) {
				case 'added':
					// We always add to the end of the array.
					var crewList = crew.added();
					var addedModel = crewList[crewList.length - 1];
					self.crewViewModels.push(new AddedViewModel(addedModel, crew));
					break;
				case 'deleted':
					var removedModel = self.crewViewModels()[change.index];
					self.crewViewModels.remove(removedModel);
					break;
			}
		});
	

	}, null, "arrayChange");

	self.removeFromCrew = function(addable) {
		crew.added.remove(addable);

		if(addable.isLeader && addable.isLeader()) {
			_.each(crew.added(), function(crewModel) {
				if(crewModel.canBeLeader && crewModel.canBeLeader())
					crewModel.isLeader(true);
			});
		}	
	};
	
	self.hasCrew = ko.computed(function() {
		return crew.added().length > 0;
	});
		
	self.remainingSoulstones = ko.computed(function() {
		return parseInt(crew.availableSoulstones(), 10) - crew.totalCost();
	});
	
	self.soulstonePool = ko.computed(function() {
		var leader = crew.getLeader(),
			cache = (leader ? leader.cache : 0),
			remaining = self.remainingSoulstones();
		
		return Math.min(remaining + cache, 7);
	});
	
	
	
	/*
	Code used for PhoneGap implementation
	*/
	self.canShare = ko.computed(function() {
		return window._cordovaNative;
	});
	
	self.shareCrew = function() {
		var crewText = '';
		
		_.each(self.crewViewModels(), function(addedViewModel) {
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
		
		window.plugins.socialsharing.share(crewText);
	};
};