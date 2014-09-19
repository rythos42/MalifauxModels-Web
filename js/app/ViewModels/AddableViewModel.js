/*globals ko, DeviceManager, TabsManager */
/*exported AddableViewModel */
var AddableViewModel = function(addable, defaultCrew) {
	var self = this;
	
	self.factions = ko.computed(function() {
		return addable.factionList.join(', ');
	});

	self.name = ko.computed(function() {
		var name = addable.name,
			factions = self.factions();
	
		if(DeviceManager.instance.isFullScreenDevice()) 
			return name;
			
		return name + ' (' + factions + ')';
	});
	
	self.extras = ko.computed(function() {
		if(addable.characteristicList)
			return addable.characteristicList.join(', ');
			
		if(addable.restrictionsList)
			return addable.restrictionsList.join(', ');
		
		return '';
	});

	self.cost = addable.cost;
	self.cache = addable.cache;
	
	self.shouldHighlight = ko.observable(false);

	self.addToCrew = function() {
		self.shouldHighlight(true);
		defaultCrew().addToCrew(addable.clone());
		TabsManager.refresh();
	};
};