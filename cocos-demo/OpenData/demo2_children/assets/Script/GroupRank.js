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
        GroupRankItem: cc.Prefab,
        Content: cc.Node,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        


    },

    // update (dt) {},

    setData(shareTicket){
        var self = this;

        //1.拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用
        sdk.getFriendCloudStorage(["score"], (res)=>{
            if(res.data && res.data.length > 0){
                var d = sdk.sortList(res.data, 'score', false)
                for (let i = 0; i < d.length; i++) {
                    var item = cc.instantiate(self.GroupRankItem);
                    item.parent = self.Content;
                    item.getComponent("GroupRankItem").setData(d[i], i+1);
                }
            }
        })  
    },

    onDisable(){
        this.Content.removeAllChildren();
    }

});
