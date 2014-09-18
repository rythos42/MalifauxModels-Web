var CrewAssembler = {
	createFromJson: function(jsonCrew) {
		var crew = new Crew();
		return CrewAssembler.fromJson(crew, jsonCrew);
	},
	fromJson: function(crew, jsonCrew) {
		crew.availableSoulstones(jsonCrew.availableSoulstones);
		crew.name(jsonCrew.name);
	
		var newCrew = [];
		_.each(jsonCrew.added, function(modelOrUpgrade) {
			switch(modelOrUpgrade.type) {
				case "Model":
					var model = new Model(modelOrUpgrade.name, modelOrUpgrade.factionList, modelOrUpgrade.characteristicList, modelOrUpgrade.cost, modelOrUpgrade.cache);
					model.isLeader(modelOrUpgrade.isLeader);
					newCrew.push(model);
					break;
				case "Upgrade":
					var upgrade = new Upgrade(modelOrUpgrade.name, modelOrUpgrade.factionList, modelOrUpgrade.restrictionsList, modelOrUpgrade.cost);
					newCrew.push(upgrade);
					break;
			}
			
		});
		crew.added.removeAll();
		crew.added.push.apply(crew.added, newCrew);
		
		return crew;
	}
};