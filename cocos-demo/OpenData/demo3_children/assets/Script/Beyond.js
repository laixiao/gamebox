// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        scene: "hide",
        
        rank: cc.Label,
        avatar: cc.Sprite,
        nick: cc.Label,
        score: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        //.监听主域发过来的消息
        cc.game.on("onMessage", (e)=>{
            if(e.scene.indexOf(this.scene) != -1 ){
                this.node.active = true;
                this.init();
            }else{
                this.node.active = false;
            }
        },this)

    },

    start () {

    },

    init(){
        var self = this;
        //1.拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用
        sdk.getFriendCloudStorage(["score"], (res)=>{
            if(res.data && res.data.length > 0){
                //2.排序
                var d = sdk.sortList(res.data, 'score', false);
                //3.获取当前用户信息
                wx.getUserInfo({
                    openIdList: ['selfOpenId'],
                    lang: 'zh_CN',
                    success(res2){
                        //4.当前用户排名位置
                        var myPos = 0;
                        for (let i = 0; i < d.length; i++) {
                            if(d[i].avatarUrl == res2.data[0].avatarUrl && d[i].nickname == res2.data[0].nickName){
                                myPos = i;
                                break;
                            }
                        }
                        //5.当前用户的待超越用户
                        var beyond = null;
                        var beyondPos = 0;
                        for (let i = myPos; i > 0; i--) {
                            if(d[i].KVDataList[0].value > d[myPos].KVDataList[0].value){
                                beyond = d[i];
                                beyondPos = i;
                                break;
                            }
                        }
                        if(!beyond){
                            beyond = d[myPos];
                            beyondPos = myPos;
                        }
                        //6.显示待超越用户信息
                        self.setData(beyond, beyondPos+1);
                    },
                    fail(error) {
                        console.log(error)
                    }
                })
            }
        }) 
    },
    setData(d, i){
        this.rank.string = i;
        this.nick.string = d.nickname;
        this.score.string = '得分：' + d.KVDataList[0].value;
        //.加载头像
        sdk.createImage(this.avatar, d.avatarUrl);
    },

    // update (dt) {},

});
