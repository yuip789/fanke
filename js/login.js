$(function(){
    $("#btn").click(function(){
            //先获取用户名密码
            var $u=$("#uname").val();
            var $p=$("#upwd").val();

            // 发送异步请求
            $.ajax({
                type:"post",
                url:"data/01_login.php",
                data:{uname:$u,upwd:$p},
                success:function (data) {
                    if(data.code>0){
                        alert("登陆成功");
                        location="index.html";
                    }else{
                        alert("用户名或密码错误");
                    }
                },
                error:function () {
                    alert("网络故障，请检查");
                }
            })
        }
    );
})