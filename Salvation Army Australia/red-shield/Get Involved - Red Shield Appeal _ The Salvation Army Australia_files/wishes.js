var product_page_js = 0;
var firstItem = true;
var item_qty = {};
var total_qty;
const scroll_to_cart = false;


function toggle_cart() {
	cart_visibility('toggle');
	 firstItem = false;
}

function hide_cart() {
	cart_visibility('hide');
}

function cart_visibility(mode) {
	var corporate_page = $('#corporate-page').val();
	var corporate_page_url_fragment = '';

	if(corporate_page) {
		corporate_page_url_fragment = '?corporate_page=1';
	}

	$("div#popup_cart").load(shop_url + 'cart/ajax/'+corporate_page_url_fragment, function(data) {
		refreshEventHandlers();
		$(this).animate({ height: mode, opacity: mode }, "fast");
		gaEvent.viewCart();
	});
}

function refresh_cart() {
	$.ajaxSetup({ cache: false });
	$.getJSON(shop_url + 'cart/refresh/?t=' + new Date().getTime(), function(data) {
		$('.shopping-cart').replaceWith(data);
	});
}

function calculate_total_qty(){
	var total = 0;

	for (var name in item_qty) {
		total+= parseInt(item_qty[name]);
	}

	total_qty = total;

	refresh_cart_button(total);
}

function refresh_cart_button(total){
	$(".wishes-mobile-qty").html(total);
}

function cart_msg(qty, total) {
	$("#side_cart_qty").html(qty);
	$("#mobile_side_cart_qty").html(qty);
	$('#mobile_side_cart_qty').parent().css('display', 'block');

	var items_msg = "item";
	if(qty>1) {
		items_msg += "s";
	}
	$("#side_cart_items_msg").html(items_msg);
	$("#side_cart_total").html(total);
	calculate_total_qty();
	if (qty==0) {
		$("#cart_contents").hide();
		$("#cart_msg").show();
		$("#popup_cart").animate({ height: 'hide', opacity: 'hide' }, "fast");
	} else {
		$("#cart_msg").hide();
		$("#cart_contents").show();
	}
}

function qty_add_subtract(product_id, amount){
	if(!isNaN(amount)) {
		var total = item_qty[product_id] + amount;
		qty_change(product_id,total);
		$('#quantity_'+product_id).val(total);
	}
}

function qty_change(product_id, n) {
	var prev_qty = item_qty[product_id];
	var diff =  n - prev_qty;
	if(!isNaN(n)) {

		item_qty[product_id] = n;
		if(item_qty[product_id] < 0){
			item_qty[product_id] = 0;
		}

		if(item_qty[product_id] == 0 && !isNaN(diff)){
			gaEvent.removeFromCart(product_id,prev_qty);
		}else if(diff < 0){
			gaEvent.removeFromCart(product_id,Math.abs(diff));
		}else if(diff > 0){
			gaEvent.addToCart(product_id,Math.abs(diff));
		}
		calculate_total_qty();


		if(product_page_js == 1 && $('.wishes-product-page').length){ // this is a product page
			if(item_qty[product_id]>0){
				$('#checkout-proceed-btn').show();
			  	$('#checkout-proceed-btn').css('display', 'inline-block');
			}else{
				$('#checkout-proceed-btn').hide();
			}
		}else{
			if(total_qty > 0){
				$('#checkout-proceed-btn').show();
				$('#checkout-proceed-btn').css('display', 'inline-block');
			}else{
				$('#checkout-proceed-btn').hide();
			}
		}


		if (item_qty[product_id]==0) {
			/* Delete item */
			del_item(product_id);
		} else {
			/* Change quantity */
			$('#qty_' + product_id).html(item_qty[product_id]);
			$.getJSON(shop_url + 'cart/quantity/' + product_id + '/' + item_qty[product_id] + '/', function(data) {
				$('#total_' + product_id).html(data.subtotal);
				$('#cart_total').html(data.total);
				//total_qty = data.total_qty;
				cart_msg(data.total_qty, data.total);
				$("#added_qty_" + product_id).html(item_qty[product_id]);
			});
		}

		change_product_btn(product_id, item_qty[product_id]);

	} else {
		alert("Please enter a valid numerical quantity.");
	}
}
function fetch_item_array(){
	$.getJSON(shop_url + 'cart/refresh/', function(data) {
		item_qty = data;
		update_first_item();
	});		
}


