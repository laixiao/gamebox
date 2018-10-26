var sdk = {
    app_name: '',

    //.加载图片
    createImage(sprite,url){
        //.当前运行环境是小游戏，可以调用微信api接口wx.
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
    //msg参数: Object
    postMessage(msg){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.postMessage({ message: msg });
        }
    },
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
    //.主域上报数据:    对用户托管数据进行写数据操作，允许同时写多组 KV 数据。
    setUserCloudStorage(kvDataList, callback){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.setUserCloudStorage({
                KVDataList: kvDataList,
                success(res){
                    callback(res)
                },
                fail(res){
                    callback(res)
                }
            })
        }
    },
    //.获取当前用户托管数据当中对应 key 的数据。该接口只可在开放数据域下使用
    getUserCloudStorage(keyList, callback){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.getUserCloudStorage({
                keyList: keyList,
                success(res){
                    callback(res)
                },
                fail(res){
                    callback(res)
                }
            })
        }
    },
    //.在小游戏是通过群分享卡片打开的情况下，可以通过调用该接口获取群同玩成员的游戏数据。该接口只可在开放数据域下使用。
    getGroupCloudStorage(shareTicket, keyList, callback){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.getGroupCloudStorage({
                shareTicket: shareTicket,
                keyList: keyList,
                success(res){
                    callback(res)
                },
                fail(res){
                    callback(res)
                }
            })
        }
    },
    //.拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用
    getFriendCloudStorage(keyList, callback){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.getFriendCloudStorage({
                keyList: keyList,
                success(res){
                    callback(res)
                },
                fail(res){
                    callback(res)
                }
            })
        }
    },

    //.对排行榜数据进行排序。   
        // order:   true正序  false倒序  
        // field:   要排序的key
    sortList(ListData, key, order){
        ListData.sort(function(a,b){
            var AMaxScore = 0;
            var KVDataList = a.KVDataList;
            for(var i=0; i<KVDataList.length; i++){
                if(KVDataList[i].key == key){
                    AMaxScore = KVDataList[i].value;
                }
            }

            var BMaxScore = 0;
            KVDataList = b.KVDataList;
            for(var i=0; i<KVDataList.length; i++){
                if(KVDataList[i].key == key){
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
    //.与我相邻的好友
    getMyRank(ListData,me){
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
    



    
}
module.exports = sdk;
window.sdk = sdk;