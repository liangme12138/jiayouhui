/* 
* @Author: Marte
* @Date:   2017-11-11 16:44:01
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-16 11:12:38
*/
require(['config'],function(){
    require(['jquery'],function(){
        
        // 判断是否有cookies,有则获取cookies
        var res = Cookie.get("username");
        if(res !== ""){
            $li = $("<li/>");
            $li.html(`欢迎<span style="color:#58bc58;"> ${res}</span> 再次登录！  <span style="color:red;cursor:pointer;" class="btn">退出</span>`).appendTo($(".head_1_1 ul"));
            $(".head_1_1 ul").css("position","relative");
            $(".head_1_1 ul .lg").hide();
            $li.css({
                "position":"absolute",
                "left":"-220px",
                "top":0,
                "background":"#E5E5E5",
                "z-index":12,
                "font-size":"12px",
                "margin-top":"6px"
            });

        }
        // 点击退出事件
        $(".head_1_1 ul .btn").on("click",function(){
            // 删除生成的li并显示登录注册按钮
            $(this).closest("li").remove();
            $(".head_1_1 ul .lg").show();
            // 删除cookie
            Cookie.remove("username","/");
        })
        
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

