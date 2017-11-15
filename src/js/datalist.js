/* 
* @Author: Marte
* @Date:   2017-11-14 20:32:15
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-15 14:29:33
*/
require(['config'],function(){
    require(['common','jquery'],function(){
        $(".head").load("../html/header.html");
        $(".foot").load("../html/footer.html");
        require(['header'],function(){

        });
    });
});