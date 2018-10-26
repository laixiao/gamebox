cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        var self = this;

        // 1.启动页：初始化游戏
        sdk.init({
            debug: false,        //.是否开启调试
        }, (res)=>{
            console.log('sdk初始化结果：', res)

        })

        // 2.登录页：获取用户信息
        var user = sdk.getUser();
        if(user){
            console.log("用户信息：", user)
        }else{
            //.调用sdk登录
            sdk.WeChatLogin((d)=>{
                console.log("用户信息：", d)
                // 登录成功：返回用户信息； 
                // 登录失败：返回false
            });
        }

    },

    start(){

    },

    // called every frame
    update: function (dt) {

    },


    

});
