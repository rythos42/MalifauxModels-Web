var AddedModelViewModel = function(model, indexViewModel) {
	var self = this;
	
	self.name = model.name;
	self.cost = model.cost;
	self.cache = model.cache;
	
	self.isLeader = ko.observable(false);
	
	self.removeFromCrew = function() {
		indexViewModel.removeFromCrew(self);
	};
	
	self.canBeLeader = ko.computed(function() {
		return !self.isLeader() && self.cache;
	});
	
	self.setAsLeader = function() {
		indexViewModel.clearLeader();
		self.isLeader(true);
	};
};