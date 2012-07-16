/*global _, Backbone*/
define([
	'underscore',
	'backbone'
],
function(UnderscoreLib, BackboneLib) {
	// "use strict";

	//var dataStructure = {
	//			"id": "63860",
	//			"service": "NearMe",
	//			"tradeName": "Comerica Bank",
	//			"thumbUrl": "http://www.comerica.com/thumb.png",
	//			"photoUrl": "http://www.comerica.com/photo.png",
	//			"distance": 925,
	//			"rating": 5,
	//			"ratingsCount": 16,
	//			"offersCount": 0,
	//			"checkinsCount": 0,
	//			"openNow": -1,
	//			"isVerified": true,
	//			"isSponsored": false,
	//			"isUserGenerated": false,
	//			"location": {
	//				"fullAddress": "10020 North De Anza Blvd., Cupertino, ...",
	//				"address1": "10020 North De Anza Blvd.",
	//				"address2": null,
	//				"address3": null,
	//				"city": "Cupertino",
	//				"county": "Santa Clara",
	//				"region": "CA",
	//				"country": "United States",
	//				"postalCode": "95014",
	//				"latitude": 37.323455,
	//				"longitude": -122.032138
	//			},
	//			"contact": {
	//				"phone": "4087250534",
	//				"fax": "4087250535",
	//				"mobile": null,
	//				"email": "info@comerica.com",
	//				"websiteUrl": "http://www.comerica.com/",
	//				"blogUrl": "http://www.comerica.com/blog/",
	//				"facebook": null,
	//				"twitter": null,
	//				"foursquare": null
	//			},
	//			"detailsUrl": null
	//		};

	return Backbone.Model.extend({
		defaults: {
			"id": null,
			"service": null,
			"tradeName": null,
			"thumbUrl": null,
			"photoUrl": null,
			"distance": null,
			"rating": 0,
			"ratingsCount": 0,
			"offersCount": 0,
			"checkinsCount": 0,
			"openNow": -1,
			"isVerified": false,
			"isSponsored": false,
			"isUserGenerated": false,
			"location": {
				"fullAddress": null,
				"address1": null,
				"address2": null,
				"address3": null,
				"city": null,
				"county": null,
				"postalCode": null,
				"latitude": null,
				"longitude": null
			},
			"contact": {
				"phone": null,
				"fax": null,
				"mobile": null,
				"email": null,
				"websiteUrl": null,
				"blogUrl": null,
				"facebook": null,
				"twitter": null,
				"foursquare": null
			},
			"detailsUrl": null
		},
		idAttribute: 'modelId',
		initialize : function() {
			
		}
	});
});