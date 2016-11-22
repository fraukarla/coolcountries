// Not using requirejs to load this module because google maps api is already loaded async

function initMap() {
	var lat = parseInt(getUrlVars()['lat'])
	var lng = parseInt(getUrlVars()['lng'])

  var map = new google.maps.Map(document.getElementById('map-container'), {
    center: {
			lat: lat,
			lng: lng
		},
    zoom: 4
  });

	var marker = new google.maps.Marker({
    position: {
			lat: lat,
			lng: lng
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
