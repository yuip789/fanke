<?php
    require("00_init.php");
    session_start();
    @$pid=$_REQUEST["pid"];
    $sql="select title,price,number from fk_product where pid=$pid";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($result);
    echo json_encode($row);
?>