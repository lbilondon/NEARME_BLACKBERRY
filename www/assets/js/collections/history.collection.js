/*global _, Backbone*/
define([
	'underscore',
	'backbone',
	'models/venue.model'
],
function(UnderscoreLib, BackboneLib, VenueModel) {

	var MAX = 25;

	return Backbone.Collection.extend({
		model: VenueModel,
		addEntry: function(model) {
			if (this.where({ 'id': model.get('id') }).length <= 0) {
				this.unshift(model);

				if (this.length > MAX) {
					this.pop();
				}
			}
		},
		removeEntry: function (model) {
			this.remove(model);
		},
		clearHistory: function () {
			this.reset();
		}
	});
});