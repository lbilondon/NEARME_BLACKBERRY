/*global $, Backbone, _*/
define([
	'jquery',
	'jqueryMobile',
	'underscore',
	'backbone',
	'collections/categories.collection',
	'text!templates/categories.tmpl.html',
	'text!templates/header.tmpl.html',
	'text!dataStub/categories.json.js'
],
function(Jquery, JqueryMobileLib, UnderscoreLib, BackboneLib, CategoriesCollection, CategoriesTmplString, HeaderTmplString, CategoriesDataStr) {
		// "use strict";

	var categoriesStub = $.parseJSON(CategoriesDataStr);

	return Backbone.View.extend({
		headerTemplate: _.template(HeaderTmplString),
		listTemplate : _.template(CategoriesTmplString),
		
		initialize: function () {
			_.bindAll(this, 'render', 'bindEvents', 'unbindEvents', 'pagebeforeshow', 'pagebeforehide', 'pageshow', 'pagehide');

			this.render();
		},
		
		render: function () {
			this.$el.attr({
				'data-role': 'page',
				'data-add-back-btn': 'true'
			});
			
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
			
			var tmp = [];
			if (this.options.category_id !== undefined) {
				if (categoriesStub[this.options.category_id] !== undefined) {
					tmp = categoriesStub[this.options.category_id];
				}
			}

			var categories = new CategoriesCollection(tmp);
			this.$el.append(this.listTemplate({ categories: categories }));
			this.$el.trigger('create');
			window.NEARMEAPP.ROUTER.refreshEventBindings(this);
		},

		pagehide: function () {
			//triggered on page
		}
	});
});
