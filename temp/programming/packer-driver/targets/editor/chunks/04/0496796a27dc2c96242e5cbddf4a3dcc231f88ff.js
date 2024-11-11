System.register(["__unresolved_0"], function (_export2, _context2) {
  "use strict";

  var _cjsLoader, _cjsExports, __cjsMetaURL;

  _export2("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }],
    execute: function () {
      _export2("__cjsMetaURL", __cjsMetaURL = _context2.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        System.register("chunks:///_virtual/FloatingText.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], function (t) {
          var o, e, r, n, i, a, c, l, s, u, p;
          return {
            setters: [function (t) {
              o = t.applyDecoratedDescriptor, e = t.inheritsLoose, r = t.initializerDefineProperty, n = t.assertThisInitialized;
            }, function (t) {
              i = t.cclegacy, a = t._decorator, c = t.Label, l = t.Color, s = t.tween, u = t.Vec3, p = t.Component;
            }],
            execute: function () {
              var d, f, h, g;

              i._RF.push({}, "bd2afV6GjdEioGJ6Sb+apw4", "FloatingText", void 0);

              var b = a.ccclass,
                  y = a.property;
              t("FloatingText", b("FloatingText")((h = o((f = function (t) {
                function o() {
                  for (var o, e = arguments.length, i = new Array(e), a = 0; a < e; a++) i[a] = arguments[a];

                  return o = t.call.apply(t, [this].concat(i)) || this, r(o, "duration", h, n(o)), r(o, "moveUpDistance", g, n(o)), o;
                }

                return e(o, t), o.prototype.start = function () {
                  var t = this,
                      o = this.getComponent(c) || this.getComponentInChildren(c);
                  o && (o.color = new l(o.color.r, o.color.g, o.color.b, 255), s(o).to(this.duration, {
                    color: new l(o.color.r, o.color.g, o.color.b, 0)
                  }).start(), s(this.node).by(this.duration, {
                    position: new u(0, this.moveUpDistance, 0)
                  }).call(function () {
                    t.node.destroy();
                  }).start());
                }, o;
              }(p)).prototype, "duration", [y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return 1.5;
                }
              }), g = o(f.prototype, "moveUpDistance", [y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return 300;
                }
              }), d = f)) || d);

              i._RF.pop();
            }
          };
        });
        System.register("chunks:///_virtual/FriendsPage.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], function (e) {
          var n, r, t, i, o, a, s, l, c, u, f, p, d;
          return {
            setters: [function (e) {
              n = e.applyDecoratedDescriptor, r = e.inheritsLoose, t = e.initializerDefineProperty, i = e.assertThisInitialized, o = e.asyncToGenerator, a = e.regeneratorRuntime;
            }, function (e) {
              s = e.cclegacy, l = e._decorator, c = e.ScrollView, u = e.Prefab, f = e.Label, p = e.instantiate, d = e.Component;
            }],
            execute: function () {
              var b, h, g, m, F, v, w, L, y, P;

              s._RF.push({}, "829ce7RYglPV6kmQF/Wbmbm", "FriendsPage", void 0);

              var k = l.ccclass,
                  I = l.property;
              e("FriendsPage", (b = k("FriendsPage"), h = I(c), g = I(u), m = I(f), b((w = n((v = function (e) {
                function n() {
                  for (var n, r = arguments.length, o = new Array(r), a = 0; a < r; a++) o[a] = arguments[a];

                  return n = e.call.apply(e, [this].concat(o)) || this, t(n, "scrollView", w, i(n)), t(n, "friendItemPrefab", L, i(n)), t(n, "totalFriendsLabel", y, i(n)), t(n, "apiBaseUrl", P, i(n)), n.userId = 777270195, n;
                }

                r(n, e);
                var s = n.prototype;
                return s.start = function () {
                  this.fetchFriends();
                }, s.fetchFriends = function () {
                  var e = o(a().mark(function e() {
                    var n, r;
                    return a().wrap(function (e) {
                      for (;;) switch (e.prev = e.next) {
                        case 0:
                          return e.prev = 0, e.next = 3, fetch(this.apiBaseUrl + "/" + this.userId);

                        case 3:
                          if ((n = e.sent).ok) {
                            e.next = 9;
                            break;
                          }

                          if (404 !== n.status) {
                            e.next = 8;
                            break;
                          }

                          return this.totalFriendsLabel.string = "У тебя пока нет друзей", e.abrupt("return");

                        case 8:
                          throw new Error("Network response was not ok");

                        case 9:
                          return e.next = 11, n.json();

                        case 11:
                          r = e.sent, console.log("Fetched friends:", r), this.totalFriendsLabel.string = "У тебя " + r.length + " друзей", this.populateFriendsList(r), e.next = 21;
                          break;

                        case 17:
                          e.prev = 17, e.t0 = e.catch(0), console.error("Ошибка при загрузке списка друзей:", e.t0), this.totalFriendsLabel.string = "Не удалось загрузить список друзей.";

                        case 21:
                        case "end":
                          return e.stop();
                      }
                    }, e, this, [[0, 17]]);
                  }));
                  return function () {
                    return e.apply(this, arguments);
                  };
                }(), s.populateFriendsList = function (e) {
                  var n = this,
                      r = this.scrollView.content;
                  console.log("Populating friends list with", e.length, "friends."), r.removeAllChildren(), e.forEach(function (e, t) {
                    console.log("Adding friend " + (t + 1) + ":", e);
                    var i = p(n.friendItemPrefab);
                    i.parent = r;
                    var o = i.getComponentsInChildren(f);
                    console.log("Found " + o.length + " Label components in FriendItem.");
                    var a = null,
                        s = null,
                        l = null;
                    o.forEach(function (e) {
                      var n = e.node.name;
                      "UsernameLabel" === n ? a = e : "NumberLabel" === n ? s = e : "CoinsLabel" === n && (l = e);
                    }), a && s && l ? (a.string = e.username, s.string = t + 1 + ".", l.string = n.formatCoins(e.coins), console.log("Set Username: " + e.username + ", Number: " + (t + 1) + ", Coins: " + e.coins)) : (console.warn("Не удалось найти один из Label компонентов в FriendItem"), console.log("Найденные Label узлы:", o.map(function (e) {
                      return e.node.name;
                    })));
                  });
                }, s.formatCoins = function (e) {
                  return e >= 1e6 ? Math.round(e / 1e6) + "M" : Math.round(e).toLocaleString();
                }, n;
              }(d)).prototype, "scrollView", [h], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), L = n(v.prototype, "friendItemPrefab", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), y = n(v.prototype, "totalFriendsLabel", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), P = n(v.prototype, "apiBaseUrl", [I], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return "https://dev.simatap.ru/api/referrals";
                }
              }), F = v)) || F));

              s._RF.pop();
            }
          };
        });
        System.register("chunks:///_virtual/IncomeManager.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], function (e) {
          var t, n, r, a, o, c, i, s, u, l;
          return {
            setters: [function (e) {
              t = e.applyDecoratedDescriptor, n = e.inheritsLoose, r = e.initializerDefineProperty, a = e.assertThisInitialized, o = e.asyncToGenerator, c = e.regeneratorRuntime;
            }, function (e) {
              i = e.cclegacy, s = e._decorator, u = e.Label, l = e.Component;
            }],
            execute: function () {
              var p, m, f, h, I;

              i._RF.push({}, "a3599luME5HILUcjWVa3vL6", "IncomeManager", void 0);

              var b = s.ccclass,
                  v = s.property;
              e("IncomeManager", (p = b("IncomeManager"), m = v(u), p((I = t((h = function (e) {
                function t() {
                  for (var t, n = arguments.length, o = new Array(n), c = 0; c < n; c++) o[c] = arguments[c];

                  return t = e.call.apply(e, [this].concat(o)) || this, r(t, "incomeLabel", I, a(t)), t.apiUrl = "https://dev.simatap.ru/api/upgrades?userId=777270195", t;
                }

                n(t, e);
                var i = t.prototype;
                return i.start = function () {
                  this.incomeLabel ? this.fetchIncomeData() : console.error("incomeLabel не назначен в IncomeManager.");
                }, i.fetchIncomeData = function () {
                  var e = o(c().mark(function e() {
                    var t, n, r, a;
                    return c().wrap(function (e) {
                      for (;;) switch (e.prev = e.next) {
                        case 0:
                          return e.prev = 0, e.next = 3, fetch(this.apiUrl);

                        case 3:
                          if ((t = e.sent).ok) {
                            e.next = 6;
                            break;
                          }

                          throw new Error("HTTP error! status: " + t.status);

                        case 6:
                          return e.next = 8, t.json();

                        case 8:
                          n = e.sent, r = this.calculateTotalIncome(n), a = this.formatIncome(r), this.updateIncomeLabel(a), console.log("Общий доход: " + a), e.next = 19;
                          break;

                        case 15:
                          e.prev = 15, e.t0 = e.catch(0), console.error("Ошибка при получении данных с API:", e.t0), this.updateIncomeLabel("+ 0 доход в час");

                        case 19:
                        case "end":
                          return e.stop();
                      }
                    }, e, this, [[0, 15]]);
                  }));
                  return function () {
                    return e.apply(this, arguments);
                  };
                }(), i.calculateTotalIncome = function (e) {
                  return e.reduce(function (e, t) {
                    return e + (t.cumulative_income || 0);
                  }, 0);
                }, i.formatIncome = function (e) {
                  return e >= 1e3 ? "+ " + (e / 1e3).toFixed(0) + "K доход в час" : "+ " + e + " доход в час";
                }, i.updateIncomeLabel = function (e) {
                  this.incomeLabel.string = e;
                }, t;
              }(l)).prototype, "incomeLabel", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), f = h)) || f));

              i._RF.pop();
            }
          };
        });
        System.register("chunks:///_virtual/LeadersPage.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], function (e) {
          var r, n, t, a, o, i, l, s, u, c, p, b, d;
          return {
            setters: [function (e) {
              r = e.applyDecoratedDescriptor, n = e.inheritsLoose, t = e.initializerDefineProperty, a = e.assertThisInitialized, o = e.asyncToGenerator, i = e.regeneratorRuntime;
            }, function (e) {
              l = e.cclegacy, s = e._decorator, u = e.ScrollView, c = e.Prefab, p = e.Label, b = e.instantiate, d = e.Component;
            }],
            execute: function () {
              var f, h, L, m, g, w, v, k, y, C, U, P, I, B;

              l._RF.push({}, "509aaKVAOZOU4SArmn1DqkK", "LeadersPage", void 0);

              var R = s.ccclass,
                  z = s.property;
              e("LeaderBoardPage", (f = R("LeaderBoardPage"), h = z(u), L = z(c), m = z(p), g = z(p), w = z(p), f((y = r((k = function (e) {
                function r() {
                  for (var r, n = arguments.length, o = new Array(n), i = 0; i < n; i++) o[i] = arguments[i];

                  return r = e.call.apply(e, [this].concat(o)) || this, t(r, "scrollView", y, a(r)), t(r, "leaderItemPrefab", C, a(r)), t(r, "currentRankLabel", U, a(r)), t(r, "currentUsernameLabel", P, a(r)), t(r, "currentCoinsLabel", I, a(r)), t(r, "apiBaseUrl", B, a(r)), r.userId = 777270195, r;
                }

                n(r, e);
                var l = r.prototype;
                return l.start = function () {
                  this.fetchLeaders();
                }, l.fetchLeaders = function () {
                  var e = o(i().mark(function e() {
                    var r, n;
                    return i().wrap(function (e) {
                      for (;;) switch (e.prev = e.next) {
                        case 0:
                          return e.prev = 0, e.next = 3, fetch(this.apiBaseUrl + "?userId=" + this.userId);

                        case 3:
                          if ((r = e.sent).ok) {
                            e.next = 9;
                            break;
                          }

                          if (404 !== r.status) {
                            e.next = 8;
                            break;
                          }

                          return console.warn("Топ-лидеров пока нет."), e.abrupt("return");

                        case 8:
                          throw new Error("Network response was not ok");

                        case 9:
                          return e.next = 11, r.json();

                        case 11:
                          n = e.sent, console.log("Fetched leaderboard data:", n), this.populateLeadersList(n.top50), n.currentUser && this.displayCurrentUser(n.currentUser), this.scrollView && this.scrollView.scrollToTop(0, !1), e.next = 21;
                          break;

                        case 18:
                          e.prev = 18, e.t0 = e.catch(0), console.error("Ошибка при загрузке списка лидеров:", e.t0);

                        case 21:
                        case "end":
                          return e.stop();
                      }
                    }, e, this, [[0, 18]]);
                  }));
                  return function () {
                    return e.apply(this, arguments);
                  };
                }(), l.populateLeadersList = function (e) {
                  var r = this,
                      n = this.scrollView.content;
                  console.log("Populating leaderboard list with", e.length, "leaders."), n.removeAllChildren(), e.forEach(function (e, t) {
                    console.log("Adding leader " + e.rank + ":", e);
                    var a = b(r.leaderItemPrefab);
                    a.parent = n;
                    var o = a.getComponentsInChildren(p);
                    console.log("Found " + o.length + " Label components in LeaderItem.");
                    var i = null,
                        l = null,
                        s = null;
                    o.forEach(function (e) {
                      var r = e.node.name;
                      "NumberLabel" === r ? i = e : "UsernameLabel" === r ? l = e : "CoinsLabel" === r && (s = e);
                    }), i && l && s ? (i.string = "#" + e.rank, l.string = e.username, s.string = r.formatCoins(e.coins), console.log("Set Number: " + e.rank + ", Username: " + e.username + ", Coins: " + e.coins)) : (console.warn("Не удалось найти один из Label компонентов в LeaderItem"), console.log("Найденные Label узлы:", o.map(function (e) {
                      return e.node.name;
                    })));
                  });
                }, l.displayCurrentUser = function (e) {
                  this.currentRankLabel ? this.currentRankLabel.string = "#" + e.rank : console.warn("currentRankLabel не назначен в LeaderBoardPage."), this.currentUsernameLabel ? this.currentUsernameLabel.string = "" + e.username : console.warn("currentUsernameLabel не назначен в LeaderBoardPage."), this.currentCoinsLabel ? this.currentCoinsLabel.string = "" + this.formatCoins(e.coins) : console.warn("currentCoinsLabel не назначен в LeaderBoardPage.");
                }, l.formatCoins = function (e) {
                  return e >= 1e6 ? Math.round(e / 1e6) + "M" : Math.round(e).toLocaleString("ru-RU");
                }, r;
              }(d)).prototype, "scrollView", [h], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), C = r(k.prototype, "leaderItemPrefab", [L], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), U = r(k.prototype, "currentRankLabel", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), P = r(k.prototype, "currentUsernameLabel", [g], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), I = r(k.prototype, "currentCoinsLabel", [w], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), B = r(k.prototype, "apiBaseUrl", [z], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return "https://dev.simatap.ru/api/users/leaders";
                }
              }), v = k)) || v));

              l._RF.pop();
            }
          };
        });
        System.register("chunks:///_virtual/main", ["./SpineController.ts.ts", "./FloatingText.ts", "./FriendsPage.ts", "./IncomeManager.ts", "./LeadersPage.ts", "./ReferralLinkManager.ts", "./SocketManager.ts", "./TabBarController.ts"], function () {
          return {
            setters: [null, null, null, null, null, null, null, null],
            execute: function () {}
          };
        });
        System.register("chunks:///_virtual/ReferralLinkManager.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], function (e) {
          var i, n, t, o, r, a, c, l, s, p, f, u, L, h;
          return {
            setters: [function (e) {
              i = e.applyDecoratedDescriptor, n = e.inheritsLoose, t = e.initializerDefineProperty, o = e.assertThisInitialized, r = e.asyncToGenerator, a = e.regeneratorRuntime;
            }, function (e) {
              c = e.cclegacy, l = e._decorator, s = e.Node, p = e.Label, f = e.Vec3, u = e.Component, L = e.Color, h = e.tween;
            }],
            execute: function () {
              var b, k, y, d, N, g, v, m, w, D, R, C, M;

              c._RF.push({}, "18bc3yUuD1GYI5rJViGJcp5", "ReferralLinkManager", void 0);

              var z = l.ccclass,
                  P = l.property;
              e("ReferralLinkManager", (b = z("ReferralLinkManager"), k = P(s), y = P(s), d = P(p), N = P(p), b((m = i((v = function (e) {
                function i() {
                  for (var i, n = arguments.length, r = new Array(n), a = 0; a < n; a++) r[a] = arguments[a];

                  return i = e.call.apply(e, [this].concat(r)) || this, t(i, "generateLinkNode", m, o(i)), t(i, "copyLinkNode", w, o(i)), t(i, "referralLinkLabel", D, o(i)), t(i, "copyNotificationLabel", R, o(i)), i.referralLink = "", i.userId = 777270195, t(i, "animationDuration", C, o(i)), t(i, "moveUpDistance", M, o(i)), i.initialPosition = new f(), i;
                }

                n(i, e);
                var c = i.prototype;
                return c.start = function () {
                  this.generateLinkNode || console.error("generateLinkNode не назначен в ReferralLinkManager."), this.copyLinkNode || console.error("copyLinkNode не назначен в ReferralLinkManager."), this.referralLinkLabel || console.error("referralLinkLabel не назначен в ReferralLinkManager."), this.copyNotificationLabel || console.error("copyNotificationLabel не назначен в ReferralLinkManager."), this.generateLinkNode && this.generateLinkNode.on(s.EventType.TOUCH_END, this.onGenerateLinkClicked, this), this.copyLinkNode && (this.copyLinkNode.on(s.EventType.TOUCH_END, this.onCopyLinkClicked, this), this.copyLinkNode.active = !1), this.copyNotificationLabel && (this.copyNotificationLabel.node.active = !1, this.initialPosition = this.copyNotificationLabel.node.position.clone());
                }, c.onGenerateLinkClicked = function () {
                  this.referralLink = this.getReferralLink(this.userId), this.referralLinkLabel.string = this.referralLink, console.log("Реферальная ссылка создана: " + this.referralLink), this.copyLinkNode && (this.copyLinkNode.active = !0);
                }, c.getReferralLink = function (e) {
                  return "https://t.me/misapatStage_bot?startapp=refId" + e;
                }, c.onCopyLinkClicked = function () {
                  var e = r(a().mark(function e() {
                    var i = this;
                    return a().wrap(function (e) {
                      for (;;) switch (e.prev = e.next) {
                        case 0:
                          if (this.copyNotificationLabel && (this.copyNotificationLabel.node.active = !0, this.copyNotificationLabel.color = new L(255, 255, 255, 255), this.copyNotificationLabel.node.setPosition(this.initialPosition.clone()), h(this.copyNotificationLabel).to(this.animationDuration, {
                            color: new L(255, 255, 255, 0)
                          }).start(), h(this.copyNotificationLabel.node).by(this.animationDuration, {
                            position: new f(0, this.moveUpDistance, 0)
                          }).call(function () {
                            i.copyNotificationLabel.node.active = !1, i.copyNotificationLabel.color = new L(255, 255, 255, 255), i.copyNotificationLabel.node.setPosition(i.initialPosition.clone());
                          }).start()), this.referralLink) {
                            e.next = 4;
                            break;
                          }

                          return console.warn("Реферальная ссылка не создана."), e.abrupt("return");

                        case 4:
                          return e.prev = 4, e.next = 7, navigator.clipboard.writeText(this.referralLink);

                        case 7:
                          console.log("Реферальная ссылка скопирована в буфер обмена."), e.next = 13;
                          break;

                        case 10:
                          e.prev = 10, e.t0 = e.catch(4), console.error("Не удалось скопировать ссылку: ", e.t0);

                        case 13:
                        case "end":
                          return e.stop();
                      }
                    }, e, this, [[4, 10]]);
                  }));
                  return function () {
                    return e.apply(this, arguments);
                  };
                }(), i;
              }(u)).prototype, "generateLinkNode", [k], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), w = i(v.prototype, "copyLinkNode", [y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), D = i(v.prototype, "referralLinkLabel", [d], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), R = i(v.prototype, "copyNotificationLabel", [N], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), C = i(v.prototype, "animationDuration", [P], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return 1.5;
                }
              }), M = i(v.prototype, "moveUpDistance", [P], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return 300;
                }
              }), g = v)) || g));

              c._RF.pop();
            }
          };
        });
        System.register("chunks:///_virtual/SocketManager.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], function (e) {
          var s, t, n, r, o, a, i, c, g, u;
          return {
            setters: [function (e) {
              s = e.applyDecoratedDescriptor, t = e.inheritsLoose, n = e.initializerDefineProperty, r = e.assertThisInitialized;
            }, function (e) {
              o = e.cclegacy, a = e._decorator, i = e.Label, c = e.ProgressBar, g = e.Color, u = e.Component;
            }],
            execute: function () {
              var l, h, f, b, d, y, p, w, m, L, k;

              o._RF.push({}, "a0c39VZ6j5NRrT6cxMHqDGB", "SocketManager", void 0);

              var M = a.ccclass,
                  v = a.property;
              e("SocketManager", (l = M("SocketManager"), h = v(i), f = v(c), b = v(i), d = v(i), l((w = s((p = function (e) {
                function s() {
                  for (var s, t = arguments.length, o = new Array(t), a = 0; a < t; a++) o[a] = arguments[a];

                  return s = e.call.apply(e, [this].concat(o)) || this, n(s, "coinsLabel", w, r(s)), n(s, "energyProgressBar", m, r(s)), n(s, "energyValueLabel", L, r(s)), n(s, "messagesLabel", k, r(s)), s.socket = null, s.userId = 777270195, s.maxEnergy = 2e3, s.currentEnergy = 0, s;
                }

                t(s, e);
                var o = s.prototype;
                return o.start = function () {
                  this.coinsLabel && this.energyProgressBar && this.energyValueLabel && this.messagesLabel && (this.autoConnect(), this.showUserInfo(!1));
                }, o.onDestroy = function () {
                  this.socket && this.socket.disconnect();
                }, o.autoConnect = function () {
                  var e = this;

                  try {
                    this.socket = io("https://dev.simatap.ru", {
                      transports: ["websocket"],
                      secure: !0,
                      rejectUnauthorized: !1
                    }), this.socket.on("connect", function () {
                      e.socket.emit("register", {
                        userId: e.userId
                      }), e.showUserInfo(!0);
                    }), this.socket.on("disconnect", function () {
                      e.showMessage("Отключено от сервера.", "danger"), e.showUserInfo(!1);
                    }), this.socket.on("energyUpdated", function (s) {
                      e.updateEnergy(s.energy_left);
                    }), this.socket.on("coinsUpdated", function (s) {
                      var t = Math.round(s.coins);
                      e.coinsLabel.string = t.toLocaleString();
                    }), this.socket.on("tapError", function (s) {
                      e.showMessage(s.message, "warning");
                    }), this.socket.on("registrationError", function (s) {
                      e.showMessage(s.message, "danger"), e.showUserInfo(!1);
                    }), this.socket.on("connect_error", function (s) {
                      e.showMessage("Ошибка подключения к серверу.", "danger");
                    });
                  } catch (e) {
                    this.showMessage("Ошибка подключения к серверу.", "danger");
                  }
                }, o.onTap = function () {
                  this.userId ? this.socket && this.socket.connected ? (this.socket.emit("tap", {
                    userId: this.userId
                  }), this.showMessage("Тап отправлен!", "info")) : this.showMessage("Соединение с сервером отсутствует.", "danger") : this.showMessage("Пользователь не подключен.", "danger");
                }, o.showMessage = function (e, s) {
                  if (void 0 === s && (s = "info"), this.messagesLabel) switch (this.messagesLabel.string = e, s) {
                    case "success":
                      this.messagesLabel.node.color = new g(0, 255, 0);
                      break;

                    case "danger":
                      this.messagesLabel.node.color = new g(255, 0, 0);
                      break;

                    case "warning":
                      this.messagesLabel.node.color = new g(255, 165, 0);
                      break;

                    default:
                      this.messagesLabel.node.color = new g(255, 255, 255);
                  }
                }, o.showUserInfo = function (e) {
                  this.coinsLabel && this.energyProgressBar && this.energyValueLabel && (this.coinsLabel.node.active = e, this.energyProgressBar.node.active = e, this.energyValueLabel.node.active = e);
                }, o.updateEnergy = function (e) {
                  e = Math.max(0, Math.min(this.maxEnergy, e)), this.currentEnergy = e;
                  var s = e / this.maxEnergy;
                  this.energyProgressBar.progress = s, this.energyValueLabel.string = e + "/" + this.maxEnergy;
                }, o.getCurrentEnergy = function () {
                  return this.currentEnergy;
                }, s;
              }(u)).prototype, "coinsLabel", [h], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), m = s(p.prototype, "energyProgressBar", [f], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), L = s(p.prototype, "energyValueLabel", [b], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), k = s(p.prototype, "messagesLabel", [d], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), y = p)) || y));

              o._RF.pop();
            }
          };
        });
        System.register("chunks:///_virtual/SpineController.ts.ts", ["./rollupPluginModLoBabelHelpers.js", "cc", "./SocketManager.ts"], function (e) {
          var n, t, o, i, a, r, s, l, c, p, f, g, u, h;
          return {
            setters: [function (e) {
              n = e.applyDecoratedDescriptor, t = e.inheritsLoose, o = e.initializerDefineProperty, i = e.assertThisInitialized;
            }, function (e) {
              a = e.cclegacy, r = e._decorator, s = e.sp, l = e.Prefab, c = e.UITransform, p = e.Node, f = e.Vec3, g = e.instantiate, u = e.Component;
            }, function (e) {
              h = e.SocketManager;
            }],
            execute: function () {
              var C, d, m, S, v, b, T, P, k;

              a._RF.push({}, "7af28zZEkNKYY1uSBPGocx/", "SpineController.ts", void 0);

              var y = r.ccclass,
                  w = r.property;
              e("SpineController", (C = y("SpineController"), d = w(s.Skeleton), m = w(h), S = w(l), C((T = n((b = function (e) {
                function n() {
                  for (var n, t = arguments.length, a = new Array(t), r = 0; r < t; r++) a[r] = arguments[r];

                  return n = e.call.apply(e, [this].concat(a)) || this, o(n, "spine", T, i(n)), o(n, "socketManager", P, i(n)), o(n, "floatingTextPrefab", k, i(n)), n;
                }

                t(n, e);
                var a = n.prototype;
                return a.onLoad = function () {
                  var e = this.getComponent(c);
                  e || (e = this.addComponent(c)), e.setContentSize(4e3, 3e3), e.setAnchorPoint(.553265, .004952), this.node.on(p.EventType.TOUCH_END, this.onSpineClicked, this), this.spine ? (this.spine.setAnimation(0, "Основная", !0), this.spine.setCompleteListener(this.onAnimationComplete.bind(this))) : console.warn("Spine компонент не установлен в SpineController.");
                }, a.onSpineClicked = function (e) {
                  console.log("Spine animation clicked"), this.spine && (this.spine.setAnimation(1, "Нажатие", !1), this.spine.addAnimation(1, "Основная", !0, 0)), this.socketManager ? (console.log("Calling socketManager.onTap()"), this.socketManager.onTap()) : console.warn("SocketManager не установлен в SpineController.");
                  var n = e.getUILocation();
                  console.log("Tap Position (UILocation):", n), this.spawnFloatingText(n);
                }, a.onAnimationComplete = function (e) {
                  e && 1 === e.trackIndex && this.spine.setAnimation(1, "Основная", !0);
                }, a.spawnFloatingText = function (e) {
                  if (this.floatingTextPrefab) {
                    var n = this.node.scene.getChildByName("Canvas");

                    if (n) {
                      var t = n.getComponent(c);

                      if (t) {
                        var o = t.contentSize;
                        console.log("Canvas Size:", o);
                        var i = e.x - o.width / 2,
                            a = e.y - o.height / 2,
                            r = new f(i, a, 100);
                        console.log("Converted Local Position:", r);
                        var s = g(this.floatingTextPrefab);
                        s.setParent(n), s.setPosition(r), console.log("FloatingText Position Set To:", s.getPosition());
                      } else console.warn("UITransform не найден на Canvas.");
                    } else console.warn("Canvas не найден.");
                  } else console.warn("floatingTextPrefab не установлен в SpineController.");
                }, n;
              }(u)).prototype, "spine", [d], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), P = n(b.prototype, "socketManager", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), k = n(b.prototype, "floatingTextPrefab", [S], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), v = b)) || v));

              a._RF.pop();
            }
          };
        });
        System.register("chunks:///_virtual/TabBarController.ts", ["./rollupPluginModLoBabelHelpers.js", "cc"], function (e) {
          var t, n, i, o, a, r, s, l, u, c, b, h, p;
          return {
            setters: [function (e) {
              t = e.applyDecoratedDescriptor, n = e.inheritsLoose, i = e.initializerDefineProperty, o = e.assertThisInitialized;
            }, function (e) {
              a = e.cclegacy, r = e._decorator, s = e.Node, l = e.Label, u = e.UIOpacity, c = e.tween, b = e.Vec3, h = e.Color, p = e.Component;
            }],
            execute: function () {
              var g, d, f, m, v, P, T, w, y, k, x, H, z, L, F, E, C, S, B, I, N, U, R, _, A, D, O, W, G, Y, M, j, K, V, Z, q, J, Q, X, $, ee, te, ne;

              a._RF.push({}, "40497KNIRZM96W3FB/cr0rR", "TabBarController", void 0);

              var ie = r.ccclass,
                  oe = r.property;
              e("TabBarController", (g = ie("TabBarController"), d = oe(s), f = oe(s), m = oe(s), v = oe(s), P = oe(s), T = oe(s), w = oe(s), y = oe(s), k = oe(s), x = oe(s), H = oe(l), z = oe(l), L = oe(l), F = oe(l), E = oe(l), C = oe(s), S = oe(s), B = oe(s), I = oe(s), N = oe(s), g((_ = t((R = function (e) {
                function t() {
                  for (var t, n = arguments.length, a = new Array(n), r = 0; r < n; r++) a[r] = arguments[r];

                  return t = e.call.apply(e, [this].concat(a)) || this, i(t, "mainPage", _, o(t)), i(t, "friendsPage", A, o(t)), i(t, "storePage", D, o(t)), i(t, "leadersPage", O, o(t)), i(t, "tasksPage", W, o(t)), i(t, "iconHome", G, o(t)), i(t, "iconFriends", Y, o(t)), i(t, "iconStore", M, o(t)), i(t, "iconLeaders", j, o(t)), i(t, "iconTasks", K, o(t)), i(t, "textHome", V, o(t)), i(t, "textFriends", Z, o(t)), i(t, "textStore", q, o(t)), i(t, "textLeaders", J, o(t)), i(t, "textTasks", Q, o(t)), i(t, "buttonHome", X, o(t)), i(t, "buttonFriends", $, o(t)), i(t, "buttonLeaders", ee, o(t)), i(t, "buttonTasks", te, o(t)), i(t, "activeButton", ne, o(t)), t.currentTab = "home", t;
                }

                n(t, e);
                var a = t.prototype;
                return a.onLoad = function () {
                  var e = this;
                  this.checkProperties(), this.showPage(this.currentTab, !1), this.iconHome.on(s.EventType.TOUCH_END, function () {
                    e.showPage("home", !0);
                  }), this.iconFriends.on(s.EventType.TOUCH_END, function () {
                    e.showPage("friends", !0);
                  }), this.iconStore.on(s.EventType.TOUCH_END, function () {
                    e.showPage("store", !0);
                  }), this.iconLeaders.on(s.EventType.TOUCH_END, function () {
                    e.showPage("leaders", !0);
                  }), this.iconTasks.on(s.EventType.TOUCH_END, function () {
                    e.showPage("tasks", !0);
                  });
                }, a.checkProperties = function () {
                  [{
                    name: "mainPage",
                    value: this.mainPage
                  }, {
                    name: "friendsPage",
                    value: this.friendsPage
                  }, {
                    name: "storePage",
                    value: this.storePage
                  }, {
                    name: "leadersPage",
                    value: this.leadersPage
                  }, {
                    name: "tasksPage",
                    value: this.tasksPage
                  }, {
                    name: "iconHome",
                    value: this.iconHome
                  }, {
                    name: "iconFriends",
                    value: this.iconFriends
                  }, {
                    name: "iconStore",
                    value: this.iconStore
                  }, {
                    name: "iconLeaders",
                    value: this.iconLeaders
                  }, {
                    name: "iconTasks",
                    value: this.iconTasks
                  }, {
                    name: "textHome",
                    value: this.textHome
                  }, {
                    name: "textFriends",
                    value: this.textFriends
                  }, {
                    name: "textStore",
                    value: this.textStore
                  }, {
                    name: "textLeaders",
                    value: this.textLeaders
                  }, {
                    name: "textTasks",
                    value: this.textTasks
                  }, {
                    name: "buttonHome",
                    value: this.buttonHome
                  }, {
                    name: "buttonFriends",
                    value: this.buttonFriends
                  }, {
                    name: "buttonLeaders",
                    value: this.buttonLeaders
                  }, {
                    name: "buttonTasks",
                    value: this.buttonTasks
                  }, {
                    name: "activeButton",
                    value: this.activeButton
                  }].forEach(function (e) {
                    e.value || console.warn('Property "' + e.name + '" is not assigned in the inspector.');
                  });
                }, a.showPage = function (e, t) {
                  void 0 === t && (t = !0), e !== this.currentTab && (this.hidePage(this.currentTab, t), this.showNewPage(e, t), this.updateTabUI(e), this.currentTab = e);
                }, a.hidePage = function (e, t) {
                  var n = this.getPageNode(e);

                  if (n) {
                    var i = n.getComponent(u);
                    i || (console.warn('UIOpacity component not found on "' + e + '" page. Adding one.'), i = n.addComponent(u)), t ? (c(n).to(.3, {
                      scale: new b(.95, .95, 1)
                    }).start(), c(i).to(.3, {
                      opacity: 0
                    }).call(function () {
                      n.active = !1, n.setScale(1, 1, 1), i.opacity = 255, console.log('Page "' + e + '" скрыта.');
                    }).start()) : (n.active = !1, i.opacity = 255, console.log('Page "' + e + '" скрыта без анимации.'));
                  } else console.error('Page node for "' + e + '" not found.');
                }, a.showNewPage = function (e, t) {
                  var n = this.getPageNode(e);

                  if (n) {
                    n.active = !0;
                    var i = n.getComponent(u);
                    i || (console.warn('UIOpacity component not found on "' + e + '" page. Adding one.'), i = n.addComponent(u)), t ? (i.opacity = 0, n.setScale(.95, .95, 1), c(i).to(.3, {
                      opacity: 255
                    }).start(), c(n).to(.3, {
                      scale: new b(1.05, 1.05, 1)
                    }).to(.3, {
                      scale: new b(1, 1, 1)
                    }).call(function () {
                      console.log('Page "' + e + '" показана.');
                    }).start()) : (i.opacity = 255, n.setScale(1, 1, 1), console.log('Page "' + e + '" показана без анимации.'));
                  } else console.error('Page node for "' + e + '" not found.');
                }, a.getPageNode = function (e) {
                  switch (e) {
                    case "home":
                      return this.mainPage;

                    case "friends":
                      return this.friendsPage;

                    case "store":
                      return this.storePage;

                    case "leaders":
                      return this.leadersPage;

                    case "tasks":
                      return this.tasksPage;

                    default:
                      return console.warn("Unknown page: " + e), null;
                  }
                }, a.updateTabUI = function (e) {
                  switch (this.textHome.color = h.GRAY, this.textFriends.color = h.GRAY, this.textStore.color = h.GRAY, this.textLeaders.color = h.GRAY, this.textTasks.color = h.GRAY, this.activeButton.active = !1, this.buttonHome.active = !1, this.buttonFriends.active = !1, this.buttonLeaders.active = !1, this.buttonTasks.active = !1, e) {
                    case "home":
                      this.textHome.color = h.WHITE, this.buttonHome.active = !0;
                      break;

                    case "friends":
                      this.textFriends.color = h.WHITE, this.buttonFriends.active = !0;
                      break;

                    case "store":
                      this.textStore.color = h.WHITE, this.activeButton.active = !0;
                      break;

                    case "leaders":
                      this.textLeaders.color = h.WHITE, this.buttonLeaders.active = !0;
                      break;

                    case "tasks":
                      this.textTasks.color = h.WHITE, this.buttonTasks.active = !0;
                  }
                }, t;
              }(p)).prototype, "mainPage", [d], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), A = t(R.prototype, "friendsPage", [f], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), D = t(R.prototype, "storePage", [m], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), O = t(R.prototype, "leadersPage", [v], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), W = t(R.prototype, "tasksPage", [P], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), G = t(R.prototype, "iconHome", [T], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), Y = t(R.prototype, "iconFriends", [w], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), M = t(R.prototype, "iconStore", [y], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), j = t(R.prototype, "iconLeaders", [k], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), K = t(R.prototype, "iconTasks", [x], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), V = t(R.prototype, "textHome", [H], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), Z = t(R.prototype, "textFriends", [z], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), q = t(R.prototype, "textStore", [L], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), J = t(R.prototype, "textLeaders", [F], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), Q = t(R.prototype, "textTasks", [E], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), X = t(R.prototype, "buttonHome", [C], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), $ = t(R.prototype, "buttonFriends", [S], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), ee = t(R.prototype, "buttonLeaders", [B], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), te = t(R.prototype, "buttonTasks", [I], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), ne = t(R.prototype, "activeButton", [N], {
                configurable: !0,
                enumerable: !0,
                writable: !0,
                initializer: function () {
                  return null;
                }
              }), U = R)) || U));

              a._RF.pop();
            }
          };
        });

        (function (r) {
          r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main');
        })(function (mid, cid) {
          System.register(mid, [cid], function (_export, _context) {
            return {
              setters: [function (_m) {
                var _exportObj = {};

                for (var _key in _m) {
                  if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
                }

                _export(_exportObj);
              }],
              execute: function () {}
            };
          });
        }); // #endregion ORIGINAL CODE


        _export2("default", _cjsExports = module.exports);
      }, {});
    }
  };
});
//# sourceMappingURL=0496796a27dc2c96242e5cbddf4a3dcc231f88ff.js.map