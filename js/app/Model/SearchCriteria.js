var SearchCriteria = function() {
	var self = this;
	
	self.selectedSearchOption = ko.observable(SearchOption.Default);
	self.searchText = ko.observable('');
	self.searchBoolean = ko.observable(false);
	self.notOrIs = ko.observable(NotOrIs.Is);
	
	self.isNot = function() {
		return self.notOrIs() === NotOrIs.Not;
	};
	
	self.isIs = function() {
		return self.notOrIs() === NotOrIs.Is;
	};
};
