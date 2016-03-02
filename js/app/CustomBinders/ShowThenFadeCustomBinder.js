/*globals ko */
ko.bindingHandlers.showThenFade = {
	update: function(elementDom, valueAccessor) {
		var element = $(elementDom),
			shouldShowObs = valueAccessor(),
            shouldShow = ko.utils.unwrapObservable(valueAccessor());
			
		if(shouldShow) {
			element.show();
			setTimeout(function() {
				element.fadeOut();
                shouldShowObs(false);
			}, 1000);
		}
	}
};