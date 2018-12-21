cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },

    },

    // use this for initialization
    onLoad: function () {
        // if(!window.sdk){
        //     window.qx_sdk = new sdk({ sdk_conf: require("sdk_conf") });
        // }

        // //.初始化游戏
        // sdk.init(function(res){
        //     if(res){
        //         console.log('sdk初始化成功')
        //     }
        // })

        var qx_sdk = new sdk({ sdk_conf: require("sdk_conf") });
        console.log(qx_sdk)

        // 1.判断是否登录（登录页）
        var user = qx_sdk.getUser();
        if(user){
            //2.已经登录
            console.log("本地用户信息：", user)
        }else{
            //2.未登录：调用sdk登录
            qx_sdk.wechatLogin((d)=>{
                if(d){
                    console.log("登录成功：", d)
                }
            });
        }

    },

    // called every frame
    update: function (dt) {

    },
});
