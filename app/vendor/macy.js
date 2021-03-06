! function (t, n) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : t.Macy = n()
}(this, function () {
    "use strict";

    function t(t, n) {
        var e = void 0;
        return function () {
            e && clearTimeout(e), e = setTimeout(t, n)
        }
    }

    function n(t, n) {
        for (var e = t.length, o = e, r = []; e--;) r.push(n(t[o - e - 1]));
        return r
    }

    function e(t, n) {
        E(t, n, arguments.length > 2 && void 0 !== arguments[2] && arguments[2])
    }

    function o(t) {
        var n = document.body.clientWidth,
            e = {
                columns: t.columns
            },
            o = void 0;
        _(t.margin) ? e.margin = {
            x: t.margin.x,
            y: t.margin.y
        } : e.margin = {
            x: t.margin,
            y: t.margin
        };
        for (var r = Object.keys(t.breakAt), i = r.length - 1; i >= 0; i--) {
            var s = parseInt(r[i], 10);
            n <= s && (o = t.breakAt[s], _(o) || (e.columns = o), _(o) && o.columns && (e.columns = o.columns), _(o) && o.margin && !_(o.margin) && (e.margin = {
                x: o.margin,
                y: o.margin
            }), _(o) && o.margin && _(o.margin) && o.margin.x && (e.margin.x = o.margin.x), _(o) && o.margin && _(o.margin) && o.margin.y && (e.margin.y = o.margin.y))
        }
        return e
    }

    function r(t) {
        return o(t).columns
    }

    function i(t) {
        return o(t).margin
    }

    function s(t) {
        var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
            e = r(t),
            o = i(t).x,
            s = 100 / e;
        return n ? 1 === e ? "100%" : (o = (e - 1) * o / e, "calc(" + s + "% - " + o + "px)") : s
    }

    function a(t, n) {
        var e = r(t.options),
            o = 0,
            a = void 0,
            c = void 0;
        return 1 === ++n ? 0 : (c = i(t.options).x, a = (c - (e - 1) * c / e) * (n - 1), o += s(t.options, !1) * (n - 1), "calc(" + o + "% + " + a + "px)")
    }

    function c(t) {
        var n = 0,
            e = t.container;
        p(t.rows, function (t) {
            n = t > n ? t : n
        }), e.style.height = n + "px"
    }

    function u(t, n) {
        var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            o = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
            s = r(t.options),
            a = i(t.options).y;
        b(t, s, e), p(n, function (n) {
            var e = 0,
                r = parseInt(n.offsetHeight, 10);
            isNaN(r) || (t.rows.forEach(function (n, o) {
                n < t.rows[e] && (e = o)
            }), n.style.position = "absolute", n.style.top = t.rows[e] + "px", n.style.left = "" + t.cols[e], t.rows[e] += isNaN(r) ? 0 : r + a, o && (n.dataset.macyComplete = 1))
        }), o && (t.tmpRows = null), c(t)
    }

    function l(t, n) {
        var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            o = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
            s = r(t.options),
            a = i(t.options).y;
        b(t, s, e), p(n, function (n) {
            t.lastcol === s && (t.lastcol = 0);
            var e = L(n, "height");
            e = parseInt(n.offsetHeight, 10), isNaN(e) || (n.style.position = "absolute", n.style.top = t.rows[t.lastcol] + "px", n.style.left = "" + t.cols[t.lastcol], t.rows[t.lastcol] += isNaN(e) ? 0 : e + a, t.lastcol += 1, o && (n.dataset.macyComplete = 1))
        }), o && (t.tmpRows = null), c(t)
    }
    var h = function t(n, e) {
        if (!(this instanceof t)) return new t(n, e);
        if (n = n.replace(/^\s*/, "").replace(/\s*$/, ""), e) return this.byCss(n, e);
        for (var o in this.selectors)
            if (e = o.split("/"), new RegExp(e[1], e[2]).test(n)) return this.selectors[o](n);
        return this.byCss(n)
    };
    h.prototype.byCss = function (t, n) {
        return (n || document).querySelectorAll(t)
    }, h.prototype.selectors = {}, h.prototype.selectors[/^\.[\w\-]+$/] = function (t) {
        return document.getElementsByClassName(t.substring(1))
    }, h.prototype.selectors[/^\w+$/] = function (t) {
        return document.getElementsByTagName(t)
    }, h.prototype.selectors[/^\#[\w\-]+$/] = function (t) {
        return document.getElementById(t.substring(1))
    };
    var p = function (t, n) {
            for (var e = t.length, o = e; e--;) n(t[o - e - 1])
        },
        f = function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            this.running = !1, this.events = [], this.add(t)
        };
    f.prototype.run = function () {
        if (!this.running && this.events.length > 0) {
            var t = this.events.shift();
            this.running = !0, t(), this.running = !1, this.run()
        }
    }, f.prototype.add = function () {
        var t = this,
            n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return !!n && (Array.isArray(n) ? p(n, function (n) {
            return t.add(n)
        }) : (this.events.push(n), void this.run()))
    }, f.prototype.clear = function () {
        this.events = []
    };
    var m = function (t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return this.instance = t, this.data = n, this
        },
        v = function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            this.events = {}, this.instance = t
        };
    v.prototype.on = function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return !(!t || !n) && (Array.isArray(this.events[t]) || (this.events[t] = []), this.events[t].push(n))
    }, v.prototype.emit = function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (!t || !Array.isArray(this.events[t])) return !1;
        var e = new m(this.instance, n);
        p(this.events[t], function (t) {
            return t(e)
        })
    };
    var d = function (t) {
            return !("naturalHeight" in t && t.naturalHeight + t.naturalWidth === 0) || t.width + t.height !== 0
        },
        g = function (t, n) {
            var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return new Promise(function (t, e) {
                if (n.complete) return d(n) ? t(n) : e(n);
                n.addEventListener("load", function () {
                    return d(n) ? t(n) : e(n)
                }), n.addEventListener("error", function () {
                    return e(n)
                })
            }).then(function (n) {
                e && t.emit(t.constants.EVENT_IMAGE_LOAD, {
                    img: n
                })
            }).catch(function (n) {
                return t.emit(t.constants.EVENT_IMAGE_ERROR, {
                    img: n
                })
            })
        },
        y = function (t, e) {
            var o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return n(e, function (n) {
                return g(t, n, o)
            })
        },
        E = function (t, n) {
            var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return Promise.all(y(t, n, e)).then(function () {
                t.emit(t.constants.EVENT_IMAGE_COMPLETE)
            })
        },
        w = function (n) {
            return t(function () {
                n.emit(n.constants.EVENT_RESIZE), n.queue.add(function () {
                    return n.recalculate(!0, !0)
                })
            }, 100)
        },
        A = function (t) {
            if (t.container = h(t.options.container), t.container instanceof h || !t.container) return !!t.options.debug && console.error("Error: Container not found");
            delete t.options.container, t.container.length && (t.container = t.container[0]), t.container.style.position = "relative"
        },
        I = function (t) {
            t.queue = new f, t.events = new v(t), t.rows = [], t.resizer = w(t)
        },
        N = function (t) {
            var n = h("img", t.container);
            window.addEventListener("resize", t.resizer), t.on(t.constants.EVENT_IMAGE_LOAD, function () {
                return t.recalculate(!1, !1)
            }), t.on(t.constants.EVENT_IMAGE_COMPLETE, function () {
                return t.recalculate(!0, !0)
            }), t.options.useOwnImageLoader || e(t, n, !t.options.waitForImages), t.emit(t.constants.EVENT_INITIALIZED)
        },
        T = function (t) {
            A(t), I(t), N(t)
        },
        _ = function (t) {
            return t === Object(t) && "[object Array]" !== Object.prototype.toString.call(t)
        },
        L = function (t, n) {
            return window.getComputedStyle(t, null).getPropertyValue(n)
        },
        b = function (t, n) {
            var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (t.lastcol || (t.lastcol = 0), t.rows.length < 1 && (e = !0), e) {
                t.rows = [], t.cols = [], t.lastcol = 0;
                for (var o = n - 1; o >= 0; o--) t.rows[o] = 0, t.cols[o] = a(t, o)
            } else if (t.tmpRows) {
                t.rows = [];
                for (var o = n - 1; o >= 0; o--) t.rows[o] = t.tmpRows[o]
            } else {
                t.tmpRows = [];
                for (var o = n - 1; o >= 0; o--) t.tmpRows[o] = t.rows[o]
            }
        },
        O = function (t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                e = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                o = n ? t.container.children : h(':scope > *:not([data-macy-complete="1"])', t.container),
                r = s(t.options);
            return p(o, function (t) {
                n && (t.dataset.macyComplete = 0), t.style.width = r
            }), t.options.trueOrder ? (l(t, o, n, e), t.emit(t.constants.EVENT_RECALCULATED)) : (u(t, o, n, e), t.emit(t.constants.EVENT_RECALCULATED))
        },
        M = Object.assign || function (t) {
            for (var n = 1; n < arguments.length; n++) {
                var e = arguments[n];
                for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
            }
            return t
        },
        C = {
            columns: 4,
            margin: 2,
            trueOrder: !1,
            waitForImages: !1,
            useImageLoader: !0,
            breakAt: {},
            useOwnImageLoader: !1,
            onInit: !1
        };
    ! function () {
        try {
            document.createElement("a").querySelector(":scope *")
        } catch (t) {
            ! function () {
                function t(t) {
                    return function (e) {
                        if (e && n.test(e)) {
                            var o = this.getAttribute("id");
                            o || (this.id = "q" + Math.floor(9e6 * Math.random()) + 1e6), arguments[0] = e.replace(n, "#" + this.id);
                            var r = t.apply(this, arguments);
                            return null === o ? this.removeAttribute("id") : o || (this.id = o), r
                        }
                        return t.apply(this, arguments)
                    }
                }
                var n = /:scope\b/gi,
                    e = t(Element.prototype.querySelector);
                Element.prototype.querySelector = function (t) {
                    return e.apply(this, arguments)
                };
                var o = t(Element.prototype.querySelectorAll);
                Element.prototype.querySelectorAll = function (t) {
                    return o.apply(this, arguments)
                }
            }()
        }
    }();
    var V = function t() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : C;
        if (!(this instanceof t)) return new t(n);
        this.options = {}, M(this.options, C, n), T(this)
    };
    return V.init = function (t) {
        return console.warn("Depreciated: Macy.init will be removed in v3.0.0 opt to use Macy directly like so Macy({ /*options here*/ }) "), new V(t)
    }, V.prototype.recalculateOnImageLoad = function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return e(this, h("img", this.container), !t)
    }, V.prototype.runOnImageLoad = function (t) {
        var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            o = h("img", this.container);
        return this.on(this.constants.EVENT_IMAGE_COMPLETE, t), n && this.on(this.constants.EVENT_IMAGE_LOAD, t), e(this, o, n)
    }, V.prototype.recalculate = function () {
        var t = this,
            n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        return e && this.queue.clear(), this.queue.add(function () {
            return O(t, n, e)
        })
    }, V.prototype.remove = function () {
        window.removeEventListener("resize", this.resizer), p(this.container.children, function (t) {
            t.removeAttribute("data-macy-complete"), t.removeAttribute("style")
        }), this.container.removeAttribute("style")
    }, V.prototype.reInit = function () {
        this.recalculate(!0, !0), this.emit(this.constants.EVENT_INITIALIZED), window.addEventListener("resize", this.resizer), this.container.style.position = "relative"
    }, V.prototype.on = function (t, n) {
        this.events.on(t, n)
    }, V.prototype.emit = function (t, n) {
        this.events.emit(t, n)
    }, V.constants = {
        EVENT_INITIALIZED: "macy.initialized",
        EVENT_RECALCULATED: "macy.recalculated",
        EVENT_IMAGE_LOAD: "macy.image.load",
        EVENT_IMAGE_ERROR: "macy.image.error",
        EVENT_IMAGE_COMPLETE: "macy.images.complete",
        EVENT_RESIZE: "macy.resize"
    }, V.prototype.constants = V.constants, V
});
