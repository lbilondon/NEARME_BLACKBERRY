/*global $, Backbone, _*/
define([
	'jquery',
	'jqueryMobile',
	'underscore',
	'backbone',
	'text!templates/venues.tmpl.html',
	'text!dataStub/venues.json.js'
],
function(Jquery, JqueryMobileLib, UnderscoreLib, BackboneLib, VenuesTmplStr, VenuesDataStr) {
	// "use strict";

	var venues = $.parseJSON(VenuesDataStr);

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
