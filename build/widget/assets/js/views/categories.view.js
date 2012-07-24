/*global $, Backbone, _*/
define([
	'jquery',
	'jqueryMobile',
	'underscore',
	'backbone',
	'collections/categories.collection',
	'text!templates/categories.tmpl.html',
	'text!templates/header.tmpl.html',
	'text!templates/error.tmpl.html',
	'views/locationBar.view'
],
function(Jquery, JqueryMobileLib, UnderscoreLib, BackboneLib, CategoriesCollection, CategoriesTmplStr, HeaderTmplStr, ErrorTmplStr, LocationBarView) {
		// "use strict";

	return Backbone.View.extend({
		headerTemplate: _.template(HeaderTmplStr),
		listTemplate : _.template(CategoriesTmplStr),
		errorTemplate: _.template(ErrorTmplStr),
		
		initialize: function () {
			_.bindAll(this, 'render', 'bindEvents', 'unbindEvents', 'pagebeforeshow', 'pagebeforehide', 'pageshow', 'dataFetchSuccess', 'dataFetchError', 'pagehide');

			this.render();
		},
		
		render: function () {
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
			var categories = new CategoriesCollection();
			if (this.options.category_id !== null) {
				categories.fetchFromId(this.options.category_id, {
					success: this.dataFetchSuccess,
					error: this.dataFetchError
				});
			}
		},

		dataFetchSuccess: function (collection, response) {
			
			collection.remove(collection.at(0));
			collection.add(response.root);

			var pageTitle = 'Categories';
			if (this.options.category_id === 'brands') {
				pageTitle = 'Brands';
			}
			
			this.$el.append(this.listTemplate({ categories:  collection, pageTitle: pageTitle }));
			
			locationView = new LocationBarView();
			this.$el.find('#location').html(locationView.$el);

			this.$el.trigger('create');
			window.NEARMEAPP.ROUTER.refreshEventBindings(this);
		},

		dataFetchError: function () {
			this.$el.append(this.errorTemplate());
		},

		pagehide: function () {
			//triggered on page
		}
	});
});
