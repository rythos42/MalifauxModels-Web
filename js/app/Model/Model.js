var Model = function(name, faction, characteristicList, cost, cache) {
	var self = this;
	
	self.name = name;
	self.faction = faction;
	self.characteristicList = characteristicList;
	self.cost = cost;
	self.cache = cache;
	
	self.isLeader = ko.observable(false);
			
	self.canBeLeader = ko.computed(function() {
		return !self.isLeader() && self.cache;
	});
}