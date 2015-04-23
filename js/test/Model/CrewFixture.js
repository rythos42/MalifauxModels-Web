/*globals describe, it, expect, beforeEach, ko, Crew */
describe('Crew', function() {
	var crew;

	beforeEach(function() {
		crew = new Crew();
	});

	it('has a name property', function() {
		expect(crew.name).toBeDefined();
		expect(ko.isObservable(crew.name)).toBe(true);
		expect(crew.name()).toEqual('');
	});

	it('has an availableSoulstones property', function() {
		expect(crew.availableSoulstones).toBeDefined();
		expect(ko.isObservable(crew.availableSoulstones)).toBe(true);
		expect(crew.availableSoulstones()).toEqual(50);
	});
	
	it('has an added property', function() {
		expect(crew.added).toBeDefined();
		expect(ko.isObservable(crew.added)).toBe(true);
		expect(crew.added()).toEqual([]);
	});
	
	it('can clone the crew', function() {
		crew.name('name');
		crew.availableSoulstones(12);
		crew.added.push({thing: true});
		
		var clone = crew.clone();
		
		expect(clone.name()).toEqual(crew.name());
		expect(clone.availableSoulstones()).toEqual(crew.availableSoulstones());
		expect(clone.added().length).toEqual(crew.added().length);
		expect(clone.added()[0]).toBe(crew.added()[0]);
	});
	
	it('returns the leader', function() {
		var model = {isLeader: ko.observable(true)};
		crew.added.push(model);
		
		expect(crew.getLeader()).toBe(model);
	});	
	
	it('can change the leader', function() {
		var originalLeader = {isLeader: ko.observable(true)};
		var newLeader = {isLeader: ko.observable(false)};
		crew.added.push(originalLeader);
		crew.added.push(newLeader);
		
		originalLeader.isLeader(false);
		newLeader.isLeader(true);
		
		expect(crew.getLeader()).toBe(newLeader);
	});
	
	it('knows if it has a leader', function() {
		var model = {isLeader: ko.observable(true)};
		crew.added.push(model);
		
		expect(crew.hasLeader()).toBe(true);
	});
	
	it('can remove a model', function() {
		var model = {thing: true};
		crew.added.push(model);
		
		crew.removeFromCrew(model);
		
		expect(crew.added().length).toBe(0);
	});
});

/*	
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
};*/