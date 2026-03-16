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
        membershipLevel: '',
        gifteeFirstName: '',
        gifteeLastName: '',
        gifteeEmail: '',
        gifteeAddress: '',
        gifteeCity: '',
        gifteeState: '',
        gifteeZip: '',
    }
}

function renderToast(message) {
    var toast = document.createElement('div')
    toast.id = 'error-message'
    toast.textContent = message
    document.body.appendChild(toast)
    setTimeout(function () {
        toast.remove()
    }, 5000)
}

window.addEventListener('DOMContentLoaded', function () {
    // Elements    
    membershipsSelection = this.document.querySelector('select#memberships-select')
    friendsLevels = this.document.getElementById('friends')
    castleLevels = this.document.getElementById('castle')
    jamesLevels = this.document.getElementById('james')

    membershipsSelection.addEventListener('change', function () {
        switch (this.value) {
            case 'Friends of the Smithsonian':
                friendsLevels.style.display = 'flex'
                castleLevels.style.display = 'none'
                jamesLevels.style.display = 'none'
                break;
            case 'Castle Circle':
                friendsLevels.style.display = 'none'
                castleLevels.style.display = 'flex'
                jamesLevels.style.display = 'none'
                break;
            case 'James Smithson Society':
                friendsLevels.style.display = 'none'
                castleLevels.style.display = 'none'
                jamesLevels.style.display = 'flex'
                break;

        }
    })

    FundraiseUp.on('checkoutOpen', function (details) {
        if (details.campaign.id == "FUNJYHDMDWE") {
            document.getElementById('gift-membership-details').style.display = 'none'
        }
    });

    // Gift "Scholar" membership
    this.document.getElementById('gift-scholar').addEventListener('click', function () {
        document.getElementById('gift-membership-details').style.display = 'flex'
    })

    this.document.getElementById('continue-gift').addEventListener('click', function () {
        if (document.getElementById('gift-fname').value == '') {
            renderToast('The first name of the giftee is required')
            document.getElementById('gift-fname').focus()
            return
        } else {
            payload.customFields.gifteeFirstName = document.getElementById('gift-fname').value
        }

        if (document.getElementById('gift-lname').value == '') {
            renderToast('The last name of the giftee is required')
            document.getElementById('gift-lname').focus()
            return
        } else {
            payload.customFields.gifteeLastName = document.getElementById('gift-lname').value
        }

        if (document.getElementById('gift-email').value == '') {
            renderToast('The email address of the giftee is required')
            document.getElementById('gift-email').focus()
            return
        } else {
            payload.customFields.gifteeEmail = document.getElementById('gift-email').value
        }

        if (document.getElementById('gift-address').value == '') {
            renderToast('The address line of the giftee is required')
            document.getElementById('gift-address').focus()
            return
        } else {
            payload.customFields.gifteeAddress = document.getElementById('gift-address').value
        }

        if (document.getElementById('gift-city').value == '') {
            renderToast('The city of the giftee is required')
            document.getElementById('gift-city').focus()
            return
        } else {
            payload.customFields.gifteeCity = document.getElementById('gift-city').value
        }

        if (document.getElementById('gift-state').value == '') {
            renderToast('Please provide the state of the giftee')
            return
        } else {
            payload.customFields.gifteeState = document.getElementById('gift-state').value
        }

        if (document.getElementById('gift-zip').value == '') {
            renderToast('The ZIP code of the giftee is required')
            document.getElementById('gift-zip').focus()
            return
        } else {
            payload.customFields.gifteeZip = document.getElementById('gift-zip').value
        }

        payload.donation.amount = 80

        FundraiseUp.openCheckout('FUNELKXPEBW', payload);
    })
})