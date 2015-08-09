$(".page_container").jumpto({
  				firstLevel: "> h2",
  				secondLevel: "h3 > p",
  				innerWrapper: ".jumpto-block",
  				offset: 300,
  				animate: 1000,
  				navContainer: false,
  				anchorTopPadding: 20,
  				showTitle: false,
  				closeButton: false
});

//用于实现组织架构图点击跳转的功能
function departPicClick(){
	var lists=$(".jumpto-first>li:eq(1)>ul");
	var btn=$("#departPic>ul").children('li');
	btn.each(function(){
		$(this).click(function() {
			
		if(document.all){ //判断IE浏览器
 				 window.event.returnValue = false;
			}
			else{
  				event.preventDefault();
			};
		var thisId=$(this).attr("id").replace(/[^0-9]/ig, "");
		var list=lists.find('li').eq(thisId).children('a');
		// list.css('background', 'red');
		list.click();
		});
	})
	//用于实现组织架构图和网站链接按钮鼠标悬停的功能
	btn.each(changeColor);
	var linkBtn=$('.link');
	linkBtn.each(changeColor);
	function changeColor(){
		$(this).hover(function() {
		$(this).css('background', '#0c66a9');
		$(this).find('a').css('color', '#fff');
	}, function() {
		$(this).css('background', '#fff');
		$(this).find('a').css('color', '#0c66a9');
	});
	}
}
//实现部门领导图片点击的效果
function leaderPicClick(){
	var leaderInfo= new Array(
		new Array("于乐","学生活动中心209","61830782","yule@uestc.edu.cn","学工部办公室、学生教育科、网络文化建设办公室"),
		new Array("吴绪红","学生活动中心207A","61830081","poffice@uestc.edu.cn","资助中心、沙河管理办公室、武装部"),
		new Array("刘惠","学生活动中心304","61830125","liuhui@uestc.edu.cn","文化艺术教育中心 国家大学生文化素质教育基地"),
		new Array("李媛","学生活动中心405","61830396","liyuan@uestc.edu.cn","心理健康中心"),
		new Array("张军","学生活动中心106A","61830130","2585766@qq.com","校团委"),
		new Array("杜辉","学生活动中心209","61830782","duhui@uestc.edu.cn","学生就业指导中心、学生管理科")
		);
	var picsLi=$("#leaders > ul").children('li');
	picsLi.each(function() {
		var imgs=$(this).find('img');
		var number=imgs.attr("alt");
		var picAdd=imgs.attr("src");
		imgs.click(function() {
			var picSrc=picAdd;
			var name=leaderInfo[number][0];
			var place="办公地点："+leaderInfo[number][1];
			var phone="办公电话："+leaderInfo[number][2];
			var mail="工作邮箱："+leaderInfo[number][3];
			var depart="分管部门："+leaderInfo[number][4];
			var p="<p>"+place+"</br>"+phone+"</br>"+mail+"</br>"+depart+"<p</p>";
			var img="<img src=\""+picSrc+"\">";
			var h1="<h1>"+name+"</h1>";
			$('#main').append('<div class=\"cover\"><div class=\"leaderInfo\">'+img+h1+p+'</div></div>');
			positonFix();
			var cover=$('.cover');
			cover.click(function() {
				// event.stopPropagation();
				if(document.all){ //判断IE浏览器
 					cover.css('display', 'none');
				}
				else{
  					cover.remove();
				};
				
				
			});

		});
		
	});
}
// //解决部门领导图片点击后的排版问题
function positonFix(){
	var newHeight=$(window).height()-$(".leaderInfo").height();
	$(".leaderInfo").css('marginTop', function(){return newHeight/2});
}
departPicClick();
leaderPicClick();

