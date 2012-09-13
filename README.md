NEARME_BLACKBERRY
=================

Blackberry version for NearMe

Architecture:

- Apache Cordova (PhoneGap) 2.0.0:	This is the project wrapper that builds into BB WebWorks and gives access to native API's using javascript.

- Backbone.js 0.9.2: This is to aid application structure and routing.
- Underscore.js 1.3.3: This enables Micro-templating and utilities, it is a hard dependancy for backbone.
- Require.js 2.0.2: For AMD modular separation of components.
- Require text.js plugin: Enables including external templates as text strings.
- jQuery 1.7.2: for DOM manipulation.
- jQuery Mobile 1.1.0: For mobile UI and Helpers.

The general structure is separated MVC AMD modules with a HTML / CSS UI, this is a good starting point https://github.com/addyosmani/backbone-mobile-search


##Setup

Important documentation for getting up and running: http://docs.phonegap.com/en/1.9.0/guide_getting-started_blackberry_index.md.html#Getting%20Started%20with%20Blackberry

Get requirejs optimiser for nodejs:

	1. Install node http://nodejs.org/
	2. Install requirejs optimiser http://requirejs.org/docs/optimization.html
		> npm install -g requirejs

##Deployment:

When deploying to a phone you will need signing keys for the application, more information about those steps can be found at: https://developer.blackberry.com/html5/documentation/signing_setup_smartphone_apps_1920010_11.html

Run these two commands from the root of the project:

	> r.js -o www/assets/js/app.build.js
	> ant blackberry load-device