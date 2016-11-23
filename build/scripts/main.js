/*
 * Main entry point
 */
define(function( require ) {
	'use strict';

	require('jquery')

	require('scripts/modules/country-list')
	require('scripts/modules/country-details')
	require('scripts/modules/report-form')
	require('scripts/modules/share-links')

	var init = function($el) {
		$el.find('[data-role="country-list"]').CountryList()
		$el.find('[data-role="country-details"]').CountryDetails()
		$el.find('[data-role="report-form"]').ReportForm()
		$el.find('[data-role="share-links"]').ShareLinks()
	}

	// initialize all modules which exist on dom ready
	$(document).ready( function() {
		init($('body'));
	});
});
