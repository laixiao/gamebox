// 

var sdk_conf = { 
    debug: false,               //.默认关闭调试
    game: 'aa',                 //.游戏唯一标识
    version: '1.0.0',           //.当前游戏版本          
    bannerAdUnitId: 'adunit-d6b9bab967f2f8b7',  //.banner广告单元id
    videoAdUnitId: 'adunit-3fa34dc8aada52e3',      //.video广告单元id   

    //.测试用户的ID数据可查阅： https://laixiao.github.io/gamebox/doc/gamebox
    debugData: {
        user : {                //当前用户信息
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/E31dTdkFnKSFOmmy98kLqJlmDQFjLoRt52KTxohsKFtib2otLWZFOCzyuPXia8A7YR32th1FibqncWra94aAJQicYw/132",
            uid: "测试账号1",
            city: "广州",
            country: "中国",
            province: "广东",
            gender: 1,
            language: "zh_CN",
            nickName: "千寻િ😨雨天"
        },  
        ai: 1,              //1：机器人  0：真人
        room_id: "room_001",          //房间id
        create_time: new Date().getTime()/1000,      //创建时间
        room_owner: "测试账号1",       //房主uid
        game_id: "ae",          //游戏唯一标识
        player_count: 2,        //房间人数上限
        all_player_data: [      //对战数据
            {
                player_data:{
                    avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/E31dTdkFnKSFOmmy98kLqJlmDQFjLoRt52KTxohsKFtib2otLWZFOCzyuPXia8A7YR32th1FibqncWra94aAJQicYw/132",
                    city:"广州",
                    country:"中国",
                    gender:1,
                    language:"zh_CN",
                    nickName:"千寻િ😨雨天",
                    province:"广东"
                },
                position:2,     //玩家所在房间的位置
                state:0,        //玩家状态  0：未准备   1：已准备
                uid:"测试账号1",
                ai: 1,              //是否ai机器人
            },
            {
                player_data:{
                    avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/oNyD409Hg3gHqJtqtKFhhYDiad6pRFiaprwjEheyLra4CEicGPdnn7uBCJL0oxZjqAibW4wrTsbtfnHoY6NolPpz9A/132",
                    city: "河池",
                    country: "中国",
                    gender: 2,
                    language: "zh_CN",
                    nickName: "象牙塔จุ๊บ",
                    province: "广东"
                },
                position:2,     //玩家所在房间的位置
                state:0,        //玩家状态  0：未准备   1：已准备
                uid: "测试账号2",
                ai: 1,              //是否ai机器人
            },
        ]
    },
    

};
module.exports = sdk_conf;

