/*globals ko */
ko.bindingHandlers.dialog = {
    init: function(elementDom, valueAccessor) {
        var options = ko.utils.unwrapObservable(valueAccessor()),
            element = $(elementDom);

		setTimeout(function() {
			element.dialog(options);
		}, 0);
    }
};

ko.bindingHandlers.clickToOpenDialog = {
	init: function(elementDom, valueAccessor) {
		var selector = ko.utils.unwrapObservable(valueAccessor());
			
		$(elementDom).click(function() {
			$(selector).dialog('open');
		});
	}
};