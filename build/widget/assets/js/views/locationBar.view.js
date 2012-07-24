/*global $, Backbone, _*/
define([
	'jquery',
	'jqueryMobile',
	'underscore',
	'backbone',
	'text!templates/locationBar.tmpl'
],
function(Jquery, JqueryMobileLib, UnderscoreLib, BackboneLib, LocationBarTmpl) {
	// "use strict";

	return Backbone.View.extend({
		template : _.template(LocationBarTmpl),
		
		initialize : function() {
			_.bindAll(this, 'bindEvents', 'unbindEvents', 'render', 'showAddress');

			this.render();
			this.bindEvents();
		},

		bindEvents: function () {
			window.NEARMEAPP.EVENTS.on('location_set', this.showAddress);
		},

		unbindEvents: function () {
			window.NEARMEAPP.EVENTS.off('location_set', this.showAddress);
		},
 
		render : function () {
			this.showAddress();
			return this;
		},
		showAddress: function () {
			this.address = null;
			if (window.NEARMEAPP.LOCATIONMODEL !== undefined) {
				this.address = window.NEARMEAPP.LOCATIONMODEL.get('formatted_address');
			}

			this.$el.html(this.template({ address: this.address }));
		}
	});
});