/*global $, Backbone, _*/
define([
	'jquery',
	'jqueryMobile',
	'underscore',
	'backbone',
	'text!templates/header.tmpl.html',
	'text!templates/venues.tmpl.html',
	'text!templates/error.tmpl.html'
],
function(Jquery, JqueryMobileLib, UnderscoreLib, BackboneLib, HeaderTmplStr, VenuesTmplStr, ErrorTmplStr) {
	// "use strict";

	return Backbone.View.extend({
		headerTemplate: _.template(HeaderTmplStr),
		listTemplate : _.template(VenuesTmplStr),
		errorTemplate: _.template(ErrorTmplStr),
		
		initialize: function() {
			_.bindAll(this, 'render', 'bindEvents', 'unbindEvents', 'pagebeforeshow', 'pagebeforehide', 'pageshow', 'clickCallback', 'pagehide');
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
			this.collection = window.NEARMEAPP.HISTORYCOLLECTION;
			$clearAll = $('<span class="ui-btn">clear history</span>');

			this.$listTemplate = $(this.listTemplate({ venues: this.collection }));
			
			$clearAll.bind('tap', this.clickCallback);

			this.$el.append($clearAll);
			this.$el.append(this.$listTemplate);
			this.$el.trigger('create');
			window.NEARMEAPP.ROUTER.refreshEventBindings(this);
		},

		clickCallback: function (e) {
			e.preventDefault();
			this.collection.clearHistory();
			this.$listTemplate.remove();
			this.$el.append(this.listTemplate({ venues: this.collection }));
		},

		pagehide: function () {
			//triggered on page
		}
	});
});
