/*global $, Backbone, _*/
define([
		'jquery',
		'jqueryMobile',
		'underscore',
		'backbone'
	],
	function(Jquery, JqueryMobileLib, UnderscoreLib, BackboneLib) {
		// "use strict";

		return Backbone.View.extend({
			template : _.template(/*loaded template*/),
			
			initialize : function() {
				this.render();
			},
			
			render : function() {
				if (this.options.persistent) {
					this.$el.addClass('persistent-page');
				}

				this.$el.append(this.template(/*model/collection*/));
				
				return this;
			},

			isPersistent: function () {
				if (this.options.persistent !== undefined) {
					return this.options.persistent;
				}
				return false;
			}
		});
	}
);
