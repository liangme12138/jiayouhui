/* 
* @Author: Marte
* @Date:   2017-11-14 20:32:15
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-18 10:53:24
*/
require(['config'],function(){
    require(['common','jquery'],function(){
        $(".head").load("../html/header.html");
        $(".foot").load("../html/footer.html");
        require(['header'],function(){
            // 获取url上的参数
            var dataArr = location.search.slice(1).split("=");
            var val;
            if(dataArr[0] == "id"){
                val = dataArr[1];
            }
            // 发送请求，请求数据
            ajax.request({
                type:"get",
                url:"../api/datalist.php",
                data:{id:val},
                async:true,
                success:function(res){
                    console.log(res[0])
                    var $img = $("<img/>");
                    $img.attr("src","../img/" + res[0].imgurl).appendTo($(".list_d_1_img div"));
                    $img.css("width","460px");
                    
                }
            })
        });
    });
});