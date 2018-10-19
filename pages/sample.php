<?php
	include '../config.php';

	$page_title = 'Sample Page';
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
		<div class="page page-sample">
			<?php include 'block/sample/sample.intro.php'; ?>
		</div>

		<?php include 'common/js.php'; ?>
	</body>
</html>
