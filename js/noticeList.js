
$(document).ready(function() {
	pageGet();//获取并生成页码数据
	
	fixPositon(lists,"h1","p");
	fixPositon(hotNews,"p");
	fixHeight(hotNews); 
});

/*页码点击切换效果*/
function changePage(){
	var pages=$('.pages');
	pages.each(function() {
		$(this).children('a').click(function(event) {
			if(document.all){ //判断IE浏览器
	 			window.event.returnValue = false;
			}
			else{
	  			event.preventDefault();
			};
			
		});
		/*变更背景颜色*/
		$(this).click(function(event) {
			pages.each(function() {
				$(this).removeAttr('class',"on");
			});
			$(this).addClass('on');
			$(window).scrollTop(0);
			judgePosition(pages);
			getData();//异步提取数据；
		});

	});
	
}
/*判断首页和尾页并对应消失按钮*/
function judgePosition (pages) {
	var pre=$(".pre");
	var next=$(".next");
	/*判断是否是第一页，若为第一页，则取消pre按钮的效果*/
		if ($(".on").children('a').text()==1) {
			pre.addClass('disabled');
			pre.children('a').css('display', 'none');
		}
		else{
			pre.removeClass('disabled');
			pre.children('a').css('display', 'block');
		}
		/*判断是否是最后一页，若为最后一页，则取消next按钮的效果*/
		if ($(".on").children('a').text()==pages.length) {
			next.addClass('disabled');
			next.children('a').css('display', 'none');
		}
		else{
			next.removeClass('disabled');
			next.children('a').css('display', 'block');
		}
}
/*点击前后按钮翻页*/
function clickChange(){
	var pre=$(".pre");
	var next=$(".next");
	var pages=$('.pages');
	pre.children('a').click(function(event) {
			if(document.all){ //判断IE浏览器
	 			window.event.returnValue = false;
			}
			else{
	  			event.preventDefault();
			};
		});
	next.children('a').click(function(event) {
			if(document.all){ //判断IE浏览器
	 			window.event.returnValue = false;
			}
			else{
	  			event.preventDefault();
			};
		});
	judgePosition(pages);
	pre.click(function(event) {
		var index=$(".on").children('a').text();
		if(index!=1){
			pages.each(function() {
				$(this).removeAttr('class',"on");
			});
			$(pages).eq(index-2).addClass('on');
			$(window).scrollTop(0);
			judgePosition(pages);
			getData();//异步提取数据；
		}
	});
	next.click(function(event) {
		var index=$(".on").children('a').text();
		if(index!=pages.length){
			pages.each(function() {
				$(this).removeAttr('class',"on");
			});
			$(pages).eq(index).addClass('on');
			$(window).scrollTop(0);
			judgePosition(pages);
			getData();//异步提取数据；
		}
	});
}

function getData(){
	var nowPage=$('.on').children('a').text();
	$.ajax({ //一个Ajax过程 
	type: "get", //以get方式与后台沟通 
	url : "php/list.php", //与此php页面沟通 
	dataType:'json',//从php返回的值以 JSON方式 解释 
	data: 'tablename=notices&pagenumber='+nowPage, //发给php
	 error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest.status);
                        alert(XMLHttpRequest.readyState);
                        alert(textStatus);
                    },
	success: function(json){
		 var results=eval(json);
		 $(".list").empty();
		 $.each(results,function() {
		 	var tag="标签：";
		 	if(this.poster){
		 		var links="<a href=\"noticePage.php?noticeid="+this.id+ "\"><img src=\""+this.poster+"\" alt=\""+this.title+"\">"+"<h1>"+this.title+"</h1></a>";
		 	}
		 	else{
		 		var links="<a href=\"noticePage.php?noticeid="+this.id+ "\"><h1>"+this.title+"</h1></a>";
		 	}
		 	if(this.tag){
		 		var tags=(this.tag).split(",");
		 		for(var i=0;i<tags.length;i++){
		 			tag+="<a href=\"#\">"+tags[i]+"</a>";
		 		}
		 	}
		 	var bref=this.bref;
		 	var time=((this.postTime).split(" "))[0];
		 	var context="<li>"+links+"<p>"+bref+"<i>"+tag+"</i></p><div class=\"newsTime\">"+"<ul><li><i class=\"newsClock\"></i><p>"+time+"</p><a href=\"#\"></a></li></ul></div></li>";
			$(".list").append(context);
			var lists=$(".list").children('li');
			fixPositon(lists,"h1","p");
		 	});
		 fixHeight();
	}
});
}

function pageGet(){
	$.ajax({
		url: 'php/getPage.php',
		type: 'get',
		dataType:'json',
		data: "tablename=notices",
		error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest.status);
                        alert(XMLHttpRequest.readyState);
                        alert(textStatus);
                    },
        success: function(json){
        	var result=eval(json);
        	if((result.count)%9!=0){
        		var pages=parseInt((result.count)/9)+1;
        	}
        	else{
        		var pages=parseInt((result.count)/9);
        	}
        	for(var i=pages;i>=1;i--){
        		var LI="<li class=\"pages\"><a href=\"#\">"+i+"</a></li>";
        		$(".pre").after(LI);
        	}
        	$(".pages").eq(0).addClass('on');
        	var page=$("#pageChange >ul");
			page.width((pages+2)*40);
			changePage();//点击页码切换效果
			clickChange();//点击上一页、下一页按钮切换代码
			getData();
        }
	});
	
	
}