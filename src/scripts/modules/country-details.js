define(['jquery', 'getUrlVars', 'numberformatter'], function($) {

	function CountryDetails($el, params) {
		"use strict";

		var detailsDataURL = 'https://restcountries.eu/rest/v1/alpha?codes='

		var init = function($el) {
			var countryCode = getUrlVars()['code'];
			loadCountryDetailsData($el, countryCode)
		}

		/**
     * Get data via AJAX
     */
		var loadCountryDetailsData = function($el, countryCode) {
			$.ajax({
			  type: 'GET',
			  url: detailsDataURL + countryCode,
			  dataType: 'json',
			  success: function (data) {
			  	displayCountryDetails($el, data)
			  },
				error: function(data) {
					console.log("Ajax error: " + data)
        }
			});
		}

		/**
     * Process country list data and display list
     */
		var displayCountryDetails = function($el, data) {
			// DISPLAY NAME
			$el.find('[data-role="country-name"]').html(data[0].name)

			// DISPLAY REGION
			$el.find('[data-role="country-region"]').html(data[0].region)

			// DISPLAY CAPITAL
			$el.find('[data-role="country-capital"]').html(data[0].capital)

			// DISPLAY POPULATION
			$el.find('[data-role="country-population"]').html(numberWithDots(data[0].population))

			// DISPLAY CURRENCIES
			var currencies = ''
			for (var i = 0; i < data[0].currencies.length; i++) {
				currencies += (data[0].currencies[i])
				if (i < data[0].currencies.length - 1)
					currencies += '<span class="new-entry"></span>'
			}
			$el.find('[data-role="country-currencies"]').html(currencies)

			// DISPLAY TIMEZONES
			var timezones = ''
			for (var i = 0; i < data[0].timezones.length; i++) {
				timezones += (data[0].timezones[i])
				if (i < data[0].timezones.length - 1)
					timezones += '<span class="new-entry"></span>'
				}
			$el.find('[data-role="country-timezones"]').html(timezones)
		}

		init($el);
	}

	if (window.jQuery) {
		(function($) {
	    $.fn.CountryDetails = function(params) {
        return this.each(function() {
          new CountryDetails($(this), params)
        });
	    }
		})(window.jQuery)
	}
});
