/**
 * Licensed to NearMe Global Limited 2012, all rights reserved.
 * http://www.getnearme.com/
 *
 * Developed by LBi London, July 2012
 **/
(function() {
	// "use strict";
	var libsPath = '../../libs/js/'; //libsPath relative to 'basePath'
	
	require.config({
		paths : {
			underscore : libsPath + 'lodash-underscore.min',
			backbone : libsPath + 'backbone-0.9.2.min',
			jquery : libsPath + 'jquery-1.7.2.min',
			jqueryMobile : libsPath + 'jquery.mobile-1.1.0.min'
		},
		baseUrl : 'assets/js'
	});
	
	require([
			'application'
		],
		function(App) {
			window.NEARMEAPP = window.NEARMEAPP || {};
			App.initialize();
		}
	);
}());