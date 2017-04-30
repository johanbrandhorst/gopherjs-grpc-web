var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.checkStringArgs = function(a, b, c) {
  if (null == a) {
    throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
  }
  if (b instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
  }
  return a + "";
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, b, c, d) {
  if (b) {
    c = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in c || (c[e] = {});
      c = c[e];
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d && null != b && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:b});
  }
};
$jscomp.polyfill("String.prototype.repeat", function(a) {
  return a ? a : function(a) {
    var b = $jscomp.checkStringArgs(this, null, "repeat");
    if (0 > a || 1342177279 < a) {
      throw new RangeError("Invalid count value");
    }
    a |= 0;
    for (var d = ""; a;) {
      if (a & 1 && (d += b), a >>>= 1) {
        b += b;
      }
    }
    return d;
  };
}, "es6-impl", "es3");
$jscomp.findInternal = function(a, b, c) {
  a instanceof String && (a = String(a));
  for (var d = a.length, e = 0; e < d; e++) {
    var f = a[e];
    if (b.call(c, f, e, a)) {
      return {i:e, v:f};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill("Array.prototype.findIndex", function(a) {
  return a ? a : function(a, c) {
    return $jscomp.findInternal(this, a, c).i;
  };
}, "es6-impl", "es3");
$jscomp.polyfill("Array.prototype.find", function(a) {
  return a ? a : function(a, c) {
    return $jscomp.findInternal(this, a, c).v;
  };
}, "es6-impl", "es3");
$jscomp.polyfill("String.prototype.endsWith", function(a) {
  return a ? a : function(a, c) {
    var b = $jscomp.checkStringArgs(this, a, "endsWith");
    a += "";
    void 0 === c && (c = b.length);
    for (var e = Math.max(0, Math.min(c | 0, b.length)), f = a.length; 0 < f && 0 < e;) {
      if (b[--e] != a[--f]) {
        return !1;
      }
    }
    return 0 >= f;
  };
}, "es6-impl", "es3");
$jscomp.polyfill("Math.sign", function(a) {
  return a ? a : function(a) {
    a = Number(a);
    return 0 === a || isNaN(a) ? a : 0 < a ? 1 : -1;
  };
}, "es6-impl", "es3");
$jscomp.polyfill("String.prototype.startsWith", function(a) {
  return a ? a : function(a, c) {
    var b = $jscomp.checkStringArgs(this, a, "startsWith");
    a += "";
    for (var e = b.length, f = a.length, g = Math.max(0, Math.min(c | 0, b.length)), h = 0; h < f && g < e;) {
      if (b[g++] != a[h++]) {
        return !1;
      }
    }
    return h >= f;
  };
}, "es6-impl", "es3");
var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.isDef = function(a) {
  return void 0 !== a;
};
goog.exportPath_ = function(a, b, c) {
  a = a.split(".");
  c = c || goog.global;
  a[0] in c || !c.execScript || c.execScript("var " + a[0]);
  for (var d; a.length && (d = a.shift());) {
    !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {};
  }
};
goog.define = function(a, b) {
  var c = b;
  COMPILED || (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, a) ? c = goog.global.CLOSURE_UNCOMPILED_DEFINES[a] : goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, a) && (c = goog.global.CLOSURE_DEFINES[a]));
  goog.exportPath_(a, c);
};
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function(a) {
  if (goog.isInModuleLoader_()) {
    throw Error("goog.provide can not be used within a goog.module.");
  }
  if (!COMPILED && goog.isProvided_(a)) {
    throw Error('Namespace "' + a + '" already declared.');
  }
  goog.constructNamespace_(a);
};
goog.constructNamespace_ = function(a, b) {
  if (!COMPILED) {
    delete goog.implicitNamespaces_[a];
    for (var c = a; (c = c.substring(0, c.lastIndexOf("."))) && !goog.getObjectByName(c);) {
      goog.implicitNamespaces_[c] = !0;
    }
  }
  goog.exportPath_(a, b);
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(a) {
  if (!goog.isString(a) || !a || -1 == a.search(goog.VALID_MODULE_RE_)) {
    throw Error("Invalid module identifier");
  }
  if (!goog.isInModuleLoader_()) {
    throw Error("Module " + a + " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
  }
  if (goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module may only be called once per module.");
  }
  goog.moduleLoaderState_.moduleName = a;
  if (!COMPILED) {
    if (goog.isProvided_(a)) {
      throw Error('Namespace "' + a + '" already declared.');
    }
    delete goog.implicitNamespaces_[a];
  }
};
goog.module.get = function(a) {
  return goog.module.getInternal_(a);
};
goog.module.getInternal_ = function(a) {
  if (!COMPILED) {
    return goog.isProvided_(a) ? a in goog.loadedModules_ ? goog.loadedModules_[a] : goog.getObjectByName(a) : null;
  }
};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
  return null != goog.moduleLoaderState_;
};
goog.module.declareLegacyNamespace = function() {
  if (!COMPILED && !goog.isInModuleLoader_()) {
    throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
  }
  if (!COMPILED && !goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
  }
  goog.moduleLoaderState_.declareLegacyNamespace = !0;
};
goog.setTestOnly = function(a) {
  if (goog.DISALLOW_TEST_ONLY_CODE) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
  }
};
goog.forwardDeclare = function(a) {
};
COMPILED || (goog.isProvided_ = function(a) {
  return a in goog.loadedModules_ || !goog.implicitNamespaces_[a] && goog.isDefAndNotNull(goog.getObjectByName(a));
}, goog.implicitNamespaces_ = {"goog.module":!0});
goog.getObjectByName = function(a, b) {
  for (var c = a.split("."), d = b || goog.global, e; e = c.shift();) {
    if (goog.isDefAndNotNull(d[e])) {
      d = d[e];
    } else {
      return null;
    }
  }
  return d;
};
goog.globalize = function(a, b) {
  var c = b || goog.global, d;
  for (d in a) {
    c[d] = a[d];
  }
};
goog.addDependency = function(a, b, c, d) {
  if (goog.DEPENDENCIES_ENABLED) {
    var e;
    a = a.replace(/\\/g, "/");
    var f = goog.dependencies_;
    d && "boolean" !== typeof d || (d = d ? {module:"goog"} : {});
    for (var g = 0; e = b[g]; g++) {
      f.nameToPath[e] = a, f.loadFlags[a] = d;
    }
    for (d = 0; b = c[d]; d++) {
      a in f.requires || (f.requires[a] = {}), f.requires[a][b] = !0;
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function(a) {
  goog.global.console && goog.global.console.error(a);
};
goog.require = function(a) {
  if (!COMPILED) {
    goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_ && goog.maybeProcessDeferredDep_(a);
    if (goog.isProvided_(a)) {
      if (goog.isInModuleLoader_()) {
        return goog.module.getInternal_(a);
      }
    } else {
      if (goog.ENABLE_DEBUG_LOADER) {
        var b = goog.getPathFromDeps_(a);
        if (b) {
          goog.writeScripts_(b);
        } else {
          throw a = "goog.require could not find: " + a, goog.logToConsole_(a), Error(a);
        }
      }
    }
    return null;
  }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
  a.getInstance = function() {
    if (a.instance_) {
      return a.instance_;
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
    return a.instance_ = new a;
  };
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.TRANSPILE = "detect";
goog.TRANSPILER = "transpile.js";
goog.DEPENDENCIES_ENABLED && (goog.dependencies_ = {loadFlags:{}, nameToPath:{}, requires:{}, visited:{}, written:{}, deferred:{}}, goog.inHtmlDocument_ = function() {
  var a = goog.global.document;
  return null != a && "write" in a;
}, goog.findBasePath_ = function() {
  if (goog.isDef(goog.global.CLOSURE_BASE_PATH)) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH;
  } else {
    if (goog.inHtmlDocument_()) {
      for (var a = goog.global.document.getElementsByTagName("SCRIPT"), b = a.length - 1; 0 <= b; --b) {
        var c = a[b].src, d = c.lastIndexOf("?"), d = -1 == d ? c.length : d;
        if ("base.js" == c.substr(d - 7, 7)) {
          goog.basePath = c.substr(0, d - 7);
          break;
        }
      }
    }
  }
}, goog.importScript_ = function(a, b) {
  (goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_)(a, b) && (goog.dependencies_.written[a] = !0);
}, goog.IS_OLD_IE_ = !(goog.global.atob || !goog.global.document || !goog.global.document.all), goog.importProcessedScript_ = function(a, b, c) {
  goog.importScript_("", 'goog.retrieveAndExec_("' + a + '", ' + b + ", " + c + ");");
}, goog.queuedModules_ = [], goog.wrapModule_ = function(a, b) {
  return goog.LOAD_MODULE_USING_EVAL && goog.isDef(goog.global.JSON) ? "goog.loadModule(" + goog.global.JSON.stringify(b + "\n//# sourceURL=" + a + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + b + "\n;return exports});\n//# sourceURL=" + a + "\n";
}, goog.loadQueuedModules_ = function() {
  var a = goog.queuedModules_.length;
  if (0 < a) {
    var b = goog.queuedModules_;
    goog.queuedModules_ = [];
    for (var c = 0; c < a; c++) {
      goog.maybeProcessDeferredPath_(b[c]);
    }
  }
}, goog.maybeProcessDeferredDep_ = function(a) {
  goog.isDeferredModule_(a) && goog.allDepsAreAvailable_(a) && (a = goog.getPathFromDeps_(a), goog.maybeProcessDeferredPath_(goog.basePath + a));
}, goog.isDeferredModule_ = function(a) {
  var b = (a = goog.getPathFromDeps_(a)) && goog.dependencies_.loadFlags[a] || {};
  return a && ("goog" == b.module || goog.needsTranspile_(b.lang)) ? goog.basePath + a in goog.dependencies_.deferred : !1;
}, goog.allDepsAreAvailable_ = function(a) {
  if ((a = goog.getPathFromDeps_(a)) && a in goog.dependencies_.requires) {
    for (var b in goog.dependencies_.requires[a]) {
      if (!goog.isProvided_(b) && !goog.isDeferredModule_(b)) {
        return !1;
      }
    }
  }
  return !0;
}, goog.maybeProcessDeferredPath_ = function(a) {
  if (a in goog.dependencies_.deferred) {
    var b = goog.dependencies_.deferred[a];
    delete goog.dependencies_.deferred[a];
    goog.globalEval(b);
  }
}, goog.loadModuleFromUrl = function(a) {
  goog.retrieveAndExec_(a, !0, !1);
}, goog.writeScriptSrcNode_ = function(a) {
  goog.global.document.write('<script type="text/javascript" src="' + a + '">\x3c/script>');
}, goog.appendScriptSrcNode_ = function(a) {
  var b = goog.global.document, c = b.createElement("script");
  c.type = "text/javascript";
  c.src = a;
  c.defer = !1;
  c.async = !1;
  b.head.appendChild(c);
}, goog.writeScriptTag_ = function(a, b) {
  if (goog.inHtmlDocument_()) {
    var c = goog.global.document;
    if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && "complete" == c.readyState) {
      if (/\bdeps.js$/.test(a)) {
        return !1;
      }
      throw Error('Cannot write "' + a + '" after document load');
    }
    if (void 0 === b) {
      if (goog.IS_OLD_IE_) {
        var d = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ";
        c.write('<script type="text/javascript" src="' + a + '"' + d + ">\x3c/script>");
      } else {
        goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING ? goog.appendScriptSrcNode_(a) : goog.writeScriptSrcNode_(a);
      }
    } else {
      c.write('<script type="text/javascript">' + b + "\x3c/script>");
    }
    return !0;
  }
  return !1;
}, goog.needsTranspile_ = function(a) {
  if ("always" == goog.TRANSPILE) {
    return !0;
  }
  if ("never" == goog.TRANSPILE) {
    return !1;
  }
  if (!goog.transpiledLanguages_) {
    goog.transpiledLanguages_ = {es5:!0, es6:!0, "es6-impl":!0};
    try {
      goog.transpiledLanguages_.es5 = eval("[1,].length!=1"), eval('(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()') && (goog.transpiledLanguages_.es6 = !1, goog.transpiledLanguages_["es6-impl"] = !1);
    } catch (b) {
    }
  }
  return !!goog.transpiledLanguages_[a];
}, goog.transpiledLanguages_ = null, goog.lastNonModuleScriptIndex_ = 0, goog.onScriptLoad_ = function(a, b) {
  "complete" == a.readyState && goog.lastNonModuleScriptIndex_ == b && goog.loadQueuedModules_();
  return !0;
}, goog.writeScripts_ = function(a) {
  function b(a) {
    if (!(a in e.written || a in e.visited)) {
      e.visited[a] = !0;
      if (a in e.requires) {
        for (var f in e.requires[a]) {
          if (!goog.isProvided_(f)) {
            if (f in e.nameToPath) {
              b(e.nameToPath[f]);
            } else {
              throw Error("Undefined nameToPath for " + f);
            }
          }
        }
      }
      a in d || (d[a] = !0, c.push(a));
    }
  }
  var c = [], d = {}, e = goog.dependencies_;
  b(a);
  for (var f = 0; f < c.length; f++) {
    a = c[f], goog.dependencies_.written[a] = !0;
  }
  var g = goog.moduleLoaderState_;
  goog.moduleLoaderState_ = null;
  for (f = 0; f < c.length; f++) {
    if (a = c[f]) {
      var h = e.loadFlags[a] || {}, k = goog.needsTranspile_(h.lang);
      "goog" == h.module || k ? goog.importProcessedScript_(goog.basePath + a, "goog" == h.module, k) : goog.importScript_(goog.basePath + a);
    } else {
      throw goog.moduleLoaderState_ = g, Error("Undefined script input");
    }
  }
  goog.moduleLoaderState_ = g;
}, goog.getPathFromDeps_ = function(a) {
  return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null;
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.loadModule = function(a) {
  var b = goog.moduleLoaderState_;
  try {
    goog.moduleLoaderState_ = {moduleName:void 0, declareLegacyNamespace:!1};
    if (goog.isFunction(a)) {
      var c = a.call(void 0, {});
    } else {
      if (goog.isString(a)) {
        c = goog.loadModuleFromSource_.call(void 0, a);
      } else {
        throw Error("Invalid module definition");
      }
    }
    var d = goog.moduleLoaderState_.moduleName;
    if (!goog.isString(d) || !d) {
      throw Error('Invalid module name "' + d + '"');
    }
    goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(d, c) : goog.SEAL_MODULE_EXPORTS && Object.seal && goog.isObject(c) && Object.seal(c);
    goog.loadedModules_[d] = c;
  } finally {
    goog.moduleLoaderState_ = b;
  }
};
goog.loadModuleFromSource_ = function(a) {
  eval(a);
  return {};
};
goog.normalizePath_ = function(a) {
  a = a.split("/");
  for (var b = 0; b < a.length;) {
    "." == a[b] ? a.splice(b, 1) : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1] ? a.splice(--b, 2) : b++;
  }
  return a.join("/");
};
goog.loadFileSync_ = function(a) {
  if (goog.global.CLOSURE_LOAD_FILE_SYNC) {
    return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
  }
  try {
    var b = new goog.global.XMLHttpRequest;
    b.open("get", a, !1);
    b.send();
    return 0 == b.status || 200 == b.status ? b.responseText : null;
  } catch (c) {
    return null;
  }
};
goog.retrieveAndExec_ = function(a, b, c) {
  if (!COMPILED) {
    var d = a;
    a = goog.normalizePath_(a);
    var e = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_, f = goog.loadFileSync_(a);
    if (null == f) {
      throw Error('Load of "' + a + '" failed');
    }
    c && (f = goog.transpile_.call(goog.global, f, a));
    f = b ? goog.wrapModule_(a, f) : f + ("\n//# sourceURL=" + a);
    goog.IS_OLD_IE_ ? (goog.dependencies_.deferred[d] = f, goog.queuedModules_.push(d)) : e(a, f);
  }
};
goog.transpile_ = function(a, b) {
  var c = goog.global.$jscomp;
  c || (goog.global.$jscomp = c = {});
  var d = c.transpile;
  if (!d) {
    var e = goog.basePath + goog.TRANSPILER, f = goog.loadFileSync_(e);
    f && (eval(f + "\n//# sourceURL=" + e), c = goog.global.$jscomp, d = c.transpile);
  }
  d || (d = c.transpile = function(a, b) {
    goog.logToConsole_(b + " requires transpilation but no transpiler was found.");
    return a;
  });
  return d(a, b);
};
goog.typeOf = function(a) {
  var b = typeof a;
  if ("object" == b) {
    if (a) {
      if (a instanceof Array) {
        return "array";
      }
      if (a instanceof Object) {
        return b;
      }
      var c = Object.prototype.toString.call(a);
      if ("[object Window]" == c) {
        return "object";
      }
      if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return "array";
      }
      if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if ("function" == b && "undefined" == typeof a.call) {
      return "object";
    }
  }
  return b;
};
goog.isNull = function(a) {
  return null === a;
};
goog.isDefAndNotNull = function(a) {
  return null != a;
};
goog.isArray = function(a) {
  return "array" == goog.typeOf(a);
};
goog.isArrayLike = function(a) {
  var b = goog.typeOf(a);
  return "array" == b || "object" == b && "number" == typeof a.length;
};
goog.isDateLike = function(a) {
  return goog.isObject(a) && "function" == typeof a.getFullYear;
};
goog.isString = function(a) {
  return "string" == typeof a;
};
goog.isBoolean = function(a) {
  return "boolean" == typeof a;
};
goog.isNumber = function(a) {
  return "number" == typeof a;
};
goog.isFunction = function(a) {
  return "function" == goog.typeOf(a);
};
goog.isObject = function(a) {
  var b = typeof a;
  return "object" == b && null != a || "function" == b;
};
goog.getUid = function(a) {
  return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function(a) {
  return !!a[goog.UID_PROPERTY_];
};
goog.removeUid = function(a) {
  null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_];
  } catch (b) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1e9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
  var b = goog.typeOf(a);
  if ("object" == b || "array" == b) {
    if (a.clone) {
      return a.clone();
    }
    var b = "array" == b ? [] : {}, c;
    for (c in a) {
      b[c] = goog.cloneObject(a[c]);
    }
    return b;
  }
  return a;
};
goog.bindNative_ = function(a, b, c) {
  return a.call.apply(a.bind, arguments);
};
goog.bindJs_ = function(a, b, c) {
  if (!a) {
    throw Error();
  }
  if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c);
    };
  }
  return function() {
    return a.apply(b, arguments);
  };
};
goog.bind = function(a, b, c) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
  return goog.bind.apply(null, arguments);
};
goog.partial = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = c.slice();
    b.push.apply(b, arguments);
    return a.apply(this, b);
  };
};
goog.mixin = function(a, b) {
  for (var c in b) {
    a[c] = b[c];
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return +new Date;
};
goog.globalEval = function(a) {
  if (goog.global.execScript) {
    goog.global.execScript(a, "JavaScript");
  } else {
    if (goog.global.eval) {
      if (null == goog.evalWorksForGlobals_) {
        if (goog.global.eval("var _evalTest_ = 1;"), "undefined" != typeof goog.global._evalTest_) {
          try {
            delete goog.global._evalTest_;
          } catch (d) {
          }
          goog.evalWorksForGlobals_ = !0;
        } else {
          goog.evalWorksForGlobals_ = !1;
        }
      }
      if (goog.evalWorksForGlobals_) {
        goog.global.eval(a);
      } else {
        var b = goog.global.document, c = b.createElement("SCRIPT");
        c.type = "text/javascript";
        c.defer = !1;
        c.appendChild(b.createTextNode(a));
        b.body.appendChild(c);
        b.body.removeChild(c);
      }
    } else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
  if ("." == String(a).charAt(0)) {
    throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + a);
  }
  var c = function(a) {
    return goog.cssNameMapping_[a] || a;
  }, d = function(a) {
    a = a.split("-");
    for (var b = [], d = 0; d < a.length; d++) {
      b.push(c(a[d]));
    }
    return b.join("-");
  }, d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(a) {
    return a;
  }, d = b ? a + "-" + d(b) : d(a);
  return goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN(d) : d;
};
goog.setCssNameMapping = function(a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b;
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
  b && (a = a.replace(/\{\$([^}]+)}/g, function(a, d) {
    return null != b && d in b ? b[d] : a;
  }));
  return a;
};
goog.getMsgWithFallback = function(a, b) {
  return a;
};
goog.exportSymbol = function(a, b, c) {
  goog.exportPath_(a, b, c);
};
goog.exportProperty = function(a, b, c) {
  a[b] = c;
};
goog.inherits = function(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a;
  a.base = function(a, c, f) {
    for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++) {
      d[e - 2] = arguments[e];
    }
    return b.prototype[c].apply(a, d);
  };
};
goog.base = function(a, b, c) {
  var d = arguments.callee.caller;
  if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !d) {
    throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
  }
  if (d.superClass_) {
    for (var e = Array(arguments.length - 1), f = 1; f < arguments.length; f++) {
      e[f - 1] = arguments[f];
    }
    return d.superClass_.constructor.apply(a, e);
  }
  e = Array(arguments.length - 2);
  for (f = 2; f < arguments.length; f++) {
    e[f - 2] = arguments[f];
  }
  for (var f = !1, g = a.constructor; g; g = g.superClass_ && g.superClass_.constructor) {
    if (g.prototype[b] === d) {
      f = !0;
    } else {
      if (f) {
        return g.prototype[b].apply(a, e);
      }
    }
  }
  if (a[b] === d) {
    return a.constructor.prototype[b].apply(a, e);
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
  if (goog.isInModuleLoader_()) {
    throw Error("goog.scope is not supported within a goog.module.");
  }
  a.call(goog.global);
};
COMPILED || (goog.global.COMPILED = COMPILED);
goog.defineClass = function(a, b) {
  var c = b.constructor, d = b.statics;
  c && c != Object.prototype.constructor || (c = function() {
    throw Error("cannot instantiate an interface (no constructor defined).");
  });
  c = goog.defineClass.createSealingConstructor_(c, a);
  a && goog.inherits(c, a);
  delete b.constructor;
  delete b.statics;
  goog.defineClass.applyProperties_(c.prototype, b);
  null != d && (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
  return c;
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function(a, b) {
  if (!goog.defineClass.SEAL_CLASS_INSTANCES) {
    return a;
  }
  var c = !goog.defineClass.isUnsealable_(b), d = function() {
    var b = a.apply(this, arguments) || this;
    b[goog.UID_PROPERTY_] = b[goog.UID_PROPERTY_];
    this.constructor === d && c && Object.seal instanceof Function && Object.seal(b);
    return b;
  };
  return d;
};
goog.defineClass.isUnsealable_ = function(a) {
  return a && a.prototype && a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_];
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function(a, b) {
  for (var c in b) {
    Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
  }
  for (var d = 0; d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; d++) {
    c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d], Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
  }
};
goog.tagUnsealableClass = function(a) {
  !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0);
};
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
var grpc = {web:{}};
grpc.web.AbstractClientBase = function() {
};
grpc.web.AbstractClientBase.MethodInfo = function(a, b, c) {
  this.responseType = a;
  this.requestSerializeFn = b;
  this.responseDeserializeFn = c;
};
grpc.web.AbstractClientBase.prototype.rpcCall = goog.abstractMethod;
grpc.web.AbstractClientBase.prototype.serverStreaming = goog.abstractMethod;
goog.Thenable = function() {
};
goog.Thenable.prototype.then = function(a, b, c) {
};
goog.Thenable.IMPLEMENTED_BY_PROP = "$goog_Thenable";
goog.Thenable.addImplementation = function(a) {
  goog.exportProperty(a.prototype, "then", a.prototype.then);
  COMPILED ? a.prototype[goog.Thenable.IMPLEMENTED_BY_PROP] = !0 : a.prototype.$goog_Thenable = !0;
};
goog.Thenable.isImplementedBy = function(a) {
  if (!a) {
    return !1;
  }
  try {
    return COMPILED ? !!a[goog.Thenable.IMPLEMENTED_BY_PROP] : !!a.$goog_Thenable;
  } catch (b) {
    return !1;
  }
};
goog.debug = {};
goog.debug.Error = function(a) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, goog.debug.Error);
  } else {
    var b = Error().stack;
    b && (this.stack = b);
  }
  a && (this.message = String(a));
  this.reportErrorToServer = !0;
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.dom = {};
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.string = {};
goog.string.DETECT_DOUBLE_ESCAPING = !1;
goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(a, b) {
  return 0 == a.lastIndexOf(b, 0);
};
goog.string.endsWith = function(a, b) {
  var c = a.length - b.length;
  return 0 <= c && a.indexOf(b, c) == c;
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length));
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length));
};
goog.string.caseInsensitiveEquals = function(a, b) {
  return a.toLowerCase() == b.toLowerCase();
};
goog.string.subs = function(a, b) {
  for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) {
    d += c.shift() + e.shift();
  }
  return d + c.join("%s");
};
goog.string.collapseWhitespace = function(a) {
  return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
goog.string.isEmptyOrWhitespace = function(a) {
  return /^[\s\xa0]*$/.test(a);
};
goog.string.isEmptyString = function(a) {
  return 0 == a.length;
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function(a) {
  return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a));
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function(a) {
  return !/[^\t\n\r ]/.test(a);
};
goog.string.isAlpha = function(a) {
  return !/[^a-zA-Z]/.test(a);
};
goog.string.isNumeric = function(a) {
  return !/[^0-9]/.test(a);
};
goog.string.isAlphaNumeric = function(a) {
  return !/[^a-zA-Z0-9]/.test(a);
};
goog.string.isSpace = function(a) {
  return " " == a;
};
goog.string.isUnicodeChar = function(a) {
  return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a;
};
goog.string.stripNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)+/g, " ");
};
goog.string.canonicalizeNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)/g, "\n");
};
goog.string.normalizeWhitespace = function(a) {
  return a.replace(/\xa0|\s/g, " ");
};
goog.string.normalizeSpaces = function(a) {
  return a.replace(/\xa0|[ \t]+/g, " ");
};
goog.string.collapseBreakingSpaces = function(a) {
  return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(a) {
  return a.trim();
} : function(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
};
goog.string.trimLeft = function(a) {
  return a.replace(/^[\s\xa0]+/, "");
};
goog.string.trimRight = function(a) {
  return a.replace(/[\s\xa0]+$/, "");
};
goog.string.caseInsensitiveCompare = function(a, b) {
  var c = String(a).toLowerCase(), d = String(b).toLowerCase();
  return c < d ? -1 : c == d ? 0 : 1;
};
goog.string.numberAwareCompare_ = function(a, b, c) {
  if (a == b) {
    return 0;
  }
  if (!a) {
    return -1;
  }
  if (!b) {
    return 1;
  }
  for (var d = a.toLowerCase().match(c), e = b.toLowerCase().match(c), f = Math.min(d.length, e.length), g = 0; g < f; g++) {
    c = d[g];
    var h = e[g];
    if (c != h) {
      return a = parseInt(c, 10), !isNaN(a) && (b = parseInt(h, 10), !isNaN(b) && a - b) ? a - b : c < h ? -1 : 1;
    }
  }
  return d.length != e.length ? d.length - e.length : a < b ? -1 : 1;
};
goog.string.intAwareCompare = function(a, b) {
  return goog.string.numberAwareCompare_(a, b, /\d+|\D+/g);
};
goog.string.floatAwareCompare = function(a, b) {
  return goog.string.numberAwareCompare_(a, b, /\d+|\.\d+|\D+/g);
};
goog.string.numerateCompare = goog.string.floatAwareCompare;
goog.string.urlEncode = function(a) {
  return encodeURIComponent(String(a));
};
goog.string.urlDecode = function(a) {
  return decodeURIComponent(a.replace(/\+/g, " "));
};
goog.string.newLineToBr = function(a, b) {
  return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>");
};
goog.string.htmlEscape = function(a, b) {
  if (b) {
    a = a.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), goog.string.DETECT_DOUBLE_ESCAPING && (a = a.replace(goog.string.E_RE_, "&#101;"));
  } else {
    if (!goog.string.ALL_RE_.test(a)) {
      return a;
    }
    -1 != a.indexOf("&") && (a = a.replace(goog.string.AMP_RE_, "&amp;"));
    -1 != a.indexOf("<") && (a = a.replace(goog.string.LT_RE_, "&lt;"));
    -1 != a.indexOf(">") && (a = a.replace(goog.string.GT_RE_, "&gt;"));
    -1 != a.indexOf('"') && (a = a.replace(goog.string.QUOT_RE_, "&quot;"));
    -1 != a.indexOf("'") && (a = a.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;"));
    -1 != a.indexOf("\x00") && (a = a.replace(goog.string.NULL_RE_, "&#0;"));
    goog.string.DETECT_DOUBLE_ESCAPING && -1 != a.indexOf("e") && (a = a.replace(goog.string.E_RE_, "&#101;"));
  }
  return a;
};
goog.string.AMP_RE_ = /&/g;
goog.string.LT_RE_ = /</g;
goog.string.GT_RE_ = />/g;
goog.string.QUOT_RE_ = /"/g;
goog.string.SINGLE_QUOTE_RE_ = /'/g;
goog.string.NULL_RE_ = /\x00/g;
goog.string.E_RE_ = /e/g;
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
goog.string.unescapeEntities = function(a) {
  return goog.string.contains(a, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a;
};
goog.string.unescapeEntitiesWithDocument = function(a, b) {
  return goog.string.contains(a, "&") ? goog.string.unescapeEntitiesUsingDom_(a, b) : a;
};
goog.string.unescapeEntitiesUsingDom_ = function(a, b) {
  var c = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'};
  var d = b ? b.createElement("div") : goog.global.document.createElement("div");
  return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, b) {
    var e = c[a];
    if (e) {
      return e;
    }
    if ("#" == b.charAt(0)) {
      var f = Number("0" + b.substr(1));
      isNaN(f) || (e = String.fromCharCode(f));
    }
    e || (d.innerHTML = a + " ", e = d.firstChild.nodeValue.slice(0, -1));
    return c[a] = e;
  });
};
goog.string.unescapePureXmlEntities_ = function(a) {
  return a.replace(/&([^;]+);/g, function(a, c) {
    switch(c) {
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      case "quot":
        return '"';
      default:
        if ("#" == c.charAt(0)) {
          var b = Number("0" + c.substr(1));
          if (!isNaN(b)) {
            return String.fromCharCode(b);
          }
        }
        return a;
    }
  });
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(a, b) {
  return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b);
};
goog.string.preserveSpaces = function(a) {
  return a.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
};
goog.string.stripQuotes = function(a, b) {
  for (var c = b.length, d = 0; d < c; d++) {
    var e = 1 == c ? b : b.charAt(d);
    if (a.charAt(0) == e && a.charAt(a.length - 1) == e) {
      return a.substring(1, a.length - 1);
    }
  }
  return a;
};
goog.string.truncate = function(a, b, c) {
  c && (a = goog.string.unescapeEntities(a));
  a.length > b && (a = a.substring(0, b - 3) + "...");
  c && (a = goog.string.htmlEscape(a));
  return a;
};
goog.string.truncateMiddle = function(a, b, c, d) {
  c && (a = goog.string.unescapeEntities(a));
  if (d && a.length > b) {
    d > b && (d = b);
    var e = a.length - d;
    a = a.substring(0, b - d) + "..." + a.substring(e);
  } else {
    a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e));
  }
  c && (a = goog.string.htmlEscape(a));
  return a;
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\", "<":"<"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(a) {
  a = String(a);
  for (var b = ['"'], c = 0; c < a.length; c++) {
    var d = a.charAt(c), e = d.charCodeAt(0);
    b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d));
  }
  b.push('"');
  return b.join("");
};
goog.string.escapeString = function(a) {
  for (var b = [], c = 0; c < a.length; c++) {
    b[c] = goog.string.escapeChar(a.charAt(c));
  }
  return b.join("");
};
goog.string.escapeChar = function(a) {
  if (a in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[a];
  }
  if (a in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a];
  }
  var b = a.charCodeAt(0);
  if (31 < b && 127 > b) {
    var c = a;
  } else {
    if (256 > b) {
      if (c = "\\x", 16 > b || 256 < b) {
        c += "0";
      }
    } else {
      c = "\\u", 4096 > b && (c += "0");
    }
    c += b.toString(16).toUpperCase();
  }
  return goog.string.jsEscapeCache_[a] = c;
};
goog.string.contains = function(a, b) {
  return -1 != a.indexOf(b);
};
goog.string.caseInsensitiveContains = function(a, b) {
  return goog.string.contains(a.toLowerCase(), b.toLowerCase());
};
goog.string.countOf = function(a, b) {
  return a && b ? a.split(b).length - 1 : 0;
};
goog.string.removeAt = function(a, b, c) {
  var d = a;
  0 <= b && b < a.length && 0 < c && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
  return d;
};
goog.string.remove = function(a, b) {
  var c = new RegExp(goog.string.regExpEscape(b), "");
  return a.replace(c, "");
};
goog.string.removeAll = function(a, b) {
  var c = new RegExp(goog.string.regExpEscape(b), "g");
  return a.replace(c, "");
};
goog.string.regExpEscape = function(a) {
  return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
goog.string.repeat = String.prototype.repeat ? function(a, b) {
  return a.repeat(b);
} : function(a, b) {
  return Array(b + 1).join(a);
};
goog.string.padNumber = function(a, b, c) {
  a = goog.isDef(c) ? a.toFixed(c) : String(a);
  c = a.indexOf(".");
  -1 == c && (c = a.length);
  return goog.string.repeat("0", Math.max(0, b - c)) + a;
};
goog.string.makeSafe = function(a) {
  return null == a ? "" : String(a);
};
goog.string.buildString = function(a) {
  return Array.prototype.join.call(arguments, "");
};
goog.string.getRandomString = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36);
};
goog.string.compareVersions = function(a, b) {
  for (var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0; 0 == c && g < f; g++) {
    var h = d[g] || "", k = e[g] || "";
    do {
      h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
      k = /(\d*)(\D*)(.*)/.exec(k) || ["", "", "", ""];
      if (0 == h[0].length && 0 == k[0].length) {
        break;
      }
      var c = 0 == h[1].length ? 0 : parseInt(h[1], 10), n = 0 == k[1].length ? 0 : parseInt(k[1], 10), c = goog.string.compareElements_(c, n) || goog.string.compareElements_(0 == h[2].length, 0 == k[2].length) || goog.string.compareElements_(h[2], k[2]), h = h[3], k = k[3];
    } while (0 == c);
  }
  return c;
};
goog.string.compareElements_ = function(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
};
goog.string.hashCode = function(a) {
  for (var b = 0, c = 0; c < a.length; ++c) {
    b = 31 * b + a.charCodeAt(c) >>> 0;
  }
  return b;
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
  return "goog_" + goog.string.uniqueStringCounter_++;
};
goog.string.toNumber = function(a) {
  var b = Number(a);
  return 0 == b && goog.string.isEmptyOrWhitespace(a) ? NaN : b;
};
goog.string.isLowerCamelCase = function(a) {
  return /^[a-z]+([A-Z][a-z]*)*$/.test(a);
};
goog.string.isUpperCamelCase = function(a) {
  return /^([A-Z][a-z]*)+$/.test(a);
};
goog.string.toCamelCase = function(a) {
  return String(a).replace(/\-([a-z])/g, function(a, c) {
    return c.toUpperCase();
  });
};
goog.string.toSelectorCase = function(a) {
  return String(a).replace(/([A-Z])/g, "-$1").toLowerCase();
};
goog.string.toTitleCase = function(a, b) {
  var c = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
  return a.replace(new RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
    return b + c.toUpperCase();
  });
};
goog.string.capitalize = function(a) {
  return String(a.charAt(0)).toUpperCase() + String(a.substr(1)).toLowerCase();
};
goog.string.parseInt = function(a) {
  isFinite(a) && (a = String(a));
  return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN;
};
goog.string.splitLimit = function(a, b, c) {
  a = a.split(b);
  for (var d = []; 0 < c && a.length;) {
    d.push(a.shift()), c--;
  }
  a.length && d.push(a.join(b));
  return d;
};
goog.string.lastComponent = function(a, b) {
  if (b) {
    "string" == typeof b && (b = [b]);
  } else {
    return a;
  }
  for (var c = -1, d = 0; d < b.length; d++) {
    if ("" != b[d]) {
      var e = a.lastIndexOf(b[d]);
      e > c && (c = e);
    }
  }
  return -1 == c ? a : a.slice(c + 1);
};
goog.string.editDistance = function(a, b) {
  var c = [], d = [];
  if (a == b) {
    return 0;
  }
  if (!a.length || !b.length) {
    return Math.max(a.length, b.length);
  }
  for (var e = 0; e < b.length + 1; e++) {
    c[e] = e;
  }
  for (e = 0; e < a.length; e++) {
    d[0] = e + 1;
    for (var f = 0; f < b.length; f++) {
      d[f + 1] = Math.min(d[f] + 1, c[f + 1] + 1, c[f] + Number(a[e] != b[f]));
    }
    for (f = 0; f < c.length; f++) {
      c[f] = d[f];
    }
  }
  return d[b.length];
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
  b.unshift(a);
  goog.debug.Error.call(this, goog.string.subs.apply(null, b));
  b.shift();
  this.messagePattern = a;
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function(a) {
  throw a;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
  var e = "Assertion failed";
  if (c) {
    e += ": " + c;
    var f = d;
  } else {
    a && (e += ": " + a, f = b);
  }
  a = new goog.asserts.AssertionError("" + e, f || []);
  goog.asserts.errorHandler_(a);
};
goog.asserts.setErrorHandler = function(a) {
  goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = a);
};
goog.asserts.assert = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.fail = function(a, b) {
  goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)));
};
goog.asserts.assertNumber = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertString = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertFunction = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertObject = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertArray = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertBoolean = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertElement = function(a, b, c) {
  !goog.asserts.ENABLE_ASSERTS || goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertInstanceof = function(a, b, c, d) {
  !goog.asserts.ENABLE_ASSERTS || a instanceof b || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(b), goog.asserts.getType_(a)], c, Array.prototype.slice.call(arguments, 3));
  return a;
};
goog.asserts.assertObjectPrototypeIsIntact = function() {
  for (var a in Object.prototype) {
    goog.asserts.fail(a + " should not be enumerable in Object.prototype.");
  }
};
goog.asserts.getType_ = function(a) {
  return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a;
};
goog.async = {};
goog.async.FreeList = function(a, b, c) {
  this.limit_ = c;
  this.create_ = a;
  this.reset_ = b;
  this.occupants_ = 0;
  this.head_ = null;
};
goog.async.FreeList.prototype.get = function() {
  if (0 < this.occupants_) {
    this.occupants_--;
    var a = this.head_;
    this.head_ = a.next;
    a.next = null;
  } else {
    a = this.create_();
  }
  return a;
};
goog.async.FreeList.prototype.put = function(a) {
  this.reset_(a);
  this.occupants_ < this.limit_ && (this.occupants_++, a.next = this.head_, this.head_ = a);
};
goog.async.FreeList.prototype.occupants = function() {
  return this.occupants_;
};
goog.async.WorkQueue = function() {
  this.workTail_ = this.workHead_ = null;
};
goog.async.WorkQueue.DEFAULT_MAX_UNUSED = 100;
goog.async.WorkQueue.freelist_ = new goog.async.FreeList(function() {
  return new goog.async.WorkItem;
}, function(a) {
  a.reset();
}, goog.async.WorkQueue.DEFAULT_MAX_UNUSED);
goog.async.WorkQueue.prototype.add = function(a, b) {
  var c = this.getUnusedItem_();
  c.set(a, b);
  this.workTail_ ? this.workTail_.next = c : (goog.asserts.assert(!this.workHead_), this.workHead_ = c);
  this.workTail_ = c;
};
goog.async.WorkQueue.prototype.remove = function() {
  var a = null;
  this.workHead_ && (a = this.workHead_, this.workHead_ = this.workHead_.next, this.workHead_ || (this.workTail_ = null), a.next = null);
  return a;
};
goog.async.WorkQueue.prototype.returnUnused = function(a) {
  goog.async.WorkQueue.freelist_.put(a);
};
goog.async.WorkQueue.prototype.getUnusedItem_ = function() {
  return goog.async.WorkQueue.freelist_.get();
};
goog.async.WorkItem = function() {
  this.next = this.scope = this.fn = null;
};
goog.async.WorkItem.prototype.set = function(a, b) {
  this.fn = a;
  this.scope = b;
  this.next = null;
};
goog.async.WorkItem.prototype.reset = function() {
  this.next = this.scope = this.fn = null;
};
goog.debug.entryPointRegistry = {};
goog.debug.EntryPointMonitor = function() {
};
goog.debug.entryPointRegistry.refList_ = [];
goog.debug.entryPointRegistry.monitors_ = [];
goog.debug.entryPointRegistry.monitorsMayExist_ = !1;
goog.debug.entryPointRegistry.register = function(a) {
  goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = a;
  if (goog.debug.entryPointRegistry.monitorsMayExist_) {
    for (var b = goog.debug.entryPointRegistry.monitors_, c = 0; c < b.length; c++) {
      a(goog.bind(b[c].wrap, b[c]));
    }
  }
};
goog.debug.entryPointRegistry.monitorAll = function(a) {
  goog.debug.entryPointRegistry.monitorsMayExist_ = !0;
  for (var b = goog.bind(a.wrap, a), c = 0; c < goog.debug.entryPointRegistry.refList_.length; c++) {
    goog.debug.entryPointRegistry.refList_[c](b);
  }
  goog.debug.entryPointRegistry.monitors_.push(a);
};
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(a) {
  var b = goog.debug.entryPointRegistry.monitors_;
  goog.asserts.assert(a == b[b.length - 1], "Only the most recent monitor can be unwrapped.");
  a = goog.bind(a.unwrap, a);
  for (var c = 0; c < goog.debug.entryPointRegistry.refList_.length; c++) {
    goog.debug.entryPointRegistry.refList_[c](a);
  }
  b.length--;
};
goog.dom.TagName = function(a) {
  this.tagName_ = a;
};
goog.dom.TagName.prototype.toString = function() {
  return this.tagName_;
};
goog.dom.TagName.A = new goog.dom.TagName("A");
goog.dom.TagName.ABBR = new goog.dom.TagName("ABBR");
goog.dom.TagName.ACRONYM = new goog.dom.TagName("ACRONYM");
goog.dom.TagName.ADDRESS = new goog.dom.TagName("ADDRESS");
goog.dom.TagName.APPLET = new goog.dom.TagName("APPLET");
goog.dom.TagName.AREA = new goog.dom.TagName("AREA");
goog.dom.TagName.ARTICLE = new goog.dom.TagName("ARTICLE");
goog.dom.TagName.ASIDE = new goog.dom.TagName("ASIDE");
goog.dom.TagName.AUDIO = new goog.dom.TagName("AUDIO");
goog.dom.TagName.B = new goog.dom.TagName("B");
goog.dom.TagName.BASE = new goog.dom.TagName("BASE");
goog.dom.TagName.BASEFONT = new goog.dom.TagName("BASEFONT");
goog.dom.TagName.BDI = new goog.dom.TagName("BDI");
goog.dom.TagName.BDO = new goog.dom.TagName("BDO");
goog.dom.TagName.BIG = new goog.dom.TagName("BIG");
goog.dom.TagName.BLOCKQUOTE = new goog.dom.TagName("BLOCKQUOTE");
goog.dom.TagName.BODY = new goog.dom.TagName("BODY");
goog.dom.TagName.BR = new goog.dom.TagName("BR");
goog.dom.TagName.BUTTON = new goog.dom.TagName("BUTTON");
goog.dom.TagName.CANVAS = new goog.dom.TagName("CANVAS");
goog.dom.TagName.CAPTION = new goog.dom.TagName("CAPTION");
goog.dom.TagName.CENTER = new goog.dom.TagName("CENTER");
goog.dom.TagName.CITE = new goog.dom.TagName("CITE");
goog.dom.TagName.CODE = new goog.dom.TagName("CODE");
goog.dom.TagName.COL = new goog.dom.TagName("COL");
goog.dom.TagName.COLGROUP = new goog.dom.TagName("COLGROUP");
goog.dom.TagName.COMMAND = new goog.dom.TagName("COMMAND");
goog.dom.TagName.DATA = new goog.dom.TagName("DATA");
goog.dom.TagName.DATALIST = new goog.dom.TagName("DATALIST");
goog.dom.TagName.DD = new goog.dom.TagName("DD");
goog.dom.TagName.DEL = new goog.dom.TagName("DEL");
goog.dom.TagName.DETAILS = new goog.dom.TagName("DETAILS");
goog.dom.TagName.DFN = new goog.dom.TagName("DFN");
goog.dom.TagName.DIALOG = new goog.dom.TagName("DIALOG");
goog.dom.TagName.DIR = new goog.dom.TagName("DIR");
goog.dom.TagName.DIV = new goog.dom.TagName("DIV");
goog.dom.TagName.DL = new goog.dom.TagName("DL");
goog.dom.TagName.DT = new goog.dom.TagName("DT");
goog.dom.TagName.EM = new goog.dom.TagName("EM");
goog.dom.TagName.EMBED = new goog.dom.TagName("EMBED");
goog.dom.TagName.FIELDSET = new goog.dom.TagName("FIELDSET");
goog.dom.TagName.FIGCAPTION = new goog.dom.TagName("FIGCAPTION");
goog.dom.TagName.FIGURE = new goog.dom.TagName("FIGURE");
goog.dom.TagName.FONT = new goog.dom.TagName("FONT");
goog.dom.TagName.FOOTER = new goog.dom.TagName("FOOTER");
goog.dom.TagName.FORM = new goog.dom.TagName("FORM");
goog.dom.TagName.FRAME = new goog.dom.TagName("FRAME");
goog.dom.TagName.FRAMESET = new goog.dom.TagName("FRAMESET");
goog.dom.TagName.H1 = new goog.dom.TagName("H1");
goog.dom.TagName.H2 = new goog.dom.TagName("H2");
goog.dom.TagName.H3 = new goog.dom.TagName("H3");
goog.dom.TagName.H4 = new goog.dom.TagName("H4");
goog.dom.TagName.H5 = new goog.dom.TagName("H5");
goog.dom.TagName.H6 = new goog.dom.TagName("H6");
goog.dom.TagName.HEAD = new goog.dom.TagName("HEAD");
goog.dom.TagName.HEADER = new goog.dom.TagName("HEADER");
goog.dom.TagName.HGROUP = new goog.dom.TagName("HGROUP");
goog.dom.TagName.HR = new goog.dom.TagName("HR");
goog.dom.TagName.HTML = new goog.dom.TagName("HTML");
goog.dom.TagName.I = new goog.dom.TagName("I");
goog.dom.TagName.IFRAME = new goog.dom.TagName("IFRAME");
goog.dom.TagName.IMG = new goog.dom.TagName("IMG");
goog.dom.TagName.INPUT = new goog.dom.TagName("INPUT");
goog.dom.TagName.INS = new goog.dom.TagName("INS");
goog.dom.TagName.ISINDEX = new goog.dom.TagName("ISINDEX");
goog.dom.TagName.KBD = new goog.dom.TagName("KBD");
goog.dom.TagName.KEYGEN = new goog.dom.TagName("KEYGEN");
goog.dom.TagName.LABEL = new goog.dom.TagName("LABEL");
goog.dom.TagName.LEGEND = new goog.dom.TagName("LEGEND");
goog.dom.TagName.LI = new goog.dom.TagName("LI");
goog.dom.TagName.LINK = new goog.dom.TagName("LINK");
goog.dom.TagName.MAP = new goog.dom.TagName("MAP");
goog.dom.TagName.MARK = new goog.dom.TagName("MARK");
goog.dom.TagName.MATH = new goog.dom.TagName("MATH");
goog.dom.TagName.MENU = new goog.dom.TagName("MENU");
goog.dom.TagName.META = new goog.dom.TagName("META");
goog.dom.TagName.METER = new goog.dom.TagName("METER");
goog.dom.TagName.NAV = new goog.dom.TagName("NAV");
goog.dom.TagName.NOFRAMES = new goog.dom.TagName("NOFRAMES");
goog.dom.TagName.NOSCRIPT = new goog.dom.TagName("NOSCRIPT");
goog.dom.TagName.OBJECT = new goog.dom.TagName("OBJECT");
goog.dom.TagName.OL = new goog.dom.TagName("OL");
goog.dom.TagName.OPTGROUP = new goog.dom.TagName("OPTGROUP");
goog.dom.TagName.OPTION = new goog.dom.TagName("OPTION");
goog.dom.TagName.OUTPUT = new goog.dom.TagName("OUTPUT");
goog.dom.TagName.P = new goog.dom.TagName("P");
goog.dom.TagName.PARAM = new goog.dom.TagName("PARAM");
goog.dom.TagName.PRE = new goog.dom.TagName("PRE");
goog.dom.TagName.PROGRESS = new goog.dom.TagName("PROGRESS");
goog.dom.TagName.Q = new goog.dom.TagName("Q");
goog.dom.TagName.RP = new goog.dom.TagName("RP");
goog.dom.TagName.RT = new goog.dom.TagName("RT");
goog.dom.TagName.RUBY = new goog.dom.TagName("RUBY");
goog.dom.TagName.S = new goog.dom.TagName("S");
goog.dom.TagName.SAMP = new goog.dom.TagName("SAMP");
goog.dom.TagName.SCRIPT = new goog.dom.TagName("SCRIPT");
goog.dom.TagName.SECTION = new goog.dom.TagName("SECTION");
goog.dom.TagName.SELECT = new goog.dom.TagName("SELECT");
goog.dom.TagName.SMALL = new goog.dom.TagName("SMALL");
goog.dom.TagName.SOURCE = new goog.dom.TagName("SOURCE");
goog.dom.TagName.SPAN = new goog.dom.TagName("SPAN");
goog.dom.TagName.STRIKE = new goog.dom.TagName("STRIKE");
goog.dom.TagName.STRONG = new goog.dom.TagName("STRONG");
goog.dom.TagName.STYLE = new goog.dom.TagName("STYLE");
goog.dom.TagName.SUB = new goog.dom.TagName("SUB");
goog.dom.TagName.SUMMARY = new goog.dom.TagName("SUMMARY");
goog.dom.TagName.SUP = new goog.dom.TagName("SUP");
goog.dom.TagName.SVG = new goog.dom.TagName("SVG");
goog.dom.TagName.TABLE = new goog.dom.TagName("TABLE");
goog.dom.TagName.TBODY = new goog.dom.TagName("TBODY");
goog.dom.TagName.TD = new goog.dom.TagName("TD");
goog.dom.TagName.TEMPLATE = new goog.dom.TagName("TEMPLATE");
goog.dom.TagName.TEXTAREA = new goog.dom.TagName("TEXTAREA");
goog.dom.TagName.TFOOT = new goog.dom.TagName("TFOOT");
goog.dom.TagName.TH = new goog.dom.TagName("TH");
goog.dom.TagName.THEAD = new goog.dom.TagName("THEAD");
goog.dom.TagName.TIME = new goog.dom.TagName("TIME");
goog.dom.TagName.TITLE = new goog.dom.TagName("TITLE");
goog.dom.TagName.TR = new goog.dom.TagName("TR");
goog.dom.TagName.TRACK = new goog.dom.TagName("TRACK");
goog.dom.TagName.TT = new goog.dom.TagName("TT");
goog.dom.TagName.U = new goog.dom.TagName("U");
goog.dom.TagName.UL = new goog.dom.TagName("UL");
goog.dom.TagName.VAR = new goog.dom.TagName("VAR");
goog.dom.TagName.VIDEO = new goog.dom.TagName("VIDEO");
goog.dom.TagName.WBR = new goog.dom.TagName("WBR");
goog.functions = {};
goog.functions.constant = function(a) {
  return function() {
    return a;
  };
};
goog.functions.FALSE = goog.functions.constant(!1);
goog.functions.TRUE = goog.functions.constant(!0);
goog.functions.NULL = goog.functions.constant(null);
goog.functions.identity = function(a, b) {
  return a;
};
goog.functions.error = function(a) {
  return function() {
    throw Error(a);
  };
};
goog.functions.fail = function(a) {
  return function() {
    throw a;
  };
};
goog.functions.lock = function(a, b) {
  b = b || 0;
  return function() {
    return a.apply(this, Array.prototype.slice.call(arguments, 0, b));
  };
};
goog.functions.nth = function(a) {
  return function() {
    return arguments[a];
  };
};
goog.functions.partialRight = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = Array.prototype.slice.call(arguments);
    b.push.apply(b, c);
    return a.apply(this, b);
  };
};
goog.functions.withReturnValue = function(a, b) {
  return goog.functions.sequence(a, goog.functions.constant(b));
};
goog.functions.equalTo = function(a, b) {
  return function(c) {
    return b ? a == c : a === c;
  };
};
goog.functions.compose = function(a, b) {
  var c = arguments, d = c.length;
  return function() {
    var a;
    d && (a = c[d - 1].apply(this, arguments));
    for (var b = d - 2; 0 <= b; b--) {
      a = c[b].call(this, a);
    }
    return a;
  };
};
goog.functions.sequence = function(a) {
  var b = arguments, c = b.length;
  return function() {
    for (var a, e = 0; e < c; e++) {
      a = b[e].apply(this, arguments);
    }
    return a;
  };
};
goog.functions.and = function(a) {
  var b = arguments, c = b.length;
  return function() {
    for (var a = 0; a < c; a++) {
      if (!b[a].apply(this, arguments)) {
        return !1;
      }
    }
    return !0;
  };
};
goog.functions.or = function(a) {
  var b = arguments, c = b.length;
  return function() {
    for (var a = 0; a < c; a++) {
      if (b[a].apply(this, arguments)) {
        return !0;
      }
    }
    return !1;
  };
};
goog.functions.not = function(a) {
  return function() {
    return !a.apply(this, arguments);
  };
};
goog.functions.create = function(a, b) {
  var c = function() {
  };
  c.prototype = a.prototype;
  c = new c;
  a.apply(c, Array.prototype.slice.call(arguments, 1));
  return c;
};
goog.functions.CACHE_RETURN_VALUE = !0;
goog.functions.cacheReturnValue = function(a) {
  var b = !1, c;
  return function() {
    if (!goog.functions.CACHE_RETURN_VALUE) {
      return a();
    }
    b || (c = a(), b = !0);
    return c;
  };
};
goog.functions.once = function(a) {
  var b = a;
  return function() {
    if (b) {
      var a = b;
      b = null;
      a();
    }
  };
};
goog.functions.debounce = function(a, b, c) {
  c && (a = goog.bind(a, c));
  var d = null;
  return function(c) {
    goog.global.clearTimeout(d);
    var e = arguments;
    d = goog.global.setTimeout(function() {
      a.apply(null, e);
    }, b);
  };
};
goog.functions.throttle = function(a, b, c) {
  c && (a = goog.bind(a, c));
  var d = null, e = !1, f = [], g = function() {
    d = null;
    e && (e = !1, h());
  }, h = function() {
    d = goog.global.setTimeout(g, b);
    a.apply(null, f);
  };
  return function(a) {
    f = arguments;
    d ? e = !0 : h();
  };
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.ASSUME_NATIVE_FUNCTIONS = !1;
goog.array.peek = function(a) {
  return a[a.length - 1];
};
goog.array.last = goog.array.peek;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.indexOf.call(a, b, c);
} : function(a, b, c) {
  c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if (goog.isString(a)) {
    return goog.isString(b) && 1 == b.length ? a.indexOf(b, c) : -1;
  }
  for (; c < a.length; c++) {
    if (c in a && a[c] === b) {
      return c;
    }
  }
  return -1;
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.lastIndexOf.call(a, b, null == c ? a.length - 1 : c);
} : function(a, b, c) {
  c = null == c ? a.length - 1 : c;
  0 > c && (c = Math.max(0, a.length + c));
  if (goog.isString(a)) {
    return goog.isString(b) && 1 == b.length ? a.lastIndexOf(b, c) : -1;
  }
  for (; 0 <= c; c--) {
    if (c in a && a[c] === b) {
      return c;
    }
  }
  return -1;
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  Array.prototype.forEach.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++) {
    f in e && b.call(c, e[f], f, a);
  }
};
goog.array.forEachRight = function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1; 0 <= d; --d) {
    d in e && b.call(c, e[d], d, a);
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.filter.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0; h < d; h++) {
    if (h in g) {
      var k = g[h];
      b.call(c, k, h, a) && (e[f++] = k);
    }
  }
  return e;
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.map.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0; g < d; g++) {
    g in f && (e[g] = b.call(c, f[g], g, a));
  }
  return e;
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  d && (b = goog.bind(b, d));
  return Array.prototype.reduce.call(a, b, c);
} : function(a, b, c, d) {
  var e = c;
  goog.array.forEach(a, function(c, g) {
    e = b.call(d, e, c, g, a);
  });
  return e;
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  goog.asserts.assert(null != b);
  d && (b = goog.bind(b, d));
  return Array.prototype.reduceRight.call(a, b, c);
} : function(a, b, c, d) {
  var e = c;
  goog.array.forEachRight(a, function(c, g) {
    e = b.call(d, e, c, g, a);
  });
  return e;
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.some.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++) {
    if (f in e && b.call(c, e[f], f, a)) {
      return !0;
    }
  }
  return !1;
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.every.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++) {
    if (f in e && !b.call(c, e[f], f, a)) {
      return !1;
    }
  }
  return !0;
};
goog.array.count = function(a, b, c) {
  var d = 0;
  goog.array.forEach(a, function(a, f, g) {
    b.call(c, a, f, g) && ++d;
  }, c);
  return d;
};
goog.array.find = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b];
};
goog.array.findIndex = function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++) {
    if (f in e && b.call(c, e[f], f, a)) {
      return f;
    }
  }
  return -1;
};
goog.array.findRight = function(a, b, c) {
  b = goog.array.findIndexRight(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b];
};
goog.array.findIndexRight = function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1; 0 <= d; d--) {
    if (d in e && b.call(c, e[d], d, a)) {
      return d;
    }
  }
  return -1;
};
goog.array.contains = function(a, b) {
  return 0 <= goog.array.indexOf(a, b);
};
goog.array.isEmpty = function(a) {
  return 0 == a.length;
};
goog.array.clear = function(a) {
  if (!goog.isArray(a)) {
    for (var b = a.length - 1; 0 <= b; b--) {
      delete a[b];
    }
  }
  a.length = 0;
};
goog.array.insert = function(a, b) {
  goog.array.contains(a, b) || a.push(b);
};
goog.array.insertAt = function(a, b, c) {
  goog.array.splice(a, c, 0, b);
};
goog.array.insertArrayAt = function(a, b, c) {
  goog.partial(goog.array.splice, a, c, 0).apply(null, b);
};
goog.array.insertBefore = function(a, b, c) {
  var d;
  2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d);
};
goog.array.remove = function(a, b) {
  var c = goog.array.indexOf(a, b), d;
  (d = 0 <= c) && goog.array.removeAt(a, c);
  return d;
};
goog.array.removeLast = function(a, b) {
  var c = goog.array.lastIndexOf(a, b);
  return 0 <= c ? (goog.array.removeAt(a, c), !0) : !1;
};
goog.array.removeAt = function(a, b) {
  goog.asserts.assert(null != a.length);
  return 1 == Array.prototype.splice.call(a, b, 1).length;
};
goog.array.removeIf = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1;
};
goog.array.removeAllIf = function(a, b, c) {
  var d = 0;
  goog.array.forEachRight(a, function(e, f) {
    b.call(c, e, f, a) && goog.array.removeAt(a, f) && d++;
  });
  return d;
};
goog.array.concat = function(a) {
  return Array.prototype.concat.apply(Array.prototype, arguments);
};
goog.array.join = function(a) {
  return Array.prototype.concat.apply(Array.prototype, arguments);
};
goog.array.toArray = function(a) {
  var b = a.length;
  if (0 < b) {
    for (var c = Array(b), d = 0; d < b; d++) {
      c[d] = a[d];
    }
    return c;
  }
  return [];
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(a, b) {
  for (var c = 1; c < arguments.length; c++) {
    var d = arguments[c];
    if (goog.isArrayLike(d)) {
      var e = a.length || 0, f = d.length || 0;
      a.length = e + f;
      for (var g = 0; g < f; g++) {
        a[e + g] = d[g];
      }
    } else {
      a.push(d);
    }
  }
};
goog.array.splice = function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.splice.apply(a, goog.array.slice(arguments, 1));
};
goog.array.slice = function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c);
};
goog.array.removeDuplicates = function(a, b, c) {
  b = b || a;
  var d = function(a) {
    return goog.isObject(a) ? "o" + goog.getUid(a) : (typeof a).charAt(0) + a;
  };
  c = c || d;
  for (var d = {}, e = 0, f = 0; f < a.length;) {
    var g = a[f++], h = c(g);
    Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, b[e++] = g);
  }
  b.length = e;
};
goog.array.binarySearch = function(a, b, c) {
  return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b);
};
goog.array.binarySelect = function(a, b, c) {
  return goog.array.binarySearch_(a, b, !0, void 0, c);
};
goog.array.binarySearch_ = function(a, b, c, d, e) {
  for (var f = 0, g = a.length, h; f < g;) {
    var k = f + g >> 1;
    var n = c ? b.call(e, a[k], k, a) : b(d, a[k]);
    0 < n ? f = k + 1 : (g = k, h = !n);
  }
  return h ? f : ~f;
};
goog.array.sort = function(a, b) {
  a.sort(b || goog.array.defaultCompare);
};
goog.array.stableSort = function(a, b) {
  for (var c = Array(a.length), d = 0; d < a.length; d++) {
    c[d] = {index:d, value:a[d]};
  }
  var e = b || goog.array.defaultCompare;
  goog.array.sort(c, function(a, b) {
    return e(a.value, b.value) || a.index - b.index;
  });
  for (d = 0; d < a.length; d++) {
    a[d] = c[d].value;
  }
};
goog.array.sortByKey = function(a, b, c) {
  var d = c || goog.array.defaultCompare;
  goog.array.sort(a, function(a, c) {
    return d(b(a), b(c));
  });
};
goog.array.sortObjectsByKey = function(a, b, c) {
  goog.array.sortByKey(a, function(a) {
    return a[b];
  }, c);
};
goog.array.isSorted = function(a, b, c) {
  b = b || goog.array.defaultCompare;
  for (var d = 1; d < a.length; d++) {
    var e = b(a[d - 1], a[d]);
    if (0 < e || 0 == e && c) {
      return !1;
    }
  }
  return !0;
};
goog.array.equals = function(a, b, c) {
  if (!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) {
    return !1;
  }
  var d = a.length;
  c = c || goog.array.defaultCompareEquality;
  for (var e = 0; e < d; e++) {
    if (!c(a[e], b[e])) {
      return !1;
    }
  }
  return !0;
};
goog.array.compare3 = function(a, b, c) {
  c = c || goog.array.defaultCompare;
  for (var d = Math.min(a.length, b.length), e = 0; e < d; e++) {
    var f = c(a[e], b[e]);
    if (0 != f) {
      return f;
    }
  }
  return goog.array.defaultCompare(a.length, b.length);
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
};
goog.array.inverseDefaultCompare = function(a, b) {
  return -goog.array.defaultCompare(a, b);
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b;
};
goog.array.binaryInsert = function(a, b, c) {
  c = goog.array.binarySearch(a, b, c);
  return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1;
};
goog.array.binaryRemove = function(a, b, c) {
  b = goog.array.binarySearch(a, b, c);
  return 0 <= b ? goog.array.removeAt(a, b) : !1;
};
goog.array.bucket = function(a, b, c) {
  for (var d = {}, e = 0; e < a.length; e++) {
    var f = a[e], g = b.call(c, f, e, a);
    goog.isDef(g) && (d[g] || (d[g] = [])).push(f);
  }
  return d;
};
goog.array.toObject = function(a, b, c) {
  var d = {};
  goog.array.forEach(a, function(e, f) {
    d[b.call(c, e, f, a)] = e;
  });
  return d;
};
goog.array.range = function(a, b, c) {
  var d = [], e = 0, f = a;
  c = c || 1;
  void 0 !== b && (e = a, f = b);
  if (0 > c * (f - e)) {
    return [];
  }
  if (0 < c) {
    for (a = e; a < f; a += c) {
      d.push(a);
    }
  } else {
    for (a = e; a > f; a += c) {
      d.push(a);
    }
  }
  return d;
};
goog.array.repeat = function(a, b) {
  for (var c = [], d = 0; d < b; d++) {
    c[d] = a;
  }
  return c;
};
goog.array.flatten = function(a) {
  for (var b = [], c = 0; c < arguments.length; c++) {
    var d = arguments[c];
    if (goog.isArray(d)) {
      for (var e = 0; e < d.length; e += 8192) {
        for (var f = goog.array.slice(d, e, e + 8192), f = goog.array.flatten.apply(null, f), g = 0; g < f.length; g++) {
          b.push(f[g]);
        }
      }
    } else {
      b.push(d);
    }
  }
  return b;
};
goog.array.rotate = function(a, b) {
  goog.asserts.assert(null != a.length);
  a.length && (b %= a.length, 0 < b ? Array.prototype.unshift.apply(a, a.splice(-b, b)) : 0 > b && Array.prototype.push.apply(a, a.splice(0, -b)));
  return a;
};
goog.array.moveItem = function(a, b, c) {
  goog.asserts.assert(0 <= b && b < a.length);
  goog.asserts.assert(0 <= c && c < a.length);
  b = Array.prototype.splice.call(a, b, 1);
  Array.prototype.splice.call(a, c, 0, b[0]);
};
goog.array.zip = function(a) {
  if (!arguments.length) {
    return [];
  }
  for (var b = [], c = arguments[0].length, d = 1; d < arguments.length; d++) {
    arguments[d].length < c && (c = arguments[d].length);
  }
  for (d = 0; d < c; d++) {
    for (var e = [], f = 0; f < arguments.length; f++) {
      e.push(arguments[f][d]);
    }
    b.push(e);
  }
  return b;
};
goog.array.shuffle = function(a, b) {
  for (var c = b || Math.random, d = a.length - 1; 0 < d; d--) {
    var e = Math.floor(c() * (d + 1)), f = a[d];
    a[d] = a[e];
    a[e] = f;
  }
};
goog.array.copyByIndex = function(a, b) {
  var c = [];
  goog.array.forEach(b, function(b) {
    c.push(a[b]);
  });
  return c;
};
goog.array.concatMap = function(a, b, c) {
  return goog.array.concat.apply([], goog.array.map(a, b, c));
};
goog.labs = {};
goog.labs.userAgent = {};
goog.labs.userAgent.util = {};
goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
  var a = goog.labs.userAgent.util.getNavigator_();
  return a && (a = a.userAgent) ? a : "";
};
goog.labs.userAgent.util.getNavigator_ = function() {
  return goog.global.navigator;
};
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
goog.labs.userAgent.util.setUserAgent = function(a) {
  goog.labs.userAgent.util.userAgent_ = a || goog.labs.userAgent.util.getNativeUserAgentString_();
};
goog.labs.userAgent.util.getUserAgent = function() {
  return goog.labs.userAgent.util.userAgent_;
};
goog.labs.userAgent.util.matchUserAgent = function(a) {
  var b = goog.labs.userAgent.util.getUserAgent();
  return goog.string.contains(b, a);
};
goog.labs.userAgent.util.matchUserAgentIgnoreCase = function(a) {
  var b = goog.labs.userAgent.util.getUserAgent();
  return goog.string.caseInsensitiveContains(b, a);
};
goog.labs.userAgent.util.extractVersionTuples = function(a) {
  for (var b = RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), c = [], d; d = b.exec(a);) {
    c.push([d[1], d[2], d[3] || void 0]);
  }
  return c;
};
goog.object = {};
goog.object.is = function(a, b) {
  return a === b ? 0 !== a || 1 / a === 1 / b : a !== a && b !== b;
};
goog.object.forEach = function(a, b, c) {
  for (var d in a) {
    b.call(c, a[d], d, a);
  }
};
goog.object.filter = function(a, b, c) {
  var d = {}, e;
  for (e in a) {
    b.call(c, a[e], e, a) && (d[e] = a[e]);
  }
  return d;
};
goog.object.map = function(a, b, c) {
  var d = {}, e;
  for (e in a) {
    d[e] = b.call(c, a[e], e, a);
  }
  return d;
};
goog.object.some = function(a, b, c) {
  for (var d in a) {
    if (b.call(c, a[d], d, a)) {
      return !0;
    }
  }
  return !1;
};
goog.object.every = function(a, b, c) {
  for (var d in a) {
    if (!b.call(c, a[d], d, a)) {
      return !1;
    }
  }
  return !0;
};
goog.object.getCount = function(a) {
  var b = 0, c;
  for (c in a) {
    b++;
  }
  return b;
};
goog.object.getAnyKey = function(a) {
  for (var b in a) {
    return b;
  }
};
goog.object.getAnyValue = function(a) {
  for (var b in a) {
    return a[b];
  }
};
goog.object.contains = function(a, b) {
  return goog.object.containsValue(a, b);
};
goog.object.getValues = function(a) {
  var b = [], c = 0, d;
  for (d in a) {
    b[c++] = a[d];
  }
  return b;
};
goog.object.getKeys = function(a) {
  var b = [], c = 0, d;
  for (d in a) {
    b[c++] = d;
  }
  return b;
};
goog.object.getValueByKeys = function(a, b) {
  for (var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1; c < d.length && (a = a[d[c]], goog.isDef(a)); c++) {
  }
  return a;
};
goog.object.containsKey = function(a, b) {
  return null !== a && b in a;
};
goog.object.containsValue = function(a, b) {
  for (var c in a) {
    if (a[c] == b) {
      return !0;
    }
  }
  return !1;
};
goog.object.findKey = function(a, b, c) {
  for (var d in a) {
    if (b.call(c, a[d], d, a)) {
      return d;
    }
  }
};
goog.object.findValue = function(a, b, c) {
  return (b = goog.object.findKey(a, b, c)) && a[b];
};
goog.object.isEmpty = function(a) {
  for (var b in a) {
    return !1;
  }
  return !0;
};
goog.object.clear = function(a) {
  for (var b in a) {
    delete a[b];
  }
};
goog.object.remove = function(a, b) {
  var c;
  (c = b in a) && delete a[b];
  return c;
};
goog.object.add = function(a, b, c) {
  if (null !== a && b in a) {
    throw Error('The object already contains the key "' + b + '"');
  }
  goog.object.set(a, b, c);
};
goog.object.get = function(a, b, c) {
  return null !== a && b in a ? a[b] : c;
};
goog.object.set = function(a, b, c) {
  a[b] = c;
};
goog.object.setIfUndefined = function(a, b, c) {
  return b in a ? a[b] : a[b] = c;
};
goog.object.setWithReturnValueIfNotSet = function(a, b, c) {
  if (b in a) {
    return a[b];
  }
  c = c();
  return a[b] = c;
};
goog.object.equals = function(a, b) {
  for (var c in a) {
    if (!(c in b) || a[c] !== b[c]) {
      return !1;
    }
  }
  for (c in b) {
    if (!(c in a)) {
      return !1;
    }
  }
  return !0;
};
goog.object.clone = function(a) {
  var b = {}, c;
  for (c in a) {
    b[c] = a[c];
  }
  return b;
};
goog.object.unsafeClone = function(a) {
  var b = goog.typeOf(a);
  if ("object" == b || "array" == b) {
    if (goog.isFunction(a.clone)) {
      return a.clone();
    }
    var b = "array" == b ? [] : {}, c;
    for (c in a) {
      b[c] = goog.object.unsafeClone(a[c]);
    }
    return b;
  }
  return a;
};
goog.object.transpose = function(a) {
  var b = {}, c;
  for (c in a) {
    b[a[c]] = c;
  }
  return b;
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function(a, b) {
  for (var c, d, e = 1; e < arguments.length; e++) {
    d = arguments[e];
    for (c in d) {
      a[c] = d[c];
    }
    for (var f = 0; f < goog.object.PROTOTYPE_FIELDS_.length; f++) {
      c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
};
goog.object.create = function(a) {
  var b = arguments.length;
  if (1 == b && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0]);
  }
  if (b % 2) {
    throw Error("Uneven number of arguments");
  }
  for (var c = {}, d = 0; d < b; d += 2) {
    c[arguments[d]] = arguments[d + 1];
  }
  return c;
};
goog.object.createSet = function(a) {
  var b = arguments.length;
  if (1 == b && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0]);
  }
  for (var c = {}, d = 0; d < b; d++) {
    c[arguments[d]] = !0;
  }
  return c;
};
goog.object.createImmutableView = function(a) {
  var b = a;
  Object.isFrozen && !Object.isFrozen(a) && (b = Object.create(a), Object.freeze(b));
  return b;
};
goog.object.isImmutableView = function(a) {
  return !!Object.isFrozen && Object.isFrozen(a);
};
goog.labs.userAgent.browser = {};
goog.labs.userAgent.browser.matchOpera_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Opera");
};
goog.labs.userAgent.browser.matchIE_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.browser.matchEdge_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Edge");
};
goog.labs.userAgent.browser.matchFirefox_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Firefox");
};
goog.labs.userAgent.browser.matchSafari_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdge_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"));
};
goog.labs.userAgent.browser.matchCoast_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Coast");
};
goog.labs.userAgent.browser.matchIosWebview_ = function() {
  return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit");
};
goog.labs.userAgent.browser.matchChrome_ = function() {
  return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchEdge_();
};
goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk());
};
goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdge_;
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
goog.labs.userAgent.browser.isSilk = function() {
  return goog.labs.userAgent.util.matchUserAgent("Silk");
};
goog.labs.userAgent.browser.getVersion = function() {
  function a(a) {
    a = goog.array.find(a, d);
    return c[a] || "";
  }
  var b = goog.labs.userAgent.util.getUserAgent();
  if (goog.labs.userAgent.browser.isIE()) {
    return goog.labs.userAgent.browser.getIEVersion_(b);
  }
  var b = goog.labs.userAgent.util.extractVersionTuples(b), c = {};
  goog.array.forEach(b, function(a) {
    c[a[0]] = a[1];
  });
  var d = goog.partial(goog.object.containsKey, c);
  return goog.labs.userAgent.browser.isOpera() ? a(["Version", "Opera"]) : goog.labs.userAgent.browser.isEdge() ? a(["Edge"]) : goog.labs.userAgent.browser.isChrome() ? a(["Chrome", "CriOS"]) : (b = b[2]) && b[1] || "";
};
goog.labs.userAgent.browser.isVersionOrHigher = function(a) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), a);
};
goog.labs.userAgent.browser.getIEVersion_ = function(a) {
  var b = /rv: *([\d\.]*)/.exec(a);
  if (b && b[1]) {
    return b[1];
  }
  var b = "", c = /MSIE +([\d\.]+)/.exec(a);
  if (c && c[1]) {
    if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == c[1]) {
      if (a && a[1]) {
        switch(a[1]) {
          case "4.0":
            b = "8.0";
            break;
          case "5.0":
            b = "9.0";
            break;
          case "6.0":
            b = "10.0";
            break;
          case "7.0":
            b = "11.0";
        }
      } else {
        b = "7.0";
      }
    } else {
      b = c[1];
    }
  }
  return b;
};
goog.labs.userAgent.engine = {};
goog.labs.userAgent.engine.isPresto = function() {
  return goog.labs.userAgent.util.matchUserAgent("Presto");
};
goog.labs.userAgent.engine.isTrident = function() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.engine.isEdge = function() {
  return goog.labs.userAgent.util.matchUserAgent("Edge");
};
goog.labs.userAgent.engine.isWebKit = function() {
  return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge();
};
goog.labs.userAgent.engine.isGecko = function() {
  return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge();
};
goog.labs.userAgent.engine.getVersion = function() {
  var a = goog.labs.userAgent.util.getUserAgent();
  if (a) {
    var a = goog.labs.userAgent.util.extractVersionTuples(a), b = goog.labs.userAgent.engine.getEngineTuple_(a);
    if (b) {
      return "Gecko" == b[0] ? goog.labs.userAgent.engine.getVersionForKey_(a, "Firefox") : b[1];
    }
    var a = a[0], c;
    if (a && (c = a[2]) && (c = /Trident\/([^\s;]+)/.exec(c))) {
      return c[1];
    }
  }
  return "";
};
goog.labs.userAgent.engine.getEngineTuple_ = function(a) {
  if (!goog.labs.userAgent.engine.isEdge()) {
    return a[1];
  }
  for (var b = 0; b < a.length; b++) {
    var c = a[b];
    if ("Edge" == c[0]) {
      return c;
    }
  }
};
goog.labs.userAgent.engine.isVersionOrHigher = function(a) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), a);
};
goog.labs.userAgent.engine.getVersionForKey_ = function(a, b) {
  var c = goog.array.find(a, function(a) {
    return b == a[0];
  });
  return c && c[1] || "";
};
goog.async.throwException = function(a) {
  goog.global.setTimeout(function() {
    throw a;
  }, 0);
};
goog.async.nextTick = function(a, b, c) {
  var d = a;
  b && (d = goog.bind(a, b));
  d = goog.async.nextTick.wrapCallback_(d);
  goog.isFunction(goog.global.setImmediate) && (c || goog.async.nextTick.useSetImmediate_()) ? goog.global.setImmediate(d) : (goog.async.nextTick.setImmediate_ || (goog.async.nextTick.setImmediate_ = goog.async.nextTick.getSetImmediateEmulator_()), goog.async.nextTick.setImmediate_(d));
};
goog.async.nextTick.useSetImmediate_ = function() {
  return goog.global.Window && goog.global.Window.prototype && !goog.labs.userAgent.browser.isEdge() && goog.global.Window.prototype.setImmediate == goog.global.setImmediate ? !1 : !0;
};
goog.async.nextTick.getSetImmediateEmulator_ = function() {
  var a = goog.global.MessageChannel;
  "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !goog.labs.userAgent.engine.isPresto() && (a = function() {
    var a = document.createElement("IFRAME");
    a.style.display = "none";
    a.src = "";
    document.documentElement.appendChild(a);
    var b = a.contentWindow, a = b.document;
    a.open();
    a.write("");
    a.close();
    var c = "callImmediate" + Math.random(), d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host, a = goog.bind(function(a) {
      if (("*" == d || a.origin == d) && a.data == c) {
        this.port1.onmessage();
      }
    }, this);
    b.addEventListener("message", a, !1);
    this.port1 = {};
    this.port2 = {postMessage:function() {
      b.postMessage(c, d);
    }};
  });
  if ("undefined" !== typeof a && !goog.labs.userAgent.browser.isIE()) {
    var b = new a, c = {}, d = c;
    b.port1.onmessage = function() {
      if (goog.isDef(c.next)) {
        c = c.next;
        var a = c.cb;
        c.cb = null;
        a();
      }
    };
    return function(a) {
      d.next = {cb:a};
      d = d.next;
      b.port2.postMessage(0);
    };
  }
  return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function(a) {
    var b = document.createElement("SCRIPT");
    b.onreadystatechange = function() {
      b.onreadystatechange = null;
      b.parentNode.removeChild(b);
      b = null;
      a();
      a = null;
    };
    document.documentElement.appendChild(b);
  } : function(a) {
    goog.global.setTimeout(a, 0);
  };
};
goog.async.nextTick.wrapCallback_ = goog.functions.identity;
goog.debug.entryPointRegistry.register(function(a) {
  goog.async.nextTick.wrapCallback_ = a;
});
goog.async.run = function(a, b) {
  goog.async.run.schedule_ || goog.async.run.initializeRunner_();
  goog.async.run.workQueueScheduled_ || (goog.async.run.schedule_(), goog.async.run.workQueueScheduled_ = !0);
  goog.async.run.workQueue_.add(a, b);
};
goog.async.run.initializeRunner_ = function() {
  if (goog.global.Promise && goog.global.Promise.resolve) {
    var a = goog.global.Promise.resolve(void 0);
    goog.async.run.schedule_ = function() {
      a.then(goog.async.run.processWorkQueue);
    };
  } else {
    goog.async.run.schedule_ = function() {
      goog.async.nextTick(goog.async.run.processWorkQueue);
    };
  }
};
goog.async.run.forceNextTick = function(a) {
  goog.async.run.schedule_ = function() {
    goog.async.nextTick(goog.async.run.processWorkQueue);
    a && a(goog.async.run.processWorkQueue);
  };
};
goog.async.run.workQueueScheduled_ = !1;
goog.async.run.workQueue_ = new goog.async.WorkQueue;
goog.DEBUG && (goog.async.run.resetQueue = function() {
  goog.async.run.workQueueScheduled_ = !1;
  goog.async.run.workQueue_ = new goog.async.WorkQueue;
});
goog.async.run.processWorkQueue = function() {
  for (var a; a = goog.async.run.workQueue_.remove();) {
    try {
      a.fn.call(a.scope);
    } catch (b) {
      goog.async.throwException(b);
    }
    goog.async.run.workQueue_.returnUnused(a);
  }
  goog.async.run.workQueueScheduled_ = !1;
};
goog.promise = {};
goog.promise.Resolver = function() {
};
goog.Promise = function(a, b) {
  this.state_ = goog.Promise.State_.PENDING;
  this.result_ = void 0;
  this.callbackEntriesTail_ = this.callbackEntries_ = this.parent_ = null;
  this.executing_ = !1;
  0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? this.unhandledRejectionId_ = 0 : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (this.hadUnhandledRejection_ = !1);
  goog.Promise.LONG_STACK_TRACES && (this.stack_ = [], this.addStackTrace_(Error("created")), this.currentStep_ = 0);
  if (a != goog.nullFunction) {
    try {
      var c = this;
      a.call(b, function(a) {
        c.resolve_(goog.Promise.State_.FULFILLED, a);
      }, function(a) {
        if (goog.DEBUG && !(a instanceof goog.Promise.CancellationError)) {
          try {
            if (a instanceof Error) {
              throw a;
            }
            throw Error("Promise rejected.");
          } catch (e) {
          }
        }
        c.resolve_(goog.Promise.State_.REJECTED, a);
      });
    } catch (d) {
      this.resolve_(goog.Promise.State_.REJECTED, d);
    }
  }
};
goog.Promise.LONG_STACK_TRACES = !1;
goog.Promise.UNHANDLED_REJECTION_DELAY = 0;
goog.Promise.State_ = {PENDING:0, BLOCKED:1, FULFILLED:2, REJECTED:3};
goog.Promise.CallbackEntry_ = function() {
  this.next = this.context = this.onRejected = this.onFulfilled = this.child = null;
  this.always = !1;
};
goog.Promise.CallbackEntry_.prototype.reset = function() {
  this.context = this.onRejected = this.onFulfilled = this.child = null;
  this.always = !1;
};
goog.Promise.DEFAULT_MAX_UNUSED = 100;
goog.Promise.freelist_ = new goog.async.FreeList(function() {
  return new goog.Promise.CallbackEntry_;
}, function(a) {
  a.reset();
}, goog.Promise.DEFAULT_MAX_UNUSED);
goog.Promise.getCallbackEntry_ = function(a, b, c) {
  var d = goog.Promise.freelist_.get();
  d.onFulfilled = a;
  d.onRejected = b;
  d.context = c;
  return d;
};
goog.Promise.returnEntry_ = function(a) {
  goog.Promise.freelist_.put(a);
};
goog.Promise.resolve = function(a) {
  if (a instanceof goog.Promise) {
    return a;
  }
  var b = new goog.Promise(goog.nullFunction);
  b.resolve_(goog.Promise.State_.FULFILLED, a);
  return b;
};
goog.Promise.reject = function(a) {
  return new goog.Promise(function(b, c) {
    c(a);
  });
};
goog.Promise.resolveThen_ = function(a, b, c) {
  goog.Promise.maybeThen_(a, b, c, null) || goog.async.run(goog.partial(b, a));
};
goog.Promise.race = function(a) {
  return new goog.Promise(function(b, c) {
    a.length || b(void 0);
    for (var d = 0, e; d < a.length; d++) {
      e = a[d], goog.Promise.resolveThen_(e, b, c);
    }
  });
};
goog.Promise.all = function(a) {
  return new goog.Promise(function(b, c) {
    var d = a.length, e = [];
    if (d) {
      for (var f = function(a, c) {
        d--;
        e[a] = c;
        0 == d && b(e);
      }, g = function(a) {
        c(a);
      }, h = 0, k; h < a.length; h++) {
        k = a[h], goog.Promise.resolveThen_(k, goog.partial(f, h), g);
      }
    } else {
      b(e);
    }
  });
};
goog.Promise.allSettled = function(a) {
  return new goog.Promise(function(b, c) {
    var d = a.length, e = [];
    if (d) {
      for (var f = function(a, c, f) {
        d--;
        e[a] = c ? {fulfilled:!0, value:f} : {fulfilled:!1, reason:f};
        0 == d && b(e);
      }, g = 0, h; g < a.length; g++) {
        h = a[g], goog.Promise.resolveThen_(h, goog.partial(f, g, !0), goog.partial(f, g, !1));
      }
    } else {
      b(e);
    }
  });
};
goog.Promise.firstFulfilled = function(a) {
  return new goog.Promise(function(b, c) {
    var d = a.length, e = [];
    if (d) {
      for (var f = function(a) {
        b(a);
      }, g = function(a, b) {
        d--;
        e[a] = b;
        0 == d && c(e);
      }, h = 0, k; h < a.length; h++) {
        k = a[h], goog.Promise.resolveThen_(k, f, goog.partial(g, h));
      }
    } else {
      b(void 0);
    }
  });
};
goog.Promise.withResolver = function() {
  var a, b, c = new goog.Promise(function(c, e) {
    a = c;
    b = e;
  });
  return new goog.Promise.Resolver_(c, a, b);
};
goog.Promise.prototype.then = function(a, b, c) {
  null != a && goog.asserts.assertFunction(a, "opt_onFulfilled should be a function.");
  null != b && goog.asserts.assertFunction(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
  goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then"));
  return this.addChildPromise_(goog.isFunction(a) ? a : null, goog.isFunction(b) ? b : null, c);
};
goog.Thenable.addImplementation(goog.Promise);
goog.Promise.prototype.thenVoid = function(a, b, c) {
  null != a && goog.asserts.assertFunction(a, "opt_onFulfilled should be a function.");
  null != b && goog.asserts.assertFunction(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
  goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then"));
  this.addCallbackEntry_(goog.Promise.getCallbackEntry_(a || goog.nullFunction, b || null, c));
};
goog.Promise.prototype.thenAlways = function(a, b) {
  goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("thenAlways"));
  var c = goog.Promise.getCallbackEntry_(a, a, b);
  c.always = !0;
  this.addCallbackEntry_(c);
  return this;
};
goog.Promise.prototype.thenCatch = function(a, b) {
  goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("thenCatch"));
  return this.addChildPromise_(null, a, b);
};
goog.Promise.prototype.cancel = function(a) {
  this.state_ == goog.Promise.State_.PENDING && goog.async.run(function() {
    var b = new goog.Promise.CancellationError(a);
    this.cancelInternal_(b);
  }, this);
};
goog.Promise.prototype.cancelInternal_ = function(a) {
  this.state_ == goog.Promise.State_.PENDING && (this.parent_ ? (this.parent_.cancelChild_(this, a), this.parent_ = null) : this.resolve_(goog.Promise.State_.REJECTED, a));
};
goog.Promise.prototype.cancelChild_ = function(a, b) {
  if (this.callbackEntries_) {
    for (var c = 0, d = null, e = null, f = this.callbackEntries_; f && (f.always || (c++, f.child == a && (d = f), !(d && 1 < c))); f = f.next) {
      d || (e = f);
    }
    d && (this.state_ == goog.Promise.State_.PENDING && 1 == c ? this.cancelInternal_(b) : (e ? this.removeEntryAfter_(e) : this.popEntry_(), this.executeCallback_(d, goog.Promise.State_.REJECTED, b)));
  }
};
goog.Promise.prototype.addCallbackEntry_ = function(a) {
  this.hasEntry_() || this.state_ != goog.Promise.State_.FULFILLED && this.state_ != goog.Promise.State_.REJECTED || this.scheduleCallbacks_();
  this.queueEntry_(a);
};
goog.Promise.prototype.addChildPromise_ = function(a, b, c) {
  var d = goog.Promise.getCallbackEntry_(null, null, null);
  d.child = new goog.Promise(function(e, f) {
    d.onFulfilled = a ? function(b) {
      try {
        var d = a.call(c, b);
        e(d);
      } catch (k) {
        f(k);
      }
    } : e;
    d.onRejected = b ? function(a) {
      try {
        var d = b.call(c, a);
        !goog.isDef(d) && a instanceof goog.Promise.CancellationError ? f(a) : e(d);
      } catch (k) {
        f(k);
      }
    } : f;
  });
  d.child.parent_ = this;
  this.addCallbackEntry_(d);
  return d.child;
};
goog.Promise.prototype.unblockAndFulfill_ = function(a) {
  goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
  this.state_ = goog.Promise.State_.PENDING;
  this.resolve_(goog.Promise.State_.FULFILLED, a);
};
goog.Promise.prototype.unblockAndReject_ = function(a) {
  goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
  this.state_ = goog.Promise.State_.PENDING;
  this.resolve_(goog.Promise.State_.REJECTED, a);
};
goog.Promise.prototype.resolve_ = function(a, b) {
  this.state_ == goog.Promise.State_.PENDING && (this === b && (a = goog.Promise.State_.REJECTED, b = new TypeError("Promise cannot resolve to itself")), this.state_ = goog.Promise.State_.BLOCKED, goog.Promise.maybeThen_(b, this.unblockAndFulfill_, this.unblockAndReject_, this) || (this.result_ = b, this.state_ = a, this.parent_ = null, this.scheduleCallbacks_(), a != goog.Promise.State_.REJECTED || b instanceof goog.Promise.CancellationError || goog.Promise.addUnhandledRejection_(this, b)));
};
goog.Promise.maybeThen_ = function(a, b, c, d) {
  if (a instanceof goog.Promise) {
    return a.thenVoid(b, c, d), !0;
  }
  if (goog.Thenable.isImplementedBy(a)) {
    return a.then(b, c, d), !0;
  }
  if (goog.isObject(a)) {
    try {
      var e = a.then;
      if (goog.isFunction(e)) {
        return goog.Promise.tryThen_(a, e, b, c, d), !0;
      }
    } catch (f) {
      return c.call(d, f), !0;
    }
  }
  return !1;
};
goog.Promise.tryThen_ = function(a, b, c, d, e) {
  var f = !1, g = function(a) {
    f || (f = !0, c.call(e, a));
  }, h = function(a) {
    f || (f = !0, d.call(e, a));
  };
  try {
    b.call(a, g, h);
  } catch (k) {
    h(k);
  }
};
goog.Promise.prototype.scheduleCallbacks_ = function() {
  this.executing_ || (this.executing_ = !0, goog.async.run(this.executeCallbacks_, this));
};
goog.Promise.prototype.hasEntry_ = function() {
  return !!this.callbackEntries_;
};
goog.Promise.prototype.queueEntry_ = function(a) {
  goog.asserts.assert(null != a.onFulfilled);
  this.callbackEntriesTail_ ? this.callbackEntriesTail_.next = a : this.callbackEntries_ = a;
  this.callbackEntriesTail_ = a;
};
goog.Promise.prototype.popEntry_ = function() {
  var a = null;
  this.callbackEntries_ && (a = this.callbackEntries_, this.callbackEntries_ = a.next, a.next = null);
  this.callbackEntries_ || (this.callbackEntriesTail_ = null);
  null != a && goog.asserts.assert(null != a.onFulfilled);
  return a;
};
goog.Promise.prototype.removeEntryAfter_ = function(a) {
  goog.asserts.assert(this.callbackEntries_);
  goog.asserts.assert(null != a);
  a.next == this.callbackEntriesTail_ && (this.callbackEntriesTail_ = a);
  a.next = a.next.next;
};
goog.Promise.prototype.executeCallbacks_ = function() {
  for (var a; a = this.popEntry_();) {
    goog.Promise.LONG_STACK_TRACES && this.currentStep_++, this.executeCallback_(a, this.state_, this.result_);
  }
  this.executing_ = !1;
};
goog.Promise.prototype.executeCallback_ = function(a, b, c) {
  b == goog.Promise.State_.REJECTED && a.onRejected && !a.always && this.removeUnhandledRejection_();
  if (a.child) {
    a.child.parent_ = null, goog.Promise.invokeCallback_(a, b, c);
  } else {
    try {
      a.always ? a.onFulfilled.call(a.context) : goog.Promise.invokeCallback_(a, b, c);
    } catch (d) {
      goog.Promise.handleRejection_.call(null, d);
    }
  }
  goog.Promise.returnEntry_(a);
};
goog.Promise.invokeCallback_ = function(a, b, c) {
  b == goog.Promise.State_.FULFILLED ? a.onFulfilled.call(a.context, c) : a.onRejected && a.onRejected.call(a.context, c);
};
goog.Promise.prototype.addStackTrace_ = function(a) {
  if (goog.Promise.LONG_STACK_TRACES && goog.isString(a.stack)) {
    var b = a.stack.split("\n", 4)[3];
    a = a.message;
    a += Array(11 - a.length).join(" ");
    this.stack_.push(a + b);
  }
};
goog.Promise.prototype.appendLongStack_ = function(a) {
  if (goog.Promise.LONG_STACK_TRACES && a && goog.isString(a.stack) && this.stack_.length) {
    for (var b = ["Promise trace:"], c = this; c; c = c.parent_) {
      for (var d = this.currentStep_; 0 <= d; d--) {
        b.push(c.stack_[d]);
      }
      b.push("Value: [" + (c.state_ == goog.Promise.State_.REJECTED ? "REJECTED" : "FULFILLED") + "] <" + String(c.result_) + ">");
    }
    a.stack += "\n\n" + b.join("\n");
  }
};
goog.Promise.prototype.removeUnhandledRejection_ = function() {
  if (0 < goog.Promise.UNHANDLED_REJECTION_DELAY) {
    for (var a = this; a && a.unhandledRejectionId_; a = a.parent_) {
      goog.global.clearTimeout(a.unhandledRejectionId_), a.unhandledRejectionId_ = 0;
    }
  } else {
    if (0 == goog.Promise.UNHANDLED_REJECTION_DELAY) {
      for (a = this; a && a.hadUnhandledRejection_; a = a.parent_) {
        a.hadUnhandledRejection_ = !1;
      }
    }
  }
};
goog.Promise.addUnhandledRejection_ = function(a, b) {
  0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? a.unhandledRejectionId_ = goog.global.setTimeout(function() {
    a.appendLongStack_(b);
    goog.Promise.handleRejection_.call(null, b);
  }, goog.Promise.UNHANDLED_REJECTION_DELAY) : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (a.hadUnhandledRejection_ = !0, goog.async.run(function() {
    a.hadUnhandledRejection_ && (a.appendLongStack_(b), goog.Promise.handleRejection_.call(null, b));
  }));
};
goog.Promise.handleRejection_ = goog.async.throwException;
goog.Promise.setUnhandledRejectionHandler = function(a) {
  goog.Promise.handleRejection_ = a;
};
goog.Promise.CancellationError = function(a) {
  goog.debug.Error.call(this, a);
};
goog.inherits(goog.Promise.CancellationError, goog.debug.Error);
goog.Promise.CancellationError.prototype.name = "cancel";
goog.Promise.Resolver_ = function(a, b, c) {
  this.promise = a;
  this.resolve = b;
  this.reject = c;
};
goog.disposable = {};
goog.disposable.IDisposable = function() {
};
goog.disposable.IDisposable.prototype.dispose = goog.abstractMethod;
goog.disposable.IDisposable.prototype.isDisposed = goog.abstractMethod;
goog.Disposable = function() {
  goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && (goog.Disposable.INCLUDE_STACK_ON_CREATION && (this.creationStack = Error().stack), goog.Disposable.instances_[goog.getUid(this)] = this);
  this.disposed_ = this.disposed_;
  this.onDisposeCallbacks_ = this.onDisposeCallbacks_;
};
goog.Disposable.MonitoringMode = {OFF:0, PERMANENT:1, INTERACTIVE:2};
goog.Disposable.MONITORING_MODE = 0;
goog.Disposable.INCLUDE_STACK_ON_CREATION = !0;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function() {
  var a = [], b;
  for (b in goog.Disposable.instances_) {
    goog.Disposable.instances_.hasOwnProperty(b) && a.push(goog.Disposable.instances_[Number(b)]);
  }
  return a;
};
goog.Disposable.clearUndisposedObjects = function() {
  goog.Disposable.instances_ = {};
};
goog.Disposable.prototype.disposed_ = !1;
goog.Disposable.prototype.isDisposed = function() {
  return this.disposed_;
};
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function() {
  if (!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF)) {
    var a = goog.getUid(this);
    if (goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty(a)) {
      throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
    }
    delete goog.Disposable.instances_[a];
  }
};
goog.Disposable.prototype.registerDisposable = function(a) {
  this.addOnDisposeCallback(goog.partial(goog.dispose, a));
};
goog.Disposable.prototype.addOnDisposeCallback = function(a, b) {
  this.disposed_ ? goog.isDef(b) ? a.call(b) : a() : (this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []), this.onDisposeCallbacks_.push(goog.isDef(b) ? goog.bind(a, b) : a));
};
goog.Disposable.prototype.disposeInternal = function() {
  if (this.onDisposeCallbacks_) {
    for (; this.onDisposeCallbacks_.length;) {
      this.onDisposeCallbacks_.shift()();
    }
  }
};
goog.Disposable.isDisposed = function(a) {
  return a && "function" == typeof a.isDisposed ? a.isDisposed() : !1;
};
goog.dispose = function(a) {
  a && "function" == typeof a.dispose && a.dispose();
};
goog.disposeAll = function(a) {
  for (var b = 0, c = arguments.length; b < c; ++b) {
    var d = arguments[b];
    goog.isArrayLike(d) ? goog.disposeAll.apply(null, d) : goog.dispose(d);
  }
};
goog.labs.userAgent.platform = {};
goog.labs.userAgent.platform.isAndroid = function() {
  return goog.labs.userAgent.util.matchUserAgent("Android");
};
goog.labs.userAgent.platform.isIpod = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPod");
};
goog.labs.userAgent.platform.isIphone = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad");
};
goog.labs.userAgent.platform.isIpad = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPad");
};
goog.labs.userAgent.platform.isIos = function() {
  return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod();
};
goog.labs.userAgent.platform.isMacintosh = function() {
  return goog.labs.userAgent.util.matchUserAgent("Macintosh");
};
goog.labs.userAgent.platform.isLinux = function() {
  return goog.labs.userAgent.util.matchUserAgent("Linux");
};
goog.labs.userAgent.platform.isWindows = function() {
  return goog.labs.userAgent.util.matchUserAgent("Windows");
};
goog.labs.userAgent.platform.isChromeOS = function() {
  return goog.labs.userAgent.util.matchUserAgent("CrOS");
};
goog.labs.userAgent.platform.getVersion = function() {
  var a = goog.labs.userAgent.util.getUserAgent();
  var b = "";
  goog.labs.userAgent.platform.isWindows() ? (b = /Windows (?:NT|Phone) ([0-9.]+)/, b = (a = b.exec(a)) ? a[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? (b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, b = (a = b.exec(a)) && a[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? (b = /Mac OS X ([0-9_.]+)/, b = (a = b.exec(a)) ? a[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isAndroid() ? (b = /Android\s+([^\);]+)(\)|;)/, b = (a = b.exec(a)) && a[1]) : goog.labs.userAgent.platform.isChromeOS() && 
  (b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, b = (a = b.exec(a)) && a[1]);
  return b || "";
};
goog.labs.userAgent.platform.isVersionOrHigher = function(a) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), a);
};
goog.reflect = {};
goog.reflect.object = function(a, b) {
  return b;
};
goog.reflect.objectProperty = function(a, b) {
  return a;
};
goog.reflect.sinkValue = function(a) {
  goog.reflect.sinkValue[" "](a);
  return a;
};
goog.reflect.sinkValue[" "] = goog.nullFunction;
goog.reflect.canAccessProperty = function(a, b) {
  try {
    return goog.reflect.sinkValue(a[b]), !0;
  } catch (c) {
  }
  return !1;
};
goog.reflect.cache = function(a, b, c, d) {
  d = d ? d(b) : b;
  return Object.prototype.hasOwnProperty.call(a, d) ? a[d] : a[d] = c(b);
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_EDGE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
  return goog.labs.userAgent.util.getUserAgent();
};
goog.userAgent.getNavigator = function() {
  return goog.global.navigator || null;
};
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge();
goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
goog.userAgent.isMobile_ = function() {
  return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile");
};
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
  var a = goog.userAgent.getNavigator();
  return a && a.platform || "";
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.ASSUME_ANDROID = !1;
goog.userAgent.ASSUME_IPHONE = !1;
goog.userAgent.ASSUME_IPAD = !1;
goog.userAgent.ASSUME_IPOD = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD;
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh();
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows();
goog.userAgent.isLegacyLinux_ = function() {
  return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS();
};
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
goog.userAgent.isX11_ = function() {
  var a = goog.userAgent.getNavigator();
  return !!a && goog.string.contains(a.appVersion || "", "X11");
};
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_();
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid();
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone();
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.IPOD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIpod();
goog.userAgent.determineVersion_ = function() {
  var a = "", b = goog.userAgent.getVersionRegexResult_();
  b && (a = b ? b[1] : "");
  return goog.userAgent.IE && (b = goog.userAgent.getDocumentMode_(), null != b && b > parseFloat(a)) ? String(b) : a;
};
goog.userAgent.getVersionRegexResult_ = function() {
  var a = goog.userAgent.getUserAgentString();
  if (goog.userAgent.GECKO) {
    return /rv\:([^\);]+)(\)|;)/.exec(a);
  }
  if (goog.userAgent.EDGE) {
    return /Edge\/([\d\.]+)/.exec(a);
  }
  if (goog.userAgent.IE) {
    return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
  }
  if (goog.userAgent.WEBKIT) {
    return /WebKit\/(\S+)/.exec(a);
  }
  if (goog.userAgent.OPERA) {
    return /(?:Version)[ \/]?(\S+)/.exec(a);
  }
};
goog.userAgent.getDocumentMode_ = function() {
  var a = goog.global.document;
  return a ? a.documentMode : void 0;
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(a, b) {
  return goog.string.compareVersions(a, b);
};
goog.userAgent.isVersionOrHigherCache_ = {};
goog.userAgent.isVersionOrHigher = function(a) {
  return goog.userAgent.ASSUME_ANY_VERSION || goog.reflect.cache(goog.userAgent.isVersionOrHigherCache_, a, function() {
    return 0 <= goog.string.compareVersions(goog.userAgent.VERSION, a);
  });
};
goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
goog.userAgent.isDocumentModeOrHigher = function(a) {
  return Number(goog.userAgent.DOCUMENT_MODE) >= a;
};
goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
goog.userAgent.DOCUMENT_MODE = function() {
  var a = goog.global.document, b = goog.userAgent.getDocumentMode_();
  if (a && goog.userAgent.IE) {
    return b || ("CSS1Compat" == a.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5);
  }
}();
goog.events = {};
goog.events.BrowserFeature = {HAS_W3C_BUTTON:!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9), HAS_W3C_EVENT_SUPPORT:!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9), SET_KEY_CODE_TO_PREVENT_DEFAULT:goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"), HAS_NAVIGATOR_ONLINE_PROPERTY:!goog.userAgent.WEBKIT || goog.userAgent.isVersionOrHigher("528"), HAS_HTML5_NETWORK_EVENT_SUPPORT:goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9b") || goog.userAgent.IE && 
goog.userAgent.isVersionOrHigher("8") || goog.userAgent.OPERA && goog.userAgent.isVersionOrHigher("9.5") || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("528"), HTML5_NETWORK_EVENTS_FIRE_ON_BODY:goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher("8") || goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"), TOUCH_ENABLED:"ontouchstart" in goog.global || !!(goog.global.document && document.documentElement && "ontouchstart" in document.documentElement) || !(!goog.global.navigator || 
!goog.global.navigator.msMaxTouchPoints)};
goog.events.EventId = function(a) {
  this.id = a;
};
goog.events.EventId.prototype.toString = function() {
  return this.id;
};
goog.events.Event = function(a, b) {
  this.type = a instanceof goog.events.EventId ? String(a) : a;
  this.currentTarget = this.target = b;
  this.defaultPrevented = this.propagationStopped_ = !1;
  this.returnValue_ = !0;
};
goog.events.Event.prototype.stopPropagation = function() {
  this.propagationStopped_ = !0;
};
goog.events.Event.prototype.preventDefault = function() {
  this.defaultPrevented = !0;
  this.returnValue_ = !1;
};
goog.events.Event.stopPropagation = function(a) {
  a.stopPropagation();
};
goog.events.Event.preventDefault = function(a) {
  a.preventDefault();
};
goog.events.getVendorPrefixedName_ = function(a) {
  return goog.userAgent.WEBKIT ? "webkit" + a : goog.userAgent.OPERA ? "o" + a.toLowerCase() : a.toLowerCase();
};
goog.events.EventType = {CLICK:"click", RIGHTCLICK:"rightclick", DBLCLICK:"dblclick", MOUSEDOWN:"mousedown", MOUSEUP:"mouseup", MOUSEOVER:"mouseover", MOUSEOUT:"mouseout", MOUSEMOVE:"mousemove", MOUSEENTER:"mouseenter", MOUSELEAVE:"mouseleave", SELECTIONCHANGE:"selectionchange", SELECTSTART:"selectstart", WHEEL:"wheel", KEYPRESS:"keypress", KEYDOWN:"keydown", KEYUP:"keyup", BLUR:"blur", FOCUS:"focus", DEACTIVATE:"deactivate", FOCUSIN:goog.userAgent.IE ? "focusin" : "DOMFocusIn", FOCUSOUT:goog.userAgent.IE ? 
"focusout" : "DOMFocusOut", CHANGE:"change", RESET:"reset", SELECT:"select", SUBMIT:"submit", INPUT:"input", PROPERTYCHANGE:"propertychange", DRAGSTART:"dragstart", DRAG:"drag", DRAGENTER:"dragenter", DRAGOVER:"dragover", DRAGLEAVE:"dragleave", DROP:"drop", DRAGEND:"dragend", TOUCHSTART:"touchstart", TOUCHMOVE:"touchmove", TOUCHEND:"touchend", TOUCHCANCEL:"touchcancel", BEFOREUNLOAD:"beforeunload", CONSOLEMESSAGE:"consolemessage", CONTEXTMENU:"contextmenu", DOMCONTENTLOADED:"DOMContentLoaded", ERROR:"error", 
HELP:"help", LOAD:"load", LOSECAPTURE:"losecapture", ORIENTATIONCHANGE:"orientationchange", READYSTATECHANGE:"readystatechange", RESIZE:"resize", SCROLL:"scroll", UNLOAD:"unload", CANPLAY:"canplay", CANPLAYTHROUGH:"canplaythrough", DURATIONCHANGE:"durationchange", EMPTIED:"emptied", ENDED:"ended", LOADEDDATA:"loadeddata", LOADEDMETADATA:"loadedmetadata", PAUSE:"pause", PLAY:"play", PLAYING:"playing", RATECHANGE:"ratechange", SEEKED:"seeked", SEEKING:"seeking", STALLED:"stalled", SUSPEND:"suspend", 
TIMEUPDATE:"timeupdate", VOLUMECHANGE:"volumechange", WAITING:"waiting", HASHCHANGE:"hashchange", PAGEHIDE:"pagehide", PAGESHOW:"pageshow", POPSTATE:"popstate", COPY:"copy", PASTE:"paste", CUT:"cut", BEFORECOPY:"beforecopy", BEFORECUT:"beforecut", BEFOREPASTE:"beforepaste", ONLINE:"online", OFFLINE:"offline", MESSAGE:"message", CONNECT:"connect", ANIMATIONSTART:goog.events.getVendorPrefixedName_("AnimationStart"), ANIMATIONEND:goog.events.getVendorPrefixedName_("AnimationEnd"), ANIMATIONITERATION:goog.events.getVendorPrefixedName_("AnimationIteration"), 
TRANSITIONEND:goog.events.getVendorPrefixedName_("TransitionEnd"), POINTERDOWN:"pointerdown", POINTERUP:"pointerup", POINTERCANCEL:"pointercancel", POINTERMOVE:"pointermove", POINTEROVER:"pointerover", POINTEROUT:"pointerout", POINTERENTER:"pointerenter", POINTERLEAVE:"pointerleave", GOTPOINTERCAPTURE:"gotpointercapture", LOSTPOINTERCAPTURE:"lostpointercapture", MSGESTURECHANGE:"MSGestureChange", MSGESTUREEND:"MSGestureEnd", MSGESTUREHOLD:"MSGestureHold", MSGESTURESTART:"MSGestureStart", MSGESTURETAP:"MSGestureTap", 
MSGOTPOINTERCAPTURE:"MSGotPointerCapture", MSINERTIASTART:"MSInertiaStart", MSLOSTPOINTERCAPTURE:"MSLostPointerCapture", MSPOINTERCANCEL:"MSPointerCancel", MSPOINTERDOWN:"MSPointerDown", MSPOINTERENTER:"MSPointerEnter", MSPOINTERHOVER:"MSPointerHover", MSPOINTERLEAVE:"MSPointerLeave", MSPOINTERMOVE:"MSPointerMove", MSPOINTEROUT:"MSPointerOut", MSPOINTEROVER:"MSPointerOver", MSPOINTERUP:"MSPointerUp", TEXT:"text", TEXTINPUT:"textInput", COMPOSITIONSTART:"compositionstart", COMPOSITIONUPDATE:"compositionupdate", 
COMPOSITIONEND:"compositionend", EXIT:"exit", LOADABORT:"loadabort", LOADCOMMIT:"loadcommit", LOADREDIRECT:"loadredirect", LOADSTART:"loadstart", LOADSTOP:"loadstop", RESPONSIVE:"responsive", SIZECHANGED:"sizechanged", UNRESPONSIVE:"unresponsive", VISIBILITYCHANGE:"visibilitychange", STORAGE:"storage", DOMSUBTREEMODIFIED:"DOMSubtreeModified", DOMNODEINSERTED:"DOMNodeInserted", DOMNODEREMOVED:"DOMNodeRemoved", DOMNODEREMOVEDFROMDOCUMENT:"DOMNodeRemovedFromDocument", DOMNODEINSERTEDINTODOCUMENT:"DOMNodeInsertedIntoDocument", 
DOMATTRMODIFIED:"DOMAttrModified", DOMCHARACTERDATAMODIFIED:"DOMCharacterDataModified", BEFOREPRINT:"beforeprint", AFTERPRINT:"afterprint"};
goog.events.BrowserEvent = function(a, b) {
  goog.events.Event.call(this, a ? a.type : "");
  this.relatedTarget = this.currentTarget = this.target = null;
  this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
  this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
  this.state = null;
  this.platformModifierKey = !1;
  this.event_ = null;
  a && this.init(a, b);
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {LEFT:0, MIDDLE:1, RIGHT:2};
goog.events.BrowserEvent.IEButtonMap = [1, 4, 2];
goog.events.BrowserEvent.prototype.init = function(a, b) {
  var c = this.type = a.type, d = a.changedTouches ? a.changedTouches[0] : null;
  this.target = a.target || a.srcElement;
  this.currentTarget = b;
  var e = a.relatedTarget;
  e ? goog.userAgent.GECKO && (goog.reflect.canAccessProperty(e, "nodeName") || (e = null)) : c == goog.events.EventType.MOUSEOVER ? e = a.fromElement : c == goog.events.EventType.MOUSEOUT && (e = a.toElement);
  this.relatedTarget = e;
  goog.isNull(d) ? (this.offsetX = goog.userAgent.WEBKIT || void 0 !== a.offsetX ? a.offsetX : a.layerX, this.offsetY = goog.userAgent.WEBKIT || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = 
  d.screenX || 0, this.screenY = d.screenY || 0);
  this.button = a.button;
  this.keyCode = a.keyCode || 0;
  this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
  this.ctrlKey = a.ctrlKey;
  this.altKey = a.altKey;
  this.shiftKey = a.shiftKey;
  this.metaKey = a.metaKey;
  this.platformModifierKey = goog.userAgent.MAC ? a.metaKey : a.ctrlKey;
  this.state = a.state;
  this.event_ = a;
  a.defaultPrevented && this.preventDefault();
};
goog.events.BrowserEvent.prototype.isButton = function(a) {
  return goog.events.BrowserFeature.HAS_W3C_BUTTON ? this.event_.button == a : "click" == this.type ? a == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IEButtonMap[a]);
};
goog.events.BrowserEvent.prototype.isMouseActionButton = function() {
  return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey);
};
goog.events.BrowserEvent.prototype.stopPropagation = function() {
  goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
  this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0;
};
goog.events.BrowserEvent.prototype.preventDefault = function() {
  goog.events.BrowserEvent.superClass_.preventDefault.call(this);
  var a = this.event_;
  if (a.preventDefault) {
    a.preventDefault();
  } else {
    if (a.returnValue = !1, goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) {
      try {
        if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) {
          a.keyCode = -1;
        }
      } catch (b) {
      }
    }
  }
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
  return this.event_;
};
goog.events.Listenable = function() {
};
goog.events.Listenable.IMPLEMENTED_BY_PROP = "closure_listenable_" + (1e6 * Math.random() | 0);
goog.events.Listenable.addImplementation = function(a) {
  a.prototype[goog.events.Listenable.IMPLEMENTED_BY_PROP] = !0;
};
goog.events.Listenable.isImplementedBy = function(a) {
  return !(!a || !a[goog.events.Listenable.IMPLEMENTED_BY_PROP]);
};
goog.events.ListenableKey = function() {
};
goog.events.ListenableKey.counter_ = 0;
goog.events.ListenableKey.reserveKey = function() {
  return ++goog.events.ListenableKey.counter_;
};
goog.events.Listener = function(a, b, c, d, e, f) {
  goog.events.Listener.ENABLE_MONITORING && (this.creationStack = Error().stack);
  this.listener = a;
  this.proxy = b;
  this.src = c;
  this.type = d;
  this.capture = !!e;
  this.handler = f;
  this.key = goog.events.ListenableKey.reserveKey();
  this.removed = this.callOnce = !1;
};
goog.events.Listener.ENABLE_MONITORING = !1;
goog.events.Listener.prototype.markAsRemoved = function() {
  this.removed = !0;
  this.handler = this.src = this.proxy = this.listener = null;
};
goog.events.ListenerMap = function(a) {
  this.src = a;
  this.listeners = {};
  this.typeCount_ = 0;
};
goog.events.ListenerMap.prototype.getTypeCount = function() {
  return this.typeCount_;
};
goog.events.ListenerMap.prototype.getListenerCount = function() {
  var a = 0, b;
  for (b in this.listeners) {
    a += this.listeners[b].length;
  }
  return a;
};
goog.events.ListenerMap.prototype.add = function(a, b, c, d, e) {
  var f = a.toString();
  a = this.listeners[f];
  a || (a = this.listeners[f] = [], this.typeCount_++);
  var g = goog.events.ListenerMap.findListenerIndex_(a, b, d, e);
  -1 < g ? (b = a[g], c || (b.callOnce = !1)) : (b = new goog.events.Listener(b, null, this.src, f, !!d, e), b.callOnce = c, a.push(b));
  return b;
};
goog.events.ListenerMap.prototype.remove = function(a, b, c, d) {
  a = a.toString();
  if (!(a in this.listeners)) {
    return !1;
  }
  var e = this.listeners[a];
  b = goog.events.ListenerMap.findListenerIndex_(e, b, c, d);
  return -1 < b ? (e[b].markAsRemoved(), goog.array.removeAt(e, b), 0 == e.length && (delete this.listeners[a], this.typeCount_--), !0) : !1;
};
goog.events.ListenerMap.prototype.removeByKey = function(a) {
  var b = a.type;
  if (!(b in this.listeners)) {
    return !1;
  }
  var c = goog.array.remove(this.listeners[b], a);
  c && (a.markAsRemoved(), 0 == this.listeners[b].length && (delete this.listeners[b], this.typeCount_--));
  return c;
};
goog.events.ListenerMap.prototype.removeAll = function(a) {
  a = a && a.toString();
  var b = 0, c;
  for (c in this.listeners) {
    if (!a || c == a) {
      for (var d = this.listeners[c], e = 0; e < d.length; e++) {
        ++b, d[e].markAsRemoved();
      }
      delete this.listeners[c];
      this.typeCount_--;
    }
  }
  return b;
};
goog.events.ListenerMap.prototype.getListeners = function(a, b) {
  var c = this.listeners[a.toString()], d = [];
  if (c) {
    for (var e = 0; e < c.length; ++e) {
      var f = c[e];
      f.capture == b && d.push(f);
    }
  }
  return d;
};
goog.events.ListenerMap.prototype.getListener = function(a, b, c, d) {
  a = this.listeners[a.toString()];
  var e = -1;
  a && (e = goog.events.ListenerMap.findListenerIndex_(a, b, c, d));
  return -1 < e ? a[e] : null;
};
goog.events.ListenerMap.prototype.hasListener = function(a, b) {
  var c = goog.isDef(a), d = c ? a.toString() : "", e = goog.isDef(b);
  return goog.object.some(this.listeners, function(a, g) {
    for (var f = 0; f < a.length; ++f) {
      if (!(c && a[f].type != d || e && a[f].capture != b)) {
        return !0;
      }
    }
    return !1;
  });
};
goog.events.ListenerMap.findListenerIndex_ = function(a, b, c, d) {
  for (var e = 0; e < a.length; ++e) {
    var f = a[e];
    if (!f.removed && f.listener == b && f.capture == !!c && f.handler == d) {
      return e;
    }
  }
  return -1;
};
goog.events.LISTENER_MAP_PROP_ = "closure_lm_" + (1e6 * Math.random() | 0);
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.CaptureSimulationMode = {OFF_AND_FAIL:0, OFF_AND_SILENT:1, ON:2};
goog.events.CAPTURE_SIMULATION_MODE = 2;
goog.events.listenerCountEstimate_ = 0;
goog.events.listen = function(a, b, c, d, e) {
  if (goog.isArray(b)) {
    for (var f = 0; f < b.length; f++) {
      goog.events.listen(a, b[f], c, d, e);
    }
    return null;
  }
  c = goog.events.wrapListener(c);
  return goog.events.Listenable.isImplementedBy(a) ? a.listen(b, c, d, e) : goog.events.listen_(a, b, c, !1, d, e);
};
goog.events.listen_ = function(a, b, c, d, e, f) {
  if (!b) {
    throw Error("Invalid event type");
  }
  var g = !!e;
  if (g && !goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
    if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_FAIL) {
      return goog.asserts.fail("Can not register capture listener in IE8-."), null;
    }
    if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_SILENT) {
      return null;
    }
  }
  var h = goog.events.getListenerMap_(a);
  h || (a[goog.events.LISTENER_MAP_PROP_] = h = new goog.events.ListenerMap(a));
  c = h.add(b, c, d, e, f);
  if (c.proxy) {
    return c;
  }
  d = goog.events.getProxy();
  c.proxy = d;
  d.src = a;
  d.listener = c;
  if (a.addEventListener) {
    a.addEventListener(b.toString(), d, g);
  } else {
    if (a.attachEvent) {
      a.attachEvent(goog.events.getOnString_(b.toString()), d);
    } else {
      throw Error("addEventListener and attachEvent are unavailable.");
    }
  }
  goog.events.listenerCountEstimate_++;
  return c;
};
goog.events.getProxy = function() {
  var a = goog.events.handleBrowserEvent_, b = goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT ? function(c) {
    return a.call(b.src, b.listener, c);
  } : function(c) {
    c = a.call(b.src, b.listener, c);
    if (!c) {
      return c;
    }
  };
  return b;
};
goog.events.listenOnce = function(a, b, c, d, e) {
  if (goog.isArray(b)) {
    for (var f = 0; f < b.length; f++) {
      goog.events.listenOnce(a, b[f], c, d, e);
    }
    return null;
  }
  c = goog.events.wrapListener(c);
  return goog.events.Listenable.isImplementedBy(a) ? a.listenOnce(b, c, d, e) : goog.events.listen_(a, b, c, !0, d, e);
};
goog.events.listenWithWrapper = function(a, b, c, d, e) {
  b.listen(a, c, d, e);
};
goog.events.unlisten = function(a, b, c, d, e) {
  if (goog.isArray(b)) {
    for (var f = 0; f < b.length; f++) {
      goog.events.unlisten(a, b[f], c, d, e);
    }
    return null;
  }
  c = goog.events.wrapListener(c);
  if (goog.events.Listenable.isImplementedBy(a)) {
    return a.unlisten(b, c, d, e);
  }
  if (!a) {
    return !1;
  }
  d = !!d;
  if (a = goog.events.getListenerMap_(a)) {
    if (b = a.getListener(b, c, d, e)) {
      return goog.events.unlistenByKey(b);
    }
  }
  return !1;
};
goog.events.unlistenByKey = function(a) {
  if (goog.isNumber(a) || !a || a.removed) {
    return !1;
  }
  var b = a.src;
  if (goog.events.Listenable.isImplementedBy(b)) {
    return b.unlistenByKey(a);
  }
  var c = a.type, d = a.proxy;
  b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent && b.detachEvent(goog.events.getOnString_(c), d);
  goog.events.listenerCountEstimate_--;
  (c = goog.events.getListenerMap_(b)) ? (c.removeByKey(a), 0 == c.getTypeCount() && (c.src = null, b[goog.events.LISTENER_MAP_PROP_] = null)) : a.markAsRemoved();
  return !0;
};
goog.events.unlistenWithWrapper = function(a, b, c, d, e) {
  b.unlisten(a, c, d, e);
};
goog.events.removeAll = function(a, b) {
  if (!a) {
    return 0;
  }
  if (goog.events.Listenable.isImplementedBy(a)) {
    return a.removeAllListeners(b);
  }
  var c = goog.events.getListenerMap_(a);
  if (!c) {
    return 0;
  }
  var d = 0, e = b && b.toString(), f;
  for (f in c.listeners) {
    if (!e || f == e) {
      for (var g = c.listeners[f].concat(), h = 0; h < g.length; ++h) {
        goog.events.unlistenByKey(g[h]) && ++d;
      }
    }
  }
  return d;
};
goog.events.getListeners = function(a, b, c) {
  return goog.events.Listenable.isImplementedBy(a) ? a.getListeners(b, c) : a ? (a = goog.events.getListenerMap_(a)) ? a.getListeners(b, c) : [] : [];
};
goog.events.getListener = function(a, b, c, d, e) {
  c = goog.events.wrapListener(c);
  d = !!d;
  return goog.events.Listenable.isImplementedBy(a) ? a.getListener(b, c, d, e) : a ? (a = goog.events.getListenerMap_(a)) ? a.getListener(b, c, d, e) : null : null;
};
goog.events.hasListener = function(a, b, c) {
  if (goog.events.Listenable.isImplementedBy(a)) {
    return a.hasListener(b, c);
  }
  a = goog.events.getListenerMap_(a);
  return !!a && a.hasListener(b, c);
};
goog.events.expose = function(a) {
  var b = [], c;
  for (c in a) {
    a[c] && a[c].id ? b.push(c + " = " + a[c] + " (" + a[c].id + ")") : b.push(c + " = " + a[c]);
  }
  return b.join("\n");
};
goog.events.getOnString_ = function(a) {
  return a in goog.events.onStringMap_ ? goog.events.onStringMap_[a] : goog.events.onStringMap_[a] = goog.events.onString_ + a;
};
goog.events.fireListeners = function(a, b, c, d) {
  return goog.events.Listenable.isImplementedBy(a) ? a.fireListeners(b, c, d) : goog.events.fireListeners_(a, b, c, d);
};
goog.events.fireListeners_ = function(a, b, c, d) {
  var e = !0;
  if (a = goog.events.getListenerMap_(a)) {
    if (b = a.listeners[b.toString()]) {
      for (b = b.concat(), a = 0; a < b.length; a++) {
        var f = b[a];
        f && f.capture == c && !f.removed && (f = goog.events.fireListener(f, d), e = e && !1 !== f);
      }
    }
  }
  return e;
};
goog.events.fireListener = function(a, b) {
  var c = a.listener, d = a.handler || a.src;
  a.callOnce && goog.events.unlistenByKey(a);
  return c.call(d, b);
};
goog.events.getTotalListenerCount = function() {
  return goog.events.listenerCountEstimate_;
};
goog.events.dispatchEvent = function(a, b) {
  goog.asserts.assert(goog.events.Listenable.isImplementedBy(a), "Can not use goog.events.dispatchEvent with non-goog.events.Listenable instance.");
  return a.dispatchEvent(b);
};
goog.events.protectBrowserEventEntryPoint = function(a) {
  goog.events.handleBrowserEvent_ = a.protectEntryPoint(goog.events.handleBrowserEvent_);
};
goog.events.handleBrowserEvent_ = function(a, b) {
  var c;
  if (a.removed) {
    return !0;
  }
  if (!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
    var d = b || goog.getObjectByName("window.event");
    var e = new goog.events.BrowserEvent(d, this);
    var f = !0;
    if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.ON) {
      if (!goog.events.isMarkedIeEvent_(d)) {
        goog.events.markIeEvent_(d);
        d = [];
        for (c = e.currentTarget; c; c = c.parentNode) {
          d.push(c);
        }
        c = a.type;
        for (var g = d.length - 1; !e.propagationStopped_ && 0 <= g; g--) {
          e.currentTarget = d[g];
          var h = goog.events.fireListeners_(d[g], c, !0, e);
          f = f && h;
        }
        for (g = 0; !e.propagationStopped_ && g < d.length; g++) {
          e.currentTarget = d[g], h = goog.events.fireListeners_(d[g], c, !1, e), f = f && h;
        }
      }
    } else {
      f = goog.events.fireListener(a, e);
    }
    return f;
  }
  return goog.events.fireListener(a, new goog.events.BrowserEvent(b, this));
};
goog.events.markIeEvent_ = function(a) {
  var b = !1;
  if (0 == a.keyCode) {
    try {
      a.keyCode = -1;
      return;
    } catch (c) {
      b = !0;
    }
  }
  if (b || void 0 == a.returnValue) {
    a.returnValue = !0;
  }
};
goog.events.isMarkedIeEvent_ = function(a) {
  return 0 > a.keyCode || void 0 != a.returnValue;
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function(a) {
  return a + "_" + goog.events.uniqueIdCounter_++;
};
goog.events.getListenerMap_ = function(a) {
  a = a[goog.events.LISTENER_MAP_PROP_];
  return a instanceof goog.events.ListenerMap ? a : null;
};
goog.events.LISTENER_WRAPPER_PROP_ = "__closure_events_fn_" + (1e9 * Math.random() >>> 0);
goog.events.wrapListener = function(a) {
  goog.asserts.assert(a, "Listener can not be null.");
  if (goog.isFunction(a)) {
    return a;
  }
  goog.asserts.assert(a.handleEvent, "An object listener must have handleEvent method.");
  a[goog.events.LISTENER_WRAPPER_PROP_] || (a[goog.events.LISTENER_WRAPPER_PROP_] = function(b) {
    return a.handleEvent(b);
  });
  return a[goog.events.LISTENER_WRAPPER_PROP_];
};
goog.debug.entryPointRegistry.register(function(a) {
  goog.events.handleBrowserEvent_ = a(goog.events.handleBrowserEvent_);
});
goog.events.EventTarget = function() {
  goog.Disposable.call(this);
  this.eventTargetListeners_ = new goog.events.ListenerMap(this);
  this.actualEventTarget_ = this;
  this.parentEventTarget_ = null;
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.Listenable.addImplementation(goog.events.EventTarget);
goog.events.EventTarget.MAX_ANCESTORS_ = 1000;
goog.events.EventTarget.prototype.getParentEventTarget = function() {
  return this.parentEventTarget_;
};
goog.events.EventTarget.prototype.setParentEventTarget = function(a) {
  this.parentEventTarget_ = a;
};
goog.events.EventTarget.prototype.addEventListener = function(a, b, c, d) {
  goog.events.listen(this, a, b, c, d);
};
goog.events.EventTarget.prototype.removeEventListener = function(a, b, c, d) {
  goog.events.unlisten(this, a, b, c, d);
};
goog.events.EventTarget.prototype.dispatchEvent = function(a) {
  this.assertInitialized_();
  var b = this.getParentEventTarget();
  if (b) {
    var c = [];
    for (var d = 1; b; b = b.getParentEventTarget()) {
      c.push(b), goog.asserts.assert(++d < goog.events.EventTarget.MAX_ANCESTORS_, "infinite loop");
    }
  }
  return goog.events.EventTarget.dispatchEventInternal_(this.actualEventTarget_, a, c);
};
goog.events.EventTarget.prototype.disposeInternal = function() {
  goog.events.EventTarget.superClass_.disposeInternal.call(this);
  this.removeAllListeners();
  this.parentEventTarget_ = null;
};
goog.events.EventTarget.prototype.listen = function(a, b, c, d) {
  this.assertInitialized_();
  return this.eventTargetListeners_.add(String(a), b, !1, c, d);
};
goog.events.EventTarget.prototype.listenOnce = function(a, b, c, d) {
  return this.eventTargetListeners_.add(String(a), b, !0, c, d);
};
goog.events.EventTarget.prototype.unlisten = function(a, b, c, d) {
  return this.eventTargetListeners_.remove(String(a), b, c, d);
};
goog.events.EventTarget.prototype.unlistenByKey = function(a) {
  return this.eventTargetListeners_.removeByKey(a);
};
goog.events.EventTarget.prototype.removeAllListeners = function(a) {
  return this.eventTargetListeners_ ? this.eventTargetListeners_.removeAll(a) : 0;
};
goog.events.EventTarget.prototype.fireListeners = function(a, b, c) {
  a = this.eventTargetListeners_.listeners[String(a)];
  if (!a) {
    return !0;
  }
  a = a.concat();
  for (var d = !0, e = 0; e < a.length; ++e) {
    var f = a[e];
    if (f && !f.removed && f.capture == b) {
      var g = f.listener, h = f.handler || f.src;
      f.callOnce && this.unlistenByKey(f);
      d = !1 !== g.call(h, c) && d;
    }
  }
  return d && 0 != c.returnValue_;
};
goog.events.EventTarget.prototype.getListeners = function(a, b) {
  return this.eventTargetListeners_.getListeners(String(a), b);
};
goog.events.EventTarget.prototype.getListener = function(a, b, c, d) {
  return this.eventTargetListeners_.getListener(String(a), b, c, d);
};
goog.events.EventTarget.prototype.hasListener = function(a, b) {
  var c = goog.isDef(a) ? String(a) : void 0;
  return this.eventTargetListeners_.hasListener(c, b);
};
goog.events.EventTarget.prototype.setTargetForTesting = function(a) {
  this.actualEventTarget_ = a;
};
goog.events.EventTarget.prototype.assertInitialized_ = function() {
  goog.asserts.assert(this.eventTargetListeners_, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?");
};
goog.events.EventTarget.dispatchEventInternal_ = function(a, b, c) {
  var d = b.type || b;
  if (goog.isString(b)) {
    b = new goog.events.Event(b, a);
  } else {
    if (b instanceof goog.events.Event) {
      b.target = b.target || a;
    } else {
      var e = b;
      b = new goog.events.Event(d, a);
      goog.object.extend(b, e);
    }
  }
  var e = !0;
  if (c) {
    for (var f = c.length - 1; !b.propagationStopped_ && 0 <= f; f--) {
      var g = b.currentTarget = c[f];
      e = g.fireListeners(d, !0, b) && e;
    }
  }
  b.propagationStopped_ || (g = b.currentTarget = a, e = g.fireListeners(d, !0, b) && e, b.propagationStopped_ || (e = g.fireListeners(d, !1, b) && e));
  if (c) {
    for (f = 0; !b.propagationStopped_ && f < c.length; f++) {
      g = b.currentTarget = c[f], e = g.fireListeners(d, !1, b) && e;
    }
  }
  return e;
};
goog.Timer = function(a, b) {
  goog.events.EventTarget.call(this);
  this.interval_ = a || 1;
  this.timerObject_ = b || goog.Timer.defaultTimerObject;
  this.boundTick_ = goog.bind(this.tick_, this);
  this.last_ = goog.now();
};
goog.inherits(goog.Timer, goog.events.EventTarget);
goog.Timer.MAX_TIMEOUT_ = 2147483647;
goog.Timer.INVALID_TIMEOUT_ID_ = -1;
goog.Timer.prototype.enabled = !1;
goog.Timer.defaultTimerObject = goog.global;
goog.Timer.intervalScale = 0.8;
goog.Timer.prototype.timer_ = null;
goog.Timer.prototype.getInterval = function() {
  return this.interval_;
};
goog.Timer.prototype.setInterval = function(a) {
  this.interval_ = a;
  this.timer_ && this.enabled ? (this.stop(), this.start()) : this.timer_ && this.stop();
};
goog.Timer.prototype.tick_ = function() {
  if (this.enabled) {
    var a = goog.now() - this.last_;
    0 < a && a < this.interval_ * goog.Timer.intervalScale ? this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - a) : (this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null), this.dispatchTick(), this.enabled && (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now()));
  }
};
goog.Timer.prototype.dispatchTick = function() {
  this.dispatchEvent(goog.Timer.TICK);
};
goog.Timer.prototype.start = function() {
  this.enabled = !0;
  this.timer_ || (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now());
};
goog.Timer.prototype.stop = function() {
  this.enabled = !1;
  this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null);
};
goog.Timer.prototype.disposeInternal = function() {
  goog.Timer.superClass_.disposeInternal.call(this);
  this.stop();
  delete this.timerObject_;
};
goog.Timer.TICK = "tick";
goog.Timer.callOnce = function(a, b, c) {
  if (goog.isFunction(a)) {
    c && (a = goog.bind(a, c));
  } else {
    if (a && "function" == typeof a.handleEvent) {
      a = goog.bind(a.handleEvent, a);
    } else {
      throw Error("Invalid listener argument");
    }
  }
  return Number(b) > goog.Timer.MAX_TIMEOUT_ ? goog.Timer.INVALID_TIMEOUT_ID_ : goog.Timer.defaultTimerObject.setTimeout(a, b || 0);
};
goog.Timer.clear = function(a) {
  goog.Timer.defaultTimerObject.clearTimeout(a);
};
goog.Timer.promise = function(a, b) {
  var c = null;
  return (new goog.Promise(function(d, e) {
    c = goog.Timer.callOnce(function() {
      d(b);
    }, a);
    c == goog.Timer.INVALID_TIMEOUT_ID_ && e(Error("Failed to schedule timer."));
  })).thenCatch(function(a) {
    goog.Timer.clear(c);
    throw a;
  });
};
goog.json = {};
goog.json.USE_NATIVE_JSON = !1;
goog.json.isValid = function(a) {
  return /^\s*$/.test(a) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""));
};
goog.json.parse = goog.json.USE_NATIVE_JSON ? goog.global.JSON.parse : function(a) {
  a = String(a);
  if (goog.json.isValid(a)) {
    try {
      return eval("(" + a + ")");
    } catch (b) {
    }
  }
  throw Error("Invalid JSON string: " + a);
};
goog.json.unsafeParse = goog.json.USE_NATIVE_JSON ? goog.global.JSON.parse : function(a) {
  return eval("(" + a + ")");
};
goog.json.serialize = goog.json.USE_NATIVE_JSON ? goog.global.JSON.stringify : function(a, b) {
  return (new goog.json.Serializer(b)).serialize(a);
};
goog.json.Serializer = function(a) {
  this.replacer_ = a;
};
goog.json.Serializer.prototype.serialize = function(a) {
  var b = [];
  this.serializeInternal(a, b);
  return b.join("");
};
goog.json.Serializer.prototype.serializeInternal = function(a, b) {
  if (null == a) {
    b.push("null");
  } else {
    if ("object" == typeof a) {
      if (goog.isArray(a)) {
        this.serializeArray(a, b);
        return;
      }
      if (a instanceof String || a instanceof Number || a instanceof Boolean) {
        a = a.valueOf();
      } else {
        this.serializeObject_(a, b);
        return;
      }
    }
    switch(typeof a) {
      case "string":
        this.serializeString_(a, b);
        break;
      case "number":
        this.serializeNumber_(a, b);
        break;
      case "boolean":
        b.push(String(a));
        break;
      case "function":
        b.push("null");
        break;
      default:
        throw Error("Unknown type: " + typeof a);
    }
  }
};
goog.json.Serializer.charToJsonCharCache_ = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\u000b"};
goog.json.Serializer.charsToReplace_ = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
goog.json.Serializer.prototype.serializeString_ = function(a, b) {
  b.push('"', a.replace(goog.json.Serializer.charsToReplace_, function(a) {
    var b = goog.json.Serializer.charToJsonCharCache_[a];
    b || (b = "\\u" + (a.charCodeAt(0) | 65536).toString(16).substr(1), goog.json.Serializer.charToJsonCharCache_[a] = b);
    return b;
  }), '"');
};
goog.json.Serializer.prototype.serializeNumber_ = function(a, b) {
  b.push(isFinite(a) && !isNaN(a) ? String(a) : "null");
};
goog.json.Serializer.prototype.serializeArray = function(a, b) {
  var c = a.length;
  b.push("[");
  for (var d = "", e = 0; e < c; e++) {
    b.push(d), d = a[e], this.serializeInternal(this.replacer_ ? this.replacer_.call(a, String(e), d) : d, b), d = ",";
  }
  b.push("]");
};
goog.json.Serializer.prototype.serializeObject_ = function(a, b) {
  b.push("{");
  var c = "", d;
  for (d in a) {
    if (Object.prototype.hasOwnProperty.call(a, d)) {
      var e = a[d];
      "function" != typeof e && (b.push(c), this.serializeString_(d, b), b.push(":"), this.serializeInternal(this.replacer_ ? this.replacer_.call(a, d, e) : e, b), c = ",");
    }
  }
  b.push("}");
};
goog.dom.tags = {};
goog.dom.tags.VOID_TAGS_ = {area:!0, base:!0, br:!0, col:!0, command:!0, embed:!0, hr:!0, img:!0, input:!0, keygen:!0, link:!0, meta:!0, param:!0, source:!0, track:!0, wbr:!0};
goog.dom.tags.isVoidTag = function(a) {
  return !0 === goog.dom.tags.VOID_TAGS_[a];
};
goog.string.TypedString = function() {
};
goog.string.Const = function() {
  this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = "";
  this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog.string.Const.TYPE_MARKER_;
};
goog.string.Const.prototype.implementsGoogStringTypedString = !0;
goog.string.Const.prototype.getTypedStringValue = function() {
  return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
};
goog.string.Const.prototype.toString = function() {
  return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}";
};
goog.string.Const.unwrap = function(a) {
  if (a instanceof goog.string.Const && a.constructor === goog.string.Const && a.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog.string.Const.TYPE_MARKER_) {
    return a.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
  }
  goog.asserts.fail("expected object of type Const, got '" + a + "'");
  return "type_error:Const";
};
goog.string.Const.from = function(a) {
  return goog.string.Const.create__googStringSecurityPrivate_(a);
};
goog.string.Const.TYPE_MARKER_ = {};
goog.string.Const.create__googStringSecurityPrivate_ = function(a) {
  var b = new goog.string.Const;
  b.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = a;
  return b;
};
goog.html = {};
goog.html.SafeStyle = function() {
  this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = "";
  this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
};
goog.html.SafeStyle.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeStyle.fromConstant = function(a) {
  a = goog.string.Const.unwrap(a);
  if (0 === a.length) {
    return goog.html.SafeStyle.EMPTY;
  }
  goog.html.SafeStyle.checkStyle_(a);
  goog.asserts.assert(goog.string.endsWith(a, ";"), "Last character of style string is not ';': " + a);
  goog.asserts.assert(goog.string.contains(a, ":"), "Style string must contain at least one ':', to specify a \"name: value\" pair: " + a);
  return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.SafeStyle.checkStyle_ = function(a) {
  goog.asserts.assert(!/[<>]/.test(a), "Forbidden characters in style string: " + a);
};
goog.html.SafeStyle.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeStyleWrappedValue_;
};
goog.DEBUG && (goog.html.SafeStyle.prototype.toString = function() {
  return "SafeStyle{" + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + "}";
});
goog.html.SafeStyle.unwrap = function(a) {
  if (a instanceof goog.html.SafeStyle && a.constructor === goog.html.SafeStyle && a.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseSafeStyleWrappedValue_;
  }
  goog.asserts.fail("expected object of type SafeStyle, got '" + a + "' of type " + goog.typeOf(a));
  return "type_error:SafeStyle";
};
goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse = function(a) {
  return (new goog.html.SafeStyle).initSecurityPrivateDoNotAccessOrElse_(a);
};
goog.html.SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
  this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = a;
  return this;
};
goog.html.SafeStyle.EMPTY = goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse("");
goog.html.SafeStyle.INNOCUOUS_STRING = "zClosurez";
goog.html.SafeStyle.create = function(a) {
  var b = "", c;
  for (c in a) {
    if (!/^[-_a-zA-Z0-9]+$/.test(c)) {
      throw Error("Name allows only [-_a-zA-Z0-9], got: " + c);
    }
    var d = a[c];
    null != d && (d instanceof goog.string.Const ? (d = goog.string.Const.unwrap(d), goog.asserts.assert(!/[{;}]/.test(d), "Value does not allow [{;}].")) : goog.html.SafeStyle.VALUE_RE_.test(d) ? goog.html.SafeStyle.hasBalancedQuotes_(d) || (goog.asserts.fail("String value requires balanced quotes, got: " + d), d = goog.html.SafeStyle.INNOCUOUS_STRING) : (goog.asserts.fail("String value allows only [-,.\"'%_!# a-zA-Z0-9], rgb() and rgba(), got: " + d), d = goog.html.SafeStyle.INNOCUOUS_STRING), 
    b += c + ":" + d + ";");
  }
  if (!b) {
    return goog.html.SafeStyle.EMPTY;
  }
  goog.html.SafeStyle.checkStyle_(b);
  return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.SafeStyle.hasBalancedQuotes_ = function(a) {
  for (var b = !0, c = !0, d = 0; d < a.length; d++) {
    var e = a.charAt(d);
    "'" == e && c ? b = !b : '"' == e && b && (c = !c);
  }
  return b && c;
};
goog.html.SafeStyle.VALUE_RE_ = /^([-,."'%_!# a-zA-Z0-9]+|(?:rgb|hsl)a?\([0-9.%, ]+\))$/;
goog.html.SafeStyle.concat = function(a) {
  var b = "", c = function(a) {
    goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyle.unwrap(a);
  };
  goog.array.forEach(arguments, c);
  return b ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b) : goog.html.SafeStyle.EMPTY;
};
goog.html.SafeStyleSheet = function() {
  this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = "";
  this.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
};
goog.html.SafeStyleSheet.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeStyleSheet.concat = function(a) {
  var b = "", c = function(a) {
    goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyleSheet.unwrap(a);
  };
  goog.array.forEach(arguments, c);
  return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.SafeStyleSheet.fromConstant = function(a) {
  a = goog.string.Const.unwrap(a);
  if (0 === a.length) {
    return goog.html.SafeStyleSheet.EMPTY;
  }
  goog.asserts.assert(!goog.string.contains(a, "<"), "Forbidden '<' character in style sheet string: " + a);
  return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.SafeStyleSheet.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
};
goog.DEBUG && (goog.html.SafeStyleSheet.prototype.toString = function() {
  return "SafeStyleSheet{" + this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ + "}";
});
goog.html.SafeStyleSheet.unwrap = function(a) {
  if (a instanceof goog.html.SafeStyleSheet && a.constructor === goog.html.SafeStyleSheet && a.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
  }
  goog.asserts.fail("expected object of type SafeStyleSheet, got '" + a + "' of type " + goog.typeOf(a));
  return "type_error:SafeStyleSheet";
};
goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse = function(a) {
  return (new goog.html.SafeStyleSheet).initSecurityPrivateDoNotAccessOrElse_(a);
};
goog.html.SafeStyleSheet.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
  this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = a;
  return this;
};
goog.html.SafeStyleSheet.EMPTY = goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse("");
goog.fs = {};
goog.fs.url = {};
goog.fs.url.createObjectUrl = function(a) {
  return goog.fs.url.getUrlObject_().createObjectURL(a);
};
goog.fs.url.revokeObjectUrl = function(a) {
  goog.fs.url.getUrlObject_().revokeObjectURL(a);
};
goog.fs.url.getUrlObject_ = function() {
  var a = goog.fs.url.findUrlObject_();
  if (null != a) {
    return a;
  }
  throw Error("This browser doesn't seem to support blob URLs");
};
goog.fs.url.findUrlObject_ = function() {
  return goog.isDef(goog.global.URL) && goog.isDef(goog.global.URL.createObjectURL) ? goog.global.URL : goog.isDef(goog.global.webkitURL) && goog.isDef(goog.global.webkitURL.createObjectURL) ? goog.global.webkitURL : goog.isDef(goog.global.createObjectURL) ? goog.global : null;
};
goog.fs.url.browserSupportsObjectUrls = function() {
  return null != goog.fs.url.findUrlObject_();
};
goog.i18n = {};
goog.i18n.bidi = {};
goog.i18n.bidi.FORCE_RTL = !1;
goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || ("ar" == goog.LOCALE.substring(0, 2).toLowerCase() || "fa" == goog.LOCALE.substring(0, 2).toLowerCase() || "he" == goog.LOCALE.substring(0, 2).toLowerCase() || "iw" == goog.LOCALE.substring(0, 2).toLowerCase() || "ps" == goog.LOCALE.substring(0, 2).toLowerCase() || "sd" == goog.LOCALE.substring(0, 2).toLowerCase() || "ug" == goog.LOCALE.substring(0, 2).toLowerCase() || "ur" == goog.LOCALE.substring(0, 2).toLowerCase() || "yi" == goog.LOCALE.substring(0, 
2).toLowerCase()) && (2 == goog.LOCALE.length || "-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) || 3 <= goog.LOCALE.length && "ckb" == goog.LOCALE.substring(0, 3).toLowerCase() && (3 == goog.LOCALE.length || "-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4));
goog.i18n.bidi.Format = {LRE:"\u202a", RLE:"\u202b", PDF:"\u202c", LRM:"\u200e", RLM:"\u200f"};
goog.i18n.bidi.Dir = {LTR:1, RTL:-1, NEUTRAL:0};
goog.i18n.bidi.RIGHT = "right";
goog.i18n.bidi.LEFT = "left";
goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT;
goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;
goog.i18n.bidi.toDir = function(a, b) {
  return "number" == typeof a ? 0 < a ? goog.i18n.bidi.Dir.LTR : 0 > a ? goog.i18n.bidi.Dir.RTL : b ? null : goog.i18n.bidi.Dir.NEUTRAL : null == a ? null : a ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
};
goog.i18n.bidi.ltrChars_ = "A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";
goog.i18n.bidi.rtlChars_ = "\u0591-\u06ef\u06fa-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc";
goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;
goog.i18n.bidi.stripHtmlIfNeeded_ = function(a, b) {
  return b ? a.replace(goog.i18n.bidi.htmlSkipReg_, "") : a;
};
goog.i18n.bidi.rtlCharReg_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.ltrCharReg_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.hasAnyRtl = function(a, b) {
  return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl;
goog.i18n.bidi.hasAnyLtr = function(a, b) {
  return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.ltrRe_ = new RegExp("^[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlRe_ = new RegExp("^[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.isRtlChar = function(a) {
  return goog.i18n.bidi.rtlRe_.test(a);
};
goog.i18n.bidi.isLtrChar = function(a) {
  return goog.i18n.bidi.ltrRe_.test(a);
};
goog.i18n.bidi.isNeutralChar = function(a) {
  return !goog.i18n.bidi.isLtrChar(a) && !goog.i18n.bidi.isRtlChar(a);
};
goog.i18n.bidi.ltrDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.rtlChars_ + "]*[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.ltrChars_ + "]*[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.startsWithRtl = function(a, b) {
  return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl;
goog.i18n.bidi.startsWithLtr = function(a, b) {
  return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr;
goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/;
goog.i18n.bidi.isNeutralText = function(a, b) {
  a = goog.i18n.bidi.stripHtmlIfNeeded_(a, b);
  return goog.i18n.bidi.isRequiredLtrRe_.test(a) || !goog.i18n.bidi.hasAnyLtr(a) && !goog.i18n.bidi.hasAnyRtl(a);
};
goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "][^" + goog.i18n.bidi.rtlChars_ + "]*$");
goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "][^" + goog.i18n.bidi.ltrChars_ + "]*$");
goog.i18n.bidi.endsWithLtr = function(a, b) {
  return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr;
goog.i18n.bidi.endsWithRtl = function(a, b) {
  return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl;
goog.i18n.bidi.rtlLocalesRe_ = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
goog.i18n.bidi.isRtlLanguage = function(a) {
  return goog.i18n.bidi.rtlLocalesRe_.test(a);
};
goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;
goog.i18n.bidi.guardBracketInText = function(a, b) {
  var c = (void 0 === b ? goog.i18n.bidi.hasAnyRtl(a) : b) ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
  return a.replace(goog.i18n.bidi.bracketGuardTextRe_, c + "$&" + c);
};
goog.i18n.bidi.enforceRtlInHtml = function(a) {
  return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=rtl") : "\n<span dir=rtl>" + a + "</span>";
};
goog.i18n.bidi.enforceRtlInText = function(a) {
  return goog.i18n.bidi.Format.RLE + a + goog.i18n.bidi.Format.PDF;
};
goog.i18n.bidi.enforceLtrInHtml = function(a) {
  return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=ltr") : "\n<span dir=ltr>" + a + "</span>";
};
goog.i18n.bidi.enforceLtrInText = function(a) {
  return goog.i18n.bidi.Format.LRE + a + goog.i18n.bidi.Format.PDF;
};
goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;
goog.i18n.bidi.leftRe_ = /left/gi;
goog.i18n.bidi.rightRe_ = /right/gi;
goog.i18n.bidi.tempRe_ = /%%%%/g;
goog.i18n.bidi.mirrorCSS = function(a) {
  return a.replace(goog.i18n.bidi.dimensionsRe_, ":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_, "%%%%").replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT);
};
goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g;
goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g;
goog.i18n.bidi.normalizeHebrewQuote = function(a) {
  return a.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, "$1\u05f4").replace(goog.i18n.bidi.singleQuoteSubstituteRe_, "$1\u05f3");
};
goog.i18n.bidi.wordSeparatorRe_ = /\s+/;
goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/;
goog.i18n.bidi.rtlDetectionThreshold_ = 0.40;
goog.i18n.bidi.estimateDirection = function(a, b) {
  for (var c = 0, d = 0, e = !1, f = goog.i18n.bidi.stripHtmlIfNeeded_(a, b).split(goog.i18n.bidi.wordSeparatorRe_), g = 0; g < f.length; g++) {
    var h = f[g];
    goog.i18n.bidi.startsWithRtl(h) ? (c++, d++) : goog.i18n.bidi.isRequiredLtrRe_.test(h) ? e = !0 : goog.i18n.bidi.hasAnyLtr(h) ? d++ : goog.i18n.bidi.hasNumeralsRe_.test(h) && (e = !0);
  }
  return 0 == d ? e ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.NEUTRAL : c / d > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
};
goog.i18n.bidi.detectRtlDirectionality = function(a, b) {
  return goog.i18n.bidi.estimateDirection(a, b) == goog.i18n.bidi.Dir.RTL;
};
goog.i18n.bidi.setElementDirAndAlign = function(a, b) {
  a && (b = goog.i18n.bidi.toDir(b)) && (a.style.textAlign = b == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT, a.dir = b == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr");
};
goog.i18n.bidi.setElementDirByTextDirectionality = function(a, b) {
  switch(goog.i18n.bidi.estimateDirection(b)) {
    case goog.i18n.bidi.Dir.LTR:
      a.dir = "ltr";
      break;
    case goog.i18n.bidi.Dir.RTL:
      a.dir = "rtl";
      break;
    default:
      a.removeAttribute("dir");
  }
};
goog.i18n.bidi.DirectionalString = function() {
};
goog.html.SafeUrl = function() {
  this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
  this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
};
goog.html.SafeUrl.INNOCUOUS_STRING = "about:invalid#zClosurez";
goog.html.SafeUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeUrl.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
};
goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.SafeUrl.prototype.getDirection = function() {
  return goog.i18n.bidi.Dir.LTR;
};
goog.DEBUG && (goog.html.SafeUrl.prototype.toString = function() {
  return "SafeUrl{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}";
});
goog.html.SafeUrl.unwrap = function(a) {
  if (a instanceof goog.html.SafeUrl && a.constructor === goog.html.SafeUrl && a.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
  }
  goog.asserts.fail("expected object of type SafeUrl, got '" + a + "' of type " + goog.typeOf(a));
  return "type_error:SafeUrl";
};
goog.html.SafeUrl.fromConstant = function(a) {
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a));
};
goog.html.SAFE_MIME_TYPE_PATTERN_ = /^(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm))$/i;
goog.html.SafeUrl.fromBlob = function(a) {
  a = goog.html.SAFE_MIME_TYPE_PATTERN_.test(a.type) ? goog.fs.url.createObjectUrl(a) : goog.html.SafeUrl.INNOCUOUS_STRING;
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.DATA_URL_PATTERN_ = /^data:([^;,]*);base64,[a-z0-9+\/]+=*$/i;
goog.html.SafeUrl.fromDataUrl = function(a) {
  var b = a.match(goog.html.DATA_URL_PATTERN_), b = b && goog.html.SAFE_MIME_TYPE_PATTERN_.test(b[1]);
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b ? a : goog.html.SafeUrl.INNOCUOUS_STRING);
};
goog.html.SafeUrl.fromTelUrl = function(a) {
  goog.string.caseInsensitiveStartsWith(a, "tel:") || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i;
goog.html.SafeUrl.sanitize = function(a) {
  if (a instanceof goog.html.SafeUrl) {
    return a;
  }
  a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
  goog.html.SAFE_URL_PATTERN_.test(a) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function(a) {
  var b = new goog.html.SafeUrl;
  b.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
  return b;
};
goog.html.SafeUrl.ABOUT_BLANK = goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse("about:blank");
goog.html.TrustedResourceUrl = function() {
  this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = "";
  this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
};
goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.TrustedResourceUrl.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
};
goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.TrustedResourceUrl.prototype.getDirection = function() {
  return goog.i18n.bidi.Dir.LTR;
};
goog.DEBUG && (goog.html.TrustedResourceUrl.prototype.toString = function() {
  return "TrustedResourceUrl{" + this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "}";
});
goog.html.TrustedResourceUrl.unwrap = function(a) {
  if (a instanceof goog.html.TrustedResourceUrl && a.constructor === goog.html.TrustedResourceUrl && a.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
  }
  goog.asserts.fail("expected object of type TrustedResourceUrl, got '" + a + "' of type " + goog.typeOf(a));
  return "type_error:TrustedResourceUrl";
};
goog.html.TrustedResourceUrl.fromConstant = function(a) {
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a));
};
goog.html.TrustedResourceUrl.fromConstants = function(a) {
  for (var b = "", c = 0; c < a.length; c++) {
    b += goog.string.Const.unwrap(a[c]);
  }
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse = function(a) {
  var b = new goog.html.TrustedResourceUrl;
  b.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = a;
  return b;
};
goog.html.SafeHtml = function() {
  this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
  this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
  this.dir_ = null;
};
goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.SafeHtml.prototype.getDirection = function() {
  return this.dir_;
};
goog.html.SafeHtml.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeHtml.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
};
goog.DEBUG && (goog.html.SafeHtml.prototype.toString = function() {
  return "SafeHtml{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}";
});
goog.html.SafeHtml.unwrap = function(a) {
  if (a instanceof goog.html.SafeHtml && a.constructor === goog.html.SafeHtml && a.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
  }
  goog.asserts.fail("expected object of type SafeHtml, got '" + a + "' of type " + goog.typeOf(a));
  return "type_error:SafeHtml";
};
goog.html.SafeHtml.htmlEscape = function(a) {
  if (a instanceof goog.html.SafeHtml) {
    return a;
  }
  var b = null;
  a.implementsGoogI18nBidiDirectionalString && (b = a.getDirection());
  a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.htmlEscape(a), b);
};
goog.html.SafeHtml.htmlEscapePreservingNewlines = function(a) {
  if (a instanceof goog.html.SafeHtml) {
    return a;
  }
  a = goog.html.SafeHtml.htmlEscape(a);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.newLineToBr(goog.html.SafeHtml.unwrap(a)), a.getDirection());
};
goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces = function(a) {
  if (a instanceof goog.html.SafeHtml) {
    return a;
  }
  a = goog.html.SafeHtml.htmlEscape(a);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.whitespaceEscape(goog.html.SafeHtml.unwrap(a)), a.getDirection());
};
goog.html.SafeHtml.from = goog.html.SafeHtml.htmlEscape;
goog.html.SafeHtml.VALID_NAMES_IN_TAG_ = /^[a-zA-Z0-9-]+$/;
goog.html.SafeHtml.URL_ATTRIBUTES_ = {action:!0, cite:!0, data:!0, formaction:!0, href:!0, manifest:!0, poster:!0, src:!0};
goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_ = {APPLET:!0, BASE:!0, EMBED:!0, IFRAME:!0, LINK:!0, MATH:!0, META:!0, OBJECT:!0, SCRIPT:!0, STYLE:!0, SVG:!0, TEMPLATE:!0};
goog.html.SafeHtml.create = function(a, b, c) {
  goog.html.SafeHtml.verifyTagName(String(a));
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(String(a), b, c);
};
goog.html.SafeHtml.verifyTagName = function(a) {
  if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(a)) {
    throw Error("Invalid tag name <" + a + ">.");
  }
  if (a.toUpperCase() in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_) {
    throw Error("Tag name <" + a + "> is not allowed for SafeHtml.");
  }
};
goog.html.SafeHtml.createIframe = function(a, b, c, d) {
  a && goog.html.TrustedResourceUrl.unwrap(a);
  var e = {};
  e.src = a || null;
  e.srcdoc = b && goog.html.SafeHtml.unwrap(b);
  a = goog.html.SafeHtml.combineAttributes(e, {sandbox:""}, c);
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d);
};
goog.html.SafeHtml.createSandboxIframe = function(a, b, c, d) {
  if (!goog.html.SafeHtml.canUseSandboxIframe()) {
    throw Error("The browser does not support sandboxed iframes.");
  }
  var e = {};
  e.src = a ? goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a)) : null;
  e.srcdoc = b || null;
  e.sandbox = "";
  a = goog.html.SafeHtml.combineAttributes(e, {}, c);
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d);
};
goog.html.SafeHtml.canUseSandboxIframe = function() {
  return goog.global.HTMLIFrameElement && "sandbox" in goog.global.HTMLIFrameElement.prototype;
};
goog.html.SafeHtml.createScriptSrc = function(a, b) {
  goog.html.TrustedResourceUrl.unwrap(a);
  var c = goog.html.SafeHtml.combineAttributes({src:a}, {}, b);
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", c);
};
goog.html.SafeHtml.createStyle = function(a, b) {
  var c = goog.html.SafeHtml.combineAttributes({type:"text/css"}, {}, b), d = "";
  a = goog.array.concat(a);
  for (var e = 0; e < a.length; e++) {
    d += goog.html.SafeStyleSheet.unwrap(a[e]);
  }
  d = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(d, goog.i18n.bidi.Dir.NEUTRAL);
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("style", c, d);
};
goog.html.SafeHtml.createMetaRefresh = function(a, b) {
  var c = goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a));
  (goog.labs.userAgent.browser.isIE() || goog.labs.userAgent.browser.isEdge()) && goog.string.contains(c, ";") && (c = "'" + c.replace(/'/g, "%27") + "'");
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("meta", {"http-equiv":"refresh", content:(b || 0) + "; url=" + c});
};
goog.html.SafeHtml.getAttrNameAndValue_ = function(a, b, c) {
  if (c instanceof goog.string.Const) {
    c = goog.string.Const.unwrap(c);
  } else {
    if ("style" == b.toLowerCase()) {
      c = goog.html.SafeHtml.getStyleValue_(c);
    } else {
      if (/^on/i.test(b)) {
        throw Error('Attribute "' + b + '" requires goog.string.Const value, "' + c + '" given.');
      }
      if (b.toLowerCase() in goog.html.SafeHtml.URL_ATTRIBUTES_) {
        if (c instanceof goog.html.TrustedResourceUrl) {
          c = goog.html.TrustedResourceUrl.unwrap(c);
        } else {
          if (c instanceof goog.html.SafeUrl) {
            c = goog.html.SafeUrl.unwrap(c);
          } else {
            if (goog.isString(c)) {
              c = goog.html.SafeUrl.sanitize(c).getTypedStringValue();
            } else {
              throw Error('Attribute "' + b + '" on tag "' + a + '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + c + '" given.');
            }
          }
        }
      }
    }
  }
  c.implementsGoogStringTypedString && (c = c.getTypedStringValue());
  goog.asserts.assert(goog.isString(c) || goog.isNumber(c), "String or number value expected, got " + typeof c + " with value: " + c);
  return b + '="' + goog.string.htmlEscape(String(c)) + '"';
};
goog.html.SafeHtml.getStyleValue_ = function(a) {
  if (!goog.isObject(a)) {
    throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof a + " given: " + a);
  }
  a instanceof goog.html.SafeStyle || (a = goog.html.SafeStyle.create(a));
  return goog.html.SafeStyle.unwrap(a);
};
goog.html.SafeHtml.createWithDir = function(a, b, c, d) {
  b = goog.html.SafeHtml.create(b, c, d);
  b.dir_ = a;
  return b;
};
goog.html.SafeHtml.concat = function(a) {
  var b = goog.i18n.bidi.Dir.NEUTRAL, c = "", d = function(a) {
    goog.isArray(a) ? goog.array.forEach(a, d) : (a = goog.html.SafeHtml.htmlEscape(a), c += goog.html.SafeHtml.unwrap(a), a = a.getDirection(), b == goog.i18n.bidi.Dir.NEUTRAL ? b = a : a != goog.i18n.bidi.Dir.NEUTRAL && b != a && (b = null));
  };
  goog.array.forEach(arguments, d);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c, b);
};
goog.html.SafeHtml.concatWithDir = function(a, b) {
  var c = goog.html.SafeHtml.concat(goog.array.slice(arguments, 1));
  c.dir_ = a;
  return c;
};
goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse = function(a, b) {
  return (new goog.html.SafeHtml).initSecurityPrivateDoNotAccessOrElse_(a, b);
};
goog.html.SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a, b) {
  this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
  this.dir_ = b;
  return this;
};
goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse = function(a, b, c) {
  var d = null;
  var e = "<" + a + goog.html.SafeHtml.stringifyAttributes(a, b);
  goog.isDefAndNotNull(c) ? goog.isArray(c) || (c = [c]) : c = [];
  goog.dom.tags.isVoidTag(a.toLowerCase()) ? (goog.asserts.assert(!c.length, "Void tag <" + a + "> does not allow content."), e += ">") : (d = goog.html.SafeHtml.concat(c), e += ">" + goog.html.SafeHtml.unwrap(d) + "</" + a + ">", d = d.getDirection());
  (a = b && b.dir) && (d = /^(ltr|rtl|auto)$/i.test(a) ? goog.i18n.bidi.Dir.NEUTRAL : null);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(e, d);
};
goog.html.SafeHtml.stringifyAttributes = function(a, b) {
  var c = "";
  if (b) {
    for (var d in b) {
      if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(d)) {
        throw Error('Invalid attribute name "' + d + '".');
      }
      var e = b[d];
      goog.isDefAndNotNull(e) && (c += " " + goog.html.SafeHtml.getAttrNameAndValue_(a, d, e));
    }
  }
  return c;
};
goog.html.SafeHtml.combineAttributes = function(a, b, c) {
  var d = {}, e;
  for (e in a) {
    goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = a[e];
  }
  for (e in b) {
    goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = b[e];
  }
  for (e in c) {
    var f = e.toLowerCase();
    if (f in a) {
      throw Error('Cannot override "' + f + '" attribute, got "' + e + '" with value "' + c[e] + '"');
    }
    f in b && delete d[f];
    d[e] = c[e];
  }
  return d;
};
goog.html.SafeHtml.DOCTYPE_HTML = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!DOCTYPE html>", goog.i18n.bidi.Dir.NEUTRAL);
goog.html.SafeHtml.EMPTY = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("", goog.i18n.bidi.Dir.NEUTRAL);
goog.html.SafeHtml.BR = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<br>", goog.i18n.bidi.Dir.NEUTRAL);
goog.html.SafeScript = function() {
  this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = "";
  this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
};
goog.html.SafeScript.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeScript.fromConstant = function(a) {
  a = goog.string.Const.unwrap(a);
  return 0 === a.length ? goog.html.SafeScript.EMPTY : goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.SafeScript.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeScriptWrappedValue_;
};
goog.DEBUG && (goog.html.SafeScript.prototype.toString = function() {
  return "SafeScript{" + this.privateDoNotAccessOrElseSafeScriptWrappedValue_ + "}";
});
goog.html.SafeScript.unwrap = function(a) {
  if (a instanceof goog.html.SafeScript && a.constructor === goog.html.SafeScript && a.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseSafeScriptWrappedValue_;
  }
  goog.asserts.fail("expected object of type SafeScript, got '" + a + "' of type " + goog.typeOf(a));
  return "type_error:SafeScript";
};
goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse = function(a) {
  return (new goog.html.SafeScript).initSecurityPrivateDoNotAccessOrElse_(a);
};
goog.html.SafeScript.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
  this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = a;
  return this;
};
goog.html.SafeScript.EMPTY = goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("");
goog.html.uncheckedconversions = {};
goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract = function(a, b, c) {
  goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
  goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(b, c || null);
};
goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract = function(a, b) {
  goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
  goog.asserts.assert(!goog.string.isEmpty(goog.string.Const.unwrap(a)), "must provide non-empty justification");
  return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract = function(a, b) {
  goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
  goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
  return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract = function(a, b) {
  goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
  goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
  return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract = function(a, b) {
  goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
  goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract = function(a, b) {
  goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
  goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b);
};
goog.structs = {};
goog.structs.getCount = function(a) {
  return a.getCount && "function" == typeof a.getCount ? a.getCount() : goog.isArrayLike(a) || goog.isString(a) ? a.length : goog.object.getCount(a);
};
goog.structs.getValues = function(a) {
  if (a.getValues && "function" == typeof a.getValues) {
    return a.getValues();
  }
  if (goog.isString(a)) {
    return a.split("");
  }
  if (goog.isArrayLike(a)) {
    for (var b = [], c = a.length, d = 0; d < c; d++) {
      b.push(a[d]);
    }
    return b;
  }
  return goog.object.getValues(a);
};
goog.structs.getKeys = function(a) {
  if (a.getKeys && "function" == typeof a.getKeys) {
    return a.getKeys();
  }
  if (!a.getValues || "function" != typeof a.getValues) {
    if (goog.isArrayLike(a) || goog.isString(a)) {
      var b = [];
      a = a.length;
      for (var c = 0; c < a; c++) {
        b.push(c);
      }
      return b;
    }
    return goog.object.getKeys(a);
  }
};
goog.structs.contains = function(a, b) {
  return a.contains && "function" == typeof a.contains ? a.contains(b) : a.containsValue && "function" == typeof a.containsValue ? a.containsValue(b) : goog.isArrayLike(a) || goog.isString(a) ? goog.array.contains(a, b) : goog.object.containsValue(a, b);
};
goog.structs.isEmpty = function(a) {
  return a.isEmpty && "function" == typeof a.isEmpty ? a.isEmpty() : goog.isArrayLike(a) || goog.isString(a) ? goog.array.isEmpty(a) : goog.object.isEmpty(a);
};
goog.structs.clear = function(a) {
  a.clear && "function" == typeof a.clear ? a.clear() : goog.isArrayLike(a) ? goog.array.clear(a) : goog.object.clear(a);
};
goog.structs.forEach = function(a, b, c) {
  if (a.forEach && "function" == typeof a.forEach) {
    a.forEach(b, c);
  } else {
    if (goog.isArrayLike(a) || goog.isString(a)) {
      goog.array.forEach(a, b, c);
    } else {
      for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++) {
        b.call(c, e[g], d && d[g], a);
      }
    }
  }
};
goog.structs.filter = function(a, b, c) {
  if ("function" == typeof a.filter) {
    return a.filter(b, c);
  }
  if (goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.filter(a, b, c);
  }
  var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length;
  if (d) {
    var g = {};
    for (var h = 0; h < f; h++) {
      b.call(c, e[h], d[h], a) && (g[d[h]] = e[h]);
    }
  } else {
    for (g = [], h = 0; h < f; h++) {
      b.call(c, e[h], void 0, a) && g.push(e[h]);
    }
  }
  return g;
};
goog.structs.map = function(a, b, c) {
  if ("function" == typeof a.map) {
    return a.map(b, c);
  }
  if (goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.map(a, b, c);
  }
  var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length;
  if (d) {
    var g = {};
    for (var h = 0; h < f; h++) {
      g[d[h]] = b.call(c, e[h], d[h], a);
    }
  } else {
    for (g = [], h = 0; h < f; h++) {
      g[h] = b.call(c, e[h], void 0, a);
    }
  }
  return g;
};
goog.structs.some = function(a, b, c) {
  if ("function" == typeof a.some) {
    return a.some(b, c);
  }
  if (goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.some(a, b, c);
  }
  for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++) {
    if (b.call(c, e[g], d && d[g], a)) {
      return !0;
    }
  }
  return !1;
};
goog.structs.every = function(a, b, c) {
  if ("function" == typeof a.every) {
    return a.every(b, c);
  }
  if (goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.every(a, b, c);
  }
  for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++) {
    if (!b.call(c, e[g], d && d[g], a)) {
      return !1;
    }
  }
  return !0;
};
goog.structs.Collection = function() {
};
goog.math = {};
goog.math.randomInt = function(a) {
  return Math.floor(Math.random() * a);
};
goog.math.uniformRandom = function(a, b) {
  return a + Math.random() * (b - a);
};
goog.math.clamp = function(a, b, c) {
  return Math.min(Math.max(a, b), c);
};
goog.math.modulo = function(a, b) {
  var c = a % b;
  return 0 > c * b ? c + b : c;
};
goog.math.lerp = function(a, b, c) {
  return a + c * (b - a);
};
goog.math.nearlyEquals = function(a, b, c) {
  return Math.abs(a - b) <= (c || 0.000001);
};
goog.math.standardAngle = function(a) {
  return goog.math.modulo(a, 360);
};
goog.math.standardAngleInRadians = function(a) {
  return goog.math.modulo(a, 2 * Math.PI);
};
goog.math.toRadians = function(a) {
  return a * Math.PI / 180;
};
goog.math.toDegrees = function(a) {
  return 180 * a / Math.PI;
};
goog.math.angleDx = function(a, b) {
  return b * Math.cos(goog.math.toRadians(a));
};
goog.math.angleDy = function(a, b) {
  return b * Math.sin(goog.math.toRadians(a));
};
goog.math.angle = function(a, b, c, d) {
  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(d - b, c - a)));
};
goog.math.angleDifference = function(a, b) {
  var c = goog.math.standardAngle(b) - goog.math.standardAngle(a);
  180 < c ? c -= 360 : -180 >= c && (c = 360 + c);
  return c;
};
goog.math.sign = Math.sign || function(a) {
  return 0 < a ? 1 : 0 > a ? -1 : a;
};
goog.math.longestCommonSubsequence = function(a, b, c, d) {
  c = c || function(a, b) {
    return a == b;
  };
  d = d || function(b, c) {
    return a[b];
  };
  for (var e = a.length, f = b.length, g = [], h = 0; h < e + 1; h++) {
    g[h] = [], g[h][0] = 0;
  }
  for (var k = 0; k < f + 1; k++) {
    g[0][k] = 0;
  }
  for (h = 1; h <= e; h++) {
    for (k = 1; k <= f; k++) {
      c(a[h - 1], b[k - 1]) ? g[h][k] = g[h - 1][k - 1] + 1 : g[h][k] = Math.max(g[h - 1][k], g[h][k - 1]);
    }
  }
  for (var n = [], h = e, k = f; 0 < h && 0 < k;) {
    c(a[h - 1], b[k - 1]) ? (n.unshift(d(h - 1, k - 1)), h--, k--) : g[h - 1][k] > g[h][k - 1] ? h-- : k--;
  }
  return n;
};
goog.math.sum = function(a) {
  return goog.array.reduce(arguments, function(a, c) {
    return a + c;
  }, 0);
};
goog.math.average = function(a) {
  return goog.math.sum.apply(null, arguments) / arguments.length;
};
goog.math.sampleVariance = function(a) {
  var b = arguments.length;
  if (2 > b) {
    return 0;
  }
  var c = goog.math.average.apply(null, arguments);
  return goog.math.sum.apply(null, goog.array.map(arguments, function(a) {
    return Math.pow(a - c, 2);
  })) / (b - 1);
};
goog.math.standardDeviation = function(a) {
  return Math.sqrt(goog.math.sampleVariance.apply(null, arguments));
};
goog.math.isInt = function(a) {
  return isFinite(a) && 0 == a % 1;
};
goog.math.isFiniteNumber = function(a) {
  return isFinite(a) && !isNaN(a);
};
goog.math.isNegativeZero = function(a) {
  return 0 == a && 0 > 1 / a;
};
goog.math.log10Floor = function(a) {
  if (0 < a) {
    var b = Math.round(Math.log(a) * Math.LOG10E);
    return b - (parseFloat("1e" + b) > a ? 1 : 0);
  }
  return 0 == a ? -Infinity : NaN;
};
goog.math.safeFloor = function(a, b) {
  goog.asserts.assert(!goog.isDef(b) || 0 < b);
  return Math.floor(a + (b || 2e-15));
};
goog.math.safeCeil = function(a, b) {
  goog.asserts.assert(!goog.isDef(b) || 0 < b);
  return Math.ceil(a - (b || 2e-15));
};
goog.iter = {};
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : {message:"StopIteration", stack:""};
goog.iter.Iterator = function() {
};
goog.iter.Iterator.prototype.next = function() {
  throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function(a) {
  return this;
};
goog.iter.toIterator = function(a) {
  if (a instanceof goog.iter.Iterator) {
    return a;
  }
  if ("function" == typeof a.__iterator__) {
    return a.__iterator__(!1);
  }
  if (goog.isArrayLike(a)) {
    var b = 0, c = new goog.iter.Iterator;
    c.next = function() {
      for (;;) {
        if (b >= a.length) {
          throw goog.iter.StopIteration;
        }
        if (b in a) {
          return a[b++];
        }
        b++;
      }
    };
    return c;
  }
  throw Error("Not implemented");
};
goog.iter.forEach = function(a, b, c) {
  if (goog.isArrayLike(a)) {
    try {
      goog.array.forEach(a, b, c);
    } catch (d) {
      if (d !== goog.iter.StopIteration) {
        throw d;
      }
    }
  } else {
    a = goog.iter.toIterator(a);
    try {
      for (;;) {
        b.call(c, a.next(), void 0, a);
      }
    } catch (d) {
      if (d !== goog.iter.StopIteration) {
        throw d;
      }
    }
  }
};
goog.iter.filter = function(a, b, c) {
  var d = goog.iter.toIterator(a);
  a = new goog.iter.Iterator;
  a.next = function() {
    for (;;) {
      var a = d.next();
      if (b.call(c, a, void 0, d)) {
        return a;
      }
    }
  };
  return a;
};
goog.iter.filterFalse = function(a, b, c) {
  return goog.iter.filter(a, goog.functions.not(b), c);
};
goog.iter.range = function(a, b, c) {
  var d = 0, e = a, f = c || 1;
  1 < arguments.length && (d = a, e = b);
  if (0 == f) {
    throw Error("Range step argument must not be zero");
  }
  var g = new goog.iter.Iterator;
  g.next = function() {
    if (0 < f && d >= e || 0 > f && d <= e) {
      throw goog.iter.StopIteration;
    }
    var a = d;
    d += f;
    return a;
  };
  return g;
};
goog.iter.join = function(a, b) {
  return goog.iter.toArray(a).join(b);
};
goog.iter.map = function(a, b, c) {
  var d = goog.iter.toIterator(a);
  a = new goog.iter.Iterator;
  a.next = function() {
    var a = d.next();
    return b.call(c, a, void 0, d);
  };
  return a;
};
goog.iter.reduce = function(a, b, c, d) {
  var e = c;
  goog.iter.forEach(a, function(a) {
    e = b.call(d, e, a);
  });
  return e;
};
goog.iter.some = function(a, b, c) {
  a = goog.iter.toIterator(a);
  try {
    for (;;) {
      if (b.call(c, a.next(), void 0, a)) {
        return !0;
      }
    }
  } catch (d) {
    if (d !== goog.iter.StopIteration) {
      throw d;
    }
  }
  return !1;
};
goog.iter.every = function(a, b, c) {
  a = goog.iter.toIterator(a);
  try {
    for (;;) {
      if (!b.call(c, a.next(), void 0, a)) {
        return !1;
      }
    }
  } catch (d) {
    if (d !== goog.iter.StopIteration) {
      throw d;
    }
  }
  return !0;
};
goog.iter.chain = function(a) {
  return goog.iter.chainFromIterable(arguments);
};
goog.iter.chainFromIterable = function(a) {
  var b = goog.iter.toIterator(a);
  a = new goog.iter.Iterator;
  var c = null;
  a.next = function() {
    for (;;) {
      if (null == c) {
        var a = b.next();
        c = goog.iter.toIterator(a);
      }
      try {
        return c.next();
      } catch (e) {
        if (e !== goog.iter.StopIteration) {
          throw e;
        }
        c = null;
      }
    }
  };
  return a;
};
goog.iter.dropWhile = function(a, b, c) {
  var d = goog.iter.toIterator(a);
  a = new goog.iter.Iterator;
  var e = !0;
  a.next = function() {
    for (;;) {
      var a = d.next();
      if (!e || !b.call(c, a, void 0, d)) {
        return e = !1, a;
      }
    }
  };
  return a;
};
goog.iter.takeWhile = function(a, b, c) {
  var d = goog.iter.toIterator(a);
  a = new goog.iter.Iterator;
  a.next = function() {
    var a = d.next();
    if (b.call(c, a, void 0, d)) {
      return a;
    }
    throw goog.iter.StopIteration;
  };
  return a;
};
goog.iter.toArray = function(a) {
  if (goog.isArrayLike(a)) {
    return goog.array.toArray(a);
  }
  a = goog.iter.toIterator(a);
  var b = [];
  goog.iter.forEach(a, function(a) {
    b.push(a);
  });
  return b;
};
goog.iter.equals = function(a, b, c) {
  a = goog.iter.zipLongest({}, a, b);
  var d = c || goog.array.defaultCompareEquality;
  return goog.iter.every(a, function(a) {
    return d(a[0], a[1]);
  });
};
goog.iter.nextOrValue = function(a, b) {
  try {
    return goog.iter.toIterator(a).next();
  } catch (c) {
    if (c != goog.iter.StopIteration) {
      throw c;
    }
    return b;
  }
};
goog.iter.product = function(a) {
  if (goog.array.some(arguments, function(a) {
    return !a.length;
  }) || !arguments.length) {
    return new goog.iter.Iterator;
  }
  var b = new goog.iter.Iterator, c = arguments, d = goog.array.repeat(0, c.length);
  b.next = function() {
    if (d) {
      for (var a = goog.array.map(d, function(a, b) {
        return c[b][a];
      }), b = d.length - 1; 0 <= b; b--) {
        goog.asserts.assert(d);
        if (d[b] < c[b].length - 1) {
          d[b]++;
          break;
        }
        if (0 == b) {
          d = null;
          break;
        }
        d[b] = 0;
      }
      return a;
    }
    throw goog.iter.StopIteration;
  };
  return b;
};
goog.iter.cycle = function(a) {
  var b = goog.iter.toIterator(a), c = [], d = 0;
  a = new goog.iter.Iterator;
  var e = !1;
  a.next = function() {
    var a = null;
    if (!e) {
      try {
        return a = b.next(), c.push(a), a;
      } catch (g) {
        if (g != goog.iter.StopIteration || goog.array.isEmpty(c)) {
          throw g;
        }
        e = !0;
      }
    }
    a = c[d];
    d = (d + 1) % c.length;
    return a;
  };
  return a;
};
goog.iter.count = function(a, b) {
  var c = a || 0, d = goog.isDef(b) ? b : 1, e = new goog.iter.Iterator;
  e.next = function() {
    var a = c;
    c += d;
    return a;
  };
  return e;
};
goog.iter.repeat = function(a) {
  var b = new goog.iter.Iterator;
  b.next = goog.functions.constant(a);
  return b;
};
goog.iter.accumulate = function(a) {
  var b = goog.iter.toIterator(a), c = 0;
  a = new goog.iter.Iterator;
  a.next = function() {
    return c += b.next();
  };
  return a;
};
goog.iter.zip = function(a) {
  var b = arguments, c = new goog.iter.Iterator;
  if (0 < b.length) {
    var d = goog.array.map(b, goog.iter.toIterator);
    c.next = function() {
      return goog.array.map(d, function(a) {
        return a.next();
      });
    };
  }
  return c;
};
goog.iter.zipLongest = function(a, b) {
  var c = goog.array.slice(arguments, 1), d = new goog.iter.Iterator;
  if (0 < c.length) {
    var e = goog.array.map(c, goog.iter.toIterator);
    d.next = function() {
      var b = !1, c = goog.array.map(e, function(c) {
        try {
          var d = c.next();
          b = !0;
        } catch (n) {
          if (n !== goog.iter.StopIteration) {
            throw n;
          }
          d = a;
        }
        return d;
      });
      if (!b) {
        throw goog.iter.StopIteration;
      }
      return c;
    };
  }
  return d;
};
goog.iter.compress = function(a, b) {
  var c = goog.iter.toIterator(b);
  return goog.iter.filter(a, function() {
    return !!c.next();
  });
};
goog.iter.GroupByIterator_ = function(a, b) {
  this.iterator = goog.iter.toIterator(a);
  this.keyFunc = b || goog.functions.identity;
};
goog.inherits(goog.iter.GroupByIterator_, goog.iter.Iterator);
goog.iter.GroupByIterator_.prototype.next = function() {
  for (; this.currentKey == this.targetKey;) {
    this.currentValue = this.iterator.next(), this.currentKey = this.keyFunc(this.currentValue);
  }
  this.targetKey = this.currentKey;
  return [this.currentKey, this.groupItems_(this.targetKey)];
};
goog.iter.GroupByIterator_.prototype.groupItems_ = function(a) {
  for (var b = []; this.currentKey == a;) {
    b.push(this.currentValue);
    try {
      this.currentValue = this.iterator.next();
    } catch (c) {
      if (c !== goog.iter.StopIteration) {
        throw c;
      }
      break;
    }
    this.currentKey = this.keyFunc(this.currentValue);
  }
  return b;
};
goog.iter.groupBy = function(a, b) {
  return new goog.iter.GroupByIterator_(a, b);
};
goog.iter.starMap = function(a, b, c) {
  var d = goog.iter.toIterator(a);
  a = new goog.iter.Iterator;
  a.next = function() {
    var a = goog.iter.toArray(d.next());
    return b.apply(c, goog.array.concat(a, void 0, d));
  };
  return a;
};
goog.iter.tee = function(a, b) {
  var c = goog.iter.toIterator(a), d = goog.isNumber(b) ? b : 2, e = goog.array.map(goog.array.range(d), function() {
    return [];
  }), f = function() {
    var a = c.next();
    goog.array.forEach(e, function(b) {
      b.push(a);
    });
  };
  return goog.array.map(e, function(a) {
    var b = new goog.iter.Iterator;
    b.next = function() {
      goog.array.isEmpty(a) && f();
      goog.asserts.assert(!goog.array.isEmpty(a));
      return a.shift();
    };
    return b;
  });
};
goog.iter.enumerate = function(a, b) {
  return goog.iter.zip(goog.iter.count(b), a);
};
goog.iter.limit = function(a, b) {
  goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
  var c = goog.iter.toIterator(a), d = new goog.iter.Iterator, e = b;
  d.next = function() {
    if (0 < e--) {
      return c.next();
    }
    throw goog.iter.StopIteration;
  };
  return d;
};
goog.iter.consume = function(a, b) {
  goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
  for (var c = goog.iter.toIterator(a); 0 < b--;) {
    goog.iter.nextOrValue(c, null);
  }
  return c;
};
goog.iter.slice = function(a, b, c) {
  goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
  a = goog.iter.consume(a, b);
  goog.isNumber(c) && (goog.asserts.assert(goog.math.isInt(c) && c >= b), a = goog.iter.limit(a, c - b));
  return a;
};
goog.iter.hasDuplicates_ = function(a) {
  var b = [];
  goog.array.removeDuplicates(a, b);
  return a.length != b.length;
};
goog.iter.permutations = function(a, b) {
  var c = goog.iter.toArray(a), d = goog.isNumber(b) ? b : c.length, c = goog.array.repeat(c, d), c = goog.iter.product.apply(void 0, c);
  return goog.iter.filter(c, function(a) {
    return !goog.iter.hasDuplicates_(a);
  });
};
goog.iter.combinations = function(a, b) {
  function c(a) {
    return d[a];
  }
  var d = goog.iter.toArray(a), e = goog.iter.range(d.length), e = goog.iter.permutations(e, b), f = goog.iter.filter(e, function(a) {
    return goog.array.isSorted(a);
  }), e = new goog.iter.Iterator;
  e.next = function() {
    return goog.array.map(f.next(), c);
  };
  return e;
};
goog.iter.combinationsWithReplacement = function(a, b) {
  function c(a) {
    return d[a];
  }
  var d = goog.iter.toArray(a), e = goog.array.range(d.length), e = goog.array.repeat(e, b), e = goog.iter.product.apply(void 0, e), f = goog.iter.filter(e, function(a) {
    return goog.array.isSorted(a);
  }), e = new goog.iter.Iterator;
  e.next = function() {
    return goog.array.map(f.next(), c);
  };
  return e;
};
goog.structs.Map = function(a, b) {
  this.map_ = {};
  this.keys_ = [];
  this.version_ = this.count_ = 0;
  var c = arguments.length;
  if (1 < c) {
    if (c % 2) {
      throw Error("Uneven number of arguments");
    }
    for (var d = 0; d < c; d += 2) {
      this.set(arguments[d], arguments[d + 1]);
    }
  } else {
    a && this.addAll(a);
  }
};
goog.structs.Map.prototype.getCount = function() {
  return this.count_;
};
goog.structs.Map.prototype.getValues = function() {
  this.cleanupKeysArray_();
  for (var a = [], b = 0; b < this.keys_.length; b++) {
    a.push(this.map_[this.keys_[b]]);
  }
  return a;
};
goog.structs.Map.prototype.getKeys = function() {
  this.cleanupKeysArray_();
  return this.keys_.concat();
};
goog.structs.Map.prototype.containsKey = function(a) {
  return goog.structs.Map.hasKey_(this.map_, a);
};
goog.structs.Map.prototype.containsValue = function(a) {
  for (var b = 0; b < this.keys_.length; b++) {
    var c = this.keys_[b];
    if (goog.structs.Map.hasKey_(this.map_, c) && this.map_[c] == a) {
      return !0;
    }
  }
  return !1;
};
goog.structs.Map.prototype.equals = function(a, b) {
  if (this === a) {
    return !0;
  }
  if (this.count_ != a.getCount()) {
    return !1;
  }
  var c = b || goog.structs.Map.defaultEquals;
  this.cleanupKeysArray_();
  for (var d, e = 0; d = this.keys_[e]; e++) {
    if (!c(this.get(d), a.get(d))) {
      return !1;
    }
  }
  return !0;
};
goog.structs.Map.defaultEquals = function(a, b) {
  return a === b;
};
goog.structs.Map.prototype.isEmpty = function() {
  return 0 == this.count_;
};
goog.structs.Map.prototype.clear = function() {
  this.map_ = {};
  this.version_ = this.count_ = this.keys_.length = 0;
};
goog.structs.Map.prototype.remove = function(a) {
  return goog.structs.Map.hasKey_(this.map_, a) ? (delete this.map_[a], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), !0) : !1;
};
goog.structs.Map.prototype.cleanupKeysArray_ = function() {
  var a, b;
  if (this.count_ != this.keys_.length) {
    for (a = b = 0; b < this.keys_.length;) {
      var c = this.keys_[b];
      goog.structs.Map.hasKey_(this.map_, c) && (this.keys_[a++] = c);
      b++;
    }
    this.keys_.length = a;
  }
  if (this.count_ != this.keys_.length) {
    var d = {};
    for (a = b = 0; b < this.keys_.length;) {
      c = this.keys_[b], goog.structs.Map.hasKey_(d, c) || (this.keys_[a++] = c, d[c] = 1), b++;
    }
    this.keys_.length = a;
  }
};
goog.structs.Map.prototype.get = function(a, b) {
  return goog.structs.Map.hasKey_(this.map_, a) ? this.map_[a] : b;
};
goog.structs.Map.prototype.set = function(a, b) {
  goog.structs.Map.hasKey_(this.map_, a) || (this.count_++, this.keys_.push(a), this.version_++);
  this.map_[a] = b;
};
goog.structs.Map.prototype.addAll = function(a) {
  if (a instanceof goog.structs.Map) {
    var b = a.getKeys();
    a = a.getValues();
  } else {
    b = goog.object.getKeys(a), a = goog.object.getValues(a);
  }
  for (var c = 0; c < b.length; c++) {
    this.set(b[c], a[c]);
  }
};
goog.structs.Map.prototype.forEach = function(a, b) {
  for (var c = this.getKeys(), d = 0; d < c.length; d++) {
    var e = c[d], f = this.get(e);
    a.call(b, f, e, this);
  }
};
goog.structs.Map.prototype.clone = function() {
  return new goog.structs.Map(this);
};
goog.structs.Map.prototype.transpose = function() {
  for (var a = new goog.structs.Map, b = 0; b < this.keys_.length; b++) {
    var c = this.keys_[b];
    a.set(this.map_[c], c);
  }
  return a;
};
goog.structs.Map.prototype.toObject = function() {
  this.cleanupKeysArray_();
  for (var a = {}, b = 0; b < this.keys_.length; b++) {
    var c = this.keys_[b];
    a[c] = this.map_[c];
  }
  return a;
};
goog.structs.Map.prototype.getKeyIterator = function() {
  return this.__iterator__(!0);
};
goog.structs.Map.prototype.getValueIterator = function() {
  return this.__iterator__(!1);
};
goog.structs.Map.prototype.__iterator__ = function(a) {
  this.cleanupKeysArray_();
  var b = 0, c = this.version_, d = this, e = new goog.iter.Iterator;
  e.next = function() {
    if (c != d.version_) {
      throw Error("The map has changed since the iterator was created");
    }
    if (b >= d.keys_.length) {
      throw goog.iter.StopIteration;
    }
    var e = d.keys_[b++];
    return a ? e : d.map_[e];
  };
  return e;
};
goog.structs.Map.hasKey_ = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
};
goog.structs.Set = function(a) {
  this.map_ = new goog.structs.Map;
  a && this.addAll(a);
};
goog.structs.Set.getKey_ = function(a) {
  var b = typeof a;
  return "object" == b && a || "function" == b ? "o" + goog.getUid(a) : b.substr(0, 1) + a;
};
goog.structs.Set.prototype.getCount = function() {
  return this.map_.getCount();
};
goog.structs.Set.prototype.add = function(a) {
  this.map_.set(goog.structs.Set.getKey_(a), a);
};
goog.structs.Set.prototype.addAll = function(a) {
  a = goog.structs.getValues(a);
  for (var b = a.length, c = 0; c < b; c++) {
    this.add(a[c]);
  }
};
goog.structs.Set.prototype.removeAll = function(a) {
  a = goog.structs.getValues(a);
  for (var b = a.length, c = 0; c < b; c++) {
    this.remove(a[c]);
  }
};
goog.structs.Set.prototype.remove = function(a) {
  return this.map_.remove(goog.structs.Set.getKey_(a));
};
goog.structs.Set.prototype.clear = function() {
  this.map_.clear();
};
goog.structs.Set.prototype.isEmpty = function() {
  return this.map_.isEmpty();
};
goog.structs.Set.prototype.contains = function(a) {
  return this.map_.containsKey(goog.structs.Set.getKey_(a));
};
goog.structs.Set.prototype.containsAll = function(a) {
  return goog.structs.every(a, this.contains, this);
};
goog.structs.Set.prototype.intersection = function(a) {
  var b = new goog.structs.Set;
  a = goog.structs.getValues(a);
  for (var c = 0; c < a.length; c++) {
    var d = a[c];
    this.contains(d) && b.add(d);
  }
  return b;
};
goog.structs.Set.prototype.difference = function(a) {
  var b = this.clone();
  b.removeAll(a);
  return b;
};
goog.structs.Set.prototype.getValues = function() {
  return this.map_.getValues();
};
goog.structs.Set.prototype.clone = function() {
  return new goog.structs.Set(this);
};
goog.structs.Set.prototype.equals = function(a) {
  return this.getCount() == goog.structs.getCount(a) && this.isSubsetOf(a);
};
goog.structs.Set.prototype.isSubsetOf = function(a) {
  var b = goog.structs.getCount(a);
  if (this.getCount() > b) {
    return !1;
  }
  !(a instanceof goog.structs.Set) && 5 < b && (a = new goog.structs.Set(a));
  return goog.structs.every(this, function(b) {
    return goog.structs.contains(a, b);
  });
};
goog.structs.Set.prototype.__iterator__ = function(a) {
  return this.map_.__iterator__(!1);
};
goog.debug.LOGGING_ENABLED = goog.DEBUG;
goog.debug.FORCE_SLOPPY_STACKS = !1;
goog.debug.catchErrors = function(a, b, c) {
  c = c || goog.global;
  var d = c.onerror, e = !!b;
  goog.userAgent.WEBKIT && !goog.userAgent.isVersionOrHigher("535.3") && (e = !e);
  c.onerror = function(b, c, h, k, n) {
    d && d(b, c, h, k, n);
    a({message:b, fileName:c, line:h, col:k, error:n});
    return e;
  };
};
goog.debug.expose = function(a, b) {
  if ("undefined" == typeof a) {
    return "undefined";
  }
  if (null == a) {
    return "NULL";
  }
  var c = [], d;
  for (d in a) {
    if (b || !goog.isFunction(a[d])) {
      var e = d + " = ";
      try {
        e += a[d];
      } catch (f) {
        e += "*** " + f + " ***";
      }
      c.push(e);
    }
  }
  return c.join("\n");
};
goog.debug.deepExpose = function(a, b) {
  var c = [], d = function(a, f, g) {
    var e = f + "  ";
    g = new goog.structs.Set(g);
    try {
      if (goog.isDef(a)) {
        if (goog.isNull(a)) {
          c.push("NULL");
        } else {
          if (goog.isString(a)) {
            c.push('"' + a.replace(/\n/g, "\n" + f) + '"');
          } else {
            if (goog.isFunction(a)) {
              c.push(String(a).replace(/\n/g, "\n" + f));
            } else {
              if (goog.isObject(a)) {
                if (g.contains(a)) {
                  c.push("*** reference loop detected ***");
                } else {
                  g.add(a);
                  c.push("{");
                  for (var k in a) {
                    if (b || !goog.isFunction(a[k])) {
                      c.push("\n"), c.push(e), c.push(k + " = "), d(a[k], e, g);
                    }
                  }
                  c.push("\n" + f + "}");
                }
              } else {
                c.push(a);
              }
            }
          }
        }
      } else {
        c.push("undefined");
      }
    } catch (n) {
      c.push("*** " + n + " ***");
    }
  };
  d(a, "", new goog.structs.Set);
  return c.join("");
};
goog.debug.exposeArray = function(a) {
  for (var b = [], c = 0; c < a.length; c++) {
    goog.isArray(a[c]) ? b.push(goog.debug.exposeArray(a[c])) : b.push(a[c]);
  }
  return "[ " + b.join(", ") + " ]";
};
goog.debug.exposeException = function(a, b) {
  var c = goog.debug.exposeExceptionAsHtml(a, b);
  return goog.html.SafeHtml.unwrap(c);
};
goog.debug.exposeExceptionAsHtml = function(a, b) {
  try {
    var c = goog.debug.normalizeErrorObject(a), d = goog.debug.createViewSourceUrl_(c.fileName);
    return goog.html.SafeHtml.concat(goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces("Message: " + c.message + "\nUrl: "), goog.html.SafeHtml.create("a", {href:d, target:"_new"}, c.fileName), goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces("\nLine: " + c.lineNumber + "\n\nBrowser stack:\n" + c.stack + "-> [end]\n\nJS stack traversal:\n" + goog.debug.getStacktrace(b) + "-> "));
  } catch (e) {
    return goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces("Exception trying to expose exception! You win, we lose. " + e);
  }
};
goog.debug.createViewSourceUrl_ = function(a) {
  goog.isDefAndNotNull(a) || (a = "");
  if (!/^https?:\/\//i.test(a)) {
    return goog.html.SafeUrl.fromConstant(goog.string.Const.from("sanitizedviewsrc"));
  }
  a = goog.html.SafeUrl.sanitize(a);
  return goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("view-source scheme plus HTTP/HTTPS URL"), "view-source:" + goog.html.SafeUrl.unwrap(a));
};
goog.debug.normalizeErrorObject = function(a) {
  var b = goog.getObjectByName("window.location.href");
  if (goog.isString(a)) {
    return {message:a, name:"Unknown error", lineNumber:"Not available", fileName:b, stack:"Not available"};
  }
  var c = !1;
  try {
    var d = a.lineNumber || a.line || "Not available";
  } catch (f) {
    d = "Not available", c = !0;
  }
  try {
    var e = a.fileName || a.filename || a.sourceURL || goog.global.$googDebugFname || b;
  } catch (f) {
    e = "Not available", c = !0;
  }
  return !c && a.lineNumber && a.fileName && a.stack && a.message && a.name ? a : {message:a.message || "Not available", name:a.name || "UnknownError", lineNumber:d, fileName:e, stack:a.stack || "Not available"};
};
goog.debug.enhanceError = function(a, b) {
  if ("string" == typeof a) {
    var c = Error(a);
    Error.captureStackTrace && Error.captureStackTrace(c, goog.debug.enhanceError);
  } else {
    c = a;
  }
  c.stack || (c.stack = goog.debug.getStacktrace(goog.debug.enhanceError));
  if (b) {
    for (var d = 0; c["message" + d];) {
      ++d;
    }
    c["message" + d] = String(b);
  }
  return c;
};
goog.debug.getStacktraceSimple = function(a) {
  if (!goog.debug.FORCE_SLOPPY_STACKS) {
    var b = goog.debug.getNativeStackTrace_(goog.debug.getStacktraceSimple);
    if (b) {
      return b;
    }
  }
  for (var b = [], c = arguments.callee.caller, d = 0; c && (!a || d < a);) {
    b.push(goog.debug.getFunctionName(c));
    b.push("()\n");
    try {
      c = c.caller;
    } catch (e) {
      b.push("[exception trying to get caller]\n");
      break;
    }
    d++;
    if (d >= goog.debug.MAX_STACK_DEPTH) {
      b.push("[...long stack...]");
      break;
    }
  }
  a && d >= a ? b.push("[...reached max depth limit...]") : b.push("[end]");
  return b.join("");
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getNativeStackTrace_ = function(a) {
  var b = Error();
  if (Error.captureStackTrace) {
    return Error.captureStackTrace(b, a), String(b.stack);
  }
  try {
    throw b;
  } catch (c) {
    b = c;
  }
  return (a = b.stack) ? String(a) : null;
};
goog.debug.getStacktrace = function(a) {
  var b;
  goog.debug.FORCE_SLOPPY_STACKS || (b = goog.debug.getNativeStackTrace_(a || goog.debug.getStacktrace));
  b || (b = goog.debug.getStacktraceHelper_(a || arguments.callee.caller, []));
  return b;
};
goog.debug.getStacktraceHelper_ = function(a, b) {
  var c = [];
  if (goog.array.contains(b, a)) {
    c.push("[...circular reference...]");
  } else {
    if (a && b.length < goog.debug.MAX_STACK_DEPTH) {
      c.push(goog.debug.getFunctionName(a) + "(");
      for (var d = a.arguments, e = 0; d && e < d.length; e++) {
        0 < e && c.push(", ");
        var f = d[e];
        switch(typeof f) {
          case "object":
            f = f ? "object" : "null";
            break;
          case "string":
            break;
          case "number":
            f = String(f);
            break;
          case "boolean":
            f = f ? "true" : "false";
            break;
          case "function":
            f = (f = goog.debug.getFunctionName(f)) ? f : "[fn]";
            break;
          default:
            f = typeof f;
        }
        40 < f.length && (f = f.substr(0, 40) + "...");
        c.push(f);
      }
      b.push(a);
      c.push(")\n");
      try {
        c.push(goog.debug.getStacktraceHelper_(a.caller, b));
      } catch (g) {
        c.push("[exception trying to get caller]\n");
      }
    } else {
      a ? c.push("[...long stack...]") : c.push("[end]");
    }
  }
  return c.join("");
};
goog.debug.setFunctionResolver = function(a) {
  goog.debug.fnNameResolver_ = a;
};
goog.debug.getFunctionName = function(a) {
  if (goog.debug.fnNameCache_[a]) {
    return goog.debug.fnNameCache_[a];
  }
  if (goog.debug.fnNameResolver_) {
    var b = goog.debug.fnNameResolver_(a);
    if (b) {
      return goog.debug.fnNameCache_[a] = b;
    }
  }
  a = String(a);
  goog.debug.fnNameCache_[a] || (b = /function ([^\(]+)/.exec(a), goog.debug.fnNameCache_[a] = b ? b[1] : "[Anonymous]");
  return goog.debug.fnNameCache_[a];
};
goog.debug.makeWhitespaceVisible = function(a) {
  return a.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]");
};
goog.debug.runtimeType = function(a) {
  return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a;
};
goog.debug.fnNameCache_ = {};
goog.debug.LogRecord = function(a, b, c, d, e) {
  this.reset(a, b, c, d, e);
};
goog.debug.LogRecord.prototype.sequenceNumber_ = 0;
goog.debug.LogRecord.prototype.exception_ = null;
goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = !0;
goog.debug.LogRecord.nextSequenceNumber_ = 0;
goog.debug.LogRecord.prototype.reset = function(a, b, c, d, e) {
  goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS && (this.sequenceNumber_ = "number" == typeof e ? e : goog.debug.LogRecord.nextSequenceNumber_++);
  this.time_ = d || goog.now();
  this.level_ = a;
  this.msg_ = b;
  this.loggerName_ = c;
  delete this.exception_;
};
goog.debug.LogRecord.prototype.getLoggerName = function() {
  return this.loggerName_;
};
goog.debug.LogRecord.prototype.getException = function() {
  return this.exception_;
};
goog.debug.LogRecord.prototype.setException = function(a) {
  this.exception_ = a;
};
goog.debug.LogRecord.prototype.setLoggerName = function(a) {
  this.loggerName_ = a;
};
goog.debug.LogRecord.prototype.getLevel = function() {
  return this.level_;
};
goog.debug.LogRecord.prototype.setLevel = function(a) {
  this.level_ = a;
};
goog.debug.LogRecord.prototype.getMessage = function() {
  return this.msg_;
};
goog.debug.LogRecord.prototype.setMessage = function(a) {
  this.msg_ = a;
};
goog.debug.LogRecord.prototype.getMillis = function() {
  return this.time_;
};
goog.debug.LogRecord.prototype.setMillis = function(a) {
  this.time_ = a;
};
goog.debug.LogRecord.prototype.getSequenceNumber = function() {
  return this.sequenceNumber_;
};
goog.debug.LogBuffer = function() {
  goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining goog.debug.LogBuffer.CAPACITY.");
  this.clear();
};
goog.debug.LogBuffer.getInstance = function() {
  goog.debug.LogBuffer.instance_ || (goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer);
  return goog.debug.LogBuffer.instance_;
};
goog.debug.LogBuffer.CAPACITY = 0;
goog.debug.LogBuffer.prototype.addRecord = function(a, b, c) {
  var d = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
  this.curIndex_ = d;
  if (this.isFull_) {
    return d = this.buffer_[d], d.reset(a, b, c), d;
  }
  this.isFull_ = d == goog.debug.LogBuffer.CAPACITY - 1;
  return this.buffer_[d] = new goog.debug.LogRecord(a, b, c);
};
goog.debug.LogBuffer.isBufferingEnabled = function() {
  return 0 < goog.debug.LogBuffer.CAPACITY;
};
goog.debug.LogBuffer.prototype.clear = function() {
  this.buffer_ = Array(goog.debug.LogBuffer.CAPACITY);
  this.curIndex_ = -1;
  this.isFull_ = !1;
};
goog.debug.LogBuffer.prototype.forEachRecord = function(a) {
  var b = this.buffer_;
  if (b[0]) {
    var c = this.curIndex_, d = this.isFull_ ? c : -1;
    do {
      d = (d + 1) % goog.debug.LogBuffer.CAPACITY, a(b[d]);
    } while (d != c);
  }
};
goog.debug.Logger = function(a) {
  this.name_ = a;
  this.handlers_ = this.children_ = this.level_ = this.parent_ = null;
};
goog.debug.Logger.ROOT_LOGGER_NAME = "";
goog.debug.Logger.ENABLE_HIERARCHY = !0;
goog.debug.Logger.ENABLE_HIERARCHY || (goog.debug.Logger.rootHandlers_ = []);
goog.debug.Logger.Level = function(a, b) {
  this.name = a;
  this.value = b;
};
goog.debug.Logger.Level.prototype.toString = function() {
  return this.name;
};
goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", Infinity);
goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200);
goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1000);
goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900);
goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800);
goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700);
goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500);
goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400);
goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300);
goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0);
goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL];
goog.debug.Logger.Level.predefinedLevelsCache_ = null;
goog.debug.Logger.Level.createPredefinedLevelsCache_ = function() {
  goog.debug.Logger.Level.predefinedLevelsCache_ = {};
  for (var a = 0, b; b = goog.debug.Logger.Level.PREDEFINED_LEVELS[a]; a++) {
    goog.debug.Logger.Level.predefinedLevelsCache_[b.value] = b, goog.debug.Logger.Level.predefinedLevelsCache_[b.name] = b;
  }
};
goog.debug.Logger.Level.getPredefinedLevel = function(a) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  return goog.debug.Logger.Level.predefinedLevelsCache_[a] || null;
};
goog.debug.Logger.Level.getPredefinedLevelByValue = function(a) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  if (a in goog.debug.Logger.Level.predefinedLevelsCache_) {
    return goog.debug.Logger.Level.predefinedLevelsCache_[a];
  }
  for (var b = 0; b < goog.debug.Logger.Level.PREDEFINED_LEVELS.length; ++b) {
    var c = goog.debug.Logger.Level.PREDEFINED_LEVELS[b];
    if (c.value <= a) {
      return c;
    }
  }
  return null;
};
goog.debug.Logger.getLogger = function(a) {
  return goog.debug.LogManager.getLogger(a);
};
goog.debug.Logger.logToProfilers = function(a) {
  goog.global.console && (goog.global.console.timeStamp ? goog.global.console.timeStamp(a) : goog.global.console.markTimeline && goog.global.console.markTimeline(a));
  goog.global.msWriteProfilerMark && goog.global.msWriteProfilerMark(a);
};
goog.debug.Logger.prototype.getName = function() {
  return this.name_;
};
goog.debug.Logger.prototype.addHandler = function(a) {
  goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? (this.handlers_ || (this.handlers_ = []), this.handlers_.push(a)) : (goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootHandlers_.push(a)));
};
goog.debug.Logger.prototype.removeHandler = function(a) {
  if (goog.debug.LOGGING_ENABLED) {
    var b = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
    return !!b && goog.array.remove(b, a);
  }
  return !1;
};
goog.debug.Logger.prototype.getParent = function() {
  return this.parent_;
};
goog.debug.Logger.prototype.getChildren = function() {
  this.children_ || (this.children_ = {});
  return this.children_;
};
goog.debug.Logger.prototype.setLevel = function(a) {
  goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? this.level_ = a : (goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootLevel_ = a));
};
goog.debug.Logger.prototype.getLevel = function() {
  return goog.debug.LOGGING_ENABLED ? this.level_ : goog.debug.Logger.Level.OFF;
};
goog.debug.Logger.prototype.getEffectiveLevel = function() {
  if (!goog.debug.LOGGING_ENABLED) {
    return goog.debug.Logger.Level.OFF;
  }
  if (!goog.debug.Logger.ENABLE_HIERARCHY) {
    return goog.debug.Logger.rootLevel_;
  }
  if (this.level_) {
    return this.level_;
  }
  if (this.parent_) {
    return this.parent_.getEffectiveLevel();
  }
  goog.asserts.fail("Root logger has no level set.");
  return null;
};
goog.debug.Logger.prototype.isLoggable = function(a) {
  return goog.debug.LOGGING_ENABLED && a.value >= this.getEffectiveLevel().value;
};
goog.debug.Logger.prototype.log = function(a, b, c) {
  goog.debug.LOGGING_ENABLED && this.isLoggable(a) && (goog.isFunction(b) && (b = b()), this.doLogRecord_(this.getLogRecord(a, b, c)));
};
goog.debug.Logger.prototype.getLogRecord = function(a, b, c) {
  a = goog.debug.LogBuffer.isBufferingEnabled() ? goog.debug.LogBuffer.getInstance().addRecord(a, b, this.name_) : new goog.debug.LogRecord(a, String(b), this.name_);
  c && a.setException(c);
  return a;
};
goog.debug.Logger.prototype.shout = function(a, b) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.SHOUT, a, b);
};
goog.debug.Logger.prototype.severe = function(a, b) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.SEVERE, a, b);
};
goog.debug.Logger.prototype.warning = function(a, b) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.WARNING, a, b);
};
goog.debug.Logger.prototype.info = function(a, b) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.INFO, a, b);
};
goog.debug.Logger.prototype.config = function(a, b) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.CONFIG, a, b);
};
goog.debug.Logger.prototype.fine = function(a, b) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINE, a, b);
};
goog.debug.Logger.prototype.finer = function(a, b) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINER, a, b);
};
goog.debug.Logger.prototype.finest = function(a, b) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINEST, a, b);
};
goog.debug.Logger.prototype.logRecord = function(a) {
  goog.debug.LOGGING_ENABLED && this.isLoggable(a.getLevel()) && this.doLogRecord_(a);
};
goog.debug.Logger.prototype.doLogRecord_ = function(a) {
  goog.debug.Logger.logToProfilers("log:" + a.getMessage());
  if (goog.debug.Logger.ENABLE_HIERARCHY) {
    for (var b = this; b;) {
      b.callPublish_(a), b = b.getParent();
    }
  } else {
    for (var b = 0, c; c = goog.debug.Logger.rootHandlers_[b++];) {
      c(a);
    }
  }
};
goog.debug.Logger.prototype.callPublish_ = function(a) {
  if (this.handlers_) {
    for (var b = 0, c; c = this.handlers_[b]; b++) {
      c(a);
    }
  }
};
goog.debug.Logger.prototype.setParent_ = function(a) {
  this.parent_ = a;
};
goog.debug.Logger.prototype.addChild_ = function(a, b) {
  this.getChildren()[a] = b;
};
goog.debug.LogManager = {};
goog.debug.LogManager.loggers_ = {};
goog.debug.LogManager.rootLogger_ = null;
goog.debug.LogManager.initialize = function() {
  goog.debug.LogManager.rootLogger_ || (goog.debug.LogManager.rootLogger_ = new goog.debug.Logger(goog.debug.Logger.ROOT_LOGGER_NAME), goog.debug.LogManager.loggers_[goog.debug.Logger.ROOT_LOGGER_NAME] = goog.debug.LogManager.rootLogger_, goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG));
};
goog.debug.LogManager.getLoggers = function() {
  return goog.debug.LogManager.loggers_;
};
goog.debug.LogManager.getRoot = function() {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.rootLogger_;
};
goog.debug.LogManager.getLogger = function(a) {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.loggers_[a] || goog.debug.LogManager.createLogger_(a);
};
goog.debug.LogManager.createFunctionForCatchErrors = function(a) {
  return function(b) {
    (a || goog.debug.LogManager.getRoot()).severe("Error: " + b.message + " (" + b.fileName + " @ Line: " + b.line + ")");
  };
};
goog.debug.LogManager.createLogger_ = function(a) {
  var b = new goog.debug.Logger(a);
  if (goog.debug.Logger.ENABLE_HIERARCHY) {
    var c = a.lastIndexOf("."), d = a.substr(0, c), c = a.substr(c + 1), d = goog.debug.LogManager.getLogger(d);
    d.addChild_(c, b);
    b.setParent_(d);
  }
  return goog.debug.LogManager.loggers_[a] = b;
};
goog.log = {};
goog.log.ENABLED = goog.debug.LOGGING_ENABLED;
goog.log.ROOT_LOGGER_NAME = goog.debug.Logger.ROOT_LOGGER_NAME;
goog.log.Logger = goog.debug.Logger;
goog.log.Level = goog.debug.Logger.Level;
goog.log.LogRecord = goog.debug.LogRecord;
goog.log.getLogger = function(a, b) {
  if (goog.log.ENABLED) {
    var c = goog.debug.LogManager.getLogger(a);
    b && c && c.setLevel(b);
    return c;
  }
  return null;
};
goog.log.addHandler = function(a, b) {
  goog.log.ENABLED && a && a.addHandler(b);
};
goog.log.removeHandler = function(a, b) {
  return goog.log.ENABLED && a ? a.removeHandler(b) : !1;
};
goog.log.log = function(a, b, c, d) {
  goog.log.ENABLED && a && a.log(b, c, d);
};
goog.log.error = function(a, b, c) {
  goog.log.ENABLED && a && a.severe(b, c);
};
goog.log.warning = function(a, b, c) {
  goog.log.ENABLED && a && a.warning(b, c);
};
goog.log.info = function(a, b, c) {
  goog.log.ENABLED && a && a.info(b, c);
};
goog.log.fine = function(a, b, c) {
  goog.log.ENABLED && a && a.fine(b, c);
};
goog.net = {};
goog.net.ErrorCode = {NO_ERROR:0, ACCESS_DENIED:1, FILE_NOT_FOUND:2, FF_SILENT_ERROR:3, CUSTOM_ERROR:4, EXCEPTION:5, HTTP_ERROR:6, ABORT:7, TIMEOUT:8, OFFLINE:9};
goog.net.ErrorCode.getDebugMessage = function(a) {
  switch(a) {
    case goog.net.ErrorCode.NO_ERROR:
      return "No Error";
    case goog.net.ErrorCode.ACCESS_DENIED:
      return "Access denied to content document";
    case goog.net.ErrorCode.FILE_NOT_FOUND:
      return "File not found";
    case goog.net.ErrorCode.FF_SILENT_ERROR:
      return "Firefox silently errored";
    case goog.net.ErrorCode.CUSTOM_ERROR:
      return "Application custom error";
    case goog.net.ErrorCode.EXCEPTION:
      return "An exception occurred";
    case goog.net.ErrorCode.HTTP_ERROR:
      return "Http response at 400 or 500 level";
    case goog.net.ErrorCode.ABORT:
      return "Request was aborted";
    case goog.net.ErrorCode.TIMEOUT:
      return "Request timed out";
    case goog.net.ErrorCode.OFFLINE:
      return "The resource is not available offline";
    default:
      return "Unrecognized error code";
  }
};
goog.net.EventType = {COMPLETE:"complete", SUCCESS:"success", ERROR:"error", ABORT:"abort", READY:"ready", READY_STATE_CHANGE:"readystatechange", TIMEOUT:"timeout", INCREMENTAL_DATA:"incrementaldata", PROGRESS:"progress", DOWNLOAD_PROGRESS:"downloadprogress", UPLOAD_PROGRESS:"uploadprogress"};
goog.net.HttpStatus = {CONTINUE:100, SWITCHING_PROTOCOLS:101, OK:200, CREATED:201, ACCEPTED:202, NON_AUTHORITATIVE_INFORMATION:203, NO_CONTENT:204, RESET_CONTENT:205, PARTIAL_CONTENT:206, MULTIPLE_CHOICES:300, MOVED_PERMANENTLY:301, FOUND:302, SEE_OTHER:303, NOT_MODIFIED:304, USE_PROXY:305, TEMPORARY_REDIRECT:307, BAD_REQUEST:400, UNAUTHORIZED:401, PAYMENT_REQUIRED:402, FORBIDDEN:403, NOT_FOUND:404, METHOD_NOT_ALLOWED:405, NOT_ACCEPTABLE:406, PROXY_AUTHENTICATION_REQUIRED:407, REQUEST_TIMEOUT:408, 
CONFLICT:409, GONE:410, LENGTH_REQUIRED:411, PRECONDITION_FAILED:412, REQUEST_ENTITY_TOO_LARGE:413, REQUEST_URI_TOO_LONG:414, UNSUPPORTED_MEDIA_TYPE:415, REQUEST_RANGE_NOT_SATISFIABLE:416, EXPECTATION_FAILED:417, PRECONDITION_REQUIRED:428, TOO_MANY_REQUESTS:429, REQUEST_HEADER_FIELDS_TOO_LARGE:431, INTERNAL_SERVER_ERROR:500, NOT_IMPLEMENTED:501, BAD_GATEWAY:502, SERVICE_UNAVAILABLE:503, GATEWAY_TIMEOUT:504, HTTP_VERSION_NOT_SUPPORTED:505, NETWORK_AUTHENTICATION_REQUIRED:511, QUIRK_IE_NO_CONTENT:1223};
goog.net.HttpStatus.isSuccess = function(a) {
  switch(a) {
    case goog.net.HttpStatus.OK:
    case goog.net.HttpStatus.CREATED:
    case goog.net.HttpStatus.ACCEPTED:
    case goog.net.HttpStatus.NO_CONTENT:
    case goog.net.HttpStatus.PARTIAL_CONTENT:
    case goog.net.HttpStatus.NOT_MODIFIED:
    case goog.net.HttpStatus.QUIRK_IE_NO_CONTENT:
      return !0;
    default:
      return !1;
  }
};
goog.net.XhrLike = function() {
};
goog.net.XhrLike.prototype.open = function(a, b, c, d, e) {
};
goog.net.XhrLike.prototype.send = function(a) {
};
goog.net.XhrLike.prototype.abort = function() {
};
goog.net.XhrLike.prototype.setRequestHeader = function(a, b) {
};
goog.net.XhrLike.prototype.getResponseHeader = function(a) {
};
goog.net.XhrLike.prototype.getAllResponseHeaders = function() {
};
goog.net.XmlHttpFactory = function() {
};
goog.net.XmlHttpFactory.prototype.cachedOptions_ = null;
goog.net.XmlHttpFactory.prototype.createInstance = goog.abstractMethod;
goog.net.XmlHttpFactory.prototype.getOptions = function() {
  return this.cachedOptions_ || (this.cachedOptions_ = this.internalGetOptions());
};
goog.net.XmlHttpFactory.prototype.internalGetOptions = goog.abstractMethod;
goog.net.WrapperXmlHttpFactory = function(a, b) {
  goog.net.XmlHttpFactory.call(this);
  this.xhrFactory_ = a;
  this.optionsFactory_ = b;
};
goog.inherits(goog.net.WrapperXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.WrapperXmlHttpFactory.prototype.createInstance = function() {
  return this.xhrFactory_();
};
goog.net.WrapperXmlHttpFactory.prototype.getOptions = function() {
  return this.optionsFactory_();
};
goog.net.XmlHttp = function() {
  return goog.net.XmlHttp.factory_.createInstance();
};
goog.net.XmlHttp.ASSUME_NATIVE_XHR = !1;
goog.net.XmlHttpDefines = {};
goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR = !1;
goog.net.XmlHttp.getOptions = function() {
  return goog.net.XmlHttp.factory_.getOptions();
};
goog.net.XmlHttp.OptionType = {USE_NULL_FUNCTION:0, LOCAL_REQUEST_ERROR:1};
goog.net.XmlHttp.ReadyState = {UNINITIALIZED:0, LOADING:1, LOADED:2, INTERACTIVE:3, COMPLETE:4};
goog.net.XmlHttp.setFactory = function(a, b) {
  goog.net.XmlHttp.setGlobalFactory(new goog.net.WrapperXmlHttpFactory(goog.asserts.assert(a), goog.asserts.assert(b)));
};
goog.net.XmlHttp.setGlobalFactory = function(a) {
  goog.net.XmlHttp.factory_ = a;
};
goog.net.DefaultXmlHttpFactory = function() {
  goog.net.XmlHttpFactory.call(this);
};
goog.inherits(goog.net.DefaultXmlHttpFactory, goog.net.XmlHttpFactory);
goog.net.DefaultXmlHttpFactory.prototype.createInstance = function() {
  var a = this.getProgId_();
  return a ? new ActiveXObject(a) : new XMLHttpRequest;
};
goog.net.DefaultXmlHttpFactory.prototype.internalGetOptions = function() {
  var a = {};
  this.getProgId_() && (a[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] = !0, a[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] = !0);
  return a;
};
goog.net.DefaultXmlHttpFactory.prototype.getProgId_ = function() {
  if (goog.net.XmlHttp.ASSUME_NATIVE_XHR || goog.net.XmlHttpDefines.ASSUME_NATIVE_XHR) {
    return "";
  }
  if (!this.ieProgId_ && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
    for (var a = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], b = 0; b < a.length; b++) {
      var c = a[b];
      try {
        return new ActiveXObject(c), this.ieProgId_ = c;
      } catch (d) {
      }
    }
    throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
  }
  return this.ieProgId_;
};
goog.net.XmlHttp.setGlobalFactory(new goog.net.DefaultXmlHttpFactory);
goog.uri = {};
goog.uri.utils = {};
goog.uri.utils.CharCode_ = {AMPERSAND:38, EQUAL:61, HASH:35, QUESTION:63};
goog.uri.utils.buildFromEncodedParts = function(a, b, c, d, e, f, g) {
  var h = "";
  a && (h += a + ":");
  c && (h += "//", b && (h += b + "@"), h += c, d && (h += ":" + d));
  e && (h += e);
  f && (h += "?" + f);
  g && (h += "#" + g);
  return h;
};
goog.uri.utils.splitRe_ = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
goog.uri.utils.ComponentIndex = {SCHEME:1, USER_INFO:2, DOMAIN:3, PORT:4, PATH:5, QUERY_DATA:6, FRAGMENT:7};
goog.uri.utils.split = function(a) {
  return a.match(goog.uri.utils.splitRe_);
};
goog.uri.utils.decodeIfPossible_ = function(a, b) {
  return a ? b ? decodeURI(a) : decodeURIComponent(a) : a;
};
goog.uri.utils.getComponentByIndex_ = function(a, b) {
  return goog.uri.utils.split(b)[a] || null;
};
goog.uri.utils.getScheme = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, a);
};
goog.uri.utils.getEffectiveScheme = function(a) {
  a = goog.uri.utils.getScheme(a);
  !a && goog.global.self && goog.global.self.location && (a = goog.global.self.location.protocol, a = a.substr(0, a.length - 1));
  return a ? a.toLowerCase() : "";
};
goog.uri.utils.getUserInfoEncoded = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, a);
};
goog.uri.utils.getUserInfo = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded(a));
};
goog.uri.utils.getDomainEncoded = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, a);
};
goog.uri.utils.getDomain = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded(a), !0);
};
goog.uri.utils.getPort = function(a) {
  return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, a)) || null;
};
goog.uri.utils.getPathEncoded = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, a);
};
goog.uri.utils.getPath = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded(a), !0);
};
goog.uri.utils.getQueryData = function(a) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, a);
};
goog.uri.utils.getFragmentEncoded = function(a) {
  var b = a.indexOf("#");
  return 0 > b ? null : a.substr(b + 1);
};
goog.uri.utils.setFragmentEncoded = function(a, b) {
  return goog.uri.utils.removeFragment(a) + (b ? "#" + b : "");
};
goog.uri.utils.getFragment = function(a) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded(a));
};
goog.uri.utils.getHost = function(a) {
  a = goog.uri.utils.split(a);
  return goog.uri.utils.buildFromEncodedParts(a[goog.uri.utils.ComponentIndex.SCHEME], a[goog.uri.utils.ComponentIndex.USER_INFO], a[goog.uri.utils.ComponentIndex.DOMAIN], a[goog.uri.utils.ComponentIndex.PORT]);
};
goog.uri.utils.getPathAndAfter = function(a) {
  a = goog.uri.utils.split(a);
  return goog.uri.utils.buildFromEncodedParts(null, null, null, null, a[goog.uri.utils.ComponentIndex.PATH], a[goog.uri.utils.ComponentIndex.QUERY_DATA], a[goog.uri.utils.ComponentIndex.FRAGMENT]);
};
goog.uri.utils.removeFragment = function(a) {
  var b = a.indexOf("#");
  return 0 > b ? a : a.substr(0, b);
};
goog.uri.utils.haveSameDomain = function(a, b) {
  var c = goog.uri.utils.split(a), d = goog.uri.utils.split(b);
  return c[goog.uri.utils.ComponentIndex.DOMAIN] == d[goog.uri.utils.ComponentIndex.DOMAIN] && c[goog.uri.utils.ComponentIndex.SCHEME] == d[goog.uri.utils.ComponentIndex.SCHEME] && c[goog.uri.utils.ComponentIndex.PORT] == d[goog.uri.utils.ComponentIndex.PORT];
};
goog.uri.utils.assertNoFragmentsOrQueries_ = function(a) {
  if (goog.DEBUG && (0 <= a.indexOf("#") || 0 <= a.indexOf("?"))) {
    throw Error("goog.uri.utils: Fragment or query identifiers are not supported: [" + a + "]");
  }
};
goog.uri.utils.parseQueryData = function(a, b) {
  if (a) {
    for (var c = a.split("&"), d = 0; d < c.length; d++) {
      var e = c[d].indexOf("="), f = null;
      if (0 <= e) {
        var g = c[d].substring(0, e);
        f = c[d].substring(e + 1);
      } else {
        g = c[d];
      }
      b(g, f ? goog.string.urlDecode(f) : "");
    }
  }
};
goog.uri.utils.appendQueryData_ = function(a) {
  if (a[1]) {
    var b = a[0], c = b.indexOf("#");
    0 <= c && (a.push(b.substr(c)), a[0] = b = b.substr(0, c));
    c = b.indexOf("?");
    0 > c ? a[1] = "?" : c == b.length - 1 && (a[1] = void 0);
  }
  return a.join("");
};
goog.uri.utils.appendKeyValuePairs_ = function(a, b, c) {
  if (goog.isArray(b)) {
    goog.asserts.assertArray(b);
    for (var d = 0; d < b.length; d++) {
      goog.uri.utils.appendKeyValuePairs_(a, String(b[d]), c);
    }
  } else {
    null != b && c.push("&", a, "" === b ? "" : "=", goog.string.urlEncode(b));
  }
};
goog.uri.utils.buildQueryDataBuffer_ = function(a, b, c) {
  goog.asserts.assert(0 == Math.max(b.length - (c || 0), 0) % 2, "goog.uri.utils: Key/value lists must be even in length.");
  for (c = c || 0; c < b.length; c += 2) {
    goog.uri.utils.appendKeyValuePairs_(b[c], b[c + 1], a);
  }
  return a;
};
goog.uri.utils.buildQueryData = function(a, b) {
  var c = goog.uri.utils.buildQueryDataBuffer_([], a, b);
  c[0] = "";
  return c.join("");
};
goog.uri.utils.buildQueryDataBufferFromMap_ = function(a, b) {
  for (var c in b) {
    goog.uri.utils.appendKeyValuePairs_(c, b[c], a);
  }
  return a;
};
goog.uri.utils.buildQueryDataFromMap = function(a) {
  a = goog.uri.utils.buildQueryDataBufferFromMap_([], a);
  a[0] = "";
  return a.join("");
};
goog.uri.utils.appendParams = function(a, b) {
  return goog.uri.utils.appendQueryData_(2 == arguments.length ? goog.uri.utils.buildQueryDataBuffer_([a], arguments[1], 0) : goog.uri.utils.buildQueryDataBuffer_([a], arguments, 1));
};
goog.uri.utils.appendParamsFromMap = function(a, b) {
  return goog.uri.utils.appendQueryData_(goog.uri.utils.buildQueryDataBufferFromMap_([a], b));
};
goog.uri.utils.appendParam = function(a, b, c) {
  a = [a, "&", b];
  goog.isDefAndNotNull(c) && a.push("=", goog.string.urlEncode(c));
  return goog.uri.utils.appendQueryData_(a);
};
goog.uri.utils.findParam_ = function(a, b, c, d) {
  for (var e = c.length; 0 <= (b = a.indexOf(c, b)) && b < d;) {
    var f = a.charCodeAt(b - 1);
    if (f == goog.uri.utils.CharCode_.AMPERSAND || f == goog.uri.utils.CharCode_.QUESTION) {
      if (f = a.charCodeAt(b + e), !f || f == goog.uri.utils.CharCode_.EQUAL || f == goog.uri.utils.CharCode_.AMPERSAND || f == goog.uri.utils.CharCode_.HASH) {
        return b;
      }
    }
    b += e + 1;
  }
  return -1;
};
goog.uri.utils.hashOrEndRe_ = /#|$/;
goog.uri.utils.hasParam = function(a, b) {
  return 0 <= goog.uri.utils.findParam_(a, 0, b, a.search(goog.uri.utils.hashOrEndRe_));
};
goog.uri.utils.getParamValue = function(a, b) {
  var c = a.search(goog.uri.utils.hashOrEndRe_), d = goog.uri.utils.findParam_(a, 0, b, c);
  if (0 > d) {
    return null;
  }
  var e = a.indexOf("&", d);
  if (0 > e || e > c) {
    e = c;
  }
  d += b.length + 1;
  return goog.string.urlDecode(a.substr(d, e - d));
};
goog.uri.utils.getParamValues = function(a, b) {
  for (var c = a.search(goog.uri.utils.hashOrEndRe_), d = 0, e, f = []; 0 <= (e = goog.uri.utils.findParam_(a, d, b, c));) {
    d = a.indexOf("&", e);
    if (0 > d || d > c) {
      d = c;
    }
    e += b.length + 1;
    f.push(goog.string.urlDecode(a.substr(e, d - e)));
  }
  return f;
};
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
goog.uri.utils.removeParam = function(a, b) {
  for (var c = a.search(goog.uri.utils.hashOrEndRe_), d = 0, e, f = []; 0 <= (e = goog.uri.utils.findParam_(a, d, b, c));) {
    f.push(a.substring(d, e)), d = Math.min(a.indexOf("&", e) + 1 || c, c);
  }
  f.push(a.substr(d));
  return f.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1");
};
goog.uri.utils.setParam = function(a, b, c) {
  return goog.uri.utils.appendParam(goog.uri.utils.removeParam(a, b), b, c);
};
goog.uri.utils.appendPath = function(a, b) {
  goog.uri.utils.assertNoFragmentsOrQueries_(a);
  goog.string.endsWith(a, "/") && (a = a.substr(0, a.length - 1));
  goog.string.startsWith(b, "/") && (b = b.substr(1));
  return goog.string.buildString(a, "/", b);
};
goog.uri.utils.setPath = function(a, b) {
  goog.string.startsWith(b, "/") || (b = "/" + b);
  var c = goog.uri.utils.split(a);
  return goog.uri.utils.buildFromEncodedParts(c[goog.uri.utils.ComponentIndex.SCHEME], c[goog.uri.utils.ComponentIndex.USER_INFO], c[goog.uri.utils.ComponentIndex.DOMAIN], c[goog.uri.utils.ComponentIndex.PORT], b, c[goog.uri.utils.ComponentIndex.QUERY_DATA], c[goog.uri.utils.ComponentIndex.FRAGMENT]);
};
goog.uri.utils.StandardQueryParam = {RANDOM:"zx"};
goog.uri.utils.makeUnique = function(a) {
  return goog.uri.utils.setParam(a, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString());
};
goog.net.XhrIo = function(a) {
  goog.events.EventTarget.call(this);
  this.headers = new goog.structs.Map;
  this.xmlHttpFactory_ = a || null;
  this.active_ = !1;
  this.xhrOptions_ = this.xhr_ = null;
  this.lastMethod_ = this.lastUri_ = "";
  this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
  this.lastError_ = "";
  this.inAbort_ = this.inOpen_ = this.inSend_ = this.errorDispatched_ = !1;
  this.timeoutInterval_ = 0;
  this.timeoutId_ = null;
  this.responseType_ = goog.net.XhrIo.ResponseType.DEFAULT;
  this.useXhr2Timeout_ = this.progressEventsEnabled_ = this.withCredentials_ = !1;
};
goog.inherits(goog.net.XhrIo, goog.events.EventTarget);
goog.net.XhrIo.ResponseType = {DEFAULT:"", TEXT:"text", DOCUMENT:"document", BLOB:"blob", ARRAY_BUFFER:"arraybuffer"};
goog.net.XhrIo.prototype.logger_ = goog.log.getLogger("goog.net.XhrIo");
goog.net.XhrIo.CONTENT_TYPE_HEADER = "Content-Type";
goog.net.XhrIo.CONTENT_TRANSFER_ENCODING = "Content-Transfer-Encoding";
goog.net.XhrIo.HTTP_SCHEME_PATTERN = /^https?$/i;
goog.net.XhrIo.METHODS_WITH_FORM_DATA = ["POST", "PUT"];
goog.net.XhrIo.FORM_CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf-8";
goog.net.XhrIo.XHR2_TIMEOUT_ = "timeout";
goog.net.XhrIo.XHR2_ON_TIMEOUT_ = "ontimeout";
goog.net.XhrIo.sendInstances_ = [];
goog.net.XhrIo.send = function(a, b, c, d, e, f, g) {
  var h = new goog.net.XhrIo;
  goog.net.XhrIo.sendInstances_.push(h);
  b && h.listen(goog.net.EventType.COMPLETE, b);
  h.listenOnce(goog.net.EventType.READY, h.cleanupSend_);
  f && h.setTimeoutInterval(f);
  g && h.setWithCredentials(g);
  h.send(a, c, d, e);
  return h;
};
goog.net.XhrIo.cleanup = function() {
  for (var a = goog.net.XhrIo.sendInstances_; a.length;) {
    a.pop().dispose();
  }
};
goog.net.XhrIo.protectEntryPoints = function(a) {
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = a.protectEntryPoint(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_);
};
goog.net.XhrIo.prototype.cleanupSend_ = function() {
  this.dispose();
  goog.array.remove(goog.net.XhrIo.sendInstances_, this);
};
goog.net.XhrIo.prototype.getTimeoutInterval = function() {
  return this.timeoutInterval_;
};
goog.net.XhrIo.prototype.setTimeoutInterval = function(a) {
  this.timeoutInterval_ = Math.max(0, a);
};
goog.net.XhrIo.prototype.setResponseType = function(a) {
  this.responseType_ = a;
};
goog.net.XhrIo.prototype.getResponseType = function() {
  return this.responseType_;
};
goog.net.XhrIo.prototype.setWithCredentials = function(a) {
  this.withCredentials_ = a;
};
goog.net.XhrIo.prototype.getWithCredentials = function() {
  return this.withCredentials_;
};
goog.net.XhrIo.prototype.setProgressEventsEnabled = function(a) {
  this.progressEventsEnabled_ = a;
};
goog.net.XhrIo.prototype.getProgressEventsEnabled = function() {
  return this.progressEventsEnabled_;
};
goog.net.XhrIo.prototype.send = function(a, b, c, d) {
  if (this.xhr_) {
    throw Error("[goog.net.XhrIo] Object is active with another request=" + this.lastUri_ + "; newUri=" + a);
  }
  b = b ? b.toUpperCase() : "GET";
  this.lastUri_ = a;
  this.lastError_ = "";
  this.lastErrorCode_ = goog.net.ErrorCode.NO_ERROR;
  this.lastMethod_ = b;
  this.errorDispatched_ = !1;
  this.active_ = !0;
  this.xhr_ = this.createXhr();
  this.xhrOptions_ = this.xmlHttpFactory_ ? this.xmlHttpFactory_.getOptions() : goog.net.XmlHttp.getOptions();
  this.xhr_.onreadystatechange = goog.bind(this.onReadyStateChange_, this);
  this.getProgressEventsEnabled() && "onprogress" in this.xhr_ && (this.xhr_.onprogress = goog.bind(function(a) {
    this.onProgressHandler_(a, !0);
  }, this), this.xhr_.upload && (this.xhr_.upload.onprogress = goog.bind(this.onProgressHandler_, this)));
  try {
    goog.log.fine(this.logger_, this.formatMsg_("Opening Xhr")), this.inOpen_ = !0, this.xhr_.open(b, String(a), !0), this.inOpen_ = !1;
  } catch (f) {
    goog.log.fine(this.logger_, this.formatMsg_("Error opening Xhr: " + f.message));
    this.error_(goog.net.ErrorCode.EXCEPTION, f);
    return;
  }
  a = c || "";
  var e = this.headers.clone();
  d && goog.structs.forEach(d, function(a, b) {
    e.set(b, a);
  });
  d = goog.array.find(e.getKeys(), goog.net.XhrIo.isContentTypeHeader_);
  c = goog.global.FormData && a instanceof goog.global.FormData;
  !goog.array.contains(goog.net.XhrIo.METHODS_WITH_FORM_DATA, b) || d || c || e.set(goog.net.XhrIo.CONTENT_TYPE_HEADER, goog.net.XhrIo.FORM_CONTENT_TYPE);
  e.forEach(function(a, b) {
    this.xhr_.setRequestHeader(b, a);
  }, this);
  this.responseType_ && (this.xhr_.responseType = this.responseType_);
  "withCredentials" in this.xhr_ && this.xhr_.withCredentials !== this.withCredentials_ && (this.xhr_.withCredentials = this.withCredentials_);
  try {
    this.cleanUpTimeoutTimer_(), 0 < this.timeoutInterval_ && (this.useXhr2Timeout_ = goog.net.XhrIo.shouldUseXhr2Timeout_(this.xhr_), goog.log.fine(this.logger_, this.formatMsg_("Will abort after " + this.timeoutInterval_ + "ms if incomplete, xhr2 " + this.useXhr2Timeout_)), this.useXhr2Timeout_ ? (this.xhr_[goog.net.XhrIo.XHR2_TIMEOUT_] = this.timeoutInterval_, this.xhr_[goog.net.XhrIo.XHR2_ON_TIMEOUT_] = goog.bind(this.timeout_, this)) : this.timeoutId_ = goog.Timer.callOnce(this.timeout_, this.timeoutInterval_, 
    this)), goog.log.fine(this.logger_, this.formatMsg_("Sending request")), this.inSend_ = !0, this.xhr_.send(a), this.inSend_ = !1;
  } catch (f) {
    goog.log.fine(this.logger_, this.formatMsg_("Send error: " + f.message)), this.error_(goog.net.ErrorCode.EXCEPTION, f);
  }
};
goog.net.XhrIo.shouldUseXhr2Timeout_ = function(a) {
  return goog.userAgent.IE && goog.userAgent.isVersionOrHigher(9) && goog.isNumber(a[goog.net.XhrIo.XHR2_TIMEOUT_]) && goog.isDef(a[goog.net.XhrIo.XHR2_ON_TIMEOUT_]);
};
goog.net.XhrIo.isContentTypeHeader_ = function(a) {
  return goog.string.caseInsensitiveEquals(goog.net.XhrIo.CONTENT_TYPE_HEADER, a);
};
goog.net.XhrIo.prototype.createXhr = function() {
  return this.xmlHttpFactory_ ? this.xmlHttpFactory_.createInstance() : goog.net.XmlHttp();
};
goog.net.XhrIo.prototype.timeout_ = function() {
  "undefined" != typeof goog && this.xhr_ && (this.lastError_ = "Timed out after " + this.timeoutInterval_ + "ms, aborting", this.lastErrorCode_ = goog.net.ErrorCode.TIMEOUT, goog.log.fine(this.logger_, this.formatMsg_(this.lastError_)), this.dispatchEvent(goog.net.EventType.TIMEOUT), this.abort(goog.net.ErrorCode.TIMEOUT));
};
goog.net.XhrIo.prototype.error_ = function(a, b) {
  this.active_ = !1;
  this.xhr_ && (this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1);
  this.lastError_ = b;
  this.lastErrorCode_ = a;
  this.dispatchErrors_();
  this.cleanUpXhr_();
};
goog.net.XhrIo.prototype.dispatchErrors_ = function() {
  this.errorDispatched_ || (this.errorDispatched_ = !0, this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.ERROR));
};
goog.net.XhrIo.prototype.abort = function(a) {
  this.xhr_ && this.active_ && (goog.log.fine(this.logger_, this.formatMsg_("Aborting")), this.active_ = !1, this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1, this.lastErrorCode_ = a || goog.net.ErrorCode.ABORT, this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.ABORT), this.cleanUpXhr_());
};
goog.net.XhrIo.prototype.disposeInternal = function() {
  this.xhr_ && (this.active_ && (this.active_ = !1, this.inAbort_ = !0, this.xhr_.abort(), this.inAbort_ = !1), this.cleanUpXhr_(!0));
  goog.net.XhrIo.superClass_.disposeInternal.call(this);
};
goog.net.XhrIo.prototype.onReadyStateChange_ = function() {
  if (!this.isDisposed()) {
    if (this.inOpen_ || this.inSend_ || this.inAbort_) {
      this.onReadyStateChangeHelper_();
    } else {
      this.onReadyStateChangeEntryPoint_();
    }
  }
};
goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = function() {
  this.onReadyStateChangeHelper_();
};
goog.net.XhrIo.prototype.onReadyStateChangeHelper_ = function() {
  if (this.active_ && "undefined" != typeof goog) {
    if (this.xhrOptions_[goog.net.XmlHttp.OptionType.LOCAL_REQUEST_ERROR] && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE && 2 == this.getStatus()) {
      goog.log.fine(this.logger_, this.formatMsg_("Local request error detected and ignored"));
    } else {
      if (this.inSend_ && this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE) {
        goog.Timer.callOnce(this.onReadyStateChange_, 0, this);
      } else {
        if (this.dispatchEvent(goog.net.EventType.READY_STATE_CHANGE), this.isComplete()) {
          goog.log.fine(this.logger_, this.formatMsg_("Request complete"));
          this.active_ = !1;
          try {
            this.isSuccess() ? (this.dispatchEvent(goog.net.EventType.COMPLETE), this.dispatchEvent(goog.net.EventType.SUCCESS)) : (this.lastErrorCode_ = goog.net.ErrorCode.HTTP_ERROR, this.lastError_ = this.getStatusText() + " [" + this.getStatus() + "]", this.dispatchErrors_());
          } finally {
            this.cleanUpXhr_();
          }
        }
      }
    }
  }
};
goog.net.XhrIo.prototype.onProgressHandler_ = function(a, b) {
  goog.asserts.assert(a.type === goog.net.EventType.PROGRESS, "goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");
  this.dispatchEvent(goog.net.XhrIo.buildProgressEvent_(a, goog.net.EventType.PROGRESS));
  this.dispatchEvent(goog.net.XhrIo.buildProgressEvent_(a, b ? goog.net.EventType.DOWNLOAD_PROGRESS : goog.net.EventType.UPLOAD_PROGRESS));
};
goog.net.XhrIo.buildProgressEvent_ = function(a, b) {
  return {type:b, lengthComputable:a.lengthComputable, loaded:a.loaded, total:a.total};
};
goog.net.XhrIo.prototype.cleanUpXhr_ = function(a) {
  if (this.xhr_) {
    this.cleanUpTimeoutTimer_();
    var b = this.xhr_, c = this.xhrOptions_[goog.net.XmlHttp.OptionType.USE_NULL_FUNCTION] ? goog.nullFunction : null;
    this.xhrOptions_ = this.xhr_ = null;
    a || this.dispatchEvent(goog.net.EventType.READY);
    try {
      b.onreadystatechange = c;
    } catch (d) {
      goog.log.error(this.logger_, "Problem encountered resetting onreadystatechange: " + d.message);
    }
  }
};
goog.net.XhrIo.prototype.cleanUpTimeoutTimer_ = function() {
  this.xhr_ && this.useXhr2Timeout_ && (this.xhr_[goog.net.XhrIo.XHR2_ON_TIMEOUT_] = null);
  goog.isNumber(this.timeoutId_) && (goog.Timer.clear(this.timeoutId_), this.timeoutId_ = null);
};
goog.net.XhrIo.prototype.isActive = function() {
  return !!this.xhr_;
};
goog.net.XhrIo.prototype.isComplete = function() {
  return this.getReadyState() == goog.net.XmlHttp.ReadyState.COMPLETE;
};
goog.net.XhrIo.prototype.isSuccess = function() {
  var a = this.getStatus();
  return goog.net.HttpStatus.isSuccess(a) || 0 === a && !this.isLastUriEffectiveSchemeHttp_();
};
goog.net.XhrIo.prototype.isLastUriEffectiveSchemeHttp_ = function() {
  var a = goog.uri.utils.getEffectiveScheme(String(this.lastUri_));
  return goog.net.XhrIo.HTTP_SCHEME_PATTERN.test(a);
};
goog.net.XhrIo.prototype.getReadyState = function() {
  return this.xhr_ ? this.xhr_.readyState : goog.net.XmlHttp.ReadyState.UNINITIALIZED;
};
goog.net.XhrIo.prototype.getStatus = function() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.status : -1;
  } catch (a) {
    return -1;
  }
};
goog.net.XhrIo.prototype.getStatusText = function() {
  try {
    return this.getReadyState() > goog.net.XmlHttp.ReadyState.LOADED ? this.xhr_.statusText : "";
  } catch (a) {
    return goog.log.fine(this.logger_, "Can not get status: " + a.message), "";
  }
};
goog.net.XhrIo.prototype.getLastUri = function() {
  return String(this.lastUri_);
};
goog.net.XhrIo.prototype.getResponseText = function() {
  try {
    return this.xhr_ ? this.xhr_.responseText : "";
  } catch (a) {
    return goog.log.fine(this.logger_, "Can not get responseText: " + a.message), "";
  }
};
goog.net.XhrIo.prototype.getResponseBody = function() {
  try {
    if (this.xhr_ && "responseBody" in this.xhr_) {
      return this.xhr_.responseBody;
    }
  } catch (a) {
    goog.log.fine(this.logger_, "Can not get responseBody: " + a.message);
  }
  return null;
};
goog.net.XhrIo.prototype.getResponseXml = function() {
  try {
    return this.xhr_ ? this.xhr_.responseXML : null;
  } catch (a) {
    return goog.log.fine(this.logger_, "Can not get responseXML: " + a.message), null;
  }
};
goog.net.XhrIo.prototype.getResponseJson = function(a) {
  if (this.xhr_) {
    var b = this.xhr_.responseText;
    a && 0 == b.indexOf(a) && (b = b.substring(a.length));
    return goog.json.parse(b);
  }
};
goog.net.XhrIo.prototype.getResponse = function() {
  try {
    if (!this.xhr_) {
      return null;
    }
    if ("response" in this.xhr_) {
      return this.xhr_.response;
    }
    switch(this.responseType_) {
      case goog.net.XhrIo.ResponseType.DEFAULT:
      case goog.net.XhrIo.ResponseType.TEXT:
        return this.xhr_.responseText;
      case goog.net.XhrIo.ResponseType.ARRAY_BUFFER:
        if ("mozResponseArrayBuffer" in this.xhr_) {
          return this.xhr_.mozResponseArrayBuffer;
        }
    }
    goog.log.error(this.logger_, "Response type " + this.responseType_ + " is not supported on this browser");
    return null;
  } catch (a) {
    return goog.log.fine(this.logger_, "Can not get response: " + a.message), null;
  }
};
goog.net.XhrIo.prototype.getResponseHeader = function(a) {
  return this.xhr_ && this.isComplete() ? this.xhr_.getResponseHeader(a) : void 0;
};
goog.net.XhrIo.prototype.getAllResponseHeaders = function() {
  return this.xhr_ && this.isComplete() ? this.xhr_.getAllResponseHeaders() : "";
};
goog.net.XhrIo.prototype.getResponseHeaders = function() {
  for (var a = {}, b = this.getAllResponseHeaders().split("\r\n"), c = 0; c < b.length; c++) {
    if (!goog.string.isEmptyOrWhitespace(b[c])) {
      var d = goog.string.splitLimit(b[c], ": ", 2);
      a[d[0]] = a[d[0]] ? a[d[0]] + (", " + d[1]) : d[1];
    }
  }
  return a;
};
goog.net.XhrIo.prototype.getStreamingResponseHeader = function(a) {
  return this.xhr_ ? this.xhr_.getResponseHeader(a) : null;
};
goog.net.XhrIo.prototype.getAllStreamingResponseHeaders = function() {
  return this.xhr_ ? this.xhr_.getAllResponseHeaders() : "";
};
goog.net.XhrIo.prototype.getLastErrorCode = function() {
  return this.lastErrorCode_;
};
goog.net.XhrIo.prototype.getLastError = function() {
  return goog.isString(this.lastError_) ? this.lastError_ : String(this.lastError_);
};
goog.net.XhrIo.prototype.formatMsg_ = function(a) {
  return a + " [" + this.lastMethod_ + " " + this.lastUri_ + " " + this.getStatus() + "]";
};
goog.debug.entryPointRegistry.register(function(a) {
  goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_ = a(goog.net.XhrIo.prototype.onReadyStateChangeEntryPoint_);
});
goog.net.streams = {};
goog.net.streams.NodeReadableStream = function() {
};
goog.net.streams.NodeReadableStream.EventType = {READABLE:"readable", DATA:"data", END:"end", CLOSE:"close", ERROR:"error"};
goog.net.streams.NodeReadableStream.prototype.on = goog.abstractMethod;
goog.net.streams.NodeReadableStream.prototype.addListener = goog.abstractMethod;
goog.net.streams.NodeReadableStream.prototype.removeListener = goog.abstractMethod;
goog.net.streams.NodeReadableStream.prototype.once = goog.abstractMethod;
goog.events.EventHandler = function(a) {
  goog.Disposable.call(this);
  this.handler_ = a;
  this.keys_ = {};
};
goog.inherits(goog.events.EventHandler, goog.Disposable);
goog.events.EventHandler.typeArray_ = [];
goog.events.EventHandler.prototype.listen = function(a, b, c, d) {
  return this.listen_(a, b, c, d);
};
goog.events.EventHandler.prototype.listenWithScope = function(a, b, c, d, e) {
  return this.listen_(a, b, c, d, e);
};
goog.events.EventHandler.prototype.listen_ = function(a, b, c, d, e) {
  goog.isArray(b) || (b && (goog.events.EventHandler.typeArray_[0] = b.toString()), b = goog.events.EventHandler.typeArray_);
  for (var f = 0; f < b.length; f++) {
    var g = goog.events.listen(a, b[f], c || this.handleEvent, d || !1, e || this.handler_ || this);
    if (!g) {
      break;
    }
    this.keys_[g.key] = g;
  }
  return this;
};
goog.events.EventHandler.prototype.listenOnce = function(a, b, c, d) {
  return this.listenOnce_(a, b, c, d);
};
goog.events.EventHandler.prototype.listenOnceWithScope = function(a, b, c, d, e) {
  return this.listenOnce_(a, b, c, d, e);
};
goog.events.EventHandler.prototype.listenOnce_ = function(a, b, c, d, e) {
  if (goog.isArray(b)) {
    for (var f = 0; f < b.length; f++) {
      this.listenOnce_(a, b[f], c, d, e);
    }
  } else {
    a = goog.events.listenOnce(a, b, c || this.handleEvent, d, e || this.handler_ || this);
    if (!a) {
      return this;
    }
    this.keys_[a.key] = a;
  }
  return this;
};
goog.events.EventHandler.prototype.listenWithWrapper = function(a, b, c, d) {
  return this.listenWithWrapper_(a, b, c, d);
};
goog.events.EventHandler.prototype.listenWithWrapperAndScope = function(a, b, c, d, e) {
  return this.listenWithWrapper_(a, b, c, d, e);
};
goog.events.EventHandler.prototype.listenWithWrapper_ = function(a, b, c, d, e) {
  b.listen(a, c, d, e || this.handler_ || this, this);
  return this;
};
goog.events.EventHandler.prototype.getListenerCount = function() {
  var a = 0, b;
  for (b in this.keys_) {
    Object.prototype.hasOwnProperty.call(this.keys_, b) && a++;
  }
  return a;
};
goog.events.EventHandler.prototype.unlisten = function(a, b, c, d, e) {
  if (goog.isArray(b)) {
    for (var f = 0; f < b.length; f++) {
      this.unlisten(a, b[f], c, d, e);
    }
  } else {
    if (a = goog.events.getListener(a, b, c || this.handleEvent, d, e || this.handler_ || this)) {
      goog.events.unlistenByKey(a), delete this.keys_[a.key];
    }
  }
  return this;
};
goog.events.EventHandler.prototype.unlistenWithWrapper = function(a, b, c, d, e) {
  b.unlisten(a, c, d, e || this.handler_ || this, this);
  return this;
};
goog.events.EventHandler.prototype.removeAll = function() {
  goog.object.forEach(this.keys_, function(a, b) {
    this.keys_.hasOwnProperty(b) && goog.events.unlistenByKey(a);
  }, this);
  this.keys_ = {};
};
goog.events.EventHandler.prototype.disposeInternal = function() {
  goog.events.EventHandler.superClass_.disposeInternal.call(this);
  this.removeAll();
};
goog.events.EventHandler.prototype.handleEvent = function(a) {
  throw Error("EventHandler.handleEvent not implemented");
};
goog.crypt = {};
goog.crypt.stringToByteArray = function(a) {
  for (var b = [], c = 0, d = 0; d < a.length; d++) {
    for (var e = a.charCodeAt(d); 255 < e;) {
      b[c++] = e & 255, e >>= 8;
    }
    b[c++] = e;
  }
  return b;
};
goog.crypt.byteArrayToString = function(a) {
  if (8192 >= a.length) {
    return String.fromCharCode.apply(null, a);
  }
  for (var b = "", c = 0; c < a.length; c += 8192) {
    var d = goog.array.slice(a, c, c + 8192), b = b + String.fromCharCode.apply(null, d);
  }
  return b;
};
goog.crypt.byteArrayToHex = function(a) {
  return goog.array.map(a, function(a) {
    a = a.toString(16);
    return 1 < a.length ? a : "0" + a;
  }).join("");
};
goog.crypt.hexToByteArray = function(a) {
  goog.asserts.assert(0 == a.length % 2, "Key string length must be multiple of 2");
  for (var b = [], c = 0; c < a.length; c += 2) {
    b.push(parseInt(a.substring(c, c + 2), 16));
  }
  return b;
};
goog.crypt.stringToUtf8ByteArray = function(a) {
  for (var b = [], c = 0, d = 0; d < a.length; d++) {
    var e = a.charCodeAt(d);
    128 > e ? b[c++] = e : (2048 > e ? b[c++] = e >> 6 | 192 : (55296 == (e & 64512) && d + 1 < a.length && 56320 == (a.charCodeAt(d + 1) & 64512) ? (e = 65536 + ((e & 1023) << 10) + (a.charCodeAt(++d) & 1023), b[c++] = e >> 18 | 240, b[c++] = e >> 12 & 63 | 128) : b[c++] = e >> 12 | 224, b[c++] = e >> 6 & 63 | 128), b[c++] = e & 63 | 128);
  }
  return b;
};
goog.crypt.utf8ByteArrayToString = function(a) {
  for (var b, c, d = [], e = 0, f = 0; e < a.length;) {
    var g = a[e++];
    if (128 > g) {
      d[f++] = String.fromCharCode(g);
    } else {
      if (191 < g && 224 > g) {
        c = a[e++], d[f++] = String.fromCharCode((g & 31) << 6 | c & 63);
      } else {
        if (239 < g && 365 > g) {
          c = a[e++];
          b = a[e++];
          var h = a[e++];
          b = ((g & 7) << 18 | (c & 63) << 12 | (b & 63) << 6 | h & 63) - 65536;
          d[f++] = String.fromCharCode(55296 + (b >> 10));
          d[f++] = String.fromCharCode(56320 + (b & 1023));
        } else {
          c = a[e++], b = a[e++], d[f++] = String.fromCharCode((g & 15) << 12 | (c & 63) << 6 | b & 63);
        }
      }
    }
  }
  return d.join("");
};
goog.crypt.xorByteArray = function(a, b) {
  goog.asserts.assert(a.length == b.length, "XOR array lengths must match");
  for (var c = [], d = 0; d < a.length; d++) {
    c.push(a[d] ^ b[d]);
  }
  return c;
};
goog.userAgent.product = {};
goog.userAgent.product.ASSUME_FIREFOX = !1;
goog.userAgent.product.ASSUME_IPHONE = !1;
goog.userAgent.product.ASSUME_IPAD = !1;
goog.userAgent.product.ASSUME_ANDROID = !1;
goog.userAgent.product.ASSUME_CHROME = !1;
goog.userAgent.product.ASSUME_SAFARI = !1;
goog.userAgent.product.PRODUCT_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_OPERA || goog.userAgent.product.ASSUME_FIREFOX || goog.userAgent.product.ASSUME_IPHONE || goog.userAgent.product.ASSUME_IPAD || goog.userAgent.product.ASSUME_ANDROID || goog.userAgent.product.ASSUME_CHROME || goog.userAgent.product.ASSUME_SAFARI;
goog.userAgent.product.OPERA = goog.userAgent.OPERA;
goog.userAgent.product.IE = goog.userAgent.IE;
goog.userAgent.product.EDGE = goog.userAgent.EDGE;
goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_FIREFOX : goog.labs.userAgent.browser.isFirefox();
goog.userAgent.product.isIphoneOrIpod_ = function() {
  return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpod();
};
goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPHONE : goog.userAgent.product.isIphoneOrIpod_();
goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_ANDROID : goog.labs.userAgent.browser.isAndroidBrowser();
goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CHROME : goog.labs.userAgent.browser.isChrome();
goog.userAgent.product.isSafariDesktop_ = function() {
  return goog.labs.userAgent.browser.isSafari() && !goog.labs.userAgent.platform.isIos();
};
goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_SAFARI : goog.userAgent.product.isSafariDesktop_();
goog.crypt.base64 = {};
goog.crypt.base64.byteToCharMap_ = null;
goog.crypt.base64.charToByteMap_ = null;
goog.crypt.base64.byteToCharMapWebSafe_ = null;
goog.crypt.base64.ENCODED_VALS_BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
goog.crypt.base64.ENCODED_VALS = goog.crypt.base64.ENCODED_VALS_BASE + "+/=";
goog.crypt.base64.ENCODED_VALS_WEBSAFE = goog.crypt.base64.ENCODED_VALS_BASE + "-_.";
goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ = goog.userAgent.GECKO || goog.userAgent.WEBKIT && !goog.userAgent.product.SAFARI || goog.userAgent.OPERA;
goog.crypt.base64.HAS_NATIVE_ENCODE_ = goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ || "function" == typeof goog.global.btoa;
goog.crypt.base64.HAS_NATIVE_DECODE_ = goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ || !goog.userAgent.product.SAFARI && !goog.userAgent.IE && "function" == typeof goog.global.atob;
goog.crypt.base64.encodeByteArray = function(a, b) {
  goog.asserts.assert(goog.isArrayLike(a), "encodeByteArray takes an array as a parameter");
  goog.crypt.base64.init_();
  for (var c = b ? goog.crypt.base64.byteToCharMapWebSafe_ : goog.crypt.base64.byteToCharMap_, d = [], e = 0; e < a.length; e += 3) {
    var f = a[e], g = e + 1 < a.length, h = g ? a[e + 1] : 0, k = e + 2 < a.length, n = k ? a[e + 2] : 0, l = f >> 2, f = (f & 3) << 4 | h >> 4, h = (h & 15) << 2 | n >> 6, n = n & 63;
    k || (n = 64, g || (h = 64));
    d.push(c[l], c[f], c[h], c[n]);
  }
  return d.join("");
};
goog.crypt.base64.encodeString = function(a, b) {
  return goog.crypt.base64.HAS_NATIVE_ENCODE_ && !b ? goog.global.btoa(a) : goog.crypt.base64.encodeByteArray(goog.crypt.stringToByteArray(a), b);
};
goog.crypt.base64.decodeString = function(a, b) {
  if (goog.crypt.base64.HAS_NATIVE_DECODE_ && !b) {
    return goog.global.atob(a);
  }
  var c = "";
  goog.crypt.base64.decodeStringInternal_(a, function(a) {
    c += String.fromCharCode(a);
  });
  return c;
};
goog.crypt.base64.decodeStringToByteArray = function(a, b) {
  var c = [];
  goog.crypt.base64.decodeStringInternal_(a, function(a) {
    c.push(a);
  });
  return c;
};
goog.crypt.base64.decodeStringToUint8Array = function(a) {
  goog.asserts.assert(!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10"), "Browser does not support typed arrays");
  var b = new Uint8Array(Math.ceil(3 * a.length / 4)), c = 0;
  goog.crypt.base64.decodeStringInternal_(a, function(a) {
    b[c++] = a;
  });
  return b.subarray(0, c);
};
goog.crypt.base64.decodeStringInternal_ = function(a, b) {
  function c(b) {
    for (; d < a.length;) {
      var c = a.charAt(d++), e = goog.crypt.base64.charToByteMap_[c];
      if (null != e) {
        return e;
      }
      if (!goog.string.isEmptyOrWhitespace(c)) {
        throw Error("Unknown base64 encoding at char: " + c);
      }
    }
    return b;
  }
  goog.crypt.base64.init_();
  for (var d = 0;;) {
    var e = c(-1), f = c(0), g = c(64), h = c(64);
    if (64 === h && -1 === e) {
      break;
    }
    b(e << 2 | f >> 4);
    64 != g && (b(f << 4 & 240 | g >> 2), 64 != h && b(g << 6 & 192 | h));
  }
};
goog.crypt.base64.init_ = function() {
  if (!goog.crypt.base64.byteToCharMap_) {
    goog.crypt.base64.byteToCharMap_ = {};
    goog.crypt.base64.charToByteMap_ = {};
    goog.crypt.base64.byteToCharMapWebSafe_ = {};
    for (var a = 0; a < goog.crypt.base64.ENCODED_VALS.length; a++) {
      goog.crypt.base64.byteToCharMap_[a] = goog.crypt.base64.ENCODED_VALS.charAt(a), goog.crypt.base64.charToByteMap_[goog.crypt.base64.byteToCharMap_[a]] = a, goog.crypt.base64.byteToCharMapWebSafe_[a] = goog.crypt.base64.ENCODED_VALS_WEBSAFE.charAt(a), a >= goog.crypt.base64.ENCODED_VALS_BASE.length && (goog.crypt.base64.charToByteMap_[goog.crypt.base64.ENCODED_VALS_WEBSAFE.charAt(a)] = a);
    }
  }
};
goog.net.streams.Base64StreamDecoder = function() {
  this.isInputValid_ = !0;
  this.streamPos_ = 0;
  this.leftoverInput_ = "";
};
goog.net.streams.Base64StreamDecoder.prototype.isInputValid = function() {
  return this.isInputValid_;
};
goog.net.streams.Base64StreamDecoder.prototype.error_ = function(a, b) {
  this.isInputValid_ = !1;
  throw Error("The stream is broken @" + this.streamPos_ + ". Error: " + b + ". With input:\n" + a);
};
goog.net.streams.Base64StreamDecoder.prototype.decode = function(a) {
  goog.asserts.assertString(a);
  this.isInputValid_ || this.error_(a, "stream already broken");
  this.leftoverInput_ += a;
  a = Math.floor(this.leftoverInput_.length / 4);
  if (0 == a) {
    return null;
  }
  try {
    var b = goog.crypt.base64.decodeStringToByteArray(this.leftoverInput_.substr(0, 4 * a));
  } catch (c) {
    this.error_(this.leftoverInput_, c.message);
  }
  this.streamPos_ += 4 * a;
  this.leftoverInput_ = this.leftoverInput_.substr(4 * a);
  return b;
};
goog.net.streams.StreamParser = function() {
};
goog.net.streams.StreamParser.prototype.isInputValid = goog.abstractMethod;
goog.net.streams.StreamParser.prototype.getErrorMessage = goog.abstractMethod;
goog.net.streams.StreamParser.prototype.parse = goog.abstractMethod;
goog.net.streams.PbStreamParser = function() {
  this.errorMessage_ = null;
  this.result_ = [];
  this.streamPos_ = 0;
  this.state_ = goog.net.streams.PbStreamParser.State_.INIT;
  this.countLengthBytes_ = this.length_ = this.tag_ = 0;
  this.messageBuffer_ = null;
  this.countMessageBytes_ = 0;
};
goog.net.streams.PbStreamParser.State_ = {INIT:0, LENGTH:1, MESSAGE:2, INVALID:3};
goog.net.streams.PbStreamParser.PADDING_TAG_ = 15;
goog.net.streams.PbStreamParser.prototype.isInputValid = function() {
  return this.state_ != goog.net.streams.PbStreamParser.State_.INVALID;
};
goog.net.streams.PbStreamParser.prototype.getErrorMessage = function() {
  return this.errorMessage_;
};
goog.net.streams.PbStreamParser.prototype.error_ = function(a, b, c) {
  this.state_ = goog.net.streams.PbStreamParser.State_.INVALID;
  this.errorMessage_ = "The stream is broken @" + this.streamPos_ + "/" + b + ". Error: " + c + ". With input:\n" + a;
  throw Error(this.errorMessage_);
};
goog.net.streams.PbStreamParser.prototype.parse = function(a) {
  function b(a) {
    a & 128 && f.error_(g, h, "invalid tag");
    2 != (a & 7) && f.error_(g, h, "invalid wire type");
    f.tag_ = a >>> 3;
    1 != f.tag_ && 2 != f.tag_ && 15 != f.tag_ && f.error_(g, h, "unexpected tag");
    f.state_ = goog.net.streams.PbStreamParser.State_.LENGTH;
    f.length_ = 0;
    f.countLengthBytes_ = 0;
  }
  function c(a) {
    f.countLengthBytes_++;
    5 == f.countLengthBytes_ && a & 240 && f.error_(g, h, "message length too long");
    f.length_ |= (a & 127) << 7 * (f.countLengthBytes_ - 1);
    a & 128 || (f.state_ = goog.net.streams.PbStreamParser.State_.MESSAGE, f.countMessageBytes_ = 0, f.messageBuffer_ = "undefined" !== typeof Uint8Array ? new Uint8Array(f.length_) : Array(f.length_), 0 == f.length_ && e());
  }
  function d(a) {
    f.messageBuffer_[f.countMessageBytes_++] = a;
    f.countMessageBytes_ == f.length_ && e();
  }
  function e() {
    if (f.tag_ < goog.net.streams.PbStreamParser.PADDING_TAG_) {
      var a = {};
      a[f.tag_] = f.messageBuffer_;
      f.result_.push(a);
    }
    f.state_ = goog.net.streams.PbStreamParser.State_.INIT;
  }
  goog.asserts.assert(a instanceof Array || a instanceof ArrayBuffer);
  for (var f = this, g = a instanceof Array ? a : new Uint8Array(a), h = 0; h < g.length;) {
    switch(f.state_) {
      case goog.net.streams.PbStreamParser.State_.INVALID:
        f.error_(g, h, "stream already broken");
        break;
      case goog.net.streams.PbStreamParser.State_.INIT:
        b(g[h]);
        break;
      case goog.net.streams.PbStreamParser.State_.LENGTH:
        c(g[h]);
        break;
      case goog.net.streams.PbStreamParser.State_.MESSAGE:
        d(g[h]);
        break;
      default:
        throw Error("unexpected parser state: " + f.state_);
    }
    f.streamPos_++;
    h++;
  }
  a = f.result_;
  f.result_ = [];
  return 0 < a.length ? a : null;
};
var module$exports$goog$net$streams$Base64PbStreamParser = function() {
  this.errorMessage_ = null;
  this.streamPos_ = 0;
  this.base64Decoder_ = new goog.net.streams.Base64StreamDecoder;
  this.pbParser_ = new goog.net.streams.PbStreamParser;
};
module$exports$goog$net$streams$Base64PbStreamParser.prototype.isInputValid = function() {
  return null === this.errorMessage_;
};
module$exports$goog$net$streams$Base64PbStreamParser.prototype.getErrorMessage = function() {
  return this.errorMessage_;
};
module$exports$goog$net$streams$Base64PbStreamParser.prototype.error_ = function(a, b) {
  this.errorMessage_ = "The stream is broken @" + this.streamPos_ + ". Error: " + b + ". With input:\n" + a;
  throw Error(this.errorMessage_);
};
module$exports$goog$net$streams$Base64PbStreamParser.prototype.parse = function(a) {
  goog.asserts.assertString(a);
  null !== this.errorMessage_ && this.error_(a, "stream already broken");
  var b = null;
  try {
    var c = this.base64Decoder_.decode(a), b = null === c ? null : this.pbParser_.parse(c);
  } catch (d) {
    this.error_(a, d.message);
  }
  this.streamPos_ += a.length;
  return b;
};
goog.net.streams.JsonStreamParser = function() {
  this.errorMessage_ = null;
  this.result_ = [];
  this.buffer_ = "";
  this.stack_ = [];
  this.pos_ = this.depth_ = 0;
  this.slashed_ = !1;
  this.unicodeCount_ = 0;
  this.stringInputPattern_ = /[\\"]/g;
  this.streamState_ = goog.net.streams.JsonStreamParser.StreamState_.INIT;
  this.state_ = goog.net.streams.JsonStreamParser.State_.INIT;
};
goog.net.streams.JsonStreamParser.StreamState_ = {INIT:0, ARRAY_OPEN:1, ARRAY_END:2, INVALID:3};
goog.net.streams.JsonStreamParser.State_ = {INIT:0, VALUE:1, OBJECT_OPEN:2, OBJECT_END:3, ARRAY_OPEN:4, ARRAY_END:5, STRING:6, KEY_START:7, KEY_END:8, TRUE1:9, TRUE2:10, TRUE3:11, FALSE1:12, FALSE2:13, FALSE3:14, FALSE4:15, NULL1:16, NULL2:17, NULL3:18, NUM_DECIMAL_POINT:19, NUM_DIGIT:20};
goog.net.streams.JsonStreamParser.prototype.isInputValid = function() {
  return this.streamState_ != goog.net.streams.JsonStreamParser.StreamState_.INVALID;
};
goog.net.streams.JsonStreamParser.prototype.getErrorMessage = function() {
  return this.errorMessage_;
};
goog.net.streams.JsonStreamParser.prototype.error_ = function(a, b) {
  this.streamState_ = goog.net.streams.JsonStreamParser.StreamState_.INVALID;
  this.errorMessage_ = "The stream is broken @" + this.pos_ + "/" + b + ". With input:\n" + a;
  throw Error(this.errorMessage_);
};
goog.net.streams.JsonStreamParser.prototype.parse = function(a) {
  function b() {
    for (; m < a.length;) {
      if (c(a[m])) {
        m++, g.pos_++;
      } else {
        break;
      }
    }
    return m < t;
  }
  function c(a) {
    return "\r" == a || "\n" == a || " " == a || "\t" == a;
  }
  function d() {
    for (var b;;) {
      b = a[m++];
      if (!b) {
        break;
      }
      g.pos_++;
      switch(g.state_) {
        case l.INIT:
          "{" === b ? g.state_ = l.OBJECT_OPEN : "[" === b ? g.state_ = l.ARRAY_OPEN : c(b) || g.error_(a, m);
          continue;
        case l.KEY_START:
        case l.OBJECT_OPEN:
          if (c(b)) {
            continue;
          }
          if (g.state_ === l.KEY_START) {
            h.push(l.KEY_END);
          } else {
            if ("}" === b) {
              f({});
              g.state_ = e();
              continue;
            } else {
              h.push(l.OBJECT_END);
            }
          }
          '"' === b ? g.state_ = l.STRING : g.error_(a, m);
          continue;
        case l.KEY_END:
        case l.OBJECT_END:
          if (c(b)) {
            continue;
          }
          ":" === b ? (g.state_ === l.OBJECT_END && (h.push(l.OBJECT_END), g.depth_++), g.state_ = l.VALUE) : "}" === b ? (g.depth_--, f(), g.state_ = e()) : "," === b ? (g.state_ === l.OBJECT_END && h.push(l.OBJECT_END), g.state_ = l.KEY_START) : g.error_(a, m);
          continue;
        case l.ARRAY_OPEN:
        case l.VALUE:
          if (c(b)) {
            continue;
          }
          if (g.state_ === l.ARRAY_OPEN) {
            if (g.depth_++, g.state_ = l.VALUE, "]" === b) {
              g.depth_--;
              if (0 === g.depth_) {
                g.state_ = l.ARRAY_END;
                break;
              }
              f([]);
              g.state_ = e();
              continue;
            } else {
              h.push(l.ARRAY_END);
            }
          }
          '"' === b ? g.state_ = l.STRING : "{" === b ? g.state_ = l.OBJECT_OPEN : "[" === b ? g.state_ = l.ARRAY_OPEN : "t" === b ? g.state_ = l.TRUE1 : "f" === b ? g.state_ = l.FALSE1 : "n" === b ? g.state_ = l.NULL1 : "-" !== b && (-1 !== "0123456789".indexOf(b) ? g.state_ = l.NUM_DIGIT : g.error_(a, m));
          continue;
        case l.ARRAY_END:
          if ("," === b) {
            h.push(l.ARRAY_END), g.state_ = l.VALUE, 1 === g.depth_ && (p = m);
          } else {
            if ("]" === b) {
              g.depth_--;
              if (0 === g.depth_) {
                break;
              }
              f();
              g.state_ = e();
            } else {
              if (c(b)) {
                continue;
              } else {
                g.error_(a, m);
              }
            }
          }
          continue;
        case l.STRING:
          var d = m;
          a: for (;;) {
            for (; 0 < g.unicodeCount_;) {
              if (b = a[m++], 4 === g.unicodeCount_ ? g.unicodeCount_ = 0 : g.unicodeCount_++, !b) {
                break a;
              }
            }
            if ('"' === b && !g.slashed_) {
              g.state_ = e();
              break;
            }
            if ("\\" === b && !g.slashed_ && (g.slashed_ = !0, b = a[m++], !b)) {
              break;
            }
            if (g.slashed_) {
              if (g.slashed_ = !1, "u" === b && (g.unicodeCount_ = 1), b = a[m++]) {
                continue;
              } else {
                break;
              }
            }
            n.lastIndex = m;
            b = n.exec(a);
            if (!b) {
              m = a.length + 1;
              break;
            }
            m = b.index + 1;
            b = a[b.index];
            if (!b) {
              break;
            }
          }
          g.pos_ += m - d;
          continue;
        case l.TRUE1:
          if (!b) {
            continue;
          }
          "r" === b ? g.state_ = l.TRUE2 : g.error_(a, m);
          continue;
        case l.TRUE2:
          if (!b) {
            continue;
          }
          "u" === b ? g.state_ = l.TRUE3 : g.error_(a, m);
          continue;
        case l.TRUE3:
          if (!b) {
            continue;
          }
          "e" === b ? g.state_ = e() : g.error_(a, m);
          continue;
        case l.FALSE1:
          if (!b) {
            continue;
          }
          "a" === b ? g.state_ = l.FALSE2 : g.error_(a, m);
          continue;
        case l.FALSE2:
          if (!b) {
            continue;
          }
          "l" === b ? g.state_ = l.FALSE3 : g.error_(a, m);
          continue;
        case l.FALSE3:
          if (!b) {
            continue;
          }
          "s" === b ? g.state_ = l.FALSE4 : g.error_(a, m);
          continue;
        case l.FALSE4:
          if (!b) {
            continue;
          }
          "e" === b ? g.state_ = e() : g.error_(a, m);
          continue;
        case l.NULL1:
          if (!b) {
            continue;
          }
          "u" === b ? g.state_ = l.NULL2 : g.error_(a, m);
          continue;
        case l.NULL2:
          if (!b) {
            continue;
          }
          "l" === b ? g.state_ = l.NULL3 : g.error_(a, m);
          continue;
        case l.NULL3:
          if (!b) {
            continue;
          }
          "l" === b ? g.state_ = e() : g.error_(a, m);
          continue;
        case l.NUM_DECIMAL_POINT:
          "." === b ? g.state_ = l.NUM_DIGIT : g.error_(a, m);
          continue;
        case l.NUM_DIGIT:
          if (-1 !== "0123456789.eE+-".indexOf(b)) {
            continue;
          } else {
            m--, g.pos_--, g.state_ = e();
          }
          continue;
        default:
          g.error_(a, m);
      }
    }
  }
  function e() {
    var a = h.pop();
    return null != a ? a : l.VALUE;
  }
  function f(b) {
    1 < g.depth_ || (b || (b = -1 === p ? g.buffer_ + a.substring(q, m) : a.substring(p, m)), goog.isString(b) ? k.push(goog.asserts.assertInstanceof(goog.json.parse(b), Object)) : k.push(b), p = m);
  }
  goog.asserts.assertString(a);
  for (var g = this, h = g.stack_, k = g.result_, n = g.stringInputPattern_, l = goog.net.streams.JsonStreamParser.State_, t = a.length, q = 0, p = -1, m = 0; m < t;) {
    switch(g.streamState_) {
      case goog.net.streams.JsonStreamParser.StreamState_.INVALID:
        return g.error_(a, m), null;
      case goog.net.streams.JsonStreamParser.StreamState_.ARRAY_END:
        return b() && g.error_(a, m), null;
      case goog.net.streams.JsonStreamParser.StreamState_.INIT:
        if (b()) {
          var r = a[m++];
          g.pos_++;
          if ("[" === r) {
            g.streamState_ = goog.net.streams.JsonStreamParser.StreamState_.ARRAY_OPEN;
            q = m;
            g.state_ = l.ARRAY_OPEN;
            continue;
          } else {
            g.error_(a, m);
          }
        }
        return null;
      case goog.net.streams.JsonStreamParser.StreamState_.ARRAY_OPEN:
        return d(), 0 === g.depth_ && g.state_ == l.ARRAY_END ? (g.streamState_ = goog.net.streams.JsonStreamParser.StreamState_.ARRAY_END, g.buffer_ = "") : g.buffer_ = -1 === p ? g.buffer_ + a.substring(q) : a.substring(p), 0 < g.result_.length ? (r = g.result_, g.result_ = [], r) : null;
    }
  }
  return null;
};
goog.net.streams.XhrStreamReader = function(a) {
  this.logger_ = goog.log.getLogger("goog.net.streams.XhrStreamReader");
  this.xhr_ = a;
  this.parser_ = null;
  this.pos_ = 0;
  this.status_ = goog.net.streams.XhrStreamReader.Status.INIT;
  this.dataHandler_ = this.statusHandler_ = null;
  this.eventHandler_ = new goog.events.EventHandler(this);
  this.eventHandler_.listen(this.xhr_, goog.net.EventType.READY_STATE_CHANGE, this.readyStateChangeHandler_);
};
goog.net.streams.XhrStreamReader.Status = {INIT:0, ACTIVE:1, SUCCESS:2, XHR_ERROR:3, NO_DATA:4, BAD_DATA:5, HANDLER_EXCEPTION:6, TIMEOUT:7, CANCELLED:8};
goog.net.streams.XhrStreamReader.isStreamingSupported = function() {
  return goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(10) || goog.userAgent.WEBKIT && !goog.userAgent.isVersionOrHigher("420+") || goog.userAgent.OPERA && !goog.userAgent.WEBKIT ? !1 : !0;
};
goog.net.streams.XhrStreamReader.prototype.getParserByResponseHeader_ = function() {
  var a = this.xhr_.getStreamingResponseHeader(goog.net.XhrIo.CONTENT_TYPE_HEADER);
  if (!a) {
    return goog.log.warning(this.logger_, "Content-Type unavailable: " + a), null;
  }
  a = a.toLowerCase();
  if (goog.string.startsWith(a, "application/json")) {
    return new goog.net.streams.JsonStreamParser;
  }
  if (goog.string.startsWith(a, "application/x-protobuf")) {
    var b = this.xhr_.getStreamingResponseHeader(goog.net.XhrIo.CONTENT_TRANSFER_ENCODING);
    if (!b) {
      return new goog.net.streams.PbStreamParser;
    }
    if ("base64" == b.toLowerCase()) {
      return new module$exports$goog$net$streams$Base64PbStreamParser;
    }
    goog.log.warning(this.logger_, "Unsupported Content-Transfer-Encoding: " + b + "\nFor Content-Type: " + a);
    return null;
  }
  goog.log.warning(this.logger_, "Unsupported Content-Type: " + a);
  return null;
};
goog.net.streams.XhrStreamReader.prototype.getXhr = function() {
  return this.xhr_;
};
goog.net.streams.XhrStreamReader.prototype.getStatus = function() {
  return this.status_;
};
goog.net.streams.XhrStreamReader.prototype.setStatusHandler = function(a) {
  this.statusHandler_ = a;
};
goog.net.streams.XhrStreamReader.prototype.setDataHandler = function(a) {
  this.dataHandler_ = a;
};
goog.net.streams.XhrStreamReader.prototype.readyStateChangeHandler_ = function(a) {
  a = a.target;
  try {
    if (a == this.xhr_) {
      this.onReadyStateChanged_();
    } else {
      goog.log.warning(this.logger_, "Called back with an unexpected xhr.");
    }
  } catch (b) {
    goog.log.error(this.logger_, "readyStateChangeHandler_ thrown exception " + b), this.updateStatus_(goog.net.streams.XhrStreamReader.Status.HANDLER_EXCEPTION), this.clear_();
  }
};
goog.net.streams.XhrStreamReader.prototype.onReadyStateChanged_ = function() {
  var a = this.xhr_.getReadyState(), b = this.xhr_.getLastErrorCode(), c = this.xhr_.getStatus(), d = this.xhr_.getResponseText();
  if (!(a < goog.net.XmlHttp.ReadyState.INTERACTIVE || a == goog.net.XmlHttp.ReadyState.INTERACTIVE && !d)) {
    var e = c == goog.net.HttpStatus.OK || c == goog.net.HttpStatus.PARTIAL_CONTENT;
    a == goog.net.XmlHttp.ReadyState.COMPLETE && (b == goog.net.ErrorCode.TIMEOUT ? this.updateStatus_(goog.net.streams.XhrStreamReader.Status.TIMEOUT) : b == goog.net.ErrorCode.ABORT ? this.updateStatus_(goog.net.streams.XhrStreamReader.Status.CANCELLED) : e || this.updateStatus_(goog.net.streams.XhrStreamReader.Status.XHR_ERROR));
    e && !d && goog.log.warning(this.logger_, "No response text for xhr " + this.xhr_.getLastUri() + " status " + c);
    this.parser_ || (this.parser_ = this.getParserByResponseHeader_(), null == this.parser_ && this.updateStatus_(goog.net.streams.XhrStreamReader.Status.BAD_DATA));
    if (this.status_ > goog.net.streams.XhrStreamReader.Status.SUCCESS) {
      this.clear_();
    } else {
      a == goog.net.XmlHttp.ReadyState.COMPLETE && this.clear_();
      if (a == goog.net.XmlHttp.ReadyState.COMPLETE && 0 == d.length) {
        this.updateStatus_(goog.net.streams.XhrStreamReader.Status.NO_DATA);
      } else {
        if (d.length > this.pos_) {
          b = d.substr(this.pos_);
          this.pos_ = d.length;
          try {
            var f = this.parser_.parse(b);
            null != f && this.dataHandler_ && this.dataHandler_(f);
          } catch (g) {
            goog.log.error(this.logger_, "Invalid response " + g + "\n" + d), this.updateStatus_(goog.net.streams.XhrStreamReader.Status.BAD_DATA);
          }
        }
      }
      this.status_ > goog.net.streams.XhrStreamReader.Status.SUCCESS ? this.clear_() : a == goog.net.XmlHttp.ReadyState.COMPLETE ? this.updateStatus_(goog.net.streams.XhrStreamReader.Status.SUCCESS) : this.updateStatus_(goog.net.streams.XhrStreamReader.Status.ACTIVE);
    }
  }
};
goog.net.streams.XhrStreamReader.prototype.updateStatus_ = function(a) {
  this.status_ != a && (this.status_ = a, this.statusHandler_ && this.statusHandler_());
};
goog.net.streams.XhrStreamReader.prototype.clear_ = function() {
  this.eventHandler_.removeAll();
  if (this.xhr_) {
    var a = this.xhr_;
    this.xhr_ = null;
    a.abort();
    a.dispose();
  }
};
goog.net.streams.XhrNodeReadableStream = function(a) {
  this.logger_ = goog.log.getLogger("goog.net.streams.XhrNodeReadableStream");
  this.xhrReader_ = a;
  this.xhrReader_.setDataHandler(goog.bind(this.onData_, this));
  this.xhrReader_.setStatusHandler(goog.bind(this.onStatusChange_, this));
  this.callbackMap_ = {};
  this.callbackOnceMap_ = {};
};
goog.net.streams.XhrNodeReadableStream.prototype.on = function(a, b) {
  var c = this.callbackMap_[a];
  c || (c = [], this.callbackMap_[a] = c);
  c.push(b);
  return this;
};
goog.net.streams.XhrNodeReadableStream.prototype.addListener = function(a, b) {
  this.on(a, b);
  return this;
};
goog.net.streams.XhrNodeReadableStream.prototype.removeListener = function(a, b) {
  var c = this.callbackMap_[a];
  c && goog.array.remove(c, b);
  (c = this.callbackOnceMap_[a]) && goog.array.remove(c, b);
  return this;
};
goog.net.streams.XhrNodeReadableStream.prototype.once = function(a, b) {
  var c = this.callbackOnceMap_[a];
  c || (c = [], this.callbackOnceMap_[a] = c);
  c.push(b);
  return this;
};
goog.net.streams.XhrNodeReadableStream.prototype.onData_ = function(a) {
  var b = this.callbackMap_[goog.net.streams.NodeReadableStream.EventType.DATA];
  b && this.doMessages_(a, b);
  (b = this.callbackOnceMap_[goog.net.streams.NodeReadableStream.EventType.DATA]) && this.doMessages_(a, b);
  this.callbackOnceMap_[goog.net.streams.NodeReadableStream.EventType.DATA] = [];
};
goog.net.streams.XhrNodeReadableStream.prototype.doMessages_ = function(a, b) {
  for (var c = this, d = 0; d < a.length; d++) {
    var e = a[d];
    goog.array.forEach(b, function(a) {
      try {
        a(e);
      } catch (g) {
        c.handleError_("message-callback exception (ignored) " + g);
      }
    });
  }
};
goog.net.streams.XhrNodeReadableStream.prototype.onStatusChange_ = function() {
  var a = this.xhrReader_.getStatus(), b = goog.net.streams.XhrStreamReader.Status, c = goog.net.streams.NodeReadableStream.EventType;
  switch(a) {
    case b.ACTIVE:
      this.doStatus_(c.READABLE);
      break;
    case b.BAD_DATA:
    case b.HANDLER_EXCEPTION:
    case b.NO_DATA:
    case b.TIMEOUT:
    case b.XHR_ERROR:
      this.doStatus_(c.ERROR);
      break;
    case b.CANCELLED:
      this.doStatus_(c.CLOSE);
      break;
    case b.SUCCESS:
      this.doStatus_(c.END);
  }
};
goog.net.streams.XhrNodeReadableStream.prototype.doStatus_ = function(a) {
  var b = this.callbackMap_[a], c = this;
  b && goog.array.forEach(b, function(a) {
    try {
      a();
    } catch (e) {
      c.handleError_("status-callback exception (ignored) " + e);
    }
  });
  (b = this.callbackOnceMap_[a]) && goog.array.forEach(b, function(a) {
    a();
  });
  this.callbackOnceMap_[a] = [];
};
goog.net.streams.XhrNodeReadableStream.prototype.handleError_ = function(a) {
  goog.log.error(this.logger_, a);
};
goog.net.streams.createXhrNodeReadableStream = function(a) {
  goog.asserts.assert(!a.isActive(), "XHR is already sent.");
  if (!goog.net.streams.XhrStreamReader.isStreamingSupported()) {
    return null;
  }
  a = new goog.net.streams.XhrStreamReader(a);
  return new goog.net.streams.XhrNodeReadableStream(a);
};
grpc.web.StatusCode = {OK:0, CANCELLED:1, UNKNOWN:2, INVALID_ARGUMENT:3, DEADLINE_EXCEEDED:4, NOT_FOUND:5, ALREADY_EXISTS:6, PERMISSION_DENIED:7, UNAUTHENTICATED:16, RESOURCE_EXHAUSTED:8, FAILED_PRECONDITION:9, ABORTED:10, OUT_OF_RANGE:11, UNIMPLEMENTED:12, INTERNAL:13, UNAVAILABLE:14, DATA_LOSS:15};
grpc.web.StatusCode.fromHttpStatus = function(a) {
  switch(a) {
    case 200:
      return grpc.web.StatusCode.OK;
    case 400:
      return grpc.web.StatusCode.INVALID_ARGUMENT;
    case 401:
      return grpc.web.StatusCode.UNAUTHENTICATED;
    case 403:
      return grpc.web.StatusCode.PERMISSION_DENIED;
    case 404:
      return grpc.web.StatusCode.NOT_FOUND;
    case 409:
      return grpc.web.StatusCode.ABORTED;
    case 412:
      return grpc.web.StatusCode.FAILED_PRECONDITION;
    case 429:
      return grpc.web.StatusCode.RESOURCE_EXHAUSTED;
    case 499:
      return grpc.web.StatusCode.CANCELLED;
    case 500:
      return grpc.web.StatusCode.UNKNOWN;
    case 501:
      return grpc.web.StatusCode.UNIMPLEMENTED;
    case 503:
      return grpc.web.StatusCode.UNAVAILABLE;
    case 504:
      return grpc.web.StatusCode.DEADLINE_EXCEEDED;
    default:
      return grpc.web.StatusCode.UNKNOWN;
  }
};
grpc.web.ClientReadableStream = function(a, b, c) {
  this.xhrNodeReadableStream_ = goog.net.streams.createXhrNodeReadableStream(a);
  this.responseDeserializeFn_ = b;
  this.xhr_ = a;
  this.onStatusCallback_ = this.onDataCallback_ = null;
  this.rpcStatusParseFn_ = c;
  var d = this;
  this.xhrNodeReadableStream_.on("data", function(a) {
    if ("1" in a && d.onDataCallback_) {
      var b = d.responseDeserializeFn_(a["1"]);
      d.onDataCallback_(b);
    }
    "2" in a && d.onStatusCallback_ && (a = d.rpcStatusParseFn_(a["2"]), d.onStatusCallback_(a));
  });
};
grpc.web.ClientReadableStream.prototype.on = function(a, b) {
  "data" == a ? this.onDataCallback_ = b : "status" == a && (this.onStatusCallback_ = b);
  return this;
};
grpc.web.ClientReadableStream.prototype.cancel = function() {
  this.xhr_.abort();
};
var jspb = {Map:function(a, b) {
  this.arr_ = a;
  this.valueCtor_ = b;
  this.map_ = {};
  this.arrClean = !0;
  0 < this.arr_.length && this.loadFromArray_();
}};
jspb.Map.prototype.loadFromArray_ = function() {
  for (var a = 0; a < this.arr_.length; a++) {
    var b = this.arr_[a], c = b[0];
    this.map_[c.toString()] = new jspb.Map.Entry_(c, b[1]);
  }
  this.arrClean = !0;
};
jspb.Map.prototype.toArray = function() {
  var a;
  if (this.arrClean) {
    if (this.valueCtor_) {
      var b = this.map_;
      for (var c in b) {
        Object.prototype.hasOwnProperty.call(b, c) && (a = b[c].valueWrapper) && a.toArray();
      }
    }
  } else {
    this.arr_.length = 0;
    c = this.stringKeys_();
    c.sort();
    for (var d = 0; d < c.length; d++) {
      b = this.map_[c[d]], (a = b.valueWrapper) && a.toArray(), this.arr_.push([b.key, b.value]);
    }
    this.arrClean = !0;
  }
  return this.arr_;
};
jspb.Map.arrayIterator_ = function(a) {
  var b = 0;
  return {next:function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  }};
};
jspb.Map.prototype.getLength = function() {
  return this.stringKeys_().length;
};
jspb.Map.prototype.clear = function() {
  this.map_ = {};
  this.arrClean = !1;
};
jspb.Map.prototype.del = function(a) {
  a = a.toString();
  var b = this.map_.hasOwnProperty(a);
  delete this.map_[a];
  this.arrClean = !1;
  return b;
};
jspb.Map.prototype.getEntryList = function() {
  var a = [], b = this.stringKeys_();
  b.sort();
  for (var c = 0; c < b.length; c++) {
    var d = this.map_[b[c]];
    a.push([d.key, d.value]);
  }
  return a;
};
jspb.Map.prototype.entries = function() {
  var a = [], b = this.stringKeys_();
  b.sort();
  for (var c = 0; c < b.length; c++) {
    var d = this.map_[b[c]];
    a.push([d.key, this.wrapEntry_(d)]);
  }
  return jspb.Map.arrayIterator_(a);
};
jspb.Map.prototype.keys = function() {
  var a = [], b = this.stringKeys_();
  b.sort();
  for (var c = 0; c < b.length; c++) {
    a.push(this.map_[b[c]].key);
  }
  return jspb.Map.arrayIterator_(a);
};
jspb.Map.prototype.values = function() {
  var a = [], b = this.stringKeys_();
  b.sort();
  for (var c = 0; c < b.length; c++) {
    a.push(this.wrapEntry_(this.map_[b[c]]));
  }
  return jspb.Map.arrayIterator_(a);
};
jspb.Map.prototype.forEach = function(a, b) {
  var c = this.stringKeys_();
  c.sort();
  for (var d = 0; d < c.length; d++) {
    var e = this.map_[c[d]];
    a.call(b, this.wrapEntry_(e), e.key, this);
  }
};
jspb.Map.prototype.set = function(a, b) {
  var c = new jspb.Map.Entry_(a);
  this.valueCtor_ ? (c.valueWrapper = b, c.value = b.toArray()) : c.value = b;
  this.map_[a.toString()] = c;
  this.arrClean = !1;
  return this;
};
jspb.Map.prototype.wrapEntry_ = function(a) {
  return this.valueCtor_ ? (a.valueWrapper || (a.valueWrapper = new this.valueCtor_(a.value)), a.valueWrapper) : a.value;
};
jspb.Map.prototype.get = function(a) {
  if (a = this.map_[a.toString()]) {
    return this.wrapEntry_(a);
  }
};
jspb.Map.prototype.has = function(a) {
  return a.toString() in this.map_;
};
jspb.Map.prototype.serializeBinary = function(a, b, c, d, e) {
  var f = this.stringKeys_();
  f.sort();
  for (var g = 0; g < f.length; g++) {
    var h = this.map_[f[g]];
    b.beginSubMessage(a);
    c.call(b, 1, h.key);
    this.valueCtor_ ? d.call(b, 2, this.wrapEntry_(h), e) : d.call(b, 2, h.value);
    b.endSubMessage();
  }
};
jspb.Map.deserializeBinary = function(a, b, c, d, e) {
  for (var f = void 0, g = void 0; b.nextField() && !b.isEndGroup();) {
    var h = b.getFieldNumber();
    1 == h ? f = c.call(b) : 2 == h && (a.valueCtor_ ? (g = new a.valueCtor_, d.call(b, g, e)) : g = d.call(b));
  }
  goog.asserts.assert(void 0 != f);
  goog.asserts.assert(void 0 != g);
  a.set(f, g);
};
jspb.Map.prototype.stringKeys_ = function() {
  var a = this.map_, b = [], c;
  for (c in a) {
    Object.prototype.hasOwnProperty.call(a, c) && b.push(c);
  }
  return b;
};
jspb.Map.Entry_ = function(a, b) {
  this.key = a;
  this.value = b;
  this.valueWrapper = void 0;
};
jspb.ExtensionFieldInfo = function(a, b, c, d, e) {
  this.fieldIndex = a;
  this.fieldName = b;
  this.ctor = c;
  this.toObjectFn = d;
  this.isRepeated = e;
};
jspb.ExtensionFieldBinaryInfo = function(a, b, c, d, e, f) {
  this.fieldInfo = a;
  this.binaryReaderFn = b;
  this.binaryWriterFn = c;
  this.binaryMessageSerializeFn = d;
  this.binaryMessageDeserializeFn = e;
  this.isPacked = f;
};
jspb.ExtensionFieldInfo.prototype.isMessageType = function() {
  return !!this.ctor;
};
jspb.Message = function() {
};
jspb.Message.GENERATE_TO_OBJECT = !0;
jspb.Message.GENERATE_FROM_OBJECT = !goog.DISALLOW_TEST_ONLY_CODE;
jspb.Message.MINIMIZE_MEMORY_ALLOCATIONS = COMPILED;
jspb.Message.SUPPORTS_UINT8ARRAY_ = "function" == typeof Uint8Array;
jspb.Message.prototype.getJsPbMessageId = function() {
  return this.messageId_;
};
jspb.Message.getIndex_ = function(a, b) {
  return b + a.arrayIndexOffset_;
};
jspb.Message.initialize = function(a, b, c, d, e, f) {
  a.wrappers_ = jspb.Message.MINIMIZE_MEMORY_ALLOCATIONS ? null : {};
  b || (b = c ? [c] : []);
  a.messageId_ = c ? String(c) : void 0;
  a.arrayIndexOffset_ = 0 === c ? -1 : 0;
  a.array = b;
  jspb.Message.materializeExtensionObject_(a, d);
  a.convertedFloatingPointFields_ = {};
  if (e) {
    for (b = 0; b < e.length; b++) {
      c = e[b], c < a.pivot_ ? (c = jspb.Message.getIndex_(a, c), a.array[c] = a.array[c] || (jspb.Message.MINIMIZE_MEMORY_ALLOCATIONS ? jspb.Message.EMPTY_LIST_SENTINEL_ : [])) : a.extensionObject_[c] = a.extensionObject_[c] || (jspb.Message.MINIMIZE_MEMORY_ALLOCATIONS ? jspb.Message.EMPTY_LIST_SENTINEL_ : []);
    }
  }
  f && f.length && goog.array.forEach(f, goog.partial(jspb.Message.computeOneofCase, a));
};
jspb.Message.EMPTY_LIST_SENTINEL_ = goog.DEBUG && Object.freeze ? Object.freeze([]) : [];
jspb.Message.materializeExtensionObject_ = function(a, b) {
  if (a.array.length) {
    var c = a.array.length - 1, d = a.array[c];
    if (d && "object" == typeof d && !goog.isArray(d) && !(jspb.Message.SUPPORTS_UINT8ARRAY_ && d instanceof Uint8Array)) {
      a.pivot_ = c - a.arrayIndexOffset_;
      a.extensionObject_ = d;
      return;
    }
  }
  -1 < b ? (a.pivot_ = b, c = jspb.Message.getIndex_(a, b), a.extensionObject_ = jspb.Message.MINIMIZE_MEMORY_ALLOCATIONS ? null : a.array[c] = {}) : a.pivot_ = Number.MAX_VALUE;
};
jspb.Message.maybeInitEmptyExtensionObject_ = function(a) {
  var b = jspb.Message.getIndex_(a, a.pivot_);
  a.array[b] || (a.extensionObject_ = a.array[b] = {});
};
jspb.Message.toObjectList = function(a, b, c) {
  for (var d = [], e = 0; e < a.length; e++) {
    d[e] = b.call(a[e], c, a[e]);
  }
  return d;
};
jspb.Message.toObjectExtension = function(a, b, c, d, e) {
  for (var f in c) {
    var g = c[f], h = d.call(a, g);
    if (h) {
      for (var k in g.fieldName) {
        if (g.fieldName.hasOwnProperty(k)) {
          break;
        }
      }
      b[k] = g.toObjectFn ? g.isRepeated ? jspb.Message.toObjectList(h, g.toObjectFn, e) : g.toObjectFn(e, h) : h;
    }
  }
};
jspb.Message.serializeBinaryExtensions = function(a, b, c, d) {
  for (var e in c) {
    var f = c[e], g = f.fieldInfo;
    if (!f.binaryWriterFn) {
      throw Error("Message extension present that was generated without binary serialization support");
    }
    var h = d.call(a, g);
    if (h) {
      if (g.isMessageType()) {
        if (f.binaryMessageSerializeFn) {
          f.binaryWriterFn.call(b, g.fieldIndex, h, f.binaryMessageSerializeFn);
        } else {
          throw Error("Message extension present holding submessage without binary support enabled, and message is being serialized to binary format");
        }
      } else {
        f.binaryWriterFn.call(b, g.fieldIndex, h);
      }
    }
  }
};
jspb.Message.readBinaryExtension = function(a, b, c, d, e) {
  var f = c[b.getFieldNumber()];
  c = f.fieldInfo;
  if (f) {
    if (!f.binaryReaderFn) {
      throw Error("Deserializing extension whose generated code does not support binary format");
    }
    if (c.isMessageType()) {
      var g = new c.ctor;
      f.binaryReaderFn.call(b, g, f.binaryMessageDeserializeFn);
    } else {
      g = f.binaryReaderFn.call(b);
    }
    c.isRepeated && !f.isPacked ? (b = d.call(a, c)) ? b.push(g) : e.call(a, c, [g]) : e.call(a, c, g);
  } else {
    b.skipField();
  }
};
jspb.Message.getField = function(a, b) {
  if (b < a.pivot_) {
    var c = jspb.Message.getIndex_(a, b);
    var d = a.array[c];
    return d === jspb.Message.EMPTY_LIST_SENTINEL_ ? a.array[c] = [] : d;
  }
  d = a.extensionObject_[b];
  return d === jspb.Message.EMPTY_LIST_SENTINEL_ ? a.extensionObject_[b] = [] : d;
};
jspb.Message.getOptionalFloatingPointField = function(a, b) {
  var c = jspb.Message.getField(a, b);
  return null == c ? c : +c;
};
jspb.Message.getRepeatedFloatingPointField = function(a, b) {
  var c = jspb.Message.getField(a, b);
  a.convertedFloatingPointFields_ || (a.convertedFloatingPointFields_ = {});
  if (!a.convertedFloatingPointFields_[b]) {
    for (var d = 0; d < c.length; d++) {
      c[d] = +c[d];
    }
    a.convertedFloatingPointFields_[b] = !0;
  }
  return c;
};
jspb.Message.bytesAsB64 = function(a) {
  if (null == a || goog.isString(a)) {
    return a;
  }
  if (jspb.Message.SUPPORTS_UINT8ARRAY_ && a instanceof Uint8Array) {
    return goog.crypt.base64.encodeByteArray(a);
  }
  goog.asserts.fail("Cannot coerce to b64 string: " + goog.typeOf(a));
  return null;
};
jspb.Message.bytesAsU8 = function(a) {
  if (null == a || a instanceof Uint8Array) {
    return a;
  }
  if (goog.isString(a)) {
    return goog.crypt.base64.decodeStringToUint8Array(a);
  }
  goog.asserts.fail("Cannot coerce to Uint8Array: " + goog.typeOf(a));
  return null;
};
jspb.Message.bytesListAsB64 = function(a) {
  jspb.Message.assertConsistentTypes_(a);
  return !a.length || goog.isString(a[0]) ? a : goog.array.map(a, jspb.Message.bytesAsB64);
};
jspb.Message.bytesListAsU8 = function(a) {
  jspb.Message.assertConsistentTypes_(a);
  return !a.length || a[0] instanceof Uint8Array ? a : goog.array.map(a, jspb.Message.bytesAsU8);
};
jspb.Message.assertConsistentTypes_ = function(a) {
  if (goog.DEBUG && a && 1 < a.length) {
    var b = goog.typeOf(a[0]);
    goog.array.forEach(a, function(a) {
      goog.typeOf(a) != b && goog.asserts.fail("Inconsistent type in JSPB repeated field array. Got " + goog.typeOf(a) + " expected " + b);
    });
  }
};
jspb.Message.getFieldWithDefault = function(a, b, c) {
  a = jspb.Message.getField(a, b);
  return null == a ? c : a;
};
jspb.Message.getMapField = function(a, b, c, d) {
  a.wrappers_ || (a.wrappers_ = {});
  if (b in a.wrappers_) {
    return a.wrappers_[b];
  }
  if (!c) {
    return c = jspb.Message.getField(a, b), c || (c = [], jspb.Message.setField(a, b, c)), a.wrappers_[b] = new jspb.Map(c, d);
  }
};
jspb.Message.setField = function(a, b, c) {
  b < a.pivot_ ? a.array[jspb.Message.getIndex_(a, b)] = c : a.extensionObject_[b] = c;
};
jspb.Message.addToRepeatedField = function(a, b, c, d) {
  a = jspb.Message.getField(a, b);
  void 0 != d ? a.splice(d, 0, c) : a.push(c);
};
jspb.Message.setOneofField = function(a, b, c, d) {
  (c = jspb.Message.computeOneofCase(a, c)) && c !== b && void 0 !== d && (a.wrappers_ && c in a.wrappers_ && (a.wrappers_[c] = void 0), jspb.Message.setField(a, c, void 0));
  jspb.Message.setField(a, b, d);
};
jspb.Message.computeOneofCase = function(a, b) {
  var c, d;
  goog.array.forEach(b, function(b) {
    var e = jspb.Message.getField(a, b);
    goog.isDefAndNotNull(e) && (c = b, d = e, jspb.Message.setField(a, b, void 0));
  });
  return c ? (jspb.Message.setField(a, c, d), c) : 0;
};
jspb.Message.getWrapperField = function(a, b, c, d) {
  a.wrappers_ || (a.wrappers_ = {});
  if (!a.wrappers_[c]) {
    var e = jspb.Message.getField(a, c);
    if (d || e) {
      a.wrappers_[c] = new b(e);
    }
  }
  return a.wrappers_[c];
};
jspb.Message.getRepeatedWrapperField = function(a, b, c) {
  jspb.Message.wrapRepeatedField_(a, b, c);
  b = a.wrappers_[c];
  b == jspb.Message.EMPTY_LIST_SENTINEL_ && (b = a.wrappers_[c] = []);
  return b;
};
jspb.Message.wrapRepeatedField_ = function(a, b, c) {
  a.wrappers_ || (a.wrappers_ = {});
  if (!a.wrappers_[c]) {
    for (var d = jspb.Message.getField(a, c), e = [], f = 0; f < d.length; f++) {
      e[f] = new b(d[f]);
    }
    a.wrappers_[c] = e;
  }
};
jspb.Message.setWrapperField = function(a, b, c) {
  a.wrappers_ || (a.wrappers_ = {});
  var d = c ? c.toArray() : c;
  a.wrappers_[b] = c;
  jspb.Message.setField(a, b, d);
};
jspb.Message.setOneofWrapperField = function(a, b, c, d) {
  a.wrappers_ || (a.wrappers_ = {});
  var e = d ? d.toArray() : d;
  a.wrappers_[b] = d;
  jspb.Message.setOneofField(a, b, c, e);
};
jspb.Message.setRepeatedWrapperField = function(a, b, c) {
  a.wrappers_ || (a.wrappers_ = {});
  c = c || [];
  for (var d = [], e = 0; e < c.length; e++) {
    d[e] = c[e].toArray();
  }
  a.wrappers_[b] = c;
  jspb.Message.setField(a, b, d);
};
jspb.Message.addToRepeatedWrapperField = function(a, b, c, d, e) {
  jspb.Message.wrapRepeatedField_(a, d, b);
  var f = a.wrappers_[b];
  f || (f = a.wrappers_[b] = []);
  c = c ? c : new d;
  a = jspb.Message.getField(a, b);
  void 0 != e ? (f.splice(e, 0, c), a.splice(e, 0, c.toArray())) : (f.push(c), a.push(c.toArray()));
  return c;
};
jspb.Message.toMap = function(a, b, c, d) {
  for (var e = {}, f = 0; f < a.length; f++) {
    e[b.call(a[f])] = c ? c.call(a[f], d, a[f]) : a[f];
  }
  return e;
};
jspb.Message.prototype.syncMapFields_ = function() {
  if (this.wrappers_) {
    for (var a in this.wrappers_) {
      var b = this.wrappers_[a];
      if (goog.isArray(b)) {
        for (var c = 0; c < b.length; c++) {
          b[c] && b[c].toArray();
        }
      } else {
        b && b.toArray();
      }
    }
  }
};
jspb.Message.prototype.toArray = function() {
  this.syncMapFields_();
  return this.array;
};
jspb.Message.prototype.toString = function() {
  this.syncMapFields_();
  return this.array.toString();
};
jspb.Message.prototype.getExtension = function(a) {
  if (this.extensionObject_) {
    this.wrappers_ || (this.wrappers_ = {});
    var b = a.fieldIndex;
    if (a.isRepeated) {
      if (a.isMessageType()) {
        return this.wrappers_[b] || (this.wrappers_[b] = goog.array.map(this.extensionObject_[b] || [], function(b) {
          return new a.ctor(b);
        })), this.wrappers_[b];
      }
    } else {
      if (a.isMessageType()) {
        return !this.wrappers_[b] && this.extensionObject_[b] && (this.wrappers_[b] = new a.ctor(this.extensionObject_[b])), this.wrappers_[b];
      }
    }
    return this.extensionObject_[b];
  }
};
jspb.Message.prototype.setExtension = function(a, b) {
  this.wrappers_ || (this.wrappers_ = {});
  jspb.Message.maybeInitEmptyExtensionObject_(this);
  var c = a.fieldIndex;
  a.isRepeated ? (b = b || [], a.isMessageType() ? (this.wrappers_[c] = b, this.extensionObject_[c] = goog.array.map(b, function(a) {
    return a.toArray();
  })) : this.extensionObject_[c] = b) : a.isMessageType() ? (this.wrappers_[c] = b, this.extensionObject_[c] = b ? b.toArray() : b) : this.extensionObject_[c] = b;
  return this;
};
jspb.Message.difference = function(a, b) {
  if (!(a instanceof b.constructor)) {
    throw Error("Messages have different types.");
  }
  var c = a.toArray(), d = b.toArray(), e = [], f = 0, g = c.length > d.length ? c.length : d.length;
  a.getJsPbMessageId() && (e[0] = a.getJsPbMessageId(), f = 1);
  for (; f < g; f++) {
    jspb.Message.compareFields(c[f], d[f]) || (e[f] = d[f]);
  }
  return new a.constructor(e);
};
jspb.Message.equals = function(a, b) {
  return a == b || !(!a || !b) && a instanceof b.constructor && jspb.Message.compareFields(a.toArray(), b.toArray());
};
jspb.Message.compareExtensions = function(a, b) {
  a = a || {};
  b = b || {};
  var c = {}, d;
  for (d in a) {
    c[d] = 0;
  }
  for (d in b) {
    c[d] = 0;
  }
  for (d in c) {
    if (!jspb.Message.compareFields(a[d], b[d])) {
      return !1;
    }
  }
  return !0;
};
jspb.Message.compareFields = function(a, b) {
  if (a == b) {
    return !0;
  }
  if (!goog.isObject(a) || !goog.isObject(b) || a.constructor != b.constructor) {
    return !1;
  }
  if (jspb.Message.SUPPORTS_UINT8ARRAY_ && a.constructor === Uint8Array) {
    if (a.length != b.length) {
      return !1;
    }
    for (var c = 0; c < a.length; c++) {
      if (a[c] != b[c]) {
        return !1;
      }
    }
    return !0;
  }
  if (a.constructor === Array) {
    for (var d = void 0, e = void 0, f = Math.max(a.length, b.length), c = 0; c < f; c++) {
      var g = a[c], h = b[c];
      g && g.constructor == Object && (goog.asserts.assert(void 0 === d), goog.asserts.assert(c === a.length - 1), d = g, g = void 0);
      h && h.constructor == Object && (goog.asserts.assert(void 0 === e), goog.asserts.assert(c === b.length - 1), e = h, h = void 0);
      if (!jspb.Message.compareFields(g, h)) {
        return !1;
      }
    }
    return d || e ? (d = d || {}, e = e || {}, jspb.Message.compareExtensions(d, e)) : !0;
  }
  if (a.constructor === Object) {
    return jspb.Message.compareExtensions(a, b);
  }
  throw Error("Invalid type in JSPB array");
};
jspb.Message.prototype.cloneMessage = function() {
  return jspb.Message.cloneMessage(this);
};
jspb.Message.prototype.clone = function() {
  return jspb.Message.cloneMessage(this);
};
jspb.Message.clone = function(a) {
  return jspb.Message.cloneMessage(a);
};
jspb.Message.cloneMessage = function(a) {
  return new a.constructor(jspb.Message.clone_(a.toArray()));
};
jspb.Message.copyInto = function(a, b) {
  goog.asserts.assertInstanceof(a, jspb.Message);
  goog.asserts.assertInstanceof(b, jspb.Message);
  goog.asserts.assert(a.constructor == b.constructor, "Copy source and target message should have the same type.");
  for (var c = jspb.Message.clone(a), d = b.toArray(), e = c.toArray(), f = d.length = 0; f < e.length; f++) {
    d[f] = e[f];
  }
  b.wrappers_ = c.wrappers_;
  b.extensionObject_ = c.extensionObject_;
};
jspb.Message.clone_ = function(a) {
  var b;
  if (goog.isArray(a)) {
    for (var c = Array(a.length), d = 0; d < a.length; d++) {
      null != (b = a[d]) && (c[d] = "object" == typeof b ? jspb.Message.clone_(b) : b);
    }
    return c;
  }
  if (jspb.Message.SUPPORTS_UINT8ARRAY_ && a instanceof Uint8Array) {
    return new Uint8Array(a);
  }
  c = {};
  for (d in a) {
    null != (b = a[d]) && (c[d] = "object" == typeof b ? jspb.Message.clone_(b) : b);
  }
  return c;
};
jspb.Message.registerMessageType = function(a, b) {
  jspb.Message.registry_[a] = b;
  b.messageId = a;
};
jspb.Message.registry_ = {};
jspb.Message.messageSetExtensions = {};
jspb.Message.messageSetExtensionsBinary = {};
jspb.BinaryConstants = {};
jspb.ConstBinaryMessage = function() {
};
jspb.BinaryMessage = function() {
};
jspb.BinaryConstants.FieldType = {INVALID:-1, DOUBLE:1, FLOAT:2, INT64:3, UINT64:4, INT32:5, FIXED64:6, FIXED32:7, BOOL:8, STRING:9, GROUP:10, MESSAGE:11, BYTES:12, UINT32:13, ENUM:14, SFIXED32:15, SFIXED64:16, SINT32:17, SINT64:18, FHASH64:30, VHASH64:31};
jspb.BinaryConstants.WireType = {INVALID:-1, VARINT:0, FIXED64:1, DELIMITED:2, START_GROUP:3, END_GROUP:4, FIXED32:5};
jspb.BinaryConstants.FieldTypeToWireType = function(a) {
  var b = jspb.BinaryConstants.FieldType, c = jspb.BinaryConstants.WireType;
  switch(a) {
    case b.INT32:
    case b.INT64:
    case b.UINT32:
    case b.UINT64:
    case b.SINT32:
    case b.SINT64:
    case b.BOOL:
    case b.ENUM:
    case b.VHASH64:
      return c.VARINT;
    case b.DOUBLE:
    case b.FIXED64:
    case b.SFIXED64:
    case b.FHASH64:
      return c.FIXED64;
    case b.STRING:
    case b.MESSAGE:
    case b.BYTES:
      return c.DELIMITED;
    case b.FLOAT:
    case b.FIXED32:
    case b.SFIXED32:
      return c.FIXED32;
    default:
      return c.INVALID;
  }
};
jspb.BinaryConstants.INVALID_FIELD_NUMBER = -1;
jspb.BinaryConstants.FLOAT32_EPS = 1.401298464324817e-45;
jspb.BinaryConstants.FLOAT32_MIN = 1.1754943508222875e-38;
jspb.BinaryConstants.FLOAT32_MAX = 3.4028234663852886e+38;
jspb.BinaryConstants.FLOAT64_EPS = 5e-324;
jspb.BinaryConstants.FLOAT64_MIN = 2.2250738585072014e-308;
jspb.BinaryConstants.FLOAT64_MAX = 1.7976931348623157e+308;
jspb.BinaryConstants.TWO_TO_20 = 1048576;
jspb.BinaryConstants.TWO_TO_23 = 8388608;
jspb.BinaryConstants.TWO_TO_31 = 2147483648;
jspb.BinaryConstants.TWO_TO_32 = 4294967296;
jspb.BinaryConstants.TWO_TO_52 = 4503599627370496;
jspb.BinaryConstants.TWO_TO_63 = 9223372036854775808;
jspb.BinaryConstants.TWO_TO_64 = 18446744073709551616;
jspb.BinaryConstants.ZERO_HASH = "\x00\x00\x00\x00\x00\x00\x00\x00";
jspb.utils = {};
jspb.utils.split64Low = 0;
jspb.utils.split64High = 0;
jspb.utils.splitUint64 = function(a) {
  var b = a >>> 0;
  a = Math.floor((a - b) / jspb.BinaryConstants.TWO_TO_32) >>> 0;
  jspb.utils.split64Low = b;
  jspb.utils.split64High = a;
};
jspb.utils.splitInt64 = function(a) {
  var b = 0 > a;
  a = Math.abs(a);
  var c = a >>> 0;
  a = Math.floor((a - c) / jspb.BinaryConstants.TWO_TO_32);
  a >>>= 0;
  b && (a = ~a >>> 0, c = (~c >>> 0) + 1, 4294967295 < c && (c = 0, a++, 4294967295 < a && (a = 0)));
  jspb.utils.split64Low = c;
  jspb.utils.split64High = a;
};
jspb.utils.splitZigzag64 = function(a) {
  var b = 0 > a;
  a = 2 * Math.abs(a);
  jspb.utils.splitUint64(a);
  a = jspb.utils.split64Low;
  var c = jspb.utils.split64High;
  b && (0 == a ? 0 == c ? c = a = 4294967295 : (c--, a = 4294967295) : a--);
  jspb.utils.split64Low = a;
  jspb.utils.split64High = c;
};
jspb.utils.splitFloat32 = function(a) {
  var b = 0 > a ? 1 : 0;
  a = b ? -a : a;
  if (0 === a) {
    0 < 1 / a ? (jspb.utils.split64High = 0, jspb.utils.split64Low = 0) : (jspb.utils.split64High = 0, jspb.utils.split64Low = 2147483648);
  } else {
    if (isNaN(a)) {
      jspb.utils.split64High = 0, jspb.utils.split64Low = 2147483647;
    } else {
      if (a > jspb.BinaryConstants.FLOAT32_MAX) {
        jspb.utils.split64High = 0, jspb.utils.split64Low = (b << 31 | 2139095040) >>> 0;
      } else {
        if (a < jspb.BinaryConstants.FLOAT32_MIN) {
          a = Math.round(a / Math.pow(2, -149)), jspb.utils.split64High = 0, jspb.utils.split64Low = (b << 31 | a) >>> 0;
        } else {
          var c = Math.floor(Math.log(a) / Math.LN2);
          a *= Math.pow(2, -c);
          a = Math.round(a * jspb.BinaryConstants.TWO_TO_23) & 8388607;
          jspb.utils.split64High = 0;
          jspb.utils.split64Low = (b << 31 | c + 127 << 23 | a) >>> 0;
        }
      }
    }
  }
};
jspb.utils.splitFloat64 = function(a) {
  var b = 0 > a ? 1 : 0;
  a = b ? -a : a;
  if (0 === a) {
    jspb.utils.split64High = 0 < 1 / a ? 0 : 2147483648, jspb.utils.split64Low = 0;
  } else {
    if (isNaN(a)) {
      jspb.utils.split64High = 2147483647, jspb.utils.split64Low = 4294967295;
    } else {
      if (a > jspb.BinaryConstants.FLOAT64_MAX) {
        jspb.utils.split64High = (b << 31 | 2146435072) >>> 0, jspb.utils.split64Low = 0;
      } else {
        if (a < jspb.BinaryConstants.FLOAT64_MIN) {
          var c = a / Math.pow(2, -1074);
          a = c / jspb.BinaryConstants.TWO_TO_32;
          jspb.utils.split64High = (b << 31 | a) >>> 0;
          jspb.utils.split64Low = c >>> 0;
        } else {
          var d = Math.floor(Math.log(a) / Math.LN2);
          1024 == d && (d = 1023);
          c = a * Math.pow(2, -d);
          a = c * jspb.BinaryConstants.TWO_TO_20 & 1048575;
          c = c * jspb.BinaryConstants.TWO_TO_52 >>> 0;
          jspb.utils.split64High = (b << 31 | d + 1023 << 20 | a) >>> 0;
          jspb.utils.split64Low = c;
        }
      }
    }
  }
};
jspb.utils.splitHash64 = function(a) {
  var b = a.charCodeAt(0), c = a.charCodeAt(1), d = a.charCodeAt(2), e = a.charCodeAt(3), f = a.charCodeAt(4), g = a.charCodeAt(5), h = a.charCodeAt(6);
  a = a.charCodeAt(7);
  jspb.utils.split64Low = b + (c << 8) + (d << 16) + (e << 24) >>> 0;
  jspb.utils.split64High = f + (g << 8) + (h << 16) + (a << 24) >>> 0;
};
jspb.utils.joinUint64 = function(a, b) {
  return b * jspb.BinaryConstants.TWO_TO_32 + a;
};
jspb.utils.joinInt64 = function(a, b) {
  var c = b & 2147483648;
  c && (a = ~a + 1 >>> 0, b = ~b >>> 0, 0 == a && (b = b + 1 >>> 0));
  var d = jspb.utils.joinUint64(a, b);
  return c ? -d : d;
};
jspb.utils.joinZigzag64 = function(a, b) {
  var c = a & 1;
  a = (a >>> 1 | b << 31) >>> 0;
  b >>>= 1;
  c && (a = a + 1 >>> 0, 0 == a && (b = b + 1 >>> 0));
  var d = jspb.utils.joinUint64(a, b);
  return c ? -d : d;
};
jspb.utils.joinFloat32 = function(a, b) {
  var c = 2 * (a >> 31) + 1, d = a >>> 23 & 255, e = a & 8388607;
  return 255 == d ? e ? NaN : Infinity * c : 0 == d ? c * Math.pow(2, -149) * e : c * Math.pow(2, d - 150) * (e + Math.pow(2, 23));
};
jspb.utils.joinFloat64 = function(a, b) {
  var c = 2 * (b >> 31) + 1, d = b >>> 20 & 2047, e = jspb.BinaryConstants.TWO_TO_32 * (b & 1048575) + a;
  return 2047 == d ? e ? NaN : Infinity * c : 0 == d ? c * Math.pow(2, -1074) * e : c * Math.pow(2, d - 1075) * (e + jspb.BinaryConstants.TWO_TO_52);
};
jspb.utils.joinHash64 = function(a, b) {
  return String.fromCharCode(a >>> 0 & 255, a >>> 8 & 255, a >>> 16 & 255, a >>> 24 & 255, b >>> 0 & 255, b >>> 8 & 255, b >>> 16 & 255, b >>> 24 & 255);
};
jspb.utils.DIGITS = "0123456789abcdef".split("");
jspb.utils.joinUnsignedDecimalString = function(a, b) {
  function c(a) {
    for (var b = 10000000, c = 0; 7 > c; c++) {
      var b = b / 10, d = a / b % 10 >>> 0;
      if (0 != d || h) {
        h = !0, k += g[d];
      }
    }
  }
  if (2097151 >= b) {
    return "" + (jspb.BinaryConstants.TWO_TO_32 * b + a);
  }
  var d = (a >>> 24 | b << 8) >>> 0 & 16777215, e = b >> 16 & 65535, f = (a & 16777215) + 6777216 * d + 6710656 * e, d = d + 8147497 * e, e = 2 * e;
  10000000 <= f && (d += Math.floor(f / 10000000), f %= 10000000);
  10000000 <= d && (e += Math.floor(d / 10000000), d %= 10000000);
  var g = jspb.utils.DIGITS, h = !1, k = "";
  (e || h) && c(e);
  (d || h) && c(d);
  (f || h) && c(f);
  return k;
};
jspb.utils.joinSignedDecimalString = function(a, b) {
  var c = b & 2147483648;
  c && (a = ~a + 1 >>> 0, b = ~b + (0 == a ? 1 : 0) >>> 0);
  var d = jspb.utils.joinUnsignedDecimalString(a, b);
  return c ? "-" + d : d;
};
jspb.utils.hash64ToDecimalString = function(a, b) {
  jspb.utils.splitHash64(a);
  var c = jspb.utils.split64Low, d = jspb.utils.split64High;
  return b ? jspb.utils.joinSignedDecimalString(c, d) : jspb.utils.joinUnsignedDecimalString(c, d);
};
jspb.utils.hash64ArrayToDecimalStrings = function(a, b) {
  for (var c = Array(a.length), d = 0; d < a.length; d++) {
    c[d] = jspb.utils.hash64ToDecimalString(a[d], b);
  }
  return c;
};
jspb.utils.decimalStringToHash64 = function(a) {
  function b(a, b) {
    for (var c = 0; 8 > c && (1 !== a || 0 < b); c++) {
      var d = a * e[c] + b;
      e[c] = d & 255;
      b = d >>> 8;
    }
  }
  function c() {
    for (var a = 0; 8 > a; a++) {
      e[a] = ~e[a] & 255;
    }
  }
  goog.asserts.assert(0 < a.length);
  var d = !1;
  "-" === a[0] && (d = !0, a = a.slice(1));
  for (var e = [0, 0, 0, 0, 0, 0, 0, 0], f = 0; f < a.length; f++) {
    b(10, jspb.utils.DIGITS.indexOf(a[f]));
  }
  d && (c(), b(1, 1));
  return String.fromCharCode.apply(null, e);
};
jspb.utils.hash64ToHexString = function(a) {
  var b = Array(18);
  b[0] = "0";
  b[1] = "x";
  for (var c = 0; 8 > c; c++) {
    var d = a.charCodeAt(7 - c);
    b[2 * c + 2] = jspb.utils.DIGITS[d >> 4];
    b[2 * c + 3] = jspb.utils.DIGITS[d & 15];
  }
  return b.join("");
};
jspb.utils.hexStringToHash64 = function(a) {
  a = a.toLowerCase();
  goog.asserts.assert(18 == a.length);
  goog.asserts.assert("0" == a[0]);
  goog.asserts.assert("x" == a[1]);
  for (var b = "", c = 0; 8 > c; c++) {
    var d = jspb.utils.DIGITS.indexOf(a[2 * c + 2]), e = jspb.utils.DIGITS.indexOf(a[2 * c + 3]), b = String.fromCharCode(16 * d + e) + b;
  }
  return b;
};
jspb.utils.hash64ToNumber = function(a, b) {
  jspb.utils.splitHash64(a);
  var c = jspb.utils.split64Low, d = jspb.utils.split64High;
  return b ? jspb.utils.joinInt64(c, d) : jspb.utils.joinUint64(c, d);
};
jspb.utils.numberToHash64 = function(a) {
  jspb.utils.splitInt64(a);
  return jspb.utils.joinHash64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.utils.countVarints = function(a, b, c) {
  for (var d = 0, e = b; e < c; e++) {
    d += a[e] >> 7;
  }
  return c - b - d;
};
jspb.utils.countVarintFields = function(a, b, c, d) {
  var e = 0;
  d = 8 * d + jspb.BinaryConstants.WireType.VARINT;
  if (128 > d) {
    for (; b < c && a[b++] == d;) {
      for (e++;;) {
        var f = a[b++];
        if (0 == (f & 128)) {
          break;
        }
      }
    }
  } else {
    for (; b < c;) {
      for (f = d; 128 < f;) {
        if (a[b] != (f & 127 | 128)) {
          return e;
        }
        b++;
        f >>= 7;
      }
      if (a[b++] != f) {
        break;
      }
      for (e++; f = a[b++], 0 != (f & 128);) {
      }
    }
  }
  return e;
};
jspb.utils.countFixedFields_ = function(a, b, c, d, e) {
  var f = 0;
  if (128 > d) {
    for (; b < c && a[b++] == d;) {
      f++, b += e;
    }
  } else {
    for (; b < c;) {
      for (var g = d; 128 < g;) {
        if (a[b++] != (g & 127 | 128)) {
          return f;
        }
        g >>= 7;
      }
      if (a[b++] != g) {
        break;
      }
      f++;
      b += e;
    }
  }
  return f;
};
jspb.utils.countFixed32Fields = function(a, b, c, d) {
  return jspb.utils.countFixedFields_(a, b, c, 8 * d + jspb.BinaryConstants.WireType.FIXED32, 4);
};
jspb.utils.countFixed64Fields = function(a, b, c, d) {
  return jspb.utils.countFixedFields_(a, b, c, 8 * d + jspb.BinaryConstants.WireType.FIXED64, 8);
};
jspb.utils.countDelimitedFields = function(a, b, c, d) {
  var e = 0;
  for (d = 8 * d + jspb.BinaryConstants.WireType.DELIMITED; b < c;) {
    for (var f = d; 128 < f;) {
      if (a[b++] != (f & 127 | 128)) {
        return e;
      }
      f >>= 7;
    }
    if (a[b++] != f) {
      break;
    }
    e++;
    for (var g = 0, h = 1; f = a[b++], g += (f & 127) * h, h *= 128, 0 != (f & 128);) {
    }
    b += g;
  }
  return e;
};
jspb.utils.debugBytesToTextFormat = function(a) {
  var b = '"';
  if (a) {
    a = jspb.utils.byteSourceToUint8Array(a);
    for (var c = 0; c < a.length; c++) {
      b += "\\x", 16 > a[c] && (b += "0"), b += a[c].toString(16);
    }
  }
  return b + '"';
};
jspb.utils.debugScalarToTextFormat = function(a) {
  return goog.isString(a) ? goog.string.quote(a) : a.toString();
};
jspb.utils.stringToByteArray = function(a) {
  for (var b = new Uint8Array(a.length), c = 0; c < a.length; c++) {
    var d = a.charCodeAt(c);
    if (255 < d) {
      throw Error("Conversion error: string contains codepoint outside of byte range");
    }
    b[c] = d;
  }
  return b;
};
jspb.utils.byteSourceToUint8Array = function(a) {
  if (a.constructor === Uint8Array) {
    return a;
  }
  if (a.constructor === ArrayBuffer || a.constructor === Array) {
    return new Uint8Array(a);
  }
  if (a.constructor === String) {
    return goog.crypt.base64.decodeStringToUint8Array(a);
  }
  goog.asserts.fail("Type not convertible to Uint8Array.");
  return new Uint8Array(0);
};
jspb.BinaryIterator = function(a, b, c) {
  this.elements_ = this.nextMethod_ = this.decoder_ = null;
  this.cursor_ = 0;
  this.nextValue_ = null;
  this.atEnd_ = !0;
  this.init_(a, b, c);
};
jspb.BinaryIterator.prototype.init_ = function(a, b, c) {
  a && b && (this.decoder_ = a, this.nextMethod_ = b);
  this.elements_ = c ? c : null;
  this.cursor_ = 0;
  this.nextValue_ = null;
  this.atEnd_ = !this.decoder_ && !this.elements_;
  this.next();
};
jspb.BinaryIterator.instanceCache_ = [];
jspb.BinaryIterator.alloc = function(a, b, c) {
  if (jspb.BinaryIterator.instanceCache_.length) {
    var d = jspb.BinaryIterator.instanceCache_.pop();
    d.init_(a, b, c);
    return d;
  }
  return new jspb.BinaryIterator(a, b, c);
};
jspb.BinaryIterator.prototype.free = function() {
  this.clear();
  100 > jspb.BinaryIterator.instanceCache_.length && jspb.BinaryIterator.instanceCache_.push(this);
};
jspb.BinaryIterator.prototype.clear = function() {
  this.decoder_ && this.decoder_.free();
  this.elements_ = this.nextMethod_ = this.decoder_ = null;
  this.cursor_ = 0;
  this.nextValue_ = null;
  this.atEnd_ = !0;
};
jspb.BinaryIterator.prototype.get = function() {
  return this.nextValue_;
};
jspb.BinaryIterator.prototype.atEnd = function() {
  return this.atEnd_;
};
jspb.BinaryIterator.prototype.next = function() {
  var a = this.nextValue_;
  this.decoder_ ? this.decoder_.atEnd() ? (this.nextValue_ = null, this.atEnd_ = !0) : this.nextValue_ = this.nextMethod_.call(this.decoder_) : this.elements_ && (this.cursor_ == this.elements_.length ? (this.nextValue_ = null, this.atEnd_ = !0) : this.nextValue_ = this.elements_[this.cursor_++]);
  return a;
};
jspb.BinaryDecoder = function(a, b, c) {
  this.bytes_ = null;
  this.tempHigh_ = this.tempLow_ = this.cursor_ = this.end_ = this.start_ = 0;
  this.error_ = !1;
  a && this.setBlock(a, b, c);
};
jspb.BinaryDecoder.instanceCache_ = [];
jspb.BinaryDecoder.alloc = function(a, b, c) {
  if (jspb.BinaryDecoder.instanceCache_.length) {
    var d = jspb.BinaryDecoder.instanceCache_.pop();
    a && d.setBlock(a, b, c);
    return d;
  }
  return new jspb.BinaryDecoder(a, b, c);
};
jspb.BinaryDecoder.prototype.free = function() {
  this.clear();
  100 > jspb.BinaryDecoder.instanceCache_.length && jspb.BinaryDecoder.instanceCache_.push(this);
};
jspb.BinaryDecoder.prototype.clone = function() {
  return jspb.BinaryDecoder.alloc(this.bytes_, this.start_, this.end_ - this.start_);
};
jspb.BinaryDecoder.prototype.clear = function() {
  this.bytes_ = null;
  this.cursor_ = this.end_ = this.start_ = 0;
  this.error_ = !1;
};
jspb.BinaryDecoder.prototype.getBuffer = function() {
  return this.bytes_;
};
jspb.BinaryDecoder.prototype.setBlock = function(a, b, c) {
  this.bytes_ = jspb.utils.byteSourceToUint8Array(a);
  this.start_ = goog.isDef(b) ? b : 0;
  this.end_ = goog.isDef(c) ? this.start_ + c : this.bytes_.length;
  this.cursor_ = this.start_;
};
jspb.BinaryDecoder.prototype.getEnd = function() {
  return this.end_;
};
jspb.BinaryDecoder.prototype.setEnd = function(a) {
  this.end_ = a;
};
jspb.BinaryDecoder.prototype.reset = function() {
  this.cursor_ = this.start_;
};
jspb.BinaryDecoder.prototype.getCursor = function() {
  return this.cursor_;
};
jspb.BinaryDecoder.prototype.setCursor = function(a) {
  this.cursor_ = a;
};
jspb.BinaryDecoder.prototype.advance = function(a) {
  this.cursor_ += a;
  goog.asserts.assert(this.cursor_ <= this.end_);
};
jspb.BinaryDecoder.prototype.atEnd = function() {
  return this.cursor_ == this.end_;
};
jspb.BinaryDecoder.prototype.pastEnd = function() {
  return this.cursor_ > this.end_;
};
jspb.BinaryDecoder.prototype.getError = function() {
  return this.error_ || 0 > this.cursor_ || this.cursor_ > this.end_;
};
jspb.BinaryDecoder.prototype.readSplitVarint64_ = function() {
  for (var a, b = 0, c, d = 0; 4 > d; d++) {
    if (a = this.bytes_[this.cursor_++], b |= (a & 127) << 7 * d, 128 > a) {
      this.tempLow_ = b >>> 0;
      this.tempHigh_ = 0;
      return;
    }
  }
  a = this.bytes_[this.cursor_++];
  b |= (a & 127) << 28;
  c = 0 | (a & 127) >> 4;
  if (128 > a) {
    this.tempLow_ = b >>> 0, this.tempHigh_ = c >>> 0;
  } else {
    for (d = 0; 5 > d; d++) {
      if (a = this.bytes_[this.cursor_++], c |= (a & 127) << 7 * d + 3, 128 > a) {
        this.tempLow_ = b >>> 0;
        this.tempHigh_ = c >>> 0;
        return;
      }
    }
    goog.asserts.fail("Failed to read varint, encoding is invalid.");
    this.error_ = !0;
  }
};
jspb.BinaryDecoder.prototype.skipVarint = function() {
  for (; this.bytes_[this.cursor_] & 128;) {
    this.cursor_++;
  }
  this.cursor_++;
};
jspb.BinaryDecoder.prototype.unskipVarint = function(a) {
  for (; 128 < a;) {
    this.cursor_--, a >>>= 7;
  }
  this.cursor_--;
};
jspb.BinaryDecoder.prototype.readUnsignedVarint32 = function() {
  var a = this.bytes_;
  var b = a[this.cursor_ + 0];
  var c = b & 127;
  if (128 > b) {
    return this.cursor_ += 1, goog.asserts.assert(this.cursor_ <= this.end_), c;
  }
  b = a[this.cursor_ + 1];
  c |= (b & 127) << 7;
  if (128 > b) {
    return this.cursor_ += 2, goog.asserts.assert(this.cursor_ <= this.end_), c;
  }
  b = a[this.cursor_ + 2];
  c |= (b & 127) << 14;
  if (128 > b) {
    return this.cursor_ += 3, goog.asserts.assert(this.cursor_ <= this.end_), c;
  }
  b = a[this.cursor_ + 3];
  c |= (b & 127) << 21;
  if (128 > b) {
    return this.cursor_ += 4, goog.asserts.assert(this.cursor_ <= this.end_), c;
  }
  b = a[this.cursor_ + 4];
  c |= (b & 15) << 28;
  if (128 > b) {
    return goog.asserts.assert(0 == (b & 240)), this.cursor_ += 5, goog.asserts.assert(this.cursor_ <= this.end_), c >>> 0;
  }
  goog.asserts.assert(240 == (b & 240));
  goog.asserts.assert(255 == a[this.cursor_ + 5]);
  goog.asserts.assert(255 == a[this.cursor_ + 6]);
  goog.asserts.assert(255 == a[this.cursor_ + 7]);
  goog.asserts.assert(255 == a[this.cursor_ + 8]);
  goog.asserts.assert(1 == a[this.cursor_ + 9]);
  this.cursor_ += 10;
  goog.asserts.assert(this.cursor_ <= this.end_);
  return c;
};
jspb.BinaryDecoder.prototype.readSignedVarint32 = jspb.BinaryDecoder.prototype.readUnsignedVarint32;
jspb.BinaryDecoder.prototype.readUnsignedVarint32String = function() {
  return this.readUnsignedVarint32().toString();
};
jspb.BinaryDecoder.prototype.readSignedVarint32String = function() {
  return this.readSignedVarint32().toString();
};
jspb.BinaryDecoder.prototype.readZigzagVarint32 = function() {
  var a = this.readUnsignedVarint32();
  return a >>> 1 ^ -(a & 1);
};
jspb.BinaryDecoder.prototype.readUnsignedVarint64 = function() {
  this.readSplitVarint64_();
  return jspb.utils.joinUint64(this.tempLow_, this.tempHigh_);
};
jspb.BinaryDecoder.prototype.readUnsignedVarint64String = function() {
  this.readSplitVarint64_();
  return jspb.utils.joinUnsignedDecimalString(this.tempLow_, this.tempHigh_);
};
jspb.BinaryDecoder.prototype.readSignedVarint64 = function() {
  this.readSplitVarint64_();
  return jspb.utils.joinInt64(this.tempLow_, this.tempHigh_);
};
jspb.BinaryDecoder.prototype.readSignedVarint64String = function() {
  this.readSplitVarint64_();
  return jspb.utils.joinSignedDecimalString(this.tempLow_, this.tempHigh_);
};
jspb.BinaryDecoder.prototype.readZigzagVarint64 = function() {
  this.readSplitVarint64_();
  return jspb.utils.joinZigzag64(this.tempLow_, this.tempHigh_);
};
jspb.BinaryDecoder.prototype.readUint8 = function() {
  var a = this.bytes_[this.cursor_ + 0];
  this.cursor_ += 1;
  goog.asserts.assert(this.cursor_ <= this.end_);
  return a;
};
jspb.BinaryDecoder.prototype.readUint16 = function() {
  var a = this.bytes_[this.cursor_ + 0], b = this.bytes_[this.cursor_ + 1];
  this.cursor_ += 2;
  goog.asserts.assert(this.cursor_ <= this.end_);
  return a << 0 | b << 8;
};
jspb.BinaryDecoder.prototype.readUint32 = function() {
  var a = this.bytes_[this.cursor_ + 0], b = this.bytes_[this.cursor_ + 1], c = this.bytes_[this.cursor_ + 2], d = this.bytes_[this.cursor_ + 3];
  this.cursor_ += 4;
  goog.asserts.assert(this.cursor_ <= this.end_);
  return (a << 0 | b << 8 | c << 16 | d << 24) >>> 0;
};
jspb.BinaryDecoder.prototype.readUint64 = function() {
  var a = this.readUint32(), b = this.readUint32();
  return jspb.utils.joinUint64(a, b);
};
jspb.BinaryDecoder.prototype.readInt8 = function() {
  var a = this.bytes_[this.cursor_ + 0];
  this.cursor_ += 1;
  goog.asserts.assert(this.cursor_ <= this.end_);
  return a << 24 >> 24;
};
jspb.BinaryDecoder.prototype.readInt16 = function() {
  var a = this.bytes_[this.cursor_ + 0], b = this.bytes_[this.cursor_ + 1];
  this.cursor_ += 2;
  goog.asserts.assert(this.cursor_ <= this.end_);
  return (a << 0 | b << 8) << 16 >> 16;
};
jspb.BinaryDecoder.prototype.readInt32 = function() {
  var a = this.bytes_[this.cursor_ + 0], b = this.bytes_[this.cursor_ + 1], c = this.bytes_[this.cursor_ + 2], d = this.bytes_[this.cursor_ + 3];
  this.cursor_ += 4;
  goog.asserts.assert(this.cursor_ <= this.end_);
  return a << 0 | b << 8 | c << 16 | d << 24;
};
jspb.BinaryDecoder.prototype.readInt64 = function() {
  var a = this.readUint32(), b = this.readUint32();
  return jspb.utils.joinInt64(a, b);
};
jspb.BinaryDecoder.prototype.readFloat = function() {
  var a = this.readUint32();
  return jspb.utils.joinFloat32(a, 0);
};
jspb.BinaryDecoder.prototype.readDouble = function() {
  var a = this.readUint32(), b = this.readUint32();
  return jspb.utils.joinFloat64(a, b);
};
jspb.BinaryDecoder.prototype.readBool = function() {
  return !!this.bytes_[this.cursor_++];
};
jspb.BinaryDecoder.prototype.readEnum = function() {
  return this.readSignedVarint32();
};
jspb.BinaryDecoder.prototype.readString = function(a) {
  for (var b = this.bytes_, c = this.cursor_, d = c + a, e = []; c < d;) {
    var f = b[c++];
    if (128 > f) {
      e.push(f);
    } else {
      if (!(192 > f)) {
        if (224 > f) {
          a = b[c++], e.push((f & 31) << 6 | a & 63);
        } else {
          if (240 > f) {
            a = b[c++];
            var g = b[c++];
            e.push((f & 15) << 12 | (a & 63) << 6 | g & 63);
          }
        }
      }
    }
  }
  b = String.fromCharCode.apply(null, e);
  this.cursor_ = c;
  return b;
};
jspb.BinaryDecoder.prototype.readStringWithLength = function() {
  var a = this.readUnsignedVarint32();
  return this.readString(a);
};
jspb.BinaryDecoder.prototype.readBytes = function(a) {
  if (0 > a || this.cursor_ + a > this.bytes_.length) {
    return this.error_ = !0, goog.asserts.fail("Invalid byte length!"), new Uint8Array(0);
  }
  var b = this.bytes_.subarray(this.cursor_, this.cursor_ + a);
  this.cursor_ += a;
  goog.asserts.assert(this.cursor_ <= this.end_);
  return b;
};
jspb.BinaryDecoder.prototype.readVarintHash64 = function() {
  this.readSplitVarint64_();
  return jspb.utils.joinHash64(this.tempLow_, this.tempHigh_);
};
jspb.BinaryDecoder.prototype.readFixedHash64 = function() {
  var a = this.bytes_, b = this.cursor_, c = a[b + 0], d = a[b + 1], e = a[b + 2], f = a[b + 3], g = a[b + 4], h = a[b + 5], k = a[b + 6], a = a[b + 7];
  this.cursor_ += 8;
  return String.fromCharCode(c, d, e, f, g, h, k, a);
};
jspb.BinaryReader = function(a, b, c) {
  this.decoder_ = jspb.BinaryDecoder.alloc(a, b, c);
  this.fieldCursor_ = this.decoder_.getCursor();
  this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
  this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
  this.error_ = !1;
  this.readCallbacks_ = null;
};
jspb.BinaryReader.instanceCache_ = [];
jspb.BinaryReader.alloc = function(a, b, c) {
  if (jspb.BinaryReader.instanceCache_.length) {
    var d = jspb.BinaryReader.instanceCache_.pop();
    a && d.decoder_.setBlock(a, b, c);
    return d;
  }
  return new jspb.BinaryReader(a, b, c);
};
jspb.BinaryReader.prototype.alloc = jspb.BinaryReader.alloc;
jspb.BinaryReader.prototype.free = function() {
  this.decoder_.clear();
  this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
  this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
  this.error_ = !1;
  this.readCallbacks_ = null;
  100 > jspb.BinaryReader.instanceCache_.length && jspb.BinaryReader.instanceCache_.push(this);
};
jspb.BinaryReader.prototype.getFieldCursor = function() {
  return this.fieldCursor_;
};
jspb.BinaryReader.prototype.getCursor = function() {
  return this.decoder_.getCursor();
};
jspb.BinaryReader.prototype.getBuffer = function() {
  return this.decoder_.getBuffer();
};
jspb.BinaryReader.prototype.getFieldNumber = function() {
  return this.nextField_;
};
jspb.BinaryReader.prototype.getWireType = function() {
  return this.nextWireType_;
};
jspb.BinaryReader.prototype.isEndGroup = function() {
  return this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP;
};
jspb.BinaryReader.prototype.getError = function() {
  return this.error_ || this.decoder_.getError();
};
jspb.BinaryReader.prototype.setBlock = function(a, b, c) {
  this.decoder_.setBlock(a, b, c);
  this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
  this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
};
jspb.BinaryReader.prototype.reset = function() {
  this.decoder_.reset();
  this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
  this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
};
jspb.BinaryReader.prototype.advance = function(a) {
  this.decoder_.advance(a);
};
jspb.BinaryReader.prototype.nextField = function() {
  if (this.decoder_.atEnd()) {
    return !1;
  }
  if (this.getError()) {
    return goog.asserts.fail("Decoder hit an error"), !1;
  }
  this.fieldCursor_ = this.decoder_.getCursor();
  var a = this.decoder_.readUnsignedVarint32(), b = a >>> 3, a = a & 7;
  if (a != jspb.BinaryConstants.WireType.VARINT && a != jspb.BinaryConstants.WireType.FIXED32 && a != jspb.BinaryConstants.WireType.FIXED64 && a != jspb.BinaryConstants.WireType.DELIMITED && a != jspb.BinaryConstants.WireType.START_GROUP && a != jspb.BinaryConstants.WireType.END_GROUP) {
    return goog.asserts.fail("Invalid wire type"), this.error_ = !0, !1;
  }
  this.nextField_ = b;
  this.nextWireType_ = a;
  return !0;
};
jspb.BinaryReader.prototype.unskipHeader = function() {
  this.decoder_.unskipVarint(this.nextField_ << 3 | this.nextWireType_);
};
jspb.BinaryReader.prototype.skipMatchingFields = function() {
  var a = this.nextField_;
  for (this.unskipHeader(); this.nextField() && this.getFieldNumber() == a;) {
    this.skipField();
  }
  this.decoder_.atEnd() || this.unskipHeader();
};
jspb.BinaryReader.prototype.skipVarintField = function() {
  this.nextWireType_ != jspb.BinaryConstants.WireType.VARINT ? (goog.asserts.fail("Invalid wire type for skipVarintField"), this.skipField()) : this.decoder_.skipVarint();
};
jspb.BinaryReader.prototype.skipDelimitedField = function() {
  if (this.nextWireType_ != jspb.BinaryConstants.WireType.DELIMITED) {
    goog.asserts.fail("Invalid wire type for skipDelimitedField"), this.skipField();
  } else {
    var a = this.decoder_.readUnsignedVarint32();
    this.decoder_.advance(a);
  }
};
jspb.BinaryReader.prototype.skipFixed32Field = function() {
  this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED32 ? (goog.asserts.fail("Invalid wire type for skipFixed32Field"), this.skipField()) : this.decoder_.advance(4);
};
jspb.BinaryReader.prototype.skipFixed64Field = function() {
  this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED64 ? (goog.asserts.fail("Invalid wire type for skipFixed64Field"), this.skipField()) : this.decoder_.advance(8);
};
jspb.BinaryReader.prototype.skipGroup = function() {
  var a = [this.nextField_];
  do {
    if (!this.nextField()) {
      goog.asserts.fail("Unmatched start-group tag: stream EOF");
      this.error_ = !0;
      break;
    }
    if (this.nextWireType_ == jspb.BinaryConstants.WireType.START_GROUP) {
      a.push(this.nextField_);
    } else {
      if (this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP && this.nextField_ != a.pop()) {
        goog.asserts.fail("Unmatched end-group tag");
        this.error_ = !0;
        break;
      }
    }
  } while (0 < a.length);
};
jspb.BinaryReader.prototype.skipField = function() {
  switch(this.nextWireType_) {
    case jspb.BinaryConstants.WireType.VARINT:
      this.skipVarintField();
      break;
    case jspb.BinaryConstants.WireType.FIXED64:
      this.skipFixed64Field();
      break;
    case jspb.BinaryConstants.WireType.DELIMITED:
      this.skipDelimitedField();
      break;
    case jspb.BinaryConstants.WireType.FIXED32:
      this.skipFixed32Field();
      break;
    case jspb.BinaryConstants.WireType.START_GROUP:
      this.skipGroup();
      break;
    default:
      goog.asserts.fail("Invalid wire encoding for field.");
  }
};
jspb.BinaryReader.prototype.registerReadCallback = function(a, b) {
  goog.isNull(this.readCallbacks_) && (this.readCallbacks_ = {});
  goog.asserts.assert(!this.readCallbacks_[a]);
  this.readCallbacks_[a] = b;
};
jspb.BinaryReader.prototype.runReadCallback = function(a) {
  goog.asserts.assert(!goog.isNull(this.readCallbacks_));
  a = this.readCallbacks_[a];
  goog.asserts.assert(a);
  return a(this);
};
jspb.BinaryReader.prototype.readAny = function(a) {
  this.nextWireType_ = jspb.BinaryConstants.FieldTypeToWireType(a);
  var b = jspb.BinaryConstants.FieldType;
  switch(a) {
    case b.DOUBLE:
      return this.readDouble();
    case b.FLOAT:
      return this.readFloat();
    case b.INT64:
      return this.readInt64();
    case b.UINT64:
      return this.readUint64();
    case b.INT32:
      return this.readInt32();
    case b.FIXED64:
      return this.readFixed64();
    case b.FIXED32:
      return this.readFixed32();
    case b.BOOL:
      return this.readBool();
    case b.STRING:
      return this.readString();
    case b.GROUP:
      goog.asserts.fail("Group field type not supported in readAny()");
    case b.MESSAGE:
      goog.asserts.fail("Message field type not supported in readAny()");
    case b.BYTES:
      return this.readBytes();
    case b.UINT32:
      return this.readUint32();
    case b.ENUM:
      return this.readEnum();
    case b.SFIXED32:
      return this.readSfixed32();
    case b.SFIXED64:
      return this.readSfixed64();
    case b.SINT32:
      return this.readSint32();
    case b.SINT64:
      return this.readSint64();
    case b.FHASH64:
      return this.readFixedHash64();
    case b.VHASH64:
      return this.readVarintHash64();
    default:
      goog.asserts.fail("Invalid field type in readAny()");
  }
  return 0;
};
jspb.BinaryReader.prototype.readMessage = function(a, b) {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
  var c = this.decoder_.getEnd(), d = this.decoder_.readUnsignedVarint32(), d = this.decoder_.getCursor() + d;
  this.decoder_.setEnd(d);
  b(a, this);
  this.decoder_.setCursor(d);
  this.decoder_.setEnd(c);
};
jspb.BinaryReader.prototype.readGroup = function(a, b, c) {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.START_GROUP);
  goog.asserts.assert(this.nextField_ == a);
  c(b, this);
  this.error_ || this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP || (goog.asserts.fail("Group submessage did not end with an END_GROUP tag"), this.error_ = !0);
};
jspb.BinaryReader.prototype.getFieldDecoder = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
  var a = this.decoder_.readUnsignedVarint32(), b = this.decoder_.getCursor(), c = b + a, a = jspb.BinaryDecoder.alloc(this.decoder_.getBuffer(), b, a);
  this.decoder_.setCursor(c);
  return a;
};
jspb.BinaryReader.prototype.readInt32 = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readSignedVarint32();
};
jspb.BinaryReader.prototype.readInt32String = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readSignedVarint32String();
};
jspb.BinaryReader.prototype.readInt64 = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readSignedVarint64();
};
jspb.BinaryReader.prototype.readInt64String = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readSignedVarint64String();
};
jspb.BinaryReader.prototype.readUint32 = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readUnsignedVarint32();
};
jspb.BinaryReader.prototype.readUint32String = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readUnsignedVarint32String();
};
jspb.BinaryReader.prototype.readUint64 = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readUnsignedVarint64();
};
jspb.BinaryReader.prototype.readUint64String = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readUnsignedVarint64String();
};
jspb.BinaryReader.prototype.readSint32 = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readZigzagVarint32();
};
jspb.BinaryReader.prototype.readSint64 = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readZigzagVarint64();
};
jspb.BinaryReader.prototype.readFixed32 = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
  return this.decoder_.readUint32();
};
jspb.BinaryReader.prototype.readFixed64 = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
  return this.decoder_.readUint64();
};
jspb.BinaryReader.prototype.readSfixed32 = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
  return this.decoder_.readInt32();
};
jspb.BinaryReader.prototype.readSfixed64 = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
  return this.decoder_.readInt64();
};
jspb.BinaryReader.prototype.readFloat = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
  return this.decoder_.readFloat();
};
jspb.BinaryReader.prototype.readDouble = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
  return this.decoder_.readDouble();
};
jspb.BinaryReader.prototype.readBool = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return !!this.decoder_.readUnsignedVarint32();
};
jspb.BinaryReader.prototype.readEnum = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readSignedVarint64();
};
jspb.BinaryReader.prototype.readString = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
  var a = this.decoder_.readUnsignedVarint32();
  return this.decoder_.readString(a);
};
jspb.BinaryReader.prototype.readBytes = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
  var a = this.decoder_.readUnsignedVarint32();
  return this.decoder_.readBytes(a);
};
jspb.BinaryReader.prototype.readVarintHash64 = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
  return this.decoder_.readVarintHash64();
};
jspb.BinaryReader.prototype.readFixedHash64 = function() {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
  return this.decoder_.readFixedHash64();
};
jspb.BinaryReader.prototype.readPackedField_ = function(a) {
  goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
  for (var b = this.decoder_.readUnsignedVarint32(), b = this.decoder_.getCursor() + b, c = []; this.decoder_.getCursor() < b;) {
    c.push(a.call(this.decoder_));
  }
  return c;
};
jspb.BinaryReader.prototype.readPackedInt32 = function() {
  return this.readPackedField_(this.decoder_.readSignedVarint32);
};
jspb.BinaryReader.prototype.readPackedInt32String = function() {
  return this.readPackedField_(this.decoder_.readSignedVarint32String);
};
jspb.BinaryReader.prototype.readPackedInt64 = function() {
  return this.readPackedField_(this.decoder_.readSignedVarint64);
};
jspb.BinaryReader.prototype.readPackedInt64String = function() {
  return this.readPackedField_(this.decoder_.readSignedVarint64String);
};
jspb.BinaryReader.prototype.readPackedUint32 = function() {
  return this.readPackedField_(this.decoder_.readUnsignedVarint32);
};
jspb.BinaryReader.prototype.readPackedUint32String = function() {
  return this.readPackedField_(this.decoder_.readUnsignedVarint32String);
};
jspb.BinaryReader.prototype.readPackedUint64 = function() {
  return this.readPackedField_(this.decoder_.readUnsignedVarint64);
};
jspb.BinaryReader.prototype.readPackedUint64String = function() {
  return this.readPackedField_(this.decoder_.readUnsignedVarint64String);
};
jspb.BinaryReader.prototype.readPackedSint32 = function() {
  return this.readPackedField_(this.decoder_.readZigzagVarint32);
};
jspb.BinaryReader.prototype.readPackedSint64 = function() {
  return this.readPackedField_(this.decoder_.readZigzagVarint64);
};
jspb.BinaryReader.prototype.readPackedFixed32 = function() {
  return this.readPackedField_(this.decoder_.readUint32);
};
jspb.BinaryReader.prototype.readPackedFixed64 = function() {
  return this.readPackedField_(this.decoder_.readUint64);
};
jspb.BinaryReader.prototype.readPackedSfixed32 = function() {
  return this.readPackedField_(this.decoder_.readInt32);
};
jspb.BinaryReader.prototype.readPackedSfixed64 = function() {
  return this.readPackedField_(this.decoder_.readInt64);
};
jspb.BinaryReader.prototype.readPackedFloat = function() {
  return this.readPackedField_(this.decoder_.readFloat);
};
jspb.BinaryReader.prototype.readPackedDouble = function() {
  return this.readPackedField_(this.decoder_.readDouble);
};
jspb.BinaryReader.prototype.readPackedBool = function() {
  return this.readPackedField_(this.decoder_.readBool);
};
jspb.BinaryReader.prototype.readPackedEnum = function() {
  return this.readPackedField_(this.decoder_.readEnum);
};
jspb.BinaryReader.prototype.readPackedVarintHash64 = function() {
  return this.readPackedField_(this.decoder_.readVarintHash64);
};
jspb.BinaryReader.prototype.readPackedFixedHash64 = function() {
  return this.readPackedField_(this.decoder_.readFixedHash64);
};
jspb.BinaryEncoder = function() {
  this.buffer_ = [];
};
jspb.BinaryEncoder.prototype.length = function() {
  return this.buffer_.length;
};
jspb.BinaryEncoder.prototype.end = function() {
  var a = this.buffer_;
  this.buffer_ = [];
  return a;
};
jspb.BinaryEncoder.prototype.writeSplitVarint64 = function(a, b) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(b == Math.floor(b));
  goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_32);
  for (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32); 0 < b || 127 < a;) {
    this.buffer_.push(a & 127 | 128), a = (a >>> 7 | b << 25) >>> 0, b >>>= 7;
  }
  this.buffer_.push(a);
};
jspb.BinaryEncoder.prototype.writeUnsignedVarint32 = function(a) {
  goog.asserts.assert(a == Math.floor(a));
  for (goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_32); 127 < a;) {
    this.buffer_.push(a & 127 | 128), a >>>= 7;
  }
  this.buffer_.push(a);
};
jspb.BinaryEncoder.prototype.writeSignedVarint32 = function(a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
  if (0 <= a) {
    this.writeUnsignedVarint32(a);
  } else {
    for (var b = 0; 9 > b; b++) {
      this.buffer_.push(a & 127 | 128), a >>= 7;
    }
    this.buffer_.push(1);
  }
};
jspb.BinaryEncoder.prototype.writeUnsignedVarint64 = function(a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_64);
  jspb.utils.splitInt64(a);
  this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeSignedVarint64 = function(a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_63 && a < jspb.BinaryConstants.TWO_TO_63);
  jspb.utils.splitInt64(a);
  this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeZigzagVarint32 = function(a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
  this.writeUnsignedVarint32((a << 1 ^ a >> 31) >>> 0);
};
jspb.BinaryEncoder.prototype.writeZigzagVarint64 = function(a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_63 && a < jspb.BinaryConstants.TWO_TO_63);
  jspb.utils.splitZigzag64(a);
  this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeUint8 = function(a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(0 <= a && 256 > a);
  this.buffer_.push(a >>> 0 & 255);
};
jspb.BinaryEncoder.prototype.writeUint16 = function(a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(0 <= a && 65536 > a);
  this.buffer_.push(a >>> 0 & 255);
  this.buffer_.push(a >>> 8 & 255);
};
jspb.BinaryEncoder.prototype.writeUint32 = function(a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_32);
  this.buffer_.push(a >>> 0 & 255);
  this.buffer_.push(a >>> 8 & 255);
  this.buffer_.push(a >>> 16 & 255);
  this.buffer_.push(a >>> 24 & 255);
};
jspb.BinaryEncoder.prototype.writeUint64 = function(a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(0 <= a && a < jspb.BinaryConstants.TWO_TO_64);
  jspb.utils.splitUint64(a);
  this.writeUint32(jspb.utils.split64Low);
  this.writeUint32(jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeInt8 = function(a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(-128 <= a && 128 > a);
  this.buffer_.push(a >>> 0 & 255);
};
jspb.BinaryEncoder.prototype.writeInt16 = function(a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(-32768 <= a && 32768 > a);
  this.buffer_.push(a >>> 0 & 255);
  this.buffer_.push(a >>> 8 & 255);
};
jspb.BinaryEncoder.prototype.writeInt32 = function(a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
  this.buffer_.push(a >>> 0 & 255);
  this.buffer_.push(a >>> 8 & 255);
  this.buffer_.push(a >>> 16 & 255);
  this.buffer_.push(a >>> 24 & 255);
};
jspb.BinaryEncoder.prototype.writeInt64 = function(a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_63 && a < jspb.BinaryConstants.TWO_TO_63);
  jspb.utils.splitInt64(a);
  this.writeUint32(jspb.utils.split64Low);
  this.writeUint32(jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeFloat = function(a) {
  goog.asserts.assert(a >= -jspb.BinaryConstants.FLOAT32_MAX && a <= jspb.BinaryConstants.FLOAT32_MAX);
  jspb.utils.splitFloat32(a);
  this.writeUint32(jspb.utils.split64Low);
};
jspb.BinaryEncoder.prototype.writeDouble = function(a) {
  goog.asserts.assert(a >= -jspb.BinaryConstants.FLOAT64_MAX && a <= jspb.BinaryConstants.FLOAT64_MAX);
  jspb.utils.splitFloat64(a);
  this.writeUint32(jspb.utils.split64Low);
  this.writeUint32(jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeBool = function(a) {
  goog.asserts.assert(goog.isBoolean(a));
  this.buffer_.push(a ? 1 : 0);
};
jspb.BinaryEncoder.prototype.writeEnum = function(a) {
  goog.asserts.assert(a == Math.floor(a));
  goog.asserts.assert(a >= -jspb.BinaryConstants.TWO_TO_31 && a < jspb.BinaryConstants.TWO_TO_31);
  this.writeSignedVarint32(a);
};
jspb.BinaryEncoder.prototype.writeBytes = function(a) {
  this.buffer_.push.apply(this.buffer_, a);
};
jspb.BinaryEncoder.prototype.writeVarintHash64 = function(a) {
  jspb.utils.splitHash64(a);
  this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeFixedHash64 = function(a) {
  jspb.utils.splitHash64(a);
  this.writeUint32(jspb.utils.split64Low);
  this.writeUint32(jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeString = function(a) {
  for (var b = this.buffer_.length, c = 0; c < a.length; c++) {
    var d = a.charCodeAt(c);
    128 > d ? this.buffer_.push(d) : (2048 > d ? this.buffer_.push(d >> 6 | 192) : (this.buffer_.push(d >> 12 | 224), this.buffer_.push(d >> 6 & 63 | 128)), this.buffer_.push(d & 63 | 128));
  }
  return this.buffer_.length - b;
};
jspb.arith = {};
jspb.arith.UInt64 = function(a, b) {
  this.lo = a;
  this.hi = b;
};
jspb.arith.UInt64.prototype.cmp = function(a) {
  return this.hi < a.hi || this.hi == a.hi && this.lo < a.lo ? -1 : this.hi == a.hi && this.lo == a.lo ? 0 : 1;
};
jspb.arith.UInt64.prototype.rightShift = function() {
  return new jspb.arith.UInt64((this.lo >>> 1 | (this.hi & 1) << 31) >>> 0, this.hi >>> 1 >>> 0);
};
jspb.arith.UInt64.prototype.leftShift = function() {
  return new jspb.arith.UInt64(this.lo << 1 >>> 0, (this.hi << 1 | this.lo >>> 31) >>> 0);
};
jspb.arith.UInt64.prototype.msb = function() {
  return !!(this.hi & 2147483648);
};
jspb.arith.UInt64.prototype.lsb = function() {
  return !!(this.lo & 1);
};
jspb.arith.UInt64.prototype.zero = function() {
  return 0 == this.lo && 0 == this.hi;
};
jspb.arith.UInt64.prototype.add = function(a) {
  return new jspb.arith.UInt64((this.lo + a.lo & 4294967295) >>> 0 >>> 0, ((this.hi + a.hi & 4294967295) >>> 0) + (4294967296 <= this.lo + a.lo ? 1 : 0) >>> 0);
};
jspb.arith.UInt64.prototype.sub = function(a) {
  return new jspb.arith.UInt64((this.lo - a.lo & 4294967295) >>> 0 >>> 0, ((this.hi - a.hi & 4294967295) >>> 0) - (0 > this.lo - a.lo ? 1 : 0) >>> 0);
};
jspb.arith.UInt64.mul32x32 = function(a, b) {
  for (var c = a & 65535, d = a >>> 16, e = b & 65535, f = b >>> 16, g = c * e + 65536 * (c * f & 65535) + 65536 * (d * e & 65535), c = d * f + (c * f >>> 16) + (d * e >>> 16); 4294967296 <= g;) {
    g -= 4294967296, c += 1;
  }
  return new jspb.arith.UInt64(g >>> 0, c >>> 0);
};
jspb.arith.UInt64.prototype.mul = function(a) {
  var b = jspb.arith.UInt64.mul32x32(this.lo, a);
  a = jspb.arith.UInt64.mul32x32(this.hi, a);
  a.hi = a.lo;
  a.lo = 0;
  return b.add(a);
};
jspb.arith.UInt64.prototype.div = function(a) {
  if (0 == a) {
    return [];
  }
  var b = new jspb.arith.UInt64(0, 0), c = new jspb.arith.UInt64(this.lo, this.hi);
  a = new jspb.arith.UInt64(a, 0);
  for (var d = new jspb.arith.UInt64(1, 0); !a.msb();) {
    a = a.leftShift(), d = d.leftShift();
  }
  for (; !d.zero();) {
    0 >= a.cmp(c) && (b = b.add(d), c = c.sub(a)), a = a.rightShift(), d = d.rightShift();
  }
  return [b, c];
};
jspb.arith.UInt64.prototype.toString = function() {
  for (var a = "", b = this; !b.zero();) {
    var b = b.div(10), c = b[0], a = b[1].lo + a, b = c;
  }
  "" == a && (a = "0");
  return a;
};
jspb.arith.UInt64.fromString = function(a) {
  for (var b = new jspb.arith.UInt64(0, 0), c = new jspb.arith.UInt64(0, 0), d = 0; d < a.length; d++) {
    if ("0" > a[d] || "9" < a[d]) {
      return null;
    }
    var e = parseInt(a[d], 10);
    c.lo = e;
    b = b.mul(10).add(c);
  }
  return b;
};
jspb.arith.UInt64.prototype.clone = function() {
  return new jspb.arith.UInt64(this.lo, this.hi);
};
jspb.arith.Int64 = function(a, b) {
  this.lo = a;
  this.hi = b;
};
jspb.arith.Int64.prototype.add = function(a) {
  return new jspb.arith.Int64((this.lo + a.lo & 4294967295) >>> 0 >>> 0, ((this.hi + a.hi & 4294967295) >>> 0) + (4294967296 <= this.lo + a.lo ? 1 : 0) >>> 0);
};
jspb.arith.Int64.prototype.sub = function(a) {
  return new jspb.arith.Int64((this.lo - a.lo & 4294967295) >>> 0 >>> 0, ((this.hi - a.hi & 4294967295) >>> 0) - (0 > this.lo - a.lo ? 1 : 0) >>> 0);
};
jspb.arith.Int64.prototype.clone = function() {
  return new jspb.arith.Int64(this.lo, this.hi);
};
jspb.arith.Int64.prototype.toString = function() {
  var a = 0 != (this.hi & 2147483648), b = new jspb.arith.UInt64(this.lo, this.hi);
  a && (b = (new jspb.arith.UInt64(0, 0)).sub(b));
  return (a ? "-" : "") + b.toString();
};
jspb.arith.Int64.fromString = function(a) {
  var b = 0 < a.length && "-" == a[0];
  b && (a = a.substring(1));
  a = jspb.arith.UInt64.fromString(a);
  if (null === a) {
    return null;
  }
  b && (a = (new jspb.arith.UInt64(0, 0)).sub(a));
  return new jspb.arith.Int64(a.lo, a.hi);
};
jspb.BinaryWriter = function() {
  this.blocks_ = [];
  this.totalLength_ = 0;
  this.encoder_ = new jspb.BinaryEncoder;
  this.bookmarks_ = [];
};
jspb.BinaryWriter.prototype.appendUint8Array_ = function(a) {
  var b = this.encoder_.end();
  this.blocks_.push(b);
  this.blocks_.push(a);
  this.totalLength_ += b.length + a.length;
};
jspb.BinaryWriter.prototype.beginDelimited_ = function(a) {
  this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
  a = this.encoder_.end();
  this.blocks_.push(a);
  this.totalLength_ += a.length;
  a.push(this.totalLength_);
  return a;
};
jspb.BinaryWriter.prototype.endDelimited_ = function(a) {
  var b = a.pop(), b = this.totalLength_ + this.encoder_.length() - b;
  for (goog.asserts.assert(0 <= b); 127 < b;) {
    a.push(b & 127 | 128), b >>>= 7, this.totalLength_++;
  }
  a.push(b);
  this.totalLength_++;
};
jspb.BinaryWriter.prototype.writeSerializedMessage = function(a, b, c) {
  this.appendUint8Array_(a.subarray(b, c));
};
jspb.BinaryWriter.prototype.maybeWriteSerializedMessage = function(a, b, c) {
  null != a && null != b && null != c && this.writeSerializedMessage(a, b, c);
};
jspb.BinaryWriter.prototype.reset = function() {
  this.blocks_ = [];
  this.encoder_.end();
  this.totalLength_ = 0;
  this.bookmarks_ = [];
};
jspb.BinaryWriter.prototype.getResultBuffer = function() {
  goog.asserts.assert(0 == this.bookmarks_.length);
  for (var a = new Uint8Array(this.totalLength_ + this.encoder_.length()), b = this.blocks_, c = b.length, d = 0, e = 0; e < c; e++) {
    var f = b[e];
    a.set(f, d);
    d += f.length;
  }
  b = this.encoder_.end();
  a.set(b, d);
  d += b.length;
  goog.asserts.assert(d == a.length);
  this.blocks_ = [a];
  return a;
};
jspb.BinaryWriter.prototype.getResultBase64String = function() {
  return goog.crypt.base64.encodeByteArray(this.getResultBuffer());
};
jspb.BinaryWriter.prototype.beginSubMessage = function(a) {
  this.bookmarks_.push(this.beginDelimited_(a));
};
jspb.BinaryWriter.prototype.endSubMessage = function() {
  goog.asserts.assert(0 <= this.bookmarks_.length);
  this.endDelimited_(this.bookmarks_.pop());
};
jspb.BinaryWriter.prototype.writeFieldHeader_ = function(a, b) {
  goog.asserts.assert(1 <= a && a == Math.floor(a));
  this.encoder_.writeUnsignedVarint32(8 * a + b);
};
jspb.BinaryWriter.prototype.writeAny = function(a, b, c) {
  var d = jspb.BinaryConstants.FieldType;
  switch(a) {
    case d.DOUBLE:
      this.writeDouble(b, c);
      break;
    case d.FLOAT:
      this.writeFloat(b, c);
      break;
    case d.INT64:
      this.writeInt64(b, c);
      break;
    case d.UINT64:
      this.writeUint64(b, c);
      break;
    case d.INT32:
      this.writeInt32(b, c);
      break;
    case d.FIXED64:
      this.writeFixed64(b, c);
      break;
    case d.FIXED32:
      this.writeFixed32(b, c);
      break;
    case d.BOOL:
      this.writeBool(b, c);
      break;
    case d.STRING:
      this.writeString(b, c);
      break;
    case d.GROUP:
      goog.asserts.fail("Group field type not supported in writeAny()");
      break;
    case d.MESSAGE:
      goog.asserts.fail("Message field type not supported in writeAny()");
      break;
    case d.BYTES:
      this.writeBytes(b, c);
      break;
    case d.UINT32:
      this.writeUint32(b, c);
      break;
    case d.ENUM:
      this.writeEnum(b, c);
      break;
    case d.SFIXED32:
      this.writeSfixed32(b, c);
      break;
    case d.SFIXED64:
      this.writeSfixed64(b, c);
      break;
    case d.SINT32:
      this.writeSint32(b, c);
      break;
    case d.SINT64:
      this.writeSint64(b, c);
      break;
    case d.FHASH64:
      this.writeFixedHash64(b, c);
      break;
    case d.VHASH64:
      this.writeVarintHash64(b, c);
      break;
    default:
      goog.asserts.fail("Invalid field type in writeAny()");
  }
};
jspb.BinaryWriter.prototype.writeUnsignedVarint32_ = function(a, b) {
  null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeUnsignedVarint32(b));
};
jspb.BinaryWriter.prototype.writeSignedVarint32_ = function(a, b) {
  null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32(b));
};
jspb.BinaryWriter.prototype.writeUnsignedVarint64_ = function(a, b) {
  null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeUnsignedVarint64(b));
};
jspb.BinaryWriter.prototype.writeSignedVarint64_ = function(a, b) {
  null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint64(b));
};
jspb.BinaryWriter.prototype.writeZigzagVarint32_ = function(a, b) {
  null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint32(b));
};
jspb.BinaryWriter.prototype.writeZigzagVarint64_ = function(a, b) {
  null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint64(b));
};
jspb.BinaryWriter.prototype.writeInt32 = function(a, b) {
  null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31), this.writeSignedVarint32_(a, b));
};
jspb.BinaryWriter.prototype.writeInt32String = function(a, b) {
  if (null != b) {
    var c = parseInt(b, 10);
    goog.asserts.assert(c >= -jspb.BinaryConstants.TWO_TO_31 && c < jspb.BinaryConstants.TWO_TO_31);
    this.writeSignedVarint32_(a, c);
  }
};
jspb.BinaryWriter.prototype.writeInt64 = function(a, b) {
  null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_63 && b < jspb.BinaryConstants.TWO_TO_63), this.writeSignedVarint64_(a, b));
};
jspb.BinaryWriter.prototype.writeInt64String = function(a, b) {
  if (null != b) {
    var c = jspb.arith.Int64.fromString(b);
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT);
    this.encoder_.writeSplitVarint64(c.lo, c.hi);
  }
};
jspb.BinaryWriter.prototype.writeUint32 = function(a, b) {
  null != b && (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32), this.writeUnsignedVarint32_(a, b));
};
jspb.BinaryWriter.prototype.writeUint32String = function(a, b) {
  if (null != b) {
    var c = parseInt(b, 10);
    goog.asserts.assert(0 <= c && c < jspb.BinaryConstants.TWO_TO_32);
    this.writeUnsignedVarint32_(a, c);
  }
};
jspb.BinaryWriter.prototype.writeUint64 = function(a, b) {
  null != b && (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_64), this.writeUnsignedVarint64_(a, b));
};
jspb.BinaryWriter.prototype.writeUint64String = function(a, b) {
  if (null != b) {
    var c = jspb.arith.UInt64.fromString(b);
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT);
    this.encoder_.writeSplitVarint64(c.lo, c.hi);
  }
};
jspb.BinaryWriter.prototype.writeSint32 = function(a, b) {
  null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31), this.writeZigzagVarint32_(a, b));
};
jspb.BinaryWriter.prototype.writeSint64 = function(a, b) {
  null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_63 && b < jspb.BinaryConstants.TWO_TO_63), this.writeZigzagVarint64_(a, b));
};
jspb.BinaryWriter.prototype.writeFixed32 = function(a, b) {
  null != b && (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_32), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeUint32(b));
};
jspb.BinaryWriter.prototype.writeFixed64 = function(a, b) {
  null != b && (goog.asserts.assert(0 <= b && b < jspb.BinaryConstants.TWO_TO_64), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeUint64(b));
};
jspb.BinaryWriter.prototype.writeSfixed32 = function(a, b) {
  null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeInt32(b));
};
jspb.BinaryWriter.prototype.writeSfixed64 = function(a, b) {
  null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_63 && b < jspb.BinaryConstants.TWO_TO_63), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeInt64(b));
};
jspb.BinaryWriter.prototype.writeFloat = function(a, b) {
  null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeFloat(b));
};
jspb.BinaryWriter.prototype.writeDouble = function(a, b) {
  null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeDouble(b));
};
jspb.BinaryWriter.prototype.writeBool = function(a, b) {
  null != b && (goog.asserts.assert(goog.isBoolean(b)), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeBool(b));
};
jspb.BinaryWriter.prototype.writeEnum = function(a, b) {
  null != b && (goog.asserts.assert(b >= -jspb.BinaryConstants.TWO_TO_31 && b < jspb.BinaryConstants.TWO_TO_31), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32(b));
};
jspb.BinaryWriter.prototype.writeString = function(a, b) {
  if (null != b) {
    var c = this.beginDelimited_(a);
    this.encoder_.writeString(b);
    this.endDelimited_(c);
  }
};
jspb.BinaryWriter.prototype.writeBytes = function(a, b) {
  if (null != b) {
    var c = jspb.utils.byteSourceToUint8Array(b);
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
    this.encoder_.writeUnsignedVarint32(c.length);
    this.appendUint8Array_(c);
  }
};
jspb.BinaryWriter.prototype.writeMessage = function(a, b, c) {
  null != b && (a = this.beginDelimited_(a), c(b, this), this.endDelimited_(a));
};
jspb.BinaryWriter.prototype.writeGroup = function(a, b, c) {
  null != b && (this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.START_GROUP), c(b, this), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.END_GROUP));
};
jspb.BinaryWriter.prototype.writeFixedHash64 = function(a, b) {
  null != b && (goog.asserts.assert(8 == b.length), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeFixedHash64(b));
};
jspb.BinaryWriter.prototype.writeVarintHash64 = function(a, b) {
  null != b && (goog.asserts.assert(8 == b.length), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeVarintHash64(b));
};
jspb.BinaryWriter.prototype.writeRepeatedUnsignedVarint32_ = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeUnsignedVarint32_(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedSignedVarint32_ = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeSignedVarint32_(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedUnsignedVarint64_ = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeUnsignedVarint64_(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedSignedVarint64_ = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeSignedVarint64_(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedZigzag32_ = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeZigzagVarint32_(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedZigzag_ = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeZigzagVarint64_(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedInt32 = jspb.BinaryWriter.prototype.writeRepeatedSignedVarint32_;
jspb.BinaryWriter.prototype.writeRepeatedInt32String = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeInt32String(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedInt64 = jspb.BinaryWriter.prototype.writeRepeatedSignedVarint64_;
jspb.BinaryWriter.prototype.writeRepeatedInt64String = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeInt64String(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedUint32 = jspb.BinaryWriter.prototype.writeRepeatedUnsignedVarint32_;
jspb.BinaryWriter.prototype.writeRepeatedUint32String = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeUint32String(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedUint64 = jspb.BinaryWriter.prototype.writeRepeatedUnsignedVarint64_;
jspb.BinaryWriter.prototype.writeRepeatedUint64String = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeUint64String(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedSint32 = jspb.BinaryWriter.prototype.writeRepeatedZigzag32_;
jspb.BinaryWriter.prototype.writeRepeatedSint64 = jspb.BinaryWriter.prototype.writeRepeatedZigzag_;
jspb.BinaryWriter.prototype.writeRepeatedFixed32 = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeFixed32(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedFixed64 = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeFixed64(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedSfixed32 = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeSfixed32(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedSfixed64 = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeSfixed64(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedFloat = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeFloat(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedDouble = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeDouble(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedBool = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeBool(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedEnum = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeEnum(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedString = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeString(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedBytes = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeBytes(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedMessage = function(a, b, c) {
  if (null != b) {
    for (var d = 0; d < b.length; d++) {
      var e = this.beginDelimited_(a);
      c(b[d], this);
      this.endDelimited_(e);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedGroup = function(a, b, c) {
  if (null != b) {
    for (var d = 0; d < b.length; d++) {
      this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.START_GROUP), c(b[d], this), this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.END_GROUP);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedFixedHash64 = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeFixedHash64(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writeRepeatedVarintHash64 = function(a, b) {
  if (null != b) {
    for (var c = 0; c < b.length; c++) {
      this.writeVarintHash64(a, b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writePackedUnsignedVarint32_ = function(a, b) {
  if (null != b && b.length) {
    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) {
      this.encoder_.writeUnsignedVarint32(b[d]);
    }
    this.endDelimited_(c);
  }
};
jspb.BinaryWriter.prototype.writePackedSignedVarint32_ = function(a, b) {
  if (null != b && b.length) {
    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) {
      this.encoder_.writeSignedVarint32(b[d]);
    }
    this.endDelimited_(c);
  }
};
jspb.BinaryWriter.prototype.writePackedUnsignedVarint64_ = function(a, b) {
  if (null != b && b.length) {
    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) {
      this.encoder_.writeUnsignedVarint64(b[d]);
    }
    this.endDelimited_(c);
  }
};
jspb.BinaryWriter.prototype.writePackedSignedVarint64_ = function(a, b) {
  if (null != b && b.length) {
    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) {
      this.encoder_.writeSignedVarint64(b[d]);
    }
    this.endDelimited_(c);
  }
};
jspb.BinaryWriter.prototype.writePackedZigzag32_ = function(a, b) {
  if (null != b && b.length) {
    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) {
      this.encoder_.writeZigzagVarint32(b[d]);
    }
    this.endDelimited_(c);
  }
};
jspb.BinaryWriter.prototype.writePackedZigzag64_ = function(a, b) {
  if (null != b && b.length) {
    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) {
      this.encoder_.writeZigzagVarint64(b[d]);
    }
    this.endDelimited_(c);
  }
};
jspb.BinaryWriter.prototype.writePackedInt32 = jspb.BinaryWriter.prototype.writePackedSignedVarint32_;
jspb.BinaryWriter.prototype.writePackedInt32String = function(a, b) {
  if (null != b && b.length) {
    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) {
      this.encoder_.writeSignedVarint32(parseInt(b[d], 10));
    }
    this.endDelimited_(c);
  }
};
jspb.BinaryWriter.prototype.writePackedInt64 = jspb.BinaryWriter.prototype.writePackedSignedVarint64_;
jspb.BinaryWriter.prototype.writePackedInt64String = function(a, b) {
  if (null != b && b.length) {
    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) {
      var e = jspb.arith.Int64.fromString(b[d]);
      this.encoder_.writeSplitVarint64(e.lo, e.hi);
    }
    this.endDelimited_(c);
  }
};
jspb.BinaryWriter.prototype.writePackedUint32 = jspb.BinaryWriter.prototype.writePackedUnsignedVarint32_;
jspb.BinaryWriter.prototype.writePackedUint32String = function(a, b) {
  if (null != b && b.length) {
    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) {
      this.encoder_.writeUnsignedVarint32(parseInt(b[d], 10));
    }
    this.endDelimited_(c);
  }
};
jspb.BinaryWriter.prototype.writePackedUint64 = jspb.BinaryWriter.prototype.writePackedUnsignedVarint64_;
jspb.BinaryWriter.prototype.writePackedUint64String = function(a, b) {
  if (null != b && b.length) {
    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) {
      var e = jspb.arith.UInt64.fromString(b[d]);
      this.encoder_.writeSplitVarint64(e.lo, e.hi);
    }
    this.endDelimited_(c);
  }
};
jspb.BinaryWriter.prototype.writePackedSint32 = jspb.BinaryWriter.prototype.writePackedZigzag32_;
jspb.BinaryWriter.prototype.writePackedSint64 = jspb.BinaryWriter.prototype.writePackedZigzag64_;
jspb.BinaryWriter.prototype.writePackedFixed32 = function(a, b) {
  if (null != b && b.length) {
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
    this.encoder_.writeUnsignedVarint32(4 * b.length);
    for (var c = 0; c < b.length; c++) {
      this.encoder_.writeUint32(b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writePackedFixed64 = function(a, b) {
  if (null != b && b.length) {
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
    this.encoder_.writeUnsignedVarint32(8 * b.length);
    for (var c = 0; c < b.length; c++) {
      this.encoder_.writeUint64(b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writePackedSfixed32 = function(a, b) {
  if (null != b && b.length) {
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
    this.encoder_.writeUnsignedVarint32(4 * b.length);
    for (var c = 0; c < b.length; c++) {
      this.encoder_.writeInt32(b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writePackedSfixed64 = function(a, b) {
  if (null != b && b.length) {
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
    this.encoder_.writeUnsignedVarint32(8 * b.length);
    for (var c = 0; c < b.length; c++) {
      this.encoder_.writeInt64(b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writePackedFloat = function(a, b) {
  if (null != b && b.length) {
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
    this.encoder_.writeUnsignedVarint32(4 * b.length);
    for (var c = 0; c < b.length; c++) {
      this.encoder_.writeFloat(b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writePackedDouble = function(a, b) {
  if (null != b && b.length) {
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
    this.encoder_.writeUnsignedVarint32(8 * b.length);
    for (var c = 0; c < b.length; c++) {
      this.encoder_.writeDouble(b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writePackedBool = function(a, b) {
  if (null != b && b.length) {
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
    this.encoder_.writeUnsignedVarint32(b.length);
    for (var c = 0; c < b.length; c++) {
      this.encoder_.writeBool(b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writePackedEnum = function(a, b) {
  if (null != b && b.length) {
    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) {
      this.encoder_.writeEnum(b[d]);
    }
    this.endDelimited_(c);
  }
};
jspb.BinaryWriter.prototype.writePackedFixedHash64 = function(a, b) {
  if (null != b && b.length) {
    this.writeFieldHeader_(a, jspb.BinaryConstants.WireType.DELIMITED);
    this.encoder_.writeUnsignedVarint32(8 * b.length);
    for (var c = 0; c < b.length; c++) {
      this.encoder_.writeFixedHash64(b[c]);
    }
  }
};
jspb.BinaryWriter.prototype.writePackedVarintHash64 = function(a, b) {
  if (null != b && b.length) {
    for (var c = this.beginDelimited_(a), d = 0; d < b.length; d++) {
      this.encoder_.writeVarintHash64(b[d]);
    }
    this.endDelimited_(c);
  }
};
var proto = {google:{}};
proto.google.protobuf = {};
proto.google.protobuf.Any = function(a) {
  jspb.Message.initialize(this, a, 0, -1, null, null);
};
goog.inherits(proto.google.protobuf.Any, jspb.Message);
goog.DEBUG && !COMPILED && (proto.google.protobuf.Any.displayName = "proto.google.protobuf.Any");
jspb.Message.GENERATE_TO_OBJECT && (proto.google.protobuf.Any.prototype.toObject = function(a) {
  return proto.google.protobuf.Any.toObject(a, this);
}, proto.google.protobuf.Any.toObject = function(a, b) {
  var c = {typeUrl:jspb.Message.getFieldWithDefault(b, 1, ""), value:b.getValue_asB64()};
  a && (c.$jspbMessageInstance = b);
  return c;
});
proto.google.protobuf.Any.deserializeBinary = function(a) {
  a = new jspb.BinaryReader(a);
  var b = new proto.google.protobuf.Any;
  return proto.google.protobuf.Any.deserializeBinaryFromReader(b, a);
};
proto.google.protobuf.Any.deserializeBinaryFromReader = function(a, b) {
  for (; b.nextField() && !b.isEndGroup();) {
    switch(b.getFieldNumber()) {
      case 1:
        var c = b.readString();
        a.setTypeUrl(c);
        break;
      case 2:
        c = b.readBytes();
        a.setValue(c);
        break;
      default:
        b.skipField();
    }
  }
  return a;
};
proto.google.protobuf.Any.prototype.serializeBinary = function() {
  var a = new jspb.BinaryWriter;
  proto.google.protobuf.Any.serializeBinaryToWriter(this, a);
  return a.getResultBuffer();
};
proto.google.protobuf.Any.serializeBinaryToWriter = function(a, b) {
  var c = a.getTypeUrl();
  0 < c.length && b.writeString(1, c);
  c = a.getValue_asU8();
  0 < c.length && b.writeBytes(2, c);
};
proto.google.protobuf.Any.prototype.getTypeUrl = function() {
  return jspb.Message.getFieldWithDefault(this, 1, "");
};
proto.google.protobuf.Any.prototype.setTypeUrl = function(a) {
  jspb.Message.setField(this, 1, a);
};
proto.google.protobuf.Any.prototype.getValue = function() {
  return jspb.Message.getFieldWithDefault(this, 2, "");
};
proto.google.protobuf.Any.prototype.getValue_asB64 = function() {
  return jspb.Message.bytesAsB64(this.getValue());
};
proto.google.protobuf.Any.prototype.getValue_asU8 = function() {
  return jspb.Message.bytesAsU8(this.getValue());
};
proto.google.protobuf.Any.prototype.setValue = function(a) {
  jspb.Message.setField(this, 2, a);
};
proto.google.rpc = {};
proto.google.rpc.Status = function(a) {
  jspb.Message.initialize(this, a, 0, -1, proto.google.rpc.Status.repeatedFields_, null);
};
goog.inherits(proto.google.rpc.Status, jspb.Message);
goog.DEBUG && !COMPILED && (proto.google.rpc.Status.displayName = "proto.google.rpc.Status");
proto.google.rpc.Status.repeatedFields_ = [3];
jspb.Message.GENERATE_TO_OBJECT && (proto.google.rpc.Status.prototype.toObject = function(a) {
  return proto.google.rpc.Status.toObject(a, this);
}, proto.google.rpc.Status.toObject = function(a, b) {
  var c = {code:jspb.Message.getFieldWithDefault(b, 1, 0), message:jspb.Message.getFieldWithDefault(b, 2, ""), detailsList:jspb.Message.toObjectList(b.getDetailsList(), proto.google.protobuf.Any.toObject, a)};
  a && (c.$jspbMessageInstance = b);
  return c;
});
proto.google.rpc.Status.deserializeBinary = function(a) {
  a = new jspb.BinaryReader(a);
  var b = new proto.google.rpc.Status;
  return proto.google.rpc.Status.deserializeBinaryFromReader(b, a);
};
proto.google.rpc.Status.deserializeBinaryFromReader = function(a, b) {
  for (; b.nextField() && !b.isEndGroup();) {
    switch(b.getFieldNumber()) {
      case 1:
        var c = b.readInt32();
        a.setCode(c);
        break;
      case 2:
        c = b.readString();
        a.setMessage(c);
        break;
      case 3:
        c = new proto.google.protobuf.Any;
        b.readMessage(c, proto.google.protobuf.Any.deserializeBinaryFromReader);
        a.addDetails(c);
        break;
      default:
        b.skipField();
    }
  }
  return a;
};
proto.google.rpc.Status.prototype.serializeBinary = function() {
  var a = new jspb.BinaryWriter;
  proto.google.rpc.Status.serializeBinaryToWriter(this, a);
  return a.getResultBuffer();
};
proto.google.rpc.Status.serializeBinaryToWriter = function(a, b) {
  var c = a.getCode();
  0 !== c && b.writeInt32(1, c);
  c = a.getMessage();
  0 < c.length && b.writeString(2, c);
  c = a.getDetailsList();
  0 < c.length && b.writeRepeatedMessage(3, c, proto.google.protobuf.Any.serializeBinaryToWriter);
};
proto.google.rpc.Status.prototype.getCode = function() {
  return jspb.Message.getFieldWithDefault(this, 1, 0);
};
proto.google.rpc.Status.prototype.setCode = function(a) {
  jspb.Message.setField(this, 1, a);
};
proto.google.rpc.Status.prototype.getMessage = function() {
  return jspb.Message.getFieldWithDefault(this, 2, "");
};
proto.google.rpc.Status.prototype.setMessage = function(a) {
  jspb.Message.setField(this, 2, a);
};
proto.google.rpc.Status.prototype.getDetailsList = function() {
  return jspb.Message.getRepeatedWrapperField(this, proto.google.protobuf.Any, 3);
};
proto.google.rpc.Status.prototype.setDetailsList = function(a) {
  jspb.Message.setRepeatedWrapperField(this, 3, a);
};
proto.google.rpc.Status.prototype.addDetails = function(a, b) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, a, proto.google.protobuf.Any, b);
};
proto.google.rpc.Status.prototype.clearDetailsList = function() {
  this.setDetailsList([]);
};
proto.grpc = {};
proto.grpc.gateway = {};
proto.grpc.gateway.Pair = function(a) {
  jspb.Message.initialize(this, a, 0, -1, null, null);
};
goog.inherits(proto.grpc.gateway.Pair, jspb.Message);
goog.DEBUG && !COMPILED && (proto.grpc.gateway.Pair.displayName = "proto.grpc.gateway.Pair");
jspb.Message.GENERATE_TO_OBJECT && (proto.grpc.gateway.Pair.prototype.toObject = function(a) {
  return proto.grpc.gateway.Pair.toObject(a, this);
}, proto.grpc.gateway.Pair.toObject = function(a, b) {
  var c = {first:b.getFirst_asB64(), second:b.getSecond_asB64()};
  a && (c.$jspbMessageInstance = b);
  return c;
});
proto.grpc.gateway.Pair.deserializeBinary = function(a) {
  a = new jspb.BinaryReader(a);
  var b = new proto.grpc.gateway.Pair;
  return proto.grpc.gateway.Pair.deserializeBinaryFromReader(b, a);
};
proto.grpc.gateway.Pair.deserializeBinaryFromReader = function(a, b) {
  for (; b.nextField() && !b.isEndGroup();) {
    switch(b.getFieldNumber()) {
      case 1:
        var c = b.readBytes();
        a.setFirst(c);
        break;
      case 2:
        c = b.readBytes();
        a.setSecond(c);
        break;
      default:
        b.skipField();
    }
  }
  return a;
};
proto.grpc.gateway.Pair.prototype.serializeBinary = function() {
  var a = new jspb.BinaryWriter;
  proto.grpc.gateway.Pair.serializeBinaryToWriter(this, a);
  return a.getResultBuffer();
};
proto.grpc.gateway.Pair.serializeBinaryToWriter = function(a, b) {
  var c = a.getFirst_asU8();
  0 < c.length && b.writeBytes(1, c);
  c = a.getSecond_asU8();
  0 < c.length && b.writeBytes(2, c);
};
proto.grpc.gateway.Pair.prototype.getFirst = function() {
  return jspb.Message.getFieldWithDefault(this, 1, "");
};
proto.grpc.gateway.Pair.prototype.getFirst_asB64 = function() {
  return jspb.Message.bytesAsB64(this.getFirst());
};
proto.grpc.gateway.Pair.prototype.getFirst_asU8 = function() {
  return jspb.Message.bytesAsU8(this.getFirst());
};
proto.grpc.gateway.Pair.prototype.setFirst = function(a) {
  jspb.Message.setField(this, 1, a);
};
proto.grpc.gateway.Pair.prototype.getSecond = function() {
  return jspb.Message.getFieldWithDefault(this, 2, "");
};
proto.grpc.gateway.Pair.prototype.getSecond_asB64 = function() {
  return jspb.Message.bytesAsB64(this.getSecond());
};
proto.grpc.gateway.Pair.prototype.getSecond_asU8 = function() {
  return jspb.Message.bytesAsU8(this.getSecond());
};
proto.grpc.gateway.Pair.prototype.setSecond = function(a) {
  jspb.Message.setField(this, 2, a);
};
grpc.web.GatewayClientBase = function(a) {
};
grpc.web.GatewayClientBase.prototype.rpcCall = function(a, b, c, d, e) {
  var f = this.newXhr_();
  b = d.requestSerializeFn(b);
  f.headers.addAll(c);
  c = this.createClientReadableStream_(f, d.responseDeserializeFn);
  c.on("data", function(a) {
    e(null, a);
  });
  c.on("status", function(a) {
    a.code != grpc.web.StatusCode.OK && e({code:a.code, message:a.details}, null);
  });
  f.headers.set("Content-Type", "application/x-protobuf");
  f.headers.set("X-Accept-Content-Transfer-Encoding", "base64");
  f.headers.set("X-Accept-Response-Streaming", "true");
  f.send(a, "POST", b);
  return c;
};
grpc.web.GatewayClientBase.prototype.serverStreaming = function(a, b, c, d) {
  var e = this.newXhr_();
  b = d.requestSerializeFn(b);
  e.headers.addAll(c);
  c = this.createClientReadableStream_(e, d.responseDeserializeFn);
  e.headers.set("Content-Type", "application/x-protobuf");
  e.headers.set("X-Accept-Content-Transfer-Encoding", "base64");
  e.headers.set("X-Accept-Response-Streaming", "true");
  e.send(a, "POST", b);
  return c;
};
grpc.web.GatewayClientBase.prototype.newXhr_ = function() {
  return new goog.net.XhrIo;
};
grpc.web.GatewayClientBase.prototype.createClientReadableStream_ = function(a, b) {
  return new grpc.web.ClientReadableStream(a, b, grpc.web.GatewayClientBase.parseRpcStatus_);
};
grpc.web.GatewayClientBase.parseRpcStatus_ = function(a) {
  a = proto.google.rpc.Status.deserializeBinary(a);
  for (var b = {}, c = a.getDetailsList(), d = 0; d < c.length; d++) {
    var e = proto.grpc.gateway.Pair.deserializeBinary(c[d].getValue()), f = goog.crypt.utf8ByteArrayToString(e.getFirst_asU8()), e = goog.crypt.utf8ByteArrayToString(e.getSecond_asU8());
    b[f] = e;
  }
  return {code:a.getCode(), details:a.getMessage(), metadata:b};
};

