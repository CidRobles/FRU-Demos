/*
 * Contains variables and supporting functions for general e-card.
 */

// *** Variables ***

const limit = {
    numOfRecipients: {max: 20, min: 1},
    messageChar: {max: 500}
}

// *** Initialization ***

// initialize the datepickers
jQuery('[data-element="ecard-send-time"]').datepicker({
    dateFormat: "yy-mm-dd",
    firstDay: 0,
    minDate: 0,
    maxDate: "+12M +10D",
});

// *** Supporting Functions ***

/**
 * Adds 1 additional recipient field group to the end
 */
 function addRecipientFieldGroup(form) {
    if (form.querySelector('.recipient-group-container').childElementCount < limit.numOfRecipients.max) { // Cannot have more than 20 recipients
        const newRecipientGroup = document.querySelector('.recipient-group-template').cloneNode(true);
    
        const numOfRecipient = form.querySelectorAll('.recipient-group').length;
        newRecipientGroup.querySelector('h3').textContent = `Recipient #${numOfRecipient+1}`;

        newRecipientGroup.classList.remove('hidden', 'recipient-group-template');
        newRecipientGroup.classList.add('recipient-group');

        form.querySelector('.recipient-group-container').appendChild(newRecipientGroup);

        // Attach event listener for updating character count  
        form.querySelectorAll('textarea[name^="message"]').forEach(messageField => {
            messageField.addEventListener('input', updateCharCount);
        })
    }
}

/**
 * Removes 1 recipient field group from the end
 */
 function removeRecipientFieldGroup(form) {
    if (form.querySelector('.recipient-group-container').childElementCount > limit.numOfRecipients.min) {
        const lastRecipientGroup = form.querySelector('.recipient-group-container').lastElementChild;
        lastRecipientGroup.remove();
    }
}

/**
 * Updates the num of characters that have been entered into the Personal Message field
 */
 function updateCharCount(event) {
    event.preventDefault();

    const message = event.target;
    displayCharCount(message);
    
}

/**
 * Displays the current character count for the input field
 */
 function displayCharCount(field) {
    const charCountText = field.nextElementSibling;
    const characterCount = field.value.length;
    
    charCountText.querySelector('.character-count').innerHTML = characterCount;
}

/**
 * Clears all error messages from the form.
 */
 function clearFormErrors() {
	jQuery('.group').removeClass('error');
	jQuery('.group').find('div.alert').html('');
	jQuery('.generalErrDiv').addClass('hidden');
}

/**
 * Shows the failure message if form fails to submit.
 * @returns {undefined}
 */
 function showFailMessage(errorMessages = "", errDiv) {
	if (errorMessages !== "") {
		let errorMessagesHtml = "";
		jQuery(errorMessages).each(function (index, message) {
			errorMessagesHtml += message + "<br>";
		});
        jQuery(errDiv).html(errorMessagesHtml);
	} else {
        jQuery(errDiv).html('Seomthing went wrong. Please try again later.');
    }
    jQuery(errDiv).removeClass('hidden');
}

/**
 * Scroll to the top of the first error
 */
 function scrollToFirstError(container, offSet) {
	const firstErrorTop = document.querySelector('.error').offsetTop;
    
    container.scrollTo({ top: firstErrorTop - offSet, behavior: 'smooth' });
}