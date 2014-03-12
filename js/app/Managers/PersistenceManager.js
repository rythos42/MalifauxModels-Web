var PersistenceManager = function(crew, criteriaList) {
	var self = this,
		crewKey = 'CREW',
		criteriaListKey = 'CRITERIALIST';
	
	self.save = function() {
		window.localStorage.setItem(crewKey, ko.toJSON(crew));
		window.localStorage.setItem(criteriaListKey, ko.toJSON(criteriaList()));
	};
	
	self.load = function() {
		var crewFromStorageJson = window.localStorage.getItem(crewKey);
		if(crewFromStorageJson) {
			var crewFromStorage = JSON.parse(crewFromStorageJson);
			crew.availableSoulstones(crewFromStorage.availableSoulstones);
			
			var newCrew = [];
			_.each(crewFromStorage.added, function(modelOrUpgrade) {
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
		}
		
		var criteriaFromStorageJson = window.localStorage.getItem(criteriaListKey);
		if(criteriaFromStorageJson) {
			var criteriaFromStorage = JSON.parse(criteriaFromStorageJson),
				newCriteriaList = [];
				
			_.each(criteriaFromStorage, function(criteria) {
				var searchBoolean = criteria.searchBoolean === "true";
				var selectedSearchOption = _.findWhere(SearchOption.List, {displayName: criteria.selectedSearchOption.displayName});
				
				newCriteriaList.push(new SearchCriteria(selectedSearchOption, criteria.searchText, searchBoolean, criteria.notOrIs));
			});
			
			criteriaList.removeAll();
			criteriaList.push.apply(criteriaList, newCriteriaList);
		}
	};
	
	self.onCordovaReady = function() {
		document.addEventListener('pause', self.save, false);
		document.addEventListener('resume', self.load, false);
	};
	
	return self;
};