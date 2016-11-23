define(['jquery', 'getUrlVars', 'numberformatter'], function($) {

	function ReportForm($el, params) {
		"use strict";

		var init = function($el) {
			$el.find('input[type="submit"]').click(function(e) {
				e.preventDefault();
				alert('This function is not available in this version.')
			})
		}

		init($el);
	}

	if (window.jQuery) {
		(function($) {
	    $.fn.ReportForm = function(params) {
        return this.each(function() {
          new ReportForm($(this), params)
        });
	    }
		})(window.jQuery)
	}
});
