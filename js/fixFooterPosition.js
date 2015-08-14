/*用于修复因绝对定位引起的footer位置问题*/
fixHeight();
function fixHeight(){
var mainHeight=$("#newsContent").height()||$("#newsList").height();
var container=$("#container")
container.height(mainHeight+100);}
