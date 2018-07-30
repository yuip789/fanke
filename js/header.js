$(function(){
    // //加载首页 头部导航下拉
	$("#headerAll").load("header.html",function(){
	  	var $li=$("#header_nav_1>li");
        //   console.log($li);
		for(var li of $li){
			li.onmouseover=function(){
                // console.log($(this));
			   $(this).children(".dropup").removeClass("dropup")
				   .addClass("dropdown hover");
			};
			 li.onmouseout=function(){
			 	$(this).children("div").addClass("dropup hover");
			 }
		}
		//登录
		$("#login").hide();
        $.ajax({
            type:"get",
            url:"data/02_islogin.php",
            success:function(data){
                if(data.code==1){
                    $("#unLogin").hide();
                    $("#login").show();
                    $("#loginWel").html("欢迎"+data.uname);
                }else{
                    $("#unLogin").show();
                    $("#login").hide();
                }
            },
            // error:function(){
            //     alert("网络故障请检查")
            // }
        });
        //注销
        $("#btn_logOut").click(function () {
            $.ajax({
                url:"data/03_logout.php",
                success:function(data){
                  location.reload();
                }
            })
        });
        $(window).scroll(()=>{
            var scrollTop=$(window).scrollTop();
            var $p=$("#header_search>div:first-child>p");
            if(scrollTop>400){
                $("#header>div:first-child").addClass("fixed_top");
                $p.addClass("fixed_search");
            }else if(scrollTop<=400){
                $("#header>div:first-child").removeClass("fixed_top");
                $p.removeClass("fixed_search");
            } 
        });
        //搜索框搜索
        function search(){
            var $input=$("#toSearch");
            $input.keyup((e)=>{
                var $val=$(e.target).val();
                var searchHtml="";
                $("#shelper").css({display:"block"});
                 $.ajax({
                     type:"get",
                     url:"data/08_search.php",
                     data:{term:$val},
                     success:function(data){
                         for(var p of data){
                            searchHtml+=`<li class=${p.pid}>${p.title}</li>`;
                         }
                         $("#shelper").html(searchHtml);              
                     },
                     error:function(){
                         alert("网络故障，请检查");
                     }
                 });
                $("#shelper").click((e)=>{
                     $input.val($(e.target).html()); 
                      location="product_detail.html?"+"pid="+$(e.target).attr("class");
                     var pid=$(e.target).attr("class");
                      loadProduct(pid);                        
                })
            });
            
                   
            
        }
        search();
	})




})