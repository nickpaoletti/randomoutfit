$(document).ready(function() {  
	var api_key = '&apikey=0539f901f0713708b6f0461aff8634c3';
	var url = 'https://api.gilt.com/v1/products?';

	//Take JSON response with list of products and return a random one
	var returnRandItem = function(data){
		if(data.total_found == 0){
			return {};
		}
		var item;
		while (typeof item === 'undefined'){
			var randItem = Math.floor(Math.random()*data.total_found);
			item = data.products[randItem]
		}
		return item;
	}

	//Given a product item, show details of the item, if there is an item. else, display message
	var showImage = function(productData, divName){
		if (productData.image_urls === 'undefined'){
			$('#' + divName).replaceWith('<div id="' + divName + '">No outerwear in that size found :(</div>');
		}
		else {
			var urls = productData.image_urls['300x400'];
			$('#' + divName).replaceWith('<div id="' + divName + '"><img src="' + urls[0].url +
				'" /><br>' + productData.brand + ' ' + productData.name + ' - <a target="_blank" href="' 
				+ productData.url + '">Buy at Gilt</a></div>');
		}
	}

	//When Generate button is pressed, find random items corresponding to given sizes
	$('#generateButton').click(function() {
		//Look for mens outerwear + jackets
		$.getJSON(url + 'q=coats+or+parkas+or+jackets&store=men&size=MeOu:' + $('#size').val() + api_key)
		.then(function(outerwearData){
			var outerwear = returnRandItem(outerwearData);
			showImage(outerwear, 'outerwearImg');
		});
		//Look for mens shirts + sweaters
		$.getJSON(url + 'q=shirts+or+sweaters&store=men&size=MeShSw:' + $('#size').val() + api_key)
		.then(function(shirtData){
			var shirt = returnRandItem(shirtData);
			showImage(shirt, 'shirtImg');
		});
		//Look for mens pants
		$.getJSON(url + 'q=pants+or+jeans&store=men&size=MeBo:' + $('#pants').val() + api_key)
		.then(function (pantData){
			var pant = returnRandItem(pantData);
			showImage(pant, 'pantsImg');
		});
		//Look for mens shoes
		$.getJSON(url + 'q=shoes&store=men&size=MeSh:' + $('#shoes').val() + api_key)
		.then(function (shoeData){
			var shoe = returnRandItem(shoeData);
			showImage(shoe, 'shoeImg');
		});
	});
}); 