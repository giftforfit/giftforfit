!function a (b, c, d) {
  function e (g, h) {
    if (!c[g]) {
      if (!b[g]) {
        var i = "function" == typeof require && require;
        if (!h && i)return i(g, !0);
        if (f)return f(g, !0);
        throw new Error("Cannot find module '" + g + "'")
      }
      var j = c[g] = {exports: {}};
      b[g][0].call(j.exports, function(a) {
        var c = b[g][1][a];
        return e(c ? c : a)
      }, j, j.exports, a, b, c, d)
    }
    return c[g].exports
  }

  for (var f = "function" == typeof require && require, g = 0; g < d.length; g++)e(d[g]);
  return e
}({
  1: [function(a, b) {
    b.exports = {oauthd_url: "https://oauth.io", oauthd_api: "https://oauth.io/api", version: "web-0.2.4", options: {}}
  }, {}], 2: [function(a, b) {
    "use strict";
    var c, d, e, f, g, h;
    e = a("../config"), f = a("../tools/cookies"), d = a("../tools/cache"), c = a("../tools/url"), h = a("../tools/sha1"), g = a("./oauthio_requests"), b.exports = function(a, b, i, j) {
      var k, l, m, n, o, p, q;
      return c = c(b), f.init(e, b), d.init(f, e), q = {}, p = {}, o = {
        execProvidersCb: function(a, b, c) {
          var d, e;
          if (p[a]) {
            d = p[a], delete p[a];
            for (e in d)d[e](b, c)
          }
        }, fetchDescription: function(a) {
          q[a] || (q[a] = !0, i.ajax({
            url: e.oauthd_api + "/providers/" + a,
            data: {extend: !0},
            dataType: "json"
          }).done(function(b) {
            q[a] = b.data, o.execProvidersCb(a, null, b.data)
          }).always(function() {
            "object" != typeof q[a] && (delete q[a], o.execProvidersCb(a, new Error("Unable to fetch request description")))
          }))
        }, getDescription: function(a, b, c) {
          return b = b || {}, "object" == typeof q[a] ? c(null, q[a]) : (q[a] || o.fetchDescription(a), b.wait ? (p[a] = p[a] || [], void p[a].push(c)) : c(null, {}))
        }
      }, e.oauthd_base = c.getAbsUrl(e.oauthd_url).match(/^.{2,5}:\/\/[^/]+/)[0], k = [], l = void 0, (n = function() {
        var a, c;
        c = /[\\#&]oauthio=([^&]*)/.exec(b.location.hash), c && (b.location.hash = b.location.hash.replace(/&?oauthio=[^&]*/, ""), l = decodeURIComponent(c[1].replace(/\+/g, " ")), a = f.readCookie("oauthio_state"), a && (k.push(a), f.eraseCookie("oauthio_state")))
      })(), a.location_operations = {
        reload: function() {
          return b.location.reload()
        }, getHash: function() {
          return b.location.hash
        }, setHash: function(a) {
          return b.location.hash = a
        }, changeHref: function(a) {
          return b.location.href = a
        }
      }, m = {request: g(i, e, k, d, o)}, function(g) {
        null == g.OAuth && (g.OAuth = {
          initialize: function(a, b) {
            var c;
            if (e.key = a, b)for (c in b)e.options[c] = b[c]
          }, setOAuthdURL: function(a) {
            e.oauthd_url = a, e.oauthd_base = c.getAbsUrl(e.oauthd_url).match(/^.{2,5}:\/\/[^/]+/)[0]
          }, getVersion: function() {
            return e.version
          }, create: function(a, b, c) {
            var e, f, h, i;
            if (!b)return d.tryCache(g.OAuth, a, !0);
            "object" != typeof c && o.fetchDescription(a), f = function(d) {
              return m.request.mkHttp(a, b, c, d)
            }, h = function(d, e) {
              return m.request.mkHttpEndpoint(a, b, c, d, e)
            }, i = {};
            for (e in b)i[e] = b[e];
            return i.get = f("GET"), i.post = f("POST"), i.put = f("PUT"), i.patch = f("PATCH"), i.del = f("DELETE"), i.me = m.request.mkHttpMe(a, b, c, "GET"), i
          }, popup: function(f, l, n) {
            var o, p, q, r, s, t, u, v, w, x, y;
            return r = !1, q = function(a) {
              if (a.origin === e.oauthd_base) {
                try {
                  v.close()
                } catch (b) {
                }
                return l.data = a.data, m.request.sendCallback(l, o), r = !0
              }
            }, v = void 0, p = void 0, w = void 0, o = i.Deferred(), l = l || {}, e.key ? (2 === arguments.length && "function" == typeof l && (n = l, l = {}), d.cacheEnabled(l.cache) && (t = d.tryCache(g.OAuth, f, l.cache)) ? (null != o && o.resolve(t), n ? n(null, t) : o.promise()) : (l.state || (l.state = h.create_hash(), l.state_type = "client"), k.push(l.state), u = e.oauthd_url + "/auth/" + f + "?k=" + e.key, u += "&d=" + encodeURIComponent(c.getAbsUrl("/")), l && (u += "&opts=" + encodeURIComponent(JSON.stringify(l))), l.wnd_settings ? (y = l.wnd_settings, delete l.wnd_settings) : y = {
              width: Math.floor(.8 * a.outerWidth),
              height: Math.floor(.5 * a.outerHeight)
            }, null == y.height && (y.height = y.height < 350 ? 350 : void 0), null == y.width && (y.width = y.width < 800 ? 800 : void 0), null == y.left && (y.left = a.screenX + (a.outerWidth - y.width) / 2), null == y.top && (y.top = a.screenY + (a.outerHeight - y.height) / 8), x = "width=" + y.width + ",height=" + y.height, x += ",toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0", x += ",left=" + y.left + ",top=" + y.top, l = {
              provider: f,
              cache: l.cache
            }, l.callback = function(c, d) {
              return a.removeEventListener ? a.removeEventListener("message", q, !1) : a.detachEvent ? a.detachEvent("onmessage", q) : b.detachEvent && b.detachEvent("onmessage", q), l.callback = function() {
              }, w && (clearTimeout(w), w = void 0), n ? n(c, d) : void 0
            }, a.attachEvent ? a.attachEvent("onmessage", q) : b.attachEvent ? b.attachEvent("onmessage", q) : a.addEventListener && a.addEventListener("message", q, !1), "undefined" != typeof chrome && chrome.runtime && chrome.runtime.onMessageExternal && chrome.runtime.onMessageExternal.addListener(function(a, b) {
              return a.origin = b.url.match(/^.{2,5}:\/\/[^/]+/)[0], null != o && o.resolve(), q(a)
            }), !p && (-1 !== j.userAgent.indexOf("MSIE") || j.appVersion.indexOf("Trident/") > 0) && (p = b.createElement("iframe"), p.src = e.oauthd_url + "/auth/iframe?d=" + encodeURIComponent(c.getAbsUrl("/")), p.width = 0, p.height = 0, p.frameBorder = 0, p.style.visibility = "hidden", b.body.appendChild(p)), w = setTimeout(function() {
              null != o && o.reject(new Error("Authorization timed out")), l.callback && "function" == typeof l.callback && l.callback(new Error("Authorization timed out"));
              try {
                v.close()
              } catch (a) {
              }
            }, 12e5), v = a.open(u, "Authorization", x), v ? (v.focus(), s = a.setInterval(function() {
              return null !== v && !v.closed || (a.clearInterval(s), r || (null != o && o.reject(new Error("The popup was closed")), !l.callback || "function" != typeof l.callback)) ? void 0 : l.callback(new Error("The popup was closed"))
            }, 500)) : (null != o && o.reject(new Error("Could not open a popup")), l.callback && "function" == typeof l.callback && l.callback(new Error("Could not open a popup"))), null != o ? o.promise() : void 0)) : (null != o && o.reject(new Error("OAuth object must be initialized")), null == n ? o.promise() : n(new Error("OAuth object must be initialized")))
          }, redirect: function(b, i, j) {
            var k, l;
            return 2 === arguments.length && (j = i, i = {}), d.cacheEnabled(i.cache) && (l = d.tryCache(g.OAuth, b, i.cache)) ? (j = c.getAbsUrl(j) + (-1 === j.indexOf("#") ? "#" : "&") + "oauthio=cache", a.location_operations.changeHref(j), void a.location_operations.reload()) : (i.state || (i.state = h.create_hash(), i.state_type = "client"), f.createCookie("oauthio_state", i.state), k = encodeURIComponent(c.getAbsUrl(j)), j = e.oauthd_url + "/auth/" + b + "?k=" + e.key, j += "&redirect_uri=" + k, i && (j += "&opts=" + encodeURIComponent(JSON.stringify(i))), void a.location_operations.changeHref(j))
          }, callback: function(a, b, c) {
            var e, f;
            if (e = i.Deferred(), 1 === arguments.length && "function" == typeof a && (c = a, a = void 0, b = {}), 1 === arguments.length && "string" == typeof a && (b = {}), 2 === arguments.length && "function" == typeof b && (c = b, b = {}), d.cacheEnabled(b.cache) || "cache" === l) {
              if (f = d.tryCache(g.OAuth, a, b.cache), "cache" === l && ("string" != typeof a || !a))return null != e && e.reject(new Error("You must set a provider when using the cache")), c ? c(new Error("You must set a provider when using the cache")) : null != e ? e.promise() : void 0;
              if (f) {
                if (!c)return null != e && e.resolve(f), null != e ? e.promise() : void 0;
                if (f)return c(null, f)
              }
            }
            return l ? (m.request.sendCallback({
              data: l,
              provider: a,
              cache: b.cache,
              callback: c
            }, e), null != e ? e.promise() : void 0) : void 0
          }, clearCache: function(a) {
            f.eraseCookie("oauthio_provider_" + a)
          }, http_me: function(a) {
            m.request.http_me && m.request.http_me(a)
          }, http: function(a) {
            m.request.http && m.request.http(a)
          }
        })
      }
    }
  }, {
    "../config": 1,
    "../tools/cache": 5,
    "../tools/cookies": 6,
    "../tools/sha1": 8,
    "../tools/url": 9,
    "./oauthio_requests": 3
  }], 3: [function(a, b) {
    var c, d = [].indexOf || function(a) {
        for (var b = 0, c = this.length; c > b; b++)if (b in this && this[b] === a)return b;
        return -1
      };
    c = a("../tools/url")(), b.exports = function(a, b, e, f, g) {
      return {
        http: function(e) {
          var f, h, i, j, k;
          i = function() {
            var e, f, g, h;
            if (h = k.oauthio.request || {}, !h.cors) {
              k.url = encodeURIComponent(k.url), "/" !== k.url[0] && (k.url = "/" + k.url), k.url = b.oauthd_url + "/request/" + k.oauthio.provider + k.url, k.headers = k.headers || {}, k.headers.oauthio = "k=" + b.key, k.oauthio.tokens.oauth_token && k.oauthio.tokens.oauth_token_secret && (k.headers.oauthio += "&oauthv=1");
              for (f in k.oauthio.tokens)k.headers.oauthio += "&" + encodeURIComponent(f) + "=" + encodeURIComponent(k.oauthio.tokens[f]);
              return delete k.oauthio, a.ajax(k)
            }
            if (k.oauthio.tokens) {
              if (k.oauthio.tokens.access_token && (k.oauthio.tokens.token = k.oauthio.tokens.access_token), k.url.match(/^[a-z]{2,16}:\/\//) || ("/" !== k.url[0] && (k.url = "/" + k.url), k.url = h.url + k.url), k.url = c.replaceParam(k.url, k.oauthio.tokens, h.parameters), h.query) {
                g = [];
                for (e in h.query)g.push(encodeURIComponent(e) + "=" + encodeURIComponent(c.replaceParam(h.query[e], k.oauthio.tokens, h.parameters)));
                k.url += d.call(k.url, "?") >= 0 ? "&" + g : "?" + g
              }
              if (h.headers) {
                k.headers = k.headers || {};
                for (e in h.headers)k.headers[e] = c.replaceParam(h.headers[e], k.oauthio.tokens, h.parameters)
              }
              return delete k.oauthio, a.ajax(k)
            }
          }, k = {}, j = void 0;
          for (j in e)k[j] = e[j];
          return k.oauthio.request && k.oauthio.request !== !0 ? i() : (h = {wait: !!k.oauthio.request}, f = a.Deferred(), g.getDescription(k.oauthio.provider, h, function(a, b) {
            return a ? f.reject(a) : (k.oauthio.request = k.oauthio.tokens.oauth_token && k.oauthio.tokens.oauth_token_secret ? b.oauth1 && b.oauth1.request : b.oauth2 && b.oauth2.request, void f.resolve())
          }), f.then(i))
        }, http_me: function(c) {
          var d, e, f, h, i;
          f = function() {
            var c, d, e, f;
            c = a.Deferred(), f = i.oauthio.request || {}, i.url = b.oauthd_url + "/auth/" + i.oauthio.provider + "/me", i.headers = i.headers || {}, i.headers.oauthio = "k=" + b.key, i.oauthio.tokens.oauth_token && i.oauthio.tokens.oauth_token_secret && (i.headers.oauthio += "&oauthv=1");
            for (d in i.oauthio.tokens)i.headers.oauthio += "&" + encodeURIComponent(d) + "=" + encodeURIComponent(i.oauthio.tokens[d]);
            return delete i.oauthio, e = a.ajax(i), a.when(e).done(function(a) {
              c.resolve(a.data)
            }).fail(function(a) {
              c.reject(a.responseJSON ? a.responseJSON.data : new Error("An error occured while trying to access the resource"))
            }), c.promise()
          }, i = {};
          for (h in c)i[h] = c[h];
          return i.oauthio.request && i.oauthio.request !== !0 ? f() : (e = {wait: !!i.oauthio.request}, d = a.Deferred(), g.getDescription(i.oauthio.provider, e, function(a, b) {
            return a ? d.reject(a) : (i.oauthio.request = i.oauthio.tokens.oauth_token && i.oauthio.tokens.oauth_token_secret ? b.oauth1 && b.oauth1.request : b.oauth2 && b.oauth2.request, void d.resolve())
          }), d.then(f))
        }, mkHttp: function(a, b, c, d) {
          var e;
          return e = this, function(f, g) {
            var h, i;
            if (i = {}, "string" == typeof f) {
              if ("object" == typeof g)for (h in g)i[h] = g[h];
              i.url = f
            } else if ("object" == typeof f)for (h in f)i[h] = f[h];
            return i.type = i.type || d, i.oauthio = {provider: a, tokens: b, request: c}, e.http(i)
          }
        }, mkHttpMe: function(a, b, c, d) {
          var e;
          return e = this, function(f) {
            var g;
            return g = {}, g.type = g.type || d, g.oauthio = {
              provider: a,
              tokens: b,
              request: c
            }, g.data = g.data || {}, g.data.filter = f ? f.join(",") : void 0, e.http_me(g)
          }
        }, sendCallback: function(a, b) {
          var c, d, g, h, i, j, k, l, m, n, o;
          c = this, d = void 0, h = void 0;
          try {
            d = JSON.parse(a.data)
          } catch (p) {
            return g = p, b.reject(new Error("Error while parsing result")), a.callback(new Error("Error while parsing result"))
          }
          if (d && d.provider) {
            if (a.provider && d.provider.toLowerCase() !== a.provider.toLowerCase())return h = new Error("Returned provider name does not match asked provider"), b.reject(h), a.callback && "function" == typeof a.callback ? a.callback(h) : void 0;
            if ("error" === d.status || "fail" === d.status)return h = new Error(d.message), h.body = d.data, b.reject(h), a.callback && "function" == typeof a.callback ? a.callback(h) : void 0;
            if ("success" !== d.status || !d.data)return h = new Error, h.body = d.data, b.reject(h), a.callback && "function" == typeof a.callback ? a.callback(h) : void 0;
            d.state = d.state.replace(/\s+/g, "");
            for (j in e)o = e[j], e[j] = o.replace(/\s+/g, "");
            if (!d.state || -1 === e.indexOf(d.state))return b.reject(new Error("State is not matching")), a.callback && "function" == typeof a.callback ? a.callback(new Error("State is not matching")) : void 0;
            if (a.provider || (d.data.provider = d.provider), m = d.data, f.cacheEnabled(a.cache) && m && f.storeCache(d.provider, m), l = m.request, delete m.request, n = void 0, m.access_token ? n = {access_token: m.access_token} : m.oauth_token && m.oauth_token_secret && (n = {
                oauth_token: m.oauth_token,
                oauth_token_secret: m.oauth_token_secret
              }), !l)return b.resolve(m), a.callback && "function" == typeof a.callback ? a.callback(null, m) : void 0;
            if (l.required)for (i in l.required)n[l.required[i]] = m[l.required[i]];
            return k = function(a) {
              return c.mkHttp(d.provider, n, l, a)
            }, m.get = k("GET"), m.post = k("POST"), m.put = k("PUT"), m.patch = k("PATCH"), m.del = k("DELETE"), m.me = c.mkHttpMe(d.provider, n, l, "GET"), b.resolve(m), a.callback && "function" == typeof a.callback ? a.callback(null, m) : void 0
          }
        }
      }
    }
  }, {"../tools/url": 9}], 4: [function(a) {
    var b, c;
    c = a("./tools/jquery-lite.js"), (b = a("./lib/oauth")(window, document, c, navigator))(window || this)
  }, {"./lib/oauth": 2, "./tools/jquery-lite.js": 7}], 5: [function(a, b) {
    b.exports = {
      init: function(a, b) {
        return this.config = b, this.cookies = a
      }, tryCache: function(a, b, c) {
        var d, e, f;
        if (this.cacheEnabled(c)) {
          if (c = this.cookies.readCookie("oauthio_provider_" + b), !c)return !1;
          c = decodeURIComponent(c)
        }
        if ("string" == typeof c)try {
          c = JSON.parse(c)
        } catch (g) {
          return d = g, !1
        }
        if ("object" == typeof c) {
          f = {};
          for (e in c)"request" !== e && "function" != typeof c[e] && (f[e] = c[e]);
          return a.create(b, f, c.request)
        }
        return !1
      }, storeCache: function(a, b) {
        this.cookies.createCookie("oauthio_provider_" + a, encodeURIComponent(JSON.stringify(b)), b.expires_in - 10 || 3600)
      }, cacheEnabled: function(a) {
        return "undefined" == typeof a ? this.config.options.cache : a
      }
    }
  }, {}], 6: [function(a, b) {
    b.exports = {
      init: function(a, b) {
        return this.config = a, this.document = b
      }, createCookie: function(a, b, c) {
        var d;
        this.eraseCookie(a), d = new Date, d.setTime(d.getTime() + 1e3 * (c || 1200)), c = "; expires=" + d.toGMTString(), this.document.cookie = a + "=" + b + c + "; path=/"
      }, readCookie: function(a) {
        var b, c, d, e;
        for (e = a + "=", c = this.document.cookie.split(";"), d = 0; d < c.length;) {
          for (b = c[d]; " " === b.charAt(0);)b = b.substring(1, b.length);
          if (0 === b.indexOf(e))return b.substring(e.length, b.length);
          d++
        }
        return null
      }, eraseCookie: function(a) {
        var b;
        b = new Date, b.setTime(b.getTime() - 864e5), this.document.cookie = a + "=; expires=" + b.toGMTString() + "; path=/"
      }
    }
  }, {}], 7: [function(a, b) {
    !function(a, c) {
      "object" == typeof b && "object" == typeof b.exports ? b.exports = a.document ? c(a, !0) : function(a) {
        if (!a.document)throw new Error("jQuery requires a window with a document");
        return c(a)
      } : c(a)
    }("undefined" != typeof window ? window : this, function(a) {
      function b (a) {
        var b = a.length, c = A.type(a);
        return "function" === c || A.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
      }

      function c (a) {
        var b = K[a] = {};
        return A.each(a.match(J) || [], function(a, c) {
          b[c] = !0
        }), b
      }

      function d () {
        y.removeEventListener("DOMContentLoaded", d, !1), a.removeEventListener("load", d, !1), A.ready()
      }

      function e () {
        Object.defineProperty(this.cache = {}, 0, {
          get: function() {
            return {}
          }
        }), this.expando = A.expando + Math.random()
      }

      function f (a, b, c) {
        var d;
        if (void 0 === c && 1 === a.nodeType)if (d = "data-" + b.replace(P, "-$1").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
          try {
            c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : O.test(c) ? A.parseJSON(c) : c
          } catch (e) {
          }
          data_user.set(a, b, c)
        } else c = void 0;
        return c
      }

      function g () {
        return !0
      }

      function h () {
        return !1
      }

      function i () {
        try {
          return y.activeElement
        } catch (a) {
        }
      }

      function j (a) {
        return function(b, c) {
          "string" != typeof b && (c = b, b = "*");
          var d, e = 0, f = b.toLowerCase().match(J) || [];
          if (A.isFunction(c))for (; d = f[e++];)"+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
      }

      function k (a, b, c, d) {
        function e (h) {
          var i;
          return f[h] = !0, A.each(a[h] || [], function(a, h) {
            var j = h(b, c, d);
            return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
          }), i
        }

        var f = {}, g = a === fb;
        return e(b.dataTypes[0]) || !f["*"] && e("*")
      }

      function l (a, b) {
        var c, d, e = A.ajaxSettings.flatOptions || {};
        for (c in b)void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
        return d && A.extend(!0, a, d), a
      }

      function m (a, b, c) {
        for (var d, e, f, g, h = a.contents, i = a.dataTypes; "*" === i[0];)i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
        if (d)for (e in h)if (h[e] && h[e].test(d)) {
          i.unshift(e);
          break
        }
        if (i[0]in c)f = i[0]; else {
          for (e in c) {
            if (!i[0] || a.converters[e + " " + i[0]]) {
              f = e;
              break
            }
            g || (g = e)
          }
          f = f || g
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
      }

      function n (a, b, c, d) {
        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
        if (k[1])for (g in a.converters)j[g.toLowerCase()] = a.converters[g];
        for (f = k.shift(); f;)if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())if ("*" === f)f = i; else if ("*" !== i && i !== f) {
          if (g = j[i + " " + f] || j["* " + f], !g)for (e in j)if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
            break
          }
          if (g !== !0)if (g && a["throws"])b = g(b); else try {
            b = g(b)
          } catch (l) {
            return {state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f}
          }
        }
        return {state: "success", data: b}
      }

      function o (a, b, c, d) {
        var e;
        if (A.isArray(b))A.each(b, function(b, e) {
          c || jb.test(a) ? d(a, e) : o(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
        }); else if (c || "object" !== A.type(b))d(a, b); else for (e in b)o(a + "[" + e + "]", b[e], c, d)
      }

      var p = [], q = p.slice, r = p.concat, s = p.push, t = p.indexOf, u = {}, v = u.toString, w = u.hasOwnProperty, x = {}, y = a.document, z = "2.1.1 -attributes,-attributes/attr,-attributes/classes,-attributes/prop,-attributes/support,-attributes/val,-css/addGetHookIf,-css/curCSS,-css/defaultDisplay,-css/hiddenVisibleSelectors,-css/support,-css/swap,-css/var,-css/var/cssExpand,-css/var/getStyles,-css/var/isHidden,-css/var/rmargin,-css/var/rnumnonpx,-css,-effects,-effects/Tween,-effects/animatedSelector,-dimensions,-offset,-data/var/data_user,-deprecated,-event/alias,-event/support,-intro,-manipulation/_evalUrl,-manipulation/support,-manipulation/var,-manipulation/var/rcheckableType,-manipulation,-outro,-queue,-queue/delay,-selector-native,-selector-sizzle,-sizzle/dist,-sizzle/dist/sizzle,-sizzle/dist/min,-sizzle/test,-sizzle/test/jquery,-traversing,-traversing/findFilter,-traversing/var/rneedsContext,-traversing/var,-wrap,-exports,-exports/amd", A = function(a, b) {
        return new A.fn.init(a, b)
      }, B = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, C = /^-ms-/, D = /-([\da-z])/gi, E = function(a, b) {
        return b.toUpperCase()
      };
      A.fn = A.prototype = {
        jquery: z, constructor: A, selector: "", length: 0, toArray: function() {
          return q.call(this)
        }, get: function(a) {
          return null != a ? 0 > a ? this[a + this.length] : this[a] : q.call(this)
        }, pushStack: function(a) {
          var b = A.merge(this.constructor(), a);
          return b.prevObject = this, b.context = this.context, b
        }, each: function(a, b) {
          return A.each(this, a, b)
        }, map: function(a) {
          return this.pushStack(A.map(this, function(b, c) {
            return a.call(b, c, b)
          }))
        }, slice: function() {
          return this.pushStack(q.apply(this, arguments))
        }, first: function() {
          return this.eq(0)
        }, last: function() {
          return this.eq(-1)
        }, eq: function(a) {
          var b = this.length, c = +a + (0 > a ? b : 0);
          return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        }, end: function() {
          return this.prevObject || this.constructor(null)
        }, push: s, sort: p.sort, splice: p.splice
      }, A.extend = A.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || A.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)if (null != (a = arguments[h]))for (b in a)c = g[b], d = a[b], g !== d && (j && d && (A.isPlainObject(d) || (e = A.isArray(d))) ? (e ? (e = !1, f = c && A.isArray(c) ? c : []) : f = c && A.isPlainObject(c) ? c : {}, g[b] = A.extend(j, f, d)) : void 0 !== d && (g[b] = d));
        return g
      }, A.extend({
        expando: "jQuery" + (z + Math.random()).replace(/\D/g, ""), isReady: !0, error: function(a) {
          throw new Error(a)
        }, noop: function() {
        }, isFunction: function(a) {
          return "function" === A.type(a)
        }, isArray: Array.isArray, isWindow: function(a) {
          return null != a && a === a.window
        }, isNumeric: function(a) {
          return !A.isArray(a) && a - parseFloat(a) >= 0
        }, isPlainObject: function(a) {
          return "object" !== A.type(a) || a.nodeType || A.isWindow(a) ? !1 : a.constructor && !w.call(a.constructor.prototype, "isPrototypeOf") ? !1 : !0
        }, isEmptyObject: function(a) {
          var b;
          for (b in a)return !1;
          return !0
        }, type: function(a) {
          return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? u[v.call(a)] || "object" : typeof a
        }, globalEval: function(a) {
          var b, c = eval;
          a = A.trim(a), a && (1 === a.indexOf("use strict") ? (b = y.createElement("script"), b.text = a, y.head.appendChild(b).parentNode.removeChild(b)) : c(a))
        }, camelCase: function(a) {
          return a.replace(C, "ms-").replace(D, E)
        }, nodeName: function(a, b) {
          return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        }, each: function(a, c, d) {
          var e, f = 0, g = a.length, h = b(a);
          if (d) {
            if (h)for (; g > f && (e = c.apply(a[f], d), e !== !1); f++); else for (f in a)if (e = c.apply(a[f], d), e === !1)break
          } else if (h)for (; g > f && (e = c.call(a[f], f, a[f]), e !== !1); f++); else for (f in a)if (e = c.call(a[f], f, a[f]), e === !1)break;
          return a
        }, trim: function(a) {
          return null == a ? "" : (a + "").replace(B, "")
        }, makeArray: function(a, c) {
          var d = c || [];
          return null != a && (b(Object(a)) ? A.merge(d, "string" == typeof a ? [a] : a) : s.call(d, a)), d
        }, inArray: function(a, b, c) {
          return null == b ? -1 : t.call(b, a, c)
        }, merge: function(a, b) {
          for (var c = +b.length, d = 0, e = a.length; c > d; d++)a[e++] = b[d];
          return a.length = e, a
        }, grep: function(a, b, c) {
          for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)d = !b(a[f], f), d !== h && e.push(a[f]);
          return e
        }, map: function(a, c, d) {
          var e, f = 0, g = a.length, h = b(a), i = [];
          if (h)for (; g > f; f++)e = c(a[f], f, d), null != e && i.push(e); else for (f in a)e = c(a[f], f, d), null != e && i.push(e);
          return r.apply([], i)
        }, guid: 1, proxy: function(a, b) {
          var c, d, e;
          return "string" == typeof b && (c = a[b], b = a, a = c), A.isFunction(a) ? (d = q.call(arguments, 2), e = function() {
            return a.apply(b || this, d.concat(q.call(arguments)))
          }, e.guid = a.guid = a.guid || A.guid++, e) : void 0
        }, now: Date.now, support: x
      }), A.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        u["[object " + b + "]"] = b.toLowerCase()
      });
      var F, G = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, H = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, I = A.fn.init = function(a, b) {
        var c, d;
        if (!a)return this;
        if ("string" == typeof a) {
          if (c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : H.exec(a), !c || !c[1] && b)return !b || b.jquery ? (b || F).find(a) : this.constructor(b).find(a);
          if (c[1]) {
            if (b = b instanceof A ? b[0] : b, A.merge(this, A.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : y, !0)), G.test(c[1]) && A.isPlainObject(b))for (c in b)A.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
            return this
          }
          return d = y.getElementById(c[2]), d && d.parentNode && (this.length = 1, this[0] = d), this.context = y, this.selector = a, this
        }
        return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : A.isFunction(a) ? "undefined" != typeof F.ready ? F.ready(a) : a(A) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), A.makeArray(a, this))
      };
      I.prototype = A.fn, F = A(y);
      var J = /\S+/g, K = {};
      A.Callbacks = function(a) {
        a = "string" == typeof a ? K[a] || c(a) : A.extend({}, a);
        var b, d, e, f, g, h, i = [], j = !a.once && [], k = function(c) {
          for (b = a.memory && c, d = !0, h = f || 0, f = 0, g = i.length, e = !0; i && g > h; h++)if (i[h].apply(c[0], c[1]) === !1 && a.stopOnFalse) {
            b = !1;
            break
          }
          e = !1, i && (j ? j.length && k(j.shift()) : b ? i = [] : l.disable())
        }, l = {
          add: function() {
            if (i) {
              var c = i.length;
              !function d (b) {
                A.each(b, function(b, c) {
                  var e = A.type(c);
                  "function" === e ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== e && d(c)
                })
              }(arguments), e ? g = i.length : b && (f = c, k(b))
            }
            return this
          }, remove: function() {
            return i && A.each(arguments, function(a, b) {
              for (var c; (c = A.inArray(b, i, c)) > -1;)i.splice(c, 1), e && (g >= c && g--, h >= c && h--)
            }), this
          }, has: function(a) {
            return a ? A.inArray(a, i) > -1 : !(!i || !i.length)
          }, empty: function() {
            return i = [], g = 0, this
          }, disable: function() {
            return i = j = b = void 0, this
          }, disabled: function() {
            return !i
          }, lock: function() {
            return j = void 0, b || l.disable(), this
          }, locked: function() {
            return !j
          }, fireWith: function(a, b) {
            return !i || d && !j || (b = b || [], b = [a, b.slice ? b.slice() : b], e ? j.push(b) : k(b)), this
          }, fire: function() {
            return l.fireWith(this, arguments), this
          }, fired: function() {
            return !!d
          }
        };
        return l
      }, A.extend({
        Deferred: function(a) {
          var b = [["resolve", "done", A.Callbacks("once memory"), "resolved"], ["reject", "fail", A.Callbacks("once memory"), "rejected"], ["notify", "progress", A.Callbacks("memory")]], c = "pending", d = {
            state: function() {
              return c
            }, always: function() {
              return e.done(arguments).fail(arguments), this
            }, then: function() {
              var a = arguments;
              return A.Deferred(function(c) {
                A.each(b, function(b, f) {
                  var g = A.isFunction(a[b]) && a[b];
                  e[f[1]](function() {
                    var a = g && g.apply(this, arguments);
                    a && A.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                  })
                }), a = null
              }).promise()
            }, promise: function(a) {
              return null != a ? A.extend(a, d) : d
            }
          }, e = {};
          return d.pipe = d.then, A.each(b, function(a, f) {
            var g = f[2], h = f[3];
            d[f[1]] = g.add, h && g.add(function() {
              c = h
            }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
              return e[f[0] + "With"](this === e ? d : this, arguments), this
            }, e[f[0] + "With"] = g.fireWith
          }), d.promise(e), a && a.call(e, e), e
        }, when: function(a) {
          var b, c, d, e = 0, f = q.call(arguments), g = f.length, h = 1 !== g || a && A.isFunction(a.promise) ? g : 0, i = 1 === h ? a : A.Deferred(), j = function(a, c, d) {
            return function(e) {
              c[a] = this, d[a] = arguments.length > 1 ? q.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
            }
          };
          if (g > 1)for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++)f[e] && A.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
          return h || i.resolveWith(d, f), i.promise()
        }
      });
      var L;
      A.fn.ready = function(a) {
        return A.ready.promise().done(a), this
      }, A.extend({
        isReady: !1, readyWait: 1, holdReady: function(a) {
          a ? A.readyWait++ : A.ready(!0)
        }, ready: function(a) {
          (a === !0 ? --A.readyWait : A.isReady) || (A.isReady = !0, a !== !0 && --A.readyWait > 0 || (L.resolveWith(y, [A]), A.fn.triggerHandler && (A(y).triggerHandler("ready"), A(y).off("ready"))))
        }
      }), A.ready.promise = function(b) {
        return L || (L = A.Deferred(), "complete" === y.readyState ? setTimeout(A.ready) : (y.addEventListener("DOMContentLoaded", d, !1), a.addEventListener("load", d, !1))), L.promise(b)
      }, A.ready.promise();
      var M = A.access = function(a, b, c, d, e, f, g) {
        var h = 0, i = a.length, j = null == c;
        if ("object" === A.type(c)) {
          e = !0;
          for (h in c)A.access(a, b, h, c[h], !0, f, g)
        } else if (void 0 !== d && (e = !0, A.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
            return j.call(A(a), c)
          })), b))for (; i > h; h++)b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
      };
      A.acceptData = function(a) {
        return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
      }, e.uid = 1, e.accepts = A.acceptData, e.prototype = {
        key: function(a) {
          if (!e.accepts(a))return 0;
          var b = {}, c = a[this.expando];
          if (!c) {
            c = e.uid++;
            try {
              b[this.expando] = {value: c}, Object.defineProperties(a, b)
            } catch (d) {
              b[this.expando] = c, A.extend(a, b)
            }
          }
          return this.cache[c] || (this.cache[c] = {}), c
        }, set: function(a, b, c) {
          var d, e = this.key(a), f = this.cache[e];
          if ("string" == typeof b)f[b] = c; else if (A.isEmptyObject(f))A.extend(this.cache[e], b); else for (d in b)f[d] = b[d];
          return f
        }, get: function(a, b) {
          var c = this.cache[this.key(a)];
          return void 0 === b ? c : c[b]
        }, access: function(a, b, c) {
          var d;
          return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, A.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b)
        }, remove: function(a, b) {
          var c, d, e, f = this.key(a), g = this.cache[f];
          if (void 0 === b)this.cache[f] = {}; else {
            A.isArray(b) ? d = b.concat(b.map(A.camelCase)) : (e = A.camelCase(b), b in g ? d = [b, e] : (d = e, d = d in g ? [d] : d.match(J) || [])), c = d.length;
            for (; c--;)delete g[d[c]]
          }
        }, hasData: function(a) {
          return !A.isEmptyObject(this.cache[a[this.expando]] || {})
        }, discard: function(a) {
          a[this.expando] && delete this.cache[a[this.expando]]
        }
      };
      var N = new e, O = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, P = /([A-Z])/g;
      A.extend({
        hasData: function(a) {
          return data_user.hasData(a) || N.hasData(a)
        }, data: function(a, b, c) {
          return data_user.access(a, b, c)
        }, removeData: function(a, b) {
          data_user.remove(a, b)
        }, _data: function(a, b, c) {
          return N.access(a, b, c)
        }, _removeData: function(a, b) {
          N.remove(a, b)
        }
      }), A.fn.extend({
        data: function(a, b) {
          var c, d, e, g = this[0], h = g && g.attributes;
          if (void 0 === a) {
            if (this.length && (e = data_user.get(g), 1 === g.nodeType && !N.get(g, "hasDataAttrs"))) {
              for (c = h.length; c--;)h[c] && (d = h[c].name, 0 === d.indexOf("data-") && (d = A.camelCase(d.slice(5)), f(g, d, e[d])));
              N.set(g, "hasDataAttrs", !0)
            }
            return e
          }
          return "object" == typeof a ? this.each(function() {
            data_user.set(this, a)
          }) : M(this, function(b) {
            var c, d = A.camelCase(a);
            if (g && void 0 === b) {
              if (c = data_user.get(g, a), void 0 !== c)return c;
              if (c = data_user.get(g, d), void 0 !== c)return c;
              if (c = f(g, d, void 0), void 0 !== c)return c
            } else this.each(function() {
              var c = data_user.get(this, d);
              data_user.set(this, d, b), -1 !== a.indexOf("-") && void 0 !== c && data_user.set(this, a, b)
            })
          }, null, b, arguments.length > 1, null, !0)
        }, removeData: function(a) {
          return this.each(function() {
            data_user.remove(this, a)
          })
        }
      });
      var Q = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, "undefined"), R = /^key/, S = /^(?:mouse|pointer|contextmenu)|click/, T = /^(?:focusinfocus|focusoutblur)$/, U = /^([^.]*)(?:\.(.+)|)$/;
      A.event = {
        global: {},
        add: function(a, b, c, d, e) {
          var f, g, h, i, j, k, l, m, n, o, p, q = N.get(a);
          if (q)for (c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = A.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function(b) {
            return typeof A !== Q && A.event.triggered !== b.type ? A.event.dispatch.apply(a, arguments) : void 0
          }), b = (b || "").match(J) || [""], j = b.length; j--;)h = U.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = A.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = A.event.special[n] || {}, k = A.extend({
            type: n,
            origType: p,
            data: d,
            handler: c,
            guid: c.guid,
            selector: e,
            needsContext: e && A.expr.match.needsContext.test(e),
            namespace: o.join(".")
          }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g, !1)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), A.event.global[n] = !0)
        },
        remove: function(a, b, c, d, e) {
          var f, g, h, i, j, k, l, m, n, o, p, q = N.hasData(a) && N.get(a);
          if (q && (i = q.events)) {
            for (b = (b || "").match(J) || [""], j = b.length; j--;)if (h = U.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
              for (l = A.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--;)k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
              g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || A.removeEvent(a, n, q.handle), delete i[n])
            } else for (n in i)A.event.remove(a, n + b[j], c, d, !0);
            A.isEmptyObject(i) && (delete q.handle, N.remove(a, "events"))
          }
        },
        trigger: function(b, c, d, e) {
          var f, g, h, i, j, k, l, m = [d || y], n = w.call(b, "type") ? b.type : b, o = w.call(b, "namespace") ? b.namespace.split(".") : [];
          if (g = h = d = d || y, 3 !== d.nodeType && 8 !== d.nodeType && !T.test(n + A.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), n = o.shift(), o.sort()), j = n.indexOf(":") < 0 && "on" + n, b = b[A.expando] ? b : new A.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : A.makeArray(c, [b]), l = A.event.special[n] || {}, e || !l.trigger || l.trigger.apply(d, c) !== !1)) {
            if (!e && !l.noBubble && !A.isWindow(d)) {
              for (i = l.delegateType || n, T.test(i + n) || (g = g.parentNode); g; g = g.parentNode)m.push(g), h = g;
              h === (d.ownerDocument || y) && m.push(h.defaultView || h.parentWindow || a)
            }
            for (f = 0; (g = m[f++]) && !b.isPropagationStopped();)b.type = f > 1 ? i : l.bindType || n, k = (N.get(g, "events") || {})[b.type] && N.get(g, "handle"), k && k.apply(g, c), k = j && g[j], k && k.apply && A.acceptData(g) && (b.result = k.apply(g, c), b.result === !1 && b.preventDefault());
            return b.type = n, e || b.isDefaultPrevented() || l._default && l._default.apply(m.pop(), c) !== !1 || !A.acceptData(d) || j && A.isFunction(d[n]) && !A.isWindow(d) && (h = d[j], h && (d[j] = null), A.event.triggered = n, d[n](), A.event.triggered = void 0, h && (d[j] = h)), b.result
          }
        },
        dispatch: function(a) {
          a = A.event.fix(a);
          var b, c, d, e, f, g = [], h = q.call(arguments), i = (N.get(this, "events") || {})[a.type] || [], j = A.event.special[a.type] || {};
          if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
            for (g = A.event.handlers.call(this, a, i), b = 0; (e = g[b++]) && !a.isPropagationStopped();)for (a.currentTarget = e.elem, c = 0; (f = e.handlers[c++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(f.namespace)) && (a.handleObj = f, a.data = f.data, d = ((A.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h), void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
            return j.postDispatch && j.postDispatch.call(this, a), a.result
          }
        },
        handlers: function(a, b) {
          var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
          if (h && i.nodeType && (!a.button || "click" !== a.type))for (; i !== this; i = i.parentNode || this)if (i.disabled !== !0 || "click" !== a.type) {
            for (d = [], c = 0; h > c; c++)f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? A(e, this).index(i) >= 0 : A.find(e, this, null, [i]).length), d[e] && d.push(f);
            d.length && g.push({elem: i, handlers: d})
          }
          return h < b.length && g.push({elem: this, handlers: b.slice(h)}), g
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
          props: "char charCode key keyCode".split(" "), filter: function(a, b) {
            return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
          }
        },
        mouseHooks: {
          props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
          filter: function(a, b) {
            var c, d, e, f = b.button;
            return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || y, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
          }
        },
        fix: function(a) {
          if (a[A.expando])return a;
          var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
          for (g || (this.fixHooks[e] = g = S.test(e) ? this.mouseHooks : R.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new A.Event(f), b = d.length; b--;)c = d[b], a[c] = f[c];
          return a.target || (a.target = y), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a
        },
        special: {
          load: {noBubble: !0}, focus: {
            trigger: function() {
              return this !== i() && this.focus ? (this.focus(), !1) : void 0
            }, delegateType: "focusin"
          }, blur: {
            trigger: function() {
              return this === i() && this.blur ? (this.blur(), !1) : void 0
            }, delegateType: "focusout"
          }, click: {
            trigger: function() {
              return "checkbox" === this.type && this.click && A.nodeName(this, "input") ? (this.click(), !1) : void 0
            }, _default: function(a) {
              return A.nodeName(a.target, "a")
            }
          }, beforeunload: {
            postDispatch: function(a) {
              void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
            }
          }
        },
        simulate: function(a, b, c, d) {
          var e = A.extend(new A.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
          d ? A.event.trigger(e, null, b) : A.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
      }, A.removeEvent = function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
      }, A.Event = function(a, b) {
        return this instanceof A.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? g : h) : this.type = a, b && A.extend(this, b), this.timeStamp = a && a.timeStamp || A.now(), void(this[A.expando] = !0)) : new A.Event(a, b)
      }, A.Event.prototype = {
        isDefaultPrevented: h,
        isPropagationStopped: h,
        isImmediatePropagationStopped: h,
        preventDefault: function() {
          var a = this.originalEvent;
          this.isDefaultPrevented = g, a && a.preventDefault && a.preventDefault()
        },
        stopPropagation: function() {
          var a = this.originalEvent;
          this.isPropagationStopped = g, a && a.stopPropagation && a.stopPropagation()
        },
        stopImmediatePropagation: function() {
          var a = this.originalEvent;
          this.isImmediatePropagationStopped = g, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
        }
      }, A.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
      }, function(a, b) {
        A.event.special[a] = {
          delegateType: b, bindType: b, handle: function(a) {
            var c, d = this, e = a.relatedTarget, f = a.handleObj;
            return (!e || e !== d && !A.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
          }
        }
      }), x.focusinBubbles || A.each({focus: "focusin", blur: "focusout"}, function(a, b) {
        var c = function(a) {
          A.event.simulate(b, a.target, A.event.fix(a), !0)
        };
        A.event.special[b] = {
          setup: function() {
            var d = this.ownerDocument || this, e = N.access(d, b);
            e || d.addEventListener(a, c, !0), N.access(d, b, (e || 0) + 1)
          }, teardown: function() {
            var d = this.ownerDocument || this, e = N.access(d, b) - 1;
            e ? N.access(d, b, e) : (d.removeEventListener(a, c, !0), N.remove(d, b))
          }
        }
      }), A.fn.extend({
        on: function(a, b, c, d, e) {
          var f, g;
          if ("object" == typeof a) {
            "string" != typeof b && (c = c || b, b = void 0);
            for (g in a)this.on(g, b, c, a[g], e);
            return this
          }
          if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1)d = h; else if (!d)return this;
          return 1 === e && (f = d, d = function(a) {
            return A().off(a), f.apply(this, arguments)
          }, d.guid = f.guid || (f.guid = A.guid++)), this.each(function() {
            A.event.add(this, a, d, c, b)
          })
        }, one: function(a, b, c, d) {
          return this.on(a, b, c, d, 1)
        }, off: function(a, b, c) {
          var d, e;
          if (a && a.preventDefault && a.handleObj)return d = a.handleObj, A(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
          if ("object" == typeof a) {
            for (e in a)this.off(e, b, a[e]);
            return this
          }
          return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = h), this.each(function() {
            A.event.remove(this, a, c, b)
          })
        }, trigger: function(a, b) {
          return this.each(function() {
            A.event.trigger(a, b, this)
          })
        }, triggerHandler: function(a, b) {
          var c = this[0];
          return c ? A.event.trigger(a, b, c, !0) : void 0
        }
      });
      var V = A.now(), W = /\?/;
      A.parseJSON = function(a) {
        return JSON.parse(a + "")
      }, A.parseXML = function(a) {
        var b, c;
        if (!a || "string" != typeof a)return null;
        try {
          c = new DOMParser, b = c.parseFromString(a, "text/xml")
        } catch (d) {
          b = void 0
        }
        return (!b || b.getElementsByTagName("parsererror").length) && A.error("Invalid XML: " + a), b
      };
      var X, Y, Z = /#.*$/, $ = /([?&])_=[^&]*/, _ = /^(.*?):[ \t]*([^\r\n]*)$/gm, ab = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, bb = /^(?:GET|HEAD)$/, cb = /^\/\//, db = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, eb = {}, fb = {}, gb = "*/".concat("*");
      try {
        Y = location.href
      } catch (hb) {
        Y = y.createElement("a"), Y.href = "", Y = Y.href
      }
      X = db.exec(Y.toLowerCase()) || [], A.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: Y,
          type: "GET",
          isLocal: ab.test(X[1]),
          global: !0,
          processData: !0,
          async: !0,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          accepts: {
            "*": gb,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript"
          },
          contents: {xml: /xml/, html: /html/, json: /json/},
          responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
          converters: {"* text": String, "text html": !0, "text json": A.parseJSON, "text xml": A.parseXML},
          flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function(a, b) {
          return b ? l(l(a, A.ajaxSettings), b) : l(A.ajaxSettings, a)
        },
        ajaxPrefilter: j(eb),
        ajaxTransport: j(fb),
        ajax: function(a, b) {
          function c (a, b, c, g) {
            var i, k, l, u, v, x = b;
            2 !== w && (w = 2, h && clearTimeout(h), d = void 0, f = g || "", y.readyState = a > 0 ? 4 : 0, i = a >= 200 && 300 > a || 304 === a, c && (u = m(o, y, c)), u = n(o, u, y, i), i ? (o.ifModified && (v = y.getResponseHeader("Last-Modified"), v && (A.lastModified[e] = v), v = y.getResponseHeader("etag"), v && (A.etag[e] = v)), 204 === a || "HEAD" === o.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, k = u.data, l = u.error, i = !l)) : (l = x, (a || !x) && (x = "error", 0 > a && (a = 0))), y.status = a, y.statusText = (b || x) + "", i ? r.resolveWith(p, [k, x, y]) : r.rejectWith(p, [y, x, l]), y.statusCode(t), t = void 0, j && q.trigger(i ? "ajaxSuccess" : "ajaxError", [y, o, i ? k : l]), s.fireWith(p, [y, x]), j && (q.trigger("ajaxComplete", [y, o]), --A.active || A.event.trigger("ajaxStop")))
          }

          "object" == typeof a && (b = a, a = void 0), b = b || {};
          var d, e, f, g, h, i, j, l, o = A.ajaxSetup({}, b), p = o.context || o, q = o.context && (p.nodeType || p.jquery) ? A(p) : A.event, r = A.Deferred(), s = A.Callbacks("once memory"), t = o.statusCode || {}, u = {}, v = {}, w = 0, x = "canceled", y = {
            readyState: 0,
            getResponseHeader: function(a) {
              var b;
              if (2 === w) {
                if (!g)for (g = {}; b = _.exec(f);)g[b[1].toLowerCase()] = b[2];
                b = g[a.toLowerCase()]
              }
              return null == b ? null : b
            },
            getAllResponseHeaders: function() {
              return 2 === w ? f : null
            },
            setRequestHeader: function(a, b) {
              var c = a.toLowerCase();
              return w || (a = v[c] = v[c] || a, u[a] = b), this
            },
            overrideMimeType: function(a) {
              return w || (o.mimeType = a), this
            },
            statusCode: function(a) {
              var b;
              if (a)if (2 > w)for (b in a)t[b] = [t[b], a[b]]; else y.always(a[y.status]);
              return this
            },
            abort: function(a) {
              var b = a || x;
              return d && d.abort(b), c(0, b), this
            }
          };
          if (r.promise(y).complete = s.add, y.success = y.done, y.error = y.fail, o.url = ((a || o.url || Y) + "").replace(Z, "").replace(cb, X[1] + "//"), o.type = b.method || b.type || o.method || o.type, o.dataTypes = A.trim(o.dataType || "*").toLowerCase().match(J) || [""], null == o.crossDomain && (i = db.exec(o.url.toLowerCase()), o.crossDomain = !(!i || i[1] === X[1] && i[2] === X[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (X[3] || ("http:" === X[1] ? "80" : "443")))), o.data && o.processData && "string" != typeof o.data && (o.data = A.param(o.data, o.traditional)), k(eb, o, b, y), 2 === w)return y;
          j = o.global, j && 0 === A.active++ && A.event.trigger("ajaxStart"), o.type = o.type.toUpperCase(), o.hasContent = !bb.test(o.type), e = o.url, o.hasContent || (o.data && (e = o.url += (W.test(e) ? "&" : "?") + o.data, delete o.data), o.cache === !1 && (o.url = $.test(e) ? e.replace($, "$1_=" + V++) : e + (W.test(e) ? "&" : "?") + "_=" + V++)), o.ifModified && (A.lastModified[e] && y.setRequestHeader("If-Modified-Since", A.lastModified[e]), A.etag[e] && y.setRequestHeader("If-None-Match", A.etag[e])), (o.data && o.hasContent && o.contentType !== !1 || b.contentType) && y.setRequestHeader("Content-Type", o.contentType), y.setRequestHeader("Accept", o.dataTypes[0] && o.accepts[o.dataTypes[0]] ? o.accepts[o.dataTypes[0]] + ("*" !== o.dataTypes[0] ? ", " + gb + "; q=0.01" : "") : o.accepts["*"]);
          for (l in o.headers)y.setRequestHeader(l, o.headers[l]);
          if (o.beforeSend && (o.beforeSend.call(p, y, o) === !1 || 2 === w))return y.abort();
          x = "abort";
          for (l in{success: 1, error: 1, complete: 1})y[l](o[l]);
          if (d = k(fb, o, b, y)) {
            y.readyState = 1, j && q.trigger("ajaxSend", [y, o]), o.async && o.timeout > 0 && (h = setTimeout(function() {
              y.abort("timeout")
            }, o.timeout));
            try {
              w = 1, d.send(u, c)
            } catch (z) {
              if (!(2 > w))throw z;
              c(-1, z)
            }
          } else c(-1, "No Transport");
          return y
        },
        getJSON: function(a, b, c) {
          return A.get(a, b, c, "json")
        },
        getScript: function(a, b) {
          return A.get(a, void 0, b, "script")
        }
      }), A.each(["get", "post"], function(a, b) {
        A[b] = function(a, c, d, e) {
          return A.isFunction(c) && (e = e || d, d = c, c = void 0), A.ajax({
            url: a,
            type: b,
            dataType: e,
            data: c,
            success: d
          })
        }
      }), A.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
        A.fn[b] = function(a) {
          return this.on(b, a)
        }
      });
      var ib = /%20/g, jb = /\[\]$/, kb = /\r?\n/g, lb = /^(?:submit|button|image|reset|file)$/i, mb = /^(?:input|select|textarea|keygen)/i;
      A.param = function(a, b) {
        var c, d = [], e = function(a, b) {
          b = A.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        if (void 0 === b && (b = A.ajaxSettings && A.ajaxSettings.traditional), A.isArray(a) || a.jquery && !A.isPlainObject(a))A.each(a, function() {
          e(this.name, this.value)
        }); else for (c in a)o(c, a[c], b, e);
        return d.join("&").replace(ib, "+")
      }, A.fn.extend({
        serialize: function() {
          return A.param(this.serializeArray())
        }, serializeArray: function() {
          return this.map(function() {
            var a = A.prop(this, "elements");
            return a ? A.makeArray(a) : this
          }).filter(function() {
            var a = this.type;
            return this.name && !A(this).is(":disabled") && mb.test(this.nodeName) && !lb.test(a) && (this.checked || !rcheckableType.test(a))
          }).map(function(a, b) {
            var c = A(this).val();
            return null == c ? null : A.isArray(c) ? A.map(c, function(a) {
              return {name: b.name, value: a.replace(kb, "\r\n")}
            }) : {name: b.name, value: c.replace(kb, "\r\n")}
          }).get()
        }
      }), A.ajaxSettings.xhr = function() {
        try {
          return new XMLHttpRequest
        } catch (a) {
        }
      };
      var nb = 0, ob = {}, pb = {0: 200, 1223: 204}, qb = A.ajaxSettings.xhr();
      a.ActiveXObject && A(a).on("unload", function() {
        for (var a in ob)ob[a]()
      }), x.cors = !!qb && "withCredentials"in qb, x.ajax = qb = !!qb, A.ajaxTransport(function(a) {
        var b;
        return x.cors || qb && !a.crossDomain ? {
          send: function(c, d) {
            var e, f = a.xhr(), g = ++nb;
            if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)for (e in a.xhrFields)f[e] = a.xhrFields[e];
            a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
            for (e in c)f.setRequestHeader(e, c[e]);
            b = function(a) {
              return function() {
                b && (delete ob[g], b = f.onload = f.onerror = null, "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(pb[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? {text: f.responseText} : void 0, f.getAllResponseHeaders()))
              }
            }, f.onload = b(), f.onerror = b("error"), b = ob[g] = b("abort");
            try {
              f.send(a.hasContent && a.data || null)
            } catch (h) {
              if (b)throw h
            }
          }, abort: function() {
            b && b()
          }
        } : void 0
      }), A.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /(?:java|ecma)script/},
        converters: {
          "text script": function(a) {
            return A.globalEval(a), a
          }
        }
      }), A.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
      }), A.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
          var b, c;
          return {
            send: function(d, e) {
              b = A("<script>").prop({
                async: !0,
                charset: a.scriptCharset,
                src: a.url
              }).on("load error", c = function(a) {
                b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type)
              }), y.head.appendChild(b[0])
            }, abort: function() {
              c && c()
            }
          }
        }
      });
      var rb = [], sb = /(=)\?(?=&|$)|\?\?/;
      A.ajaxSetup({
        jsonp: "callback", jsonpCallback: function() {
          var a = rb.pop() || A.expando + "_" + V++;
          return this[a] = !0, a
        }
      }), A.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (sb.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && sb.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = A.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(sb, "$1" + e) : b.jsonp !== !1 && (b.url += (W.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
          return g || A.error(e + " was not called"), g[0]
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
          g = arguments
        }, d.always(function() {
          a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, rb.push(e)), g && A.isFunction(f) && f(g[0]), g = f = void 0
        }), "script") : void 0
      }), A.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a)return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || y;
        var d = G.exec(a), e = !c && [];
        return d ? [b.createElement(d[1])] : (d = A.buildFragment([a], b, e), e && e.length && A(e).remove(), A.merge([], d.childNodes))
      };
      var tb = A.fn.load;
      return A.fn.load = function(a, b, c) {
        if ("string" != typeof a && tb)return tb.apply(this, arguments);
        var d, e, f, g = this, h = a.indexOf(" ");
        return h >= 0 && (d = A.trim(a.slice(h)), a = a.slice(0, h)), A.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && A.ajax({
          url: a,
          type: e,
          dataType: "html",
          data: b
        }).done(function(a) {
          f = arguments, g.html(d ? A("<div>").append(A.parseHTML(a)).find(d) : a)
        }).complete(c && function(a, b) {
            g.each(c, f || [a.responseText, b, a])
          }), this
      }, A.noConflict = function() {
      }, A
    })
  }, {}], 8: [function(a, b) {
    var c, d;
    d = 0, c = "", b.exports = {
      hex_sha1: function(a) {
        return this.rstr2hex(this.rstr_sha1(this.str2rstr_utf8(a)))
      }, b64_sha1: function(a) {
        return this.rstr2b64(this.rstr_sha1(this.str2rstr_utf8(a)))
      }, any_sha1: function(a, b) {
        return this.rstr2any(this.rstr_sha1(this.str2rstr_utf8(a)), b)
      }, hex_hmac_sha1: function(a, b) {
        return this.rstr2hex(this.rstr_hmac_sha1(this.str2rstr_utf8(a), this.str2rstr_utf8(b)))
      }, b64_hmac_sha1: function(a, b) {
        return this.rstr2b64(this.rstr_hmac_sha1(this.str2rstr_utf8(a), this.str2rstr_utf8(b)))
      }, any_hmac_sha1: function(a, b, c) {
        return this.rstr2any(this.rstr_hmac_sha1(this.str2rstr_utf8(a), this.str2rstr_utf8(b)), c)
      }, sha1_vm_test: function() {
        return "a9993e364706816aba3e25717850c26c9cd0d89d" === thishex_sha1("abc").toLowerCase()
      }, rstr_sha1: function(a) {
        return this.binb2rstr(this.binb_sha1(this.rstr2binb(a), 8 * a.length))
      }, rstr_hmac_sha1: function(a, b) {
        var c, d, e, f, g;
        for (c = this.rstr2binb(a), c.length > 16 && (c = this.binb_sha1(c, 8 * a.length)), f = Array(16), g = Array(16), e = 0; 16 > e;)f[e] = 909522486 ^ c[e], g[e] = 1549556828 ^ c[e], e++;
        return d = this.binb_sha1(f.concat(this.rstr2binb(b)), 512 + 8 * b.length), this.binb2rstr(this.binb_sha1(g.concat(d), 672))
      }, rstr2hex: function(a) {
        var b, c, e, f, g;
        try {
        } catch (h) {
          b = h, d = 0
        }
        for (c = d ? "0123456789ABCDEF" : "0123456789abcdef", f = "", g = void 0, e = 0; e < a.length;)g = a.charCodeAt(e), f += c.charAt(g >>> 4 & 15) + c.charAt(15 & g), e++;
        return f
      }, rstr2b64: function(a) {
        var b, d, e, f, g, h, i;
        try {
        } catch (j) {
          b = j, c = ""
        }
        for (h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", g = "", f = a.length, d = 0; f > d;) {
          for (i = a.charCodeAt(d) << 16 | (f > d + 1 ? a.charCodeAt(d + 1) << 8 : 0) | (f > d + 2 ? a.charCodeAt(d + 2) : 0), e = 0; 4 > e;)g += 8 * d + 6 * e > 8 * a.length ? c : h.charAt(i >>> 6 * (3 - e) & 63), e++;
          d += 3
        }
        return g
      }, rstr2any: function(a, b) {
        var c, d, e, f, g, h, i, j, k;
        for (d = b.length, j = Array(), f = void 0, h = void 0, k = void 0, i = void 0, c = Array(Math.ceil(a.length / 2)), f = 0; f < c.length;)c[f] = a.charCodeAt(2 * f) << 8 | a.charCodeAt(2 * f + 1), f++;
        for (; c.length > 0;) {
          for (i = Array(), k = 0, f = 0; f < c.length;)k = (k << 16) + c[f], h = Math.floor(k / d), k -= h * d, (i.length > 0 || h > 0) && (i[i.length] = h), f++;
          j[j.length] = k, c = i
        }
        for (g = "", f = j.length - 1; f >= 0;)g += b.charAt(j[f]), f--;
        for (e = Math.ceil(8 * a.length / (Math.log(b.length) / Math.log(2))), f = g.length; e > f;)g = b[0] + g, f++;
        return g
      }, str2rstr_utf8: function(a) {
        var b, c, d, e;
        for (c = "", b = -1, d = void 0, e = void 0; ++b < a.length;)d = a.charCodeAt(b), e = b + 1 < a.length ? a.charCodeAt(b + 1) : 0, d >= 55296 && 56319 >= d && e >= 56320 && 57343 >= e && (d = 65536 + ((1023 & d) << 10) + (1023 & e), b++), 127 >= d ? c += String.fromCharCode(d) : 2047 >= d ? c += String.fromCharCode(192 | d >>> 6 & 31, 128 | 63 & d) : 65535 >= d ? c += String.fromCharCode(224 | d >>> 12 & 15, 128 | d >>> 6 & 63, 128 | 63 & d) : 2097151 >= d && (c += String.fromCharCode(240 | d >>> 18 & 7, 128 | d >>> 12 & 63, 128 | d >>> 6 & 63, 128 | 63 & d));
        return c
      }, str2rstr_utf16le: function(a) {
        var b, c;
        for (c = "", b = 0; b < a.length;)c += String.fromCharCode(255 & a.charCodeAt(b), a.charCodeAt(b) >>> 8 & 255), b++;
        return c
      }, str2rstr_utf16be: function(a) {
        var b, c;
        for (c = "", b = 0; b < a.length;)c += String.fromCharCode(a.charCodeAt(b) >>> 8 & 255, 255 & a.charCodeAt(b)), b++;
        return c
      }, rstr2binb: function(a) {
        var b, c;
        for (c = Array(a.length >> 2), b = 0; b < c.length;)c[b] = 0, b++;
        for (b = 0; b < 8 * a.length;)c[b >> 5] |= (255 & a.charCodeAt(b / 8)) << 24 - b % 32, b += 8;
        return c
      }, binb2rstr: function(a) {
        var b, c;
        for (c = "", b = 0; b < 32 * a.length;)c += String.fromCharCode(a[b >> 5] >>> 24 - b % 32 & 255), b += 8;
        return c
      }, binb_sha1: function(a, b) {
        var c, d, e, f, g, h, i, j, k, l, m, n, o, p;
        for (a[b >> 5] |= 128 << 24 - b % 32, a[(b + 64 >> 9 << 4) + 15] = b, p = Array(80), c = 1732584193, d = -271733879, e = -1732584194, f = 271733878, g = -1009589776, h = 0; h < a.length;) {
          for (j = c, k = d, l = e, m = f, n = g, i = 0; 80 > i;)p[i] = 16 > i ? a[h + i] : this.bit_rol(p[i - 3] ^ p[i - 8] ^ p[i - 14] ^ p[i - 16], 1), o = this.safe_add(this.safe_add(this.bit_rol(c, 5), this.sha1_ft(i, d, e, f)), this.safe_add(this.safe_add(g, p[i]), this.sha1_kt(i))), g = f, f = e, e = this.bit_rol(d, 30), d = c, c = o, i++;
          c = this.safe_add(c, j), d = this.safe_add(d, k), e = this.safe_add(e, l), f = this.safe_add(f, m), g = this.safe_add(g, n), h += 16
        }
        return Array(c, d, e, f, g)
      }, sha1_ft: function(a, b, c, d) {
        return 20 > a ? b & c | ~b & d : 40 > a ? b ^ c ^ d : 60 > a ? b & c | b & d | c & d : b ^ c ^ d
      }, sha1_kt: function(a) {
        return 20 > a ? 1518500249 : 40 > a ? 1859775393 : 60 > a ? -1894007588 : -899497514
      }, safe_add: function(a, b) {
        var c, d;
        return c = (65535 & a) + (65535 & b), d = (a >> 16) + (b >> 16) + (c >> 16), d << 16 | 65535 & c
      }, bit_rol: function(a, b) {
        return a << b | a >>> 32 - b
      }, create_hash: function() {
        var a;
        return a = this.b64_sha1((new Date).getTime() + ":" + Math.floor(9999999 * Math.random())), a.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=+$/, "")
      }
    }
  }, {}], 9: [function(a, b) {
    b.exports = function(a) {
      return {
        getAbsUrl: function(b) {
          var c;
          return b.match(/^.{2,5}:\/\//) ? b : "/" === b[0] ? a.location.protocol + "//" + a.location.host + b : (c = a.location.protocol + "//" + a.location.host + a.location.pathname, "/" !== c[c.length - 1] && "#" !== b[0] ? c + "/" + b : c + b)
        }, replaceParam: function(a, b, c) {
          return a = a.replace(/\{\{(.*?)\}\}/g, function(a, c) {
            return b[c] || ""
          }), c && (a = a.replace(/\{(.*?)\}/g, function(a, b) {
            return c[b] || ""
          })), a
        }
      }
    }
  }, {}]
}, {}, [4]);