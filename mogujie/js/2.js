/*登录验证ajax*/	
function dosend(){
	var u=document.getElementById("user");
	var uu=document.getElementById("pass");
	
	//1 创建请求对象
			var xmlhttp = new XMLHttpRequest();
			
			//2 设置回调函数
			xmlhttp.onreadystatechange = function (){
				if(xmlhttp.readyState==4 && xmlhttp.status==200){
					// console.log(c.value);
					// 
					console.log(xmlhttp.responseText);
					if(xmlhttp.responseText==12||xmlhttp.responseText==21){
						alert("用户名已经存在");
					}
					else
					{
						alert("可以登录");
					}
				}
				

			}

			//3 初始化
			xmlhttp.open("GET","./3.php?uname="+u.value+"&upwd="+uu.value,true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			//4 发送
			// xmlhttp.send("uname="+u.value+"&upwd="+uu.value);
			xmlhttp.send();
}

/*注册验证ajax*/	
function dopost(){
	var num = document.getElementById("number");
	var list = document.getElementById("yanz");
	
	//1 创建请求对象
			var xmlhttp = new XMLHttpRequest();
			
			//2 设置回调函数
			xmlhttp.onreadystatechange = function (){
				if(xmlhttp.readyState==4 && xmlhttp.status==200){
					// console.log(c.value);
					// 
					console.log(xmlhttp.responseText);
					if(xmlhttp.responseText==12||xmlhttp.responseText==21){
						alert("手机号码已经存在");
					}
					else
					{
						alert("可以注册");
					}
				}
				

			}

			//3 初始化
			xmlhttp.open("GET","./4.php?number="+num.value+"&item="+list.value,true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			//4 发送
			// xmlhttp.send("uname="+u.value+"&upwd="+uu.value);
			xmlhttp.send();
}
/*瀑布流*/
window.onload = function(){
	var oDiv = document.getElementsByClassName("imges");

		var b_height = window.innerHeight ||window.document.documentElement.clientHeight ||window.document.body.clientHeight;
		window.onscroll = function(){
			var oSt = window.document.documentElement.scrollTop ||window.document.body.scrollTop;
			for(var i=0;i<oDiv.length;i++){
//				console.log(oUl.length);
				if(oDiv[i].offsetTop-b_height<oSt-200){
					oDiv[i].firstElementChild.src = oDiv[i].firstElementChild.getAttribute("info");
					
				}
			}
		}
		
}
