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
							'title': 'Asda'
						}, {
							'id': 'b_q',
							'title': 'B&Q'
						}, {
							'id': 'barclays',
							'title': 'Barclays'
						}, {
							'id': 'currys_-_pc_world',
							'title': 'Currys - PC World'
						}, {
							'id': 'debenhams',
							'title': 'Debenhams'
						}, {
							'id': 'french_connection',
							'title': 'French Connection'
						}, {
							'id': 'fullers',
							'title': 'Fullers'
						}, {
							'id': 'geronimo_inns',
							'title': 'Geronimo Inns'
						}, {
							'id': 'orange',
							'title': 'Orange'
						}, {
							'id': 'phones_4u',
							'title': 'Phones 4u'
						}, {
							'id': 'pizza_hut',
							'title': 'Pizza Hut'
						}, {
							'id': 'screwfix',
							'title': 'Screfix'
						}, {
							'id': 'snappy_snaps',
							'title': 'Snappy Snaps'
						}, {
							'id': 't-mobile',
							'title': 'T-Mobile'
						}, {
							'id': 'tesco',
							'title': 'Tesco'
						}, {
							'id': 'the_body_shop',
							'title': 'The Body Shop'
						}, {
							'id': 'youngs',
							'title': 'Youngs'
						}
					],
					'categories': [
						{
							'id': 'attractions',
							'title': 'Attractions'
						}, {
							'id': 'auto_repairs',
							'title': 'Auto Repairs'
						}, {
							'id': 'bags_luggage',
							'title': 'Bags & Luggage'
						}, {
							'id': 'bakeries',
							'title': 'Bakeries'
						}, {
							'id': 'banks_atms',
							'title': 'Banks & ATMs'
						}, {
							'id': 'beauty_products',
							'title': 'Beauty Products'
						}, {
							'id': 'bike_shops',
							'title': 'Bike Shops'
						}, {
							'id': 'book_shops',
							'title': 'Book Shops'
						}, {
							'id': 'bus_stations',
							'title': 'Bus Stations'
						}, {
							'id': 'cards_stationary',
							'title': 'Cards & Stationary'
						}, {
							'id': 'charity_shops',
							'title': 'Charity Shops'
						}, {
							'id': 'cinemas',
							'title': 'Cinemas'
						}, {
							'id': 'clothing_shops',
							'title': 'Clothing Shops'
						}, {
							'id': 'coffee_shops',
							'title': 'Coffee Shops'
						}, {
							'id': 'computer_shops',
							'title': 'Computer Shops'
						}, {
							'id': 'diy_hardware_stores',
							'title': 'DIY & Hardware Stores'
						}, {
							'id': 'eyewear_opticians',
							'title': 'Eyewear & Opticians'
						}, {
							'id': 'fast_food',
							'title': 'Fast Food'
						}, {
							'id': 'flower_shops',
							'title': 'Flower Shops'
						}, {
							'id': 'furnature_stores',
							'title': 'Furnature Stores'
						}, {
							'id': 'gyms',
							'title': 'Gyms'
						}, {
							'id': 'hairdressers',
							'title': 'Hairdressers'
						}, {
							'id': 'health_foods',
							'title': 'Health Foods'
						}, {
							'id': 'hospitals',
							'title': 'Hospitals'
						}, {
							'id': 'hostels',
							'title': 'Hostels'
						}, {
							'id': 'hotels',
							'title': 'Hotels'
						}, {
							'id': 'locksmiths',
							'title': 'Locksmiths'
						}, {
							'id': 'mobile_phones',
							'title': 'Mobile Phones'
						}, {
							'id': 'museums',
							'title': 'Museums'
						}, {
							'id': 'music_dvd_games',
							'title': 'Music, DVD & Games'
						}, {
							'id': 'night_clubs',
							'title': 'Night Clubs'
						}, {
							'id': 'parking',
							'title': 'Parking'
						}, {
							'id': 'pet_shops',
							'title': 'Pet Shops'
						}, {
							'id': 'petrol_stations',
							'title': 'Petrol Stations'
						}, {
							'id': 'pharmacies',
							'title': 'Pharmacies'
						}, {
							'id': 'photography_shops',
							'title': 'Photography Shops'
						}, {
							'id': 'pizza',
							'title': 'Pizza'
						}, {
							'id': 'post_offices',
							'title': 'Post Offices'
						}, {
							'id': 'pubs_bars',
							'title': 'Pubs & Bars'
						}, {
							'id': 'restaurants',
							'title': 'Restaurants'
						}, {
							'id': 'shoe_shops',
							'title': 'Shoe Shops'
						}, {
							'id': 'shopping_centres',
							'title': 'Shopping Centres'
						}, {
							'id': 'spas_salons',
							'title': 'Spas & Salons'
						}, {
							'id': 'supermarkets',
							'title': 'Supermarkets'
						}, {
							'id': 'taxis',
							'title': 'Taxis'
						}, {
							'id': 'theatres',
							'title': 'Theatres'
						}, {
							'id': 'toy_shops',
							'title': 'Toy Shops'
						}, {
							'id': 'train_stations',
							'title': 'Train Stations'
						}, {
							'id': 'travel_agencies',
							'title': 'Travel Agencies'
						}, {
							'id': 'veterinaries',
							'title': 'Veterinaries'
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
