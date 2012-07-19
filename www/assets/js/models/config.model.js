/*global _, Backbone*/
define([
	'underscore',
	'backbone'
],
function(UnderscoreLib, BackboneLib) {
	// "use strict";

	return Backbone.Model.extend({
		defaults: {
			"key": '2fbfd81005dd426188ddcf7a56a5e4c4', //api key
			"duid": null, //device open udid
			"uid": "0000-0000-000000000000", //config request response sets this
			"v": "2.0.3", //app version
			"app": null, //NearMe app code defined by apple's portal?
			"hl": null, //language code currently in use on device
			"type": "blackberry", //need to ratify this with NearMe Devs
			"sysVer": null, //operating system version
			"res": null, //device screen resolution
			"format": "json" //response format value
		},
		idAttribute: 'modelId',
		initialize : function() {
			
		}
	});
});