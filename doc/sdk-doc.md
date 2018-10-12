
#sdk接入流程


## 盒子方

* 产品运营同学：提供开发权限、小游戏appid、项目唯一标识。

* 后端同学：配置好后端开发环境，包括用户系统、统计系统、分享系统等。

------------

## 接入方
                
+ **一、下载并集成sdk**

    **sdk下载地址：**
    https://laixiao.github.io/gamebox/sdk/Sdk.zip

    （下载完成，解压后复制整个文件夹到项目中即可。）

    **sdk在线文档：**
    https://laixiao.github.io/gamebox/sdk/sdkdoc/index.html

+ **二、配置sdk并初始化**

    配置sdk_conf.js文件：
    ```javascript
        var sdk_conf = {
            game: 'abc',            //盒子方提供：游戏唯一标识
            version: '1.0.0',       //盒子方提供：当前游戏版本
            bannerAdUnitId: '',     //盒子方提供：banner广告单元id
            videoAdUnitId: '',      //盒子方提供：video广告单元id
        };
    ```
    游戏启动页初始化sdk：
    ```javascript
        //.初始化游戏
        sdk.init({ debug: true }).then((res)=>{
            console.log('sdk初始化结果：', res)
        })
    ```

+ **三、使用sdk：**

    例子：
    ```javascript
    var d1 = sdk.getConfig1();
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

    --------

    ```javascript
    微信开放数据：
        //存
        var DataList = new Array();
        DataList.push({key:"score",value:"520"});
        sdk.setUserCloudStorage({
            kvDataList: DataList,
            success: function(res){
                console.log(res)
            },
            fail: function(res){
                console.log(res)
            }
        })
        //取
        sdk.getUserCloudStorage({
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
        sdk.postMessage("hello")
        //监听
        sdk.onMessage((d)=>{
            console.log(d)
        })
    数据存储：
        //存
        sdk.setItem("nick","hello")
        //取
        var nick = sdk.getItem("nick")
    ```
    
-----

## 其它接口
+ **一、对接分享接口**
    
    sdk初始化成功后，监听右上角分享按钮：
    ```javascript
    sdk.onShareAppMessage({type: 0, query: "xxx=xxx" });
    ```
    主动拉起分享：
    ```javascript
    sdk.shareAppMessage({type: 1, query: "xxx=xxx" });
    ```
	
+ **二、对接广告接口**

    * Banner广告
	```javascript
		//var bannerAd = sdk.createBannerAd({
        //    style:{
       //        left: 0,
       //        top: 0,
       //        width: 100,
       //        height: 200
       //    }
       //});
      
       //.极简版（默认底部Banner）
       var bannerAd = sdk.createBannerAd({});
       bannerAd.show()
    ```

	* Video广告
	```javascript
        //.创建广告
        var videoAd = sdk.createRewardedVideoAd();
        //.显示广告
        videoAd.load().then(() => videoAd.show());
	```
