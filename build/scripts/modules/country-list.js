define(['jquery', 'startswith', 'numberformatter', 'sortElements'], function($) {

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
					$el.removeClass('is-loading');
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

				var countryListItem = '<tr data-country-code="' + countryCode + '"'

				countryListItem += ' data-lat="' + countryPositionLat + '" data-lng="' + countryPositionLng + '"'

				countryListItem += '><td><span data-role="value">' + countryName + '</span></td>'
				countryListItem += '<td><span data-role="value">' + countryPopulation + '</span></td></tr>'

				countryList += countryListItem;
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

			 $filterInput.val('');

			 $filterInput.keyup(function(e) {
				 var value = $(this).val();

				 // only revert hiding when backspace is pressed for performance reasons
				 if (e.keyCode == 8) {
					 $countryList.children().show()
				 }

				 // hide all items that don't start with the term in the input
				 $countryList.children().each(function() {
					 // using polyfill, startsWith not supported in all browsers yet
					 // adding support fot lowercase inputs
					 if (!$(this).children().first().find('[data-role="value"]').html().startsWith(value) && !$(this).children().first().find('[data-role="value"]').html().toLowerCase().startsWith(value)) {
						 $(this).hide()
					 }
				 })
			 })
		 }

		/**
		 * Initialize country list functions
		 */
		 var initCountryListSorting = function($el) {
			 $el.find('[data-role="sort-table"]').each(function() {
				 $(this).click(function() {
					 	// sort table
					 	var index = $(this).closest('th').index()

						if (index === 0) {
							var sortText = true;
						} else {
							var sortText = false;
						}

						var inverse = false

						// if sorting is already active, reverse
						if ($(this).hasClass('sort-active')) {
							if (!$(this).hasClass('sort-desc')) {
								inverse = true
								$(this).addClass('sort-desc')
							} else {
								$(this).removeClass('sort-desc')
							}
						} else {
							$(this).closest('tr').find('.sort-active').removeClass('sort-active')
							$(this).addClass('sort-active')
							$(this).removeClass('sort-desc')
						}

						sortTable($el.find('table'), index, inverse, sortText)
					})
        })
		 }

		/**
		* Sort table
		*/
		var sortTable = function($table, index, inverse, sortText) {
				$table.find('td').filter(function(){
        	return $(this).index() === index;
        }).sortElements(function(a, b){
					if (sortText) {
						a = $.text([a]);
						b = $.text([b]);
					} else {
						a = parseInt($.text([a]).split('.').join(''));
						b = parseInt($.text([b]).split('.').join(''));
					}

          if (a === b) {
          	return 0;
					}
					if (a > b) {
						return inverse ? -1 : 1
					} else {
						return inverse ? 1 : -1;
					}
        }, function() {
            return this.parentNode;
				});
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
