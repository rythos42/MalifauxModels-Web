ko.bindingHandlers.highlight = {
	update: function(elementDom, valueAccessor) {
		var element = $(elementDom),
            shouldHighlight = ko.utils.unwrapObservable(valueAccessor());
			
		if(shouldHighlight) {
			element.addClass('highlight');
			setTimeout(function() {
				element.switchClass('highlight', '', 1000);
			}, 2);
		}
	}
};