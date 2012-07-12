/*global _, Backbone*/
define([
	'underscore',
	'backbone',
	'models/category.model'
],
function(UnderscoreLib, BackboneLib, CategoryModel) {
	// "use strict";
	return Backbone.Collection.extend({
		model: CategoryModel,
		initialize : function() {

		}
	});
});