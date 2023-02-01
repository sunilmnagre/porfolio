(function () {
  var d;
  function aa(a) {
    var b = 0;
    return function () {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    };
  }
  function ba(a) {
    var b =
      "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return b ? b.call(a) : { next: aa(a) };
  }
  function h(a) {
    if (!(a instanceof Array)) {
      a = ba(a);
      for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
      a = c;
    }
    return a;
  }
  var ca =
      "function" == typeof Object.create
        ? Object.create
        : function (a) {
            function b() {}
            b.prototype = a;
            return new b();
          },
    da;
  if ("function" == typeof Object.setPrototypeOf) da = Object.setPrototypeOf;
  else {
    var ea;
    a: {
      var fa = { $a: !0 },
        ha = {};
      try {
        ha.__proto__ = fa;
        ea = ha.$a;
        break a;
      } catch (a) {}
      ea = !1;
    }
    da = ea
      ? function (a, b) {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  var ia = da;
  function l(a, b) {
    a.prototype = ca(b.prototype);
    a.prototype.constructor = a;
    if (ia) ia(a, b);
    else
      for (var c in b)
        if ("prototype" != c)
          if (Object.defineProperties) {
            var e = Object.getOwnPropertyDescriptor(b, c);
            e && Object.defineProperty(a, c, e);
          } else a[c] = b[c];
    a.sa = b.prototype;
  }
  var ja =
      "function" == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, b, c) {
            a != Array.prototype && a != Object.prototype && (a[b] = c.value);
          },
    ka =
      "undefined" != typeof window && window === this
        ? this
        : "undefined" != typeof global && null != global
        ? global
        : this;
  function la(a, b) {
    if (b) {
      var c = ka;
      a = a.split(".");
      for (var e = 0; e < a.length - 1; e++) {
        var f = a[e];
        f in c || (c[f] = {});
        c = c[f];
      }
      a = a[a.length - 1];
      e = c[a];
      b = b(e);
      b != e &&
        null != b &&
        ja(c, a, { configurable: !0, writable: !0, value: b });
    }
  }
  la("Object.is", function (a) {
    return a
      ? a
      : function (a, c) {
          return a === c ? 0 !== a || 1 / a === 1 / c : a !== a && c !== c;
        };
  });
  la("Array.prototype.includes", function (a) {
    return a
      ? a
      : function (a, c) {
          var b = this;
          b instanceof String && (b = String(b));
          var f = b.length;
          c = c || 0;
          for (0 > c && (c = Math.max(c + f, 0)); c < f; c++) {
            var g = b[c];
            if (g === a || Object.is(g, a)) return !0;
          }
          return !1;
        };
  });
  la("String.prototype.includes", function (a) {
    return a
      ? a
      : function (a, c) {
          if (null == this)
            throw new TypeError(
              "The 'this' value for String.prototype.includes must not be null or undefined"
            );
          if (a instanceof RegExp)
            throw new TypeError(
              "First argument to String.prototype.includes must not be a regular expression"
            );
          return -1 !== this.indexOf(a, c || 0);
        };
  });
  var m = this;
  function n(a) {
    return "string" == typeof a;
  }
  function ma() {}
  function na(a) {
    var b = typeof a;
    if ("object" == b)
      if (a) {
        if (a instanceof Array) return "array";
        if (a instanceof Object) return b;
        var c = Object.prototype.toString.call(a);
        if ("[object Window]" == c) return "object";
        if (
          "[object Array]" == c ||
          ("number" == typeof a.length &&
            "undefined" != typeof a.splice &&
            "undefined" != typeof a.propertyIsEnumerable &&
            !a.propertyIsEnumerable("splice"))
        )
          return "array";
        if (
          "[object Function]" == c ||
          ("undefined" != typeof a.call &&
            "undefined" != typeof a.propertyIsEnumerable &&
            !a.propertyIsEnumerable("call"))
        )
          return "function";
      } else return "null";
    else if ("function" == b && "undefined" == typeof a.call) return "object";
    return b;
  }
  function p(a) {
    return "array" == na(a);
  }
  function r(a) {
    var b = typeof a;
    return ("object" == b && null != a) || "function" == b;
  }
  var oa =
    Date.now ||
    function () {
      return +new Date();
    };
  function t(a, b) {
    u.prototype[a] = b;
  }
  function pa(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.sa = b.prototype;
    a.prototype = new c();
    a.prototype.constructor = a;
    a.Ob = function (a, c, g) {
      for (
        var e = Array(arguments.length - 2), f = 2;
        f < arguments.length;
        f++
      )
        e[f - 2] = arguments[f];
      return b.prototype[c].apply(a, e);
    };
  }
  var qa = null;
  function ra() {
    var a = sa;
    qa || ((qa = this), (this.a = a), ta(this));
    return qa;
  }
  function ua() {
    var a = document;
    a = void 0 === a ? document : a;
    return [].concat(h(a.querySelectorAll("[data-comp]")));
  }
  function ta(a) {
    ua().forEach(function (b) {
      return va(a, b);
    });
  }
  function va(a, b) {
    var c = b.getAttribute("data-comp").split(" ");
    [].concat(h(c)).forEach(function (c) {
      var e = a.a[c],
        g = "data-props-" + c.toLowerCase(),
        k = {};
      try {
        k = JSON.parse(b.getAttribute(g));
      } catch (q) {
        wa(c, q.message);
      }
      "function" === typeof e
        ? new e(b, k)
        : wa(c, "Function not found in REGISTRY");
    });
  }
  function wa(a, b) {
    console.warn("Error bootstrapping data-comp " + a + ": " + b);
  }
  var v = Array.prototype.indexOf
      ? function (a, b) {
          return Array.prototype.indexOf.call(a, b, void 0);
        }
      : function (a, b) {
          if (n(a)) return n(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
          for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
          return -1;
        },
    w = Array.prototype.forEach
      ? function (a, b, c) {
          Array.prototype.forEach.call(a, b, c);
        }
      : function (a, b, c) {
          for (var e = a.length, f = n(a) ? a.split("") : a, g = 0; g < e; g++)
            g in f && b.call(c, f[g], g, a);
        },
    xa = Array.prototype.filter
      ? function (a, b) {
          return Array.prototype.filter.call(a, b, void 0);
        }
      : function (a, b) {
          for (
            var c = a.length, e = [], f = 0, g = n(a) ? a.split("") : a, k = 0;
            k < c;
            k++
          )
            if (k in g) {
              var q = g[k];
              b.call(void 0, q, k, a) && (e[f++] = q);
            }
          return e;
        };
  function ya(a) {
    return Array.prototype.concat.apply([], arguments);
  }
  function za(a) {
    var b = a.length;
    if (0 < b) {
      for (var c = Array(b), e = 0; e < b; e++) c[e] = a[e];
      return c;
    }
    return [];
  }
  var x = String.prototype.trim
    ? function (a) {
        return a.trim();
      }
    : function (a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
      };
  function Aa(a, b) {
    var c = 0;
    a = x(String(a)).split(".");
    b = x(String(b)).split(".");
    for (var e = Math.max(a.length, b.length), f = 0; 0 == c && f < e; f++) {
      var g = a[f] || "",
        k = b[f] || "";
      do {
        g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
        k = /(\d*)(\D*)(.*)/.exec(k) || ["", "", "", ""];
        if (0 == g[0].length && 0 == k[0].length) break;
        c =
          Ba(
            0 == g[1].length ? 0 : parseInt(g[1], 10),
            0 == k[1].length ? 0 : parseInt(k[1], 10)
          ) ||
          Ba(0 == g[2].length, 0 == k[2].length) ||
          Ba(g[2], k[2]);
        g = g[3];
        k = k[3];
      } while (0 == c);
    }
    return c;
  }
  function Ba(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  function y(a) {
    return String(a)
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase();
  }
  var A;
  a: {
    var Ca = m.navigator;
    if (Ca) {
      var Da = Ca.userAgent;
      if (Da) {
        A = Da;
        break a;
      }
    }
    A = "";
  }
  function B(a) {
    return -1 != A.indexOf(a);
  }
  function Ea(a) {
    var b = Fa,
      c;
    for (c in b) a.call(void 0, b[c], c, b);
  }
  function C(a, b) {
    return null !== a && b in a;
  }
  function Ga(a) {
    var b = arguments.length;
    if (1 == b && p(arguments[0])) return Ga.apply(null, arguments[0]);
    for (var c = {}, e = 0; e < b; e++) c[arguments[e]] = !0;
    return c;
  }
  function Ha() {
    return B("Firefox") || B("FxiOS");
  }
  function Ia() {
    return (
      B("Safari") &&
      !(
        Ja() ||
        B("Coast") ||
        B("Opera") ||
        B("Edge") ||
        Ha() ||
        B("Silk") ||
        B("Android")
      )
    );
  }
  function Ja() {
    return (B("Chrome") || B("CriOS")) && !B("Edge");
  }
  function Ka() {
    return B("Android") && !(Ja() || Ha() || B("Opera") || B("Silk"));
  }
  function La() {
    return B("iPhone") && !B("iPod") && !B("iPad");
  }
  function D() {
    return La() || B("iPad") || B("iPod");
  }
  function Ma(a) {
    Ma[" "](a);
    return a;
  }
  Ma[" "] = ma;
  function Na(a, b) {
    var c = E.ub;
    return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : (c[a] = b(a));
  }
  var E = { ba: !1, aa: !1, wa: !1, Aa: !1, da: !1, ea: !1, Oa: !1 };
  E.M = E.ba || E.aa || E.wa || E.da || E.Aa || E.ea;
  E.oa = function () {
    return A;
  };
  E.na = function () {
    return m.navigator || null;
  };
  E.Qb = function () {
    return E.na();
  };
  E.G = E.M ? E.ea : B("Opera");
  E.j = E.M ? E.ba : B("Trident") || B("MSIE");
  E.F = E.M ? E.aa : B("Edge");
  E.Eb = E.F || E.j;
  E.Ga = E.M
    ? E.wa
    : B("Gecko") &&
      !(-1 != A.toLowerCase().indexOf("webkit") && !B("Edge")) &&
      !(B("Trident") || B("MSIE")) &&
      !B("Edge");
  E.I = E.M
    ? E.Aa || E.da
    : -1 != A.toLowerCase().indexOf("webkit") && !B("Edge");
  E.R = function () {
    return E.I && B("Mobile");
  };
  E.Xa = E.da || E.R();
  E.ja = E.I;
  E.bb = function () {
    var a = E.na();
    return (a && a.platform) || "";
  };
  E.Lb = E.bb();
  E.ya = !1;
  E.Ba = !1;
  E.xa = !1;
  E.Ca = !1;
  E.L = !1;
  E.D = !1;
  E.C = !1;
  E.ca = !1;
  E.Pa = !1;
  E.m = E.ya || E.Ba || E.xa || E.Ca || E.L || E.D || E.C || E.ca;
  E.Wa = E.m ? E.ya : B("Macintosh");
  E.Za = E.m ? E.Ba : B("Windows");
  E.rb = function () {
    return B("Linux") || B("CrOS");
  };
  E.Va = E.m ? E.xa : E.rb();
  E.vb = function () {
    var a = E.na();
    return !!a && -1 != (a.appVersion || "").indexOf("X11");
  };
  E.Nb = E.m ? E.Ca : E.vb();
  E.W = E.m ? E.L : B("Android");
  E.O = E.m ? E.D : La();
  E.N = E.m ? E.C : B("iPad");
  E.Fb = E.m ? E.ca : B("iPod");
  E.Ta = E.m ? E.D || E.C || E.ca : D();
  var Oa;
  E.m ? (Oa = E.Pa) : (Oa = -1 != A.toLowerCase().indexOf("kaios"));
  E.Gb = Oa;
  E.ma = function () {
    var a = "",
      b = E.kb();
    b && (a = b ? b[1] : "");
    return E.j && ((b = E.Ja()), null != b && b > parseFloat(a))
      ? String(b)
      : a;
  };
  E.kb = function () {
    var a = E.oa();
    if (E.Ga) return /rv:([^\);]+)(\)|;)/.exec(a);
    if (E.F) return /Edge\/([\d\.]+)/.exec(a);
    if (E.j) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
    if (E.I) return /WebKit\/(\S+)/.exec(a);
    if (E.G) return /(?:Version)[ \/]?(\S+)/.exec(a);
  };
  E.Ja = function () {
    var a = m.document;
    return a ? a.documentMode : void 0;
  };
  E.VERSION = E.ma();
  E.compare = function (a, b) {
    return Aa(a, b);
  };
  E.ub = {};
  E.$ = function (a) {
    return (
      E.Oa ||
      Na(a, function () {
        return 0 <= Aa(E.VERSION, a);
      })
    );
  };
  E.qa = E.$;
  E.La = function (a) {
    return Number(E.Qa) >= a;
  };
  E.Rb = E.La;
  var Pa;
  var Qa = m.document;
  Pa =
    Qa && E.j
      ? E.Ja() || ("CSS1Compat" == Qa.compatMode ? parseInt(E.VERSION, 10) : 5)
      : void 0;
  E.Qa = Pa;
  var Ra = E.j || E.G || E.I;
  function Sa(a, b) {
    this.width = a;
    this.height = b;
  }
  d = Sa.prototype;
  d.toString = function () {
    return "(" + this.width + " x " + this.height + ")";
  };
  d.aspectRatio = function () {
    return this.width / this.height;
  };
  d.ceil = function () {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this;
  };
  d.floor = function () {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this;
  };
  d.round = function () {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this;
  };
  function F(a) {
    var b = document;
    return n(a) ? b.getElementById(a) : a;
  }
  function G(a, b) {
    var c = b || document;
    return c.querySelectorAll && c.querySelector
      ? c.querySelectorAll("." + a)
      : Ta(document, a, b);
  }
  function H(a, b) {
    var c = b || document;
    if (c.getElementsByClassName) a = c.getElementsByClassName(a)[0];
    else {
      c = document;
      var e = b || c;
      a =
        e.querySelectorAll && e.querySelector && a
          ? e.querySelector(a ? "." + a : "")
          : Ta(c, a, b)[0] || null;
    }
    return a || null;
  }
  function Ta(a, b, c) {
    var e;
    a = c || a;
    if (a.querySelectorAll && a.querySelector && b)
      return a.querySelectorAll(b ? "." + b : "");
    if (b && a.getElementsByClassName) {
      var f = a.getElementsByClassName(b);
      return f;
    }
    f = a.getElementsByTagName("*");
    if (b) {
      var g = {};
      for (c = e = 0; (a = f[c]); c++) {
        var k = a.className,
          q;
        if ((q = "function" == typeof k.split)) q = 0 <= v(k.split(/\s+/), b);
        q && (g[e++] = a);
      }
      g.length = e;
      return g;
    }
    return f;
  }
  function Ua(a) {
    return void 0 !== a.previousElementSibling
      ? a.previousElementSibling
      : I(a.previousSibling, !1);
  }
  function I(a, b) {
    for (; a && 1 != a.nodeType; ) a = b ? a.nextSibling : a.previousSibling;
    return a;
  }
  function J(a) {
    var b;
    if (
      Ra &&
      !(
        E.j &&
        E.$("9") &&
        !E.$("10") &&
        m.SVGElement &&
        a instanceof m.SVGElement
      ) &&
      (b = a.parentElement)
    )
      return b;
    b = a.parentNode;
    return r(b) && 1 == b.nodeType ? b : null;
  }
  E.product = {};
  E.product.va = !1;
  E.product.D = !1;
  E.product.C = !1;
  E.product.L = !1;
  E.product.ua = !1;
  E.product.za = !1;
  E.product.H =
    E.ba ||
    E.aa ||
    E.ea ||
    E.product.va ||
    E.product.D ||
    E.product.C ||
    E.product.L ||
    E.product.ua ||
    E.product.za;
  E.product.G = E.G;
  E.product.j = E.j;
  E.product.F = E.F;
  E.product.Fa = E.product.H ? E.product.va : Ha();
  E.product.qb = function () {
    return La() || B("iPod");
  };
  E.product.O = E.product.H ? E.product.D : E.product.qb();
  E.product.N = E.product.H ? E.product.C : B("iPad");
  E.product.W = E.product.H ? E.product.L : Ka();
  E.product.Da = E.product.H ? E.product.ua : Ja();
  E.product.tb = function () {
    return Ia() && !D();
  };
  E.product.ja = E.product.H ? E.product.za : E.product.tb();
  var Va = !E.product.j && !Ia();
  function Wa(a, b) {
    if (/-[a-z]/.test(b)) return null;
    if (Va && a.dataset) {
      if (Ka() && !(b in a.dataset)) return null;
      a = a.dataset[b];
      return void 0 === a ? null : a;
    }
    return a.getAttribute("data-" + y(b));
  }
  var Xa = { name: "unknown", id: 0 },
    Ya = { name: "opera", id: 0 },
    Za = { name: "safari", id: 0 },
    $a = { name: "ie", id: 2 },
    ab = { name: "firefox", id: 3 },
    bb = { name: "chrome", id: 4 },
    cb = { name: "EDGE", id: 5 },
    db = { name: "EDGIUM", id: 5 },
    eb = /(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/,
    fb = [
      { P: /en_us|en_ca|en_sg|en_ph/, Y: "en" },
      { P: /en_au|en_hk|en_in|en_ie|en_pk|en_uk/, Y: "en-GB" },
      { P: /pt_ALL|pt-PT_ALL/, Y: "pt-PT" },
      { P: /iw_ALL/, Y: "iw" },
      {
        P: /pt-BR_ALL|zh-CN_ALL|zh-HK_ALL|zh-TW_ALL|es-419_ALL|no_ALL/,
        Ya: "_ALL",
      },
    ];
  function u() {
    this.b = E.oa();
    this.f = "";
    this.R = !1;
    this.g = this.h = this.a = this.c = this.i = "";
    var a = E.product.G,
      b = E.product.Fa,
      c = E.j,
      e = E.product.F,
      f =
        -1 !== this.b.indexOf("Edg/") ||
        !(!window.external || !window.external.getHostEnvironmentValue),
      g =
        E.N || E.O
          ? -1 < navigator.userAgent.indexOf("Version") &&
            -1 < navigator.userAgent.indexOf("Safari")
          : E.product.ja;
    if (E.N || E.O ? -1 < navigator.userAgent.indexOf("CriOS") : E.product.Da)
      this.a = bb;
    b && (this.a = ab);
    c && (this.a = this.Ka());
    e && (this.a = cb);
    f && (this.a = db);
    a && (this.a = Ya);
    g && (this.a = Za);
    this.Na(void 0);
    this.R = E.Xa || null !== this.b.match(eb);
    this.i = this.Ma();
  }
  d = u.prototype;
  d.jb = function () {
    return this.f;
  };
  d.Na = function (a) {
    var b = Wa(document.body, "channel");
    if (E.Za) {
      if (
        null !== this.b.match(".*NT 5.1.*") ||
        null !== this.b.match(".*NT 5.2.*")
      )
        this.c = "xp";
      null !== this.b.match(".*NT 6.0.*") && (this.c = "vista");
      null !== this.b.match(".*NT 6.1.*") && (this.c = "win7");
      6.2 <= gb(this) && 10 > gb(this) && (this.c = "win8");
      10 <= gb(this) && (this.c = "win10");
      this.ra(this.c);
      if (this.a === cb || this.a === db) {
        var c = "no api";
        if (window.external && window.external.getHostEnvironmentValue) {
          var e = window.external.getHostEnvironmentValue("os-mode");
          e && e.match && (c = e.match(/\d/)[0] || null);
        }
        "no api" === c
          ? (this.g = "smode_noapi")
          : "0" === c
          ? (this.g = "smode_unlocked")
          : "2" === c && (this.g = "smode_locked");
      } else this.g = "none";
      this.f = a
        ? "xp" === this.c || "vista" === this.c
          ? "win49"
          : ("canary" !== b && "dev" !== b && "beta" !== b) ||
            ("win8" !== this.c && "win7" !== this.c)
          ? null !== this.b.match("WOW64") || null !== this.b.match("Win64")
            ? "win64"
            : "win"
          : "win110"
        : "win";
    }
    E.Wa && (this.ra(hb(this)), (this.f = this.Ha(a)));
    E.Va && (this.f = E.W ? "android" : B("CrOS") ? "chromeOS" : "linux");
    if (E.N || E.O) this.f = "ios";
  };
  d.cb = function () {
    return this.a.id;
  };
  d.eb = function () {
    return this.a.name;
  };
  d.Z = function (a) {
    return a === this.a.name;
  };
  d.gb = function () {
    return this.i;
  };
  function hb(a) {
    a = a.b.match(/Mac OS X (\d[\._\d]+)/);
    var b = "";
    a && ((a = (a[1] || a).split("_")), (b = a[0] + "." + a[1]));
    return b.toString();
  }
  d.sb = function () {
    return this.R;
  };
  d.Bb = function (a) {
    this.R = a;
  };
  d.Ha = function (a) {
    if (a) {
      a = hb(this).split(".");
      a = a[1] ? Number(a[1]) : 0;
      if (6 <= a && 8 >= a) return "mac49";
      if (9 === a) return "mac65";
      if (10 === a) return "mac88";
      if (10 < a && 13 > a) return "mac104";
    }
    return "mac";
  };
  d.Ka = function () {
    if (-1 !== this.b.indexOf("Windows CE")) return Xa;
    if (-1 === this.b.indexOf("PPC") || -1 === this.b.indexOf("Smartphone"))
      return $a;
  };
  function gb(a) {
    return (a = a.b.match(/Windows NT (\d*\.\d*)/)) ? +a[1] : a;
  }
  d.lb = function () {
    return this.c;
  };
  d.Ma = function () {
    for (
      var a = F(document.body).getAttribute("data-locale"),
        b = F(document.documentElement).getAttribute("lang"),
        c = 0;
      c < fb.length;
      c++
    ) {
      var e = fb[c].Y,
        f = fb[c].Ya;
      if (fb[c].P.test(a)) {
        b = e ? e : a.replace(f, "");
        break;
      }
    }
    return b;
  };
  d.fb = function () {
    return this.f + "-" + this.f;
  };
  d.ra = function (a) {
    this.h = a;
  };
  d.ib = function () {
    return this.h;
  };
  d.hb = function () {
    return this.g;
  };
  t("getOSModeVariant", u.prototype.hb);
  t("getOSVersion", u.prototype.ib);
  t("setOSVersion", u.prototype.ra);
  t("getCurrentPlatformBrowser", u.prototype.fb);
  t("mapLanguageByLocale", u.prototype.Ma);
  t("getWindowsVersion", u.prototype.lb);
  t("handleIEBrowserVersion", u.prototype.Ka);
  t("checkOSXPlatform", u.prototype.Ha);
  t("setMobile", u.prototype.Bb);
  t("isMobile", u.prototype.sb);
  t("getLang", u.prototype.gb);
  t("checkBrowser", u.prototype.Z);
  t("getBrowserName", u.prototype.eb);
  t("getBrowserId_", u.prototype.cb);
  t("setPlatformAndVersion", u.prototype.Na);
  t("getPlatform", u.prototype.jb);
  function ib() {
    this.s = new u();
    jb(this);
  }
  function jb(a) {
    var b = a.s.f,
      c = a.s.h,
      e = a.s.a.name,
      f = a.s.g;
    w(G("environment", document), function (g) {
      var k = g.getAttribute("data-environment"),
        q = !1;
      0 === k.indexOf("not ") && ((q = !0), (k = k.replace("not ", "")));
      k = k.split(",");
      if (3 === k.length || 4 === k.length) {
        var z = ba(kb(k));
        k = z.next().value;
        var zb = z.next().value,
          Ab = z.next().value;
        z = z.next().value;
        z = void 0 === z ? "" : z;
        q
          ? (K(k, b) && K(zb, c) && K(Ab, e) && K(z, f)) || a.a(g)
          : K(k, b) && K(zb, c) && K(Ab, e) && K(z, f) && a.a(g);
      } else console.error("[EnvRenderer] The keys to render the following element are malformed.Please review."), console.error(g);
    });
  }
  function K(a, b) {
    var c;
    (c = !a) ||
      ((c = na(a)),
      (c =
        ("array" == c || ("object" == c && "number" == typeof a.length)) &&
        0 <= v(a, b)));
    return c || a === b ? !0 : !1;
  }
  function kb(a) {
    w(a, function (b, c) {
      "ALL" === b ? (a[c] = "") : b.includes("|") && (a[c] = b.split("|"));
    });
    return a;
  }
  ib.prototype.a = function (a) {
    L(a, "environment--active");
  };
  function M(a, b) {
    this.Ra = a;
    this.b = b;
  }
  function lb(a) {
    var b = mb;
    this.S ||
      (this.S = new IntersectionObserver(function (b, e) {
        b.forEach(function (b) {
          if (b.isIntersecting) {
            var c = b.target;
            a(b.target);
            e.unobserve(c);
          }
        });
      }, b));
    return this.S;
  }
  var mb = { rootMargin: "400px", threshold: 0 };
  function nb(a, b) {
    M.call(this, a, b);
    this.S = null;
    this.S = lb(this.a);
    this.S.observe(this.Ra);
  }
  l(nb, M);
  nb.prototype.a = function (a) {
    a.classList.contains("js-lazy-async") || ob(a);
  };
  function ob(a) {
    switch (a.tagName) {
      case "PICTURE":
        var b = a.querySelector("[data-src]");
        [].concat(h(a.querySelectorAll("[data-srcset]"))).forEach(function (a) {
          a.setAttribute("srcset", a.getAttribute("data-srcset"));
        });
        b.setAttribute("src", b.getAttribute("data-src"));
        break;
      case "IMG":
        b = a;
        b.setAttribute("srcset", b.getAttribute("data-srcset"));
        b.setAttribute("src", b.getAttribute("data-src"));
        this.s = new u();
        if (!this.s.Z(Za.name)) break;
        if (
          !(
            !/-[a-z]/.test("applySafariLazyFix") &&
            (Va && b.dataset
              ? "applySafariLazyFix" in b.dataset
              : b.hasAttribute
              ? b.hasAttribute("data-" + y("applySafariLazyFix"))
              : b.getAttribute("data-" + y("applySafariLazyFix")))
          )
        )
          break;
        var c = a.parentElement;
        if (c.classList.contains("js-subanimation")) break;
        var e = c.className;
        c.className = "hide";
        setTimeout(function () {
          c.className = e;
        }, 5);
        break;
      case "VIDEO":
        b = a;
        for (var f in b.children)
          (a = b.children[f]),
            "string" === typeof a.tagName &&
              "SOURCE" === a.tagName &&
              a.setAttribute("src", a.getAttribute("data-src"));
        b.load();
    }
  }
  function pb(a) {
    (a = G("js-lazy-async", a)) &&
      Array.prototype.forEach.call(a, function (a) {
        ob(a);
      });
  }
  function qb(a) {
    ib.apply(this, arguments);
  }
  l(qb, ib);
  qb.prototype.a = function (a) {
    ib.prototype.a.call(this, a);
    pb(a);
  };
  function rb(a) {
    if (a.classList) return a.classList;
    a = a.className;
    return (n(a) && a.match(/\S+/g)) || [];
  }
  function N(a, b) {
    return a.classList ? a.classList.contains(b) : 0 <= v(rb(a), b);
  }
  function L(a, b) {
    a.classList
      ? a.classList.add(b)
      : N(a, b) || (a.className += 0 < a.className.length ? " " + b : b);
  }
  function O(a, b) {
    a.classList
      ? a.classList.remove(b)
      : N(a, b) &&
        (a.className = xa(rb(a), function (a) {
          return a != b;
        }).join(" "));
  }
  function sb(a) {
    var b = [
      "chr-full-bleed-hero__button",
      "chr-cta__button--download",
      "chr-scrollable-hero__download-cta",
      "cta-animated-border",
      "inline-active",
    ];
    a.classList
      ? w(b, function (b) {
          O(a, b);
        })
      : (a.className = xa(rb(a), function (a) {
          return !(0 <= v(b, a));
        }).join(" "));
  }
  function tb() {
    this.a = E;
  }
  function ub(a, b) {
    M.call(this, a, b);
    this.body = a || document.body;
    a = this.a = new tb();
    b = "no-mobile";
    a.a.Ta
      ? (b = "ios")
      : a.a.W
      ? (b = "android")
      : B("CrOS") && (b = "chromeOS");
    L(this.body, b);
  }
  l(ub, M);
  var vb =
    Object.freeze ||
    function (a) {
      return a;
    };
  var wb = !E.j || E.La(9),
    xb = E.j && !E.$("9"),
    yb = (function () {
      if (!m.addEventListener || !Object.defineProperty) return !1;
      var a = !1,
        b = Object.defineProperty({}, "passive", {
          get: function () {
            a = !0;
          },
        });
      try {
        m.addEventListener("test", ma, b), m.removeEventListener("test", ma, b);
      } catch (c) {}
      return a;
    })();
  function Bb(a, b) {
    this.type = a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.b = !1;
  }
  Bb.prototype.stopPropagation = function () {
    this.b = !0;
  };
  Bb.prototype.preventDefault = function () {
    this.defaultPrevented = !0;
  };
  function P(a, b) {
    Bb.call(this, a ? a.type : "");
    this.relatedTarget = this.currentTarget = this.target = null;
    this.button =
      this.screenY =
      this.screenX =
      this.clientY =
      this.clientX =
      this.offsetY =
      this.offsetX =
        0;
    this.key = "";
    this.charCode = this.keyCode = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.state = null;
    this.pointerId = 0;
    this.pointerType = "";
    this.a = null;
    if (a) {
      var c = (this.type = a.type),
        e =
          a.changedTouches && a.changedTouches.length
            ? a.changedTouches[0]
            : null;
      this.target = a.target || a.srcElement;
      this.currentTarget = b;
      if ((b = a.relatedTarget)) {
        if (E.Ga) {
          a: {
            try {
              Ma(b.nodeName);
              var f = !0;
              break a;
            } catch (g) {}
            f = !1;
          }
          f || (b = null);
        }
      } else
        "mouseover" == c
          ? (b = a.fromElement)
          : "mouseout" == c && (b = a.toElement);
      this.relatedTarget = b;
      e
        ? ((this.clientX = void 0 !== e.clientX ? e.clientX : e.pageX),
          (this.clientY = void 0 !== e.clientY ? e.clientY : e.pageY),
          (this.screenX = e.screenX || 0),
          (this.screenY = e.screenY || 0))
        : ((this.offsetX = E.I || void 0 !== a.offsetX ? a.offsetX : a.layerX),
          (this.offsetY = E.I || void 0 !== a.offsetY ? a.offsetY : a.layerY),
          (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX),
          (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY),
          (this.screenX = a.screenX || 0),
          (this.screenY = a.screenY || 0));
      this.button = a.button;
      this.keyCode = a.keyCode || 0;
      this.key = a.key || "";
      this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
      this.ctrlKey = a.ctrlKey;
      this.altKey = a.altKey;
      this.shiftKey = a.shiftKey;
      this.metaKey = a.metaKey;
      this.pointerId = a.pointerId || 0;
      this.pointerType = n(a.pointerType)
        ? a.pointerType
        : Cb[a.pointerType] || "";
      this.state = a.state;
      this.a = a;
      a.defaultPrevented && this.preventDefault();
    }
  }
  pa(P, Bb);
  var Cb = vb({ 2: "touch", 3: "pen", 4: "mouse" });
  P.prototype.stopPropagation = function () {
    P.sa.stopPropagation.call(this);
    this.a.stopPropagation
      ? this.a.stopPropagation()
      : (this.a.cancelBubble = !0);
  };
  P.prototype.preventDefault = function () {
    P.sa.preventDefault.call(this);
    var a = this.a;
    if (a.preventDefault) a.preventDefault();
    else if (((a.returnValue = !1), xb))
      try {
        if (a.ctrlKey || (112 <= a.keyCode && 123 >= a.keyCode)) a.keyCode = -1;
      } catch (b) {}
  };
  var Db = "closure_listenable_" + ((1e6 * Math.random()) | 0),
    Eb = 0;
  function Fb(a, b, c, e, f) {
    this.listener = a;
    this.proxy = null;
    this.src = b;
    this.type = c;
    this.capture = !!e;
    this.a = f;
    this.key = ++Eb;
    this.T = this.ka = !1;
  }
  function Gb(a) {
    a.T = !0;
    a.listener = null;
    a.proxy = null;
    a.src = null;
    a.a = null;
  }
  function Hb(a) {
    this.src = a;
    this.a = {};
    this.b = 0;
  }
  Hb.prototype.add = function (a, b, c, e, f) {
    var g = a.toString();
    a = this.a[g];
    a || ((a = this.a[g] = []), this.b++);
    var k = Ib(a, b, e, f);
    -1 < k
      ? ((b = a[k]), c || (b.ka = !1))
      : ((b = new Fb(b, this.src, g, !!e, f)), (b.ka = c), a.push(b));
    return b;
  };
  Hb.prototype.remove = function (a, b, c, e) {
    a = a.toString();
    if (!(a in this.a)) return !1;
    var f = this.a[a];
    b = Ib(f, b, c, e);
    return -1 < b
      ? (Gb(f[b]),
        Array.prototype.splice.call(f, b, 1),
        0 == f.length && (delete this.a[a], this.b--),
        !0)
      : !1;
  };
  function Ib(a, b, c, e) {
    for (var f = 0; f < a.length; ++f) {
      var g = a[f];
      if (!g.T && g.listener == b && g.capture == !!c && g.a == e) return f;
    }
    return -1;
  }
  var Jb = "closure_lm_" + ((1e6 * Math.random()) | 0),
    Kb = {},
    Lb = 0;
  function Q(a, b, c, e, f) {
    if (e && e.once) Mb(a, b, c, e, f);
    else if (p(b)) for (var g = 0; g < b.length; g++) Q(a, b[g], c, e, f);
    else
      (c = Nb(c)),
        a && a[Db]
          ? a.a(b, c, r(e) ? !!e.capture : !!e, f)
          : Ob(a, b, c, !1, e, f);
  }
  function Ob(a, b, c, e, f, g) {
    if (!b) throw Error("Invalid event type");
    var k = r(f) ? !!f.capture : !!f,
      q = Pb(a);
    q || (a[Jb] = q = new Hb(a));
    c = q.add(b, c, e, k, g);
    if (!c.proxy) {
      e = Qb();
      c.proxy = e;
      e.src = a;
      e.listener = c;
      if (a.addEventListener)
        yb || (f = k),
          void 0 === f && (f = !1),
          a.addEventListener(b.toString(), e, f);
      else if (a.attachEvent) a.attachEvent(Rb(b.toString()), e);
      else if (a.addListener && a.removeListener) a.addListener(e);
      else throw Error("addEventListener and attachEvent are unavailable.");
      Lb++;
    }
  }
  function Qb() {
    var a = Sb,
      b = wb
        ? function (c) {
            return a.call(b.src, b.listener, c);
          }
        : function (c) {
            c = a.call(b.src, b.listener, c);
            if (!c) return c;
          };
    return b;
  }
  function Mb(a, b, c, e, f) {
    if (p(b)) for (var g = 0; g < b.length; g++) Mb(a, b[g], c, e, f);
    else
      (c = Nb(c)),
        a && a[Db]
          ? a.b(b, c, r(e) ? !!e.capture : !!e, f)
          : Ob(a, b, c, !0, e, f);
  }
  function Tb(a, b, c, e, f) {
    if (p(b)) for (var g = 0; g < b.length; g++) Tb(a, b[g], c, e, f);
    else
      ((e = r(e) ? !!e.capture : !!e), (c = Nb(c)), a && a[Db])
        ? a.c(b, c, e, f)
        : a &&
          (a = Pb(a)) &&
          ((b = a.a[b.toString()]),
          (a = -1),
          b && (a = Ib(b, c, e, f)),
          (c = -1 < a ? b[a] : null) && Ub(c));
  }
  function Ub(a) {
    if ("number" != typeof a && a && !a.T) {
      var b = a.src;
      if (b && b[Db]) b.f(a);
      else {
        var c = a.type,
          e = a.proxy;
        b.removeEventListener
          ? b.removeEventListener(c, e, a.capture)
          : b.detachEvent
          ? b.detachEvent(Rb(c), e)
          : b.addListener && b.removeListener && b.removeListener(e);
        Lb--;
        if ((c = Pb(b))) {
          e = a.type;
          if (e in c.a) {
            var f = c.a[e],
              g = v(f, a),
              k;
            (k = 0 <= g) && Array.prototype.splice.call(f, g, 1);
            k && (Gb(a), 0 == c.a[e].length && (delete c.a[e], c.b--));
          }
          0 == c.b && ((c.src = null), (b[Jb] = null));
        } else Gb(a);
      }
    }
  }
  function Rb(a) {
    return a in Kb ? Kb[a] : (Kb[a] = "on" + a);
  }
  function Vb(a, b, c, e) {
    var f = !0;
    if ((a = Pb(a)))
      if ((b = a.a[b.toString()]))
        for (b = b.concat(), a = 0; a < b.length; a++) {
          var g = b[a];
          g && g.capture == c && !g.T && ((g = Wb(g, e)), (f = f && !1 !== g));
        }
    return f;
  }
  function Wb(a, b) {
    var c = a.listener,
      e = a.a || a.src;
    a.ka && Ub(a);
    return c.call(e, b);
  }
  function Sb(a, b) {
    if (a.T) return !0;
    if (!wb) {
      if (!b)
        a: {
          b = ["window", "event"];
          for (var c = m, e = 0; e < b.length; e++)
            if (((c = c[b[e]]), null == c)) {
              b = null;
              break a;
            }
          b = c;
        }
      e = b;
      b = new P(e, this);
      c = !0;
      if (!(0 > e.keyCode || void 0 != e.returnValue)) {
        a: {
          var f = !1;
          if (0 == e.keyCode)
            try {
              e.keyCode = -1;
              break a;
            } catch (k) {
              f = !0;
            }
          if (f || void 0 == e.returnValue) e.returnValue = !0;
        }
        e = [];
        for (f = b.currentTarget; f; f = f.parentNode) e.push(f);
        a = a.type;
        for (f = e.length - 1; !b.b && 0 <= f; f--) {
          b.currentTarget = e[f];
          var g = Vb(e[f], a, !0, b);
          c = c && g;
        }
        for (f = 0; !b.b && f < e.length; f++)
          (b.currentTarget = e[f]), (g = Vb(e[f], a, !1, b)), (c = c && g);
      }
      return c;
    }
    return Wb(a, new P(b, this));
  }
  function Pb(a) {
    a = a[Jb];
    return a instanceof Hb ? a : null;
  }
  var Xb = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0);
  function Nb(a) {
    if ("function" == na(a)) return a;
    a[Xb] ||
      (a[Xb] = function (b) {
        return a.handleEvent(b);
      });
    return a[Xb];
  }
  var Yb = {},
    Zb = {},
    $b = {},
    ac = {},
    Fa = { Ib: Yb, Kb: Zb, Jb: $b, Hb: ac };
  function bc() {
    this.a = 0;
    (E.j && "10.0" === E.VERSION) || this.b();
  }
  bc.prototype.b = function () {
    N(document.documentElement, "optimize-ready")
      ? window.gaData && C(window.gaData, "UA-26908291-1") && cc()
      : 20 > this.a && (setTimeout(this.b.bind(this), 500), (this.a += 1));
  };
  function cc() {
    if (C(window.gaData["UA-26908291-1"], "experiments")) {
      var a = [],
        b = window.gaData["UA-26908291-1"].experiments;
      Ea(function (c) {
        C(b, c.staging)
          ? a.push({ key: c.id, value: b[c.staging] })
          : C(b, c.sandbox)
          ? a.push({ key: c.id, value: b[c.sandbox] })
          : C(b, c.production) && a.push({ key: c.id, value: b[c.production] });
      });
      0 < a.length &&
        [].concat(h(a)).forEach(function (a) {
          var b = a.value;
          switch (a.key) {
            case Yb.id:
              "0" !== b
                ? (history.scrollRestoration &&
                    (history.scrollRestoration = "manual"),
                  (document.documentElement.scrollTop = 0),
                  L(document.querySelector(".chr-main"), "optimize-variant"))
                : dc();
              ec(b);
              break;
            case Zb.id:
            case $b.id:
            case ac.id:
              ec(b);
          }
        });
    } else dc();
  }
  function ec(a) {
    Array.prototype.forEach.call(
      document.querySelectorAll(".chr-homepage-lpo-download .chr-cta__button"),
      function (b) {
        var c = Wa(b, "gLabel").replace(
          new RegExp(
            "variant"
              .replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1")
              .replace(/\x08/g, "\\x08"),
            "g"
          ),
          a.replace(/\$/g, "$$$$")
        );
        if (Va && b.dataset) b.dataset.gLabel = c;
        else {
          if (/-[a-z]/.test("gLabel"))
            throw Error('"gLabel" is not a valid dataset property name.');
          b.setAttribute("data-" + y("gLabel"), c);
        }
        b.setAttribute("ga-event-label", c);
      }
    );
  }
  function dc() {
    var a = document.querySelector("#js-download-header");
    null != a &&
      N(a, "cta-animated-border") &&
      (w(a.querySelectorAll("svg"), function (a) {
        a && a.parentNode && a.parentNode.removeChild(a);
      }),
      sb(a));
  }
  E.product.ma = function () {
    if (E.product.Fa) return E.product.J(/Firefox\/([0-9.]+)/);
    if (E.product.j || E.product.F || E.product.G) return E.VERSION;
    if (E.product.Da)
      return D()
        ? E.product.J(/CriOS\/([0-9.]+)/)
        : E.product.J(/Chrome\/([0-9.]+)/);
    if (E.product.ja && !D()) return E.product.J(/Version\/([0-9.]+)/);
    if (E.product.O || E.product.N) {
      var a = E.product.Ia(/Version\/(\S+).*Mobile\/(\S+)/);
      if (a) return a[1] + "." + a[2];
    } else if (E.product.W)
      return (a = E.product.J(/Android\s+([0-9.]+)/))
        ? a
        : E.product.J(/Version\/([0-9.]+)/);
    return "";
  };
  E.product.J = function (a) {
    return (a = E.product.Ia(a)) ? a[1] : "";
  };
  E.product.Ia = function (a) {
    return a.exec(E.oa());
  };
  E.product.VERSION = E.product.ma();
  E.product.qa = function (a) {
    return 0 <= Aa(E.product.VERSION, a);
  };
  function fc() {
    return E.product.j && !E.product.qa(10);
  }
  fc() && !document.attachEvent && (wb = !0);
  var gc = {
    fallback: { ta: "data-g-action", Ea: "data-g-event", Ua: "data-g-label" },
    latest: {
      ta: "ga-event-action",
      Ea: "ga-event-category",
      Ua: "ga-event-label",
    },
  };
  function hc() {
    this.b = fc() && document.attachEvent ? "fallback" : "latest";
  }
  hc.prototype.a = function (a, b, c, e, f, g) {
    var k = window.ga || window.tracker || window.gaTracker || window.gtm;
    if (k)
      if ("latest" === this.b) k("send", a, b, c, e, f, g);
      else {
        var q = Array.prototype.slice.call(arguments);
        q = q.filter(function (a) {
          if (null != a) return "string" != typeof a ? a.toString() : a;
        });
        k.pushCommand(q);
      }
  };
  function ic() {
    this.a = H("js-footer-language-select");
    this.g = window;
    this.f = new hc();
    this.c = !1;
    this.b = fc() && document.attachEvent ? "fallback" : "latest";
    this.a && Q(this.a, "change", this.i, !1, this);
    Q(window, "scroll", this.h, !1, this);
  }

  ic.prototype.h = function () {
    if (this.c) Tb(window, "scroll", this.h, !1, this);
    else if (
      (this.g.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) +
        (this.g.pageYOffset || document.documentElement.scrollTop) >=
      document.body.offsetHeight
    ) {
      var a = {};
      a = ((a.nonInteraction = !0), a);
      this.f.a(
        "event",
        "scroll-depth",
        "scrolled",
        "bottom-of-page",
        void 0,
        a
      );
      this.c = !0;
    }
  };
  ic.prototype.i = function (a) {
    var b = a.target;
    a = b.getAttribute(gc[this.b].Ea) || "";
    var c = "language:" + b.options[b.selectedIndex].text;
    b = b.getAttribute(gc[this.b].ta) || "clicked";
    var e = {};
    e = ((e.nonInteraction = !0), e);
    this.f.a("event", a, b, c, void 0, e);
  };

  var kc = { 0: "25", 1: "50", 2: "75", 3: "100" };
  function lc() {
    this.b = !1;
    this.f = [];
    this.a = 0;
    mc(this);
  }
  function mc(a) {
    a.i = [].concat(h(document.querySelectorAll("[data-g-cookieless]")));
    Array.prototype.forEach.call(a.i, function (b) {
      Q(b, "click", a.h, !1, a);
    });
    Q(window, "load", a.g, !1, a);
    Q(window, "scroll", a.c, !1, a);
  }
  lc.prototype.h = function (a) {
    a = a.target.closest("a");
    var b = a.dataset;
    jc(b.gCookielessName, b.gCookielessCategory, a.href, !1);
  };
  lc.prototype.c = function () {
    if (this.b) Tb(window, "scroll", this.c, !1, this);
    else if (this.f[this.a] <= window.scrollY) {
      var a = this.a;
      jc(
        "scroll at " + kc[a] + "%",
        "scroll tracking",
        window.location.href,
        !0
      );
      4 === a && (this.b = !0);
      this.a++;
    }
  };
  lc.prototype.g = function () {
    var a = (document.body.offsetHeight - window.innerHeight) / 4;
    this.f = [a, 2 * a, 3 * a, 4 * a];
  };
  function nc() {
    this.c = G("js-lottie-container", document);
    this.b = [];
    window.matchMedia("(prefers-reduced-motion: reduce)");
    window.globalAnimations = {};
    this.a = window.lottie;
    oc(this);
  }
  function oc(a) {
    a.c.forEach(function (b) {
      var c = b.dataset.lottieName;
      b = a.a.loadAnimation({
        name: c,
        container: b,
        renderer: "svg",
        autoplay: !1,
        path: b.dataset.lottieFile,
      });
      c && c.length && (window.globalAnimations[c] = b);
      a.b.push(b);
    });
  }
  function pc(a, b) {
    b = void 0 === b ? {} : b;
    R[a] &&
      R[a].forEach(function (a) {
        return a(b);
      });
  }
  var R = {};
  function qc(a, b) {
    M.call(this, a, b);
    this.a = new ScrollMagic.Controller();
    this.c = a;
    this.f = G("js-section", this.c);
    rc(this);
  }
  l(qc, M);
  function rc(a) {
    w(a.f, function (b) {
      new ScrollMagic.Scene({ triggerElement: b, triggerHook: 0.5 })
        .on("start", a.g)
        .setClassToggle(b, "animated")
        .reverse(!1)
        .addTo(a.a);
      w(G("js-subanimation", b), function (b) {
        var c = 0.5;
        b.hasAttribute("data-hook") && (c = b.getAttribute("data-hook"));
        new ScrollMagic.Scene({ triggerElement: b, triggerHook: c })
          .setClassToggle(b, "subanimated")
          .reverse(!1)
          .addTo(a.a);
      });
    });
  }
  qc.prototype.g = function (a) {
    a = a.target.triggerElement();
    a.hasAttribute("data-name") &&
      (pc("animated-" + a.getAttribute("data-name")),
      a.removeAttribute("data-name"));
  };
  var sc = {};
  function tc() {
    var a = window.document;
    a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body;
    a = new Sa(a.clientWidth, a.clientHeight).width;
    return 600 > a
      ? "phone"
      : 1024 > a
      ? "tablet"
      : 1440 > a
      ? "desktop"
      : "large-desktop";
  }
  function S(a, b) {
    M.call(this, a, b);
    this.h = G("js-footer-link");
    this.a = H("js-footer-language-select");
    uc(this);
  }
  l(S, M);
  function uc(a) {
    (!E.product.j || (E.product.j && E.product.qa(10))) &&
      [].concat(h(a.h)).forEach(function (b) {
        Q(b, "click", a.c, !1, a);
        Q(b, "keydown", a.g, !1, a);
      });
    a.a && Q(a.a, "change", a.f, !1, a);
  }
  S.prototype.c = function (a) {
    var b = tc();
    if ("phone" === b || "tablet" === b)
      a.currentTarget.parentNode.classList.toggle("is-expanded"),
        a.preventDefault();
  };
  S.prototype.g = function (a) {
    (32 !== a.keyCode && a.keyCode !== sc.Mb) || this.c(a);
  };
  S.prototype.f = function () {
    window.location.href =
      this.a[this.a.selectedIndex].value + window.location.search;
  };

  function Z(a, b) {
    M.call(this, a, b);
    this.h = "rtl" === document.dir;
    this.l = G("js-slide-card", a);
    this.V = G("js-slider-link", a);
    this.container = H("js-slider-container", a);
    this.A = H("js-slider-index", a);
    this.next = H("js-slider-next", a);
    this.g = H("js-slider-prev", a);
    this.h &&
      ((this.next = H("js-slider-prev", a)), (this.g = H("js-slider-next", a)));
    this.o = H("js-slider-scrollbar", a);
    this.ha = 1;
    this.f = -1;
    this.i = this.U = !1;
    this.B = -1;
    this.a = 0;
    this.c = -1;
    pd(this);
  }
  l(Z, M);
  function pd(a) {
    Q(a.g, "click", a.X, !1, a);
    Q(a.next, "click", a.fa, !1, a);
    qd(a);
    setTimeout(function () {
      rd(a);
      a.container.scrollLeft = 0;
      sd(a);
    }, 200);
    Array.prototype.forEach.call(a.l, function (b) {
      Q(b, "focus", a.w.bind(a));
    });
    Array.prototype.forEach.call(a.V, function (b) {
      Q(b, "focus", a.w.bind(a));
    });
  }
  function rd(a) {
    O(a.next, "chr-slider__button-disabled");
    L(a.g, "chr-slider__button-disabled");
    a.a = a.ha;
    a.v = 496 >= window.innerWidth ? (window.innerWidth - 228) / 2 : 38;
    a.c = Math.floor((window.innerWidth - a.v) / 248);
    a.ia = 248 * a.l.length + a.v;
    a.f = Math.ceil(a.l.length / a.c);
  }
  function sd(a) {
    var b = 0,
      c = a.ia - window.innerWidth,
      e = 248 * a.a * a.c,
      f = c < e ? c : e,
      g = 100,
      k = 100 / a.f;
    a.o.style.minWidth = k + "%";
    L(a.o, "chr-extension__slider-scrollbar--active-anim");
    td(a, a.a, a.f);
    a.U ||
      ((a.U = !0),
      Q(a.container, "scroll", function () {
        b = a.container.scrollLeft;
        a.h && (b = Math.abs(b));
        a.i
          ? (window.clearTimeout(a.B),
            (a.B = setTimeout(function () {
              a.i = !1;
            }, 50)))
          : ((a.a = Math.floor(b / f) + 1), b >= c - 2 && (a.a = a.f));
        td(a, a.a, a.f);
        ud(a);
        g = a.container.scrollWidth - a.container.clientWidth;
        k = (b / g) * 100;
        a.o.style.width = k + "%";
      }));
  }
  function td(a, b, c) {
    "textContent" in document.body
      ? (a.A.textContent = b + " of " + c)
      : (a.A.innerHTML = b + " of " + c);
  }

  function qd(a) {
    Q(window, "resize", function () {
      rd(a);
      a.container.scrollLeft = 0;
      sd(a);
    });
  }

  Z.prototype.fa = function () {
    this.i = !0;
    if (this.a < this.f) {
      this.a++;
      var a = 248 * this.c * (this.a - 1);
      this.h && (a = -Math.abs(a));
      this.container.scrollLeft = a;
    }
    ud(this);
  };

  Z.prototype.X = function () {
    this.i = !0;
    if (1 < this.a) {
      this.a--;
      var a = 248 * this.c * (this.a - 1);
      this.h && (a = -Math.abs(a));
      this.container.scrollLeft = a;
    }
    ud(this);
  };

  function ud(a) {
    1 === a.a
      ? (L(a.g, "chr-slider__button-disabled"),
        O(a.next, "chr-slider__button-disabled"))
      : a.a < a.f
      ? (O(a.next, "chr-slider__button-disabled"),
        O(a.g, "chr-slider__button-disabled"))
      : a.a === a.f &&
        (L(a.next, "chr-slider__button-disabled"),
        O(a.g, "chr-slider__button-disabled"));
  }

  Z.prototype.w = function (a) {
    var b = null;
    for (a = a.target; null == b || "" == b; )
      (b = a.getAttribute("data-panel-index")), (a = a.parentNode);
    a = this.a * this.c;
    if (b <= a - this.c || b > a)
      (this.a = Math.ceil(b / this.c)),
        (this.container.scrollLeft = 248 * this.c * (this.a - 1));
  };

  var sa = {
    Slider: Z,
  };

  Q(document, "DOMContentLoaded", function () {
    new ra();
  });
}.call(window));
