/* 
* @Author: Marte
* @Date:   2017-11-14 10:58:23
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-18 09:38:08
*/

require(['config'],function(){
    require(['common','jquery'],function(){
        $(".head").load("../html/header.html");
        $(".foot").load("../html/footer.html");
        require(['header'],function(){
            
            // 列表展开
            $(".list_m_1 span").on("click",function(){
                if($(this).find("i").hasClass("icon-down-trangle")){
                    $(this).find("i").removeClass("icon-down-trangle").addClass('icon-xiangxia');
                    $(this).prev("dd").css("height","116px");
                    $(this).prev("dd").prev("dt").css("height","116px");
                }else{
                    $(this).find("i").removeClass("icon-xiangxia").addClass('icon-down-trangle');
                    $(this).prev("dd").css("height","58px");
                    $(this).prev("dd").prev("dt").css("height","58px");
                }
            });
            // 获取url上的参数
            // var arr_list = location.search.slice(1).split("=");
            // var val_list;
            // if(arr_list[0] = "classify"){
            //     val_list = arr_list[1];
            // }
            
            var status = "";
            var state = "";
            $(".list_m_1_list").lazyLoad({
                url:"../api/list.php",
                status:status,
                state:state
            });
            // 点击排序事件
            $(".list_m_1_ul").on("click","li",function(){
                if(!$(this).hasClass('last')){
                    // 清空ul
                    $(".list_m_1_list").empty();
                    $(".list_m_2 ul").empty();
                    $(".list_m_3_div").empty();
                    $(this).addClass('list_m_1_active').siblings("li").not(".last").removeClass('list_m_1_active');
                    var $this = $(this).text();
                    // 销量
                    if($this == "销量" || $this == "人气"){
                        state = "sales";
                        if($(this).find("i").hasClass('icon-shang')){
                            $(this).find("i").removeClass("icon-shang").addClass('icon-shang1')
                            status = "asc";
                        }else if($(this).find("i").hasClass('icon-shang1')){
                            $(this).find("i").removeClass("icon-shang1").addClass('icon-shang')
                            status = "desc";
                        }
                        $(".list_m_1_list").lazyLoad({
                            url:"../api/list.php",
                            state:state,
                            status:status
                        });
                    }else if($this == "综合"){
                        status = "";
                        state = "";
                        $(".list_m_1_list").lazyLoad({
                            url:"../api/list.php",
                        });

                    }else if($this == "价格"){
                        state = "price";
                        if($(this).hasClass('list_price')){
                            status = "desc";
                            $(this).removeClass('list_price');
                        }else{
                            status = "asc";
                            $(this).addClass('list_price')
                        }
                        $(".list_m_1_list").lazyLoad({
                            url:"../api/list.php",
                            state:state,
                            status:status
                        });
                    }
                }
            });
            // 查看范围内的数据的事件
            $(".last").on("click","button",function(){
                
                state = "price";
                // 获取数值
                var val1 = $(".last").find("input").eq(0).val();
                var val2 = $(".last").find("input").eq(1).val();
                if(!isNaN(val1) && !isNaN(val2)){

                    $(".list_m_1_list").empty();
                    $(".list_m_2 ul").empty();
                    $(".list_m_3_div").empty();
                    $(".list_m_1_list").lazyLoad({
                        url:"../api/list.php",
                        val1:val1,
                        val2:val2,
                        state:state,
                        status:status
                    });
                }
            });

            // 手动轮播图
            var list_m_3_div = $(".list_m_3_div")[0];
            var idx = 0;
            var target;
            // 点击上一列事件
            $(".list_m_3prev").on("click",function(){
                idx--;
                if(idx<0){
                    idx = 2;
                }
                target = -1167 * idx;
                animate(list_m_3_div,{left:target});
            });
            // 点击下一列事件
            $(".list_m_3next").on("click",function(){
                idx++;
                if(idx>2){
                    idx = 0;
                }
                target = -1167 * idx;
                animate(list_m_3_div,{left:target});
            });
            // 点击跳转到详情页|
            $(".list_m").on('click',"img",function(){
                var val = $(this).closest("li").attr("data-guid");
                location.href = "../html/datalist.html?id=" + val;
            })
        });
    });
});
