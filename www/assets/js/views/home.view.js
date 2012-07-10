/*global $, Backbone, _*/
define([
		'jquery',
		'jqueryMobile',
		'underscore',
		'backbone',
		'text!templates/home.tmpl.html'
	],
	function(Jquery, JqueryMobile, UnderscoreLib, BackboneLib, HomeTmplString) {
		"use strict";

		var brands = [
					{
						url: '#pizza_hut',
						name: 'Pizza Hut'
					}, {
						url: '#tesco',
						name: 'Tesco'
					}
				];

		var categories = [
					{
						url: '#banks_atms',
						name: 'Banks & ATMs'
					}, {
						url: '#coffee_shops',
						name: 'Coffee Shops'
					}, {
						url: '#hotels',
						name: 'Hotels'
					}, {
						url: '#petrol_stations',
						name: 'Petrol Stations'
					}, {
						url: '#pubs_bars',
						name: 'Pubs & Bars'
					}, {
						url: '#restaurants',
						name: 'Restaurants'
					}, {
						url: '#supermarkets',
						name: 'Supermarkets'
					}, {
						url: '#taxis',
						name: 'Taxis'
					}
				];

		return Backbone.View.extend({
			template : _.template(HomeTmplString),
			
			initialize : function() {
				this.render();
			},
			
			render : function() {
				this.$el.attr({ 'data-role': 'page' });
				this.$el.append(this.template({ brands: brands, categories: categories }));
				
				this.$el.find("a[href^='#']").bind('tap', function (e) {
					window.APP_ROUTER.navigate($(this).attr('href'), {trigger: true});
				});

				return this;
			}
		});
	}
);
