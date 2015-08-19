<?php 
	header('Content-type: text/json');
	$upFilePath="";
	$error="";//用于存放错误信息；
	$success=0;//返回上传状态，0 for 失败 1 for 成功；
	$fileElementName='poster';//表单名
	$allowType = array(".jpg",".gif",".png"); //允许上传的文件类型；
	$dir="news/".date('Ymd')."/";//文件上传的根目录；

	/*此函数用于判断图片文件是否异常*/
	function isImg($filename){
		if(file_exists($filename)){
			$info = GetImageSize($filename);
			return $info[2];
			}else{
			return false;
		}
	}
	/*此函数用于判断图片文件是否是支持的文档格式*/
	function isSupport($filetype){
		$type='';
		switch ($filetype) {
			case 'image/jpeg':case 'image/jpg': $type=".jpg" ;return $type;
			case 'image/png': $type=".png";return $type;
			case 'image/gif': $type=".gif";return $type;
			default:return $type;
		}
	}
	/*正文如下---------------------------------------------------------------*/
	/*判断错误*/
	if(!empty($_FILES[$fileElementName]['error'])){
		switch (!empty($_FILES[$fileElementName]['error'])) {
		case '1':case '2': $error="文件过大，请您重新选择";break;
		case '3':case '4':case '6':case '7': $error="文件未被正确上传，请重试";break;
		default:$error = '未知错误,上传失败，请与网站管理员联系';break;
		}
	}//上传错误
	else if(empty($_FILES[$fileElementName]['tmp_name']) || $_FILES[$fileElementName]['tmp_name'] == 'none'){
		$error = '没有文件被上传，请重试';
	}//没有选择文件
	else{//判断是否是图片文件
		$type=isSupport($_FILES[$fileElementName]['type']);
		if(empty($type)){
			$error="文件格式不支持";
		}
		else{
			if(!file_exists($dir)){
				mkdir($dir,0700);//判断上传根目录是否存在，若不存在则创建；
			}
			$now=date("YmdHis");
			$filedir=$dir.$now.$type;
			move_uploaded_file($_FILES[$fileElementName]["tmp_name"],$filedir); 
			if(!isImg($filedir)){
				$error="图片被损坏或这不是一个正确的图片文件";
				unlink($filedir);
			}
			else{
				$success=1;
			}
		}
	}
	if ($success==0) {
		$result['success']=0;
		$result['msg']=$error;
	}
	else{
		$result['success']=1;
		$result['msg']=$filedir;
	}
	/*返回json型数据*---------------------------------------------*/
	echo json_encode($result);
 ?>	
