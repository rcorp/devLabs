Node + Dojo AMD Modules
	============================

	#Setting up environment for running Dojo AMD Modules
	**Configuration**

	```js
	//Configuration Object for Dojo Loader:
	dojoConfig = {
		baseUrl: "./", // Where we will put our packages
		async: 1, // We want to make sure we are using the "modern" loader
		hasCache: {
			"host-node": 1, // Ensure we "force" the loader into Node.js mode
			"dom": 0 // Ensure that none of the code assumes we have a DOM
		},
		//Add all dojo packages you need
		packages: [{
			name: "dojo",
			location: "../../../packages/dojo"
		}, {
			name: "dojox",
			location: "../../../packages/dojox"
		}, {
			name: "dijitx",
			location: "../../../packages/dijitx"
		}],
		// This is your main file where you can call/require any dojo's class or
		// your own custom class
		deps: ['./main.js'] // And array of modules to load on "boot"
	};

	global.aspire = {};

	// Now load the Dojo loader
	// set path where your dojo.js exist
	require("../../../packages/dojo/dojo.js");
	```

	#Why this configuration?

	**Node** and **Dojo** both have their own `require` function. When we include **dojo** as a *AMD* module, then we will have two `require` functions one is of **Dojo's** and another one is of **node's**. To resolve this what **dojo** actually do is to **by-passing node.js `require` function** and use its own `require` function to require native node's packages.

	```js
		dojo/node!<native-node-package-name>"
	```

	in require to fetch native node's package

	**eg:** we need to use node's native file system package we need to call it as:

	```js
	define([
			"dojo/node!fs",
		],
		function(fs) {
		})
	```

	//we have replaced **<native-node-package-name>** by **fs**