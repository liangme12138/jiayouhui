<?php
/**
 * @Author: Marte
 * @Date:   2017-11-16 20:13:05
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-11-18 01:04:37
 */
    include "connect.php";
    $pageNo = isset($_GET["pageNo"]) ? $_GET["pageNo"] : "";
    $qty = isset($_GET["qty"]) ? $_GET["qty"] : "";
    $status = isset($_GET["status"]) ? $_GET["status"] : "";
    $state = isset($_GET["state"]) ? $_GET["state"] : "";
    $val1 = isset($_GET["val1"]) ? $_GET["val1"] : "";
    $val2 = isset($_GET["val2"]) ? $_GET["val2"] : "";

    // 查询数据库
    if($val1 != ""){
        $sql = "select * from goods where price between $val1 and $val2";
    }else{
        $sql = "select * from goods";
    }
    $startIdx = $qty*($pageNo-1);
    if($status == "desc"){
        $sql .= " order by $state desc";
    }else if($status == "asc"){
        $sql .= " order by $state asc";
    }
    $sql .= " limit $startIdx,$qty";
    // 获取结果
    $result = $conn->query($sql);

    //使用查询结果集
    // $row = $result->fetch_assoc(MYSQLI_ASSOC);
    // var_dump($result);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    // 关联数组
    $res = array(
        'pageNo'=>$pageNo,
        'qty'=>$qty,
        'total'=>$conn->query('select count(*) from goods')->fetch_row()[0],
        'data'=>$row,
        'status'=>200,
        'msg'=>'success'
    );

    // 输出结果
    if($result->num_rows>0){
        echo json_encode($res,JSON_UNESCAPED_UNICODE);
    }else{
        echo "false";
    }
    // 释放查询内存(销毁)
    $result->free();
    // 关闭连接
    $conn->close();
?>