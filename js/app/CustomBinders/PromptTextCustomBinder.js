/*globals ko */
ko.bindingHandlers.promptText = {
    init: function(inputElementDom, valueAccessor) {
        var inputElement = $(inputElementDom),
            labelElement = inputElement.siblings('label'),
            promptText = ko.utils.unwrapObservable(valueAccessor()),
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
            .text(promptText)
            .click(hidePrompt);

        inputElement.blur(showPrompt);
        inputElement.focus(hidePrompt);
    },
    update: function(inputElementDom, valueAccessor) {
        var inputElement = $(inputElementDom),
            promptText = ko.utils.unwrapObservable(valueAccessor()),
            promptTextElement = inputElement.siblings('.prompt-text');

        var hasInput = inputElement.val() === '';
        var elementVisible = inputElement.is(':visible');

        // Hide the prompt text if something is stuffed into the observable programmatically
        promptTextElement.text(promptText).toggle(hasInput && elementVisible);
    }
};