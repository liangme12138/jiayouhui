/* 
* @Author: Marte
* @Date:   2017-11-14 19:41:46
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-15 14:15:14
*/
require.config({
    paths:{
        jquery:"../lib/jquery-3.2.1",
        yzm:"../lib/yanzm/jQueryYzm/js/gVerify",
        common:"../lib/common"
    },
    shim:{
        yzm:["jquery"],
        common:['jquery']
    }
})