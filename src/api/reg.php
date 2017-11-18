<?php
/**
 * @Author: Marte
 * @Date:   2017-11-15 20:08:35
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-16 00:53:01
 */
    // 引入其他php文件
    include "connect.php";
    $phone = isset($_GET["phone"]) ? $_GET["phone"] : "";
    $password = isset($_GET["password"]) ? $_GET["password"] : "";
    
    // 给密码加密
    $password = md5($password);
    // 将数据写进数据库
    $sql = "insert into user(username,password) values ('$phone','$password')";
    // 获取查询结果
    $result = $conn->query($sql);
    if($result){
        echo "ok";
    }else{
        echo "error:" . $sql . "<br>" . $conn->error;
    }
    // 关闭连接
    $conn->close();
?>