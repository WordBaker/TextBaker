<?php
error_reporting(8191);
session_start ();

// echo json_encode($_POST);
if (! isset ( $_POST ['passage'] )) {
	include 'index.html';
	exit ();
}
function generate($gTeaser, $gtitle, $gpassage) {
	require 'noxss.php';
	$xss = new XssHtml ( $gpassage );
	$gpassage = $xss->getHtml ();
	$xss1 = new XssHtml ( $gTeaser );
	$gTeaser = $xss1->getHtml ();
	$xss2 = new XssHtml ( $gtitle );
	$gtitle = $xss2->getHtml ();
	$pages = array ();
	$finaldata = array ();
	if (isset ( $gTeaser )) {
		$teaser = '<h5><strong>' . $gTeaser . '</strong></h5>';
	}
	if (isset ( $gtitle )) {
		$title = '<h1>' . $gtitle . '</h1>';
	}
	if (isset ( $gpassage )) {
		$pages = explode ( "\r\n\r\n", $gpassage );
		//echo json_encode ( $pages );
		foreach ( $pages as $passage ) {
			$passage = str_replace ( '(', '<small>', $passage );
			$passage = str_replace ( ')', '</small>', $passage );
			$passage = str_replace ( '[', '<span class="reveal">', $passage );
			$passage = str_replace ( ']', '</span>', $passage );
			$passage = str_replace ( "\n", '<br>', $passage );
			$passage = '<p>' . $passage . '</p>';
			
			array_push ( $finaldata, $passage );
		}
	}
	;
	$finaldata [0] = $teaser . $title . $finaldata [0];
	return $finaldata;
}
$text = (json_encode ( generate ( $_POST ['Teaser'], $_POST ['title'], $_POST ['passage'] ) ));
$_SESSION ['text'] = $text;
if ( $_POST ['file']!=123 ) {
	$fname = md5 ( $text.time().'.txt');
	$fname=$fname.'.baker';
	Header("Content-type: application/octet-stream");
	Header("Accept-Ranges: bytes");
	Header("Accept-Length: ".strlen(base64_encode($text)));
	Header("Content-Disposition: attachment; filename=" .$fname);
	echo base64_encode($text);
}
else header ( "Location: view.html" );


?>
