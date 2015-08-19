<?php 
	header('Content-type: text/json');
	$title=mysql_real_escape_string($_POST["title"]);//题目
	$auther=mysql_real_escape_string($_POST["auther"]);//作者
	$pauther=mysql_real_escape_string($_POST["pauther"]);//图片作者
	$origin=mysql_real_escape_string($_POST["origin"]);//来源
	$kind=mysql_real_escape_string($_POST["kind"]);//分类
	$html=mysql_real_escape_string($_POST["html"]);//正文
	$tags=mysql_real_escape_string($_POST["tags"]);//
	$poster=mysql_real_escape_string($_POST["poster"]);
	$bref=mysql_real_escape_string($_POST["bref"]);

	/*连接数据库*/
	$mysqli = new mysqli("127.0.0.1", "webGet", "", "stuhome");
	/*操作数据表*/
	$id=$kind.date("YmdHis");
	$postTime=date("Y-m-d H-i-s");
	mysqli_query($mysqli,'SET NAMES UTF8');
	$query="INSERT INTO `waittopost`(`id`, `title`, `author`, `origin`,`bref`, `main`, `postTime`, `poster`, `toTop`, `tag`, `kind`) VALUES ($id,'$title','$auther','$origin','$bref','$html','$postTime','$poster',0,'$tags','$kind')";
	$res = mysqli_query($mysqli,$query);
	$mysqli->close();
	if($res){
		$results['success']=1;
	}
	else{
		$results['success']=0;
	}
	echo json_encode($results)



 ?>