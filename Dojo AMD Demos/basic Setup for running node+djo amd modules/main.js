//Hi I am main file that can require another dojo classes or your own custom classes
require([
		"./App.js"
	],
	function(App) {
		var app = new App();
	})