/* 
* @Author: Marte
* @Date:   2017-11-09 19:34:51
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-15 14:56:50
*/
require(['config'],function(){
    require(['common','jquery','header'],function(){
        $(".head_2_ul").css("display","block");
        $(".head_2 div").mouseenter(function(){
            $(".head_2_ul").css("display","block");
        }).mouseleave(function(){
            $(".head_2_ul").css("display","block");
        });
        $(".head_2_ul_1").find("a").eq(0).css("color","red");
        // 轮播图
        var lbt = new Carousel({
            width:714,
            height:382,
            duration:2000,
            type:"fade",
            imgs:["../img/nav1.jpg","../img/nav2.jpg","../img/nav3.jpg","../img/nav4.jpg"]
        });
        
    });
});
