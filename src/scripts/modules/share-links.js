define(['jquery', 'getUrlVars', 'numberformatter'], function($) {

	function ShareLinks($el, params) {
		"use strict";

		var init = function($el) {
			$el.find('a').click(function(e) {
				e.preventDefault();
				alert('This function is not available in this version.')
			})
		}

		init($el);
	}

	if (window.jQuery) {
		(function($) {
	    $.fn.ShareLinks = function(params) {
        return this.each(function() {
          new ShareLinks($(this), params)
        });
	    }
		})(window.jQuery)
	}
});
