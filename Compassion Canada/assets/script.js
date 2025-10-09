document.addEventListener('DOMContentLoaded', function () {

    console.log('DOMCONTENTLOADED')
    if (document.getElementById('donate-pig')) {
        document.getElementById('donate-pig').addEventListener('click', function () {
            // Get amounts
            var checkedRadio = document.querySelector('input[name="goc-donation-option"]:checked');
            FundraiseUp.openCheckout('FUNRJTSGCUS', {
                donation: {
                    amount: Number(checkedRadio.value),
                },
                config: {
                    modifyAmount: false,
                },
            });
        })
    }

    if (document.getElementById('donate-business')) {
        document.getElementById('donate-business').addEventListener('click', function () {
            // Get amounts
            var checkedRadio = document.querySelector('input[name="goc-donation-option"]:checked');
            FundraiseUp.openCheckout('FUNCWRNYDGT', {
                donation: {
                    amount: Number(checkedRadio.value),
                },
            });
        })
    }


    if (document.getElementById('dental-care')) {
        document.getElementById('dental-care').addEventListener('click', function () {
            // Get amounts
            var amount = document.querySelector('form.desktop-form .goc-spinner .spinner-text.quantity').textContent;
            FundraiseUp.openCheckout('FUNRJTSGCUS', {
                donation: {
                    amount: Number(amount) * 250,
                },
                config: {
                    modifyAmount: false,
                },
            });
        })
    }
})