/* 
* @Author: Marte
* @Date:   2017-11-14 20:32:15
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-20 00:43:48
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
                success:function(res){
                    console.log(res[0],6)
                    var $img = $("<img/>");
                    $img.attr({"src":"../img/" + res[0].imgurl,"data-big":"../img/" + res[0].imgurl}).appendTo($(".list_d_1_img div"));
                    $img.css({"width":"460px","height":"460px"});
                    var urlArr_1 = res[0].minImg.split(",");
                    console.log(urlArr_1)
                    // 遍历将图片写入页面
                    $(".list_d_1_img ul")[0].innerHTML = urlArr_1.map(function(item){
                        console.log(item)
                        return `<li><img src="../img/${item}"/><li/>`;
                    }).join("");
                    var $cont = $(".list_d_1_cont");
                    $cont.find("h3").html(res[0].goodsName);
                    $(".price").find("b").html("￥" + res[0].price);
                    $(".price").find("del").html("￥" + res[0].oldPrice);
                    $(".data-id").find("span").html(res[0].id);
                    $(".shou").find("span").html(res[0].sales);
                    $(".total").find("span").html("￥" +res[0].price);
                    var $num_p ;
                    // 点击加减
                    $(".number").on("click","span",function(){
                        $num_p = $(".number").find("input");
                        if($(this).html() == "-"){
                            if($num_p.val() <= 1){
                                $num_p.val(1);
                            }else{
                                $num_p.val($num_p.val()*1 - 1);
                            }
                        }else if($(this).html() == "+"){
                            $num_p.val($num_p.val()*1 + 1);
                        }
                        // 计算总数
                        $(".total").find("span").html("￥" +res[0].price*$num_p.val());
                    });
                    // 失去焦点时计算总数
                    $(".number").find("input").blur(function(){
                        $(".total").find("span").html("￥" +res[0].price*$(".number").find("input").val());
                    });
                    // 放大镜
                    $('.bigPic').gdsZoom({height:460,width:460,position:"right"});

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
                                    qty += item.qty;
                                })
                                times = qty;
                                $(".head_car_1").html(times);
                                
                            }
                        })
                    }
                    // 点击加入购物车
                    $(".daCar").on("click",function(){
                        // 总数
                        times += $(".number").find("input").val()*1;
                        $(".head_car_1").html(times);
                        // >复制当前商品图片(用于实现动画效果)
                        var copyImg = $('.bigPic img').clone();
                        var top = $('.bigPic img').offset().top;
                        var left = $('.bigPic img').offset().left;
                        //  * 把复制的图片写入页面
                        //  把复制的图片定位到与当前商品图片一致
                        $('body').append(copyImg);
                        copyImg.css({'position':'absolute','top':top,'left':left,'z-index':'1'});
                        // 判断cookie中是否存在当前商品
                        for(var i=0;i<arr_goods.length;i++){
                            if(arr_goods[i].id === dataArr[1]){
                                arr_goods[i].qty += $(".number").find("input").val()*1;
                                break;
                            }
                        }
                        // 如果arr_goods中不存在当前商品
                        if(i===arr_goods.length){
                            // 获取对应商品信息
                            var goods = {
                                id:dataArr[1],
                                imgurl:res[0].imgurl,
                                goodsName:res[0].goodsName,
                                price:res[0].price,
                                qty:$(".number").find("input").val()*1
                            }
                            arr_goods.push(goods);
                        }
                        // 存入cookie（cookie只能保存字符串）
                        var now = new Date();
                        now.setDate(now.getDate()+99);
                        document.cookie = 'cartlist=' + JSON.stringify(arr_goods) + ';expires=' +now.toString()+'; path=/;';
                        // 动画飞入效果
                        var width = $(window).width();
                        var obj = copyImg.offset();
                        var right = (width-obj.left-200)+"px";
                        var top = -obj.top+160+"px";
                        copyImg.animate({top:top,left:right,width:20,height:20},600,function(){
                                copyImg.remove();
                            });
                        // 将数据写入购物车
                        var $ul = $(".head_car").find("ul");
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
                    });
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
                            return `<li class="clearfix" data-id="${item.id}">
                                <img src="../img/${item.imgurl}"/>
                                <p>${item.goodsName}<p/>
                                <p>${item.price}×${item.qty}<p/>
                                <span class="btn">删除<span/>
                            <li/>`;
                        }).join("");
                    });

                    // 规格参数
                    $(".count_1").html(`
                        <p>【商品编码】：${res[0].id}</p>
                        <p>【产地】：中国</p>
                    `);

                    // 点击切换商品详情/规格参数
                    $(".head_1").on("click","div",function(){
                        var idx = $(this).index();
                        $(this).addClass('head_1_active').siblings("div").removeClass('head_1_active');
                        $(".count").find("div").eq(idx).show().siblings("div").hide();

                    });
                }
            });
            // 点击切换大小图
            $(".list_d_1_img ul").on("click","img",function(){
                var url = $(this).attr("src");
                $(this).addClass('active').closest("li").siblings("li").find("img").removeClass('active');
                $(".list_d_1_img div img").attr({"src":url,"data-big":url});
            });
            // 点击收藏
            $(".icon-shoucang").on("click",function(){
               
                console.log($(this).css('color'));
                $(this).css('color') == 'rgb(255,0,0)' ? $(this).css('color','rgb(0,0,0)') : $(this).css('color','rgb(255,0,0)' );
            })

        });
    });
});
