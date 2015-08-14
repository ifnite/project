$(document).ready(function() {
	positionFix();
});
function positionFix () {
	var mainHeight=$("#main").height();
	var windowHeight=$(window).height();
	$('#main').css('marginTop', function (){
		return ((windowHeight-mainHeight)/2 )
	});
}
