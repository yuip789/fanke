<?php
    require("00_init.php");
    @$uname=$_REQUEST["uname"];
//    if($uname==""){
//        echo "用户名不能为空";
//    }
    @$upwd=$_REQUEST["upwd"];
//  if($upwd==""){
//        echo "用户名不能为空";
//    }
    $sql="select * from fk_user where uname='$uname' and upwd='$upwd'";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($result);
    //查询结果
    if($row==null){
        echo '{"code":-1,"msg":"用户名或密码错误"}';// "用户名或密码错误";
    }else{
        session_start();//打开session，将用户uid放入
        $_SESSION["uid"]=$row["uid"];
        echo '{"code":1,"msg":"登录成功"}';//"登录成功";
    }
?>