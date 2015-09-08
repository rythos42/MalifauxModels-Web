/*globals _, ko, C */
/*exported Upgrade */
var Upgrade = function(name, factionList, restrictionsList, cost) {
	var self = this;
	
	self.name = name;
	self.factionList = factionList;
	self.restrictionsList = restrictionsList;
	self.cost = cost;
	
	self.includeInCampaignCrew = ko.observable(false);
	
	self.clone = function() {
		return new Upgrade(name, factionList, restrictionsList, cost);
	};
	
	self.isInjury = ko.computed(function() {
		return _.find(self.restrictionsList, function(restriction) { return restriction === C.Injury; }) !== undefined;
	});
	
	self.isCampaign = ko.computed(function() {
		return _.find(self.restrictionsList, function(restriction) { return restriction === C.Campaign; }) !== undefined;
	});
	
	self.isAvatar = ko.computed(function() {
		return _.find(self.restrictionsList, function(restriction) { return restriction === C.Avatar; }) !== undefined;
	});
	
	self.type = 'Upgrade';
};