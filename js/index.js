$(document).ready(function() {
	getInfo();//获得轮播图片
	// getNews();//获得新闻内容
	// getNotices();//获得公告内容
	//公告板切换
	noticeBored();
	//图片轮播
	pictureChange();
	// 跑马灯
	 $(".example").smartmarquee({
		  // animate duration
		  duration: 1000,   
		  // auto loop
		  loop : true,      
		  // interval duration
		  interval : 2000, 
		  // 'vertical' or 'horizontal'
		  axis : "vertical"
		  });		
	

});	


/*公告栏点击切换显示*/
function noticeBored(){
	var notices=$(".info>info_content>ul").children('li');
	var choose=$("#notices>.title").children('ul').find('li');
	choose.each(function() {
		$(this).click(function(event) {
			if(document.all){ //判断IE浏览器
 				 window.event.returnValue = false;
			}
			else{
  				event.preventDefault();
			};
			choose.each(function() {
				$(this).attr("class","");
				});
			$(this).attr("class","on");
			var onValue=$(this).text();
			var showValue=""
			if(onValue=="学生"){
				showValue="xuesheng";
				}
			else{
				showValue="xueyuan";
				}
			var noticeLis=$(".info_content").find('li');
			var title=$("#notices>.title>h3");
			title.click(function(event) {
				noticeLis.each(function() {
					$(this).css('display', 'block');
					$(this).parent().parent().parent().css('display', 'block');
					choose.each(function() {
						$(this).attr("class","");
					});
				});

			});
			noticeLis.each(function(event) {
				var aAlt=$(this).children('a').attr("alt");
				if(aAlt!==showValue){
					$(this).css('display', 'none');
				}
				else{
					$(this).css('display', 'block');
					$(this).parent().parent().parent().css('display', 'block');
				}
				judgeEmpty();
			});
		
		});
		
	});

	function judgeEmpty () {
		var info=$('.info');
		info.each(function() {
			var info_content=$(this).find('.info_content').children('ul');
			var infoLi=info_content.children('li');
			var num=infoLi.length;
			infoLi.each(function() {
				var nowState=$(this).css('display');
				if(nowState=="none"){
					num--;
					// alert(num);
				}
			});
			if(num<=0){
				$(this).css('display', 'none');
			}
			else{
				$(this).css('display', 'block');
			}
		});
	}
}
/*图片轮播*/
function pictureChange() {
	var pictures=$('#picbox').children('img');
	var dot=$('#picbox>ul').children('li');
	var nextBtn=$('#right');
	var preBtn=$('#left');
		preBtn.click(picPre);
		nextBtn.click(picNext);
		autoPlay();
	$('#picbox').on("swiperight",function(){
  		picNext();
	});
	$('#picbox').on("swipeleft",function(){
  		picPre();
	});
	function autoPlay(){
		var timer=setInterval(picNext,3000);
		pictures.parent().hover(function() {
			clearInterval(timer);
		}, function() {
			timer=setInterval(picNext,5000);
		});
	}
	function picNext () {
		var index=$('.picOn').length;
		var next=parseInt(index)+1;
		dot.each(function() {
			$(this).attr("class",'')
		});
		if(next!=6){
			var nextPic=pictures[next-1];
			$(nextPic).attr("class",'picOn');
			$(dot[next-1]).attr("class",'on');
		}
		else{
			pictures.each(function() {
			 	$(this).attr("class",'');
				$(pictures[0]).attr('class','picOn');
			});
			$(dot[0]).attr("class",'on');	
		}
	}
	function picPre (){
		var index=$('.picOn').length;
		var next=parseInt(index)-1;
		dot.each(function() {
			$(this).attr("class",'')
		});
		if(next!=0){
			var prePic=pictures[next];
			$(prePic).attr("class",'');
			$(dot[next-1]).attr("class",'on');
		}
		else{
			pictures.each(function() {
			 	$(this).attr("class",'picOn');
			});
			$(dot[4]).attr("class",'on');	
		}
	}

}
/*通过Ajax获取新闻数据*/
function getInfo(){
	// alert("0");
	$.ajax({
			url: 'php/index.php',
			type: 'get',
			dataType: 'json',
			data: "mainnews&pictures&othernews&topnews",
			error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest.status);
                        alert(XMLHttpRequest.readyState);
                        alert(textStatus);
                    },
            success:function(json){
            	var infos=eval(json);
            	var mainnews=infos.mainnews;
            	var pics=infos.pictures;
            	var othernews=infos.othernews;
            	var tops=infos.tops;
            	$(".newslist").empty();
            	/*主新闻添加*/
            	for(var i=0;i<mainnews.length;i++){
            		var newLi="<li><a href=\"mainnewsPage.php?id="+mainnews[i].id+"\">"+mainnews[i].title+"</a></li>";
            		$("#mainNews>.newslist").append(newLi);
            	}
            	/*学院新闻添加*/
            	for(var i=0;i<othernews.length;i++){
            		var newLi="<li><a href=\"othernewsPage.php?id="+othernews[i].id+"\"><em>["+othernews[i].depart+"]</em>"+othernews[i].title+"</a></li>";
            		$("#otherNews>.newslist").append(newLi);
            	}
            	/*处理轮播图片*/
            	for(var i=0;i<pics.length;i++){
            		var picbox=$("#picbox").children('img');
            		picbox.eq(i).attr('src', pics[i].url);
            	}
            	/*处理置顶新闻*/
            	$("#mainNews>.newspic").empty();
            	$("#otherNews>.newspic").empty();
            	var maintops="<a href=\"mainnewsPage.php?id="+tops[0].id+"\"><img src=\""+tops[0].poster+"\"></a><a href=\"newsPage.php?newsid="+tops[0].id+"\"><h1>"+tops[0].title+"</h1></a><a href=\"newsPage.php?newsid="+tops[0].id+"\"><p>"+tops[0].bref+"</p></a>";
            	var othertops="<a href=\"othernewsPage.php?id="+tops[1].id+"\"><img src=\""+tops[1].poster+"\"></a><a href=\"newsPage.php?newsid="+tops[1].id+"\"><p>["+tops[1].depart+"]"+tops[1].title+"</p></a>";
            	$("#mainNews>.newspic").append(maintops);
            	$("#otherNews>.newspic").append(othertops);

            	}
            
		})
	// alert("1");
}