/*globals ko */
ko.bindingHandlers.onSelectFile = {
	init: function(elementDom, valueAccessor) {
		var fileElement = $(elementDom);
		fileElement.change(function() {
			var file = this.files[0],
				reader = new FileReader(),
				onUploadHandler = valueAccessor();
				
			reader.onload = function(e) {
				onUploadHandler(e.target.result);
				
				fileElement.closest('form').trigger('reset');
			};
			reader.readAsText(file);
		});
	}
};