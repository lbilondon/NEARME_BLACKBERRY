/*global $, Backbone, _*/
define([
	'jquery',
	'jqueryMobile',
	'underscore',
	'backbone',
	'text!templates/header.tmpl.html',
	'text!templates/settings.tmpl.html'
],
function(Jquery, JqueryMobile, UnderscoreLib, BackboneLib, HeaderTmplStr, SettingsTmplStr) {
	// "use strict";

	return Backbone.View.extend({
		headerTemplate: _.template(HeaderTmplStr),
		listTemplate : _.template(SettingsTmplStr),
		
		initialize : function() {
			this.render();
		},
		
		render : function() {
			this.$el.append(this.headerTemplate());
			this.$el.append(this.listTemplate());
			return this;
		},

		bindEvents: function () {
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