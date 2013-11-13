ko.bindingHandlers.sortHeader = {
	init: function(elementDom, valueAccessor, allBindingsAccessor, viewModel) {
		var element = $(elementDom);
		
		element.children('th:not(".nosort")').click(function() {
			var displayName = $(this).text(),
				fieldName = viewModel.getFieldNameForDisplayName(displayName);
				
			viewModel.sortBy(fieldName);
		});
	}
};