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
					title: 'Pizza Hut',
					iconUrl: 'http://www.getnearme.com/data/categories/2012/05/313/Pizza-Hut.png'
				}, {
					id: '304',
					title: 'Tesco',
					iconUrl: 'http://www.getnearme.com/data/categories/2012/05/304/Tesco.png'
				}
			]);

			var categories = new CategoriesCollection([
				{
					id: '001',
					title: 'Banks & ATMs',
					iconUrl: '/assets/img/icons/Categories/Bank.png'
				}, {
					id: '005',
					title: 'Coffee Shops',
					iconUrl: '/assets/img/icons/Categories/Coffee-Shop.png'
				}, {
					id: '007',
					title: 'Hotels',
					iconUrl: '/assets/img/icons/Categories/Hotel.png'
				}, {
					id: '010',
					title: 'Petrol Stations',
					iconUrl: '/assets/img/icons/Categories/Petrol-Station.png'
				}, {
					id: '013',
					title: 'Pubs & Bars',
					iconUrl: '/assets/img/icons/Categories/Pub.png'
				}, {
					id: '014',
					title: 'Restaurants',
					iconUrl: '/assets/img/icons/Categories/Restaurant.png'
				}, {
					id: '016',
					title: 'Supermarkets',
					iconUrl: '/assets/img/icons/Categories/Supermarket.png'
				}, {
					id: '017',
					title: 'Taxis',
					iconUrl: '/assets/img/icons/Categories/Taxi.png'
				}
			]);

			this.$el.append(this.listTemplate({ brands: brands, categories: categories }));
			this.$el.trigger('create');
			window.NEARMEAPP.ROUTER.refreshEventBindings(this);
		}
	});
});
