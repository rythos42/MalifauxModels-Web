var SearchCriteria = function() {
	var self = this;
	
	self.selectedSearchOption = ko.observable(SearchOption.Default);
	self.searchText = ko.observable('');
};
