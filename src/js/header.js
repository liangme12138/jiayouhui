/* 
* @Author: Marte
* @Date:   2017-11-11 16:44:01
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-15 14:44:30
*/
require(['config'],function(){
    require(['jquery'],function(){
        
        // 头部二维码
        var timer;
        $(".head_1_1_li1").mouseenter(function(){
            clearInterval(timer);
            $(".head_1_1_li1").siblings().find("div").css("display","none");
            $(this).find("div").css("display","block");
        }).mouseleave(function(){
            timer = setTimeout(function(){
                $(this).find("div").css("display","none");
            }.bind(this),1000);
        });
        // 头部购物车
        var timerCar;
        $(".head_car").mouseenter(function(){
            clearInterval(timerCar);
            $(this).find("div").css("display","block");
        }).mouseleave(function(){
            timerCar = setTimeout(function(){
                $(this).find("div").css("display","none");
            }.bind(this),1000);
        });
        // 二级导航
        $(".head_2_ul").css("display","none");
        $(".head_2 div").mouseenter(function(){
            $(".head_2_ul").css("display","block");
        }).mouseleave(function(){
            $(".head_2_ul").css("display","none");
        });
    });
});

