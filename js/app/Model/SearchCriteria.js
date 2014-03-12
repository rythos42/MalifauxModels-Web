var SearchCriteria = function(selectedSearchOption, searchText, searchBoolean, notOrIs) {
	var self = this;
	
	self.selectedSearchOption = ko.observable(selectedSearchOption || SearchOption.Default);
	self.searchText = ko.observable(searchText || '');
	self.searchBoolean = ko.observable(searchBoolean || false);
	self.notOrIs = ko.observable(notOrIs || NotOrIs.Is);
	
	self.isNot = function() {
		return self.notOrIs() === NotOrIs.Not;
	};
	
	self.isIs = function() {
		return self.notOrIs() === NotOrIs.Is;
	};
};
