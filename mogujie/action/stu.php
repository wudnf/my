<?php
	//对学生信息的增删改查 
	
	//1 引入配置文件 引入model类
	include("dbconfig.php");
	include("Model.php");

	//2 实例化model产生一个mod对象
	$mod = new Model("stu");

	//根据前端传递的值 实现对stu表的增删改查 
	switch($_GET['a']){
		case "insert":
		$res['info'] = $mod->insert();
		break;
		case "delete":
		$res['info'] = $mod->del($_GET['id']);
		break;
		case "update":
		$res['info'] = $mod->update();
		break;
		case "show":
		default:
		$res['info'] = $mod->findAll();
		break;
	}

	// echo "<pre>";
	// print_r($res['info']);

	//6 准备数据 输出到前端
	echo json_encode($res['info']);