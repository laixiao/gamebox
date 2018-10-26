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
        rank: cc.Label,
        avatar: cc.Sprite,
        nick: cc.Label,
        score: cc.Label,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
        this.avatar.node.runAction(cc.repeatForever(cc.rotateBy(2, 360)));

    },

    // update (dt) {},

    setData(d){
        this.rank.string = d.rank;
        this.nick.string = d.nick;
        this.score.string = '得分：' + d.score;
        //.加载头像
        sdk.createImage(this.avatar, d.avatar);
    },

});
