FundraiseUp.on('checkoutOpen', function (details) {
    console.log(`== EVENT: Checkout Open ==`);
    console.log(details)
});

FundraiseUp.on('checkoutClose', function (details) {
    console.log(`== EVENT: Checkout Close ==`);
    console.log(details)
});

FundraiseUp.on('donationComplete', function (details) {
    console.log(`== EVENT: Donation Complete ==`);
    console.log(details)
});
