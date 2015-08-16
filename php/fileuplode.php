<?php 
if(isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST"){ 
    $name = $_FILES['post_poster']['name']; 
    $size = $_FILES['post_poster']['size']; 
    echo json_encode($name);
 ?>
