// Hi I am your custom class
define([
		"dojo/_base/declare",
		"dojo/node!fs",
	],
	function(declare, fs) {
		return declare('App', null, {
			constructor: function(id) {
				console.log('I am a constructor')
			},
			testFunc: function() {
				console.log('I am a test function')
			}
		})
	})