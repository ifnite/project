
	/*实现预览效果*/
		$('#post_view').click(function(event) {
			var html=ue.getContent();
			var title=$("#input_title").val();
			var auther=$("#input_auther").val();
			var pauther=$("#input_pauther").val();
			var origin=$('#input_select_from').val();
			var kind=$("#input_select_kind").val();
			var tags=$('#input_tag').val();
		});
	/*实现封面图上传效果*/
	$("#post_poster").change(function(event) {
		var options = {
            url: "web-project/php/fileuplode.php",
            success: function () {
                 alert("ajax请求成功");
             }
             };
        alert("0");
		$("#posterUp").ajaxSubmit(options);
		alert("1")
	});
