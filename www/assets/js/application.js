/*global $, _, Backbone*/
define([
    'jquery',
    'jqueryMobile',
    'underscore',
    'backbone',
    'router',
    'models/config.model',
    'models/settings.model',
	'views/home.view',
	'views/settings.view',
	'views/categories.view'
],
function (Jquery, JqueryMobile, UnderscoreLib, BackboneLib, AppRouter, ConfigModel, SettingsModel, HomeView, SettingsView, CategoriesView) {
	// "use strict";

	function _initialize () {
		$(function () {
			$.mobile.ajaxEnabled = false;
			$.mobile.linkBindingEnabled = false;
			$.mobile.hashListeningEnabled = false;
			$.mobile.pushStateEnabled = false;

			window.NEARMEAPP.ROUTER = new AppRouter();
			Backbone.history.start();

			window.NEARMEAPP.EVENTS = {};
			_.extend(window.NEARMEAPP.EVENTS, Backbone.Events);

			window.NEARMEAPP.CONFIGMODEL = new ConfigModel();
			window.NEARMEAPP.SETTINGSMODEL = new SettingsModel();
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