define(['jquery', 'startswith', 'numberformatter'], function($) {

	function CountryList($el, params) {
		"use strict";

		var listDataURL = 'https://restcountries.eu/rest/v1/all'

		var init = function($el) {
			loadCountryListData($el)
		}

		/**
     * Get country data via AJAX
     */
		var loadCountryListData = function($el) {
			$.ajax({
			  type: 'GET',
			  url: listDataURL,
			  dataType: 'json',
			  success: function (data) {
			  	displayCountryList($el, data)
			  },
				error: function(data) {
					console.log("Ajax error: " + data)
        }
			});
		}

		/**
     * Process country list data and display list
     */
		 var displayCountryList = function($el, data) {
			var countryList = ''

			for (var i = 0; i < data.length; i++) {
				var countryName = data[i].name
				var countryPopulation = numberWithDots(data[i].population)
				var countryCode = data[i].alpha2Code // for link only
				var countryPositionLat = data[i].latlng[0] // for link only
				var countryPositionLng = data[i].latlng[1] // for link only

				countryList += '<tr data-country-code="' + countryCode + '" data-lat="' + countryPositionLat + '" data-lng="' + countryPositionLng + '"><td>' + countryName + '</td><td>' + countryPopulation + '</td></tr>'
			}

			$el.find('tbody').html(countryList)

			initCountryListFilter($el)
			initCountryListSorting($el)
			initCountryListActions($el)
		 }

		/**
		 * Initialize an input above the list that filters the list when typing a letter / country name
		 */
		 var initCountryListFilter = function($el) {
			 var $filterInput = $el.find('[data-role="country-list-filter"]')
			 var $countryList = $el.find('tbody');

			 $filterInput.keyup(function(e) {
				 var value = $(this).val();

				 // only revert hiding when backspace is pressed for performance reasons
				 if (e.keyCode == 8) {
					 $countryList.children().show()
				 }

				 // hide all items that don't start with the term in the input
				 $countryList.children().each(function() {
					 // startsWith not supported in all browsers yet
					 console.log(value)
					 console.log($(this).children().first().html())
					 // adding support fot lowercase inputs
					 if (!$(this).children().first().html().startsWith(value) && !$(this).children().first().html().toLowerCase().startsWith(value)) {
						 $(this).hide()
					 }
				 })
			 })
		 }

		/**
		 * Initialize country list functions
		 */
		 var initCountryListSorting = function($el) {
			 $el.find('th [data-role="country-sort"]').each(function() {
				 $(this).click(function() {
					 	// sort table
					 	var index = $(this).closest('th').index()
						var inverse = false
						if ($(this).data('sort-order') === 'desc') {
							inverse = true
						}
						sortTable($el.find('table'), index, inverse)

						// mark active sorting
					})
        })
		 }

		/**
		* Sort table
		*/
		var sortTable = function($table, index, inverse) {

		}

		/**
		 * Initialize links to details pages in country list
		 */
		 var initCountryListActions = function($el) {
			 $el.find('tbody tr').each(function() {
				 $(this).click(function() {
					 openCountryDetails($(this).data('country-code'), $(this).data('lat'), $(this).data('lng'))
				 })
			 })
		 }

		/**
		 * Open country details
		 */
		 var openCountryDetails = function(countryCode, lat, lng) {
			 window.location.href = 'details.html?code=' + countryCode + '&lat=' + lat + '&lng=' + lng
		 }

		init($el);
	}

	if (window.jQuery) {
		(function($) {
	    $.fn.CountryList = function(params) {
        return this.each(function() {
          new CountryList($(this), params)
        });
	    }
		})(window.jQuery)
	}
});
