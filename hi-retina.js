/*
 * hiRetina v0.1
 * Simple vanilla JS to 
 * load hi-res images on dependency
 *
 * Author: jrudenstam
 * http://typisktmig.se
 */

define(['helper'], function( h ){
	var hiRetina = {
		defaults: {
			hiResAttr: 'data-hi-retina-src',
			hiResWidth: 1024,
			lowResWidth: 512,
			domClass: 'hi-retina'
		},

		collection: [],

		pixelRatio: window.devicePixelRatio || 1,

		go: function( settings ){
			// Extend settings
			this.settings = h.create(this.defaults);

			if (settings) {
				for (var setting in settings) {
					this.settings[setting] = settings[setting];
				}
			}

			// Get elements
			if (this.settings.collection === undefined) {
				this.settings.collection = h.getByClass(this.settings.domClass, document, false);
			}

			// Dont swap images (for debugging purposes)
			if (this.getQueryParamByName('hiretina') == 'false') {
				return;
			}

			// Loop em thru
			for (var i = 0; i < this.settings.collection.length; i++) {
				this.hiLoad(this.settings.collection[i]);
			};
		},

		hiLoad: function( img ){
			var targetWidth =  img.parentNode.clientWidth * this.pixelRatio,
			needHiRes  = (targetWidth > this.settings.lowResWidth);

			// If image had hi-res and need hi-res
			if ( h.getAttribute(img, this.settings.hiResAttr) && needHiRes ) {
				img.src = h.getAttribute(img, this.settings.hiResAttr);
			}
		},

		getQueryParamByName: function ( name ) {
			var name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]"),
			regexS = "[\\?&]" + name + "=([^&#]*)",
			regex = new RegExp(regexS),
			results = regex.exec(window.location.search);

			if (results === null) {
					return "";
			} else {
					return decodeURIComponent(results[1]);
			}
		}

	}

	return hiRetina;
});