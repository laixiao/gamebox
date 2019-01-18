var sdk_conf = { 
    //唯一标识
    game: 'aa',
    //游戏版本 
    version: '1.0.0', 
    //是否开启调试
    debug: true,
    //测试服
    iphttps: "https://testadmin.90wqiji.com",
    ipscoket: "wss://www.90wqiji.com/dice/login",
    //正式服
    // iphttps: "https://kxt.90wqiji.com",
    // ipscoket: "wss://www.90wqiji.com/dice/login",//测试服务器

    bannerAdUnitId: 'adunit-d90369788de9aeb5',//banner广告单元id
    videoAdUnitId: 'adunit-faa606d151ea9e99',//video广告单元id   
    loginButton: {//自定义登录按钮
        loginBt: "https://cdn.kxt.90wqiji.com/box/image/happyrabbitlogin2.png",
        loginBg: "https://cdn.kxt.90wqiji.com/box/image/singlecolor.png",
        loginBtWidth: 603,
        loginBtHeight: 635
    },
    
    
    

};
module.exports = sdk_conf;




// debugData: {                //.非盒子环境下的调试数据
//     user : {                //当前用户信息
//         avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/E31dTdkFnKSFOmmy98kLqJlmDQFjLoRt52KTxohsKFtib2otLWZFOCzyuPXia8A7YR32th1FibqncWra94aAJQicYw/132",
//         uid: "wx_robot_4_",
//         openid: "wx_robot_4_",
//         city: "广州",
//         country: "中国",
//         province: "广东",
//         gender: 1,
//         language: "zh_CN",
//         nickName: "千寻િ😨雨天"
//     },  
//     ai: 1,              //是否有ai机器人
//     room_id: "room_001",          //房间id
//     create_time: new Date().getTime()/1000,      //创建时间
//     room_owner: "wx_robot_4_",       //房主uid
//     game_id: "ae",          //游戏唯一标识
//     player_count: 2,        //房间人数上限
//     all_player_data: [      //对战数据
//         {
//             player_data:{
//                 openid: "wx_robot_4_",
//                 avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/E31dTdkFnKSFOmmy98kLqJlmDQFjLoRt52KTxohsKFtib2otLWZFOCzyuPXia8A7YR32th1FibqncWra94aAJQicYw/132",
//                 city:"广州",
//                 country:"中国",
//                 gender:1,
//                 language:"zh_CN",
//                 nickName:"千寻િ😨雨天",
//                 province:"广东"
//             },
//             position:2,     //玩家所在房间的位置
//             state:0,        //玩家状态  0：未准备   1：已准备
//             uid:"wx_robot_4_",
//             ai: 1,              //是否ai机器人
//         },
//         {
//             player_data:{
//                 openid: "wx_robot4_",
//                 avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/oNyD409Hg3gHqJtqtKFhhYDiad6pRFiaprwjEheyLra4CEicGPdnn7uBCJL0oxZjqAibW4wrTsbtfnHoY6NolPpz9A/132",
//                 city: "河池",
//                 country: "中国",
//                 gender: 2,
//                 language: "zh_CN",
//                 nickName: "象牙塔จุ๊บ",
//                 province: "广东"
//             },
//             position:2,     //玩家所在房间的位置
//             state:0,        //玩家状态  0：未准备   1：已准备
//             uid: "wx_robot4_",
//             ai: 1,              //是否ai机器人
//         },
//     ]
// },