function add_to_cart(product_id, qty, disable_add_button, miscellaneous) {
	if (window.location.href.indexOf('wishes') != -1) {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			'content_id': product_id.toUpperCase(),
			'content_type': 'product'
		});
	}

	qty = parseInt(qty);
	if(disable_add_button) {
		$("#added_" + product_id).parent().find(".cart_add").fadeOut();
    }

	if (item_qty[product_id] > 0) {
		return qty_change(product_id, qty);
    }
	if(qty > 0){
		gaEvent.addToCart(product_id,qty);
		
		item_qty[product_id] = qty;
		calculate_total_qty();

		$.getJSON(shop_url + 'cart/add/' + product_id + '/' + qty + '/', function(data) {
			cart_msg(data.qty, data.total);
			$("#added_" + product_id).fadeIn();
			$("#added_qty_" + product_id).html(qty);
			$("#product-container-" + product_id).addClass('selected');
			$("#added_" + product_id).addClass('in_cart');
			$("#cart-btn").css('display','block');
			change_product_btn(product_id, item_qty[product_id]);
			if(firstItem){
				if($('.wishes-product-page').length){
					toggle_cart();
				}
				if(scroll_to_cart){
					$("html, body").animate({
						scrollTop: $("#popup_cart").offset().top
					}, 800); // You can adjust the animation speed (in milliseconds)
				}
				update_first_item();
			}
		});
	}

	if(product_page_js == 1 && $('.wishes-product-page').length){ // this is a product page
		if(item_qty[product_id]>0){
			$('#checkout-proceed-btn').show();
			$('#checkout-proceed-btn').css('display', 'inline-block');
		}else{
			$('#checkout-proceed-btn').hide();
		}
	}else{
		if(total_qty > 0){
			$('#checkout-proceed-btn').show();
			$('#checkout-proceed-btn').css('display', 'inline-block');
		}else{
			$('#checkout-proceed-btn').hide();
		}
	}
};


function add_to_cart_button_event(product_id, qty, disable_add_button, miscellaneous){
	add_to_cart(product_id, qty, disable_add_button, miscellaneous);
	setTimeout(function() {
		toggle_cart();
	}, 100);
	return false;

}

function del_item(product_id, enable_add_button) {

	total_qty -= item_qty[product_id];
	$.getJSON(shop_url + 'cart/remove/' + product_id + '/', function(data) {
		$("#cart_row_" + product_id).remove();
		$('#cart_total').html(data.total);
		$("#added_qty_" + product_id).html(0);
		$("#added_" + product_id).removeClass('in_cart');
		$("#product-container-" + product_id).removeClass('selected');
		if(enable_add_button)
			$("#added_" + product_id).parent().find(".cart_add").fadeIn();
		if(item_qty[product_id] > 0){
			gaEvent.removeFromCart(product_id,item_qty[product_id]);
		}
		item_qty[product_id] = 0;
		cart_msg(total_qty, data.total);
		change_product_btn(product_id,0);
		update_first_item();
		// commented out was causing a bug with sticky cart
		// change_product_btn(product_id, item_qty[product_id]);

	});
}

function change_product_btn(product_id, qty){

	if(qty <= 0){
		$('#product-btn-text-'+product_id).text('Add to cart');
		$('#product-btn-'+product_id).removeClass('checkout');
		$('#checkout-proceed-btn-'+product_id).removeClass('checkout');
		$('#product-btn-'+product_id).removeClass('update');
	}else{
		$('#product-btn-text-'+product_id).text('Update cart');
		if($('#product-btn-'+product_id).data('type') == 'product page'){
			$('#product-btn-'+product_id).addClass('checkout');
			$('#checkout-proceed-btn-'+product_id).addClass('checkout');
		}else{
			$('#product-btn-'+product_id).addClass('update');
		}
	}
	$(".wishes-mobile-qty").html(total_qty);
}

