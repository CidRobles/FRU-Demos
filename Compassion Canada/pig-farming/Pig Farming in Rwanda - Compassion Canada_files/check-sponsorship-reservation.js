/* 
 * check-sponsorship-reservation.js
 * ================================
 * Checks to see if any sponsorships in cart has had their reserved until time elapsed or had been sponsored by another person.
 * This is to ensure that a child does not have duplicate sponsorships if current user has become inactive with a sponsorship in their cart.
 */


// declare varibles
var unavailableChildNames = [];  // names of children that have been added to another user's cart
var expiryTime;  // the time when children in cart expires (and can be sponsored by someone else)

// set the interval to check child reservation (1000 = 1 second)
var checkChildReservationTimer = setInterval(checkSponsorshipReservation, 60000);


jQuery(document).ready(function() {

	// notification close event handler (reloads page)
	jQuery('#notification-sponsorship-reservation a[data-object="close"]').click(function() { 
		location.reload(true);
	});
	
});


/**
 * Performs ajax call that checks the reservation time on any sponsorships that may be in the cart.
 * @returns {undefined}
 */
function checkSponsorshipReservation() {
	jQuery.ajax({
		url: '/_forms/cart/check-sponsorship-reservation.php',
		type: 'POST',
		dataType: 'json',
		success: function(response) {
			if (response.length > 0) {
				handleResponse(response);
			}
		},
		error: function(xhr, errorType, exception) {
			console.error(xhr.responseText);
		}
	});
}

/**
 * Parses response from the check sponsorship reservation ajax call to create and show notification.
 * The response will contain the names of children who are about to expire (or expired) with expiry times and/or children who have become unavailable (added to another user's cart).
 * @param {mixed} response The response from the check sponsorship reservation ajax call.
 * @returns {undefined}
 */
function handleResponse(response) {
	var expiredChildNames = [];  // names of children whose reserved until time has expired or about to expire
	
	// iterate through response to obtain child names and expiry times
	jQuery.each(response, function(index, item) {
		
		// child is cart is about to expire or has expired (add child name to array; obtain earliest expiry time)
		if (item.flag === 'about_to_expire') {
			var itemExpiry = moment(item.expiry);
			expiryTime = (! expiryTime ? itemExpiry : (expiryTime.isSameOrBefore(itemExpiry) ? expiryTime : itemExpiry));
			expiredChildNames.push(item.name);
		}
		
		// child in cart became unavailable (add child name to array)
		if (item.flag === 'unavailable') {
			unavailableChildNames.push(item.name);
		}				
	});
	
	// add names of children to the expiry notice 
	if (expiredChildNames.length > 0) { 
		jQuery('#notification-sponsorship-reservation [data-object="child-names"]').text(formatNames(expiredChildNames));
	}
	
	// add names of unavailable children to the unavailable notice (hide expiry notice text, show unavailable notice text)
	if (unavailableChildNames.length > 0) {
		jQuery('#notification-sponsorship-reservation [data-object="sponsored-child-names"]').text(formatNames(unavailableChildNames));
		jQuery('#notification-sponsorship-reservation .inner span:first-child').addClass('hidden');
		jQuery('#notification-sponsorship-reservation .inner span:last-child').removeClass('hidden');
		jQuery('#notification-sponsorship-reservation').removeClass('alert-warning').addClass('alert-danger');
	}	
	
	// show notification 
	if ((expiredChildNames.length > 0) || (unavailableChildNames.length > 0)) {
		jQuery('#notification-sponsorship-reservation [data-object="expiry-time"]').text(expiryTime.format('h:mm A'));
		jQuery('#notification-sponsorship-reservation').removeClass('hidden');
		jQuery('header#header').addClass('push-down');
	}
}

/**
 * Formats an array of names into a string (add commas and the word "and" if applicable).
 * @param {string[]} names The names to be formatted.
 * @returns {string} The formatted names.
 */
function formatNames(names) {
	var namesString = names.join(', '); 
	var n = namesString.lastIndexOf(', ');
	return namesString.slice(0, n) + namesString.slice(n).replace(', ', ' and ');	
}
