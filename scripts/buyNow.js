function openNav() {
  document.getElementById("mySidenav").style.width = "30rem";
  document.getElementById("menu-btn").style.display = "none";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("menu-btn").style.display = "block";

  }  

let total = 0;
let countLoyalty = 0;
let countOrder=0;


let products = {
	"dilma" : {
		"name": "Dilma",
		"price": 1000
	},
	"jones" : {
		"name": "Jones",
		"price": 1500
	},
	"george_steuart" : {
		"name": "George Steuart",
		"price": 1000
	},
	"malwatte_valley_plantations" : {
		"name": "Malwatte Valley Plantations",
		"price": 2000
	},
	"prestige_cylon_teas" : {
		"name": "Prestige Ceylon Teas",
		"price": 1000
	},
	"empire_teas" : {
		"name": "Empire Teas",
		"price": 2000
	},
}

let sizes = {
	"small": {
		"size": "Small",
		"price": 1000,
	},
	"medium": {
		"size": "Medium",
		"price": 2500,
	},
	"large": {
		"size": "Large",
		"price": 5000
	},
}
let packagings = {
	"pouch": {
		"name": "Pouch",
		"price": 1000
	},
	"tins": {
		"name": "Tins",
		"price": 5000
	},
	"bags": {
		"name": "Bags",
		"price": 2500
	}
}

let extras = {
	"mug": {
		"name": "Mug",
		"price": 500
	},
	"silver_pin": {
		"name": "Silver Pin",
		"price": 1000
	},
	"wooden_souvenir": {
		"name": "Wooden Souvenir",
		"price": 1500
	}
}

