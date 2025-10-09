jQuery(document).ready(function() {
	// Twitter
	jQuery('.twitter-popup').click(function(event) {
		var width  = 575,
			height = 265,
			left   = (jQuery(window).width()  - width)  / 2,
			top    = (jQuery(window).height() - height) / 2,
			url    = this.href,
			opts   = 'status=1' +
					 ',width='  + width  +
					 ',height=' + height +
					 ',top='    + top    +
					 ',left='   + left;

		window.open(url, 'twitter', opts);

		return false;
	});
	
	// Facebook
	jQuery('.facebook-popup').click(function(event) {
		var width  = 626,
			height = 436,
			left   = (jQuery(window).width()  - width)  / 2,
			top    = (jQuery(window).height() - height) / 2,
			url    = this.href,
			opts   = 'status=1' +
					 ',width='  + width  +
					 ',height=' + height +
					 ',top='    + top    +
					 ',left='   + left;

		window.open(url, 'facebook', opts);

		return false;
	});
	
	// Google+
	jQuery('.googleplus-popup').click(function(event) {
		var width  = 626,
			height = 436,
			left   = (jQuery(window).width()  - width)  / 2,
			top    = (jQuery(window).height() - height) / 2,
			url    = this.href,
			opts   = 'status=1' +
					 ',width='  + width  +
					 ',height=' + height +
					 ',top='    + top    +
					 ',left='   + left;

		window.open(url, 'googleplus', opts);

		return false;
	});
	
});