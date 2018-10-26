cc.Class({
    extends: cc.Component,

    properties: {
        cocos: cc.Node,


    },

    // use this for initialization
    onLoad: function () {
        
    },

    start(){

        var a1 = cc.circleMoveAction(2.5, cc.v2(0,0), 0, 360)


        this.cocos.runAction(cc.repeatForever(a1));

        

    },

    // called every frame
    update: function (dt) {

    },
});
