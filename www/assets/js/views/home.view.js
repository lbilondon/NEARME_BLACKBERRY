/*global $, Backbone, _*/
define([
	'jquery',
	'jqueryMobile',
	'underscore',
	'backbone',
	'collections/categories.collection',
	'text!templates/home.tmpl.html',
	'text!templates/header.tmpl.html',
	'views/locationBar.view'
],
function(Jquery, JqueryMobile, UnderscoreLib, BackboneLib, CategoriesCollection, HomeTmplStr, HeaderTemplateStr, LocationBarView) {
	// "use strict";

	return Backbone.View.extend({
		headerTemplate: _.template(HeaderTemplateStr),
		listTemplate : _.template(HomeTmplStr),
		
		initialize : function() {
			_.bindAll(this, 'render','bindEvents','unbindEvents','pageshow');
			this.render();
		},
		
		render : function() {
			this.$el.append(this.headerTemplate());

			locationView = new LocationBarView();
			this.$el.append(locationView.$el);

			this.bindEvents();
			return this;
		},

		bindEvents: function () {
			this.$el.on('pageshow', this.pageshow);
		},

		unbindEvents: function () {
			this.$el.off('pageshow', this.pageshow);
		},

		pageshow: function () {
			var brands = new CategoriesCollection([
				{
					id: '313',
					title: 'Pizza Hut'
				}, {
					id: '304',
					title: 'Tesco'
				}
			]);

			var categories = new CategoriesCollection([
				{
					id: 'banks_atms',
					title: 'Banks & ATMs'
				}, {
					id: 'coffee_shops',
					title: 'Coffee Shops'
				}, {
					id: 'hotels',
					title: 'Hotels'
				}, {
					id: 'petrol_stations',
					title: 'Petrol Stations'
				}, {
					id: 'pubs_bars',
					title: 'Pubs & Bars'
				}, {
					id: 'restaurants',
					title: 'Restaurants'
				}, {
					id: 'supermarkets',
					title: 'Supermarkets'
				}, {
					id: 'taxis',
					title: 'Taxis'
				}
			]);

			this.$el.append(this.listTemplate({ brands: brands, categories: categories }));
			this.$el.trigger('create');
			window.NEARMEAPP.ROUTER.refreshEventBindings(this);
		}
	});
});
