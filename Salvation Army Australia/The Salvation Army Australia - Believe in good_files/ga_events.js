// Create a namespace object
const gaEvent = {};
gaEvent.debug = false;

// Event Wrappers
gaEvent.addToCart = function(product_id,qty) {
	gaEvent.message("Added "+ product_id + " x " + qty);
	gaEvent.singleItem("add_to_cart", product_id,qty);
};

gaEvent.removeFromCart = function(product_id,qty){
	gaEvent.message("Removed " + product_id + " x " + qty);
	gaEvent.singleItem("remove_from_cart", product_id,qty);
}

gaEvent.viewItem = function(product_id){
	gaEvent.message("Viewed "+ product_id);
	gaEvent.singleItem("view_item", product_id,1);
}

gaEvent.viewCart = function(){
	let paymentType = null;
	let destination = null;
	gaEvent.message("Viewed cart");
	gaEvent.allItems("view_cart",destination,paymentType);
}

gaEvent.beginCheckout = function(destination){
	let paymentType = null;
	gaEvent.message("begin_checkout");
	gaEvent.allItems("begin_checkout",destination,paymentType);
}

// -- Dream Pipe
gaEvent.addPaymentInfo = function(paymentType){
	let destination = null;
	gaEvent.message("add_payment_info: " + paymentType);
	gaEvent.allItems("add_payment_info",destination,paymentType);
}
// End Dream Pipe

// Supporting functions.
gaEvent.singleItem = function(eventName,product_id,qty){
	gaEvent.getProductDetails(product_id).then(data => {
		let paymentType = null;
		let itemsArray =  [];
		let gaItem = {
			item_id: product_id,
			item_name: data.name,
			item_category: data.category,
			price: data.price,
			quantity: qty
		}
		itemsArray.push(gaItem);

		gaEvent.message(itemsArray);
		let totalValue = gaEvent.calculateTotal(itemsArray);
		gaEvent.submit(eventName,itemsArray,totalValue,paymentType);
	})
	.catch(error => {
		console.error('Fetch error:', error);
	});
}

gaEvent.allItems = function(eventName, destination, paymentType){
	gaEvent.getCartItems().then(data => {
		// Use the data here once it's available
		let itemsArray =  [];
		data.forEach((item) => {
			let gaItem = {
				item_id: item.product_id,
				item_name: item.name,
				item_category: item.category,
				price: item.price,
				quantity: item.quantity
			}
			itemsArray.push(gaItem);
		});

		let totalValue = gaEvent.calculateTotal(itemsArray);
		gaEvent.submit(eventName, itemsArray, totalValue, paymentType);

		if (destination !== null) {
			window.location.href = destination;
		}
	})
	.catch(error => {
		console.error('Fetch error:', error);
	});
}

gaEvent.submit = function(eventName, itemsArray, totalValue, paymentType){
	dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
	let eventData = {
		event: eventName,
		ecommerce: {
			currency: "AUD",
			value: totalValue,
			items: itemsArray
		}
	};

	if(paymentType != null){
		eventData.ecommerce.payment_type = paymentType
	}
	dataLayer.push(eventData);
}

gaEvent.getProductDetails = function(product_id){
	return fetch(shop_url + 'cart/product-details/'+product_id+'/')
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		});
}

gaEvent.getCartItems = function(){
	return fetch(shop_url + 'cart/details/')
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		});
}

gaEvent.calculateTotal = function(itemsArray){
	let totalValue = 0;
	itemsArray.forEach((item) => {
		totalValue += item.price * item.quantity;
	});
	return totalValue;
}

gaEvent.message = function(message){
	if(gaEvent.debug){
		console.log(message);
	}
}

gaEvent.applyAddPaymentInfoEventHandlers = function(){
	// Get references to the radio buttons
	const creditCardRadio 	= document.getElementById("paymentTypeCC");
	const paypalRadio 		= document.getElementById("paymentTypePP");
	const directDebtRadio	= document.getElementById("paymentTypeDD");

	if (creditCardRadio) { // Credit Card
		creditCardRadio.addEventListener("change", function () {
			if (creditCardRadio.checked) {
				gaEvent.addPaymentInfo("Credit Card");
			}
		});
	}

	if (paypalRadio){ // PayPal
		paypalRadio.addEventListener("change", function () {
			if (paypalRadio.checked) {
				gaEvent.addPaymentInfo("PayPal");
			}
		});
	}

	if(directDebtRadio){ // Direct Debt
		directDebtRadio.addEventListener("change", function () {
			if (directDebtRadio.checked) {
				gaEvent.addPaymentInfo("Direct Debt");
			}
		});
	}
}

document.addEventListener("DOMContentLoaded", function () {
	gaEvent.applyAddPaymentInfoEventHandlers();
});