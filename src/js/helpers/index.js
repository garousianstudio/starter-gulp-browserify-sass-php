import $ from 'jquery';

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

function getMeta(name) {
	return $('meta[property=' + JSON.stringify(name) + ']').attr('content');
};

global.$window = $(window);
global.$document = $(document);
global.$body = $('body');
global.$page = $('.page');

global.BASEURL = getMeta('baseurl');
global.LANG = getMeta('lang');
global.DIR = getMeta('dir');

