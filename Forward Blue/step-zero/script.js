// Modal state, do not modify
var zeroState = {
    form: {
        id: '',
        amount: '',
        retired_unemployed: '',
        occupation: '',
        employer: ''
    },
}

var campaignConfig = {
    forms: {
        general: 'FUNXZJJPUPH',
        oneTimeNoAI: 'FUNRNYBWNVJ',
        monthlyNoAI: 'FUNCSMMUFPG'
    }
}


/**
 * These are the default values for the Step Zero modal
 * The arrayOnce and arrayMonthly variables contain the gift array for each frequency
 * The defaultOnce and defaultMonthly variables set the pre-selected amount when changing frequency
 * To set the minimum amount for premiums, modify the premiumMinOnce or premiumMinMonthly variables
 */
var arrayOnce = [75, 100, 125, 150, 175, 200]
var arrayMonthly = [20, 40, 60, 80, 100, 120]
var defaultOnce = 100
var defaultMonthly = 40

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
        url: 'https://fru-demo-forwardblue.pages.dev/step-zero/image-asset.jpeg',
        alt: 'Build year-round Democratic momentum with us'
    },
    logo: {
        url: 'https://fru-demo-forwardblue.pages.dev/step-zero/dfdfa400-3350-4e9b-a356-f197f8fe1b8e-Untitleddesign15.png',
        alt: 'Forward Blue'
    },
    title: 'Build year-round Democratic momentum with us ',
    text: `It's up to us to fight back against Donald Trump and his radical agenda. With the future of our democracy on the line, the stakes are too high to sit on the sidelines. <a id="legal-link" href="legal.html">Read our contribution rules and terms of use</a>`
}


/**
 * 
 * @param {*} frequency 
 * Call this function from your page triggers and pass 'once' or 'monthly' as frequency to pre-select a gift frequency when opening the modal
 */
