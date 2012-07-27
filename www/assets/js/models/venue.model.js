/*global _, Backbone, ContactName, ContactField, ContactAddress*/
define([
	'underscore',
	'backbone'
],
function(UnderscoreLib, BackboneLib) {
	"use strict";

	return Backbone.Model.extend({
		defaults: {
			"id": null,
			"distance": null,
			"service": null,
			"detailsUrl": null,
			"advKey": null,
			"contact": {
				"blogUrl": null,
				"email": null,
				"facebook": null,
				"fax": null,
				"foursquare": null,
				"mobile": null,
				"phone": null,
				"twitter": null,
				"websiteUrl": null
			},
			"displayName": null,
			"photoUrl": null,
			"thumbUrl": null,
			"isSponsored": false,
			"isUserGenerated": false,
			"isVerified": false,
			"location": {
				"fullAddress": null,
				"address1": null,
				"address2": null,
				"address3": null,
				"city": null,
				"countryCode": null,
				"county": null,
				"latitude": null,
				"longitude": null,
				"postalCode": null,
				"region": null
			},
			"offersCount": 0,
			"openNow": -1,
			"ratingsCount": 0,
			"tradingName": null
		},
		initialize : function () {
			
		},
		saveToContacts: function () {
			if (navigator.contacts !== undefined) {
				var contact = navigator.contacts.create();

				contact.displayName = this.get('tradingName');
				contact.nickname = this.get('tradingName');

				contact.name = new ContactName({
					formatted: null,
					givenName: null,
					middleName: null,
					honorificPrefix: null,
					honorificSuffix: null
				});

				contact.phoneNumbers = [];
				var contDetails = this.get('contact');
				if (contDetails.phone !== null) {
					contact.phoneNumbers[0] = new ContactField('work', contDetails.phone, true);
				}

				if (contDetails.mobile !== null) {
					contact.phoneNumbers[contact.phoneNumbers.length] = new ContactField('mobile', contDetails.mobile, false);
				}

				contact.emails = [];
				if (contDetails.email !== null) {
					contact.emails[0] = new ContactField('work', contDetails.emails, true);
				}

				var locDetails = this.get('location');
				contact.addresses = [];
				if (locDetails.fullAddress !== null) {
					contact.addresses[0] = new ContactAddress(
						true, //pref: bool
						'work', //type: string
						locDetails.fullAddress, //formatted: string
						null, //streetAddress: string
						null, //locality: string
						locDetails.region, //region: string
						locDetails.postalCode, //postalCode: string
						locDetails.countryCode //country: string
					);
				}

				contact.urls = [];
				if (contDetails.websiteUrl !== null) {
					contact.urls[0] = new ContactField('work', contDetails.websiteUrl, true);
				}
			}
		}
	});
});