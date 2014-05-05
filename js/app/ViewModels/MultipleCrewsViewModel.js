var MultipleCrewsViewModel = function(crewList) {
	var self = this;
	
	self.crewViewModel = ko.computed(function() {
		var list = crewList();
		if(list.length === 0)
			return null;
			
		return new CrewViewModel(list[0]);
	});
};