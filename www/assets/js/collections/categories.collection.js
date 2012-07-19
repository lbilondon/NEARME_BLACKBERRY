/*global _, Backbone*/
define([
	'underscore',
	'backbone',
	'models/category.model'
],
function(UnderscoreLib, BackboneLib, CategoryModel) {

	var useStub = true;

	return Backbone.Collection.extend({
		model: CategoryModel,
		url: function () {
			if (useStub) {
				return '/assets/js/dataStub/categories.json.js';
			}
		},
		fetchFromId: function (id, options) {
			if (id === 'brands') {
				this.url = '/assets/js/dataStub/cat_listing_0.json';
			}
			return this.fetch(options);
		},

		parse: function (response) {
			if (response.response !== undefined) {
				return response.response.categories;
			}
		}
	});
});