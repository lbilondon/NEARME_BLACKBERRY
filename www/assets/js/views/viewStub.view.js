define([
		'jquery',
		'jqueryMobile',
		'underscore',
		'backbone'
	],
	function($, JqueryMobile, _, Backbone) {
		"use strict";

		return Backbone.View.extend({
			template : _.template(/*loaded template*/),
			
			initialize : function() {
				this.render();
			},
			
			render : function() {
				this.$el.append(this.template(/*model/collection*/));
				
				return this;
			}
		});
	}
);
