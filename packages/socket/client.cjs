"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/socket.io-client/dist/socket.io.js
var require_socket_io = __commonJS({
  "../../node_modules/socket.io-client/dist/socket.io.js"(exports, module2) {
    (function(global, factory) {
      typeof exports === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.io = factory());
    })(exports, function() {
      "use strict";
      function _typeof(obj2) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj3) {
          return typeof obj3;
        } : function(obj3) {
          return obj3 && "function" == typeof Symbol && obj3.constructor === Symbol && obj3 !== Symbol.prototype ? "symbol" : typeof obj3;
        }, _typeof(obj2);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i2 = 0; i2 < props.length; i2++) {
          var descriptor = props[i2];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
          writable: false
        });
        return Constructor;
      }
      function _extends() {
        _extends = Object.assign ? Object.assign.bind() : function(target) {
          for (var i2 = 1; i2 < arguments.length; i2++) {
            var source = arguments[i2];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
        return _extends.apply(this, arguments);
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            writable: true,
            configurable: true
          }
        });
        Object.defineProperty(subClass, "prototype", {
          writable: false
        });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _construct(Parent, args, Class) {
        if (_isNativeReflectConstruct()) {
          _construct = Reflect.construct.bind();
        } else {
          _construct = function _construct2(Parent2, args2, Class2) {
            var a = [null];
            a.push.apply(a, args2);
            var Constructor = Function.bind.apply(Parent2, a);
            var instance = new Constructor();
            if (Class2)
              _setPrototypeOf(instance, Class2.prototype);
            return instance;
          };
        }
        return _construct.apply(null, arguments);
      }
      function _isNativeFunction(fn) {
        return Function.toString.call(fn).indexOf("[native code]") !== -1;
      }
      function _wrapNativeSuper(Class) {
        var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
        _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
          if (Class2 === null || !_isNativeFunction(Class2))
            return Class2;
          if (typeof Class2 !== "function") {
            throw new TypeError("Super expression must either be null or a function");
          }
          if (typeof _cache !== "undefined") {
            if (_cache.has(Class2))
              return _cache.get(Class2);
            _cache.set(Class2, Wrapper);
          }
          function Wrapper() {
            return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
          }
          Wrapper.prototype = Object.create(Class2.prototype, {
            constructor: {
              value: Wrapper,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          return _setPrototypeOf(Wrapper, Class2);
        };
        return _wrapNativeSuper(Class);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (typeof call === "object" || typeof call === "function")) {
          return call;
        } else if (call !== void 0) {
          throw new TypeError("Derived constructors may only return object or undefined");
        }
        return _assertThisInitialized(self2);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _superPropBase(object, property) {
        while (!Object.prototype.hasOwnProperty.call(object, property)) {
          object = _getPrototypeOf(object);
          if (object === null)
            break;
        }
        return object;
      }
      function _get() {
        if (typeof Reflect !== "undefined" && Reflect.get) {
          _get = Reflect.get.bind();
        } else {
          _get = function _get2(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base)
              return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
              return desc.get.call(arguments.length < 3 ? target : receiver);
            }
            return desc.value;
          };
        }
        return _get.apply(this, arguments);
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o)
          return;
        if (typeof o === "string")
          return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor)
          n = o.constructor.name;
        if (n === "Map" || n === "Set")
          return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
          return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
          len = arr.length;
        for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++)
          arr2[i2] = arr[i2];
        return arr2;
      }
      function _createForOfIteratorHelper(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
          if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it)
              o = it;
            var i2 = 0;
            var F = function() {
            };
            return {
              s: F,
              n: function() {
                if (i2 >= o.length)
                  return {
                    done: true
                  };
                return {
                  done: false,
                  value: o[i2++]
                };
              },
              e: function(e) {
                throw e;
              },
              f: F
            };
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var normalCompletion = true, didErr = false, err;
        return {
          s: function() {
            it = it.call(o);
          },
          n: function() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
          },
          e: function(e) {
            didErr = true;
            err = e;
          },
          f: function() {
            try {
              if (!normalCompletion && it.return != null)
                it.return();
            } finally {
              if (didErr)
                throw err;
            }
          }
        };
      }
      var PACKET_TYPES = /* @__PURE__ */ Object.create(null);
      PACKET_TYPES["open"] = "0";
      PACKET_TYPES["close"] = "1";
      PACKET_TYPES["ping"] = "2";
      PACKET_TYPES["pong"] = "3";
      PACKET_TYPES["message"] = "4";
      PACKET_TYPES["upgrade"] = "5";
      PACKET_TYPES["noop"] = "6";
      var PACKET_TYPES_REVERSE = /* @__PURE__ */ Object.create(null);
      Object.keys(PACKET_TYPES).forEach(function(key) {
        PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
      });
      var ERROR_PACKET = {
        type: "error",
        data: "parser error"
      };
      var withNativeBlob$1 = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
      var withNativeArrayBuffer$2 = typeof ArrayBuffer === "function";
      var isView$1 = function isView2(obj2) {
        return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj2) : obj2 && obj2.buffer instanceof ArrayBuffer;
      };
      var encodePacket = function encodePacket2(_ref, supportsBinary, callback) {
        var type = _ref.type, data = _ref.data;
        if (withNativeBlob$1 && data instanceof Blob) {
          if (supportsBinary) {
            return callback(data);
          } else {
            return encodeBlobAsBase64(data, callback);
          }
        } else if (withNativeArrayBuffer$2 && (data instanceof ArrayBuffer || isView$1(data))) {
          if (supportsBinary) {
            return callback(data);
          } else {
            return encodeBlobAsBase64(new Blob([data]), callback);
          }
        }
        return callback(PACKET_TYPES[type] + (data || ""));
      };
      var encodeBlobAsBase64 = function encodeBlobAsBase642(data, callback) {
        var fileReader = new FileReader();
        fileReader.onload = function() {
          var content = fileReader.result.split(",")[1];
          callback("b" + content);
        };
        return fileReader.readAsDataURL(data);
      };
      var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var lookup$1 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
      for (var i$1 = 0; i$1 < chars.length; i$1++) {
        lookup$1[chars.charCodeAt(i$1)] = i$1;
      }
      var decode$1 = function decode2(base64) {
        var bufferLength = base64.length * 0.75, len = base64.length, i2, p = 0, encoded1, encoded2, encoded3, encoded4;
        if (base64[base64.length - 1] === "=") {
          bufferLength--;
          if (base64[base64.length - 2] === "=") {
            bufferLength--;
          }
        }
        var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
        for (i2 = 0; i2 < len; i2 += 4) {
          encoded1 = lookup$1[base64.charCodeAt(i2)];
          encoded2 = lookup$1[base64.charCodeAt(i2 + 1)];
          encoded3 = lookup$1[base64.charCodeAt(i2 + 2)];
          encoded4 = lookup$1[base64.charCodeAt(i2 + 3)];
          bytes[p++] = encoded1 << 2 | encoded2 >> 4;
          bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
          bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
        }
        return arraybuffer;
      };
      var withNativeArrayBuffer$1 = typeof ArrayBuffer === "function";
      var decodePacket = function decodePacket2(encodedPacket, binaryType) {
        if (typeof encodedPacket !== "string") {
          return {
            type: "message",
            data: mapBinary(encodedPacket, binaryType)
          };
        }
        var type = encodedPacket.charAt(0);
        if (type === "b") {
          return {
            type: "message",
            data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
          };
        }
        var packetType = PACKET_TYPES_REVERSE[type];
        if (!packetType) {
          return ERROR_PACKET;
        }
        return encodedPacket.length > 1 ? {
          type: PACKET_TYPES_REVERSE[type],
          data: encodedPacket.substring(1)
        } : {
          type: PACKET_TYPES_REVERSE[type]
        };
      };
      var decodeBase64Packet = function decodeBase64Packet2(data, binaryType) {
        if (withNativeArrayBuffer$1) {
          var decoded = decode$1(data);
          return mapBinary(decoded, binaryType);
        } else {
          return {
            base64: true,
            data
          };
        }
      };
      var mapBinary = function mapBinary2(data, binaryType) {
        switch (binaryType) {
          case "blob":
            return data instanceof ArrayBuffer ? new Blob([data]) : data;
          case "arraybuffer":
          default:
            return data;
        }
      };
      var SEPARATOR = String.fromCharCode(30);
      var encodePayload = function encodePayload2(packets, callback) {
        var length2 = packets.length;
        var encodedPackets = new Array(length2);
        var count = 0;
        packets.forEach(function(packet, i2) {
          encodePacket(packet, false, function(encodedPacket) {
            encodedPackets[i2] = encodedPacket;
            if (++count === length2) {
              callback(encodedPackets.join(SEPARATOR));
            }
          });
        });
      };
      var decodePayload = function decodePayload2(encodedPayload, binaryType) {
        var encodedPackets = encodedPayload.split(SEPARATOR);
        var packets = [];
        for (var i2 = 0; i2 < encodedPackets.length; i2++) {
          var decodedPacket = decodePacket(encodedPackets[i2], binaryType);
          packets.push(decodedPacket);
          if (decodedPacket.type === "error") {
            break;
          }
        }
        return packets;
      };
      var protocol$1 = 4;
      function Emitter(obj2) {
        if (obj2)
          return mixin(obj2);
      }
      function mixin(obj2) {
        for (var key in Emitter.prototype) {
          obj2[key] = Emitter.prototype[key];
        }
        return obj2;
      }
      Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
        this._callbacks = this._callbacks || {};
        (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
        return this;
      };
      Emitter.prototype.once = function(event, fn) {
        function on2() {
          this.off(event, on2);
          fn.apply(this, arguments);
        }
        on2.fn = fn;
        this.on(event, on2);
        return this;
      };
      Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
        this._callbacks = this._callbacks || {};
        if (0 == arguments.length) {
          this._callbacks = {};
          return this;
        }
        var callbacks = this._callbacks["$" + event];
        if (!callbacks)
          return this;
        if (1 == arguments.length) {
          delete this._callbacks["$" + event];
          return this;
        }
        var cb;
        for (var i2 = 0; i2 < callbacks.length; i2++) {
          cb = callbacks[i2];
          if (cb === fn || cb.fn === fn) {
            callbacks.splice(i2, 1);
            break;
          }
        }
        if (callbacks.length === 0) {
          delete this._callbacks["$" + event];
        }
        return this;
      };
      Emitter.prototype.emit = function(event) {
        this._callbacks = this._callbacks || {};
        var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
        for (var i2 = 1; i2 < arguments.length; i2++) {
          args[i2 - 1] = arguments[i2];
        }
        if (callbacks) {
          callbacks = callbacks.slice(0);
          for (var i2 = 0, len = callbacks.length; i2 < len; ++i2) {
            callbacks[i2].apply(this, args);
          }
        }
        return this;
      };
      Emitter.prototype.emitReserved = Emitter.prototype.emit;
      Emitter.prototype.listeners = function(event) {
        this._callbacks = this._callbacks || {};
        return this._callbacks["$" + event] || [];
      };
      Emitter.prototype.hasListeners = function(event) {
        return !!this.listeners(event).length;
      };
      var globalThisShim = function() {
        if (typeof self !== "undefined") {
          return self;
        } else if (typeof window !== "undefined") {
          return window;
        } else {
          return Function("return this")();
        }
      }();
      function pick(obj2) {
        for (var _len = arguments.length, attr = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          attr[_key - 1] = arguments[_key];
        }
        return attr.reduce(function(acc, k) {
          if (obj2.hasOwnProperty(k)) {
            acc[k] = obj2[k];
          }
          return acc;
        }, {});
      }
      var NATIVE_SET_TIMEOUT = setTimeout;
      var NATIVE_CLEAR_TIMEOUT = clearTimeout;
      function installTimerFunctions(obj2, opts) {
        if (opts.useNativeTimers) {
          obj2.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
          obj2.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
        } else {
          obj2.setTimeoutFn = setTimeout.bind(globalThisShim);
          obj2.clearTimeoutFn = clearTimeout.bind(globalThisShim);
        }
      }
      var BASE64_OVERHEAD = 1.33;
      function byteLength(obj2) {
        if (typeof obj2 === "string") {
          return utf8Length(obj2);
        }
        return Math.ceil((obj2.byteLength || obj2.size) * BASE64_OVERHEAD);
      }
      function utf8Length(str) {
        var c = 0, length2 = 0;
        for (var i2 = 0, l = str.length; i2 < l; i2++) {
          c = str.charCodeAt(i2);
          if (c < 128) {
            length2 += 1;
          } else if (c < 2048) {
            length2 += 2;
          } else if (c < 55296 || c >= 57344) {
            length2 += 3;
          } else {
            i2++;
            length2 += 4;
          }
        }
        return length2;
      }
      var TransportError = /* @__PURE__ */ function(_Error) {
        _inherits(TransportError2, _Error);
        var _super = _createSuper(TransportError2);
        function TransportError2(reason, description, context) {
          var _this;
          _classCallCheck(this, TransportError2);
          _this = _super.call(this, reason);
          _this.description = description;
          _this.context = context;
          _this.type = "TransportError";
          return _this;
        }
        return _createClass(TransportError2);
      }(/* @__PURE__ */ _wrapNativeSuper(Error));
      var Transport = /* @__PURE__ */ function(_Emitter) {
        _inherits(Transport2, _Emitter);
        var _super2 = _createSuper(Transport2);
        function Transport2(opts) {
          var _this2;
          _classCallCheck(this, Transport2);
          _this2 = _super2.call(this);
          _this2.writable = false;
          installTimerFunctions(_assertThisInitialized(_this2), opts);
          _this2.opts = opts;
          _this2.query = opts.query;
          _this2.readyState = "";
          _this2.socket = opts.socket;
          return _this2;
        }
        _createClass(Transport2, [{
          key: "onError",
          value: function onError(reason, description, context) {
            _get(_getPrototypeOf(Transport2.prototype), "emitReserved", this).call(this, "error", new TransportError(reason, description, context));
            return this;
          }
          /**
           * Opens the transport.
           *
           * @api public
           */
        }, {
          key: "open",
          value: function open() {
            if ("closed" === this.readyState || "" === this.readyState) {
              this.readyState = "opening";
              this.doOpen();
            }
            return this;
          }
          /**
           * Closes the transport.
           *
           * @api public
           */
        }, {
          key: "close",
          value: function close() {
            if ("opening" === this.readyState || "open" === this.readyState) {
              this.doClose();
              this.onClose();
            }
            return this;
          }
          /**
           * Sends multiple packets.
           *
           * @param {Array} packets
           * @api public
           */
        }, {
          key: "send",
          value: function send2(packets) {
            if ("open" === this.readyState) {
              this.write(packets);
            }
          }
          /**
           * Called upon open
           *
           * @api protected
           */
        }, {
          key: "onOpen",
          value: function onOpen() {
            this.readyState = "open";
            this.writable = true;
            _get(_getPrototypeOf(Transport2.prototype), "emitReserved", this).call(this, "open");
          }
          /**
           * Called with data.
           *
           * @param {String} data
           * @api protected
           */
        }, {
          key: "onData",
          value: function onData(data) {
            var packet = decodePacket(data, this.socket.binaryType);
            this.onPacket(packet);
          }
          /**
           * Called with a decoded packet.
           *
           * @api protected
           */
        }, {
          key: "onPacket",
          value: function onPacket(packet) {
            _get(_getPrototypeOf(Transport2.prototype), "emitReserved", this).call(this, "packet", packet);
          }
          /**
           * Called upon close.
           *
           * @api protected
           */
        }, {
          key: "onClose",
          value: function onClose(details) {
            this.readyState = "closed";
            _get(_getPrototypeOf(Transport2.prototype), "emitReserved", this).call(this, "close", details);
          }
        }]);
        return Transport2;
      }(Emitter);
      var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), length = 64, map2 = {};
      var seed = 0, i = 0, prev;
      function encode$1(num) {
        var encoded = "";
        do {
          encoded = alphabet[num % length] + encoded;
          num = Math.floor(num / length);
        } while (num > 0);
        return encoded;
      }
      function yeast() {
        var now = encode$1(+/* @__PURE__ */ new Date());
        if (now !== prev)
          return seed = 0, prev = now;
        return now + "." + encode$1(seed++);
      }
      for (; i < length; i++) {
        map2[alphabet[i]] = i;
      }
      function encode(obj2) {
        var str = "";
        for (var i2 in obj2) {
          if (obj2.hasOwnProperty(i2)) {
            if (str.length)
              str += "&";
            str += encodeURIComponent(i2) + "=" + encodeURIComponent(obj2[i2]);
          }
        }
        return str;
      }
      function decode(qs) {
        var qry = {};
        var pairs = qs.split("&");
        for (var i2 = 0, l = pairs.length; i2 < l; i2++) {
          var pair = pairs[i2].split("=");
          qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
        return qry;
      }
      var value = false;
      try {
        value = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
      } catch (err) {
      }
      var hasCORS = value;
      function XHR(opts) {
        var xdomain = opts.xdomain;
        try {
          if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
            return new XMLHttpRequest();
          }
        } catch (e) {
        }
        if (!xdomain) {
          try {
            return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
          } catch (e) {
          }
        }
      }
      function empty() {
      }
      var hasXHR2 = function() {
        var xhr = new XHR({
          xdomain: false
        });
        return null != xhr.responseType;
      }();
      var Polling = /* @__PURE__ */ function(_Transport) {
        _inherits(Polling2, _Transport);
        var _super = _createSuper(Polling2);
        function Polling2(opts) {
          var _this;
          _classCallCheck(this, Polling2);
          _this = _super.call(this, opts);
          _this.polling = false;
          if (typeof location !== "undefined") {
            var isSSL = "https:" === location.protocol;
            var port = location.port;
            if (!port) {
              port = isSSL ? "443" : "80";
            }
            _this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
            _this.xs = opts.secure !== isSSL;
          }
          var forceBase64 = opts && opts.forceBase64;
          _this.supportsBinary = hasXHR2 && !forceBase64;
          return _this;
        }
        _createClass(Polling2, [{
          key: "name",
          get: function get() {
            return "polling";
          }
          /**
           * Opens the socket (triggers polling). We write a PING message to determine
           * when the transport is open.
           *
           * @api private
           */
        }, {
          key: "doOpen",
          value: function doOpen() {
            this.poll();
          }
          /**
           * Pauses polling.
           *
           * @param {Function} callback upon buffers are flushed and transport is paused
           * @api private
           */
        }, {
          key: "pause",
          value: function pause(onPause) {
            var _this2 = this;
            this.readyState = "pausing";
            var pause2 = function pause3() {
              _this2.readyState = "paused";
              onPause();
            };
            if (this.polling || !this.writable) {
              var total = 0;
              if (this.polling) {
                total++;
                this.once("pollComplete", function() {
                  --total || pause2();
                });
              }
              if (!this.writable) {
                total++;
                this.once("drain", function() {
                  --total || pause2();
                });
              }
            } else {
              pause2();
            }
          }
          /**
           * Starts polling cycle.
           *
           * @api public
           */
        }, {
          key: "poll",
          value: function poll() {
            this.polling = true;
            this.doPoll();
            this.emitReserved("poll");
          }
          /**
           * Overloads onData to detect payloads.
           *
           * @api private
           */
        }, {
          key: "onData",
          value: function onData(data) {
            var _this3 = this;
            var callback = function callback2(packet) {
              if ("opening" === _this3.readyState && packet.type === "open") {
                _this3.onOpen();
              }
              if ("close" === packet.type) {
                _this3.onClose({
                  description: "transport closed by the server"
                });
                return false;
              }
              _this3.onPacket(packet);
            };
            decodePayload(data, this.socket.binaryType).forEach(callback);
            if ("closed" !== this.readyState) {
              this.polling = false;
              this.emitReserved("pollComplete");
              if ("open" === this.readyState) {
                this.poll();
              }
            }
          }
          /**
           * For polling, send a close packet.
           *
           * @api private
           */
        }, {
          key: "doClose",
          value: function doClose() {
            var _this4 = this;
            var close = function close2() {
              _this4.write([{
                type: "close"
              }]);
            };
            if ("open" === this.readyState) {
              close();
            } else {
              this.once("open", close);
            }
          }
          /**
           * Writes a packets payload.
           *
           * @param {Array} data packets
           * @param {Function} drain callback
           * @api private
           */
        }, {
          key: "write",
          value: function write(packets) {
            var _this5 = this;
            this.writable = false;
            encodePayload(packets, function(data) {
              _this5.doWrite(data, function() {
                _this5.writable = true;
                _this5.emitReserved("drain");
              });
            });
          }
          /**
           * Generates uri for connection.
           *
           * @api private
           */
        }, {
          key: "uri",
          value: function uri() {
            var query = this.query || {};
            var schema = this.opts.secure ? "https" : "http";
            var port = "";
            if (false !== this.opts.timestampRequests) {
              query[this.opts.timestampParam] = yeast();
            }
            if (!this.supportsBinary && !query.sid) {
              query.b64 = 1;
            }
            if (this.opts.port && ("https" === schema && Number(this.opts.port) !== 443 || "http" === schema && Number(this.opts.port) !== 80)) {
              port = ":" + this.opts.port;
            }
            var encodedQuery = encode(query);
            var ipv6 = this.opts.hostname.indexOf(":") !== -1;
            return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
          }
          /**
           * Creates a request.
           *
           * @param {String} method
           * @api private
           */
        }, {
          key: "request",
          value: function request() {
            var opts = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            _extends(opts, {
              xd: this.xd,
              xs: this.xs
            }, this.opts);
            return new Request(this.uri(), opts);
          }
          /**
           * Sends data.
           *
           * @param {String} data to send.
           * @param {Function} called upon flush.
           * @api private
           */
        }, {
          key: "doWrite",
          value: function doWrite(data, fn) {
            var _this6 = this;
            var req = this.request({
              method: "POST",
              data
            });
            req.on("success", fn);
            req.on("error", function(xhrStatus, context) {
              _this6.onError("xhr post error", xhrStatus, context);
            });
          }
          /**
           * Starts a poll cycle.
           *
           * @api private
           */
        }, {
          key: "doPoll",
          value: function doPoll() {
            var _this7 = this;
            var req = this.request();
            req.on("data", this.onData.bind(this));
            req.on("error", function(xhrStatus, context) {
              _this7.onError("xhr poll error", xhrStatus, context);
            });
            this.pollXhr = req;
          }
        }]);
        return Polling2;
      }(Transport);
      var Request = /* @__PURE__ */ function(_Emitter) {
        _inherits(Request2, _Emitter);
        var _super2 = _createSuper(Request2);
        function Request2(uri, opts) {
          var _this8;
          _classCallCheck(this, Request2);
          _this8 = _super2.call(this);
          installTimerFunctions(_assertThisInitialized(_this8), opts);
          _this8.opts = opts;
          _this8.method = opts.method || "GET";
          _this8.uri = uri;
          _this8.async = false !== opts.async;
          _this8.data = void 0 !== opts.data ? opts.data : null;
          _this8.create();
          return _this8;
        }
        _createClass(Request2, [{
          key: "create",
          value: function create() {
            var _this9 = this;
            var opts = pick(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
            opts.xdomain = !!this.opts.xd;
            opts.xscheme = !!this.opts.xs;
            var xhr = this.xhr = new XHR(opts);
            try {
              xhr.open(this.method, this.uri, this.async);
              try {
                if (this.opts.extraHeaders) {
                  xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
                  for (var i2 in this.opts.extraHeaders) {
                    if (this.opts.extraHeaders.hasOwnProperty(i2)) {
                      xhr.setRequestHeader(i2, this.opts.extraHeaders[i2]);
                    }
                  }
                }
              } catch (e) {
              }
              if ("POST" === this.method) {
                try {
                  xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
                } catch (e) {
                }
              }
              try {
                xhr.setRequestHeader("Accept", "*/*");
              } catch (e) {
              }
              if ("withCredentials" in xhr) {
                xhr.withCredentials = this.opts.withCredentials;
              }
              if (this.opts.requestTimeout) {
                xhr.timeout = this.opts.requestTimeout;
              }
              xhr.onreadystatechange = function() {
                if (4 !== xhr.readyState)
                  return;
                if (200 === xhr.status || 1223 === xhr.status) {
                  _this9.onLoad();
                } else {
                  _this9.setTimeoutFn(function() {
                    _this9.onError(typeof xhr.status === "number" ? xhr.status : 0);
                  }, 0);
                }
              };
              xhr.send(this.data);
            } catch (e) {
              this.setTimeoutFn(function() {
                _this9.onError(e);
              }, 0);
              return;
            }
            if (typeof document !== "undefined") {
              this.index = Request2.requestsCount++;
              Request2.requests[this.index] = this;
            }
          }
          /**
           * Called upon error.
           *
           * @api private
           */
        }, {
          key: "onError",
          value: function onError(err) {
            this.emitReserved("error", err, this.xhr);
            this.cleanup(true);
          }
          /**
           * Cleans up house.
           *
           * @api private
           */
        }, {
          key: "cleanup",
          value: function cleanup(fromError) {
            if ("undefined" === typeof this.xhr || null === this.xhr) {
              return;
            }
            this.xhr.onreadystatechange = empty;
            if (fromError) {
              try {
                this.xhr.abort();
              } catch (e) {
              }
            }
            if (typeof document !== "undefined") {
              delete Request2.requests[this.index];
            }
            this.xhr = null;
          }
          /**
           * Called upon load.
           *
           * @api private
           */
        }, {
          key: "onLoad",
          value: function onLoad() {
            var data = this.xhr.responseText;
            if (data !== null) {
              this.emitReserved("data", data);
              this.emitReserved("success");
              this.cleanup();
            }
          }
          /**
           * Aborts the request.
           *
           * @api public
           */
        }, {
          key: "abort",
          value: function abort() {
            this.cleanup();
          }
        }]);
        return Request2;
      }(Emitter);
      Request.requestsCount = 0;
      Request.requests = {};
      if (typeof document !== "undefined") {
        if (typeof attachEvent === "function") {
          attachEvent("onunload", unloadHandler);
        } else if (typeof addEventListener === "function") {
          var terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
          addEventListener(terminationEvent, unloadHandler, false);
        }
      }
      function unloadHandler() {
        for (var i2 in Request.requests) {
          if (Request.requests.hasOwnProperty(i2)) {
            Request.requests[i2].abort();
          }
        }
      }
      var nextTick = function() {
        var isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
        if (isPromiseAvailable) {
          return function(cb) {
            return Promise.resolve().then(cb);
          };
        } else {
          return function(cb, setTimeoutFn) {
            return setTimeoutFn(cb, 0);
          };
        }
      }();
      var WebSocket = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
      var usingBrowserWebSocket = true;
      var defaultBinaryType = "arraybuffer";
      var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
      var WS = /* @__PURE__ */ function(_Transport) {
        _inherits(WS2, _Transport);
        var _super = _createSuper(WS2);
        function WS2(opts) {
          var _this;
          _classCallCheck(this, WS2);
          _this = _super.call(this, opts);
          _this.supportsBinary = !opts.forceBase64;
          return _this;
        }
        _createClass(WS2, [{
          key: "name",
          get: function get() {
            return "websocket";
          }
          /**
           * Opens socket.
           *
           * @api private
           */
        }, {
          key: "doOpen",
          value: function doOpen() {
            if (!this.check()) {
              return;
            }
            var uri = this.uri();
            var protocols = this.opts.protocols;
            var opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
            if (this.opts.extraHeaders) {
              opts.headers = this.opts.extraHeaders;
            }
            try {
              this.ws = usingBrowserWebSocket && !isReactNative ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
            } catch (err) {
              return this.emitReserved("error", err);
            }
            this.ws.binaryType = this.socket.binaryType || defaultBinaryType;
            this.addEventListeners();
          }
          /**
           * Adds event listeners to the socket
           *
           * @api private
           */
        }, {
          key: "addEventListeners",
          value: function addEventListeners() {
            var _this2 = this;
            this.ws.onopen = function() {
              if (_this2.opts.autoUnref) {
                _this2.ws._socket.unref();
              }
              _this2.onOpen();
            };
            this.ws.onclose = function(closeEvent) {
              return _this2.onClose({
                description: "websocket connection closed",
                context: closeEvent
              });
            };
            this.ws.onmessage = function(ev) {
              return _this2.onData(ev.data);
            };
            this.ws.onerror = function(e) {
              return _this2.onError("websocket error", e);
            };
          }
          /**
           * Writes data to socket.
           *
           * @param {Array} array of packets.
           * @api private
           */
        }, {
          key: "write",
          value: function write(packets) {
            var _this3 = this;
            this.writable = false;
            var _loop = function _loop2(i3) {
              var packet = packets[i3];
              var lastPacket = i3 === packets.length - 1;
              encodePacket(packet, _this3.supportsBinary, function(data) {
                var opts = {};
                try {
                  if (usingBrowserWebSocket) {
                    _this3.ws.send(data);
                  }
                } catch (e) {
                }
                if (lastPacket) {
                  nextTick(function() {
                    _this3.writable = true;
                    _this3.emitReserved("drain");
                  }, _this3.setTimeoutFn);
                }
              });
            };
            for (var i2 = 0; i2 < packets.length; i2++) {
              _loop(i2);
            }
          }
          /**
           * Closes socket.
           *
           * @api private
           */
        }, {
          key: "doClose",
          value: function doClose() {
            if (typeof this.ws !== "undefined") {
              this.ws.close();
              this.ws = null;
            }
          }
          /**
           * Generates uri for connection.
           *
           * @api private
           */
        }, {
          key: "uri",
          value: function uri() {
            var query = this.query || {};
            var schema = this.opts.secure ? "wss" : "ws";
            var port = "";
            if (this.opts.port && ("wss" === schema && Number(this.opts.port) !== 443 || "ws" === schema && Number(this.opts.port) !== 80)) {
              port = ":" + this.opts.port;
            }
            if (this.opts.timestampRequests) {
              query[this.opts.timestampParam] = yeast();
            }
            if (!this.supportsBinary) {
              query.b64 = 1;
            }
            var encodedQuery = encode(query);
            var ipv6 = this.opts.hostname.indexOf(":") !== -1;
            return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
          }
          /**
           * Feature detection for WebSocket.
           *
           * @return {Boolean} whether this transport is available.
           * @api public
           */
        }, {
          key: "check",
          value: function check() {
            return !!WebSocket;
          }
        }]);
        return WS2;
      }(Transport);
      var transports = {
        websocket: WS,
        polling: Polling
      };
      var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
      var parts = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
      function parse(str) {
        var src = str, b = str.indexOf("["), e = str.indexOf("]");
        if (b != -1 && e != -1) {
          str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
        }
        var m = re.exec(str || ""), uri = {}, i2 = 14;
        while (i2--) {
          uri[parts[i2]] = m[i2] || "";
        }
        if (b != -1 && e != -1) {
          uri.source = src;
          uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
          uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
          uri.ipv6uri = true;
        }
        uri.pathNames = pathNames(uri, uri["path"]);
        uri.queryKey = queryKey(uri, uri["query"]);
        return uri;
      }
      function pathNames(obj2, path) {
        var regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
        if (path.slice(0, 1) == "/" || path.length === 0) {
          names.splice(0, 1);
        }
        if (path.slice(-1) == "/") {
          names.splice(names.length - 1, 1);
        }
        return names;
      }
      function queryKey(uri, query) {
        var data = {};
        query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
          if ($1) {
            data[$1] = $2;
          }
        });
        return data;
      }
      var Socket$1 = /* @__PURE__ */ function(_Emitter) {
        _inherits(Socket2, _Emitter);
        var _super = _createSuper(Socket2);
        function Socket2(uri) {
          var _this;
          var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          _classCallCheck(this, Socket2);
          _this = _super.call(this);
          if (uri && "object" === _typeof(uri)) {
            opts = uri;
            uri = null;
          }
          if (uri) {
            uri = parse(uri);
            opts.hostname = uri.host;
            opts.secure = uri.protocol === "https" || uri.protocol === "wss";
            opts.port = uri.port;
            if (uri.query)
              opts.query = uri.query;
          } else if (opts.host) {
            opts.hostname = parse(opts.host).host;
          }
          installTimerFunctions(_assertThisInitialized(_this), opts);
          _this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
          if (opts.hostname && !opts.port) {
            opts.port = _this.secure ? "443" : "80";
          }
          _this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
          _this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : _this.secure ? "443" : "80");
          _this.transports = opts.transports || ["polling", "websocket"];
          _this.readyState = "";
          _this.writeBuffer = [];
          _this.prevBufferLen = 0;
          _this.opts = _extends({
            path: "/engine.io",
            agent: false,
            withCredentials: false,
            upgrade: true,
            timestampParam: "t",
            rememberUpgrade: false,
            rejectUnauthorized: true,
            perMessageDeflate: {
              threshold: 1024
            },
            transportOptions: {},
            closeOnBeforeunload: true
          }, opts);
          _this.opts.path = _this.opts.path.replace(/\/$/, "") + "/";
          if (typeof _this.opts.query === "string") {
            _this.opts.query = decode(_this.opts.query);
          }
          _this.id = null;
          _this.upgrades = null;
          _this.pingInterval = null;
          _this.pingTimeout = null;
          _this.pingTimeoutTimer = null;
          if (typeof addEventListener === "function") {
            if (_this.opts.closeOnBeforeunload) {
              _this.beforeunloadEventListener = function() {
                if (_this.transport) {
                  _this.transport.removeAllListeners();
                  _this.transport.close();
                }
              };
              addEventListener("beforeunload", _this.beforeunloadEventListener, false);
            }
            if (_this.hostname !== "localhost") {
              _this.offlineEventListener = function() {
                _this.onClose("transport close", {
                  description: "network connection lost"
                });
              };
              addEventListener("offline", _this.offlineEventListener, false);
            }
          }
          _this.open();
          return _this;
        }
        _createClass(Socket2, [{
          key: "createTransport",
          value: function createTransport(name) {
            var query = _extends({}, this.opts.query);
            query.EIO = protocol$1;
            query.transport = name;
            if (this.id)
              query.sid = this.id;
            var opts = _extends({}, this.opts.transportOptions[name], this.opts, {
              query,
              socket: this,
              hostname: this.hostname,
              secure: this.secure,
              port: this.port
            });
            return new transports[name](opts);
          }
          /**
           * Initializes transport to use and starts probe.
           *
           * @api private
           */
        }, {
          key: "open",
          value: function open() {
            var _this2 = this;
            var transport;
            if (this.opts.rememberUpgrade && Socket2.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
              transport = "websocket";
            } else if (0 === this.transports.length) {
              this.setTimeoutFn(function() {
                _this2.emitReserved("error", "No transports available");
              }, 0);
              return;
            } else {
              transport = this.transports[0];
            }
            this.readyState = "opening";
            try {
              transport = this.createTransport(transport);
            } catch (e) {
              this.transports.shift();
              this.open();
              return;
            }
            transport.open();
            this.setTransport(transport);
          }
          /**
           * Sets the current transport. Disables the existing one (if any).
           *
           * @api private
           */
        }, {
          key: "setTransport",
          value: function setTransport(transport) {
            var _this3 = this;
            if (this.transport) {
              this.transport.removeAllListeners();
            }
            this.transport = transport;
            transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", function(reason) {
              return _this3.onClose("transport close", reason);
            });
          }
          /**
           * Probes a transport.
           *
           * @param {String} transport name
           * @api private
           */
        }, {
          key: "probe",
          value: function probe(name) {
            var _this4 = this;
            var transport = this.createTransport(name);
            var failed = false;
            Socket2.priorWebsocketSuccess = false;
            var onTransportOpen = function onTransportOpen2() {
              if (failed)
                return;
              transport.send([{
                type: "ping",
                data: "probe"
              }]);
              transport.once("packet", function(msg) {
                if (failed)
                  return;
                if ("pong" === msg.type && "probe" === msg.data) {
                  _this4.upgrading = true;
                  _this4.emitReserved("upgrading", transport);
                  if (!transport)
                    return;
                  Socket2.priorWebsocketSuccess = "websocket" === transport.name;
                  _this4.transport.pause(function() {
                    if (failed)
                      return;
                    if ("closed" === _this4.readyState)
                      return;
                    cleanup();
                    _this4.setTransport(transport);
                    transport.send([{
                      type: "upgrade"
                    }]);
                    _this4.emitReserved("upgrade", transport);
                    transport = null;
                    _this4.upgrading = false;
                    _this4.flush();
                  });
                } else {
                  var err = new Error("probe error");
                  err.transport = transport.name;
                  _this4.emitReserved("upgradeError", err);
                }
              });
            };
            function freezeTransport() {
              if (failed)
                return;
              failed = true;
              cleanup();
              transport.close();
              transport = null;
            }
            var onerror = function onerror2(err) {
              var error = new Error("probe error: " + err);
              error.transport = transport.name;
              freezeTransport();
              _this4.emitReserved("upgradeError", error);
            };
            function onTransportClose() {
              onerror("transport closed");
            }
            function onclose() {
              onerror("socket closed");
            }
            function onupgrade(to) {
              if (transport && to.name !== transport.name) {
                freezeTransport();
              }
            }
            var cleanup = function cleanup2() {
              transport.removeListener("open", onTransportOpen);
              transport.removeListener("error", onerror);
              transport.removeListener("close", onTransportClose);
              _this4.off("close", onclose);
              _this4.off("upgrading", onupgrade);
            };
            transport.once("open", onTransportOpen);
            transport.once("error", onerror);
            transport.once("close", onTransportClose);
            this.once("close", onclose);
            this.once("upgrading", onupgrade);
            transport.open();
          }
          /**
           * Called when connection is deemed open.
           *
           * @api private
           */
        }, {
          key: "onOpen",
          value: function onOpen() {
            this.readyState = "open";
            Socket2.priorWebsocketSuccess = "websocket" === this.transport.name;
            this.emitReserved("open");
            this.flush();
            if ("open" === this.readyState && this.opts.upgrade && this.transport.pause) {
              var i2 = 0;
              var l = this.upgrades.length;
              for (; i2 < l; i2++) {
                this.probe(this.upgrades[i2]);
              }
            }
          }
          /**
           * Handles a packet.
           *
           * @api private
           */
        }, {
          key: "onPacket",
          value: function onPacket(packet) {
            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
              this.emitReserved("packet", packet);
              this.emitReserved("heartbeat");
              switch (packet.type) {
                case "open":
                  this.onHandshake(JSON.parse(packet.data));
                  break;
                case "ping":
                  this.resetPingTimeout();
                  this.sendPacket("pong");
                  this.emitReserved("ping");
                  this.emitReserved("pong");
                  break;
                case "error":
                  var err = new Error("server error");
                  err.code = packet.data;
                  this.onError(err);
                  break;
                case "message":
                  this.emitReserved("data", packet.data);
                  this.emitReserved("message", packet.data);
                  break;
              }
            }
          }
          /**
           * Called upon handshake completion.
           *
           * @param {Object} data - handshake obj
           * @api private
           */
        }, {
          key: "onHandshake",
          value: function onHandshake(data) {
            this.emitReserved("handshake", data);
            this.id = data.sid;
            this.transport.query.sid = data.sid;
            this.upgrades = this.filterUpgrades(data.upgrades);
            this.pingInterval = data.pingInterval;
            this.pingTimeout = data.pingTimeout;
            this.maxPayload = data.maxPayload;
            this.onOpen();
            if ("closed" === this.readyState)
              return;
            this.resetPingTimeout();
          }
          /**
           * Sets and resets ping timeout timer based on server pings.
           *
           * @api private
           */
        }, {
          key: "resetPingTimeout",
          value: function resetPingTimeout() {
            var _this5 = this;
            this.clearTimeoutFn(this.pingTimeoutTimer);
            this.pingTimeoutTimer = this.setTimeoutFn(function() {
              _this5.onClose("ping timeout");
            }, this.pingInterval + this.pingTimeout);
            if (this.opts.autoUnref) {
              this.pingTimeoutTimer.unref();
            }
          }
          /**
           * Called on `drain` event
           *
           * @api private
           */
        }, {
          key: "onDrain",
          value: function onDrain() {
            this.writeBuffer.splice(0, this.prevBufferLen);
            this.prevBufferLen = 0;
            if (0 === this.writeBuffer.length) {
              this.emitReserved("drain");
            } else {
              this.flush();
            }
          }
          /**
           * Flush write buffers.
           *
           * @api private
           */
        }, {
          key: "flush",
          value: function flush() {
            if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
              var packets = this.getWritablePackets();
              this.transport.send(packets);
              this.prevBufferLen = packets.length;
              this.emitReserved("flush");
            }
          }
          /**
           * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
           * long-polling)
           *
           * @private
           */
        }, {
          key: "getWritablePackets",
          value: function getWritablePackets() {
            var shouldCheckPayloadSize = this.maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
            if (!shouldCheckPayloadSize) {
              return this.writeBuffer;
            }
            var payloadSize = 1;
            for (var i2 = 0; i2 < this.writeBuffer.length; i2++) {
              var data = this.writeBuffer[i2].data;
              if (data) {
                payloadSize += byteLength(data);
              }
              if (i2 > 0 && payloadSize > this.maxPayload) {
                return this.writeBuffer.slice(0, i2);
              }
              payloadSize += 2;
            }
            return this.writeBuffer;
          }
          /**
           * Sends a message.
           *
           * @param {String} message.
           * @param {Function} callback function.
           * @param {Object} options.
           * @return {Socket} for chaining.
           * @api public
           */
        }, {
          key: "write",
          value: function write(msg, options, fn) {
            this.sendPacket("message", msg, options, fn);
            return this;
          }
        }, {
          key: "send",
          value: function send2(msg, options, fn) {
            this.sendPacket("message", msg, options, fn);
            return this;
          }
          /**
           * Sends a packet.
           *
           * @param {String} packet type.
           * @param {String} data.
           * @param {Object} options.
           * @param {Function} callback function.
           * @api private
           */
        }, {
          key: "sendPacket",
          value: function sendPacket(type, data, options, fn) {
            if ("function" === typeof data) {
              fn = data;
              data = void 0;
            }
            if ("function" === typeof options) {
              fn = options;
              options = null;
            }
            if ("closing" === this.readyState || "closed" === this.readyState) {
              return;
            }
            options = options || {};
            options.compress = false !== options.compress;
            var packet = {
              type,
              data,
              options
            };
            this.emitReserved("packetCreate", packet);
            this.writeBuffer.push(packet);
            if (fn)
              this.once("flush", fn);
            this.flush();
          }
          /**
           * Closes the connection.
           *
           * @api public
           */
        }, {
          key: "close",
          value: function close() {
            var _this6 = this;
            var close2 = function close3() {
              _this6.onClose("forced close");
              _this6.transport.close();
            };
            var cleanupAndClose = function cleanupAndClose2() {
              _this6.off("upgrade", cleanupAndClose2);
              _this6.off("upgradeError", cleanupAndClose2);
              close2();
            };
            var waitForUpgrade = function waitForUpgrade2() {
              _this6.once("upgrade", cleanupAndClose);
              _this6.once("upgradeError", cleanupAndClose);
            };
            if ("opening" === this.readyState || "open" === this.readyState) {
              this.readyState = "closing";
              if (this.writeBuffer.length) {
                this.once("drain", function() {
                  if (_this6.upgrading) {
                    waitForUpgrade();
                  } else {
                    close2();
                  }
                });
              } else if (this.upgrading) {
                waitForUpgrade();
              } else {
                close2();
              }
            }
            return this;
          }
          /**
           * Called upon transport error
           *
           * @api private
           */
        }, {
          key: "onError",
          value: function onError(err) {
            Socket2.priorWebsocketSuccess = false;
            this.emitReserved("error", err);
            this.onClose("transport error", err);
          }
          /**
           * Called upon transport close.
           *
           * @api private
           */
        }, {
          key: "onClose",
          value: function onClose(reason, description) {
            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
              this.clearTimeoutFn(this.pingTimeoutTimer);
              this.transport.removeAllListeners("close");
              this.transport.close();
              this.transport.removeAllListeners();
              if (typeof removeEventListener === "function") {
                removeEventListener("beforeunload", this.beforeunloadEventListener, false);
                removeEventListener("offline", this.offlineEventListener, false);
              }
              this.readyState = "closed";
              this.id = null;
              this.emitReserved("close", reason, description);
              this.writeBuffer = [];
              this.prevBufferLen = 0;
            }
          }
          /**
           * Filters upgrades, returning only those matching client transports.
           *
           * @param {Array} server upgrades
           * @api private
           *
           */
        }, {
          key: "filterUpgrades",
          value: function filterUpgrades(upgrades) {
            var filteredUpgrades = [];
            var i2 = 0;
            var j = upgrades.length;
            for (; i2 < j; i2++) {
              if (~this.transports.indexOf(upgrades[i2]))
                filteredUpgrades.push(upgrades[i2]);
            }
            return filteredUpgrades;
          }
        }]);
        return Socket2;
      }(Emitter);
      Socket$1.protocol = protocol$1;
      Socket$1.protocol;
      function url(uri) {
        var path = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
        var loc = arguments.length > 2 ? arguments[2] : void 0;
        var obj2 = uri;
        loc = loc || typeof location !== "undefined" && location;
        if (null == uri)
          uri = loc.protocol + "//" + loc.host;
        if (typeof uri === "string") {
          if ("/" === uri.charAt(0)) {
            if ("/" === uri.charAt(1)) {
              uri = loc.protocol + uri;
            } else {
              uri = loc.host + uri;
            }
          }
          if (!/^(https?|wss?):\/\//.test(uri)) {
            if ("undefined" !== typeof loc) {
              uri = loc.protocol + "//" + uri;
            } else {
              uri = "https://" + uri;
            }
          }
          obj2 = parse(uri);
        }
        if (!obj2.port) {
          if (/^(http|ws)$/.test(obj2.protocol)) {
            obj2.port = "80";
          } else if (/^(http|ws)s$/.test(obj2.protocol)) {
            obj2.port = "443";
          }
        }
        obj2.path = obj2.path || "/";
        var ipv6 = obj2.host.indexOf(":") !== -1;
        var host = ipv6 ? "[" + obj2.host + "]" : obj2.host;
        obj2.id = obj2.protocol + "://" + host + ":" + obj2.port + path;
        obj2.href = obj2.protocol + "://" + host + (loc && loc.port === obj2.port ? "" : ":" + obj2.port);
        return obj2;
      }
      var withNativeArrayBuffer = typeof ArrayBuffer === "function";
      var isView = function isView2(obj2) {
        return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj2) : obj2.buffer instanceof ArrayBuffer;
      };
      var toString = Object.prototype.toString;
      var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
      var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
      function isBinary(obj2) {
        return withNativeArrayBuffer && (obj2 instanceof ArrayBuffer || isView(obj2)) || withNativeBlob && obj2 instanceof Blob || withNativeFile && obj2 instanceof File;
      }
      function hasBinary(obj2, toJSON) {
        if (!obj2 || _typeof(obj2) !== "object") {
          return false;
        }
        if (Array.isArray(obj2)) {
          for (var i2 = 0, l = obj2.length; i2 < l; i2++) {
            if (hasBinary(obj2[i2])) {
              return true;
            }
          }
          return false;
        }
        if (isBinary(obj2)) {
          return true;
        }
        if (obj2.toJSON && typeof obj2.toJSON === "function" && arguments.length === 1) {
          return hasBinary(obj2.toJSON(), true);
        }
        for (var key in obj2) {
          if (Object.prototype.hasOwnProperty.call(obj2, key) && hasBinary(obj2[key])) {
            return true;
          }
        }
        return false;
      }
      function deconstructPacket(packet) {
        var buffers = [];
        var packetData = packet.data;
        var pack = packet;
        pack.data = _deconstructPacket(packetData, buffers);
        pack.attachments = buffers.length;
        return {
          packet: pack,
          buffers
        };
      }
      function _deconstructPacket(data, buffers) {
        if (!data)
          return data;
        if (isBinary(data)) {
          var placeholder = {
            _placeholder: true,
            num: buffers.length
          };
          buffers.push(data);
          return placeholder;
        } else if (Array.isArray(data)) {
          var newData = new Array(data.length);
          for (var i2 = 0; i2 < data.length; i2++) {
            newData[i2] = _deconstructPacket(data[i2], buffers);
          }
          return newData;
        } else if (_typeof(data) === "object" && !(data instanceof Date)) {
          var _newData = {};
          for (var key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
              _newData[key] = _deconstructPacket(data[key], buffers);
            }
          }
          return _newData;
        }
        return data;
      }
      function reconstructPacket(packet, buffers) {
        packet.data = _reconstructPacket(packet.data, buffers);
        packet.attachments = void 0;
        return packet;
      }
      function _reconstructPacket(data, buffers) {
        if (!data)
          return data;
        if (data && data._placeholder === true) {
          var isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
          if (isIndexValid) {
            return buffers[data.num];
          } else {
            throw new Error("illegal attachments");
          }
        } else if (Array.isArray(data)) {
          for (var i2 = 0; i2 < data.length; i2++) {
            data[i2] = _reconstructPacket(data[i2], buffers);
          }
        } else if (_typeof(data) === "object") {
          for (var key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
              data[key] = _reconstructPacket(data[key], buffers);
            }
          }
        }
        return data;
      }
      var protocol = 5;
      var PacketType;
      (function(PacketType2) {
        PacketType2[PacketType2["CONNECT"] = 0] = "CONNECT";
        PacketType2[PacketType2["DISCONNECT"] = 1] = "DISCONNECT";
        PacketType2[PacketType2["EVENT"] = 2] = "EVENT";
        PacketType2[PacketType2["ACK"] = 3] = "ACK";
        PacketType2[PacketType2["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
        PacketType2[PacketType2["BINARY_EVENT"] = 5] = "BINARY_EVENT";
        PacketType2[PacketType2["BINARY_ACK"] = 6] = "BINARY_ACK";
      })(PacketType || (PacketType = {}));
      var Encoder = /* @__PURE__ */ function() {
        function Encoder2(replacer) {
          _classCallCheck(this, Encoder2);
          this.replacer = replacer;
        }
        _createClass(Encoder2, [{
          key: "encode",
          value: function encode2(obj2) {
            if (obj2.type === PacketType.EVENT || obj2.type === PacketType.ACK) {
              if (hasBinary(obj2)) {
                obj2.type = obj2.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK;
                return this.encodeAsBinary(obj2);
              }
            }
            return [this.encodeAsString(obj2)];
          }
          /**
           * Encode packet as string.
           */
        }, {
          key: "encodeAsString",
          value: function encodeAsString(obj2) {
            var str = "" + obj2.type;
            if (obj2.type === PacketType.BINARY_EVENT || obj2.type === PacketType.BINARY_ACK) {
              str += obj2.attachments + "-";
            }
            if (obj2.nsp && "/" !== obj2.nsp) {
              str += obj2.nsp + ",";
            }
            if (null != obj2.id) {
              str += obj2.id;
            }
            if (null != obj2.data) {
              str += JSON.stringify(obj2.data, this.replacer);
            }
            return str;
          }
          /**
           * Encode packet as 'buffer sequence' by removing blobs, and
           * deconstructing packet into object with placeholders and
           * a list of buffers.
           */
        }, {
          key: "encodeAsBinary",
          value: function encodeAsBinary(obj2) {
            var deconstruction = deconstructPacket(obj2);
            var pack = this.encodeAsString(deconstruction.packet);
            var buffers = deconstruction.buffers;
            buffers.unshift(pack);
            return buffers;
          }
        }]);
        return Encoder2;
      }();
      var Decoder = /* @__PURE__ */ function(_Emitter) {
        _inherits(Decoder2, _Emitter);
        var _super = _createSuper(Decoder2);
        function Decoder2(reviver) {
          var _this;
          _classCallCheck(this, Decoder2);
          _this = _super.call(this);
          _this.reviver = reviver;
          return _this;
        }
        _createClass(Decoder2, [{
          key: "add",
          value: function add(obj2) {
            var packet;
            if (typeof obj2 === "string") {
              if (this.reconstructor) {
                throw new Error("got plaintext data when reconstructing a packet");
              }
              packet = this.decodeString(obj2);
              if (packet.type === PacketType.BINARY_EVENT || packet.type === PacketType.BINARY_ACK) {
                this.reconstructor = new BinaryReconstructor(packet);
                if (packet.attachments === 0) {
                  _get(_getPrototypeOf(Decoder2.prototype), "emitReserved", this).call(this, "decoded", packet);
                }
              } else {
                _get(_getPrototypeOf(Decoder2.prototype), "emitReserved", this).call(this, "decoded", packet);
              }
            } else if (isBinary(obj2) || obj2.base64) {
              if (!this.reconstructor) {
                throw new Error("got binary data when not reconstructing a packet");
              } else {
                packet = this.reconstructor.takeBinaryData(obj2);
                if (packet) {
                  this.reconstructor = null;
                  _get(_getPrototypeOf(Decoder2.prototype), "emitReserved", this).call(this, "decoded", packet);
                }
              }
            } else {
              throw new Error("Unknown type: " + obj2);
            }
          }
          /**
           * Decode a packet String (JSON data)
           *
           * @param {String} str
           * @return {Object} packet
           */
        }, {
          key: "decodeString",
          value: function decodeString(str) {
            var i2 = 0;
            var p = {
              type: Number(str.charAt(0))
            };
            if (PacketType[p.type] === void 0) {
              throw new Error("unknown packet type " + p.type);
            }
            if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
              var start = i2 + 1;
              while (str.charAt(++i2) !== "-" && i2 != str.length) {
              }
              var buf = str.substring(start, i2);
              if (buf != Number(buf) || str.charAt(i2) !== "-") {
                throw new Error("Illegal attachments");
              }
              p.attachments = Number(buf);
            }
            if ("/" === str.charAt(i2 + 1)) {
              var _start = i2 + 1;
              while (++i2) {
                var c = str.charAt(i2);
                if ("," === c)
                  break;
                if (i2 === str.length)
                  break;
              }
              p.nsp = str.substring(_start, i2);
            } else {
              p.nsp = "/";
            }
            var next = str.charAt(i2 + 1);
            if ("" !== next && Number(next) == next) {
              var _start2 = i2 + 1;
              while (++i2) {
                var _c = str.charAt(i2);
                if (null == _c || Number(_c) != _c) {
                  --i2;
                  break;
                }
                if (i2 === str.length)
                  break;
              }
              p.id = Number(str.substring(_start2, i2 + 1));
            }
            if (str.charAt(++i2)) {
              var payload = this.tryParse(str.substr(i2));
              if (Decoder2.isPayloadValid(p.type, payload)) {
                p.data = payload;
              } else {
                throw new Error("invalid payload");
              }
            }
            return p;
          }
        }, {
          key: "tryParse",
          value: function tryParse(str) {
            try {
              return JSON.parse(str, this.reviver);
            } catch (e) {
              return false;
            }
          }
        }, {
          key: "destroy",
          value: (
            /**
             * Deallocates a parser's resources
             */
            function destroy() {
              if (this.reconstructor) {
                this.reconstructor.finishedReconstruction();
              }
            }
          )
        }], [{
          key: "isPayloadValid",
          value: function isPayloadValid(type, payload) {
            switch (type) {
              case PacketType.CONNECT:
                return _typeof(payload) === "object";
              case PacketType.DISCONNECT:
                return payload === void 0;
              case PacketType.CONNECT_ERROR:
                return typeof payload === "string" || _typeof(payload) === "object";
              case PacketType.EVENT:
              case PacketType.BINARY_EVENT:
                return Array.isArray(payload) && payload.length > 0;
              case PacketType.ACK:
              case PacketType.BINARY_ACK:
                return Array.isArray(payload);
            }
          }
        }]);
        return Decoder2;
      }(Emitter);
      var BinaryReconstructor = /* @__PURE__ */ function() {
        function BinaryReconstructor2(packet) {
          _classCallCheck(this, BinaryReconstructor2);
          this.packet = packet;
          this.buffers = [];
          this.reconPack = packet;
        }
        _createClass(BinaryReconstructor2, [{
          key: "takeBinaryData",
          value: function takeBinaryData(binData) {
            this.buffers.push(binData);
            if (this.buffers.length === this.reconPack.attachments) {
              var packet = reconstructPacket(this.reconPack, this.buffers);
              this.finishedReconstruction();
              return packet;
            }
            return null;
          }
          /**
           * Cleans up binary packet reconstruction variables.
           */
        }, {
          key: "finishedReconstruction",
          value: function finishedReconstruction() {
            this.reconPack = null;
            this.buffers = [];
          }
        }]);
        return BinaryReconstructor2;
      }();
      var parser = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        protocol,
        get PacketType() {
          return PacketType;
        },
        Encoder,
        Decoder
      });
      function on(obj2, ev, fn) {
        obj2.on(ev, fn);
        return function subDestroy() {
          obj2.off(ev, fn);
        };
      }
      var RESERVED_EVENTS = Object.freeze({
        connect: 1,
        connect_error: 1,
        disconnect: 1,
        disconnecting: 1,
        // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
        newListener: 1,
        removeListener: 1
      });
      var Socket = /* @__PURE__ */ function(_Emitter) {
        _inherits(Socket2, _Emitter);
        var _super = _createSuper(Socket2);
        function Socket2(io2, nsp, opts) {
          var _this;
          _classCallCheck(this, Socket2);
          _this = _super.call(this);
          _this.connected = false;
          _this.receiveBuffer = [];
          _this.sendBuffer = [];
          _this.ids = 0;
          _this.acks = {};
          _this.flags = {};
          _this.io = io2;
          _this.nsp = nsp;
          if (opts && opts.auth) {
            _this.auth = opts.auth;
          }
          if (_this.io._autoConnect)
            _this.open();
          return _this;
        }
        _createClass(Socket2, [{
          key: "disconnected",
          get: function get() {
            return !this.connected;
          }
          /**
           * Subscribe to open, close and packet events
           *
           * @private
           */
        }, {
          key: "subEvents",
          value: function subEvents() {
            if (this.subs)
              return;
            var io2 = this.io;
            this.subs = [on(io2, "open", this.onopen.bind(this)), on(io2, "packet", this.onpacket.bind(this)), on(io2, "error", this.onerror.bind(this)), on(io2, "close", this.onclose.bind(this))];
          }
          /**
           * Whether the Socket will try to reconnect when its Manager connects or reconnects.
           *
           * @example
           * const socket = io();
           *
           * console.log(socket.active); // true
           *
           * socket.on("disconnect", (reason) => {
           *   if (reason === "io server disconnect") {
           *     // the disconnection was initiated by the server, you need to manually reconnect
           *     console.log(socket.active); // false
           *   }
           *   // else the socket will automatically try to reconnect
           *   console.log(socket.active); // true
           * });
           */
        }, {
          key: "active",
          get: function get() {
            return !!this.subs;
          }
          /**
           * "Opens" the socket.
           *
           * @example
           * const socket = io({
           *   autoConnect: false
           * });
           *
           * socket.connect();
           */
        }, {
          key: "connect",
          value: function connect2() {
            if (this.connected)
              return this;
            this.subEvents();
            if (!this.io["_reconnecting"])
              this.io.open();
            if ("open" === this.io._readyState)
              this.onopen();
            return this;
          }
          /**
           * Alias for {@link connect()}.
           */
        }, {
          key: "open",
          value: function open() {
            return this.connect();
          }
          /**
           * Sends a `message` event.
           *
           * This method mimics the WebSocket.send() method.
           *
           * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
           *
           * @example
           * socket.send("hello");
           *
           * // this is equivalent to
           * socket.emit("message", "hello");
           *
           * @return self
           */
        }, {
          key: "send",
          value: function send2() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            args.unshift("message");
            this.emit.apply(this, args);
            return this;
          }
          /**
           * Override `emit`.
           * If the event is in `events`, it's emitted normally.
           *
           * @example
           * socket.emit("hello", "world");
           *
           * // all serializable datastructures are supported (no need to call JSON.stringify)
           * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
           *
           * // with an acknowledgement from the server
           * socket.emit("hello", "world", (val) => {
           *   // ...
           * });
           *
           * @return self
           */
        }, {
          key: "emit",
          value: function emit(ev) {
            if (RESERVED_EVENTS.hasOwnProperty(ev)) {
              throw new Error('"' + ev.toString() + '" is a reserved event name');
            }
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            args.unshift(ev);
            var packet = {
              type: PacketType.EVENT,
              data: args
            };
            packet.options = {};
            packet.options.compress = this.flags.compress !== false;
            if ("function" === typeof args[args.length - 1]) {
              var id = this.ids++;
              var ack = args.pop();
              this._registerAckCallback(id, ack);
              packet.id = id;
            }
            var isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
            var discardPacket = this.flags["volatile"] && (!isTransportWritable || !this.connected);
            if (discardPacket)
              ;
            else if (this.connected) {
              this.notifyOutgoingListeners(packet);
              this.packet(packet);
            } else {
              this.sendBuffer.push(packet);
            }
            this.flags = {};
            return this;
          }
          /**
           * @private
           */
        }, {
          key: "_registerAckCallback",
          value: function _registerAckCallback(id, ack) {
            var _this2 = this;
            var timeout = this.flags.timeout;
            if (timeout === void 0) {
              this.acks[id] = ack;
              return;
            }
            var timer = this.io.setTimeoutFn(function() {
              delete _this2.acks[id];
              for (var i2 = 0; i2 < _this2.sendBuffer.length; i2++) {
                if (_this2.sendBuffer[i2].id === id) {
                  _this2.sendBuffer.splice(i2, 1);
                }
              }
              ack.call(_this2, new Error("operation has timed out"));
            }, timeout);
            this.acks[id] = function() {
              _this2.io.clearTimeoutFn(timer);
              for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
              }
              ack.apply(_this2, [null].concat(args));
            };
          }
          /**
           * Sends a packet.
           *
           * @param packet
           * @private
           */
        }, {
          key: "packet",
          value: function packet(_packet) {
            _packet.nsp = this.nsp;
            this.io._packet(_packet);
          }
          /**
           * Called upon engine `open`.
           *
           * @private
           */
        }, {
          key: "onopen",
          value: function onopen() {
            var _this3 = this;
            if (typeof this.auth == "function") {
              this.auth(function(data) {
                _this3.packet({
                  type: PacketType.CONNECT,
                  data
                });
              });
            } else {
              this.packet({
                type: PacketType.CONNECT,
                data: this.auth
              });
            }
          }
          /**
           * Called upon engine or manager `error`.
           *
           * @param err
           * @private
           */
        }, {
          key: "onerror",
          value: function onerror(err) {
            if (!this.connected) {
              this.emitReserved("connect_error", err);
            }
          }
          /**
           * Called upon engine `close`.
           *
           * @param reason
           * @param description
           * @private
           */
        }, {
          key: "onclose",
          value: function onclose(reason, description) {
            this.connected = false;
            delete this.id;
            this.emitReserved("disconnect", reason, description);
          }
          /**
           * Called with socket packet.
           *
           * @param packet
           * @private
           */
        }, {
          key: "onpacket",
          value: function onpacket(packet) {
            var sameNamespace = packet.nsp === this.nsp;
            if (!sameNamespace)
              return;
            switch (packet.type) {
              case PacketType.CONNECT:
                if (packet.data && packet.data.sid) {
                  var id = packet.data.sid;
                  this.onconnect(id);
                } else {
                  this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                }
                break;
              case PacketType.EVENT:
              case PacketType.BINARY_EVENT:
                this.onevent(packet);
                break;
              case PacketType.ACK:
              case PacketType.BINARY_ACK:
                this.onack(packet);
                break;
              case PacketType.DISCONNECT:
                this.ondisconnect();
                break;
              case PacketType.CONNECT_ERROR:
                this.destroy();
                var err = new Error(packet.data.message);
                err.data = packet.data.data;
                this.emitReserved("connect_error", err);
                break;
            }
          }
          /**
           * Called upon a server event.
           *
           * @param packet
           * @private
           */
        }, {
          key: "onevent",
          value: function onevent(packet) {
            var args = packet.data || [];
            if (null != packet.id) {
              args.push(this.ack(packet.id));
            }
            if (this.connected) {
              this.emitEvent(args);
            } else {
              this.receiveBuffer.push(Object.freeze(args));
            }
          }
        }, {
          key: "emitEvent",
          value: function emitEvent(args) {
            if (this._anyListeners && this._anyListeners.length) {
              var listeners = this._anyListeners.slice();
              var _iterator = _createForOfIteratorHelper(listeners), _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                  var listener = _step.value;
                  listener.apply(this, args);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }
            _get(_getPrototypeOf(Socket2.prototype), "emit", this).apply(this, args);
          }
          /**
           * Produces an ack callback to emit with an event.
           *
           * @private
           */
        }, {
          key: "ack",
          value: function ack(id) {
            var self2 = this;
            var sent = false;
            return function() {
              if (sent)
                return;
              sent = true;
              for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
              }
              self2.packet({
                type: PacketType.ACK,
                id,
                data: args
              });
            };
          }
          /**
           * Called upon a server acknowlegement.
           *
           * @param packet
           * @private
           */
        }, {
          key: "onack",
          value: function onack(packet) {
            var ack = this.acks[packet.id];
            if ("function" === typeof ack) {
              ack.apply(this, packet.data);
              delete this.acks[packet.id];
            }
          }
          /**
           * Called upon server connect.
           *
           * @private
           */
        }, {
          key: "onconnect",
          value: function onconnect(id) {
            this.id = id;
            this.connected = true;
            this.emitBuffered();
            this.emitReserved("connect");
          }
          /**
           * Emit buffered events (received and emitted).
           *
           * @private
           */
        }, {
          key: "emitBuffered",
          value: function emitBuffered() {
            var _this4 = this;
            this.receiveBuffer.forEach(function(args) {
              return _this4.emitEvent(args);
            });
            this.receiveBuffer = [];
            this.sendBuffer.forEach(function(packet) {
              _this4.notifyOutgoingListeners(packet);
              _this4.packet(packet);
            });
            this.sendBuffer = [];
          }
          /**
           * Called upon server disconnect.
           *
           * @private
           */
        }, {
          key: "ondisconnect",
          value: function ondisconnect() {
            this.destroy();
            this.onclose("io server disconnect");
          }
          /**
           * Called upon forced client/server side disconnections,
           * this method ensures the manager stops tracking us and
           * that reconnections don't get triggered for this.
           *
           * @private
           */
        }, {
          key: "destroy",
          value: function destroy() {
            if (this.subs) {
              this.subs.forEach(function(subDestroy) {
                return subDestroy();
              });
              this.subs = void 0;
            }
            this.io["_destroy"](this);
          }
          /**
           * Disconnects the socket manually. In that case, the socket will not try to reconnect.
           *
           * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
           *
           * @example
           * const socket = io();
           *
           * socket.on("disconnect", (reason) => {
           *   // console.log(reason); prints "io client disconnect"
           * });
           *
           * socket.disconnect();
           *
           * @return self
           */
        }, {
          key: "disconnect",
          value: function disconnect2() {
            if (this.connected) {
              this.packet({
                type: PacketType.DISCONNECT
              });
            }
            this.destroy();
            if (this.connected) {
              this.onclose("io client disconnect");
            }
            return this;
          }
          /**
           * Alias for {@link disconnect()}.
           *
           * @return self
           */
        }, {
          key: "close",
          value: function close() {
            return this.disconnect();
          }
          /**
           * Sets the compress flag.
           *
           * @example
           * socket.compress(false).emit("hello");
           *
           * @param compress - if `true`, compresses the sending data
           * @return self
           */
        }, {
          key: "compress",
          value: function compress(_compress) {
            this.flags.compress = _compress;
            return this;
          }
          /**
           * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
           * ready to send messages.
           *
           * @example
           * socket.volatile.emit("hello"); // the server may or may not receive it
           *
           * @returns self
           */
        }, {
          key: "volatile",
          get: function get() {
            this.flags["volatile"] = true;
            return this;
          }
          /**
           * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
           * given number of milliseconds have elapsed without an acknowledgement from the server:
           *
           * @example
           * socket.timeout(5000).emit("my-event", (err) => {
           *   if (err) {
           *     // the server did not acknowledge the event in the given delay
           *   }
           * });
           *
           * @returns self
           */
        }, {
          key: "timeout",
          value: function timeout(_timeout) {
            this.flags.timeout = _timeout;
            return this;
          }
          /**
           * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
           * callback.
           *
           * @example
           * socket.onAny((event, ...args) => {
           *   console.log(`got ${event}`);
           * });
           *
           * @param listener
           */
        }, {
          key: "onAny",
          value: function onAny(listener) {
            this._anyListeners = this._anyListeners || [];
            this._anyListeners.push(listener);
            return this;
          }
          /**
           * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
           * callback. The listener is added to the beginning of the listeners array.
           *
           * @example
           * socket.prependAny((event, ...args) => {
           *   console.log(`got event ${event}`);
           * });
           *
           * @param listener
           */
        }, {
          key: "prependAny",
          value: function prependAny(listener) {
            this._anyListeners = this._anyListeners || [];
            this._anyListeners.unshift(listener);
            return this;
          }
          /**
           * Removes the listener that will be fired when any event is emitted.
           *
           * @example
           * const catchAllListener = (event, ...args) => {
           *   console.log(`got event ${event}`);
           * }
           *
           * socket.onAny(catchAllListener);
           *
           * // remove a specific listener
           * socket.offAny(catchAllListener);
           *
           * // or remove all listeners
           * socket.offAny();
           *
           * @param listener
           */
        }, {
          key: "offAny",
          value: function offAny(listener) {
            if (!this._anyListeners) {
              return this;
            }
            if (listener) {
              var listeners = this._anyListeners;
              for (var i2 = 0; i2 < listeners.length; i2++) {
                if (listener === listeners[i2]) {
                  listeners.splice(i2, 1);
                  return this;
                }
              }
            } else {
              this._anyListeners = [];
            }
            return this;
          }
          /**
           * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
           * e.g. to remove listeners.
           */
        }, {
          key: "listenersAny",
          value: function listenersAny() {
            return this._anyListeners || [];
          }
          /**
           * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
           * callback.
           *
           * Note: acknowledgements sent to the server are not included.
           *
           * @example
           * socket.onAnyOutgoing((event, ...args) => {
           *   console.log(`sent event ${event}`);
           * });
           *
           * @param listener
           */
        }, {
          key: "onAnyOutgoing",
          value: function onAnyOutgoing(listener) {
            this._anyOutgoingListeners = this._anyOutgoingListeners || [];
            this._anyOutgoingListeners.push(listener);
            return this;
          }
          /**
           * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
           * callback. The listener is added to the beginning of the listeners array.
           *
           * Note: acknowledgements sent to the server are not included.
           *
           * @example
           * socket.prependAnyOutgoing((event, ...args) => {
           *   console.log(`sent event ${event}`);
           * });
           *
           * @param listener
           */
        }, {
          key: "prependAnyOutgoing",
          value: function prependAnyOutgoing(listener) {
            this._anyOutgoingListeners = this._anyOutgoingListeners || [];
            this._anyOutgoingListeners.unshift(listener);
            return this;
          }
          /**
           * Removes the listener that will be fired when any event is emitted.
           *
           * @example
           * const catchAllListener = (event, ...args) => {
           *   console.log(`sent event ${event}`);
           * }
           *
           * socket.onAnyOutgoing(catchAllListener);
           *
           * // remove a specific listener
           * socket.offAnyOutgoing(catchAllListener);
           *
           * // or remove all listeners
           * socket.offAnyOutgoing();
           *
           * @param [listener] - the catch-all listener (optional)
           */
        }, {
          key: "offAnyOutgoing",
          value: function offAnyOutgoing(listener) {
            if (!this._anyOutgoingListeners) {
              return this;
            }
            if (listener) {
              var listeners = this._anyOutgoingListeners;
              for (var i2 = 0; i2 < listeners.length; i2++) {
                if (listener === listeners[i2]) {
                  listeners.splice(i2, 1);
                  return this;
                }
              }
            } else {
              this._anyOutgoingListeners = [];
            }
            return this;
          }
          /**
           * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
           * e.g. to remove listeners.
           */
        }, {
          key: "listenersAnyOutgoing",
          value: function listenersAnyOutgoing() {
            return this._anyOutgoingListeners || [];
          }
          /**
           * Notify the listeners for each packet sent
           *
           * @param packet
           *
           * @private
           */
        }, {
          key: "notifyOutgoingListeners",
          value: function notifyOutgoingListeners(packet) {
            if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
              var listeners = this._anyOutgoingListeners.slice();
              var _iterator2 = _createForOfIteratorHelper(listeners), _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                  var listener = _step2.value;
                  listener.apply(this, packet.data);
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
          }
        }]);
        return Socket2;
      }(Emitter);
      function Backoff(opts) {
        opts = opts || {};
        this.ms = opts.min || 100;
        this.max = opts.max || 1e4;
        this.factor = opts.factor || 2;
        this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
        this.attempts = 0;
      }
      Backoff.prototype.duration = function() {
        var ms = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
          var rand = Math.random();
          var deviation = Math.floor(rand * this.jitter * ms);
          ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
        }
        return Math.min(ms, this.max) | 0;
      };
      Backoff.prototype.reset = function() {
        this.attempts = 0;
      };
      Backoff.prototype.setMin = function(min) {
        this.ms = min;
      };
      Backoff.prototype.setMax = function(max) {
        this.max = max;
      };
      Backoff.prototype.setJitter = function(jitter) {
        this.jitter = jitter;
      };
      var Manager = /* @__PURE__ */ function(_Emitter) {
        _inherits(Manager2, _Emitter);
        var _super = _createSuper(Manager2);
        function Manager2(uri, opts) {
          var _this;
          _classCallCheck(this, Manager2);
          var _a;
          _this = _super.call(this);
          _this.nsps = {};
          _this.subs = [];
          if (uri && "object" === _typeof(uri)) {
            opts = uri;
            uri = void 0;
          }
          opts = opts || {};
          opts.path = opts.path || "/socket.io";
          _this.opts = opts;
          installTimerFunctions(_assertThisInitialized(_this), opts);
          _this.reconnection(opts.reconnection !== false);
          _this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
          _this.reconnectionDelay(opts.reconnectionDelay || 1e3);
          _this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
          _this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
          _this.backoff = new Backoff({
            min: _this.reconnectionDelay(),
            max: _this.reconnectionDelayMax(),
            jitter: _this.randomizationFactor()
          });
          _this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
          _this._readyState = "closed";
          _this.uri = uri;
          var _parser = opts.parser || parser;
          _this.encoder = new _parser.Encoder();
          _this.decoder = new _parser.Decoder();
          _this._autoConnect = opts.autoConnect !== false;
          if (_this._autoConnect)
            _this.open();
          return _this;
        }
        _createClass(Manager2, [{
          key: "reconnection",
          value: function reconnection(v) {
            if (!arguments.length)
              return this._reconnection;
            this._reconnection = !!v;
            return this;
          }
        }, {
          key: "reconnectionAttempts",
          value: function reconnectionAttempts(v) {
            if (v === void 0)
              return this._reconnectionAttempts;
            this._reconnectionAttempts = v;
            return this;
          }
        }, {
          key: "reconnectionDelay",
          value: function reconnectionDelay(v) {
            var _a;
            if (v === void 0)
              return this._reconnectionDelay;
            this._reconnectionDelay = v;
            (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
            return this;
          }
        }, {
          key: "randomizationFactor",
          value: function randomizationFactor(v) {
            var _a;
            if (v === void 0)
              return this._randomizationFactor;
            this._randomizationFactor = v;
            (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
            return this;
          }
        }, {
          key: "reconnectionDelayMax",
          value: function reconnectionDelayMax(v) {
            var _a;
            if (v === void 0)
              return this._reconnectionDelayMax;
            this._reconnectionDelayMax = v;
            (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
            return this;
          }
        }, {
          key: "timeout",
          value: function timeout(v) {
            if (!arguments.length)
              return this._timeout;
            this._timeout = v;
            return this;
          }
          /**
           * Starts trying to reconnect if reconnection is enabled and we have not
           * started reconnecting yet
           *
           * @private
           */
        }, {
          key: "maybeReconnectOnOpen",
          value: function maybeReconnectOnOpen() {
            if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
              this.reconnect();
            }
          }
          /**
           * Sets the current transport `socket`.
           *
           * @param {Function} fn - optional, callback
           * @return self
           * @public
           */
        }, {
          key: "open",
          value: function open(fn) {
            var _this2 = this;
            if (~this._readyState.indexOf("open"))
              return this;
            this.engine = new Socket$1(this.uri, this.opts);
            var socket2 = this.engine;
            var self2 = this;
            this._readyState = "opening";
            this.skipReconnect = false;
            var openSubDestroy = on(socket2, "open", function() {
              self2.onopen();
              fn && fn();
            });
            var errorSub = on(socket2, "error", function(err) {
              self2.cleanup();
              self2._readyState = "closed";
              _this2.emitReserved("error", err);
              if (fn) {
                fn(err);
              } else {
                self2.maybeReconnectOnOpen();
              }
            });
            if (false !== this._timeout) {
              var timeout = this._timeout;
              if (timeout === 0) {
                openSubDestroy();
              }
              var timer = this.setTimeoutFn(function() {
                openSubDestroy();
                socket2.close();
                socket2.emit("error", new Error("timeout"));
              }, timeout);
              if (this.opts.autoUnref) {
                timer.unref();
              }
              this.subs.push(function subDestroy() {
                clearTimeout(timer);
              });
            }
            this.subs.push(openSubDestroy);
            this.subs.push(errorSub);
            return this;
          }
          /**
           * Alias for open()
           *
           * @return self
           * @public
           */
        }, {
          key: "connect",
          value: function connect2(fn) {
            return this.open(fn);
          }
          /**
           * Called upon transport open.
           *
           * @private
           */
        }, {
          key: "onopen",
          value: function onopen() {
            this.cleanup();
            this._readyState = "open";
            this.emitReserved("open");
            var socket2 = this.engine;
            this.subs.push(on(socket2, "ping", this.onping.bind(this)), on(socket2, "data", this.ondata.bind(this)), on(socket2, "error", this.onerror.bind(this)), on(socket2, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
          }
          /**
           * Called upon a ping.
           *
           * @private
           */
        }, {
          key: "onping",
          value: function onping() {
            this.emitReserved("ping");
          }
          /**
           * Called with data.
           *
           * @private
           */
        }, {
          key: "ondata",
          value: function ondata(data) {
            try {
              this.decoder.add(data);
            } catch (e) {
              this.onclose("parse error", e);
            }
          }
          /**
           * Called when parser fully decodes a packet.
           *
           * @private
           */
        }, {
          key: "ondecoded",
          value: function ondecoded(packet) {
            var _this3 = this;
            nextTick(function() {
              _this3.emitReserved("packet", packet);
            }, this.setTimeoutFn);
          }
          /**
           * Called upon socket error.
           *
           * @private
           */
        }, {
          key: "onerror",
          value: function onerror(err) {
            this.emitReserved("error", err);
          }
          /**
           * Creates a new socket for the given `nsp`.
           *
           * @return {Socket}
           * @public
           */
        }, {
          key: "socket",
          value: function socket2(nsp, opts) {
            var socket3 = this.nsps[nsp];
            if (!socket3) {
              socket3 = new Socket(this, nsp, opts);
              this.nsps[nsp] = socket3;
            }
            return socket3;
          }
          /**
           * Called upon a socket close.
           *
           * @param socket
           * @private
           */
        }, {
          key: "_destroy",
          value: function _destroy(socket2) {
            var nsps = Object.keys(this.nsps);
            for (var _i = 0, _nsps = nsps; _i < _nsps.length; _i++) {
              var nsp = _nsps[_i];
              var _socket = this.nsps[nsp];
              if (_socket.active) {
                return;
              }
            }
            this._close();
          }
          /**
           * Writes a packet.
           *
           * @param packet
           * @private
           */
        }, {
          key: "_packet",
          value: function _packet(packet) {
            var encodedPackets = this.encoder.encode(packet);
            for (var i2 = 0; i2 < encodedPackets.length; i2++) {
              this.engine.write(encodedPackets[i2], packet.options);
            }
          }
          /**
           * Clean up transport subscriptions and packet buffer.
           *
           * @private
           */
        }, {
          key: "cleanup",
          value: function cleanup() {
            this.subs.forEach(function(subDestroy) {
              return subDestroy();
            });
            this.subs.length = 0;
            this.decoder.destroy();
          }
          /**
           * Close the current socket.
           *
           * @private
           */
        }, {
          key: "_close",
          value: function _close() {
            this.skipReconnect = true;
            this._reconnecting = false;
            this.onclose("forced close");
            if (this.engine)
              this.engine.close();
          }
          /**
           * Alias for close()
           *
           * @private
           */
        }, {
          key: "disconnect",
          value: function disconnect2() {
            return this._close();
          }
          /**
           * Called upon engine close.
           *
           * @private
           */
        }, {
          key: "onclose",
          value: function onclose(reason, description) {
            this.cleanup();
            this.backoff.reset();
            this._readyState = "closed";
            this.emitReserved("close", reason, description);
            if (this._reconnection && !this.skipReconnect) {
              this.reconnect();
            }
          }
          /**
           * Attempt a reconnection.
           *
           * @private
           */
        }, {
          key: "reconnect",
          value: function reconnect() {
            var _this4 = this;
            if (this._reconnecting || this.skipReconnect)
              return this;
            var self2 = this;
            if (this.backoff.attempts >= this._reconnectionAttempts) {
              this.backoff.reset();
              this.emitReserved("reconnect_failed");
              this._reconnecting = false;
            } else {
              var delay = this.backoff.duration();
              this._reconnecting = true;
              var timer = this.setTimeoutFn(function() {
                if (self2.skipReconnect)
                  return;
                _this4.emitReserved("reconnect_attempt", self2.backoff.attempts);
                if (self2.skipReconnect)
                  return;
                self2.open(function(err) {
                  if (err) {
                    self2._reconnecting = false;
                    self2.reconnect();
                    _this4.emitReserved("reconnect_error", err);
                  } else {
                    self2.onreconnect();
                  }
                });
              }, delay);
              if (this.opts.autoUnref) {
                timer.unref();
              }
              this.subs.push(function subDestroy() {
                clearTimeout(timer);
              });
            }
          }
          /**
           * Called upon successful reconnect.
           *
           * @private
           */
        }, {
          key: "onreconnect",
          value: function onreconnect() {
            var attempt = this.backoff.attempts;
            this._reconnecting = false;
            this.backoff.reset();
            this.emitReserved("reconnect", attempt);
          }
        }]);
        return Manager2;
      }(Emitter);
      var cache = {};
      function lookup(uri, opts) {
        if (_typeof(uri) === "object") {
          opts = uri;
          uri = void 0;
        }
        opts = opts || {};
        var parsed = url(uri, opts.path || "/socket.io");
        var source = parsed.source;
        var id = parsed.id;
        var path = parsed.path;
        var sameNamespace = cache[id] && path in cache[id]["nsps"];
        var newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
        var io2;
        if (newConnection) {
          io2 = new Manager(source, opts);
        } else {
          if (!cache[id]) {
            cache[id] = new Manager(source, opts);
          }
          io2 = cache[id];
        }
        if (parsed.query && !opts.query) {
          opts.query = parsed.queryKey;
        }
        return io2.socket(parsed.path, opts);
      }
      _extends(lookup, {
        Manager,
        Socket,
        io: lookup,
        connect: lookup
      });
      return lookup;
    });
  }
});

