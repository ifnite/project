$(document).ready(function(){
	searchBox();//实现搜索框输入和输出的各项功能；
	backToTop();//实现回到顶部按钮；
	// logoIn();
	
});

/*实现搜索框输入和输出的各项功能*/
function searchBox(){
	var searchBox=$("#search_box");
	searchBox.focusin(function(event) {
		var searchValue=searchBox.attr("value");
		if(searchValue==="搜索..."){
			searchBox.attr("value","");
			searchBox.css('color', '#fff');
		}
		searchBox.focusout(function(event) {
			var searchValue=searchBox.attr("value");
			if(searchValue===""){
				searchBox.attr("value","搜索...");
			}
			searchBox.css('color', '#c7c7c7');
		})
	});
}
/*实现回到顶部效果*/
function backToTop () {
	var winHeight=$(window).height();
	var docMain=$("#main").offset().left;
	$(window).scroll(function(event) {
		nowTop=$(window).scrollTop();
		var point=$("#footer>.backToTop");
		if(nowTop>(winHeight*0.75)){
			if((point.length)==0){
			$("#footer").append('<div class=\"backToTop\"><a href=\"#\"><i></i></a></div>')}
			changePosition();
			backTop();
		}
		if(nowTop==0){
			point.remove();
		}
	});
	function changePosition(){
		var btn=$("#footer>.backToTop");
		var btnOffset=$("#main").offset().left;
		btn.css('right', function(){return btnOffset});
		var footerHeight=$("#footer").height();
		// alert(nowTop+$(window).height()-$(document).height()+footerHeight)
		if((nowTop+$(window).height()-$(document).height()+footerHeight)>=0){
			btn.css('bottom', function(){return footerHeight-40});
		}
		else{
			btn.css('bottom', function(){return 20});
		}
	}
	function backTop(){
		var btn=$("#footer>.backToTop");
		var aBtn=$("#footer>.backToTop>a")
		btn.hover(function() {
			$(this).find("a").css('background', '#424242');
		}, function() {
			$(this).find("a").css('background', 'rgba(66,66,66,.6)');
		});
		btn.mousedown(function() {
			$(this).find("a").css('background', '#1573b1');
		});

		aBtn.click(function(event) {
			event.preventDefault();
			goBack();
			
		});
		abtn.on("tap",function () {
			event.preventDefault();
			goBack();
		})
		function goBack(){
			var timer=setInterval(GoBack,5);
			function GoBack () {
				nowTop=$(window).scrollTop();
				dis=5;
				$(window).scrollTop(nowTop-dis);
				if($(window).scrollTop()==0){
					window.clearInterval(timer);
				}
			}
			
		}

		// }
	}
}