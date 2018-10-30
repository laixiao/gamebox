// 

var sdk_conf = { 
    debug: false,               //.默认关闭调试
    game: 'aa',                 //.游戏唯一标识
    version: '1.0.0',           //.当前游戏版本          
    bannerAdUnitId: 'adunit-d6b9bab967f2f8b7',  //.banner广告单元id
    videoAdUnitId: 'adunit-3fa34dc8aada52e3',      //.video广告单元id   

    //.测试用户1、测试用户2 的ID数据可查阅： https://laixiao.github.io/gamebox/doc/sdk-doc
    debugData: {                //.非盒子环境下的调试数据
        user : {                //当前用户信息
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/E31dTdkFnKSFOmmy98kLqJlmDQFjLoRt52KTxohsKFtib2otLWZFOCzyuPXia8A7YR32th1FibqncWra94aAJQicYw/132",
            uid: "测试用户1",
            openid: "测试用户1",
            city: "广州",
            country: "中国",
            province: "广东",
            gender: 1,
            language: "zh_CN",
            nickName: "千寻િ😨雨天"
        },  
        ai: false,              //是否ai机器人 
        room_id: null,          //房间id
        create_time: null,      //创建时间
        room_owner: null,       //房主uid
        game_id: "ab",          //游戏唯一标识
        player_count: 2,        //房间人数上限
        all_player_data: [      //对战数据
            {
                player_data:{
                    openid: "测试用户1",
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
                uid:"测试用户1"
            },
            {
                player_data:{
                    openid: "测试用户2",
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
                uid: "测试用户2"
            },
        ]
    },
    

};
module.exports = sdk_conf;