// client.js
var client_exports = {};
__export(client_exports, {
  connect: () => connect,
  disconnect: () => disconnect,
  send: () => send
});
module.exports = __toCommonJS(client_exports);

// ../../node_modules/@domql/globals/index.js
var window2 = globalThis;
var document2 = window2.document;

// ../../node_modules/@domql/utils/types.js
var isObject = (arg) => {
  if (arg === null)
    return false;
  return typeof arg === "object" && arg.constructor === Object;
};
var isString = (arg) => typeof arg === "string";
var isFunction = (arg) => typeof arg === "function";
var isArray = (arg) => Array.isArray(arg);
var isObjectLike = (arg) => {
  if (arg === null)
    return false;
  return typeof arg === "object";
};

// ../../node_modules/@domql/utils/object.js
var exec = (param, element, state) => {
  if (isFunction(param))
    return param(element, state || element.state);
  return param;
};
var map = (obj2, extention, element) => {
  for (const e in extention) {
    obj2[e] = exec(extention[e], element);
  }
};
var merge = (element, obj2) => {
  for (const e in obj2) {
    const elementProp = element[e];
    const objProp2 = obj2[e];
    if (elementProp === void 0) {
      element[e] = objProp2;
    }
  }
  return element;
};
var deepMerge = (element, extend) => {
  for (const e in extend) {
    const elementProp = element[e];
    const extendProp = extend[e];
    if (e === "parent" || e === "props")
      continue;
    if (elementProp === void 0) {
      element[e] = extendProp;
    } else if (isObjectLike(elementProp) && isObject(extendProp)) {
      deepMerge(elementProp, extendProp);
    }
  }
  return element;
};
var clone = (obj2) => {
  const o = {};
  for (const prop2 in obj2) {
    if (prop2 === "node")
      continue;
    o[prop2] = obj2[prop2];
  }
  return o;
};
var deepClone = (obj2) => {
  if (isArray(obj2)) {
    return obj2.map(deepClone);
  }
  const o = {};
  for (const prop2 in obj2) {
    let objProp2 = obj2[prop2];
    if (prop2 === "extend" && isArray(objProp2)) {
      objProp2 = mergeArray(objProp2);
    }
    if (isArray(objProp2)) {
      o[prop2] = objProp2.map((v) => isObject(v) ? deepClone(v) : v);
    } else if (isObject(objProp2)) {
      o[prop2] = deepClone(objProp2);
    } else
      o[prop2] = objProp2;
  }
  return o;
};
var deepStringify = (obj2, stringified2 = {}) => {
  console.log(obj2);
  for (const prop2 in obj2) {
    const objProp2 = obj2[prop2];
    if (isFunction(objProp2)) {
      stringified2[prop2] = objProp2.toString();
    } else
      stringified2[prop2] = objProp2;
    if (isObject(objProp2))
      deepStringify(stringified2[prop2], stringified2[prop2]);
  }
  return stringified2;
};
var deepDestringify = (obj, stringified = {}) => {
  for (const prop in obj) {
    const objProp = obj[prop];
    if (isString(objProp)) {
      if (objProp.slice(0, 1) === "(") {
        try {
          stringified[prop] = eval(objProp);
        } catch (e) {
          if (e)
            stringified[prop] = objProp;
        }
      }
    } else
      stringified[prop] = objProp;
    if (isObject(objProp))
      deepDestringify(stringified[prop], stringified[prop]);
  }
  return stringified;
};
var overwrite = (element, params, options) => {
  const { ref } = element;
  const changes = {};
  for (const e in params) {
    if (e === "props")
      continue;
    const elementProp = element[e];
    const paramsProp = params[e];
    if (paramsProp) {
      ref.__cache[e] = changes[e] = elementProp;
      ref[e] = paramsProp;
    }
  }
  return changes;
};
var diff = (obj2, original, cache) => {
  const changes = cache || {};
  for (const e in obj2) {
    if (e === "ref")
      continue;
    const originalProp = original[e];
    const objProp2 = obj2[e];
    if (isObjectLike(originalProp) && isObjectLike(objProp2)) {
      changes[e] = {};
      diff(originalProp, objProp2, changes[e]);
    } else if (objProp2 !== void 0) {
      changes[e] = objProp2;
    }
  }
  return changes;
};
var overwriteObj = (params, obj2) => {
  const changes = {};
  for (const e in params) {
    const objProp2 = obj2[e];
    const paramsProp = params[e];
    if (paramsProp) {
      obj2[e] = changes[e] = objProp2;
    }
  }
  return changes;
};
var overwriteDeep = (params, obj2) => {
  for (const e in params) {
    const objProp2 = obj2[e];
    const paramsProp = params[e];
    if (isObjectLike(objProp2) && isObjectLike(paramsProp)) {
      overwriteDeep(objProp2, paramsProp);
    } else if (paramsProp !== void 0) {
      obj2[e] = paramsProp;
    }
  }
  return obj2;
};
var mergeIfExisted = (a, b) => {
  if (isObjectLike(a) && isObjectLike(b))
    return deepMerge(a, b);
  return a || b;
};
var mergeArray = (arr) => {
  return arr.reduce((a, c) => deepMerge(a, deepClone(c)), {});
};
var mergeAndCloneIfArray = (obj2) => {
  return isArray(obj2) ? mergeArray(obj2) : deepClone(obj2);
};
var flattenRecursive = (param, prop2, stack = []) => {
  const objectized = mergeAndCloneIfArray(param);
  stack.push(objectized);
  const extendOfExtend = objectized[prop2];
  if (extendOfExtend)
    flattenRecursive(extendOfExtend, prop2, stack);
  delete objectized[prop2];
  return stack;
};
var isEqualDeep = (param, element) => {
  if (param === element)
    return true;
  if (!param || !element)
    return false;
  for (const prop2 in param) {
    const paramProp = param[prop2];
    const elementProp = element[prop2];
    if (isObjectLike(paramProp)) {
      const isEqual = isEqualDeep(paramProp, elementProp);
      if (!isEqual)
        return false;
    } else {
      const isEqual = paramProp === elementProp;
      if (!isEqual)
        return false;
    }
  }
  return true;
};

