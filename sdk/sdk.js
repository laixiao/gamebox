/**
    1.配置xx_sdk_conf
    2.查看api文档：
       https://laixiao.github.io/gamebox/api/index.html

    3.使用：
        window.aa_sdk = new sdk({ sdk_conf: require("xx_sdk_conf") });
 */
(function(window, md5) {
    function sdk(args) {
        var args = args || {};
        this.sdk_conf = args.sdk_conf || {};
        this.md5 = md5;
        this.debug = this.sdk_conf.debug;
        
        //正式服  https://cdn.kxt.90wqiji.com
        this.iphttps = "https://kxt.90wqiji.com";
        this.iphttps_2 = "https://clb.box.90wqiji.com";
        this.ipwss = "wss://clb.box.90wqiji.com/login";

        // 体验服 https://www.90wqiji.com
        this.iphttps = "https://testadmin.90wqiji.com";
        this.iphttps_2 = "https://www.90wqiji.com";
        this.ipwss = "wss://www.90wqiji.com/login";

        // // 内网测试服
        // this.iphttps = "http://192.168.1.173";
        // this.iphttps_2 = "http://192.168.1.91";
        // this.ipwss = "ws://192.168.1.91:6336/login";
        
        this.loginBg = "https://cdn.kxt.90wqiji.com/box/image/singlecolor.png";
        this.loginBt = "https://cdn.kxt.90wqiji.com/box/image/happyrabbitlogin4.png";
        this.loginBtWidth = 603;
        this.loginBtHeight = 635;

        //一般接口：后端
        this.gameexperience = "/game/gameexperience";//游戏试玩奖励
        this.playerdata = "/game/playerdata";
        this.propdata = "/game/propdata";
        this.gamegetservertime = "/game/getservertime";
        this.GameUpFile = '/api/Game/UpFile';
        this.gameuseprop = "/game/useprop";
        this.gameusegold = "/game/usegold";

        //一般接口：后台
        this.login = "/api/LogHandle/Login";
        this.Config = "/api/Config/GameConfig";
        this.HzConfig = "/api/Config/HzConfig";
        this.Share = "/api/Config/ShareConfig";
        this.GameReport = "/api/Game/GameReport";
        this.Like = "/api/Game/Like";
        this.GetLikeInfo = "/api/Game/GetLikeInfo";
        this.GetGameReport = "/api/Game/GetGameReport";
        this.GetEmojiImg = "/api/Game/GetEmojiImg";
        this.GgCongif = "/api/Config/GgCongif";//广告配置列表：跳转小程序列表
        this.HbWithdrawPay = "/api/HbWithdraw/Pay";//红包提现到零钱
        
        
        //统计接口
        this.ChannelCL = "/api/LogHandle/ChannelCL";//公共：渠道导量用户打开游戏记录（有渠道号才调用）
        this.loginCount = "/api/Statistical/loginCount";
        this.shareCount = "/api/Statistical/shareCount";
        this.inviteCount = "/api/Statistical/inviteCount";
        this.fightCount = "/api/Statistical/fightCount";
        this.inLoginCount = "/api/Statistical/inLoginCount";
        this.escapeCount = "/api/Statistical/escapeCount";//盒子：内嵌游戏对局逃跑统计
        this.TeamRspCount = "/api/Statistical/TeamRspCount";//盒子：世界聊天组队点击数统计（不区分该点击玩家是否成功进入房间，不区分是否重复点击，即重复点击也计入统计）
        this.FightInviteCount = "/api/Statistical/FightInviteCount";//盒子：好友匹配邀战次数统计（创建房间就调用）
        this.PerRspCount = "/api/Statistical/PerRspCount";//盒子：好友匹配邀战响应统计（被邀请人点击邀请链接并进入游戏记为一次响应，此时调用此接口）
        this.promoteClick = "/api/promote/click";//公共：关联广告点击统计（成功1次，失败1次）
        this.jumpout = "/api/promote/jumpout";//公共：关联广告跳出统计（跳转目标小程序10s内退出时触发统计）
        this.mpviewed = "/api/promote/mpviewed";//公共：激励广告观看统计
        // self.Post(self.iphttps + self.mpviewed, {uid: user.uid, to_appid: nav_appId, position: nav_position}, function (d) {
        //     console.log('==mpviewed统计==',  d)
        // });

        //配置数据
        this.BannerAd = null;//banner广告
        this.videoAd = null;//video广告
        this.ConfigData = { //游戏配置数据
            config1: {},//运营配置数据
            config2: {},//程序自定义配置数据
        };
        this.ShareList = [];//分享卡片信息列表
        this.EmojiList = null;//表情包列表

    }

    /**
     * @apiGroup A
     * @apiName init
     * @api {初始化sdk} 使用sdk前，必须在启动页初始化一次才能使用 init（初始化sdk）
     * @apiParam {callback} callback 结果回调
     * 
     * @apiSuccessExample {json} 示例:
     *  if(!window.xx_sdk){
     *      window.xx_sdk = new sdk({ sdk_conf: require("xx_sdk_conf") });
     *  }
     *  //.初始化游戏
     *  xx_sdk.init(function(res){
     *       if(res){
     *           console.log('sdk初始化成功')
     * 
     *           //=====对接分享接口======
     *           //2.监听右上角分享按钮
     *           xx_sdk.onShareAppMessage({type: 0, query: "" });
     *           //3.主动拉起分享
     *           //xx_sdk.shareAppMessage({type: 1, query: "xxx=xxx" });
     * 
     *       }
     *   })
     */
    sdk.prototype.init = function(callback) {
        var self = this;

        // this.checkUpdate();

        //1.初始化后台配置信息
        this.Get(this.iphttps + this.Config, {}, function (d) {
            if (d && d.code == 1) {
                self.ConfigData = d.d;

                //2.初始化分享信息
                self.Get(self.iphttps + self.Share, {}, function (d2) {
                    if (d2 && d2.code == 1) {
                        self.ShareList = d2.d;
                        callback(true)
                    }else{
                        console.log("1.初始化分享信息失败，2s后再次初始化：",d)
                        setTimeout(() => {
                            self.init(callback);
                        }, 2000);
                    }
                });

            }else{
                console.log("2.初始化后台配置信息失败，2s后再次初始化：",d)
                setTimeout(() => {
                    self.init(callback);
                }, 2000);
            }
        });
        
       
        //登录统计
        if(this.getUser()){
            //1.盒子登录统计
            if(this.sdk_conf.game == "aa"){
                this.Post(this.iphttps + this.loginCount, { uid: this.getUser().uid}, function (d) {
                    // console.log('==登录统计结果：==',  d)
                });
            }else{
                //2.内嵌游戏登录接口
                if(!this.isStatistical){
                    this.Post(this.iphttps + this.inLoginCount, { uid: this.getUser().uid}, function (d) {
                        // console.log('==登录统计结果：==',  d)
                        if(d && d.code == 1){
                            self.isStatistical = true;//本游戏是否已经统计
                        }
                    });
                }
            }
        }
        
    }

    sdk.prototype.getXmlHttp = function() {
        var xmlhttp = null;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    return null;
                }
            }
        }
        return xmlhttp;
    }
    /**
     * @apiGroup C
     * @apiName Get
     * @api {Get} 发起网络请求 Get（发起Get请求）
     * 
     * @apiParam {String} url 请求地址
     * @apiParam {Object} reqData 请求参数
     * @apiParam {Object} callback 不存在返回null
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.Get("https://xxx.xxx", { user_id: user_id }, function (d) {
     *     console.log(d)
     * });
     */
    sdk.prototype.Get = function(url, reqData, callback) {
        var self = this;
        if(!callback){
            callback = function(){};
        }

        if(!reqData.game_id){
            reqData.game_id = this.sdk_conf.game;
        }
        reqData.version = this.sdk_conf.version;
        var ts = new Date().getTime();
        reqData.timestamp = parseInt(ts/1000);
        reqData.sign = this.md5(reqData.timestamp + this.sdk_conf.secret);
        
        url += "?";
        for (var item in reqData) {
            url += item + "=" + reqData[item] + "&";
        }

        //2.发起请求
        var xhr = this.getXmlHttp();
        // var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    var response = xhr.responseText;
                    if (response) {
                        var responseJson = JSON.parse(response);
                        callback(responseJson);
                    } else {
                        console.log("返回数据不存在：",url)
                        callback(null);
                    }
                } else {
                    console.log("请求失败：",url)
                    callback(null);
                }
            }
        };
        xhr.timeout = 60000; // time in milliseconds
        xhr.ontimeout = function (e) {
            // XMLHttpRequest timed out. Do something here.
            console.log("请求超时：",e)
            callback(null);
        };
        xhr.open("GET", url, true);
        xhr.send();
    }
    /**
     * @apiGroup C
     * @apiName Post
     * @api {Post} 发起网络请求 Post（发起Post请求）
     * 
     * @apiParam {String} url 请求地址
     * @apiParam {Object} reqData 请求参数
     * @apiParam {Object} callback 不存在返回null
     * @apiSuccessExample {json} 示例:
     * sdk.Post("https://xxx", { user_id: user_id }, function (d) {
     *     console.log(d)
     * });
     */
    sdk.prototype.Post = function(url, reqData, callback) {
        var self = this;
        if(!callback){
            callback = function(){};
        }
        if(!reqData.game_id){
            reqData.game_id = this.sdk_conf.game;
        }
        reqData.version = this.sdk_conf.version;

        //签名放url
        let timestamp = parseInt(new Date().getTime()/1000);
        let sign = this.md5(timestamp + this.sdk_conf.secret);
        url+="?timestamp="+timestamp+"&sign="+sign;

        //1.拼接请求参数
        // var param = "";
        // for (var item in reqData) {
        //     param += item + "=" + reqData[item] + "&";
        // }

        //2.发起请求
        var xhr = this.getXmlHttp();
        // var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    var response = xhr.responseText;
                    // console.log(response)
                    if (response) {
                        var responseJson = JSON.parse(response);
                        callback(responseJson);
                    } else {
                        console.log("返回数据不存在：", url)
                        callback(null);
                    }
                } else {
                    console.log("请求失败：", url)
                    callback(null);
                }
            }
        };
        xhr.timeout = 60000; // time in milliseconds
        xhr.ontimeout = function (e) {
            // XMLHttpRequest timed out. Do something here.
            console.log("请求超时：",e)
            callback(null);
        };
        xhr.open("POST", url, true);
        // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(JSON.stringify(reqData));//reqData为json字符串形式
    }



    /**
     * @apiGroup A
     * @apiName getServerTime
     * @api {获取服务器时间} 获取服务器时间 getServerTime-服务器时间
     * @apiParam {callback} callback 回调
     * 
     * @apiSuccessExample {json} 示例:
     *  //.初始化游戏
     *  xx_sdk.getServerTime(function(time){
     *      //时间戳 毫秒
     *      console.log(time)
     *  })
     */
    sdk.prototype.getServerTime = function(callback) {
        var self = this;

        //1.初始化后台配置信息
        this.Get(this.iphttps_2 +this.gamegetservertime, {}, function (d) {
            if (d && d.code == 1) {
                callback(d.time);
            }else{
                console.log("获取服务器时间失败：",d)
                self.getServerTime(callback);
            }
        });
    }

    
    /**
     * @apiGroup B
     * @apiName onShareAppMessage
     * @api {分享} 注册微信右上角分享 onShareAppMessage(分享)
     * @apiParam {int} type=0 后台自定义的分享类型；例如：0：右上角分享、1：普通分享 2：分享加金币
     * @apiParam {String} [title] 转发标题
     * @apiParam {String} [imageUrl] 转发显示图片的链接
     * @apiParam {String} [query] 必须是 key1=val1&key2=val2 的格式。
     * @apiParam {callback} [success] 成功回调
     * @apiParam {callback} [fail] 失败回调
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.onShareAppMessage({type: 0, query: "xxx=xxx" });
     */
    sdk.prototype.onShareAppMessage = function(obj) {
        var self = this;
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            //.微信右上角分享
            wx.showShareMenu({ withShareTicket: true })
            wx.onShareAppMessage(function(res){
                //.默认0：右上角分享
                var tpye = 0;
                if(obj.type){
                    tpye = obj.type;
                }
                var shareInfo = self.getShareByWeight(tpye)
                var userid = 0;
                if(self.getUser()){
                    userid = self.getUser().uid
                }
                
                if(obj.title){
                    shareInfo.title = obj.title;
                }
                if(obj.imageUrl){
                    shareInfo.imageUrl = obj.imageUrl;
                }
                if(shareInfo.query){
                    if(obj.query){
                        shareInfo.query += "&"+obj.query + "&sid="+shareInfo.id + "&uid="+userid;
                    }else{
                        shareInfo.query += "&sid="+shareInfo.id + "&uid="+userid;
                    }
                }else{
                    if(obj.query){
                        shareInfo.query = "sid="+shareInfo.id+"&uid="+userid +"&" + obj.query;
                    }else{
                        shareInfo.query = "sid="+shareInfo.id + "&uid="+userid;
                    }
                }
                if(obj.success){
                    shareInfo.success = obj.success;
                }
                if(obj.fail){
                    shareInfo.fail = obj.fail;
                }

                //分享统计
                let reqData = { uid: userid, sid: shareInfo.id };
                console.log('==分享统计==',  reqData)
                self.Post(self.iphttps + self.shareCount, reqData, function (d) {
                    console.log('==分享统计结果：==',  d)
                });

                return shareInfo;
            })
        }
    }
    /**
     * @apiGroup B
     * @apiName shareAppMessage
     * @api {分享} 主动拉起微信分享 shareAppMessage(分享)
     * @apiParam {int} type=1 后台自定义的分享类型；例如：0：右上角分享、1：普通分享 2：分享加金币
     * @apiParam {String} [title] 转发标题
     * @apiParam {String} [imageUrl] 转发显示图片的链接
     * @apiParam {String} [query] 必须是 key1=val1&key2=val2 的格式。
     * @apiParam {callback} [success] 成功回调
     * @apiParam {callback} [fail] 失败回调
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.shareAppMessage({type: 1, query: "xxx=xxx" });
     */
    sdk.prototype.shareAppMessage = function(obj) {
        var self = this;
        
        //.默认1：普通分享
        var tpye = 1;
        if(obj.type){
            tpye = obj.type;
        }
        var shareInfo = this.getShareByWeight(tpye);
        
        var userid = 0;
        if(self.getUser()){
            userid = self.getUser().uid
        }
        
        if(obj.title){
            shareInfo.title = obj.title;
        }
        if(obj.imageUrl){
            shareInfo.imageUrl = obj.imageUrl;
        }
        if(shareInfo.query){
            if(obj.query){
                shareInfo.query += "&"+obj.query + "&sid="+shareInfo.id + "&uid="+userid;
            }else{
                shareInfo.query += "&sid="+shareInfo.id + "&uid="+userid;
            }
        }else{
            if(obj.query){
                shareInfo.query = "sid="+shareInfo.id+"&uid="+userid +"&" + obj.query;
            }else{
                shareInfo.query = "sid="+shareInfo.id + "&uid="+userid;
            }
        }
        if(obj.success){
            shareInfo.success = obj.success;
        }
        if(obj.fail){
            shareInfo.fail = obj.fail;
        }

        
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.shareAppMessage(shareInfo);
            //分享统计
            let reqData = { uid: userid, sid: shareInfo.id };
            console.log('==分享统计==',  reqData)
            self.Post(self.iphttps + self.shareCount, reqData, function (d) {
                console.log('==分享统计结果：==',  d)
            });
        }
    }
    //.根据权重随机获取指定type类型的分享信息。（没有this.ShareList数据不能调用）
    sdk.prototype.getShareByWeight = function(type) {
        let defaultData = {
            id: 1,
            imageUrl: "https://cdn.kxt.90wqiji.com/gameadmin/201901122129505c39ebce05807.jpeg",
            query: "",
            title: "开心兔轻游",
            type: 0,
            weight: 1
        }
        if(this.ShareList.length > 0){
            //1.获取某种type的集合
            var tArray = [];
            for (var i = 0; i < this.ShareList.length; i++) {
                if (type == this.ShareList[i].type) {
                    this.ShareList[i].weight = parseInt(this.ShareList[i].weight);
                    tArray.push(this.ShareList[i]);
                }
            }
            if(tArray.length > 0){
                //2.根据权重配比随机获取：权重越大占比越多。
                var iArray = [];
                for (var i = 0; i < tArray.length; i++) {
                    for (var j = 0; j < tArray[i].weight; j++) {
                        iArray.push(i);
                    }
                }
                var i = iArray[parseInt(Math.random() * iArray.length)];
                //3.结果处理：正则替换昵称
                var item = tArray[i];
                if(item.title.indexOf("&nickName") != -1){
                    item.title = item.title.replace(/&nickName/g, this.getUser().nickName);
                }
                return JSON.parse(JSON.stringify(item));
            }else{
                //默认数据
                return defaultData;
            }
        }else{
            return defaultData;
        }
    }
    //通过 位置 获取小程序列表  （1:侧拉，2: 弹窗）
    sdk.prototype.getMiniByPos = function(position, callback) {
        var self = this;
        //获取跳转小程序列表
        if(this.adList){
            //筛选类型
            let miniAds = [];
            for (let i = 0; i < self.adList.length; i++) {
                if(self.adList[i].position == position){
                    miniAds.push(self.adList[i])
                }
            }
            //根据权重排序
            miniAds.sort((a,b)=>{
                return b.msort-a.msort;
            })
            callback(miniAds)
        }
        this.Get(this.iphttps + this.GgCongif, {}, function (d) {
            // console.log("初始化跳转小程序列表：", d)
            if (d && d.code == 1) {
                self.adList = d.d;
                //提示开发者  
                let devAppIds = [];
                for (let i = 0; i < self.adList.length; i++) {
                    // 类型 1：直接跳；2：长按识别
                    if(self.adList[i].type == 1){
                        devAppIds.push(self.adList[i].appId)
                    }
                }
                console.error("SDK警告：  上传小游戏前，请在game.json文件中添加以下小游戏到navigateToMiniProgramAppIdList数组内：",devAppIds)
                console.error("参考文档：  https://developers.weixin.qq.com/minigame/dev/framework/config.html ")

                //筛选类型
                let miniAds = [];
                for (let i = 0; i < self.adList.length; i++) {
                    if(self.adList[i].position == position){
                        miniAds.push(self.adList[i])
                    }
                }
                //根据权重排序
                miniAds.sort((a,b)=>{
                    return b.msort-a.msort;
                })
                callback(miniAds)
            }else{
                console.log("获取跳转小程序列表失败，2s后再次获取：",d)
                setTimeout(() => {
                    self.getMiniByPos(position, callback);
                }, 2000);
            }
        });
    }

    
    /**
     * @apiIgnore 
     * @apiGroup C
     * @apiName checkUpdate
     * @api {检测版本更新} 微信小游戏（冷启动的时候会检查，如果有更新则会重启小游戏进行更新） checkUpdate（版本更新）
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.checkUpdate();
     */
    sdk.prototype.checkUpdate = function() {
        var self = this;
        if (cc.sys.platform === cc.sys.WECHAT_GAME && typeof wx.getUpdateManager === 'function') {
            const updateManager = wx.getUpdateManager()
            updateManager.onCheckForUpdate(function (res) {
                if(self.debug){
                    console.log("请求完新版本信息的回调", res.hasUpdate)
                }
            })
            updateManager.onUpdateReady(function () {
                if(self.debug){
                    console.log("新的版本已经下载好，调用 applyUpdate 应用新版本并重启")
                }
                updateManager.applyUpdate()
            })
            updateManager.onUpdateFailed(function () {
                if(self.debug){
                    console.log("新的版本下载失败")
                }
            })
        }
    }
    /**
     * @apiGroup C
     * @apiName getConfig1
     * @api {运营配置} 游戏后台配置信息，运营人员使用的通用配置开关 getConfig1（运营配置）
     * @apiParam {Object} return 不存在返回null
     * 
     * @apiSuccessExample {json} 示例:
     * var d = sdk.getConfig1();
     */
    sdk.prototype.getConfig1 = function() {
        return this.ConfigData.config1;
    }
    /**
     * @apiGroup C
     * @apiName getConfig2
     * @api {程序配置} 游戏后台配置信息，程序员使用的游戏数据开关，可随便自定义数据：例如复活次数等 getConfig2（程序配置）
     * @apiParam {Object} return 不存在返回null
     * 
     * @apiSuccessExample {json} 示例:
     * var d = sdk.getConfig2();
     */
    sdk.prototype.getConfig2 = function() {
        return this.ConfigData.config2;
    }
    /**
     * @apiGroup C
     * @apiName createImage
     * @api {显示网络图片} 加载网络图片 createImage（显示图片）
     * @apiParam {cc.Sprite} sprite 显示图片的Sprite
     * @apiParam {String} url 需要加载的图片地址
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.createImage(sprite, url);
     */
    sdk.prototype.createImage = function(sprite, url) {
        if(url){
            // if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            //     var image = wx.createImage();
            //     image.onload = function () {
            //         var texture = new cc.Texture2D();
            //         texture.initWithElement(image);
            //         texture.handleLoadedTexture();
            //         sprite.spriteFrame = new cc.SpriteFrame(texture);
            //     };
            //     image.src = url;
            // }else{
                cc.loader.load({url: url, type: 'png'}, function (err, texture) {
                    if(err){
                        console.log(err)
                    }else{
                        if(sprite && sprite.node && sprite.node.isValid && texture){
                            sprite.spriteFrame = new cc.SpriteFrame(texture);
                        }
                    }
                });
            // }
        }else{
            console.log("图片地址不能为空")
        }
    }
    /**
     * @apiGroup C
     * @apiName getUser
     * @api {获取本地用户信息} 获取本地用户信息（登录成功后，会在本地存储用户信息） getUser（获取用户信息）
     * 
     * @apiSuccessExample {json} 示例:
     * //.不存在返回null
     * var user = sdk.getUser();
     */
    sdk.prototype.getUser = function() {
        if(this.userinfo){
            //1.先从内存拿
            return this.userinfo;
        }else{
            //2.没有再从缓存拿
            let userinfo = cc.sys.localStorage.getItem("userinfo");
            if(userinfo){
                this.userinfo = JSON.parse(userinfo);
                return this.userinfo;
            }else{
                //3.没有就登录
                //盒子环境
                if(window.aa_sdk){
                    if(aa_sdk.userinfo){
                        return aa_sdk.userinfo;
                    }else{
                        return null;
                    }
                }else{
                    //非盒子环境
                    if(this.sdk_conf.debugData && this.sdk_conf.debugData.user){
                        console.log("===非盒子环境，使用调试数据：==", this.sdk_conf.debugData)
                        return this.sdk_conf.debugData.user;
                    }else{
                        console.log("===非盒子环境，请配置sdk_conf文件下的debugData调试数据==")
                        return null;
                    }
                }
            }
        }
    }
    sdk.prototype.setUser = function(user) {
        cc.sys.localStorage.setItem("userinfo", JSON.stringify(user))
    }
    /**
     * @apiGroup C
     * @apiName setItem
     * @api {set} 数据存储 setItem（数据存储）
     * @apiParam {String} key 键
     * @apiParam {String} value 值
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.setItem("nick","hello")
     */
    sdk.prototype.setItem = function(key, value) {
        key = this.sdk_conf.game +"_"+ key;
        cc.sys.localStorage.setItem(key, value);
    }
    /**
     * @apiGroup C
     * @apiName getItem
     * @api {数据存储} 数据存储 getItem（数据读取）
     * @apiParam {String} key 键
     * @apiParam {String} value 值
     * 
     * @apiSuccessExample {json} 示例:
     * var nick = sdk.getItem("nick")
     */
    sdk.prototype.getItem = function(key) {
        key = this.sdk_conf.game +"_"+ key;
        return cc.sys.localStorage.getItem(key);
    }
    /**
     * @apiGroup C
     * @apiName removeItem
     * @api {移除键值对} 移除键值对 removeItem（移除键值对）
     * @apiParam {String} key 键
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.removeItem("nick")
     */
    sdk.prototype.removeItem = function(key) {
        key = this.sdk_conf.game +"_"+ key;
        return cc.sys.localStorage.removeItem(key);
    }
    /**
     * @apiGroup B
     * @apiName onMessage
     * @api {主域监听子域发送的消息} 主域监听子域发送的消息 onMessage（监听消息）
     * @apiParam {callback} callback 回调函数
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.onMessage((d)=>{
     *     console.log(d)
     * })
     */
    sdk.prototype.onMessage = function(callback) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.onMessage(function(d){
                // if(d.message == "common_back"){//.子域: 返回子域首页
                //     cc.director.loadScene("common_children")
                // }
                callback(d)
            });
        }
    }
    /**
     * @apiGroup B
     * @apiName postMessage
     * @api {主域向子域发送消息} 主域向子域发送消息 postMessage（发送消息）
     * @apiParam {String} msg 发送给子域的消息
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.postMessage("hello")
     */
    sdk.prototype.postMessage = function(msg) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.postMessage({ message: msg });
        }
    }
    /**
     * @apiGroup B
     * @apiName setUserCloudStorage
     * @api {主域上报数据} 主域上报数据 setUserCloudStorage
     * @apiParam {Array} KVDataList 要修改的 KV 数据列表
     * @apiParam {callback} success 成功回调
     * @apiParam {callback} fail 失败回调
     * 
     * @apiSuccessExample {json} 示例:
     * var DataList = new Array();
     * DataList.push({key:"score",value:"520"});
     * sdk.setUserCloudStorage({
     *     KVDataList: DataList,
     *     success: function(res){
     *         console.log(res)
     *     },
     *     fail: function(res){
     *         console.log(res)
     *     }
     * })
     */
    //.主域上报数据:    对用户托管数据进行写数据操作，允许同时写多组 KV 数据。
    sdk.prototype.setUserCloudStorage = function(obj) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            //.增加前缀
            for (let i = 0; i < obj.KVDataList.length; i++) {
                const item = obj.KVDataList[i];
                item.key = this.sdk_conf.game +"_"+ item.key;
            }
            if(this.debug){
                console.log(obj.KVDataList)
            }
            wx.setUserCloudStorage({
                KVDataList: obj.KVDataList,
                success(res){
                    obj.success(res)
                },
                fail(res){
                    obj.fail(res)
                }
            })
        }
    }
    /**
     * @apiGroup B
     * @apiName getUserCloudStorage
     * @api {获取托管数据} 获取当前用户托管数据当中对应key的数据。该接口只可在开放数据域下使用 getUserCloudStorage
     * @apiParam {Array} keyList 要获取的 key 列表
     * @apiParam {callback} success 成功回调
     * @apiParam {callback} fail 失败回调
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.getUserCloudStorage({
     *     keyList: ["score"],
     *     success: function(res){
     *         console.log(res)
     *     },
     *     fail: function(res){
     *         console.log(res)
     *     }
     * })
     */
    sdk.prototype.getUserCloudStorage = function(obj) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            //.增加前缀
            let keyList = [];
            for (let i = 0; i < obj.keyList.length; i++) {
                var item = obj.keyList[i];
                item = this.sdk_conf.game +"_"+ item;
                keyList.push(item)
            }
            obj.keyList = keyList;
            if(this.debug){
                console.log(obj)
            }
            
            wx.getUserCloudStorage({
                keyList: obj.keyList,
                success(res){
                    obj.success(res)
                },
                fail(res){
                    obj.fail(res)
                }
            })
        }
    }
    /**
     * @apiGroup B
     * @apiName getGroupCloudStorage
     * @api {获取群同玩成员的游戏数据} 获取群同玩成员的游戏数据 getGroupCloudStorage
     * @apiParam {String} shareTicket 群分享对应的 shareTicket
     * @apiParam {Array} keyList 要获取的 key 列表
     * @apiParam {callback} success 成功回调
     * @apiParam {callback} fail 失败回调
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.getGroupCloudStorage({
     *     shareTicket: "xxx",
     *     keyList: ["score"],
     *     success: function(res){
     *         console.log(res)
     *     },
     *     fail: function(res){
     *         console.log(res)
     *     }
     * })
     */
    //.在小游戏是通过群分享卡片打开的情况下，可以通过调用该接口获取群同玩成员的游戏数据。该接口只可在开放数据域下使用。
    sdk.prototype.getGroupCloudStorage = function(obj) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            //.增加前缀
            let keyList = [];
            for (let i = 0; i < obj.keyList.length; i++) {
                var item = obj.keyList[i];
                item = this.sdk_conf.game +"_"+ item;
                keyList.push(item)
            }
            obj.keyList = keyList;
            if(this.debug){
                console.log(obj)
            }

            wx.getGroupCloudStorage({
                shareTicket: obj.shareTicket,
                keyList: obj.keyList,
                success(res){
                    obj.success(res)
                },
                fail(res){
                    obj.fail(res)
                }
            })
        }
    }
    /**
     * @apiGroup B
     * @apiName getFriendCloudStorage
     * @api {同玩好友的托管数据} 拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用 getFriendCloudStorage
     * @apiParam {Array} keyList 要获取的 key 列表
     * @apiParam {callback} success 成功回调
     * @apiParam {callback} fail 失败回调
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.getFriendCloudStorage({
     *     keyList: ["score"],
     *     success: function(res){
     *         console.log(res)
     *     },
     *     fail: function(res){
     *         console.log(res)
     *     }
     * })
     */
    sdk.prototype.getFriendCloudStorage = function(obj) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            //.增加前缀
            let keyList = [];
            for (let i = 0; i < obj.keyList.length; i++) {
                var item = obj.keyList[i];
                item = this.sdk_conf.game +"_"+ item;
                keyList.push(item)
            }
            obj.keyList = keyList;
            if(this.debug){
                console.log(obj)
            }

            wx.getFriendCloudStorage({
                keyList: obj.keyList,
                success(res){
                    obj.success(res)
                },
                fail(res){
                    obj.fail(res)
                }
            })
        }
    }
    /**
     * @apiGroup B
     * @apiName sortList
     * @api {对子域数据进行排序} 对子域数据进行排序 sortList（子域排序）
     * @apiParam {String} ListData 要排序的微信子域数据
     * @apiParam {String} field 排序字段
     * @apiParam {String} order 正序：true  ； 倒序：false
     * 
     * @apiSuccessExample {json} 示例:
     * wx.getFriendCloudStorage({
     *       keyList: ["score"],
     *       success(res){
     *           var ListData = sdk.sortList(res.data, 'score', true));
     *           console.log("=排序后的数据=", ListData);
     *       },
     *       fail(){
     *           console.log(res)
     *       }
     *})
     */
    sdk.prototype.sortList = function(ListData, field, order) {
        //.增加前缀
        field = this.sdk_conf.game +"_"+ field;

        ListData.sort(function(a,b){
            var AMaxScore = 0;
            var KVDataList = a.KVDataList;
            for(var i=0; i<KVDataList.length; i++){
                if(KVDataList[i].key == field){
                    AMaxScore = KVDataList[i].value;
                }
            }

            var BMaxScore = 0;
            KVDataList = b.KVDataList;
            for(var i=0; i<KVDataList.length; i++){
                if(KVDataList[i].key == field){
                    BMaxScore = KVDataList[i].value;
                }
            }

            if(order){
                return parseInt(AMaxScore) - parseInt(BMaxScore);
            }else{
                return parseInt(BMaxScore) - parseInt(AMaxScore);
            }
        });
        return ListData;
    }
    //cocos坐标 转换成 微信游戏圈坐标
    sdk.prototype.getGameClubButtonStyle = function(node) {
        //先把node放在Canvas节点下
        let canvasNode = cc.director.getScene().getChildByName("Canvas");
        let p1 = node.parent.convertToWorldSpaceAR(node.getPosition())
        let p2 = canvasNode.convertToNodeSpaceAR(p1);
        node.parent = canvasNode;
        node.setPosition(p2)
        // node.active = true;

        let canvasHeight = cc.Canvas.instance.node.height;
        let pos = node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        pos.y = canvasHeight - pos.y;
        let scale = wx.getSystemInfoSync().screenHeight / canvasHeight;
        let style = {
            left: (pos.x - node.width * 0.5) * scale,
            top: (pos.y - node.height * 0.5) * scale,
            width: node.width * scale,
            height: node.height * scale,
        };
        console.log("[WxUtil][getBtnStyle]", canvasHeight, scale, style);
        return style;
    }


    /**
     * @apiIgnore
     * @apiGroup C
     * @apiName getMyRank3
     * @api {排名与我相邻的3位玩家信息} 排名与我相邻的3位玩家信息 getMyRank3（Top3）
     * @apiParam {String} ListData 要排序的微信子域数据
     * @apiParam {String} me 我的子域信息
     * 
     * @apiSuccessExample {json} 示例:
     * wx.getUserInfo({
     *       openIdList: ['selfOpenId'],
     *       lang: 'zh_CN',
     *       success(res){
     *          //.Top3
     *          var dList = sdk.getMyRank3(dataList,res.data[0]);
     *          console.log(dList)
     *       },
     *       fail(error) {
     *          console.log(error)
     *       }
     * })
     * 
     * 
     */
    sdk.prototype.getMyRank3 = function(ListData,me) {
        var dataList = [];
        for(var i=0; i<ListData.length; i++){
            if(ListData.length <= 3){
                //.只有3个人或以下
                if(ListData[i].avatarUrl == me.avatarUrl && ListData[i].nickname == me.nickName){
                    ListData[i].isSelf = true;//.标记自己
                }
                dataList = ListData;
                for(var i=0; i<dataList.length; i++){
                    dataList[i].rank = i;
                }                 
            }else{
                if(ListData[i].avatarUrl == me.avatarUrl && ListData[i].nickname == me.nickName){
                    ListData[i].isSelf = true;//.标记自己
                    if(i == ListData.length-1){
                        //.自己分数最低
                        ListData[i].rank = i;
                        ListData[i-1].rank = i-1;
                        ListData[i-2].rank = i-2;
                        dataList.push(ListData[i-2])
                        dataList.push(ListData[i-1])
                        dataList.push(ListData[i])
                    }else if(i==0){
                        //.自己分数最高
                        ListData[i].rank = i;
                        ListData[i+1].rank = i+1;
                        ListData[i+2].rank = i+2;
                        dataList.push(ListData[i])
                        dataList.push(ListData[i+1])
                        dataList.push(ListData[i+2])
                    }else{
                        //.居中
                        ListData[i-1].rank = i-1;
                        ListData[i].rank = i;
                        ListData[i+1].rank = i+1;
                        dataList.push(ListData[i-1])
                        dataList.push(ListData[i])
                        dataList.push(ListData[i+1])
                    }
                    break;        
                }
            }
               
        }
        return dataList;
    }
    /**
     * @apiGroup A
     * @apiName wechatLogin
     * @api {微信登录} 盒子外的独立游戏需要调用本接口进行登录 wechatLogin（微信登录）
     * 
     * @apiSuccessExample {json} 示例:
     * // 1.判断是否登录（登录页）
     *   var user = sdk.getUser();
     *   if(user){
     *       //2.已经登录
     *       console.log("本地用户信息：", user)
     *   }else{
     *       //2.未登录：调用sdk登录
     *       sdk.wechatLogin((d)=>{
     *           console.log("用户信息：", d)
     *           // 登录成功：
     *               //    {
     *               //         "uid":"xxx"//登录玩家uid
     *               //         "openid":"x",
     *               //         "nickName":"x",
     *               //         "avatarUrl":"x",
     *               //         "gender":"x",
     *               //         "country":"x",
     *               //         "city":"x",
     *               //         "province":"x"
     *               //     }
     *           // 登录失败：返回false
     *       });
     *   }
     * 
     */
    sdk.prototype.wechatLogin = function(callback) {
        var self = this;
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            var options = wx.getLaunchOptionsSync();
            var user = this.getUser();

            //渠道统计  chl=327266
            var option = wx.getLaunchOptionsSync();
            let chl = 0;
            if(option.query.chl){
                chl = option.query.chl;
            }
            if(option.referrerInfo && option.referrerInfo.extraData && option.referrerInfo.extraData.chl){
                chl = option.referrerInfo.extraData.chl;
            }
            if(option.query.scene){
                let scene = decodeURIComponent(option.query.scene);
                if(cc.sdk.GameUtil.getQueryString(scene, "chl")){
                    chl = cc.sdk.GameUtil.getQueryString(scene, "chl");
                }
            }
            console.log("wechatLogin获取的渠道参数：", chl)

            if(user){
                callback(user)
            }else{
                //.登录遮罩背景
                var maskNode = new cc.Node('Sprite');
                maskNode.parent = cc.director.getScene().getChildByName('Canvas');
                maskNode.addComponent(cc.BlockInputEvents)
                var sp = maskNode.addComponent(cc.Sprite);
                maskNode.opacity = 217;
                maskNode.color = new cc.Color(0,0,0,255);
                sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                self.createImage(sp, self.loginBg);
                maskNode.width = cc.view.getVisibleSize().width;
                maskNode.height = cc.view.getVisibleSize().height;
                // console.log(maskNode.width, maskNode.height)

                //.微信登录按钮
                if(self.button){
                    self.button.show();
                }else{
                    wx.getSystemInfo({
                        success(res){
                            var width = self.loginBtWidth/2;
                            var height = self.loginBtHeight/2;
                            self.button = wx.createUserInfoButton({
                                type: 'image',
                                image: self.loginBt,
                                style: {  width: width, height: height, left: res.screenWidth/2-width/2, top: res.screenHeight/2-height/2 },
                                lang: 'zh_CN'
                            })
                            self.button.onTap((res1)=>{
                                // 处理用户拒绝授权的情况
                                // if (res1.errMsg.indexOf('auth deny') > -1 || res1.errMsg.indexOf('auth denied') > -1 ) {
                                //     wx.showToast();
                                // }
                                wx.showToast({title: '登录中...',icon:'loading',mask: true,duration: 1500});
                                wx.getSetting({
                                    success(auths){
                                        if(auths.authSetting["scope.userInfo"]){
                                            console.log('===已经授权===');
                                            wx.login({
                                                success(res2){ 
                                                    var reqData = {   
                                                        code: res2.code,
                                                        rawData: res1.rawData,
                                                        iv: res1.iv,
                                                        encryptedData: res1.encryptedData,
                                                        signature: res1.signature,
                                                        from_uid: options.query.uid,
                                                        chl: chl
                                                    }
                                                    // console.log('==登录参数==', reqData)
                                                    self.Post(self.iphttps + self.login, reqData, function(data){
                                                        console.log('==登录结果==', data)
                                                        if(data.code == 1){
                                                            self.setUser(data.d);
                                                            wx.hideToast();
                                                            maskNode.destroy();
                                                            self.button.hide();
                                                            //.登录成功，重新初始化
                                                            self.init((d)=>{})

                                                            callback(data.d);
                                                        }else{
                                                            // console.log('==登录接口请求失败==', data)
                                                            wx.showToast({title: '登录失败请重试'});
                                                        }                
                                                    });
                                                },
                                                fail(){
                                                    wx.showToast({title: '登录失败请重试'});
                                                    callback(false)
                                                },
                                            })
                                        }else{
                                            callback(false)
                                        }
                                    }
                                })        
                            })
                            self.button.show()
                        }
                    })
                }
            }
        }else{
            callback(false)
        }
    }
    /**
     * @apiGroup B
     * @apiName createBannerAd
     * @api {创建banner广告组件} 创建banner广告组件 createBannerAd（广告）
     * @apiParam {String} adUnitId 广告单元id	
     * @apiParam {String} style banner 广告组件的样式
     * 
     * @apiSuccessExample {json} 示例:
     *  //.参考文档：https://developers.weixin.qq.com/minigame/dev/document/ad/wx.createBannerAd.html
     *  //var bannerAd = sdk.createBannerAd({
     *  //    style:{
     *  //        left: 0,
     *  //        top: 0,
     *  //        width: 100,
     *  //        height: 200
     *  //    }
     *  //});
     * 
     *  //.极简版（默认底部Banner）
     *  var bannerAd = sdk.createBannerAd({});
     *  bannerAd.show()
     * 
     */
    sdk.prototype.createBannerAd = function(obj) {
        var self = this;
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if(this.BannerAd){
                return this.BannerAd;
            }else{
                if(!obj.style){
                    obj.style = {};
                    var phone = wx.getSystemInfoSync();
                    this.w = phone.screenWidth / 2;
                    this.h = phone.screenHeight;
                    obj.style.left = 0;
                    obj.style.top = 0;
                    obj.style.width = 300;
                }
                this.BannerAd = wx.createBannerAd({
                    adUnitId: this.sdk_conf.bannerAdUnitId,
                    style: obj.style,
                })
                this.BannerAd.onResize(function(res){
                    console.log("BannerAd广告缩放事件：", res)
                    self.BannerAd.style.left = self.w - self.BannerAd.style.realWidth/2+0.1;
                    self.BannerAd.style.top = self.h - self.BannerAd.style.realHeight+0.1;
                });
                this.BannerAd.onLoad(function(res){
                    console.log("BannerAd广告加载事件：", res)
                });
                this.BannerAd.onError(function(res){
                    console.log("BannerAd广告错误事件：", res)
                });

                return this.BannerAd;
            }
        }
    }
    /**
     * @apiGroup B
     * @apiName createRewardedVideoAd
     * @api {创建Video广告组件} 创建Video广告组件 createRewardedVideoAd
     * @apiParam {String} adUnitId 广告单元id	
     * 
     * @apiSuccessExample {json} 示例:
     *  //.参考文档：https://developers.weixin.qq.com/minigame/dev/document/ad/wx.createRewardedVideoAd.html
     *  //.调用的时候，SDK会直接拉起广告
     *  xx_sdk.createRewardedVideoAd({
     *       onClose: function(res){
     *           //视频是否是在用户完整观看的情况下被关闭的
     *           if(res.isEnded){
     *              //发放奖励
     *           }else{
     *              //没看完广告就关了
     *           }
     *       }
     *   });
     * 
     */
    sdk.prototype.createRewardedVideoAd = function(obj) {
        if(!obj){
            obj = {};
        }
        if(!obj.onClose){
            obj.onClose = function(){};
        }

        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            var self = this;
            if(!this.videoAd){
                wx.showToast({title: '正在拉起广告...',icon:'loading',mask: true,duration: 1500});
                this.videoAd = wx.createRewardedVideoAd({ adUnitId: this.sdk_conf.videoAdUnitId })
                this.videoAd.onLoad(function(res){
                    console.log("VideoAd广告加载事件：", res)
                });
                this.videoAd.onError(function(res){
                    console.log("VideoAd广告错误事件：", res)
                    
                    // wx.showToast({title: '正在拉起广告...',icon:'loading',mask: true,duration: 1500});
                });
            }
            if(this.videoAdonClose){
                this.videoAd.offClose(this.videoAdonClose);
            }
            this.videoAdonClose = function(res){
                // console.log("关闭了广告 ",res)
                let status = 2;//观看状态，1完整观看，2未完整观看
                let scence = 1;//先传1。场景值，1复活
                if(res.isEnded){
                    status = 1;
                }
                let reqData = {uid: self.getUser().uid, status: status, scence: scence}
                self.Post(self.iphttps + self.mpviewed, reqData, function (d) {
                    console.log(reqData, '==mpviewed统计==',  d)
                });
                obj.onClose(res);
            }
            this.videoAd.onClose(this.videoAdonClose);
            this.videoAd.load().then(()=>{ this.videoAd.show() });
        }
    }
    /**
     * @apiGroup B
     * @apiName navigateToMiniProgram
     * @api {打开另一个小程序} 打开另一个小程序 navigateToMiniProgram
     * @apiParam {String} appId 要打开的小程序appId	
     * @apiParam {String} [path] 打开的页面路径，如果为空则打开首页	
     * @apiParam {object} [extraData] 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。	
     * @apiParam {String} [envVersion] 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。	
     * @apiParam {function} [success] 接口调用成功的回调函数	
     * @apiParam {function} [fail] 接口调用失败的回调函数
     * @apiParam {function} [complete] 接口调用结束的回调函数（调用成功、失败都会执行）
     * 
     * @apiSuccessExample {json} 示例:
     *  //.参考文档：https://developers.weixin.qq.com/minigame/dev/api/open-api/miniprogram-navigate/wx.navigateToMiniProgram.html
     *  sdk.navigateToMiniProgram({
     *       appId: '',
     *       path: 'page/index/index?id=123',
     *       extraData: {
     *         foo: 'bar'
     *       },
     *       envVersion: 'develop',
     *       type: 1, //跳转类型： 1直接跳 2长按跳
     *       position: 1,//跳转位置： 1侧拉  2弹窗
     *       success(res) {
     *         // 打开成功
     *       }
     *   })
     * 
     */
    sdk.prototype.navigateToMiniProgram = function(obj) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            var self = this;
            if(!obj.type){
                obj.type = 1;
            }
            if(!obj.position){
                obj.position = 1;
            }
            if(!obj.success){
                obj.success = function(){}
            }
            if(!obj.fail){
                obj.fail = function(){}
            }
            if(!obj.complete){
                obj.complete = function(){}
            }
            wx.navigateToMiniProgram({
                appId: obj.appId,
                path: obj.path,
                extraData: obj.extraData,
                envVersion: obj.envVersion,
                success(res) {
                    // 打开成功
                    console.log("==打开成功==", res)
                    //跳转统计
                    let reqData = {
                        uid: self.getUser().uid,
                        to_appid: obj.appId,
                        status: 1,//跳转状态,1成功，2取消
                        type: obj.type,
                        position: obj.position
                    }
                    self.Post(self.iphttps + self.promoteClick, reqData);

                    obj.success(res)
                },
                fail(res){
                    console.log("==打开失败,取消了==", res)
                    let reqData = {
                        uid: self.getUser().uid,
                        to_appid: obj.appId,
                        status: 2,//跳转状态,1成功，2取消
                        type: obj.type,
                        position: obj.position
                    }
                    self.Post(self.iphttps + self.promoteClick, reqData);
                    obj.fail(res)
                },
                complete(res){
                    obj.complete(res)
                }
            })
        }
    }
    /**
     * @apiGroup B
     * @apiName previewImage
     * @api {全屏预览图片} 在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作。 previewImage（预览图片）
     * @apiParam {Array} urls 需要预览的图片链接列表。2.2.3 起支持云文件ID。
     * @apiParam {String} [current="urls 的第一张"] 当前显示图片的链接
     * @apiParam {function} [success] 接口调用成功的回调函数	
     * @apiParam {function} [fail] 接口调用失败的回调函数
     * @apiParam {function} [complete] 接口调用结束的回调函数（调用成功、失败都会执行）
     * 
     * @apiSuccessExample {json} 示例:
     *  //.参考文档：https://developers.weixin.qq.com/minigame/dev/api/open-api/miniprogram-navigate/wx.navigateToMiniProgram.html
     *  sdk.previewImage({
     *      current: '', // 当前显示图片的http链接
     *      urls: [] // 需要预览的图片http链接列表
     *  })
     * 
     */
    sdk.prototype.previewImage = function(obj) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.previewImage(obj)
        }
    }
    

    //=================================C===========================
    /**
     * @apiGroup C
     * @apiName screenshot
     * @api {微信小游戏截图保存} 微信小游戏截图保存 screenshot（游戏截图）
     * 
     * @apiSuccessExample {json} 示例:
     *   //.微信小游戏：截图保存
     *   sdk.screenshot((d)=>{
     *       if(d){
     *           console.log("图片保存成功：", d)
     *       }else{
     *           console.log("图片保存失败：", d)
     *       }
     *   })
     * 
     */
    sdk.prototype.screenshot = function(callback) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            var self = this;
            //1.判断是否授权
            wx.getSetting({
                success(res){
                    // console.log("授权状态", res.authSetting['scope.writePhotosAlbum'])
                    if(res.authSetting['scope.writePhotosAlbum']){
                        self.capture(callback);
                    }else{
                        // console.log("未授权", res)
                        wx.authorize({
                            scope: 'scope.writePhotosAlbum',
                            success(res2){
                                // console.log("success res2",res2)
                                self.screenshot(callback);
                            },
                            fail(res2){
                                // console.log("重新授权")
                                wx.showModal({
                                    title: '提示',
                                    content: '请开启保存到相册功能',
                                    showCancel: false,
                                    success(){
                                        wx.openSetting({
                                            success(res3){
                                                // console.log("===重新授权===", res3)
                                                if(res3.authSetting['scope.writePhotosAlbum']){
                                                    self.screenshot(callback);
                                                }else{
                                                    wx.showToast({ title: "授权失败" })
                                                    callback(null)
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                },
                fail(){
                    callback(null)
                }
            })
        }
    },
    sdk.prototype.capture = function(callback) {
        if(cc.ENGINE_VERSION < "2.0.0"){
            //1.9.3旧版本截图
            var canvas = cc.game.canvas;
            var width  = cc.winSize.width;
            var height  = cc.winSize.height;

            canvas.toTempFilePath({
                x: 0,
                y: 0,
                width: width,
                height: height,
                destWidth: width,
                destHeight: height,
                success (res) {
                    //.可以保存该截屏图片
                    // console.log(res)
                    //.保存到手机
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success(res2){
                            console.log('==截图保存=success=',res2)
                            callback(true)
                        },
                        fail(res2){
                            console.log('==截图保存=fail=',res2)
                            callback(null)
                        }
                    })
                }
            })
        }else{
            //2.0.1新版本截图
            var cameraNode = new cc.Node('camera');
            cameraNode.parent = cc.director.getScene().getChildByName('Canvas');
            var camera = cameraNode.addComponent(cc.Camera);


            //.要截取的范围（全屏）
            let texture = new cc.RenderTexture();
            // 如果截图内容中不包含 Mask 组件，可以不用传递第三个参数
            let gl = cc.game._renderContext;
            texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, gl.STENCIL_INDEX8);
            camera.targetTexture = texture;
            this.texture = texture;


            let width = this.texture.width;
            let height = this.texture.height;
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;
            camera.render();
            let data = this.texture.readPixels();
            let rowBytes = width * 4;
            for (let row = 0; row < height; row++) {
                let srow = height - 1 - row;
                let imageData = ctx.createImageData(width, 1);
                let start = srow*width*4;
                for (let i = 0; i < rowBytes; i++) {
                    imageData.data[i] = data[start+i];
                }
                ctx.putImageData(imageData, 0, row);
            }
            var dataURL = canvas.toDataURL("image/jpeg");
            var tempFilePath = canvas.toTempFilePathSync({
                x: 0,
                y: 0,
                width: width,
                height: height,
                destWidth: width,
                destHeight: height,
            });
            //.保存到手机
            wx.saveImageToPhotosAlbum({
                filePath: tempFilePath,
                success(res2){
                    console.log('==截图保存=success=',res2)
                    callback(true)
                },
                fail(res2){
                    console.log('==截图保存=fail=',res2)
                    callback(null)
                }
            })
        }
    }
    /**
     * @apiGroup C
     * @apiName on
     * @api {注册game的特定事件类型回调} 注册game的特定事件类型回调 on（注册game监听器）
     * 
     * @apiSuccessExample {json} 示例:
     *   //注册 cc.game.on 的特定事件类型回调
     *   xx_sdk.on("xxx", (e)=>{
     *      console.log("xxx")
     *   }, this);
     * 
     */
    sdk.prototype.on = function(type, callback, target) {
        if (!callback || !target) {
            console.log("事件注册失败，缺少参数callback 或 target")
            return;
        }
        if(type != "WebSocket"){
            type = this.sdk_conf.game +"_"+ type;
        }
        cc.game.on(type, callback, target)
    },
    /**
     * @apiGroup C
     * @apiName once
     * @api {注册game的特定事件类型回调，回调会在第一时间被触发后删除自身。} 注册game的特定事件类型回调，回调会在第一时间被触发后删除自身。 once（game监听器）
     * 
     * @apiSuccessExample {json} 示例:
     *   //注册 cc.game.once 的特定事件类型回调，回调会在第一时间被触发后删除自身。
     *   xx_sdk.once("xxx", (e)=>{
     *      console.log("xxx")
     *   }, this);
     * 
     */
    sdk.prototype.once = function(type, callback, target) {
        if (!callback || !target) {
            console.log("事件注册失败，缺少参数callback 或 target")
            return;
        }
        type = this.sdk_conf.game +"_"+ type;
        cc.game.once(type, callback, target)
    },
    /**
     * @apiGroup C
     * @apiName off
     * @api {删除game监听器} 删除game监听器 off（删除game监听器）
     * 
     * @apiSuccessExample {json} 示例:
     *   //删除监听器
     *   sdk.off("xxx");
     */
    sdk.prototype.off = function(type, callback, target) {
        if(type != "WebSocket"){
            type = this.sdk_conf.game +"_"+ type;
        }
        if (!callback || !target) {
            cc.game.off(type);
        }else{
            cc.game.off(type, callback, target);
        }
    },
    /**
     * @apiGroup C
     * @apiName off
     * @api {cc.game发射事件} cc.game发射事件 emit（cc.game发射事件）
     * 
     * @apiSuccessExample {json} 示例:
     *   //cc.game发射事件
     *   //sdk.emit("xxx");
     *   //sdk.emit("xxx", {nick:"xxx"});
     */
    sdk.prototype.emit = function(type, message) {
        if(type != "WebSocket"){
            type = this.sdk_conf.game +"_"+ type;
        }
        if (!message) {
            cc.game.emit(type);
        }else{
            cc.game.emit(type, message);
        }
    },


    /**
     * @apiGroup C
     * @apiName favourRecord
     * @api {点赞、送花记录查询} 点赞、送花记录查询 favourRecord（送花记录
     * @apiParam {Int} page 第几页	
     * @apiParam {Int} count 每页几条
     * 
     * @apiSuccessExample {json} 示例:
     *   //.点赞、送花
     *   sdk.favourRecord({ page: 1, count: 10 }, function(d){
     *       console.log(d)
     *   });
     */
    sdk.prototype.favourRecord = function(obj, callback) {
        var reqData = {
            uid: this.getUser().uid,
            page: obj.page,
            count: obj.count
        }
        this.Get(this.iphttps + this.GetLikeInfo, reqData, callback)
    }
    /**
     * @apiGroup C
     * @apiName gameRecord
     * @api {对战记录查询} 对战记录查询 gameRecord（对战记录）
     * @apiParam {Int} page 第几页	
     * @apiParam {Int} count 每页几条	
     * 
     * @apiSuccessExample {json} 示例:
     *   //.对战记录查询
     *   sdk.gameRecord({ page: 1, count: 10 }, function(d){
     *       console.log(d)
     *   });
     */
    sdk.prototype.gameRecord = function(obj, callback) {
        var reqData = {
            uid: this.getUser().uid,
            page: obj.page,
            count: obj.count
        }
        this.Get(this.iphttps + this.GetGameReport, reqData, callback)
    }
    /**
     * @apiGroup D
     * @apiName getGameData
     * @api {子游戏：获取对战数据} 子游戏：获取对战数据 getGameData-对战数据
     * 
     * @apiSuccessExample {json} 示例:
     *   //.开始游戏：从主盒子获取对战需要的数据，数据格式如下（可以使用以下数据进行测试）：
     *   var gameData = sdk.getGameData();
     * 
     *  // var gameData = {                //.非盒子环境下的调试数据
     *   //     user : {                //当前用户信息
     *   //         avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/E31dTdkFnKSFOmmy98kLqJlmDQFjLoRt52KTxohsKFtib2otLWZFOCzyuPXia8A7YR32th1FibqncWra94aAJQicYw/132",
     *   //         uid: "测试用户1",
     *   //         openid: "测试用户1",
     *   //         city: "广州",
     *   //         country: "中国",
     *   //         province: "广东",
     *   //         gender: 1,
     *   //         language: "zh_CN",
     *   //         nickName: "千寻િ😨雨天"
     *   //     },  
     *   //     ai: false,              //是否ai机器人 
     *   //     room_id: "room_001",          //房间id
     *   //     create_time: new Date().getTime()/1000,      //创建时间
     *   //     room_owner: "测试用户1", //房主uid
     *   //     game_id: "ab",          //游戏唯一标识
     *   //     player_count: 2,        //房间人数上限
     *   //     all_player_data: [      //对战数据
     *   //         {
     *   //             player_data:{
     *   //                 openid: "测试用户1",
     *   //                 avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/E31dTdkFnKSFOmmy98kLqJlmDQFjLoRt52KTxohsKFtib2otLWZFOCzyuPXia8A7YR32th1FibqncWra94aAJQicYw/132",
     *   //                 city:"广州",
     *   //                 country:"中国",
     *   //                 gender:1,
     *   //                 language:"zh_CN",
     *   //                 nickName:"千寻િ😨雨天",
     *   //                 province:"广东"
     *   //             },
     *   //             position:2,     //玩家所在房间的位置
     *   //             state:0,        //玩家状态  0：未准备   1：已准备
     *   //             uid:"测试用户1"
     *   //         },
     *   //         {
     *   //             player_data:{
     *   //                 openid: "测试用户2",
     *   //                 avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/oNyD409Hg3gHqJtqtKFhhYDiad6pRFiaprwjEheyLra4CEicGPdnn7uBCJL0oxZjqAibW4wrTsbtfnHoY6NolPpz9A/132",
     *   //                 city: "河池",
     *   //                 country: "中国",
     *   //                 gender: 2,
     *   //                 language: "zh_CN",
     *   //                 nickName: "象牙塔จุ๊บ",
     *   //                 province: "广东"
     *   //             },
     *   //             position:2,     //玩家所在房间的位置
     *   //             state:0,        //玩家状态  0：未准备   1：已准备
     *   //             uid: "测试用户2"
     *   //         },
     *   //     ]
     *   // }
     */
    sdk.prototype.getGameData = function() {
        var gameData = cc.sys.localStorage.getItem("gameData");
        if(gameData){
            var room = JSON.parse(gameData);
            return room;
        }else{
            //盒子环境
            if(window.aa_sdk){
                return null;
            }else{
                //非盒子环境
                if(this.sdk_conf.debugData){
                    return this.sdk_conf.debugData;
                }else{
                    console.log("==sdk_conf文件下的debugData数据不存在==")
                    return null;
                }
            }
        }
    },
    /**
     * @apiGroup D
     * @apiIgnore
     * @apiName uploadSound
     * @api {上传语音} 语音自定义版：上传语音文件后自行广播语音 uploadSound-上传语音
     * @apiParam {String} tempFilePath 语音文件临时路径（wx.getRecorderManager()获取的）
     * 
     * @apiSuccessExample {json} 示例:
     *   //上传语音文件
     *   sdk.uploadSound({
     *       tempFilePath: res.tempFilePath,
     *       success: function(url){
     *          console.log("语音文件播放地址：", url)
     *       },
     *       fail: function(res){
     *          console.log(res)
     *       }
     *   });
     */
    sdk.prototype.uploadSound = function(obj) {
        var self = this;

        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if(!this.FileSystemManager){
                this.FileSystemManager = wx.getFileSystemManager();
            }
            this.FileSystemManager.saveFile({
                tempFilePath: obj.tempFilePath,
                success(res) {
                    console.log("存储后录音的路径", res)
                    //语音上传
                    var reqData = {};
                    var ts = new Date().getTime();
                    reqData.game_id = self.sdk_conf.game;
                    reqData.version = self.sdk_conf.version;
                    reqData.ts = ts;
                    reqData.sign = self.md5(ts.toString().substr(9,4)+self.sdk_conf.game.substr(0,2)+self.sdk_conf.version.substr(0,1)+ '$5dfjr$%dsadsfdsii');
                    
                    reqData.scence = 1;
                    reqData.uid = self.getUser().uid;
                    wx.uploadFile({
                        url: self.iphttps+ self.GameUpFile, //仅为示例，非真实的接口地址
                        filePath: res.savedFilePath,
                        name: 'file',
                        formData: reqData,
                        success(res2) {
                            let data = JSON.parse(res2.data);
                            console.log(data)
                            //上传成功
                            if(data.code == 1){
                                obj.success(data.d.url)
                            }else{
                                obj.fail(res2)
                            }
                        },
                        fail(res2) {
                            console.log("语音文件上传失败", res2)
                            obj.fail(res2)
                        }
                    })
                },
            });
        }
    },
    /**
     * @apiGroup D
     * @apiName onRecorder
     * @api {注册录音事件} 注册录音事件 onRecorder-注册录音事件
     * @apiParam {cc.Node} node 录音按钮
     * 
     * @apiSuccessExample {json} 示例:
     *   //注册录音事件
     *   sdk.onRecorder(this.soundButton);
     */
    sdk.prototype.onRecorder = function(node) {
        var self = this;

        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            //是否使用该录音
            this.isUse = true;
            //录音时长
            let time = 0, startTime=0;
            //1.微信录音管理器
            if(!this.recorderManager){
                this.recorderManager = wx.getRecorderManager()
                this.recorderManager.onStart(()=>{
                    console.log('recorder 开始1')
                    startTime = new Date().getTime();
                    //暂停播放音乐
                    cc.audioEngine.pauseAll();
                    cc.audioEngine.pauseAllEffects();
                    cc.audioEngine.pauseMusic()
                    cc.sdk.ResUtil.show({ conf: cc.sdk.ResConf["aa_recording"] })
                })
                this.recorderManager.onPause(()=>{
                    console.log('recorder 暂停1')
                    cc.sdk.ResUtil.hide({ conf: cc.sdk.ResConf["aa_recording"] })
                })
                this.recorderManager.onStop((res)=>{
                    console.log('recorder 停止1', res)
                    time = new Date().getTime() - startTime;
                    //恢复播放音乐
                    cc.audioEngine.resumeAll();
                    cc.audioEngine.resumeAllEffects();
                    cc.audioEngine.resumeMusic()
                    cc.sdk.ResUtil.hide({ conf: cc.sdk.ResConf["aa_recording"] })
                    if(self.isUse && time > 1000){
                        //3.发送语音文件并在房间内广播
                        self.uploadSound({
                            tempFilePath: res.tempFilePath,
                            success: function(url){
                                console.log("语音文件播放地址1：", url)
                                //4.房间内广播语音
                                var d = {
                                    id: "c2s_room_broadcast",
                                    type: "broadcastSound", 
                                    game_id: self.sdk_conf.game,       
                                    url: url
                                };
                                if(window.aa_sdk){
                                    aa_sdk.wsSend(d);
                                }else{
                                    console.log("该接口只在盒子内生效")
                                }
                            },
                            fail: function(err){
                                console.log("发送语音文件失败1：", err)
                            }
                        });
                    }else{
                        console.log("录音时间过短1")
                    }
                })
            }

            //2.Cocos录音控制
            node.on(cc.Node.EventType.TOUCH_START, function(){
                console.log("开始录音1")
                cc.audioEngine.pauseAll();
                cc.audioEngine.pauseAllEffects();
                cc.audioEngine.pauseMusic()
                this.isUse = true;
                this.recorderManager.start({
                    duration: 10000,
                    sampleRate: 44100,
                    numberOfChannels: 1,
                    encodeBitRate: 192000,
                    format: 'mp3',//aac、mp3
                    frameSize: 50
                })
            }, this);
            node.on(cc.Node.EventType.TOUCH_END, function(){
                console.log("结束录音1")
                this.recorderManager.stop()
                cc.audioEngine.resumeAll();
                cc.audioEngine.resumeAllEffects();
                cc.audioEngine.resumeMusic()
            }, this);
            node.on(cc.Node.EventType.TOUCH_CANCEL, function(){
                console.log("结束录音，不使用1")
                this.isUse = false;
                this.recorderManager.stop()
                cc.audioEngine.resumeAll();
                cc.audioEngine.resumeAllEffects();
                cc.audioEngine.resumeMusic()
            }, this);

        }
    },
    //录音=》上传=》返回url、time
    sdk.prototype.onRecorder2 = function(node, callback) {
        var self = this;

        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            //是否使用该录音
            let isUse = true;
            //录音时长
            let time = 0, startTime=0;
            //1.微信录音管理器
            if(!this.recorderManager){
                this.recorderManager = wx.getRecorderManager()
                this.recorderManager.onStart(()=>{
                    console.log('recorder 开始')
                    startTime = new Date().getTime();
                    //暂停播放音乐
                    cc.audioEngine.pauseAll();
                    cc.audioEngine.pauseAllEffects();
                    cc.audioEngine.pauseMusic()
                    cc.sdk.ResUtil.show({ conf: cc.sdk.ResConf["aa_recording"] })
                })
                this.recorderManager.onPause(()=>{
                    console.log('recorder 暂停')
                    cc.sdk.ResUtil.hide({ conf: cc.sdk.ResConf["aa_recording"] })
                })
                this.recorderManager.onStop((res)=>{
                    console.log('recorder 停止', res)
                    time = new Date().getTime() - startTime;
                    //恢复播放音乐
                    cc.audioEngine.resumeAll();
                    cc.audioEngine.resumeAllEffects();
                    cc.audioEngine.resumeMusic()
                    cc.sdk.ResUtil.hide({ conf: cc.sdk.ResConf["aa_recording"] })
                    if(isUse && time > 1000){
                        //3.发送语音文件并在房间内广播
                        self.uploadSound({
                            tempFilePath: res.tempFilePath,
                            success: function(url){
                                console.log("语音文件播放地址：", url)
                                callback(url, time) 
                            },
                            fail: function(err){
                                console.log("发送语音文件失败：", err)
                                callback(false) 
                            }
                        });
                    }else{
                        callback(false) 
                    }
                })
            }

            //2.Cocos录音控制
            node.on(cc.Node.EventType.TOUCH_START, function(){
                console.log("开始录音")
                isUse = true;
                this.recorderManager.start({
                    duration: 10000,
                    sampleRate: 44100,
                    numberOfChannels: 1,
                    encodeBitRate: 192000,
                    format: 'mp3',//aac、mp3
                    frameSize: 50
                })
            }, this);
            node.on(cc.Node.EventType.TOUCH_END, function(){
                console.log("结束录音")
                this.recorderManager.stop()
            }, this);
            node.on(cc.Node.EventType.TOUCH_CANCEL, function(){
                console.log("结束录音，不使用")
                isUse = false;
                this.recorderManager.stop()
            }, this);

        }
    },
    //wx音频播放器：播放网络音频
    sdk.prototype.playSound = function(url) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if(!this.innerAudioContext){
                this.innerAudioContext = wx.createInnerAudioContext()
                this.innerAudioContext.autoplay = false;
                this.innerAudioContext.src = '';
                // this.innerAudioContext.onPlay(()=>{
                //     console.log('开始播放')
                // })
                // this.innerAudioContext.onError((res)=>{
                //     console.log('播放错误', res)
                // })
            }
            this.innerAudioContext.src = url;
            this.innerAudioContext.play()

            return this.innerAudioContext;
        }else{
            return null;
        }
    }
    /**
     * @apiGroup D
     * @apiName setSoundStatus
     * @api {设置语音开关} 如果不想听其它人说话，可以屏蔽语音 setSoundStatus-语音开关
     * @apiParam {status} status=1 1：开启语音 0：屏蔽语音
     * 
     * @apiSuccessExample {json} 示例:
     *   //屏蔽语音
     *   sdk.setSoundStatus(0);
     *   //开启语音
     *   sdk.setSoundStatus(1);
     */
    sdk.prototype.setSoundStatus = function(status) {
        // this.setItem("soundStatus", status)
        cc.sys.localStorage.setItem("soundStatus", status);
    }
    /**
     * @apiGroup D
     * @apiName getSoundStatus
     * @api {获取语音开关状态} 当前语音的开关状态 getSoundStatus-语音开关
     * @apiParam {int} return 1：已开启语音 0：已屏蔽语音
     * @apiSuccessExample {json} 示例:
     *   //获取语音开关状态：0 或 1
     *   var status = sdk.getSoundStatus();
     */
    sdk.prototype.getSoundStatus = function() {
        // var status = this.getItem("soundStatus");
        var status = cc.sys.localStorage.getItem("soundStatus");
        if(status == 0){
            return parseInt(status);
        }else{
            return 1;
        }
    }

    //聊天表情包
    sdk.prototype.setCurrentEmojiSkin = function(skinId){
        this.setItem("CurrentEmojiSkin", skinId);
    };
    sdk.prototype.getCurrentEmojiSkin = function(){
        if(this.EmojiSkinIndex){
            return this.EmojiSkinIndex;
        }else{
            this.EmojiSkinIndex = this.getItem("CurrentEmojiSkin")
            return this.EmojiSkinIndex;        
        }
    };
    /**
     * @apiGroup D
     * @apiName getEmoji
     * @api {表情包列表} 表情包列表 getEmoji（表情包列表）
     * @apiParam {function} callback 不存在返回null
     * 
     * @apiSuccessExample {json} 示例:
     *   //获取表情包列表
     *   sdk.getEmoji((d)=>{
     *       console.log(d)
     *       // [
     *       //     {
     *       //         "id":1,
     *       //         "type":1,       //表情类型
     *       //         "url":"https://qxgame-1257972171.cos.ap-guangzhou.myqcloud.com/gameadmin/emoji/1.png",
     *       //         "weight":10,    //表情权重
     *       //         "txt ":"太菜了" //表情中文描述
     *       //     },
     *       // ]
     *   });
     */
    sdk.prototype.getEmoji = function(callback) {
        var self = this;
        if(this.EmojiList){
            callback(this.EmojiList)
        }else{
            let reqData = {};
            let CurrentEmoji = self.getCurrentEmojiSkin()
            if(CurrentEmoji){
                reqData.prop_index = CurrentEmoji; 
            }
            this.Get(this.iphttps + this.GetEmojiImg, reqData, (d)=>{
                // console.log(d)
                if(d.code == 1){
                    self.EmojiList = d.d;
                    callback(self.EmojiList);
                }else{
                    console.log("表情包获取失败", d)
                    callback(null);
                }
            })
        }
    }
    /**
     * @apiGroup D
     * @apiName sendEmoji
     * @api {表情包发送} 房间内广播一个表情 sendEmoji（表情包发送）
     * @apiParam {Object} emoji 表情对象
     * 
     * @apiSuccessExample {json} 示例:
     *   //房间内广播一个表情
     *   aa_sdk.sendEmoji(emoji)
     */
    sdk.prototype.sendEmoji = function(emoji) {
        var self = this;
        
        var d = {
            id: "c2s_room_broadcast",
            type: "broadcastEmoji", 
            game_id: this.sdk_conf.game,       
            emoji: emoji,
            sender: this.getUser()
        };
        if(this.debug){
            console.log("sdk广播一个表情", d)
        }
        if(window.aa_sdk){
            aa_sdk.wsSend(d);
        }else{
            console.log("sendEmoji接口只在盒子内生效")
        }
    }
    /**
     * @apiGroup D
     * @apiName onEmoji
     * @api {表情包监听} 监听收到表情包事件 onEmoji（表情包监听）
     * @apiParam {function} callback 返回一个表情对象
     * 
     * @apiSuccessExample {json} 示例:
     *   //监听收到表情包事件
     *   sdk.onEmoji((emoji)=>{
     *       console.log("=收到一个表情=", emoji)
     *       console.log("=该表情的发送者=", emoji.sender)
     *   })
     */
    sdk.prototype.onEmoji = function(callback) {
        var self = this;
       
        if(window.aa_sdk){
            aa_sdk.off("broadcastEmoji")
            aa_sdk.on("broadcastEmoji", (e)=>{
                if(self.debug){
                    console.log("sdk收到一个表情", e)
                }
                callback(e)
            }, this); 
        }else{
            console.log("onEmoji接口只在盒子内生效")
        }
    }


    /**
     * @apiGroup D
     * @apiName onGameEvent
     * @api {监听全局游戏事件} 监听全局游戏事件 onGameEvent - 游戏事件
     * @apiParam {function} callback 返回一个表情对象
     * 
     * @apiSuccessExample {json} 示例:
     *   // 监听全局游戏事件
     *   xx_sdk.onGameEvent((e)=>{
     *       if(e.type == "emoji"){
     *           console.log("=收到一个表情=", e.emoji)
     *           // 表情格式如下
     *           // emoji = {
     *           //     "id":1,
     *           //     "type":1,       //表情类型
     *           //     "url":"https://qxgame-1257972171.cos.ap-guangzhou.myqcloud.com/gameadmin/emoji/1.png",
     *           //     "weight":10,    //表情权重
     *           //     "txt ":"太菜了", //表情中文描述
     *           //     "sender": {     //表情的发送者
     *           //         "uid": "wx_oGUmH5Ic0ls6xa52epYcL7n77U3U", 
     *           //         "openid": "oGUmH5Ic0ls6xa52epYcL7n77U3U", 
     *           //         "nickName": "千寻િ😨雨天", 
     *           //         "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/ib3FwHCA5Nc3N0MpRdb6D5aibGTchEiad27KgRal9BPibfNHo0NZmagJVziaGmn96icC8cqJIrUW3B1vHlG9icibbK5tgA/132", 
     *           //         "gender": 1, 
     *           //         "country": "中国", 
     *           //         "city": "广州", 
     *           //         "province": "广东", 
     *           //         "sig": ""
     *           //     }
     *           // }
     *       }
     *       if(e.type == "giveUp"){
     *           console.log("=对方认输了，调用游戏停止逻辑=")
     *       }
     *   })
     */
    sdk.prototype.onGameEvent = function(callback) {
        var self = this;
       
        if(window.aa_sdk){
            aa_sdk.off("broadcastEmoji")
            aa_sdk.on("broadcastEmoji", (e)=>{
                let d = {
                    type: "emoji",
                    emoji: e
                }
                callback(d)
            }, this); 

            aa_sdk.off("aa_giveUp")
            aa_sdk.on("aa_giveUp", ()=>{
                let d = {
                    type: "giveUp",
                }
                callback(d)
            }, this); 
            
        }else{
            console.log("onGameEvent 接口只在盒子内生效")
        }
    }
    
    //根据uid查询用户信息
    sdk.prototype.getUserData = function(uid, callback) {
        var self = this;
       
        this.Get(this.iphttps_2 + this.playerdata, { uid: uid }, function (d) {
            if(d && d.code == 1){
                callback(d.d)
            }else{
                callback(null)
            }
        });
    }
     /**
     * @apiGroup D
     * @apiIgnore
     * @apiName uploadResult
     * @api {子游戏：上报战果} 子游戏：上报战果 uploadResult-上报战果
     * @apiParam {int} result 战果: 0负 1平 2胜
     * @apiParam {String} opponent_uid 对手uid
     * 
     * @apiSuccessExample {json} 示例:
     *   //.上报战果
     *   sdk.uploadResult({ result: 2, opponent_uid: "xxx" }, function(d){
     *       console.log(d)
     *   });
     */
    sdk.prototype.uploadResult = function(obj, callback) {
        var reqData = {
            uid: this.getUser().uid,
            result: obj.result,  //.0负 1平 2胜
            opponent_uid: obj.opponent_uid, //.对手uid
            match_type: obj.match_type,
            game_type: obj.game_type
        }
        if(obj.game_id){
            reqData.game_id = obj.game_id;
        }
        console.log("==SDK上传战报数据：==", reqData)
        this.Post(this.iphttps + this.GameReport, reqData, callback)
    }
    /**
     * @apiGroup D
     * @apiIgnore
     * @apiName favour
     * @api {点赞、送花} 点赞、送花 favour（点赞、送花）
     * @apiParam {String} tar_uid 对方的uid	
     * 
     * @apiSuccessExample {json} 示例:
     *   //.点赞、送花
     *   sdk.favour({ tar_uid: 2 }, function(d){
     *       console.log(d)
     *   });
     */
    sdk.prototype.favour = function(obj, callback) {
        var reqData = {
            src_uid: this.getUser().uid,
            tar_uid: obj.tar_uid,
        }
        if(obj.game_id){
            reqData.game_id = obj.game_id;
        }
        this.Post(this.iphttps + this.Like, reqData, callback)
    }
    /**
     * @apiGroup D
     * @apiName giveUp
     * @api {弹出认输返回界面} 子游戏：弹出认输返回界面 giveUp（认输界面）
     * 
     * @apiSuccessExample {json} 示例:
     *   //.子游戏：弹出认输返回界面
     *   xx_sdk.giveUp(function(res){
     *       if(res == 1){
     *           //确认
     *       }else{
     *           //取消
     *       }
     *   })
     */
    sdk.prototype.giveUp = function(callback) {
        if(window.aa_sdk){
            cc.sdk.ResConf["giveUp"].data.callback = callback;
            cc.sdk.ResConf["giveUp"].data.game_id = this.sdk_conf.game;
            cc.sdk.ResUtil.show({ conf: cc.sdk.ResConf["giveUp"]})
        }else{
            console.log("giveUp 接口只在盒子内生效")
        }
    }
    /**
     * @apiGroup D
     * @apiName showResult
     * @api {结果展示} 展示游戏结果页面 showResult（结果展示）
     * 
     * @apiSuccessExample {json} 示例:
     *   //.子游戏：展示游戏结果页面
     *   var result = [
     *       {
     *           uid: "wx_robot_2",      //用户id
     *           score: 2                //比分
     *       },
     *       {
     *           uid: "wx_robot2_",      //用户id
     *           score: 1                //比分
     *       },
     *   ]
     *   xx_sdk.showResult({result: result});
     */
    sdk.prototype.showResult = function(obj) {
        if(window.aa_sdk){
            cc.sdk.ResConf["GameOver"].data.result = obj.result;
            if(obj.game_id){
                cc.sdk.ResConf["GameOver"].data.game_id = obj.game_id;
            }else{
                cc.sdk.ResConf["GameOver"].data.game_id = this.sdk_conf.game;
            }
            cc.sdk.ResUtil.show({ conf: cc.sdk.ResConf["GameOver"]})
        }else{
            console.log("showResult接口只在盒子内生效")
        }
    }
    /**
     * @apiGroup D
     * @apiName getBbmSwitch
     * @api {背景音乐开关状态} 获取背景音乐开关状态 getBbmSwitch-背景音乐
     * 
     * @apiSuccessExample {json} 示例:
     *  //.背景音乐开关
     *  xx_sdk.getBbmSwitch();//0：关 1：开
     */
    sdk.prototype.getBbmSwitch = function() {
        let bgswitch = aa_sdk.getItem('AudioSwitch');
        return parseInt(bgswitch);
    }

    /**
     * @apiGroup D
     * @apiName getPropById
     * @api {通过道具ID获取我的道具} 通过道具ID获取我的道具 getPropById-获取道具
     * 
     * @apiSuccessExample {json} 示例:
     *  //通过道具ID获取我的道具，没有则返回null
     *  let prop = xx_sdk.getPropById(xxx);
     *  //道具格式如下：
     *  // {
     *  //     description: "黄金兔工炸药道具",
     *  //     icon: "https://cdn.kxt.90wqiji.com/gameadmin/201901281526245c4eaea012d9e.png",
     *  //     index: 76494184,
     *  //     name: "黄金兔工炸药道具",
     *  //     param: {},
     *  //     prop_count: 1,
     *  //     type: 102
     *  // }
     */
    sdk.prototype.getPropById = function(id) {
        if(window.aa_sdk){
            return cc.sdk.GameUtil.getPropById(id);
        }else{
            console.log("getPropById 接口只在盒子内生效")
            return null;
        }
    }
    /**
     * @apiGroup D
     * @apiName usePropById
     * @api {通过道具ID使用道具} 通过道具ID使用道具 usePropById-使用道具
     * 
     * @apiSuccessExample {json} 示例:
     *  xx_sdk.usePropById({
     *       prop_index: 0,  //道具编号
     *       prop_count: 1,  //使用数量
     *       success(res){
     *           if(res.code){
     *               console.log("道具使用成功")
     *           }else{
     *               console.log("道具使用失败")
     *           }
     *       }
     *   });
     */
    sdk.prototype.usePropById = function(obj) {
        if(window.aa_sdk){
            if(!obj.success){
                obj.success = function(){}
            }
            obj.uid = this.getUser().uid;
            this.Post(this.iphttps_2 + this.gameuseprop, obj, function (d) {
                console.log('道具使用结果：',  d)
                obj.success(d);
            });
        }else{
            console.log("usePropById 接口只在盒子内生效")
        }
    }
    /**
     * @apiGroup D
     * @apiName getGold
     * @api {获取当前用户剩余金萝卜} 获取当前用户剩余金萝卜 getGold-获取金萝卜
     * 
     * @apiSuccessExample {json} 示例:
     *  let gold = xx_sdk.getGold();
     */ 
    sdk.prototype.getGold = function() {
        if(window.aa_sdk){
            return aa_sdk.box_role_attr.gold;
        }else{
            console.log("getGold 接口只在盒子内生效")
            return 0;
        }
    }
    /**
     * @apiGroup D
     * @apiName useGold
     * @api {使用金萝卜} 使用金萝卜 useGold-使用金萝卜
     * 
     * @apiSuccessExample {json} 示例:
     *  xx_sdk.useGold({
     *       gold: 100,  //使用金萝卜数量
     *       success(res){
     *           if(res.code){
     *               console.log("金萝卜使用成功")
     *           }else{
     *               console.log("金萝卜使用失败")
     *           }
     *       }
     *   });
     */
    sdk.prototype.useGold = function(obj) {
        if(window.aa_sdk){
            if(!obj.success){
                obj.success = function(){}
            }
            obj.uid = this.getUser().uid;
            this.Post(this.iphttps_2 + this.gameusegold, obj, function (d) {
                console.log('金币使用结果：',  d)
                obj.success(d);
            });
        }else{
            console.log("useGold 接口只在盒子内生效")
        }
    }
    
    
    
    //============自研游戏：共享盒子scoket================
    /**
     *  非盒子环境下需要初始化：
     *      xx_sdk.notBoxInit();
     * 
     *  使用盒子socket发送消息：
     *      xx_sdk.wsSend(obj)
            // var d = {
            //     id: "c2s_room_broadcast",//房间内广播
            //     uid: "xxx", //传uid则单播，缺省则广播
            // };
            // xx_sdk.wsSend(d)
     * 
     *  使用盒子socket接收消息：
     *      xx_sdk.on("WebSocket", (e) => { });
     */
    sdk.prototype.wsSend = function(d) {
        var self = this;

        if(window.aa_sdk){
            if(aa_sdk.ws && aa_sdk.ws.readyState == WebSocket.OPEN){
                aa_sdk.ws.send(JSON.stringify(d));
            }else{
                //是否正在重连
                if(!aa_sdk.isConnect){
                    aa_sdk.isConnect = true;
                    aa_sdk.initPK(d);
                }
            }
        }else{
            if(this.ws && this.ws.readyState == WebSocket.OPEN){
                this.ws.send(JSON.stringify(d));
            }else{
                this.notBoxInit();
            }
        }
    }

    //非盒子环境下初始化（仅供调试）
    sdk.prototype.notBoxInit = function() {
        var self = this;

        if(!window.aa_sdk){
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            if (userAgent.indexOf("iPhone") > -1) {
                console.log("==iPhone机==", this.sdk_conf.debugData)
            }
            if (userAgent.indexOf("Android") > -1) {
                let user1 = this.sdk_conf.debugData.all_player_data[0];
                let user2 = this.sdk_conf.debugData.all_player_data[1];
                this.sdk_conf.debugData.user = user2.player_data;
                this.sdk_conf.debugData.user.uid = user2.uid;
                this.sdk_conf.debugData.all_player_data[0] = user2;
                this.sdk_conf.debugData.all_player_data[1] = user1;
                console.log("==Android机==", this.sdk_conf.debugData)
            }

            //.WebSocket.CONNECTING    WebSocket.OPEN  WebSocket.CLOSING   WebSocket.CLOSED
            let toUid = self.getGameData().all_player_data[1].uid;
            var user = this.getUser();
            this.ws = null;
            this.ws = new WebSocket(this.ipwss); 
            this.ws.onopen = function (e) {  
                //.登录socket
                var timestamp = parseInt(new Date().getTime()/1000);
                var d = {
                    "id": "c2s_signin",
                    "uid": user.uid,
                    "timestamp": timestamp,
                    "sign": self.md5(user.uid +timestamp +self.sdk_conf.secret)
                };
                // console.log( "登录参数：", d, user.uid +timestamp +self.sdk_conf.secret)
                self.ws.send(JSON.stringify(d));
            }  
            this.ws.onmessage = function (e) { 
                var data = JSON.parse(e.data);
                //.广播给其它子游戏
                self.emit("WebSocket", e);
                //登录
                if(data.id == "c2s_signin"){
                    if(data.code == 1){
                        if(self.getGameData().room_owner == user.uid){
                            var d = {
                                "id": "c2s_create_room",
                                "game_id": "ab",
                                "player_count": 2,
                            };
                            self.ws.send(JSON.stringify(d));
                        }
                    }
                }
                if(data.id == "c2s_create_room"){
                    if(data.code == 1){
                        //房主创建房间
                        // console.log(user.uid, "房主：", self.getGameData().room_owner)
                        if(self.getGameData().room_owner == user.uid){
                            let d = {
                                id: "c2s_send_msg_to_player",
                                uid: toUid,
                                type: "JoinRoom",
                                room_id: data.room_id
                            }
                            setTimeout(() => {
                                self.ws.send(JSON.stringify(d));
                            }, 1000);
                        }
                    }
                }
                if(data.id == "c2s_send_msg_to_player" && data.type == "JoinRoom"){
                    //非房主才需要加入房间
                    if(self.getGameData().room_owner != user.uid){
                        var d = {
                            id: "c2s_enter_room",
                            room_id: data.room_id,
                        };
                        self.ws.send(JSON.stringify(d));
                    }
                }
                if(data.id == "c2s_enter_room"){
                    if(data.all_player_data && data.all_player_data.length == data.player_count){
                        if(self.getGameData().room_owner == user.uid){
                            console.log("我是房主，进入房间成功")
                        }else{
                            console.log("我是房客，进入房间成功")
                        }
                    }
                }

            }
        }
    }



    window.sdk = sdk;
    module.exports = sdk;
})(window, require("md5"));