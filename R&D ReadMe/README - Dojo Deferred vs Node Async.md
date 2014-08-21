Node Async vs Dojo's Deferred
=============================

#Using Dojo's Deferred - `Then`

For **Single Async Operation** using **Deferred**

1. Define a Deferred
2. Call Async Function
3. Resolve a Deferred
4. Setup callback when Deferred gets resolved then call next operation

For **Multiple Async Operation** using **Deferred**

1. Define a **Deferred** - `Def1`
2. Call **Async** Function - `Func1`
	1. Define a **Deferred** - `Def2` in Function called at Point 2
	2. Call **Async** Function - `Func2`
		1. Define a **Deferred** - `Def3` in Function called at Point 2.2
		2. Call **Async** Function - `Func3`
		3. Resolve a **Deferred**
		4. Setup callback when **Deferred** - `Def3` gets resolved then call next operation
	3. Resolve a **Deferred**
	4. Setup callback when **Deferred** - `Def2` gets resolved then call next operation
3. Resolve a **Deferred**
4. Setup callback when **Deferred** - `Def1` gets resolved then call next operation


#Using Dojo's Deferred - `When`

For **Single Async Operation** using **Deferred**

1. Define a Deferred
2. Call Async Function
3. Resolve a Deferred
4. Setup callback when Deferred gets resolved

For **Multiple Async Operation** using **Deferred**

1. Define a **Deferred** - `Def1`
2. Define a **Deferred** - `Def2`
3. Define a **Deferred** - `Def3`
4. Call **Async** Function - `Func1`
5. Resolve a **Deferred** - `Def1`
6. Setup callback - call **Async** Function `Func2` using **when** When **Deferred** - `Def1` gets resolved
7. Resolve a **Deferred** - `Def2`
8. Setup callback - call **Async** Function `Func3` using **when** When **Deferred** - `Def2` gets resolved
9. Resolve a **Deferred** - `Def3`
10. Setup callback - call **Async** Function `Func4` using **when** When **Deferred** - `Def3` gets resolved



```js
define([
		"dojo/_base/declare",
		"dojo/_base/Deferred",
		"dojo/node!fs",
	],
	function(declare, Deferred, fs) {
		return declare('App', null, {
			constructor: function(id) {
				this.defDocToZip = new Deferred();
				this.defUnZip = new Deferred();
				this.defProcess = new Deferred();
				this.defZipFolder = new Deferred();
				this.defRenameZipToDocx = new Deferred();

				this.renameDocToZip(this)

				Deferred.when(this.defDocToZip, this.unzipFile)
				Deferred.when(this.defUnZip, this.processFile)
				Deferred.when(this.defProcess, this.zipFolder)
				Deferred.when(this.defZipFolder, this.renameZipToDocX)
				Deferred.when(this.defRenameZipToDocx, this.done)
			},
			renameDocToZip: function(myThis) {
				fs.readFile("./server.js", function(err, data) {
					console.log(err, data.toString())
					console.log('I am a test function')
					myThis.defDocToZip.resolve(myThis)
				})
			},
			unzipFile: function(myThis) {
				fs.readFile("./main.js", function(err, data) {
					console.log(err, data.toString())
					console.log('I am a test function 2')
					myThis.defUnZip.resolve(myThis)
				})
			},
			processFile: function(myThis) {
				var _this = this;
				fs.readFile("./main.js", function(err, data) {
					console.log(err, data.toString())
					console.log('I am a test function 3')
					myThis.defProcess.resolve(myThis)
				})
			},
			zipFolder: function(myThis) {
				var _this = this;
				fs.readFile("./main.js", function(err, data) {
					console.log(err, data.toString())
					console.log('I am a test function 4')
					myThis.defZipFolder.resolve(myThis)
				})
			},
			renameZipToDocX: function(myThis) {
				var _this = this;
				fs.readFile("./main.js", function(err, data) {
					console.log(err, data.toString())
					console.log('I am a test function 5')
					myThis.defRenameZipToDocx.resolve(myThis)
				})
			},
			done: function() {
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

```

#Using Node's Async.js

1. SetUp **Async's WaterFall** function -  `async.waterfall`
2. Add **First Element** to Array - Basic callback Function

    ```js
    function(callback) {
	callback(null);
    }
    ```
3. Add **Second Element** to Array - `Func1` with Async - **callback** for next function in series
4. Add **Third Element** to Array - `Func2` with Async - **callback** for next function in series
5. Add **Fourth Element** to Array - `Func3` with Async - **callback** for next function in series

```js
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
				//Point to class when this gets changed
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
```


