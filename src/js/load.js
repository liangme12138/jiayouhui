/* 
* @Author: Marte
* @Date:   2017-11-15 14:02:44
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-15 14:19:58
*/

define(['jquery'],function(){
    return {
        load: function(){
            $(".head").load("../html/header.html");
            $(".foot").load("../html/footer.html");
        }
    };
});