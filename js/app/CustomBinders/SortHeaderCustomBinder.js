ko.bindingHandlers.sortHeader = {
	init: function(elementDom, valueAccessor, allBindingsAccessor, viewModel) {
		var element = $(elementDom);
		
		element.children('th').click(function() {
			var fieldName = $(this).data('fieldname');
			if(!fieldName)
				return;
				
			viewModel.sortBy(fieldName);
		});
	}
};