/**
    1.配置xx_sdk_conf
    2.查看api文档：
       https://laixiao.github.io/gamebox/api/index.html
 */
(function(window, md5) {
    let sdk_conf = null;

    // window.aa_sdk = new sdk({ sdk_conf: require("aa_sdk_conf") });
    // window.aa_sdk = new sdk({ sdk_conf: require("aa_sdk_conf"), debug: true });
    function sdk(args) {
        // this.container = document.getElementById(container);
        var args = args || {};
        sdk_conf = args.sdk_conf;
        this.md5 = md5;
        
        this.debug = args.debug || sdk_conf.debug;
        this.iphttps = args.iphttps || "https://www.90wqiji.com";
        this.ipwss = args.ipwss || "wss://www.90wqiji.com";
        this.loginBg = args.loginBg || "https://www.90wqiji.com/box/image/singlecolor.png";
        this.loginBt = args.loginBt || "https://www.90wqiji.com/box/image/happyrabbitlogin.png";

        this.login = args.login || "/Login";
        this.Config = args.Config || "/Config/GameConfig";
        this.Share = args.Share || "/Config/ShareConfig";
        this.GameReport = args.GameReport || "/Game/GameReport";
        this.Like = args.Like || "/Game/Like";
        this.GetLikeInfo = args.GetLikeInfo || "/Game/GetLikeInfo";
        this.GetGameReport = args.GetGameReport || "/Game/GetGameReport";
        
        this.ConfigData = args.ConfigData || { 
            "config1": {},
            "config2": {},
        };
        this.ShareList = args.ShareList || [];
        this.BannerAd = args.BannerAd || null;
        this.VideoAd = args.VideoAd || null;
        
    }

    /**
     * @apiGroup A
     * @apiName init
     * @api {初始化sdk} 使用sdk前，必须在启动页初始化一次才能使用 init（初始化sdk）
     *
     * @apiParam {Boolean} [debug=false] 是否开启调试
     * 
     * @apiSuccessExample {json} 示例:
     *  if(!window.xx_sdk){
     *      window.xx_sdk = new sdk({ sdk_conf: require("xx_sdk_conf"), debug: true });
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

        this.checkUpdate();

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
                        if(self.debug){
                            console.log("1.初始化分享信息失败，再次初始化：",d)
                        }
                        self.init(callback);
                    }
                });
            }else{
                if(self.debug){
                    console.log("2.初始化后台配置信息失败，再次初始化：",d)
                }
                self.init(callback);
            }
        });

        

    }
    /**
     * @apiGroup C
     * @apiName Get
     * @api {Get} 发起网络请求 Get（发起Get请求）
     * 
     * @apiParam {String} url 请求地址
     * @apiParam {Object} reqData 请求参数
     * @apiParam {Object} callback 不存在返回null
     * @apiSuccessExample {json} 示例:
     * sdk.Get("https://xxx.xxx", { user_id: user_id }, function (d) {
     *     console.log(d)
     * });
     */
    sdk.prototype.Get = function(url, reqData, callback) {
        var self = this;

        reqData.game = sdk_conf.game;
        reqData.version = sdk_conf.version;
        var ts = new Date().getTime();
        reqData.ts = ts;
        //数据验证签名。规则为：MD5(ts.substr(9,4)+game.substr(0,2)+version.substr(0,1)+key),时间戳后4位、data前3位、key（服务端提供）然后进行MD5加密
        reqData.sign = md5(ts.toString().substr(9,4)+sdk_conf.game.substr(0,2)+sdk_conf.version.substr(0,1)+ '$5dfjr$%dsadsfdsii');
        
        url += "?";
        for (var item in reqData) {
            url += item + "=" + reqData[item] + "&";
        }
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    var response = xhr.responseText;
                    if (response) {
                        var responseJson = JSON.parse(response);
                        callback(responseJson);
                    } else {
                        if(self.debug){
                            console.log("返回数据不存在",url)
                        }
                        callback(null);
                    }
                } else {
                    if(self.debug){
                        console.log("请求失败",url)
                    }
                    callback(null);
                }
            }
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
        
        reqData.game = sdk_conf.game;
        reqData.version = sdk_conf.version;
        var ts = new Date().getTime();
        reqData.ts = ts;
        reqData.sign = md5(ts.toString().substr(9,4)+sdk_conf.game.substr(0,2)+sdk_conf.version.substr(0,1)+ '$5dfjr$%dsadsfdsii');
        
        //1.拼接请求参数
        // var param = "";
        // for (var item in reqData) {
        //     param += item + "=" + reqData[item] + "&";
        // }
        //2.发起请求
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    var response = xhr.responseText;
                    // console.log(response)
                    if (response) {
                        var responseJson = JSON.parse(response);
                        callback(responseJson);
                    } else {
                        if(self.debug){
                            console.log("返回数据不存在")
                        }
                        callback(null);
                    }
                } else {
                    if(self.debug){
                        console.log("请求失败",xhr)
                    }
                    callback(null);
                }
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(JSON.stringify(reqData));//reqData为json字符串形式
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
     * sdk.onShareAppMessage({type: 0, query: "uid=520" });
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
                    shareInfo.query += "&"+obj.query + "&share_id="+shareInfo.sysid + "&uid="+userid;
                }else{
                    if(obj.query){
                        shareInfo.query = "share_id="+shareInfo.sysid+"&uid="+userid +"&" + obj.query;
                    }else{
                        shareInfo.query = "share_id="+shareInfo.sysid + "&uid="+userid;
                    }
                }
                if(obj.success){
                    shareInfo.success = obj.success;
                }
                if(obj.fail){
                    shareInfo.fail = obj.fail;
                }

                //.分享统计 测试：  uid=11&share_id=22
                var option = {'uid': userid, 'share_id': shareInfo.sysid };
                // console.log('==1统计信息==', { log_type: "ShareClick", data: option })
                // self.Get(self.ip3 + self.Logcommon, { log_type: "ShareClick", data: JSON.stringify(option) }, function (d) {
                //     // console.log("==1统计信息结果==", d)
                // });

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
     * sdk.shareAppMessage({type: 1, query: "uid=520" });
     */
    sdk.prototype.shareAppMessage = function(obj) {
        var self = this;
        
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
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
                shareInfo.query += "&"+obj.query + "&share_id="+shareInfo.sysid + "&uid="+userid;
            }else{
                if(obj.query){
                    shareInfo.query = "share_id="+shareInfo.sysid+"&uid="+userid +"&" + obj.query;
                }else{
                    shareInfo.query = "share_id="+shareInfo.sysid + "&uid="+userid;
                }
            }
            if(obj.success){
                shareInfo.success = obj.success;
            }
            if(obj.fail){
                shareInfo.fail = obj.fail;
            }
            // console.log("====111======", shareInfo);
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                wx.shareAppMessage(shareInfo);

                //.分享统计 测试： uid=11&share_id=22
                var option = {'uid': userid, 'share_id': shareInfo.sysid };
                // console.log('==2统计信息==', { log_type: "ShareClick", data: option })
                // self.Get(self.ip3 + self.Logcommon, { log_type: "ShareClick", data: JSON.stringify(option) }, function (d) {
                //     // console.log("==2统计信息结果==", d)
                // });
            }
        }
    }
    //.根据权重随机获取指定type类型的分享信息。（没有this.ShareList数据不能调用）
    sdk.prototype.getShareByWeight = function(type) {
        if(this.ShareList.length > 0){
            //1.获取某种type的集合
            var tArray = [];
            for (var i = 0; i < this.ShareList.length; i++) {
                if (type == this.ShareList[i].type) {
                    this.ShareList[i].weight = parseInt(this.ShareList[i].weight);
                    tArray.push(this.ShareList[i]);
                }
            }
            //2.根据权重配比：从i集合（权重越大占比越多）中随机获取。
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
            return null;
        }
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
     * var data = sdk.createImage(sprite, url);
     */
    sdk.prototype.createImage = function(sprite, url) {
        // if (cc.sys.platform === cc.sys.WECHAT_GAME) {
        //     var image = wx.createImage();
        //     image.onload = function () {
        //         var texture = new cc.Texture2D();
        //         texture.initWithElement(image);
        //         texture.handleLoadedTexture();
        //         sprite.spriteFrame = new cc.SpriteFrame(texture);
        //     };
        //     image.src = url;
        // }

        cc.loader.load({url: url, type: 'png'}, function (err, texture) {
            if(err){
                console.log(err)
            }else{
                sprite.spriteFrame = new cc.SpriteFrame(texture);
            }
        });
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
        var userinfo = cc.sys.localStorage.getItem("userinfo");
        if(userinfo){
            return JSON.parse(userinfo);
        }else{
            if(sdk_conf.debugData){
                return sdk_conf.debugData.user;
            }else{
                return null;
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
        key = sdk_conf.game +"_"+ key;
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
        key = sdk_conf.game +"_"+ key;
        return cc.sys.localStorage.getItem(key);
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
                item.key = sdk_conf.game +"_"+ item.key;
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
                item = sdk_conf.game +"_"+ item;
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
                item = sdk_conf.game +"_"+ item;
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
                item = sdk_conf.game +"_"+ item;
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
        field = sdk_conf.game +"_"+ field;

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
     * @apiGroup B
     * @apiName weChatLogin
     * @api {微信登录} 微信登录 weChatLogin（登录）
     * 
     * @apiSuccessExample {json} 示例:
     * // 1.判断是否登录（登录页）
     *   var user = sdk.getUser();
     *   if(user){
     *       //2.已经登录
     *       console.log("本地用户信息：", user)
     *   }else{
     *       //2.未登录：调用sdk登录
     *       sdk.weChatLogin((d)=>{
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
    sdk.prototype.weChatLogin = function(callback) {
        var self = this;
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            var options = wx.getLaunchOptionsSync();
            var user = this.getUser();

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
                            var width = 582/2;
                            var height = 700/2;
                            self.button = wx.createUserInfoButton({
                                type: 'image',
                                image: self.loginBt,
                                style: {  width: width, height: height, left: res.screenWidth/2-width/2, top: res.screenHeight/2-height/2 },
                                lang: 'zh_CN'
                            })
                            self.button.onTap((res1) => {
                                // 处理用户拒绝授权的情况
                                // if (res1.errMsg.indexOf('auth deny') > -1 || res1.errMsg.indexOf('auth denied') > -1 ) {
                                //     wx.showToast();
                                // }
                                wx.showToast({title: '登录中...',icon:'loading',duration: 8});
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
                    adUnitId: sdk_conf.bannerAdUnitId,
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
     * //.参考文档：https://developers.weixin.qq.com/minigame/dev/document/ad/wx.createRewardedVideoAd.html
     *  var videoAd = sdk.createRewardedVideoAd();
     *  videoAd.load().then(() => videoAd.show());
     * 
     */
    sdk.prototype.createRewardedVideoAd = function() {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if(this.VideoAd){
                return this.VideoAd;
            }else{
                this.VideoAd = wx.createRewardedVideoAd({ adUnitId: sdk_conf.videoAdUnitId })
                this.VideoAd.onLoad(function(res){
                    console.log("VideoAd广告加载事件：", res)
                });
                this.VideoAd.onError(function(res){
                    console.log("VideoAd广告错误事件：", res)
                });
                return this.VideoAd;
            }
        }
    }
    /**
     * @apiGroup C
     * @apiName screenshot
     * @api {微信小游戏截图保存} 微信小游戏截图保存 screenshot（游戏截图）
     * 
     * @apiSuccessExample {json} 示例:
     *   //.摄像机组件、回调
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
            game_id: sdk_conf.game,
            uid: this.getUser().uid,
            result: obj.result,  //.0负 1平 2胜
            opponent_uid: obj.opponent_uid //.对手uid
        }
        this.Post(this.iphttps + this.GameReport, reqData, callback)
    }
    /**
     * @apiGroup D
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
            game_id: sdk_conf.game,
            src_uid: this.getUser().uid,
            tar_uid: obj.tar_uid,
        }
        this.Post(this.iphttps + this.Like, reqData, callback)
    }
    /**
     * @apiGroup D
     * @apiName backHome
     * @api {子游戏：返回游戏大厅} 子游戏：返回游戏大厅 backHome（返回大厅）
     * 
     * @apiSuccessExample {json} 示例:
     *   //.子游戏：返回游戏大厅
     *   sdk.backHome();
     */
    sdk.prototype.backHome = function() {
        var d = {
            "id": "c2s_leave_room",
        };
        this.ws.send(JSON.stringify(d)); 
        cc.director.loadScene("aa_home")
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
     *   // var gameData = {
     *   //     user : {                //当前用户信息
     *   //         "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/E31dTdkFnKSFOmmy98kLqJlmDQFjLoRt52KTxohsKFtib2otLWZFOCzyuPXia8A7YR32th1FibqncWra94aAJQicYw/132",
     *   //         "uid": "wx_oFOQ65H3BiZHc3_PpUZN52lhFcHA",
     *   //         "city": "广州",
     *   //         "country": "中国",
     *   //         "province": "广东",
     *   //         "gender": 1,
     *   //         "language": "zh_CN",
     *   //         "nickName": "千寻િ😨雨天"
     *   //     }, 
     *   //     room_id: null,          //房间id
     *   //     create_time: null,      //创建时间
     *   //     room_owner: null,       //房主uid
     *   //     game_id: "ab",          //游戏唯一标识
     *   //     player_count: 2,        //房间人数上限
     *   //     all_player_data: [      //对战数据
     *   //         {
     *   //             player_data:{
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
     *   //             uid:"wx_oFOQ65H3BiZHc3_PpUZN52lhFcHA"
     *   //         },
     *   //         {
     *   //             player_data:{
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
     *   //             uid: "wx_oFOQ65PBvyfjW-tbPQLM_Z0Qg2kI"
     *   //         },
     *   //     ]
     *   // }
     */
    sdk.prototype.getGameData = function() {
        var gameData = cc.sys.localStorage.getItem("gameData");
        if(gameData){
            var room = JSON.parse(gameData);
            room.user = this.getUser();
            return room;
        }else{
            if(sdk_conf.debugData){
                return sdk_conf.debugData;
            }else{
                console.log("==getGameData=数据不存在")
                return null;
            }
        }
    }




    window.sdk = sdk;
})(window, require("md5"));