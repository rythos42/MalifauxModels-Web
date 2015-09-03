/*globals TabsManager, Upgrade */
/*exported AddedViewModel */
var AddedViewModel = function(addable, crew) {
	var self = this;
	
	self.name = addable.name;
	
	if(addable.isMercenary && addable.isMercenary() && !crew.isModelInLeaderFaction(addable))
		self.name += ' (Mercenary)';

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