/*global $, Backbone, _*/
define([
		'jquery',
		'jqueryMobile',
		'underscore',
		'backbone',
		'text!templates/categories.tmpl.html'
	],
	function(Jquery, JqueryMobileLib, UnderscoreLib, BackboneLib, CategoriesTmplString) {
		"use strict";

		var categories = [
							{
								'url': '#asda',
								'name': 'Asda'
							}, {
								'url': '#b_q',
								'name': 'B&Q'
							}, {
								'url': '#barclays',
								'name': 'Barclays'
							}, {
								'url': '#currys_-_pc_world',
								'name': 'Currys - PC World'
							}, {
								'url': '#debenhams',
								'name': 'Debenhams'
							}, {
								'url': '#french_connection',
								'name': 'French Connection'
							}, {
								'url': '#fullers',
								'name': 'Fullers'
							}, {
								'url': '#geronimo_inns',
								'name': 'Geronimo Inns'
							}, {
								'url': '#orange',
								'name': 'Orange'
							}, {
								'url': '#phones_4u',
								'name': 'Phones 4u'
							}, {
								'url': '#pizza_hut',
								'name': 'Pizza Hut'
							}, {
								'url': '#screwfix',
								'name': 'Screfix'
							}, {
								'url': '#snappy_snaps',
								'name': 'Snappy Snaps'
							}, {
								'url': '#t-mobile',
								'name': 'T-Mobile'
							}, {
								'url': '#tesco',
								'name': 'Tesco'
							}, {
								'url': '#the_body_shop',
								'name': 'The Body Shop'
							}, {
								'url': '#youngs',
								'name': 'Youngs'
							}
						];

		return Backbone.View.extend({
			template : _.template(CategoriesTmplString),
			
			initialize : function() {
				this.render();
			},
			
			render : function() {
				this.$el.attr({
					'data-role': 'page',
					'data-add-back-btn': 'true'
				});

				this.$el.append(this.template({ categories: categories }));
				
				return this;
			}
		});
	}
);
