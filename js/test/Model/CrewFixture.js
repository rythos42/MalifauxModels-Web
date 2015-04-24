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
	
	it('can set a model as a leader', function() {
		var model = {isLeader: ko.observable(true)};
		crew.added.push(model);

		var newLeader = {isLeader: ko.observable(false)};
		crew.added.push(newLeader);
		
		crew.setAsLeader(newLeader);
		
		expect(crew.getLeader()).toBe(newLeader);
		expect(model.isLeader()).toBe(false);
		expect(newLeader.isLeader()).toBe(true);
	});
	
	it('can add a model to the crew', function() {
		var model = {isLeader: ko.observable(true)};
		crew.addToCrew(model);
		
		expect(crew.added().length).toBe(1);
	});
	
	it('sets the leader if there is none when adding new member', function() {
		var model = {
			isLeader: ko.observable(false),
			canBeLeader: ko.observable(true)
		};
		
		crew.addToCrew(model);
		expect(crew.getLeader()).toBe(model);	
		expect(model.isLeader()).toBe(true);	
	});
	
	it('does not set the leader if there is a leader already', function() {
		var model = {
			isLeader: ko.observable(false),
			canBeLeader: ko.observable(true)
		};

		var modelTwo = {
			isLeader: ko.observable(false),
			canBeLeader: ko.observable(true)
		};
		
		crew.addToCrew(model);
		crew.addToCrew(modelTwo);
		
		expect(crew.getLeader()).toBe(model);	
		expect(model.isLeader()).toBe(true);
	});
	
	it('does not set the leader if the new added model can not be the leader', function() {
		var model = {
			isLeader: ko.observable(false),
			canBeLeader: ko.observable(false)
		};
		
		crew.addToCrew(model);
		
		expect(crew.hasLeader()).toBe(false);	
	});
	
	it('can calculate the cost of a crew', function() {
		crew.addToCrew({cost: 1});
		crew.addToCrew({cost: 2});
		crew.addToCrew({cost: 3});
		
		expect(crew.totalCost()).toEqual(6);
	});
	
	it('ignores models with no cost in calculation', function() {
		crew.addToCrew({cost: 1});
		crew.addToCrew({cost: 2});
		crew.addToCrew({});
		
		expect(crew.totalCost()).toEqual(3);
	});	
	
	it('ignores leader models in calculation', function() {
		crew.addToCrew({cost: 1});
		crew.addToCrew({cost: 2});
		crew.addToCrew({isLeader: ko.observable(true), cost: 3});
		
		expect(crew.totalCost()).toEqual(3);
	});
});