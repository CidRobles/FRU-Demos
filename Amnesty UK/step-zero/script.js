var urlParams = new URLSearchParams(window.location.search)

var formConfig = {
    customFields: {
        over18: '',
        dob: '',
        fundraisedDonation: false,
        fundraiserDetails: '',
        organisationClub: ''
    },
}

/**
 * Set the campaign content for the left part of the Zero Step modal here
 * hero.url: URL of the image to be used as the main campaign image in the modal
 * hero.alt: Alternative text of the image to be used as the main campaign image in the modal, leave empty to use the heading as alternative text
 * logo.url: URL of the organization logo image
 * logo.alt: Alternative text of the organization logo image
 * title: Set the heading for the modal copy
 * text: Set the modal copy text, recommended to keep it less than 420 characters
 */
var campaignContent = {
    hero: {
        url: 'https://fru-demo-amnesty-uk.pages.dev/assets/AUK-campaign.jpg',
        alt: 'DONATE TO PROTECT HUMAN RIGHTS'
    },
    logo: {
        url: 'https://fru-demo-amnesty-uk.pages.dev/assets/AUK-logo.png',
        alt: 'Amnesty International UK'
    },
    title: 'DONATE TO PROTECT HUMAN RIGHTS',
    text: `Give to Amnesty International UK Section Charitable Trust to stand up against injustice and help defend human rights for all.`
}


