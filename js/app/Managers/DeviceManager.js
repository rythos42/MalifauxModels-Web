var DeviceManager = function() {
	var self = this;

	var mediaQuery = window.matchMedia('screen and (min-width: 320px) and (max-width: 480px)');
	mediaQuery.addListener(function(mediaQuery) {
		self.isFullScreenDevice(!mediaQuery.matches);
	});
	
	self.isFullScreenDevice = ko.observable(!mediaQuery.matches);
};
