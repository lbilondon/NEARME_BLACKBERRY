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
			_.bindAll(this, 'render', 'bindEvents', 'unbindEvents', 'pagebeforeshow', 'pagebeforehide', 'pageshow', 'dataFetchSuccess', 'dataFetchError', 'pagehide', 'renderMap', 'buildMailToLink', 'buildSMSLink');
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
					$content = $(this.contentTemplate({ venue: this.model, mailToLink: this.buildMailToLink(this.model), smsLink: this.buildSMSLink(this.model) }));

					$content.find("a[href^='http']").bind('click', function (e) {
						if (blackberry.invoke !== undefined) {
							e.preventDefault();
							var href = $(e.currentTarget).attr('href');
							var args = new blackberry.invoke.BrowserArguments(href);
							blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
						}
					});

					var model = this.model;
					$content.find('.js_addToContacts').bind('click', function (e) {
						e.preventDefault();
						model.saveToContacts();
					});

					$content.find('.js_addToFavourites').bind('click', function (e) {
						e.preventDefault();
						model.saveToFavourites();
					});

					this.$el.append($content);
					this.renderMap();
					this.$el.trigger('create');

					this.model.saveToHistory();
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

				thisMap.bind('click', function () {
					if (blackberry.invoke !== undefined) {
						var args = new blackberry.invoke.MapsArguments(loc.latitude, loc.longitude);
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
		},

		buildMailToLink: function (model) {
			var rtn = 'mailto:?subject=' + encodeURIComponent(model.get('tradingName'));
			rtn += '&body=' + encodeURIComponent(model.get('location').fullAddress);

			if (model.get('contact').phone !== null) {
				rtn += '%0D%0A%0D%0A';
				rtn += 'Tel. ' + encodeURIComponent(model.get('contact').phone);
			}

			var loc = model.get('location');
			if (loc.latitude !== null && loc.longitude !== null) {
				rtn += '%0D%0A%0D%0A';
				rtn += 'Find it on Google Maps: ' + encodeURIComponent('http://maps.google.com/?ll=' + loc.latitude + ',' + loc.longitude + '&q=' + loc.latitude + ',' + loc.longitude);
			}

			rtn += '%0D%0A%0D%0A';
			rtn += 'NearMe - Local Knowledge';
			return rtn;
		},

		buildSMSLink: function (model) {
			//TODO: Debug why this doesn't work...
			//
			// var rtn = 'sms:' + '?body=' + model.get('tradingName');
			// rtn += ' ' + encodeURIComponent(model.get('location').fullAddress);

			// if (model.get('contact').phone !== null) {
			// 	rtn += '%0D%0A%0D%0A';
			// 	rtn += 'Tel. ' + model.get('contact').phone;
			// }

			// var loc = model.get('location');
			// if (loc.latitude !== null && loc.longitude !== null) {
			// 	rtn += '%0D%0A%0D%0A';
			// 	rtn += 'Find it on Google Maps: ' + encodeURIComponent('http://maps.google.com/?ll=' + loc.latitude + ',' + loc.longitude + '&q=' + loc.latitude + ',' + loc.longitude);
			// }

			// rtn = rtn.substr(0, 150);
			// return rtn;
			return null;
		}
	});
});
