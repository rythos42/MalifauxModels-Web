/*globals describe, it, expect, beforeEach, ko, C, Crew, Upgrade, Model */
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
		
	it('has an isArsenal property', function() {
		expect(crew.isArsenal).toBeDefined();
		expect(ko.isObservable(crew.isArsenal)).toBe(true);
		expect(crew.isArsenal()).toBe(false);
	});
	
	it('has a scrip property', function() {
		expect(crew.scrip).toBeDefined();
		expect(ko.isObservable(crew.scrip)).toBe(true);
		expect(crew.scrip()).toEqual(0);
	});
	
	it('has a makingCampaignCrew property', function() {
		expect(crew.makingCampaignCrew).toBeDefined();
		expect(ko.isObservable(crew.makingCampaignCrew)).toBe(true);
		expect(crew.makingCampaignCrew()).toBe(false);
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
	
	it('can tell if a model is in the leaders faction', function() {
		var leader = {factionList: [C.Guild], isLeader: ko.observable(true)};
		crew.added.push(leader);
		
		var guildModel = {factionList: [C.Guild]};
		
		expect(crew.isModelInLeaderFaction(guildModel)).toBe(true);
	});
	
	it('can tell if a model is not in the leaders faction', function() {
		var leader = {factionList: [C.Guild], isLeader: ko.observable(true)};
		crew.added.push(leader);
		
		var arcanistModel = {factionList: [C.Arcanist]};
		
		expect(crew.isModelInLeaderFaction(arcanistModel)).toBe(false);
	});
	
	it('can tell if a model is in the leaders faction if the factions are complex', function() {
		var leader = {factionList: [C.Guild, C.Neverborn], isLeader: ko.observable(true)};
		crew.added.push(leader);
		
		var arcanistModel = {factionList: [C.Arcanist, C.Guild]};
		expect(crew.isModelInLeaderFaction(arcanistModel)).toBe(true);
	});
	
	it('can tell if a model is not in the leaders faction if the factions are complex', function() {
		var leader = {factionList: [C.Guild, C.Neverborn], isLeader: ko.observable(true)};
		crew.added.push(leader);
		
		var outcastModel = {factionList: [C.Outcast, C.Arcanist]};
		expect(crew.isModelInLeaderFaction(outcastModel)).toBe(false);
	});
	
	it('can calculate a campaign rating', function() {
		var equipment = new Upgrade(null, null, [C.Campaign, C.Equipment]),
			injury = new Upgrade(null, null, [C.Campaign, C.Injury]),
			skill = new Upgrade(null, null, [C.Campaign, C.Skill]);
			
		equipment.includeInCampaignCrew(true);
		injury.includeInCampaignCrew(true);
		skill.includeInCampaignCrew(true);
		
		crew.added.push(equipment);
		crew.added.push(injury);
		crew.added.push(skill);
		
		expect(crew.campaignRating()).toEqual(1);
	});	
	
	it('skips objects that are not included in the campaign crew', function() {
		var equipment = new Upgrade(null, null, [C.Campaign, C.Equipment]),
			injury = new Upgrade(null, null, [C.Campaign, C.Injury]),
			skill = new Upgrade(null, null, [C.Campaign, C.Skill]);
			
		equipment.includeInCampaignCrew(true);
		injury.includeInCampaignCrew(false);
		skill.includeInCampaignCrew(true);
		
		crew.added.push(equipment);
		crew.added.push(injury);
		crew.added.push(skill);
		
		expect(crew.campaignRating()).toEqual(2);
	});
	
	it('properly adds 3 for an Avatar campaign upgrade', function() {
		var avatar = new Upgrade(null, null, [C.Campaign, C.Avatar]);
		crew.added.push(avatar);
		avatar.includeInCampaignCrew(true);
		
		expect(crew.campaignRating()).toEqual(3);
	});
	
	it('counts maximumEncounterSize for basic models', function() {
		crew.added.push(new Model(null, null, null, 1));
		crew.added.push(new Model(null, null, null, 2));
		crew.added.push(new Model(null, null, null, 3));
		
		expect(crew.maximumEncounterSize()).toEqual(6+5);
	});	
	
	it('counts maximumEncounterSize, ignoring null cost', function() {
		crew.added.push(new Model(null, null, null, 1));
		crew.added.push(new Model(null, null, null, 2));
		crew.added.push(new Model(null, null, null, null));
		
		expect(crew.maximumEncounterSize()).toEqual(3+5);
	});	
	
	it('counts maximumEncounterSize, ignoring Upgrades', function() {
		crew.added.push(new Model(null, null, null, 1));
		crew.added.push(new Model(null, null, null, 2));
		crew.added.push(new Upgrade(null, null, null, 1));
		
		expect(crew.maximumEncounterSize()).toEqual(3+5);
	});
	
	it('counts maximumEncounterSize, adding 15 for the Master', function() {
		crew.isArsenal(true);
		var leader = new Model(null, [C.Guild], [C.Master], null, 1);
		leader.isLeader(true);
		crew.added.push(leader);
		crew.added.push(new Model(null, null, null, 2));
		
		expect(crew.maximumEncounterSize()).toEqual(17+5);
	});
	
	it('counts maximumEncounterSize, adding 13 minus cache for the Henchman', function() {
		crew.isArsenal(true);
		var leader = new Model(null, [C.Guild], [C.Henchman], null, 1);
		leader.isLeader(true);
		crew.added.push(leader);
		crew.added.push(new Model(null, null, null, 2));
		
		expect(crew.maximumEncounterSize()).toEqual(14+5);
	});
	
	it('counts maximumEncounterSize, adding an additional cost for non-Faction Mercenaries', function() {
		var leader = new Model(null, [C.Guild], [C.Master], null, 1);
		leader.isLeader(true);
		crew.added.push(leader);
		crew.added.push(new Model(null, [C.Neverborn], [C.Mercenary], 1));
		
		expect(crew.maximumEncounterSize()).toEqual(2+5);
	});	
	
	it('counts totalCost for basic models', function() {
		crew.added.push(new Model(null, null, null, 1));
		crew.added.push(new Model(null, null, null, 2));
		crew.added.push(new Model(null, null, null, 3));
		
		expect(crew.totalCost()).toEqual(6);
	});	
	
	it('counts totalCost, ignoring null cost', function() {
		crew.added.push(new Model(null, null, null, 1));
		crew.added.push(new Model(null, null, null, 2));
		crew.added.push(new Model(null, null, null, null));
		
		expect(crew.totalCost()).toEqual(3);
	});	
	
	it('counts totalCost, including Upgrades', function() {
		crew.added.push(new Model(null, null, null, 1));
		crew.added.push(new Model(null, null, null, 2));
		crew.added.push(new Upgrade(null, null, null, 1));
		
		expect(crew.totalCost()).toEqual(4);
	});
	
	it('counts totalCost, adding 0 for the Master', function() {
		var leader = new Model(null, [C.Guild], [C.Master], null, 1);
		leader.isLeader(true);
		crew.added.push(leader);
		crew.added.push(new Model(null, null, null, 2));
		
		expect(crew.totalCost()).toEqual(2);
	});
	
	it('counts totalCost, adding 0 for the Henchman if they are the leader', function() {
		var leader = new Model(null, [C.Guild], [C.Henchman], 2, 1);
		leader.isLeader(true);
		crew.added.push(leader);
		crew.added.push(new Model(null, null, null, 2));
		
		expect(crew.totalCost()).toEqual(2);
	});
	
	it('counts totalCost, adding regular cost for the Henchman if they are not leader', function() {
		var leader = new Model(null, [C.Guild], [C.Master], null, 1);
		leader.isLeader(true);
		crew.added.push(leader);
		crew.added.push(new Model(null, [C.Guild], [C.Henchman], 2, 5));
		
		expect(crew.totalCost()).toEqual(2);
	});
	
	it('counts totalCost, adding an additional cost for non-Faction Mercenaries', function() {
		var leader = new Model(null, [C.Guild], [C.Master], null, 1);
		leader.isLeader(true);
		crew.added.push(leader);
		crew.added.push(new Model(null, [C.Neverborn], [C.Mercenary], 1));
		
		expect(crew.totalCost()).toEqual(2);
	});
	
	it('counts totalCost, adding 15 for Masters in arsenals', function() {
		crew.isArsenal(true);
		var leader = new Model(null, [C.Guild], [C.Master], null, 1);
		leader.isLeader(true);
		crew.added.push(leader);
		crew.added.push(new Model(null, [C.Guild], [], 1));
		
		expect(crew.totalCost()).toEqual(16);
	});
	
	it('counts totalCost, adding 13 minus cache for Henchmen in arsenals', function() {
		crew.isArsenal(true);
		var leader = new Model(null, [C.Guild], [C.Henchman], 2, 1);
		leader.isLeader(true);
		crew.added.push(leader);
		crew.added.push(new Model(null, [C.Guild], [], 1));
		
		expect(crew.totalCost()).toEqual(13);
	});
	
	it('counts totalCost, ignoring models that are not in the campaign crew, when making a campaign crew', function() {
		crew.isArsenal(true);
		crew.makingCampaignCrew(true);
		
		var notIncluded = new Model(null, [C.Guild], [], 1);
		crew.added.push(notIncluded);	
		
		var included = new Model(null, [C.Guild], [], 2);
		included.includeInCampaignCrew(true);
		crew.added.push(included);
		
		expect(crew.totalCost()).toEqual(2);
	});
});