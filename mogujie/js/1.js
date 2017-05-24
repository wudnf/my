/*图片轮播*/
$(function(){
			//1 图片轮播
			var time = null;
			var m = 0;
			function autoRun(){
				time = setInterval(function(){
					$("#lun ul>li").eq(m).removeClass("active");
					$("#num_list ul li").eq(m).find("span").attr("class","");
					m++;
					if(m>5){
						m = 0;
					}
					$("#lun ul>li").eq(m).addClass("active");
					$("#num_list ul li").eq(m).find("span").attr("class","active_num");
				},1000);
			}
			autoRun();
			//2 div盒子添加移入移出事件
			$("#lun").mouseover(function(){
				clearInterval(time);
				$("#left").show();
				$("#right").show();
				$("#lun").css("cursor","pointer");
			}).mouseout(function(){
				autoRun();
				$("#left").hide();
				$("#right").hide();
				$("#lun").css("cursor","default");
			});
			//3 给每个数字点击事件
			$("#num_list ul>li").each(function(){
				$(this).mouseover(function(){
					$("#lun ul>li").eq(m).removeClass("active");
					$("#num_list ul li").eq(m).find("span").attr("class","");
					
					m = $(this).index();
					
					$("#lun ul>li").eq(m).addClass("active");
					$("#num_list ul li").eq(m).find("span").attr("class","active_num");
				
				});
			});
			//4 左右箭头添加点击事件
			$("#left").click(function(){
				$("#lun ul>li").eq(m).removeClass("active");
				$("#num_list ul li").eq(m).find("span").attr("class","");
				
				m--;
				if(m<0){
					m=5;
				}
					
				$("#lun ul>li").eq(m).addClass("active");
				$("#num_list ul li").eq(m).find("span").attr("class","active_num");	
			});
			
			$("#right").click(function(){
				$("#lun ul>li").eq(m).removeClass("active");
				$("#num_list ul li").eq(m).find("span").attr("class","");
				
				m++;
				if(m>5){
					m=0;
				}
					
				$("#lun ul>li").eq(m).addClass("active");
				$("#num_list ul li").eq(m).find("span").attr("class","active_num");	
			});
		});

/*页面定位*/

//$(function(){
//	
//	$("#container ul li").click(function(){
//		var top = $(".floor").eq($(this).index()).offset().top;
//		$("body").animate({scrollTop:top},2000);
//	});
//});
/*广告弹框*/
$(function (){
            $(".ad")
                .slideDown()
                .slideUp(1000)
                .fadeIn(1000)
                .find("span").click(function(){
                    $(this).parent().fadeOut();
                });

        });
// $(function(){
//          $(window).scroll(function () {
//              var top = $(document).scrollTop();
////              $(".left").stop().animate({"top" : top + 50},600);
//              $(".right").stop().animate({"top" : top + 50},600);
//              
//              // $(".left,.right").stop().animate({"top" : top + 50},600);
//          });
//      });
/*放大镜*/ 
 $(function(){
			//1 图片替换
			$("#images img").each(function(){
				$(this).click(function(){
					var aa = $(this).attr("src");
					
					$("#small img").attr("src",aa);
					$("#big img").attr("src",aa);
				});
			});
			 //2 鼠标移动 
			$("#small").mousemove(function(ent){
				$("#small").css("cursor","move");
				$("#move").show();
				$("#big").show();
				var ent  = ent || window.event;
				var minX = $("#small").offset().left + $("#move").outerWidth()/2;
				var maxX = $("#small").offset().left + $("#small").outerWidth()-$("#move").outerWidth()/2;
				var minY = $("#small").offset().top + $("#move").outerHeight()/2;
				var maxY = $("#small").offset().top + $("#small").outerHeight()-$("#move").outerHeight()/2;
				var mx = ent.pageX;
				var my = ent.pageY;
				if(mx<minX){
					mx = minX;
				}else if(mx>maxX){
					mx = maxX;
				}else{
					$("#move").css("left",(mx-$("#small").offset().left-$("#move").outerWidth()/2)+"px");
				}
				
				if(my<minY){
					my = minY;
				}else if(my>maxY){
					my = maxY;
				}else{
					$("#move").css("top",(my-$("#small").offset().top-$("#move").outerHeight()/2)+"px");
				}
				
				
				$("#big").scrollTop(my - $("#small").offset().top*1.2+55);
				$("#big").scrollLeft(mx - $("#small").offset().left*1.2+55);
				
			});
			 //3 鼠标移出
			 $("#small").mouseout(function(){
					$("#big").hide();
					$("#move").hide();
					$("#small").css("cursor","default");
			 });
		});
