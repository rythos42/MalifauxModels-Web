var Upgrade = function(name, factionList, restrictionsList, cost) {
	var self = this;
	
	self.name = name;
	self.factionList = factionList;
	self.restrictionsList = restrictionsList;
	self.cost = cost;
	
	self.clone = function() {
		return new Upgrade(name, factionList, restrictionsList, cost);
	};
	
	self.type = "Upgrade";
};