/*
 * JavaScript for e-card in GOC item single page.
 */

// *** Variables ***

const mform = document.querySelector('form[name="mGocEcard"]');
const dform = document.querySelector('form[name="deskGocEcard"]');
let mGoogleRecaptcha;
let dGoogleRecaptcha;

// *** Initialization ***

// Render Google reCaptcha V2 on "production" only.
if (googleCaptcha.env === googleCaptcha.server_env_production) {
    googleReCaptchaV2();
}

// *** Event Listeners ***

mform.addEventListener('submit', function(e){
    e.preventDefault();
    clearFormErrors();

    const isMobile = true;

    // Validate the Google reCaptcha V2 and V3 on "production" only.
	(googleCaptcha.env === googleCaptcha.server_env_production) ? validateGoogleReCaptcha(e.submitter, isMobile) : submitForm(e.submitter, isMobile);
});

dform.addEventListener('submit', function(e){
    e.preventDefault();
    clearFormErrors();

    const isMobile = false;

    // Validate the Google reCaptcha V2 and V3 on "production" only.
	(googleCaptcha.env === googleCaptcha.server_env_production) ? validateGoogleReCaptcha(e.submitter, isMobile) : submitForm(e.submitter, isMobile);
});

// Event listener for adding / removing recipient fields
document.querySelectorAll('.spinner-plus[data-type="add-recipient"]').forEach(addBtn => {
    addBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.target.dataset.form === 'mobile' ? addRecipientFieldGroup(mform) : addRecipientFieldGroup(dform);
    });
});

document.querySelectorAll('.spinner-minus[data-type="minus-recipient"]').forEach(minusBtn => {
    minusBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.target.dataset.form === 'mobile' ? removeRecipientFieldGroup(mform) : removeRecipientFieldGroup(dform);
    });
});

// Event listener for selecting send option
document.querySelectorAll('input[name="sendOption"]').forEach(button => {
    button.addEventListener('change', function(e){
        e.preventDefault();
        if (e.target.dataset.element === "ecard-send-later") {
            e.target.dataset.form === 'mobile' 
                ? mform.querySelector('#mSendTime').parentElement.classList.remove('hidden')
                : dform.querySelector('#deskSendTime').parentElement.classList.remove('hidden');
        } else {
            e.target.dataset.form === 'mobile' 
                ? mform.querySelector('#mSendTime').parentElement.classList.add('hidden')
                : dform.querySelector('#deskSendTime').parentElement.classList.add('hidden');
        }
    });
});

// Event listener for Personal message field input
document.querySelectorAll('textarea[name^="message"]').forEach(messageField => {
    displayCharCount(messageField);
    messageField.addEventListener('input', updateCharCount)
})

// Back button Click Event
jQuery('button[data-object="mobile-edit-card-back-btn"]').click(event => {
    (function($){
        event.preventDefault();
    
        // Update progress bar
        $('.prog-circle:nth-child(3)').removeClass('past');
        $('.prog-circle:nth-child(5)').removeClass('current');
        setTimeout(function () {
            $('.prog-circle:nth-child(3)').addClass('current');
        }, 150);

        clearFormErrors();
    
        // Hide step 4: Edit Card
        $('#edit-card').removeClass('visible');
        scrollToTop(true);
        // Show step 3: Select Card Type
        $('#select-card').addClass('visible');
        
    })(jQuery);
});

// *** Supporting Functions ***

/**
 * Submits the form.
 * @returns {undefined}
 */
 function submitForm(submitBtn, isMobile) {
    let btnSubmitVal = submitBtn.innerText;

    const formData = isMobile ? jQuery('form[name="mGocEcard"]').serialize() : jQuery('form[name="deskGocEcard"]').serialize(); 
    
	jQuery.ajax({
		url: '/_forms/e-card/',
		type: 'POST',
		data: formData,
		dataType: 'json',
		beforeSend: function() {
			jQuery(':button').prop('disabled', true); // Disable all buttons on the page
			submitBtn.innerText = "Adding to Basket...";
		},
		success: function(response) {
            //Refresh the Google reCaptcha V2 checkbox on "production" only.
            if (googleCaptcha.env === googleCaptcha.server_env_production) {
                refreshReCaptchaV2();
            }
            if (response.success) {
                scrollToTop(isMobile);
                // Add item to cart
                const addToCartBtnType = isMobile 
                    ? jQuery('article div.m-form .add-to-cart-btn').data('object') 
                    : jQuery('article div.desk-form .add-to-cart-btn').data('object');

                if (addToCartBtnType === 'mobile-goc-option-add-to-cart' || addToCartBtnType === 'goc-option-add-to-cart') {
                    const donationAmount = isMobile 
                        ? jQuery('input[name="m-goc-donation-option"]:checked').val() 
                        : jQuery('input[name="goc-donation-option"]:checked').val();

                    constructOptionCartItem(submitBtn, donationAmount, addToCartBtnType);
                } else if (addToCartBtnType === 'mobile-goc-single-add-to-cart' || addToCartBtnType === 'goc-single-add-to-cart') {
                    constructCartItem(submitBtn, addToCartBtnType);
                }
            } else {
                if (Object.keys(response.errors.general).length > 0){
                    const errDiv = isMobile ? mform.querySelector('.generalErrDiv') : dform.querySelector('.generalErrDiv');
                    showFailMessage(response.errors.general, errDiv);
				}  else {
					handleFormErrors(response.errors, isMobile);
				}
            }
        
		},
		error: function(xhr, errorType, exception) {
            //Refresh the Google reCaptcha V2 checkbox on "production" only.
            if (googleCaptcha.env === googleCaptcha.server_env_production) {
                refreshReCaptchaV2();
            }
            const errDiv = isMobile ? mform.querySelector('.generalErrDiv') : dform.querySelector('.generalErrDiv');
			showFailMessage(xhr.responseText, errDiv);
			console.error(xhr.responseText);
		},
		complete: function() {
			jQuery(':button').prop('disabled', false); // Enable all buttons on the page
			submitBtn.innerText = btnSubmitVal;
		}
	});
}

