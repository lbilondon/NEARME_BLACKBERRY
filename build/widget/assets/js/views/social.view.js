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


			// this.model = window.NEARMEAPP.currentVenuesCollection.get(this.options.venue_id);

			// var message = this.buildMessage();
			// this.charsLeft = 140 - message.length;

			// this.$el.append(this.contentTemplate({ message: message, isCheckin: this.options.isCheckin, charsLeft: this.charsLeft }));

			this.bindEvents();
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
			this.model.on('change', this.pageshow);

			this.$el.on('pagebeforeshow', this.pagebeforeshow);
			this.$el.on('pagebeforehide', this.pagebeforehide);
			this.$el.on('pageshow', this.pageshow);
			this.$el.on('pagehide', this.pagehide);
		},

		unbindEvents: function () {
			this.model.off('change', this.pageshow);

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

			this.$el.append('<p>LOC: ' + this.model.get('loc') + '</p>');

			this.$el.append('<p>AUTH TOKEN: ' + this.model.get('fb_authToken') + '</p>');
			// if (this.model.get('fb_user') !== null) {
				this.$el.append('<p>FB USER: ' + this.model.get('fb_user') + '</p>');
			// }
		},

		pagehide: function () {
			//triggered on page
		}
	});
});
