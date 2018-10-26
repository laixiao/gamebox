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
        label: cc.Label,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.zIndex = 10;
    },

    start () {
        //.调用示例
        // cc.game.emit("Toast", { c: "请先邀请对手应战"})
        // cc.game.emit("Toast", { c: "请先邀请对手应战", t: 2.5})

        cc.game.on("Toast",function(event){
            // console.log(event)
            if(event.t){
                this.show2(event.c, event.t)
            }else{
                this.show(event.c)
            }
        },this)
    },

    // update (dt) {},

    show(c){
        this.node.active = true;
        this.node.stopAllActions();
        this.label.string = c;
        this.node.runAction(cc.sequence(cc.fadeIn(0.2),cc.delayTime(1.2),cc.fadeOut(1.0)));
    },
    //.内容、时间
    show2(c,t){
        this.node.active = true;
        this.node.stopAllActions();
        this.label.string = c;
        this.node.runAction(cc.sequence(cc.fadeIn(0.2),cc.delayTime(t),cc.fadeOut(1.0)));
    },


});
