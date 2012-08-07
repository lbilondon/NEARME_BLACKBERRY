/*global $, Backbone, _*/
define([
	'jquery',
	'jqueryMobile',
	'underscore',
	'backbone',
	'models/settings.model',
	'text!templates/header.tmpl.html',
	'text!templates/settings.tmpl.html'
],
function(Jquery, JqueryMobile, UnderscoreLib, BackboneLib, SettingsModel, HeaderTmplStr, SettingsTmplStr) {
	// "use strict";

	return Backbone.View.extend({
		headerTemplate: _.template(HeaderTmplStr),
		listTemplate : _.template(SettingsTmplStr),
		
		initialize : function() {
			_.bindAll(this, 'render', 'save', 'bindEvents', 'unbindEvents', 'pagebeforeshow', 'pagebeforehide', 'pageshow', 'pagehide', 'sendToFriend', 'sendToFriendSMS');
			this.render();
		},
		
		render : function() {
			window.NEARMEAPP.SETTINGSMODEL = window.NEARMEAPP.SETTINGSMODEL || new SettingsModel();
			this.model = window.NEARMEAPP.SETTINGSMODEL;

			this.$el.append(this.headerTemplate());
			this.$el.append(this.listTemplate({ settings: window.NEARMEAPP.SETTINGSMODEL, feedbackLink: this.buildFeedbackLink() }));
			
			this.bindEvents();
			return this;
		},

		save: function (e) {
			var name = $(e.currentTarget).attr('name');
			var val = $(e.currentTarget).val();
			var data = {};
			data[name] = (val === 'true') ? true : false;

			window.NEARMEAPP.SETTINGSMODEL.set(data);
		},

		bindEvents: function () {
			this.$el.find('input').bind('change', this.save);

			var sendToFriend = this.sendToFriend;
			this.$el.find('.js_sendToFriend').bind('click', function (e) {
				e.preventDefault();
				sendToFriend();
			});

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
		},

		sendToFriend: function () {
			var sendToFriendEmail = this.model.sendTellFriendEmail;
			var sendToFriendSMS = this.sendToFriendSMS;
			navigator.notification.confirm(
				'',
				function (buttonPressed) {
					if (buttonPressed == 1) {
						sendToFriendEmail();
					} else if (buttonPressed == 2) {
						sendToFriendSMS();
					}
				},
				'',
				'Send via Email,Send via SMS,Cancel'
			);
		},

		buildFeedbackLink: function () {
			var rtn = 'mailto:support@getnearme.com?subject=Feedback%20on%20NearMe';
			return rtn;
		},

		sendToFriendSMS: function () {

		},

		buildSendToFriendSMS: function () {
			var body = "Click the link below to download NearMe directly from the Blackberry App Store. It's FREE";
			// body += "\r\n\r\n" + linkToAppStore;
			
			return { body: body };
		}
	});
});