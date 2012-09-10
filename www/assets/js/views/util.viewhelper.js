/*global $, window*/
define([
	'jquery'
],
function(Jquery) {
	"use strict";

	function _roundNumber(num, dec) {
		return ( Math.round( num * Math.pow(10,dec) ) / Math.pow(10,dec) );
	}

	function _calculateDistance(distance) {
		if (window.NEARMEAPP.SETTINGSMODEL.get('is_metric')) {
			//1000 meters in a kilometer
			if (distance > 999) {
				return _roundNumber( (distance / 1000), 2) + ' km';
			} else {
				return distance + ' m';
			}
		} else {
			distance = distance * 1.0936133;

			//1760 yards in a mile
			if (distance > 999) {
				return _roundNumber( (distance / 1760), 2) + ' mi';
			} else {
				return _roundNumber( distance, 0) + ' yd';
			}
		}
	}

	function _toDoDialogue() {
		if (navigator.notification !== undefined) {
			navigator.notification.alert(
				'Functionality is still to be built',
				null,
				'Not available',
				"OK"
			);
		}
	}

	return {
		calculateDistance: _calculateDistance,
		toDoDialogue: _toDoDialogue
	};
});