function is_number(n) {
return !isNaN(parseFloat(n)) && isFinite(n);
}

function update_first_item(){
	if(Object.keys(item_qty).length === 0 || total_qty <= 0){ // if the item_qty has no items in it
		firstItem = true;
	}else{
		firstItem = false;
	}
}

function refreshEventHandlers(){
	$("#cart_checkout, #checkout-proceed-btn").off("click");
	$("#cart_checkout, #checkout-proceed-btn").on("click",function (e){
		e.preventDefault();
		$(this).html(getLoadingSvgHtml() + 'Processing your order')
		gaEvent.beginCheckout($(this).attr("href")); // Comment this line for debugging loading icon // TODO: Remove this comment
	});
}

function getLoadingSvgHtml(){
	let html= '' +
		'<svg class="gears" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1.5rem" height="1.5rem" display="inline-block"\n' +
		'    preserveAspectRatio="xMidYMid" shape-rendering="auto" viewBox="0 0 100 100">\n' +
		'    <g transform="translate(50 50)">\n' +
		'        <g transform="matrix(.5 0 0 .5 -17 -17)">\n' +
		'            <g>\n' +
		'                <animateTransform attributeName="transform" begin="0s" dur="0.6097560975609756s" keyTimes="0;1"\n' +
		'                    repeatCount="indefinite" type="rotate" values="0;45" />\n' +
		'                <path fill="#ffffff"\n' +
		'                    d="M37.35-7h10V7h-10a38 38 0 0 1-5.99 14.46l7.07 7.07-9.9 9.9-7.07-7.07A38 38 0 0 1 7 37.35v10H-7v-10a38 38 0 0 1-14.46-5.99l-7.07 7.07-9.9-9.9 7.07-7.07A38 38 0 0 1-37.35 7h-10V-7h10a38 38 0 0 1 5.99-14.46l-7.07-7.07 9.9-9.9 7.07 7.07A38 38 0 0 1-7-37.35v-10H7v10a38 38 0 0 1 14.46 5.99l7.07-7.07 9.9 9.9-7.07 7.07A38 38 0 0 1 37.35-7M0-23a23 23 0 1 0 0 46 23 23 0 1 0 0-46" />\n' +
		'            </g>\n' +
		'        </g>\n' +
		'        <g transform="matrix(.4 0 0 .4 0 22)">\n' +
		'            <g>\n' +
		'                <animateTransform attributeName="transform" begin="-0.3048780487804878s" dur="0.6097560975609756s"\n' +
		'                    keyTimes="0;1" repeatCount="indefinite" type="rotate" values="45;0" />\n' +
		'                <path fill="#ffffff"\n' +
		'                    d="M37.35-7h10V7h-10a38 38 0 0 1-5.99 14.46l7.07 7.07-9.9 9.9-7.07-7.07A38 38 0 0 1 7 37.35v10H-7v-10a38 38 0 0 1-14.46-5.99l-7.07 7.07-9.9-9.9 7.07-7.07A38 38 0 0 1-37.35 7h-10V-7h10a38 38 0 0 1 5.99-14.46l-7.07-7.07 9.9-9.9 7.07 7.07A38 38 0 0 1-7-37.35v-10H7v10a38 38 0 0 1 14.46 5.99l7.07-7.07 9.9 9.9-7.07 7.07A38 38 0 0 1 37.35-7M0-23a23 23 0 1 0 0 46 23 23 0 1 0 0-46" />\n' +
		'            </g>\n' +
		'        </g>\n' +
		'        <g transform="matrix(.3 0 0 .3 28 4)">\n' +
		'            <g>\n' +
		'                <animateTransform attributeName="transform" begin="-0.3048780487804878s" dur="0.6097560975609756s"\n' +
		'                    keyTimes="0;1" repeatCount="indefinite" type="rotate" values="0;45" />\n' +
		'                <path fill="#ffffff"\n' +
		'                    d="M37.35-7h10V7h-10a38 38 0 0 1-5.99 14.46l7.07 7.07-9.9 9.9-7.07-7.07A38 38 0 0 1 7 37.35v10H-7v-10a38 38 0 0 1-14.46-5.99l-7.07 7.07-9.9-9.9 7.07-7.07A38 38 0 0 1-37.35 7h-10V-7h10a38 38 0 0 1 5.99-14.46l-7.07-7.07 9.9-9.9 7.07 7.07A38 38 0 0 1-7-37.35v-10H7v10a38 38 0 0 1 14.46 5.99l7.07-7.07 9.9 9.9-7.07 7.07A38 38 0 0 1 37.35-7M0-23a23 23 0 1 0 0 46 23 23 0 1 0 0-46" />\n' +
		'            </g>\n' +
		'        </g>\n' +
		'    </g>\n' +
		'</svg>';

	return html;
}

