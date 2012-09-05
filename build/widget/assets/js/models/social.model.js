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
			"loc": null,
			"fb_authToken": null,
			"fb_user": null,
			"twitter_authKey": null,
			"fsq_authKey": null
		},
		idAttribute: 'modelId',
		initialize : function() {
			_.bindAll(this, 'fbLogin', 'fbLocChanged', 'create_facebook_url');
			// ChildBrowser.install();
		},

		fbLogin: function () {
			if ( (FB_CLIENTID !== null) && (this.get('fb_authToken') === null) ) {
				var my_redirect_uri = escape("https://www.facebook.com/connect/login_success.html"),
					my_type = "user_agent",
					my_display = "touch";
 
				var authorize_url = "https://www.facebook.com/dialog/oauth?";
					authorize_url += "client_id=" + FB_CLIENTID;
					authorize_url += "&redirect_uri=" + my_redirect_uri;
					authorize_url += "&display=" + my_display;
					authorize_url += "&scope=read_stream,publish_stream,offline_access,publish_checkins";

				if (window.plugins.childBrowser !== undefined) {
					window.plugins.childBrowser.onLocationChange = this.fbLocChanged;
					window.plugins.childBrowser.showWebPage(authorize_url);
				}
			}
		},

		fbLocChanged: function (loc) {

			/* Here we check if the url is the login success */
			if (loc.indexOf("https://www.facebook.com/connect/login_success.html") > -1) {
				this.set({ "loc": loc });
				
				var fb_authToken = loc.match(/access_token=(.*)$/)[1] || loc.match(/code=(.*)$/)[1];
				if (fb_authToken !== undefined) {
					this.set({ "fb_authToken" : fb_authToken });

					var thisSet = this.set;
					
					$.ajax({
						// url: 'https://graph.facebook.com/me?access_token=' + this.get('fb_authToken'),
						url: 'http://172.27.64.199:3000/fb/graph/me?access_token=' + this.get('fb_authToken'),
						success: function (data) {
							thisSet({ "fb_user": data });
						},
						dataType: "text"
					});

					window.plugins.childBrowser.close();
				}
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