let orderProcess = {

	/**
	 * Extract order data from HTML form.
	 */
	getOrderData: function(){

		let product  = products[document.getElementById("manufacturers").value];
		let size = sizes[document.getElementById("size").value];
		let packaging = packagings[document.getElementById("packaging").value]
		extra = [];

		let checkboxes = document.getElementsByName("extra");
		for (let i = 0; i<checkboxes.length; i++){
			if ( checkboxes[i].checked ){
				extra.push(extras[checkboxes[i].value])
			}
		}

		return {
			"product": product,
			"size": size,
			"packaging": packaging,
			"extra": extra
		};

	},

	/**
	 * Add order to cart
	 */
	addToCart: function(){

		let orderData = orderProcess.getOrderData();
		orderProcess.createCartRow(orderData.product, orderData.size, orderData.packaging, orderData.extra);
		return;

	},

	/**
	 * Add favourite order to the cart.
	 */
	orderFavourite: function(){
		
		let order = localStorage.getItem('order');
		if ( order == null ){
			alert("No orders in favourites !");
			return;
		}

		// ADD ORDER TO CART
		order = JSON.parse(order);
		orderProcess.createCartRow(order.product, order.size, order.packaging, order.extra);
		return;

	},

	/**
	 * Add order to favourite.
	 */
	addToFavourite: function(product, size, packaging, extra){
		//PROMPTS THAT THE ITEMS ARE ADDED TO FAVOURITES
		alert("Your item(s) have been added to favourites")

		// GET ORDER DATA
		let orderData = orderProcess.getOrderData();

		// SAVE ORDER DATA IN LOCALSTORAGE
		localStorage.setItem("order", JSON.stringify(orderData));

	},
	
	/**
	 * Create cart row with order data.
	 */
	createCartRow: function(product, size, packaging, extra){

		let table_body = document.getElementById("table-data");

		let row = table_body.insertRow();
		row.insertCell().appendChild(document.createTextNode(product.name));
		row.insertCell().appendChild(document.createTextNode(size.size));
		row.insertCell().appendChild(document.createTextNode(packaging.name));

		let extrasPrice = 0;
		// CHECK IF HAS EXTRAS
		if ( extra.length > 0){
			
			let extrasString;

			for ( let i = 0; i<extra.length;i++){
				if ( i == 0 ){
					extrasString = extra[i].name;
				} else {
					extrasString = extrasString + ", " + extra[i].name
				}

				extrasPrice = extrasPrice + extra[i].price;
				
			}
			
			// CREATE EXTRA ROW
			row.insertCell().appendChild(document.createTextNode(extrasString));

		} else {
			row.insertCell().appendChild(document.createTextNode("No Extras"));			
		}

		let price = product.price + size.price + packaging.price + extrasPrice;
		row.insertCell().appendChild(document.createTextNode(price+" LKR"));
		
		orderProcess.calculateSubTotal(price);


	},

	/**
	 * Calculate total price of cart.
	 */
	calculateSubTotal: function(price=null){

		if ( price == null ){
			total = 0;
		} else {
			total = total+price;
		}

		console.log("Price " + total)

		// CHECK IF TOTAL ROW INITITATED
		if ( document.getElementById('total-row') ){
			document.getElementById('total-row').remove();
		}
		
		let table_body = document.getElementById("table-data");

		let total_row = table_body.insertRow();
		total_row.setAttribute('id', 'total-row');
		let total_row_name = total_row.insertCell();
		total_row_name.appendChild(document.createTextNode("Total"));
		total_row_name.colSpan = "4";
		total_row.insertCell().appendChild(document.createTextNode(total+" LKR"))

	},


	checkLoyalty: function(price=null){

	let orderNum= (document.getElementById("overallOrder").rows.length)-2; // FINDING THE NUMBER OF ORDERS //
		if(orderNum<0){
			orderNum=0;
		}	//PREVENTS GETTING ADDITIONAL POINTS
			if(countLoyalty<1){
			document. getElementById("checkLoyalty").disabled = true;
			countLoyalty+=1;
			}	

		document.getElementById("addToOrderBTN").addEventListener("click", function() {
			document. getElementById("checkLoyalty").disabled = false});

		document.getElementById("orderFav").addEventListener("click", function() {
			document. getElementById("checkLoyalty").disabled = false});
			

		//DISPLAYS THE HIDDEN CUSTOMER LOYALTY INFORMATION TO THE USER
		document.getElementById("loyalty").style.display="block";


		



		// CHECK IF ELIGIBLE FOR LOYALTY POINTS
		var loyaltyPoint=0;
		if (orderNum>4){
			loyaltyPoint= orderNum*20;

		}
		else{
			alert("You are not elibigle for new loyalty points");
		}
		//INITIATES LOCAL STORAGE
		if (localStorage.getItem("pointStore") === null) {
			localStorage.setItem("pointStore",0)
		}
		//RETRIEVES EXISITING LOYAL POINTS FROM LOCAL STORAGE
		var oldPoints=parseInt(localStorage.getItem("pointStore"));
		var updatedPoints=parseInt(oldPoints)+(loyaltyPoint);
		document.getElementById("oldPoints").innerText="Existing Loyalty Points: "+oldPoints;


		document.getElementById("newPoints").innerText="Obtained Loyalty Points: "+loyaltyPoint;
		document.getElementById("updatedPoints").innerText=" Total Loyalty Points: "+updatedPoints;
		//UPDATES THE LOYAL POINTS IN LOCAL STORAGE
		oldPoints=localStorage.setItem("pointStore",JSON.stringify(updatedPoints));
		//DISABLES BUTTON WHEN CLICKED ONCE
		document.getElementById("checkLoyalty").addEventListener("click", function() {
			document. getElementById("checkLoyalty").disabled = true;});
	},

	placeOrder: function(){
		var orderNum= (document.getElementById("overallOrder").rows.length)-2; // FINDING THE NUMBER OF ORDERS //
		var data = document.getElementById("table-data");	

		//DISPLAY CONFIRMATION MESSAGE
		if (orderNum>0){
			data.innerHTML = "";
			total=0;
			alert("Your order has been placed and you will receive a confirmation email shortly\n Thank you and come again!");
			}

		else{
			alert("Your cart is empty!");
		}
		

		
	}

}

//check whether browser support service workers
if('serviceWorker' in navigator) {
    //wait until page loaded to avoid delaying rendering
    window.addEventListener('load', function() {
        //register service worker
        navigator.serviceWorker.register('serviceworker.js').then(
            function(registration) {
                console.log('Service worker registration successful', 
                                     registration);
            }, 
            function(err) {
                console.log('Service worker registration failed', err);
        });
    }); }





	
