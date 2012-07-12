/*global _, Backbone*/
define([
	'underscore',
	'backbone',
	'models/venue.model'
],
function(UnderscoreLib, BackboneLib, VenueModel) {
	// "use strict";
	return Backbone.Collection.extend({
		model: VenueModel,
		initialize : function() { }
	});
});