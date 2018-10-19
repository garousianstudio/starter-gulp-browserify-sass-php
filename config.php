<?php
include 'pages/func/functions.php';

$config = (object)array(
	'isDev' => true, // whether in 'development' or 'production' mode
	'isLocal' => true, // local or on server
	'isHttps' => false, // useful when on server
	'baseUrl' => '', // base url of project (for assets)
	'root' => __DIR__, // directory path to root of project (for php blocks if needed)
	'lang' => 'fa',
	'dir' => 'rtl', // oneof(['rtl', 'ltr'])
	'css' => 'public/css/main.css', // only used in production
	'js' => 'public/js/script.js',
	'sprite' => 'public/images/sprite.svg',
	'hash' => 'sdfsdf', // hash for cache busting (preventing the browser to cache assets)
);

// set baseUrl in local/server
if($config->isLocal){
	$config->baseUrl = 'http://localhost/starters/starter-gulp-browserify-sass-php/';
}else{
	$config->isHttps = (@$_SERVER['HTTPS'] == 'on' || @$_SERVER['SERVER_PORT'] == 443) ? true : false;
	$config->baseUrl = ($config->isHttps ? "https" : "http") . '://' . $_SERVER['HTTP_HOST'] . '/';
}

$config->css = $config->baseUrl . $config->css;
$config->js = $config->baseUrl . $config->js;
$config->sprite = $config->baseUrl . $config->sprite;

if(isset($_GET['lng']) && !empty($_GET['lng'])){
	$lang = checkinput($_GET['lng']);
	$lang = explode("-", $lang);
	$lang = $lang[0];
	$lang = strtolower($lang);
	$config->lang = $lang;
}

switch ($config->lang) {
	case 'fa':
		$config->dir = 'rtl';
		break;
	case 'en':
		$config->dir = 'ltr';
		break;
}
?>