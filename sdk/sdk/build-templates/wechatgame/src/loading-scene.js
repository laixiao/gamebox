var loadingBg = "https://laixiao.github.io/gamebox/doc/bg.png";

var scene = new cc.Scene();
//1.新增Canvas组件
var root = new cc.Node();
var canvas = root.addComponent(cc.Canvas);
root.parent = scene;

//2.新增Sprite组件：显示loading图片
var bgSprite = root.addComponent(cc.Sprite);
var createImage = function(sprite, url) {
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
}
createImage(bgSprite, loadingBg);

//3.预加载场景
scene.loadinglaunchScene = function(launchScene){
    cc.director.preloadScene(launchScene, (completedCount, totalCount, item)=>{
        // label.string = "启动场景加载中..."+ parseInt((completedCount/totalCount)*100)  + "%";
        // console.log("启动场景加载中..."+ parseInt((completedCount/totalCount)*100) + "%")
    }, (error)=>{
        if(error){
            console.log('==preloadScene error==', launchScene, error)
        }
        cc.director.loadScene(launchScene, null,function () {
                cc.loader.onProgress = null;
                console.log('Success to load scene: ' + launchScene);
            }
        );
    })
}

module.exports = scene;