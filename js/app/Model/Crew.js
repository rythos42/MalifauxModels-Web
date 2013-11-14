var Crew = function() {
	var self = this;
	
	self.availableSoulstones = ko.observable(50);
	self.models = ko.observableArray();
	
	self.getLeader = function() {
		return _.find(self.models(), function(model) {
			return model.isLeader();
		});
	};
	
	self.removeFromCrew = function(model) {
		self.models.remove(model);
	};
	
	self.setAsLeader = function(model) {
		_.each(self.models(), function(model) {
			model.isLeader(false);
		});
		model.isLeader(true);
	};
	
	self.addToCrew = function(model) {
		if(self.getLeader() === undefined && model.cache)
			model.isLeader(true);
	
		self.models.push(model);
	};
		
	self.totalCost = ko.computed(function() {
		return _.reduce(self.models(), function(currentTotal, model) {
			if(model.isLeader())
				return currentTotal;
		
			return (model.cost 
				? currentTotal + model.cost 
				: currentTotal);
		}, 0);
	});
};