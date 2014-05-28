ko.bindingHandlers.menu = {
	init: function(elementDom) {
		$(elementDom).menu();
		
		ko.utils.domNodeDisposal.addDisposeCallback(elementDom, function() {
			$(elementDom).datepicker("destroy");
		});
	}
};