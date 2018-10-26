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
        audio_button: {
            type: cc.AudioClip,
            default: null
        },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //调用：   cc.game.emit("audio_button");


        //.初始化音效开关
        this.initAudio();
        cc.game.on("SwitchAudio",()=>{
            this.initAudio();
        },this)
        //2.播放音效
        cc.game.on("audio_button",()=>{
            if(this.AudioStatus){
                cc.audioEngine.play(this.audio_button);
            }
        },this)

    },

    // update (dt) {},

    initAudio(){
        //1.获取开关
        this.AudioStatus = true;
        var value = cc.sys.localStorage.getItem('AudioStatus');
        if(value){
            if(value == "on"){
                this.AudioStatus = true;
            }else{
                this.AudioStatus = false;
            } 
        }
    }
    
});
