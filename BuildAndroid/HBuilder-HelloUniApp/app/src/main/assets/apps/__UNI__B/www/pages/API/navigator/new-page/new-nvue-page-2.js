!(function (t) {
	var e = {};
	function n(r) {
		if (e[r]) return e[r].exports;
		var o = (e[r] = { i: r, l: !1, exports: {} });
		return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
	}
	(n.m = t),
		(n.c = e),
		(n.d = function (t, e, r) {
			n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
		}),
		(n.r = function (t) {
			"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
				Object.defineProperty(t, "__esModule", { value: !0 });
		}),
		(n.t = function (t, e) {
			if ((1 & e && (t = n(t)), 8 & e)) return t;
			if (4 & e && "object" == typeof t && t && t.__esModule) return t;
			var r = Object.create(null);
			if ((n.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t))
				for (var o in t)
					n.d(
						r,
						o,
						function (e) {
							return t[e];
						}.bind(null, o),
					);
			return r;
		}),
		(n.n = function (t) {
			var e =
				t && t.__esModule
					? function () {
							return t.default;
					  }
					: function () {
							return t;
					  };
			return n.d(e, "a", e), e;
		}),
		(n.o = function (t, e) {
			return Object.prototype.hasOwnProperty.call(t, e);
		}),
		(n.p = ""),
		n((n.s = 652));
})({
	0: function (t, e, n) {
		"use strict";
		function r(t, e, n, r, o, i, a, s, c, u) {
			var f,
				p = "function" == typeof t ? t.options : t;
			if (c) {
				p.components || (p.components = {});
				var l = Object.prototype.hasOwnProperty;
				for (var d in c) l.call(c, d) && !l.call(p.components, d) && (p.components[d] = c[d]);
			}
			if (
				(u &&
					((u.beforeCreate || (u.beforeCreate = [])).unshift(function () {
						this[u.__module] = this;
					}),
					(p.mixins || (p.mixins = [])).push(u)),
				e && ((p.render = e), (p.staticRenderFns = n), (p._compiled = !0)),
				r && (p.functional = !0),
				i && (p._scopeId = "data-v-" + i),
				a
					? ((f = function (t) {
							(t = t || (this.$vnode && this.$vnode.ssrContext) || (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext)) ||
								"undefined" == typeof __VUE_SSR_CONTEXT__ ||
								(t = __VUE_SSR_CONTEXT__),
								o && o.call(this, t),
								t && t._registeredComponents && t._registeredComponents.add(a);
					  }),
					  (p._ssrRegister = f))
					: o &&
					  (f = s
							? function () {
									o.call(this, this.$root.$options.shadowRoot);
							  }
							: o),
				f)
			)
				if (p.functional) {
					p._injectStyles = f;
					var h = p.render;
					p.render = function (t, e) {
						return f.call(e), h(t, e);
					};
				} else {
					var m = p.beforeCreate;
					p.beforeCreate = m ? [].concat(m, f) : [f];
				}
			return { exports: t, options: p };
		}
		n.d(e, "a", function () {
			return r;
		});
	},
	1: function (t, e) {
		t.exports = { "@VERSION": 2 };
	},
	157: function (t, e, n) {
		"use strict";
		var r = n(158),
			o = n.n(r);
		e.default = o.a;
	},
	158: function (t, e, n) {
		"use strict";
		Object.defineProperty(e, "__esModule", { value: !0 }), (e.default = void 0);
		var r = n(45);
		function o(t, e) {
			var n = Object.keys(t);
			if (Object.getOwnPropertySymbols) {
				var r = Object.getOwnPropertySymbols(t);
				e &&
					(r = r.filter(function (e) {
						return Object.getOwnPropertyDescriptor(t, e).enumerable;
					})),
					n.push.apply(n, r);
			}
			return n;
		}
		function i(t) {
			for (var e = 1; e < arguments.length; e++) {
				var n = null != arguments[e] ? arguments[e] : {};
				e % 2
					? o(Object(n), !0).forEach(function (e) {
							a(t, e, n[e]);
					  })
					: Object.getOwnPropertyDescriptors
					? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
					: o(Object(n)).forEach(function (e) {
							Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
					  });
			}
			return t;
		}
		function a(t, e, n) {
			return e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (t[e] = n), t;
		}
		var s = {
			data: function () {
				return {};
			},
			computed: i(i({}, (0, r.mapState)(["colorIndex", "colorList"])), (0, r.mapGetters)(["currentColor"])),
			methods: i({}, (0, r.mapMutations)(["setColorIndex"])),
		};
		e.default = s;
	},
	159: function (t, e) {
		t.exports = {
			".new-page__text": { "": { fontSize: ["14", 0, 0, 0], color: ["#666666", 0, 0, 0] } },
			".root": { "": { flexDirection: ["column", 0, 0, 1] } },
			".page-body": {
				"": {
					flex: [1, 0, 0, 2],
					flexDirection: ["column", 0, 0, 2],
					justifyContent: ["flex-start", 0, 0, 2],
					alignItems: ["center", 0, 0, 2],
					paddingTop: ["50", 0, 0, 2],
				},
			},
			".new-page__text-box": {
				"": { paddingTop: ["20", 0, 0, 3], paddingRight: ["20", 0, 0, 3], paddingBottom: ["20", 0, 0, 3], paddingLeft: ["20", 0, 0, 3] },
			},
			".new-page__color": { "": { width: ["200", 0, 0, 4], height: ["100", 0, 0, 4], justifyContent: ["center", 0, 0, 4], alignItems: ["center", 0, 0, 4] } },
			".new-page__color-text": { "": { fontSize: ["14", 0, 0, 5], color: ["#FFFFFF", 0, 0, 5], lineHeight: ["30", 0, 0, 5], textAlign: ["center", 0, 0, 5] } },
			".new-page__button-item": { "": { marginTop: ["15", 0, 0, 6], width: ["300", 0, 0, 6] } },
			"@VERSION": 2,
		};
	},
	45: function (t, e, n) {
		"use strict";
		Object.defineProperty(e, "__esModule", { value: !0 }),
			(e.install = y),
			(e.mapState = e.mapMutations = e.mapGetters = e.mapActions = e.createNamespacedHelpers = e.Store = e.default = void 0);
		var r = ("undefined" != typeof window ? window : "undefined" != typeof global ? global : {}).__VUE_DEVTOOLS_GLOBAL_HOOK__;
		function o(t, e) {
			Object.keys(t).forEach(function (n) {
				return e(t[n], n);
			});
		}
		function i(t) {
			return null !== t && "object" == typeof t;
		}
		var a = function (t, e) {
				(this.runtime = e), (this._children = Object.create(null)), (this._rawModule = t);
				var n = t.state;
				this.state = ("function" == typeof n ? n() : n) || {};
			},
			s = { namespaced: { configurable: !0 } };
		(s.namespaced.get = function () {
			return !!this._rawModule.namespaced;
		}),
			(a.prototype.addChild = function (t, e) {
				this._children[t] = e;
			}),
			(a.prototype.removeChild = function (t) {
				delete this._children[t];
			}),
			(a.prototype.getChild = function (t) {
				return this._children[t];
			}),
			(a.prototype.hasChild = function (t) {
				return t in this._children;
			}),
			(a.prototype.update = function (t) {
				(this._rawModule.namespaced = t.namespaced),
					t.actions && (this._rawModule.actions = t.actions),
					t.mutations && (this._rawModule.mutations = t.mutations),
					t.getters && (this._rawModule.getters = t.getters);
			}),
			(a.prototype.forEachChild = function (t) {
				o(this._children, t);
			}),
			(a.prototype.forEachGetter = function (t) {
				this._rawModule.getters && o(this._rawModule.getters, t);
			}),
			(a.prototype.forEachAction = function (t) {
				this._rawModule.actions && o(this._rawModule.actions, t);
			}),
			(a.prototype.forEachMutation = function (t) {
				this._rawModule.mutations && o(this._rawModule.mutations, t);
			}),
			Object.defineProperties(a.prototype, s);
		var c = function (t) {
			this.register([], t, !1);
		};
		(c.prototype.get = function (t) {
			return t.reduce(function (t, e) {
				return t.getChild(e);
			}, this.root);
		}),
			(c.prototype.getNamespace = function (t) {
				var e = this.root;
				return t.reduce(function (t, n) {
					return t + ((e = e.getChild(n)).namespaced ? n + "/" : "");
				}, "");
			}),
			(c.prototype.update = function (t) {
				!(function t(e, n, r) {
					0;
					if ((n.update(r), r.modules))
						for (var o in r.modules) {
							if (!n.getChild(o)) return void 0;
							t(e.concat(o), n.getChild(o), r.modules[o]);
						}
				})([], this.root, t);
			}),
			(c.prototype.register = function (t, e, n) {
				var r = this;
				void 0 === n && (n = !0);
				var i = new a(e, n);
				0 === t.length ? (this.root = i) : this.get(t.slice(0, -1)).addChild(t[t.length - 1], i);
				e.modules &&
					o(e.modules, function (e, o) {
						r.register(t.concat(o), e, n);
					});
			}),
			(c.prototype.unregister = function (t) {
				var e = this.get(t.slice(0, -1)),
					n = t[t.length - 1];
				e.getChild(n).runtime && e.removeChild(n);
			}),
			(c.prototype.isRegistered = function (t) {
				var e = this.get(t.slice(0, -1)),
					n = t[t.length - 1];
				return e.hasChild(n);
			});
		var u;
		var f = function (t) {
			var e = this;
			void 0 === t && (t = {}), !u && "undefined" != typeof window && window.Vue && y(window.Vue);
			var n = t.plugins;
			void 0 === n && (n = []);
			var o = t.strict;
			void 0 === o && (o = !1),
				(this._committing = !1),
				(this._actions = Object.create(null)),
				(this._actionSubscribers = []),
				(this._mutations = Object.create(null)),
				(this._wrappedGetters = Object.create(null)),
				(this._modules = new c(t)),
				(this._modulesNamespaceMap = Object.create(null)),
				(this._subscribers = []),
				(this._watcherVM = new u()),
				(this._makeLocalGettersCache = Object.create(null));
			var i = this,
				a = this.dispatch,
				s = this.commit;
			(this.dispatch = function (t, e) {
				return a.call(i, t, e);
			}),
				(this.commit = function (t, e, n) {
					return s.call(i, t, e, n);
				}),
				(this.strict = o);
			var f = this._modules.root.state;
			m(this, f, [], this._modules.root),
				h(this, f),
				n.forEach(function (t) {
					return t(e);
				}),
				(void 0 !== t.devtools ? t.devtools : u.config.devtools) &&
					(function (t) {
						r &&
							((t._devtoolHook = r),
							r.emit("vuex:init", t),
							r.on("vuex:travel-to-state", function (e) {
								t.replaceState(e);
							}),
							t.subscribe(
								function (t, e) {
									r.emit("vuex:mutation", t, e);
								},
								{ prepend: !0 },
							),
							t.subscribeAction(
								function (t, e) {
									r.emit("vuex:action", t, e);
								},
								{ prepend: !0 },
							));
					})(this);
		};
		e.Store = f;
		var p = { state: { configurable: !0 } };
		function l(t, e, n) {
			return (
				e.indexOf(t) < 0 && (n && n.prepend ? e.unshift(t) : e.push(t)),
				function () {
					var n = e.indexOf(t);
					n > -1 && e.splice(n, 1);
				}
			);
		}
		function d(t, e) {
			(t._actions = Object.create(null)),
				(t._mutations = Object.create(null)),
				(t._wrappedGetters = Object.create(null)),
				(t._modulesNamespaceMap = Object.create(null));
			var n = t.state;
			m(t, n, [], t._modules.root, !0), h(t, n, e);
		}
		function h(t, e, n) {
			var r = t._vm;
			(t.getters = {}), (t._makeLocalGettersCache = Object.create(null));
			var i = t._wrappedGetters,
				a = {};
			o(i, function (e, n) {
				(a[n] = (function (t, e) {
					return function () {
						return t(e);
					};
				})(e, t)),
					Object.defineProperty(t.getters, n, {
						get: function () {
							return t._vm[n];
						},
						enumerable: !0,
					});
			});
			var s = u.config.silent;
			(u.config.silent = !0),
				(t._vm = new u({ data: { $$state: e }, computed: a })),
				(u.config.silent = s),
				t.strict &&
					(function (t) {
						t._vm.$watch(
							function () {
								return this._data.$$state;
							},
							function () {
								0;
							},
							{ deep: !0, sync: !0 },
						);
					})(t),
				r &&
					(n &&
						t._withCommit(function () {
							r._data.$$state = null;
						}),
					u.nextTick(function () {
						return r.$destroy();
					}));
		}
		function m(t, e, n, r, o) {
			var i = !n.length,
				a = t._modules.getNamespace(n);
			if ((r.namespaced && (t._modulesNamespaceMap[a], (t._modulesNamespaceMap[a] = r)), !i && !o)) {
				var s = _(e, n.slice(0, -1)),
					c = n[n.length - 1];
				t._withCommit(function () {
					u.set(s, c, r.state);
				});
			}
			var f = (r.context = (function (t, e, n) {
				var r = "" === e,
					o = {
						dispatch: r
							? t.dispatch
							: function (n, r, o) {
									var i = v(n, r, o),
										a = i.payload,
										s = i.options,
										c = i.type;
									return (s && s.root) || (c = e + c), t.dispatch(c, a);
							  },
						commit: r
							? t.commit
							: function (n, r, o) {
									var i = v(n, r, o),
										a = i.payload,
										s = i.options,
										c = i.type;
									(s && s.root) || (c = e + c), t.commit(c, a, s);
							  },
					};
				return (
					Object.defineProperties(o, {
						getters: {
							get: r
								? function () {
										return t.getters;
								  }
								: function () {
										return (function (t, e) {
											if (!t._makeLocalGettersCache[e]) {
												var n = {},
													r = e.length;
												Object.keys(t.getters).forEach(function (o) {
													if (o.slice(0, r) === e) {
														var i = o.slice(r);
														Object.defineProperty(n, i, {
															get: function () {
																return t.getters[o];
															},
															enumerable: !0,
														});
													}
												}),
													(t._makeLocalGettersCache[e] = n);
											}
											return t._makeLocalGettersCache[e];
										})(t, e);
								  },
						},
						state: {
							get: function () {
								return _(t.state, n);
							},
						},
					}),
					o
				);
			})(t, a, n));
			r.forEachMutation(function (e, n) {
				!(function (t, e, n, r) {
					(t._mutations[e] || (t._mutations[e] = [])).push(function (e) {
						n.call(t, r.state, e);
					});
				})(t, a + n, e, f);
			}),
				r.forEachAction(function (e, n) {
					var r = e.root ? n : a + n,
						o = e.handler || e;
					!(function (t, e, n, r) {
						(t._actions[e] || (t._actions[e] = [])).push(function (e) {
							var o,
								i = n.call(t, { dispatch: r.dispatch, commit: r.commit, getters: r.getters, state: r.state, rootGetters: t.getters, rootState: t.state }, e);
							return (
								((o = i) && "function" == typeof o.then) || (i = Promise.resolve(i)),
								t._devtoolHook
									? i.catch(function (e) {
											throw (t._devtoolHook.emit("vuex:error", e), e);
									  })
									: i
							);
						});
					})(t, r, o, f);
				}),
				r.forEachGetter(function (e, n) {
					!(function (t, e, n, r) {
						if (t._wrappedGetters[e]) return void 0;
						t._wrappedGetters[e] = function (t) {
							return n(r.state, r.getters, t.state, t.getters);
						};
					})(t, a + n, e, f);
				}),
				r.forEachChild(function (r, i) {
					m(t, e, n.concat(i), r, o);
				});
		}
		function _(t, e) {
			return e.reduce(function (t, e) {
				return t[e];
			}, t);
		}
		function v(t, e, n) {
			return i(t) && t.type && ((n = e), (e = t), (t = t.type)), { type: t, payload: e, options: n };
		}
		function y(t) {
			(u && t === u) ||
				(function (t) {
					if (Number(t.version.split(".")[0]) >= 2) t.mixin({ beforeCreate: n });
					else {
						var e = t.prototype._init;
						t.prototype._init = function (t) {
							void 0 === t && (t = {}), (t.init = t.init ? [n].concat(t.init) : n), e.call(this, t);
						};
					}
					function n() {
						var t = this.$options;
						t.store ? (this.$store = "function" == typeof t.store ? t.store() : t.store) : t.parent && t.parent.$store && (this.$store = t.parent.$store);
					}
				})((u = t));
		}
		(p.state.get = function () {
			return this._vm._data.$$state;
		}),
			(p.state.set = function (t) {
				0;
			}),
			(f.prototype.commit = function (t, e, n) {
				var r = this,
					o = v(t, e, n),
					i = o.type,
					a = o.payload,
					s = (o.options, { type: i, payload: a }),
					c = this._mutations[i];
				c &&
					(this._withCommit(function () {
						c.forEach(function (t) {
							t(a);
						});
					}),
					this._subscribers.slice().forEach(function (t) {
						return t(s, r.state);
					}));
			}),
			(f.prototype.dispatch = function (t, e) {
				var n = this,
					r = v(t, e),
					o = r.type,
					i = r.payload,
					a = { type: o, payload: i },
					s = this._actions[o];
				if (s) {
					try {
						this._actionSubscribers
							.slice()
							.filter(function (t) {
								return t.before;
							})
							.forEach(function (t) {
								return t.before(a, n.state);
							});
					} catch (t) {
						0;
					}
					var c =
						s.length > 1
							? Promise.all(
									s.map(function (t) {
										return t(i);
									}),
							  )
							: s[0](i);
					return new Promise(function (t, e) {
						c.then(
							function (e) {
								try {
									n._actionSubscribers
										.filter(function (t) {
											return t.after;
										})
										.forEach(function (t) {
											return t.after(a, n.state);
										});
								} catch (t) {
									0;
								}
								t(e);
							},
							function (t) {
								try {
									n._actionSubscribers
										.filter(function (t) {
											return t.error;
										})
										.forEach(function (e) {
											return e.error(a, n.state, t);
										});
								} catch (t) {
									0;
								}
								e(t);
							},
						);
					});
				}
			}),
			(f.prototype.subscribe = function (t, e) {
				return l(t, this._subscribers, e);
			}),
			(f.prototype.subscribeAction = function (t, e) {
				return l("function" == typeof t ? { before: t } : t, this._actionSubscribers, e);
			}),
			(f.prototype.watch = function (t, e, n) {
				var r = this;
				return this._watcherVM.$watch(
					function () {
						return t(r.state, r.getters);
					},
					e,
					n,
				);
			}),
			(f.prototype.replaceState = function (t) {
				var e = this;
				this._withCommit(function () {
					e._vm._data.$$state = t;
				});
			}),
			(f.prototype.registerModule = function (t, e, n) {
				void 0 === n && (n = {}),
					"string" == typeof t && (t = [t]),
					this._modules.register(t, e),
					m(this, this.state, t, this._modules.get(t), n.preserveState),
					h(this, this.state);
			}),
			(f.prototype.unregisterModule = function (t) {
				var e = this;
				"string" == typeof t && (t = [t]),
					this._modules.unregister(t),
					this._withCommit(function () {
						var n = _(e.state, t.slice(0, -1));
						u.delete(n, t[t.length - 1]);
					}),
					d(this);
			}),
			(f.prototype.hasModule = function (t) {
				return "string" == typeof t && (t = [t]), this._modules.isRegistered(t);
			}),
			(f.prototype.hotUpdate = function (t) {
				this._modules.update(t), d(this, !0);
			}),
			(f.prototype._withCommit = function (t) {
				var e = this._committing;
				(this._committing = !0), t(), (this._committing = e);
			}),
			Object.defineProperties(f.prototype, p);
		var g = j(function (t, e) {
			var n = {};
			return (
				C(e).forEach(function (e) {
					var r = e.key,
						o = e.val;
					(n[r] = function () {
						var e = this.$store.state,
							n = this.$store.getters;
						if (t) {
							var r = S(this.$store, "mapState", t);
							if (!r) return;
							(e = r.context.state), (n = r.context.getters);
						}
						return "function" == typeof o ? o.call(this, e, n) : e[o];
					}),
						(n[r].vuex = !0);
				}),
				n
			);
		});
		e.mapState = g;
		var b = j(function (t, e) {
			var n = {};
			return (
				C(e).forEach(function (e) {
					var r = e.key,
						o = e.val;
					n[r] = function () {
						for (var e = [], n = arguments.length; n--; ) e[n] = arguments[n];
						var r = this.$store.commit;
						if (t) {
							var i = S(this.$store, "mapMutations", t);
							if (!i) return;
							r = i.context.commit;
						}
						return "function" == typeof o ? o.apply(this, [r].concat(e)) : r.apply(this.$store, [o].concat(e));
					};
				}),
				n
			);
		});
		e.mapMutations = b;
		var w = j(function (t, e) {
			var n = {};
			return (
				C(e).forEach(function (e) {
					var r = e.key,
						o = e.val;
					(o = t + o),
						(n[r] = function () {
							if (!t || S(this.$store, "mapGetters", t)) return this.$store.getters[o];
						}),
						(n[r].vuex = !0);
				}),
				n
			);
		});
		e.mapGetters = w;
		var O = j(function (t, e) {
			var n = {};
			return (
				C(e).forEach(function (e) {
					var r = e.key,
						o = e.val;
					n[r] = function () {
						for (var e = [], n = arguments.length; n--; ) e[n] = arguments[n];
						var r = this.$store.dispatch;
						if (t) {
							var i = S(this.$store, "mapActions", t);
							if (!i) return;
							r = i.context.dispatch;
						}
						return "function" == typeof o ? o.apply(this, [r].concat(e)) : r.apply(this.$store, [o].concat(e));
					};
				}),
				n
			);
		});
		e.mapActions = O;
		var x = function (t) {
			return { mapState: g.bind(null, t), mapGetters: w.bind(null, t), mapMutations: b.bind(null, t), mapActions: O.bind(null, t) };
		};
		function C(t) {
			return (function (t) {
				return Array.isArray(t) || i(t);
			})(t)
				? Array.isArray(t)
					? t.map(function (t) {
							return { key: t, val: t };
					  })
					: Object.keys(t).map(function (e) {
							return { key: e, val: t[e] };
					  })
				: [];
		}
		function j(t) {
			return function (e, n) {
				return "string" != typeof e ? ((n = e), (e = "")) : "/" !== e.charAt(e.length - 1) && (e += "/"), t(e, n);
			};
		}
		function S(t, e, n) {
			return t._modulesNamespaceMap[n];
		}
		e.createNamespacedHelpers = x;
		var $ = { Store: f, install: y, version: "3.4.0", mapState: g, mapMutations: b, mapGetters: w, mapActions: O, createNamespacedHelpers: x };
		e.default = $;
	},
	455: function (t, e, n) {
		"use strict";
		n.d(e, "b", function () {
			return r;
		}),
			n.d(e, "c", function () {
				return o;
			}),
			n.d(e, "a", function () {});
		var r = function () {
				var t = this,
					e = t.$createElement,
					n = t._self._c || e;
				return n("scroll-view", { staticStyle: { flexDirection: "column" }, attrs: { scrollY: !0, showScrollbar: !0, enableBackToTop: !0, bubble: "true" } }, [
					n("view", { staticClass: ["root"] }, [
						n("view", { staticClass: ["page-body"] }, [
							n(
								"view",
								{
									staticClass: ["new-page__color"],
									style: { backgroundColor: t.currentColor },
									on: {
										click: function (e) {
											t.setColorIndex(t.colorIndex > 1 ? 0 : t.colorIndex + 1);
										},
									},
								},
								[
									n("u-text", { staticClass: ["new-page__color-text"], appendAsTree: !0, attrs: { append: "tree" } }, [
										t._v("\u70b9\u51fb\u6539\u53d8\u989c\u8272"),
									]),
								],
							),
							n("view", { staticClass: ["new-page__text-box"] }, [
								n("u-text", { staticClass: ["new-page__text"], appendAsTree: !0, attrs: { append: "tree" } }, [
									t._v("\u70b9\u51fb\u4e0a\u65b9\u8272\u5757\u4f7f\u7528vuex\u5728\u9875\u9762\u4e4b\u95f4\u8fdb\u884c\u901a\u8baf"),
								]),
							]),
						]),
					]),
				]);
			},
			o = [];
	},
	551: function (t, e, n) {
		"use strict";
		n.r(e);
		var r = n(159),
			o = n.n(r);
		for (var i in r)
			"default" !== i &&
				(function (t) {
					n.d(e, t, function () {
						return r[t];
					});
				})(i);
		e.default = o.a;
	},
	6: function (t, e, n) {
		(Vue.prototype.__$appStyle__ = {}), Vue.prototype.__merge_style && Vue.prototype.__merge_style(n(7).default, Vue.prototype.__$appStyle__);
	},
	652: function (t, e, n) {
		"use strict";
		n.r(e);
		n(6);
		var r = n(75);
		"undefined" == typeof Promise ||
			Promise.prototype.finally ||
			(Promise.prototype.finally = function (t) {
				var e = this.constructor;
				return this.then(
					function (n) {
						return e.resolve(t()).then(function () {
							return n;
						});
					},
					function (n) {
						return e.resolve(t()).then(function () {
							throw n;
						});
					},
				);
			}),
			(r.default.mpType = "page"),
			(r.default.route = "pages/API/navigator/new-page/new-nvue-page-2"),
			(r.default.el = "#root"),
			new Vue(r.default);
	},
	7: function (t, e, n) {
		"use strict";
		n.r(e);
		var r = n(1),
			o = n.n(r);
		for (var i in r)
			"default" !== i &&
				(function (t) {
					n.d(e, t, function () {
						return r[t];
					});
				})(i);
		e.default = o.a;
	},
	75: function (t, e, n) {
		"use strict";
		var r = n(455),
			o = n(157),
			i = n(0);
		var a = Object(i.a)(o.default, r.b, r.c, !1, null, null, "3286c5cc", !1, r.a, void 0);
		(function (t) {
			this.options.style || (this.options.style = {}),
				Vue.prototype.__merge_style && Vue.prototype.__$appStyle__ && Vue.prototype.__merge_style(Vue.prototype.__$appStyle__, this.options.style),
				Vue.prototype.__merge_style ? Vue.prototype.__merge_style(n(551).default, this.options.style) : Object.assign(this.options.style, n(551).default);
		}).call(a),
			(e.default = a.exports);
	},
});
