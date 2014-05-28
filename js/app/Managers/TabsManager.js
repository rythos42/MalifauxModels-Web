var TabsManager = {
	setId: function(id) {
		this.id = id;
	},
	
	getTab: function() {
		return $('#' + this.id);
	},
	
	create: function() {
		var tabs = this.getTab().tabs();
		
		tabs.on('tabsbeforeactivate', function(event, ui) {
			// Don't navigate to the "new tab" button when clicked
			if(ui.newTab.find('#NewTabButton').length !== 0)
				return false;
		});
	},
	
	refresh: function() {
		this.getTab().tabs('refresh');
	},
	
	onActivate: function(eventHandler) {
		this.getTab().tabs().on('tabsbeforeactivate', function(event, ui) {
			eventHandler();
		});
	}
};