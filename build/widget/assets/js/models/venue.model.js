/*global _, Backbone*/
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
		initialize : function() {
			
		}
	});
});