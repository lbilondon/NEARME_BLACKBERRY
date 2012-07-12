/*global $, Backbone, _*/
define([
	'jquery',
	'jqueryMobile',
	'underscore',
	'backbone',
	'text!templates/venues.tmpl.html'
],
function(Jquery, JqueryMobileLib, UnderscoreLib, BackboneLib, VenuesTmplStr) {
	// "use strict";

	var venues = {
		"asda": [
			{
				"id": "1",
				"tradeName": "Asda Supermarket",
				"location": {
					"fullAddress": "Old Kent Road, SE1 5AG, Ossory..."
				}
			}, {
				"id": "2",
				"tradeName": "Asda Superstore",
				"location": {
					"fullAddress": "151 East Ferry Road, E14 3BT Isle..."
				}
			}, {
				"id": "3",
				"tradeName": "Asda Supermarket",
				"location": {
					"fullAddress": "158 Clapton Common, E5 9AG..."
				}
			}
		],
		"b_q": [
			{
				"id": "4",
				"tradeName": "B&Q",
				"location": {
					"fullAddress": "524 Old Kent Road, SE1 5BA Lond..."
				}
			}, {
				"id": "5",
				"tradeName": "B&Q",
				"location": {
					"fullAddress": "1 Leyton Mills, Marshall Road, E10..."
				}
			}, {
				"id": "6",
				"tradeName": "B&Q",
				"location": {
					"fullAddress": "18 Heybridge Way, Lea Bridge Roa..."
				}
			}
		]
	};

	return Backbone.View.extend({
		template : _.template(VenuesTmplStr),
		
		initialize : function() {
			this.render();
		},
		
		render : function() {
			
			this.$el.attr({
				'data-role': 'page',
				'data-add-back-btn': 'true'
			});

			var tmp = [];
			if (this.options.category_id !== undefined) {
				if (venues[this.options.category_id] !== undefined) {
					tmp = venues[this.options.category_id];
				}
			}

			this.$el.append(this.template({ venues: tmp }));
			return this;
		}
	});
});
