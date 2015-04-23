/*globals describe, it, expect, beforeEach, Crew, CrewAssembler */
describe('CrewAssembler', function() {
	var jsonCrew;

	beforeEach(function() {
		jsonCrew = {
			availableSoulstones: 12,
			name: 'crew name',
			added: [
				{ type: 'Model', name: 'ModelName', factionList: ['Guild'], characteristicList: ['Phoenix', 'Construct'], cost: 12, cache: 1, isLeader: true },
				{ type: 'Upgrade', name: 'UpgradeName', factionList: ['Guild'], restrictionsList: ['Something', 'Limited'], cost: 1 }
			]
		};
	});

	it('populates a crew from json', function() {
		var crew = new Crew();
		CrewAssembler.fromJson(crew, jsonCrew);
		
		expect(crew.availableSoulstones()).toEqual(jsonCrew.availableSoulstones);
		expect(crew.name()).toEqual(jsonCrew.name);
		
		expect(crew.added().length).toEqual(jsonCrew.added.length);
		expect(crew.added()[0].type).toEqual(jsonCrew.added[0].type);
		expect(crew.added()[0].name).toEqual(jsonCrew.added[0].name);
		expect(crew.added()[0].factionList.length).toEqual(jsonCrew.added[0].factionList.length);
		expect(crew.added()[0].factionList[0]).toEqual(jsonCrew.added[0].factionList[0]);
		expect(crew.added()[0].characteristicList.length).toEqual(jsonCrew.added[0].characteristicList.length);
		expect(crew.added()[0].characteristicList[0]).toEqual(jsonCrew.added[0].characteristicList[0]);
		expect(crew.added()[0].characteristicList[1]).toEqual(jsonCrew.added[0].characteristicList[1]);
		expect(crew.added()[0].cost).toEqual(jsonCrew.added[0].cost);
		expect(crew.added()[0].cache).toEqual(jsonCrew.added[0].cache);
		expect(crew.added()[0].isLeader()).toEqual(jsonCrew.added[0].isLeader);
		
		expect(crew.added()[1].type).toEqual(jsonCrew.added[1].type);
		expect(crew.added()[1].name).toEqual(jsonCrew.added[1].name);
		expect(crew.added()[1].factionList.length).toEqual(jsonCrew.added[1].factionList.length);
		expect(crew.added()[1].factionList[0]).toEqual(jsonCrew.added[1].factionList[0]);
		expect(crew.added()[1].restrictionsList.length).toEqual(jsonCrew.added[1].restrictionsList.length);
		expect(crew.added()[1].restrictionsList[0]).toEqual(jsonCrew.added[1].restrictionsList[0]);
		expect(crew.added()[1].restrictionsList[1]).toEqual(jsonCrew.added[1].restrictionsList[1]);
		expect(crew.added()[1].cost).toEqual(jsonCrew.added[1].cost);
	});
	
	it('creates a new crew from json', function() {
		var crew = CrewAssembler.createFromJson(jsonCrew);
		
		expect(crew.availableSoulstones()).toEqual(jsonCrew.availableSoulstones);
		expect(crew.name()).toEqual(jsonCrew.name);
		
		expect(crew.added().length).toEqual(jsonCrew.added.length);
		expect(crew.added()[0].type).toEqual(jsonCrew.added[0].type);
		expect(crew.added()[0].name).toEqual(jsonCrew.added[0].name);
		expect(crew.added()[0].factionList.length).toEqual(jsonCrew.added[0].factionList.length);
		expect(crew.added()[0].factionList[0]).toEqual(jsonCrew.added[0].factionList[0]);
		expect(crew.added()[0].characteristicList.length).toEqual(jsonCrew.added[0].characteristicList.length);
		expect(crew.added()[0].characteristicList[0]).toEqual(jsonCrew.added[0].characteristicList[0]);
		expect(crew.added()[0].characteristicList[1]).toEqual(jsonCrew.added[0].characteristicList[1]);
		expect(crew.added()[0].cost).toEqual(jsonCrew.added[0].cost);
		expect(crew.added()[0].cache).toEqual(jsonCrew.added[0].cache);
		expect(crew.added()[0].isLeader()).toEqual(jsonCrew.added[0].isLeader);
		
		expect(crew.added()[1].type).toEqual(jsonCrew.added[1].type);
		expect(crew.added()[1].name).toEqual(jsonCrew.added[1].name);
		expect(crew.added()[1].factionList.length).toEqual(jsonCrew.added[1].factionList.length);
		expect(crew.added()[1].factionList[0]).toEqual(jsonCrew.added[1].factionList[0]);
		expect(crew.added()[1].restrictionsList.length).toEqual(jsonCrew.added[1].restrictionsList.length);
		expect(crew.added()[1].restrictionsList[0]).toEqual(jsonCrew.added[1].restrictionsList[0]);
		expect(crew.added()[1].restrictionsList[1]).toEqual(jsonCrew.added[1].restrictionsList[1]);
		expect(crew.added()[1].cost).toEqual(jsonCrew.added[1].cost);
	});
});