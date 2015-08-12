
var lists=$(".list").children('li');
var hotNews=$("#hotNews >ul").children('li');

fixPositon(lists,"h1","p");
fixPositon(hotNews,"p");
fixHeight(hotNews); 

/*用于修复因绝对定位引起的无图片标题的位置问题*/
function fixPositon(elem,tag1,tag2,tag3){
	 $.each(elem,function(){
 	var img=$(this).children('a').children('img').length;
 	if(img===0){
 		var tag1=$(this).children('a').children(tag1);
 		var tag2=$(this).children(tag2);
 		tag1.css("left","10px");
 		tag1.css({
 			width: '95%',
 			marginLeft: '0px',
 			marginTop:'0px'
 		});
 		tag2.css("left","10px");
 		}
 	})
}
/*用于修复右侧新闻栏因绝对定位引起的布局问题*/
function fixHeight(elem){
	 $.each(elem,function(){
 		var top=$(this).children('a').children('em').css('top');
 		if(top){
 			var emHeight=$(this).children('a').children('em').css('height');
 			var sumHeight=parseInt(emHeight+top);
 			if(sumHeight>60){
 				$(this).height(sumHeight+20);
 			}
 		}
 		
 	})
}