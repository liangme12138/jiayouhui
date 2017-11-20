/* 
* @Author: Marte
* @Date:   2017-11-09 19:34:51
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-19 22:35:37
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
        // var lbt = new Carousel({
        //     width:714,
        //     height:382,
        //     duration:2000,
        //     type:"fade",
        //     imgs:["../img/nav1.jpg","../img/nav2.jpg","../img/nav3.jpg","../img/nav4.jpg"]
        // });
        
        $(".carousel").lmLbt({
            width:714,
            height:382,
            duration:2000,
            type:"fade",
            ele:".carousel",
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
        });
        $("nav").on("click","img",function(){
            location.href = "html/list.html?classify=生活电器";
        })
        // 加入购物车
        var arr_goods = [];
        // 总数
        var times = 0;
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
            location.href = "html/datalist.html?id=" + id;
        });
        // 获取元素
        var countDown = document.querySelector(".countDown");
        // 倒计时
        timeOut();
        var timer = setInterval(timeOut,1000);
        function timeOut(){
            // 设置结束时间
            var end = '2017/11/29 00:00:00';
            // 计算剩余时间
            var times = (Date.parse(end) - Date.now())/1000;
            if(times<=0){
                // countDown.style.display = 'none';
                clearInterval(timer);
            }
            // 计算剩余的时分秒
            var sec = Math.floor(times%60);
            var min = Math.floor(times/60%60);
            var hour = Math.floor(times/60/60%24);
            var days = Math.floor(times/60/60/24);
            // 补0操作
            days = (days < 10 ? "0" : '') + days;
            hour = (hour < 10 ? "0" : '') + hour;
            min = (min < 10 ? "0" : '') + min;
            sec = (sec < 10 ? "0" : '') + sec;
            // 将时分秒变成字符串
            var str = days+hour+min+sec;
            // 将时间写入页面
            countDown.innerHTML = '<img src="img/' + str[0] + '.png"><img src="img/' + str[1] + '.png">天<img src="img/' + str[2] + '.png"><img src="img/' + str[3] + '.png">时<img src="img/' + str[4] + '.png"><img src="img/' + str[5] + '.png">分<img src="img/' + str[6] + '.png"><img src="img/' + str[7] + '.png">秒';
        }
        // 获取元素
        var ul1 = document.querySelectorAll(".list_m_3_div");
        var ul2 = document.querySelectorAll(".list_m_2 ul");
        // 发送请求抢购与喜欢，热销
        $.get("./api/list.php",{
            pageNo:1,
            qty:15
        },function(data){
            console.log(data)
            var res = JSON.parse(data);
            for(var i=0;i<ul1.length;i++){
                // 数据写入抢购
                ul1[i].innerHTML += res.data.map((item,idx)=>{
                    return `<li data-guid="${item.id}">
                        <img src="img/${item.imgurl}"/>
                        <p>${item.goodsName}</p>
                        <p class="fl">￥ ${item.price}<p/>
                        <del>￥ ${item.oldPrice}<del/>
                    </li>`
                }).join('');
            }
            var idx = 0;
            var target;
            var idx1 = 0;
            var target1;
            // 点击上一列事件
            $(".list_m_3prev").on("click",function(){
                var list_m_3_div = $(this).siblings("ul")[0];
                console.log(list_m_3_div)
                idx--;
                if(idx<0){
                    idx = 2;
                }
                target = -1167 * idx;
                animate(list_m_3_div,{left:target});
            });
            // 点击下一列事件
            $(".list_m_3next").on("click",function(){
                var list_m_3_div = $(this).siblings("ul")[0];
                idx1++;
                if(idx1>2){
                    idx1 = 0;
                }
                target1 = -1167 * idx1;
                animate(list_m_3_div,{left:target1});
            });
            // 点击跳转到详情页|
            $(".list_m").on('click',"img",function(){
                var val = $(this).closest("li").attr("data-guid");
                if(val== undefined){
                    location.href = "html/list.html?classify=生活电器";
                }else{
                    location.href = "html/datalist.html?id=" + val;
                }
            })
        });
        $.get("./api/list.php",{
            pageNo:1,
            qty:5
        },function(data){
            console.log(data)
            var res = JSON.parse(data);
            
            // 热销
            for(var i=0;i<ul2.length;i++){
                ul2[i].innerHTML += res.data.map((item,idx)=>{console.log(66)
                    if(idx < 3){
                        return `<li data-guid="${item.id}">
                            <img src="img/${item.imgurl}"/>
                            <p>${item.goodsName}</p>
                            <p>￥ ${item.price}<p/>
                            <span class="i${idx+1}">${idx+1}<span/>
                        </li>`
                    }else{
                        return `<li data-guid="${item.id}">
                            <i><i/>
                            <img src="img/${item.imgurl}"/>
                            <p>${item.goodsName}</p>
                            <p class="fl">￥ ${item.price}<p/>
                        </li>`
                    }
                }).join('');
            }
        });

        // 轮播图
        // var lbt1 = new lmLbt({
        //     width:580,
        //     height:310,
        //     duration:2000,
        //     type:"fade",
        //     ele:".carousel1",
        //     imgs:["../img/1f10.jpg","../img/1f11.jpg","../img/1f10.jpg","../img/1f11.jpg"]
        // });
        $(".carousel1").lmLbt({
            width:580,
            height:310,
            duration:2000,
            type:"fade",
            ele:".carousel1",
            imgs:["../img/1f10.jpg","../img/1f11.jpg","../img/1f10.jpg","../img/1f11.jpg"]
        });
        $(".carousel2").lmLbt({
            width:580,
            height:310,
            duration:2000,
            type:"fade",
            ele:".carousel2",
            imgs:["../img/1f10.jpg","../img/1f11.jpg","../img/1f10.jpg","../img/1f11.jpg"]
        });
        $(".carousel3").lmLbt({
            width:580,
            height:310,
            duration:2000,
            type:"fade",
            ele:".carousel3",
            imgs:["../img/1f10.jpg","../img/1f11.jpg","../img/1f10.jpg","../img/1f11.jpg"]
        });
        $(".carousel4").lmLbt({
            width:580,
            height:310,
            duration:2000,
            type:"fade",
            ele:".carousel4",
            imgs:["../img/1f10.jpg","../img/1f11.jpg","../img/1f10.jpg","../img/1f11.jpg"]
        });
        $(".carousel5").lmLbt({
            width:580,
            height:310,
            duration:2000,
            type:"fade",
            ele:".carousel5",
            imgs:["../img/1f10.jpg","../img/1f11.jpg","../img/1f10.jpg","../img/1f11.jpg"]
        });
    });
});
