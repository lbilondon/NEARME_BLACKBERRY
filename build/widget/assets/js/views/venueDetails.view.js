/*global $, Backbone, _*/
define([
	'jquery',
	'jqueryMobile',
	'underscore',
	'backbone',
	'collections/venues.collection',
	'text!templates/header.tmpl.html',
	'text!templates/venueDetails.tmpl.html',
	'text!templates/error.tmpl.html'
],
function(Jquery, JqueryMobileLib, UnderscoreLib, BackboneLib, VenuesCollection, HeaderTmplStr, VenueDetailsTmplStr, ErrorTmplStr) {
	// "use strict";

	return Backbone.View.extend({
		headerTemplate: _.template(HeaderTmplStr),
		contentTemplate : _.template(VenueDetailsTmplStr),
		errorTemplate: _.template(ErrorTmplStr),
		
		initialize: function() {
			_.bindAll(this, 'render', 'bindEvents', 'unbindEvents', 'pagebeforeshow', 'pagebeforehide', 'pageshow', 'dataFetchSuccess', 'dataFetchError', 'pagehide');
			this.render();
		},
		
		render: function() {
			this.$el.append(this.headerTemplate());
			this.bindEvents();
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
			if (window.NEARMEAPP.currentVenuesCollection !== undefined && this.options.venue_id !== undefined) {
				this.model = window.NEARMEAPP.currentVenuesCollection.get(this.options.venue_id);
				if (this.model !== undefined) {
					this.$el.append(this.contentTemplate({ venue: this.model }));
					this.$el.trigger('create');
				}
			}
		},

		dataFetchSuccess: function (collection, response) {
			
		},

		dataFetchError: function () {
			this.$el.append(this.errorTemplate());
		},

		pagehide: function () {
			//triggered on page
		}
	});
});
