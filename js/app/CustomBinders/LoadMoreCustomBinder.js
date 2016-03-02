/*globals _, ko */
ko.bindingHandlers.loadMore = {
	init: function(elementDom, valueAccessor, allBindings, viewModel) {
        // Only loads when #full-list is the scrolling element
        var scrollParent = $(elementDom).closest('#full-list');
		scrollParent.scroll(_.throttle(function() {
			if(scrollParent[0].scrollHeight - scrollParent[0].scrollTop - scrollParent[0].clientHeight <= 100) {
				viewModel.addNextModelItems();
			}
		}, 100));
	}
};

