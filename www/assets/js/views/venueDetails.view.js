/*global $, Backbone, _*/
define([
	'jquery',
	'jqueryMobile',
	'underscore',
	'backbone',
	'collections/venues.collection',
	'text!templates/header.tmpl.html',
	'text!templates/venueDetails.tmpl.html',
	'text!templates/error.tmpl.html'
],
function(Jquery, JqueryMobileLib, UnderscoreLib, BackboneLib, VenuesCollection, HeaderTmplStr, VenueDetailsTmplStr, ErrorTmplStr) {
	// "use strict";

	var STATIC_MAPS_API_KEY = 'AIzaSyDuO6PPp1EVUZ1ppzY3_oECowXwdyGqU-I';

	return Backbone.View.extend({
		headerTemplate: _.template(HeaderTmplStr),
		contentTemplate : _.template(VenueDetailsTmplStr),
		errorTemplate: _.template(ErrorTmplStr),
		
		initialize: function() {
			_.bindAll(this, 'render', 'bindEvents', 'unbindEvents', 'pagebeforeshow', 'pagebeforehide', 'pageshow', 'dataFetchSuccess', 'dataFetchError', 'pagehide', 'renderMap');
			this.render();
		},
		
		render: function() {
			this.$el.append(this.headerTemplate());
			this.bindEvents();
			return this;
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
			if (window.NEARMEAPP.currentVenuesCollection !== undefined && this.options.venue_id !== undefined) {
				this.model = window.NEARMEAPP.currentVenuesCollection.get(this.options.venue_id);
				if (this.model !== undefined) {
					this.$el.append(this.contentTemplate({ venue: this.model }));
					this.$el.trigger('create');

					this.renderMap();
				}
			}
		},

		dataFetchSuccess: function (collection, response) {
			
		},

		dataFetchError: function () {
			this.$el.append(this.errorTemplate());
		},

		pagehide: function () {
			//triggered on page
		},

		renderMap: function () {

			var loc = this.model.get('location');
			if (loc.latitude !== null && loc.longitude !== null) {
				var url = 'http://maps.googleapis.com/maps/api/staticmap?';
					url += 'key=' + STATIC_MAPS_API_KEY;
					url += '&sensor=false';
					url += '&maptype=roadmap';
					url += '&size=250x400';
					url += '&zoom=14';
					url += '&markers=' + loc.latitude + ',' + loc.longitude;

				var venueId = this.options.venue_id,
					thisLoc = null;
				window.NEARMEAPP.currentVenuesCollection.each(function (item, key) {
					if (key !== venueId) {
						thisLoc = item.get('location');
						if (thisLoc.latitude !== null && thisLoc.longitude !== null) {
							url += '&markers=size:small%7C' + thisLoc.latitude + ',' + thisLoc.longitude;
						}
					}
				});

				var lat = window.NEARMEAPP.LOCATIONMODEL.get('latitude');
				var lng = window.NEARMEAPP.LOCATIONMODEL.get('longitude');
				if (lat !== null && lng !== null) {
					url += '&markers=color:green%7C' + lat + ',' + lng;
				}

				var thisMap = $('<img src="' + url + ' " />');

				thisMap.on('tap click', function () {
					if (blackberry.invoke !== undefined) {
						//TODO: Debug this
						var args = blackberry.invoke.MapsArgument(loc.latitude, loc.longitude);
						blackberry.invoke.invoke(blackberry.invoke.APP_MAPS, args);
					}
				});

				this.$el.append(thisMap);
			}


			/*
			http://maps.googleapis.com/maps/api/staticmap?

			center=Brooklyn+Bridge,New+York,NY
			&zoom=13
			&size=600x300
			&maptype=roadmap
			&markers=color:blue%7Clabel:S%7C40.702147,-74.015794
			&markers=color:green%7Clabel:G%7C40.711614,-74.012318
			&markers=color:red%7Ccolor:red%7Clabel:C%7C40.718217,-73.998284
			&sensor=false
			*/
		}
	});
});
