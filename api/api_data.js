define({ "api": [
  {
    "group": "A",
    "name": "getServerTime",
    "type": "获取服务器时间",
    "url": "获取服务器时间",
    "title": "getServerTime-服务器时间",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "callback",
            "optional": false,
            "field": "callback",
            "description": "<p>回调</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//.初始化游戏\nxx_sdk.getServerTime(function(time){\n    //时间戳 毫秒\n    console.log(time)\n})",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "A"
  },
  {
    "group": "A",
    "name": "init",
    "type": "初始化sdk",
    "url": "使用sdk前，必须在启动页初始化一次才能使用",
    "title": "init（初始化sdk）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "callback",
            "optional": false,
            "field": "callback",
            "description": "<p>结果回调</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "if(!window.xx_sdk){\n    window.xx_sdk = new sdk({ sdk_conf: require(\"xx_sdk_conf\") });\n}\n//.初始化游戏\nxx_sdk.init(function(res){\n     if(res){\n         console.log('sdk初始化成功')\n\n         //=====对接分享接口======\n         //2.监听右上角分享按钮\n         xx_sdk.onShareAppMessage({type: 0, query: \"\" });\n         //3.主动拉起分享\n         //xx_sdk.shareAppMessage({type: 1, query: \"xxx=xxx\" });\n\n     }\n })",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "A"
  },
  {
    "group": "A",
    "name": "wechatLogin",
    "type": "微信登录",
    "url": "盒子外的独立游戏需要调用本接口进行登录",
    "title": "wechatLogin（微信登录）",
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "// 1.判断是否登录（登录页）\n  var user = sdk.getUser();\n  if(user){\n      //2.已经登录\n      console.log(\"本地用户信息：\", user)\n  }else{\n      //2.未登录：调用sdk登录\n      sdk.wechatLogin((d)=>{\n          console.log(\"用户信息：\", d)\n          // 登录成功：\n              //    {\n              //         \"uid\":\"xxx\"//登录玩家uid\n              //         \"openid\":\"x\",\n              //         \"nickName\":\"x\",\n              //         \"avatarUrl\":\"x\",\n              //         \"gender\":\"x\",\n              //         \"country\":\"x\",\n              //         \"city\":\"x\",\n              //         \"province\":\"x\"\n              //     }\n          // 登录失败：返回false\n      });\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "A"
  },
  {
    "group": "B",
    "name": "createBannerAd",
    "type": "创建banner广告组件",
    "url": "创建banner广告组件",
    "title": "createBannerAd（广告）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "adUnitId",
            "description": "<p>广告单元id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "style",
            "description": "<p>banner 广告组件的样式</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//.参考文档：https://developers.weixin.qq.com/minigame/dev/document/ad/wx.createBannerAd.html\n//var bannerAd = sdk.createBannerAd({\n//    style:{\n//        left: 0,\n//        top: 0,\n//        width: 100,\n//        height: 200\n//    }\n//});\n\n//.极简版（默认底部Banner）\nvar bannerAd = sdk.createBannerAd({});\nbannerAd.show()",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "B"
  },
  {
    "group": "B",
    "name": "createRewardedVideoAd",
    "type": "创建Video广告组件",
    "url": "创建Video广告组件",
    "title": "createRewardedVideoAd",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "adUnitId",
            "description": "<p>广告单元id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//.参考文档：https://developers.weixin.qq.com/minigame/dev/document/ad/wx.createRewardedVideoAd.html\n//.调用的时候，SDK会直接拉起广告\nxx_sdk.createRewardedVideoAd({\n     onClose: function(res){\n         //视频是否是在用户完整观看的情况下被关闭的\n         if(res.isEnded){\n            //发放奖励\n         }else{\n            //没看完广告就关了\n         }\n     }\n });",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "B"
  },
  {
    "group": "B",
    "name": "getFriendCloudStorage",
    "type": "同玩好友的托管数据",
    "url": "拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用",
    "title": "getFriendCloudStorage",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "keyList",
            "description": "<p>要获取的 key 列表</p>"
          },
          {
            "group": "Parameter",
            "type": "callback",
            "optional": false,
            "field": "success",
            "description": "<p>成功回调</p>"
          },
          {
            "group": "Parameter",
            "type": "callback",
            "optional": false,
            "field": "fail",
            "description": "<p>失败回调</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.getFriendCloudStorage({\n    keyList: [\"score\"],\n    success: function(res){\n        console.log(res)\n    },\n    fail: function(res){\n        console.log(res)\n    }\n})",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "B"
  },
  {
    "group": "B",
    "name": "getGroupCloudStorage",
    "type": "获取群同玩成员的游戏数据",
    "url": "获取群同玩成员的游戏数据",
    "title": "getGroupCloudStorage",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "shareTicket",
            "description": "<p>群分享对应的 shareTicket</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "keyList",
            "description": "<p>要获取的 key 列表</p>"
          },
          {
            "group": "Parameter",
            "type": "callback",
            "optional": false,
            "field": "success",
            "description": "<p>成功回调</p>"
          },
          {
            "group": "Parameter",
            "type": "callback",
            "optional": false,
            "field": "fail",
            "description": "<p>失败回调</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.getGroupCloudStorage({\n    shareTicket: \"xxx\",\n    keyList: [\"score\"],\n    success: function(res){\n        console.log(res)\n    },\n    fail: function(res){\n        console.log(res)\n    }\n})",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "B"
  },
  {
    "group": "B",
    "name": "getUserCloudStorage",
    "type": "获取托管数据",
    "url": "获取当前用户托管数据当中对应key的数据。该接口只可在开放数据域下使用",
    "title": "getUserCloudStorage",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "keyList",
            "description": "<p>要获取的 key 列表</p>"
          },
          {
            "group": "Parameter",
            "type": "callback",
            "optional": false,
            "field": "success",
            "description": "<p>成功回调</p>"
          },
          {
            "group": "Parameter",
            "type": "callback",
            "optional": false,
            "field": "fail",
            "description": "<p>失败回调</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.getUserCloudStorage({\n    keyList: [\"score\"],\n    success: function(res){\n        console.log(res)\n    },\n    fail: function(res){\n        console.log(res)\n    }\n})",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "B"
  },
  {
    "group": "B",
    "name": "navigateToMiniProgram",
    "type": "打开另一个小程序",
    "url": "打开另一个小程序",
    "title": "navigateToMiniProgram",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "appId",
            "description": "<p>要打开的小程序appId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "path",
            "description": "<p>打开的页面路径，如果为空则打开首页</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": true,
            "field": "extraData",
            "description": "<p>需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "envVersion",
            "description": "<p>要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。</p>"
          },
          {
            "group": "Parameter",
            "type": "function",
            "optional": true,
            "field": "success",
            "description": "<p>接口调用成功的回调函数</p>"
          },
          {
            "group": "Parameter",
            "type": "function",
            "optional": true,
            "field": "fail",
            "description": "<p>接口调用失败的回调函数</p>"
          },
          {
            "group": "Parameter",
            "type": "function",
            "optional": true,
            "field": "complete",
            "description": "<p>接口调用结束的回调函数（调用成功、失败都会执行）</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//.参考文档：https://developers.weixin.qq.com/minigame/dev/api/open-api/miniprogram-navigate/wx.navigateToMiniProgram.html\nsdk.navigateToMiniProgram({\n     appId: '',\n     path: 'page/index/index?id=123',\n     extraData: {\n       foo: 'bar'\n     },\n     envVersion: 'develop',\n     type: 1, //跳转类型： 1直接跳 2长按跳\n     position: 1,//跳转位置： 1侧拉  2弹窗\n     success(res) {\n       // 打开成功\n     }\n })",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "B"
  },
  {
    "group": "B",
    "name": "onMessage",
    "type": "主域监听子域发送的消息",
    "url": "主域监听子域发送的消息",
    "title": "onMessage（监听消息）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "callback",
            "optional": false,
            "field": "callback",
            "description": "<p>回调函数</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.onMessage((d)=>{\n    console.log(d)\n})",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "B"
  },
  {
    "group": "B",
    "name": "onShareAppMessage",
    "type": "分享",
    "url": "注册微信右上角分享",
    "title": "onShareAppMessage(分享)",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "type",
            "defaultValue": "0",
            "description": "<p>后台自定义的分享类型；例如：0：右上角分享、1：普通分享 2：分享加金币</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>转发标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "imageUrl",
            "description": "<p>转发显示图片的链接</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "query",
            "description": "<p>必须是 key1=val1&amp;key2=val2 的格式。</p>"
          },
          {
            "group": "Parameter",
            "type": "callback",
            "optional": true,
            "field": "success",
            "description": "<p>成功回调</p>"
          },
          {
            "group": "Parameter",
            "type": "callback",
            "optional": true,
            "field": "fail",
            "description": "<p>失败回调</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.onShareAppMessage({type: 0, query: \"xxx=xxx\" });",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "B"
  },
  {
    "group": "B",
    "name": "postMessage",
    "type": "主域向子域发送消息",
    "url": "主域向子域发送消息",
    "title": "postMessage（发送消息）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>发送给子域的消息</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.postMessage(\"hello\")",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "B"
  },
  {
    "group": "B",
    "name": "previewImage",
    "type": "全屏预览图片",
    "url": "在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作。",
    "title": "previewImage（预览图片）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "urls",
            "description": "<p>需要预览的图片链接列表。2.2.3 起支持云文件ID。</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "current",
            "defaultValue": "urls 的第一张",
            "description": "<p>当前显示图片的链接</p>"
          },
          {
            "group": "Parameter",
            "type": "function",
            "optional": true,
            "field": "success",
            "description": "<p>接口调用成功的回调函数</p>"
          },
          {
            "group": "Parameter",
            "type": "function",
            "optional": true,
            "field": "fail",
            "description": "<p>接口调用失败的回调函数</p>"
          },
          {
            "group": "Parameter",
            "type": "function",
            "optional": true,
            "field": "complete",
            "description": "<p>接口调用结束的回调函数（调用成功、失败都会执行）</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//.参考文档：https://developers.weixin.qq.com/minigame/dev/api/open-api/miniprogram-navigate/wx.navigateToMiniProgram.html\nsdk.previewImage({\n    current: '', // 当前显示图片的http链接\n    urls: [] // 需要预览的图片http链接列表\n})",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "B"
  },
  {
    "group": "B",
    "name": "setUserCloudStorage",
    "type": "主域上报数据",
    "url": "主域上报数据",
    "title": "setUserCloudStorage",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "KVDataList",
            "description": "<p>要修改的 KV 数据列表</p>"
          },
          {
            "group": "Parameter",
            "type": "callback",
            "optional": false,
            "field": "success",
            "description": "<p>成功回调</p>"
          },
          {
            "group": "Parameter",
            "type": "callback",
            "optional": false,
            "field": "fail",
            "description": "<p>失败回调</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "var DataList = new Array();\nDataList.push({key:\"score\",value:\"520\"});\nsdk.setUserCloudStorage({\n    KVDataList: DataList,\n    success: function(res){\n        console.log(res)\n    },\n    fail: function(res){\n        console.log(res)\n    }\n})",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "B"
  },
  {
    "group": "B",
    "name": "shareAppMessage",
    "type": "分享",
    "url": "主动拉起微信分享",
    "title": "shareAppMessage(分享)",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "type",
            "defaultValue": "1",
            "description": "<p>后台自定义的分享类型；例如：0：右上角分享、1：普通分享 2：分享加金币</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>转发标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "imageUrl",
            "description": "<p>转发显示图片的链接</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "query",
            "description": "<p>必须是 key1=val1&amp;key2=val2 的格式。</p>"
          },
          {
            "group": "Parameter",
            "type": "callback",
            "optional": true,
            "field": "success",
            "description": "<p>成功回调</p>"
          },
          {
            "group": "Parameter",
            "type": "callback",
            "optional": true,
            "field": "fail",
            "description": "<p>失败回调</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.shareAppMessage({type: 1, query: \"xxx=xxx\" });",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "B"
  },
  {
    "group": "B",
    "name": "sortList",
    "type": "对子域数据进行排序",
    "url": "对子域数据进行排序",
    "title": "sortList（子域排序）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ListData",
            "description": "<p>要排序的微信子域数据</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "field",
            "description": "<p>排序字段</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "order",
            "description": "<p>正序：true  ； 倒序：false</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "wx.getFriendCloudStorage({\n      keyList: [\"score\"],\n      success(res){\n          var ListData = sdk.sortList(res.data, 'score', true));\n          console.log(\"=排序后的数据=\", ListData);\n      },\n      fail(){\n          console.log(res)\n      }\n})",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "B"
  },
  {
    "group": "C",
    "name": "Get",
    "type": "Get",
    "url": "发起网络请求",
    "title": "Get（发起Get请求）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>请求地址</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "reqData",
            "description": "<p>请求参数</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "callback",
            "description": "<p>不存在返回null</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.Get(\"https://xxx.xxx\", { user_id: user_id }, function (d) {\n    console.log(d)\n});",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "Post",
    "type": "Post",
    "url": "发起网络请求",
    "title": "Post（发起Post请求）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>请求地址</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "reqData",
            "description": "<p>请求参数</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "callback",
            "description": "<p>不存在返回null</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.Post(\"https://xxx\", { user_id: user_id }, function (d) {\n    console.log(d)\n});",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "createImage",
    "type": "显示网络图片",
    "url": "加载网络图片",
    "title": "createImage（显示图片）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "cc.Sprite",
            "optional": false,
            "field": "sprite",
            "description": "<p>显示图片的Sprite</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>需要加载的图片地址</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.createImage(sprite, url);",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "favourRecord",
    "type": "点赞、送花记录查询",
    "url": "点赞、送花记录查询",
    "title": "favourRecord（送花记录",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": "<p>第几页</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "count",
            "description": "<p>每页几条</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//.点赞、送花\nsdk.favourRecord({ page: 1, count: 10 }, function(d){\n    console.log(d)\n});",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "gameRecord",
    "type": "对战记录查询",
    "url": "对战记录查询",
    "title": "gameRecord（对战记录）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "page",
            "description": "<p>第几页</p>"
          },
          {
            "group": "Parameter",
            "type": "Int",
            "optional": false,
            "field": "count",
            "description": "<p>每页几条</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//.对战记录查询\nsdk.gameRecord({ page: 1, count: 10 }, function(d){\n    console.log(d)\n});",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "getConfig1",
    "type": "运营配置",
    "url": "游戏后台配置信息，运营人员使用的通用配置开关",
    "title": "getConfig1（运营配置）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "return",
            "description": "<p>不存在返回null</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "var d = sdk.getConfig1();",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "getConfig2",
    "type": "程序配置",
    "url": "游戏后台配置信息，程序员使用的游戏数据开关，可随便自定义数据：例如复活次数等",
    "title": "getConfig2（程序配置）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "return",
            "description": "<p>不存在返回null</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "var d = sdk.getConfig2();",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "getItem",
    "type": "数据存储",
    "url": "数据存储",
    "title": "getItem（数据读取）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>键</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>值</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "var nick = sdk.getItem(\"nick\")",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "getUser",
    "type": "获取本地用户信息",
    "url": "获取本地用户信息（登录成功后，会在本地存储用户信息）",
    "title": "getUser（获取用户信息）",
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//.不存在返回null\nvar user = sdk.getUser();",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "off",
    "type": "删除game监听器",
    "url": "删除game监听器",
    "title": "off（删除game监听器）",
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//删除监听器\nsdk.off(\"xxx\");",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "off",
    "type": "cc.game发射事件",
    "url": "cc.game发射事件",
    "title": "emit（cc.game发射事件）",
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//cc.game发射事件\n//sdk.emit(\"xxx\");\n//sdk.emit(\"xxx\", {nick:\"xxx\"});",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "on",
    "type": "注册game的特定事件类型回调",
    "url": "注册game的特定事件类型回调",
    "title": "on（注册game监听器）",
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//注册 cc.game.on 的特定事件类型回调\nxx_sdk.on(\"xxx\", (e)=>{\n   console.log(\"xxx\")\n}, this);",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "once",
    "type": "注册game的特定事件类型回调，回调会在第一时间被触发后删除自身。",
    "url": "注册game的特定事件类型回调，回调会在第一时间被触发后删除自身。",
    "title": "once（game监听器）",
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//注册 cc.game.once 的特定事件类型回调，回调会在第一时间被触发后删除自身。\nxx_sdk.once(\"xxx\", (e)=>{\n   console.log(\"xxx\")\n}, this);",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "removeItem",
    "type": "移除键值对",
    "url": "移除键值对",
    "title": "removeItem（移除键值对）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>键</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.removeItem(\"nick\")",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "screenshot",
    "type": "微信小游戏截图保存",
    "url": "微信小游戏截图保存",
    "title": "screenshot（游戏截图）",
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//.微信小游戏：截图保存\nsdk.screenshot((d)=>{\n    if(d){\n        console.log(\"图片保存成功：\", d)\n    }else{\n        console.log(\"图片保存失败：\", d)\n    }\n})",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "setItem",
    "type": "set",
    "url": "数据存储",
    "title": "setItem（数据存储）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>键</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>值</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.setItem(\"nick\",\"hello\")",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "D",
    "name": "getBbmSwitch",
    "type": "背景音乐开关状态",
    "url": "获取背景音乐开关状态",
    "title": "getBbmSwitch-背景音乐",
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//.背景音乐开关\nxx_sdk.getBbmSwitch();//0：关 1：开",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "D"
  },
  {
    "group": "D",
    "name": "getEmoji",
    "type": "表情包列表",
    "url": "表情包列表",
    "title": "getEmoji（表情包列表）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "function",
            "optional": false,
            "field": "callback",
            "description": "<p>不存在返回null</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//获取表情包列表\nsdk.getEmoji((d)=>{\n    console.log(d)\n    // [\n    //     {\n    //         \"id\":1,\n    //         \"type\":1,       //表情类型\n    //         \"url\":\"https://qxgame-1257972171.cos.ap-guangzhou.myqcloud.com/gameadmin/emoji/1.png\",\n    //         \"weight\":10,    //表情权重\n    //         \"txt \":\"太菜了\" //表情中文描述\n    //     },\n    // ]\n});",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "D"
  },
  {
    "group": "D",
    "name": "getGameData",
    "type": "子游戏：获取对战数据",
    "url": "子游戏：获取对战数据",
    "title": "getGameData-对战数据",
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": " //.开始游戏：从主盒子获取对战需要的数据，数据格式如下（可以使用以下数据进行测试）：\n var gameData = sdk.getGameData();\n\n// var gameData = {                //.非盒子环境下的调试数据\n //     user : {                //当前用户信息\n //         avatarUrl: \"https://wx.qlogo.cn/mmopen/vi_32/E31dTdkFnKSFOmmy98kLqJlmDQFjLoRt52KTxohsKFtib2otLWZFOCzyuPXia8A7YR32th1FibqncWra94aAJQicYw/132\",\n //         uid: \"测试用户1\",\n //         openid: \"测试用户1\",\n //         city: \"广州\",\n //         country: \"中国\",\n //         province: \"广东\",\n //         gender: 1,\n //         language: \"zh_CN\",\n //         nickName: \"千寻િ😨雨天\"\n //     },  \n //     ai: false,              //是否ai机器人 \n //     room_id: \"room_001\",          //房间id\n //     create_time: new Date().getTime()/1000,      //创建时间\n //     room_owner: \"测试用户1\", //房主uid\n //     game_id: \"ab\",          //游戏唯一标识\n //     player_count: 2,        //房间人数上限\n //     all_player_data: [      //对战数据\n //         {\n //             player_data:{\n //                 openid: \"测试用户1\",\n //                 avatarUrl:\"https://wx.qlogo.cn/mmopen/vi_32/E31dTdkFnKSFOmmy98kLqJlmDQFjLoRt52KTxohsKFtib2otLWZFOCzyuPXia8A7YR32th1FibqncWra94aAJQicYw/132\",\n //                 city:\"广州\",\n //                 country:\"中国\",\n //                 gender:1,\n //                 language:\"zh_CN\",\n //                 nickName:\"千寻િ😨雨天\",\n //                 province:\"广东\"\n //             },\n //             position:2,     //玩家所在房间的位置\n //             state:0,        //玩家状态  0：未准备   1：已准备\n //             uid:\"测试用户1\"\n //         },\n //         {\n //             player_data:{\n //                 openid: \"测试用户2\",\n //                 avatarUrl: \"https://wx.qlogo.cn/mmopen/vi_32/oNyD409Hg3gHqJtqtKFhhYDiad6pRFiaprwjEheyLra4CEicGPdnn7uBCJL0oxZjqAibW4wrTsbtfnHoY6NolPpz9A/132\",\n //                 city: \"河池\",\n //                 country: \"中国\",\n //                 gender: 2,\n //                 language: \"zh_CN\",\n //                 nickName: \"象牙塔จุ๊บ\",\n //                 province: \"广东\"\n //             },\n //             position:2,     //玩家所在房间的位置\n //             state:0,        //玩家状态  0：未准备   1：已准备\n //             uid: \"测试用户2\"\n //         },\n //     ]\n // }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "D"
  },
  {
    "group": "D",
    "name": "getGold",
    "type": "获取当前用户剩余金萝卜",
    "url": "获取当前用户剩余金萝卜",
    "title": "getGold-获取金萝卜",
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "let gold = xx_sdk.getGold();",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "D"
  },
  {
    "group": "D",
    "name": "getPropById",
    "type": "通过道具ID获取我的道具",
    "url": "通过道具ID获取我的道具",
    "title": "getPropById-获取道具",
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//通过道具ID获取我的道具，没有则返回null\nlet prop = xx_sdk.getPropById(xxx);\n//道具格式如下：\n// {\n//     description: \"黄金兔工炸药道具\",\n//     icon: \"https://cdn.kxt.90wqiji.com/gameadmin/201901281526245c4eaea012d9e.png\",\n//     index: 76494184,\n//     name: \"黄金兔工炸药道具\",\n//     param: {},\n//     prop_count: 1,\n//     type: 102\n// }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "D"
  },
  {
    "group": "D",
    "name": "getSoundStatus",
    "type": "获取语音开关状态",
    "url": "当前语音的开关状态",
    "title": "getSoundStatus-语音开关",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "return",
            "description": "<p>1：已开启语音 0：已屏蔽语音</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//获取语音开关状态：0 或 1\nvar status = sdk.getSoundStatus();",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "D"
  },
  {
    "group": "D",
    "name": "giveUp",
    "type": "弹出认输返回界面",
    "url": "子游戏：弹出认输返回界面",
    "title": "giveUp（认输界面）",
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//.子游戏：弹出认输返回界面\nxx_sdk.giveUp(function(res){\n    if(res == 1){\n        //确认\n    }else{\n        //取消\n    }\n})",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "D"
  },
  {
    "group": "D",
    "name": "onEmoji",
    "type": "表情包监听",
    "url": "监听收到表情包事件",
    "title": "onEmoji（表情包监听）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "function",
            "optional": false,
            "field": "callback",
            "description": "<p>返回一个表情对象</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//监听收到表情包事件\nsdk.onEmoji((emoji)=>{\n    console.log(\"=收到一个表情=\", emoji)\n    console.log(\"=该表情的发送者=\", emoji.sender)\n})",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "D"
  },
  {
    "group": "D",
    "name": "onGameEvent",
    "type": "监听全局游戏事件",
    "url": "监听全局游戏事件",
    "title": "onGameEvent - 游戏事件",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "function",
            "optional": false,
            "field": "callback",
            "description": "<p>返回一个表情对象</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "// 监听全局游戏事件\nxx_sdk.onGameEvent((e)=>{\n    if(e.type == \"emoji\"){\n        console.log(\"=收到一个表情=\", e.emoji)\n        // 表情格式如下\n        // emoji = {\n        //     \"id\":1,\n        //     \"type\":1,       //表情类型\n        //     \"url\":\"https://qxgame-1257972171.cos.ap-guangzhou.myqcloud.com/gameadmin/emoji/1.png\",\n        //     \"weight\":10,    //表情权重\n        //     \"txt \":\"太菜了\", //表情中文描述\n        //     \"sender\": {     //表情的发送者\n        //         \"uid\": \"wx_oGUmH5Ic0ls6xa52epYcL7n77U3U\", \n        //         \"openid\": \"oGUmH5Ic0ls6xa52epYcL7n77U3U\", \n        //         \"nickName\": \"千寻િ😨雨天\", \n        //         \"avatarUrl\": \"https://wx.qlogo.cn/mmopen/vi_32/ib3FwHCA5Nc3N0MpRdb6D5aibGTchEiad27KgRal9BPibfNHo0NZmagJVziaGmn96icC8cqJIrUW3B1vHlG9icibbK5tgA/132\", \n        //         \"gender\": 1, \n        //         \"country\": \"中国\", \n        //         \"city\": \"广州\", \n        //         \"province\": \"广东\", \n        //         \"sig\": \"\"\n        //     }\n        // }\n    }\n    if(e.type == \"giveUp\"){\n        console.log(\"=对方认输了，调用游戏停止逻辑=\")\n    }\n})",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "D"
  },
  {
    "group": "D",
    "name": "onRecorder",
    "type": "注册录音事件",
    "url": "注册录音事件",
    "title": "onRecorder-注册录音事件",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "cc.Node",
            "optional": false,
            "field": "node",
            "description": "<p>录音按钮</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//注册录音事件\nsdk.onRecorder(this.soundButton);",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "D"
  },
  {
    "group": "D",
    "name": "sendEmoji",
    "type": "表情包发送",
    "url": "房间内广播一个表情",
    "title": "sendEmoji（表情包发送）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "emoji",
            "description": "<p>表情对象</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//房间内广播一个表情\naa_sdk.sendEmoji(emoji)",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "D"
  },
  {
    "group": "D",
    "name": "setSoundStatus",
    "type": "设置语音开关",
    "url": "如果不想听其它人说话，可以屏蔽语音",
    "title": "setSoundStatus-语音开关",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "status",
            "optional": false,
            "field": "status",
            "defaultValue": "1",
            "description": "<p>1：开启语音 0：屏蔽语音</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//屏蔽语音\nsdk.setSoundStatus(0);\n//开启语音\nsdk.setSoundStatus(1);",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "D"
  },
  {
    "group": "D",
    "name": "showResult",
    "type": "结果展示",
    "url": "展示游戏结果页面",
    "title": "showResult（结果展示）",
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//.子游戏：展示游戏结果页面\nvar result = [\n    {\n        uid: \"wx_robot_2\",      //用户id\n        score: 2                //比分\n    },\n    {\n        uid: \"wx_robot2_\",      //用户id\n        score: 1                //比分\n    },\n]\nxx_sdk.showResult({result: result});",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "D"
  },
  {
    "group": "D",
    "name": "useGold",
    "type": "使用金萝卜",
    "url": "使用金萝卜",
    "title": "useGold-使用金萝卜",
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "xx_sdk.useGold({\n     gold: 100,  //使用金萝卜数量\n     success(res){\n         if(res.code){\n             console.log(\"金萝卜使用成功\")\n         }else{\n             console.log(\"金萝卜使用失败\")\n         }\n     }\n });",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "D"
  },
  {
    "group": "D",
    "name": "usePropById",
    "type": "通过道具ID使用道具",
    "url": "通过道具ID使用道具",
    "title": "usePropById-使用道具",
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "xx_sdk.usePropById({\n     prop_index: 0,  //道具编号\n     prop_count: 1,  //使用数量\n     success(res){\n         if(res.code){\n             console.log(\"道具使用成功\")\n         }else{\n             console.log(\"道具使用失败\")\n         }\n     }\n });",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "../games/happyrabbit/v3.0.0/happyrabbit/assets/aa/script/sdk/sdk.js",
    "groupTitle": "D"
  }
] });
