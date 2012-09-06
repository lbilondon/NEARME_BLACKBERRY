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
			"fb_access_token": null,
			"fb_expires": null,
			"fb_user": null,
			"twitter_authKey": null,
			"fsq_authKey": null
		},
		idAttribute: 'modelId',
		initialize : function() {
			_.bindAll(
				this,
				'fbLogin',
				'fbLocChanged',
				'get_fbaccess_token',
				'set_fbaccess_token',
				'get_fb_user',
				'set_fb_user',
				'create_facebook_url'
			);

		},

		fbLogin: function () {
			if ( (FB_CLIENTID !== null) && (this.get('fb_access_token') === null) ) {
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
			if (loc.match(/code=(.*)$/) !== null) {

				var fb_code = loc.match(/code=(.*)$/)[1];

				if (fb_code !== undefined) {

					this.get_fbaccess_token(fb_code);
					window.plugins.childBrowser.close();
				}
			}
		},

		get_fbaccess_token: function (fb_code) {
			// var access_url = "https://graph.facebook.com/oauth/access_token?";
			var access_url = "http://172.27.64.199:3000/fb/graph/oauth/access_token?";
				access_url += "client_id=" + FB_CLIENTID;
				access_url += "&client_secret=" + FB_CLIENTSECRET;
				access_url += "&redirect_uri=" + escape("https://www.facebook.com/connect/login_success.html");
				access_url += "&code=" + fb_code;

			$.ajax({
				url: access_url,
				type: 'GET',
				dataType: "text",
				success: this.set_fbaccess_token
			});
		},

		set_fbaccess_token: function (data, status) {
			var dataArr = data.split('&');
			var tmpArr = [];
			var tmp = {};
			if (dataArr.length > 0) {
				for(var i = 0; i < dataArr.length; i++) {
					tmpArr = dataArr[i].split('=');
					if (tmpArr.length > 0) {
						var key = 'fb_' + tmpArr[0];
						tmp[key] = tmpArr[1];
					}
				}
				this.set(tmp);
				this.get_fb_user();
			}
		},

		get_fb_user: function () {
			var thisSet = this.set;
			$.ajax({
				url: "http://172.27.64.199:3000/fb/graph/me?access_token=" + this.get('fb_access_token'),
				// url: 'https://graph.facebook.com/me?access_token=' + this.get('fb_access_token'),
				success: this.set_fb_user,
				dataType: "json"
			});
		},

		set_fb_user: function (data, status) {
			if (data.length > 0) {
				this.set({ "fb_user": data });
			}
		},

		create_facebook_url: function (base) {
			if(device) {
				var url = base + "&";
				if(base.indexOf("?") == -1) {
					url = base + "?";
				}
				return url + "access_token=" + this.get('fb_access_token');
			} else {
				return base;
			}
		}
	});
});