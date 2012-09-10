/*global _, Backbone*/
define([
	'underscore',
	'backbone',
	'jquery'
],
function(UnderscoreLib, BackboneLib, JqueryLib) {
	// "use strict";

	var DEBUG = true;

	var FB_CLIENTID = '291405934206708';
	var FB_CLIENTSECRET = '449f17a422eae6676128143415e060d4';

	var FB_URLS = {
		redirect_uri: "https://www.facebook.com/connect/login_success.html",
		authorize: "https://www.facebook.com/dialog/oauth",
		access_token: "https://graph.facebook.com/oauth/access_token",
		me: "https://graph.facebook.com/me",
		feed_post: "https://graph.facebook.com/me/feed",
		checkins: "https://graph.facebook.com/me/checkins"
	};

	var TWITTER_URLS = {
		connect: "https://172.27.64.199:3000/tw"
	};

	if (DEBUG) {
		for (var i in FB_URLS) {
			if (FB_URLS.hasOwnProperty(i)) {
				FB_URLS[i] = FB_URLS[i].replace('https://graph.facebook.com/', 'http://172.27.64.199:3000/fb/graph/');
			}
		}

	}

	return Backbone.Model.extend({
		defaults: {
			"loc": null,
			"fb_access_token": null,
			"fb_expires": null,
			"fb_user": null,
			"tw_oauth_token": null,
			"tw_oauth_token_secret": null,
			"tw_access_token": null,

			"fsq_authKey": null
		},
		idAttribute: 'modelId',
		initialize : function() {
			_.bindAll(
				this,
				'twLogin',
				'tw_authenticate',
				'fbLogin',
				'fbLocChanged',
				'get_fbaccess_token',
				'set_fbaccess_token',
				'get_fb_user',
				'set_fb_user',
				'post_fb_message',
				'post_fb_checkin',
				'create_facebook_url'
			);
		},

		twLogin: function () {
			if (this.get('tw_access_token') === null) {
				$.ajax({
					url: TWITTER_URLS['request_token'],
					type: "GET",
					dataType: "text",
					success: this.tw_authenticate
				});
			}
		},

		tw_authenticate: function (data, status) {
			// if ( data !== undefined ) {
				var dataArr = data.split('&');
				var tmpArr = [];
				var tmp = {};
				if (dataArr.length > 0) {
					for(var i = 0; i < dataArr.length; i++) {
						tmpArr = dataArr[i].split('=');
						if (tmpArr.length > 0) {
							var key = 'tw_' + tmpArr[0];
							tmp[key] = tmpArr[1];
						}
					}
					this.set(tmp);
				}

				if (this.get('tw_oauth_token') !== null) {
					var authorize_url = TWITTER_URLS['authenticate'] = "?";
						authorize_url = "oauth_token=" + this.get('tw_oauth_token');

					if (window.plugins.childBrowser !== undefined) {
						window.plugins.childBrowser.onLocationChange = this.twLocChanged;
						window.plugins.childBrowser.showWebPage(authorize_url);
					}
				}
			// }
		},

		fbLogin: function () {
			if ( (FB_CLIENTID !== null) && (this.get('fb_access_token') === null) ) {
 
				var authorize_url = FB_URLS['authorize'] + "?";
					authorize_url += "client_id=" + FB_CLIENTID;
					authorize_url += "&redirect_uri=" + escape( FB_URLS['redirect_uri'] );
					authorize_url += "&display=touch";
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
			var access_url = FB_URLS['access_token'] + "?";
				access_url += "client_id=" + FB_CLIENTID;
				access_url += "&client_secret=" + FB_CLIENTSECRET;
				access_url += "&redirect_uri=" + escape( FB_URLS['redirect_uri'] );
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
			$.ajax({
				url: this.create_facebook_url( FB_URLS['me'] ),
				success: this.set_fb_user,
				dataType: "json"
			});
		},

		set_fb_user: function (data, status) {
			this.set({ "fb_user": data });
		},

		post_fb_message: function (message) {
			var url = this.create_facebook_url( FB_URLS['feed_post'] );
				url += '&message=' + escape( message );

			$.ajax({
				url: url,
				type: 'POST',
				dataType: 'text'
			});
		},

		post_fb_checkin: function (location) {
			var url = this.create_facebook_url( FB_URLS['checkins'] );
				// url += '&coordinates='
				// url += '&place='
				// url += '&message='
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