var SearchCriteria = function() {
	var self = this;
	
	self.selectedSearchOption = ko.observable(SearchOption.Default);
	self.searchText = ko.observable('');
	self.searchBoolean = ko.observable(false);
};