function reset_process_buttons(new_item_qty){
	let cart_button = document.getElementById("cart_checkout");
	let product_checkout_button = document.getElementById("checkout-proceed-btn");

	if(cart_button){
		cart_button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve"><path style="fill:#fff" d="m24 17.8-1.3-7.5C22.6 9.5 22 9 21.2 9H9.8V6h4.5c.4 0 .7-.3.7-.7V.8c0-.5-.3-.8-.7-.8h-12c-.5 0-.8.3-.8.7v4.5c0 .5.3.8.7.8h4.5v3h-4c-.7 0-1.3.5-1.4 1.3L0 17.8v4.8c0 .7.7 1.4 1.5 1.4h21c.8 0 1.5-.7 1.5-1.5v-4.7zm-10.9-6.2c0-.4.3-.7.8-.8h.8c.4 0 .7.3.8.8v.8c0 .4-.3.7-.8.8h-.8c-.4 0-.7-.3-.8-.8v-.8zm-1.5 3h.8c.4 0 .7.3.8.8v.7c0 .4-.3.7-.8.8h-.8c-.4 0-.7-.3-.8-.8v-.7c.1-.4.4-.8.8-.8zm-1.5-3.7c.4 0 .7.3.8.8v.8c0 .4-.3.7-.8.8h-.7c-.4 0-.7-.3-.8-.8v-.8c0-.4.3-.7.8-.8h.7zM3.8 3.8V2.3h9v1.5h-9zm1.8 9.3h-.7c-.4 0-.7-.3-.8-.8v-.8c0-.4.3-.7.8-.8h.8c.4 0 .7.3.8.8v.8c-.1.5-.5.8-.9.8zm.8 3v-.7c0-.4.3-.7.8-.8H8c.4 0 .7.3.8.8v.7c0 .4-.3.7-.8.8h-.9c-.4 0-.7-.4-.7-.8zm10.1 5.3c0 .2-.2.4-.4.4H7.9c-.2 0-.4-.2-.4-.4v-.8c0-.2.2-.4.4-.4h8.2c.2 0 .4.2.4.4v.8zm1.1-5.3c0 .4-.3.7-.8.8H16c-.4 0-.7-.3-.8-.8v-.7c0-.4.3-.7.8-.8h.8c.4 0 .7.3.8.8v.7zm2.3-3.7c0 .4-.3.7-.8.8h-.8c-.4 0-.7-.3-.8-.8v-.8c0-.4.3-.7.8-.8h.8c.4 0 .7.3.8.8v.8z"></path></svg>Proceed to checkout';
	}

	if(product_checkout_button){

		let product_button = document.querySelector('[id^="product-btn-"]');

		let product_id = product_button.dataset.product;
		let qty_field = document.getElementById("quantity_"+product_id);
		if(qty_field){
			if(new_item_qty.hasOwnProperty(product_id)){
				qty_field.value = new_item_qty[product_id];
				change_product_btn(product_id,new_item_qty[product_id]);
			}else{
				qty_field.value = 1;
				change_product_btn(product_id,0);
			}
		}

		product_checkout_button.innerHTML = '<div class="checkout-icon"></div>'
			+'<span class="wishes-mobile-qty">'+total_qty+'</span>'
			+'<span class="mobile-spacer">&nbsp;|&nbsp;</span>'
			+'<span>Proceed to checkout!</span>';

	}
}

