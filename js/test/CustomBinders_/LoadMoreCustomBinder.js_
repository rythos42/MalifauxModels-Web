/*globals _, ko */
ko.bindingHandlers.loadMore = {
	init: function(elementDom, valueAccessor, allBindings, viewModel) {
		var window = $(document);
		window.scroll(_.throttle(function() {
			if(window.height() - window.scrollTop() - document.body.clientHeight <= 100) {
				viewModel.addNextModelItems();
			}
		}, 100));
	}
};

