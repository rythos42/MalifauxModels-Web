var Crew = function() {
	var self = this;
	
	self.name = ko.observable('');
	self.availableSoulstones = ko.observable(50);
	self.added = ko.observableArray();
	
	self.clone = function() {
		var clone = new Crew();
		clone.name(self.name());
		clone.availableSoulstones(self.availableSoulstones());
		
		_.each(self.added(), function(addable) {
			clone.added.push(addable);
		});
		
		return clone;
	};
	
	self.getLeader = function() {
		return _.find(self.added(), function(addable) {
			if(!addable.isLeader)
				return;
				
			return addable.isLeader();
		});
	};
	
	self.hasLeader = function() {
		return self.getLeader() !== undefined;
	};
	
	self.removeFromCrew = function(addable) {
		self.added.remove(addable);
	};
	
	self.setAsLeader = function(addable) {
		_.each(self.added(), function(addable) {
			if(!addable.isLeader)
				return;
				
			addable.isLeader(false);
		});
		addable.isLeader(true);
	};
	
	self.addToCrew = function(addable) {
		if(!self.hasLeader() && addable.canBeLeader && addable.canBeLeader())
			addable.isLeader(true);
	
		self.added.push(addable);
	};
		
	self.totalCost = ko.computed(function() {
		return _.reduce(self.added(), function(currentTotal, addable) {
			if(addable.isLeader && addable.isLeader())
				return currentTotal;
		
			return (addable.cost 
				? currentTotal + addable.cost 
				: currentTotal);
		}, 0);
	});
};