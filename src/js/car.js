/* 
* @Author: Marte
* @Date:   2017-11-13 20:50:24
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-15 14:28:59
*/
require(['config'],function(){
    require(['common','jquery'],function(){
        $(".head").load("../html/header.html");
        $(".foot").load("../html/footer.html");
        require(['header'],function(){

        });
    });
});

