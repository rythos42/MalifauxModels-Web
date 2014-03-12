var DeviceManager = function() {
	var self = this;

	var mediaQuery = window.matchMedia('screen and (max-width: 480px)');
	mediaQuery.addListener(function(mediaQuery) {
		self.isFullScreenDevice(!mediaQuery.matches);
	});
	
	self.isFullScreenDevice = ko.observable(!mediaQuery.matches);
	self.isCordova = ko.observable(false);	
	
	self.onCordovaReady = function() {
		self.isCordova(true);
	};
};
