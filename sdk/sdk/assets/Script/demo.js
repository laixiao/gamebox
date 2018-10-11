cc.Class({
    extends: cc.Component,


    properties: {

    },

    // use this for initialization
    onLoad: function () {
        cc.debug.setDisplayStats(false);

        // 1.启动页：初始化游戏
        // sdk.init({ debug: true }).then((res)=>{
        //     console.log('sdk初始化结果：', res)
        // })


        // // 2.登录页：获取用户信息
        // var user = sdk.getUser();
        // if(user){
        //     console.log("用户信息：", user)
        // }else{
        //     //.调用sdk登录
        //     sdk.WeChatLogin((d)=>{
        //         console.log("用户信息：", d)
        //         // 登录成功：返回用户信息； 
        //         // 登录失败：返回false
        //     });
        // }

        var kvDataList = new Array();
        kvDataList.push({key:"score",value:"520"});
        sdk.setUserCloudStorage({
            kvDataList:kvDataList,
            success: function(res){
                console.log(res)
            },
            fail: function(res){
                console.log(res)
            }
        })

    },

    // called every frame
    update: function (dt) {

    },
    

});
