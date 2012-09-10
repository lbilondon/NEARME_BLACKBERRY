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

			if (navigator.contacts !== undefined && navigator.notification !== undefined) {
				var contact = navigator.contacts.create();

				contact.displayName = this.get('tradingName');
				contact.nickname = this.get('tradingName');

				contact.name = new ContactName();
				contact.name.formatted = this.get('tradingName');
				contact.name.familyName = null;
				contact.name.givenName = this.get('tradingName');
				contact.name.middleName = null;
				contact.name.honorificPrefix = null;
				contact.name.honorificSuffix = null;

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
					
					var streetAddress = this.formatStreetAddress(locDetails);

					contact.addresses[0] = new ContactAddress(
						true, //pref: bool
						'work', //type: string
						locDetails.fullAddress, //formatted: string
						streetAddress, //streetAddress: string
						locDetails.address3, //locality: string
						locDetails.region, //region: string
						locDetails.postalCode, //postalCode: string
						locDetails.countryCode //country: string
					);
				}

				contact.urls = [];
				if (contDetails.websiteUrl !== null) {
					contact.urls[0] = new ContactField('work', contDetails.websiteUrl, true);
				}

				var success = this.onContactSaveSuccess;
				var error = this.onContactSaveError;
				navigator.notification.confirm(
					'Are you sure you want to add this to your contacts?',
					function (buttonPressed) {
						if (buttonPressed == 1) {
							contact.save(success, error);
							if (navigator.notification) {
								navigator.notification.alert(
									'Venue has been saved to your contact list', // message
									null, // callback
									'Contact saved', // title
									'OK' // buttonName
								);
							}
						}
					},
					'Add to contacts',
					'Add,Cancel'
				);
			}
		},

		saveToFavourites: function () {
			window.NEARMEAPP.FAVOURITESCOLLECTION.addEntry(this);
		},

		deleteFromFavourites: function () {
			window.NEARMEAPP.FAVOURITESCOLLECTION.removeEntry(this);
		},

		saveToHistory: function () {
			window.NEARMEAPP.HISTORYCOLLECTION.addEntry(this);
		},


		formatStreetAddress: function (locDetails) {
			var address = locDetails.address1;

			if (locDetails.address2 !== null) {
				address += ', ' + locDetails.address2;
			}

			return address;
		},
		
		onContactSaveSuccess: function () {

		},

		onContactSaveError: function (error) {

		}
	});
});