/* 
* @Author: Marte
* @Date:   2017-11-13 20:07:15
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-15 21:04:41
*/
require(['config'],function(){
    require(['common','jquery','yzm'],function(){
        $(".head").load("../html/header.html");
        $(".foot").load("../html/footer.html");
        require(['header'],function(){
            $(".head_2").remove();
            $(".head_logo").css("height","99px");
            // tab切换
            $(".logIn_1_1").on("click","div",function(){
                var idx = $(this).index();
                $(this).addClass('logIn_active').siblings("div").removeClass("logIn_active");
                if(idx == 0){
                    $(".logIn_1_3").css("display","none");
                    $(".logIn_1_2").css("display","block");
                }else{
                    $(".logIn_1_3").css("display","block");
                    $(".logIn_1_2").css("display","none");
                }
            })
            // 图片验证码
            var verifyCode = new GVerify("v_container");
            // 验证用户输入的注册信息
            // 验证手机号
            $("#phone").blur(function(){
                // 获取值
                var $phone = $("#phone").val();
                var $label = $("#phone").closest("label");
                // 清除span
                $label.find("span").eq(1).remove();
                var reg = /^\d{11}$/;
                // 判断是否正确
                if(reg.test($phone)){
                    $("<span/>").addClass('signIn_good').css("background","url(../img/correct_bg.png) no-repeat").appendTo($label);
                }else{
                    var $span = $("<span/>");
                    $span.text("请输入11位有效手机号码!").css("color","red").appendTo($label);
                    $("<img/>").attr("src","../img/error_bg.png").prependTo($span);
                }
            });
            // 验证码是否正确
            $("#tupian").blur(function(){
                var $tupian = $("#tupian").val();
                var $label = $("#tupian").closest("label");
                var res = verifyCode.validate($tupian);
                // 清除span
                $label.find("span").eq(1).remove();
                if(res){
                    $("<span/>").addClass('signIn_good').css({"background":"url(../img/correct_bg.png) no-repeat","margin-left":"40px"}).appendTo($label);
                }else{
                    var $span = $("<span/>");
                    $span.text("请输入正确的图片验证码!").css({"color":"red","margin-left":"40px"}).appendTo($label);
                    $("<img/>").attr("src","../img/error_bg.png").prependTo($span);
                }
            });
            // 验证密码是否正确
            $("#password").blur(function(){
                // 获取值
                var $password = $("#password").val();
                var $label = $("#password").closest("label");
                // 清除span
                $label.find("span").eq(1).remove();
                var reg = /^\S{6,16}$/g;
                // 判断是否正确
                if(reg.test($password)){
                    $("<span/>").addClass('signIn_good').css("background","url(../img/correct_bg.png) no-repeat").appendTo($label);
                }else{
                    var $span = $("<span/>");
                    $span.text("请输入符合要求的密码!").css("color","red").appendTo($label);
                    $("<img/>").attr("src","../img/error_bg.png").prependTo($span);
                }
                $label.find("span").eq(1).css("margin-left",'28px');
            });
            // 确认密码
            $("#password_1").blur(function(){
                // 获取值
                var $password = $("#password").val();
                var $password_1 = $("#password_1").val();
                var $label = $("#password_1").closest("label");
                // 清除span
                $label.find("span").eq(1).remove();
                // 判断是否正确
                if($password === $password_1 && $password != ""){
                    $("<span/>").addClass('signIn_good').css("background","url(../img/correct_bg.png) no-repeat").appendTo($label);
                }else{
                    var $span = $("<span/>");
                    $span.text("两次输入的密码不一致呦!").css("color","red").appendTo($label);
                    $("<img/>").attr("src","../img/error_bg.png").prependTo($span);
                }
                $label.find("span").eq(1).css("margin-left",'28px');
            });
            // 点击注册
            $(".signIn button").on("click",function(){
                // console.log($("#phone").next("span").hasClass('signIn_good'))
                if($("#phone").next("span").hasClass('signIn_good')  && $("#password").next("span").hasClass('signIn_good') && $("#password_1").next("span").hasClass('signIn_good') && $("#tupian").next().next("span").hasClass('signIn_good')){
                    if($(".signIn p #check").prop("checked")){
                        // 获取手机号和密码
                        var $phone = $("#phone").val();
                        var $password = $("#password").val();
                        // md5加密

                    }else{
                        alert("亲，请勾上已阅读并同意《会员注册协议》和《隐私保护政策》");
                    }
                }else{
                    alert("亲，请输入正确的信息！");
                }
            });
        });
    });
});
