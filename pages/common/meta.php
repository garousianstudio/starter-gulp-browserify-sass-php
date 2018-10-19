<?php
if(!isset($page_keywords)){
	$page_keywords = '';
}
?>

<title><?php echo $page_title; ?></title>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="title" content="<?=$page_title?>">
<meta name="description" content="<?=$page_desc?>">
<meta name="keywords" content="<?=$page_keywords?>">

<meta property="og:title" content="<?=$page_title?>">
<meta property="og:url" content="<?=$page_url?>">
<meta property="og:image" content="<?=$page_image?>">
<meta property="og:image:width" content="500">
<meta property="og:image:height" content="340">
<meta property="og:description" content="<?=$page_desc?>">

<meta property="baseurl" content="<?=$config->baseUrl?>">
<meta property="lang" content="<?=$config->lang?>">
<meta property="dir" content="<?=$config->dir?>">
