// Hi I am your custom class
define([
		"dojo/_base/declare",
		"dojo/_base/Deferred",
		"dojo/node!fs",
		"dojo/node!async"
	],
	function(declare, Deferred, fs, async) {
		return declare('App', null, {
			constructor: function(id) {
				console.log('I am a constructor')
				var _this = this;
				async.waterfall([

					function(callback) {
						callback(null, _this);
					},
					_this.renameDocxToZip,
					_this.unzipFile,
					_this.processFile,
					_this.zipFolder,
					_this.renameZipToDocX,
					_this.done
				], function(err, result) {
					console.log('done ....')
				});
			},
			path: "folder wih all templates",
			fileName: "My Tempate.docx",
			fileNameWithoutExtension: "My Tempate",
			rename: function(path, oldName, newName) {
				var _this = this;
				var _callback = arguments[arguments.lengh - 1]
				fs.rename(path + oldName, path + newName, function(err, data) {
					console.log(err, data.toString())
					console.log('I am a test function')
					/**
					 * call next function in series and
					 * provide sufficient input to next function
					 */
					_callback(null, _this);
				})
			},
			renameDocxToZip: function(_this, callback) {
				var oldName = _this.fileNameWithoutExtension + ".docx"
				var newName = _this.fileNameWithoutExtension + ".zip"
				callback(null, _this);
			},
			unzipFile: function(_this, callback) {
				fs.readFile("./main.js", function(err, data) {
					console.log(err, data.toString())
					console.log('I am a test function 2')
					callback(null, _this);
				})
			},
			processFile: function(_this, callback) {
				var _this = this;
				fs.readFile("./main.js", function(err, data) {
					console.log(err, data.toString())
					console.log('I am a test function 3')
					callback(null, _this);
				})
			},
			zipFolder: function(_this, callback) {
				var _this = this;
				fs.readFile("./main.js", function(err, data) {
					console.log(err, data.toString())
					console.log('I am a test function 4')
					callback(null, _this);
				})
			},
			renameZipToDocX: function(_this, callback) {
				var _this = this;
				fs.readFile("./main.js", function(err, data) {
					console.log(err, data.toString())
					console.log('I am a test function 5')
					callback(null, _this);
				})
			},
			done: function(_this, callback) {
				console.log('I am done')
				console.log('I am done')
				console.log('I am done')
				console.log('I am done')
				console.log('I am done')
				console.log('I am done')
				console.log('I am done')
				console.log('I am done')
			}
		})
	})