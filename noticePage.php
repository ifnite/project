<?php 
	header("Content-Type: text/html;charset=utf-8"); 
	/*获取文章ID*/
	if(isset($_GET["id"]))
		{
		$noticeid=$_GET["id"];}
	else{
		header("Location: 404.php");
	}
	/*连接数据库*/
	$mysqli = new mysqli("127.0.0.1", "webGet", "", "stuhome");
	if ($mysqli->connect_errno) {
   		header("Location: 404.php");//连接失败指向404页面
	}
	/*处理数据*/
	mysqli_query($mysqli,'SET NAMES UTF8');  
	$res = mysqli_query($mysqli, "SELECT * FROM  notices WHERE ID=$noticeid");
	if (!$res) {
   		header("Location: 404.php");//没有找到结果，指向404页面
	}
	else{
		mysqli_query($mysqli, "UPDATE `notices` SET`viewTimes`=`viewTimes`+1 WHERE `id`=$noticeid");
	}
	if(!($row = $res->fetch_assoc())){
		$res->close();//断开结果连接
		$mysqli->close();
		header("Location: 404.php");
		}
	else {
    	$title=$row['title'];//文章标题
    	$author=$row['author'];//文章作者
    	$origin=$row['origin'];//文章来源
    	$main=$row['main'];//文章正文
    	$postTime=strtotime($row['postTime']);//发布时间
    	$pass=$row['pass'];//审核人
    	$viewTimes=$row['viewTimes'];//阅读次数
    	$res->close();//断开结果连接>

    	?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv='Content-Type' content='text/html; charset=utf-8' /> 
	<?php 
		echo "<title>".$title."|电子科技大学学生工作部</title>";
	 ?>
	<link rel="stylesheet" href="style/common.css">
	<link rel="stylesheet" href="style/header.css">
	<link rel="stylesheet" href="style/footer.css">
	<link rel="stylesheet" href="style/newsPage.css">
	<!--[if lt IE 9]><link rel="stylesheet" href="style/ie.css"><![endif]-->
	<!--[if lt IE 8]><link rel="stylesheet" href="style/ie7.css"><![endif]-->
	<script src="js/jquery-1.11.3.min.js"></script>
	<script src="js/common.js"></script>
</head>
<body>
	<div id="main">
		<header>
			<div id="header">
				<div id="topBar">
					<img src="image/logo.png"></img> 
					<ul>
						<li><a href="http://222.197.182.130/xgb2011/">旧版入口</a></li>
						<li><a href="post.html">我要投稿</a></li>
						<li><div id="search"><input id="search_box" type="text" value="搜索...">
						<input id="search_botton" type="submit" value=""></div></li>
					</ul>
				</div>
				<div id="nav">
					<ul>
						<li><a href="index.html">首&nbsp&nbsp&nbsp&nbsp页</a></li>
						<li><a href="department.html">机构设置</a></li>
						<li><a href="newsList.html">学工动态</a></li>
						<li><a href="otherList.html">学院动态</a></li>
						<li><a href="rulesList.html">规章制度</a></li>
<<<<<<< HEAD
						<li><a href="processList.html">办事流程</a></li>
=======
						<li><a href="processList">办事流程</a></li>
>>>>>>> origin/duyiqi17-patch-1
						<li><a href="logoIn.html" target="_blank">学工系统登陆</a></li>
					</ul>
				</div>
			</div>
		</header>
		<div id="container_top">
			<div id="partTitle">
				<div><p>通知公告</p></div>
			</div>
			<div id="headerFitter"></div>
		</div>
		<div id="container">
			<div id="newsContent">
				<div class="title">
					<i></i>
					<h1><?php echo $title ?></h1>
					<ul>
						<li id="newsViews"><i></i><p><?php echo $viewTimes; ?></p></li>
					</ul>
					<div id="textInfo">
						<ul>
							<?php 
							echo '<li><p>'."来源：".$origin."</p></li>" ;
							echo '<li><p>'."作者：".$author."</p></li>" ;
							echo '<li><p>'."发布时间：".date("Y-m-d H:i", $postTime)."</p></li>" ;?>
						</ul>
					</div>
				</div>
					<div class="mainContent" id="zhengwen">
					<?php echo $main ?>
					</div>
					<div class="otherInfo">
						<p id="postInfo"><?php echo "审核：".$pass;}
						?></p>
						<div class="bdsharebuttonbox" data-tag="share_1">
						<a class="bds_qzone" data-cmd="qzone" href="#"></a>
						<a class="bds_tsina" data-cmd="tsina"></a>
						<a class="bds_weixin" data-cmd="weixin"></a>
						<a class="bds_renren" data-cmd="renren"></a>
						<a class="bds_baidu" data-cmd="baidu"></a>
						<a class="bds_tqq" data-cmd="tqq"></a>
						</div>
					</div>
					
					<script src="js/bdshare.js"></script>
				</div>
				<div id="newsRecommand">
					<div class="title"><h3>最新公告</h3></div>
					<ul>
						<?php 

							$otherNotices = mysqli_query($mysqli, "SELECT id,title,author FROM  notices order by postTime asc limit 5");
							while ($line=$otherNotices->fetch_assoc()) 
							{
								echo "<li><a href=\"noticePage.php?noticeid=".$line["id"]."\"><p>".$line["title"]."</p></a></li>";
							}
							$otherNotices->close();
							$mysqli->close();
						 ?>
					</ul>
				</div> 
		</div>
	</div>
	<script src="js/fixFooterPosition.js"></script>
	
	<footer>
		<div id="footer">
			<div id="footerContainer">
				<ul id="social">
					<li class="footerTitle">社交网络</li>
					<li><a href="#"><i style="background:url(image/social.png)"></i><p>微信WeChat</p></a></li>
					<li><a href="#"><i style="background:url(image/social.png) -31px"></i><p>微博Weibo</p></a></li>
					<li><a href="http://www.52mianliao.com"><i style="background:url(image/social.png) 0px -62px"></i><p>面聊MianLiao</p></a></li>
				</ul>
				<ul id="footerLinks">
					<li class="footerTitle">友情链接</li>
					<li><a href="http://www.uestc.edu.cn"><p>电子科技大学官方网站</p></a></li>
					<li><a href="http://nav.uestc.edu.cn"><p>成电导航网</p></a></li>
					<li><a href="http://bbs.uestc.edu.cn/forum.php"><p>清水河畔论坛</p></a></li>
					<li><a href="http://masterblog.uestc.edu.cn/"><p>名师博客群</p></a></li>
				</ul>
				<ul id="support">
					<li class="footerTitle">技术支持</li>
					<li><a href="#"><p>IFNITE工作室</p></a></li>
					<li><a href="#"><p>星辰工作室</p></a></li>
				</ul>
				<p id="rights">COPYRIGHT 2015 © 电子科技大学党委学生工作部 ALL RIGHTS RESERVED<em>|后台登录</em></p>
			</div> 
		</div>
	</footer>
<<<<<<< HEAD
	<script src="js/positionBugFix.js"></script>
=======
>>>>>>> origin/duyiqi17-patch-1
</body>
</html>