function renderStepZero(configuration) {

    var stepZeroLayout
    if (configuration == 'ai') {
        stepZeroLayout = `<span id=FRU-step-zero-close><svg class="d-block icon-stroke icon-stroke-2"fill=none height=24 viewBox="0 0 24 24"width=24 xmlns=http://www.w3.org/2000/svg stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=1.4><line x1=18 x2=6 y1=6 y2=18></line><line x1=6 x2=18 y1=6 y2=18></line></svg></span><div id=FRU-step-zero-content><section id=FRU-step-zero-left><img alt=""id=FRU-step-zero-campaign src=""><div class=left-container><img alt=""id=FRU-step-zero-logo src=""><div id=FRU-step-zero-copy><h1></h1><p></div></div></section><section id=FRU-step-zero-right><div class=secure><svg class="font-size-28 icon-fill me-2 shrink-0 text-green-80"fill=none height=28 viewBox="0 0 28 28"width=28 xmlns=http://www.w3.org/2000/svg aria-hidden=true><g fill=currentColor><path d="m15.0393 2.44995c-.6707-.24772-1.4079-.24772-2.0786 0l-8.30715 3.06797c-.39274.14504-.65355.51939-.65355.93807v7.54411c0 3.6861 1.95965 6.6874 4.28911 8.8073 1.16017 1.0557 2.38789 1.8689 3.45309 2.4137 1.1081.5668 1.9145.779 2.2578.779s1.1497-.2122 2.2578-.779c1.0652-.5448 2.2929-1.358 3.4531-2.4137 2.3294-2.1199 4.2891-5.1212 4.2891-8.8073v-7.54411c0-.41868-.2608-.79303-.6536-.93807zm-2.7715-1.876139c1.1179-.412868 2.3465-.412868 3.4644 0l8.3071 3.067969c1.1783.43514 1.9607 1.55819 1.9607 2.81421v7.54411c0 4.4389-2.3618 7.9375-4.943 10.2865-1.2952 1.1786-2.6702 2.092-3.8885 2.7151-1.1754.6012-2.3332.9984-3.1685.9984s-1.9931-.3972-3.1685-.9984c-1.21831-.6231-2.59328-1.5365-3.88847-2.7151-2.58125-2.349-4.94303-5.8476-4.94303-10.2865v-7.54411c0-1.25602.78243-2.37907 1.96066-2.81421z"clip-rule=evenodd fill-rule=evenodd></path><path d="m18.2906 11.75h-.2535v-1.1855c0-2.19278-1.7415-4.02451-3.9182-4.06361-.0595-.00107-.1783-.00107-.2378 0-2.1767.0391-3.91819 1.87083-3.91819 4.06361v1.1855h-.25354c-.39069 0-.70937.4028-.70937.9003v5.9463c0 .4969.31868.9035.7094.9035h8.5812c.3907 0 .7094-.4066.7094-.9035v-5.9463c0-.4974-.3187-.9003-.7094-.9003zm-3.4867 3.8674v1.7967c0 .2058-.1723.3799-.3784.3799h-.8509c-.2061 0-.3785-.1741-.3785-.3799v-1.7967c-.1999-.1966-.3162-.4684-.3162-.7691 0-.5698.4408-1.0594 1.0013-1.082.0594-.0024.1783-.0024.2377 0 .5605.0226 1.0013.5122 1.0013 1.082 0 .3007-.1164.5725-.3163.7691zm1.5623-3.8674h-4.7323v-1.1855c0-1.30621 1.0623-2.38623 2.3661-2.38623s2.3662 1.08002 2.3662 2.38623z"></path></g></svg> <span>Secure donation</span></div><div id=FRU-step-zero-employment><h4>Employment</h4><p>Campaign finance law requires us to collect contributor information, including employment. If you are self-employed, enter your own name as your employer.<div id=FRU-step-zero-employment-status><input id=FRU-step-zero-employment-status-control type=checkbox> <label for=FRU-step-zero-employment-status-control>I'm retired or currently unemployed</label></div><div id=FRU-step-zero-employment-data><input id=FRU-step-zero-employment-occupation placeholder=Occupation> <input id=FRU-step-zero-employment-employer placeholder=Employer></div><small id="employment-data-error">The Occupation and Employer fields are required</small></div><button id=FRU-step-zero-donate>Next step</button></section></div>`
    } else if (configuration == 'static') {
        stepZeroLayout = `<span id=FRU-step-zero-close><svg class="d-block icon-stroke icon-stroke-2"fill=none height=24 viewBox="0 0 24 24"width=24 xmlns=http://www.w3.org/2000/svg stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=1.4><line x1=18 x2=6 y1=6 y2=18></line><line x1=6 x2=18 y1=6 y2=18></line></svg></span><div id=FRU-step-zero-content><section id=FRU-step-zero-left><img alt=""id=FRU-step-zero-campaign src=""><div class=left-container><img alt=""id=FRU-step-zero-logo src=""><div id=FRU-step-zero-copy><h1></h1><p></div></div></section><section id=FRU-step-zero-right><div class=secure><svg class="font-size-28 icon-fill me-2 shrink-0 text-green-80"fill=none height=28 viewBox="0 0 28 28"width=28 xmlns=http://www.w3.org/2000/svg aria-hidden=true><g fill=currentColor><path d="m15.0393 2.44995c-.6707-.24772-1.4079-.24772-2.0786 0l-8.30715 3.06797c-.39274.14504-.65355.51939-.65355.93807v7.54411c0 3.6861 1.95965 6.6874 4.28911 8.8073 1.16017 1.0557 2.38789 1.8689 3.45309 2.4137 1.1081.5668 1.9145.779 2.2578.779s1.1497-.2122 2.2578-.779c1.0652-.5448 2.2929-1.358 3.4531-2.4137 2.3294-2.1199 4.2891-5.1212 4.2891-8.8073v-7.54411c0-.41868-.2608-.79303-.6536-.93807zm-2.7715-1.876139c1.1179-.412868 2.3465-.412868 3.4644 0l8.3071 3.067969c1.1783.43514 1.9607 1.55819 1.9607 2.81421v7.54411c0 4.4389-2.3618 7.9375-4.943 10.2865-1.2952 1.1786-2.6702 2.092-3.8885 2.7151-1.1754.6012-2.3332.9984-3.1685.9984s-1.9931-.3972-3.1685-.9984c-1.21831-.6231-2.59328-1.5365-3.88847-2.7151-2.58125-2.349-4.94303-5.8476-4.94303-10.2865v-7.54411c0-1.25602.78243-2.37907 1.96066-2.81421z"clip-rule=evenodd fill-rule=evenodd></path><path d="m18.2906 11.75h-.2535v-1.1855c0-2.19278-1.7415-4.02451-3.9182-4.06361-.0595-.00107-.1783-.00107-.2378 0-2.1767.0391-3.91819 1.87083-3.91819 4.06361v1.1855h-.25354c-.39069 0-.70937.4028-.70937.9003v5.9463c0 .4969.31868.9035.7094.9035h8.5812c.3907 0 .7094-.4066.7094-.9035v-5.9463c0-.4974-.3187-.9003-.7094-.9003zm-3.4867 3.8674v1.7967c0 .2058-.1723.3799-.3784.3799h-.8509c-.2061 0-.3785-.1741-.3785-.3799v-1.7967c-.1999-.1966-.3162-.4684-.3162-.7691 0-.5698.4408-1.0594 1.0013-1.082.0594-.0024.1783-.0024.2377 0 .5605.0226 1.0013.5122 1.0013 1.082 0 .3007-.1164.5725-.3163.7691zm1.5623-3.8674h-4.7323v-1.1855c0-1.30621 1.0623-2.38623 2.3661-2.38623s2.3662 1.08002 2.3662 2.38623z"></path></g></svg> <span>Secure donation</span></div><div id=FRU-step-zero-frequency><button id=once><span>Give once</span></button> <button id=monthly><svg class="d-block text-fuchsia-80"fill=none height=14 viewBox="0 0 24 24"width=14 xmlns=http://www.w3.org/2000/svg><path d="M12 20C28.659 10.9628 18.2615 0.617428 12 6.95101C5.73851 0.617357 -4.659 10.9627 12 20Z"fill=currentColor></path></svg> <span>Monthly</span></button></div><div id=FRU-step-zero-array><div id=array-once></div><div id=array-monthly></div></div><div id=FRU-step-zero-employment><h4>Employment</h4><p>Campaign finance law requires us to collect contributor information, including employment. If you are self-employed, enter your own name as your employer.<div id=FRU-step-zero-employment-status><input id=FRU-step-zero-employment-status-control type=checkbox> <label for=FRU-step-zero-employment-status-control>I'm retired or currently unemployed</label></div><div id=FRU-step-zero-employment-data><input id=FRU-step-zero-employment-occupation placeholder=Occupation> <input id=FRU-step-zero-employment-employer placeholder=Employer></div><small id="employment-data-error">The Occupation and Employer fields are required</small></div><button id=FRU-step-zero-donate-static>Donate</button></section></div>`
    }

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

    if (configuration == 'static') {
        arrayOnce.forEach(function (amount) {
            var amountButton = document.createElement('button')
            amountButton.setAttribute('data-amount', amount)
            amountButton.classList.add('amount-button')
            amountButton.textContent = `$${amount}`
            document.getElementById('array-once').appendChild(amountButton)
        })

        var otherAmountOnceContainer = document.createElement('div')
        otherAmountOnceContainer.classList.add('other-amount-container')
        var dollarSign = document.createElement('span')
        dollarSign.classList.add('dollar-sign-icon')
        dollarSign.textContent = '$'
        var otherAmountOnce = document.createElement('input')
        otherAmountOnce.type = 'text'
        otherAmountOnce.id = 'other-amount-once'

        otherAmountOnceContainer.appendChild(dollarSign)
        otherAmountOnceContainer.appendChild(otherAmountOnce)
        document.getElementById('array-once').appendChild(otherAmountOnceContainer)

        arrayMonthly.forEach(function (amount) {
            var amountButton = document.createElement('button')
            amountButton.setAttribute('data-amount', amount)
            amountButton.classList.add('amount-button')
            amountButton.textContent = `$${amount}`
            document.getElementById('array-monthly').appendChild(amountButton)
        })

        var otherAmountMonthlyContainer = document.createElement('div')
        otherAmountMonthlyContainer.classList.add('other-amount-container')
        var dollarSignMonthly = document.createElement('span')
        dollarSignMonthly.classList.add('dollar-sign-icon')
        dollarSignMonthly.textContent = '$'
        var otherAmountMonthly = document.createElement('input')
        otherAmountMonthly.type = 'text'
        otherAmountMonthly.id = 'other-amount-monthly'

        otherAmountMonthlyContainer.appendChild(dollarSignMonthly)
        otherAmountMonthlyContainer.appendChild(otherAmountMonthly)
        document.getElementById('array-monthly').appendChild(otherAmountMonthlyContainer)
    }



    // Hanlders
    document.getElementById('FRU-step-zero-close').addEventListener('click', function () {
        stepZeroOverlay.remove()
    })

    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            stepZeroOverlay.remove()
        }
    })

    if (configuration == 'static') {
        document.querySelector('button#once').addEventListener('click', function () {
            // Click default amount
            zeroState.form.id = campaignConfig.forms.oneTimeNoAI
            document.querySelector(`#array-once button[data-amount="${defaultOnce}"]`).click()
            // Hide monthly array
            document.querySelector('#array-monthly').style.display = 'none'
            document.querySelector('#array-once').style.display = 'flex'
            document.querySelector('button#monthly').classList.remove('selected')
            this.classList.add('selected')
        })

        document.querySelector('button#monthly').addEventListener('click', function () {
            // Click default amount
            zeroState.form.id = campaignConfig.forms.monthlyNoAI
            document.querySelector(`#array-monthly button[data-amount="${defaultMonthly}"]`).click()
            // Hide monthly array
            document.querySelector('#array-once').style.display = 'none'
            document.querySelector('#array-monthly').style.display = 'flex'
            document.querySelector('button#once').classList.remove('selected')
            this.classList.add('selected')
        })

        document.querySelectorAll('#array-once button.amount-button').forEach(function (button) {
            button.addEventListener('click', function () {
                document.querySelectorAll('#array-once button.amount-button').forEach(function (button) { button.classList.remove('selected') })
                this.classList.add('selected')
                zeroState.form.amount = this.getAttribute('data-amount')
                otherAmountOnce.value = zeroState.form.amount
            })
        })

        document.querySelectorAll('#array-monthly button.amount-button').forEach(function (button) {
            button.addEventListener('click', function () {
                document.querySelectorAll('#array-monthly button.amount-button').forEach(function (button) { button.classList.remove('selected') })
                this.classList.add('selected')
                zeroState.form.amount = this.getAttribute('data-amount')
                otherAmountMonthly.value = zeroState.form.amount
            })
        })

        otherAmountOnce.addEventListener('input', function (e) {
            document.querySelectorAll('#array-once button.amount-button').forEach(function (button) { button.classList.remove('selected') })
            // Get the current input value
            let value = e.target.value;

            // Replace any character that is not a digit or period
            value = value.replace(/[^\d.]/g, '');

            // Ensure only one decimal point exists
            const decimalCount = (value.match(/\./g) || []).length;
            if (decimalCount > 1) {
                // Keep only the first decimal point
                const parts = value.split('.');
                value = parts[0] + '.' + parts.slice(1).join('');
            }

            // Update the input value
            e.target.value = value;
            zeroState.form.amount = value

        })

        otherAmountMonthly.addEventListener('input', function (e) {
            document.querySelectorAll('#array-monthly button.amount-button').forEach(function (button) { button.classList.remove('selected') })
            // Get the current input value
            let value = e.target.value;

            // Replace any character that is not a digit or period
            value = value.replace(/[^\d.]/g, '');

            // Ensure only one decimal point exists
            const decimalCount = (value.match(/\./g) || []).length;
            if (decimalCount > 1) {
                // Keep only the first decimal point
                const parts = value.split('.');
                value = parts[0] + '.' + parts.slice(1).join('');
            }

            // Update the input value
            e.target.value = value;
            zeroState.form.amount = value
        })

        document.getElementById('FRU-step-zero-employment-status-control').addEventListener('change', function () {
            if (this.checked) {
                document.getElementById('FRU-step-zero-employment-occupation').value = ''
                document.getElementById('FRU-step-zero-employment-employer').value = ''
                document.getElementById('FRU-step-zero-employment-data').style.display = 'none'
            } else {
                document.getElementById('FRU-step-zero-employment-data').style.display = 'block'
            }

            zeroState.form.retired_unemployed = this.checked
        })

        var retiredBox = document.getElementById('FRU-step-zero-employment-status-control')
        var occupationInput = document.getElementById('FRU-step-zero-employment-occupation')
        var employerInput = document.getElementById('FRU-step-zero-employment-employer')

        document.getElementById('FRU-step-zero-donate-static').addEventListener('click', function () {
            if (!retiredBox.checked) {
                if (String(occupationInput.value).trim() == '' || String(employerInput.value).trim() == '') {
                    document.getElementById('employment-data-error').style.display = 'block'
                } else {
                    document.getElementById('employment-data-error').style.display = 'none'
                    zeroState.form.employer = employerInput.value
                    zeroState.form.occupation = occupationInput.value


                    stepZeroOverlay.remove()
                    FundraiseUp.openCheckout(zeroState.form.id, {
                        donation: {
                            amount: Number(zeroState.form.amount),
                            currency: 'USD',
                            recurring: 'once',
                        },
                        customFields: {
                            retired_unemployed: retiredBox.checked,
                            occupation: zeroState.form.occupation,
                            employer: zeroState.form.employer,
                        },
                        config: {
                            modifyAmount: false,
                        }
                    });
                }
            } else {
                stepZeroOverlay.remove()
                FundraiseUp.openCheckout(zeroState.form.id, {
                    donation: {
                        amount: Number(zeroState.form.amount),
                        currency: 'USD',
                        recurring: 'once',
                    },
                    customFields: {
                        retired_unemployed: retiredBox.checked,
                        occupation: zeroState.form.occupation,
                        employer: zeroState.form.employer,
                    },
                    config: {
                        modifyAmount: false,
                    }
                });
            }
        })

        stepZeroOverlay.style.display = 'flex'
        document.querySelector('button#once').click()
    }


    if (configuration == 'ai') {
        zeroState.form.id = campaignConfig.forms.general
        stepZeroOverlay.style.display = 'flex'
        var retiredBox = document.getElementById('FRU-step-zero-employment-status-control')
        var occupationInput = document.getElementById('FRU-step-zero-employment-occupation')
        var employerInput = document.getElementById('FRU-step-zero-employment-employer')

        document.getElementById('FRU-step-zero-employment-status-control').addEventListener('change', function () {
            if (this.checked) {
                document.getElementById('FRU-step-zero-employment-occupation').value = ''
                document.getElementById('FRU-step-zero-employment-employer').value = ''
                document.getElementById('FRU-step-zero-employment-data').style.display = 'none'
                document.getElementById('employment-data-error').style.display = 'none'
            } else {
                document.getElementById('FRU-step-zero-employment-data').style.display = 'block'
            }

            zeroState.form.retired_unemployed = this.checked
        })

        document.getElementById('FRU-step-zero-donate').addEventListener('click', function () {
            if (!retiredBox.checked) {
                if (String(occupationInput.value).trim() == '' || String(employerInput.value).trim() == '') {
                    document.getElementById('employment-data-error').style.display = 'block'
                } else {
                    document.getElementById('employment-data-error').style.display = 'none'
                    zeroState.form.employer = employerInput.value
                    zeroState.form.occupation = occupationInput.value

                    stepZeroOverlay.remove()
                    FundraiseUp.openCheckout(zeroState.form.id, {
                        donation: {
                            amount: Number(zeroState.form.amount),
                            currency: 'USD',
                            recurring: 'once',
                        },
                        customFields: {
                            retired_unemployed: retiredBox.checked,
                            occupation: zeroState.form.occupation,
                            employer: zeroState.form.employer,
                        },
                    });
                }
            } else {
                stepZeroOverlay.remove()
                FundraiseUp.openCheckout(zeroState.form.id, {
                    donation: {
                        amount: Number(zeroState.form.amount),
                        currency: 'USD',
                        recurring: 'once',
                    },
                    customFields: {
                        retired_unemployed: retiredBox.checked,
                        occupation: zeroState.form.occupation,
                        employer: zeroState.form.employer,
                    },
                });
            }
        })
    }
}



/*
These are your page triggers
Whenever the Step Zero modal needs to be included this will have to be replaced
*/
var mainCTA = document.querySelector('#GC-AI')
var mainCTAAmounts = document.querySelector('#GC-NO-AI')
/**
 * ATTACH YOUR PAGE TRIGGERS HERE!!!!
 */
mainCTA.addEventListener('click', function (e) {
    e.preventDefault()
    console.log('Opening AI modal')
    renderStepZero('ai')
})

// mainCTAAmounts.addEventListener('click', function (e) {
//     e.preventDefault()
//     console.log('Opening static modal')
//     renderStepZero('static')
// })
