ko.bindingHandlers.selectOnFocus = {
	init: function(elementDom) {
		$(elementDom).click(function() {
			$(this).select();
		});
	}
};