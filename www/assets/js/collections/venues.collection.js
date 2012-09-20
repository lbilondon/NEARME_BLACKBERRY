/*global _, Backbone*/
define([
	'underscore',
	'backbone',
	'models/venue.model'
],
function(UnderscoreLib, BackboneLib, VenueModel) {

	var useStub = true;

	return Backbone.Collection.extend({
		model: VenueModel,
		url: function () {
			if (useStub) {
				return './assets/js/dataStub/venues.json.js';
			}
		},
		fetchFromId: function (id, options) {
			if (id !== undefined) {
				this.url = './assets/js/dataStub/venue_search.' + id.toString() + '.json';
			}

			return this.fetch(options);
		},
		parse: function (response) {
			if (response.response !== undefined) {
				return response.response.venues;
			}
		}
	});
});