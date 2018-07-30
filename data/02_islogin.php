<?php
    require("00_init.php");
    session_start();
    $uid=$_SESSION["uid"];

    if($uid){
        $sql="select uname from fk_user where uid=$uid";
        $result=mysqli_query($conn,$sql);
        $row=mysqli_fetch_assoc($result);
        $row=["code"=>1,"uname"=>$row["uname"]];

        echo json_encode($row);

    }
?>