function renderStepZero() {

    function openFRUCheckout(campaign, config) {
        document.getElementById('FRU-step-zero-overlay').remove()
        FundraiseUp.openCheckout(campaign, config)
    }

    var stepZeroLayout = `<span id=FRU-step-zero-close><svg class="d-block icon-stroke icon-stroke-2" fill=none height=24 viewBox="0 0 24 24" width=24 xmlns=http://www.w3.org/2000/svg stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=1.4><line x1=18 x2=6 y1=6 y2=18></line><line x1=6 x2=18 y1=6 y2=18></line></svg></span><div id=FRU-step-zero-content><section id=FRU-step-zero-left><img alt="" id=FRU-step-zero-campaign src=""><div class=left-container><img alt="" id=FRU-step-zero-logo src=""><div id=FRU-step-zero-copy><h1></h1><p></div></div></section><section id=FRU-step-zero-right><div class=secure><svg class="font-size-28 icon-fill me-2 shrink-0 text-green-80" fill=none height=28 viewBox="0 0 28 28" width=28 xmlns=http://www.w3.org/2000/svg aria-hidden=true><g fill=currentColor><path d="m15.0393 2.44995c-.6707-.24772-1.4079-.24772-2.0786 0l-8.30715 3.06797c-.39274.14504-.65355.51939-.65355.93807v7.54411c0 3.6861 1.95965 6.6874 4.28911 8.8073 1.16017 1.0557 2.38789 1.8689 3.45309 2.4137 1.1081.5668 1.9145.779 2.2578.779s1.1497-.2122 2.2578-.779c1.0652-.5448 2.2929-1.358 3.4531-2.4137 2.3294-2.1199 4.2891-5.1212 4.2891-8.8073v-7.54411c0-.41868-.2608-.79303-.6536-.93807zm-2.7715-1.876139c1.1179-.412868 2.3465-.412868 3.4644 0l8.3071 3.067969c1.1783.43514 1.9607 1.55819 1.9607 2.81421v7.54411c0 4.4389-2.3618 7.9375-4.943 10.2865-1.2952 1.1786-2.6702 2.092-3.8885 2.7151-1.1754.6012-2.3332.9984-3.1685.9984s-1.9931-.3972-3.1685-.9984c-1.21831-.6231-2.59328-1.5365-3.88847-2.7151-2.58125-2.349-4.94303-5.8476-4.94303-10.2865v-7.54411c0-1.25602.78243-2.37907 1.96066-2.81421z" clip-rule=evenodd fill-rule=evenodd></path><path d="m18.2906 11.75h-.2535v-1.1855c0-2.19278-1.7415-4.02451-3.9182-4.06361-.0595-.00107-.1783-.00107-.2378 0-2.1767.0391-3.91819 1.87083-3.91819 4.06361v1.1855h-.25354c-.39069 0-.70937.4028-.70937.9003v5.9463c0 .4969.31868.9035.7094.9035h8.5812c.3907 0 .7094-.4066.7094-.9035v-5.9463c0-.4974-.3187-.9003-.7094-.9003zm-3.4867 3.8674v1.7967c0 .2058-.1723.3799-.3784.3799h-.8509c-.2061 0-.3785-.1741-.3785-.3799v-1.7967c-.1999-.1966-.3162-.4684-.3162-.7691 0-.5698.4408-1.0594 1.0013-1.082.0594-.0024.1783-.0024.2377 0 .5605.0226 1.0013.5122 1.0013 1.082 0 .3007-.1164.5725-.3163.7691zm1.5623-3.8674h-4.7323v-1.1855c0-1.30621 1.0623-2.38623 2.3661-2.38623s2.3662 1.08002 2.3662 2.38623z"></path></g></svg><span>Secure donation</span></div><div id=FRU-step-zero-info><h4>Please answer the following questions</h4><div class="question-container"><label for="step-zero-age">Are you 18 or over?</label><select name="step-zero-age" id="step-zero-age"><option value="Select an answer" selected="true" disabled>Select an answer</option><option value="yes">Yes</option><option value="no">No</option></select><small id="age-error">Please answer this question first</small></div><div class="question-container" id="dob-question"><label for="step-zero-dob">As you are under 18, please tell us your date of birth so that we can send you information relevant to you.</label><input type="date" name="step-zero-dob" id="step-zero-dob"><small id="dob-error">Please enter a valid date of birth</small></div><div class="question-container checkbox"><input type="checkbox" name="step-zero-fundraiser" id="step-zero-fundraiser"><label for="step-zero-fundraiser">I fundraised this donation</label></div><div class="question-container" id="fundraiser-info"><input type="text" id="fundraiser-details" placeholder="Fundraising details (optional)"><input type="text" id="organisation-club" placeholder="Organisation / Club (optional)"></div></div><button id=FRU-step-zero-donate>Donate</button></section></div>`

    var stepZeroOverlay = document.createElement('div')
    stepZeroOverlay.id = 'FRU-step-zero-overlay'
    stepZeroOverlay.innerHTML = stepZeroLayout
    document.body.appendChild(stepZeroOverlay)

    document.getElementById('FRU-step-zero-campaign').src = campaignContent.hero.url
    document.getElementById('FRU-step-zero-campaign').alt = campaignContent.hero.alt
    document.getElementById('FRU-step-zero-logo').src = campaignContent.logo.url
    document.getElementById('FRU-step-zero-logo').alt = campaignContent.logo.alt
    document.querySelector('#FRU-step-zero-copy h1').textContent = campaignContent.title
    document.querySelector('#FRU-step-zero-copy p').innerHTML = campaignContent.text


    // Hanlders
    document.getElementById('FRU-step-zero-close').addEventListener('click', function () {
        stepZeroOverlay.remove()
    })

    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            stepZeroOverlay.remove()
        }
    })

    document.getElementById('step-zero-age').addEventListener('change', function () {
        if (this.value == 'no') {
            document.getElementById('dob-question').style.display = 'flex'
        } else {
            document.getElementById('step-zero-dob').value = ''
            document.getElementById('dob-question').style.display = 'none'
        }

        document.getElementById('age-error').style.display = 'none'
    })

    document.getElementById('step-zero-fundraiser').addEventListener('change', function () {
        if (this.checked) {
            document.getElementById('fundraiser-info').style.display = 'flex'
        } else {
            document.getElementById('fundraiser-info').style.display = 'none'
        }
    })

    document.getElementById('step-zero-dob').addEventListener('change', function () {
        document.getElementById('dob-error').style.display = 'none'
    })



    document.getElementById('FRU-step-zero-donate').addEventListener('click', function () {
        var validForm = false
        function validateDate(dateString) {
            // Parse the input date string
            const inputDate = new Date(dateString);

            // Get current date
            const today = new Date();

            // Set time to midnight to compare just the dates
            today.setHours(0, 0, 0, 0);
            inputDate.setHours(0, 0, 0, 0);

            // Calculate date 150 years ago
            const oneHundredFiftyYearsAgo = new Date();
            oneHundredFiftyYearsAgo.setFullYear(today.getFullYear() - 18);
            oneHundredFiftyYearsAgo.setHours(0, 0, 0, 0);

            // Check if date is valid (not more than 150 years ago and not in the future)
            const isValid = inputDate >= oneHundredFiftyYearsAgo && inputDate <= today;

            return isValid
        }

        var over18 = document.getElementById('step-zero-age').value


        if (over18 == 'Select an answer') {
            document.getElementById('age-error').style.display = 'block'
            validForm = false
        } else {
            if (over18 == 'yes') {
                formConfig.customFields.over18 = 'Yes'
                validForm = true
            } else {
                formConfig.customFields.over18 = 'No'

                var selectedDate = document.getElementById('step-zero-dob').value

                if (selectedDate == '') {
                    document.getElementById('dob-error').style.display = 'block'
                    validForm = false
                }

                if (!validateDate(selectedDate)) {
                    document.getElementById('dob-error').style.display = 'block'
                    validForm = false
                }

                if (validateDate(selectedDate)) {
                    validForm = true
                    formConfig.customFields.dob = selectedDate
                }
            }

            formConfig.customFields.fundraisedDonation = document.getElementById('step-zero-fundraiser').checked
            formConfig.customFields.fundraiserDetails = document.getElementById('fundraiser-details').value
            formConfig.customFields.organisationClub = document.getElementById('organisation-club').value

            if (validForm) {
                if (formConfig.customFields.fundraisedDonation == true) {
                    openFRUCheckout('FUNRDGMSHJP', formConfig)
                } else {
                    openFRUCheckout('FUNHJEQPEKQ', formConfig)
                }
            }

        }
    })

    stepZeroOverlay.style.display = 'flex'

    FundraiseUp.on('checkoutOpen', function (details) {
        console.log(details);
    });
}



/*
These are your page triggers
Whenever the Step Zero modal needs to be included this will have to be replaced
*/
var mainCTA = document.querySelector('#main-trigger')
var mainCTAMobile = document.querySelector('#main-trigger-mobile')

/**
 * ATTACH YOUR PAGE TRIGGERS HERE!!!!
 */
mainCTA.addEventListener('click', function (e) {
    e.preventDefault()
    renderStepZero()
})

mainCTAMobile.addEventListener('click', function (e) {
    e.preventDefault()
    renderStepZero()
})