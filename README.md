NEARME_BLACKBERRY
=================

Blackberry version for NearMe

Architecture:

- Apache Cordova (PhoneGap) 1.9.0:	This is the project wrapper that builds into BB WebWorks and gives access to native API's using javascript.

- Backbone.js 0.9.2: This is to aid application structure and routing.
- Underscore.js 1.3.3: This enables Micro-templating and utilities, it is a hard dependancy for backbone.
- Require.js 2.0.2: For AMD modular separation of components.
- Require text.js plugin: Enables including external templates as text strings.
- jQuery 1.7.2: for DOM manipulation.
- jQuery Mobile 1.1.0: For mobile UI and Helpers.

The general structure is separated MVC AMD modules with a HTML / CSS UI, this is a good starting point https://github.com/addyosmani/backbone-mobile-search


##Setup

Important documentation for getting up and running: http://docs.phonegap.com/en/1.9.0/guide_getting-started_blackberry_index.md.html#Getting%20Started%20with%20Blackberry

##Deployment:

Run these two commands from the root of the project:

	> ant blackberry build
	> ant blackberry load-device