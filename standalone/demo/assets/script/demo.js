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
        if(!window.qx_sdk){
            window.qx_sdk = new sdk({ sdk_conf: require("sdk_conf") });
        }

        wx.onShow(function(res){
            console.log(res)
        })

    },

    // called every frame
    update: function (dt) {

    },
    
    //登录
    login(){
        var self = this;
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
    //初始化sdk
    initSdk(){
        var self = this;
        qx_sdk.init(function(res){
            if(res){
                console.log('sdk初始化成功')
                // 监听右上角分享按钮
                qx_sdk.onShareAppMessage({type: 0});
            }
        })
    },
    //主动拉起分享
    share(){
        qx_sdk.shareAppMessage({type: 1});
    },
    //输出配置信息
    game_conf(){
        //游戏后台配置信息，运营人员使用的通用配置开关
        console.log("运营配置：", qx_sdk.getConfig1())
        //游戏后台配置信息，程序员使用的游戏数据开关，可随便自定义数据：例如复活次数等
        console.log("程序自定义配置：", qx_sdk.getConfig2())
    },
    //创建banner广告
    bannerAd(){
        this.bannerAd = qx_sdk.createBannerAd({});
        this.bannerAd.show()
    },
    //创建video广告
    videoAd(){
        this.videoAd = qx_sdk.createRewardedVideoAd();
        this.videoAd.load().then(()=>videoAd.show());
    },
    navigateToMiniProgram(){
        wx.navigateToMiniProgram({
            appId: 'wx24444c38676d1845',
            path: '',
            extraData: {
              chl: '327266'
            },
            envVersion: 'trial',
            success(res) {
                console.log(res)
                // 打开成功
            }
        })
    }



});
