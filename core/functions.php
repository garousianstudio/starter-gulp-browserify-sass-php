<?php
class phone{
	public $href;
	public $result;

	public function __construct($data,$by='-',$splitNum) {
		if($data && !empty($data)) {
			$href = str_replace($by,'',$data);
			$href = str_replace(' ','',$href);

			$data = explode($by,$data);

			$result = '<bdo dir="ltr">';
			$phoneNum = '';
			$chunkNum;

			switch (count($data)) {
				case 1:
					$phoneNum = $data[0];
					break;
				case 2:
					$result .= '<i>' . $data[0] . '</i>';
					$phoneNum = $data[1];
					break;
				case 3:
					$result .= '<i>' . $data[0] . '</i>';
					$result .= '<i>' . $data[1] . '</i>';
					$phoneNum = $data[2];
					break;
			}
			if($splitNum !== 0){
				$chunkNum = ceil(strlen($phoneNum)/$splitNum);
				for ($i=0; $i < $chunkNum; $i++) {
					$result .= '<span>' . substr($phoneNum, $i*$splitNum ,$splitNum) . '</span>';
				}
			}else{
				$result .= '<span>' . $phoneNum . '</span>';
			}


			$result .= '</bdo></a>';

			$this->href = $href;
			$this->result = $result;
			$this->number = $data[1];
		}
	}
}

function persianToLatin($data){
	$persian_num = array('۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹');
	$latin_num = range(0, 9);

	$string = str_replace($persian_num, $latin_num, $data);

	return $string;
}

function latinToPersian($data){
	$persian_num = array('۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹');
	$latin_num = range(0, 9);

	$string = str_replace($latin_num,$persian_num, $data);

	return $string;
}

function limit_text($text, $limit) {
  if (str_word_count($text, 0) > $limit) {
      $words = str_word_count($text, 2);
      $pos = array_keys($words);
      $text = substr($text, 0, $pos[$limit]) . '...';
  }
  return $text;
}

function tokenTruncate($string, $your_desired_width) {
  $parts = preg_split('/([\s\n\r]+)/', $string, null, PREG_SPLIT_DELIM_CAPTURE);
  $parts_count = count($parts);

  $length = 0;
  $last_part = 0;
  for (; $last_part < $parts_count; ++$last_part) {
    $length += strlen($parts[$last_part]);
    if ($length > $your_desired_width) { break; }
  }

  return implode(array_slice($parts, 0, $last_part)) . '...';
}
?>