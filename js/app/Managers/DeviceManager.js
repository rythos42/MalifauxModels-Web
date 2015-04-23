/*globals ko */
/*exported DeviceManager */
var DeviceManager = function() {
	var self = this;
	
	self.isFullScreenDevice = ko.observable(true);
	self.isCordova = ko.observable(false);
	
	self.onCordovaReady = function() {
		self.isCordova(true);
		
		navigator.splashscreen.hide();
	};

	// Older browser or device, assume it's a full screen device
	if(!window.matchMedia)
		return;
	
	var mediaQuery = window.matchMedia('screen and (max-width: 800px)');
	mediaQuery.addListener(function(mediaQuery) {
		self.isFullScreenDevice(!mediaQuery.matches);
	});
	self.isFullScreenDevice(!mediaQuery.matches);
};
