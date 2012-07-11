/*global $, _, Backbone*/
define([
        'jquery',
        'jqueryMobile',
        'underscore',
        'backbone',
        'router',
		'views/home.view',
		'views/settings.view',
		'views/categories.view'
	],
	function (Jquery, JqueryMobile, UnderscoreLib, BackboneLib, AppRouter, HomeView, SettingsView, CategoriesView) {
		// "use strict";

		function _initialize () {
			window.APP_ROUTER = new AppRouter();
			Backbone.history.start();
		}

		return {
			initialize: function () {
				$(function () {
					$.mobile.ajaxEnabled = false;
					$.mobile.linkBindingEnabled = false;
					$.mobile.hashListeningEnabled = false;
					$.mobile.pushStateEnabled = false;

					_initialize();
				});
			}
		};
	}
);