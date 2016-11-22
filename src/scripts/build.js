/*
 * RequireJS configuration
 */

/*global requirejs:false */
requirejs.config({
  deps: ['scripts/main'],
  baseUrl: '.',
  paths: {
    'jquery': 'scripts/lib/jquery.min',
    'startswith': 'scripts/utils/startswith',
    'getUrlVars': 'scripts/utils/getUrlVars',
		'numberformatter': 'scripts/utils/numberformatter'
  }
});

requirejs.onError = function(err) {
  try {
    throw err;
  } catch (e) {
    if (window.console && !!console.log) {
      console.log(e.name + ' ' + e.message, e);
    }
  }
};

requirejs(['scripts/main']);
