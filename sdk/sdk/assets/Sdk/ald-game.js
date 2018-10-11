!
function() {
if (cc.sys.platform === cc.sys.WECHAT_GAME) {
    
    function e() {
        return new Promise(function(e, n) {
            wx.getSetting({
                success: function(n) {
                    n.authSetting["scope.userInfo"] ? wx.getUserInfo({
                        success: function(n) {
                            M = c(n.userInfo.avatarUrl.split("/")),
                            e(n)
                        },
                        fail: function() {
                            e("")
                        }
                    }) : e("")
                },
                fail: function() {
                    e("")
                }
            })
        })
    }
    function n() {
        return new Promise(function(e, n) {
            wx.getNetworkType({
                success: function(n) {
                    e(n)
                },
                fail: function() {
                    e("")
                }
            })
        })
    }
    function t() {
        return new Promise(function(e, n) {
            "1044" == y.scene ? wx.getShareInfo({
                shareTicket: y.shareTicket,
                success: function(n) {
                    e(n)
                },
                fail: function() {
                    e("")
                }
            }) : e("")
        })
    }
    function r() {
        return new Promise(function(e, n) {
            d.getLocation ? wx.getLocation({
                success: function(n) {
                    e(n)
                },
                fail: function() {
                    e("")
                }
            }) : wx.getSetting({
                success: function(n) {
                    n.authSetting["scope.userLocation"] ? (wx.getLocation({
                        success: function(n) {
                            e(n)
                        },
                        fail: function() {
                            e("")
                        }
                    }), e("")) : e("")
                },
                fail: function() {
                    e("")
                }
            })
        })
    }
    function a() {
        function e() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
        }
        return e() + e() + e() + e() + e() + e() + e() + e()
    }
    function o(e, n) {
        var t = 0,
        r = function() {
            v++,
            e.as = m,
            e.at = x,
            e.rq_c = v,
            e.ifo = l,
            e.ak = d.app_key,
            e.uu = h,
            e.v = u,
            e.st = Date.now(),
            e.ev = n,
            e.wsr = y,
            e.ufo = s(e.ufo),
            e.ec = _,
            wx.request({
                url: "https://" + f + ".aldwx.com/d.html",
                data: e,
                header: {
                    se: w || "",
                    op: p || "",
                    img: M || ""
                },
                method: "GET",
                fail: function() {
                    t < 2 && (t++, e.retryTimes = t, r())
                }
            })
        };
        r()
    }
    function s(e) {
        if (void 0 === e || "" === e) return "";
        var n = {};
        for (var t in e)"rawData" != t && "errMsg" != t && (n[t] = e[t]);
        return n
    }
    function i(e) {
        var n = {};
        for (var t in e) n[t] = e[t];
        return n
    }
    function c(e) {
        for (var n = "",
        t = 0; t < e.length; t++) e[t].length > n.length && (n = e[t]);
        return n
    }
    var u = "1.0.0",
    f = "glog",
    d = require("./ald-game-conf");
    "" === d.app_key && console.error("请在配置文件中填写您的app_key"),
    d.app_key = d.app_key.replace(/\s/g, ""),
    function() {
        wx.request({
            url: "https://" + f + ".aldwx.com/config/app.json",
            method: "GET",
            success: function(e) {
                200 === e.statusCode && (e.data.version != u && console.warn("您的SDK不是最新版本，请尽快升级！"), e.data.warn && console.warn(e.data.warn), e.data.error && console.error(e.data.error))
            }
        })
    } ();
    var l = "",
    h = function() {
        var e = "";
        try {
            e = wx.getStorageSync("aldstat_uuid"),
            wx.setStorageSync("ald_ifo", !0)
        } catch(n) {
            e = "uuid_getstoragesync"
        }
        if (e) l = !1;
        else {
            e = a(),
            l = !0;
            try {
                wx.setStorageSync("aldstat_uuid", e)
            } catch(e) {
                wx.setStorageSync("aldstat_uuid", "uuid_getstoragesync")
            }
        }
        return e
    } (),
    g = {},
    w = "",
    p = "",
    _ = 0,
    v = "",
    y = wx.getLaunchOptionsSync(),
    S = Date.now(),
    x = "" + Date.now() + Math.floor(1e7 * Math.random()),
    m = "" + Date.now() + Math.floor(1e7 * Math.random()),
    q = 0,
    k = "",
    M = "",
    b = !0,
    O = ["aldSendEvent", "aldOnShareAppMeassage", "aldShareAppMessage", "aldSendSession", "aldSendOpenid"]; (function() {
        return Promise.all([e(), n(), r()])
    })().then(function(e) {
        "" !== e[2] ? (g.lat = e[2].latitude || "", g.lng = e[2].longitude || "", g.spd = e[2].speed || "") : (g.lat = "", g.lng = "", g.spd = ""),
        "" !== e[1] ? g.nt = e[1].networkType || "": g.nt = "";
        var n = i(g);
        "" !== e[0] && (n.ufo = e[0], k = e[0]),
        o(n, "init")
    }),
    wx.onShow(function(e) {
        y = e,
        q = Date.now(),
        b || (x = "" + Date.now() + Math.floor(1e7 * Math.random()), l = !1, wx.setStorageSync("ald_ifo", !1)),
        b = !1;
        var n = i(g);
        i(g);
        var r = i(g);
        n.sm = q - S,
        e.query.ald_share_src && e.shareTicket && "1044" === e.scene ? (r.tp = "ald_share_click", t().then(function(e) {
            r.ct = e,
            o(r, "event")
        })) : e.query.ald_share_src && (r.tp = "ald_share_click", r.ct = "1", o(r, "event")),
        o(n, "show")
    }),
    wx.onHide(function() {
        var e = i(g);
        e.dr = Date.now() - q,
        "" === k ? wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] ? wx.getUserInfo({
                    success: function(n) {
                        e.ufo = n,
                        k = n,
                        M = c(n.userInfo.avatarUrl.split("/")),
                        o(e, "hide")
                    }
                }) : o(e, "hide")
            }
        }) : o(e, "hide")
    }),
    wx.onError(function(e) {
        var n = i(g);
        n.tp = "ald_error_message",
        n.ct = e,
        _++,
        o(n, "event")
    });
    for (var D = {
        aldSendEvent: function(e, n) {
            var t = i(g);
            "" !== e && "string" == typeof e && e.length <= 255 ? (t.tp = e, "string" == typeof n && n.length <= 255 ? (t.ct = String(n), o(t, "event")) : "object" == typeof n ? (JSON.stringify(n).length >= 255 && console.error("自定义事件参数不能超过255个字符"), t.ct = JSON.stringify(n), o(t, "event")) : void 0 === n || "" === n ? o(t, "event") : console.error("事件参数必须为String,Object类型,且参数长度不能超过255个字符")) : console.error("事件名称必须为String类型且不能超过255个字符")
        },
        aldOnShareAppMeassage: function(e) {
            wx.updateShareMenu({
                withShareTicket: !0,
                complete: function() {
                    wx.onShareAppMessage(function() {
                        var n = e(),
                        t = "";
                        t = void 0 !== y.query.ald_share_src ? void 0 !== n.query ? (y.query.ald_share_src.indexOf(h), n.query + "&ald_share_src=" + y.query.ald_share_src + "," + h) : (y.query.ald_share_src.indexOf(h), "ald_share_src=" + y.query.ald_share_src + "," + h) : void 0 !== n.query ? n.query + "&ald_share_src=" + h: "ald_share_src=" + h,
                        n.query = t;
                        var r = i(g);
                        return r.ct = n,
                        r.tp = "ald_share_status",
                        o(r, "event"),
                        n
                    })
                }
            })
        },
        aldShareAppMessage: function(e) {
            var n = e,
            t = "";
            t = void 0 !== y.query.ald_share_src ? void 0 !== n.query ? (y.query.ald_share_src.indexOf(h), n.query + "&ald_share_src=" + y.query.ald_share_src + "," + h) : (y.query.ald_share_src.indexOf(h), "ald_share_src=" + y.query.ald_share_src + "," + h) : void 0 !== n.query ? n.query + "&ald_share_src=" + h: "ald_share_src=" + h,
            n.query = t;
            var r = i(g);
            r.ct = n,
            r.tp = "ald_share_status",
            o(r, "event"),
            wx.updateShareMenu({
                withShareTicket: !0,
                complete: function() {
                    wx.shareAppMessage(n)
                }
            })
        },
        aldSendSession: function(e) {
            if ("" === e || !e) return void console.error("请传入从后台获取的session_key");
            var n = i(g);
            n.tp = "session",
            n.ct = "session",
            w = e,
            "" === k ? wx.getSetting({
                success: function(e) {
                    e.authSetting["scope.userInfo"] ? wx.getUserInfo({
                        success: function(e) {
                            n.ufo = e,
                            o(n, "event")
                        }
                    }) : o(n, "event")
                }
            }) : (n.ufo = k, "" !== k && (n.gid = ""), o(n, "event"))
        },
        aldSendOpenid: function(e) {
            if ("" === e || !e) return void console.error("openID不能为空");
            p = e;
            var n = i(g);
            n.tp = "openid",
            n.ct = "openid",
            o(n, "event")
        }
    },
    I = 0; I < O.length; I++) !
    function(e, n) {
        Object.defineProperty(wx, e, {
            value: n,
            writable: !1,
            enumerable: !0,
            configurable: !0
        })
    } (O[I], D[O[I]]);
    try {
        var T = wx.getSystemInfoSync();
        g.br = T.brand || "",
        g.md = T.model,
        g.pr = T.pixelRatio,
        g.sw = T.screenWidth,
        g.sh = T.screenHeight,
        g.ww = T.windowWidth,
        g.wh = T.windowHeight,
        g.lang = T.language,
        g.wv = T.version,
        g.sv = T.system,
        g.wvv = T.platform,
        g.fs = T.fontSizeSetting,
        g.wsdk = T.SDKVersion,
        g.bh = T.benchmarkLevel || "",
        g.bt = T.battery || "",
        g.wf = T.wifiSignal || "",
        g.lng = "",
        g.lat = "",
        g.nt = "",
        g.spd = "",
        g.ufo = ""
    } catch(e) {}
}
} ();