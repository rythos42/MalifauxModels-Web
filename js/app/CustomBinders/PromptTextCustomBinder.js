/*globals ko */
ko.bindingHandlers.promptText = {
    init: function(inputElementDom, valueAccessor) {
        var inputElement = $(inputElementDom),
            options = ko.utils.unwrapObservable(valueAccessor()),
            promptTextElement;

        function hidePrompt() {
            promptTextElement.css('display', 'none');
            
			if(inputElement.get(0) !== document.activeElement)
                inputElement.focus();
        }

        function showPrompt() {
            if (inputElement.val() === '')
                promptTextElement.css('display', 'inline');
        }

        promptTextElement = $('<span></span>')
            .addClass('prompt-text')
            .insertAfter(inputElement)
			.css('left', 153) /*Just static position...the calculation was not acting right. inputElement.position().left)*/
			.css('top', 5)
            .text(options.text)
            .click(hidePrompt);

        inputElement.blur(showPrompt);
        inputElement.focus(hidePrompt);
    },
    update: function(inputElementDom, valueAccessor) {
        var inputElement = $(inputElementDom),
            options = ko.utils.unwrapObservable(valueAccessor()),
			promptText = options.text,
			elementVisible = options.visibleCheck(),
            promptTextElement = inputElement.siblings('.prompt-text'),
			hasInput = inputElement.val() === '';

        // Hide the prompt text if something is stuffed into the observable programmatically
        promptTextElement.text(promptText).toggle(hasInput && elementVisible);
    }
};