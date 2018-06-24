<?php
	require_once('../core/functions.php');

	$page_title = '';
	$page_desc = '';
	$page_url = '';
	$page_image = '';
?>
<!DOCTYPE html>
<html>
	<head>
		<?php
			include 'common/block.favicon.php';
			include 'common/block.meta.php';
			include 'common/block.head.php';
		 ?>
	</head>
	<body class="en">
		<div class="page page-home">
			<h1>Start Building a Website</h1>
			<a href="../fa">Farsi Version</a>

			<?php include 'block/index/block.index.intro.php' ?>
		</div>

		<?php include 'common/block.js.php'; ?>
	</body>
</html>
