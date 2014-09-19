/*globals ko */
ko.bindingHandlers.highlight = {
	update: function(elementDom, valueAccessor) {
		var element = $(elementDom),
			shouldHighlightObs = valueAccessor(),
            shouldHighlight = ko.utils.unwrapObservable(valueAccessor());
			
		if(shouldHighlight) {
			element.switchClass('', 'highlight', 250);
			setTimeout(function() {
				element.switchClass('highlight', '', 250);
			}, 1);
			shouldHighlightObs(false);
		}
	}
};