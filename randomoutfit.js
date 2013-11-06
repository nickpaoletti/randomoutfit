$(document).ready(function() {  
	var api_key = '&apikey=0539f901f0713708b6f0461aff8634c3';
	var url = 'https://api.gilt.com/v1/products?';

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

	$('#generateButton').click(function() {

		$.getJSON(url + 'q=coats+or+parkas+or+jackets&store=men&size=MeOu:' + $('#size').val() + api_key)
		.then(function(outerwearData){
			var outerwear = returnRandItem(outerwearData);
			if (outerwear.image_urls === 'undefined'){
				$('#outerwearImg').replaceWith('<div id="outerwearImg">No outerwear in that size found :(</div>')
			}
			else {
				var outUrls = outerwear.image_urls['300x400'];
				$('#outerwearImg').replaceWith('<div id="outerwearImg"><img src="' + outUrls[0].url +
					'" /><br>' + outerwear.brand + ' ' + outerwear.name + ' - <a target="_blank" href="' 
					+ outerwear.url + '">Buy at Gilt</a></div>');
			}
		});

		$.getJSON(url + 'q=shirts+or+sweaters&store=men&size=MeShSw:' + $('#size').val() + api_key)
		.then(function(shirtData){
			var shirt = returnRandItem(shirtData);

			if (shirt.image_urls === 'undefined'){
				$('#shirtImg').replaceWith('<div id="shirtImg">No shirt in that size found :(</div>')
			}
			else {
				var shirtUrls = shirt.image_urls['300x400'];
				$('#shirtImg').replaceWith('<div id="shirtImg"><img src="' + shirtUrls[0].url + 
					'" /><br>' + shirt.brand + ' ' + shirt.name + ' - <a target="_blank" href="' 
					+ shirt.url + '">Buy at Gilt</a></div>');
			}
		});
		
		$.getJSON(url + 'q=pants+or+jeans&store=men&size=MeBo:' + $('#pants').val() + api_key)
		.then(function (pantData){
			var pant = returnRandItem(pantData);

			if (pant.image_urls === undefined){
				$('#pantsImg').replaceWith('<div id="pantsImg">No pants in that size found :(</div>')
			}
			else {
				var pantUrls = pant.image_urls['300x400'];
				$('#pantsImg').replaceWith('<div id="pantsImg"><img src="' + pantUrls[0].url + 
					'"/><br>' + pant.brand + ' ' + pant.name + ' - <a target="_blank" href="' 
					+ pant.url + '">Buy at Gilt</a></div>');
			}
		});

		$.getJSON(url + 'q=shoes&store=men&size=MeSh:' + $('#shoes').val() + api_key)
		.then(function (shoeData){
			var shoe = returnRandItem(shoeData);

			if (shoe.image_urls === 'undefined'){
				$('#shoeImg').replaceWith('<div id="shoeImg">No shoes in that size found :(</div>')
			}
			else {
				var shoeUrls = shoe.image_urls['300x400'];
				$('#shoeImg').replaceWith('<div id="shoeImg"><img src="' + shoeUrls[0].url +
					'" /><br>' + shoe.brand + ' ' + shoe.name + ' - <a target="_blank" href="' 
					+ shoe.url + '">Buy at Gilt</a></div>');
			}
		})

		

	});

}); 