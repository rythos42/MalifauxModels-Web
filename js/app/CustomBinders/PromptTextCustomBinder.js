/*globals ko */
ko.bindingHandlers.promptText = {
    init: function(inputElementDom, valueAccessor) {
        var inputElement = $(inputElementDom),
            options = ko.utils.unwrapObservable(valueAccessor()),
            labelElement = inputElement.siblings(options.leftElementSelector),
            promptTextElement;

        function hidePrompt() {
            promptTextElement.css('display', 'none');
            
            if(!inputElement.is(':focus'))
                inputElement.focus();
        }

        function showPrompt() {
            if (inputElement.val() === '')
                promptTextElement.css('display', 'inline');
        }

        promptTextElement = $('<span></span>')
            .addClass('prompt-text')
            .insertAfter(inputElement)
            .css('left', labelElement.width())
            .css('top', 0)
            .text(options.text)
            .click(hidePrompt);

        inputElement.blur(showPrompt);
        inputElement.focus(hidePrompt);
    },
	update: function(inputElementDom, valueAccessor, allBindingsAccessor, viewModel) {
        var inputElement = $(inputElementDom),
            options = ko.utils.unwrapObservable(valueAccessor()),
            promptTextElement = inputElement.siblings('.prompt-text');

        var hasInput = inputElement.val() === '';
        var elementVisible = inputElement.is(':visible');
		var hasFocus = viewModel.hasFocus();

        // Hide the prompt text if something is stuffed into the observable programmatically
		promptTextElement.text(options.text).toggle(hasInput && elementVisible && !hasFocus);
    }
};