/*global _, Backbone*/
define([
	'underscore',
	'backbone',
	'models/venue.model'
],
function(UnderscoreLib, BackboneLib, VenueModel) {

	return Backbone.Collection.extend({
		model: VenueModel,
		addEntry: function (model) {
			this.push(model);
		},
		removeEntry: function (model) {
			this.remove(model);
		}
	});
});