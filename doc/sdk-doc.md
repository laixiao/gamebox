# 盒子sdk集成文档
---------------
                
### **一、下载并集成sdk**

**sdk下载地址：**

| 游戏名  |  唯一标识 |  下载地址  |
| ------------ | ------------ |------------ |
|  主盒子 |  aa |   https://laixiao.github.io/gamebox/sdk/aa_sdk.zip |
|  飞刀   |  ab |  https://laixiao.github.io/gamebox/sdk/ab_sdk.zip   |


（下载完成解压后，复制整个文件夹到项目中即可。）

**sdk在线文档：**
[https://laixiao.github.io/gamebox/api/index.html](https://laixiao.github.io/gamebox/api/index.html "sdk在线文档")
    

### **二、配置sdk并初始化**

配置sdk_conf.js文件：
```javascript
    var sdk_conf = {
        game: 'abc',            //盒子方提供：游戏唯一标识
        version: '1.0.0',       //盒子方提供：当前游戏版本
        bannerAdUnitId: '',     //盒子方提供：banner广告单元id
        videoAdUnitId: '',      //盒子方提供：video广告单元id
    };
```
在游戏启动页初始化sdk：
```javascript
    //.初始化游戏
    xx_sdk.init({ debug: true }, function(res){
        console.log('sdk初始化结果：', res)
    })
```

### **三、使用sdk：**

例子：
```javascript
var d1 = xx_sdk.getConfig1();
if(d1.hz){
    //.显示分享按钮
}else{
    //.隐藏分享按钮
}
```
参数说明：
```javascript
{
    "hz": 0,//分享加10步
    "hz2": 0,//跳游戏
    "hz3": 0,//跳盒子
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

---------

```javascript
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
数据存储：
    //存
    xx_sdk.setItem("nick","hello")
    //取
    var nick = xx_sdk.getItem("nick")
```
    
-----

## 其它接口

**一、对接分享接口**
    
sdk初始化成功后，监听右上角分享按钮：
```javascript
xx_sdk.onShareAppMessage({type: 0, query: "xxx=xxx" });
```
主动拉起分享：
```javascript
xx_sdk.shareAppMessage({type: 1, query: "xxx=xxx" });
```
	
**二、对接广告接口**

* Banner广告
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

* Video广告
```javascript
    //.创建广告
    var videoAd = xx_sdk.createRewardedVideoAd();
    //.显示广告
    videoAd.load().then(() => videoAd.show());
```

--------

# 对战接口

- 1.开始游戏：盒子匹配对手玩家成功，携带房间数据进入子游戏。
```javascript
    //盒子匹配成功的房间数据，请使用该数据进行对战（数据存储key名：xx_room）
    var room = cc.sys.localStorage.getItem("ab_room");

    //room的数据格式如下（可以使用下面的数据进行开发测试）：
    /* 
    var room = {
        room_id: null,          //房间id
        create_time: null,      //创建时间
        room_owner: null,       //房主uid
        game_id: "ab",          //游戏唯一标识
        player_count: 2,        //房间人数上限
        user : {                //当前用户信息
            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/E31dTdkFnKSFOmmy98kLqJlmDQFjLoRt52KTxohsKFtib2otLWZFOCzyuPXia8A7YR32th1FibqncWra94aAJQicYw/132",
            "uid": "wx_oFOQ65H3BiZHc3_PpUZN52lhFcHA",
            "city": "广州",
            "country": "中国",
            "province": "广东",
            "gender": 1,
            "language": "zh_CN",
            "nickName": "千寻િ😨雨天"
        },    
        all_player_data: [      //对战数据
            {
                player_data:{
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

- 2.游戏结束：上报对战结果，返回主场景（aa_home）。
```javascript
    //.上报对战结果
    

    //.返回盒子主场景页面
    cc.director.loadScene("aa_home")
```