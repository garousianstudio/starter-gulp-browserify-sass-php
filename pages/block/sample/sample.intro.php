<?php
$data = array(
	'fa' => (object)array(
		'sprite' => 'نمونه‌ استفاده از sprite.svg',
		'title' => 'عنوان در اینجا قرار می‌گیرد',
		'subtitle' => 'یک زیرعنوان برای این بخش',
		'content' => 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.',
		'btn' => 'کلیک کنید',
	),
	'en' => (object)array(
		'sprite' => 'sample use of sprite.svg',
		'title' => 'A title goes here',
		'subtitle' => 'A subtitle goes here',
		'content' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium quas alias expedita ut sit minima, itaque qui aut, soluta! Modi quia distinctio, fugiat molestiae ea at itaque mollitia quod quidem!',
		'btn' => 'Click Here',
	),
);

$data = getData($data, $config->lang);
?>

<p style="margin: 10px 0;"><?=$data->sprite?></p>
<div id="icon">
	<svg style="width: 30px; height: 30px;">
		<use xlink:href="<?=$config->sprite?>#twitter"></use>
	</svg>
</div>

<div class="section">
	<p class="title"><?=$data->title?></p>
	<p class="subtitle"><?=$data->subtitle?></p>
	<p class="content"><?=$data->content?></p>
	<br/>
	<button id="btn" style="padding: 7px 20px; color: #fff; background-color: tomato;"><?=$data->btn?></button>
</div>