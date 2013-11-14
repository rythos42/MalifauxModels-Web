var CrewViewModel = function(crew) {
	var self = this;
	
	self.availableSoulstones = crew.availableSoulstones;
	self.crewTotal = crew.totalCost;
	
	self.crewViewModels = ko.computed(function() {
		return _.map(crew.models(), function(model) {
			return new AddedModelViewModel(model, crew);
		});
	});

	self.removeFromCrew = function(model) {
		crew.models.remove(model);

		if(model.isLeader()) {
			_.each(crew.models(), function(crewModel) {
				if(crewModel.canBeLeader())
					crewModel.isLeader(true);
			});
		}	
	};
	
	self.hasCrew = ko.computed(function() {
		return crew.models().length > 0;
	});
		
	self.remainingSoulstones = ko.computed(function() {
		var leader = crew.getLeader();
		var cache = (leader ? leader.cache : 0);
	
		return parseInt(crew.availableSoulstones(), 10) - crew.totalCost() + cache;
	});
};