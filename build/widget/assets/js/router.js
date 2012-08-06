/*global $, Backbone, _*/
define([
    'jquery',
    'jqueryMobile',
    'underscore',
    'backbone',
    'views/home.view',
    'views/settings.view',
    'views/history.view',
    'views/favourites.view',
    'views/categories.view',
    'views/venues.view',
    'views/venueDetails.view'
],
function(Jquery, JqueryMobileLib, UnderscoreLib, BackboneLib, HomeView, SettingsView, HistoryView, FavouritesView, CategoriesView, VenuesView, VenueDetailsView) {
    // "use strict";

    var homeView = null,
        settingsView = null;

    function _handleHardwareButton () {
        if (window.blackberry) {
            blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK,
                function() {
                    if (window.history.length > 0) {
                        window.history.back();
                        return false;
                    }
                    // ToDo: Figure out why this doesn't work.
                    // else if (blackberry.app) {
                    //     blackberry.app.exit();
                    // }
                }
            );
        }
    }

    return Backbone.Router.extend({
        routes: {
            "settings": "settings",
            "favourites": "favourites",
            "history": "history",
            "brands__:id": "brands",
            "categories__:id": "categories",
            "venues__:cat_id": "venues",
            "venueDetails__:venue_id" : "venueDetails",
            "": "home"
        },

        initialize: function () {
            _handleHardwareButton();
        },

        settings: function () {
            var settingsView = new SettingsView({
                id: 'settings'
            });
            this.changePage(settingsView);
        },

        favourites: function () {
            var favouritesView = new FavouritesView({
                id: 'favourites'
            });

            this.changePage(favouritesView);
        },

        history: function () {
            var historyView = new HistoryView({
                id: 'history'
            });

            this.changePage(historyView);
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
            if (cat_id !== undefined) {
                var venuesView = new VenuesView({
                    id: 'venues',
                    category_id: cat_id
                });
                this.changePage(venuesView);
                //cache venues
            }
        },

        venueDetails: function ( venue_id ) {
            if (venue_id !== undefined) {
                var venueDetailsView = new VenueDetailsView({
                    id: 'venueDetails',
                    venue_id: venue_id
                });
                this.changePage(venueDetailsView);
            }
        },

        home: function () {
            var homeView = new HomeView({
                id: 'home'
            });

            this.changePage(homeView);
        },

        changePage: function (page) {
            if (page !== undefined) {
                page.$el.attr({ 'data-role': 'page' });
                $('body').append(page.$el);

                page.$el.on('pagehide', function (event, ui) {
                    $(event.currentTarget).find("a[href^='#'], a[href^='/']").off('tap');
                    $(event.currentTarget).remove();
                });
                this.bindEvents(page);
                
                $.mobile.changePage(page.$el, { changeHash: true, transition: 'none' });
            }
        },

        bindEvents: function (page) {
            this.bindBackEvent(page);
            this.bindInternalLinkTapEvent(page);
        },

        unbindEvents: function (page) {
            this.unbindBackEvent(page);
            this.unbindInternalLinkTapEvent(page);
        },

        refreshEventBindings: function (page) {
            this.unbindEvents(page);
            this.bindEvents(page);
        },

        bindBackEvent: function (page) {
            page.$el.on('pageshow', function (e) {
                $(e.currentTarget).find('[data-rel="back"]').on('tap', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (window.history.length > 0) {
                        window.history.back();
                    }
                });
            });
        },

        unbindBackEvent: function (page) {
            page.$el.find('[data-rel="back"]').off('tap');
        },

        bindInternalLinkTapEvent: function (page) {
            var that = this;
            page.$el.find("a[href^='#'], a[href^='/']").on('tap', function (e) {
                e.preventDefault();
                e.stopPropagation();

                var href = $(this).attr('href').toString();
                if (href.charAt(0) === '/') {
                    href = '#' + href.substr(1, href.length);
                }
            
                //HACK TO STOP BACKBONE NAVIGATE SWITCHING TO PUSH STATE
                href = href.replace('/', '__');
                that.navigate( href, { trigger: true, replace: false });
            });
        },

        unbindInternalLinkTapEvent: function (page) {
            page.$el.find("a[href^='#'], a[href^='/']").off('tap');
        }
    });
  }
);