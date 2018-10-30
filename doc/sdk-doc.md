# 盒子sdk集成文档


- **使用说明：** 为了防止数据冲突以及更好地集成游戏，开发者必须集成并使用盒子SDK。

- **使用方法：** [https://laixiao.github.io/gamebox/api/index.html](https://laixiao.github.io/gamebox/api/index.html "sdk在线文档")

- **强制使用范围：** 开放数据、开放数据域、数据存储

-----
                
### **一、下载并集成sdk**

**sdk下载地址：**

| 游戏名  |  唯一标识 |  下载地址  |
| ------------ | ------------ |------------ |
|  主盒子 |  aa |   https://laixiao.github.io/gamebox/sdk/aa_sdk.zip |
|  飞刀   |  ab |  https://laixiao.github.io/gamebox/sdk/ab_sdk.zip   |
|  合并战斗   |  ac |  https://laixiao.github.io/gamebox/sdk/ac_sdk.zip   |

（下载完成解压后，复制整个文件夹到项目中即可。）

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

2.获取用户信息
```javascript
//盒子内的子游戏无需登录，可直接获取用户数据
var user = sdk.getUser();

/*
{                
    avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/E31dTdkFnKSFOmmy98kLqJlmDQFjLoRt52KTxohsKFtib2otLWZFOCzyuPXia8A7YR32th1FibqncWra94aAJQicYw/132",
    uid: "wx_oFOQ65H3BiZHc3_PpUZN52lhFcHA",
    openid: "wx_oFOQ65H3BiZHc3_PpUZN52lhFcHA",
    city: "广州",
    country: "中国",
    province: "广东",
    gender: 1,
    language: "zh_CN",
    nickName: "千寻િ😨雨天"
}
*/
```

3.初始化sdk（游戏启动页时）：
```javascript
//1.初始化sdk成功后才能使用sdk
xx_sdk.init({ debug: true }, function(res){
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

### **三、使用sdk：**

> 请使用以下api进行数据存储、开放数据、开放数据域等操作（强制）。

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
var gameData = sdk.getGameData();

//room的数据格式如下（可以使用下面的数据进行开发测试）：
/* 
var gameData = {
    user : {                //当前用户信息
        avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/E31dTdkFnKSFOmmy98kLqJlmDQFjLoRt52KTxohsKFtib2otLWZFOCzyuPXia8A7YR32th1FibqncWra94aAJQicYw/132",
        uid: "wx_oFOQ65H3BiZHc3_PpUZN52lhFcHA",
        openid: "wx_oFOQ65H3BiZHc3_PpUZN52lhFcHA",
        city: "广州",
        country: "中国",
        province: "广东",
        gender: 1,
        language: "zh_CN",
        nickName: "千寻િ😨雨天"
    },  
    ai: false,              //是否ai机器人 
    room_id: null,          //房间id
    create_time: null,      //创建时间
    room_owner: null,       //房主uid
    game_id: "ab",          //游戏唯一标识
    player_count: 2,        //房间人数上限
    all_player_data: [      //对战数据
        {
            player_data:{
                openid: "wx_oFOQ65H3BiZHc3_PpUZN52lhFcHA",
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
            uid:"wx_oFOQ65H3BiZHc3_PpUZN52lhFcHA"
        },
        {
            player_data:{
                openid: "wx_oFOQ65PBvyfjW-tbPQLM_Z0Qg2kI",
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
            uid: "wx_oFOQ65PBvyfjW-tbPQLM_Z0Qg2kI"
        },
    ]
}
    */
```

**2.游戏进行中：**

```javascript
//.获取表情包

//.上传语音文件
    
```

**3.游戏结束：上报对战结果、送花、返回游戏大厅。**

```javascript
//.上报战果
sdk.uploadResult({ result: 2, opponent_uid: "xxx" }, function(d){
    console.log(d)
});

//.点赞、送花
sdk.favour({ tar_uid: 2 }, function(d){
    console.log(d)
});

//.子游戏：返回游戏大厅
sdk.backHome();
```