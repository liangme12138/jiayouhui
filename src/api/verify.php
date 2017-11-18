<?php
/**
 * @Author: Marte
 * @Date:   2017-11-15 20:08:35
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-16 00:40:43
 */
    // 引入其他php文件
    include "connect.php";
    $phone = isset($_GET["phone"]) ? $_GET["phone"] : "";
    // 查看用户名是否已经存在
    $sql = "select username from user where username = $phone";
    //获取查询结果集
    $result = $conn->query($sql);
    // 如果用户名已经存在
    // 给前端返回一个fail
    if($result->num_rows>0){
        echo "fail";
    }else{
        echo "succee";
    }
    // 关闭连接
    $conn->close();
?>