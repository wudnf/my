<?php
		//model类 实现数据库的增删改查 搜索分页 
	


	class Model
	{
		//定义成员属性 
		protected $tabname;//表名 
		protected $link = null;//数据库的连接对象 
		protected $pk = "id";//primary key 主键 
		protected $field = array();//表字段

		protected $where = array();//接收搜索的信息
		protected $order = null;//排序信息
		protected $limit = null;//分页信息

		//获得表的字段 信息
		//因为查询表结构的字段 不需要外面看到 所以说使用private私有
		private function loadField()
		{
			$sql = "desc {$this->tabname}";//查看表结构
			$result = mysqli_query($this->link,$sql);
			while($row = mysqli_fetch_assoc($result)){
				$this->field[] = $row['Field'];//获得表的所有字段 并且赋值给$field
				if($row['Key']=="PRI"){//找到表的主键 并且更改
					$this->pk = $row['Field'];
				}
			}
			//释放结果集 
			mysqli_free_result($result);
		}



		//使用构造方法 实现连接操作 
		public function __construct($tabname)
		{
			//实例化类的时候 创建数据库连接对象
			$this->link = @mysqli_connect(HOST,USER,PASS) or die("数据库连接失败");
			mysqli_set_charset($this->link,"utf8");
			mysqli_select_db($this->link,DBNAME);
			$this->tabname = $tabname;//接收传递的表名
			$this->loadField();//当类实例化的时候执行表字段的查询  
		}

		//=======通过model类实现对数据库的增删改查 搜索 分页===============================
		//1 查看所有数据 
		public function findAll()
		{
			$sql = "select * from {$this->tabname} ";
			//拼接sql语句 
			// var_dump($this->where);
			if(!empty($this->where)){
				$sql .=" where ".implode(" and ",$this->where);
			}

			if(!empty($this->order)){
				$sql .=" order by ".$this->order;
			}

			if(!empty($this->limit)){
				$sql .=" limit ".$this->limit;
			}

			// echo $sql;
			// exit;
			$result = mysqli_query($this->link,$sql);
			$list = array();
			while($row = mysqli_fetch_assoc($result)){
				$list[] = $row;

			}
			//释放结果集的同时清空这些条件
			mysqli_free_result($result);

			$this->where = array();//接收搜索的信息
			$this->order = null;//排序信息
			$this->limit = null;
			return $list;//
		}

		//数出总的数据条数 
		public function count()
		{
			$sql = "select * from {$this->tabname}";
			//加上搜索条件 实现数据的过滤
			if(!empty($this->where)){
				$sql .=" where ".implode(" and ",$this->where);
			}

			$result = mysqli_query($this->link,$sql);
			return mysqli_num_rows($result);
		}


		//2 查看某条数据
		public function find($id=0)
		{
			$sql = "select * from {$this->tabname} where {$this->pk}={$id}";
			$result = mysqli_query($this->link,$sql);
			
			$row = mysqli_fetch_assoc($result);
			mysqli_free_result($result);
			return $row;//
		}


		//3 删除某条数据 
		public function del($id=0)
		{	
			$sql = "delete from {$this->tabname} where {$this->pk}={$id}";
			$result = mysqli_query($this->link,$sql);
			$num = mysqli_affected_rows($this->link);
			return $num;
		}

		//4 添加数据 
		public function insert($data = array())
		{
			if(empty($data)){//如果insert方法里面没有给参数 默认使用$_POST传递的参数
				$data = $_POST;
			}

			//需要知道表的有效字段 可以存放到数组里面 
			//对于数组的处理就是遍历
			// 定义两个数组来接收有效字段和值
			$fieldList = array();//接收有效字段
			$valueList = array();//接收有效值
			foreach($data as $k=>$v){
			
				if(in_array($k,$this->field)){//判断字段的有效性
					$fieldList[] = $k;
					$valueList[] = $v;
				}

			}

			//拼接sql语句 
			$sql = "insert into {$this->tabname}(".implode(",",$fieldList).") values('".implode("','",$valueList)."')";
			// echo $sql;
			// exit;
			$result = mysqli_query($this->link,$sql);

			return mysqli_insert_id($this->link);
		}
		//5 修改数据 
		public function update($data = array())
		{
			if(empty($data)){//如果insert方法里面没有给参数 默认使用$_POST传递的参数
				$data = $_POST;
			}
			// print_r($data);
			// exit;
			$valueList = array();
			foreach($data as $k=>$v){
				if($k!=$this->pk){
					$valueList[] = "$k='{$v}'";
				}
				
			}
			//处理数据 拼接sql语句 
			// $data $k => $v
			// [id] => 3 
			// [name] => ww 
			// [age] => 21 
			// [sex] => w 
			// [classid] => lamp88

			// 1 id 不能要 
			// 2 update stu set name="ww",age="21",sex="w",classid="lamp88" where id=3;
			

			$sql = "update {$this->tabname} set ".implode(",",$valueList)." where {$this->pk}=".$data[$this->pk];

			$result = mysqli_query($this->link,$sql);

			return mysqli_affected_rows($this->link);

		}

		//封装信息 
		//1 接收搜索的条件信息 
		public function where($where)
		{
			
			$this->where[] = $where;
			return $this;//必须返回对象 才能实现方法的连贯操作 
		}

		//2 接收排序的信息 
		public function order($order)
		{
			$this->order = $order;
			return $this;//必须返回对象 才能实现方法的连贯操作 
		}

		//3 接收分页的信息 
		public function limit($m,$n=0)
		{
			if($n==0){
				$this->limit = $m;
			}else{
				$this->limit = "{$m},{$n}";
			}
			return $this;
		}

		//======通过model类实现对数据库的增删改查 搜索 分页===============================

		//关闭数据库
		public function __destruct()
		{
			if($this->link!=null){
				mysqli_close($this->link);
			}
		}


	}

	//1 导入配置文件 
	//2 连接数据库 
	//3 设置字符集 选择数据库
	//4 sql语句 执行sql查询
	//5 解析结果集 
	//6 关闭数据库释放结果集 