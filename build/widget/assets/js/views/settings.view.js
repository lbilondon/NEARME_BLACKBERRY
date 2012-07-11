/*global $, Backbone, _*/
define([
		'jquery',
		'jqueryMobile',
		'underscore',
		'backbone',
		'text!templates/settings.tmpl.html'
	],
	function(Jquery, JqueryMobile, UnderscoreLib, BackboneLib, SettingsTmplString) {
		// "use strict";

		return Backbone.View.extend({
			template : _.template(SettingsTmplString),
			
			initialize : function() {
				this.render();
			},
			
			render : function() {
				if (this.options.persistent) {
					this.$el.addClass('persistent-page');
				}

				this.$el.attr({ 'data-role': 'page' });
				this.$el.append(this.template());
				
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
