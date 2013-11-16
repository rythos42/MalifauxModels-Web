var AddableViewModel = function(addable, crew) {
	var self = this;

	self.name = addable.name;
	self.factions = ko.computed(function() {
		return addable.factionList.join(', ');
	});

	self.extras = ko.computed(function() {
		if(addable.characteristicList)
			return addable.characteristicList.join(', ');
			
		if(addable.restrictionsList)
			return addable.restrictionsList.join(', ');
		
		return '';
	});

	self.cost = addable.cost;
	self.cache = addable.cache;

	self.addToCrew = function() {
		crew.addToCrew(addable.clone());
	};
}