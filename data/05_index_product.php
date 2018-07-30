<?php
    //首页商品
    require("00_init.php");
    $sql="select * from fk_index_product";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,1);
    echo json_encode($rows);

?>