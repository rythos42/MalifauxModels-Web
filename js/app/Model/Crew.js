/*globals _, ko, Upgrade */
/*exported Crew */
var Crew = function() {
	var self = this;
	
	self.name = ko.observable('');
	self.availableSoulstones = ko.observable(50);
	self.added = ko.observableArray();
	self.isArsenal = ko.observable(false);
	self.scrip = ko.observable(0);
	self.makingCampaignCrew = ko.observable(false);
	
	self.clone = function() {
		var clone = new Crew();
		clone.name(self.name());
		clone.availableSoulstones(self.availableSoulstones());
		
		_.each(self.added(), function(addable) {
			clone.added.push(addable);
		});
		
		return clone;
	};
	
	self.getLeader = function() {
		return _.find(self.added(), function(addable) {
			if(!addable.isLeader)
				return;
				
			return addable.isLeader();
		});
	};
	
	self.hasLeader = function() {
		return self.getLeader() !== undefined;
	};
	
	self.removeFromCrew = function(addable) {
		self.added.remove(addable);
	};
	
	self.setAsLeader = function(addable) {
		_.each(self.added(), function(addable) {
			if(!addable.isLeader)
				return;
				
			addable.isLeader(false);
		});
		addable.isLeader(true);
	};
	
	self.addToCrew = function(addable) {
		if(!self.hasLeader() && addable.canBeLeader && addable.canBeLeader())
			addable.isLeader(true);
	
		self.added.push(addable);
	};
	
	self.isModelInLeaderFaction = function(model) {
		var leader = self.getLeader();
		if(!leader)
			return true;
		
		return _.find(model.factionList, function(modelFaction) {
			return _.find(leader.factionList, function(leaderFaction) {
				return leaderFaction === modelFaction;
			}) !== undefined;
		}) !== undefined;
	};
	
	self.campaignRating = ko.computed(function() {
		return _.reduce(self.added(), function(currentTotal, addable) {
			if(!(addable instanceof Upgrade) || !addable.includeInCampaignCrew())
				return currentTotal;
			
			if(addable.isInjury())
				return currentTotal - 1;
			
			if(addable.isCampaign()) {
				if(addable.isAvatar())
					return currentTotal + 3;
				return currentTotal + 1;
			}
			
			return currentTotal;
		}, 0);
	});
	
	function checkAndAddOneForMercenary(addable) {
		return addable.isMercenary && addable.isMercenary() && !self.isModelInLeaderFaction(addable)
			? 1
			: 0;
	}
	
	function checkAndAddCampaignCostForMasterOrHenchman(addable) {
		if(self.isArsenal()) {
			if(addable.isMaster && addable.isMaster())
				return 15;	// All Masters cost 15 in the Arsenal
			if(addable.isHenchman && addable.isHenchman())
				return (13 - addable.cache); // All Henchmen cost 13-Cache in the Arsenal
		}
		return 0;
	}
	
	function addCost(currentTotal, addable) {
		return (addable.cost 
			? currentTotal + addable.cost
			: currentTotal);
	}
	
	
	// Include all models, no upgrades, plus 5 stones.
	self.maximumEncounterSize = ko.computed(function() {
		return _.reduce(self.added(), function(currentTotal, addable) {
			currentTotal += checkAndAddOneForMercenary(addable);
			
			if(addable instanceof Upgrade)	// Don't include Upgrades
				return currentTotal;
			
			if(addable.isLeader && addable.isLeader())
				return currentTotal + checkAndAddCampaignCostForMasterOrHenchman(addable);
		
			return addCost(currentTotal, addable);
		}, 0) + 5;
	});
	
	// Include all models, upgrades, but if we're making a campaign crew only include those models
	self.totalCost = ko.computed(function() {
		return _.reduce(self.added(), function(currentTotal, addable) {
			if(self.makingCampaignCrew() && !addable.includeInCampaignCrew())
				return currentTotal;	// Don't include in the total.
			
			currentTotal += checkAndAddOneForMercenary(addable);
			
			if(addable.isLeader && addable.isLeader())
				return currentTotal + checkAndAddCampaignCostForMasterOrHenchman(addable);
		
			return addCost(currentTotal, addable);
		}, 0);
	});
};