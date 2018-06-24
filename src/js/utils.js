global.$ = require('jquery');
global.jQuery = require('jquery');

global.windowWidth = window.innerWidth
			|| document.documentElement.clientWidth //IE <= 8
			|| document.body.clientWidth;

global.windowHeight = window.innerHeight
			|| document.documentElement.clientHeight //IE <= 8
			|| document.body.clientHeight;

global.requestAnimationFrame = window.requestAnimationFrame
			|| window.mozRequestAnimationFrame
			|| window.webkitRequestAnimationFrame
			|| window.msRequestAnimationFrame;

global.cancelAnimationFrame = window.cancelAnimationFrame
			|| window.mozCancelAnimationFrame;

// media query breakpoints
global.SCREEN = {
	XS: 500,
	SM: 800,
	MD: 1050,
	LG: 1440
};

global.$window = $(window);
global.$document = $(document);
global.$body = $('body');
global.$page = $('.page');

$window.resize(function(){
	global.windowWidth = window.innerWidth
				|| document.documentElement.clientWidth //IE <= 8
				|| document.body.clientWidth;

	global.windowHeight = window.innerHeight
				|| document.documentElement.clientHeight //IE <= 8
				|| document.body.clientHeight;
});