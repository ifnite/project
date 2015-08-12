<?php 
	header('Content-type: text/json');
	/*获取当前页码*/
	if($_SERVER['REQUEST_METHOD']=="GET"&&isset($_GET["tablename"]))
		{
		$tablename=$_GET['tablename'];
		/*执行数据库操作*/
		$mysqli = new mysqli("127.0.0.1", "webGet", "", "stuhome");
		if ($mysqli->connect_errno) {
	   		header("Location: 404.php");//连接失败指向404页面
		}
		/*处理数据*/
		mysqli_query($mysqli,'SET NAMES UTF8');  
		$res = mysqli_query($mysqli, "SELECT count(*) FROM $tablename");
		if (!$res) {
			$res->close();//断开结果连接
			$mysqli->close();
	   		header("Location: 404.php");//没有找到结果，指向404页面
		}
		else {
			$result=array();
			$row = $res->fetch_array();
			$result['count']=$row[0];
			$output=json_encode($result);
			echo $output;
			$res->close();//断开结果连接
			$mysqli->close();
		}
		
	}
	else{
		header("Location: 404.php");
	}
	
	
 ?>
