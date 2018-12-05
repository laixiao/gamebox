# 盒子sdk集成文档


- **使用说明：** 为了防止数据冲突以及更好地集成游戏，开发者必须集成并使用盒子SDK。

- **api文档：** [https://laixiao.github.io/gamebox/api/index.html](https://laixiao.github.io/gamebox/api/index.html "sdk在线文档")

- **使用范围（强制）：** 开放数据、开放数据域、数据存储、cc.game事件

-----
                
### **一、下载并集成sdk**

**SDK下载：** [https://github.com/laixiao/gamebox/tree/master/sdk](https://github.com/laixiao/gamebox/tree/master/sdk "sdk下载地址")

（下载sdk文件夹，复制到项目中即可）



### **二、配置sdk并初始化：**

1.配置sdk_conf.js文件：
```javascript
var sdk_conf = { 
    debug: false,   //默认关闭调试
    game: 'aa',   //.游戏唯一标识
    version: '1.0.0',  //.当前游戏版本          
    bannerAdUnitId: 'adunit-d6b9bab967f2f8b7',  //.banner广告单元id
    videoAdUnitId: 'adunit-3fa34dc8aada52e3',      //.video广告单元id   
};
```


2.初始化sdk（游戏启动时）：
```javascript

if(!window.xx_sdk){
    window.xx_sdk = new sdk({ sdk_conf: require("xx_sdk_conf") });
}

//1.初始化sdk成功后才能使用sdk
xx_sdk.init(function(res){
    if(res){
        console.log('sdk初始化成功')

        //=====对接分享接口======
        //2.监听右上角分享按钮
        xx_sdk.onShareAppMessage({type: 0, query: "" });
        //3.主动拉起分享
        //xx_sdk.shareAppMessage({type: 1, query: "xxx=xxx" });
        
    }
})
```

3.获取用户信息
```javascript
//盒子内的子游戏无需登录，可直接获取用户数据
var user = xx_sdk.getUser();

/*
{                
    avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/E31dTdkFnKSFOmmy98kLqJlmDQFjLoRt52KTxohsKFtib2otLWZFOCzyuPXia8A7YR32th1FibqncWra94aAJQicYw/132",
    uid: "测试用户uid",
    openid: "测试用户openid",
    city: "广州",
    country: "中国",
    province: "广东",
    gender: 1,
    language: "zh_CN",
    nickName: "千寻િ😨雨天"
}
*/
```

### **三、使用sdk：**

> 请使用以下api进行数据存储、开放数据、开放数据域、cc.game事件等操作（强制）。

```javascript
数据存储：
    //存
    xx_sdk.setItem("nick","hello")
    //取
    var nick = xx_sdk.getItem("nick")

微信开放数据：
    //存
    var DataList = new Array();
    DataList.push({key:"score",value:"520"});
    xx_sdk.setUserCloudStorage({
        kvDataList: DataList,
        success: function(res){
            console.log(res)
        },
        fail: function(res){
            console.log(res)
        }
    })
    //取
    xx_sdk.getUserCloudStorage({
        keyList: ["score"],
        success: function(res){
            console.log(res)
        },
        fail: function(res){
            console.log(res)
        }
    }

微信开放数据域：
    //发送
    xx_sdk.postMessage("hello")
    //监听
    xx_sdk.onMessage((d)=>{
        console.log(d)
    })

cc.game 事件：
    //注册监听
    xx_sdk.on("xxx", (e)=>{
        console.log("xxx")
    }, this);
    //关闭监听
    xx_sdk.off("xxx");
    //发射事件
    xx_sdk.emit("xxx");
    xx_sdk.emit("xxx", {nick:"xxx"});
```
    
-----

> 游戏配置接口（没有需求则无需对接）

```javascript
// 对接游戏配置，可以动态控制游戏内的一些参数和数据。

var d1 = xx_sdk.getConfig1();
if(d1.showshare){
    //.显示分享按钮
}else{
    //.隐藏分享按钮
}

//游戏配置参数说明：
var d1 = {
    "online": 0,//是否上线
    "showshare": 0,//是否显示分享按钮
    "bannerAd": 0,//banner广告
    "videoAd": 0,//视频广告开关
    "fs": 0,//看广告加10步
    "sns": 0,//社交按钮
    "kf": 0,//客服按钮
    "gzh": 0,//公众号按钮
    "hz2_d": {//跳游戏对应的参数
        "appId": "wxde2c29b8d9349652",
        "imageUrl": "https:\/\/res.g.llewan.com\/common\/256\/qieshuiguoicon.png",
        "path": "pages\/index\/index?channel=21&goAppid=wxf45b17ebcaef8085&goPath=QUESTIONsidEQUAL49",
        "extraData": "",
        "envVersion": "release"
    },//跳盒子对应的参数
    "hz3_d": {
        "appId": "wxde2c29b8d9349652",
        "imageUrl": "https:\/\/res.g.llewan.com\/common\/youxihezi.png",
        "path": "pages\/index\/index?channel=21",
        "extraData": "",
        "envVersion": "release"
    }
}
```

------

> 广告接口（没有需求则无需对接）

**1.Banner广告**
```javascript
//var bannerAd = xx_sdk.createBannerAd({
//    style:{
//        left: 0,
//        top: 0,
//        width: 100,
//        height: 200
//    }
//});

//.极简版（默认底部Banner）
var bannerAd = xx_sdk.createBannerAd({});
bannerAd.show()
```

**2.Video广告**
```javascript
//.创建广告
var videoAd = xx_sdk.createRewardedVideoAd();
//.显示广告
videoAd.load().then(() => videoAd.show());
```

--------

### **四、对战接口：**

**1.开始游戏：游戏大厅匹配对手玩家成功，携带对战数据进入子游戏。**

```javascript
//.子游戏获取该数据
var gameData = xx_sdk.getGameData();

//gameData的数据格式如下（可以使用下面的数据进行开发测试）：
/* 
var gameData = {
    user : {                //当前用户信息
        avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/E31dTdkFnKSFOmmy98kLqJlmDQFjLoRt52KTxohsKFtib2otLWZFOCzyuPXia8A7YR32th1FibqncWra94aAJQicYw/132",
        uid: "测试用户1",
        openid: "测试用户1",
        city: "广州",
        country: "中国",
        province: "广东",
        gender: 1,
        language: "zh_CN",
        nickName: "千寻િ😨雨天"
    },  
    ai: 1,              //是否有ai机器人
    room_id: "room_001",          //房间id
    create_time: new Date().getTime()/1000,      //创建时间
    room_owner: "测试用户2",       //房主uid
    game_id: "ae",          //游戏唯一标识
    player_count: 2,        //房间人数上限
    all_player_data: [      //对战数据
        {
            player_data:{
                openid: "测试用户1",
                avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/E31dTdkFnKSFOmmy98kLqJlmDQFjLoRt52KTxohsKFtib2otLWZFOCzyuPXia8A7YR32th1FibqncWra94aAJQicYw/132",
                city:"广州",
                country:"中国",
                gender:1,
                language:"zh_CN",
                nickName:"千寻િ😨雨天",
                province:"广东"
            },
            position:2,     //玩家所在房间的位置
            state:0,        //玩家状态  0：未准备   1：已准备
            uid:"测试用户1",
            ai: 1,              //是否ai机器人
        },
        {
            player_data:{
                openid: "测试用户2",
                avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/oNyD409Hg3gHqJtqtKFhhYDiad6pRFiaprwjEheyLra4CEicGPdnn7uBCJL0oxZjqAibW4wrTsbtfnHoY6NolPpz9A/132",
                city: "河池",
                country: "中国",
                gender: 2,
                language: "zh_CN",
                nickName: "象牙塔จุ๊บ",
                province: "广东"
            },
            position:2,     //玩家所在房间的位置
            state:0,        //玩家状态  0：未准备   1：已准备
            uid: "测试用户2",
            ai: 1,              //是否ai机器人
        },
    ]
}
    */
```

**2.游戏进行中：**

```javascript
//1.表情互动
    //1.1监听收到表情包事件
    xx_sdk.onEmoji((emoji)=>{
        console.log("=收到一个表情=", emoji)
        console.log("=该表情的发送者=", emoji.sender)
        /*
        emoji.sender格式：
        {
            "uid": "wx_oGUmH5Ic0ls6xa52epYcL7n77U3U", 
            "openid": "oGUmH5Ic0ls6xa52epYcL7n77U3U", 
            "nickName": "千寻િ😨雨天", 
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/ib3FwHCA5Nc3N0MpRdb6D5aibGTchEiad27KgRal9BPibfNHo0NZmagJVziaGmn96icC8cqJIrUW3B1vHlG9icibbK5tgA/132", 
            "gender": 1, 
            "country": "中国", 
            "city": "广州", 
            "province": "广东", 
            "sig": ""
        }
        */
    })
    //1.2获取表情包列表（自行根据产品需求展示，大小根据UI风格自由调整，规格为正方形）
    xx_sdk.getEmoji((d)=>{
        console.log("表情包列表", d)
        // [
        //     {
        //         "id":1,
        //         "type":1,       //表情类型
        //         "url":"https://qxgame-1257972171.cos.ap-guangzhou.myqcloud.com/gameadmin/emoji/1.png",
        //         "weight":10,    //表情权重
        //         "txt ":"太菜了" //表情中文描述
        //     },
        // ]
        
        //1.3发送表情包
        xx_sdk.sendEmoji(d[0])
    }); 


//2.语音互动
    //2.1语音极简版：为按钮注册录音事件。
    //（sdk会自动为按钮注册按下，松开，取消事件，然后自动上传该语音并在房间内广播）
    xx_sdk.onRecorder(this.soundButton);

    //2.2语音开关设置
    //屏蔽语音: 如果不想听其它人说话，可以屏蔽语音
    xx_sdk.setSoundStatus(0);
    //开启语音
    xx_sdk.setSoundStatus(1);
    //获取语音开关状态：0 或 1
    var status = xx_sdk.getSoundStatus();
    
//3.背景音乐开关
    let switch = xx_sdk.getBbmSwitch();//0：关 1：开


```

**3.游戏结束：认输页面、游戏结束页面**

```javascript
//1.弹出认输返回界面（返回按钮）：
    xx_sdk.giveUp(function(res){
        if(res == 1){
            //确认
        }else{
            //取消
        }
    })

//2.弹出游戏结果页面（游戏结束）
    var obj = [
        {
            uid: "wx_robot_2",      //用户id
            score: 2                //比分
        },
        {
            uid: "wx_robot2_",      //用户id
            score: 1                //比分
        },
    ]
    ab_sdk.showResult({result: obj});
    


```