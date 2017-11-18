/* 
* @Author: Marte
* @Date:   2017-11-09 19:34:51
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-16 20:29:11
*/
require(['config'],function(){
    require(['common','jquery'],function(){
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
        $(".head_2_ul_1").find("a").eq(0).css("color","red");
        // 轮播图
        var lbt = new Carousel({
            width:714,
            height:382,
            duration:2000,
            type:"fade",
            imgs:["../img/nav1.jpg","../img/nav2.jpg","../img/nav3.jpg","../img/nav4.jpg"]
        });
        
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
            $(".nav1_1").html(`
                <img src="../img/g3.jpg"/>
                <p>Hi!  <span style="color:#58bc58;"> ${res} </span>  </p>
                <p>欢迎来到惠家有<p/>
            `);
            $(".nav1_1 img").css({"width":"90px","margin-left":"70px","margin-bottom":'10px'});
        }

        // 点击退出事件
        $(".head_1_1 ul .btn").on("click",function(){
            // 删除生成的li并显示登录注册按钮
            $(this).closest("li").remove();
            $(".head_1_1 ul .lg").show();
            // 删除cookie
            Cookie.remove("username");
            $(".nav1_1").html(`
                <img src="img/dome_07.png" />
                <p>hi!欢迎来到惠家有</p>
                <button><a href="html/logIn.html">登 录</a></button>
                <a href="html/signIn.html">免费注册</a>
            `);
        })

        // 点击li跳转到列表页并传参
        $(".head_2 div ul").on("click","li",function(){
            location.href = "html/list.html?classify=生活电器";
        })
    });
});
