/* 
* @Author: Marte
* @Date:   2017-11-14 10:58:23
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-15 14:30:31
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
        });
    });
});
