var SearchOption = function(displayName, fieldName) {
	var self = this;
	
	self.displayName = displayName;
	self.fieldName = fieldName;
};

SearchOption.Default = new SearchOption('Any', '');

SearchOption.List = [
	SearchOption.Default,
	new SearchOption('Name', 'name'),
	new SearchOption('Faction', 'factionList'),
	new SearchOption('Extras', 'characteristicList'),
	new SearchOption('Cost', 'cost'),
	new SearchOption('Cache', 'cache')
];

