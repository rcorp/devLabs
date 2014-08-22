//Hi I am main file that can require another dojo classes or your own custom classes
require([
		"./App.js",
		"../DojoAndAsyncDemo.js"
	],
	function(App, DojoAndAsyncDemo) {
		var app = new App();
		var asyncDojo = new DojoAndAsyncDemo();
	})