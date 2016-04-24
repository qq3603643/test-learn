/*
 AngularJS v1.3.0-beta.8
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (n, e, A) {
    'use strict';

    function x(s, g, k) {
        return {
            restrict: "ECA",
            terminal: !0,
            priority: 400,
            transclude: "element",
            link: function (a, b, c, f, w) {
                function y() {
                    p && (p.remove(), p = null);
                    h && (h.$destroy(), h = null);
                    l && (k.leave(l, function () {
                        p = null
                    }), p = l, l = null)
                }

                function v() {
                    var c = s.current && s.current.locals;
                    if (e.isDefined(c && c.$template)) {
                        var c = a.$new(),
                            d = s.current;
                        l = w(c, function (d) {
                            k.enter(d, null, l || b, function () {
                                !e.isDefined(t) || t && !a.$eval(t) || g()
                            });
                            y()
                        });
                        h = d.scope = c;
                        h.$emit("$viewContentLoaded");
                        h.$eval(u)
                    } else y()
                }
                var h, l, p, t = c.autoscroll,
                    u = c.onload || "";
                a.$on("$routeChangeSuccess", v);
                v()
            }
        }
    }

    function z(e, g, k) {
        return {
            restrict: "ECA",
            priority: -400,
            link: function (a, b) {
                var c = k.current,
                    f = c.locals;
                b.html(f.$template);
                var w = e(b.contents());
                c.controller && (f.$scope = a, f = g(c.controller, f), c.controllerAs && (a[c.controllerAs] = f), b.data("$ngControllerController", f), b.children().data("$ngControllerController", f));
                w(a)
            }
        }
    }
    n = e.module("ngRoute", ["ng"]).provider("$route", function () {
        function s(a, b) {
            return e.extend(new(e.extend(function () {}, {
                prototype: a
            })), b)
        }

        function g(a, e) {
            var c = e.caseInsensitiveMatch,
                f = {
                    originalPath: a,
                    regexp: a
                },
                k = f.keys = [];
            a = a.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function (a, e, c, b) {
                a = "?" === b ? b : null;
                b = "*" === b ? b : null;
                k.push({
                    name: c,
                    optional: !!a
                });
                e = e || "";
                return "" + (a ? "" : e) + "(?:" + (a ? e : "") + (b && "(.+?)" || "([^/]+)") + (a || "") + ")" + (a || "")
            }).replace(/([\/$\*])/g, "\\$1");
            f.regexp = RegExp("^" + a + "$", c ? "i" : "");
            return f
        }
        var k = {};
        this.when = function (a, b) {
            k[a] = e.extend({
                reloadOnSearch: !0
            }, b, a && g(a, b));
            if (a) {
                var c =
                    "/" == a[a.length - 1] ? a.substr(0, a.length - 1) : a + "/";
                k[c] = e.extend({
                    redirectTo: a
                }, g(c, b))
            }
            return this
        };
        this.otherwise = function (a) {
            this.when(null, a);
            return this
        };
        this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$http", "$templateCache", "$sce", function (a, b, c, f, g, n, v, h) {
            function l() {
                var d = p(),
                    m = r.current;
                if (d && m && d.$$route === m.$$route && e.equals(d.pathParams, m.pathParams) && !d.reloadOnSearch && !u) m.params = d.params, e.copy(m.params, c), a.$broadcast("$routeUpdate", m);
                else if (d || m) u = !1, a.$broadcast("$routeChangeStart",
                    d, m), (r.current = d) && d.redirectTo && (e.isString(d.redirectTo) ? b.path(t(d.redirectTo, d.params)).search(d.params).replace() : b.url(d.redirectTo(d.pathParams, b.path(), b.search())).replace()), f.when(d).then(function () {
                    if (d) {
                        var a = e.extend({}, d.resolve),
                            b, c;
                        e.forEach(a, function (d, b) {
                            a[b] = e.isString(d) ? g.get(d) : g.invoke(d, null, null, b)
                        });
                        e.isDefined(b = d.template) ? e.isFunction(b) && (b = b(d.params)) : e.isDefined(c = d.templateUrl) && (e.isFunction(c) && (c = c(d.params)), c = h.getTrustedResourceUrl(c), e.isDefined(c) && (d.loadedTemplateUrl =
                            c, b = n.get(c, {
                                cache: v
                            }).then(function (a) {
                                return a.data
                            })));
                        e.isDefined(b) && (a.$template = b);
                        return f.all(a)
                    }
                }).then(function (b) {
                    d == r.current && (d && (d.locals = b, e.copy(d.params, c)), a.$broadcast("$routeChangeSuccess", d, m))
                }, function (b) {
                    d == r.current && a.$broadcast("$routeChangeError", d, m, b)
                })
            }

            function p() {
                var a, c;
                e.forEach(k, function (f, k) {
                    var q;
                    if (q = !c) {
                        var g = b.path();
                        q = f.keys;
                        var l = {};
                        if (f.regexp)
                            if (g = f.regexp.exec(g)) {
                                for (var h = 1, p = g.length; h < p; ++h) {
                                    var n = q[h - 1],
                                        r = "string" == typeof g[h] ? decodeURIComponent(g[h]) :
                                        g[h];
                                    n && r && (l[n.name] = r)
                                }
                                q = l
                            } else q = null;
                        else q = null;
                        q = a = q
                    }
                    q && (c = s(f, {
                        params: e.extend({}, b.search(), a),
                        pathParams: a
                    }), c.$$route = f)
                });
                return c || k[null] && s(k[null], {
                    params: {},
                    pathParams: {}
                })
            }

            function t(a, b) {
                var c = [];
                e.forEach((a || "").split(":"), function (a, d) {
                    if (0 === d) c.push(a);
                    else {
                        var e = a.match(/(\w+)(.*)/),
                            f = e[1];
                        c.push(b[f]);
                        c.push(e[2] || "");
                        delete b[f]
                    }
                });
                return c.join("")
            }
            var u = !1,
                r = {
                    routes: k,
                    reload: function () {
                        u = !0;
                        a.$evalAsync(l)
                    }
                };
            a.$on("$locationChangeSuccess", l);
            return r
        }]
    });
    n.provider("$routeParams",
        function () {
            this.$get = function () {
                return {}
            }
        });
    n.directive("ngView", x);
    n.directive("ngView", z);
    x.$inject = ["$route", "$anchorScroll", "$animate"];
    z.$inject = ["$compile", "$controller", "$route"]
})(window, window.angular);
//# sourceMappingURL=angular-route.min.js.map
