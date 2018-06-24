<?php
	require_once('../core/functions.php');

	$page_title = '';
	$page_desc = '';
	$page_url = '';
	$page_image = '';
?>
<!DOCTYPE html>
<html lang="fa">
	<head>
		<?php
			include 'common/block.favicon.php';
			include 'common/block.meta.php';
			include 'common/block.head.php';
		 ?>
	</head>
	<body>
		<div class="page page-home">
			<?php include 'block/index/block.index.intro.php' ?>
		</div>

		<?php include 'common/block.js.php'; ?>
	</body>
</html>
