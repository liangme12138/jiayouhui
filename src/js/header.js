/* 
* @Author: Marte
* @Date:   2017-11-11 16:44:01
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-20 00:14:11
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
        // 点击li跳转到列表页并传参
        $(".head_2 div ul").on("click","li",function(){
            location.href = "./list.html?classify=生活电器";
        });
        // 加入购物车
        var arr_goods = [];
        // 总数
        var times = "";
        // 个数
        var qty = 0;
        // 先查看当前购物车有无cookie
        var cookies = document.cookie;
        if(cookies.length>0){
            cookies = cookies.split('; ');
            cookies.forEach(function(item){
                var arr = item.split("=");
                if(arr[0] == "cartlist"){
                    arr_goods = JSON.parse(arr[1]);
                    arr_goods.forEach(function(item){
                        qty += item.qty
                    })
                    times = qty;
                    $(".head_car_1").html(times);
                    
                }
            })
        }
        if(arr_goods.length!=0){
            $(".car_div").hide();
            $(".contents").show();
        }else{
            $(".car_div").show();
            $(".contents").hide();
        }
        var timer;
        // 将商品写进购物车
        $(".head_car").mouseenter(function(){
            clearInterval(timer);
            if(arr_goods.length>0){
                $(".head_car_2").css("display","none");
                $(".head_car_3").css("display","block");
                var $ul = $(this).find("ul");
                var sum=0;
                $ul[0].innerHTML = arr_goods.map(function(item){
                    sum += item.price*item.qty;
                    $(".all").html(times);
                    $(".qian").html(sum);
                    return `<li class="clearfix" data-id="${item.id}">
                        <img src="../img/${item.imgurl}"/>
                        <p>${item.goodsName}<p/>
                        <p>${item.price}×${item.qty}<p/>
                        <span class="btn">删除<span/>
                    <li/>`;
                }).join("");
            }else{
                $(".head_car_2").css("display","block");
                $(".head_car_3").css("display","none");
            }
        });
        $(".head_car").mouseleave(function(){
            timer = setTimeout(function(){
                $(".head_car_2").css("display","none");
                $(".head_car_3").css("display","none");
            },1000);
        })
        // 点击删除商品
        $(".head_car").on("click","span",function(){
            var id = $(this).closest("li").attr("data-id");
            $(this).closest("li").remove();
            //删除对应的商品
            for(var i=0;i<arr_goods.length;i++){
                if(arr_goods[i].id == id){console.log(66)
                    times -= arr_goods[i].qty;
                    arr_goods.splice(i,1);
                    $(".all").html(times);
                    $(".head_car_1").html(times);
                    break;
                }
            }
            if(arr_goods.length==0){
                $(".car_div").show();
                $(".contents").hide();
            }
            // 存入cookie（cookie只能保存字符串）
            var now = new Date();
            now.setDate(now.getDate()+99);
            document.cookie = 'cartlist=' + JSON.stringify(arr_goods) + ';expires=' +now.toString()+'; path=/;';
            if(arr_goods.length>0){
                // 将商品从新写入购物车
                var $ul = $(".head_car").find("ul");
                $ul.html("");
                var sum=0;
                $ul[0].innerHTML = arr_goods.map(function(item){
                    sum += item.price*item.qty;
                    
                    $(".qian").html(sum);
                    return `<li class="clearfix" data-id="${item.id}">
                        <img src="../img/${item.imgurl}"/>
                        <p>${item.goodsName}<p/>
                        <p>${item.price}×${item.qty}<p/>
                        <span class="btn">删除<span/>
                    <li/>`;
                }).join("");
            }
        });
        // 点击图片跳转到详情页
        $(".head_car").on("click","img",function(){
            console.log(666)
            var id = $(this).closest('li').attr("data-id");
            location.href = "./datalist.html?id=" + id;
        })
    });
});

