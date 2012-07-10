/*global $, _, Backbone*/
define([
        'jquery',
        'jqueryMobile',
        'underscore',
        'backbone',
        'router'
	],
	function (Jquery, JqueryMobile, UnderscoreLib, BackboneLib, AppRouter) {
		"use strict";

		//$.mobile.hashListeningEnabled = false; //stop jQuery.mobile listening to hashchange.

// The next question that arises is, if we're preventing jQuery Mobile from listening to URL hash changes, how can we still get the benefit of being able to navigate to other sections in a document using the built-in transitions and effects supported?. Good question. This can now be solve by simply calling $.mobile.changePage() as follows:

// var url = '#about',
//     effect = 'slideup',
//     reverse = false,
//     changeHash = false;

// $.mobile.changePage( url , { transition: effect}, reverse, changeHash );

		function _initialize () {
			$(document).bind("mobileinit", function () {
				$.mobile.ajaxEnabled = false;
				$.mobile.linkBindingEnabled = false;
				$.mobile.hashListeningEnabled = false;
				$.mobile.pushStateEnabled = false;
			});

			$('div[data-role="page"]').live('pagehide', function (event, ui) {
				$(event.currentTarget).remove();
			});

			$(document).live('pageshow', function (e) {
				$(this).find("a[href^='#']").bind('tap', function (e) {
					window.APP_ROUTER.navigate($(this).attr('href'), {trigger: true});
				});
			});

			window.APP_ROUTER = new AppRouter();
			Backbone.history.start({ pushState: true });
		}

		return {
			initialize: function () {

				if (document.deviceready) {
					document.addEventListener("deviceready", _initialize, true);
				} else {
					_initialize();
				}
			}
		};
	}
);