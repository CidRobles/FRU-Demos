// Payload configuration 
var payload = {
    donation: {
        amount: 0,
        currency: 'USD',
    },
    supporter: {
        firstName: '',
        lastName: '',
    },
    customFields: {
        wallOfHonorName: '',
        notificationFirstName: '',
        notificationLastName: '',
        notificationEmail: '',
        notificationAddressLine: '',
        notificationCity: '',
        notificationState: '',
        notificationZip: '',
    },
    config: {
        modifyAmount: false,
    },
}

window.addEventListener('DOMContentLoaded', function () {
    // Elements    
    var nameToAdd = this.document.getElementsByName('honoree')
    var wallName = this.document.getElementById('wall-of-honor-name')
    var donationLevels = this.document.getElementsByName('donation-level')
    var donationOther = this.document.getElementById('level-other-input')
    var nameDisplay = this.document.querySelector('#display span')
    var notifyTo = this.document.getElementsByName('notify')
    var thirdPartyRow = this.document.getElementById('third-party-info')
    var thirdPartyFirst = this.document.getElementById('third-party-first')
    var thirdPartyLast = this.document.getElementById('third-party-last')
    var thirdPartyEmail = this.document.getElementById('third-party-email')
    var selfNotification = this.document.getElementById('self-notification')
    var addressRow = this.document.getElementById('address-container')
    var addressLine = this.document.getElementById('address-1')
    var city = this.document.getElementById('city')
    var state = this.document.getElementById('state')
    var zip = this.document.getElementById('zip')
    var errorMessage = this.document.getElementById('error')
    var submitBtn = this.document.getElementById('send-name')

    function clearNotificationInfo() {
        thirdPartyFirst.value = ''
        thirdPartyLast.value = ''
        thirdPartyEmail.value = ''
        payload.customFields.notificationFirstName = ''
        payload.customFields.notificationLastName = ''
        payload.customFields.notificationEmail = ''
        addressLine.value = ''
        city.value = ''
        state.value = ''
        zip.value = ''
        payload.customFields.notificationAddressLine = ''
        payload.customFields.notificationCity = ''
        payload.customFields.notificationState = ''
        payload.customFields.notificationZip = ''
        addressRow.style.display = 'none'
    }

    function clearThirdPartyInfo() {
        thirdPartyFirst.value = ''
        thirdPartyLast.value = ''
        payload.customFields.notificationFirstName = ''
        payload.customFields.notificationLastName = ''
    }

    function changeNameSize(amount) {
        if (amount >= 100 && amount < 499) { nameDisplay.style.fontSize = '18px' }
        if (amount >= 500 && amount < 999) { nameDisplay.style.fontSize = '48px' }
        if (amount >= 1000 && amount < 4999) { nameDisplay.style.fontSize = '60px' }
        if (amount >= 5000 && amount < 9999) { nameDisplay.style.fontSize = '72px' }
        if (amount >= 10000) { nameDisplay.style.fontSize = '96px' }
    }
    // Handlers
    nameToAdd.forEach(function (radio) {
        radio.addEventListener('change', function () {
            nameToAdd.forEach(function (el) { el.parentElement.classList.remove('selected') })
            radio.parentElement.classList.add('selected')
            if (radio.id == 'honoree-self') {
                clearNotificationInfo()
                thirdPartyRow.style.display = 'none'
                if (document.querySelector('#notify label.selected') != null) {
                    document.querySelector('#notify label.selected').classList.remove('selected')
                }
            }

            if (radio.id == 'honoree-other') {
                thirdPartyRow.style.display = 'block'
                document.querySelector('label[for="notify-me"]').click()
                document.querySelector('label[for="notify-me"]').classList.add('selected')
            }
        })
    })

    wallName.addEventListener('input', function (e) {
        nameDisplay.textContent = e.target.value
        if (e.target.value == '') {
            nameDisplay.textContent = 'Start typing a name to preview'
        }
        payload.customFields.wallOfHonorName = e.target.value
    })

    donationLevels.forEach(function (radio) {
        radio.addEventListener('change', function () {
            donationLevels.forEach(function (el) { el.parentElement.classList.remove('selected') })
            radio.parentElement.classList.add('selected')
            payload.donation.amount = Number(radio.value)
            document.getElementById('level-other-input').value = ''
            document.getElementById('level-error').style.display = 'none'
            if (radio.id == 'level-other') {
                document.getElementById('level-other-input').focus()
                payload.donation.amount = 0
            }
            changeNameSize(Number(radio.value))
        })
    })

    donationOther.addEventListener('focus', function () {
        document.querySelector('label[for="level-other"]').click()
    })

    donationOther.addEventListener('input', function (e) {
        this.value = e.target.value.replace(/[^0-9]/g, '');
        if (this.value < 100) {
            document.getElementById('level-error').style.display = 'block'
        } else {
            document.getElementById('level-error').style.display = 'none'
        }
        setTimeout(function () {
            payload.donation.amount = Number(donationOther.value)
            changeNameSize(Number(donationOther.value))
        }, 500)
    })

    notifyTo.forEach(function (radio) {
        radio.addEventListener('change', function () {
            notifyTo.forEach(function (el) { el.parentElement.classList.remove('selected') })
            if (radio.id == 'notify-me') {
                clearNotificationInfo()
                document.getElementById('third-party').style.display = 'none'
                addressRow.style.display = 'none'
                selfNotification.style.display = 'block'
            } else if (radio.id == 'notify-third') {
                document.getElementById('third-party').style.display = 'flex'
                document.getElementById('third-party-first').style.display = 'block'
                document.getElementById('third-party-last').style.display = 'block'
                document.getElementById('third-party-email').style.display = 'block'
                addressRow.style.display = 'block'
                thirdPartyFirst.focus()
                selfNotification.style.display = 'none'
                document.querySelector('#address-container h3').textContent = 'NOTIFICANT ADDRESS'
                document.querySelector('label[for="third-party-first"]').textContent = 'Enter the information of the notificant'
            } else if (radio.id == 'notify-honoree') {
                clearThirdPartyInfo()
                document.getElementById('third-party').style.display = 'flex'
                document.getElementById('third-party-first').style.display = 'none'
                document.getElementById('third-party-last').style.display = 'none'
                document.getElementById('third-party-email').style.display = 'block'
                addressRow.style.display = 'block'
                selfNotification.style.display = 'none'
                document.querySelector('#address-container h3').textContent = 'HONOREE ADDRESS'
                document.querySelector('label[for="third-party-first"]').textContent = 'Enter the honoree information'
            }

            radio.parentElement.classList.add('selected')
        })
    })

    zip.addEventListener('input', function (e) {
        this.value = e.target.value.replace(/[^0-9]/g, '');
    })

    submitBtn.addEventListener('click', function () {
        var honoreeType = document.querySelector('#honoree-selection label.selected')
        errorMessage.classList.remove('errors')
        if (payload.customFields.wallOfHonorName == '') {
            errorMessage.textContent = 'A name must be provided for the Wall of Honor'
            errorMessage.classList.add('errors')
            return
        }

        if (payload.donation.amount == 0) {
            errorMessage.textContent = 'Please select or type a valid donation amount'
            errorMessage.classList.add('errors')
            return
        }

        var selectedNotification = document.querySelector('#notify label.selected')
        if (selectedNotification != null) {
            if (selectedNotification.getAttribute('for') == 'notify-third') {
                if (thirdPartyFirst.value == '' || thirdPartyLast.value == '') {
                    errorMessage.textContent = 'Please provide the name of the person to be notified about this gift'
                    errorMessage.classList.add('errors')
                    thirdPartyFirst.focus()
                    return
                }

                payload.customFields.notificationFirstName = thirdPartyFirst.value
                payload.customFields.notificationLastName = thirdPartyLast.value
            }

            // Address must not be empty
            if (selectedNotification.getAttribute('for') == 'notify-honoree' || selectedNotification.getAttribute('for') == 'notify-third') {

                if (thirdPartyEmail.value == '') {
                    errorMessage.textContent = 'Please provide a valid email address to notify about this gift'
                    errorMessage.classList.add('errors')
                    thirdPartyEmail.focus()
                    return
                }

                if (addressLine.value == '') {
                    errorMessage.textContent = 'Address line is required'
                    errorMessage.classList.add('errors')
                    addressLine.focus()
                    return
                }

                if (city.value == '') {
                    errorMessage.textContent = 'City is required'
                    errorMessage.classList.add('errors')
                    city.focus()
                    return
                }

                if (state.value == '') {
                    errorMessage.textContent = 'State is required'
                    errorMessage.classList.add('errors')
                    return
                }

                if (zip.value == '') {
                    errorMessage.textContent = 'ZIP Code is required'
                    errorMessage.classList.add('errors')
                    zip.focus()
                    return
                }

                payload.customFields.notificationEmail = thirdPartyEmail.value
                payload.customFields.notificationAddressLine = addressLine.value
                payload.customFields.notificationCity = city.value
                payload.customFields.notificationState = state.value
                payload.customFields.notificationZip = zip.value

            }
        }


        if (honoreeType.getAttribute('for') == 'honoree-self') {
            payload.supporter.firstName = String(payload.customFields.wallOfHonorName).split(' ')[0]
            payload.supporter.lastName = String(payload.customFields.wallOfHonorName).split(' ')[1]
            FundraiseUp.openCheckout('FUNVFAPKMQV', payload);
        } else {
            payload.supporter.firstName = ''
            payload.supporter.lastName = ''
            FundraiseUp.openCheckout('FUNSMBFZMXR', payload);
        }
    })

    // Auto-click on "Add my name"
    this.document.querySelector('label[for="honoree-self"]').click()
})