/*global _, Backbone*/
define([
	'underscore',
	'backbone'
],
function(UnderscoreLib, BackboneLib) {
	// "use strict";

	return Backbone.Model.extend({
		defaults: {
			'is_metric': true
		},

		idAttribute: 'modelId',

		initialize : function() {
			
		},

		fileSystemSave: function () {
			if (window.requestFileSystem) {
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.saveFile, this.fail);
			}
		},

		fileSystemRead: function () {
			if (window.requestFileSystem) {
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.getFile, this.fail);
			}
		},

		saveFile: function (fileSystem) {
			fileSystem.root.getFile('settings.txt', { create: true, exclusive: false}, this.writeFile, this.fail);
		},

		getFile: function (fileSystem) {
			fileSystem.root.getFile('settings.txt', null, this.readFile, this.fail);
		},

		writeFile: function (file) {
			file.createWriter(function(writer) {

				writer.onwriteend = function (evt) {
					console.log('file written');
				};

				writer.write();
			}, this.fail);
		},

		readFile: function (file) {
			var reader = new FileReader();
			var result = null;
			reader.onloadend = function (evt) {
				result = evt.target.result;
			};
			reader.readAsText(file);
		},

		fail: function (error) {
			console.log('ERR: ' + error.code);
		}
	});
});