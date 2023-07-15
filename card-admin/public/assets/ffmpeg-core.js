var createFFmpegCore = (function() {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined')
      _scriptDir = _scriptDir || __filename;
  return (function(createFFmpegCore) {
      createFFmpegCore = createFFmpegCore || {};

      var f;
      f || (f = typeof createFFmpegCore !== 'undefined' ? createFFmpegCore : {});
      var aa, ba;
      f.ready = new Promise(function(a, b) {
          aa = a;
          ba = b
      }
      );
      f.quit = function(a) {
          if (f.onExit)
              f.onExit(a);
          throw new ca(a);
      }
      ;
      f.exit = da;
      ea = h = function() {}
      ;
      var fa = {}, ia;
      for (ia in f)
          f.hasOwnProperty(ia) && (fa[ia] = f[ia]);
      var ja = []
        , ka = "./this.program";
      function la(a, b) {
          throw b;
      }
      var ma = !1
        , oa = !1
        , l = !1
        , pa = !1;
      ma = "object" === typeof window;
      oa = "function" === typeof importScripts;
      l = "object" === typeof process && "object" === typeof process.versions && "string" === typeof process.versions.node;
      pa = !ma && !l && !oa;
      var n = f.ENVIRONMENT_IS_PTHREAD || !1;
      n && (qa = f.buffer);
      var ra = "";
      function sa(a) {
          return f.locateFile ? f.locateFile(a, ra) : ra + a
      }
      var ta, va, wa, xa;
      if (l) {
          ra = oa ? require("path").dirname(ra) + "/" : __dirname + "/";
          ta = function(a, b) {
              wa || (wa = require("fs"));
              xa || (xa = require("path"));
              a = xa.normalize(a);
              return wa.readFileSync(a, b ? null : "utf8")
          }
          ;
          va = function(a) {
              a = ta(a, !0);
              a.buffer || (a = new Uint8Array(a));
              assert(a.buffer);
              return a
          }
          ;
          1 < process.argv.length && (ka = process.argv[1].replace(/\\/g, "/"));
          ja = process.argv.slice(2);
          process.on("uncaughtException", function(a) {
              if (!(a instanceof ca))
                  throw a;
          });
          process.on("unhandledRejection", u);
          la = function(a) {
              process.exit(a)
          }
          ;
          f.inspect = function() {
              return "[Emscripten Module object]"
          }
          ;
          var ya;
          try {
              ya = require("worker_threads")
          } catch (a) {
              throw console.error('The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?'),
              a;
          }
          global.Worker = ya.Worker
      } else if (pa)
          "undefined" != typeof read && (ta = function(a) {
              return read(a)
          }
          ),
          va = function(a) {
              if ("function" === typeof readbuffer)
                  return new Uint8Array(readbuffer(a));
              a = read(a, "binary");
              assert("object" === typeof a);
              return a
          }
          ,
          "undefined" != typeof scriptArgs ? ja = scriptArgs : "undefined" != typeof arguments && (ja = arguments),
          "function" === typeof quit && (la = function(a) {
              quit(a)
          }
          ),
          "undefined" !== typeof print && ("undefined" === typeof console && (console = {}),
          console.log = print,
          console.warn = console.error = "undefined" !== typeof printErr ? printErr : print);
      else if (ma || oa)
          oa ? ra = self.location.href : "undefined" !== typeof document && document.currentScript && (ra = document.currentScript.src),
          _scriptDir && (ra = _scriptDir),
          0 !== ra.indexOf("blob:") ? ra = ra.substr(0, ra.lastIndexOf("/") + 1) : ra = "",
          l ? (ta = function(a, b) {
              wa || (wa = require("fs"));
              xa || (xa = require("path"));
              a = xa.normalize(a);
              return wa.readFileSync(a, b ? null : "utf8")
          }
          ,
          va = function(a) {
              a = ta(a, !0);
              a.buffer || (a = new Uint8Array(a));
              assert(a.buffer);
              return a
          }
          ) : (ta = function(a) {
              var b = new XMLHttpRequest;
              b.open("GET", a, !1);
              b.send(null);
              return b.responseText
          }
          ,
          oa && (va = function(a) {
              var b = new XMLHttpRequest;
              b.open("GET", a, !1);
              b.responseType = "arraybuffer";
              b.send(null);
              return new Uint8Array(b.response)
          }
          ));
      l && "undefined" === typeof performance && (global.performance = require("perf_hooks").performance);
      var ea = f.print || console.log.bind(console)
        , h = f.printErr || console.warn.bind(console);
      for (ia in fa)
          fa.hasOwnProperty(ia) && (f[ia] = fa[ia]);
      fa = null;
      f.arguments && (ja = f.arguments);
      f.thisProgram && (ka = f.thisProgram);
      f.quit && (la = f.quit);
      var za, Aa = 0, Ba;
      f.wasmBinary && (Ba = f.wasmBinary);
      var noExitRuntime;
      f.noExitRuntime && (noExitRuntime = f.noExitRuntime);
      "object" !== typeof WebAssembly && u("no native wasm support detected");
      var Ca, Da, threadInfoStruct = 0, selfThreadId = 0, Ea = !1;
      function assert(a, b) {
          a || u("Assertion failed: " + b)
      }
      function Fa(a) {
          var b = f["_" + a];
          assert(b, "Cannot call unknown function " + a + ", make sure it is exported");
          return b
      }
      function Ga(a, b, c, d) {
          var e = {
              string: function(q) {
                  var t = 0;
                  if (null !== q && void 0 !== q && 0 !== q) {
                      var w = (q.length << 2) + 1;
                      t = Ha(w);
                      Ia(q, t, w)
                  }
                  return t
              },
              array: function(q) {
                  var t = Ha(q.length);
                  v.set(q, t);
                  return t
              }
          }
            , g = Fa(a)
            , k = [];
          a = 0;
          if (d)
              for (var m = 0; m < d.length; m++) {
                  var r = e[c[m]];
                  r ? (0 === a && (a = y()),
                  k[m] = r(d[m])) : k[m] = d[m]
              }
          c = g.apply(null, k);
          c = "string" === b ? A(c) : "boolean" === b ? !!c : c;
          0 !== a && C(a);
          return c
      }
      function Ja(a, b, c) {
          c = b + c;
          for (var d = ""; !(b >= c); ) {
              var e = a[b++];
              if (!e)
                  break;
              if (e & 128) {
                  var g = a[b++] & 63;
                  if (192 == (e & 224))
                      d += String.fromCharCode((e & 31) << 6 | g);
                  else {
                      var k = a[b++] & 63;
                      e = 224 == (e & 240) ? (e & 15) << 12 | g << 6 | k : (e & 7) << 18 | g << 12 | k << 6 | a[b++] & 63;
                      65536 > e ? d += String.fromCharCode(e) : (e -= 65536,
                      d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023))
                  }
              } else
                  d += String.fromCharCode(e)
          }
          return d
      }
      function A(a, b) {
          return a ? Ja(Ka, a, b) : ""
      }
      function La(a, b, c, d) {
          if (!(0 < d))
              return 0;
          var e = c;
          d = c + d - 1;
          for (var g = 0; g < a.length; ++g) {
              var k = a.charCodeAt(g);
              if (55296 <= k && 57343 >= k) {
                  var m = a.charCodeAt(++g);
                  k = 65536 + ((k & 1023) << 10) | m & 1023
              }
              if (127 >= k) {
                  if (c >= d)
                      break;
                  b[c++] = k
              } else {
                  if (2047 >= k) {
                      if (c + 1 >= d)
                          break;
                      b[c++] = 192 | k >> 6
                  } else {
                      if (65535 >= k) {
                          if (c + 2 >= d)
                              break;
                          b[c++] = 224 | k >> 12
                      } else {
                          if (c + 3 >= d)
                              break;
                          b[c++] = 240 | k >> 18;
                          b[c++] = 128 | k >> 12 & 63
                      }
                      b[c++] = 128 | k >> 6 & 63
                  }
                  b[c++] = 128 | k & 63
              }
          }
          b[c] = 0;
          return c - e
      }
      function Ia(a, b, c) {
          return La(a, Ka, b, c)
      }
      function Ma(a) {
          for (var b = 0, c = 0; c < a.length; ++c) {
              var d = a.charCodeAt(c);
              55296 <= d && 57343 >= d && (d = 65536 + ((d & 1023) << 10) | a.charCodeAt(++c) & 1023);
              127 >= d ? ++b : b = 2047 >= d ? b + 2 : 65535 >= d ? b + 3 : b + 4
          }
          return b
      }
      function Na(a) {
          var b = Ma(a) + 1
            , c = Oa(b);
          c && La(a, v, c, b);
          return c
      }
      function Pa(a) {
          var b = Ma(a) + 1
            , c = Ha(b);
          La(a, v, c, b);
          return c
      }
      function Ra(a, b, c) {
          for (var d = 0; d < a.length; ++d)
              v[b++ >> 0] = a.charCodeAt(d);
          c || (v[b >> 0] = 0)
      }
      var qa, v, Ka, Sa, Ta, D, E, F, Ua, Va = f.INITIAL_MEMORY || 1073741824;
      if (n)
          Ca = f.wasmMemory,
          qa = f.buffer;
      else if (f.wasmMemory)
          Ca = f.wasmMemory;
      else if (Ca = new WebAssembly.Memory({
          initial: Va / 65536,
          maximum: Va / 65536,
          shared: !0
      }),
      !(Ca.buffer instanceof SharedArrayBuffer))
          throw h("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),
          l && console.log("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and also use a recent version)"),
          Error("bad memory");
      Ca && (qa = Ca.buffer);
      Va = qa.byteLength;
      var Wa = qa;
      qa = Wa;
      f.HEAP8 = v = new Int8Array(Wa);
      f.HEAP16 = Sa = new Int16Array(Wa);
      f.HEAP32 = D = new Int32Array(Wa);
      f.HEAPU8 = Ka = new Uint8Array(Wa);
      f.HEAPU16 = Ta = new Uint16Array(Wa);
      f.HEAPU32 = E = new Uint32Array(Wa);
      f.HEAPF32 = F = new Float32Array(Wa);
      f.HEAPF64 = Ua = new Float64Array(Wa);
      var G, Xa = [], Ya = [], Za = [], $a = [], ab = [];
      function bb() {
          var a = f.preRun.shift();
          Xa.unshift(a)
      }
      var cb = 0
        , db = null
        , eb = null;
      function gb() {
          assert(!n, "addRunDependency cannot be used in a pthread worker");
          cb++;
          f.monitorRunDependencies && f.monitorRunDependencies(cb)
      }
      function hb() {
          cb--;
          f.monitorRunDependencies && f.monitorRunDependencies(cb);
          if (0 == cb && (null !== db && (clearInterval(db),
          db = null),
          eb)) {
              var a = eb;
              eb = null;
              a()
          }
      }
      f.preloadedImages = {};
      f.preloadedAudios = {};
      function u(a) {
          if (f.onAbort)
              f.onAbort(a);
          n && console.error("Pthread aborting at " + Error().stack);
          h(a);
          Ea = !0;
          a = new WebAssembly.RuntimeError("abort(" + a + "). Build with -s ASSERTIONS=1 for more info.");
          ba(a);
          throw a;
      }
      function ib(a) {
          var b = jb;
          return String.prototype.startsWith ? b.startsWith(a) : 0 === b.indexOf(a)
      }
      function kb() {
          return ib("data:application/octet-stream;base64,")
      }
      var jb = "ffmpeg-core.wasm";
      kb() || (jb = sa(jb));
      function lb() {
          try {
              if (Ba)
                  return new Uint8Array(Ba);
              if (va)
                  return va(jb);
              throw "both async and sync fetching of the wasm failed";
          } catch (a) {
              u(a)
          }
      }
      function mb() {
          return Ba || !ma && !oa || "function" !== typeof fetch || ib("file://") ? Promise.resolve().then(lb) : fetch(jb, {
              credentials: "same-origin"
          }).then(function(a) {
              if (!a.ok)
                  throw "failed to load wasm binary file at '" + jb + "'";
              return a.arrayBuffer()
          }).catch(function() {
              return lb()
          })
      }
      var H, J, ob = {
          5449136: function() {
              throw "Canceled!";
          },
          5449356: function(a, b) {
              setTimeout(function() {
                  nb(a, b)
              }, 0)
          },
          5449458: function() {
              return 5242880
          }
      };
      function pb(a) {
          for (; 0 < a.length; ) {
              var b = a.shift();
              if ("function" == typeof b)
                  b(f);
              else {
                  var c = b.vh;
                  "number" === typeof c ? void 0 === b.Tf ? G.get(c)() : G.get(c)(b.Tf) : c(void 0 === b.Tf ? null : b.Tf)
              }
          }
      }
      function qb(a) {
          return a.replace(/\b_Z[\w\d_]+/g, function(b) {
              return b === b ? b : b + " [" + b + "]"
          })
      }
      f.dynCall = function(a, b, c) {
          var d;
          -1 != a.indexOf("j") ? d = c && c.length ? f["dynCall_" + a].apply(null, [b].concat(c)) : f["dynCall_" + a].call(null, b) : d = G.get(b).apply(null, c);
          return d
      }
      ;
      var rb = 0
        , sb = 0
        , tb = 0;
      function ub(a, b, c) {
          rb = a | 0;
          tb = b | 0;
          sb = c | 0
      }
      f.registerPthreadPtr = ub;
      function vb(a, b) {
          if (0 >= a || a > v.length || a & 1 || 0 > b)
              return -28;
          if (0 == b)
              return 0;
          2147483647 <= b && (b = Infinity);
          var c = Atomics.load(D, L.Vf >> 2)
            , d = 0;
          if (c == a && Atomics.compareExchange(D, L.Vf >> 2, c, 0) == c && (--b,
          d = 1,
          0 >= b))
              return 1;
          a = Atomics.notify(D, a >> 2, b);
          if (0 <= a)
              return a + d;
          throw "Atomics.notify returned an unexpected value " + a;
      }
      f._emscripten_futex_wake = vb;
      function wb(a) {
          if (n)
              throw "Internal Error! cancelThread() can only ever be called from main application thread!";
          if (!a)
              throw "Internal Error! Null pthread_ptr in cancelThread!";
          L.Ef[a].worker.postMessage({
              cmd: "cancel"
          })
      }
      function xb(a) {
          if (n)
              throw "Internal Error! cleanupThread() can only ever be called from main application thread!";
          if (!a)
              throw "Internal Error! Null pthread_ptr in cleanupThread!";
          D[a + 12 >> 2] = 0;
          (a = L.Ef[a]) && L.Ag(a.worker)
      }
      var L = {
          Ph: 1,
          nj: {
              Ih: 0,
              Jh: 0
          },
          Gf: [],
          Kf: [],
          lj: function() {},
          pi: function() {
              L.xf = Oa(232);
              for (var a = 0; 58 > a; ++a)
                  E[L.xf / 4 + a] = 0;
              D[L.xf + 12 >> 2] = L.xf;
              a = L.xf + 156;
              D[a >> 2] = a;
              var b = Oa(512);
              for (a = 0; 128 > a; ++a)
                  E[b / 4 + a] = 0;
              Atomics.store(E, L.xf + 104 >> 2, b);
              Atomics.store(E, L.xf + 40 >> 2, L.xf);
              Atomics.store(E, L.xf + 44 >> 2, 42);
              L.Ch();
              ub(L.xf, !oa, 1);
              yb(L.xf)
          },
          ri: function() {
              L.Ch();
              aa(f);
              L.receiveObjectTransfer = L.Ii;
              L.setThreadStatus = L.Li;
              L.threadCancel = L.Pi;
              L.threadExit = L.Qi
          },
          Ch: function() {
              L.Vf = zb
          },
          Ef: {},
          Dg: [],
          Li: function() {},
          eh: function() {
              for (; 0 < L.Dg.length; )
                  L.Dg.pop()();
              n && threadInfoStruct && Ab()
          },
          Qi: function(a) {
              var b = rb | 0;
              b && (Atomics.store(E, b + 4 >> 2, a),
              Atomics.store(E, b + 0 >> 2, 1),
              Atomics.store(E, b + 60 >> 2, 1),
              Atomics.store(E, b + 64 >> 2, 0),
              L.eh(),
              vb(b + 0, 2147483647),
              ub(0, 0, 0),
              threadInfoStruct = 0,
              n && postMessage({
                  cmd: "exit"
              }))
          },
          Pi: function() {
              L.eh();
              Atomics.store(E, threadInfoStruct + 4 >> 2, -1);
              Atomics.store(E, threadInfoStruct + 0 >> 2, 1);
              vb(threadInfoStruct + 0, 2147483647);
              threadInfoStruct = selfThreadId = 0;
              ub(0, 0, 0);
              postMessage({
                  cmd: "cancelDone"
              })
          },
          Oi: function() {
              for (var a in L.Ef) {
                  var b = L.Ef[a];
                  b && b.worker && L.Ag(b.worker)
              }
              L.Ef = {};
              for (a = 0; a < L.Gf.length; ++a) {
                  var c = L.Gf[a];
                  c.terminate()
              }
              L.Gf = [];
              for (a = 0; a < L.Kf.length; ++a)
                  c = L.Kf[a],
                  b = c.yf,
                  L.Pg(b),
                  c.terminate();
              L.Kf = []
          },
          Pg: function(a) {
              if (a) {
                  if (a.threadInfoStruct) {
                      var b = D[a.threadInfoStruct + 104 >> 2];
                      D[a.threadInfoStruct + 104 >> 2] = 0;
                      Bb(b);
                      Bb(a.threadInfoStruct)
                  }
                  a.threadInfoStruct = 0;
                  a.Kg && a.Rf && Bb(a.Rf);
                  a.Rf = 0;
                  a.worker && (a.worker.yf = null)
              }
          },
          Ag: function(a) {
              delete L.Ef[a.yf.Lh];
              L.Gf.push(a);
              L.Kf.splice(L.Kf.indexOf(a), 1);
              L.Pg(a.yf);
              a.yf = void 0
          },
          Ii: function() {},
          vi: function(a, b) {
              a.onmessage = function(c) {
                  var d = c.data
                    , e = d.cmd;
                  a.yf && (L.Mg = a.yf.threadInfoStruct);
                  if (d.targetThread && d.targetThread != (rb | 0)) {
                      var g = L.Ef[d.xj];
                      g ? g.worker.postMessage(c.data, d.transferList) : console.error('Internal error! Worker sent a message "' + e + '" to target pthread ' + d.targetThread + ", but that thread no longer exists!")
                  } else if ("processQueuedMainThreadWork" === e)
                      Cb();
                  else if ("spawnThread" === e)
                      Db(c.data);
                  else if ("cleanupThread" === e)
                      xb(d.thread);
                  else if ("killThread" === e) {
                      c = d.thread;
                      if (n)
                          throw "Internal Error! killThread() can only ever be called from main application thread!";
                      if (!c)
                          throw "Internal Error! Null pthread_ptr in killThread!";
                      D[c + 12 >> 2] = 0;
                      c = L.Ef[c];
                      c.worker.terminate();
                      L.Pg(c);
                      L.Kf.splice(L.Kf.indexOf(c.worker), 1);
                      c.worker.yf = void 0
                  } else if ("cancelThread" === e)
                      wb(d.thread);
                  else if ("loaded" === e)
                      a.loaded = !0,
                      b && b(a),
                      a.og && (a.og(),
                      delete a.og);
                  else if ("print" === e)
                      ea("Thread " + d.threadId + ": " + d.text);
                  else if ("printErr" === e)
                      h("Thread " + d.threadId + ": " + d.text);
                  else if ("alert" === e)
                      alert("Thread " + d.threadId + ": " + d.text);
                  else if ("exit" === e)
                      a.yf && Atomics.load(E, a.yf.Lh + 68 >> 2) && L.Ag(a);
                  else if ("exitProcess" === e) {
                      noExitRuntime = !1;
                      try {
                          da(d.returnCode)
                      } catch (k) {
                          if (k instanceof ca)
                              return;
                          throw k;
                      }
                  } else
                      "cancelDone" === e ? L.Ag(a) : "objectTransfer" !== e && ("setimmediate" === c.data.target ? a.postMessage(c.data) : h("worker sent an unknown command " + e));
                  L.Mg = void 0
              }
              ;
              a.onerror = function(c) {
                  h("pthread sent an error! " + c.filename + ":" + c.lineno + ": " + c.message)
              }
              ;
              l && (a.on("message", function(c) {
                  a.onmessage({
                      data: c
                  })
              }),
              a.on("error", function(c) {
                  a.onerror(c)
              }),
              a.on("exit", function() {}));
              a.postMessage({
                  cmd: "load",
                  urlOrBlob: f.mainScriptUrlOrBlob || _scriptDir,
                  wasmMemory: Ca,
                  wasmModule: Da
              })
          },
          Vh: function() {
              var a = sa("ffmpeg-core.worker.js");
              L.Gf.push(new Worker(a))
          },
          li: function() {
              0 == L.Gf.length && (L.Vh(),
              L.vi(L.Gf[0]));
              return 0 < L.Gf.length ? L.Gf.pop() : null
          },
          Zi: function(a) {
              for (a = performance.now() + a; performance.now() < a; )
                  ;
          }
      };
      f.establishStackSpace = function(a) {
          C(a)
      }
      ;
      f.getNoExitRuntime = function() {
          return noExitRuntime
      }
      ;
      var Eb;
      l ? Eb = function() {
          var a = process.hrtime();
          return 1E3 * a[0] + a[1] / 1E6
      }
      : n ? Eb = function() {
          return performance.now() - f.__performance_now_clock_drift
      }
      : "undefined" !== typeof dateNow ? Eb = dateNow : Eb = function() {
          return performance.now()
      }
      ;
      function Fb(a) {
          return D[Gb() >> 2] = a
      }
      function Hb(a, b) {
          if (0 === a)
              a = Date.now();
          else if (1 === a || 4 === a)
              a = Eb();
          else
              return Fb(28),
              -1;
          D[b >> 2] = a / 1E3 | 0;
          D[b + 4 >> 2] = a % 1E3 * 1E6 | 0;
          return 0
      }
      function Ib(a, b) {
          if (n)
              return M(1, 1, a, b);
          $a.unshift({
              vh: a,
              Tf: b
          })
      }
      function Jb(a, b) {
          a = new Date(1E3 * D[a >> 2]);
          D[b >> 2] = a.getUTCSeconds();
          D[b + 4 >> 2] = a.getUTCMinutes();
          D[b + 8 >> 2] = a.getUTCHours();
          D[b + 12 >> 2] = a.getUTCDate();
          D[b + 16 >> 2] = a.getUTCMonth();
          D[b + 20 >> 2] = a.getUTCFullYear() - 1900;
          D[b + 24 >> 2] = a.getUTCDay();
          D[b + 36 >> 2] = 0;
          D[b + 32 >> 2] = 0;
          D[b + 28 >> 2] = (a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864E5 | 0;
          Jb.ih || (Jb.ih = Na("GMT"));
          D[b + 40 >> 2] = Jb.ih;
          return b
      }
      function Kb() {
          function a(k) {
              return (k = k.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? k[1] : "GMT"
          }
          if (n)
              return M(2, 1);
          if (!Kb.Yh) {
              Kb.Yh = !0;
              var b = (new Date).getFullYear()
                , c = new Date(b,0,1)
                , d = new Date(b,6,1);
              b = c.getTimezoneOffset();
              var e = d.getTimezoneOffset()
                , g = Math.max(b, e);
              D[Lb() >> 2] = 60 * g;
              D[Mb() >> 2] = Number(b != e);
              c = a(c);
              d = a(d);
              c = Na(c);
              d = Na(d);
              e < b ? (D[Nb() >> 2] = c,
              D[Nb() + 4 >> 2] = d) : (D[Nb() >> 2] = d,
              D[Nb() + 4 >> 2] = c)
          }
      }
      function Ob(a, b) {
          Kb();
          a = new Date(1E3 * D[a >> 2]);
          D[b >> 2] = a.getSeconds();
          D[b + 4 >> 2] = a.getMinutes();
          D[b + 8 >> 2] = a.getHours();
          D[b + 12 >> 2] = a.getDate();
          D[b + 16 >> 2] = a.getMonth();
          D[b + 20 >> 2] = a.getFullYear() - 1900;
          D[b + 24 >> 2] = a.getDay();
          var c = new Date(a.getFullYear(),0,1);
          D[b + 28 >> 2] = (a.getTime() - c.getTime()) / 864E5 | 0;
          D[b + 36 >> 2] = -(60 * a.getTimezoneOffset());
          var d = (new Date(a.getFullYear(),6,1)).getTimezoneOffset();
          c = c.getTimezoneOffset();
          a = (d != c && a.getTimezoneOffset() == Math.min(c, d)) | 0;
          D[b + 32 >> 2] = a;
          a = D[Nb() + (a ? 4 : 0) >> 2];
          D[b + 40 >> 2] = a;
          return b
      }
      function Pb(a, b) {
          for (var c = 0, d = a.length - 1; 0 <= d; d--) {
              var e = a[d];
              "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1),
              c++) : c && (a.splice(d, 1),
              c--)
          }
          if (b)
              for (; c; c--)
                  a.unshift("..");
          return a
      }
      function Qb(a) {
          var b = "/" === a.charAt(0)
            , c = "/" === a.substr(-1);
          (a = Pb(a.split("/").filter(function(d) {
              return !!d
          }), !b).join("/")) || b || (a = ".");
          a && c && (a += "/");
          return (b ? "/" : "") + a
      }
      function Rb(a) {
          var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
          a = b[0];
          b = b[1];
          if (!a && !b)
              return ".";
          b && (b = b.substr(0, b.length - 1));
          return a + b
      }
      function Sb(a) {
          if ("/" === a)
              return "/";
          a = Qb(a);
          a = a.replace(/\/$/, "");
          var b = a.lastIndexOf("/");
          return -1 === b ? a : a.substr(b + 1)
      }
      function Tb(a, b) {
          return Qb(a + "/" + b)
      }
      function Ub() {
          if ("object" === typeof crypto && "function" === typeof crypto.getRandomValues) {
              var a = new Uint8Array(1);
              return function() {
                  crypto.getRandomValues(a);
                  return a[0]
              }
          }
          if (l)
              try {
                  var b = require("crypto");
                  return function() {
                      return b.randomBytes(1)[0]
                  }
              } catch (c) {}
          return function() {
              u("randomDevice")
          }
      }
      function Vb() {
          for (var a = "", b = !1, c = arguments.length - 1; -1 <= c && !b; c--) {
              b = 0 <= c ? arguments[c] : N.cwd();
              if ("string" !== typeof b)
                  throw new TypeError("Arguments to path.resolve must be strings");
              if (!b)
                  return "";
              a = b + "/" + a;
              b = "/" === b.charAt(0)
          }
          a = Pb(a.split("/").filter(function(d) {
              return !!d
          }), !b).join("/");
          return (b ? "/" : "") + a || "."
      }
      function Wb(a, b) {
          function c(k) {
              for (var m = 0; m < k.length && "" === k[m]; m++)
                  ;
              for (var r = k.length - 1; 0 <= r && "" === k[r]; r--)
                  ;
              return m > r ? [] : k.slice(m, r - m + 1)
          }
          a = Vb(a).substr(1);
          b = Vb(b).substr(1);
          a = c(a.split("/"));
          b = c(b.split("/"));
          for (var d = Math.min(a.length, b.length), e = d, g = 0; g < d; g++)
              if (a[g] !== b[g]) {
                  e = g;
                  break
              }
          d = [];
          for (g = e; g < a.length; g++)
              d.push("..");
          d = d.concat(b.slice(e));
          return d.join("/")
      }
      var Xb = [];
      function Yb(a, b) {
          Xb[a] = {
              input: [],
              output: [],
              Yf: b
          };
          N.dh(a, Zb)
      }
      var Zb = {
          open: function(a) {
              var b = Xb[a.node.rdev];
              if (!b)
                  throw new N.af(43);
              a.tty = b;
              a.seekable = !1
          },
          close: function(a) {
              a.tty.Yf.flush(a.tty)
          },
          flush: function(a) {
              a.tty.Yf.flush(a.tty)
          },
          read: function(a, b, c, d) {
              if (!a.tty || !a.tty.Yf.xh)
                  throw new N.af(60);
              for (var e = 0, g = 0; g < d; g++) {
                  try {
                      var k = a.tty.Yf.xh(a.tty)
                  } catch (m) {
                      throw new N.af(29);
                  }
                  if (void 0 === k && 0 === e)
                      throw new N.af(6);
                  if (null === k || void 0 === k)
                      break;
                  e++;
                  b[c + g] = k
              }
              e && (a.node.timestamp = Date.now());
              return e
          },
          write: function(a, b, c, d) {
              if (!a.tty || !a.tty.Yf.Zg)
                  throw new N.af(60);
              try {
                  for (var e = 0; e < d; e++)
                      a.tty.Yf.Zg(a.tty, b[c + e])
              } catch (g) {
                  throw new N.af(29);
              }
              d && (a.node.timestamp = Date.now());
              return e
          }
      }
        , ac = {
          xh: function(a) {
              if (!a.input.length) {
                  var b = null;
                  if (l) {
                      var c = Buffer.Sf ? Buffer.Sf(256) : new Buffer(256)
                        , d = 0;
                      try {
                          d = wa.readSync(process.stdin.fd, c, 0, 256, null)
                      } catch (e) {
                          if (-1 != e.toString().indexOf("EOF"))
                              d = 0;
                          else
                              throw e;
                      }
                      0 < d ? b = c.slice(0, d).toString("utf-8") : b = null
                  } else
                      "undefined" != typeof window && "function" == typeof window.prompt ? (b = window.prompt("Input: "),
                      null !== b && (b += "\n")) : "function" == typeof readline && (b = readline(),
                      null !== b && (b += "\n"));
                  if (!b)
                      return null;
                  a.input = $b(b, !0)
              }
              return a.input.shift()
          },
          Zg: function(a, b) {
              null === b || 10 === b ? (ea(Ja(a.output, 0)),
              a.output = []) : 0 != b && a.output.push(b)
          },
          flush: function(a) {
              a.output && 0 < a.output.length && (ea(Ja(a.output, 0)),
              a.output = [])
          }
      }
        , ec = {
          Zg: function(a, b) {
              null === b || 10 === b ? (h(Ja(a.output, 0)),
              a.output = []) : 0 != b && a.output.push(b)
          },
          flush: function(a) {
              a.output && 0 < a.output.length && (h(Ja(a.output, 0)),
              a.output = [])
          }
      }
        , O = {
          Df: null,
          jf: function() {
              return O.createNode(null, "/", 16895, 0)
          },
          createNode: function(a, b, c, d) {
              if (N.si(c) || N.isFIFO(c))
                  throw new N.af(63);
              O.Df || (O.Df = {
                  dir: {
                      node: {
                          Af: O.cf.Af,
                          nf: O.cf.nf,
                          lookup: O.cf.lookup,
                          Ff: O.cf.Ff,
                          rename: O.cf.rename,
                          unlink: O.cf.unlink,
                          rmdir: O.cf.rmdir,
                          readdir: O.cf.readdir,
                          symlink: O.cf.symlink
                      },
                      stream: {
                          tf: O.df.tf
                      }
                  },
                  file: {
                      node: {
                          Af: O.cf.Af,
                          nf: O.cf.nf
                      },
                      stream: {
                          tf: O.df.tf,
                          read: O.df.read,
                          write: O.df.write,
                          fg: O.df.fg,
                          Wf: O.df.Wf,
                          Xf: O.df.Xf
                      }
                  },
                  link: {
                      node: {
                          Af: O.cf.Af,
                          nf: O.cf.nf,
                          readlink: O.cf.readlink
                      },
                      stream: {}
                  },
                  lh: {
                      node: {
                          Af: O.cf.Af,
                          nf: O.cf.nf
                      },
                      stream: N.$h
                  }
              });
              c = N.createNode(a, b, c, d);
              N.kf(c.mode) ? (c.cf = O.Df.dir.node,
              c.df = O.Df.dir.stream,
              c.bf = {}) : N.isFile(c.mode) ? (c.cf = O.Df.file.node,
              c.df = O.Df.file.stream,
              c.gf = 0,
              c.bf = null) : N.Mf(c.mode) ? (c.cf = O.Df.link.node,
              c.df = O.Df.link.stream) : N.hg(c.mode) && (c.cf = O.Df.lh.node,
              c.df = O.Df.lh.stream);
              c.timestamp = Date.now();
              a && (a.bf[b] = c);
              return c
          },
          gj: function(a) {
              if (a.bf && a.bf.subarray) {
                  for (var b = [], c = 0; c < a.gf; ++c)
                      b.push(a.bf[c]);
                  return b
              }
              return a.bf
          },
          hj: function(a) {
              return a.bf ? a.bf.subarray ? a.bf.subarray(0, a.gf) : new Uint8Array(a.bf) : new Uint8Array(0)
          },
          sh: function(a, b) {
              var c = a.bf ? a.bf.length : 0;
              c >= b || (b = Math.max(b, c * (1048576 > c ? 2 : 1.125) >>> 0),
              0 != c && (b = Math.max(b, 256)),
              c = a.bf,
              a.bf = new Uint8Array(b),
              0 < a.gf && a.bf.set(c.subarray(0, a.gf), 0))
          },
          Ji: function(a, b) {
              if (a.gf != b)
                  if (0 == b)
                      a.bf = null,
                      a.gf = 0;
                  else {
                      if (!a.bf || a.bf.subarray) {
                          var c = a.bf;
                          a.bf = new Uint8Array(b);
                          c && a.bf.set(c.subarray(0, Math.min(b, a.gf)))
                      } else if (a.bf || (a.bf = []),
                      a.bf.length > b)
                          a.bf.length = b;
                      else
                          for (; a.bf.length < b; )
                              a.bf.push(0);
                      a.gf = b
                  }
          },
          cf: {
              Af: function(a) {
                  var b = {};
                  b.dev = N.hg(a.mode) ? a.id : 1;
                  b.ino = a.id;
                  b.mode = a.mode;
                  b.nlink = 1;
                  b.uid = 0;
                  b.gid = 0;
                  b.rdev = a.rdev;
                  N.kf(a.mode) ? b.size = 4096 : N.isFile(a.mode) ? b.size = a.gf : N.Mf(a.mode) ? b.size = a.link.length : b.size = 0;
                  b.atime = new Date(a.timestamp);
                  b.mtime = new Date(a.timestamp);
                  b.ctime = new Date(a.timestamp);
                  b.Xh = 4096;
                  b.blocks = Math.ceil(b.size / b.Xh);
                  return b
              },
              nf: function(a, b) {
                  void 0 !== b.mode && (a.mode = b.mode);
                  void 0 !== b.timestamp && (a.timestamp = b.timestamp);
                  void 0 !== b.size && O.Ji(a, b.size)
              },
              lookup: function() {
                  throw N.Qg[44];
              },
              Ff: function(a, b, c, d) {
                  return O.createNode(a, b, c, d)
              },
              rename: function(a, b, c) {
                  if (N.kf(a.mode)) {
                      try {
                          var d = N.Bf(b, c)
                      } catch (g) {}
                      if (d)
                          for (var e in d.bf)
                              throw new N.af(55);
                  }
                  delete a.parent.bf[a.name];
                  a.name = c;
                  b.bf[c] = a;
                  a.parent = b
              },
              unlink: function(a, b) {
                  delete a.bf[b]
              },
              rmdir: function(a, b) {
                  var c = N.Bf(a, b), d;
                  for (d in c.bf)
                      throw new N.af(55);
                  delete a.bf[b]
              },
              readdir: function(a) {
                  var b = [".", ".."], c;
                  for (c in a.bf)
                      a.bf.hasOwnProperty(c) && b.push(c);
                  return b
              },
              symlink: function(a, b, c) {
                  a = O.createNode(a, b, 41471, 0);
                  a.link = c;
                  return a
              },
              readlink: function(a) {
                  if (!N.Mf(a.mode))
                      throw new N.af(28);
                  return a.link
              }
          },
          df: {
              read: function(a, b, c, d, e) {
                  var g = a.node.bf;
                  if (e >= a.node.gf)
                      return 0;
                  a = Math.min(a.node.gf - e, d);
                  if (8 < a && g.subarray)
                      b.set(g.subarray(e, e + a), c);
                  else
                      for (d = 0; d < a; d++)
                          b[c + d] = g[e + d];
                  return a
              },
              write: function(a, b, c, d, e, g) {
                  if (!d)
                      return 0;
                  a = a.node;
                  a.timestamp = Date.now();
                  if (b.subarray && (!a.bf || a.bf.subarray)) {
                      if (g)
                          return a.bf = b.subarray(c, c + d),
                          a.gf = d;
                      if (0 === a.gf && 0 === e)
                          return a.bf = b.slice(c, c + d),
                          a.gf = d;
                      if (e + d <= a.gf)
                          return a.bf.set(b.subarray(c, c + d), e),
                          d
                  }
                  O.sh(a, e + d);
                  if (a.bf.subarray && b.subarray)
                      a.bf.set(b.subarray(c, c + d), e);
                  else
                      for (g = 0; g < d; g++)
                          a.bf[e + g] = b[c + g];
                  a.gf = Math.max(a.gf, e + d);
                  return d
              },
              tf: function(a, b, c) {
                  1 === c ? b += a.position : 2 === c && N.isFile(a.node.mode) && (b += a.node.gf);
                  if (0 > b)
                      throw new N.af(28);
                  return b
              },
              fg: function(a, b, c) {
                  O.sh(a.node, b + c);
                  a.node.gf = Math.max(a.node.gf, b + c)
              },
              Wf: function(a, b, c, d, e, g) {
                  assert(0 === b);
                  if (!N.isFile(a.node.mode))
                      throw new N.af(43);
                  a = a.node.bf;
                  if (g & 2 || a.buffer !== qa) {
                      if (0 < d || d + c < a.length)
                          a.subarray ? a = a.subarray(d, d + c) : a = Array.prototype.slice.call(a, d, d + c);
                      d = !0;
                      g = 16384 * Math.ceil(c / 16384);
                      for (b = Oa(g); c < g; )
                          v[b + c++] = 0;
                      c = b;
                      if (!c)
                          throw new N.af(48);
                      v.set(a, c)
                  } else
                      d = !1,
                      c = a.byteOffset;
                  return {
                      Hi: c,
                      Jg: d
                  }
              },
              Xf: function(a, b, c, d, e) {
                  if (!N.isFile(a.node.mode))
                      throw new N.af(43);
                  if (e & 2)
                      return 0;
                  O.df.write(a, b, 0, d, c, !1);
                  return 0
              }
          }
      }
        , N = {
          root: null,
          mg: [],
          ph: {},
          streams: [],
          Ai: 1,
          Cf: null,
          oh: "/",
          Tg: !1,
          Bh: !0,
          mf: {},
          Mh: {
              Gh: {
                  Rh: 1,
                  Sh: 2
              }
          },
          af: null,
          Qg: {},
          ii: null,
          Cg: 0,
          kj: function(a) {
              if (!(a instanceof N.af)) {
                  a: {
                      var b = Error();
                      if (!b.stack) {
                          try {
                              throw Error();
                          } catch (c) {
                              b = c
                          }
                          if (!b.stack) {
                              b = "(no stack trace available)";
                              break a
                          }
                      }
                      b = b.stack.toString()
                  }
                  f.extraStackTrace && (b += "\n" + f.extraStackTrace());
                  b = qb(b);
                  throw a + " : " + b;
              }
              return Fb(a.ef)
          },
          ff: function(a, b) {
              a = Vb(N.cwd(), a);
              b = b || {};
              if (!a)
                  return {
                      path: "",
                      node: null
                  };
              var c = {
                  Og: !0,
                  ah: 0
              }, d;
              for (d in c)
                  void 0 === b[d] && (b[d] = c[d]);
              if (8 < b.ah)
                  throw new N.af(32);
              a = Pb(a.split("/").filter(function(k) {
                  return !!k
              }), !1);
              var e = N.root;
              c = "/";
              for (d = 0; d < a.length; d++) {
                  var g = d === a.length - 1;
                  if (g && b.parent)
                      break;
                  e = N.Bf(e, a[d]);
                  c = Tb(c, a[d]);
                  N.Nf(e) && (!g || g && b.Og) && (e = e.lg.root);
                  if (!g || b.wf)
                      for (g = 0; N.Mf(e.mode); )
                          if (e = N.readlink(c),
                          c = Vb(Rb(c), e),
                          e = N.ff(c, {
                              ah: b.ah
                          }).node,
                          40 < g++)
                              throw new N.af(32);
              }
              return {
                  path: c,
                  node: e
              }
          },
          If: function(a) {
              for (var b; ; ) {
                  if (N.wg(a))
                      return a = a.jf.Eh,
                      b ? "/" !== a[a.length - 1] ? a + "/" + b : a + b : a;
                  b = b ? a.name + "/" + b : a.name;
                  a = a.parent
              }
          },
          Sg: function(a, b) {
              for (var c = 0, d = 0; d < b.length; d++)
                  c = (c << 5) - c + b.charCodeAt(d) | 0;
              return (a + c >>> 0) % N.Cf.length
          },
          zh: function(a) {
              var b = N.Sg(a.parent.id, a.name);
              a.Pf = N.Cf[b];
              N.Cf[b] = a
          },
          Ah: function(a) {
              var b = N.Sg(a.parent.id, a.name);
              if (N.Cf[b] === a)
                  N.Cf[b] = a.Pf;
              else
                  for (b = N.Cf[b]; b; ) {
                      if (b.Pf === a) {
                          b.Pf = a.Pf;
                          break
                      }
                      b = b.Pf
                  }
          },
          Bf: function(a, b) {
              var c = N.yi(a);
              if (c)
                  throw new N.af(c,a);
              for (c = N.Cf[N.Sg(a.id, b)]; c; c = c.Pf) {
                  var d = c.name;
                  if (c.parent.id === a.id && d === b)
                      return c
              }
              return N.lookup(a, b)
          },
          createNode: function(a, b, c, d) {
              a = new N.Oh(a,b,c,d);
              N.zh(a);
              return a
          },
          Ng: function(a) {
              N.Ah(a)
          },
          wg: function(a) {
              return a === a.parent
          },
          Nf: function(a) {
              return !!a.lg
          },
          isFile: function(a) {
              return 32768 === (a & 61440)
          },
          kf: function(a) {
              return 16384 === (a & 61440)
          },
          Mf: function(a) {
              return 40960 === (a & 61440)
          },
          hg: function(a) {
              return 8192 === (a & 61440)
          },
          si: function(a) {
              return 24576 === (a & 61440)
          },
          isFIFO: function(a) {
              return 4096 === (a & 61440)
          },
          isSocket: function(a) {
              return 49152 === (a & 49152)
          },
          ji: {
              r: 0,
              rs: 1052672,
              "r+": 2,
              w: 577,
              wx: 705,
              xw: 705,
              "w+": 578,
              "wx+": 706,
              "xw+": 706,
              a: 1089,
              ax: 1217,
              xa: 1217,
              "a+": 1090,
              "ax+": 1218,
              "xa+": 1218
          },
          Dh: function(a) {
              var b = N.ji[a];
              if ("undefined" === typeof b)
                  throw Error("Unknown file open mode: " + a);
              return b
          },
          th: function(a) {
              var b = ["r", "w", "rw"][a & 3];
              a & 512 && (b += "w");
              return b
          },
          Jf: function(a, b) {
              if (N.Bh)
                  return 0;
              if (-1 === b.indexOf("r") || a.mode & 292) {
                  if (-1 !== b.indexOf("w") && !(a.mode & 146) || -1 !== b.indexOf("x") && !(a.mode & 73))
                      return 2
              } else
                  return 2;
              return 0
          },
          yi: function(a) {
              var b = N.Jf(a, "x");
              return b ? b : a.cf.lookup ? 0 : 2
          },
          Yg: function(a, b) {
              try {
                  return N.Bf(a, b),
                  20
              } catch (c) {}
              return N.Jf(a, "wx")
          },
          xg: function(a, b, c) {
              try {
                  var d = N.Bf(a, b)
              } catch (e) {
                  return e.ef
              }
              if (a = N.Jf(a, "wx"))
                  return a;
              if (c) {
                  if (!N.kf(d.mode))
                      return 54;
                  if (N.wg(d) || N.If(d) === N.cwd())
                      return 10
              } else if (N.kf(d.mode))
                  return 31;
              return 0
          },
          zi: function(a, b) {
              return a ? N.Mf(a.mode) ? 32 : N.kf(a.mode) && ("r" !== N.th(b) || b & 512) ? 31 : N.Jf(a, N.th(b)) : 44
          },
          Qh: 4096,
          Bi: function(a, b) {
              b = b || N.Qh;
              for (a = a || 0; a <= b; a++)
                  if (!N.streams[a])
                      return a;
              throw new N.af(33);
          },
          zf: function(a) {
              return N.streams[a]
          },
          nh: function(a, b, c) {
              N.Hg || (N.Hg = function() {}
              ,
              N.Hg.prototype = {
                  object: {
                      get: function() {
                          return this.node
                      },
                      set: function(g) {
                          this.node = g
                      }
                  }
              });
              var d = new N.Hg, e;
              for (e in a)
                  d[e] = a[e];
              a = d;
              b = N.Bi(b, c);
              a.fd = b;
              return N.streams[b] = a
          },
          ai: function(a) {
              N.streams[a] = null
          },
          $h: {
              open: function(a) {
                  a.df = N.ki(a.node.rdev).df;
                  a.df.open && a.df.open(a)
              },
              tf: function() {
                  throw new N.af(70);
              }
          },
          Wg: function(a) {
              return a >> 8
          },
          oj: function(a) {
              return a & 255
          },
          Of: function(a, b) {
              return a << 8 | b
          },
          dh: function(a, b) {
              N.ph[a] = {
                  df: b
              }
          },
          ki: function(a) {
              return N.ph[a]
          },
          wh: function(a) {
              var b = [];
              for (a = [a]; a.length; ) {
                  var c = a.pop();
                  b.push(c);
                  a.push.apply(a, c.mg)
              }
              return b
          },
          Kh: function(a, b) {
              function c(k) {
                  N.Cg--;
                  return b(k)
              }
              function d(k) {
                  if (k) {
                      if (!d.gi)
                          return d.gi = !0,
                          c(k)
                  } else
                      ++g >= e.length && c(null)
              }
              "function" === typeof a && (b = a,
              a = !1);
              N.Cg++;
              1 < N.Cg && h("warning: " + N.Cg + " FS.syncfs operations in flight at once, probably just doing extra work");
              var e = N.wh(N.root.jf)
                , g = 0;
              e.forEach(function(k) {
                  if (!k.type.Kh)
                      return d(null);
                  k.type.Kh(k, a, d)
              })
          },
          jf: function(a, b, c) {
              var d = "/" === c
                , e = !c;
              if (d && N.root)
                  throw new N.af(10);
              if (!d && !e) {
                  var g = N.ff(c, {
                      Og: !1
                  });
                  c = g.path;
                  g = g.node;
                  if (N.Nf(g))
                      throw new N.af(10);
                  if (!N.kf(g.mode))
                      throw new N.af(54);
              }
              b = {
                  type: a,
                  tj: b,
                  Eh: c,
                  mg: []
              };
              a = a.jf(b);
              a.jf = b;
              b.root = a;
              d ? N.root = a : g && (g.lg = b,
              g.jf && g.jf.mg.push(b));
              return a
          },
          zj: function(a) {
              a = N.ff(a, {
                  Og: !1
              });
              if (!N.Nf(a.node))
                  throw new N.af(28);
              a = a.node;
              var b = a.lg
                , c = N.wh(b);
              Object.keys(N.Cf).forEach(function(d) {
                  for (d = N.Cf[d]; d; ) {
                      var e = d.Pf;
                      -1 !== c.indexOf(d.jf) && N.Ng(d);
                      d = e
                  }
              });
              a.lg = null;
              a.jf.mg.splice(a.jf.mg.indexOf(b), 1)
          },
          lookup: function(a, b) {
              return a.cf.lookup(a, b)
          },
          Ff: function(a, b, c) {
              var d = N.ff(a, {
                  parent: !0
              }).node;
              a = Sb(a);
              if (!a || "." === a || ".." === a)
                  throw new N.af(28);
              var e = N.Yg(d, a);
              if (e)
                  throw new N.af(e);
              if (!d.cf.Ff)
                  throw new N.af(63);
              return d.cf.Ff(d, a, b, c)
          },
          create: function(a, b) {
              return N.Ff(a, (void 0 !== b ? b : 438) & 4095 | 32768, 0)
          },
          mkdir: function(a, b) {
              return N.Ff(a, (void 0 !== b ? b : 511) & 1023 | 16384, 0)
          },
          qj: function(a, b) {
              a = a.split("/");
              for (var c = "", d = 0; d < a.length; ++d)
                  if (a[d]) {
                      c += "/" + a[d];
                      try {
                          N.mkdir(c, b)
                      } catch (e) {
                          if (20 != e.ef)
                              throw e;
                      }
                  }
          },
          yg: function(a, b, c) {
              "undefined" === typeof c && (c = b,
              b = 438);
              return N.Ff(a, b | 8192, c)
          },
          symlink: function(a, b) {
              if (!Vb(a))
                  throw new N.af(44);
              var c = N.ff(b, {
                  parent: !0
              }).node;
              if (!c)
                  throw new N.af(44);
              b = Sb(b);
              var d = N.Yg(c, b);
              if (d)
                  throw new N.af(d);
              if (!c.cf.symlink)
                  throw new N.af(63);
              return c.cf.symlink(c, b, a)
          },
          rename: function(a, b) {
              var c = Rb(a)
                , d = Rb(b)
                , e = Sb(a)
                , g = Sb(b);
              var k = N.ff(a, {
                  parent: !0
              });
              var m = k.node;
              k = N.ff(b, {
                  parent: !0
              });
              k = k.node;
              if (!m || !k)
                  throw new N.af(44);
              if (m.jf !== k.jf)
                  throw new N.af(75);
              var r = N.Bf(m, e);
              d = Wb(a, d);
              if ("." !== d.charAt(0))
                  throw new N.af(28);
              d = Wb(b, c);
              if ("." !== d.charAt(0))
                  throw new N.af(55);
              try {
                  var q = N.Bf(k, g)
              } catch (t) {}
              if (r !== q) {
                  c = N.kf(r.mode);
                  if (e = N.xg(m, e, c))
                      throw new N.af(e);
                  if (e = q ? N.xg(k, g, c) : N.Yg(k, g))
                      throw new N.af(e);
                  if (!m.cf.rename)
                      throw new N.af(63);
                  if (N.Nf(r) || q && N.Nf(q))
                      throw new N.af(10);
                  if (k !== m && (e = N.Jf(m, "w")))
                      throw new N.af(e);
                  try {
                      N.mf.willMovePath && N.mf.willMovePath(a, b)
                  } catch (t) {
                      h("FS.trackingDelegate['willMovePath']('" + a + "', '" + b + "') threw an exception: " + t.message)
                  }
                  N.Ah(r);
                  try {
                      m.cf.rename(r, k, g)
                  } catch (t) {
                      throw t;
                  } finally {
                      N.zh(r)
                  }
                  try {
                      if (N.mf.onMovePath)
                          N.mf.onMovePath(a, b)
                  } catch (t) {
                      h("FS.trackingDelegate['onMovePath']('" + a + "', '" + b + "') threw an exception: " + t.message)
                  }
              }
          },
          rmdir: function(a) {
              var b = N.ff(a, {
                  parent: !0
              }).node
                , c = Sb(a)
                , d = N.Bf(b, c)
                , e = N.xg(b, c, !0);
              if (e)
                  throw new N.af(e);
              if (!b.cf.rmdir)
                  throw new N.af(63);
              if (N.Nf(d))
                  throw new N.af(10);
              try {
                  N.mf.willDeletePath && N.mf.willDeletePath(a)
              } catch (g) {
                  h("FS.trackingDelegate['willDeletePath']('" + a + "') threw an exception: " + g.message)
              }
              b.cf.rmdir(b, c);
              N.Ng(d);
              try {
                  if (N.mf.onDeletePath)
                      N.mf.onDeletePath(a)
              } catch (g) {
                  h("FS.trackingDelegate['onDeletePath']('" + a + "') threw an exception: " + g.message)
              }
          },
          readdir: function(a) {
              a = N.ff(a, {
                  wf: !0
              }).node;
              if (!a.cf.readdir)
                  throw new N.af(54);
              return a.cf.readdir(a)
          },
          unlink: function(a) {
              var b = N.ff(a, {
                  parent: !0
              }).node
                , c = Sb(a)
                , d = N.Bf(b, c)
                , e = N.xg(b, c, !1);
              if (e)
                  throw new N.af(e);
              if (!b.cf.unlink)
                  throw new N.af(63);
              if (N.Nf(d))
                  throw new N.af(10);
              try {
                  N.mf.willDeletePath && N.mf.willDeletePath(a)
              } catch (g) {
                  h("FS.trackingDelegate['willDeletePath']('" + a + "') threw an exception: " + g.message)
              }
              b.cf.unlink(b, c);
              N.Ng(d);
              try {
                  if (N.mf.onDeletePath)
                      N.mf.onDeletePath(a)
              } catch (g) {
                  h("FS.trackingDelegate['onDeletePath']('" + a + "') threw an exception: " + g.message)
              }
          },
          readlink: function(a) {
              a = N.ff(a).node;
              if (!a)
                  throw new N.af(44);
              if (!a.cf.readlink)
                  throw new N.af(28);
              return Vb(N.If(a.parent), a.cf.readlink(a))
          },
          stat: function(a, b) {
              a = N.ff(a, {
                  wf: !b
              }).node;
              if (!a)
                  throw new N.af(44);
              if (!a.cf.Af)
                  throw new N.af(63);
              return a.cf.Af(a)
          },
          lstat: function(a) {
              return N.stat(a, !0)
          },
          chmod: function(a, b, c) {
              var d;
              "string" === typeof a ? d = N.ff(a, {
                  wf: !c
              }).node : d = a;
              if (!d.cf.nf)
                  throw new N.af(63);
              d.cf.nf(d, {
                  mode: b & 4095 | d.mode & -4096,
                  timestamp: Date.now()
              })
          },
          lchmod: function(a, b) {
              N.chmod(a, b, !0)
          },
          fchmod: function(a, b) {
              a = N.zf(a);
              if (!a)
                  throw new N.af(8);
              N.chmod(a.node, b)
          },
          chown: function(a, b, c, d) {
              var e;
              "string" === typeof a ? e = N.ff(a, {
                  wf: !d
              }).node : e = a;
              if (!e.cf.nf)
                  throw new N.af(63);
              e.cf.nf(e, {
                  timestamp: Date.now()
              })
          },
          lchown: function(a, b, c) {
              N.chown(a, b, c, !0)
          },
          fchown: function(a, b, c) {
              a = N.zf(a);
              if (!a)
                  throw new N.af(8);
              N.chown(a.node, b, c)
          },
          truncate: function(a, b) {
              if (0 > b)
                  throw new N.af(28);
              var c;
              "string" === typeof a ? c = N.ff(a, {
                  wf: !0
              }).node : c = a;
              if (!c.cf.nf)
                  throw new N.af(63);
              if (N.kf(c.mode))
                  throw new N.af(31);
              if (!N.isFile(c.mode))
                  throw new N.af(28);
              if (a = N.Jf(c, "w"))
                  throw new N.af(a);
              c.cf.nf(c, {
                  size: b,
                  timestamp: Date.now()
              })
          },
          fj: function(a, b) {
              a = N.zf(a);
              if (!a)
                  throw new N.af(8);
              if (0 === (a.flags & 2097155))
                  throw new N.af(28);
              N.truncate(a.node, b)
          },
          Aj: function(a, b, c) {
              a = N.ff(a, {
                  wf: !0
              }).node;
              a.cf.nf(a, {
                  timestamp: Math.max(b, c)
              })
          },
          open: function(a, b, c, d, e) {
              if ("" === a)
                  throw new N.af(44);
              b = "string" === typeof b ? N.Dh(b) : b;
              c = b & 64 ? ("undefined" === typeof c ? 438 : c) & 4095 | 32768 : 0;
              if ("object" === typeof a)
                  var g = a;
              else {
                  a = Qb(a);
                  try {
                      g = N.ff(a, {
                          wf: !(b & 131072)
                      }).node
                  } catch (m) {}
              }
              var k = !1;
              if (b & 64)
                  if (g) {
                      if (b & 128)
                          throw new N.af(20);
                  } else
                      g = N.Ff(a, c, 0),
                      k = !0;
              if (!g)
                  throw new N.af(44);
              N.hg(g.mode) && (b &= -513);
              if (b & 65536 && !N.kf(g.mode))
                  throw new N.af(54);
              if (!k && (c = N.zi(g, b)))
                  throw new N.af(c);
              b & 512 && N.truncate(g, 0);
              b &= -131713;
              d = N.nh({
                  node: g,
                  path: N.If(g),
                  flags: b,
                  seekable: !0,
                  position: 0,
                  df: g.df,
                  Wi: [],
                  error: !1
              }, d, e);
              d.df.open && d.df.open(d);
              !f.logReadFiles || b & 1 || (N.$g || (N.$g = {}),
              a in N.$g || (N.$g[a] = 1,
              h("FS.trackingDelegate error on read file: " + a)));
              try {
                  N.mf.onOpenFile && (e = 0,
                  1 !== (b & 2097155) && (e |= N.Mh.Gh.Rh),
                  0 !== (b & 2097155) && (e |= N.Mh.Gh.Sh),
                  N.mf.onOpenFile(a, e))
              } catch (m) {
                  h("FS.trackingDelegate['onOpenFile']('" + a + "', flags) threw an exception: " + m.message)
              }
              return d
          },
          close: function(a) {
              if (N.ig(a))
                  throw new N.af(8);
              a.Lf && (a.Lf = null);
              try {
                  a.df.close && a.df.close(a)
              } catch (b) {
                  throw b;
              } finally {
                  N.ai(a.fd)
              }
              a.fd = null
          },
          ig: function(a) {
              return null === a.fd
          },
          tf: function(a, b, c) {
              if (N.ig(a))
                  throw new N.af(8);
              if (!a.seekable || !a.df.tf)
                  throw new N.af(70);
              if (0 != c && 1 != c && 2 != c)
                  throw new N.af(28);
              a.position = a.df.tf(a, b, c);
              a.Wi = [];
              return a.position
          },
          read: function(a, b, c, d, e) {
              if (0 > d || 0 > e)
                  throw new N.af(28);
              if (N.ig(a))
                  throw new N.af(8);
              if (1 === (a.flags & 2097155))
                  throw new N.af(8);
              if (N.kf(a.node.mode))
                  throw new N.af(31);
              if (!a.df.read)
                  throw new N.af(28);
              var g = "undefined" !== typeof e;
              if (!g)
                  e = a.position;
              else if (!a.seekable)
                  throw new N.af(70);
              b = a.df.read(a, b, c, d, e);
              g || (a.position += b);
              return b
          },
          write: function(a, b, c, d, e, g) {
              if (0 > d || 0 > e)
                  throw new N.af(28);
              if (N.ig(a))
                  throw new N.af(8);
              if (0 === (a.flags & 2097155))
                  throw new N.af(8);
              if (N.kf(a.node.mode))
                  throw new N.af(31);
              if (!a.df.write)
                  throw new N.af(28);
              a.seekable && a.flags & 1024 && N.tf(a, 0, 2);
              var k = "undefined" !== typeof e;
              if (!k)
                  e = a.position;
              else if (!a.seekable)
                  throw new N.af(70);
              b = a.df.write(a, b, c, d, e, g);
              k || (a.position += b);
              try {
                  if (a.path && N.mf.onWriteToFile)
                      N.mf.onWriteToFile(a.path)
              } catch (m) {
                  h("FS.trackingDelegate['onWriteToFile']('" + a.path + "') threw an exception: " + m.message)
              }
              return b
          },
          fg: function(a, b, c) {
              if (N.ig(a))
                  throw new N.af(8);
              if (0 > b || 0 >= c)
                  throw new N.af(28);
              if (0 === (a.flags & 2097155))
                  throw new N.af(8);
              if (!N.isFile(a.node.mode) && !N.kf(a.node.mode))
                  throw new N.af(43);
              if (!a.df.fg)
                  throw new N.af(138);
              a.df.fg(a, b, c)
          },
          Wf: function(a, b, c, d, e, g) {
              if (0 !== (e & 2) && 0 === (g & 2) && 2 !== (a.flags & 2097155))
                  throw new N.af(2);
              if (1 === (a.flags & 2097155))
                  throw new N.af(2);
              if (!a.df.Wf)
                  throw new N.af(43);
              return a.df.Wf(a, b, c, d, e, g)
          },
          Xf: function(a, b, c, d, e) {
              return a && a.df.Xf ? a.df.Xf(a, b, c, d, e) : 0
          },
          sj: function() {
              return 0
          },
          Uf: function(a, b, c) {
              if (!a.df.Uf)
                  throw new N.af(59);
              return a.df.Uf(a, b, c)
          },
          readFile: function(a, b) {
              b = b || {};
              b.flags = b.flags || "r";
              b.encoding = b.encoding || "binary";
              if ("utf8" !== b.encoding && "binary" !== b.encoding)
                  throw Error('Invalid encoding type "' + b.encoding + '"');
              var c, d = N.open(a, b.flags);
              a = N.stat(a).size;
              var e = new Uint8Array(a);
              N.read(d, e, 0, a, 0);
              "utf8" === b.encoding ? c = Ja(e, 0) : "binary" === b.encoding && (c = e);
              N.close(d);
              return c
          },
          writeFile: function(a, b, c) {
              c = c || {};
              c.flags = c.flags || "w";
              a = N.open(a, c.flags, c.mode);
              if ("string" === typeof b) {
                  var d = new Uint8Array(Ma(b) + 1);
                  b = La(b, d, 0, d.length);
                  N.write(a, d, 0, b, void 0, c.Zh)
              } else if (ArrayBuffer.isView(b))
                  N.write(a, b, 0, b.byteLength, void 0, c.Zh);
              else
                  throw Error("Unsupported data type");
              N.close(a)
          },
          cwd: function() {
              return N.oh
          },
          chdir: function(a) {
              a = N.ff(a, {
                  wf: !0
              });
              if (null === a.node)
                  throw new N.af(44);
              if (!N.kf(a.node.mode))
                  throw new N.af(54);
              var b = N.Jf(a.node, "x");
              if (b)
                  throw new N.af(b);
              N.oh = a.path
          },
          ci: function() {
              N.mkdir("/tmp");
              N.mkdir("/home");
              N.mkdir("/home/web_user")
          },
          bi: function() {
              N.mkdir("/dev");
              N.dh(N.Of(1, 3), {
                  read: function() {
                      return 0
                  },
                  write: function(b, c, d, e) {
                      return e
                  }
              });
              N.yg("/dev/null", N.Of(1, 3));
              Yb(N.Of(5, 0), ac);
              Yb(N.Of(6, 0), ec);
              N.yg("/dev/tty", N.Of(5, 0));
              N.yg("/dev/tty1", N.Of(6, 0));
              var a = Ub();
              N.Hf("/dev", "random", a);
              N.Hf("/dev", "urandom", a);
              N.mkdir("/dev/shm");
              N.mkdir("/dev/shm/tmp")
          },
          ei: function() {
              N.mkdir("/proc");
              N.mkdir("/proc/self");
              N.mkdir("/proc/self/fd");
              N.jf({
                  jf: function() {
                      var a = N.createNode("/proc/self", "fd", 16895, 73);
                      a.cf = {
                          lookup: function(b, c) {
                              var d = N.zf(+c);
                              if (!d)
                                  throw new N.af(8);
                              b = {
                                  parent: null,
                                  jf: {
                                      Eh: "fake"
                                  },
                                  cf: {
                                      readlink: function() {
                                          return d.path
                                      }
                                  }
                              };
                              return b.parent = b
                          }
                      };
                      return a
                  }
              }, {}, "/proc/self/fd")
          },
          fi: function() {
              f.stdin ? N.Hf("/dev", "stdin", f.stdin) : N.symlink("/dev/tty", "/dev/stdin");
              f.stdout ? N.Hf("/dev", "stdout", null, f.stdout) : N.symlink("/dev/tty", "/dev/stdout");
              f.stderr ? N.Hf("/dev", "stderr", null, f.stderr) : N.symlink("/dev/tty1", "/dev/stderr");
              N.open("/dev/stdin", "r");
              N.open("/dev/stdout", "w");
              N.open("/dev/stderr", "w")
          },
          rh: function() {
              N.af || (N.af = function(a, b) {
                  this.node = b;
                  this.Ki = function(c) {
                      this.ef = c
                  }
                  ;
                  this.Ki(a);
                  this.message = "FS error"
              }
              ,
              N.af.prototype = Error(),
              N.af.prototype.constructor = N.af,
              [44].forEach(function(a) {
                  N.Qg[a] = new N.af(a);
                  N.Qg[a].stack = "<generic error, no stack>"
              }))
          },
          Ni: function() {
              N.rh();
              N.Cf = Array(4096);
              N.jf(O, {}, "/");
              N.ci();
              N.bi();
              N.ei();
              N.ii = {
                  MEMFS: O
              }
          },
          gg: function(a, b, c) {
              N.gg.Tg = !0;
              N.rh();
              f.stdin = a || f.stdin;
              f.stdout = b || f.stdout;
              f.stderr = c || f.stderr;
              N.fi()
          },
          quit: function() {
              N.gg.Tg = !1;
              var a = f._fflush;
              a && a(0);
              for (a = 0; a < N.streams.length; a++) {
                  var b = N.streams[a];
                  b && N.close(b)
              }
          },
          Rg: function(a, b) {
              var c = 0;
              a && (c |= 365);
              b && (c |= 146);
              return c
          },
          ej: function(a, b) {
              a = N.Lg(a, b);
              if (a.exists)
                  return a.object;
              Fb(a.error);
              return null
          },
          Lg: function(a, b) {
              try {
                  var c = N.ff(a, {
                      wf: !b
                  });
                  a = c.path
              } catch (e) {}
              var d = {
                  wg: !1,
                  exists: !1,
                  error: 0,
                  name: null,
                  path: null,
                  object: null,
                  Ci: !1,
                  Ei: null,
                  Di: null
              };
              try {
                  c = N.ff(a, {
                      parent: !0
                  }),
                  d.Ci = !0,
                  d.Ei = c.path,
                  d.Di = c.node,
                  d.name = Sb(a),
                  c = N.ff(a, {
                      wf: !b
                  }),
                  d.exists = !0,
                  d.path = c.path,
                  d.object = c.node,
                  d.name = c.node.name,
                  d.wg = "/" === c.path
              } catch (e) {
                  d.error = e.ef
              }
              return d
          },
          cj: function(a, b) {
              a = "string" === typeof a ? a : N.If(a);
              for (b = b.split("/").reverse(); b.length; ) {
                  var c = b.pop();
                  if (c) {
                      var d = Tb(a, c);
                      try {
                          N.mkdir(d)
                      } catch (e) {}
                      a = d
                  }
              }
              return d
          },
          di: function(a, b, c, d, e) {
              a = Tb("string" === typeof a ? a : N.If(a), b);
              return N.create(a, N.Rg(d, e))
          },
          mh: function(a, b, c, d, e, g) {
              a = b ? Tb("string" === typeof a ? a : N.If(a), b) : a;
              d = N.Rg(d, e);
              e = N.create(a, d);
              if (c) {
                  if ("string" === typeof c) {
                      a = Array(c.length);
                      b = 0;
                      for (var k = c.length; b < k; ++b)
                          a[b] = c.charCodeAt(b);
                      c = a
                  }
                  N.chmod(e, d | 146);
                  a = N.open(e, "w");
                  N.write(a, c, 0, c.length, 0, g);
                  N.close(a);
                  N.chmod(e, d)
              }
              return e
          },
          Hf: function(a, b, c, d) {
              a = Tb("string" === typeof a ? a : N.If(a), b);
              b = N.Rg(!!c, !!d);
              N.Hf.Wg || (N.Hf.Wg = 64);
              var e = N.Of(N.Hf.Wg++, 0);
              N.dh(e, {
                  open: function(g) {
                      g.seekable = !1
                  },
                  close: function() {
                      d && d.buffer && d.buffer.length && d(10)
                  },
                  read: function(g, k, m, r) {
                      for (var q = 0, t = 0; t < r; t++) {
                          try {
                              var w = c()
                          } catch (B) {
                              throw new N.af(29);
                          }
                          if (void 0 === w && 0 === q)
                              throw new N.af(6);
                          if (null === w || void 0 === w)
                              break;
                          q++;
                          k[m + t] = w
                      }
                      q && (g.node.timestamp = Date.now());
                      return q
                  },
                  write: function(g, k, m, r) {
                      for (var q = 0; q < r; q++)
                          try {
                              d(k[m + q])
                          } catch (t) {
                              throw new N.af(29);
                          }
                      r && (g.node.timestamp = Date.now());
                      return q
                  }
              });
              return N.yg(a, b, e)
          },
          uh: function(a) {
              if (a.Ug || a.ti || a.link || a.bf)
                  return !0;
              var b = !0;
              if ("undefined" !== typeof XMLHttpRequest)
                  throw Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
              if (ta)
                  try {
                      a.bf = $b(ta(a.url), !0),
                      a.gf = a.bf.length
                  } catch (c) {
                      b = !1
                  }
              else
                  throw Error("Cannot load without read() or XMLHttpRequest.");
              b || Fb(29);
              return b
          },
          bj: function(a, b, c, d, e) {
              function g() {
                  this.Vg = !1;
                  this.Sf = []
              }
              g.prototype.get = function(q) {
                  if (!(q > this.length - 1 || 0 > q)) {
                      var t = q % this.chunkSize;
                      return this.yh(q / this.chunkSize | 0)[t]
                  }
              }
              ;
              g.prototype.Wh = function(q) {
                  this.yh = q
              }
              ;
              g.prototype.kh = function() {
                  var q = new XMLHttpRequest;
                  q.open("HEAD", c, !1);
                  q.send(null);
                  if (!(200 <= q.status && 300 > q.status || 304 === q.status))
                      throw Error("Couldn't load " + c + ". Status: " + q.status);
                  var t = Number(q.getResponseHeader("Content-length")), w, B = (w = q.getResponseHeader("Accept-Ranges")) && "bytes" === w;
                  q = (w = q.getResponseHeader("Content-Encoding")) && "gzip" === w;
                  var p = 1048576;
                  B || (p = t);
                  var x = this;
                  x.Wh(function(z) {
                      var I = z * p
                        , V = (z + 1) * p - 1;
                      V = Math.min(V, t - 1);
                      if ("undefined" === typeof x.Sf[z]) {
                          var fb = x.Sf;
                          if (I > V)
                              throw Error("invalid range (" + I + ", " + V + ") or no bytes requested!");
                          if (V > t - 1)
                              throw Error("only " + t + " bytes available! programmer error!");
                          var K = new XMLHttpRequest;
                          K.open("GET", c, !1);
                          t !== p && K.setRequestHeader("Range", "bytes=" + I + "-" + V);
                          "undefined" != typeof Uint8Array && (K.responseType = "arraybuffer");
                          K.overrideMimeType && K.overrideMimeType("text/plain; charset=x-user-defined");
                          K.send(null);
                          if (!(200 <= K.status && 300 > K.status || 304 === K.status))
                              throw Error("Couldn't load " + c + ". Status: " + K.status);
                          I = void 0 !== K.response ? new Uint8Array(K.response || []) : $b(K.responseText || "", !0);
                          fb[z] = I
                      }
                      if ("undefined" === typeof x.Sf[z])
                          throw Error("doXHR failed!");
                      return x.Sf[z]
                  });
                  if (q || !t)
                      p = t = 1,
                      p = t = this.yh(0).length,
                      ea("LazyFiles on gzip forces download of the whole file when length is accessed");
                  this.Uh = t;
                  this.Th = p;
                  this.Vg = !0
              }
              ;
              if ("undefined" !== typeof XMLHttpRequest) {
                  if (!oa)
                      throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                  var k = new g;
                  Object.defineProperties(k, {
                      length: {
                          get: function() {
                              this.Vg || this.kh();
                              return this.Uh
                          }
                      },
                      chunkSize: {
                          get: function() {
                              this.Vg || this.kh();
                              return this.Th
                          }
                      }
                  });
                  k = {
                      Ug: !1,
                      bf: k
                  }
              } else
                  k = {
                      Ug: !1,
                      url: c
                  };
              var m = N.di(a, b, k, d, e);
              k.bf ? m.bf = k.bf : k.url && (m.bf = null,
              m.url = k.url);
              Object.defineProperties(m, {
                  gf: {
                      get: function() {
                          return this.bf.length
                      }
                  }
              });
              var r = {};
              Object.keys(m.df).forEach(function(q) {
                  var t = m.df[q];
                  r[q] = function() {
                      if (!N.uh(m))
                          throw new N.af(29);
                      return t.apply(null, arguments)
                  }
              });
              r.read = function(q, t, w, B, p) {
                  if (!N.uh(m))
                      throw new N.af(29);
                  q = q.node.bf;
                  if (p >= q.length)
                      return 0;
                  B = Math.min(q.length - p, B);
                  if (q.slice)
                      for (var x = 0; x < B; x++)
                          t[w + x] = q[p + x];
                  else
                      for (x = 0; x < B; x++)
                          t[w + x] = q.get(p + x);
                  return B
              }
              ;
              m.df = r;
              return m
          },
          dj: function(a, b, c, d, e, g, k, m, r, q) {
              function t(B) {
                  function p(z) {
                      q && q();
                      m || N.mh(a, b, z, d, e, r);
                      g && g();
                      hb()
                  }
                  var x = !1;
                  f.preloadPlugins.forEach(function(z) {
                      !x && z.canHandle(w) && (z.handle(B, w, p, function() {
                          k && k();
                          hb()
                      }),
                      x = !0)
                  });
                  x || p(B)
              }
              fc.gg();
              var w = b ? Vb(Tb(a, b)) : a;
              gb();
              "string" == typeof c ? fc.Xi(c, function(B) {
                  t(B)
              }, k) : t(c)
          },
          indexedDB: function() {
              return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
          },
          gh: function() {
              return "EM_FS_" + window.location.pathname
          },
          hh: 20,
          eg: "FILE_DATA",
          wj: function(a, b, c) {
              b = b || function() {}
              ;
              c = c || function() {}
              ;
              var d = N.indexedDB();
              try {
                  var e = d.open(N.gh(), N.hh)
              } catch (g) {
                  return c(g)
              }
              e.onupgradeneeded = function() {
                  ea("creating db");
                  e.result.createObjectStore(N.eg)
              }
              ;
              e.onsuccess = function() {
                  var g = e.result.transaction([N.eg], "readwrite")
                    , k = g.objectStore(N.eg)
                    , m = 0
                    , r = 0
                    , q = a.length;
                  a.forEach(function(t) {
                      t = k.put(N.Lg(t).object.bf, t);
                      t.onsuccess = function() {
                          m++;
                          m + r == q && (0 == r ? b() : c())
                      }
                      ;
                      t.onerror = function() {
                          r++;
                          m + r == q && (0 == r ? b() : c())
                      }
                  });
                  g.onerror = c
              }
              ;
              e.onerror = c
          },
          mj: function(a, b, c) {
              b = b || function() {}
              ;
              c = c || function() {}
              ;
              var d = N.indexedDB();
              try {
                  var e = d.open(N.gh(), N.hh)
              } catch (g) {
                  return c(g)
              }
              e.onupgradeneeded = c;
              e.onsuccess = function() {
                  var g = e.result;
                  try {
                      var k = g.transaction([N.eg], "readonly")
                  } catch (w) {
                      c(w);
                      return
                  }
                  var m = k.objectStore(N.eg)
                    , r = 0
                    , q = 0
                    , t = a.length;
                  a.forEach(function(w) {
                      var B = m.get(w);
                      B.onsuccess = function() {
                          N.Lg(w).exists && N.unlink(w);
                          N.mh(Rb(w), Sb(w), B.result, !0, !0, !0);
                          r++;
                          r + q == t && (0 == q ? b() : c())
                      }
                      ;
                      B.onerror = function() {
                          q++;
                          r + q == t && (0 == q ? b() : c())
                      }
                  });
                  k.onerror = c
              }
              ;
              e.onerror = c
          }
      }
        , hc = {};
      function ic(a, b, c) {
          try {
              var d = a(b)
          } catch (e) {
              if (e && e.node && Qb(b) !== Qb(N.If(e.node)))
                  return -54;
              throw e;
          }
          D[c >> 2] = d.dev;
          D[c + 4 >> 2] = 0;
          D[c + 8 >> 2] = d.ino;
          D[c + 12 >> 2] = d.mode;
          D[c + 16 >> 2] = d.nlink;
          D[c + 20 >> 2] = d.uid;
          D[c + 24 >> 2] = d.gid;
          D[c + 28 >> 2] = d.rdev;
          D[c + 32 >> 2] = 0;
          J = [d.size >>> 0, (H = d.size,
          1 <= +Math.abs(H) ? 0 < H ? (Math.min(+Math.floor(H / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0 : 0)];
          D[c + 40 >> 2] = J[0];
          D[c + 44 >> 2] = J[1];
          D[c + 48 >> 2] = 4096;
          D[c + 52 >> 2] = d.blocks;
          D[c + 56 >> 2] = d.atime.getTime() / 1E3 | 0;
          D[c + 60 >> 2] = 0;
          D[c + 64 >> 2] = d.mtime.getTime() / 1E3 | 0;
          D[c + 68 >> 2] = 0;
          D[c + 72 >> 2] = d.ctime.getTime() / 1E3 | 0;
          D[c + 76 >> 2] = 0;
          J = [d.ino >>> 0, (H = d.ino,
          1 <= +Math.abs(H) ? 0 < H ? (Math.min(+Math.floor(H / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0 : 0)];
          D[c + 80 >> 2] = J[0];
          D[c + 84 >> 2] = J[1];
          return 0
      }
      var jc = void 0;
      function P() {
          jc += 4;
          return D[jc - 4 >> 2]
      }
      function kc(a) {
          a = N.zf(a);
          if (!a)
              throw new N.af(8);
          return a
      }
      function lc(a, b, c, d, e) {
          if (n)
              return M(3, 1, a, b, c, d, e);
          try {
              e = 0;
              for (var g = b ? D[b >> 2] : 0, k = b ? D[b + 4 >> 2] : 0, m = c ? D[c >> 2] : 0, r = c ? D[c + 4 >> 2] : 0, q = d ? D[d >> 2] : 0, t = d ? D[d + 4 >> 2] : 0, w = 0, B = 0, p = 0, x = 0, z = 0, I = 0, V = (b ? D[b >> 2] : 0) | (c ? D[c >> 2] : 0) | (d ? D[d >> 2] : 0), fb = (b ? D[b + 4 >> 2] : 0) | (c ? D[c + 4 >> 2] : 0) | (d ? D[d + 4 >> 2] : 0), K = 0; K < a; K++) {
                  var X = 1 << K % 32;
                  if (32 > K ? V & X : fb & X) {
                      var ha = N.zf(K);
                      if (!ha)
                          throw new N.af(8);
                      var na = 5;
                      ha.df.Zf && (na = ha.df.Zf(ha));
                      na & 1 && (32 > K ? g & X : k & X) && (32 > K ? w |= X : B |= X,
                      e++);
                      na & 4 && (32 > K ? m & X : r & X) && (32 > K ? p |= X : x |= X,
                      e++);
                      na & 2 && (32 > K ? q & X : t & X) && (32 > K ? z |= X : I |= X,
                      e++)
                  }
              }
              b && (D[b >> 2] = w,
              D[b + 4 >> 2] = B);
              c && (D[c >> 2] = p,
              D[c + 4 >> 2] = x);
              d && (D[d >> 2] = z,
              D[d + 4 >> 2] = I);
              return e
          } catch (ua) {
              return "undefined" !== typeof N && ua instanceof N.af || u(ua),
              -ua.ef
          }
      }
      function mc(a, b) {
          if (n)
              return M(4, 1, a, b);
          try {
              a = A(a);
              if (b & -8)
                  var c = -28;
              else {
                  var d;
                  (d = N.ff(a, {
                      wf: !0
                  }).node) ? (a = "",
                  b & 4 && (a += "r"),
                  b & 2 && (a += "w"),
                  b & 1 && (a += "x"),
                  c = a && N.Jf(d, a) ? -2 : 0) : c = -44
              }
              return c
          } catch (e) {
              return "undefined" !== typeof N && e instanceof N.af || u(e),
              -e.ef
          }
      }
      function nc(a, b, c) {
          if (n)
              return M(5, 1, a, b, c);
          jc = c;
          try {
              var d = kc(a);
              switch (b) {
              case 0:
                  var e = P();
                  return 0 > e ? -28 : N.open(d.path, d.flags, 0, e).fd;
              case 1:
              case 2:
                  return 0;
              case 3:
                  return d.flags;
              case 4:
                  return e = P(),
                  d.flags |= e,
                  0;
              case 12:
                  return e = P(),
                  Sa[e + 0 >> 1] = 2,
                  0;
              case 13:
              case 14:
                  return 0;
              case 16:
              case 8:
                  return -28;
              case 9:
                  return Fb(28),
                  -1;
              default:
                  return -28
              }
          } catch (g) {
              return "undefined" !== typeof N && g instanceof N.af || u(g),
              -g.ef
          }
      }
      function oc(a, b) {
          if (n)
              return M(6, 1, a, b);
          try {
              var c = kc(a);
              return ic(N.stat, c.path, b)
          } catch (d) {
              return "undefined" !== typeof N && d instanceof N.af || u(d),
              -d.ef
          }
      }
      function pc(a, b, c) {
          if (n)
              return M(7, 1, a, b, c);
          try {
              var d = kc(a);
              d.Lf || (d.Lf = N.readdir(d.path));
              a = 0;
              for (var e = N.tf(d, 0, 1), g = Math.floor(e / 280); g < d.Lf.length && a + 280 <= c; ) {
                  var k = d.Lf[g];
                  if ("." === k[0]) {
                      var m = 1;
                      var r = 4
                  } else {
                      var q = N.Bf(d.node, k);
                      m = q.id;
                      r = N.hg(q.mode) ? 2 : N.kf(q.mode) ? 4 : N.Mf(q.mode) ? 10 : 8
                  }
                  J = [m >>> 0, (H = m,
                  1 <= +Math.abs(H) ? 0 < H ? (Math.min(+Math.floor(H / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0 : 0)];
                  D[b + a >> 2] = J[0];
                  D[b + a + 4 >> 2] = J[1];
                  J = [280 * (g + 1) >>> 0, (H = 280 * (g + 1),
                  1 <= +Math.abs(H) ? 0 < H ? (Math.min(+Math.floor(H / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0 : 0)];
                  D[b + a + 8 >> 2] = J[0];
                  D[b + a + 12 >> 2] = J[1];
                  Sa[b + a + 16 >> 1] = 280;
                  v[b + a + 18 >> 0] = r;
                  Ia(k, b + a + 19, 256);
                  a += 280;
                  g += 1
              }
              N.tf(d, 280 * g, 0);
              return a
          } catch (t) {
              return "undefined" !== typeof N && t instanceof N.af || u(t),
              -t.ef
          }
      }
      function qc(a, b) {
          if (n)
              return M(8, 1, a, b);
          try {
              return rc(b, 0, 136),
              D[b >> 2] = 1,
              D[b + 4 >> 2] = 2,
              D[b + 8 >> 2] = 3,
              D[b + 12 >> 2] = 4,
              0
          } catch (c) {
              return "undefined" !== typeof N && c instanceof N.af || u(c),
              -c.ef
          }
      }
      function sc(a, b, c) {
          if (n)
              return M(9, 1, a, b, c);
          jc = c;
          try {
              var d = kc(a);
              switch (b) {
              case 21509:
              case 21505:
                  return d.tty ? 0 : -59;
              case 21510:
              case 21511:
              case 21512:
              case 21506:
              case 21507:
              case 21508:
                  return d.tty ? 0 : -59;
              case 21519:
                  if (!d.tty)
                      return -59;
                  var e = P();
                  return D[e >> 2] = 0;
              case 21520:
                  return d.tty ? -28 : -59;
              case 21531:
                  return e = P(),
                  N.Uf(d, b, e);
              case 21523:
                  return d.tty ? 0 : -59;
              case 21524:
                  return d.tty ? 0 : -59;
              default:
                  u("bad ioctl syscall " + b)
              }
          } catch (g) {
              return "undefined" !== typeof N && g instanceof N.af || u(g),
              -g.ef
          }
      }
      function tc(a, b) {
          if (n)
              return M(10, 1, a, b);
          try {
              return a = A(a),
              ic(N.lstat, a, b)
          } catch (c) {
              return "undefined" !== typeof N && c instanceof N.af || u(c),
              -c.ef
          }
      }
      function uc(a, b) {
          if (n)
              return M(11, 1, a, b);
          try {
              return a = A(a),
              a = Qb(a),
              "/" === a[a.length - 1] && (a = a.substr(0, a.length - 1)),
              N.mkdir(a, b, 0),
              0
          } catch (c) {
              return "undefined" !== typeof N && c instanceof N.af || u(c),
              -c.ef
          }
      }
      function vc(a, b, c, d, e, g) {
          if (n)
              return M(12, 1, a, b, c, d, e, g);
          try {
              a: {
                  g <<= 12;
                  var k = !1;
                  if (0 !== (d & 16) && 0 !== a % 16384)
                      var m = -28;
                  else {
                      if (0 !== (d & 32)) {
                          var r = wc(16384, b);
                          if (!r) {
                              m = -48;
                              break a
                          }
                          rc(r, 0, b);
                          k = !0
                      } else {
                          var q = N.zf(e);
                          if (!q) {
                              m = -8;
                              break a
                          }
                          var t = N.Wf(q, a, b, g, c, d);
                          r = t.Hi;
                          k = t.Jg
                      }
                      hc[r] = {
                          xi: r,
                          ui: b,
                          Jg: k,
                          fd: e,
                          Gi: c,
                          flags: d,
                          offset: g
                      };
                      m = r
                  }
              }
              return m
          } catch (w) {
              return "undefined" !== typeof N && w instanceof N.af || u(w),
              -w.ef
          }
      }
      function xc(a, b) {
          if (n)
              return M(13, 1, a, b);
          try {
              if (-1 === (a | 0) || 0 === b)
                  var c = -28;
              else {
                  var d = hc[a];
                  if (d && b === d.ui) {
                      var e = N.zf(d.fd);
                      if (d.Gi & 2) {
                          var g = d.flags
                            , k = d.offset
                            , m = Ka.slice(a, a + b);
                          N.Xf(e, m, k, b, g)
                      }
                      hc[a] = null;
                      d.Jg && Bb(d.xi)
                  }
                  c = 0
              }
              return c
          } catch (r) {
              return "undefined" !== typeof N && r instanceof N.af || u(r),
              -r.ef
          }
      }
      function yc(a, b, c) {
          if (n)
              return M(14, 1, a, b, c);
          jc = c;
          try {
              var d = A(a)
                , e = P();
              return N.open(d, b, e).fd
          } catch (g) {
              return "undefined" !== typeof N && g instanceof N.af || u(g),
              -g.ef
          }
      }
      function zc(a, b, c) {
          if (n)
              return M(15, 1, a, b, c);
          try {
              for (var d = c = 0; d < b; d++) {
                  var e = a + 8 * d
                    , g = Sa[e + 4 >> 1]
                    , k = 32
                    , m = N.zf(D[e >> 2]);
                  m && (k = 5,
                  m.df.Zf && (k = m.df.Zf(m)));
                  (k &= g | 24) && c++;
                  Sa[e + 6 >> 1] = k
              }
              return c
          } catch (r) {
              return "undefined" !== typeof N && r instanceof N.af || u(r),
              -r.ef
          }
      }
      function Ac(a, b, c, d) {
          if (n)
              return M(16, 1, a, b, c, d);
          try {
              return d && (D[d >> 2] = -1,
              D[d + 4 >> 2] = -1,
              D[d + 8 >> 2] = -1,
              D[d + 12 >> 2] = -1),
              0
          } catch (e) {
              return "undefined" !== typeof N && e instanceof N.af || u(e),
              -e.ef
          }
      }
      function Bc(a, b, c) {
          if (n)
              return M(17, 1, a, b, c);
          try {
              var d = kc(a);
              return N.read(d, v, b, c)
          } catch (e) {
              return "undefined" !== typeof N && e instanceof N.af || u(e),
              -e.ef
          }
      }
      function Cc(a, b) {
          if (n)
              return M(18, 1, a, b);
          try {
              return a = A(a),
              b = A(b),
              N.rename(a, b),
              0
          } catch (c) {
              return "undefined" !== typeof N && c instanceof N.af || u(c),
              -c.ef
          }
      }
      function Dc(a) {
          if (n)
              return M(19, 1, a);
          try {
              return a = A(a),
              N.rmdir(a),
              0
          } catch (b) {
              return "undefined" !== typeof N && b instanceof N.af || u(b),
              -b.ef
          }
      }
      var Q = {
          jf: function() {
              f.websocket = f.websocket && "object" === typeof f.websocket ? f.websocket : {};
              f.websocket.Ig = {};
              f.websocket.on = function(a, b) {
                  "function" === typeof b && (this.Ig[a] = b);
                  return this
              }
              ;
              f.websocket.emit = function(a, b) {
                  "function" === typeof this.Ig[a] && this.Ig[a].call(this, b)
              }
              ;
              return N.createNode(null, "/", 16895, 0)
          },
          createSocket: function(a, b, c) {
              b &= -526337;
              c && assert(1 == b == (6 == c));
              a = {
                  family: a,
                  type: b,
                  protocol: c,
                  lf: null,
                  error: null,
                  ng: {},
                  pending: [],
                  ag: [],
                  pf: Q.qf
              };
              b = Q.zg();
              c = N.createNode(Q.root, b, 49152, 0);
              c.bg = a;
              b = N.nh({
                  path: b,
                  node: c,
                  flags: N.Dh("r+"),
                  seekable: !1,
                  df: Q.df
              });
              a.stream = b;
              return a
          },
          mi: function(a) {
              return (a = N.zf(a)) && N.isSocket(a.node.mode) ? a.node.bg : null
          },
          df: {
              Zf: function(a) {
                  a = a.node.bg;
                  return a.pf.Zf(a)
              },
              Uf: function(a, b, c) {
                  a = a.node.bg;
                  return a.pf.Uf(a, b, c)
              },
              read: function(a, b, c, d) {
                  a = a.node.bg;
                  d = a.pf.bh(a, d);
                  if (!d)
                      return 0;
                  b.set(d.buffer, c);
                  return d.buffer.length
              },
              write: function(a, b, c, d) {
                  a = a.node.bg;
                  return a.pf.fh(a, b, c, d)
              },
              close: function(a) {
                  a = a.node.bg;
                  a.pf.close(a)
              }
          },
          zg: function() {
              Q.zg.current || (Q.zg.current = 0);
              return "socket[" + Q.zg.current++ + "]"
          },
          qf: {
              tg: function(a, b, c) {
                  if ("object" === typeof b) {
                      var d = b;
                      c = b = null
                  }
                  if (d)
                      if (d._socket)
                          b = d._socket.remoteAddress,
                          c = d._socket.remotePort;
                      else {
                          c = /ws[s]?:\/\/([^:]+):(\d+)/.exec(d.url);
                          if (!c)
                              throw Error("WebSocket URL must be in the format ws(s)://address:port");
                          b = c[1];
                          c = parseInt(c[2], 10)
                      }
                  else
                      try {
                          var e = f.websocket && "object" === typeof f.websocket
                            , g = "ws:#".replace("#", "//");
                          e && "string" === typeof f.websocket.url && (g = f.websocket.url);
                          if ("ws://" === g || "wss://" === g) {
                              var k = b.split("/");
                              g = g + k[0] + ":" + c + "/" + k.slice(1).join("/")
                          }
                          k = "binary";
                          e && "string" === typeof f.websocket.subprotocol && (k = f.websocket.subprotocol);
                          var m = void 0;
                          "null" !== k && (k = k.replace(/^ +| +$/g, "").split(/ *, */),
                          m = l ? {
                              protocol: k.toString()
                          } : k);
                          e && null === f.websocket.subprotocol && (m = void 0);
                          d = new (l ? require("ws") : WebSocket)(g,m);
                          d.binaryType = "arraybuffer"
                      } catch (r) {
                          throw new N.af(23);
                      }
                  b = {
                      hf: b,
                      port: c,
                      socket: d,
                      ug: []
                  };
                  Q.qf.jh(a, b);
                  Q.qf.ni(a, b);
                  2 === a.type && "undefined" !== typeof a.Qf && b.ug.push(new Uint8Array([255, 255, 255, 255, 112, 111, 114, 116, (a.Qf & 65280) >> 8, a.Qf & 255]));
                  return b
              },
              vg: function(a, b, c) {
                  return a.ng[b + ":" + c]
              },
              jh: function(a, b) {
                  a.ng[b.hf + ":" + b.port] = b
              },
              Hh: function(a, b) {
                  delete a.ng[b.hf + ":" + b.port]
              },
              ni: function(a, b) {
                  function c() {
                      f.websocket.emit("open", a.stream.fd);
                      try {
                          for (var g = b.ug.shift(); g; )
                              b.socket.send(g),
                              g = b.ug.shift()
                      } catch (k) {
                          b.socket.close()
                      }
                  }
                  function d(g) {
                      if ("string" === typeof g)
                          g = (new TextEncoder).encode(g);
                      else {
                          assert(void 0 !== g.byteLength);
                          if (0 == g.byteLength)
                              return;
                          g = new Uint8Array(g)
                      }
                      var k = e;
                      e = !1;
                      k && 10 === g.length && 255 === g[0] && 255 === g[1] && 255 === g[2] && 255 === g[3] && 112 === g[4] && 111 === g[5] && 114 === g[6] && 116 === g[7] ? (g = g[8] << 8 | g[9],
                      Q.qf.Hh(a, b),
                      b.port = g,
                      Q.qf.jh(a, b)) : (a.ag.push({
                          hf: b.hf,
                          port: b.port,
                          data: g
                      }),
                      f.websocket.emit("message", a.stream.fd))
                  }
                  var e = !0;
                  l ? (b.socket.on("open", c),
                  b.socket.on("message", function(g, k) {
                      k.Yi && d((new Uint8Array(g)).buffer)
                  }),
                  b.socket.on("close", function() {
                      f.websocket.emit("close", a.stream.fd)
                  }),
                  b.socket.on("error", function() {
                      a.error = 14;
                      f.websocket.emit("error", [a.stream.fd, a.error, "ECONNREFUSED: Connection refused"])
                  })) : (b.socket.onopen = c,
                  b.socket.onclose = function() {
                      f.websocket.emit("close", a.stream.fd)
                  }
                  ,
                  b.socket.onmessage = function(g) {
                      d(g.data)
                  }
                  ,
                  b.socket.onerror = function() {
                      a.error = 14;
                      f.websocket.emit("error", [a.stream.fd, a.error, "ECONNREFUSED: Connection refused"])
                  }
                  )
              },
              Zf: function(a) {
                  if (1 === a.type && a.lf)
                      return a.pending.length ? 65 : 0;
                  var b = 0
                    , c = 1 === a.type ? Q.qf.vg(a, a.sf, a.vf) : null;
                  if (a.ag.length || !c || c && c.socket.readyState === c.socket.CLOSING || c && c.socket.readyState === c.socket.CLOSED)
                      b |= 65;
                  if (!c || c && c.socket.readyState === c.socket.OPEN)
                      b |= 4;
                  if (c && c.socket.readyState === c.socket.CLOSING || c && c.socket.readyState === c.socket.CLOSED)
                      b |= 16;
                  return b
              },
              Uf: function(a, b, c) {
                  switch (b) {
                  case 21531:
                      return b = 0,
                      a.ag.length && (b = a.ag[0].data.length),
                      D[c >> 2] = b,
                      0;
                  default:
                      return 28
                  }
              },
              close: function(a) {
                  if (a.lf) {
                      try {
                          a.lf.close()
                      } catch (e) {}
                      a.lf = null
                  }
                  for (var b = Object.keys(a.ng), c = 0; c < b.length; c++) {
                      var d = a.ng[b[c]];
                      try {
                          d.socket.close()
                      } catch (e) {}
                      Q.qf.Hh(a, d)
                  }
                  return 0
              },
              bind: function(a, b, c) {
                  if ("undefined" !== typeof a.Bg || "undefined" !== typeof a.Qf)
                      throw new N.af(28);
                  a.Bg = b;
                  a.Qf = c;
                  if (2 === a.type) {
                      a.lf && (a.lf.close(),
                      a.lf = null);
                      try {
                          a.pf.listen(a, 0)
                      } catch (d) {
                          if (!(d instanceof N.af))
                              throw d;
                          if (138 !== d.ef)
                              throw d;
                      }
                  }
              },
              connect: function(a, b, c) {
                  if (a.lf)
                      throw new N.af(138);
                  if ("undefined" !== typeof a.sf && "undefined" !== typeof a.vf) {
                      var d = Q.qf.vg(a, a.sf, a.vf);
                      if (d) {
                          if (d.socket.readyState === d.socket.CONNECTING)
                              throw new N.af(7);
                          throw new N.af(30);
                      }
                  }
                  b = Q.qf.tg(a, b, c);
                  a.sf = b.hf;
                  a.vf = b.port;
                  throw new N.af(26);
              },
              listen: function(a) {
                  if (!l)
                      throw new N.af(138);
                  if (a.lf)
                      throw new N.af(28);
                  var b = require("ws").Server;
                  a.lf = new b({
                      host: a.Bg,
                      port: a.Qf
                  });
                  f.websocket.emit("listen", a.stream.fd);
                  a.lf.on("connection", function(c) {
                      if (1 === a.type) {
                          var d = Q.createSocket(a.family, a.type, a.protocol);
                          c = Q.qf.tg(d, c);
                          d.sf = c.hf;
                          d.vf = c.port;
                          a.pending.push(d);
                          f.websocket.emit("connection", d.stream.fd)
                      } else
                          Q.qf.tg(a, c),
                          f.websocket.emit("connection", a.stream.fd)
                  });
                  a.lf.on("closed", function() {
                      f.websocket.emit("close", a.stream.fd);
                      a.lf = null
                  });
                  a.lf.on("error", function() {
                      a.error = 23;
                      f.websocket.emit("error", [a.stream.fd, a.error, "EHOSTUNREACH: Host is unreachable"])
                  })
              },
              accept: function(a) {
                  if (!a.lf)
                      throw new N.af(28);
                  var b = a.pending.shift();
                  b.stream.flags = a.stream.flags;
                  return b
              },
              ij: function(a, b) {
                  if (b) {
                      if (void 0 === a.sf || void 0 === a.vf)
                          throw new N.af(53);
                      b = a.sf;
                      a = a.vf
                  } else
                      b = a.Bg || 0,
                      a = a.Qf || 0;
                  return {
                      hf: b,
                      port: a
                  }
              },
              fh: function(a, b, c, d, e, g) {
                  if (2 === a.type) {
                      if (void 0 === e || void 0 === g)
                          e = a.sf,
                          g = a.vf;
                      if (void 0 === e || void 0 === g)
                          throw new N.af(17);
                  } else
                      e = a.sf,
                      g = a.vf;
                  var k = Q.qf.vg(a, e, g);
                  if (1 === a.type) {
                      if (!k || k.socket.readyState === k.socket.CLOSING || k.socket.readyState === k.socket.CLOSED)
                          throw new N.af(53);
                      if (k.socket.readyState === k.socket.CONNECTING)
                          throw new N.af(6);
                  }
                  ArrayBuffer.isView(b) && (c += b.byteOffset,
                  b = b.buffer);
                  var m;
                  b instanceof SharedArrayBuffer ? m = (new Uint8Array(new Uint8Array(b.slice(c, c + d)))).buffer : m = b.slice(c, c + d);
                  if (2 === a.type && (!k || k.socket.readyState !== k.socket.OPEN))
                      return k && k.socket.readyState !== k.socket.CLOSING && k.socket.readyState !== k.socket.CLOSED || (k = Q.qf.tg(a, e, g)),
                      k.ug.push(m),
                      d;
                  try {
                      return k.socket.send(m),
                      d
                  } catch (r) {
                      throw new N.af(28);
                  }
              },
              bh: function(a, b) {
                  if (1 === a.type && a.lf)
                      throw new N.af(53);
                  var c = a.ag.shift();
                  if (!c) {
                      if (1 === a.type) {
                          if (a = Q.qf.vg(a, a.sf, a.vf)) {
                              if (a.socket.readyState === a.socket.CLOSING || a.socket.readyState === a.socket.CLOSED)
                                  return null;
                              throw new N.af(6);
                          }
                          throw new N.af(53);
                      }
                      throw new N.af(6);
                  }
                  var d = c.data.byteLength || c.data.length
                    , e = c.data.byteOffset || 0
                    , g = c.data.buffer || c.data;
                  b = Math.min(b, d);
                  var k = {
                      buffer: new Uint8Array(g,e,b),
                      hf: c.hf,
                      port: c.port
                  };
                  1 === a.type && b < d && (c.data = new Uint8Array(g,e + b,d - b),
                  a.ag.unshift(c));
                  return k
              }
          }
      };
      function Ec(a) {
          a = a.split(".");
          for (var b = 0; 4 > b; b++) {
              var c = Number(a[b]);
              if (isNaN(c))
                  return null;
              a[b] = c
          }
          return (a[0] | a[1] << 8 | a[2] << 16 | a[3] << 24) >>> 0
      }
      function Fc(a) {
          var b, c, d = [];
          if (!/^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i.test(a))
              return null;
          if ("::" === a)
              return [0, 0, 0, 0, 0, 0, 0, 0];
          a = 0 === a.indexOf("::") ? a.replace("::", "Z:") : a.replace("::", ":Z:");
          0 < a.indexOf(".") ? (a = a.replace(/[.]/g, ":"),
          a = a.split(":"),
          a[a.length - 4] = parseInt(a[a.length - 4]) + 256 * parseInt(a[a.length - 3]),
          a[a.length - 3] = parseInt(a[a.length - 2]) + 256 * parseInt(a[a.length - 1]),
          a = a.slice(0, a.length - 2)) : a = a.split(":");
          for (b = c = 0; b < a.length; b++)
              if ("string" === typeof a[b])
                  if ("Z" === a[b]) {
                      for (c = 0; c < 8 - a.length + 1; c++)
                          d[b + c] = 0;
                      --c
                  } else
                      d[b + c] = Gc(parseInt(a[b], 16));
              else
                  d[b + c] = a[b];
          return [d[1] << 16 | d[0], d[3] << 16 | d[2], d[5] << 16 | d[4], d[7] << 16 | d[6]]
      }
      var Hc = 1
        , Ic = {}
        , Jc = {};
      function Kc(a) {
          var b = Ec(a);
          if (null !== b)
              return a;
          b = Fc(a);
          if (null !== b)
              return a;
          Ic[a] ? b = Ic[a] : (b = Hc++,
          assert(65535 > b, "exceeded max address mappings of 65535"),
          b = "172.29." + (b & 255) + "." + (b & 65280),
          Jc[b] = a,
          Ic[a] = b);
          return b
      }
      function Lc(a) {
          return Jc[a] ? Jc[a] : null
      }
      function Mc(a) {
          return (a & 255) + "." + (a >> 8 & 255) + "." + (a >> 16 & 255) + "." + (a >> 24 & 255)
      }
      function Nc(a) {
          var b = "", c, d = 0, e = 0, g = 0, k = 0;
          a = [a[0] & 65535, a[0] >> 16, a[1] & 65535, a[1] >> 16, a[2] & 65535, a[2] >> 16, a[3] & 65535, a[3] >> 16];
          var m = !0;
          for (c = 0; 5 > c; c++)
              if (0 !== a[c]) {
                  m = !1;
                  break
              }
          if (m) {
              c = Mc(a[6] | a[7] << 16);
              if (-1 === a[5])
                  return "::ffff:" + c;
              if (0 === a[5])
                  return "0.0.0.0" === c && (c = ""),
                  "0.0.0.1" === c && (c = "1"),
                  "::" + c
          }
          for (c = 0; 8 > c; c++)
              0 === a[c] && (1 < c - e && (k = 0),
              e = c,
              k++),
              k > d && (d = k,
              g = c - d + 1);
          for (c = 0; 8 > c; c++)
              1 < d && 0 === a[c] && c >= g && c < g + d ? c === g && (b += ":",
              0 === g && (b += ":")) : (b += Number(Oc(a[c] & 65535)).toString(16),
              b += 7 > c ? ":" : "");
          return b
      }
      function Pc(a, b) {
          var c = Sa[a >> 1]
            , d = Oc(Ta[a + 2 >> 1]);
          switch (c) {
          case 2:
              if (16 !== b)
                  return {
                      ef: 28
                  };
              a = D[a + 4 >> 2];
              a = Mc(a);
              break;
          case 10:
              if (28 !== b)
                  return {
                      ef: 28
                  };
              a = [D[a + 8 >> 2], D[a + 12 >> 2], D[a + 16 >> 2], D[a + 20 >> 2]];
              a = Nc(a);
              break;
          default:
              return {
                  ef: 5
              }
          }
          return {
              family: c,
              hf: a,
              port: d
          }
      }
      function Qc(a, b, c, d) {
          switch (b) {
          case 2:
              c = Ec(c);
              Sa[a >> 1] = b;
              D[a + 4 >> 2] = c;
              Sa[a + 2 >> 1] = Gc(d);
              break;
          case 10:
              c = Fc(c);
              D[a >> 2] = b;
              D[a + 8 >> 2] = c[0];
              D[a + 12 >> 2] = c[1];
              D[a + 16 >> 2] = c[2];
              D[a + 20 >> 2] = c[3];
              Sa[a + 2 >> 1] = Gc(d);
              D[a + 4 >> 2] = 0;
              D[a + 24 >> 2] = 0;
              break;
          default:
              return {
                  ef: 5
              }
          }
          return {}
      }
      function Rc(a, b) {
          if (n)
              return M(20, 1, a, b);
          try {
              jc = b;
              b = function() {
                  var Z = Q.mi(P());
                  if (!Z)
                      throw new N.af(8);
                  return Z
              }
              ;
              var c = function(Z) {
                  var qd = P()
                    , he = P();
                  if (Z && 0 === qd)
                      return null;
                  Z = Pc(qd, he);
                  if (Z.ef)
                      throw new N.af(Z.ef);
                  Z.hf = Lc(Z.hf) || Z.hf;
                  return Z
              };
              switch (a) {
              case 1:
                  var d = P()
                    , e = P()
                    , g = P()
                    , k = Q.createSocket(d, e, g);
                  return k.stream.fd;
              case 2:
                  k = b();
                  var m = c();
                  k.pf.bind(k, m.hf, m.port);
                  return 0;
              case 3:
                  return k = b(),
                  m = c(),
                  k.pf.connect(k, m.hf, m.port),
                  0;
              case 4:
                  k = b();
                  var r = P();
                  k.pf.listen(k, r);
                  return 0;
              case 5:
                  k = b();
                  var q = P();
                  P();
                  var t = k.pf.accept(k);
                  q && Qc(q, t.family, Kc(t.sf), t.vf);
                  return t.stream.fd;
              case 6:
                  return k = b(),
                  q = P(),
                  P(),
                  Qc(q, k.family, Kc(k.Bg || "0.0.0.0"), k.Qf),
                  0;
              case 7:
                  k = b();
                  q = P();
                  P();
                  if (!k.sf)
                      return -53;
                  Qc(q, k.family, Kc(k.sf), k.vf);
                  return 0;
              case 11:
                  k = b();
                  var w = P()
                    , B = P();
                  P();
                  var p = c(!0);
                  return p ? k.pf.fh(k, v, w, B, p.hf, p.port) : N.write(k.stream, v, w, B);
              case 12:
                  k = b();
                  var x = P()
                    , z = P();
                  P();
                  q = P();
                  P();
                  var I = k.pf.bh(k, z);
                  if (!I)
                      return 0;
                  q && Qc(q, k.family, Kc(I.hf), I.port);
                  Ka.set(I.buffer, x);
                  return I.buffer.byteLength;
              case 14:
                  return -50;
              case 15:
                  k = b();
                  var V = P()
                    , fb = P()
                    , K = P()
                    , X = P();
                  return 1 === V && 4 === fb ? (D[K >> 2] = k.error,
                  D[X >> 2] = 4,
                  k.error = null,
                  0) : -50;
              case 16:
                  k = b();
                  w = P();
                  P();
                  var ha = D[w + 8 >> 2]
                    , na = D[w + 12 >> 2]
                    , ua = D[w >> 2]
                    , ie = D[w + 4 >> 2];
                  if (ua) {
                      m = Pc(ua, ie);
                      if (m.ef)
                          return -m.ef;
                      var je = m.port;
                      q = Lc(m.hf) || m.hf
                  }
                  for (var Qa = 0, W = 0; W < na; W++)
                      Qa += D[ha + (8 * W + 4) >> 2];
                  var rd = new Uint8Array(Qa);
                  for (W = B = 0; W < na; W++) {
                      var bc = D[ha + 8 * W >> 2]
                        , cc = D[ha + (8 * W + 4) >> 2];
                      for (x = 0; x < cc; x++)
                          rd[B++] = v[bc + x >> 0]
                  }
                  return k.pf.fh(k, rd, 0, Qa, q, je);
              case 17:
                  k = b();
                  w = P();
                  P();
                  ha = D[w + 8 >> 2];
                  na = D[w + 12 >> 2];
                  for (W = Qa = 0; W < na; W++)
                      Qa += D[ha + (8 * W + 4) >> 2];
                  I = k.pf.bh(k, Qa);
                  if (!I)
                      return 0;
                  (ua = D[w >> 2]) && Qc(ua, k.family, Kc(I.hf), I.port);
                  k = 0;
                  var dc = I.buffer.byteLength;
                  for (W = 0; 0 < dc && W < na; W++)
                      if (bc = D[ha + 8 * W >> 2],
                      cc = D[ha + (8 * W + 4) >> 2])
                          B = Math.min(cc, dc),
                          x = I.buffer.subarray(k, k + B),
                          Ka.set(x, bc + k),
                          k += B,
                          dc -= B;
                  return k;
              default:
                  return -52
              }
          } catch (Z) {
              return "undefined" !== typeof N && Z instanceof N.af || u(Z),
              -Z.ef
          }
      }
      function Sc(a, b) {
          if (n)
              return M(21, 1, a, b);
          try {
              return a = A(a),
              ic(N.stat, a, b)
          } catch (c) {
              return "undefined" !== typeof N && c instanceof N.af || u(c),
              -c.ef
          }
      }
      function Tc(a) {
          if (n)
              return M(22, 1, a);
          try {
              return a = A(a),
              N.unlink(a),
              0
          } catch (b) {
              return "undefined" !== typeof N && b instanceof N.af || u(b),
              -b.ef
          }
      }
      function Uc() {
          void 0 === Uc.start && (Uc.start = Date.now());
          return 1E3 * (Date.now() - Uc.start) | 0
      }
      function Vc() {
          l || oa || (za || (za = {}),
          za["Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"] || (za["Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"] = 1,
          h("Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread")))
      }
      function Wc(a, b, c) {
          if (0 >= a || a > v.length || a & 1)
              return -28;
          if (ma) {
              if (Atomics.load(D, a >> 2) != b)
                  return -6;
              var d = performance.now();
              c = d + c;
              for (Atomics.exchange(D, L.Vf >> 2, a); ; ) {
                  d = performance.now();
                  if (d > c)
                      return Atomics.exchange(D, L.Vf >> 2, 0),
                      -73;
                  d = Atomics.exchange(D, L.Vf >> 2, 0);
                  if (0 == d)
                      break;
                  Cb();
                  if (Atomics.load(D, a >> 2) != b)
                      return -6;
                  Atomics.exchange(D, L.Vf >> 2, a)
              }
              return 0
          }
          a = Atomics.wait(D, a >> 2, b, c);
          if ("timed-out" === a)
              return -73;
          if ("not-equal" === a)
              return -6;
          if ("ok" === a)
              return 0;
          throw "Atomics.wait returned an unexpected value " + a;
      }
      function Xc(a) {
          var b = a.getExtension("ANGLE_instanced_arrays");
          b && (a.vertexAttribDivisor = function(c, d) {
              b.vertexAttribDivisorANGLE(c, d)
          }
          ,
          a.drawArraysInstanced = function(c, d, e, g) {
              b.drawArraysInstancedANGLE(c, d, e, g)
          }
          ,
          a.drawElementsInstanced = function(c, d, e, g, k) {
              b.drawElementsInstancedANGLE(c, d, e, g, k)
          }
          )
      }
      function Yc(a) {
          var b = a.getExtension("OES_vertex_array_object");
          b && (a.createVertexArray = function() {
              return b.createVertexArrayOES()
          }
          ,
          a.deleteVertexArray = function(c) {
              b.deleteVertexArrayOES(c)
          }
          ,
          a.bindVertexArray = function(c) {
              b.bindVertexArrayOES(c)
          }
          ,
          a.isVertexArray = function(c) {
              return b.isVertexArrayOES(c)
          }
          )
      }
      function Zc(a) {
          var b = a.getExtension("WEBGL_draw_buffers");
          b && (a.drawBuffers = function(c, d) {
              b.drawBuffersWEBGL(c, d)
          }
          )
      }
      var $c = 1
        , ad = []
        , R = []
        , bd = []
        , cd = []
        , dd = []
        , S = []
        , ed = []
        , fd = []
        , gd = []
        , hd = {}
        , id = {}
        , jd = 4;
      function T(a) {
          kd || (kd = a)
      }
      function ld(a) {
          for (var b = $c++, c = a.length; c < b; c++)
              a[c] = null;
          return b
      }
      function md(a) {
          a || (a = nd);
          if (!a.oi) {
              a.oi = !0;
              var b = a.qg;
              Xc(b);
              Yc(b);
              Zc(b);
              b.uf = b.getExtension("EXT_disjoint_timer_query");
              b.rj = b.getExtension("WEBGL_multi_draw");
              var c = "OES_texture_float OES_texture_half_float OES_standard_derivatives OES_vertex_array_object WEBGL_compressed_texture_s3tc WEBGL_depth_texture OES_element_index_uint EXT_texture_filter_anisotropic EXT_frag_depth WEBGL_draw_buffers ANGLE_instanced_arrays OES_texture_float_linear OES_texture_half_float_linear EXT_blend_minmax EXT_shader_texture_lod EXT_texture_norm16 WEBGL_compressed_texture_pvrtc EXT_color_buffer_half_float WEBGL_color_buffer_float EXT_sRGB WEBGL_compressed_texture_etc1 EXT_disjoint_timer_query WEBGL_compressed_texture_etc WEBGL_compressed_texture_astc EXT_color_buffer_float WEBGL_compressed_texture_s3tc_srgb EXT_disjoint_timer_query_webgl2 WEBKIT_WEBGL_compressed_texture_pvrtc".split(" ");
              (b.getSupportedExtensions() || []).forEach(function(d) {
                  -1 != c.indexOf(d) && b.getExtension(d)
              })
          }
      }
      var kd, nd, od = [];
      function pd(a, b, c, d) {
          for (var e = 0; e < a; e++) {
              var g = U[c]()
                , k = g && ld(d);
              g ? (g.name = k,
              d[k] = g) : T(1282);
              D[b + 4 * e >> 2] = k
          }
      }
      function sd(a, b, c, d, e, g, k, m) {
          b = R[b];
          if (a = U[a](b, c))
              d = m && Ia(a.name, m, d),
              e && (D[e >> 2] = d),
              g && (D[g >> 2] = a.size),
              k && (D[k >> 2] = a.type)
      }
      function td(a, b) {
          E[a >> 2] = b;
          E[a + 4 >> 2] = (b - E[a >> 2]) / 4294967296
      }
      function ud(a, b, c) {
          if (b) {
              var d = void 0;
              switch (a) {
              case 36346:
                  d = 1;
                  break;
              case 36344:
                  0 != c && 1 != c && T(1280);
                  return;
              case 36345:
                  d = 0;
                  break;
              case 34466:
                  var e = U.getParameter(34467);
                  d = e ? e.length : 0
              }
              if (void 0 === d)
                  switch (e = U.getParameter(a),
                  typeof e) {
                  case "number":
                      d = e;
                      break;
                  case "boolean":
                      d = e ? 1 : 0;
                      break;
                  case "string":
                      T(1280);
                      return;
                  case "object":
                      if (null === e)
                          switch (a) {
                          case 34964:
                          case 35725:
                          case 34965:
                          case 36006:
                          case 36007:
                          case 32873:
                          case 34229:
                          case 34068:
                              d = 0;
                              break;
                          default:
                              T(1280);
                              return
                          }
                      else {
                          if (e instanceof Float32Array || e instanceof Uint32Array || e instanceof Int32Array || e instanceof Array) {
                              for (a = 0; a < e.length; ++a)
                                  switch (c) {
                                  case 0:
                                      D[b + 4 * a >> 2] = e[a];
                                      break;
                                  case 2:
                                      F[b + 4 * a >> 2] = e[a];
                                      break;
                                  case 4:
                                      v[b + a >> 0] = e[a] ? 1 : 0
                                  }
                              return
                          }
                          try {
                              d = e.name | 0
                          } catch (g) {
                              T(1280);
                              h("GL_INVALID_ENUM in glGet" + c + "v: Unknown object returned from WebGL getParameter(" + a + ")! (error: " + g + ")");
                              return
                          }
                      }
                      break;
                  default:
                      T(1280);
                      h("GL_INVALID_ENUM in glGet" + c + "v: Native code calling glGet" + c + "v(" + a + ") and it returns " + e + " of type " + typeof e + "!");
                      return
                  }
              switch (c) {
              case 1:
                  td(b, d);
                  break;
              case 0:
                  D[b >> 2] = d;
                  break;
              case 2:
                  F[b >> 2] = d;
                  break;
              case 4:
                  v[b >> 0] = d ? 1 : 0
              }
          } else
              T(1281)
      }
      function vd(a) {
          var b = Ma(a) + 1
            , c = Oa(b);
          Ia(a, c, b);
          return c
      }
      function wd(a, b, c, d) {
          if (c)
              if (a = U.getUniform(R[a], S[b]),
              "number" == typeof a || "boolean" == typeof a)
                  switch (d) {
                  case 0:
                      D[c >> 2] = a;
                      break;
                  case 2:
                      F[c >> 2] = a
                  }
              else
                  for (b = 0; b < a.length; b++)
                      switch (d) {
                      case 0:
                          D[c + 4 * b >> 2] = a[b];
                          break;
                      case 2:
                          F[c + 4 * b >> 2] = a[b]
                      }
          else
              T(1281)
      }
      function xd(a, b, c, d) {
          if (c)
              if (a = U.getVertexAttrib(a, b),
              34975 == b)
                  D[c >> 2] = a && a.name;
              else if ("number" == typeof a || "boolean" == typeof a)
                  switch (d) {
                  case 0:
                      D[c >> 2] = a;
                      break;
                  case 2:
                      F[c >> 2] = a;
                      break;
                  case 5:
                      D[c >> 2] = Math.fround(a)
                  }
              else
                  for (b = 0; b < a.length; b++)
                      switch (d) {
                      case 0:
                          D[c + 4 * b >> 2] = a[b];
                          break;
                      case 2:
                          F[c + 4 * b >> 2] = a[b];
                          break;
                      case 5:
                          D[c + 4 * b >> 2] = Math.fround(a[b])
                      }
          else
              T(1281)
      }
      function yd(a, b, c, d, e) {
          a -= 5120;
          a = 1 == a ? Ka : 4 == a ? D : 6 == a ? F : 5 == a || 28922 == a ? E : Ta;
          var g = 31 - Math.clz32(a.BYTES_PER_ELEMENT)
            , k = jd;
          return a.subarray(e >> g, e + d * (c * ({
              5: 3,
              6: 4,
              8: 2,
              29502: 3,
              29504: 4
          }[b - 6402] || 1) * (1 << g) + k - 1 & -k) >> g)
      }
      var zd = []
        , Ad = [];
      function M(a, b) {
          for (var c = arguments.length - 2, d = y(), e = Ha(8 * c), g = e >> 3, k = 0; k < c; k++)
              Ua[g + k] = arguments[2 + k];
          c = Bd(a, c, e, b);
          C(d);
          return c
      }
      var Cd = []
        , Dd = []
        , Ed = [0, "undefined" !== typeof document ? document : 0, "undefined" !== typeof window ? window : 0];
      function Fd(a) {
          a = 2 < a ? A(a) : a;
          return Ed[a] || ("undefined" !== typeof document ? document.querySelector(a) : void 0)
      }
      function Gd(a, b, c) {
          var d = Fd(a);
          if (!d)
              return -4;
          d.sg && (D[d.sg >> 2] = b,
          D[d.sg + 4 >> 2] = c);
          if (d.Fh || !d.aj)
              d.Fh && (d = d.Fh),
              a = !1,
              d.rg && d.rg.qg && (a = d.rg.qg.getParameter(2978),
              a = 0 === a[0] && 0 === a[1] && a[2] === d.width && a[3] === d.height),
              d.width = b,
              d.height = c,
              a && d.rg.qg.viewport(0, 0, b, c);
          else {
              if (d.sg) {
                  a = a ? A(a) : "";
                  d = D[d.sg + 8 >> 2];
                  var e = y()
                    , g = Ha(12)
                    , k = 0;
                  a && (k = vd(a));
                  D[g >> 2] = k;
                  D[g + 4 >> 2] = b;
                  D[g + 8 >> 2] = c;
                  Hd(0, d, 657457152, 0, k, g);
                  C(e);
                  return 1
              }
              return -4
          }
          return 0
      }
      function Id(a, b, c) {
          return n ? M(23, 1, a, b, c) : Gd(a, b, c)
      }
      var Jd = ["default", "low-power", "high-performance"]
        , Kd = {};
      function Ld() {
          if (!Md) {
              var a = {
                  USER: "web_user",
                  LOGNAME: "web_user",
                  PATH: "/",
                  PWD: "/",
                  HOME: "/home/web_user",
                  LANG: ("object" === typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                  _: ka || "./this.program"
              }, b;
              for (b in Kd)
                  a[b] = Kd[b];
              var c = [];
              for (b in a)
                  c.push(b + "=" + a[b]);
              Md = c
          }
          return Md
      }
      var Md;
      function Nd(a) {
          if (n)
              return M(24, 1, a);
          try {
              var b = kc(a);
              N.close(b);
              return 0
          } catch (c) {
              return "undefined" !== typeof N && c instanceof N.af || u(c),
              c.ef
          }
      }
      function Od(a, b) {
          if (n)
              return M(25, 1, a, b);
          try {
              var c = kc(a);
              v[b >> 0] = c.tty ? 2 : N.kf(c.mode) ? 3 : N.Mf(c.mode) ? 7 : 4;
              return 0
          } catch (d) {
              return "undefined" !== typeof N && d instanceof N.af || u(d),
              d.ef
          }
      }
      function Pd(a, b, c, d) {
          if (n)
              return M(26, 1, a, b, c, d);
          try {
              a: {
                  for (var e = kc(a), g = a = 0; g < c; g++) {
                      var k = D[b + (8 * g + 4) >> 2]
                        , m = N.read(e, v, D[b + 8 * g >> 2], k, void 0);
                      if (0 > m) {
                          var r = -1;
                          break a
                      }
                      a += m;
                      if (m < k)
                          break
                  }
                  r = a
              }
              D[d >> 2] = r;
              return 0
          } catch (q) {
              return "undefined" !== typeof N && q instanceof N.af || u(q),
              q.ef
          }
      }
      function Qd(a, b, c, d, e) {
          if (n)
              return M(27, 1, a, b, c, d, e);
          try {
              var g = kc(a);
              a = 4294967296 * c + (b >>> 0);
              if (-9007199254740992 >= a || 9007199254740992 <= a)
                  return -61;
              N.tf(g, a, d);
              J = [g.position >>> 0, (H = g.position,
              1 <= +Math.abs(H) ? 0 < H ? (Math.min(+Math.floor(H / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0 : 0)];
              D[e >> 2] = J[0];
              D[e + 4 >> 2] = J[1];
              g.Lf && 0 === a && 0 === d && (g.Lf = null);
              return 0
          } catch (k) {
              return "undefined" !== typeof N && k instanceof N.af || u(k),
              k.ef
          }
      }
      function Rd(a, b, c, d) {
          if (n)
              return M(28, 1, a, b, c, d);
          try {
              a: {
                  for (var e = kc(a), g = a = 0; g < c; g++) {
                      var k = N.write(e, v, D[b + 8 * g >> 2], D[b + (8 * g + 4) >> 2], void 0);
                      if (0 > k) {
                          var m = -1;
                          break a
                      }
                      a += k
                  }
                  m = a
              }
              D[d >> 2] = m;
              return 0
          } catch (r) {
              return "undefined" !== typeof N && r instanceof N.af || u(r),
              r.ef
          }
      }
      var Sd = {};
      function Td(a) {
          Td.buffer || (Td.buffer = Oa(256),
          Sd["0"] = "Success",
          Sd["-1"] = "Invalid value for 'ai_flags' field",
          Sd["-2"] = "NAME or SERVICE is unknown",
          Sd["-3"] = "Temporary failure in name resolution",
          Sd["-4"] = "Non-recoverable failure in name res",
          Sd["-6"] = "'ai_family' not supported",
          Sd["-7"] = "'ai_socktype' not supported",
          Sd["-8"] = "SERVICE not supported for 'ai_socktype'",
          Sd["-10"] = "Memory allocation failure",
          Sd["-11"] = "System error returned in 'errno'",
          Sd["-12"] = "Argument buffer overflow");
          var b = "Unknown error";
          a in Sd && (255 < Sd[a].length ? b = "Message too long" : b = Sd[a]);
          Ra(b, Td.buffer);
          return Td.buffer
      }
      function Ud(a, b, c, d) {
          function e(w, B, p, x, z, I) {
              var V = 10 === w ? 28 : 16;
              z = 10 === w ? Nc(z) : Mc(z);
              V = Oa(V);
              z = Qc(V, w, z, I);
              assert(!z.ef);
              z = Oa(32);
              D[z + 4 >> 2] = w;
              D[z + 8 >> 2] = B;
              D[z + 12 >> 2] = p;
              D[z + 24 >> 2] = x;
              D[z + 20 >> 2] = V;
              D[z + 16 >> 2] = 10 === w ? 28 : 16;
              D[z + 28 >> 2] = 0;
              return z
          }
          if (n)
              return M(29, 1, a, b, c, d);
          var g = 0
            , k = 0
            , m = 0
            , r = 0
            , q = 0
            , t = 0;
          c && (m = D[c >> 2],
          r = D[c + 4 >> 2],
          q = D[c + 8 >> 2],
          t = D[c + 12 >> 2]);
          q && !t && (t = 2 === q ? 17 : 6);
          !q && t && (q = 17 === t ? 2 : 1);
          0 === t && (t = 6);
          0 === q && (q = 1);
          if (!a && !b)
              return -2;
          if (m & -1088 || 0 !== c && D[c >> 2] & 2 && !a)
              return -1;
          if (m & 32)
              return -2;
          if (0 !== q && 1 !== q && 2 !== q)
              return -7;
          if (0 !== r && 2 !== r && 10 !== r)
              return -6;
          if (b && (b = A(b),
          k = parseInt(b, 10),
          isNaN(k)))
              return m & 1024 ? -2 : -8;
          if (!a)
              return 0 === r && (r = 2),
              0 === (m & 1) && (2 === r ? g = Vd(2130706433) : g = [0, 0, 0, 1]),
              a = e(r, q, t, null, g, k),
              D[d >> 2] = a,
              0;
          a = A(a);
          g = Ec(a);
          if (null !== g)
              if (0 === r || 2 === r)
                  r = 2;
              else if (10 === r && m & 8)
                  g = [0, 0, Vd(65535), g],
                  r = 10;
              else
                  return -2;
          else if (g = Fc(a),
          null !== g)
              if (0 === r || 10 === r)
                  r = 10;
              else
                  return -2;
          if (null != g)
              return a = e(r, q, t, a, g, k),
              D[d >> 2] = a,
              0;
          if (m & 4)
              return -2;
          a = Kc(a);
          g = Ec(a);
          0 === r ? r = 2 : 10 === r && (g = [0, 0, Vd(65535), g]);
          a = e(r, q, t, null, g, k);
          D[d >> 2] = a;
          return 0
      }
      function Db(a) {
          if (n)
              throw "Internal Error! spawnThread() can only ever be called from main application thread!";
          var b = L.li();
          if (void 0 !== b.yf)
              throw "Internal error!";
          if (!a.$f)
              throw "Internal error, no pthread ptr!";
          L.Kf.push(b);
          for (var c = Oa(512), d = 0; 128 > d; ++d)
              D[c + 4 * d >> 2] = 0;
          var e = a.Rf + a.cg;
          d = L.Ef[a.$f] = {
              worker: b,
              Rf: a.Rf,
              cg: a.cg,
              Kg: a.Kg,
              Lh: a.$f,
              threadInfoStruct: a.$f
          };
          var g = d.threadInfoStruct >> 2;
          Atomics.store(E, g, 0);
          Atomics.store(E, g + 1, 0);
          Atomics.store(E, g + 2, 0);
          Atomics.store(E, g + 17, a.detached);
          Atomics.store(E, g + 26, c);
          Atomics.store(E, g + 12, 0);
          Atomics.store(E, g + 10, d.threadInfoStruct);
          Atomics.store(E, g + 11, 42);
          Atomics.store(E, g + 27, a.cg);
          Atomics.store(E, g + 21, a.cg);
          Atomics.store(E, g + 20, e);
          Atomics.store(E, g + 29, e);
          Atomics.store(E, g + 30, a.detached);
          Atomics.store(E, g + 32, a.Ih);
          Atomics.store(E, g + 33, a.Jh);
          c = Wd() + 40;
          Atomics.store(E, g + 44, c);
          b.yf = d;
          var k = {
              cmd: "run",
              start_routine: a.Mi,
              arg: a.Tf,
              threadInfoStruct: a.$f,
              selfThreadId: a.$f,
              parentThreadId: a.Fi,
              stackBase: a.Rf,
              stackSize: a.cg
          };
          b.og = function() {
              k.time = performance.now();
              b.postMessage(k, a.Vi)
          }
          ;
          b.loaded && (b.og(),
          delete b.og)
      }
      function Xd() {
          return rb | 0
      }
      f._pthread_self = Xd;
      function Yd(a, b) {
          if (!a)
              return h("pthread_join attempted on a null thread pointer!"),
              71;
          if (n && selfThreadId == a)
              return h("PThread " + a + " is attempting to join to itself!"),
              16;
          if (!n && L.xf == a)
              return h("Main thread " + a + " is attempting to join to itself!"),
              16;
          if (D[a + 12 >> 2] !== a)
              return h("pthread_join attempted on thread " + a + ", which does not point to a valid thread, or does not exist anymore!"),
              71;
          if (Atomics.load(E, a + 68 >> 2))
              return h("Attempted to join thread " + a + ", which was already detached!"),
              28;
          for (Vc(); ; ) {
              var c = Atomics.load(E, a >> 2);
              if (1 == c)
                  return c = Atomics.load(E, a + 4 >> 2),
                  b && (D[b >> 2] = c),
                  Atomics.store(E, a + 68 >> 2, 1),
                  n ? postMessage({
                      cmd: "cleanupThread",
                      thread: a
                  }) : xb(a),
                  0;
              if (n && threadInfoStruct && !Atomics.load(E, threadInfoStruct + 60 >> 2) && 2 == Atomics.load(E, threadInfoStruct + 0 >> 2))
                  throw "Canceled!";
              n || Cb();
              Wc(a, c, n ? 100 : 1)
          }
      }
      function Zd(a) {
          return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400)
      }
      function $d(a, b) {
          for (var c = 0, d = 0; d <= b; c += a[d++])
              ;
          return c
      }
      var ae = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        , be = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      function ce(a, b) {
          for (a = new Date(a.getTime()); 0 < b; ) {
              var c = a.getMonth()
                , d = (Zd(a.getFullYear()) ? ae : be)[c];
              if (b > d - a.getDate())
                  b -= d - a.getDate() + 1,
                  a.setDate(1),
                  11 > c ? a.setMonth(c + 1) : (a.setMonth(0),
                  a.setFullYear(a.getFullYear() + 1));
              else {
                  a.setDate(a.getDate() + b);
                  break
              }
          }
          return a
      }
      function de(a) {
          if (n)
              return M(30, 1, a);
          switch (a) {
          case 30:
              return 16384;
          case 85:
              return Ka.length / 16384;
          case 132:
          case 133:
          case 12:
          case 137:
          case 138:
          case 15:
          case 235:
          case 16:
          case 17:
          case 18:
          case 19:
          case 20:
          case 149:
          case 13:
          case 10:
          case 236:
          case 153:
          case 9:
          case 21:
          case 22:
          case 159:
          case 154:
          case 14:
          case 77:
          case 78:
          case 139:
          case 80:
          case 81:
          case 82:
          case 68:
          case 67:
          case 164:
          case 11:
          case 29:
          case 47:
          case 48:
          case 95:
          case 52:
          case 51:
          case 46:
          case 79:
              return 200809;
          case 27:
          case 246:
          case 127:
          case 128:
          case 23:
          case 24:
          case 160:
          case 161:
          case 181:
          case 182:
          case 242:
          case 183:
          case 184:
          case 243:
          case 244:
          case 245:
          case 165:
          case 178:
          case 179:
          case 49:
          case 50:
          case 168:
          case 169:
          case 175:
          case 170:
          case 171:
          case 172:
          case 97:
          case 76:
          case 32:
          case 173:
          case 35:
              return -1;
          case 176:
          case 177:
          case 7:
          case 155:
          case 8:
          case 157:
          case 125:
          case 126:
          case 92:
          case 93:
          case 129:
          case 130:
          case 131:
          case 94:
          case 91:
              return 1;
          case 74:
          case 60:
          case 69:
          case 70:
          case 4:
              return 1024;
          case 31:
          case 42:
          case 72:
              return 32;
          case 87:
          case 26:
          case 33:
              return 2147483647;
          case 34:
          case 1:
              return 47839;
          case 38:
          case 36:
              return 99;
          case 43:
          case 37:
              return 2048;
          case 0:
              return 2097152;
          case 3:
              return 65536;
          case 28:
              return 32768;
          case 44:
              return 32767;
          case 75:
              return 16384;
          case 39:
              return 1E3;
          case 89:
              return 700;
          case 71:
              return 256;
          case 40:
              return 255;
          case 2:
              return 100;
          case 180:
              return 64;
          case 25:
              return 20;
          case 5:
              return 16;
          case 6:
              return 6;
          case 73:
              return 4;
          case 84:
              return "object" === typeof navigator ? navigator.hardwareConcurrency || 1 : 1
          }
          Fb(28);
          return -1
      }
      function ee(a, b, c, d) {
          a || (a = this);
          this.parent = a;
          this.jf = a.jf;
          this.lg = null;
          this.id = N.Ai++;
          this.name = b;
          this.mode = c;
          this.cf = {};
          this.df = {};
          this.rdev = d
      }
      Object.defineProperties(ee.prototype, {
          read: {
              get: function() {
                  return 365 === (this.mode & 365)
              },
              set: function(a) {
                  a ? this.mode |= 365 : this.mode &= -366
              }
          },
          write: {
              get: function() {
                  return 146 === (this.mode & 146)
              },
              set: function(a) {
                  a ? this.mode |= 146 : this.mode &= -147
              }
          },
          ti: {
              get: function() {
                  return N.kf(this.mode)
              }
          },
          Ug: {
              get: function() {
                  return N.hg(this.mode)
              }
          }
      });
      N.Oh = ee;
      N.Ni();
      for (var fc, U, fe = 0; 32 > fe; ++fe)
          od.push(Array(fe));
      var ge = new Float32Array(288);
      for (fe = 0; 288 > fe; ++fe)
          zd[fe] = ge.subarray(0, fe + 1);
      var ke = new Int32Array(288);
      for (fe = 0; 288 > fe; ++fe)
          Ad[fe] = ke.subarray(0, fe + 1);
      var le = [null, Ib, Kb, lc, mc, nc, oc, pc, qc, sc, tc, uc, vc, xc, yc, zc, Ac, Bc, Cc, Dc, Rc, Sc, Tc, Id, Nd, Od, Pd, Qd, Rd, Ud, de];
      function $b(a, b) {
          var c = Array(Ma(a) + 1);
          a = La(a, c, 0, c.length);
          b && (c.length = a);
          return c
      }
      n || Ya.push({
          vh: function() {
              me()
          }
      });
      var Ge = {
          c: function(a, b, c, d) {
              u("Assertion failed: " + A(a) + ", at: " + [b ? A(b) : "unknown filename", c, d ? A(d) : "unknown function"])
          },
          K: function(a, b) {
              a = ne(a, b);
              if (!noExitRuntime)
                  return postMessage({
                      cmd: "exitProcess",
                      returnCode: a
                  }),
                  a
          },
          W: function(a, b) {
              return Hb(a, b)
          },
          aa: function(a, b) {
              return Ib(a, b)
          },
          va: function(a, b) {
              return Jb(a, b)
          },
          ua: function(a, b) {
              return Ob(a, b)
          },
          Ma: lc,
          Ea: mc,
          u: nc,
          Na: oc,
          Ka: pc,
          Ha: qc,
          V: sc,
          Oa: tc,
          Pa: uc,
          ya: vc,
          Aa: function() {
              return 0
          },
          za: xc,
          Da: function() {
              return -63
          },
          Y: yc,
          La: zc,
          Ja: Ac,
          Ca: Bc,
          wa: Cc,
          Ga: Dc,
          Ia: function() {
              return 0
          },
          t: Rc,
          X: Sc,
          Fa: function(a) {
              try {
                  if (!a)
                      return -21;
                  var b = {
                      __size__: 390,
                      sysname: 0,
                      nodename: 65,
                      release: 130,
                      version: 195,
                      machine: 260,
                      domainname: 325
                  };
                  Ra("Emscripten", a + b.sysname);
                  Ra("emscripten", a + b.nodename);
                  Ra("1.0", a + b.release);
                  Ra("#1", a + b.version);
                  Ra("x86-JS", a + b.machine);
                  return 0
              } catch (c) {
                  return "undefined" !== typeof N && c instanceof N.af || u(c),
                  -c.ef
              }
          },
          Ba: Tc,
          pa: function(a, b) {
              if (a == b)
                  postMessage({
                      cmd: "processQueuedMainThreadWork"
                  });
              else if (n)
                  postMessage({
                      targetThread: a,
                      cmd: "processThreadQueue"
                  });
              else {
                  a = (a = L.Ef[a]) && a.worker;
                  if (!a)
                      return;
                  a.postMessage({
                      cmd: "processThreadQueue"
                  })
              }
              return 1
          },
          b: function() {
              u()
          },
          Qa: Uc,
          Ta: Hb,
          $: function() {
              u("To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking")
          },
          Ua: function() {
              u("To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking")
          },
          F: function(a, b, c) {
              Dd.length = 0;
              var d;
              for (c >>= 2; d = Ka[b++]; )
                  (d = 105 > d) && c & 1 && c++,
                  Dd.push(d ? Ua[c++ >> 1] : D[c]),
                  ++c;
              return ob[a].apply(null, Dd)
          },
          qa: Vc,
          I: function() {},
          A: Wc,
          p: vb,
          z: Eb,
          Ed: function(a) {
              U.activeTexture(a)
          },
          Dd: function(a, b) {
              U.attachShader(R[a], ed[b])
          },
          ea: function(a, b) {
              U.uf.beginQueryEXT(a, gd[b])
          },
          Cd: function(a, b, c) {
              U.bindAttribLocation(R[a], b, A(c))
          },
          Bd: function(a, b) {
              U.bindBuffer(a, ad[b])
          },
          Ad: function(a, b) {
              U.bindFramebuffer(a, bd[b])
          },
          zd: function(a, b) {
              U.bindRenderbuffer(a, cd[b])
          },
          yd: function(a, b) {
              U.bindTexture(a, dd[b])
          },
          Md: function(a) {
              U.bindVertexArray(fd[a])
          },
          xd: function(a, b, c, d) {
              U.blendColor(a, b, c, d)
          },
          wd: function(a) {
              U.blendEquation(a)
          },
          vd: function(a, b) {
              U.blendEquationSeparate(a, b)
          },
          ud: function(a, b) {
              U.blendFunc(a, b)
          },
          td: function(a, b, c, d) {
              U.blendFuncSeparate(a, b, c, d)
          },
          sd: function(a, b, c, d) {
              U.bufferData(a, c ? Ka.subarray(c, c + b) : b, d)
          },
          rd: function(a, b, c, d) {
              U.bufferSubData(a, b, Ka.subarray(d, d + c))
          },
          qd: function(a) {
              return U.checkFramebufferStatus(a)
          },
          pd: function(a) {
              U.clear(a)
          },
          od: function(a, b, c, d) {
              U.clearColor(a, b, c, d)
          },
          nd: function(a) {
              U.clearDepth(a)
          },
          md: function(a) {
              U.clearStencil(a)
          },
          ld: function(a, b, c, d) {
              U.colorMask(!!a, !!b, !!c, !!d)
          },
          kd: function(a) {
              U.compileShader(ed[a])
          },
          jd: function(a, b, c, d, e, g, k, m) {
              U.compressedTexImage2D(a, b, c, d, e, g, m ? Ka.subarray(m, m + k) : null)
          },
          id: function(a, b, c, d, e, g, k, m, r) {
              U.compressedTexSubImage2D(a, b, c, d, e, g, k, r ? Ka.subarray(r, r + m) : null)
          },
          hd: function(a, b, c, d, e, g, k, m) {
              U.copyTexImage2D(a, b, c, d, e, g, k, m)
          },
          gd: function(a, b, c, d, e, g, k, m) {
              U.copyTexSubImage2D(a, b, c, d, e, g, k, m)
          },
          fd: function() {
              var a = ld(R)
                , b = U.createProgram();
              b.name = a;
              R[a] = b;
              return a
          },
          ed: function(a) {
              var b = ld(ed);
              ed[b] = U.createShader(a);
              return b
          },
          dd: function(a) {
              U.cullFace(a)
          },
          cd: function(a, b) {
              for (var c = 0; c < a; c++) {
                  var d = D[b + 4 * c >> 2]
                    , e = ad[d];
                  e && (U.deleteBuffer(e),
                  e.name = 0,
                  ad[d] = null)
              }
          },
          bd: function(a, b) {
              for (var c = 0; c < a; ++c) {
                  var d = D[b + 4 * c >> 2]
                    , e = bd[d];
                  e && (U.deleteFramebuffer(e),
                  e.name = 0,
                  bd[d] = null)
              }
          },
          ad: function(a) {
              if (a) {
                  var b = R[a];
                  b ? (U.deleteProgram(b),
                  b.name = 0,
                  R[a] = null,
                  hd[a] = null) : T(1281)
              }
          },
          ga: function(a, b) {
              for (var c = 0; c < a; c++) {
                  var d = D[b + 4 * c >> 2]
                    , e = gd[d];
                  e && (U.uf.deleteQueryEXT(e),
                  gd[d] = null)
              }
          },
          $c: function(a, b) {
              for (var c = 0; c < a; c++) {
                  var d = D[b + 4 * c >> 2]
                    , e = cd[d];
                  e && (U.deleteRenderbuffer(e),
                  e.name = 0,
                  cd[d] = null)
              }
          },
          _c: function(a) {
              if (a) {
                  var b = ed[a];
                  b ? (U.deleteShader(b),
                  ed[a] = null) : T(1281)
              }
          },
          Zc: function(a, b) {
              for (var c = 0; c < a; c++) {
                  var d = D[b + 4 * c >> 2]
                    , e = dd[d];
                  e && (U.deleteTexture(e),
                  e.name = 0,
                  dd[d] = null)
              }
          },
          Ld: function(a, b) {
              for (var c = 0; c < a; c++) {
                  var d = D[b + 4 * c >> 2];
                  U.deleteVertexArray(fd[d]);
                  fd[d] = null
              }
          },
          Yc: function(a) {
              U.depthFunc(a)
          },
          Xc: function(a) {
              U.depthMask(!!a)
          },
          Wc: function(a, b) {
              U.depthRange(a, b)
          },
          Vc: function(a, b) {
              U.detachShader(R[a], ed[b])
          },
          Uc: function(a) {
              U.disable(a)
          },
          Tc: function(a) {
              U.disableVertexAttribArray(a)
          },
          Sc: function(a, b, c) {
              U.drawArrays(a, b, c)
          },
          Hd: function(a, b, c, d) {
              U.drawArraysInstanced(a, b, c, d)
          },
          Id: function(a, b) {
              for (var c = od[a], d = 0; d < a; d++)
                  c[d] = D[b + 4 * d >> 2];
              U.drawBuffers(c)
          },
          Rc: function(a, b, c, d) {
              U.drawElements(a, b, c, d)
          },
          Gd: function(a, b, c, d, e) {
              U.drawElementsInstanced(a, b, c, d, e)
          },
          Qc: function(a) {
              U.enable(a)
          },
          Pc: function(a) {
              U.enableVertexAttribArray(a)
          },
          da: function(a) {
              U.uf.endQueryEXT(a)
          },
          Oc: function() {
              U.finish()
          },
          Nc: function() {
              U.flush()
          },
          Mc: function(a, b, c, d) {
              U.framebufferRenderbuffer(a, b, c, cd[d])
          },
          Lc: function(a, b, c, d, e) {
              U.framebufferTexture2D(a, b, c, dd[d], e)
          },
          Kc: function(a) {
              U.frontFace(a)
          },
          Jc: function(a, b) {
              pd(a, b, "createBuffer", ad)
          },
          Hc: function(a, b) {
              pd(a, b, "createFramebuffer", bd)
          },
          ha: function(a, b) {
              for (var c = 0; c < a; c++) {
                  var d = U.uf.createQueryEXT();
                  if (!d) {
                      for (T(1282); c < a; )
                          D[b + 4 * c++ >> 2] = 0;
                      break
                  }
                  var e = ld(gd);
                  d.name = e;
                  gd[e] = d;
                  D[b + 4 * c >> 2] = e
              }
          },
          Gc: function(a, b) {
              pd(a, b, "createRenderbuffer", cd)
          },
          Fc: function(a, b) {
              pd(a, b, "createTexture", dd)
          },
          Kd: function(a, b) {
              pd(a, b, "createVertexArray", fd)
          },
          Ic: function(a) {
              U.generateMipmap(a)
          },
          Ec: function(a, b, c, d, e, g, k) {
              sd("getActiveAttrib", a, b, c, d, e, g, k)
          },
          Dc: function(a, b, c, d, e, g, k) {
              sd("getActiveUniform", a, b, c, d, e, g, k)
          },
          Cc: function(a, b, c, d) {
              a = U.getAttachedShaders(R[a]);
              var e = a.length;
              e > b && (e = b);
              D[c >> 2] = e;
              for (b = 0; b < e; ++b)
                  D[d + 4 * b >> 2] = ed.indexOf(a[b])
          },
          Bc: function(a, b) {
              return U.getAttribLocation(R[a], A(b))
          },
          Ac: function(a, b) {
              ud(a, b, 4)
          },
          zc: function(a, b, c) {
              c ? D[c >> 2] = U.getBufferParameter(a, b) : T(1281)
          },
          yc: function() {
              var a = U.getError() || kd;
              kd = 0;
              return a
          },
          xc: function(a, b) {
              ud(a, b, 2)
          },
          wc: function(a, b, c, d) {
              a = U.getFramebufferAttachmentParameter(a, b, c);
              if (a instanceof WebGLRenderbuffer || a instanceof WebGLTexture)
                  a = a.name | 0;
              D[d >> 2] = a
          },
          vc: function(a, b) {
              ud(a, b, 0)
          },
          tc: function(a, b, c, d) {
              a = U.getProgramInfoLog(R[a]);
              null === a && (a = "(unknown error)");
              b = 0 < b && d ? Ia(a, d, b) : 0;
              c && (D[c >> 2] = b)
          },
          uc: function(a, b, c) {
              if (c)
                  if (a >= $c)
                      T(1281);
                  else {
                      var d = hd[a];
                      if (d)
                          if (35716 == b)
                              a = U.getProgramInfoLog(R[a]),
                              null === a && (a = "(unknown error)"),
                              D[c >> 2] = a.length + 1;
                          else if (35719 == b)
                              D[c >> 2] = d.Xg;
                          else if (35722 == b) {
                              if (-1 == d.jg) {
                                  a = R[a];
                                  var e = U.getProgramParameter(a, 35721);
                                  for (b = d.jg = 0; b < e; ++b)
                                      d.jg = Math.max(d.jg, U.getActiveAttrib(a, b).name.length + 1)
                              }
                              D[c >> 2] = d.jg
                          } else if (35381 == b) {
                              if (-1 == d.kg)
                                  for (a = R[a],
                                  e = U.getProgramParameter(a, 35382),
                                  b = d.kg = 0; b < e; ++b)
                                      d.kg = Math.max(d.kg, U.getActiveUniformBlockName(a, b).length + 1);
                              D[c >> 2] = d.kg
                          } else
                              D[c >> 2] = U.getProgramParameter(R[a], b);
                      else
                          T(1282)
                  }
              else
                  T(1281)
          },
          Od: function(a, b, c) {
              if (c) {
                  a = U.uf.getQueryObjectEXT(gd[a], b);
                  var d;
                  "boolean" == typeof a ? d = a ? 1 : 0 : d = a;
                  td(c, d)
              } else
                  T(1281)
          },
          Qd: function(a, b, c) {
              if (c) {
                  a = U.uf.getQueryObjectEXT(gd[a], b);
                  var d;
                  "boolean" == typeof a ? d = a ? 1 : 0 : d = a;
                  D[c >> 2] = d
              } else
                  T(1281)
          },
          Nd: function(a, b, c) {
              if (c) {
                  a = U.uf.getQueryObjectEXT(gd[a], b);
                  var d;
                  "boolean" == typeof a ? d = a ? 1 : 0 : d = a;
                  td(c, d)
              } else
                  T(1281)
          },
          Pd: function(a, b, c) {
              if (c) {
                  a = U.uf.getQueryObjectEXT(gd[a], b);
                  var d;
                  "boolean" == typeof a ? d = a ? 1 : 0 : d = a;
                  D[c >> 2] = d
              } else
                  T(1281)
          },
          Rd: function(a, b, c) {
              c ? D[c >> 2] = U.uf.getQueryEXT(a, b) : T(1281)
          },
          sc: function(a, b, c) {
              c ? D[c >> 2] = U.getRenderbufferParameter(a, b) : T(1281)
          },
          qc: function(a, b, c, d) {
              a = U.getShaderInfoLog(ed[a]);
              null === a && (a = "(unknown error)");
              b = 0 < b && d ? Ia(a, d, b) : 0;
              c && (D[c >> 2] = b)
          },
          pc: function(a, b, c, d) {
              a = U.getShaderPrecisionFormat(a, b);
              D[c >> 2] = a.rangeMin;
              D[c + 4 >> 2] = a.rangeMax;
              D[d >> 2] = a.precision
          },
          oc: function(a, b, c, d) {
              if (a = U.getShaderSource(ed[a]))
                  b = 0 < b && d ? Ia(a, d, b) : 0,
                  c && (D[c >> 2] = b)
          },
          rc: function(a, b, c) {
              c ? 35716 == b ? (a = U.getShaderInfoLog(ed[a]),
              null === a && (a = "(unknown error)"),
              D[c >> 2] = a ? a.length + 1 : 0) : 35720 == b ? (a = U.getShaderSource(ed[a]),
              D[c >> 2] = a ? a.length + 1 : 0) : D[c >> 2] = U.getShaderParameter(ed[a], b) : T(1281)
          },
          nc: function(a) {
              if (id[a])
                  return id[a];
              switch (a) {
              case 7939:
                  var b = U.getSupportedExtensions() || [];
                  b = b.concat(b.map(function(d) {
                      return "GL_" + d
                  }));
                  b = vd(b.join(" "));
                  break;
              case 7936:
              case 7937:
              case 37445:
              case 37446:
                  (b = U.getParameter(a)) || T(1280);
                  b = vd(b);
                  break;
              case 7938:
                  b = vd("OpenGL ES 2.0 (" + U.getParameter(7938) + ")");
                  break;
              case 35724:
                  b = U.getParameter(35724);
                  var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
                  null !== c && (3 == c[1].length && (c[1] += "0"),
                  b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")");
                  b = vd(b);
                  break;
              default:
                  return T(1280),
                  0
              }
              return id[a] = b
          },
          mc: function(a, b, c) {
              c ? F[c >> 2] = U.getTexParameter(a, b) : T(1281)
          },
          lc: function(a, b, c) {
              c ? D[c >> 2] = U.getTexParameter(a, b) : T(1281)
          },
          ic: function(a, b) {
              b = A(b);
              var c = 0;
              if ("]" == b[b.length - 1]) {
                  var d = b.lastIndexOf("[");
                  c = "]" != b[d + 1] ? parseInt(b.slice(d + 1)) : 0;
                  b = b.slice(0, d)
              }
              return (a = hd[a] && hd[a].Nh[b]) && 0 <= c && c < a[0] ? a[1] + c : -1
          },
          kc: function(a, b, c) {
              wd(a, b, c, 2)
          },
          jc: function(a, b, c) {
              wd(a, b, c, 0)
          },
          fc: function(a, b, c) {
              c ? D[c >> 2] = U.getVertexAttribOffset(a, b) : T(1281)
          },
          hc: function(a, b, c) {
              xd(a, b, c, 2)
          },
          gc: function(a, b, c) {
              xd(a, b, c, 5)
          },
          ec: function(a, b) {
              U.hint(a, b)
          },
          dc: function(a) {
              return (a = ad[a]) ? U.isBuffer(a) : 0
          },
          cc: function(a) {
              return U.isEnabled(a)
          },
          bc: function(a) {
              return (a = bd[a]) ? U.isFramebuffer(a) : 0
          },
          ac: function(a) {
              return (a = R[a]) ? U.isProgram(a) : 0
          },
          fa: function(a) {
              return (a = gd[a]) ? U.uf.isQueryEXT(a) : 0
          },
          $b: function(a) {
              return (a = cd[a]) ? U.isRenderbuffer(a) : 0
          },
          _b: function(a) {
              return (a = ed[a]) ? U.isShader(a) : 0
          },
          Zb: function(a) {
              return (a = dd[a]) ? U.isTexture(a) : 0
          },
          Jd: function(a) {
              return (a = fd[a]) ? U.isVertexArray(a) : 0
          },
          Yb: function(a) {
              U.lineWidth(a)
          },
          Xb: function(a) {
              U.linkProgram(R[a]);
              var b = R[a];
              a = hd[a] = {
                  Nh: {},
                  Xg: 0,
                  jg: -1,
                  kg: -1
              };
              for (var c = a.Nh, d = U.getProgramParameter(b, 35718), e = 0; e < d; ++e) {
                  var g = U.getActiveUniform(b, e)
                    , k = g.name;
                  a.Xg = Math.max(a.Xg, k.length + 1);
                  "]" == k.slice(-1) && (k = k.slice(0, k.lastIndexOf("[")));
                  var m = U.getUniformLocation(b, k);
                  if (m) {
                      var r = ld(S);
                      c[k] = [g.size, r];
                      S[r] = m;
                      for (var q = 1; q < g.size; ++q)
                          m = U.getUniformLocation(b, k + "[" + q + "]"),
                          r = ld(S),
                          S[r] = m
                  }
              }
          },
          Wb: function(a, b) {
              3317 == a && (jd = b);
              U.pixelStorei(a, b)
          },
          Vb: function(a, b) {
              U.polygonOffset(a, b)
          },
          ca: function(a, b) {
              U.uf.queryCounterEXT(gd[a], b)
          },
          Ub: function(a, b, c, d, e, g, k) {
              (k = yd(g, e, c, d, k)) ? U.readPixels(a, b, c, d, e, g, k) : T(1280)
          },
          Tb: function() {},
          Sb: function(a, b, c, d) {
              U.renderbufferStorage(a, b, c, d)
          },
          Rb: function(a, b) {
              U.sampleCoverage(a, !!b)
          },
          Qb: function(a, b, c, d) {
              U.scissor(a, b, c, d)
          },
          Pb: function() {
              T(1280)
          },
          Ob: function(a, b, c, d) {
              for (var e = "", g = 0; g < b; ++g) {
                  var k = d ? D[d + 4 * g >> 2] : -1;
                  e += A(D[c + 4 * g >> 2], 0 > k ? void 0 : k)
              }
              U.shaderSource(ed[a], e)
          },
          Nb: function(a, b, c) {
              U.stencilFunc(a, b, c)
          },
          Mb: function(a, b, c, d) {
              U.stencilFuncSeparate(a, b, c, d)
          },
          Lb: function(a) {
              U.stencilMask(a)
          },
          Kb: function(a, b) {
              U.stencilMaskSeparate(a, b)
          },
          Jb: function(a, b, c) {
              U.stencilOp(a, b, c)
          },
          Ib: function(a, b, c, d) {
              U.stencilOpSeparate(a, b, c, d)
          },
          Hb: function(a, b, c, d, e, g, k, m, r) {
              U.texImage2D(a, b, c, d, e, g, k, m, r ? yd(m, k, d, e, r) : null)
          },
          Gb: function(a, b, c) {
              U.texParameterf(a, b, c)
          },
          Fb: function(a, b, c) {
              U.texParameterf(a, b, F[c >> 2])
          },
          Eb: function(a, b, c) {
              U.texParameteri(a, b, c)
          },
          Db: function(a, b, c) {
              U.texParameteri(a, b, D[c >> 2])
          },
          Cb: function(a, b, c, d, e, g, k, m, r) {
              var q = null;
              r && (q = yd(m, k, e, g, r));
              U.texSubImage2D(a, b, c, d, e, g, k, m, q)
          },
          Bb: function(a, b) {
              U.uniform1f(S[a], b)
          },
          Ab: function(a, b, c) {
              if (288 >= b)
                  for (var d = zd[b - 1], e = 0; e < b; ++e)
                      d[e] = F[c + 4 * e >> 2];
              else
                  d = F.subarray(c >> 2, c + 4 * b >> 2);
              U.uniform1fv(S[a], d)
          },
          zb: function(a, b) {
              U.uniform1i(S[a], b)
          },
          yb: function(a, b, c) {
              if (288 >= b)
                  for (var d = Ad[b - 1], e = 0; e < b; ++e)
                      d[e] = D[c + 4 * e >> 2];
              else
                  d = D.subarray(c >> 2, c + 4 * b >> 2);
              U.uniform1iv(S[a], d)
          },
          xb: function(a, b, c) {
              U.uniform2f(S[a], b, c)
          },
          wb: function(a, b, c) {
              if (144 >= b)
                  for (var d = zd[2 * b - 1], e = 0; e < 2 * b; e += 2)
                      d[e] = F[c + 4 * e >> 2],
                      d[e + 1] = F[c + (4 * e + 4) >> 2];
              else
                  d = F.subarray(c >> 2, c + 8 * b >> 2);
              U.uniform2fv(S[a], d)
          },
          vb: function(a, b, c) {
              U.uniform2i(S[a], b, c)
          },
          ub: function(a, b, c) {
              if (144 >= b)
                  for (var d = Ad[2 * b - 1], e = 0; e < 2 * b; e += 2)
                      d[e] = D[c + 4 * e >> 2],
                      d[e + 1] = D[c + (4 * e + 4) >> 2];
              else
                  d = D.subarray(c >> 2, c + 8 * b >> 2);
              U.uniform2iv(S[a], d)
          },
          tb: function(a, b, c, d) {
              U.uniform3f(S[a], b, c, d)
          },
          sb: function(a, b, c) {
              if (96 >= b)
                  for (var d = zd[3 * b - 1], e = 0; e < 3 * b; e += 3)
                      d[e] = F[c + 4 * e >> 2],
                      d[e + 1] = F[c + (4 * e + 4) >> 2],
                      d[e + 2] = F[c + (4 * e + 8) >> 2];
              else
                  d = F.subarray(c >> 2, c + 12 * b >> 2);
              U.uniform3fv(S[a], d)
          },
          rb: function(a, b, c, d) {
              U.uniform3i(S[a], b, c, d)
          },
          qb: function(a, b, c) {
              if (96 >= b)
                  for (var d = Ad[3 * b - 1], e = 0; e < 3 * b; e += 3)
                      d[e] = D[c + 4 * e >> 2],
                      d[e + 1] = D[c + (4 * e + 4) >> 2],
                      d[e + 2] = D[c + (4 * e + 8) >> 2];
              else
                  d = D.subarray(c >> 2, c + 12 * b >> 2);
              U.uniform3iv(S[a], d)
          },
          pb: function(a, b, c, d, e) {
              U.uniform4f(S[a], b, c, d, e)
          },
          ob: function(a, b, c) {
              if (72 >= b) {
                  var d = zd[4 * b - 1];
                  c >>= 2;
                  for (var e = 0; e < 4 * b; e += 4) {
                      var g = c + e;
                      d[e] = F[g];
                      d[e + 1] = F[g + 1];
                      d[e + 2] = F[g + 2];
                      d[e + 3] = F[g + 3]
                  }
              } else
                  d = F.subarray(c >> 2, c + 16 * b >> 2);
              U.uniform4fv(S[a], d)
          },
          nb: function(a, b, c, d, e) {
              U.uniform4i(S[a], b, c, d, e)
          },
          mb: function(a, b, c) {
              if (72 >= b)
                  for (var d = Ad[4 * b - 1], e = 0; e < 4 * b; e += 4)
                      d[e] = D[c + 4 * e >> 2],
                      d[e + 1] = D[c + (4 * e + 4) >> 2],
                      d[e + 2] = D[c + (4 * e + 8) >> 2],
                      d[e + 3] = D[c + (4 * e + 12) >> 2];
              else
                  d = D.subarray(c >> 2, c + 16 * b >> 2);
              U.uniform4iv(S[a], d)
          },
          lb: function(a, b, c, d) {
              if (72 >= b)
                  for (var e = zd[4 * b - 1], g = 0; g < 4 * b; g += 4)
                      e[g] = F[d + 4 * g >> 2],
                      e[g + 1] = F[d + (4 * g + 4) >> 2],
                      e[g + 2] = F[d + (4 * g + 8) >> 2],
                      e[g + 3] = F[d + (4 * g + 12) >> 2];
              else
                  e = F.subarray(d >> 2, d + 16 * b >> 2);
              U.uniformMatrix2fv(S[a], !!c, e)
          },
          kb: function(a, b, c, d) {
              if (32 >= b)
                  for (var e = zd[9 * b - 1], g = 0; g < 9 * b; g += 9)
                      e[g] = F[d + 4 * g >> 2],
                      e[g + 1] = F[d + (4 * g + 4) >> 2],
                      e[g + 2] = F[d + (4 * g + 8) >> 2],
                      e[g + 3] = F[d + (4 * g + 12) >> 2],
                      e[g + 4] = F[d + (4 * g + 16) >> 2],
                      e[g + 5] = F[d + (4 * g + 20) >> 2],
                      e[g + 6] = F[d + (4 * g + 24) >> 2],
                      e[g + 7] = F[d + (4 * g + 28) >> 2],
                      e[g + 8] = F[d + (4 * g + 32) >> 2];
              else
                  e = F.subarray(d >> 2, d + 36 * b >> 2);
              U.uniformMatrix3fv(S[a], !!c, e)
          },
          jb: function(a, b, c, d) {
              if (18 >= b) {
                  var e = zd[16 * b - 1];
                  d >>= 2;
                  for (var g = 0; g < 16 * b; g += 16) {
                      var k = d + g;
                      e[g] = F[k];
                      e[g + 1] = F[k + 1];
                      e[g + 2] = F[k + 2];
                      e[g + 3] = F[k + 3];
                      e[g + 4] = F[k + 4];
                      e[g + 5] = F[k + 5];
                      e[g + 6] = F[k + 6];
                      e[g + 7] = F[k + 7];
                      e[g + 8] = F[k + 8];
                      e[g + 9] = F[k + 9];
                      e[g + 10] = F[k + 10];
                      e[g + 11] = F[k + 11];
                      e[g + 12] = F[k + 12];
                      e[g + 13] = F[k + 13];
                      e[g + 14] = F[k + 14];
                      e[g + 15] = F[k + 15]
                  }
              } else
                  e = F.subarray(d >> 2, d + 64 * b >> 2);
              U.uniformMatrix4fv(S[a], !!c, e)
          },
          ib: function(a) {
              U.useProgram(R[a])
          },
          hb: function(a) {
              U.validateProgram(R[a])
          },
          gb: function(a, b) {
              U.vertexAttrib1f(a, b)
          },
          fb: function(a, b) {
              U.vertexAttrib1f(a, F[b >> 2])
          },
          eb: function(a, b, c) {
              U.vertexAttrib2f(a, b, c)
          },
          db: function(a, b) {
              U.vertexAttrib2f(a, F[b >> 2], F[b + 4 >> 2])
          },
          cb: function(a, b, c, d) {
              U.vertexAttrib3f(a, b, c, d)
          },
          bb: function(a, b) {
              U.vertexAttrib3f(a, F[b >> 2], F[b + 4 >> 2], F[b + 8 >> 2])
          },
          ab: function(a, b, c, d, e) {
              U.vertexAttrib4f(a, b, c, d, e)
          },
          $a: function(a, b) {
              U.vertexAttrib4f(a, F[b >> 2], F[b + 4 >> 2], F[b + 8 >> 2], F[b + 12 >> 2])
          },
          Fd: function(a, b) {
              U.vertexAttribDivisor(a, b)
          },
          _a: function(a, b, c, d, e, g) {
              U.vertexAttribPointer(a, b, c, !!d, e, g)
          },
          Za: function(a, b, c, d) {
              U.viewport(a, b, c, d)
          },
          ka: function() {
              return "undefined" !== typeof SharedArrayBuffer
          },
          G: function() {
              return tb | 0
          },
          R: function() {
              return sb | 0
          },
          f: function(a, b) {
              Y(a, b || 1);
              throw "longjmp";
          },
          ja: function(a, b, c) {
              Ka.copyWithin(a, b, b + c)
          },
          ma: function(a, b, c) {
              Cd.length = b;
              c >>= 3;
              for (var d = 0; d < b; d++)
                  Cd[d] = Ua[c + d];
              return (0 > a ? ob[-a - 1] : le[a]).apply(null, Cd)
          },
          ra: function() {
              u("OOM")
          },
          na: function(a, b, c) {
              return Fd(a) ? Gd(a, b, c) : Id(a, b, c)
          },
          Q: function() {},
          la: function() {},
          oa: function(a, b) {
              var c = {};
              b >>= 2;
              c.alpha = !!D[b];
              c.depth = !!D[b + 1];
              c.stencil = !!D[b + 2];
              c.antialias = !!D[b + 3];
              c.premultipliedAlpha = !!D[b + 4];
              c.preserveDrawingBuffer = !!D[b + 5];
              c.powerPreference = Jd[D[b + 6]];
              c.failIfMajorPerformanceCaveat = !!D[b + 7];
              c.wi = D[b + 8];
              c.pj = D[b + 9];
              c.qh = D[b + 10];
              c.hi = D[b + 11];
              c.uj = D[b + 12];
              c.vj = D[b + 13];
              a = Fd(a);
              if (!a || c.hi)
                  c = 0;
              else if (a = a.getContext("webgl", c)) {
                  b = Oa(8);
                  D[b + 4 >> 2] = rb | 0;
                  var d = {
                      jj: b,
                      attributes: c,
                      version: c.wi,
                      qg: a
                  };
                  a.canvas && (a.canvas.rg = d);
                  ("undefined" === typeof c.qh || c.qh) && md(d);
                  c = b
              } else
                  c = 0;
              return c
          },
          sa: function(a, b) {
              var c = 0;
              Ld().forEach(function(d, e) {
                  var g = b + c;
                  D[a + 4 * e >> 2] = g;
                  Ra(d, g);
                  c += d.length + 1
              });
              return 0
          },
          ta: function(a, b) {
              var c = Ld();
              D[a >> 2] = c.length;
              var d = 0;
              c.forEach(function(e) {
                  d += e.length + 1
              });
              D[b >> 2] = d;
              return 0
          },
          D: function(a) {
              da(a)
          },
          H: Nd,
          U: Od,
          xa: Pd,
          Va: Qd,
          M: Rd,
          B: Td,
          d: function() {
              return Aa | 0
          },
          y: Ud,
          v: function(a, b, c, d, e, g, k) {
              b = Pc(a, b);
              if (b.ef)
                  return -6;
              a = b.port;
              var m = b.hf;
              b = !1;
              if (c && d) {
                  var r;
                  if (k & 1 || !(r = Lc(m))) {
                      if (k & 8)
                          return -2
                  } else
                      m = r;
                  c = Ia(m, c, d);
                  c + 1 >= d && (b = !0)
              }
              e && g && (c = Ia("" + a, e, g),
              c + 1 >= g && (b = !0));
              return b ? -12 : 0
          },
          l: function(a) {
              var b = Date.now();
              D[a >> 2] = b / 1E3 | 0;
              D[a + 4 >> 2] = b % 1E3 * 1E3 | 0;
              return 0
          },
          r: Jb,
          ia: function() {
              L.pi()
          },
          ba: oe,
          j: pe,
          h: qe,
          C: re,
          P: se,
          _: te,
          O: ue,
          Xa: ve,
          Wa: we,
          k: xe,
          w: ye,
          J: ze,
          g: Ae,
          N: Be,
          Sa: Ce,
          Z: De,
          Ya: Ee,
          q: Ob,
          a: Ca || f.wasmMemory,
          T: function(a) {
              Kb();
              var b = new Date(D[a + 20 >> 2] + 1900,D[a + 16 >> 2],D[a + 12 >> 2],D[a + 8 >> 2],D[a + 4 >> 2],D[a >> 2],0)
                , c = D[a + 32 >> 2]
                , d = b.getTimezoneOffset()
                , e = new Date(b.getFullYear(),0,1)
                , g = (new Date(b.getFullYear(),6,1)).getTimezoneOffset()
                , k = e.getTimezoneOffset()
                , m = Math.min(k, g);
              0 > c ? D[a + 32 >> 2] = Number(g != k && m == d) : 0 < c != (m == d) && (g = Math.max(k, g),
              b.setTime(b.getTime() + 6E4 * ((0 < c ? m : g) - d)));
              D[a + 24 >> 2] = b.getDay();
              D[a + 28 >> 2] = (b.getTime() - e.getTime()) / 864E5 | 0;
              return b.getTime() / 1E3 | 0
          },
          Ra: function(a) {
              if (a === L.Ph)
                  return h("Main thread (id=" + a + ") cannot be canceled!"),
                  71;
              if (!a)
                  return h("pthread_cancel attempted on a null thread pointer!"),
                  71;
              if (D[a + 12 >> 2] !== a)
                  return h("pthread_cancel attempted on thread " + a + ", which does not point to a valid thread, or does not exist anymore!"),
                  71;
              Atomics.compareExchange(E, a >> 2, 0, 2);
              n ? postMessage({
                  cmd: "cancelThread",
                  thread: a
              }) : wb(a);
              return 0
          },
          S: function(a) {
              var b = L.Dg.pop();
              a && b()
          },
          L: function(a, b) {
              L.Dg.push(function() {
                  G.get(a)(b)
              })
          },
          n: function(a, b, c, d) {
              if ("undefined" === typeof SharedArrayBuffer)
                  return h("Current environment does not support SharedArrayBuffer, pthreads are not available!"),
                  6;
              if (!a)
                  return h("pthread_create called with a null thread pointer!"),
                  28;
              var e = [];
              if (n && 0 === e.length)
                  return Fe(687865856, a, b, c, d);
              var g = 0
                , k = 0
                , m = 0
                , r = 0;
              if (b) {
                  var q = D[b >> 2];
                  q += 81920;
                  g = D[b + 8 >> 2];
                  k = 0 !== D[b + 12 >> 2];
                  if (0 === D[b + 16 >> 2]) {
                      var t = D[b + 20 >> 2]
                        , w = D[b + 24 >> 2];
                      m = b + 20;
                      r = b + 24;
                      var B = L.Mg ? L.Mg : rb | 0;
                      if (m || r)
                          if (B)
                              if (D[B + 12 >> 2] !== B)
                                  h("pthread_getschedparam attempted on thread " + B + ", which does not point to a valid thread, or does not exist anymore!");
                              else {
                                  var p = Atomics.load(E, B + 128 >> 2);
                                  B = Atomics.load(E, B + 132 >> 2);
                                  m && (D[m >> 2] = p);
                                  r && (D[r >> 2] = B)
                              }
                          else
                              h("pthread_getschedparam called with a null thread pointer!");
                      m = D[b + 20 >> 2];
                      r = D[b + 24 >> 2];
                      D[b + 20 >> 2] = t;
                      D[b + 24 >> 2] = w
                  } else
                      m = D[b + 20 >> 2],
                      r = D[b + 24 >> 2]
              } else
                  q = 2097152;
              (b = 0 == g) ? g = wc(16, q) : (g -= q,
              assert(0 < g));
              t = Oa(232);
              for (w = 0; 58 > w; ++w)
                  E[(t >> 2) + w] = 0;
              D[a >> 2] = t;
              D[t + 12 >> 2] = t;
              a = t + 156;
              D[a >> 2] = a;
              c = {
                  Rf: g,
                  cg: q,
                  Kg: b,
                  Ih: m,
                  Jh: r,
                  detached: k,
                  Mi: c,
                  $f: t,
                  Fi: rb | 0,
                  Tf: d,
                  Vi: e
              };
              n ? (c.$i = "spawnThread",
              postMessage(c, e)) : Db(c);
              return 0
          },
          o: function(a, b) {
              return Yd(a, b)
          },
          i: Xd,
          e: function(a) {
              Aa = a | 0
          },
          E: function() {
              return 0
          },
          m: function(a, b, c, d) {
              function e(p, x, z) {
                  for (p = "number" === typeof p ? p.toString() : p || ""; p.length < x; )
                      p = z[0] + p;
                  return p
              }
              function g(p, x) {
                  return e(p, x, "0")
              }
              function k(p, x) {
                  function z(V) {
                      return 0 > V ? -1 : 0 < V ? 1 : 0
                  }
                  var I;
                  0 === (I = z(p.getFullYear() - x.getFullYear())) && 0 === (I = z(p.getMonth() - x.getMonth())) && (I = z(p.getDate() - x.getDate()));
                  return I
              }
              function m(p) {
                  switch (p.getDay()) {
                  case 0:
                      return new Date(p.getFullYear() - 1,11,29);
                  case 1:
                      return p;
                  case 2:
                      return new Date(p.getFullYear(),0,3);
                  case 3:
                      return new Date(p.getFullYear(),0,2);
                  case 4:
                      return new Date(p.getFullYear(),0,1);
                  case 5:
                      return new Date(p.getFullYear() - 1,11,31);
                  case 6:
                      return new Date(p.getFullYear() - 1,11,30)
                  }
              }
              function r(p) {
                  p = ce(new Date(p.rf + 1900,0,1), p.Gg);
                  var x = new Date(p.getFullYear() + 1,0,4)
                    , z = m(new Date(p.getFullYear(),0,4));
                  x = m(x);
                  return 0 >= k(z, p) ? 0 >= k(x, p) ? p.getFullYear() + 1 : p.getFullYear() : p.getFullYear() - 1
              }
              var q = D[d + 40 >> 2];
              d = {
                  Ti: D[d >> 2],
                  Si: D[d + 4 >> 2],
                  Eg: D[d + 8 >> 2],
                  pg: D[d + 12 >> 2],
                  dg: D[d + 16 >> 2],
                  rf: D[d + 20 >> 2],
                  Fg: D[d + 24 >> 2],
                  Gg: D[d + 28 >> 2],
                  yj: D[d + 32 >> 2],
                  Ri: D[d + 36 >> 2],
                  Ui: q ? A(q) : ""
              };
              c = A(c);
              q = {
                  "%c": "%a %b %d %H:%M:%S %Y",
                  "%D": "%m/%d/%y",
                  "%F": "%Y-%m-%d",
                  "%h": "%b",
                  "%r": "%I:%M:%S %p",
                  "%R": "%H:%M",
                  "%T": "%H:%M:%S",
                  "%x": "%m/%d/%y",
                  "%X": "%H:%M:%S",
                  "%Ec": "%c",
                  "%EC": "%C",
                  "%Ex": "%m/%d/%y",
                  "%EX": "%H:%M:%S",
                  "%Ey": "%y",
                  "%EY": "%Y",
                  "%Od": "%d",
                  "%Oe": "%e",
                  "%OH": "%H",
                  "%OI": "%I",
                  "%Om": "%m",
                  "%OM": "%M",
                  "%OS": "%S",
                  "%Ou": "%u",
                  "%OU": "%U",
                  "%OV": "%V",
                  "%Ow": "%w",
                  "%OW": "%W",
                  "%Oy": "%y"
              };
              for (var t in q)
                  c = c.replace(new RegExp(t,"g"), q[t]);
              var w = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")
                , B = "January February March April May June July August September October November December".split(" ");
              q = {
                  "%a": function(p) {
                      return w[p.Fg].substring(0, 3)
                  },
                  "%A": function(p) {
                      return w[p.Fg]
                  },
                  "%b": function(p) {
                      return B[p.dg].substring(0, 3)
                  },
                  "%B": function(p) {
                      return B[p.dg]
                  },
                  "%C": function(p) {
                      return g((p.rf + 1900) / 100 | 0, 2)
                  },
                  "%d": function(p) {
                      return g(p.pg, 2)
                  },
                  "%e": function(p) {
                      return e(p.pg, 2, " ")
                  },
                  "%g": function(p) {
                      return r(p).toString().substring(2)
                  },
                  "%G": function(p) {
                      return r(p)
                  },
                  "%H": function(p) {
                      return g(p.Eg, 2)
                  },
                  "%I": function(p) {
                      p = p.Eg;
                      0 == p ? p = 12 : 12 < p && (p -= 12);
                      return g(p, 2)
                  },
                  "%j": function(p) {
                      return g(p.pg + $d(Zd(p.rf + 1900) ? ae : be, p.dg - 1), 3)
                  },
                  "%m": function(p) {
                      return g(p.dg + 1, 2)
                  },
                  "%M": function(p) {
                      return g(p.Si, 2)
                  },
                  "%n": function() {
                      return "\n"
                  },
                  "%p": function(p) {
                      return 0 <= p.Eg && 12 > p.Eg ? "AM" : "PM"
                  },
                  "%S": function(p) {
                      return g(p.Ti, 2)
                  },
                  "%t": function() {
                      return "\t"
                  },
                  "%u": function(p) {
                      return p.Fg || 7
                  },
                  "%U": function(p) {
                      var x = new Date(p.rf + 1900,0,1)
                        , z = 0 === x.getDay() ? x : ce(x, 7 - x.getDay());
                      p = new Date(p.rf + 1900,p.dg,p.pg);
                      return 0 > k(z, p) ? g(Math.ceil((31 - z.getDate() + ($d(Zd(p.getFullYear()) ? ae : be, p.getMonth() - 1) - 31) + p.getDate()) / 7), 2) : 0 === k(z, x) ? "01" : "00"
                  },
                  "%V": function(p) {
                      var x = new Date(p.rf + 1901,0,4)
                        , z = m(new Date(p.rf + 1900,0,4));
                      x = m(x);
                      var I = ce(new Date(p.rf + 1900,0,1), p.Gg);
                      return 0 > k(I, z) ? "53" : 0 >= k(x, I) ? "01" : g(Math.ceil((z.getFullYear() < p.rf + 1900 ? p.Gg + 32 - z.getDate() : p.Gg + 1 - z.getDate()) / 7), 2)
                  },
                  "%w": function(p) {
                      return p.Fg
                  },
                  "%W": function(p) {
                      var x = new Date(p.rf,0,1)
                        , z = 1 === x.getDay() ? x : ce(x, 0 === x.getDay() ? 1 : 7 - x.getDay() + 1);
                      p = new Date(p.rf + 1900,p.dg,p.pg);
                      return 0 > k(z, p) ? g(Math.ceil((31 - z.getDate() + ($d(Zd(p.getFullYear()) ? ae : be, p.getMonth() - 1) - 31) + p.getDate()) / 7), 2) : 0 === k(z, x) ? "01" : "00"
                  },
                  "%y": function(p) {
                      return (p.rf + 1900).toString().substring(2)
                  },
                  "%Y": function(p) {
                      return p.rf + 1900
                  },
                  "%z": function(p) {
                      p = p.Ri;
                      var x = 0 <= p;
                      p = Math.abs(p) / 60;
                      return (x ? "+" : "-") + String("0000" + (p / 60 * 100 + p % 60)).slice(-4)
                  },
                  "%Z": function(p) {
                      return p.Ui
                  },
                  "%%": function() {
                      return "%"
                  }
              };
              for (t in q)
                  0 <= c.indexOf(t) && (c = c.replace(new RegExp(t,"g"), q[t](d)));
              t = $b(c, !1);
              if (t.length > b)
                  return 0;
              v.set(t, a);
              return t.length - 1
          },
          x: de,
          s: function(a) {
              var b = Date.now() / 1E3 | 0;
              a && (D[a >> 2] = b);
              return b
          }
      };
      (function() {
          function a(e, g) {
              f.asm = e.exports;
              G = f.asm.Sd;
              Da = g;
              n || hb()
          }
          function b(e) {
              a(e.instance, e.module)
          }
          function c(e) {
              return mb().then(function(g) {
                  return WebAssembly.instantiate(g, d)
              }).then(e, function(g) {
                  h("failed to asynchronously prepare wasm: " + g);
                  u(g)
              })
          }
          var d = {
              a: Ge
          };
          n || gb();
          if (f.instantiateWasm)
              try {
                  return f.instantiateWasm(d, a)
              } catch (e) {
                  return h("Module.instantiateWasm callback failed with error: " + e),
                  !1
              }
          (function() {
              return Ba || "function" !== typeof WebAssembly.instantiateStreaming || kb() || ib("file://") || "function" !== typeof fetch ? c(b) : fetch(jb, {
                  credentials: "same-origin"
              }).then(function(e) {
                  return WebAssembly.instantiateStreaming(e, d).then(b, function(g) {
                      h("wasm streaming compile failed: " + g);
                      h("falling back to ArrayBuffer instantiation");
                      return c(b)
                  })
              })
          }
          )().catch(ba);
          return {}
      }
      )();
      var me = f.___wasm_call_ctors = function() {
          return (me = f.___wasm_call_ctors = f.asm.Td).apply(null, arguments)
      }
        , Bb = f._free = function() {
          return (Bb = f._free = f.asm.Ud).apply(null, arguments)
      }
        , Oa = f._malloc = function() {
          return (Oa = f._malloc = f.asm.Vd).apply(null, arguments)
      }
        , Gb = f.___errno_location = function() {
          return (Gb = f.___errno_location = f.asm.Wd).apply(null, arguments)
      }
      ;
      f._fflush = function() {
          return (f._fflush = f.asm.Xd).apply(null, arguments)
      }
      ;
      var wc = f._memalign = function() {
          return (wc = f._memalign = f.asm.Yd).apply(null, arguments)
      }
        , Oc = f._ntohs = function() {
          return (Oc = f._ntohs = f.asm.Zd).apply(null, arguments)
      }
        , Gc = f._htons = function() {
          return (Gc = f._htons = f.asm._d).apply(null, arguments)
      }
        , ne = f._main = function() {
          return (ne = f._main = f.asm.$d).apply(null, arguments)
      }
        , Wd = f._emscripten_get_global_libc = function() {
          return (Wd = f._emscripten_get_global_libc = f.asm.ae).apply(null, arguments)
      }
      ;
      f.___em_js__initPthreadsJS = function() {
          return (f.___em_js__initPthreadsJS = f.asm.be).apply(null, arguments)
      }
      ;
      var Vd = f._htonl = function() {
          return (Vd = f._htonl = f.asm.ce).apply(null, arguments)
      }
        , rc = f._memset = function() {
          return (rc = f._memset = f.asm.de).apply(null, arguments)
      }
        , Nb = f.__get_tzname = function() {
          return (Nb = f.__get_tzname = f.asm.ee).apply(null, arguments)
      }
        , Mb = f.__get_daylight = function() {
          return (Mb = f.__get_daylight = f.asm.fe).apply(null, arguments)
      }
        , Lb = f.__get_timezone = function() {
          return (Lb = f.__get_timezone = f.asm.ge).apply(null, arguments)
      }
        , y = f.stackSave = function() {
          return (y = f.stackSave = f.asm.he).apply(null, arguments)
      }
        , C = f.stackRestore = function() {
          return (C = f.stackRestore = f.asm.ie).apply(null, arguments)
      }
        , Ha = f.stackAlloc = function() {
          return (Ha = f.stackAlloc = f.asm.je).apply(null, arguments)
      }
        , Y = f._setThrew = function() {
          return (Y = f._setThrew = f.asm.ke).apply(null, arguments)
      }
      ;
      f._emscripten_main_browser_thread_id = function() {
          return (f._emscripten_main_browser_thread_id = f.asm.le).apply(null, arguments)
      }
      ;
      var Ab = f.___pthread_tsd_run_dtors = function() {
          return (Ab = f.___pthread_tsd_run_dtors = f.asm.me).apply(null, arguments)
      }
        , Cb = f._emscripten_main_thread_process_queued_calls = function() {
          return (Cb = f._emscripten_main_thread_process_queued_calls = f.asm.ne).apply(null, arguments)
      }
      ;
      f._emscripten_current_thread_process_queued_calls = function() {
          return (f._emscripten_current_thread_process_queued_calls = f.asm.oe).apply(null, arguments)
      }
      ;
      var yb = f._emscripten_register_main_browser_thread_id = function() {
          return (yb = f._emscripten_register_main_browser_thread_id = f.asm.pe).apply(null, arguments)
      }
        , nb = f._do_emscripten_dispatch_to_thread = function() {
          return (nb = f._do_emscripten_dispatch_to_thread = f.asm.qe).apply(null, arguments)
      }
      ;
      f._emscripten_async_run_in_main_thread = function() {
          return (f._emscripten_async_run_in_main_thread = f.asm.re).apply(null, arguments)
      }
      ;
      f._emscripten_sync_run_in_main_thread = function() {
          return (f._emscripten_sync_run_in_main_thread = f.asm.se).apply(null, arguments)
      }
      ;
      f._emscripten_sync_run_in_main_thread_0 = function() {
          return (f._emscripten_sync_run_in_main_thread_0 = f.asm.te).apply(null, arguments)
      }
      ;
      f._emscripten_sync_run_in_main_thread_1 = function() {
          return (f._emscripten_sync_run_in_main_thread_1 = f.asm.ue).apply(null, arguments)
      }
      ;
      f._emscripten_sync_run_in_main_thread_2 = function() {
          return (f._emscripten_sync_run_in_main_thread_2 = f.asm.ve).apply(null, arguments)
      }
      ;
      f._emscripten_sync_run_in_main_thread_xprintf_varargs = function() {
          return (f._emscripten_sync_run_in_main_thread_xprintf_varargs = f.asm.we).apply(null, arguments)
      }
      ;
      f._emscripten_sync_run_in_main_thread_3 = function() {
          return (f._emscripten_sync_run_in_main_thread_3 = f.asm.xe).apply(null, arguments)
      }
      ;
      var Fe = f._emscripten_sync_run_in_main_thread_4 = function() {
          return (Fe = f._emscripten_sync_run_in_main_thread_4 = f.asm.ye).apply(null, arguments)
      }
      ;
      f._emscripten_sync_run_in_main_thread_5 = function() {
          return (f._emscripten_sync_run_in_main_thread_5 = f.asm.ze).apply(null, arguments)
      }
      ;
      f._emscripten_sync_run_in_main_thread_6 = function() {
          return (f._emscripten_sync_run_in_main_thread_6 = f.asm.Ae).apply(null, arguments)
      }
      ;
      f._emscripten_sync_run_in_main_thread_7 = function() {
          return (f._emscripten_sync_run_in_main_thread_7 = f.asm.Be).apply(null, arguments)
      }
      ;
      var Bd = f._emscripten_run_in_main_runtime_thread_js = function() {
          return (Bd = f._emscripten_run_in_main_runtime_thread_js = f.asm.Ce).apply(null, arguments)
      }
        , Hd = f.__emscripten_call_on_thread = function() {
          return (Hd = f.__emscripten_call_on_thread = f.asm.De).apply(null, arguments)
      }
      ;
      f._proxy_main = function() {
          return (f._proxy_main = f.asm.Ee).apply(null, arguments)
      }
      ;
      f._emscripten_tls_init = function() {
          return (f._emscripten_tls_init = f.asm.Fe).apply(null, arguments)
      }
      ;
      f.dynCall_ijiii = function() {
          return (f.dynCall_ijiii = f.asm.Ge).apply(null, arguments)
      }
      ;
      var He = f.dynCall_vijjjid = function() {
          return (He = f.dynCall_vijjjid = f.asm.He).apply(null, arguments)
      }
        , Ie = f.dynCall_iiiijj = function() {
          return (Ie = f.dynCall_iiiijj = f.asm.Ie).apply(null, arguments)
      }
      ;
      f.dynCall_iiijiii = function() {
          return (f.dynCall_iiijiii = f.asm.Je).apply(null, arguments)
      }
      ;
      f.dynCall_jiiii = function() {
          return (f.dynCall_jiiii = f.asm.Ke).apply(null, arguments)
      }
      ;
      f.dynCall_jii = function() {
          return (f.dynCall_jii = f.asm.Le).apply(null, arguments)
      }
      ;
      var Je = f.dynCall_iij = function() {
          return (Je = f.dynCall_iij = f.asm.Me).apply(null, arguments)
      }
      ;
      f.dynCall_viiijj = function() {
          return (f.dynCall_viiijj = f.asm.Ne).apply(null, arguments)
      }
      ;
      f.dynCall_jij = function() {
          return (f.dynCall_jij = f.asm.Oe).apply(null, arguments)
      }
      ;
      f.dynCall_jiji = function() {
          return (f.dynCall_jiji = f.asm.Pe).apply(null, arguments)
      }
      ;
      f.dynCall_iiiji = function() {
          return (f.dynCall_iiiji = f.asm.Qe).apply(null, arguments)
      }
      ;
      f.dynCall_iiiiij = function() {
          return (f.dynCall_iiiiij = f.asm.Re).apply(null, arguments)
      }
      ;
      f.dynCall_jiiij = function() {
          return (f.dynCall_jiiij = f.asm.Se).apply(null, arguments)
      }
      ;
      f.dynCall_iiijjji = function() {
          return (f.dynCall_iiijjji = f.asm.Te).apply(null, arguments)
      }
      ;
      f.dynCall_iiiiiij = function() {
          return (f.dynCall_iiiiiij = f.asm.Ue).apply(null, arguments)
      }
      ;
      f.dynCall_jiiji = function() {
          return (f.dynCall_jiiji = f.asm.Ve).apply(null, arguments)
      }
      ;
      f.dynCall_viiiiijji = function() {
          return (f.dynCall_viiiiijji = f.asm.We).apply(null, arguments)
      }
      ;
      f.dynCall_viiiji = function() {
          return (f.dynCall_viiiji = f.asm.Xe).apply(null, arguments)
      }
      ;
      f.dynCall_viiiiji = function() {
          return (f.dynCall_viiiiji = f.asm.Ye).apply(null, arguments)
      }
      ;
      f.dynCall_jiiiii = function() {
          return (f.dynCall_jiiiii = f.asm.Ze).apply(null, arguments)
      }
      ;
      f.dynCall_jiii = function() {
          return (f.dynCall_jiii = f.asm._e).apply(null, arguments)
      }
      ;
      f.dynCall_jiiiiii = function() {
          return (f.dynCall_jiiiiii = f.asm.$e).apply(null, arguments)
      }
      ;
      f._ff_h264_cabac_tables = 2116006;
      var zb = f._main_thread_futex = 17189696;
      function qe(a, b, c) {
          var d = y();
          try {
              return G.get(a)(b, c)
          } catch (e) {
              C(d);
              if (e !== e + 0 && "longjmp" !== e)
                  throw e;
              Y(1, 0)
          }
      }
      function xe(a, b) {
          var c = y();
          try {
              G.get(a)(b)
          } catch (d) {
              C(c);
              if (d !== d + 0 && "longjmp" !== d)
                  throw d;
              Y(1, 0)
          }
      }
      function Ae(a, b, c, d, e) {
          var g = y();
          try {
              G.get(a)(b, c, d, e)
          } catch (k) {
              C(g);
              if (k !== k + 0 && "longjmp" !== k)
                  throw k;
              Y(1, 0)
          }
      }
      function ye(a, b, c) {
          var d = y();
          try {
              G.get(a)(b, c)
          } catch (e) {
              C(d);
              if (e !== e + 0 && "longjmp" !== e)
                  throw e;
              Y(1, 0)
          }
      }
      function pe(a, b) {
          var c = y();
          try {
              return G.get(a)(b)
          } catch (d) {
              C(c);
              if (d !== d + 0 && "longjmp" !== d)
                  throw d;
              Y(1, 0)
          }
      }
      function se(a, b, c, d, e) {
          var g = y();
          try {
              return G.get(a)(b, c, d, e)
          } catch (k) {
              C(g);
              if (k !== k + 0 && "longjmp" !== k)
                  throw k;
              Y(1, 0)
          }
      }
      function ue(a, b, c, d, e, g, k, m, r) {
          var q = y();
          try {
              return G.get(a)(b, c, d, e, g, k, m, r)
          } catch (t) {
              C(q);
              if (t !== t + 0 && "longjmp" !== t)
                  throw t;
              Y(1, 0)
          }
      }
      function ze(a, b, c, d) {
          var e = y();
          try {
              G.get(a)(b, c, d)
          } catch (g) {
              C(e);
              if (g !== g + 0 && "longjmp" !== g)
                  throw g;
              Y(1, 0)
          }
      }
      function oe(a) {
          var b = y();
          try {
              return G.get(a)()
          } catch (c) {
              C(b);
              if (c !== c + 0 && "longjmp" !== c)
                  throw c;
              Y(1, 0)
          }
      }
      function Be(a, b, c, d, e, g) {
          var k = y();
          try {
              G.get(a)(b, c, d, e, g)
          } catch (m) {
              C(k);
              if (m !== m + 0 && "longjmp" !== m)
                  throw m;
              Y(1, 0)
          }
      }
      function re(a, b, c, d) {
          var e = y();
          try {
              return G.get(a)(b, c, d)
          } catch (g) {
              C(e);
              if (g !== g + 0 && "longjmp" !== g)
                  throw g;
              Y(1, 0)
          }
      }
      function te(a, b, c, d, e, g) {
          var k = y();
          try {
              return G.get(a)(b, c, d, e, g)
          } catch (m) {
              C(k);
              if (m !== m + 0 && "longjmp" !== m)
                  throw m;
              Y(1, 0)
          }
      }
      function De(a, b, c, d, e, g, k, m, r) {
          var q = y();
          try {
              G.get(a)(b, c, d, e, g, k, m, r)
          } catch (t) {
              C(q);
              if (t !== t + 0 && "longjmp" !== t)
                  throw t;
              Y(1, 0)
          }
      }
      function Ce(a, b, c, d, e, g, k) {
          var m = y();
          try {
              G.get(a)(b, c, d, e, g, k)
          } catch (r) {
              C(m);
              if (r !== r + 0 && "longjmp" !== r)
                  throw r;
              Y(1, 0)
          }
      }
      function Ee(a, b, c, d, e, g, k, m, r, q) {
          var t = y();
          try {
              He(a, b, c, d, e, g, k, m, r, q)
          } catch (w) {
              C(t);
              if (w !== w + 0 && "longjmp" !== w)
                  throw w;
              Y(1, 0)
          }
      }
      function ve(a, b, c, d, e, g, k, m) {
          var r = y();
          try {
              return Ie(a, b, c, d, e, g, k, m)
          } catch (q) {
              C(r);
              if (q !== q + 0 && "longjmp" !== q)
                  throw q;
              Y(1, 0)
          }
      }
      function we(a, b, c, d) {
          var e = y();
          try {
              return Je(a, b, c, d)
          } catch (g) {
              C(e);
              if (g !== g + 0 && "longjmp" !== g)
                  throw g;
              Y(1, 0)
          }
      }
      f.ccall = Ga;
      f.cwrap = function(a, b, c, d) {
          c = c || [];
          var e = c.every(function(g) {
              return "number" === g
          });
          return "string" !== b && e && !d ? Fa(a) : function() {
              return Ga(a, b, c, arguments, d)
          }
      }
      ;
      f.setValue = function(a, b, c) {
          c = c || "i8";
          "*" === c.charAt(c.length - 1) && (c = "i32");
          switch (c) {
          case "i1":
              v[a >> 0] = b;
              break;
          case "i8":
              v[a >> 0] = b;
              break;
          case "i16":
              Sa[a >> 1] = b;
              break;
          case "i32":
              D[a >> 2] = b;
              break;
          case "i64":
              J = [b >>> 0, (H = b,
              1 <= +Math.abs(H) ? 0 < H ? (Math.min(+Math.floor(H / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((H - +(~~H >>> 0)) / 4294967296) >>> 0 : 0)];
              D[a >> 2] = J[0];
              D[a + 4 >> 2] = J[1];
              break;
          case "float":
              F[a >> 2] = b;
              break;
          case "double":
              Ua[a >> 3] = b;
              break;
          default:
              u("invalid type for setValue: " + c)
          }
      }
      ;
      f.UTF8ToString = A;
      f.stringToUTF8 = Ia;
      f.lengthBytesUTF8 = Ma;
      f.writeAsciiToMemory = Ra;
      f.FS = N;
      f.PThread = L;
      f.PThread = L;
      f._pthread_self = Xd;
      f.wasmMemory = Ca;
      f.ExitStatus = ca;
      var Ke;
      function ca(a) {
          this.name = "ExitStatus";
          this.message = "Program terminated with exit(" + a + ")";
          this.status = a
      }
      eb = function Le() {
          Ke || Me();
          Ke || (eb = Le)
      }
      ;
      function Me(a) {
          function b() {
              if (!Ke && (Ke = !0,
              f.calledRun = !0,
              !Ea)) {
                  f.noFSInit || N.gg.Tg || N.gg();
                  Q.root = N.jf(Q, {}, null);
                  pb(Ya);
                  n || (N.Bh = !1,
                  pb(Za));
                  aa(f);
                  if (f.onRuntimeInitialized)
                      f.onRuntimeInitialized();
                  if (Ne) {
                      var c = a;
                      c = c || [];
                      var d = c.length + 1
                        , e = Ha(4 * (d + 1));
                      D[e >> 2] = Pa(ka);
                      for (var g = 1; g < d; g++)
                          D[(e >> 2) + g] = Pa(c[g - 1]);
                      D[(e >> 2) + d] = 0;
                      f._proxy_main(d, e)
                  }
                  if (!n) {
                      if (f.postRun)
                          for ("function" == typeof f.postRun && (f.postRun = [f.postRun]); f.postRun.length; )
                              c = f.postRun.shift(),
                              ab.unshift(c);
                      pb(ab)
                  }
              }
          }
          a = a || ja;
          if (!(0 < cb)) {
              if (!n) {
                  if (f.preRun)
                      for ("function" == typeof f.preRun && (f.preRun = [f.preRun]); f.preRun.length; )
                          bb();
                  pb(Xa)
              }
              0 < cb || (f.setStatus ? (f.setStatus("Running..."),
              setTimeout(function() {
                  setTimeout(function() {
                      f.setStatus("")
                  }, 1);
                  b()
              }, 1)) : b())
          }
      }
      f.run = Me;
      function da(a, b) {
          if (!b || !noExitRuntime || 0 !== a) {
              if (!noExitRuntime) {
                  L.Oi();
                  n || (pb($a),
                  N.quit(),
                  L.eh());
                  if (f.onExit)
                      f.onExit(a);
                  Ea = !0
              }
              la(a, new ca(a))
          }
      }
      if (f.preInit)
          for ("function" == typeof f.preInit && (f.preInit = [f.preInit]); 0 < f.preInit.length; )
              f.preInit.pop()();
      var Ne = !1;
      f.noInitialRun && (Ne = !1);
      n ? L.ri() : Me();

      return createFFmpegCore.ready
  }
  );
}
)();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = createFFmpegCore;
else if (typeof define === 'function' && define['amd'])
  define([], function() {
      return createFFmpegCore;
  });
else if (typeof exports === 'object')
  exports["createFFmpegCore"] = createFFmpegCore;
