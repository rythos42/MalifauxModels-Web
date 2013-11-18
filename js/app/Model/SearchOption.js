var SearchOption = {};

SearchOption.Default = new MultipleTextFieldSearchOption('Any', ['name', 'factionList', 'characteristicList', 'restrictionsList', 'cost', 'cache']);

SearchOption.List = [
	SearchOption.Default,
	new TextFieldSearchOption('Name', 'name'),
	new TextFieldSearchOption('Faction', 'factionList'),
	new MultipleTextFieldSearchOption('Extras', ['characteristicList', 'restrictionsList']),
	new TextFieldSearchOption('Cost', 'cost'),
	new TextFieldSearchOption('Cache', 'cache'),
	new BooleanSearchOption('Is Upgrade', function(addable) {
		return addable.restrictionsList !== undefined;
	})
];