/*全选全不选*/
$(function(){
	$("#select").click(function(){
		/*if($("input").html("全选")){
			$(this).attr("checked",false);
		}else{
			$("#select").click(function(){
				$(this).attr("checked",true);
			});
			
		}*/
		var total;
		if(this.checked){
			$("input").attr("checked",true);
			var total = 3284;
			$(".jiesuan").find("strong").eq(2).html(total);
		}else{
			$("input").attr("checked",false);
		var total = 0;
			$(".jiesuan").find("strong").eq(2).html(total);
		}
	});
});
/*购物车*/
var m;
$(function(){
	//1按钮点击事件
	$(".col_5 .goodsSub").click(function(){
		
		if($(this).html()=="+"){
//			alert(09);
			var m = $(this).prev("input[type=text]").val();
//			console.log(m);
			m++;
			$(this).prev("input[type=text]").val(m);
			rowSum();
		}else{
			var m = $(this).next("input[type=text]").val();
			
//			rowSum();
			m--;
//			console.log(m);
			if(m<=0){
				$(this).parent().parent().remove();
				
				
			}else{
				$(this).next("input[type=text]").val(m);
			}
			rowSum();
		}
	});
	$(".clearShopcart").click(function(){
		$(".shopping_cart_tr").remove();
	});
	
	//2 运算求和
//	var total = 0;
	function rowSum(){
//		var len = $(".shopping_cart_tr").children().size();
//		console.log(len);
		
		var total = 0;
		$(".shopping_cart_tr").each(function(){
//			$("div:not(.shpcrt_blank10)").remove();
//			$(".clearbox:not(.shpcrt_blank10)").remove();
//			$(".clearbox").not(".shpcrt_blank10");
			
			var price = $(this).find(".clearbox").find(".col_4").find(".prices").html();
//			console.log(price);
			var smal= $(this).find(".clearbox").find(".col_5").find("input").eq(0).val();
//			console.log(smal==undefined);
			if(smal==undefined || price==undefined){
				smal=0;
				price=0;
			}
//			console.log(price);
			var sum=price*smal;
//			console.log(sum);
			$(this).find(".clearbox").find(".col_6").find(".corg").html(sum);
//			console.log(sum);
			
			total+=sum;
			
			
			
		});
			$(".jiesuan").find("strong").eq(2).html(total);
//			console.log(total);
console.log("==============");
	}
	rowSum();
});

/*注册验证*/
$(function(){
	$("#number").focus(function(){
		$("#number").next("span").html("请输入手机号码").css("color","goldenrod");
	}).blur(function(){
		var str = $("#number").val();
		var patt = /^1[3-9]\d{9}$/;
		if(str.match(patt)){
			$("#number").next("span").html("手机号码有效").css("color","#CCCCCC");
		}else{
			$("#number").next("span").html("手机号码格式不对").css("color","#EE2222");
		}
			
		
	});
});

/*登录验证*/
$(function(){
	$("#user").focus(function(){
		$("#user").next("span").html("请输入手机号码").css("color","goldenrod");
	}).blur(function(){
		var str = $("#user").val();
		var patt = /^1[3-9]\d{9}$/;
		if(str.match(patt)){
			$("#user").next("span").html("手机号码有效").css("color","#CCCCCC");
		}else{
			$("#user").next("span").html("手机号码格式不对").css("color","#EE2222");
		}
	});	
	
	$("#pass").focus(function(){
		$("#pass").next("span").html("请输入6-10位密码").css("color","goldenrod");
		
	}).blur(function(){
		var str = $("#pass").val();
		var patt = /^\d{6,10}$/;
		if(str.match(patt)){
			$("#pass").next("span").html("密码有效").css("color","#CCCCCC");
		}else{
			$("#pass").next("span").html("密码错误").css("color","#EE2222");
		}
	});
	
});
/*买家评价*/
$(function (){
			$("button").click(function (){
				var val = $("textarea").val();

				switch($(this).html()){
					case"添加":
					

					$("<li style='color:red;'>"+val+"</li>").prependTo($("ul"));
					$("textarea").val("")
					break;
					case"提交":
					

					$("<li style='color:blue;'>"+val+"</li>").appendTo($("ul"))
					$("textarea").val("")
					break;
				}
			});
});

/*城市级联*/
$(function(){
			//将省份信息添加到 select下拉列表项中 
			$.ajax({
				//1 请求服务器数据 
				url:"action/district.php",
				type:"get",
				data:"upid=0",
				dataType:"json",
				success:function(data){
					//2 接收的数据遍历 拼接到option选项中 
					var info = "";
					for(var i=0;i<data.length;i++){
						info +="<option value='"+data[i].id+"'>"+data[i].name+"</option>";
					}

					$("#sid").append(info);
				}
			});

			//通过select的级联操作 将省份后面的信息请求出来 
				//1 找节点的时候不能使用sid 后面产生的新的select 也需要有级联操作 
				//2 并且级联操作也需要产生新的select option 
			$("select").live("change",function (){
					//每次级联的时候后面的节点全部删除 
					$(this).nextAll().remove();
					
					//获得当前级联操作的对象 赋值给ob
					var ob = $(this);
					// console.log(ob.val());
					//产生一个select option 
					$.ajax({
						url:"action/district.php",
						type:"get",
						data:"upid="+ob.val(),
						dataType:"json",
						success:function(data){
							//接收数据 拼接select和option
							// alert(data);//最后一次级联的时候 data为空 
							//data为空的时候 下面的脚本就不执行 

							if(data.length==0){
								// alert(123);//检测和查看 
								return;
							}

							var info = "<select>";
							for(var i=0;i<data.length;i++){
								info +="<option value='"+data[i].id+"'>"+data[i].name+"</option>";
							}
							info += "</select>";
//						$	console.log(info);
							//将这个info对象 添加到 
							ob.after(info);
							// $(this).after(info);//在这里 $(this)拿不到select对象 
						}
					});
			});

	});	
/*页面定位*/
$(function(){
	$("#dingwei li").click(function(){
//		console.log($("#dingwei li"));
		var top = $(".top1").eq($(this).index()).offset().top;
		$("body").animate({scrollTop:top},2000);
	});
	$(window).scroll(function(){
		var opt = $(document).scrollTop();
		
//		console.log(opt);
		
		if(opt>1000){
			$("#dingwei ul").show();
		}else{
			$("#dingwei ul").hide();
		}
	
	});
	
});
