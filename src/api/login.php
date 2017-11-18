<?php
/**
 * @Author: Marte
 * @Date:   2017-11-15 20:08:35
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-16 01:17:31
 */
    // 引入其他php文件
    include "connect.php";
    $phone = isset($_GET["phone"]) ? $_GET["phone"] : "";
    $password = isset($_GET["password"]) ? $_GET["password"] : "";
    // 给密码md5加密
    $password = md5($password);
    $sql = "select *from user where username = '$phone' and password = '$password'";
    // 获取查询结果
    $result = $conn->query($sql);
    $row = $result->fetch_row();
    if($row[0]){
        echo 'true';
    }else{
        echo 'false';
    }
    
    // 关闭连接
    $conn->close();
?>