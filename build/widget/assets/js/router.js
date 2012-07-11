/*global $, Backbone, _*/
define([
    'jquery',
    'jqueryMobile',
    'underscore',
    'backbone',
    'views/home.view',
    'views/settings.view',
    'views/categories.view'
  ],
  function(Jquery, JqueryMobileLib, UnderscoreLib, BackboneLib, HomeView, SettingsView, CategoriesView) {
    // "use strict";

    var homeView = null,
        settingsView = null;


    function _bindEvents (page) {

        page.$el.find("a[href^='#'], a[href^='/']").bind('tap', function (e) {
            e.preventDefault();
            e.stopPropagation();

            var href = $(this).attr('href').toString();

            if (href.charAt(0) === '/') {
              href = '#' + href.substr(1, href.length);
            }
            
            //HACK TO STOP BACKBONE NAVIGATE SWITCHING TO PUSH STATE
            href = href.replace('/', '&#47;');
            
            window.APP_ROUTER.navigate( href, { trigger: true, replace: true })
        });
    }

    return Backbone.Router.extend({
        routes: {
          "settings": "settings",
          "favourites": "favourites",
          "history": "history",
          "brands&#47;:id": "brands",
          "categories&#47;:id": "categories",
          "venues&#47;:cat_id": "venues",
          "venueDetails&#47;:venue_id" : "venueDetails",
          "": "home"
        },
 
        home: function () {
          var homeView = new HomeView({
            id: 'home'
          });

          this.changePage(homeView);
        },

        settings: function () {
          var settingsView = new SettingsView({
            id: 'settings'
          });
          this.changePage(settingsView);
        },

        brands: function ( id ) {
          if (id === 'all') {
            id = 'brands';
          }

          var categoriesView = new CategoriesView({
            id: 'categories',
            category_id: id
          });

          this.changePage(categoriesView);
        },

        categories: function ( id ) {
          if (id === 'all') {
            id = 'categories';
          }
          var categoriesView = new CategoriesView({
            id: 'categories',
            category_id: id
          });
          this.changePage(categoriesView);
        },

        venues: function ( cat_id ) {

        },

        venueDetails: function ( venue_id ) {

        },

        favourites: function () {

        },

        changePage: function (page) {
          page.$el.attr({ 'data-role': 'page' });
          $('body').append(page.$el);

          page.$el.on('pagehide', function (event, ui) {
            $(event.currentTarget).find("a[href^='#'], a[href^='/']").off('tap');
            $(event.currentTarget).remove();
          });
          _bindEvents(page);

          $.mobile.changePage(page.$el, { changeHash: true, transition: 'none' });
        }
    });
  }
);
