/*global $, Backbone, _*/
define([
		'jquery',
		'jqueryMobile',
		'underscore',
		'backbone',
		'text!templates/categories.tmpl.html'
	],
	function(Jquery, JqueryMobileLib, UnderscoreLib, BackboneLib, CategoriesTmplString) {
		// "use strict";

		var categories = {
						'brands': [
							{
								'id': 'asda',
								'name': 'Asda'
							}, {
								'id': 'b_q',
								'name': 'B&Q'
							}, {
								'id': 'barclays',
								'name': 'Barclays'
							}, {
								'id': 'currys_-_pc_world',
								'name': 'Currys - PC World'
							}, {
								'id': 'debenhams',
								'name': 'Debenhams'
							}, {
								'id': 'french_connection',
								'name': 'French Connection'
							}, {
								'id': 'fullers',
								'name': 'Fullers'
							}, {
								'id': 'geronimo_inns',
								'name': 'Geronimo Inns'
							}, {
								'id': 'orange',
								'name': 'Orange'
							}, {
								'id': 'phones_4u',
								'name': 'Phones 4u'
							}, {
								'id': 'pizza_hut',
								'name': 'Pizza Hut'
							}, {
								'id': 'screwfix',
								'name': 'Screfix'
							}, {
								'id': 'snappy_snaps',
								'name': 'Snappy Snaps'
							}, {
								'id': 't-mobile',
								'name': 'T-Mobile'
							}, {
								'id': 'tesco',
								'name': 'Tesco'
							}, {
								'id': 'the_body_shop',
								'name': 'The Body Shop'
							}, {
								'id': 'youngs',
								'name': 'Youngs'
							}
						],
						'categories': [
							{
								'id': 'attractions',
								'name': 'Attractions'
							}, {
								'id': 'auto_repairs',
								'name': 'Auto Repairs'
							}, {
								'id': 'bags_luggage',
								'name': 'Bags & Luggage'
							}, {
								'id': 'bakeries',
								'name': 'Bakeries'
							}, {
								'id': 'banks_atms',
								'name': 'Banks & ATMs'
							}, {
								'id': 'beauty_products',
								'name': 'Beauty Products'
							}, {
								'id': 'bike_shops',
								'name': 'Bike Shops'
							}, {
								'id': 'book_shops',
								'name': 'Book Shops'
							}, {
								'id': 'bus_stations',
								'name': 'Bus Stations'
							}, {
								'id': 'cards_stationary',
								'name': 'Cards & Stationary'
							}, {
								'id': 'charity_shops',
								'name': 'Charity Shops'
							}, {
								'id': 'cinemas',
								'name': 'Cinemas'
							}, {
								'id': 'clothing_shops',
								'name': 'Clothing Shops'
							}, {
								'id': 'coffee_shops',
								'name': 'Coffee Shops'
							}, {
								'id': 'computer_shops',
								'name': 'Computer Shops'
							}, {
								'id': 'diy_hardware_stores',
								'name': 'DIY & Hardware Stores'
							}, {
								'id': 'eyewear_opticians',
								'name': 'Eyewear & Opticians'
							}, {
								'id': 'fast_food',
								'name': 'Fast Food'
							}, {
								'id': 'flower_shops',
								'name': 'Flower Shops'
							}, {
								'id': 'furnature_stores',
								'name': 'Furnature Stores'
							}, {
								'id': 'gyms',
								'name': 'Gyms'
							}, {
								'id': 'hairdressers',
								'name': 'Hairdressers'
							}, {
								'id': 'health_foods',
								'name': 'Health Foods'
							}, {
								'id': 'hospitals',
								'name': 'Hospitals'
							}, {
								'id': 'hostels',
								'name': 'Hostels'
							}, {
								'id': 'hotels',
								'name': 'Hotels'
							}, {
								'id': 'locksmiths',
								'name': 'Locksmiths'
							}, {
								'id': 'mobile_phones',
								'name': 'Mobile Phones'
							}, {
								'id': 'museums',
								'name': 'Museums'
							}, {
								'id': 'music_dvd_games',
								'name': 'Music, DVD & Games'
							}, {
								'id': 'night_clubs',
								'name': 'Night Clubs'
							}, {
								'id': 'parking',
								'name': 'Parking'
							}, {
								'id': 'pet_shops',
								'name': 'Pet Shops'
							}, {
								'id': 'petrol_stations',
								'name': 'Petrol Stations'
							}, {
								'id': 'pharmacies',
								'name': 'Pharmacies'
							}, {
								'id': 'photography_shops',
								'name': 'Photography Shops'
							}, {
								'id': 'pizza',
								'name': 'Pizza'
							}, {
								'id': 'post_offices',
								'name': 'Post Offices'
							}, {
								'id': 'pubs_bars',
								'name': 'Pubs & Bars'
							}, {
								'id': 'restaurants',
								'name': 'Restaurants'
							}, {
								'id': 'shoe_shops',
								'name': 'Shoe Shops'
							}, {
								'id': 'shopping_centres',
								'name': 'Shopping Centres'
							}, {
								'id': 'spas_salons',
								'name': 'Spas & Salons'
							}, {
								'id': 'supermarkets',
								'name': 'Supermarkets'
							}, {
								'id': 'taxis',
								'name': 'Taxis'
							}, {
								'id': 'theatres',
								'name': 'Theatres'
							}, {
								'id': 'toy_shops',
								'name': 'Toy Shops'
							}, {
								'id': 'train_stations',
								'name': 'Train Stations'
							}, {
								'id': 'travel_agencies',
								'name': 'Travel Agencies'
							}, {
								'id': 'veterinaries',
								'name': 'Veterinaries'
							}
						]
					};

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

				var cat = categories.categories;
				if (this.options.category_id !== 'categories') {
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
	}
);
