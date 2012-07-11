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
						name: 'Pizza Hut'
					}, {
						id: 'tesco',
						name: 'Tesco'
					}
				];

		var categories = [
					{
						id: 'banks_atms',
						name: 'Banks & ATMs'
					}, {
						id: 'coffee_shops',
						name: 'Coffee Shops'
					}, {
						id: 'hotels',
						name: 'Hotels'
					}, {
						id: 'petrol_stations',
						name: 'Petrol Stations'
					}, {
						id: 'pubs_bars',
						name: 'Pubs & Bars'
					}, {
						id: 'restaurants',
						name: 'Restaurants'
					}, {
						id: 'supermarkets',
						name: 'Supermarkets'
					}, {
						id: 'taxis',
						name: 'Taxis'
					}
				];

		return Backbone.View.extend({
			template : _.template(HomeTmplString),
			
			initialize : function() {
				this.render();
			},
			
			render : function() {
				if (this.options.persistent) {
					this.$el.addClass('persistent-page');
				}

				this.$el.append(this.template({ brands: brands, categories: categories }));
				
				this.$el.find("a[href^='#']").bind('tap', function (e) {
					window.APP_ROUTER.navigate($(this).attr('href'), {trigger: true});
				});

				return this;
			},

			isPersistent: function () {
				if (this.options.persistent !== undefined) {
					return this.options.persistent;
				}
				return false;
			}
		});
	}
);
