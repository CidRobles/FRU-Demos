/*
 * hotjar.js
 * =========
 *
 * This JS file get the slug of the page and determines which Hotjar trigger needs to be invoked.
 *
 * general_feedback
 * ----------------
 * 	URL Contains:
 *		https://www.compassion.ca
 *	Does NOT Contain:
 *		https://www.compassion.ca/strategic-compassion/
 *		https://www.compassion.ca/curriculum/eyestosee/
 *		https://www.compassion.ca/curriculum/sims/
 *		https://www.compassion.ca/curriculum/truestory/
 *		https://www.compassion.ca/curriculum/my/
 *		https://www.compassion.ca/curriculum/shop/
 *
 * curriculum_feedback
 * -------------------
 *	Starts With:
 *		https://www.compassion.ca/strategic-compassion/
 *		https://www.compassion.ca/curriculum/eyestosee/
 *		https://www.compassion.ca/curriculum/sims/
 *		https://www.compassion.ca/curriculum/truestory/
 *
 * shop_feedback
 * -------------
 * 	URL Contains:
 * 		https://www.compassion.ca/shop
 *
 * my_compassion_feedback
 * ----------------------
 * 	URL Contains:
 * 		https://www.compassion.ca/my
 */

var pageSlug = window.location.pathname.replace(/^\/|\/$/g, ""); // Path (slug) of the URL.
var slugArr = pageSlug.split("/"); // Split the slug based on the "/" slash.

jQuery(document).ready(function() {

	/**
	 * Get the Hotjar trigger name based on the slug.
	 * @param {string} slug Contains the slug of the page.
	 * @returns {string} trigger Return the name of the trigger.
	 */
	function getTiggerName(slug) {
		var trigger;
		switch (slug) {
			case "my":
				trigger = "my_compassion_feedback";
				break;
			case "shop":
				trigger = "shop_feedback";
				break;
			case "curriculum":
			case "strategic-compassion":
				trigger = "curriculum_feedback";
				break;
			default:
				trigger = "general_feedback";
				break;
		}
		return trigger;
	}

	/**
	 * Manual trigger for the Hotjar after 5 seconds delay.
	 * @param {string} triggerValue Contains the name of the trigger (has to match in the Hotjar admin panel).
	 */
	function triggerHotjar(triggerValue) {
		setTimeout(function(){
			hj("trigger", triggerValue);
		}, 5000);
	}

	// Get the trigger name based on the URL and trigger the Hotjar.
	triggerHotjar(getTiggerName(slugArr[0]));

});
