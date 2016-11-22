/*
 * Main entry point
 */
define(function( require ) {
	'use strict';

	require('scripts/modules/country-list')
	require('scripts/modules/country-details')
	// require('scripts/modules/map');

	var init = function($el) {
		$el.find('[data-role="country-list"]').CountryList()
		$el.find('[data-role="country-details"]').CountryDetails()
		// $el.find('[data-role="map"]').Map();
	}

	// initialize all modules which exist on dom ready
	$(document).ready( function() {
		init($('body'));
	});
});
