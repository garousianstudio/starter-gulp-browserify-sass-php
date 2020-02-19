<?php
	include '../config.php';

	$page_title = '';
	$page_desc = '';
	$page_url = '';
	$page_image = '';
?>
<!DOCTYPE html>
<html lang="<?=$config->lang?>" class="<?=$config->dir?>">
	<head>
		<?php
			include 'common/favicon.php';
			include 'common/meta.php';
			include 'common/head.php';
		 ?>
	</head>
	<body>
		<div class="page page-about">
			<h1>صفحه درباره</h1>
		</div>

		<?php include 'common/js.php'; ?>
	</body>
</html>
