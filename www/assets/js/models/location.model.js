/*global _, Backbone, navigator, google*/
define([
	'underscore',
	'backbone'
],
function(UnderscoreLib, BackboneLib) {
	"use strict";

	return Backbone.Model.extend({
		defaults: {
			"latitude": null,
			"longitude": null,
			"altitude": null,
			"accuracy": null,
			"altitudeAccuracy": null,
			"heading": null,
			"speed": null,
			"timestamp": null,
			"formatted_address": null,
			"address_components": null,
			"geometry": null
		},
		initialize : function() {
			_.bindAll(this, 'refreshCurrentPosition', 'setCurrentPosition', 'onError');
			this.refreshCurrentPosition();
		},
		refreshCurrentPosition: function () {
			if (navigator.geolocation !== undefined) {
				navigator.geolocation.getCurrentPosition(this.setCurrentPosition, this.onError);
			}
		},
		setCurrentPosition: function (position) {
			if (position !== undefined) {
				this.set('latitude', position.coords.latitude);
				this.set('longitude', position.coords.longitude);
				this.set('altitude', position.coords.altitude);
				this.set('accuracy', position.coords.accuracy);
				this.set('altitudeAccuracy', position.coords.altitudeAccuracy);
				this.set('heading', position.coords.heading);
				this.set('speed', position.coords.speed);
				this.set('timestamp', position.timestamp);

				this.setAddress(position.coords.latitude, position.coords.longitude);
			}
		},
		setAddress: function (latitude, longitude) {
			//Reverse Geocoding with Google Maps API V3
			//https://developers.google.com/maps/documentation/javascript/geocoding#ReverseGeocoding
			var geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(latitude, longitude);
			var that = this;
			geocoder.geocode({ 'latLng': latlng}, function (results, status) {
				if (results[0]) {
					that.set('formatted_address', results[0].formatted_address);
					that.set('address_components', results[0].address_components);
					that.set('geometry', results[0].geometry);
				}
			});
		},
		onError: function (error) {
			//handle error
		}
	});
});