/**
 * Handles any errors returned from the form receiver.
 * @param {object} errors Field specific errors (key is field name, value is the error message).
 * @returns {undefined}
 */
 function handleFormErrors(errors, isMobile) {
	// visual mark which fields have the error
	const fieldErrors = errors.item;
	jQuery.each(fieldErrors, function(key, value) {
        if (isMobile) {
            jQuery('form[name="mGocEcard"] [name="' + key + '"]').closest('.group').addClass('error');
		    jQuery('form[name="mGocEcard"] [name="' + key + '"]').closest('.group').find('div.alert').html(value);			
        } else {
            jQuery('form[name="deskGocEcard"] [name="' + key + '"]').closest('.group').addClass('error');
		    jQuery('form[name="deskGocEcard"] [name="' + key + '"]').closest('.group').find('div.alert').html(value);	
        }
				
	});

    const recipientFieldErrors = errors.recipient;

    for (let i = 0; i < recipientFieldErrors.length; i++){
        if (recipientFieldErrors[i]) {
            jQuery.each(recipientFieldErrors[i], function(key, value) {
                const field = isMobile ? mform.querySelectorAll('[name="' + key + '[]"]')[i] : dform.querySelectorAll('[name="' + key + '[]"]')[i];

                jQuery(field).closest('.group').addClass('error');
                jQuery(field).closest('.group').find('div.alert').html(value);			
            });
        }
    }

    // Scroll to the first error
    const mobileFormWrapper = document.querySelector('.m-form');
    const scrollContainer = isMobile ? mobileFormWrapper.querySelector('#edit-card') : document.querySelector('.desk-modal');
    const offSet = isMobile ? 50 : 100;
	scrollToFirstError(scrollContainer, offSet);
}

/**
 * Scroll to the top of Edit Card page
 */
 function scrollToTop(isMobile) {
    const mobileFormWrapper = document.querySelector('.m-form');

    const currentContainer = isMobile ? mobileFormWrapper.querySelector('#edit-card') : document.querySelector('.desk-modal');

    currentContainer.scrollTo({ top: 0, behavior: 'instant' });
    
}

/**
 * Google  reCAPTCHA V2 & V3 functions.
 */
    
// Render and validate the reCAPTCHA V2 - Checkbox.
function googleReCaptchaV2() {
	grecaptcha.ready(function() {
		mGoogleRecaptcha = grecaptcha.render("mGoogleReCaptchaV2", {
			"sitekey" : googleCaptcha.site_key_v2,
			"callback" : function() {
				checkReCaptchaV2('mobile');
			}
		});
		dGoogleRecaptcha = grecaptcha.render("dGoogleReCaptchaV2", {
			"sitekey" : googleCaptcha.site_key_v2,
			"callback" : function() {
				checkReCaptchaV2('desktop');
			}
		});
	});
}

// Check if the user has clicked the checkbox.
function checkReCaptchaV2(formType) {
    if (formType === 'mobile') {
        if(grecaptcha.getResponse(mGoogleRecaptcha) == 0) { 
            jQuery("#mGoogleReCaptchaV2ErrDiv").closest('.group').addClass('error');
            jQuery("#mGoogleReCaptchaV2ErrDiv").html('Please click on the checkbox to confirm!');		
            return false;
        } else{
            jQuery("#mGoogleReCaptchaV2ErrDiv").closest('.group').removeClass('error');
            return true;
        }
    } else if (formType === 'desktop') {
        if(grecaptcha.getResponse(dGoogleRecaptcha) == 0) { 
            jQuery("#dGoogleReCaptchaV2ErrDiv").closest('.group').addClass('error');
            jQuery("#dGoogleReCaptchaV2ErrDiv").html('Please click on the checkbox to confirm!');		
            return false;
        } else{
            jQuery("#dGoogleReCaptchaV2ErrDiv").closest('.group').removeClass('error');
            return true;
        }
    }
}

// Validate the Google reCaptcha V2 and V3.
function validateGoogleReCaptcha(submitBtn, isMobile) {
    if (isMobile) {
        if (!checkReCaptchaV2('mobile')) return false; // Check if the checkbox has been clicked by the user and verified by Google
    } else {
        if (!checkReCaptchaV2('desktop')) return false; // Check if the checkbox has been clicked by the user and verified by Google
    }

    grecaptcha.ready(function() {
        grecaptcha.execute(googleCaptcha.site_key, {action: googleCaptcha.formName}).then(function(token) {
            isMobile ? mform.querySelector('input[name="googleToken"]').value = token : dform.querySelector('input[name="googleToken"]').value = token;
            submitForm(submitBtn, isMobile);
        });
    });
}

// Refresh the reCAPTCHA V2.
function refreshReCaptchaV2() {
	grecaptcha.reset(mGoogleRecaptcha);
	grecaptcha.reset(dGoogleRecaptcha);
}
