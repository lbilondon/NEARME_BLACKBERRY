/*global $, Backbone, _*/
define([
	'jquery',
	'jqueryMobile',
	'underscore',
	'backbone',
	'text!templates/home.tmpl.html'
],
function(Jquery, JqueryMobile, UnderscoreLib, BackboneLib, HomeTmplString) {
	// "use strict";

	var brands = [
				{
					id: 'pizza_hut',
					title: 'Pizza Hut'
				}, {
					id: 'tesco',
					title: 'Tesco'
				}
			];

	var categories = [
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
			];

	return Backbone.View.extend({
		template : _.template(HomeTmplString),
		
		initialize : function() {
			this.render();
		},
		
		render : function() {
			this.$el.append(this.template({ brands: brands, categories: categories }));
			return this;
		}
	});
});
