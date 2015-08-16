<?php 
	header('Content-type: text/json');
	error_reporting(E_ALL & ~E_NOTICE);
	$mysqli = new mysqli("127.0.0.1", "webGet", "", "stuhome");
	mysqli_query($mysqli,'SET NAMES UTF8');  
	if(isset($_GET['mainnews'])){
		$mainNews = mysqli_query($mysqli, "SELECT id,title FROM mainnews LIMIT 7");
		$mnews=array();
		$i=0;
		while ($n=$mainNews->fetch_assoc()) {
			$mnews[$i]=$n;
			$i++;
		}
		$mainNews->close();
	}
	if(isset($_GET['pictures'])){
		$topPictures = mysqli_query($mysqli, "SELECT url FROM indexpicture LIMIT 5");
		$pictures=array();
		$n=0;
		while ($p=$topPictures->fetch_assoc()) {
			$pictures[$n]=$p;
			$n++;
		}
		$topPictures->close();
	}
	if(isset($_GET['othernews'])){
		$otherNews = mysqli_query($mysqli, "SELECT id,title,depart FROM othernews LIMIT 5");
		$onews=array();
		$oi=0;
		while ($q=$otherNews->fetch_assoc()) {
			$onews[$oi]=$q;
			$oi++;
		}
		$otherNews->close();
	}
	if(isset($_GET['topnews'])){
		$maintop = mysqli_query($mysqli, "SELECT id,title,bref,poster FROM mainnews  where toTop=1 order by postTime limit 1");
		$othertop= mysqli_query($mysqli, "SELECT id,title,depart,poster FROM othernews where toTop=1 order by postTime limit 1");
		$tops=array();
		$tops[0]=$maintop->fetch_assoc();
		$tops[1]=$othertop->fetch_assoc();
		$maintop ->close();
		$othertop->close();
	}
	
	$result=array('mainnews'=>$mnews,'pictures'=>$pictures,'othernews'=>$onews,'tops'=>$tops);
	echo json_encode($result);
	$mysqli->close();
 ?>