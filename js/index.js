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


/*公告栏点击切换显示*/
function noticeBored(){
	var notices=$(".info>info_content>ul").children('li');
	var choose=$("#notices>.title").children('ul').find('li');
	choose.each(function() {
		$(this).click(function(event) {
			event.preventDefault();
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