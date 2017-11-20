/* 
* @Author: Marte
* @Date:   2017-11-13 20:50:24
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-20 01:06:05
*/
require(['config'],function(){
    require(['common','jquery'],function(){
        $(".head").load("../html/header.html");
        $(".foot").load("../html/footer.html");
        require(['header'],function(){
            var arr_goods = [];
            var times = 0;
            var qty = 0;

            // 先查看当前购物车有无cookie
            var cookies = document.cookie;console.log(cookies)
            if(cookies.length>0){
                cookies = cookies.split('; ');
                cookies.forEach(function(item){
                    var arr = item.split('=');
                    if(arr[0] == 'cartlist'){
                        arr_goods = JSON.parse(arr[1]);
                        var subtotal = 0;
                        var sum = 0;
                        arr_goods.forEach(function(item){
                            qty += item.qty;
                            var subtotal = (item.price) * (item.qty);
                            sum+=subtotal;
                            $('.contents_goods_ul').append(`
                                <li>
                                    <ul class="clearfix" data-id="${item.id}">
                                        <li><input type="checkbox" checked class="contents_goods_ul_check"/></li>
                                        <li>
                                            <img src='../img/${item.imgurl}' />
                                            <a href="./datalist.html?id=${item.id}">${item.goodsName}</a>
                                        </li>
                                        <li class="price_l">${item.price}</li>
                                        <li>-</li>
                                        <li class="li_sa">
                                            <span class="contents_goods_ul_sub">-</span>
                                            <input type="text" value="${item.qty}" />
                                            <span class="contents_goods_ul_add">+</span>
                                        </li>
                                        <li class="xiaoji">￥${subtotal}</li>
                                        <li>
                                            <a href="javascript:void(0)">收藏</a>
                                            <a href="javascript:void(0)" class="contents_goods_ul_btn">删除</a>
                                        </li>
                                    </ul>
                                </li>
                            `);
                        })
                        times = qty;
                        $('.sum').html(sum);
                    }
                });
                
                
                // 一键清空购物车
                var id = [];
                $(".contents").on("click","a",function(){
                    if($(this).html() == "清空购物车"){
                        $(".contents_goods_ul").html(0);
                        var now = new Date();
                        now.setDate(now.getDate()-199);
                        document.cookie = 'cartlist=' + JSON.stringify(arr_goods) + ';expires=' +now.toString()+'; path=/;';
                        $(".head_car_1").html(0);
                        $(".car_div").show();
                        $(".contents").hide();
                    }else if($(this).html() == "删除选中的商品"){
                        var $arr_check = $(".contents_goods_ul").find(":checkbox");
                        $arr_check.each(function(idx,item){
                            
                            if($(item).prop("checked")){
                                // 获取商品id
                                var id_checked = $(item).closest("ul").attr("data-id");
                                // 删除li结构
                                $(item).closest("ul").closest("li").remove();
                                id.push(id_checked);
                                console.log(666)
                            }
                        });
                        btn();

                    }else if($(this).html() == "删除"){
                        var id_1 = $(this).closest("ul").attr("data-id");
                        $(this).closest("ul").closest("li").remove();
                        id.push(id_1);
                        btn();
                    }
                    function btn(){
                        if(arr_goods.length>0){

                            //删除对应的商品
                            for(var i=0;i<arr_goods.length;i++){
                                for(var j=0;j<id.length;j++){
                                    if(arr_goods[i].id == id[j]){
                                        times -= arr_goods[i].qty;
                                        arr_goods.splice(i,1);
                                        $(".all").html(times);
                                        $(".head_car_1").html(times);
                                        break;
                                    }
                                }
                            }
                            // 存入cookie（cookie只能保存字符串）
                            var now = new Date();
                            now.setDate(now.getDate()+99);
                            document.cookie = 'cartlist=' + JSON.stringify(arr_goods) + ';expires=' +now.toString()+'; path=/;';
                            // 将商品从新写入购物车
                            var $ul = $(".head_car").find("ul");
                            $ul.html("");
                            var sum=0;
                            $ul[0].innerHTML = arr_goods.map(function(item){
                                sum += item.price*item.qty;
                                
                                $(".qian").html(sum);
                                $(".sum").html(sum);
                                return `<li class="clearfix" data-id="${item.id}">
                                    <img src="../img/${item.imgurl}"/>
                                    <p>${item.goodsName}<p/>
                                    <p>${item.price}×${item.qty}<p/>
                                    <span class="btn">删除<span/>
                                <li/>`;
                            }).join("");
                            var timer;
                            // 将商品写进购物车
                            $(".head_car").mouseenter(function(){
                                clearInterval(timer);
                                if(arr_goods.length>0){console.log(11)
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
                            });
                            if(arr_goods.length!=0){
                                $(".car_div").hide();
                                $(".contents").show();
                            }else{
                                $(".car_div").show();
                                $(".contents").hide();
                            };
                        }
                    }
                })
                var all1 = document.querySelector(".all1");
                var invert = document.querySelector(".invert");
                var radio = document.querySelectorAll(".contents_goods_ul_check");
                // 全选/反选
                checked(all1,invert,radio);
                // 点击加减
                $(".li_sa").on("click","span",function(){
                    $num_p = $(this).siblings("input");
                    if($(this).html() == "-"){
                        if($num_p.val() <= 1){
                            $num_p.val(1);
                        }else{
                            $num_p.val($num_p.val()*1 - 1);
                        }
                    }else if($(this).html() == "+"){
                        $num_p.val($num_p.val()*1 + 1);
                    }
                    var sum = $(this).closest("ul").find(".price_l").text() * ($num_p.val());
                    // 计算小计数
                    $(this).closest("ul").find(".xiaoji").html("￥"+ sum);
                    var id = $(this).closest("ul").attr("data-id");
                    // 改变数组中的qty
                    for(var i=0;i<arr_goods.length;i++){
                        if(arr_goods[i].id == id){
                            arr_goods[i].qty = $num_p.val()*1;
                            break;
                        }
                    }
                    // 写入cookie
                    // 存入cookie（cookie只能保存字符串）
                    var now = new Date();
                    now.setDate(now.getDate()+99);
                    document.cookie = 'cartlist=' + JSON.stringify(arr_goods) + ';expires=' +now.toString()+'; path=/;';
                    // 将商品从新写入购物车
                    var $ul = $(".head_car").find("ul");
                    $ul.html("");
                    console.log($ul)
                    var sum1=0;
                    var times1 = 0;
                    $ul[0].innerHTML = arr_goods.map(function(item){
                        sum1 += item.price*item.qty*1;
                        times1 += item.qty*1;
                        $(".head_car_1").html(times1);
                        $(".all").html(times1);
                        $(".qian").html(sum1);
                        $(".sum").html(sum1);

                        return `<li class="clearfix" data-id="${item.id}">
                            <img src="../img/${item.imgurl}"/>
                            <p>${item.goodsName}<p/>
                            <p>${item.price}×${item.qty}<p/>
                            <span class="btn">删除<span/>
                        <li/>`;
                    }).join("");

                    var timer;
                    // 将商品写进购物车
                    $(".head_car").mouseenter(function(){
                        clearInterval(timer);
                        if(arr_goods.length>0){console.log(11)
                            $(".head_car_2").css("display","none");
                            $(".head_car_3").css("display","block");
                            var $ul = $(this).find("ul");
                            var sum=0;
                            $ul[0].innerHTML = arr_goods.map(function(item){
                                sum += item.price*item.qty;
                                $(".all").html(times1);
                                $(".qian").html(sum1);
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
                });
            }


        });
    });
});

