/*globals TabsManager, Upgrade */
/*exported AddedViewModel */
var AddedViewModel = function(addable, crew) {
	var self = this;
	
	self.name = ko.computed(function() {
		if(addable.isMercenary && addable.isMercenary() && !crew.isModelInLeaderFaction(addable))
			return addable.name + " (Mercenary)";
		
		return addable.name; 
	});
	
	self.cost = addable.cost;
	self.cache = addable.cache;
	self.isLeader = addable.isLeader;
	self.canBeLeader = addable.canBeLeader;
	self.isUpgrade = (addable instanceof Upgrade);
	self.addable = addable;
	
	self.removeFromCrew = function() {
		crew.removeFromCrew(addable);
		TabsManager.refresh();
	};
	
	self.setAsLeader = function() {
		crew.setAsLeader(addable);
	};
};