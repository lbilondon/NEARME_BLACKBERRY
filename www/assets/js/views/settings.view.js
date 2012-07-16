/*global $, Backbone, _*/
define([
	'jquery',
	'jqueryMobile',
	'underscore',
	'backbone',
	'models/settings.model',
	'text!templates/header.tmpl.html',
	'text!templates/settings.tmpl.html'
],
function(Jquery, JqueryMobile, UnderscoreLib, BackboneLib, SettingsModel, HeaderTmplStr, SettingsTmplStr) {
	// "use strict";

	return Backbone.View.extend({
		headerTemplate: _.template(HeaderTmplStr),
		listTemplate : _.template(SettingsTmplStr),
		
		initialize : function() {
			this.render();
		},
		
		render : function() {
			window.NEARMEAPP.SETTINGSMODEL = window.NEARMEAPP.SETTINGSMODEL || new SettingsModel();

			this.$el.append(this.headerTemplate());
			this.$el.append(this.listTemplate({ settings: window.NEARMEAPP.SETTINGSMODEL }));
			
			this.bindEvents();
			return this;
		},

		save: function (e) {
			var name = $(e.currentTarget).attr('name');
			var val = $(e.currentTarget).val();
			var data = {};
			data[name] = (val === 'true') ? true : false;

			window.NEARMEAPP.SETTINGSMODEL.set(data);
		},

		bindEvents: function () {
			this.$el.find('input').bind('change', this.save);

			this.$el.on('pagebeforeshow', this.pagebeforeshow);
			this.$el.on('pagebeforehide', this.pagebeforehide);
			this.$el.on('pageshow', this.pageshow);
			this.$el.on('pagehide', this.pagehide);
		},

		unbindEvents: function () {
			this.$el.off('pagebeforeshow', this.pagebeforeshow);
			this.$el.off('pagebeforehide', this.pagebeforehide);
			this.$el.off('pageshow', this.pageshow);
			this.$el.off('pagehide', this.pagehide);
		},

		pagebeforeshow: function () {
			//triggered on page
		},

		pagebeforehide: function () {
			//triggered on page
		},

		pageshow: function () {
			//triggered on page show
		},

		pagehide: function () {
			//triggered on page
		}
	});
});