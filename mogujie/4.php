<?php
	// header("Content-Type:text/html;charset=utf-8");
	
	// $arr = ["13366649063","18842390716","13386599023"];
    
      $arr = array("18842390716"=>'1234',"13366649063"=>"1234");
    foreach($arr as $name=>$pwd)
    {
        if(($name==$_GET['uname']) && ($pwd ==$_GET['upwd']))
        {
            echo 1;
        }else{
            echo 2;
        }
    }
        
        
    // }
    // if(in_array($_GET['uname'],$arr)){
    // if(in_array($_POST['uname'],$arr)){
    //     echo "1";
    // }else{
    //     echo "2";//可以注册 
    //     // var_dump($_POST['uname']);//var_dump()查看数据和类型
    // } 
?>