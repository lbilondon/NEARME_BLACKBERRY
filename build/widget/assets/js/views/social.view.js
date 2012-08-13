/*global $, Backbone, _*/
define([
	'jquery',
	'jqueryMobile',
	'underscore',
	'backbone',
	'models/social.model',
	'text!templates/header.tmpl.html',
	'text!templates/social.tmpl.html'
],
function(Jquery, JqueryMobileLib, UnderscoreLib, BackboneLib, SocialModel, HeaderTmplStr, SocialTmplStr) {
	// "use strict";

	return Backbone.View.extend({
		headerTemplate: _.template(HeaderTmplStr),
		contentTemplate: _.template(SocialTmplStr),
		
		initialize: function() {
			_.bindAll(this, 'render', 'buildMessage','bindEvents', 'unbindEvents', 'pagebeforeshow', 'pagebeforehide', 'pageshow', 'pagehide');

			this.model = new SocialModel();

			this.render();
		},
		
		render: function() {

			this.model.fbLogin();

			// this.$el.append(this.headerTemplate());

			// this.model = window.NEARMEAPP.currentVenuesCollection.get(this.options.venue_id);

			// var message = this.buildMessage();
			// this.charsLeft = 140 - message.length;

			// this.$el.append(this.contentTemplate({ message: message, isCheckin: this.options.isCheckin, charsLeft: this.charsLeft }));

			// this.bindEvents();
			return this;
		},

		buildMessage: function () {
			var rtnStr = '';
			if (this.options.isCheckin) {
				rtnStr = 'I am at ';
			} else {
				rtnStr = 'I am going to ';
			}

			var tradingName = this.model.get('tradingName');
			if (tradingName !== null) {
				rtnStr += tradingName;
			}

			var fullAddress = this.model.get('location').fullAddress;
			if (fullAddress !== null) {
				rtnStr += ', ' + fullAddress;
			}
			return rtnStr;
		},

		bindEvents: function () {
			this.$el.on('pagebeforeshow', this.pagebeforeshow);
			this.$el.on('pagebeforehide', this.pagebeforehide);
			this.$el.on('pageshow', this.pageshow);
			this.$el.on('pagehide', this.pagehide);
		},

		unbindEvents: function () {
			this.$el.off('pagebeforeshow', this.pagebeforeshow);
			this.$el.off('pagebeforehide', this.pagebeforehide);
			this.$el.off('pageshow', this.pageshow);
			this.$el.off('pagehide', this.pagehide);
		},

		pagebeforeshow: function () {
			//triggered on page
		},

		pagebeforehide: function () {
			//triggered on page
		},

		pageshow: function () {
			
		},

		pagehide: function () {
			//triggered on page
		}
	});
});
