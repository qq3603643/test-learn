/*
 AngularJS v1.3.0-beta.13
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (x, e, P) {
    'use strict';
    e.module("ngAnimate", ["ng"]).factory("$$animateReflow", ["$$rAF", "$document", function (e, x) {
        return function (f) {
            return e(function () {
                f()
            })
        }
    }]).config(["$provide", "$animateProvider", function (ba, I) {
        function f(e) {
            for (var f = 0; f < e.length; f++) {
                var g = e[f];
                if (g.nodeType == Y) return g
            }
        }

        function B(g) {
            return e.element(f(g))
        }
        var l = e.noop,
            g = e.forEach,
            Q = I.$$selectors,
            Y = 1,
            h = "$$ngAnimateState",
            H = "ng-animate",
            n = {
                running: !0
            };
        ba.decorator("$animate", ["$delegate", "$injector", "$sniffer", "$rootElement",
"$$asyncCallback", "$rootScope", "$document",
            function (u, x, X, J, F, G, P) {
                function R(a) {
                    if (a) {
                        var b = [],
                            c = {};
                        a = a.substr(1).split(".");
                        (X.transitions || X.animations) && b.push(x.get(Q[""]));
                        for (var d = 0; d < a.length; d++) {
                            var e = a[d],
                                g = Q[e];
                            g && !c[e] && (b.push(x.get(g)), c[e] = !0)
                        }
                        return b
                    }
                }

                function K(a, b, c) {
                    function d(a, b) {
                        var c = a[b],
                            d = a["before" + b.charAt(0).toUpperCase() + b.substr(1)];
                        if (c || d) return "leave" == b && (d = c, c = null), s.push({
                            event: b,
                            fn: c
                        }), k.push({
                            event: b,
                            fn: d
                        }), !0
                    }

                    function C(b, d, e) {
                        var f = [];
                        g(b, function (a) {
                            a.fn &&
                                f.push(a)
                        });
                        var C = 0;
                        g(f, function (b, z) {
                            var S = function () {
                                a: {
                                    if (d) {
                                        (d[z] || l)();
                                        if (++C < f.length) break a;
                                        d = null
                                    }
                                    e()
                                }
                            };
                            switch (b.event) {
                                case "setClass":
                                    d.push(b.fn(a, q, w, S));
                                    break;
                                case "addClass":
                                    d.push(b.fn(a, q || c, S));
                                    break;
                                case "removeClass":
                                    d.push(b.fn(a, w || c, S));
                                    break;
                                default:
                                    d.push(b.fn(a, S))
                            }
                        });
                        d && 0 === d.length && e()
                    }
                    var f = a[0];
                    if (f) {
                        var h = "setClass" == b,
                            n = h || "addClass" == b || "removeClass" == b,
                            q, w;
                        e.isArray(c) && (q = c[0], w = c[1], c = q + " " + w);
                        var y = a.attr("class") + " " + c;
                        if (L(y)) {
                            var p = l,
                                E = [],
                                k = [],
                                A = l,
                                m = [],
                                s = [],
                                y = (" " + y).replace(/\s+/g, ".");
                            g(R(y), function (a) {
                                !d(a, b) && h && (d(a, "addClass"), d(a, "removeClass"))
                            });
                            return {
                                node: f,
                                event: b,
                                className: c,
                                isClassBased: n,
                                isSetClassOperation: h,
                                before: function (a) {
                                    p = a;
                                    C(k, E, function () {
                                        p = l;
                                        a()
                                    })
                                },
                                after: function (a) {
                                    A = a;
                                    C(s, m, function () {
                                        A = l;
                                        a()
                                    })
                                },
                                cancel: function () {
                                    E && (g(E, function (a) {
                                        (a || l)(!0)
                                    }), p(!0));
                                    m && (g(m, function (a) {
                                        (a || l)(!0)
                                    }), A(!0))
                                }
                            }
                        }
                    }
                }

                function v(a, b, c, d, f, n, l) {
                    function x(d) {
                        var f = "$animate:" + d;
                        A && (A[f] && 0 < A[f].length) && F(function () {
                            c.triggerHandler(f, {
                                event: a,
                                className: b
                            })
                        })
                    }

                    function q() {
                        x("before")
                    }

                    function w() {
                        x("after")
                    }

                    function u() {
                        x("close");
                        l && F(function () {
                            l()
                        })
                    }

                    function p() {
                        p.hasBeenRun || (p.hasBeenRun = !0, n())
                    }

                    function E() {
                        if (!E.hasBeenRun) {
                            E.hasBeenRun = !0;
                            var d = c.data(h);
                            d && (k && k.isClassBased ? y(c, b) : (F(function () {
                                var d = c.data(h) || {};
                                G == d.index && y(c, b, a)
                            }), c.data(h, d)));
                            u()
                        }
                    }
                    var k = K(c, a, b);
                    if (k) {
                        b = k.className;
                        var A = e.element._data(k.node),
                            A = A && A.events;
                        d || (d = f ? f.parent() : c.parent());
                        var m = c.data(h) || {};
                        f = m.active || {};
                        var s = m.totalActive || 0,
                            v = m.last;
                        if (k.isClassBased && (m.disabled || v && !v.isClassBased) || M(c, d)) p(), q(), w(), E();
                        else {
                            d = !1;
                            if (0 < s) {
                                m = [];
                                if (k.isClassBased) "setClass" == v.event ? (m.push(v), y(c, b)) : f[b] && (D = f[b], D.event == a ? d = !0 : (m.push(D), y(c, b)));
                                else if ("leave" == a && f["ng-leave"]) d = !0;
                                else {
                                    for (var D in f) m.push(f[D]), y(c, D);
                                    f = {};
                                    s = 0
                                }
                                0 < m.length && g(m, function (a) {
                                    a.cancel()
                                })
                            }!k.isClassBased || (k.isSetClassOperation || d) || (d = "addClass" == a == c.hasClass(b));
                            if (d) p(), q(), w(), u();
                            else {
                                if ("leave" == a) c.one("$destroy", function (a) {
                                    a = e.element(this);
                                    var b =
                                        a.data(h);
                                    b && (b = b.active["ng-leave"]) && (b.cancel(), y(a, "ng-leave"))
                                });
                                c.addClass(H);
                                var G = N++;
                                s++;
                                f[b] = k;
                                c.data(h, {
                                    last: k,
                                    active: f,
                                    index: G,
                                    totalActive: s
                                });
                                q();
                                k.before(function (d) {
                                    var f = c.data(h);
                                    d = d || !f || !f.active[b] || k.isClassBased && f.active[b].event != a;
                                    p();
                                    !0 === d ? E() : (w(), k.after(E))
                                })
                            }
                        }
                    } else p(), q(), w(), E()
                }

                function T(a) {
                    if (a = f(a)) a = e.isFunction(a.getElementsByClassName) ? a.getElementsByClassName(H) : a.querySelectorAll("." + H), g(a, function (a) {
                        a = e.element(a);
                        (a = a.data(h)) && a.active && g(a.active, function (a) {
                            a.cancel()
                        })
                    })
                }

                function y(a, b) {
                    if (f(a) == f(J)) n.disabled || (n.running = !1, n.structural = !1);
                    else if (b) {
                        var c = a.data(h) || {},
                            d = !0 === b;
                        !d && (c.active && c.active[b]) && (c.totalActive--, delete c.active[b]);
                        if (d || !c.totalActive) a.removeClass(H), a.removeData(h)
                    }
                }

                function M(a, b) {
                    if (n.disabled) return !0;
                    if (f(a) == f(J)) return n.disabled || n.running;
                    do {
                        if (0 === b.length) break;
                        var c = f(b) == f(J),
                            d = c ? n : b.data(h) || {},
                            d = d.disabled || d.running ? !0 : d.last && !d.last.isClassBased;
                        if (c || d) return d;
                        if (c) break
                    } while (b = b.parent());
                    return !0
                }
                var N = 0;
                J.data(h,
                    n);
                G.$$postDigest(function () {
                    G.$$postDigest(function () {
                        n.running = !1
                    })
                });
                var O = I.classNameFilter(),
                    L = O ? function (a) {
                        return O.test(a)
                    } : function () {
                        return !0
                    };
                return {
                    enter: function (a, b, c, d) {
                        a = e.element(a);
                        b = b && e.element(b);
                        c = c && e.element(c);
                        this.enabled(!1, a);
                        u.enter(a, b, c);
                        G.$$postDigest(function () {
                            a = B(a);
                            v("enter", "ng-enter", a, b, c, l, d)
                        })
                    },
                    leave: function (a, b) {
                        a = e.element(a);
                        T(a);
                        this.enabled(!1, a);
                        G.$$postDigest(function () {
                            v("leave", "ng-leave", B(a), null, null, function () {
                                u.leave(a)
                            }, b)
                        })
                    },
                    move: function (a,
                        b, c, d) {
                        a = e.element(a);
                        b = b && e.element(b);
                        c = c && e.element(c);
                        T(a);
                        this.enabled(!1, a);
                        u.move(a, b, c);
                        G.$$postDigest(function () {
                            a = B(a);
                            v("move", "ng-move", a, b, c, l, d)
                        })
                    },
                    addClass: function (a, b, c) {
                        a = e.element(a);
                        a = B(a);
                        v("addClass", b, a, null, null, function () {
                            u.addClass(a, b)
                        }, c)
                    },
                    removeClass: function (a, b, c) {
                        a = e.element(a);
                        a = B(a);
                        v("removeClass", b, a, null, null, function () {
                            u.removeClass(a, b)
                        }, c)
                    },
                    setClass: function (a, b, c, d) {
                        a = e.element(a);
                        a = B(a);
                        v("setClass", [b, c], a, null, null, function () {
                            u.setClass(a, b, c)
                        }, d)
                    },
                    enabled: function (a,
                        b) {
                        switch (arguments.length) {
                            case 2:
                                if (a) y(b);
                                else {
                                    var c = b.data(h) || {};
                                    c.disabled = !0;
                                    b.data(h, c)
                                }
                                break;
                            case 1:
                                n.disabled = !a;
                                break;
                            default:
                                a = !n.disabled
                        }
                        return !!a
                    }
                }
            }]);
        I.register("", ["$window", "$sniffer", "$timeout", "$$animateReflow", function (h, n, B, J) {
            function F(a, b) {
                D && D();
                U.push(b);
                D = J(function () {
                    g(U, function (a) {
                        a()
                    });
                    U = [];
                    D = null;
                    m = {}
                })
            }

            function G(a, b) {
                var c = f(a);
                a = e.element(c);
                V.push(a);
                c = Date.now() + b;
                c <= $ || (B.cancel(Z), $ = c, Z = B(function () {
                    H(V);
                    V = []
                }, b, !1))
            }

            function H(a) {
                g(a, function (a) {
                    (a = a.data(p)) &&
                    (a.closeAnimationFn || l)()
                })
            }

            function R(a, b) {
                var d = b ? m[b] : null;
                if (!d) {
                    var f = 0,
                        e = 0,
                        k = 0,
                        t = 0,
                        p, r, n, l;
                    g(a, function (a) {
                        if (a.nodeType == Y) {
                            a = h.getComputedStyle(a) || {};
                            n = a[c + Q];
                            f = Math.max(K(n), f);
                            l = a[c + W];
                            p = a[c + q];
                            e = Math.max(K(p), e);
                            r = a[C + q];
                            t = Math.max(K(r), t);
                            var b = K(a[C + Q]);
                            0 < b && (b *= parseInt(a[C + w], 10) || 1);
                            k = Math.max(b, k)
                        }
                    });
                    d = {
                        total: 0,
                        transitionPropertyStyle: l,
                        transitionDurationStyle: n,
                        transitionDelayStyle: p,
                        transitionDelay: e,
                        transitionDuration: f,
                        animationDelayStyle: r,
                        animationDelay: t,
                        animationDuration: k
                    };
                    b && (m[b] = d)
                }
                return d
            }

            function K(a) {
                var b = 0;
                a = e.isString(a) ? a.split(/\s*,\s*/) : [];
                g(a, function (a) {
                    b = Math.max(parseFloat(a) || 0, b)
                });
                return b
            }

            function v(a, b, d) {
                a = 0 <= ["ng-enter", "ng-leave", "ng-move"].indexOf(d);
                var e, g = b.parent(),
                    k = g.data(aa);
                k || (g.data(aa, ++s), k = s);
                e = k + "-" + f(b).getAttribute("class");
                var g = e + " " + d,
                    k = m[g] ? ++m[g].total : 0,
                    t = {};
                if (0 < k) {
                    var h = d + "-stagger",
                        t = e + " " + h;
                    (e = !m[t]) && b.addClass(h);
                    t = R(b, t);
                    e && b.removeClass(h)
                }
                b.addClass(d);
                var h = b.data(p) || {},
                    r = R(b, g);
                e = r.transitionDuration;
                r = r.animationDuration;
                if (a && 0 === e && 0 === r) return b.removeClass(d), !1;
                d = a && 0 < e;
                a = 0 < r && 0 < t.animationDelay && 0 === t.animationDuration;
                b.data(p, {
                    stagger: t,
                    cacheKey: g,
                    running: h.running || 0,
                    itemIndex: k,
                    blockTransition: d,
                    blockAnimation: a,
                    closeAnimationFn: l
                });
                b = f(b);
                d && (b.style[c + W] = "none");
                a && (b.style[C] = "none 0s");
                return !0
            }

            function T(a, z, e, h) {
                function m(a) {
                    z.off(H, n);
                    z.removeClass(l);
                    L(z, e);
                    a = f(z);
                    for (var b in u) a.style.removeProperty(u[b])
                }

                function n(a) {
                    a.stopPropagation();
                    var b = a.originalEvent || a;
                    a = b.$manualTimeStamp || b.timeStamp ||
                        Date.now();
                    b = parseFloat(b.elapsedTime.toFixed(E));
                    Math.max(a - F, 0) >= D && b >= v && h()
                }
                var t = f(z);
                a = z.data(p);
                if (-1 != t.getAttribute("class").indexOf(e) && a) {
                    a.blockTransition && (t.style[c + W] = "");
                    a.blockAnimation && (t.style[C] = "");
                    var l = "";
                    g(e.split(" "), function (a, b) {
                        l += (0 < b ? " " : "") + a + "-active"
                    });
                    z.addClass(l);
                    var r = R(z, a.cacheKey + " " + l),
                        v = Math.max(r.transitionDuration, r.animationDuration);
                    if (0 === v) z.removeClass(l), L(z, e), h();
                    else {
                        var x = Math.max(r.transitionDelay, r.animationDelay),
                            q = a.stagger,
                            w = a.itemIndex,
                            D = x * A,
                            s = "",
                            u = [];
                        if (0 < r.transitionDuration) {
                            var B = r.transitionPropertyStyle; - 1 == B.indexOf("all") && (s += b + "transition-property: " + B + ";", s += b + "transition-duration: " + r.transitionDurationStyle + ";", u.push(b + "transition-property"), u.push(b + "transition-duration"))
                        }
                        0 < w && (0 < q.transitionDelay && 0 === q.transitionDuration && (s += b + "transition-delay: " + y(r.transitionDelayStyle, q.transitionDelay, w) + "; ", u.push(b + "transition-delay")), 0 < q.animationDelay && 0 === q.animationDuration && (s += b + "animation-delay: " + y(r.animationDelayStyle,
                            q.animationDelay, w) + "; ", u.push(b + "animation-delay")));
                        0 < u.length && (r = t.getAttribute("style") || "", t.setAttribute("style", r + "; " + s));
                        var F = Date.now(),
                            H = I + " " + d;
                        z.on(H, n);
                        a.closeAnimationFn = function () {
                            m();
                            h()
                        };
                        t = (w * (Math.max(q.animationDelay, q.transitionDelay) || 0) + (x + v) * k) * A;
                        a.running++;
                        G(z, t);
                        return m
                    }
                } else h()
            }

            function y(a, b, c) {
                var d = "";
                g(a.split(","), function (a, e) {
                    d += (0 < e ? "," : "") + (c * b + parseInt(a, 10)) + "s"
                });
                return d
            }

            function M(a, b, c, d) {
                if (v(a, b, c, d)) return function (a) {
                    a && L(b, c)
                }
            }

            function N(a, b, c,
                d) {
                if (b.data(p)) return T(a, b, c, d);
                L(b, c);
                d()
            }

            function O(a, b, c, d) {
                var e = M(a, b, c);
                if (e) {
                    var f = e;
                    F(b, function () {
                        f = N(a, b, c, d)
                    });
                    return function (a) {
                        (f || l)(a)
                    }
                }
                d()
            }

            function L(a, b) {
                a.removeClass(b);
                var c = a.data(p);
                c && (c.running && c.running--, c.running && 0 !== c.running || a.removeData(p))
            }

            function a(a, b) {
                var c = "";
                a = e.isArray(a) ? a : a.split(/\s+/);
                g(a, function (a, d) {
                    a && 0 < a.length && (c += (0 < d ? " " : "") + a + b)
                });
                return c
            }
            var b = "",
                c, d, C, I;
            x.ontransitionend === P && x.onwebkittransitionend !== P ? (b = "-webkit-", c = "WebkitTransition",
                d = "webkitTransitionEnd transitionend") : (c = "transition", d = "transitionend");
            x.onanimationend === P && x.onwebkitanimationend !== P ? (b = "-webkit-", C = "WebkitAnimation", I = "webkitAnimationEnd animationend") : (C = "animation", I = "animationend");
            var Q = "Duration",
                W = "Property",
                q = "Delay",
                w = "IterationCount",
                aa = "$$ngAnimateKey",
                p = "$$ngAnimateCSS3Data",
                E = 3,
                k = 1.5,
                A = 1E3,
                m = {},
                s = 0,
                U = [],
                D, Z = null,
                $ = 0,
                V = [];
            return {
                enter: function (a, b) {
                    return O("enter", a, "ng-enter", b)
                },
                leave: function (a, b) {
                    return O("leave", a, "ng-leave", b)
                },
                move: function (a,
                    b) {
                    return O("move", a, "ng-move", b)
                },
                beforeSetClass: function (b, c, d, e) {
                    c = a(d, "-remove") + " " + a(c, "-add");
                    if (c = M("setClass", b, c)) return F(b, e), c;
                    e()
                },
                beforeAddClass: function (b, c, d) {
                    if (c = M("addClass", b, a(c, "-add"))) return F(b, d), c;
                    d()
                },
                beforeRemoveClass: function (b, c, d) {
                    if (c = M("removeClass", b, a(c, "-remove"))) return F(b, d), c;
                    d()
                },
                setClass: function (b, c, d, e) {
                    d = a(d, "-remove");
                    c = a(c, "-add");
                    return N("setClass", b, d + " " + c, e)
                },
                addClass: function (b, c, d) {
                    return N("addClass", b, a(c, "-add"), d)
                },
                removeClass: function (b,
                    c, d) {
                    return N("removeClass", b, a(c, "-remove"), d)
                }
            }
        }])
    }])
})(window, window.angular);
//# sourceMappingURL=angular-animate.min.js.map
