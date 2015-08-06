
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
var lists=$(".jumpto-first>li:eq(1)>ul");
var btn=$("#departPic>ul").children('li');
btn.each(function(){
	$(this).click(function() {
	event.preventDefault();
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
