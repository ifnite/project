<?php 
	header('Content-type: text/json');
	/*获取当前页码*/
	if($_SERVER['REQUEST_METHOD']=="GET"&&isset($_GET["pagenumber"]))
		{
		$start=($_GET['pagenumber']-1)*9;
		$tablename=$_GET["tablename"];
		/*执行数据库操作*/
		$mysqli = new mysqli("127.0.0.1", "webGet", "", "stuhome");
		if ($mysqli->connect_errno) {
	   		header("Location: 404.php");//连接失败指向404页面
		}
		/*处理数据*/
		mysqli_query($mysqli,'SET NAMES UTF8');  
		$res = mysqli_query($mysqli, "SELECT id,title,bref,tag,postTime,poster FROM $tablename LIMIT $start,9");
		if (!$res) {
			// $res->close();//断开结果连接
			$mysqli->close();
	   		header("Location: 404.php");//没有找到结果，指向404页面
		}
		else {
			$results=array();
			$i=0;
			while ($row = $res->fetch_assoc()) {
				$results[$i]=$row;
				$i++;
			}
			$output=json_encode($results);
			echo $output;
			$res->close();//断开结果连接
			$mysqli->close();
		}
		
	}
	else{
		header("Location: 404.php");
	}
	
	
 ?>
