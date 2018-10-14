cc.Class({
    extends: cc.Component,

    properties: {
        loginNode: {
            default: null,
            type: cc.Node
        },
        loadingNode: {
            default: null,
            type: cc.Node
        },
        // defaults, set visually when attaching this script to the Canvas
        progressBar: {
            default: null,
            type: cc.ProgressBar
        },


    },

    // use this for initialization
    onLoad: function () {
        
        //.预加载下一个场景：进度
        this.currentProgress = 0;
        //.预加载下一个场景
        cc.director.preloadScene("home", (completedCount, totalCount, item)=>{
            this.currentProgress = parseFloat((completedCount/totalCount)).toFixed(2);
            console.log(this.currentProgress);
        }, (error)=>{
            //.判断是否登录
            if(false){
                cc.director.loadScene("home");
            }else{
                this.loadingNode.destroy();
                this.loginNode.active = true;
            }
        })

    },

    // called every frame
    update: function (dt) {
        if(this.progressBar.progress < this.currentProgress){
            this.progressBar.progress += dt;
        }

    },

    home(){
        cc.director.loadScene("home");
    }

});
