<?php
require("00_init.php");
@$kw=$_REQUEST["term"];//?term=mac 256g
	$sql="select pid,title from fk_product ";
	if($kw){
		$kws=explode(" ",$kw);
		for($i=0;$i<count($kws);$i++){
			$kws[$i]=" title like '%".$kws[$i]."%' ";
		}
		$sql.=" where ".implode(" and ",$kws);
	}
	$sql.=" order by pid DESC limit 5";
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
?>