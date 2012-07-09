define([
        'jquery',
        'jqueryMobile'
	],
	function ($, JqueryMobile) {
		"use strict";

		$.mobile.hashListeningEnabled = false; //stop jQuery.mobile listening to hashchange.

// The next question that arises is, if we're preventing jQuery Mobile from listening to URL hash changes, how can we still get the benefit of being able to navigate to other sections in a document using the built-in transitions and effects supported?. Good question. This can now be solve by simply calling $.mobile.changePage() as follows:

// var url = '#about',
//     effect = 'slideup',
//     reverse = false,
//     changeHash = false;

// $.mobile.changePage( url , { transition: effect}, reverse, changeHash );

		return {
			initialize: function () {	
				var $container = $('#container');
				console.log('TEST THIS');
			}
		};
	}
);