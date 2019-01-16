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
        if(!window.xx_sdk){
            window.xx_sdk = new sdk({ sdk_conf: require("sdk_conf") });
        }


    },

    // called every frame
    update: function (dt) {

    },
    
    //登录
    login(){
        var self = this;
        // 1.判断是否登录（登录页）
        var user = xx_sdk.getUser();
        if(user){
            //2.已经登录
            console.log("本地用户信息：", user)
        }else{
            //2.未登录：调用sdk登录
            xx_sdk.wechatLogin((d)=>{
                if(d){
                    console.log("登录成功：", d)
                }
            });
        }
    },
    //初始化sdk
    initSdk(){
        var self = this;
        xx_sdk.init(function(res){
            if(res){
                console.log('sdk初始化成功')
                // 监听右上角分享按钮
                xx_sdk.onShareAppMessage({type: 0});
            }
        })
    },
    //主动拉起分享
    share(){
        xx_sdk.shareAppMessage({type: 1});
    },
    //输出配置信息
    game_conf(){
        //游戏后台配置信息，运营人员使用的通用配置开关
        console.log("运营配置：", xx_sdk.getConfig1())
        //游戏后台配置信息，程序员使用的游戏数据开关，可随便自定义数据：例如复活次数等
        console.log("程序自定义配置：", xx_sdk.getConfig2())
    },
    //创建banner广告
    bannerAd(){
        this.bannerAd = xx_sdk.createBannerAd({});
        console.log(this.bannerAd)
        this.bannerAd.show()
    },
    //创建video广告
    videoAd(){
        xx_sdk.createRewardedVideoAd({
            onClose: function(res){
                //视频是否是在用户完整观看的情况下被关闭的
                if(res.isEnded){
                    //发放奖励
                }else{
                    //没看完广告就关了
                }
            }
        });
    },
    //获取跳转小程序数据
    getMiniData(){
        var self = this;

        //显示位置类型（1:侧拉，2: 弹窗）
        xx_sdk.getMiniByPos(2, function(d){
            console.log("小程序列表数据：",d)
            self.mini = d[0];

            // if(mini.type == 1){
            //     //跳转类型： 1直接跳 
            //     self.navigateToMini(mini)
            // }else{
            //     //跳转类型： 2长按跳
            //     self.previewImage(mini);
            // }
        })
    },
    //跳转小程序
    navigateToMini(){
        xx_sdk.navigateToMiniProgram({
            appId: this.mini.appId,
            path: this.mini.path,
            extraData: this.mini.extraData,
            envVersion: this.mini.envVersion,
            type: this.mini.type, //跳转类型： 1直接跳 2长按跳
            position: this.mini.position,//跳转位置： 1侧拉  2弹窗
            success(res) {
                // 打开成功
            }
        });
    },
    //长按识别小程序码
    previewImage(){
        xx_sdk.previewImage({
            current: this.mini.qrcode_img, // 当前显示图片的http链接
            urls: [this.mini.qrcode_img] // 需要预览的图片http链接列表
        })
    }
    



});
