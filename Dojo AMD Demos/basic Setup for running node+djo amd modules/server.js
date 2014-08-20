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