// ../../node_modules/@domql/utils/node.js
var createID = function* () {
  let index = 1;
  while (index < index + 1) {
    yield index++;
  }
}();

// client.js
var import_socket_io = __toESM(require_socket_io(), 1);
var ENV = "development";
var SOCKET_BACKEND_URL = window2.location?.host.includes("local") ? "localhost:13335" : "socket.symbols.app";
var socket;
var defautlOpts = {};
var connect = (key, options = {}) => {
  const socketUrls = isArray(options.socketUrl) ? options.socketUrl : [options.socketUrl || SOCKET_BACKEND_URL];
  const primaryUrl = socketUrls[0];
  const secondaryUrl = socketUrls[1] || "socket.symbols.app";
  socket = (0, import_socket_io.default)(primaryUrl || SOCKET_BACKEND_URL);
  socket.on("connect", () => {
    if (ENV === "test" || ENV === "development") {
      console.log(
        `Connected to %c${primaryUrl || SOCKET_BACKEND_URL} %c${key} %c${socket.id}`,
        "font-weight: bold; color: green;",
        "font-weight: bold;",
        ""
      );
    }
    socket.emit("initConnect", options);
    try {
      if (isFunction(options.onConnect))
        options.onConnect(socket.id, socket);
    } catch (e) {
      console.error(e);
    }
  });
  let tryConnect = 0;
  const tryConnectMax = 1;
  socket.on("connect_error", (err) => {
    console.log(err);
    console.log(`event: connect_error | reason: ${err.message}`);
    try {
      if (isFunction(options.onError))
        options.onError(err, socket);
      if (tryConnect === tryConnectMax) {
        socket.disconnect();
        if (primaryUrl !== secondaryUrl) {
          if (ENV === "test" || ENV === "development") {
            console.log(
              "Could not connect to %c" + primaryUrl + "%c, reconnecting to %c" + secondaryUrl,
              "font-weight: bold; color: red;",
              "",
              "font-weight: bold; color: green;"
            );
          }
          connect(key, { ...options, socketUrl: secondaryUrl });
        }
      }
    } catch (e) {
      console.error(e);
    }
    tryConnect++;
  });
  socket.on("disconnect", (reason) => {
    console.log(`event: disconnect | reason: ${reason}`);
    try {
      if (isFunction(options.onDisconnect))
        options.onDisconnect(reason, socket);
    } catch (e) {
      console.error(e);
    }
  });
  socket.onAny((event, ...args) => {
    if (event === "connect")
      return;
    try {
      if (isFunction(options.onChange))
        options.onChange(event, args[0], socket);
    } catch (e) {
      console.error(e);
    }
  });
};
var send = (event = "change", changes, options) => {
  socket.emit(event, changes, { ...options, ...defautlOpts });
};
var disconnect = () => {
  socket.disconnect();
};
/*! Bundled license information:

socket.io-client/dist/socket.io.js:
  (*!
   * Socket.IO v4.5.4
   * (c) 2014-2022 Guillermo Rauch
   * Released under the MIT License.
   *)
*/
