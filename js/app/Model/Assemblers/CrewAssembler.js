/*globals _, Model, Upgrade, Crew */
/*exported CrewAssembler */
var CrewAssembler = {
	createFromJson: function(jsonCrew) {
		var crew = new Crew();
		return CrewAssembler.fromJson(crew, jsonCrew);
	},
	fromJson: function(crew, jsonCrew) {
		crew.availableSoulstones(jsonCrew.availableSoulstones);
		crew.name(jsonCrew.name);
		crew.isArsenal(jsonCrew.isArsenal || false);
		crew.scrip(jsonCrew.scrip || 0);
		crew.makingCampaignCrew(jsonCrew.makingCampaignCrew || false);
	
		var newCrew = [];
		_.each(jsonCrew.added, function(modelOrUpgrade) {
			switch(modelOrUpgrade.type) {
				case 'Model':
					var model = new Model(modelOrUpgrade.name, modelOrUpgrade.factionList, modelOrUpgrade.characteristicList, modelOrUpgrade.cost, modelOrUpgrade.cache);
					model.isLeader(modelOrUpgrade.isLeader);
					model.includeInCampaignCrew(modelOrUpgrade.includeInCampaignCrew);
					newCrew.push(model);
					break;
				case 'Upgrade':
					var upgrade = new Upgrade(modelOrUpgrade.name, modelOrUpgrade.factionList, modelOrUpgrade.restrictionsList, modelOrUpgrade.cost);
					upgrade.includeInCampaignCrew(modelOrUpgrade.includeInCampaignCrew);
					newCrew.push(upgrade);
					break;
			}
			
		});
		crew.added.removeAll();
		crew.added.push.apply(crew.added, newCrew);
		
		return crew;
	}
};