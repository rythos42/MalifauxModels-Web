/*globals _, ko */
ko.bindingHandlers.autocomplete = {
	init: function(elementDom, valueAccessor) {
		var options = valueAccessor(),
			element = $(elementDom);
			
		function makeSortFunction(filter) {
            function sortAlpha(x, y) {
                return (x === y)
                    ? 0
                    : (x > y) ? 1 : -1;
            }

            function startsWith(string, start) {
                return string.lastIndexOf(start, 0) === 0;
            }

            var lowerFilter = filter.toLowerCase();

            return function(result1, result2) {
                var name1 = result1.toLowerCase();
                var name2 = result2.toLowerCase();

                if (startsWith(name1, lowerFilter)) {
                    if (startsWith(name2, lowerFilter))
                        return sortAlpha(name1, name2);
                    return -1;
                }

                return startsWith(name2, lowerFilter)
                    ? 1
                    : sortAlpha(name1, name2);
            };
        }
	
		element.autocomplete({
			source: function(request, response) {
				var list = _.filter(options.source, function(text) {
					return text.toLowerCase().indexOf(request.term.toLowerCase()) >=0;
				});
				
				list.sort(makeSortFunction(request.term));
				
				
				response(list);
			},
			select: function(event, ui) {
				options.textField(ui.item.value);
				return false;
			}
		});
		
		element.focus(function() {
            this.select();
        });
	}
};