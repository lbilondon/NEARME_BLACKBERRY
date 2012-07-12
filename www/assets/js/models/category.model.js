/*global _, Backbone*/
define([
	'underscore',
	'backbone'
],
function(UnderscoreLib, BackboneLib) {
	// "use strict";

	//var dataStructure = {
	//	"id": "1001",
	//	"advKey": "2fbfd81005dd426188ddcf7a56a5e4c3",
	//	"type": 4,
	//	"isPremium": true,
	//	"title": "Hilton",
	//	"pluralTitle": "Hilton",
	//	"queryStr": "Hilton",
	//	"offersCount": 2,
	//	"iconUrl": "https://api.nearme.com/v2/categories/1001/hilton.png",
	//	"skin": {
	//		"brandColor": "A42C2C",
	//		"titleColor": "E6A1A1",
	//		"subtitleColor": "E6A1A1",
	//		"highlightColor": "6C5E5E",
	//		"thumbImgUrl": "http://www.getnearme.com/brands/GB/orange/skin/Thumb_Orange.png",
	//		"headerImgUrl": "http://www.getnearme.com/brands/GB/orange/skin/Header_Orange.png",
	//		"headerBtnUrl": "http://shop.orange.co.uk/shop/business/iphone",
	//		"offersIconUrl": "",
	//		"footerText": "© EverythingEverywhereLtd. 2011"
	//	},
	//	"categories": null
	//};

	return Backbone.Model.extend({
		defaults: {
			"id": null,
			"advKey": null,
			"type": null,
			"isPremium": null,
			"title": null,
			"pluralTitle": null,
			"queryStr": null,
			"offersCount": null,
			"iconUrl": null,
			"skin": null,
			"categories": null
		},
		idAttribute: 'modelId',
		initialize : function() {
			
		}
	});
});