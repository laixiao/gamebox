//参考文档：https://github.com/pandamicro/creator-docs/blob/next/zh/publish/publish-wechatgame-sub-domain.md
cc.Class({
    extends: cc.Component,

    properties: {
        Rank: cc.Node,
        Top3: cc.Node,

    },

    // use this for initialization
    onLoad: function () {

    },

    start(){
        
    },

    // called every frame
    update: function (dt) {

    },

    showRank(){
        this.Rank.active = true;
        sdk.postMessage({ scene: 'showRank' });
    },
    hideRank(){
        this.Rank.active = false;
    },
    showTop3(){
        this.Top3.active = true;
        sdk.postMessage({ scene: 'showTop3' });
    },
    hideTop3(){
        this.Top3.active = false;
    },
    


});
