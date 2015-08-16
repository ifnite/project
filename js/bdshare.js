var title=document.getElementById('newsContent').getElementsByTagName('h1')[0].innerHTML;
var bref=document.getElementById('zhengwen').getElementsByTagName('p')[0].innerHTML;
var URL=window.location.href;
var pic=document.getElementById('zhengwen').getElementsByTagName('img')[0]
// alert(URL);

	window._bd_share_config = {
		common : {
			bdText : title,	
			bdDesc : bref,	
			bdUrl : URL, 	
			bdPic : pic
		},
		share : [{
			"bdSize" : 16
		}],
		// slide : [{	   
		// 	bdImg : 0,
		// 	bdPos : "right",
		// 	bdTop : 100
		// }],
		image : [{
			viewType : 'list',
			viewPos : 'top',
			viewColor : 'black',
			viewSize : '16',
			viewList : ['qzone','tsina','huaban','tqq','renren']
		}]
	}
	with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];