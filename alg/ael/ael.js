/* v2.5.1 */
function detectTransformProperty() {
    var t = ["MozTransform", "WebkitTransform", "OTransform", "msTransform", "transform"],
        e = document.createElement("div");
    for (var n in t)
        if (void 0 !== e.style[t[n]]) return t[n];
    return ""
}

function Scroll(t, e, n, i, o) {
    function r() {
        t.on("mousedown", s), n.on("mousedown", f), i.on("mousedown", f)
    }

    function s(t) {
        R && m(), E.on("mousemove", a), E.on("mouseup", l), E.on("mouseout", c), e.stop(), O = e.position().top, x = t.pageY, a(t), d()
    }

    function a(t) {
        if (C = (new Date).getTime(), w = t.pageY - x, x = t.pageY, O > 0 && w > 0) {
            var n = k - O,
                i = Math.abs(w) / k;
            w = n * i
        } else if (S > O + T && 0 > w) {
            var n = -Math.max(O + T - (S - k), 10),
                i = Math.abs(w) / k;
            w = n * i
        }
        O += w, e.css("top", O), p()
    }

    function l(t) {
        E.off("mousemove", a), E.off("mouseup", l), E.off("mouseout", c);
        var n = ((new Date).getTime() - C) / 1e3 / P;
        n > 1 && (n = 1), w *= 1 - n, w *= _;
        var i = O;
        O += w, S > O + T && (O = S - T), O > 0 && (O = 0);
        var o = O - i,
            r = Math.abs(o) / N;
        e.animate({
            top: O
        }, {
            duration: 1e3 * r,
            step: p,
            complete: u
        }), t && (J = !0)
    }

    function c(t) {
        if ($(t.relatedTarget).is("iframe")) {
            if (J) return void(J = !1);
            l()
        }
    }

    function u() {
        var t = O;
        S > O + T && (O = S - T), O > 0 && (O = 0), w = O - t;
        var n = Math.abs(w) / N;
        e.animate({
            top: O
        }, {
            duration: 1e3 * n,
            step: p,
            complete: h
        })
    }

    function d() {
        T > S && o.show()
    }

    function p() {
        var t = e.position().top;
        if (0 > t ? n.show() : n.hide(), t + T > S ? i.show() : i.hide(), T > S) {
            var r;
            r = t > 0 ? S - t : S > t + T ? t + T : S;
            var s = Math.round(S * -t / T),
                a = Math.round(S * r / T);
            0 > s && (a += s, s = 0), o.height(a), o.css("top", s + b)
        }
    }

    function h() {
        T > S && o.hide()
    }

    function f(t) {
        R = !0, E.on("mouseup", m), E.on("mouseout", v), d();
        var i = $(t.currentTarget);
        e.stop(), O = e.position().top, L = i[0] == n[0] ? I : -I, clearInterval(A), A = setInterval(g, 40)
    }

    function g() {
        var t = O + L;
        S > t + T && (t = S - T, R = !1), t > 0 && (t = 0, R = !1), O = t, e.css("top", O), p(), R || m()
    }

    function m() {
        E.off("mouseup", m), E.off("mouseout", v), clearInterval(A), h(), R = !1
    }

    function v(t) {
        $(t.relatedTarget).is("iframe") && m()
    }

    function y(n, i, o) {
        O = e.position().top, e.css("top", O), S = t.height(), b = t.position().top, T = e.height(), n && (O = -i * T / o, 0 - (T - S) > O ? O = 0 - (T - S) : O > 0 && (O = 0), e.css("top", O)), p()
    }
    var t, e, n, i, o, S, b, T, C, x, w, O, A, L, R, k = 100,
        _ = 5,
        N = 300,
        P = .5,
        I = 10,
        E = $(window),
        J = !1;
    return r(), {
        recompute: y
    }
}

function showCorrectImage(t) {
    var e = "";
    console.log(t);
    e = void 0 != t && null != t && t != 0 / 0 ? "#correctImg" + parseInt(t) : "#correctImg" + parseInt(currentActivity), $(e).show()
}

function hideCorrectImages() {
    for (var t = 0; noActivities > t; t++) idImgCorrect = "#correctImg" + t, $(idImgCorrect).hide()
}

function getLanguage() {
    var t = window.Config,
        e = "en-US";
    return void 0 != t && null != t && "" != t.language && null != t.language && void 0 != t.language && (e = t.language), e
}

function gup(t, e) {
    e || (e = location.href), t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var n = "[\\?&]" + t + "=([^&#]*)",
        i = new RegExp(n),
        o = i.exec(e);
    return null == o ? null : o[1]
}

function supports_html5_storage() {
    try {
        return void 0 === localStorage ? !1 : "localStorage" in window && null !== window.localStorage
    } catch (t) {
        return !1
    }
}

function arrayObjectIndexOf(t, e, n) {
    for (var i = 0, o = t.length; o > i; i++)
        if (t[i][n] === e) return i;
    return -1
}

