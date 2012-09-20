/*global _, Backbone*/
define([
	'underscore',
	'backbone',
	'models/category.model'
],
function(UnderscoreLib, BackboneLib, CategoryModel) {

	var useStub = true;

	var imgStub = {
		"001": "./assets/img/icons/Categories/Bank.png",
		"002": "./assets/img/icons/Categories/Beauty.png",
		"003": "./assets/img/icons/Categories/Book-Shop.png",
		"004": "./assets/img/icons/Categories/Cinema.png",
		"005": "./assets/img/icons/Categories/Coffee-Shop.png",
		"006": "./assets/img/icons/Categories/Hospital.png",
		"007": "./assets/img/icons/Categories/Hotel.png",
		"008": "./assets/img/icons/Categories/Nightclub.png",
		"009": "./assets/img/icons/Categories/Parking.png",
		"010": "./assets/img/icons/Categories/Petrol-Station.png",
		"011": "./assets/img/icons/Categories/Pharmacy.png",
		"012": "./assets/img/icons/Categories/Pizza.png",
		"013": "./assets/img/icons/Categories/Pub.png",
		"014": "./assets/img/icons/Categories/Restaurant.png",
		"015": "./assets/img/icons/Categories/Spa.png",
		"016": "./assets/img/icons/Categories/Supermarket.png",
		"017": "./assets/img/icons/Categories/Taxi.png",
		"018": "./assets/img/icons/Categories/Veterinary.png",
		"019": "./assets/img/icons/Categories/Hairdresser.png",
		"020": "./assets/img/icons/Categories/Shoe-Shop.png",
		"021": "./assets/img/icons/Categories/Post-Office.png",
		"022": "./assets/img/icons/Categories/Clothing-Shop.png",
		"023": "./assets/img/icons/Categories/Gym.png",
		"024": "./assets/img/icons/Categories/Auto-Repair.png",
		"025": "./assets/img/icons/Categories/Hostel.png",
		"026": "./assets/img/icons/Categories/Computer.png",
		"027": "./assets/img/icons/Categories/Museum.png",
		"028": "./assets/img/icons/Categories/Pet-Shop.png",
		"029": "./assets/img/icons/Categories/Bus-Station.png",
		"031": "./assets/img/icons/Categories/Shopping-Centre.png",
		"032": "./assets/img/icons/Categories/Theatre.png",
		"035": "./assets/img/icons/Categories/Train-Station.png",
		"036": "./assets/img/icons/Categories/Travel.png",
		"037": "./assets/img/icons/Categories/Bag-Shop.png",
		"038": "./assets/img/icons/Categories/Bakery.png",
		"039": "./assets/img/icons/Categories/Bike-Shop.png",
		"042": "./assets/img/icons/Categories/Fast-Food.png",
		"043": "./assets/img/icons/Categories/Flower-Shop.png",
		"044": "./assets/img/icons/Categories/Music.png",
		"046": "./assets/img/icons/Categories/Attraction.png",
		"047": "./assets/img/icons/Categories/Computer.png",
		"048": "./assets/img/icons/Categories/Phone.png",
		"050": "./assets/img/icons/Categories/Photography.png",
		"051": "./assets/img/icons/Categories/Bar.png",
		"052": "./assets/img/icons/Categories/Eyewear.png",
		"053": "./assets/img/icons/Categories/DIY.png",
		"054": "./assets/img/icons/Categories/Furniture.png",
		"055": "./assets/img/icons/Categories/Stationery.png",
		"059": "./assets/img/icons/Categories/DIY.png",
		"060": "./assets/img/icons/Categories/Toy.png",
		"103": "./assets/img/icons/Categories/Attraction.png",
		"104": "./assets/img/icons/Categories/Health-Food.png",
		"106": "./assets/img/icons/Categories/Charity-Shop.png",
		"107": "./assets/img/icons/Categories/Locksmith.png",
		"062": "./assets/img/icons/Categories/Pub.png",
		"063": "./assets/img/icons/Categories/Shoe-Shop.png"
	};

	return Backbone.Collection.extend({
		model: CategoryModel,
		url: function () {
			if (useStub) {
				return './assets/js/dataStub/cat_listing_0.json';
			}
		},
		fetchFromId: function (id, options) {
			if (id === 'brands') {
				this.url = './assets/js/dataStub/cat_listing_0.json';
			}
			return this.fetch(options);
		},

		parse: function (response) {
			if (response.response !== undefined) {
				var tmp = {},
					rtnArr = [];
				for (var i = 0; i < response.response.categories.length; i++) {
					tmp = response.response.categories[i];

					if (tmp.iconUrl === null) {
						if (imgStub[tmp.id] !== undefined) {
							tmp.iconUrl = imgStub[tmp.id];
							rtnArr[rtnArr.length] = tmp;
						}
					} else {
						rtnArr[rtnArr.length] = tmp;
					}
				}

				return rtnArr;
			}
		}
	});
});