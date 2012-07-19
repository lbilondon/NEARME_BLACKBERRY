/*global $, _, Backbone*/
define([
    'jquery',
    'jqueryMobile',
    'underscore',
    'backbone',
    'router',
    'models/config.model',
    'models/settings.model',
    'models/location.model',
    'views/util.viewhelper',
	'views/home.view',
	'views/settings.view',
	'views/categories.view'
],
function (Jquery, JqueryMobile, UnderscoreLib, BackboneLib, AppRouter, ConfigModel, SettingsModel, LocationModel, utilViewHelper, HomeView, SettingsView, CategoriesView) {
	// "use strict";

	function _initialize () {
		$(function () {
			$.mobile.ajaxEnabled = false;
			$.mobile.linkBindingEnabled = false;
			$.mobile.hashListeningEnabled = false;
			$.mobile.pushStateEnabled = false;

			window.NEARMEAPP.EVENTS = {};
			_.extend(window.NEARMEAPP.EVENTS, Backbone.Events);

			window.NEARMEAPP.ROUTER = new AppRouter();
			Backbone.history.start();

			window.NEARMEAPP.CONFIGMODEL = new ConfigModel();
			window.NEARMEAPP.SETTINGSMODEL = new SettingsModel();
			window.NEARMEAPP.LOCATIONMODEL = new LocationModel();
			window.NEARMEAPP.UTILVIEWHELPER = utilViewHelper;

			window.NEARMEAPP.currentCategoriesCollection = null;
			window.NEARMEAPP.currentVenuesCollection = null;
		});
	}

	return {
		initialize: function () {
			if (window.cordova && window.device) {
				document.addEventListener('deviceready', function () {
					_initialize();
				}, false);
			} else {
				_initialize();
			}
			
		}
	};
});