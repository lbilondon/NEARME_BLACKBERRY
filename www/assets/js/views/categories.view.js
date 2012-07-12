/*global $, Backbone, _*/
define([
	'jquery',
	'jqueryMobile',
	'underscore',
	'backbone',
	'text!templates/categories.tmpl.html',
	'text!dataStub/categories.json.js'
],
function(Jquery, JqueryMobileLib, UnderscoreLib, BackboneLib, CategoriesTmplString, CategoriesDataStr) {
		// "use strict";

	var categories = $.parseJSON(CategoriesDataStr);

	return Backbone.View.extend({
		template : _.template(CategoriesTmplString),
		
		initialize: function () {
			this.render();
		},
		
		render: function () {

			this.$el.attr({
				'data-role': 'page',
				'data-add-back-btn': 'true'
			});

			var cat = [];
			if (this.options.category_id !== undefined) {
				if (categories[this.options.category_id] !== undefined) {
					cat = categories[this.options.category_id];
				}
			}
			this.$el.append(this.template({ categories: cat }));
			
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
			//triggered on page
		},

		pagehide: function () {
			//triggered on page
		}
	});
});
