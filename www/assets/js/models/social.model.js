/*global _, Backbone*/
define([
	'underscore',
	'backbone',
	'jquery'
],
function(UnderscoreLib, BackboneLib, JqueryLib) {
	// "use strict";

	var FB_CLIENTID = '291405934206708';
	var FB_CLIENTSECRET = '449f17a422eae6676128143415e060d4';

	return Backbone.Model.extend({
		defaults: {
			"fb_authToken": null,
			"twitter_authKey": null,
			"fsq_authKey": null
		},
		idAttribute: 'modelId',
		initialize : function() {
			
		},

		fbLogin: function () {
			// if ( (FB_CLIENTID !== null) && (this.get('fb_authToken') === null) ) {
			// 	var my_redirect_uri = "http://www.facebook.com/connect/login_success.html",
			// 		my_type = "user_agent",
			// 		my_display = "touch";
 
			// 	var authorize_url = "https://graph.facebook.com/oauth/authorize?";
			// 		authorize_url += "client_id=" + FB_CLIENTID;
			// 		authorize_url += "&redirect_uri=" + my_redirect_uri;
			// 		authorize_url += "&display=" + my_display;
			// 		authorize_url += "&scope=read_stream,publish_stream,offline_access,publish_checkins";

				var authorize_url = "http://www.google.com";
				if (window.plugins.childBrowser !== undefined) {
					window.plugins.childBrowser.onLocationChange = function(loc){
						// this.fbLocChanged(loc);
					};
					window.plugins.childBrowser.showWebPage(authorize_url);
				}
			// }
		},

		fbLocChanged: function (loc) {
			/* Here we check if the url is the login success */
			if (loc.indexOf("http://www.facebook.com/connect/login_success.html") > -1) {
				window.plugins.childBrowser.close();
				var fbCode = loc.match(/code=(.*)$/)[1];
				$.ajax({
					url: 'https://graph.facebook.com/oauth/access_token?client_id=' + FB_CLIENTID + '&client_secret=' + FB_CLIENTSECRET + '&code=' + fbCode + '&redirect_uri=http://www.facebook.com/connect/login_success.html',
					data: {},
					success: function(data, status) {
						var fb_authToken = data.split("=")[1];

						if (fb_authToken !== undefined) {
							this.set({ "fb_authToken" : fb_authToken });
							window.plugins.childBrowser.close();
							initialize_facebook();
						}
					},
					error: function(error) {
						window.plugins.childBrowser.close();
					},
					dataType: 'text',
					type: 'POST'
				});
			}
		},

		create_facebook_url: function (base) {
			if(device) {
				var url = base + "&";
				if(base.indexOf("?") == -1) {
					url = base + "?";
				}
				return url + "access_token=" + this.get('fb_authToken');
			} else {
				return base;
			}
		}
	});
});