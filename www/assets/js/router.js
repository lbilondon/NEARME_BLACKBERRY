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
    "use strict";

    return Backbone.Router.extend({

        routes: {
          "settings": "settings",
          "favourites": "favourites",
          "history": "history",
          "brands/all": "brands",
          "categories/:id": "categories",
          "venues/:id": "venues",
          "venueDetails/:id" : "venueDetails",
          "": "home",
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

        brands: function () {
          var categoriesView = new CategoriesView({
            id: 'allbrands'
          });

          this.changePage(categoriesView);
        },

        categories: function () {
          var categoriesView = new CategoriesView({
            id: 'allcategories'
          });

          this.changePage(categoriesView);
        },

        venues: function () {

        },

        venueDetails: function () {

        },

        favourites: function () {

        },

        changePage: function (page) {
          console.log(page);
          page.$el.attr('data-role', 'page');
          $('body').append(page.$el);
          $.mobile.changePage(page.$el, {changeHash:false});
        }
    });
  }
);