function saveStateAndSend() {
    if (GLOBAL_LM.bOnline) {
        if (-1 != GLOBAL_LM.lmCurrentDerIndex) {
            var t = arrayObjectIndexOf(GLOBAL_LM.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"], "sm" + (GLOBAL_LM.lmCurrentDerIndex + 1).toString(), "name"); - 1 != t && 0 == GLOBAL_LM.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"][t].data.completion && (GLOBAL_LM.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"][t].data.duration = GLOBAL_LM.convertDurationToTincan(GLOBAL_LM.getCurrentActivityDuration()))
        }
        GLOBAL_LM.tincan.deleteState("tempState"), GLOBAL_LM.saveLessonState(), GLOBAL_LM.completed = GLOBAL_LM.getCompletedSubmodules().length == GLOBAL_LM.lmTotalSubmoments && -1 != GLOBAL_LM.lmTotalSubmoments ? !0 : !1, GLOBAL_LM.sendCompletedStatement()
    }
}

function logOff() {
    tempFinished || saveStateAndSend(), GLOBAL_LM.bOnline = !1, tempFinished = !1, GLOBAL_LM.resetExtensionResults(), window.parent.postMessage('{"command":"showLogin"}', "*")
}

function manageLoadedBookmark(t) {
    var e = JSON.parse(t.xhr.responseText);
    void 0 != e.location ? (window.parent.postMessage('{"command":"showScreen","noScreen":"' + e.location + '"}', "*"), GLOBAL_LM.lmCurrentDerIndex = parseInt(e.location)) : window.parent.postMessage('{"command":"showScreen","noScreen":"0"}', "*"), $("#ghostUser").hide(), resetAppeared || window.parent.postMessage('{"command":"hideLogin"}', "*"), $("#ipZone").empty(), $("#userNameInput").val(""), userNameSet = !0, markCompletedSubmodules()
}

function markCompletedSubmodules() {
    window.hideCorrectImages();
    var t = GLOBAL_LM.getCompletedSubmodules();
    if (t.length > 0)
        for (var e = 0; e < t.length; e++) {
            var n = parseInt(t[e]) - 1;
            window.showCorrectImage(n)
        }
}

function StringBuffer() {
    this.buffer = []
}

function Utf8EncodeEnumerator(t) {
    this._input = t, this._index = -1, this._buffer = []
}

function Base64DecodeEnumerator(t) {
    this._input = t, this._index = -1, this._buffer = []
}
window.trace = function() {
        if (window.console && window.console.log)
            if (1 == arguments.length) console.log(arguments[0]);
            else try {
                console.log.apply(this, arguments)
            } catch (t) {
                console.log(arguments)
            }
    }, window.log = function() {
        var t = $("#console");
        t.length || (t = $('<div id="console"></div>'), t.css({
            position: "absolute",
            top: "0",
            left: "0",
            "z-index": "99999",
            direction: "ltr",
            "text-align": "left",
            "font-size": "10pt",
            color: "white",
            opacity: .4,
            "line-height": "1em",
            "pointer-events": "none"
        }), t.appendTo(document.body)), t.height() > 500 && t.html("");
        var e = $.makeArray(arguments).join(",");
        "" === e && (e = "[empty string]"), t.append('<pre style="display:inline; background:black; margin:0;">' + e + "</pre><br />")
    },
    function() {
        function t() {
            $(this).addClass(l == this ? "press" : "hover")
        }

        function e() {
            $(this).removeClass("hover press")
        }

        function n() {
            l = this;
            var t = $(this);
            t.removeClass("hover"), t.addClass("press"), t.on("mouseup", i), c.on("mouseup", o), c.on("mouseout", r)
        }

        function i() {
            var t = $(this);
            t.removeClass("press"), t.addClass("hover"), o()
        }

        function o() {
            $(l).off("mouseup", i), c.off("mouseup", o), c.off("mouseout", r), l = null
        }

        function r(t) {
            $(t.relatedTarget).is("iframe") && o(t)
        }

        function s(i) {
            i.on("mouseenter", t), i.on("mouseleave", e), i.on("mousedown", n)
        }

        function a(r) {
            r.off("mouseenter", t), r.off("mouseleave", e), r.off("mousedown", n), r.off("mouseup", i), c.off("mouseup", o)
        }
        var l, c = $(window);
        $.fn.extend({
            buttonize: function() {
                return this.each(function() {
                    s($(this)), $(this).css("cursor", "pointer")
                }), this
            },
            unbuttonize: function() {
                return this.each(function() {
                    a($(this)), $(this).css("cursor", "auto")
                }), this
            }
        })
    }();
var Window = function(t, e, n, i, o, r, s) {
    function a() {
        $("#window") && $("#window").remove(), y = $('<div id="window" class="modal fade in"></div>').appendTo("body"), n && y.width(n), i && y.height(i), y.append('<div class="modal-dialog"><div class="modal-content"></div></div>'), y.find(".modal-content").append("<div class='winTitle modal-header'><div class='winTitleText modal-title'>" + t + "</div></div>"), y.find(".modal-content").append("<div class='winContent modal-body'>" + e + "</div>"), y.find(".modal-content").append("<div class='modal-body-shadow'></div>"), $winHeader = y.find(".modal-header"), A = $("#chapter"), L = $("#lesson"), R = $("#discipline"), k = $(".science"), _ = $(".screen").find(".info"), S = y.find("video"), S.length && u(), b = y.find("#fontcolorsWrapper"), b.length && (T = $("body").find("#fontcolors").attr("id"), c()), C = y.find("#fontsWrapper"), C.length && (T = $("body").find("#fonts").attr("id"), l());
        var o = $("<div class='winClose close'><span aria-hidden='true'>&times;</span></div>").prependTo($winHeader);
        o.on("click", h), y.css("margin-left", Math.round(-n / 2)), y.css("margin-top", Math.round(-i / 2)), $(window.top).on("resize", p), $(window.top).on("orientationchange", p), p(), f(), g(!0)
    }

    function l() {
        y.find(".winContent").css("direction", "ltr"), y.find(".winContent").css("text-align", "left"), r && C.find("input[name='font']").eq(r).attr("checked", !0), C.find("input[name='font']").change(function() {
            r = $(this).val();
            var t = I[r];
            k.find(".sText").css("font-family", t), _.find(".infoText").css("font-family", t), A.css("font-family", t), R.css("font-family", t), L.css("font-family", t), s(r)
        })
    }

    function c() {
        r && b.find("input[name='fontcolors']").eq(r).attr("checked", !0), b.find("label").each(function(t) {
            var e = $(this);
            e.css("background-color", P[t].Background), e.css("color", P[t].Font)
        }), b.find("input[name='fontcolors']").change(function() {
            r = $(this).val();
            var t = P[r].Font,
                e = P[r].Background;
            k.css("background-color", e), k.find(".sText").css("color", t), _.css("background-color", e), _.find(".infoText").css("color", t), A.css("background-color", e), A.css("color", t), R.css("background-color", e), R.css("color", t), L.css("background-color", e), L.css("color", t)
        })
    }

    function u() {
        var t = S[0];
        S.prop("controls", !0), t.play(), 4 !== t.readyState && (t.addEventListener("canplaythrough", d, !1), t.addEventListener("load", d, !1), setTimeout(function() {
            t.pause()
        }, 1))
    }

    function d() {
        var t = S[0];
        t.removeEventListener("canplaythrough", d, !1), t.removeEventListener("load", d, !1), t.play()
    }

    function p() {
        var t = N.width(),
            e = N.height();
        if (t != w || e != O) {
            w = t, O = e;
            var n = y.width(),
                i = y.height();
            x = 1;
            var o = w / O,
                r = n / i;
            o > r ? i > O && (x = O / i) : n > w && (x = w / n), 1 == x ? y.css(J, "") : y.css(J, "scale(" + x + ", " + x + ")")
        }
    }

    function h() {
        g(!1), y.stop(), y.animate({
            opacity: 0
        }, {
            duration: 200,
            step: function(t) {
                var e = .9 + t / 10;
                e *= x, y.css(J, "scale(" + e + ", " + e + ")")
            },
            complete: v
        })
    }

    function f() {
        E.addClass("dark"), E.show(), y.stop(), y.css("opacity", 0), y.animate({
            opacity: 1
        }, {
            duration: 500,
            step: function(t) {
                var e = Math.sin(Math.PI + 3 * Math.PI * t);
                e = 1 + e / 10 * (1 - t), e *= x, y.css(J, "scale(" + e + ", " + e + ")")
            },
            complete: function() {
                1 == x && y.css(J, "")
            },
            easing: "linear"
        })
    }

    function g(t) {
        M.locked = t, t && (M.top = N.scrollTop(), m())
    }

    function m() {
        M.locked && (N.scrollTop(M.top), setTimeout(m, $.fx.interval))
    }

    function v() {
        if ($(window).off("resize", p), $(window).off("orientationchange", p), S.length) {
            var t = S[0];
            t.pause(), t.removeEventListener("canplaythrough", d, !1), t.removeEventListener("load", d, !1)
        }
        y.remove(), E.hide(), E.removeClass("dark"), o && (r ? o(T, r) : o())
    }
    void 0 == t && (t = ""), void 0 == e && (e = ""), (void 0 == n || "" == n || isNaN(n)) && (n = 400), (void 0 == i || "" == i || isNaN(i)) && (i = 0);
    var y, S, b, T, C, x, w, O, A, L, R, k, _, N = $(window),
        P = [{
            Background: "#FFFFFF",
            Font: "#000000"
        }, {
            Background: "#000000",
            Font: "#FFFFFF"
        }, {
            Background: "#EDED1C",
            Font: "#000000"
        }, {
            Background: "#000000",
            Font: "#EDED1C"
        }, {
            Background: "#EDED1C",
            Font: "#1C4DED"
        }, {
            Background: "#1C4DED",
            Font: "#EDED1C"
        }],
        I = ["arabic", "arial", "tahoma"],
        E = $("#ghost"),
        J = detectTransformProperty(),
        M = {
            top: 0,
            locked: !1
        };
    a()
};
document.all && document.documentMode <= 10 && $("body").addClass("ie11less");
var currentActivity = 0,
    noActivities = 0,
    WORDS = {
        name: ["Зовут: ", "Name: ", "Аты"],
        username: ["Имя пользователя ", "Username ", "Қолданушының аты"],
        save: ["Сохранить", "Save", "Сақтау"],
        help: ["Помощь", "Help", "Көмек"],
        refresh: ["Перезапуск", "Refresh", "Жаңарту"],
        contents: ["Оглавление", "Contents", "Мазмұны"],
        password: ["Пароль", "Password", "Құпия сөз"],
        cancel: ["Отменить", "Cancel", "Болдырмау"],
        ip: ["IP", "IP", "IP"],
        login: ["Вход в систему", "Login", "Жүйеге кіру"],
        failMessage: ["Ошибка аутентификации! Попробуй ещё раз!", "Authentification failed! Try again! ", "Аутентификацияда (сәйкестендіруде) қателік! Тағы да байқап көр!"],
        reset: ["Восстановить", "Reset", "Қалыпқа келтіру"],
        logoff: ["Выход из системы", "Log Off", "Жүйеден шығу"],
        copyright: ["ОРЦ, АОО НИШ. Все права защищены.", "ERC, AEO NIS. All rights reserved.", "ББРО, «НЗМ» ДББҰ. Барлық құқықтар қорғалған."]
    },
    lang;
$(function() {
    function t() {
        jQuery.fx.interval = 40, z = $(window), X = $("head"), Q = $("html"), Z = $("body"), rt = $(".screen"), Y = $("#chapter"), K = $("#lesson"), tt = $("#discipline"), Z.addClass(tt.attr("class")), Ht = $("#lesson").html(), Y.html(Ht);
        var t = "";
        switch (getLanguage()) {
            case "ru-RU":
                t = "rus";
                break;
            case "en-US":
                t = "eng";
                break;
            case "kk-KZ":
                t = "kaz";
                break;
            default:
                t = "eng"
        }
        "Win32" == Config.platform && (X.prepend("<link rel='icon' href='ael/images/favicon_" + tt.attr("class") + ".ico'  type='image/x-icon'/>"), X.prepend("<link rel='shortcut icon' href='ael/images/favicon_" + tt.attr("class") + ".ico'  type='image/x-icon'/>")), Z.addClass(t), Ct = detectTransformProperty(), At = null !== navigator.userAgent.match(/iPad/i), Lt = null !== navigator.userAgent.match(/OS ([7-9]|\d{2,})/i), Rt = null !== navigator.userAgent.match(/Safari/i) && null === navigator.userAgent.match(/Chrome|Chromium|CriOS/i), wt = At || navigator.userAgent.match(/MSIE [6789]/i), At && Z.addClass("iPad"), c(), u(), d();
        var n = new LessonManager;
        GLOBAL_LM = n, GLOBAL_LM.getIP2(), noActivities = $(".dot").length, GLOBAL_LM.lmTotalSubmoments = noActivities, GLOBAL_LM.lmCurrentDerIndex = 0, R(0), a(), e()
    }

    function e() {
        if ("Win32" == Config.platform) {
            var t = $("title");
//            t.html(Y.html() + (currentActivity + 1) + $("#lesson").html())
        }
    }

    function n() {
        $("#logo .btn-group").html("\n            <button id='bLogin' class='btn btn-sm'><span class='glyphicon glyphicon-lock' aria-hidden='true'></span> " + WORDS.login[lang] + "</button> \r\n        "), $("#bLogin").on("click", r)
    }

    function i() {
        $("#logo .btn-group").html("\n            <button id='bReset' class='btn btn-sm'><span class='glyphicon glyphicon-repeat' aria-hidden='true'></span> " + WORDS.reset[lang] + "</button> \r\n            <button id='bLogOff' class='btn btn-sm'><span class='glyphicon glyphicon-lock' aria-hidden='true'></span> " + WORDS.logoff[lang] + "</button> \r\n        "), $("#bReset").on("click", l), $("#bLogOff").on("click", s)
    }

    function o() {
        $("#logo .btn-group").html("\n            <button id='bReset' class='btn btn-sm'><span class='glyphicon glyphicon-repeat' aria-hidden='true'></span> " + WORDS.reset[lang] + "</button> \r\n        "), $("#bReset").on("click", l)
    }

    function r() {
        $("#ghostUser").show()
    }

    function s() {
        window.logOff(), hideCorrectImages(), $("#ipZone").empty(), Ut = !0
    }

    function a() {
        null != _t && void 0 != _t && clearTimeout(_t), _t = setTimeout(D, 5e3)
    }

    function l() {
        GLOBAL_LM.resetExtensionResults(), hideCorrectImages(), Ut = !0, window.tempFinished = !1, R(0), a(), GLOBAL_LM.bLearningPlatform === !0 && GLOBAL_LM.setBookmark(0)
    }

    function c() {
        vt = [];
        for (var t = 0; t < rt.length; t++) {
            var e = jQuery.extend({}, Nt),
                n = rt.eq(t);
            n.attr("ScienceLandscapeMin") && (e.ScienceLandscapeMin = Number(n.attr("ScienceLandscapeMin"))), n.attr("SciencePortraitMin") && (e.SciencePortraitMin = Number(n.attr("SciencePortraitMin"))), n.attr("AppletWidth") && (e.AppletWidth = Number(n.attr("AppletWidth"))), n.attr("AppletHeight") && (e.AppletHeight = Number(n.attr("AppletHeight"))), vt.push(e)
        }
    }



      scrollDiv = function(dir, px) {
       
        var scroller = document.getElementById('menu');
        if (dir == 1) {
            scroller.scrollLeft -= px;
            if (currentActivity!=0) {
                R(currentActivity - 1);
            }
            
        }
        else if (dir == 2) {
            scroller.scrollLeft += px;
            if (currentActivity != 3) {
                R(currentActivity + 1);
            }
        }
    }


    
    function u() {

        
        switch (getLanguage()) {
            case "ru-RU":
                lang = 0;
                break;
            case "en-US":
                lang = 1;
                break;
            case "kk-KZ":
                lang = 2;
                break;
            default:
                lang = 1
        }
        switch ("winapp" != Config.platform ? Z.prepend(" \r\n                <div id='backgroundElements'></div>\r\n\n                <div id='logo'><div> \r\n                          </div></div> \r\n               \n                <div id='topContainer'></div> \r\n\n                                           <div class='panel panel-background applet'> \r\n                                    <iframe class='embed-responsive-item iframe' src='' seamless='seamless' scrolling='no'></iframe> \r\n                    \n                    <div class='iframe-shadow info-collapsed'> \r\n                        <div id='info' class='panel panel-info'> \r\n                            <div class='infoText panel-body'></div> \r\n                            <div class='hide-info'>\n                                <span class='glyphicon glyphicon-chevron-up' aria-hidden='true'></span> \r\n                            </div> \r\n                        </div> \r\n                    </div> \r\n             <div id='menuContainer' class = 'menuCont'> \r\n  <img src = 'ael/images/arrow_left.png' class = 'leftArrow' onclick='scrollDiv(1, 250);'>              <div id='menu' > \r\n         <ul class='sContent list-group'></ul> \r\n               </div> \r\n         <img src = 'ael/images/arrow_right.png' class = 'rightArrow' onclick='scrollDiv(2, 250);'>         </div> \r\n\n                   <div id='toggleApplet'></div> \r\n    			</div> \r\n\n    			<div id='ghost' class='darkPortrait'></div> \r\n                <div id='ghostUser' class='darkPortrait'></div> \r\n                ") : ($(".s_new_header").append(WORDS.contents[lang]), $("#bHelp").append(WORDS.help[lang]), $("#bRefresh").append(WORDS.refresh[lang])), tt.attr("class")) {
            case "math":
            case "informatics":
                $("#backgroundElements").append("\r\n                    <div id='bgItem1'></div>\r\n                    <div id='bgItem2'></div>\r\n                ");
                break;
            case "arts":
                $("#menuContainer").append("\r\n        "), $("#backgroundElements").append("\r\n                    <div id='bgItem1'></div>\r\n                    <div id='bgItem2'></div>\r\n                    <div id='bgItem3'></div>\r\n                    <div id='bgItem4'></div>\r\n                    <div id='bgItem5'></div>\r\n                    <div id='bgItem6'></div>\r\n                ")
        }
        $("#topContainer").prepend($("#discipline")), $("#topContainer").prepend($("#chapter, #lesson")), ht = $('<div id="audioIcon"></div>'), ft = $('<div id="arrowIcon"></div>'), gt = $("#userNameWindow"), x(), ct = $("#info"), et = $("#menu"), $menuContainer = $("#menuContainer"), at = $("#menu"), dt = $(".applet"), lt = at.find(".sContent"), $(".screen .lesson").each(function(t) {
            var e = $(this);
            lt.append("<li class='dot list-group-item'>" + (t + 1) + "<div class='correctButton' id='correctImg" + t + "'></div></li>");
            var n = "#correctImg" + t;
            $(n).hide()
        }), nt = $(".sContent"), ot = $(".dot"), it = $("#ghost"), $ghost2 = $("#ghostUser"), $ghost2.append("<div id='userNameWindow'>\r\n                                <div id='userIp'><p id='ipZone'></p></div>\n                                <label id='userHolder'>" + WORDS.username[lang] + " <input id='userNameInput' class='form-control' type='text'/></label>\n                                <label id='passHolder'>" + WORDS.password[lang] + " <input id='passInput' class='form-control' type='password'/></label>                                \n                                <button id='bSave' class='menuButtonSave btn btn-success pull-right'><span class='glyphicon glyphicon-lock'></span> " + WORDS.login[lang] + "</button>\n                                <button id='bCancel' class='menuButtonCancel btn btn-danger'><span class='glyphicon glyphicon-remove'></span> " + WORDS.cancel[lang] + "</button></div>"), $ghost2.addClass("darkPortrait"), Config.overlay && null != Config.overlay && void 0 != Config.overlay && Z.append("<div id='beginOverlay'><br/>\n                     <div id='gradeO' class='overlayText'>" + $("#grade").html() + "</div><br/>\n                     <div id='subject' class='overlayText'>Математика</div><br/>\n                     <div id='nameL' class='overlayText'>" + Ht + "</div><br/>\n                     <div id='topicI' class='overlayText'>" + $("#topic").html() + "</div>\n                    <div id='copyright'>&#169; 2015 " + WORDS.copyright[lang] + "</div>\n                    </div>")
    }


    

    function d() {
        z.on("resize", h), z.on("orientationchange", h), z.on("touchmove selectstart dragstart MSGestureHold MSPointerMove pointermove", !1), z.on("scroll", g), z.on("message", G), $("#bHelp").on("click", m), $("#bRefresh").on("click", v), $("#bSave").on("click", y), $("#bCancel").on("click", S), $("#bLogin").on("click", r), Config.overlay && null != Config.overlay && void 0 != Config.overlay && ($("#beginOverlay").on("click", p), console.log("A adaugat!")), $("#menuBgLeft").children().each(function() {
            $(this).on("click", C)
        }), $("#toggleApplet").buttonize(), $("#toggleApplet").on("click", U), nt.on("mousedown", b), ot.on("mouseenter", M), ot.on("mouseleave", B), $("a").each(function() {
            var t = $(this);
            0 != t.attr("href").indexOf("http") && (t.on("click", onAnchorClick), t.buttonize())
        })
    }

    function p() {
        console.log("a intrat!"), $("#beginOverlay").hide()
    }

    function h() {
        (z.width() != bt || z.height() != Tt) && _()
    }

    function f() {
        var t = 0;
        return Lt && Rt && $(window).width() > $(window).height() && (t = 10), t
    }

    function g() {
        if (!Mt) {
            var t = f();
            return window.scrollTo(0, t), Mt = !0, setTimeout(function() {
                Mt = !1
            }, Et), !1
        }
    }

    function m() {
        var t = "helpWindow",
            e = WORDS.help[lang],
            n = "<img src='ael/images/helpWindow_" + getLanguage().substring(0, 2) + ".png'/>";
        V(t, 730, 575, e, n)
    }

    function v() {
        E(), k(), I(), $("#menuContainer").hasClass("inside") && C()
    }

    function y() {
        $("#userNameInput").val() && (Gt = $("#userNameInput").val(), Dt = !0, St = void 0, R(0), a(), GLOBAL_LM.authUserToREST($("#userNameInput").val(), $("#passInput").val()), $("#passInput").val(""))
    }

    function S() {
        $("#ghostUser").hide(), $("#ipZone").empty(), $("#userNameInput").val("")
    }

    function b(t) {
        var e = +new Date;
        if (Bt + Et > e) return void(t.pristineEvent || t).preventDefault();
        Bt = e, z.on("mouseup", T), nt.on("mouseleave", T);
        var n = $(t.target);
        n.hasClass("hover") && (n.removeClass("hover"), n.addClass("press"))
    }

    function T(t) {
        z.off("mouseleave", T), nt.off("mouseup", T);
        var e = $(t.target);
        e.hasClass("press") && (ot.removeClass("hover press selected"), e.addClass("selected"), R(e.index()), currentActivity = e.index(), GLOBAL_LM.bOnline === !0 && GLOBAL_LM.setBookmark(e.index()), a())
    }

    function C() {
        $("#menuContainer, .applet").toggleClass("inside"), $("#menuBgLeft .btn .glyphicon").toggleClass("glyphicon-forward glyphicon-backward")
    }

    function x() {
        $("audio").each(function() {
            var t = $(this);
            t.parent().addClass("audioText").on("click", w).data("audio", t.find("source").attr("src")), t.remove()
        })
    }

    function w(t) {
        mt = new Audio(t.target ? $(this).data("audio") : t), mt.addEventListener("ended", O), mt.play(), A(), q("onAudioOpen")
    }

    function O() {
        mt && (mt.pause(), mt.removeEventListener("ended", O), mt = null), L(), q("onAudioClose")
    }

    function A() {
        it.append(ht), it.stop(!0, !0), it.fadeIn(400), it.on("click", O)
    }

    function L() {
        ht.remove(), it.stop(!0, !0), it.hide(), it.off("click", O)
    }

    function R(t) {
        currentActivity = t, GLOBAL_LM.openSubmodule(currentActivity), void 0 == St ? (St = t, st = rt.eq(St), k(), I()) : St != t ? pt.animate({}, {
            duration: Pt,
            complete: function() {
                E(), St = t, st = rt.eq(St), k(), I()
            }
        }) : Ut = !1
    }

    function k() {
        yt = vt[St], pt = $($(".iframe")[0]), dt.prepend(pt), K.html(st.find(".lesson").html()), kt = pt[0].contentWindow, ot.removeClass("selected hover"), ot.eq(St).addClass("selected");
        var t = ct.find(".infoText");
        t.html(st.find(".info").html());
        var n = t.find(".log");
        n.stop(!0, !0).hide(), ut = n.eq(0), ut.show(), e(), ct.parent().removeClass("info-collapsed").addClass("info-expanded"), $("#window").remove(), _(), N(xt, !0), $(".iframe, .iframe-shadow").css({
            top: "",
            left: ""
        });
       
    }

    function _() {
        $("#window").remove(), $("#ghost").hide(), dt.removeAttr("style"), $menuContainer.removeAttr("style");
        var t = z.width(),
            e = z.height();
        It > t && (t = It), $t > e && (e = $t), bt = t, Tt = e;
        var n = yt.AppletWidth / yt.AppletHeight;
        if (Ot) {
            At && Z.removeClass("iPad");
            var i = t / e;
            return void N(n > i ? (t - 30) / yt.AppletWidth : (e - 30) / yt.AppletHeight)
        }
        At && Z.addClass("iPad"), Jt = 0, t / e > 2.05 ? (Z.addClass("widescreen"), Jt = dt.width(), n = dt.width() / dt.height(), Jt -= dt.width()) : Z.removeClass("widescreen"), $(".arts").length, !$(".arts").length, $(".menuButton").each(function() {
            "bSave" == $(this).attr("id") ? setTimeout(function() {
                $(this).css("font-size", $(this).width() / 7.5)
            }, 1) : $(this).css("font-size", $(this).width() / 7.5)
        }), j(), Ut = !1
    }

    function N(t, e) {
        xt = t, P(kt);
        var n = ($(window).width() - 700 * xt) / 2,
            i = ($(window).height() - 520 * xt) / 2;
        $(".iframe, .iframe-shadow").css(Ct, "scale(" + xt + ")"), $(".iframe, .iframe-shadow").css("left", n), $(".iframe, .iframe-shadow").css("top", i), g()
    }

    function P(t) {
        Lt || wt && t.postMessage('{"command":"scale","param":"' + xt + '"}', "*")
    }

    function I() {
        Dt && pt.attr("src", St + 1 + "/applet.html")
    }

    function E() {
        pt.attr("src", "")
    }

    function J() {
        P(kt), $(".iframe")[0].contentWindow.postMessage('{"command":"platform","param":"' + GLOBAL_LM.lmPlatform + '"}', "*")
    }

    function M() {
        var t = $(this);
        t.hasClass("selected") || t.addClass("hover")
    }

    function B() {
        $(this).removeClass("hover")
    }

    function G(t) {
        var e = t.originalEvent.data;
        e = e.replace(/\s/g, " ");
        var r = jQuery.parseJSON(e);
        switch (r.command) {
            case "info":
                ut.attr("id") != r.id && (ut.stop(!0, !0), ut.hide(), ut = ct.find("#" + r.id), ut.fadeTo(0, 0), ut.show(), $(".alphaInfo").html(ut.html()), _(), ut.fadeTo(2 * Pt, 1), W(ct), a());
                break;
            case "popup":
                q("onPopupOpen"), Window(r.title, r.content, r.width, r.height, H);
                break;
            case "loaded":
                J();
                break;
            case "openAudio":
                A();
                break;
            case "closeAudio":
                L();
                break;
            case "audio":
                w(r.path);
                break;
            case "showScreen":
                Ut = !0, R(parseInt(r.noScreen));
                var s = parseInt(r.noScreen) * $(".sViewport").height() / noActivities;
               
                break;
            case "markSubmoduleAsCompleted":
                GLOBAL_LM.bOnline ? GLOBAL_LM.markSubmoduleAsCompleted(currentActivity, r.type, r.score, r.questions) : showCorrectImage(currentActivity);
                break;
            case "showLogin":
                n();
                break;
            case "hideLogin":
                i();
                break;
            case "showReset":
                o();
                break;
            case "getDefaultActor":
                return q("onGetDefaultActor", Gt), Gt
        }
    }

    function D() {
        F(ct)
    }

    function H() {
        Mt = !1, g(), _(), q("onPopupClose")
    }



    

    function showHideMenuContainer(){
        var menu = document.getElementById("menuContainer");
       menu.style.visibility = "hidden";
    }

    function U() {
        
        dt.removeClass("transition"), Q.hasClass("fullApplet") ? (st.removeClass("topmost"), dt.removeClass("topmost"), Q.removeClass("fullApplet"), N(1, 1), $(".iframe, .iframe-shadow").css({
            top: "",
            left: ""
        }), Ot = !1) : (st.addClass("topmost"), dt.addClass("topmost"), Q.addClass("fullApplet"), Ot = !0, $(".iframe, .iframe-shadow").css({
            left: "50%"
        })), _();
        hideMenuContainer();

    }

    function j() {}

    function V(t, e, n, i, o) {
        var r = $("#" + t),
            i = i || r.attr("title"),
            o = o || r.html();
        q("onPopupOpen"), Window(i, o, e, n, H)
    }

    function q(t, e) {
        kt.postMessage('{"command":"' + t + '","param":"' + e + '"}', "*")
    }

    function W(t) {
        t.parent().removeClass("info-collapsed").addClass("info-expanded")
    }

    function F(t) {
        t.parent().toggleClass("info-collapsed info-expanded")
    }
    var z, X, Q, Z, Y, K, tt, et, nt, it, ot, ot, rt, st, at, lt, ct, ut, dt, pt, ht, ft, gt, mt, vt, yt, St, bt, Tt, Ct, xt, xt, wt, Ot, At, Lt, Rt, kt, _t, Nt = {
            ScienceLandscapeMin: 256,
            SciencePortraitMin: 200,
            AppletWidth: 700,
            AppletHeight: 520
        },
        Pt = 200,
        It = 300,
        $t = 300,
        Et = 1e3,
        Jt = 0,
        Mt = !1,
        Bt = 0,
        Gt = "ML",
        Dt = !0,
        Ht = "",
        Ut = !1;
    t(), $(document).ready(function() {}), ct.on("click", function() {
        F($(this))
    })
});
var resetAppeared = !1,
    tempFinished = !1,
    oldLmExtensionResult = "";
window.addEventListener("beforeunload", function(t) {
    var e = "";
    if (GLOBAL_LM.bOnline) {
        (t || window.event).returnValue = e;
        try {
            tempFinished || saveStateAndSend()
        } catch (t) {} finally {
            return e
        }
        return e
    }
});
var GLOBAL_LM, LessonManager = function() {
    this.lmActivityID = Config.homepage + "/" + Config.activityId, this.lmUsername = "", this.tincan = null, this.lmEndPoint = "", this.lmTincanUsername = "", this.lmTincanPassword = "", this.bOnline = !1, this.localStorageStatements = this.localStorageStatements || [], this.bLearningPlatform = !1, this.authRestEndpoint = Config.authRestEndpoint, this.lmIpAdress = "", this.lmHomepage = Config.homepage, this.lmLanguage = Config.language, this.lmSessionStartTimeStamp = new Date, this.lmCurrentActivityTempTimestamp = new Date, this.lmCachedSubmomentDuration = 0, this.lmPlatform = "Win32" == Config.platform ? "webapp" : Config.platform, this.lmTotalSubmoments = -1, this.completed = !1, this.lmExtensionsResult = {
        result: {
            duration: "",
            completion: "",
            extensions: {
                "http://id.tincanapi.com/extension/submodules": []
            }
        }
    }, this.lmCurrentDerIndex = -1
};
LessonManager.prototype = {
    resetExtensionResults: function() {
        this.lmCurrentDerIndex = -1, this.lmExtensionsResult = {
            result: {
                duration: "",
                completion: "",
                extensions: {
                    "http://id.tincanapi.com/extension/submodules": []
                }
            }
        }
    },
    checkIfTincanOnline: function() {},
    getIP2: function(t) {
        var e = $.ajax({
            url: "https://api.ipify.org?format=jsonp",
            dataType: "jsonp",
            timeout: 3e3,
            cache: "false"
        });
        e.success(function(t) {
            GLOBAL_LM.lmIpAdress = t.ip, GLOBAL_LM.checkUrlForConfig()
        }), e.error(function() {
            GLOBAL_LM.lmIpAdress = "", GLOBAL_LM.checkUrlForConfig()
        })
    },
    getIP: function() {
        $.ajax({
            async: !1,
            dataType: "json",
            url: "https://api.ipify.org?format=jsonp",
            success: function(t) {
                this.lmIpAdress = t
            }
        })
    },
    authUserToREST: function(t, e) {
        try {
            $.ajax({
                url: this.authRestEndpoint,
                data: {
                    username: t,
                    password: e
                },
                timeout: 5e3
            }).success(function(t) {
                GLOBAL_LM.lmEndPoint = t.endpoint;
                var e = CryptoJS.enc.Base64.parse(t.token),
                    n = e.toString(CryptoJS.enc.Utf8),
                    i = n.split(":");
                GLOBAL_LM.lmTincanUsername = i[0], GLOBAL_LM.lmTincanPassword = i[1], GLOBAL_LM.lmUsername = t.name, GLOBAL_LM.homePage = t.homePage, GLOBAL_LM.initTincan(), GLOBAL_LM.sendLaunchedStatement()
            }).fail(function(t, e) {
                $("#ipZone").empty(), $("#ipZone").append(window.WORDS.failMessage[lang])
            }).always(function() {})
        } catch (n) {}
    },
    checkIfRestWorksWithPing: function() {},
    checkUrlForConfig: function() {
        var t = window.location.href,
            e = decodeURIComponent(t),
            n = gup("endpoint", e);
        if (null === n) this.bLearningPlatform = !1, window.parent.postMessage('{"command":"showLogin"}', "*");
        else try {
            window.parent.postMessage('{"command":"showReset"}', "*"), resetAppeared = !0, userNameSet = !0, this.lmEndPoint = n;
            var i = gup("auth", e),
                o = CryptoJS.enc.Base64.parse(i),
                r = o.toString(CryptoJS.enc.Utf8),
                s = r.split(":");
            this.lmTincanUsername = s[0], this.lmTincanPassword = s[1];
            var a = JSON.parse(gup("actor", e));
            GLOBAL_LM.lmUsername = a.account.name;
            var l = JSON.parse(gup("activity_id", e));
            GLOBAL_LM.lmActivityID = l.id, this.bLearningPlatform = !0, GLOBAL_LM.initTincan(), GLOBAL_LM.sendLaunchedStatement()
        } catch (c) {
            this.bLearningPlatform = !1
        }
    },
    deleteLocalStorageStatement: function(t) {
        if (supports_html5_storage()) {
            var e = e || [];
            if (void 0 != localStorage) var n = JSON.parse(localStorage.getItem("derOfflineStatements"));
            if (null === n) return;
            for (var i = n.length, o = null, r = 0; i > r; r++) o = n[r], o.statement.id != t && e.push(o);
            window.localStorage.setItem("derOfflineStatements", JSON.stringify(e))
        }
    },
    sendOfflineStatements: function() {
        if (supports_html5_storage()) {
            if (void 0 != localStorage) var t = JSON.parse(localStorage.getItem("derOfflineStatements"));
            if (null === t) return;
            for (var e = t.length, n = null, i = 0; e > i; i++) n = t[i], this.sendQueuedStatement(n)
        } else console.log("no offline support")
    },
    getAttemptDuration: function() {
        return this.lmCachedSubmomentDuration + this.getSessionDuration()
    },
    getSessionDuration: function() {
        return Math.abs(new Date - this.lmSessionStartTimeStamp)
    },
    getCurrentActivityDuration: function() {
        return Math.abs(new Date - this.lmCurrentActivityTempTimestamp)
    },
    convertDurationToTincan: function(t) {
        return TinCan.Utils.convertMillisecondsToISO8601Duration(t)
    },
    sendQueuedStatement: function(t) {
        var e = this.tincan.actor,
            n = this.tincan.activity,
            i = this.tincan.timestamp;
        this.tincan.actor.name = t.actor.name;
        ({
            verb: {
                id: t.statement.verb.id.toString()
            },
            object: {
                id: t.statement.object.id
            },
            timestamp: t.timestamp
        });
        this.tincan.sendStatement(t.statement, function(t, e) {
            var n = gup("statementId", t[0].xhr.responseURL);
            null === t[0].err ? GLOBAL_LM.deleteLocalStorageStatement(n) : (console.log(t), GLOBAL_LM.deleteLocalStorageStatement(400 === t[0].err ? n : n))
        }), this.tincan.actor = e, this.tincan.activity = n, this.tincan.timestamp = i
    },
    getTotalTime: function() {
        var t = 0,
            e = this.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"].length;
        for (i = 0; i < e; i++) {
            var n = this.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"][i].data.duration;

            "" != n && (t += TinCan.Utils.convertISO8601DurationToMilliseconds(n))
        }
        return TinCan.Utils.convertMillisecondsToISO8601Duration(t)
    },
    sendCompletedStatement: function() {
        if (oldLmExtensionResult != JSON.stringify(this.lmExtensionsResult)) {
            this.lmExtensionsResult.result.completion = this.completed, this.lmExtensionsResult.result.duration = this.getTotalTime();
            var t = TinCan.Utils.getUUID(),
                e = {
                    id: t,
                    verb: {
                        id: "http://adlnet.gov/expapi/verbs/completed"
                    },
                    result: this.lmExtensionsResult.result,
                    object: {
                        id: this.lmActivityID
                    },
                    context: {
                        platform: this.lmPlatform,
                        language: this.lmLanguage,
                        extensions: {
                            "http://id.tincanapi.com/extension/browser-info": {
                                code_name: navigator.appCodeName,
                                version: navigator.appVersion,
                                name: navigator.appName,
                                version: navigator.appVersion,
                                platform: navigator.platform,
                                "cookies-enabled": navigator.cookieEnabled,
                                "user-agent-header": navigator.userAgent
                            },
                            "http://id.tincanapi.com/extension/ip-address": this.lmIpAdress
                        }
                    }
                };
            this.tincan.sendStatement(e, function(t, e) {
                null === t[0].err && (oldLmExtensionResult = JSON.stringify(GLOBAL_LM.lmExtensionsResult))
            })
        }
    },
    sendLaunchedStatement: function() {
        var t = TinCan.Utils.getUUID(),
            e = {
                id: t,
                verb: {
                    id: "http://adlnet.gov/expapi/verbs/launched"
                },
                object: {
                    id: this.lmActivityID
                },
                context: {
                    platform: this.lmPlatform,
                    language: this.lmLanguage,
                    extensions: {
                        "http://id.tincanapi.com/extension/browser-info": {
                            code_name: navigator.appCodeName,
                            version: navigator.appVersion,
                            name: navigator.appName,
                            version: navigator.appVersion,
                            platform: navigator.platform,
                            "cookies-enabled": navigator.cookieEnabled,
                            "user-agent-header": navigator.userAgent
                        },
                        "http://id.tincanapi.com/extension/ip-address": this.lmIpAdress
                    }
                }
            };
        this.tincan.activity.id = this.lmActivityID;
        var n = this.tincan.actor,
            i = this.tincan.activity,
            o = this.localStorageStatements || [];
        this.tincan.actor = new TinCan.Agent({
            objectType: "Agent",
            account: {
                name: this.lmUsername,
                homePage: this.lmHomepage
            }
        }), this.tincan.sendStatement(e, function(t, r) {
            if (null === t[0].err) GLOBAL_LM.bOnline = !0, GLOBAL_LM.bLearningPlatform = !0, this.bOnline && GLOBAL_LM.sendOfflineStatements(), GLOBAL_LM.resetExtensionResults(), GLOBAL_LM.loadBookmark();
            else if (400 === t[0].err);
            else {
                var s = {
                    actor: n,
                    activity: i,
                    statement: e,
                    timestamp: TinCan.Utils.getISODateString(new Date)
                };
                o.push(s), window.localStorage.setItem("derOfflineStatements", JSON.stringify(o))
            }
        })
    },
    loadActivityFromJSON: function() {
        this.lmActivityID = Config.activityId, this.lmEndPoint = Config.endpoint, this.lmTincanUsername = Config.authUser, this.lmTincanPassword = Config.authPassword, this.lmEndPoint = Config.endpoint
    },
    initTincan: function() {
        try {
            supports_html5_storage() && (this.localStorageStatements = JSON.parse(window.localStorage.getItem("derOfflineStatements")));
            var t = (this.lmActivityID, {
                    id: this.lmActivityID
                }),
                e = TinCan.Utils.getISODateString(new Date);
            this.tincan = new TinCan({
                recordStores: [{
                    endpoint: this.lmEndPoint,
                    username: this.lmTincanUsername,
                    password: this.lmTincanPassword,
                    allowFail: !1
                }],
                activity: t,
                timestamp: e
            }), this.tincan.actor = new TinCan.Agent({
                name: this.lmUsername
            })
        } catch (n) {}
    },
    getEnvironment: function() {},
    promptUserName: function() {
        this.lmUsername = window.prompt("Username:", "Write it here")
    },
    promptActivityId: function() {
        this.lmActivityID = window.prompt("ActivityID", "Write it here")
    },
    setBookmark: function(t, e) {
        if (this.bOnline) {
            var n = {
                location: t
            };
            this.tincan.setState("derIndex", n, {
                contentType: "application/json",
                overwriteJSON: !0,
                callback: e
            })
        }
    },
    getCompletedSubmodules: function() {
        var t = [],
            e = this.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"].length;
        for (i = 0; i < e; i++) this.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"][i].data.completion === !0 && t.push(this.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"][i].name.replace("sm", ""));
        return t
    },
    markSubmoduleAsCompleted: function(t, e, n, i) {
        var o = arrayObjectIndexOf(this.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"], "sm" + (t + 1).toString(), "name"); - 1 == o || tempFinished || (this.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"][o].data.completion === !1 && (this.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"][o].data.completion = !0, this.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"][o].data.duration = this.convertDurationToTincan(this.getCurrentActivityDuration()), "" != e && (this.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"][o].data.type = e), null != n && (this.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"][o].data.score = n), null != i && (this.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"][o].data.questions = i)), GLOBAL_LM.getCompletedSubmodules().length == GLOBAL_LM.lmTotalSubmoments && -1 != GLOBAL_LM.lmTotalSubmoments && (GLOBAL_LM.tincan.deleteState("tempState"), GLOBAL_LM.completed = !0, GLOBAL_LM.saveLessonState(), GLOBAL_LM.sendCompletedStatement(), tempFinished = !0)), markCompletedSubmodules()
    },
    openSubmodule: function(t) {
        if (-1 != this.lmCurrentDerIndex) {
            var e = arrayObjectIndexOf(this.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"], "sm" + (this.lmCurrentDerIndex + 1).toString(), "name"); - 1 != e && 0 == this.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"][e].data.completion && (this.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"][e].data.duration = this.convertDurationToTincan(this.getCurrentActivityDuration()))
        }
        var e = arrayObjectIndexOf(this.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"], "sm" + (t + 1).toString(), "name");
        if (-1 === e) {
            var n = {
                name: "sm" + (t + 1).toString(),
                data: {
                    type: "multimedia",
                    completion: !1,
                    duration: "",
                    score: "NA",
                    questions: "NA"
                }
            };
            this.lmExtensionsResult.result.extensions["http://id.tincanapi.com/extension/submodules"].push(n)
        }
        this.lmCurrentDerIndex = t, this.lmCurrentActivityTempTimestamp = new Date
    },
    saveLessonState: function(t, e) {
        if (this.bOnline) {
            var n = JSON.stringify(this.lmExtensionsResult);
            this.tincan.setState("tempState", n, {
                contentType: "application/json",
                overwriteJSON: !0,
                callback: e
            })
        }
    },
    loadBookmark: function(t) {
        this.tincan.activityId = Config.activityId;
        var e = this.tincan.getState("derIndex"),
            n = this.tincan.getState("tempState"),
            i = JSON.parse(e.xhr.responseText);
        if (null != i) var o = JSON.parse(n.xhr.responseText);
        null != o && void 0 === o.error && (this.lmExtensionsResult = o), manageLoadedBookmark(e)
    }
}, window.tincanSeverReachable = !1;
var CryptoJS = CryptoJS || function(t, e) {
    var n = {},
        i = n.lib = {},
        o = i.Base = function() {
            function t() {}
            return {
                extend: function(e) {
                    t.prototype = this;
                    var n = new t;
                    return e && n.mixIn(e), n.$super = this, n
                },
                create: function() {
                    var t = this.extend();
                    return t.init.apply(t, arguments), t
                },
                init: function() {},
                mixIn: function(t) {
                    for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                    t.hasOwnProperty("toString") && (this.toString = t.toString)
                },
                clone: function() {
                    return this.$super.extend(this)
                }
            }
        }(),
        r = i.WordArray = o.extend({
            init: function(t, n) {
                t = this.words = t || [], this.sigBytes = n != e ? n : 4 * t.length
            },
            toString: function(t) {
                return (t || a).stringify(this)
            },
            concat: function(t) {
                var e = this.words,
                    n = t.words,
                    i = this.sigBytes,
                    t = t.sigBytes;
                if (this.clamp(), i % 4)
                    for (var o = 0; t > o; o++) e[i + o >>> 2] |= (n[o >>> 2] >>> 24 - 8 * (o % 4) & 255) << 24 - 8 * ((i + o) % 4);
                else if (65535 < n.length)
                    for (o = 0; t > o; o += 4) e[i + o >>> 2] = n[o >>> 2];
                else e.push.apply(e, n);
                return this.sigBytes += t, this
            },
            clamp: function() {
                var e = this.words,
                    n = this.sigBytes;
                e[n >>> 2] &= 4294967295 << 32 - 8 * (n % 4), e.length = t.ceil(n / 4)
            },
            clone: function() {
                var t = o.clone.call(this);
                return t.words = this.words.slice(0), t
            },
            random: function(e) {
                for (var n = [], i = 0; e > i; i += 4) n.push(4294967296 * t.random() | 0);
                return r.create(n, e)
            }
        }),
        s = n.enc = {},
        a = s.Hex = {
            stringify: function(t) {
                for (var e = t.words, t = t.sigBytes, n = [], i = 0; t > i; i++) {
                    var o = e[i >>> 2] >>> 24 - 8 * (i % 4) & 255;
                    n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16))
                }
                return n.join("")
            },
            parse: function(t) {
                for (var e = t.length, n = [], i = 0; e > i; i += 2) n[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - 4 * (i % 8);
                return r.create(n, e / 2)
            }
        },
        l = s.Latin1 = {
            stringify: function(t) {
                for (var e = t.words, t = t.sigBytes, n = [], i = 0; t > i; i++) n.push(String.fromCharCode(e[i >>> 2] >>> 24 - 8 * (i % 4) & 255));
                return n.join("")
            },
            parse: function(t) {
                for (var e = t.length, n = [], i = 0; e > i; i++) n[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - 8 * (i % 4);
                return r.create(n, e)
            }
        },
        c = s.Utf8 = {
            stringify: function(t) {
                try {
                    return decodeURIComponent(escape(l.stringify(t)))
                } catch (e) {
                    throw Error("Malformed UTF-8 data")
                }
            },
            parse: function(t) {
                return l.parse(unescape(encodeURIComponent(t)))
            }
        },
        u = i.BufferedBlockAlgorithm = o.extend({
            reset: function() {
                this._data = r.create(), this._nDataBytes = 0
            },
            _append: function(t) {
                "string" == typeof t && (t = c.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes
            },
            _process: function(e) {
                var n = this._data,
                    i = n.words,
                    o = n.sigBytes,
                    s = this.blockSize,
                    a = o / (4 * s),
                    a = e ? t.ceil(a) : t.max((0 | a) - this._minBufferSize, 0),
                    e = a * s,
                    o = t.min(4 * e, o);
                if (e) {
                    for (var l = 0; e > l; l += s) this._doProcessBlock(i, l);
                    l = i.splice(0, e), n.sigBytes -= o
                }
                return r.create(l, o)
            },
            clone: function() {
                var t = o.clone.call(this);
                return t._data = this._data.clone(), t
            },
            _minBufferSize: 0
        });
    i.Hasher = u.extend({
        init: function() {
            this.reset()
        },
        reset: function() {
            u.reset.call(this), this._doReset()
        },
        update: function(t) {
            return this._append(t), this._process(), this
        },
        finalize: function(t) {
            return t && this._append(t), this._doFinalize(), this._hash
        },
        clone: function() {
            var t = u.clone.call(this);
            return t._hash = this._hash.clone(), t
        },
        blockSize: 16,
        _createHelper: function(t) {
            return function(e, n) {
                return t.create(n).finalize(e)
            }
        },
        _createHmacHelper: function(t) {
            return function(e, n) {
                return d.HMAC.create(t, n).finalize(e)
            }
        }
    });
    var d = n.algo = {};
    return n
}(Math);
! function() {
    var t = CryptoJS,
        e = t.lib,
        n = e.WordArray,
        e = e.Hasher,
        i = [],
        o = t.algo.SHA1 = e.extend({
            _doReset: function() {
                this._hash = n.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
            },
            _doProcessBlock: function(t, e) {
                for (var n = this._hash.words, o = n[0], r = n[1], s = n[2], a = n[3], l = n[4], c = 0; 80 > c; c++) {
                    if (16 > c) i[c] = 0 | t[e + c];
                    else {
                        var u = i[c - 3] ^ i[c - 8] ^ i[c - 14] ^ i[c - 16];
                        i[c] = u << 1 | u >>> 31
                    }
                    u = (o << 5 | o >>> 27) + l + i[c], u = 20 > c ? u + ((r & s | ~r & a) + 1518500249) : 40 > c ? u + ((r ^ s ^ a) + 1859775393) : 60 > c ? u + ((r & s | r & a | s & a) - 1894007588) : u + ((r ^ s ^ a) - 899497514), l = a, a = s, s = r << 30 | r >>> 2, r = o, o = u
                }
                n[0] = n[0] + o | 0, n[1] = n[1] + r | 0, n[2] = n[2] + s | 0, n[3] = n[3] + a | 0, n[4] = n[4] + l | 0
            },
            _doFinalize: function() {
                var t = this._data,
                    e = t.words,
                    n = 8 * this._nDataBytes,
                    i = 8 * t.sigBytes;
                e[i >>> 5] |= 128 << 24 - i % 32, e[(i + 64 >>> 9 << 4) + 15] = n, t.sigBytes = 4 * e.length, this._process()
            }
        });
    t.SHA1 = e._createHelper(o), t.HmacSHA1 = e._createHmacHelper(o)
}(),
function() {
    {
        var t = CryptoJS,
            e = t.lib,
            n = e.WordArray,
            i = t.enc;
        i.Base64 = {
            stringify: function(t) {
                var e = t.words,
                    n = t.sigBytes,
                    i = this._map;
                t.clamp();
                for (var o = [], r = 0; n > r; r += 3)
                    for (var s = e[r >>> 2] >>> 24 - r % 4 * 8 & 255, a = e[r + 1 >>> 2] >>> 24 - (r + 1) % 4 * 8 & 255, l = e[r + 2 >>> 2] >>> 24 - (r + 2) % 4 * 8 & 255, c = s << 16 | a << 8 | l, u = 0; 4 > u && n > r + .75 * u; u++) o.push(i.charAt(c >>> 6 * (3 - u) & 63));
                var d = i.charAt(64);
                if (d)
                    for (; o.length % 4;) o.push(d);
                return o.join("")
            },
            parse: function(t) {
                t = t.replace(/\s/g, "");
                var e = t.length,
                    i = this._map,
                    o = i.charAt(64);
                if (o) {
                    var r = t.indexOf(o); - 1 != r && (e = r)
                }
                for (var s = [], a = 0, l = 0; e > l; l++)
                    if (l % 4) {
                        var c = i.indexOf(t.charAt(l - 1)) << l % 4 * 2,
                            u = i.indexOf(t.charAt(l)) >>> 6 - l % 4 * 2;
                        s[a >>> 2] |= (c | u) << 24 - a % 4 * 8, a++
                    }
                return n.create(s, a)
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        }
    }
}();
var TinCan;
! function() {
    "use strict";
    var t = {
        statementId: !0,
        voidedStatementId: !0,
        verb: !0,
        object: !0,
        registration: !0,
        context: !0,
        actor: !0,
        since: !0,
        until: !0,
        limit: !0,
        authoritative: !0,
        sparse: !0,
        instructor: !0,
        ascending: !0,
        continueToken: !0,
        agent: !0,
        activityId: !0,
        stateId: !0,
        profileId: !0,
        activity_platform: !0,
        grouping: !0,
        "Accept-Language": !0
    };
    TinCan = function(t) {
        this.log("constructor"), this.recordStores = [], this.actor = null, this.activity = null, this.registration = null, this.context = null, this.init(t)
    }, TinCan.prototype = {
        LOG_SRC: "TinCan",
        log: function(t, e) {
            TinCan.DEBUG && "undefined" != typeof console && console.log && (e = e || this.LOG_SRC || "TinCan", console.log("TinCan." + e + ": " + t))
        },
        init: function(t) {
            this.log("init");
            var e;
            if (t = t || {}, t.hasOwnProperty("url") && "" !== t.url && this._initFromQueryString(t.url), t.hasOwnProperty("recordStores") && void 0 !== t.recordStores)
                for (e = 0; e < t.recordStores.length; e += 1) this.addRecordStore(t.recordStores[e]);
            t.hasOwnProperty("activity") && (this.activity = t.activity instanceof TinCan.Activity ? t.activity : new TinCan.Activity(t.activity)), t.hasOwnProperty("actor") && (this.actor = t.actor instanceof TinCan.Agent ? t.actor : new TinCan.Agent(t.actor)), t.hasOwnProperty("context") && (this.context = t.context instanceof TinCan.Context ? t.context : new TinCan.Context(t.context)), t.hasOwnProperty("registration") && (this.registration = t.registration)
        },
        _initFromQueryString: function(e) {
            this.log("_initFromQueryString");
            var n, i, o, r = TinCan.Utils.parseURL(e).params,
                s = ["endpoint", "auth"],
                a = {},
                l = null;
            if (r.hasOwnProperty("actor")) {
                this.log("_initFromQueryString - found actor: " + r.actor);
                try {
                    this.actor = TinCan.Agent.fromJSON(r.actor), delete r.actor
                } catch (c) {
                    this.log("_initFromQueryString - failed to set actor: " + c)
                }
            }
            if (r.hasOwnProperty("activity_id") && (this.activity = new TinCan.Activity({
                    id: r.activity_id
                }), delete r.activity_id), (r.hasOwnProperty("activity_platform") || r.hasOwnProperty("registration") || r.hasOwnProperty("grouping")) && (o = {}, r.hasOwnProperty("activity_platform") && (o.platform = r.activity_platform, delete r.activity_platform), r.hasOwnProperty("registration") && (o.registration = this.registration = r.registration, delete r.registration), r.hasOwnProperty("grouping") && (o.contextActivities = {}, o.contextActivities.grouping = r.grouping, delete r.grouping), this.context = new TinCan.Context(o)), r.hasOwnProperty("endpoint")) {
                for (n = 0; n < s.length; n += 1) i = s[n], r.hasOwnProperty(i) && (a[i] = r[i], delete r[i]);
                for (n in r) r.hasOwnProperty(n) && (t.hasOwnProperty(n) ? delete r[n] : (l = l || {}, l[n] = r[n]));
                null !== l && (a.extended = l), a.allowFail = !1, this.addRecordStore(a)
            }
        },
        addRecordStore: function(t) {
            this.log("addRecordStore");
            var e;
            e = t instanceof TinCan.LRS ? t : new TinCan.LRS(t), this.recordStores.push(e)
        },
        prepareStatement: function(t) {
            return this.log("prepareStatement"), t instanceof TinCan.Statement || (t = new TinCan.Statement(t)), null === t.actor && null !== this.actor && (t.actor = this.actor), null === t.target && null !== this.activity && (t.target = this.activity), null !== this.context && (null === t.context ? t.context = this.context : (null === t.context.registration && (t.context.registration = this.context.registration), null === t.context.platform && (t.context.platform = this.context.platform), null !== this.context.contextActivities && (null === t.context.contextActivities ? t.context.contextActivities = this.context.contextActivities : (null !== this.context.contextActivities.grouping && null === t.context.contextActivities.grouping && (t.context.contextActivities.grouping = this.context.contextActivities.grouping), null !== this.context.contextActivities.parent && null === t.context.contextActivities.parent && (t.context.contextActivities.parent = this.context.contextActivities.parent), null !== this.context.contextActivities.other && null === t.context.contextActivities.other && (t.context.contextActivities.other = this.context.contextActivities.other))))), t
        },
        sendStatement: function(t, e) {
            this.log("sendStatement");
            var n, i, o, r = this,
                s = this.prepareStatement(t),
                a = this.recordStores.length,
                l = [],
                c = [];
            if (a > 0)
                for ("function" == typeof e && (o = function(t, n) {
                        var i;
                        r.log("sendStatement - callbackWrapper: " + a), a > 1 ? (a -= 1, c.push({
                            err: t,
                            xhr: n
                        })) : 1 === a ? (c.push({
                            err: t,
                            xhr: n
                        }), i = [c, s], e.apply(this, i)) : r.log("sendStatement - unexpected record store count: " + a)
                    }), i = 0; a > i; i += 1) n = this.recordStores[i], l.push(n.saveStatement(s, {
                    callback: o
                }));
            else this.log("[warning] sendStatement: No LRSs added yet (statement not sent)"), "function" == typeof e && e.apply(this, [null, s]);
            return {
                statement: s,
                results: l
            }
        },
        getStatement: function(t, e) {
            this.log("getStatement");
            var n;
            return this.recordStores.length > 0 ? (n = this.recordStores[0], n.retrieveStatement(t, {
                callback: e
            })) : void this.log("[warning] getStatement: No LRSs added yet (statement not retrieved)")
        },
        voidStatement: function(t, e, n) {
            this.log("voidStatement");
            var i, o, r, s, a, l = this,
                c = this.recordStores.length,
                u = [],
                d = [];
            if (t instanceof TinCan.Statement && (t = t.id), "undefined" != typeof n.actor ? o = n.actor : null !== this.actor && (o = this.actor), r = new TinCan.Statement({
                    actor: o,
                    verb: {
                        id: "http://adlnet.gov/expapi/verbs/voided"
                    },
                    target: {
                        objectType: "StatementRef",
                        id: t
                    }
                }), c > 0)
                for ("function" == typeof e && (a = function(t, n) {
                        var i;
                        l.log("voidStatement - callbackWrapper: " + c), c > 1 ? (c -= 1, d.push({
                            err: t,
                            xhr: n
                        })) : 1 === c ? (d.push({
                            err: t,
                            xhr: n
                        }), i = [d, r], e.apply(this, i)) : l.log("voidStatement - unexpected record store count: " + c)
                    }), s = 0; c > s; s += 1) i = this.recordStores[s], u.push(i.saveStatement(r, {
                    callback: a
                }));
            else this.log("[warning] voidStatement: No LRSs added yet (statement not sent)"), "function" == typeof e && e.apply(this, [null, r]);
            return {
                statement: r,
                results: u
            }
        },
        getVoidedStatement: function(t, e) {
            this.log("getVoidedStatement");
            var n;
            return this.recordStores.length > 0 ? (n = this.recordStores[0], n.retrieveVoidedStatement(t, {
                callback: e
            })) : void this.log("[warning] getVoidedStatement: No LRSs added yet (statement not retrieved)")
        },
        sendStatements: function(t, e) {
            this.log("sendStatements");
            var n, i, o, r = this,
                s = [],
                a = this.recordStores.length,
                l = [],
                c = [];
            if (0 === t.length) "function" == typeof e && e.apply(this, [null, s]);
            else {
                for (i = 0; i < t.length; i += 1) s.push(this.prepareStatement(t[i]));
                if (a > 0)
                    for ("function" == typeof e && (o = function(t, n) {
                            var i;
                            r.log("sendStatements - callbackWrapper: " + a), a > 1 ? (a -= 1, c.push({
                                err: t,
                                xhr: n
                            })) : 1 === a ? (c.push({
                                err: t,
                                xhr: n
                            }), i = [c, s], e.apply(this, i)) : r.log("sendStatements - unexpected record store count: " + a)
                        }), i = 0; a > i; i += 1) n = this.recordStores[i], l.push(n.saveStatements(s, {
                        callback: o
                    }));
                else this.log("[warning] sendStatements: No LRSs added yet (statements not sent)"), "function" == typeof e && e.apply(this, [null, s])
            }
            return {
                statements: s,
                results: l
            }
        },
        getStatements: function(t) {
            this.log("getStatements");
            var e, n, i = {};
            return this.recordStores.length > 0 ? (e = this.recordStores[0], t = t || {}, n = t.params || {}, t.sendActor && null !== this.actor && ("0.9" === e.version || "0.95" === e.version ? n.actor = this.actor : n.agent = this.actor), t.sendActivity && null !== this.activity && ("0.9" === e.version || "0.95" === e.version ? n.target = this.activity : n.activity = this.activity), "undefined" == typeof n.registration && null !== this.registration && (n.registration = this.registration), i = {
                params: n
            }, "undefined" != typeof t.callback && (i.callback = t.callback), e.queryStatements(i)) : void this.log("[warning] getStatements: No LRSs added yet (statements not read)")
        },
        getState: function(t, e) {
            this.log("getState");
            var n, i;
            return this.recordStores.length > 0 ? (i = this.recordStores[0], e = e || {}, n = {
                agent: "undefined" != typeof e.agent ? e.agent : this.actor,
                activity: "undefined" != typeof e.activity ? e.activity : this.activity
            }, "undefined" != typeof e.registration ? n.registration = e.registration : null !== this.registration && (n.registration = this.registration), "undefined" != typeof e.callback && (n.callback = e.callback), i.retrieveState(t, n)) : void this.log("[warning] getState: No LRSs added yet (state not retrieved)")
        },
        setState: function(t, e, n) {
            this.log("setState");
            var i, o;
            return this.recordStores.length > 0 ? (o = this.recordStores[0], n = n || {}, i = {
                agent: "undefined" != typeof n.agent ? n.agent : this.actor,
                activity: "undefined" != typeof n.activity ? n.activity : this.activity
            }, "undefined" != typeof n.registration ? i.registration = n.registration : null !== this.registration && (i.registration = this.registration), "undefined" != typeof n.lastSHA1 && (i.lastSHA1 = n.lastSHA1), "undefined" != typeof n.contentType && (i.contentType = n.contentType, "undefined" != typeof n.overwriteJSON && !n.overwriteJSON && TinCan.Utils.isApplicationJSON(n.contentType) && (i.method = "POST")), "undefined" != typeof n.callback && (i.callback = n.callback), o.saveState(t, e, i)) : void this.log("[warning] setState: No LRSs added yet (state not saved)")
        },
        deleteState: function(t, e) {
            this.log("deleteState");
            var n, i;
            return this.recordStores.length > 0 ? (i = this.recordStores[0], e = e || {}, n = {
                agent: "undefined" != typeof e.agent ? e.agent : this.actor,
                activity: "undefined" != typeof e.activity ? e.activity : this.activity
            }, "undefined" != typeof e.registration ? n.registration = e.registration : null !== this.registration && (n.registration = this.registration), "undefined" != typeof e.callback && (n.callback = e.callback), i.dropState(t, n)) : void this.log("[warning] deleteState: No LRSs added yet (state not deleted)")
        },
        getActivityProfile: function(t, e) {
            this.log("getActivityProfile");
            var n, i;
            return this.recordStores.length > 0 ? (i = this.recordStores[0], e = e || {}, n = {
                activity: "undefined" != typeof e.activity ? e.activity : this.activity
            }, "undefined" != typeof e.callback && (n.callback = e.callback), i.retrieveActivityProfile(t, n)) : void this.log("[warning] getActivityProfile: No LRSs added yet (activity profile not retrieved)")
        },
        setActivityProfile: function(t, e, n) {
            this.log("setActivityProfile");
            var i, o;
            return this.recordStores.length > 0 ? (o = this.recordStores[0], n = n || {}, i = {
                activity: "undefined" != typeof n.activity ? n.activity : this.activity
            }, "undefined" != typeof n.callback && (i.callback = n.callback), "undefined" != typeof n.lastSHA1 && (i.lastSHA1 = n.lastSHA1), "undefined" != typeof n.contentType && (i.contentType = n.contentType, "undefined" != typeof n.overwriteJSON && !n.overwriteJSON && TinCan.Utils.isApplicationJSON(n.contentType) && (i.method = "POST")), o.saveActivityProfile(t, e, i)) : void this.log("[warning] setActivityProfile: No LRSs added yet (activity profile not saved)")
        },
        deleteActivityProfile: function(t, e) {
            this.log("deleteActivityProfile");
            var n, i;
            return this.recordStores.length > 0 ? (i = this.recordStores[0], e = e || {}, n = {
                activity: "undefined" != typeof e.activity ? e.activity : this.activity
            }, "undefined" != typeof e.callback && (n.callback = e.callback), i.dropActivityProfile(t, n)) : void this.log("[warning] deleteActivityProfile: No LRSs added yet (activity profile not deleted)")
        },
        getAgentProfile: function(t, e) {
            this.log("getAgentProfile");
            var n, i;
            return this.recordStores.length > 0 ? (i = this.recordStores[0], e = e || {}, n = {
                agent: "undefined" != typeof e.agent ? e.agent : this.actor
            }, "undefined" != typeof e.callback && (n.callback = e.callback), i.retrieveAgentProfile(t, n)) : void this.log("[warning] getAgentProfile: No LRSs added yet (agent profile not retrieved)")
        },
        setAgentProfile: function(t, e, n) {
            this.log("setAgentProfile");
            var i, o;
            return this.recordStores.length > 0 ? (o = this.recordStores[0], n = n || {}, i = {
                agent: "undefined" != typeof n.agent ? n.agent : this.actor
            }, "undefined" != typeof n.callback && (i.callback = n.callback), "undefined" != typeof n.lastSHA1 && (i.lastSHA1 = n.lastSHA1), "undefined" != typeof n.contentType && (i.contentType = n.contentType, "undefined" != typeof n.overwriteJSON && !n.overwriteJSON && TinCan.Utils.isApplicationJSON(n.contentType) && (i.method = "POST")), o.saveAgentProfile(t, e, i)) : void this.log("[warning] setAgentProfile: No LRSs added yet (agent profile not saved)")
        },
        deleteAgentProfile: function(t, e) {
            this.log("deleteAgentProfile");
            var n, i;
            return this.recordStores.length > 0 ? (i = this.recordStores[0], e = e || {}, n = {
                agent: "undefined" != typeof e.agent ? e.agent : this.actor
            }, "undefined" != typeof e.callback && (n.callback = e.callback), i.dropAgentProfile(t, n)) : void this.log("[warning] deleteAgentProfile: No LRSs added yet (agent profile not deleted)")
        }
    }, TinCan.DEBUG = !1, TinCan.enableDebug = function() {
        TinCan.DEBUG = !0
    }, TinCan.disableDebug = function() {
        TinCan.DEBUG = !1
    }, TinCan.versions = function() {
        return ["1.0.1", "1.0.0", "0.95", "0.9"]
    }, "object" == typeof module && (module.exports = TinCan)
}(),
function() {
    "use strict";
    TinCan.Utils = {
        getUUID: function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                var e = 16 * Math.random() | 0,
                    n = "x" == t ? e : 3 & e | 8;
                return n.toString(16)
            })
        },
        getISODateString: function(t) {
            function e(t, e) {
                var n, i;
                for (("undefined" == typeof t || null === t) && (t = 0), ("undefined" == typeof e || null === e) && (e = 2), n = Math.pow(10, e - 1), i = t.toString(); n > t && n > 1;) i = "0" + i, n /= 10;
                return i
            }
            return t.getUTCFullYear() + "-" + e(t.getUTCMonth() + 1) + "-" + e(t.getUTCDate()) + "T" + e(t.getUTCHours()) + ":" + e(t.getUTCMinutes()) + ":" + e(t.getUTCSeconds()) + "." + e(t.getUTCMilliseconds(), 3) + "Z"
        },
        convertISO8601DurationToMilliseconds: function(t) {
            var e, n, i, o, r = t.indexOf("-") >= 0,
                s = t.indexOf("T"),
                a = t.indexOf("H"),
                l = t.indexOf("M"),
                c = t.indexOf("S");
            if (-1 === s || -1 !== l && s > l || -1 !== t.indexOf("D") || -1 !== t.indexOf("Y")) throw new Error("ISO 8601 timestamps including years, months and/or days are not currently supported");
            return -1 === a ? (a = s, e = 0) : e = parseInt(t.slice(s + 1, a), 10), -1 === l ? (l = s, n = 0) : n = parseInt(t.slice(a + 1, l), 10), i = parseFloat(t.slice(l + 1, c)), o = parseInt(1e3 * (60 * (60 * e + n) + i), 10), isNaN(o) && (o = 0), r && (o = -1 * o), o
        },
        convertMillisecondsToISO8601Duration: function(t) {
            var e, n, i, o = parseInt(t, 10),
                r = "",
                s = "";
            return 0 > o && (r = "-", o = -1 * o), e = parseInt(o / 36e5, 10), n = parseInt(o % 36e5 / 6e4, 10), i = o % 36e5 % 6e4 / 1e3, s = r + "PT", e > 0 && (s += e + "H"), n > 0 && (s += n + "M"), s += i + "S"
        },
        getSHA1String: function(t) {
            return CryptoJS.SHA1(t).toString(CryptoJS.enc.Hex)
        },
        getBase64String: function(t) {
            return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Latin1.parse(t))
        },
        getLangDictionaryValue: function(t, e) {
            var n, i = this[t];
            if ("undefined" != typeof e && "undefined" != typeof i[e]) return i[e];
            if ("undefined" != typeof i.und) return i.und;
            if ("undefined" != typeof i["en-US"]) return i["en-US"];
            for (n in i)
                if (i.hasOwnProperty(n)) return i[n];
            return ""
        },
        parseURL: function(t) {
            var e, n, i, o, r = /\+/g,
                s = /([^&=]+)=?([^&]*)/g,
                a = function(t) {
                    return decodeURIComponent(t.replace(r, " "))
                };
            if (e = new RegExp(["^(https?:)//", "(([^:/?#]*)(?::([0-9]+))?)", "(/[^?#]*)", "(\\?[^#]*|)", "(#.*|)$"].join("")), n = t.match(e), i = {
                    protocol: n[1],
                    host: n[2],
                    hostname: n[3],
                    port: n[4],
                    pathname: n[5],
                    search: n[6],
                    hash: n[7],
                    params: {}
                }, i.path = i.protocol + "//" + i.host + i.pathname, "" !== i.search)
                for (; o = s.exec(i.search.substring(1));) i.params[a(o[1])] = a(o[2]);
            return i
        },
        getServerRoot: function(t) {
            var e = t.split("/");
            return e[0] + "//" + e[2]
        },
        getContentTypeFromHeader: function(t) {
            return String(t).split(";")[0]
        },
        isApplicationJSON: function(t) {
            return 0 === TinCan.Utils.getContentTypeFromHeader(t).toLowerCase().indexOf("application/json")
        }
    }
}(),
function() {
    "use strict";
    var t = TinCan.LRS = function(t) {
        this.log("constructor"), this.endpoint = null, this.version = null, this.auth = null, this.allowFail = !0, this.extended = null, this.init(t)
    };
    t.prototype = {
        LOG_SRC: "LRS",
        log: TinCan.prototype.log,
        init: function(t) {
            this.log("init");
            var e, n = TinCan.versions(),
                i = !1;
            if (t = t || {}, t.hasOwnProperty("alertOnRequestFailure") && this.log("'alertOnRequestFailure' is deprecated (alerts have been removed) no need to set it now"), !t.hasOwnProperty("endpoint") || null === t.endpoint || "" === t.endpoint) throw this.log("[error] LRS invalid: no endpoint"), {
                code: 3,
                mesg: "LRS invalid: no endpoint"
            };
            if (this.endpoint = String(t.endpoint), "/" !== this.endpoint.slice(-1) && (this.log("adding trailing slash to endpoint"), this.endpoint += "/"), t.hasOwnProperty("allowFail") && (this.allowFail = t.allowFail), t.hasOwnProperty("auth") ? this.auth = t.auth : t.hasOwnProperty("username") && t.hasOwnProperty("password") && (this.auth = "Basic " + TinCan.Utils.getBase64String(t.username + ":" + t.password)), t.hasOwnProperty("extended") && (this.extended = t.extended), this._initByEnvironment(t), "undefined" != typeof t.version) {
                for (this.log("version: " + t.version), e = 0; e < n.length; e += 1)
                    if (n[e] === t.version) {
                        i = !0;
                        break
                    }
                if (!i) throw this.log("[error] LRS invalid: version not supported (" + t.version + ")"), {
                    code: 5,
                    mesg: "LRS invalid: version not supported (" + t.version + ")"
                };
                this.version = t.version
            } else this.version = n[0]
        },
        _initByEnvironment: function() {
            this.log("_initByEnvironment not overloaded - no environment loaded?")
        },
        _makeRequest: function() {
            this.log("_makeRequest not overloaded - no environment loaded?")
        },
        _IEModeConversion: function() {
            this.log("_IEModeConversion not overloaded - browser environment not loaded.")
        },
        sendRequest: function(t) {
            this.log("sendRequest");
            var e, n = this.endpoint + t.url,
                i = {};
            if (0 === t.url.indexOf("http") && (n = t.url), null !== this.extended) {
                t.params = t.params || {};
                for (e in this.extended) this.extended.hasOwnProperty(e) && (t.params.hasOwnProperty(e) || null !== this.extended[e] && (t.params[e] = this.extended[e]))
            }
            i.Authorization = this.auth, "0.9" !== this.version && (i["X-Experience-API-Version"] = this.version);
            for (e in t.headers) t.headers.hasOwnProperty(e) && (i[e] = t.headers[e]);
            return this._makeRequest(n, i, t)
        },
        about: function(t) {
            this.log("about");
            var e, n, i;
            return t = t || {}, e = {
                url: "about",
                method: "GET",
                params: {}
            }, "undefined" != typeof t.callback && (i = function(e, n) {
                var i = n;
                null === e && (i = TinCan.About.fromJSON(n.responseText)), t.callback(e, i)
            }, e.callback = i), n = this.sendRequest(e), i ? void 0 : (null === n.err && (n.xhr = TinCan.About.fromJSON(n.xhr.responseText)), n)
        },
        saveStatement: function(t, e) {
            this.log("saveStatement");
            var n, i;
            e = e || {};
            try {
                i = t.asVersion(this.version)
            } catch (o) {
                return this.allowFail ? (this.log("[warning] statement could not be serialized in version (" + this.version + "): " + o), "undefined" != typeof e.callback ? void e.callback(null, null) : {
                    err: null,
                    xhr: null
                }) : (this.log("[error] statement could not be serialized in version (" + this.version + "): " + o), "undefined" != typeof e.callback ? void e.callback(o, null) : {
                    err: o,
                    xhr: null
                })
            }
            return n = {
                url: "statements",
                data: JSON.stringify(i),
                headers: {
                    "Content-Type": "application/json"
                }
            }, null !== t.id ? (n.method = "PUT", n.params = {
                statementId: t.id
            }) : n.method = "POST", "undefined" != typeof e.callback && (n.callback = e.callback), this.sendRequest(n)
        },
        retrieveStatement: function(t, e) {
            this.log("retrieveStatement");
            var n, i, o;
            return e = e || {}, n = {
                url: "statements",
                method: "GET",
                params: {
                    statementId: t
                }
            }, "undefined" != typeof e.callback && (o = function(t, n) {
                var i = n;
                null === t && (i = TinCan.Statement.fromJSON(n.responseText)), e.callback(t, i)
            }, n.callback = o), i = this.sendRequest(n), o || (i.statement = null, null === i.err && (i.statement = TinCan.Statement.fromJSON(i.xhr.responseText))), i
        },
        retrieveVoidedStatement: function(t, e) {
            this.log("retrieveVoidedStatement");
            var n, i, o;
            return e = e || {}, n = {
                url: "statements",
                method: "GET",
                params: {}
            }, "0.9" === this.version || "0.95" === this.version ? n.params.statementId = t : n.params.voidedStatementId = t, "undefined" != typeof e.callback && (o = function(t, n) {
                var i = n;
                null === t && (i = TinCan.Statement.fromJSON(n.responseText)), e.callback(t, i)
            }, n.callback = o), i = this.sendRequest(n), o || (i.statement = null, null === i.err && (i.statement = TinCan.Statement.fromJSON(i.xhr.responseText))), i
        },
        saveStatements: function(t, e) {
            this.log("saveStatements");
            var n, i, o, r = [];
            if (e = e || {}, 0 === t.length) return "undefined" != typeof e.callback ? void e.callback(new Error("no statements"), null) : {
                err: new Error("no statements"),
                xhr: null
            };
            for (o = 0; o < t.length; o += 1) {
                try {
                    i = t[o].asVersion(this.version)
                } catch (s) {
                    return this.allowFail ? (this.log("[warning] statement could not be serialized in version (" + this.version + "): " + s), "undefined" != typeof e.callback ? void e.callback(null, null) : {
                        err: null,
                        xhr: null
                    }) : (this.log("[error] statement could not be serialized in version (" + this.version + "): " + s), "undefined" != typeof e.callback ? void e.callback(s, null) : {
                        err: s,
                        xhr: null
                    })
                }
                r.push(i)
            }
            return n = {
                url: "statements",
                method: "POST",
                data: JSON.stringify(r),
                headers: {
                    "Content-Type": "application/json"
                }
            }, "undefined" != typeof e.callback && (n.callback = e.callback), this.sendRequest(n)
        },
        queryStatements: function(t) {
            this.log("queryStatements");
            var e, n, i;
            t = t || {}, t.params = t.params || {};
            try {
                e = this._queryStatementsRequestCfg(t)
            } catch (o) {
                return this.log("[error] Query statements failed - " + o), "undefined" != typeof t.callback && t.callback(o, {}), {
                    err: o,
                    statementsResult: null
                }
            }
            return "undefined" != typeof t.callback && (i = function(e, n) {
                var i = n;
                null === e && (i = TinCan.StatementsResult.fromJSON(n.responseText)), t.callback(e, i)
            }, e.callback = i), n = this.sendRequest(e), n.config = e, i || (n.statementsResult = null, null === n.err && (n.statementsResult = TinCan.StatementsResult.fromJSON(n.xhr.responseText))), n
        },
        _queryStatementsRequestCfg: function(t) {
            this.log("_queryStatementsRequestCfg");
            var e, n, i = {},
                o = {
                    url: "statements",
                    method: "GET",
                    params: i
                },
                r = ["agent", "actor", "object", "instructor"],
                s = ["verb", "activity"],
                a = ["registration", "context", "since", "until", "limit", "authoritative", "sparse", "ascending", "related_activities", "related_agents", "format", "attachments"],
                l = {
                    verb: !0,
                    registration: !0,
                    since: !0,
                    until: !0,
                    limit: !0,
                    ascending: !0
                },
                c = {
                    .9: {
                        supported: {
                            actor: !0,
                            instructor: !0,
                            target: !0,
                            object: !0,
                            context: !0,
                            authoritative: !0,
                            sparse: !0
                        }
                    },
                    "1.0.0": {
                        supported: {
                            agent: !0,
                            activity: !0,
                            related_activities: !0,
                            related_agents: !0,
                            format: !0,
                            attachments: !0
                        }
                    }
                };
            c[.95] = c[.9], c["1.0.1"] = c["1.0.0"], t.params.hasOwnProperty("target") && (t.params.object = t.params.target);
            for (n in t.params)
                if (t.params.hasOwnProperty(n) && "undefined" == typeof l[n] && "undefined" == typeof c[this.version].supported[n]) throw "Unrecognized query parameter configured: " + n;

            for (e = 0; e < r.length; e += 1) "undefined" != typeof t.params[r[e]] && (i[r[e]] = JSON.stringify(t.params[r[e]].asVersion(this.version)));
            for (e = 0; e < s.length; e += 1) "undefined" != typeof t.params[s[e]] && (i[s[e]] = t.params[s[e]].id);
            for (e = 0; e < a.length; e += 1) "undefined" != typeof t.params[a[e]] && (i[a[e]] = t.params[a[e]]);
            return o
        },
        moreStatements: function(t) {
            this.log("moreStatements: " + t.url);
            var e, n, i, o, r;
            return t = t || {}, o = TinCan.Utils.parseURL(t.url), r = TinCan.Utils.getServerRoot(this.endpoint), 0 === o.path.indexOf("/statements") && (o.path = this.endpoint.replace(r, "") + o.path, this.log("converting non-standard more URL to " + o.path)), 0 !== o.path.indexOf("/") && (o.path = "/" + o.path), e = {
                method: "GET",
                url: r + o.path,
                params: o.params
            }, "undefined" != typeof t.callback && (i = function(e, n) {
                var i = n;
                null === e && (i = TinCan.StatementsResult.fromJSON(n.responseText)), t.callback(e, i)
            }, e.callback = i), n = this.sendRequest(e), n.config = e, i || (n.statementsResult = null, null === n.err && (n.statementsResult = TinCan.StatementsResult.fromJSON(n.xhr.responseText))), n
        },
        retrieveState: function(t, e) {
            this.log("retrieveState");
            var n, i, o = {},
                r = {};
            if (o = {
                    stateId: t,
                    activityId: e.activity.id
                }, "0.9" === this.version ? o.actor = JSON.stringify(e.agent.asVersion(this.version)) : o.agent = JSON.stringify(e.agent.asVersion(this.version)), "undefined" != typeof e.registration && null !== e.registration && ("0.9" === this.version ? o.registrationId = e.registration : o.registration = e.registration), r = {
                    url: "activities/state",
                    method: "GET",
                    params: o,
                    ignore404: !0
                }, "undefined" != typeof e.callback && (i = function(n, i) {
                    var o = i;
                    if (null === n)
                        if (404 === i.status) o = null;
                        else if (o = new TinCan.State({
                            id: t,
                            contents: i.responseText
                        }), o.etag = "undefined" != typeof i.getResponseHeader && null !== i.getResponseHeader("ETag") && "" !== i.getResponseHeader("ETag") ? i.getResponseHeader("ETag") : TinCan.Utils.getSHA1String(i.responseText), "undefined" != typeof i.contentType ? o.contentType = i.contentType : "undefined" != typeof i.getResponseHeader && null !== i.getResponseHeader("Content-Type") && "" !== i.getResponseHeader("Content-Type") && (o.contentType = i.getResponseHeader("Content-Type")), TinCan.Utils.isApplicationJSON(o.contentType)) try {
                        o.contents = JSON.parse(o.contents)
                    } catch (r) {
                        this.log("retrieveState - failed to deserialize JSON: " + r)
                    }
                    e.callback(n, o)
                }, r.callback = i), n = this.sendRequest(r), !i && (n.state = null, null === n.err && 404 !== n.xhr.status && (n.state = new TinCan.State({
                    id: t,
                    contents: n.xhr.responseText
                }), n.state.etag = "undefined" != typeof n.xhr.getResponseHeader && null !== n.xhr.getResponseHeader("ETag") && "" !== n.xhr.getResponseHeader("ETag") ? n.xhr.getResponseHeader("ETag") : TinCan.Utils.getSHA1String(n.xhr.responseText), "undefined" != typeof n.xhr.contentType ? n.state.contentType = n.xhr.contentType : "undefined" != typeof n.xhr.getResponseHeader && null !== n.xhr.getResponseHeader("Content-Type") && "" !== n.xhr.getResponseHeader("Content-Type") && (n.state.contentType = n.xhr.getResponseHeader("Content-Type")), TinCan.Utils.isApplicationJSON(n.state.contentType)))) try {
                n.state.contents = JSON.parse(n.state.contents)
            } catch (s) {
                this.log("retrieveState - failed to deserialize JSON: " + s)
            }
            return n
        },
        saveState: function(t, e, n) {
            this.log("saveState");
            var i, o;
            return "undefined" == typeof n.contentType && (n.contentType = "application/octet-stream"), "object" == typeof e && TinCan.Utils.isApplicationJSON(n.contentType) && (e = JSON.stringify(e)), ("undefined" == typeof n.method || "POST" !== n.method) && (n.method = "PUT"), i = {
                stateId: t,
                activityId: n.activity.id
            }, "0.9" === this.version ? i.actor = JSON.stringify(n.agent.asVersion(this.version)) : i.agent = JSON.stringify(n.agent.asVersion(this.version)), "undefined" != typeof n.registration && null !== n.registration && ("0.9" === this.version ? i.registrationId = n.registration : i.registration = n.registration), o = {
                url: "activities/state",
                method: n.method,
                params: i,
                data: e,
                headers: {
                    "Content-Type": n.contentType
                }
            }, "undefined" != typeof n.callback && (o.callback = n.callback), "undefined" != typeof n.lastSHA1 && null !== n.lastSHA1 && (o.headers["If-Match"] = n.lastSHA1), this.sendRequest(o)
        },
        dropState: function(t, e) {
            this.log("dropState");
            var n, i;
            return n = {
                activityId: e.activity.id
            }, "0.9" === this.version ? n.actor = JSON.stringify(e.agent.asVersion(this.version)) : n.agent = JSON.stringify(e.agent.asVersion(this.version)), null !== t && (n.stateId = t), "undefined" != typeof e.registration && null !== e.registration && ("0.9" === this.version ? n.registrationId = e.registration : n.registration = e.registration), i = {
                url: "activities/state",
                method: "DELETE",
                params: n
            }, "undefined" != typeof e.callback && (i.callback = e.callback), this.sendRequest(i)
        },
        retrieveActivityProfile: function(t, e) {
            this.log("retrieveActivityProfile");
            var n, i, o = {};
            if (o = {
                    url: "activities/profile",
                    method: "GET",
                    params: {
                        profileId: t,
                        activityId: e.activity.id
                    },
                    ignore404: !0
                }, "undefined" != typeof e.callback && (i = function(n, i) {
                    var o = i;
                    if (null === n)
                        if (404 === i.status) o = null;
                        else if (o = new TinCan.ActivityProfile({
                            id: t,
                            activity: e.activity,
                            contents: i.responseText
                        }), o.etag = "undefined" != typeof i.getResponseHeader && null !== i.getResponseHeader("ETag") && "" !== i.getResponseHeader("ETag") ? i.getResponseHeader("ETag") : TinCan.Utils.getSHA1String(i.responseText), "undefined" != typeof i.contentType ? o.contentType = i.contentType : "undefined" != typeof i.getResponseHeader && null !== i.getResponseHeader("Content-Type") && "" !== i.getResponseHeader("Content-Type") && (o.contentType = i.getResponseHeader("Content-Type")), TinCan.Utils.isApplicationJSON(o.contentType)) try {
                        o.contents = JSON.parse(o.contents)
                    } catch (r) {
                        this.log("retrieveActivityProfile - failed to deserialize JSON: " + r)
                    }
                    e.callback(n, o)
                }, o.callback = i), n = this.sendRequest(o), !i && (n.profile = null, null === n.err && 404 !== n.xhr.status && (n.profile = new TinCan.ActivityProfile({
                    id: t,
                    activity: e.activity,
                    contents: n.xhr.responseText
                }), n.profile.etag = "undefined" != typeof n.xhr.getResponseHeader && null !== n.xhr.getResponseHeader("ETag") && "" !== n.xhr.getResponseHeader("ETag") ? n.xhr.getResponseHeader("ETag") : TinCan.Utils.getSHA1String(n.xhr.responseText), "undefined" != typeof n.xhr.contentType ? n.profile.contentType = n.xhr.contentType : "undefined" != typeof n.xhr.getResponseHeader && null !== n.xhr.getResponseHeader("Content-Type") && "" !== n.xhr.getResponseHeader("Content-Type") && (n.profile.contentType = n.xhr.getResponseHeader("Content-Type")), TinCan.Utils.isApplicationJSON(n.profile.contentType)))) try {
                n.profile.contents = JSON.parse(n.profile.contents)
            } catch (r) {
                this.log("retrieveActivityProfile - failed to deserialize JSON: " + r)
            }
            return n
        },
        saveActivityProfile: function(t, e, n) {
            this.log("saveActivityProfile");
            var i;
            return "undefined" == typeof n.contentType && (n.contentType = "application/octet-stream"), ("undefined" == typeof n.method || "POST" !== n.method) && (n.method = "PUT"), "object" == typeof e && TinCan.Utils.isApplicationJSON(n.contentType) && (e = JSON.stringify(e)), i = {
                url: "activities/profile",
                method: n.method,
                params: {
                    profileId: t,
                    activityId: n.activity.id
                },
                data: e,
                headers: {
                    "Content-Type": n.contentType
                }
            }, "undefined" != typeof n.callback && (i.callback = n.callback), "undefined" != typeof n.lastSHA1 && null !== n.lastSHA1 ? i.headers["If-Match"] = n.lastSHA1 : i.headers["If-None-Match"] = "*", this.sendRequest(i)
        },
        dropActivityProfile: function(t, e) {
            this.log("dropActivityProfile");
            var n, i;
            return n = {
                profileId: t,
                activityId: e.activity.id
            }, i = {
                url: "activities/profile",
                method: "DELETE",
                params: n
            }, "undefined" != typeof e.callback && (i.callback = e.callback), this.sendRequest(i)
        },
        retrieveAgentProfile: function(t, e) {
            this.log("retrieveAgentProfile");
            var n, i, o = {};
            if (o = {
                    method: "GET",
                    params: {
                        profileId: t
                    },
                    ignore404: !0
                }, "0.9" === this.version ? (o.url = "actors/profile", o.params.actor = JSON.stringify(e.agent.asVersion(this.version))) : (o.url = "agents/profile", o.params.agent = JSON.stringify(e.agent.asVersion(this.version))), "undefined" != typeof e.callback && (i = function(n, i) {
                    var o = i;
                    if (null === n)
                        if (404 === i.status) o = null;
                        else if (o = new TinCan.AgentProfile({
                            id: t,
                            agent: e.agent,
                            contents: i.responseText
                        }), o.etag = "undefined" != typeof i.getResponseHeader && null !== i.getResponseHeader("ETag") && "" !== i.getResponseHeader("ETag") ? i.getResponseHeader("ETag") : TinCan.Utils.getSHA1String(i.responseText), "undefined" != typeof i.contentType ? o.contentType = i.contentType : "undefined" != typeof i.getResponseHeader && null !== i.getResponseHeader("Content-Type") && "" !== i.getResponseHeader("Content-Type") && (o.contentType = i.getResponseHeader("Content-Type")), TinCan.Utils.isApplicationJSON(o.contentType)) try {
                        o.contents = JSON.parse(o.contents)
                    } catch (r) {
                        this.log("retrieveAgentProfile - failed to deserialize JSON: " + r)
                    }
                    e.callback(n, o)
                }, o.callback = i), n = this.sendRequest(o), !i && (n.profile = null, null === n.err && 404 !== n.xhr.status && (n.profile = new TinCan.AgentProfile({
                    id: t,
                    agent: e.agent,
                    contents: n.xhr.responseText
                }), n.profile.etag = "undefined" != typeof n.xhr.getResponseHeader && null !== n.xhr.getResponseHeader("ETag") && "" !== n.xhr.getResponseHeader("ETag") ? n.xhr.getResponseHeader("ETag") : TinCan.Utils.getSHA1String(n.xhr.responseText), "undefined" != typeof n.xhr.contentType ? n.profile.contentType = n.xhr.contentType : "undefined" != typeof n.xhr.getResponseHeader && null !== n.xhr.getResponseHeader("Content-Type") && "" !== n.xhr.getResponseHeader("Content-Type") && (n.profile.contentType = n.xhr.getResponseHeader("Content-Type")), TinCan.Utils.isApplicationJSON(n.profile.contentType)))) try {
                n.profile.contents = JSON.parse(n.profile.contents)
            } catch (r) {
                this.log("retrieveAgentProfile - failed to deserialize JSON: " + r)
            }
            return n
        },
        saveAgentProfile: function(t, e, n) {
            this.log("saveAgentProfile");
            var i;
            return "undefined" == typeof n.contentType && (n.contentType = "application/octet-stream"), ("undefined" == typeof n.method || "POST" !== n.method) && (n.method = "PUT"), "object" == typeof e && TinCan.Utils.isApplicationJSON(n.contentType) && (e = JSON.stringify(e)), i = {
                method: n.method,
                params: {
                    profileId: t
                },
                data: e,
                headers: {
                    "Content-Type": n.contentType
                }
            }, "0.9" === this.version ? (i.url = "actors/profile", i.params.actor = JSON.stringify(n.agent.asVersion(this.version))) : (i.url = "agents/profile", i.params.agent = JSON.stringify(n.agent.asVersion(this.version))), "undefined" != typeof n.callback && (i.callback = n.callback), "undefined" != typeof n.lastSHA1 && null !== n.lastSHA1 ? i.headers["If-Match"] = n.lastSHA1 : i.headers["If-None-Match"] = "*", this.sendRequest(i)
        },
        dropAgentProfile: function(t, e) {
            this.log("dropAgentProfile");
            var n, i;
            return n = {
                profileId: t
            }, i = {
                method: "DELETE",
                params: n
            }, "0.9" === this.version ? (i.url = "actors/profile", n.actor = JSON.stringify(e.agent.asVersion(this.version))) : (i.url = "agents/profile", n.agent = JSON.stringify(e.agent.asVersion(this.version))), "undefined" != typeof e.callback && (i.callback = e.callback), this.sendRequest(i)
        }
    }, t.syncEnabled = null
}(),
function() {
    "use strict";
    var t = TinCan.AgentAccount = function(t) {
        this.log("constructor"), this.homePage = null, this.name = null, this.init(t)
    };
    t.prototype = {
        LOG_SRC: "AgentAccount",
        log: TinCan.prototype.log,
        init: function(t) {
            this.log("init");
            var e, n = ["name", "homePage"];
            for (t = t || {}, "undefined" != typeof t.accountServiceHomePage && (t.homePage = t.accountServiceHomePage), "undefined" != typeof t.accountName && (t.name = t.accountName), e = 0; e < n.length; e += 1) t.hasOwnProperty(n[e]) && null !== t[n[e]] && (this[n[e]] = t[n[e]])
        },
        toString: function() {
            this.log("toString");
            var t = "";
            return null !== this.name || null !== this.homePage ? (t += null !== this.name ? this.name : "-", t += ":", t += null !== this.homePage ? this.homePage : "-") : t = "AgentAccount: unidentified", t
        },
        asVersion: function(t) {
            this.log("asVersion: " + t);
            var e = {};
            return t = t || TinCan.versions()[0], "0.9" === t ? (e.accountName = this.name, e.accountServiceHomePage = this.homePage) : (e.name = this.name, e.homePage = this.homePage), e
        }
    }, t.fromJSON = function(e) {
        t.prototype.log("fromJSON");
        var n = JSON.parse(e);
        return new t(n)
    }
}(),
function() {
    "use strict";
    var t = TinCan.Agent = function(t) {
        this.log("constructor"), this.name = null, this.mbox = null, this.mbox_sha1sum = null, this.openid = null, this.account = null, this.degraded = !1, this.init(t)
    };
    t.prototype = {
        objectType: "Agent",
        LOG_SRC: "Agent",
        log: TinCan.prototype.log,
        init: function(t) {
            this.log("init");
            var e, n, i = ["name", "mbox", "mbox_sha1sum", "openid"];
            for (t = t || {}, "undefined" != typeof t.lastName || "undefined" != typeof t.firstName ? (t.name = "", "undefined" != typeof t.firstName && t.firstName.length > 0 && (t.name = t.firstName[0], t.firstName.length > 1 && (this.degraded = !0)), "" !== t.name && (t.name += " "), "undefined" != typeof t.lastName && t.lastName.length > 0 && (t.name += t.lastName[0], t.lastName.length > 1 && (this.degraded = !0))) : ("undefined" != typeof t.familyName || "undefined" != typeof t.givenName) && (t.name = "", "undefined" != typeof t.givenName && t.givenName.length > 0 && (t.name = t.givenName[0], t.givenName.length > 1 && (this.degraded = !0)), "" !== t.name && (t.name += " "), "undefined" != typeof t.familyName && t.familyName.length > 0 && (t.name += t.familyName[0], t.familyName.length > 1 && (this.degraded = !0))), "object" == typeof t.name && null !== t.name && (t.name.length > 1 && (this.degraded = !0), t.name = t.name[0]), "object" == typeof t.mbox && null !== t.mbox && (t.mbox.length > 1 && (this.degraded = !0), t.mbox = t.mbox[0]), "object" == typeof t.mbox_sha1sum && null !== t.mbox_sha1sum && (t.mbox_sha1sum.length > 1 && (this.degraded = !0), t.mbox_sha1sum = t.mbox_sha1sum[0]), "object" == typeof t.openid && null !== t.openid && (t.openid.length > 1 && (this.degraded = !0), t.openid = t.openid[0]), "object" == typeof t.account && null !== t.account && "undefined" == typeof t.account.homePage && "undefined" == typeof t.account.name && (0 === t.account.length ? delete t.account : (t.account.length > 1 && (this.degraded = !0), t.account = t.account[0])), t.hasOwnProperty("account") && (this.account = t.account instanceof TinCan.AgentAccount ? t.account : new TinCan.AgentAccount(t.account)), e = 0; e < i.length; e += 1) t.hasOwnProperty(i[e]) && null !== t[i[e]] && (n = t[i[e]], "mbox" === i[e] && -1 === n.indexOf("mailto:") && (n = "mailto:" + n), this[i[e]] = n)
        },
        toString: function() {
            return this.log("toString"), null !== this.name ? this.name : null !== this.mbox ? this.mbox.replace("mailto:", "") : null !== this.mbox_sha1sum ? this.mbox_sha1sum : null !== this.openid ? this.openid : null !== this.account ? this.account.toString() : this.objectType + ": unidentified"
        },
        asVersion: function(t) {
            this.log("asVersion: " + t);
            var e = {
                objectType: this.objectType
            };
            return t = t || TinCan.versions()[0], "0.9" === t ? (null !== this.mbox ? e.mbox = [this.mbox] : null !== this.mbox_sha1sum ? e.mbox_sha1sum = [this.mbox_sha1sum] : null !== this.openid ? e.openid = [this.openid] : null !== this.account && (e.account = [this.account.asVersion(t)]), null !== this.name && (e.name = [this.name])) : (null !== this.mbox ? e.mbox = this.mbox : null !== this.mbox_sha1sum ? e.mbox_sha1sum = this.mbox_sha1sum : null !== this.openid ? e.openid = this.openid : null !== this.account && (e.account = this.account.asVersion(t)), null !== this.name && (e.name = this.name)), e
        }
    }, t.fromJSON = function(e) {
        t.prototype.log("fromJSON");
        var n = JSON.parse(e);
        return new t(n)
    }
}(),
function() {
    "use strict";
    var t = TinCan.Group = function(t) {
        this.log("constructor"), this.name = null, this.mbox = null, this.mbox_sha1sum = null, this.openid = null, this.account = null, this.member = [], this.init(t)
    };
    t.prototype = {
        objectType: "Group",
        LOG_SRC: "Group",
        log: TinCan.prototype.log,
        init: function(t) {
            this.log("init");
            var e;
            if (t = t || {}, TinCan.Agent.prototype.init.call(this, t), "undefined" != typeof t.member)
                for (e = 0; e < t.member.length; e += 1) this.member.push(t.member[e] instanceof TinCan.Agent ? t.member[e] : new TinCan.Agent(t.member[e]))
        },
        toString: function(t) {
            this.log("toString");
            var e = TinCan.Agent.prototype.toString.call(this, t);
            return e !== this.objectType + ": unidentified" && (e = this.objectType + ": " + e), e
        },
        asVersion: function(t) {
            this.log("asVersion: " + t);
            var e, n;
            if (t = t || TinCan.versions()[0], e = TinCan.Agent.prototype.asVersion.call(this, t), this.member.length > 0)
                for (e.member = [], n = 0; n < this.member.length; n += 1) e.member.push(this.member[n].asVersion(t));
            return e
        }
    }, t.fromJSON = function(e) {
        t.prototype.log("fromJSON");
        var n = JSON.parse(e);
        return new t(n)
    }
}(),
function() {
    "use strict";
    var t = {
            "http://adlnet.gov/expapi/verbs/experienced": "experienced",
            "http://adlnet.gov/expapi/verbs/attended": "attended",
            "http://adlnet.gov/expapi/verbs/attempted": "attempted",
            "http://adlnet.gov/expapi/verbs/completed": "completed",
            "http://adlnet.gov/expapi/verbs/passed": "passed",
            "http://adlnet.gov/expapi/verbs/failed": "failed",
            "http://adlnet.gov/expapi/verbs/answered": "answered",
            "http://adlnet.gov/expapi/verbs/interacted": "interacted",
            "http://adlnet.gov/expapi/verbs/imported": "imported",
            "http://adlnet.gov/expapi/verbs/created": "created",
            "http://adlnet.gov/expapi/verbs/shared": "shared",
            "http://adlnet.gov/expapi/verbs/voided": "voided"
        },
        e = TinCan.Verb = function(t) {
            this.log("constructor"), this.id = null, this.display = null, this.init(t)
        };
    e.prototype = {
        LOG_SRC: "Verb",
        log: TinCan.prototype.log,
        init: function(e) {
            this.log("init");
            var n, i, o = ["id", "display"];
            if ("string" == typeof e) {
                this.id = e, this.display = {
                    und: this.id
                };
                for (i in t)
                    if (t.hasOwnProperty(i) && t[i] === e) {
                        this.id = i;
                        break
                    }
            } else {
                for (e = e || {}, n = 0; n < o.length; n += 1) e.hasOwnProperty(o[n]) && null !== e[o[n]] && (this[o[n]] = e[o[n]]);
                null === this.display && "undefined" != typeof t[this.id] && (this.display = {
                    und: t[this.id]
                })
            }
        },
        toString: function(t) {
            return this.log("toString"), null !== this.display ? this.getLangDictionaryValue("display", t) : this.id
        },
        asVersion: function(e) {
            this.log("asVersion");
            var n;
            return e = e || TinCan.versions()[0], "0.9" === e ? n = t[this.id] : (n = {
                id: this.id
            }, null !== this.display && (n.display = this.display)), n
        },
        getLangDictionaryValue: TinCan.Utils.getLangDictionaryValue
    }, e.fromJSON = function(t) {
        e.prototype.log("fromJSON");
        var n = JSON.parse(t);
        return new e(n)
    }
}(),
function() {
    "use strict";
    var t = TinCan.Result = function(t) {
        this.log("constructor"), this.score = null, this.success = null, this.completion = null, this.duration = null, this.response = null, this.extensions = null, this.init(t)
    };
    t.prototype = {
        LOG_SRC: "Result",
        log: TinCan.prototype.log,
        init: function(t) {
            this.log("init");
            var e, n = ["completion", "duration", "extensions", "response", "success"];
            for (t = t || {}, t.hasOwnProperty("score") && null !== t.score && (this.score = t.score instanceof TinCan.Score ? t.score : new TinCan.Score(t.score)), e = 0; e < n.length; e += 1) t.hasOwnProperty(n[e]) && null !== t[n[e]] && (this[n[e]] = t[n[e]]);
            "Completed" === this.completion && (this.completion = !0)
        },
        asVersion: function(t) {
            this.log("asVersion");
            var e, n = {},
                i = ["success", "duration", "response", "extensions"],
                o = ["score"];
            for (t = t || TinCan.versions()[0], e = 0; e < i.length; e += 1) null !== this[i[e]] && (n[i[e]] = this[i[e]]);
            for (e = 0; e < o.length; e += 1) null !== this[o[e]] && (n[o[e]] = this[o[e]].asVersion(t));
            return null !== this.completion && ("0.9" === t ? this.completion && (n.completion = "Completed") : n.completion = this.completion), n
        }
    }, t.fromJSON = function(e) {
        t.prototype.log("fromJSON");
        var n = JSON.parse(e);
        return new t(n)
    }
}(),
function() {
    "use strict";
    var t = TinCan.Score = function(t) {
        this.log("constructor"), this.scaled = null, this.raw = null, this.min = null, this.max = null, this.init(t)
    };
    t.prototype = {
        LOG_SRC: "Score",
        log: TinCan.prototype.log,
        init: function(t) {
            this.log("init");
            var e, n = ["scaled", "raw", "min", "max"];
            for (t = t || {}, e = 0; e < n.length; e += 1) t.hasOwnProperty(n[e]) && null !== t[n[e]] && (this[n[e]] = t[n[e]])
        },
        asVersion: function(t) {
            this.log("asVersion");
            var e, n = {},
                i = ["scaled", "raw", "min", "max"];
            for (t = t || TinCan.versions()[0], e = 0; e < i.length; e += 1) null !== this[i[e]] && (n[i[e]] = this[i[e]]);
            return n
        }
    }, t.fromJSON = function(e) {
        t.prototype.log("fromJSON");
        var n = JSON.parse(e);
        return new t(n)
    }
}(),
function() {
    "use strict";
    var t = TinCan.InteractionComponent = function(t) {
        this.log("constructor"), this.id = null, this.description = null, this.init(t)
    };
    t.prototype = {
        LOG_SRC: "InteractionComponent",
        log: TinCan.prototype.log,
        init: function(t) {
            this.log("init");
            var e, n = ["id", "description"];
            for (t = t || {}, e = 0; e < n.length; e += 1) t.hasOwnProperty(n[e]) && null !== t[n[e]] && (this[n[e]] = t[n[e]])
        },
        asVersion: function(t) {
            this.log("asVersion");
            var e, n, i = {
                    id: this.id
                },
                o = ["description"];
            for (t = t || TinCan.versions()[0], e = 0; e < o.length; e += 1) n = o[e], null !== this[n] && (i[n] = this[n]);
            return i
        },
        getLangDictionaryValue: TinCan.Utils.getLangDictionaryValue
    }, t.fromJSON = function(e) {
        t.prototype.log("fromJSON");
        var n = JSON.parse(e);
        return new t(n)
    }
}(),
function() {
    "use strict";
    var t = {
            "http://adlnet.gov/expapi/activities/course": "course",
            "http://adlnet.gov/expapi/activities/module": "module",
            "http://adlnet.gov/expapi/activities/meeting": "meeting",
            "http://adlnet.gov/expapi/activities/media": "media",
            "http://adlnet.gov/expapi/activities/performance": "performance",
            "http://adlnet.gov/expapi/activities/simulation": "simulation",
            "http://adlnet.gov/expapi/activities/assessment": "assessment",
            "http://adlnet.gov/expapi/activities/interaction": "interaction",
            "http://adlnet.gov/expapi/activities/cmi.interaction": "cmi.interaction",
            "http://adlnet.gov/expapi/activities/question": "question",
            "http://adlnet.gov/expapi/activities/objective": "objective",
            "http://adlnet.gov/expapi/activities/link": "link"
        },
        e = TinCan.ActivityDefinition = function(t) {
            this.log("constructor"), this.name = null, this.description = null, this.type = null, this.moreInfo = null, this.extensions = null, this.interactionType = null, this.correctResponsesPattern = null, this.choices = null, this.scale = null, this.source = null, this.target = null, this.steps = null, this.init(t)
        };
    e.prototype = {
        LOG_SRC: "ActivityDefinition",
        log: TinCan.prototype.log,
        init: function(e) {
            this.log("init");
            var n, i, o, r = ["name", "description", "moreInfo", "extensions", "correctResponsesPattern"],
                s = [];
            if (e = e || {}, e.hasOwnProperty("type") && null !== e.type) {
                for (o in t) t.hasOwnProperty(o) && t[o] === e.type && (e.type = t[o]);
                this.type = e.type
            }
            if (e.hasOwnProperty("interactionType") && null !== e.interactionType && (this.interactionType = e.interactionType, "choice" === e.interactionType || "sequencing" === e.interactionType ? s.push("choices") : "likert" === e.interactionType ? s.push("scale") : "matching" === e.interactionType ? (s.push("source"), s.push("target")) : "performance" === e.interactionType && s.push("steps"), s.length > 0))
                for (n = 0; n < s.length; n += 1)
                    if (o = s[n], e.hasOwnProperty(o) && null !== e[o])
                        for (this[o] = [], i = 0; i < e[o].length; i += 1) this[o].push(e[o][i] instanceof TinCan.InteractionComponent ? e[o][i] : new TinCan.InteractionComponent(e[o][i]));
            for (n = 0; n < r.length; n += 1) e.hasOwnProperty(r[n]) && null !== e[r[n]] && (this[r[n]] = e[r[n]])
        },
        toString: function(t) {
            return this.log("toString"), null !== this.name ? this.getLangDictionaryValue("name", t) : null !== this.description ? this.getLangDictionaryValue("description", t) : ""
        },
        asVersion: function(e) {
            this.log("asVersion");
            var n, i, o, r = {},
                s = ["name", "description", "interactionType", "correctResponsesPattern", "extensions"],
                a = ["choices", "scale", "source", "target", "steps"];
            for (e = e || TinCan.versions()[0], null !== this.type && (r.type = "0.9" === e ? t[this.type] : this.type), n = 0; n < s.length; n += 1) o = s[n], null !== this[o] && (r[o] = this[o]);
            for (n = 0; n < a.length; n += 1)
                if (o = a[n], null !== this[o])
                    for (r[o] = [], i = 0; i < this[o].length; i += 1) r[o].push(this[o][i].asVersion(e));
            return 0 !== e.indexOf("0.9") && null !== this.moreInfo && (r.moreInfo = this.moreInfo), r
        },
        getLangDictionaryValue: TinCan.Utils.getLangDictionaryValue
    }, e.fromJSON = function(t) {
        e.prototype.log("fromJSON");
        var n = JSON.parse(t);
        return new e(n)
    }
}(),
function() {
    "use strict";
    var t = TinCan.Activity = function(t) {
        this.log("constructor"), this.objectType = "Activity", this.id = null, this.definition = null, this.init(t)
    };
    t.prototype = {
        LOG_SRC: "Activity",
        log: TinCan.prototype.log,
        init: function(t) {
            this.log("init");
            var e, n = ["id"];
            for (t = t || {}, t.hasOwnProperty("definition") && (this.definition = t.definition instanceof TinCan.ActivityDefinition ? t.definition : new TinCan.ActivityDefinition(t.definition)), e = 0; e < n.length; e += 1) t.hasOwnProperty(n[e]) && null !== t[n[e]] && (this[n[e]] = t[n[e]])
        },
        toString: function(t) {
            this.log("toString");
            var e = "";
            return null !== this.definition && (e = this.definition.toString(t), "" !== e) ? e : null !== this.id ? this.id : "Activity: unidentified"
        },
        asVersion: function(t) {
            this.log("asVersion");
            var e = {
                id: this.id,
                objectType: this.objectType
            };
            return t = t || TinCan.versions()[0], null !== this.definition && (e.definition = this.definition.asVersion(t)), e
        }
    }, t.fromJSON = function(e) {
        t.prototype.log("fromJSON");
        var n = JSON.parse(e);
        return new t(n)
    }
}(),
function() {
    "use strict";
    var t = TinCan.ContextActivities = function(t) {
        this.log("constructor"), this.category = null, this.parent = null, this.grouping = null, this.other = null, this.init(t)
    };
    t.prototype = {
        LOG_SRC: "ContextActivities",
        log: TinCan.prototype.log,
        init: function(t) {
            this.log("init");
            var e, n, i, o, r = ["category", "parent", "grouping", "other"];
            for (t = t || {}, e = 0; e < r.length; e += 1)
                if (i = r[e], t.hasOwnProperty(i) && null !== t[i])
                    if ("[object Array]" === Object.prototype.toString.call(t[i]))
                        for (n = 0; n < t[i].length; n += 1) this.add(i, t[i][n]);
                    else o = t[i], this.add(i, o)
        },
        add: function(t, e) {
            return "category" === t || "parent" === t || "grouping" === t || "other" === t ? (null === this[t] && (this[t] = []), e instanceof TinCan.Activity || (e = "string" == typeof e ? {
                id: e
            } : e, e = new TinCan.Activity(e)), this[t].push(e), this[t].length - 1) : void 0
        },
        asVersion: function(t) {
            this.log("asVersion");
            var e, n, i = {},
                o = ["parent", "grouping", "other"];
            for (t = t || TinCan.versions()[0], e = 0; e < o.length; e += 1)
                if (null !== this[o[e]] && this[o[e]].length > 0)
                    if ("0.9" === t || "0.95" === t) this[o[e]].length > 1 && this.log("[warning] version does not support multiple values in: " + o[e]), i[o[e]] = this[o[e]][0].asVersion(t);
                    else
                        for (i[o[e]] = [], n = 0; n < this[o[e]].length; n += 1) i[o[e]].push(this[o[e]][n].asVersion(t));
            if (null !== this.category && this.category.length > 0) {
                if ("0.9" === t || "0.95" === t) throw this.log("[error] version does not support the 'category' property: " + t), new Error(t + " does not support the 'category' property");
                for (i.category = [], e = 0; e < this.category.length; e += 1) i.category.push(this.category[e].asVersion(t))
            }
            return i
        }
    }, t.fromJSON = function(e) {
        t.prototype.log("fromJSON");
        var n = JSON.parse(e);
        return new t(n)
    }
}(),
function() {
    "use strict";
    var t = TinCan.Context = function(t) {
        this.log("constructor"), this.registration = null, this.instructor = null, this.team = null, this.contextActivities = null, this.revision = null, this.platform = null, this.language = null, this.statement = null, this.extensions = null, this.init(t)
    };
    t.prototype = {
        LOG_SRC: "Context",
        log: TinCan.prototype.log,
        init: function(t) {
            this.log("init");
            var e, n, i, o = ["registration", "revision", "platform", "language", "extensions"],
                r = ["instructor", "team"];
            for (t = t || {}, e = 0; e < o.length; e += 1) n = o[e], t.hasOwnProperty(n) && null !== t[n] && (this[n] = t[n]);
            for (e = 0; e < r.length; e += 1) n = r[e], t.hasOwnProperty(n) && null !== t[n] && (i = t[n], ("undefined" == typeof i.objectType || "Person" === i.objectType) && (i.objectType = "Agent"), "Agent" !== i.objectType || i instanceof TinCan.Agent ? "Group" !== i.objectType || i instanceof TinCan.Group || (i = new TinCan.Group(i)) : i = new TinCan.Agent(i), this[n] = i);
            t.hasOwnProperty("contextActivities") && null !== t.contextActivities && (this.contextActivities = t.contextActivities instanceof TinCan.ContextActivities ? t.contextActivities : new TinCan.ContextActivities(t.contextActivities)), t.hasOwnProperty("statement") && null !== t.statement && (t.statement instanceof TinCan.StatementRef ? this.statement = t.statement : t.statement instanceof TinCan.SubStatement ? this.statement = t.statement : "StatementRef" === t.statement.objectType ? this.statement = new TinCan.StatementRef(t.statement) : "SubStatement" === t.statement.objectType ? this.statement = new TinCan.SubStatement(t.statement) : this.log("Unable to parse statement.context.statement property."))
        },
        asVersion: function(t) {
            this.log("asVersion");
            var e, n = {},
                i = ["registration", "revision", "platform", "language", "extensions"],
                o = ["instructor", "team", "contextActivities", "statement"];
            if (t = t || TinCan.versions()[0], this.statement instanceof TinCan.SubStatement && "0.9" !== t && "0.95" !== t) throw this.log("[error] version does not support SubStatements in the 'statement' property: " + t), new Error(t + " does not support SubStatements in the 'statement' property");
            for (e = 0; e < i.length; e += 1) null !== this[i[e]] && (n[i[e]] = this[i[e]]);
            for (e = 0; e < o.length; e += 1) null !== this[o[e]] && (n[o[e]] = this[o[e]].asVersion(t));
            return n
        }
    }, t.fromJSON = function(e) {
        t.prototype.log("fromJSON");
        var n = JSON.parse(e);
        return new t(n)
    }
}(),
function() {
    "use strict";
    var t = TinCan.StatementRef = function(t) {
        this.log("constructor"), this.id = null, this.init(t)
    };
    t.prototype = {
        objectType: "StatementRef",
        LOG_SRC: "StatementRef",
        log: TinCan.prototype.log,
        init: function(t) {
            this.log("init");
            var e, n = ["id"];
            for (t = t || {}, e = 0; e < n.length; e += 1) t.hasOwnProperty(n[e]) && null !== t[n[e]] && (this[n[e]] = t[n[e]])
        },
        toString: function() {
            return this.log("toString"), this.id
        },
        asVersion: function(t) {
            this.log("asVersion");
            var e = {
                objectType: this.objectType,
                id: this.id
            };
            return "0.9" === t && (e.objectType = "Statement"), e
        }
    }, t.fromJSON = function(e) {
        t.prototype.log("fromJSON");
        var n = JSON.parse(e);
        return new t(n)
    }
}(),
function() {
    "use strict";
    var t = TinCan.SubStatement = function(t) {
        this.log("constructor"), this.actor = null, this.verb = null, this.target = null, this.result = null, this.context = null, this.timestamp = null, this.init(t)
    };
    t.prototype = {
        objectType: "SubStatement",
        LOG_SRC: "SubStatement",
        log: TinCan.prototype.log,
        init: function(t) {
            this.log("init");
            var e, n = ["timestamp"];
            for (t = t || {}, t.hasOwnProperty("object") && (t.target = t.object), t.hasOwnProperty("actor") && (("undefined" == typeof t.actor.objectType || "Person" === t.actor.objectType) && (t.actor.objectType = "Agent"), "Agent" === t.actor.objectType ? this.actor = t.actor instanceof TinCan.Agent ? t.actor : new TinCan.Agent(t.actor) : "Group" === t.actor.objectType && (this.actor = t.actor instanceof TinCan.Group ? t.actor : new TinCan.Group(t.actor))), t.hasOwnProperty("verb") && (this.verb = t.verb instanceof TinCan.Verb ? t.verb : new TinCan.Verb(t.verb)), t.hasOwnProperty("target") && (t.target instanceof TinCan.Activity || t.target instanceof TinCan.Agent || t.target instanceof TinCan.Group || t.target instanceof TinCan.SubStatement || t.target instanceof TinCan.StatementRef ? this.target = t.target : ("undefined" == typeof t.target.objectType && (t.target.objectType = "Activity"), "Activity" === t.target.objectType ? this.target = new TinCan.Activity(t.target) : "Agent" === t.target.objectType ? this.target = new TinCan.Agent(t.target) : "Group" === t.target.objectType ? this.target = new TinCan.Group(t.target) : "SubStatement" === t.target.objectType ? this.target = new TinCan.SubStatement(t.target) : "StatementRef" === t.target.objectType ? this.target = new TinCan.StatementRef(t.target) : this.log("Unrecognized target type: " + t.target.objectType))), t.hasOwnProperty("result") && (this.result = t.result instanceof TinCan.Result ? t.result : new TinCan.Result(t.result)), t.hasOwnProperty("context") && (this.context = t.context instanceof TinCan.Context ? t.context : new TinCan.Context(t.context)), e = 0; e < n.length; e += 1) t.hasOwnProperty(n[e]) && null !== t[n[e]] && (this[n[e]] = t[n[e]])
        },
        toString: function(t) {
            return this.log("toString"), (null !== this.actor ? this.actor.toString(t) : "") + " " + (null !== this.verb ? this.verb.toString(t) : "") + " " + (null !== this.target ? this.target.toString(t) : "")
        },
        asVersion: function(t) {
            this.log("asVersion");
            var e, n, i = ["timestamp"],
                o = ["actor", "verb", "result", "context"];
            for (e = {
                    objectType: this.objectType
                }, t = t || TinCan.versions()[0], n = 0; n < i.length; n += 1) null !== this[i[n]] && (e[i[n]] = this[i[n]]);
            for (n = 0; n < o.length; n += 1) null !== this[o[n]] && (e[o[n]] = this[o[n]].asVersion(t));
            return null !== this.target && (e.object = this.target.asVersion(t)), "0.9" === t && (e.objectType = "Statement"), e
        }
    }, t.fromJSON = function(e) {
        t.prototype.log("fromJSON");
        var n = JSON.parse(e);
        return new t(n)
    }
}(),
function() {
    "use strict";
    var t = TinCan.Statement = function(t, e) {
        this.log("constructor"), e = "number" == typeof e ? {
            storeOriginal: e
        } : e || {}, "undefined" == typeof e.storeOriginal && (e.storeOriginal = null), "undefined" == typeof e.doStamp && (e.doStamp = !0), this.id = null, this.actor = null, this.verb = null, this.target = null, this.result = null, this.context = null, this.timestamp = null, this.stored = null, this.authority = null, this.version = null, this.degraded = !1, this.voided = null, this.inProgress = null, this.originalJSON = null, this.init(t, e)
    };
    t.prototype = {
        LOG_SRC: "Statement",
        log: TinCan.prototype.log,
        init: function(t, e) {
            this.log("init");
            var n, i = ["id", "stored", "timestamp", "version", "inProgress", "voided"];
            for (t = t || {}, e.storeOriginal && (this.originalJSON = JSON.stringify(t, null, e.storeOriginal)), t.hasOwnProperty("object") && (t.target = t.object), t.hasOwnProperty("actor") && (("undefined" == typeof t.actor.objectType || "Person" === t.actor.objectType) && (t.actor.objectType = "Agent"), "Agent" === t.actor.objectType ? this.actor = t.actor instanceof TinCan.Agent ? t.actor : new TinCan.Agent(t.actor) : "Group" === t.actor.objectType && (this.actor = t.actor instanceof TinCan.Group ? t.actor : new TinCan.Group(t.actor))), t.hasOwnProperty("authority") && (("undefined" == typeof t.authority.objectType || "Person" === t.authority.objectType) && (t.authority.objectType = "Agent"), "Agent" === t.authority.objectType ? this.authority = t.authority instanceof TinCan.Agent ? t.authority : new TinCan.Agent(t.authority) : "Group" === t.authority.objectType && (this.authority = t.actor instanceof TinCan.Group ? t.authority : new TinCan.Group(t.authority))), t.hasOwnProperty("verb") && (this.verb = t.verb instanceof TinCan.Verb ? t.verb : new TinCan.Verb(t.verb)),
                t.hasOwnProperty("target") && (t.target instanceof TinCan.Activity || t.target instanceof TinCan.Agent || t.target instanceof TinCan.Group || t.target instanceof TinCan.SubStatement || t.target instanceof TinCan.StatementRef ? this.target = t.target : ("undefined" == typeof t.target.objectType && (t.target.objectType = "Activity"), "Activity" === t.target.objectType ? this.target = new TinCan.Activity(t.target) : "Agent" === t.target.objectType ? this.target = new TinCan.Agent(t.target) : "Group" === t.target.objectType ? this.target = new TinCan.Group(t.target) : "SubStatement" === t.target.objectType ? this.target = new TinCan.SubStatement(t.target) : "StatementRef" === t.target.objectType ? this.target = new TinCan.StatementRef(t.target) : this.log("Unrecognized target type: " + t.target.objectType))), t.hasOwnProperty("result") && (this.result = t.result instanceof TinCan.Result ? t.result : new TinCan.Result(t.result)), t.hasOwnProperty("context") && (this.context = t.context instanceof TinCan.Context ? t.context : new TinCan.Context(t.context)), n = 0; n < i.length; n += 1) t.hasOwnProperty(i[n]) && null !== t[i[n]] && (this[i[n]] = t[i[n]]);
            e.doStamp && this.stamp()
        },
        toString: function(t) {
            return this.log("toString"), (null !== this.actor ? this.actor.toString(t) : "") + " " + (null !== this.verb ? this.verb.toString(t) : "") + " " + (null !== this.target ? this.target.toString(t) : "")
        },
        asVersion: function(t) {
            this.log("asVersion");
            var e, n = {},
                i = ["id", "timestamp"],
                o = ["actor", "verb", "result", "context", "authority"];
            for (t = t || TinCan.versions()[0], e = 0; e < i.length; e += 1) null !== this[i[e]] && (n[i[e]] = this[i[e]]);
            for (e = 0; e < o.length; e += 1) null !== this[o[e]] && (n[o[e]] = this[o[e]].asVersion(t));
            return null !== this.target && (n.object = this.target.asVersion(t)), ("0.9" === t || "0.95" === t) && null !== this.voided && (n.voided = this.voided), "0.9" === t && null !== this.inProgress && (n.inProgress = this.inProgress), n
        },
        stamp: function() {
            this.log("stamp"), null === this.id && (this.id = TinCan.Utils.getUUID()), null === this.timestamp && (this.timestamp = TinCan.Utils.getISODateString(new Date))
        }
    }, t.fromJSON = function(e) {
        t.prototype.log("fromJSON");
        var n = JSON.parse(e);
        return new t(n)
    }
}(),
function() {
    "use strict";
    var t = TinCan.StatementsResult = function(t) {
        this.log("constructor"), this.statements = null, this.more = null, this.init(t)
    };
    t.prototype = {
        LOG_SRC: "StatementsResult",
        log: TinCan.prototype.log,
        init: function(t) {
            this.log("init"), t = t || {}, t.hasOwnProperty("statements") && (this.statements = t.statements), t.hasOwnProperty("more") && (this.more = t.more)
        }
    }, t.fromJSON = function(e) {
        t.prototype.log("fromJSON");
        var n, i, o, r = [];
        try {
            n = JSON.parse(e)
        } catch (s) {
            t.prototype.log("fromJSON - JSON.parse error: " + s)
        }
        if (n) {
            for (o = 0; o < n.statements.length; o += 1) {
                try {
                    i = new TinCan.Statement(n.statements[o], 4)
                } catch (a) {
                    t.prototype.log("fromJSON - statement instantiation failed: " + a + " (" + JSON.stringify(n.statements[o]) + ")"), i = new TinCan.Statement({
                        id: n.statements[o].id
                    }, 4)
                }
                r.push(i)
            }
            n.statements = r
        }
        return new t(n)
    }
}(),
function() {
    "use strict";
    var t = TinCan.State = function(t) {
        this.log("constructor"), this.id = null, this.updated = null, this.contents = null, this.etag = null, this.contentType = null, this.init(t)
    };
    t.prototype = {
        LOG_SRC: "State",
        log: TinCan.prototype.log,
        init: function(t) {
            this.log("init");
            var e, n = ["id", "contents", "etag", "contentType"];
            for (t = t || {}, e = 0; e < n.length; e += 1) t.hasOwnProperty(n[e]) && null !== t[n[e]] && (this[n[e]] = t[n[e]]);
            this.updated = !1
        }
    }, t.fromJSON = function(e) {
        t.prototype.log("fromJSON");
        var n = JSON.parse(e);
        return new t(n)
    }
}(),
function() {
    "use strict";
    var t = TinCan.ActivityProfile = function(t) {
        this.log("constructor"), this.id = null, this.activity = null, this.updated = null, this.contents = null, this.etag = null, this.contentType = null, this.init(t)
    };
    t.prototype = {
        LOG_SRC: "ActivityProfile",
        log: TinCan.prototype.log,
        init: function(t) {
            this.log("init");
            var e, n = ["id", "contents", "etag", "contentType"];
            for (t = t || {}, t.hasOwnProperty("activity") && (this.activity = t.activity instanceof TinCan.Activity ? t.activity : new TinCan.Activity(t.activity)), e = 0; e < n.length; e += 1) t.hasOwnProperty(n[e]) && null !== t[n[e]] && (this[n[e]] = t[n[e]]);
            this.updated = !1
        }
    }, t.fromJSON = function(e) {
        t.prototype.log("fromJSON");
        var n = JSON.parse(e);
        return new t(n)
    }
}(),
function() {
    "use strict";
    var t = TinCan.AgentProfile = function(t) {
        this.log("constructor"), this.id = null, this.agent = null, this.updated = null, this.contents = null, this.etag = null, this.contentType = null, this.init(t)
    };
    t.prototype = {
        LOG_SRC: "AgentProfile",
        log: TinCan.prototype.log,
        init: function(t) {
            this.log("init");
            var e, n = ["id", "contents", "etag", "contentType"];
            for (t = t || {}, t.hasOwnProperty("agent") && (this.agent = t.agent instanceof TinCan.Agent ? t.agent : new TinCan.Agent(t.agent)), e = 0; e < n.length; e += 1) t.hasOwnProperty(n[e]) && null !== t[n[e]] && (this[n[e]] = t[n[e]]);
            this.updated = !1
        }
    }, t.fromJSON = function(e) {
        t.prototype.log("fromJSON");
        var n = JSON.parse(e);
        return new t(n)
    }
}(),
function() {
    "use strict";
    var t = TinCan.About = function(t) {
        this.log("constructor"), this.version = null, this.init(t)
    };
    t.prototype = {
        LOG_SRC: "About",
        log: TinCan.prototype.log,
        init: function(t) {
            this.log("init");
            var e, n = ["version"];
            for (t = t || {}, e = 0; e < n.length; e += 1) t.hasOwnProperty(n[e]) && null !== t[n[e]] && (this[n[e]] = t[n[e]])
        }
    }, t.fromJSON = function(e) {
        t.prototype.log("fromJSON");
        var n = JSON.parse(e);
        return new t(n)
    }
}(),
function() {
    "use strict";
    var LOG_SRC = "Environment.Browser",
        nativeRequest, xdrRequest, requestComplete, __delay, __IEModeConversion, env = {},
        log = TinCan.prototype.log;
    return "undefined" == typeof window ? void log("'window' not defined", LOG_SRC) : (window.JSON || (window.JSON = {
        parse: function(sJSON) {
            return eval("(" + sJSON + ")")
        },
        stringify: function(t) {
            var e, n, i = "";
            if (t instanceof Object) {
                if (t.constructor === Array) {
                    for (e = 0; e < t.length; e += 1) i += this.stringify(t[e]) + ",";
                    return "[" + i.substr(0, i.length - 1) + "]"
                }
                if (t.toString !== Object.prototype.toString) return '"' + t.toString().replace(/"/g, "\\$&") + '"';
                for (n in t) t.hasOwnProperty(n) && (i += '"' + n.replace(/"/g, "\\$&") + '":' + this.stringify(t[n]) + ",");
                return "{" + i.substr(0, i.length - 1) + "}"
            }
            return "string" == typeof t ? '"' + t.replace(/"/g, "\\$&") + '"' : String(t)
        }
    }), Date.now || (Date.now = function() {
        return +new Date
    }), env.hasCORS = !1, env.useXDR = !1, "undefined" != typeof XMLHttpRequest && "undefined" != typeof(new XMLHttpRequest).withCredentials ? env.hasCORS = !0 : "undefined" != typeof XDomainRequest && (env.hasCORS = !0, env.useXDR = !0), requestComplete = function(t, e, n) {
        log("requestComplete: " + n.finished + ", xhr.status: " + t.status, LOG_SRC);
        var i, o, r;
        return r = "undefined" == typeof t.status ? n.fakeStatus : 1223 === t.status ? 204 : t.status, n.finished ? i : (n.finished = !0, o = e.ignore404 && 404 === r, r >= 200 && 400 > r || o ? e.callback ? void e.callback(null, t) : i = {
            err: null,
            xhr: t
        } : (i = {
            err: r,
            xhr: t
        }, 0 === r ? log("[warning] There was a problem communicating with the Learning Record Store. Aborted, offline, or invalid CORS endpoint (" + r + ")", LOG_SRC) : log("[warning] There was a problem communicating with the Learning Record Store. (" + r + " | " + t.responseText + ")", LOG_SRC), e.callback && e.callback(r, t), i))
    }, __IEModeConversion = function(t, e, n, i) {
        var o;
        for (o in e) e.hasOwnProperty(o) && n.push(o + "=" + encodeURIComponent(e[o]));
        return "undefined" != typeof i.data && n.push("content=" + encodeURIComponent(i.data)), e["Content-Type"] = "application/x-www-form-urlencoded", t += "?method=" + i.method, i.method = "POST", i.params = {}, n.length > 0 && (i.data = n.join("&")), t
    }, nativeRequest = function(t, e, n) {
        log("sendRequest using XMLHttpRequest", LOG_SRC);
        var i, o, r, s, a = this,
            l = [],
            c = {
                finished: !1,
                fakeStatus: null
            },
            u = "undefined" != typeof n.callback,
            d = t,
            p = 2048;
        log("sendRequest using XMLHttpRequest - async: " + u, LOG_SRC);
        for (o in n.params) n.params.hasOwnProperty(o) && l.push(o + "=" + encodeURIComponent(n.params[o]));
        if (l.length > 0 && (d += "?" + l.join("&")), d.length >= p) {
            if ("undefined" != typeof e["Content-Type"] && "application/json" !== e["Content-Type"]) return s = new Error("Unsupported content type for IE Mode request"), "undefined" != typeof n.callback && n.callback(s, null), {
                err: s,
                xhr: null
            };
            if ("undefined" == typeof n.method) return s = new Error("method must not be undefined for an IE Mode Request conversion"), "undefined" != typeof n.callback && n.callback(s, null), {
                err: s,
                xhr: null
            };
            t = __IEModeConversion(t, e, l, n)
        } else t = d;
        i = "undefined" != typeof XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"), i.open(n.method, t, u);
        for (o in e) e.hasOwnProperty(o) && i.setRequestHeader(o, e[o]);
        "undefined" != typeof n.data && (n.data += ""), r = n.data, u && (i.onreadystatechange = function() {
            log("xhr.onreadystatechange - xhr.readyState: " + i.readyState, LOG_SRC), 4 === i.readyState && requestComplete.call(a, i, n, c)
        });
        try {
            i.send(r)
        } catch (h) {
            log("sendRequest caught send exception: " + h, LOG_SRC)
        }
        return u ? i : requestComplete.call(this, i, n, c)
    }, xdrRequest = function(t, e, n) {
        log("sendRequest using XDomainRequest", LOG_SRC);
        var i, o, r, s, a, l = this,
            c = [],
            u = {
                finished: !1,
                fakeStatus: null
            };
        if ("undefined" != typeof e["Content-Type"] && "application/json" !== e["Content-Type"]) return a = new Error("Unsupported content type for IE Mode request"), n.callback ? (n.callback(a, null), null) : {
            err: a,
            xhr: null
        };
        t += "?method=" + n.method;
        for (r in n.params) n.params.hasOwnProperty(r) && c.push(r + "=" + encodeURIComponent(n.params[r]));
        for (r in e) e.hasOwnProperty(r) && c.push(r + "=" + encodeURIComponent(e[r]));
        "undefined" != typeof n.data && c.push("content=" + encodeURIComponent(n.data)), o = c.join("&"), i = new XDomainRequest, i.open("POST", t), n.callback ? (i.onload = function() {
            u.fakeStatus = 200, requestComplete.call(l, i, n, u)
        }, i.onerror = function() {
            u.fakeStatus = 400, requestComplete.call(l, i, n, u)
        }, i.ontimeout = function() {
            u.fakeStatus = 0, requestComplete.call(l, i, n, u)
        }) : (i.onload = function() {
            u.fakeStatus = 200
        }, i.onerror = function() {
            u.fakeStatus = 400
        }, i.ontimeout = function() {
            u.fakeStatus = 0
        }), i.onprogress = function() {}, i.timeout = 0;
        try {
            i.send(o)
        } catch (d) {
            log("sendRequest caught send exception: " + d, LOG_SRC)
        }
        if (!n.callback) {
            for (s = 1e4 + Date.now(), log("sendRequest - until: " + s + ", finished: " + u.finished, LOG_SRC); Date.now() < s && null === u.fakeStatus;) __delay();
            return requestComplete.call(l, i, n, u)
        }
        return i
    }, TinCan.LRS.prototype._initByEnvironment = function(t) {
        log("_initByEnvironment", LOG_SRC);
        var e, n, i, o;
        if (t = t || {}, this._makeRequest = nativeRequest, this._IEModeConversion = __IEModeConversion, e = this.endpoint.toLowerCase().match(/([A-Za-z]+:)\/\/([^:\/]+):?(\d+)?(\/.*)?$/), null === e) throw log("[error] LRS invalid: failed to divide URL parts", LOG_SRC), {
            code: 4,
            mesg: "LRS invalid: failed to divide URL parts"
        };
        if (i = location.port, n = location.protocol.toLowerCase() === e[1], "" === i && (i = "http:" === location.protocol.toLowerCase() ? "80" : "https:" === location.protocol.toLowerCase() ? "443" : ""), o = !n || location.hostname.toLowerCase() !== e[2] || i !== (null !== e[3] && "undefined" != typeof e[3] && "" !== e[3] ? e[3] : "http:" === e[1] ? "80" : "https:" === e[1] ? "443" : ""))
            if (env.hasCORS) {
                if (env.useXDR && n) this._makeRequest = xdrRequest;
                else if (env.useXDR && !n) {
                    if (!t.allowFail) throw log("[error] LRS invalid: cross domain request for differing scheme in IE with XDR", LOG_SRC), {
                        code: 2,
                        mesg: "LRS invalid: cross domain request for differing scheme in IE with XDR"
                    };
                    log("[warning] LRS invalid: cross domain request for differing scheme in IE with XDR (allowed to fail)", LOG_SRC)
                }
            } else {
                if (!t.allowFail) throw log("[error] LRS invalid: cross domain requests not supported in this browser", LOG_SRC), {
                    code: 1,
                    mesg: "LRS invalid: cross domain requests not supported in this browser"
                };
                log("[warning] LRS invalid: cross domain requests not supported in this browser (allowed to fail)", LOG_SRC)
            }
    }, __delay = function() {
        var t = new XMLHttpRequest,
            e = window.location + "?forcenocache=" + TinCan.Utils.getUUID();
        t.open("GET", e, !1), t.send(null)
    }, void(TinCan.LRS.syncEnabled = !0))
}(), StringBuffer.prototype.append = function(t) {
    return this.buffer.push(t), this
}, StringBuffer.prototype.toString = function() {
    return this.buffer.join("")
};
var Base64 = {
    codex: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(t) {
        for (var e = new StringBuffer, n = new Utf8EncodeEnumerator(t); n.moveNext();) {
            var i = n.current;
            n.moveNext();
            var o = n.current;
            n.moveNext();
            var r = n.current,
                s = i >> 2,
                a = (3 & i) << 4 | o >> 4,
                l = (15 & o) << 2 | r >> 6,
                c = 63 & r;
            isNaN(o) ? l = c = 64 : isNaN(r) && (c = 64), e.append(this.codex.charAt(s) + this.codex.charAt(a) + this.codex.charAt(l) + this.codex.charAt(c))
        }
        return e.toString()
    },
    decode: function(t) {
        for (var e = new StringBuffer, n = new Base64DecodeEnumerator(t); n.moveNext();) {
            var i = n.current;
            if (128 > i) e.append(String.fromCharCode(i));
            else if (i > 191 && 224 > i) {
                n.moveNext();
                var o = n.current;
                e.append(String.fromCharCode((31 & i) << 6 | 63 & o))
            } else {
                n.moveNext();
                var o = n.current;
                n.moveNext();
                var r = n.current;
                e.append(String.fromCharCode((15 & i) << 12 | (63 & o) << 6 | 63 & r))
            }
        }
        return e.toString()
    }
};
Utf8EncodeEnumerator.prototype = {
    current: Number.NaN,
    moveNext: function() {
        if (this._buffer.length > 0) return this.current = this._buffer.shift(), !0;
        if (this._index >= this._input.length - 1) return this.current = Number.NaN, !1;
        var t = this._input.charCodeAt(++this._index);
        return 13 == t && 10 == this._input.charCodeAt(this._index + 1) && (t = 10, this._index += 2), 128 > t ? this.current = t : t > 127 && 2048 > t ? (this.current = t >> 6 | 192, this._buffer.push(63 & t | 128)) : (this.current = t >> 12 | 224, this._buffer.push(t >> 6 & 63 | 128), this._buffer.push(63 & t | 128)), !0
    }
}, Base64DecodeEnumerator.prototype = {
    current: 64,
    moveNext: function() {
        if (this._buffer.length > 0) return this.current = this._buffer.shift(), !0;
        if (this._index >= this._input.length - 1) return this.current = 64, !1;
        var t = Base64.codex.indexOf(this._input.charAt(++this._index)),
            e = Base64.codex.indexOf(this._input.charAt(++this._index)),
            n = Base64.codex.indexOf(this._input.charAt(++this._index)),
            i = Base64.codex.indexOf(this._input.charAt(++this._index)),
            o = t << 2 | e >> 4,
            r = (15 & e) << 4 | n >> 2,
            s = (3 & n) << 6 | i;
        return this.current = o, 64 != n && this._buffer.push(r), 64 != i && this._buffer.push(s), !0
    }
};
