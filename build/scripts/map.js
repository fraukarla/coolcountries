// Not using requirejs to load this module because google maps api is already loaded async

function initMap() {
	var lat = getUrlVars()['lat']
	var lng = getUrlVars()['lng']

	if (lat !== 'undefined' && lng !== 'undefined') {
		drawMap(lat, lng);
	} else {
		document.getElementById('map-container').style.display = 'none';
	}
}

function drawMap(lat, lng) {
	  var map = new google.maps.Map(document.getElementById('map-container'), {
	    center: {
				lat: parseInt(lat),
				lng: parseInt(lng)
			},
	    zoom: 4
	  });

		var marker = new google.maps.Marker({
	    position: {
				lat: parseInt(lat),
				lng: parseInt(lng)
			},
	    map: map,
	    title: 'Hello World!'
	  });
}

function getUrlVars () {
	var vars = [], hash
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')
	for(var i = 0; i < hashes.length; i++) {
	  hash = hashes[i].split('=')
	  vars.push(hash[0])
	  vars[hash[0]] = hash[1]
	}
	return vars
}
