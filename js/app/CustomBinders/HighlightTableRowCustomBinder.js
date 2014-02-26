ko.bindingHandlers.highlight = {
	update: function(elementDom, valueAccessor) {
		var element = $(elementDom),
			shouldHighlightObs = valueAccessor(),
            shouldHighlight = ko.utils.unwrapObservable(valueAccessor());
			
		if(shouldHighlight) {
			element.addClass('highlight');
			setTimeout(function() {
				element.switchClass('highlight', '', 150);
			}, 1);
			shouldHighlightObs(false);
		}
	}
};