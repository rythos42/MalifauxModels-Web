var AddedModelViewModel = function(model, crew) {
	var self = this;
	
	self.name = model.name;
	self.cost = model.cost;
	self.cache = model.cache;
	self.isLeader = model.isLeader;
	self.canBeLeader = model.canBeLeader;
	
	self.removeFromCrew = function() {
		crew.removeFromCrew(model);
	};
	
	self.setAsLeader = function() {
		crew.setAsLeader(model);
	};
};