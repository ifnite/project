
	/*实现预览效果*/
		$('#post_view').click(function(event) {
			var html=ue.getContent();
			var title=$("#input_title").val();
			var auther=$("#input_auther").val();
			var pauther=$("#input_pauther").val();
			var origin=$('#input_select_from').val();
			var kind=$("#input_select_kind").val();
			if(title==""||html==""||auther==""){
				alert("请完善内容后再点击预览！")
			}
			else{
				$('#viewer_content').append(html);
			$('#viewer_title').text(title);
			$('#viewer').css('display', 'block');
			$('#viewer').css('left', function (){
				return ($(window).width()-600)/2;
			});
			$('#viewer').css('top', function (){
				return ($(window).height()-600)/2;
			});
			$('#cover').css('display', 'block');
			$("#cover").click(function(){
				$('#viewer').css('display', 'none');
				$('#cover').css('display', 'none');
			})
			}
			
		});
	/*实现封面图上传效果*/

$("#poster_choose").change(function(event) {
	 $(".poster_point").css('display','block');
	 $('#poster_statu').empty();
	var options = {
      		success: function (json) {
         		var results=eval(json);
         		var statu=results.success;
         		var msg=results.msg;
         		$(".poster_point").css('display','none');
         		if(statu==0){
         			$('#poster_path').addClass('invalid');
         			$('#poster_statu').append("<p>"+msg+"</p>");
         		}
         		else{
         			$('#poster_path').removeClass('invalid');
         			$('#poster_statu').append("<img src=\"php/"+msg+"\">");
         		}
        	}
    	};
  
	$("#poster_form").ajaxSubmit(options);
});
/*实现提交效果*/
$('#post_post').click(function(event) {
			var html=ue.getContent();
			var title=$("#input_title").val();
			var auther=$("#input_auther").val();
			var pauther=$("#input_pauther").val();
			var origin=$('#input_select_from').val();
			var kind=$("#input_select_kind").val();
			var tags=$("#input_tag").val();
			var bref=$("#bref").val();
			alert(bref);
			if($("#poster_statu>img").length>0){
				var poster=$("#poster_statu>img").attr('src');
			}
			else{
				var poster="";
			}
			if(title==""){
				alert("请填写标题");
			}
			else if(html==""){
				alert("请填写内容");
			}
			else if(auther==""){
				alert("请填写作者");
			}
			else if(origin==""){
				alert("请选择文章来源");
			}
			else if(kind==""){
				alert("请选择文章分类");
			}
			else{
				$('#post_post').addClass('disabled');
				$.ajax({
					url: 'php/handelPost.php',
					type: 'POST',
					dataType: 'json',
					data:"title="+title+"&auther="+auther+"&pauther="+pauther+"&origin="+origin+"&kind="+kind+"&html="+html+"&tags="+tags+"&poster="+poster+"&bref="+bref,
					error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest.status);
                        alert(XMLHttpRequest.readyState);
                        alert(textStatus);
                    },
                    success:function(json){
						var results=eval(json);
						alert(results.success);
					}
				})
			}

		});