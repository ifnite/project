$(document).ready(function() {
	noticeBored();
	// pictureChange();
});
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