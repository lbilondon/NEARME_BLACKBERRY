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
				this.url = '/assets/js/dataStub/brands.json.js';
			}
			
			return this.fetch(options);
		}
	});
});