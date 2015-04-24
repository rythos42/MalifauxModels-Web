/*globals describe, it, expect, Model */
describe('Model', function() {
	it('sets properties on a Model from constructor', function() {
		var name = 'name',
			factionList = ['Guild'],
			characteristicList = ['Living'],
			cost = 3,
			cache = 1,
			model = new Model(name, factionList, characteristicList, cost, cache);
			
		expect(model.name).toEqual(name);
		expect(model.factionList.length).toEqual(factionList.length);
		expect(model.factionList[0]).toEqual(factionList[0]);
		expect(model.characteristicList.length).toEqual(characteristicList.length);
		expect(model.characteristicList[0]).toEqual(characteristicList[0]);
		expect(model.cost).toEqual(cost);
		expect(model.cache).toEqual(cache);
	});
	
	it('a model is not the leader by default', function() {
		var model = new Model();
		
		expect(model.isLeader()).toEqual(false);
	});
	
	it('a model can be the leader if it has a cache', function() {
		var model = new Model(null, null, null, null, 1);
		
		expect(model.canBeLeader()).toEqual(true);
	});
	
	it('a model can not be the leader if it has no cache', function() {
		var model = new Model(null, null, null, null, null);
		
		expect(model.canBeLeader()).toEqual(false);
	});
	
	it('can clone a model', function() {
		var name = 'name',
			factionList = ['Guild'],
			characteristicList = ['Living'],
			cost = 3,
			cache = 1,
			model = new Model(name, factionList, characteristicList, cost, cache),
			newModel = model.clone();
			
		expect(newModel.name).toEqual(model.name);
		expect(newModel.factionList.length).toEqual(model.factionList.length);
		expect(newModel.factionList[0]).toEqual(model.factionList[0]);
		expect(newModel.characteristicList.length).toEqual(model.characteristicList.length);
		expect(newModel.characteristicList[0]).toEqual(model.characteristicList[0]);
		expect(newModel.cost).toEqual(model.cost);
		expect(newModel.cache).toEqual(model.cache);
	});
	
	it('a Model has a type of Model', function() {
		var model = new Model();
		
		expect(model.type).toEqual('Model');
	});
});