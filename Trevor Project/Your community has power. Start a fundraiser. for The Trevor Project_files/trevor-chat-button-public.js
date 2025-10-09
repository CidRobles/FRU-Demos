(function( $ ) {
	'use strict';

$( 'document' ).ready(function() {

	if ( $('.tcb').length ) {
		getButton();
		setInterval(getButton, (tcb_ajax.interval || 5) * 60 * 1000);
	}

	if ( $('.tcb-link').length ) {
		getTcbAnchorTag();
		setInterval(getTcbAnchorTag, (tcb_ajax.interval || 5) * 60 * 1000);
	}
});

/**
 * Sets the html of the #tcb div to the result of the tcb_check_time ajax call
 */
function getButton() {
	$.ajax({
		url: tcb_ajax.ajax_url,
		data: {
			action: 'tcb_check_time',
		}
	}).done(function(res) {
		$( '.tcb' ).html(res);
	});
}

/**
 * Sets the contents of the .tcb-link anchor to the result of the tcb_get_anchor ajax call 
 */
function getTcbAnchorTag() {
	$.ajax({
		url: tcb_ajax.ajax_url,
		data: {
			action: 'tcb_get_anchor'
		}
	}).done(function(res) {
		res = JSON.parse(res);
		if (res.status === 'ok') {
			$('.tcb-link').attr('href', res.href);
			$('.tcb-link').unbind('click');
			$('.tcb-link').attr('onclick', res.onclick);
		} else {
			$('.tcb-link').prop('href', null);
			$('.tcb-link').prop('onclick', null);
			$('.tcb-link').unbind('click');
			$('.tcb-link').click(function(e) {
				e.preventDefault();
				alert(res.message);
			})
		}
	})
}

})( jQuery );
