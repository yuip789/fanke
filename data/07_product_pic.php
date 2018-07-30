<?php
    require("00_init.php");
    session_start();
    @$pid=$_REQUEST["pid"];
    $sql="select pid,sm,md,lg from fk_product_pic where pro_id=$pid";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_all($result,1);
    echo json_encode($row);
?>