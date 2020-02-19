<?php
function checkinput($data) {
	$data = strip_tags($data);
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}
function getData($data, $lang, $langDefault = 'fa') {
	return isset($data[$lang]) ? $data[$lang] : $data[$langDefault];
}
?>