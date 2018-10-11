/**
1.安装apidoc，参考链接：
	http://apidocjs.com
2.按照格式弄好后，执行命令
    apidoc -i ./sdk/assets/Sdk -o sdkdoc/
    
    在小程序后台添加合法域名：
        https://game.llewan.com:1899
        https://login.llewan.com:1799
        https://log.llewan.com:1999
        https://res.llewan.com:2099

        https://glog.aldwx.com
 */

var md5 = require("md5");
var mta = require("mta");
var sdk_conf = require("sdk_conf");
var aldgame = require("ald-game");
var sdk = { 
    md5: md5,
    mta: mta,
    ip1: "https://login.llewan.com:1799",
    ip2: "https://game.llewan.com:1899",
    ip3: "https://log.llewan.com:1999",
    ip4: "https://res.llewan.com:2099",
    loginBg: "https://res.g.llewan.com/uploadfile/common/20180831/20180831173032_3279.png",
    loginBt: "https://res.g.llewan.com/uploadfile/common/20180831/20180831180006_1583.png",

    debug: false,//是否开启调试

    login: '/Login/common',
    Config: '/Config/common',
    ConfigData: { 
        "config1": {},
        "config2": {},
    },
    Share: "/Share/common",
    ShareList: [],
    Logcommon: "/Log/common",

    BannerAd: null,
    VideoAd: null,
    /**
     * @apiGroup A
     * @apiName init
     * @api {初始化sdk} 使用sdk前，必须在启动页初始化一次才能使用 init（初始化sdk）
     *
     * @apiParam {Boolean} [debug=false] 是否开启调试
     * 
     * @apiSuccessExample {json} 示例:
     *  //.初始化游戏
     *   sdk.init({ debug: true }).then((res)=>{
     *       console.log('sdk初始化结果：', res)
     *   })
     */
    init(args, callback){
        var self = this;
        if(args.debug){
            this.debug = args.debug;
        }
        
        this.checkUpdate();

        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            //1.初始化后台配置信息
            this.Get(this.ip2 + this.Config, {}, function (d) {
                if (d && d.c == 1) {
                    self.ConfigData = d.d;

                    //2.初始化分享信息
                    self.Get(self.ip2 + self.Share, {}, function (d2) {
                        // console.log("初始化分享信息：",d2)
                        if (d2 && d2.c == 1) {
                            self.ShareList = d2.d;
                        }else{
                            console.log("初始化分享信息失败：",d2)
                        }
                        return new Promise((resolve, reject) => {
                            resolve(true)
                        })
                    });
                }else{
                    if(self.debug){
                        console.log("后台配置信息初始化失败，再次初始化：",d)
                    }
                    self.init(args, callback);
                }
            });
            
            var userid = 0;
            if(this.getUser()){
                userid = this.getUser().uid;
            }
            if(userid){
                //2.统计：分享信息 测试：  uid=56032607&share_id=22&share_uid=56032607
                var option = wx.getLaunchOptionsSync();
                // console.log("==option==", option)
                if(option.query.share_id && option.query.uid){
                    option.query.share_uid = option.query.uid;
                    option.query.uid = userid;
                    // console.log('==3统计信息==',option)
                    this.Post(this.ip3 + this.Logcommon, { log_type: "ShareEnter", data: JSON.stringify(option) }, function (d) {
                        // console.log("==3统计信息结果==", d)
                    });
                }
                wx.onShow((option)=>{
                    // console.log(option)
                    if(option.query.uid){
                        option.query.share_uid = option.query.uid;
                        option.query.uid = userid;
                        console.log('==4统计信息==',option)
                        self.Post(self.ip3 + self.Logcommon, { log_type: "ShareEnter", data: JSON.stringify(option) }, function (d) {
                            // console.log("==4统计信息结果==", d)
                        });
                    }
                })

                //5.统计：每次打开小游戏调用
                wx.getSystemInfo({
                    success(res){
                        var loginData = res;
                        loginData.uid = userid;
                        loginData.share_uid = option.query.share_uid;
                        loginData.scene = option.scene;
                        wx.getNetworkType({
                            success(res2){
                                loginData.network_type = res2.networkType;
                                // console.log("======loginData=======", loginData)
                                self.Get(self.ip3 + self.Logcommon, { log_type: "LoginData", data: JSON.stringify(loginData) }, function (d) {
                                    // console.log("==5.统计：每次打开小游戏调用==", d)
                                });
                            }
                        })
                    }
                })
            }

        }else{
            return new Promise((resolve, reject) => {
                resolve(false)
            })
        }

        
    },
    //.根据权重随机获取指定type类型的分享信息。（没有this.ShareList数据不能调用）
    getShareByWeight(type){
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
    },
    /**
     * @apiGroup C
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
    onShareAppMessage(obj){
        var self = this;
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            //.微信右上角分享
            wx.showShareMenu({withShareTicket:true})
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
                    shareInfo.query += obj.query + "&share_id="+shareInfo.sysid + "&uid="+userid;
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
                self.Get(self.ip3 + self.Logcommon, { log_type: "ShareClick", data: JSON.stringify(option) }, function (d) {
                    // console.log("==1统计信息结果==", d)
                });

                return shareInfo;
            })
        }
    },
    /**
     * @apiGroup C
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
    shareAppMessage(obj){
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
            shareInfo.query += obj.query + "&share_id="+shareInfo.sysid + "&uid="+userid;
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
        console.log("====111======", shareInfo);
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.shareAppMessage(shareInfo);

            //.分享统计 测试： uid=11&share_id=22
            var option = {'uid': userid, 'share_id': shareInfo.sysid };
            // console.log('==2统计信息==', { log_type: "ShareClick", data: option })
            self.Get(self.ip3 + self.Logcommon, { log_type: "ShareClick", data: JSON.stringify(option) }, function (d) {
                // console.log("==2统计信息结果==", d)
            });
        }
    },


    /**
     * @apiIgnore
     * @apiGroup B
     * @apiName initmta
     * @api {初始化腾讯统计sdk} 参考链接http://mta.qq.com/wechat_mini/manage/ctr_sdk_help?app_id=500625714 initmta（腾讯统计）
     * @apiParam {Object} args 参数
     * 
     * @apiSuccessExample {json} 示例:
     * //.简单
     * mta.App.init({
     *     "appID":"500618042",
     *     "eventID":"500618044"
     * });
     * //.高级
     * mta.App.init({
     *     "appID":"500618042",
     *     "eventID":"500618044", // 高级功能-自定义事件统计ID，配置开通后在初始化处填写
     *     "lauchOpts":options, //渠道分析,需在onLaunch方法传入options,如onLaunch:function(options){...}
     *     "statPullDownFresh":true, // 使用分析-下拉刷新次数/人数，必须先开通自定义事件，并配置了合法的eventID
     *     "statShareApp":true, // 使用分析-分享次数/人数，必须先开通自定义事件，并配置了合法的eventID
     *     "statReachBottom":true // 使用分析-页面触底次数/人数，必须先开通自定义事件，并配置了合法的eventID
     * });
     */
    initmta(args){
        mta.App.init(args);
        // 功能组件
        // App id: 500625714
        // App Secret key: 9b0fd6393ca10f5eebe0d1c659a460ab
    },
    /**
     * @apiIgnore
     * @apiGroup B
     * @apiName setmta
     * @api {腾讯统计埋点} 统计埋点 setmta
     * @apiParam {String} name 腾讯后台查询
     * @apiParam {String} value 腾讯后台查询
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.setmta("click","p003")
     */
    setmta(name, value){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            mta.Event.stat(name, { value: 'true' })
        }
    },
    /**
     * @apiGroup B
     * @apiName setAld
     * @api {阿拉丁埋点} 统计埋点(使用前请到阿拉丁注册游戏，并配置sdk/ald-game-conf.js) setAld（阿拉丁埋点）
     * @apiParam {String} type 描述用户的动作名称，不超过255个字符,不支持数字,英文,中文,"-"、"_"、"+",以外的字符格式
     * @apiParam {String} key 动作的参数，不超过255个字符，不支持数字，英文，中文，"-"、"_"、"+"，以外的字符格式
     * @apiParam {String} value 动作的参数值，不超过255个字符，不支持数字，英文，中文，“-“、”_”、"+"，以外的字符格式
     * 
     * @apiSuccessExample {json} 示例:
     * //使用前，在开发者设置中添加 request合法域名https://glog.aldwx.com
     * //统计类型（点击）， 统计位置（开始游戏按钮），  统计参数（点了1次）
     * sdk.setAld("click", "playButton", "1")
     */
    setAld(type, key, value){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            // wx.aldSendEvent('事件名称',{'参数key' : '参数value'})、
            wx.aldSendEvent(v1,  { v2 : v3 })
        }
    },

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
    Get(url, reqData, callback) {
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
    },
    /**
     * @apiGroup C
     * @apiName Post
     * @api {Post} 发起网络请求 Post（发起Post请求）
     * 
     * @apiParam {String} url 请求地址
     * @apiParam {Object} reqData 请求参数
     * @apiParam {Object} callback 不存在返回null
     * @apiSuccessExample {json} 示例:
     * sdk.Post(sdk.ip + sdk.common, { user_id: user_id }, function (d) {
     *     console.log(d)
     * });
     */
    Post: function (url, reqData, callback) {
        var self = this;
        
        reqData.game = sdk_conf.game;
        reqData.version = sdk_conf.version;
        var ts = new Date().getTime();
        reqData.ts = ts;
        reqData.sign = md5(ts.toString().substr(9,4)+sdk_conf.game.substr(0,2)+sdk_conf.version.substr(0,1)+ '$5dfjr$%dsadsfdsii');
        
        //1.拼接请求参数
        var param = "";
        for (var item in reqData) {
            param += item + "=" + reqData[item] + "&";
        }
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
        xhr.send(param);//reqData为字符串形式： "key=value"
    },
    /**
     * @apiGroup C
     * @apiName checkUpdate
     * @api {检测版本更新} 微信小游戏（冷启动的时候会检查，如果有更新则会重启小游戏进行更新） checkUpdate（版本更新）
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.checkUpdate();
     */
    checkUpdate() {
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
    },
    /**
     * @apiGroup C
     * @apiName getConfig1
     * @api {运营配置} 游戏后台配置信息，运营人员使用的通用配置开关 getConfig1（运营配置）
     * @apiParam {Object} return 不存在返回null
     * 
     * @apiSuccessExample {json} 示例:
     * var d = sdk.getConfig1();
     */
    getConfig1(){
        return JSON.parse(this.ConfigData.config1);
    },
    /**
     * @apiGroup C
     * @apiName getConfig2
     * @api {程序配置} 游戏后台配置信息，程序员使用的游戏数据开关，可随便自定义数据：例如复活次数等 getConfig2（程序配置）
     * @apiParam {Object} return 不存在返回null
     * 
     * @apiSuccessExample {json} 示例:
     * var d = sdk.getConfig2();
     */
    getConfig2(){
        return JSON.parse(this.ConfigData.config2);
    },

    
    /**
     * @apiGroup C
     * @apiName createImage
     * @api {显示网络图片} 微信小游戏加载图片 createImage（显示图片）
     * @apiParam {cc.Sprite} sprite 显示图片的Sprite
     * @apiParam {String} url 需要加载的图片地址
     * 
     * @apiSuccessExample {json} 示例:
     * var data = sdk.createImage(advs);
     */
    createImage(sprite, url) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            let image = wx.createImage();
            image.onload = function () {
                let texture = new cc.Texture2D();
                texture.initWithElement(image);
                texture.handleLoadedTexture();
                sprite.spriteFrame = new cc.SpriteFrame(texture);
            };
            image.src = url;
        }
        
    },
    /**
     * @apiGroup C
     * @apiName getUser
     * @api {获取本地用户信息} 获取本地用户信息（登录成功后，会在本地存储用户信息） getUser（获取用户信息）
     * 
     * @apiSuccessExample {json} 示例:
     * //.不存在返回null
     * var user = sdk.getUser();
     */
    getUser(){
        var userinfo = this.getItem('userinfo');
        if(userinfo){
            return JSON.parse(userinfo);
        }else{
            return null;
        }
    },
    /**
     * @apiGroup C
     * @apiName setItem
     * @api {set} 数据存储 setItem（存）
     * @apiParam {String} key 键
     * @apiParam {String} value 值
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.setItem("nick","hello")
     */
    setItem(key, value){
        cc.sys.localStorage.setItem(key, value);
    },
    /**
     * @apiGroup C
     * @apiName getItem
     * @api {数据存储} 数据存储 getItem（取）
     * @apiParam {String} key 键
     * @apiParam {String} value 值
     * 
     * @apiSuccessExample {json} 示例:
     * var nick = sdk.getItem("nick")
     */
    getItem(key){
        return cc.sys.localStorage.getItem(key);
    },
    /**
     * @apiGroup C
     * @apiName onMessage
     * @api {主域监听子域发送的消息} 主域监听子域发送的消息 onMessage（监听消息）
     * @apiParam {callback} callback 回调函数
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.onMessage((d)=>{
     *     console.log(d)
     * })
     */
    onMessage(callback){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.onMessage(function(d){
                // if(d.message == "common_back"){//.子域: 返回子域首页
                //     cc.director.loadScene("common_children")
                // }
                callback(d)
            });
        }
    },
    /**
     * @apiGroup C
     * @apiName postMessage
     * @api {主域向子域发送消息} 主域向子域发送消息 postMessage（发送消息）
     * @apiParam {String} msg 发送给子域的消息
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.postMessage("hello")
     */
    postMessage(msg){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.postMessage({ message: msg });
        }
    },
    /**
     * @apiGroup C
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
    setUserCloudStorage(obj){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
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
    },
    /**
     * @apiGroup C
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
    getUserCloudStorage(obj){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
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
    },
    /**
     * @apiGroup C
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
    getGroupCloudStorage(obj){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
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
    },
    /**
     * @apiGroup C
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
    getFriendCloudStorage(obj){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
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
    },
    /**
     * @apiGroup C
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
    sortList(ListData, field, order){
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
    },
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
    getMyRank3(ListData,me){
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
    },
    /**
     * @apiGroup C
     * @apiName WeChatLogin
     * @api {微信登录} 微信登录 WeChatLogin（登录）
     * 
     * @apiSuccessExample {json} 示例:
     * // 2.登录页：获取用户信息
     *   var user = sdk.getUser();
     *   if(user){
     *       console.log("用户信息：", user)
     *   }else{
     *       //.调用sdk登录
     *       sdk.WeChatLogin((d)=>{
     *           console.log("用户信息：", d)
     *           // 登录成功：返回用户信息； 
     *           // 登录失败：返回false
     *       });
     *   }
     * 
     */
    WeChatLogin(callback){
        var self = this;
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            var options = wx.getLaunchOptionsSync();
            
            var referee_id = options.query.uid;             //.推荐人id
            var source_id = options.query.source_id;        //.用户来源id
            var source_id2 = options.query.source_id2;      //.用户来源子id
            var share_id = options.query.share_id;          //.分享素材ID
            
            var userinfo = this.getUser();

            if(userinfo){
                callback(userinfo)
            }else{
                //.登录遮罩背景
                var maskNode = new cc.Node('Sprite');
                maskNode.parent = cc.director.getScene().getChildByName('Canvas');
                maskNode.addComponent(cc.BlockInputEvents)
                var sp = maskNode.addComponent(cc.Sprite);
                maskNode.opacity = 178;
                maskNode.color = new cc.Color(25,88,95,255);
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
                            var width = 507/2;
                            var height = 464/2;
                            self.button = wx.createUserInfoButton({
                                type: 'image',
                                image: self.loginBt,
                                style: {  width: width, height: height, left: res.screenWidth/2-width/2, top: res.screenHeight/2-height/2 }
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

                                                        referee_id: referee_id,
                                                        source_id: source_id,
                                                        source_id2: source_id2,
                                                        share_id: share_id
                                                    }
                                                    // console.log('==登录参数==', reqData)
                                                    self.Post(self.ip1 + self.login, reqData, function(data){
                                                        // console.log('==登录结果==', data)
                                                        if(data.c == 1){
                                                            self.setItem('userinfo', JSON.stringify(data.d));
                                                            wx.hideToast();
                                                            maskNode.destroy();
                                                            self.button.hide();
                                                            //.登录成功，重新初始化
                                                            self.init({},(d)=>{})

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
    },
    /**
     * @apiGroup C
     * @apiName createBannerAd
     * @api {微信登录} 创建banner广告组件 createBannerAd（广告）
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
    createBannerAd(obj){
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
    },
    /**
     * @apiGroup C
     * @apiName createRewardedVideoAd
     * @api {微信登录} 创建banner广告组件 createRewardedVideoAd
     * @apiParam {String} adUnitId 广告单元id	
     * 
     * @apiSuccessExample {json} 示例:
     * //.参考文档：https://developers.weixin.qq.com/minigame/dev/document/ad/wx.createRewardedVideoAd.html
     *  var videoAd = sdk.createRewardedVideoAd();
     *  videoAd.load().then(() => videoAd.show());
     * 
     */
    createRewardedVideoAd(){
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
    },
     /**
     * @apiGroup C
     * @apiName Screenshot
     * @api {微信小游戏截图保存} 微信小游戏截图保存 Screenshot（截图）
     * 
     * @apiSuccessExample {json} 示例:
     *   //.摄像机组件、回调
     *   sdk.Screenshot((d)=>{
     *       if(d){
     *           console.log("图片保存成功：", d)
     *       }else{
     *           console.log("图片保存失败：", d)
     *       }
     *   })
     * 
     */
    Screenshot(callback){
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
                            self.Screenshot(callback);
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
                                                self.Screenshot(callback);
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
    },
    capture (callback) {
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
    

};
// module.exports = sdk;
window.sdk = sdk;