function refresh_shop(){
	hide_cart();
	setTimeout(function() {
		get_item_qty().then(data => {
			let tmp_item_qty = data

			for (const key in tmp_item_qty) {
				if (item_qty.hasOwnProperty(key)) {
					item_qty[key] = parseInt(item_qty[key], 10);
				}
			}
			item_qty = tmp_item_qty;
			if (!document.getElementById("donations_form")) {
				reset_process_buttons(tmp_item_qty);
				$("input.wish-quantity").each(function () {
					let product_id = $(this).data('product');
					if (item_qty[product_id] > 0) {

						$("#added_" + product_id).fadeIn();
						$("#added_qty_" + product_id).html(item_qty[product_id]);
						$("#product-container-" + product_id).addClass('selected');
						$("#added_" + product_id).addClass('in_cart');
						$("#cart-btn").css('display', 'block');
						$(this).val(item_qty[product_id]);
						change_product_btn(product_id, item_qty[product_id]);
					} else {
						$(this).val("1");
						$("#product-container-" + product_id).removeClass("selected");
						$("#added_" + product_id).removeClass('in_cart');
						change_product_btn(product_id, 0);
					}
					calculate_total_qty();
				});
			}else{
				loadingOverlay();
				location.reload(); // Refreshes the page
			}

		})
		.catch(error => {
			console.error('Fetch error:', error);
		});
	}, 150);
}

function get_item_qty() {
	return fetch(shop_url + 'cart/refresh/?t=' + new Date().getTime())
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		});
}

function loadingOverlay(){
	// Create the overlay div
	const overlay = document.createElement('div');
	overlay.id = 'overlay';

	// Apply CSS styles to the overlay
	overlay.style.position = 'fixed';
	overlay.style.top = '0';
	overlay.style.left = '0';
	overlay.style.width = '100%';
	overlay.style.height = '100%';
	overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
	overlay.style.display = 'flex';
	overlay.style.alignItems = 'center';
	overlay.style.justifyContent = 'center';
	overlay.style.zIndex = '9999';

	// Create the content div inside the overlay
	const content = document.createElement('div');
	content.className = 'loadingContent';

	// Apply CSS styles to the content div
	content.style.textAlign = 'center';
	content.style.color = 'white';

	// Create the loading gif image element
	const loadingGif = document.createElement('img');
	loadingGif.src = '/scribe/sites/all/images/ajax-loader-spinner-hi-res.gif';
	loadingGif.alt = 'Loading';

	// Apply styles to the loading GIF
	loadingGif.style.width = '50px';
	loadingGif.style.height = '50px';
	loadingGif.style.marginBottom = '10px';

	// Create the "Processing..." text
	const text = document.createElement('p');
	text.innerText = 'Loading...';

	// Apply styles to the "Processing..." text
	text.style.fontSize = '24px';   // Set larger font size
	text.style.fontWeight = 'bold'; // Set text to bold

	// Append gif and text to content div
	content.appendChild(loadingGif);
	content.appendChild(text);

	// Append content to overlay
	overlay.appendChild(content);

	// Append overlay to body
	document.body.appendChild(overlay);

}

$(document).ready(function(){
	update_first_item();
	refreshEventHandlers();
});

window.addEventListener('pageshow', function (event) {
	const [navigationEntry] = performance.getEntriesByType('navigation');
	const isNavigatedFromBack = window.performance.getEntriesByType("navigation")[0].type === 'back_forward';
	if (event.persisted || isNavigatedFromBack) {
		refresh_shop();
	}else if (navigationEntry && navigationEntry.type === 'back_forward') {
		refresh_shop();
	}
});