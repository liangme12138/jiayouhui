<?php
/**
 * @Author: Marte
 * @Date:   2017-11-18 09:58:19
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-18 10:08:23
 */
    include "connect.php";
    $id = isset($_GET["id"]) ? $_GET["id"] : "";
    $sql = "select * from goods where id = '$id'";
    // 获取结果
    $result = $conn->query($sql);
    //使用查询结果集
    $row = $result->fetch_all(MYSQLI_ASSOC);
    // 输出结果
    if($result->num_rows>0){
        echo json_encode($row,JSON_UNESCAPED_UNICODE);
    }else{
        echo 'false';
    }
    // 关闭连接
    $conn->close();
?>