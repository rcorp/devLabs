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
				async.waterfall(
				[
				/**
				 * this function is required to pass data recieved from client
				 * @param  {Function} callback To pass data recieved from client
				 */

				function(callback) {
					callback(null, _this);
				},
				/**
				 * Step 1: Verify User
				 */
				_this.renameDocxToZip,
				/**
				 * Step 2: Check User Access Rights And Roles
				 */
				_this.unzipFile,
				_this.processFile,
				_this.zipFolder,
				_this.renameZipToDocX, 
				_this.done], function(err, result) {
					/**
					 * function to be called when all functions in async array has been called
					 */
					console.log('done ....')
				});
			},
			path:"folder wih all templates",
			fileName:"My Tempate.docx",
			fileNameWithoutExtension:"My Tempate",
			rename:function(path, oldName, newName) {
				var _this = this;
				var _callback = arguments[arguments.lengh-1]
				fs.rename(path + oldName, path + newName, function(err, data) {
					console.log(err, data.toString())
					console.log('I am a test function')
					/**
					 * call next function in series
					 * provide sufficient input to next function
					 */
					_callback(null, _this);
				})
			},
			renameDocxToZip: function(_this, callback) {
				var oldName = _this.fileNameWithoutExtension+".docx"
				var newName = _this.fileNameWithoutExtension+".zip"
				//this.rename(_this.path, oldName, newName, callback)
				callback(null, _this);
			},
			unzipFile: function(_this, callback) {
				fs.readFile("./main.js", function(err, data) {
					console.log(err, data.toString())
					console.log('I am a test function 2')
					/**
					 * call next function in series
					 * provide sufficient input to next function
					 */
					callback(null, _this);
				})
			},
			processFile: function(_this, callback) {
				var _this = this;
				fs.readFile("./main.js", function(err, data) {
					console.log(err, data.toString())
					console.log('I am a test function 3')
					/**
					 * call next function in series
					 * provide sufficient input to next function
					 */
					callback(null, _this);
				})
			},
			zipFolder: function(_this, callback) {
				var _this = this;
				fs.readFile("./main.js", function(err, data) {
					console.log(err, data.toString())
					console.log('I am a test function 4')
					/**
					 * call next function in series
					 * provide sufficient input to next function
					 */
					callback(null, _this);
				})
			},
			renameZipToDocX: function(_this, callback) {
				var _this = this;
				fs.readFile("./main.js", function(err, data) {
					console.log(err, data.toString())
					console.log('I am a test function 5')
					/**
					 * call next function in series
					 * provide sufficient input to next function
					 */
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
