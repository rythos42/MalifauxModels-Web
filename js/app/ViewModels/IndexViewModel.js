var IndexViewModel = function() {
	var self = this;
	
	self.searchText = ko.observable('');

	self.searchList = ko.observableArray();
	self.search = function() {
		var list = ModelListManager.search(self.searchText(), self.selectedSearchOption().fieldName);
		self.searchList(_.map(list, function(model) {
			return new ModelViewModel(model, self);
		}));
	};
	
	self.selectedSearchOption = ko.observable(null);
	self.searchOptions = [
		new SearchOption('Any', ''),
		new SearchOption('Name', 'name'),
		new SearchOption('Faction', 'faction'),
		new SearchOption('Characteristics', 'characteristicList'),
		new SearchOption('Cost', 'cost'),
		new SearchOption('Cache', 'cache')
	];
	
	self.searchTextSuggestions = ModelListManager.searchTextList();
	
	self.getFieldNameForDisplayName = function(displayName) {
		var option = _.find(self.searchOptions, function(option) { return option.displayName === displayName; });
		if(option === undefined)
			return null;
		return option.fieldName;
	};
	
	var currentSort = null;
	self.sortBy = function(fieldName) {
		var list = self.searchList();
		
		if(fieldName === currentSort)
			self.searchList(self.searchList().reverse());
		else 		
			self.searchList(_.sortBy(list, function(modelViewModel) { return modelViewModel[fieldName]; }));
			
		currentSort = fieldName;
	};
	
	self.crew = ko.observableArray();
	
	self.clearLeader = function() {
		_.each(self.crew(), function(modelViewModel) {
			modelViewModel.isLeader(false);
		});
	};
		
	function getCrewLeader() {
		return _.find(self.crew(), function(crewModel) {
			return crewModel.isLeader();
		});
	}
	
	self.addToCrew = function(model) {
		var newModel = new AddedModelViewModel(model, self);
	
		if(getCrewLeader() === undefined && model.cache)
			newModel.isLeader(true);
	
		self.crew.push(newModel);
	};
	
	self.removeFromCrew = function(model) {
		self.crew.remove(model);

		if(model.isLeader()) {
			_.each(self.crew(), function(addedModel) {
				if(addedModel.canBeLeader())
					addedModel.isLeader(true);
			});
		}	
	};
	
	self.hasCrew = ko.computed(function() {
		return self.crew().length > 0;
	});
	
	self.crewTotal = ko.computed(function() {
		return _.reduce(self.crew(), function(currentTotal, model) {
			if(model.isLeader())
				return currentTotal;
		
			return (model.cost 
				? currentTotal + model.cost 
				: currentTotal);
		}, 0);
	});
	
	self.availableSoulstones = ko.observable(50);
	
	self.remainingSoulstones = ko.computed(function() {
		var leader = getCrewLeader(),
			cache = 0;
		if(leader)
			cache = leader.cache;
	
		return parseInt(self.availableSoulstones(), 10) - self.crewTotal() + cache;;
	});
};