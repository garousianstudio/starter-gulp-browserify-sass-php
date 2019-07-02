import $ from 'jquery';

/**
 * define helper object
 */
const h = {};

h.requestAnimationFrame = window.requestAnimationFrame
			|| window.mozRequestAnimationFrame
			|| window.webkitRequestAnimationFrame
			|| window.msRequestAnimationFrame;

h.cancelAnimationFrame = window.cancelAnimationFrame
			|| window.mozCancelAnimationFrame;

// media query breakpoints
h.SCREEN = {
	XS: 500,
	SM: 800,
	MD: 1050,
	LG: 1440
};

h.$window = $(window);
h.$document = $(document);
h.$body = $('body');
h.$page = $('.page');

// check 'meta.php' for more info
h.BASEURL = getMeta('baseurl');
h.LANG = getMeta('lang');
h.DIR = getMeta('dir');


function getMeta(name) {
	return $('meta[property=' + JSON.stringify(name) + ']').attr('content');
};

export default h;