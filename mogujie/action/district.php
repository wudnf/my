<?php
	//读取区域信息 
	
	//1 引入配置文件 引入model类
	include("dbconfig.php");
	include("Model.php");

	//2 实例化model产生一个mod对象
	$mod = new Model("district");

	//3 接收前端传递的值 
	$upid = $_GET["upid"]+0;

	//4 使用model类里面findAll方法 
	$list = $mod->where("upid=".$upid)->findAll();
	
	//5 输出 
	// echo "<pre>";
	// print_r($list);

	//6 准备数据 输出到前端
	echo json_encode($list);