<?php
    //首页轮播
    require("00_init.php");
    $sql="select img,title from fk_index_carousel";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,1);
    echo json_encode($rows);
?>