import  * as React  from 'react';
import { Box, P, SymbolsProvider } from '@symbo.ls/react';
import { createSync } from '@symbo.ls/create';
import { css } from '@emotion/css';

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
var __copyProps = (to, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
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
var require_cjs = __commonJS({
  "../smbls/packages/scratch/dist/cjs/index.js"(exports, module2) {
    "use strict";
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __commonJS2 = (cb, mod) => function __require() {
      return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var require_cjs6 = __commonJS2({
      "../../node_modules/@domql/globals/dist/cjs/index.js"(exports2, module22) {
        "use strict";
        var __defProp22 = Object.defineProperty;
        var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
        var __getOwnPropNames22 = Object.getOwnPropertyNames;
        var __hasOwnProp22 = Object.prototype.hasOwnProperty;
        var __export22 = (target, all) => {
          for (var name in all)
            __defProp22(target, name, { get: all[name], enumerable: true });
        };
        var __copyProps22 = (to, from2, except, desc) => {
          if (from2 && typeof from2 === "object" || typeof from2 === "function") {
            for (let key of __getOwnPropNames22(from2))
              if (!__hasOwnProp22.call(to, key) && key !== except)
                __defProp22(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc22(from2, key)) || desc.enumerable });
          }
          return to;
        };
        var __toCommonJS22 = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
        var globals_exports = {};
        __export22(globals_exports, {
          document: () => document4,
          global: () => global,
          self: () => self,
          window: () => window2
        });
        module22.exports = __toCommonJS22(globals_exports);
        var global = globalThis;
        var self = globalThis;
        var window2 = globalThis;
        var document4 = window2.document;
      }
    });
    var require_key2 = __commonJS2({
      "../../node_modules/@domql/utils/dist/cjs/key.js"(exports2, module22) {
        "use strict";
        var __defProp22 = Object.defineProperty;
        var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
        var __getOwnPropNames22 = Object.getOwnPropertyNames;
        var __hasOwnProp22 = Object.prototype.hasOwnProperty;
        var __export22 = (target, all) => {
          for (var name in all)
            __defProp22(target, name, { get: all[name], enumerable: true });
        };
        var __copyProps22 = (to, from2, except, desc) => {
          if (from2 && typeof from2 === "object" || typeof from2 === "function") {
            for (let key of __getOwnPropNames22(from2))
              if (!__hasOwnProp22.call(to, key) && key !== except)
                __defProp22(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc22(from2, key)) || desc.enumerable });
          }
          return to;
        };
        var __toCommonJS22 = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
        var key_exports = {};
        __export22(key_exports, {
          createSnapshotId: () => createSnapshotId,
          generateKey: () => generateKey
        });
        module22.exports = __toCommonJS22(key_exports);
        var generateKey = function() {
          let index = 0;
          function newId() {
            index++;
            return index;
          }
          return newId;
        }();
        var createSnapshotId = generateKey;
      }
    });
    var require_env2 = __commonJS2({
      "../../node_modules/@domql/utils/dist/cjs/env.js"(exports2, module22) {
        "use strict";
        var __defProp22 = Object.defineProperty;
        var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
        var __getOwnPropNames22 = Object.getOwnPropertyNames;
        var __hasOwnProp22 = Object.prototype.hasOwnProperty;
        var __export22 = (target, all) => {
          for (var name in all)
            __defProp22(target, name, { get: all[name], enumerable: true });
        };
        var __copyProps22 = (to, from2, except, desc) => {
          if (from2 && typeof from2 === "object" || typeof from2 === "function") {
            for (let key of __getOwnPropNames22(from2))
              if (!__hasOwnProp22.call(to, key) && key !== except)
                __defProp22(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc22(from2, key)) || desc.enumerable });
          }
          return to;
        };
        var __toCommonJS22 = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
        var env_exports = {};
        __export22(env_exports, {
          NODE_ENV: () => NODE_ENV,
          getNev: () => getNev,
          isDevelopment: () => isDevelopment,
          isProduction: () => isProduction,
          isTest: () => isTest
        });
        module22.exports = __toCommonJS22(env_exports);
        var NODE_ENV = "development";
        var isProduction = (env = NODE_ENV) => env === "production" || env === "prod" || env !== "development" && env !== "dev" && env !== "test";
        var isTest = (env = NODE_ENV) => env === "test";
        var isDevelopment = (env = NODE_ENV) => env === "development" || env === "dev";
        var getNev = (key, env = NODE_ENV) => env[key];
      }
    });
    var require_globals2 = __commonJS2({
      "../../node_modules/@domql/utils/dist/cjs/globals.js"(exports2, module22) {
        "use strict";
        var __defProp22 = Object.defineProperty;
        var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
        var __getOwnPropNames22 = Object.getOwnPropertyNames;
        var __hasOwnProp22 = Object.prototype.hasOwnProperty;
        var __export22 = (target, all) => {
          for (var name in all)
            __defProp22(target, name, { get: all[name], enumerable: true });
        };
        var __copyProps22 = (to, from2, except, desc) => {
          if (from2 && typeof from2 === "object" || typeof from2 === "function") {
            for (let key of __getOwnPropNames22(from2))
              if (!__hasOwnProp22.call(to, key) && key !== except)
                __defProp22(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc22(from2, key)) || desc.enumerable });
          }
          return to;
        };
        var __toCommonJS22 = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
        var globals_exports = {};
        __export22(globals_exports, {
          document: () => document4,
          global: () => global,
          self: () => self,
          window: () => window2
        });
        module22.exports = __toCommonJS22(globals_exports);
        var global = globalThis;
        var self = globalThis;
        var window2 = globalThis;
        var document4 = window2.document;
      }
    });
    var require_node2 = __commonJS2({
      "../../node_modules/@domql/utils/dist/cjs/node.js"(exports2, module22) {
        "use strict";
        var __defProp22 = Object.defineProperty;
        var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
        var __getOwnPropNames22 = Object.getOwnPropertyNames;
        var __hasOwnProp22 = Object.prototype.hasOwnProperty;
        var __export22 = (target, all) => {
          for (var name in all)
            __defProp22(target, name, { get: all[name], enumerable: true });
        };
        var __copyProps22 = (to, from2, except, desc) => {
          if (from2 && typeof from2 === "object" || typeof from2 === "function") {
            for (let key of __getOwnPropNames22(from2))
              if (!__hasOwnProp22.call(to, key) && key !== except)
                __defProp22(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc22(from2, key)) || desc.enumerable });
          }
          return to;
        };
        var __toCommonJS22 = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
        var node_exports = {};
        __export22(node_exports, {
          isHtmlElement: () => isHtmlElement,
          isNode: () => isNode
        });
        module22.exports = __toCommonJS22(node_exports);
        var import_globals3 = require_globals2();
        var isNode = (obj) => {
          return (typeof Node === "object" ? obj instanceof import_globals3.window.Node : obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName === "string") || false;
        };
        var isHtmlElement = (obj) => {
          return (typeof HTMLElement === "object" ? obj instanceof import_globals3.window.HTMLElement : obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string") || false;
        };
      }
    });
    var require_types2 = __commonJS2({
      "../../node_modules/@domql/utils/dist/cjs/types.js"(exports2, module22) {
        "use strict";
        var __defProp22 = Object.defineProperty;
        var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
        var __getOwnPropNames22 = Object.getOwnPropertyNames;
        var __hasOwnProp22 = Object.prototype.hasOwnProperty;
        var __export22 = (target, all) => {
          for (var name in all)
            __defProp22(target, name, { get: all[name], enumerable: true });
        };
        var __copyProps22 = (to, from2, except, desc) => {
          if (from2 && typeof from2 === "object" || typeof from2 === "function") {
            for (let key of __getOwnPropNames22(from2))
              if (!__hasOwnProp22.call(to, key) && key !== except)
                __defProp22(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc22(from2, key)) || desc.enumerable });
          }
          return to;
        };
        var __toCommonJS22 = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
        var types_exports = {};
        __export22(types_exports, {
          TYPES: () => TYPES,
          is: () => is,
          isArray: () => isArray6,
          isBoolean: () => isBoolean,
          isDefined: () => isDefined2,
          isFunction: () => isFunction2,
          isNot: () => isNot2,
          isNull: () => isNull,
          isNumber: () => isNumber2,
          isObject: () => isObject7,
          isObjectLike: () => isObjectLike3,
          isString: () => isString9,
          isUndefined: () => isUndefined
        });
        module22.exports = __toCommonJS22(types_exports);
        var import_node = require_node2();
        var isObject7 = (arg) => {
          if (arg === null)
            return false;
          return typeof arg === "object" && arg.constructor === Object;
        };
        var isString9 = (arg) => typeof arg === "string";
        var isNumber2 = (arg) => typeof arg === "number";
        var isFunction2 = (arg) => typeof arg === "function";
        var isBoolean = (arg) => arg === true || arg === false;
        var isNull = (arg) => arg === null;
        var isArray6 = (arg) => Array.isArray(arg);
        var isObjectLike3 = (arg) => {
          if (arg === null)
            return false;
          return typeof arg === "object";
        };
        var isDefined2 = (arg) => {
          return isObject7(arg) || isObjectLike3(arg) || isString9(arg) || isNumber2(arg) || isFunction2(arg) || isArray6(arg) || isObjectLike3(arg) || isBoolean(arg) || isNull(arg);
        };
        var isUndefined = (arg) => {
          return arg === void 0;
        };
        var TYPES = {
          boolean: isBoolean,
          array: isArray6,
          object: isObject7,
          string: isString9,
          number: isNumber2,
          null: isNull,
          function: isFunction2,
          objectLike: isObjectLike3,
          node: import_node.isNode,
          htmlElement: import_node.isHtmlElement,
          defined: isDefined2
        };
        var is = (arg) => {
          return (...args) => {
            return args.map((val) => TYPES[val](arg)).filter((v) => v).length > 0;
          };
        };
        var isNot2 = (arg) => {
          return (...args) => {
            return args.map((val) => TYPES[val](arg)).filter((v) => v).length === 0;
          };
        };
      }
    });
    var require_array2 = __commonJS2({
      "../../node_modules/@domql/utils/dist/cjs/array.js"(exports2, module22) {
        "use strict";
        var __defProp22 = Object.defineProperty;
        var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
        var __getOwnPropNames22 = Object.getOwnPropertyNames;
        var __hasOwnProp22 = Object.prototype.hasOwnProperty;
        var __export22 = (target, all) => {
          for (var name in all)
            __defProp22(target, name, { get: all[name], enumerable: true });
        };
        var __copyProps22 = (to, from2, except, desc) => {
          if (from2 && typeof from2 === "object" || typeof from2 === "function") {
            for (let key of __getOwnPropNames22(from2))
              if (!__hasOwnProp22.call(to, key) && key !== except)
                __defProp22(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc22(from2, key)) || desc.enumerable });
          }
          return to;
        };
        var __toCommonJS22 = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
        var array_exports = {};
        __export22(array_exports, {
          arrayContainsOtherArray: () => arrayContainsOtherArray,
          createNestedObject: () => createNestedObject,
          cutArrayAfterValue: () => cutArrayAfterValue,
          cutArrayBeforeValue: () => cutArrayBeforeValue,
          joinArrays: () => joinArrays,
          mergeAndCloneIfArray: () => mergeAndCloneIfArray,
          mergeArray: () => mergeArray,
          removeFromArray: () => removeFromArray,
          swapItemsInArray: () => swapItemsInArray
        });
        module22.exports = __toCommonJS22(array_exports);
        var import_object = require_object2();
        var import_types = require_types2();
        var arrayContainsOtherArray = (arr1, arr2) => {
          return arr2.every((val) => arr1.includes(val));
        };
        var removeFromArray = (arr, index) => {
          if ((0, import_types.isString)(index))
            index = parseInt(index);
          if ((0, import_types.isNumber)(index)) {
            if (index < 0 || index >= arr.length || isNaN(index)) {
              throw new Error("Invalid index");
            }
            arr.splice(index, 1);
          } else if ((0, import_types.isArray)(index)) {
            index.forEach((idx) => removeFromArray(arr, idx));
          } else {
            throw new Error("Invalid index");
          }
          return arr;
        };
        var swapItemsInArray = (arr, i, j) => {
          [arr[i], arr[j]] = [arr[j], arr[i]];
        };
        var joinArrays = (...arrays) => {
          return [].concat(...arrays);
        };
        var mergeArray = (arr, excludeFrom = []) => {
          return arr.reduce((a, c) => (0, import_object.deepMerge)(a, (0, import_object.deepClone)(c, excludeFrom), excludeFrom), {});
        };
        var mergeAndCloneIfArray = (obj) => {
          return (0, import_types.isArray)(obj) ? mergeArray(obj) : (0, import_object.deepClone)(obj);
        };
        var cutArrayBeforeValue = (arr, value) => {
          const index = arr.indexOf(value);
          if (index !== -1) {
            return arr.slice(0, index);
          }
          return arr;
        };
        var cutArrayAfterValue = (arr, value) => {
          const index = arr.indexOf(value);
          if (index !== -1) {
            return arr.slice(index + 1);
          }
          return arr;
        };
        var createNestedObject = (arr, lastValue) => {
          const nestedObject = {};
          if (arr.length === 0) {
            return lastValue;
          }
          arr.reduce((obj, value, index) => {
            if (!obj[value]) {
              obj[value] = {};
            }
            if (index === arr.length - 1 && lastValue) {
              obj[value] = lastValue;
            }
            return obj[value];
          }, nestedObject);
          return nestedObject;
        };
      }
    });
    var require_string2 = __commonJS2({
      "../../node_modules/@domql/utils/dist/cjs/string.js"(exports2, module22) {
        "use strict";
        var __defProp22 = Object.defineProperty;
        var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
        var __getOwnPropNames22 = Object.getOwnPropertyNames;
        var __hasOwnProp22 = Object.prototype.hasOwnProperty;
        var __export22 = (target, all) => {
          for (var name in all)
            __defProp22(target, name, { get: all[name], enumerable: true });
        };
        var __copyProps22 = (to, from2, except, desc) => {
          if (from2 && typeof from2 === "object" || typeof from2 === "function") {
            for (let key of __getOwnPropNames22(from2))
              if (!__hasOwnProp22.call(to, key) && key !== except)
                __defProp22(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc22(from2, key)) || desc.enumerable });
          }
          return to;
        };
        var __toCommonJS22 = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
        var string_exports = {};
        __export22(string_exports, {
          replaceLiteralsWithObjectFields: () => replaceLiteralsWithObjectFields,
          stringIncludesAny: () => stringIncludesAny
        });
        module22.exports = __toCommonJS22(string_exports);
        var stringIncludesAny = (str, characters2) => {
          for (const char2 of characters2) {
            if (str.includes(char2)) {
              return true;
            }
          }
          return false;
        };
        var brackRegex = /\{\{\s*((?:\.\.\/)+)?([^}\s]+)\s*\}\}/g;
        var replaceLiteralsWithObjectFields = (str, state) => {
          if (!str.includes("{{"))
            return str;
          return str.replace(brackRegex, (_, parentPath, variable) => {
            if (parentPath) {
              const parentLevels = parentPath.match(/\.\.\//g).length;
              let parentState = state;
              for (let i = 0; i < parentLevels; i++) {
                parentState = parentState.parent;
                if (!parentState) {
                  return "";
                }
              }
              const value = parentState[variable.trim()];
              return value !== void 0 ? `${value}` : "";
            } else {
              const value = state[variable.trim()];
              return value !== void 0 ? `${value}` : "";
            }
          });
        };
      }
    });
    var require_object2 = __commonJS2({
      "../../node_modules/@domql/utils/dist/cjs/object.js"(exports2, module22) {
        "use strict";
        var __defProp22 = Object.defineProperty;
        var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
        var __getOwnPropNames22 = Object.getOwnPropertyNames;
        var __hasOwnProp22 = Object.prototype.hasOwnProperty;
        var __export22 = (target, all) => {
          for (var name in all)
            __defProp22(target, name, { get: all[name], enumerable: true });
        };
        var __copyProps22 = (to, from2, except, desc) => {
          if (from2 && typeof from2 === "object" || typeof from2 === "function") {
            for (let key of __getOwnPropNames22(from2))
              if (!__hasOwnProp22.call(to, key) && key !== except)
                __defProp22(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc22(from2, key)) || desc.enumerable });
          }
          return to;
        };
        var __toCommonJS22 = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
        var object_exports = {};
        __export22(object_exports, {
          clone: () => clone,
          deepClone: () => deepClone22,
          deepCloneExclude: () => deepCloneExclude,
          deepDestringify: () => deepDestringify,
          deepMerge: () => deepMerge3,
          deepStringify: () => deepStringify,
          detachFunctionsFromObject: () => detachFunctionsFromObject,
          diff: () => diff2,
          diffArrays: () => diffArrays,
          diffObjects: () => diffObjects,
          exec: () => exec2,
          flattenRecursive: () => flattenRecursive,
          isEqualDeep: () => isEqualDeep,
          map: () => map,
          merge: () => merge5,
          mergeArrayExclude: () => mergeArrayExclude,
          mergeIfExisted: () => mergeIfExisted,
          objectToString: () => objectToString,
          overwrite: () => overwrite,
          overwriteDeep: () => overwriteDeep2,
          overwriteShallow: () => overwriteShallow2,
          removeFromObject: () => removeFromObject,
          stringToObject: () => stringToObject
        });
        module22.exports = __toCommonJS22(object_exports);
        var import_globals3 = require_globals2();
        var import_types = require_types2();
        var import_array = require_array2();
        var import_string = require_string2();
        var exec2 = (param, element, state, context) => {
          if ((0, import_types.isFunction)(param)) {
            return param(
              element,
              state || element.state,
              context || element.context
            );
          }
          return param;
        };
        var map = (obj, extention, element) => {
          for (const e in extention) {
            obj[e] = exec2(extention[e], element);
          }
        };
        var merge5 = (element, obj, excludeFrom = []) => {
          for (const e in obj) {
            const hasOwnProperty = Object.prototype.hasOwnProperty.call(obj, e);
            if (!hasOwnProperty || excludeFrom.includes(e) || e.startsWith("__"))
              continue;
            const elementProp = element[e];
            const objProp = obj[e];
            if (elementProp === void 0) {
              element[e] = objProp;
            }
          }
          return element;
        };
        var deepMerge3 = (element, extend, excludeFrom = []) => {
          for (const e in extend) {
            const hasOwnProperty = Object.prototype.hasOwnProperty.call(extend, e);
            if (!hasOwnProperty || excludeFrom.includes(e) || e.startsWith("__"))
              continue;
            const elementProp = element[e];
            const extendProp = extend[e];
            if ((0, import_types.isObjectLike)(elementProp) && (0, import_types.isObjectLike)(extendProp)) {
              deepMerge3(elementProp, extendProp);
            } else if (elementProp === void 0) {
              element[e] = extendProp;
            }
          }
          return element;
        };
        var clone = (obj, excludeFrom = []) => {
          const o = {};
          for (const prop in obj) {
            const hasOwnProperty = Object.prototype.hasOwnProperty.call(obj, prop);
            if (!hasOwnProperty || excludeFrom.includes(prop) || prop.startsWith("__"))
              continue;
            o[prop] = obj[prop];
          }
          return o;
        };
        var deepCloneExclude = (obj, excludeFrom = []) => {
          if ((0, import_types.isArray)(obj)) {
            return obj.map((x) => deepCloneExclude(x, excludeFrom));
          }
          const o = {};
          for (const k in obj) {
            const hasOwnProperty = Object.prototype.hasOwnProperty.call(obj, k);
            if (!hasOwnProperty || excludeFrom.includes(k) || k.startsWith("__"))
              continue;
            let v = obj[k];
            if (k === "extend" && (0, import_types.isArray)(v)) {
              v = mergeArrayExclude(v, excludeFrom);
            }
            if ((0, import_types.isArray)(v)) {
              o[k] = v.map((x) => deepCloneExclude(x, excludeFrom));
            } else if ((0, import_types.isObject)(v)) {
              o[k] = deepCloneExclude(v, excludeFrom);
            } else
              o[k] = v;
          }
          return o;
        };
        var mergeArrayExclude = (arr, excl = []) => {
          return arr.reduce((acc, curr) => deepMerge3(acc, deepCloneExclude(curr, excl)), {});
        };
        var deepClone22 = (obj, excludeFrom = []) => {
          const o = (0, import_types.isArray)(obj) ? [] : {};
          for (const prop in obj) {
            if (prop === "__proto__")
              continue;
            if (excludeFrom.includes(prop) || prop.startsWith("__"))
              continue;
            let objProp = obj[prop];
            if (prop === "extend" && (0, import_types.isArray)(objProp)) {
              objProp = (0, import_array.mergeArray)(objProp);
            }
            if ((0, import_types.isObjectLike)(objProp)) {
              o[prop] = deepClone22(objProp, excludeFrom);
            } else
              o[prop] = objProp;
          }
          return o;
        };
        var deepStringify = (obj, stringified = {}) => {
          for (const prop in obj) {
            const objProp = obj[prop];
            if ((0, import_types.isFunction)(objProp)) {
              stringified[prop] = objProp.toString();
            } else if ((0, import_types.isObject)(objProp)) {
              stringified[prop] = {};
              deepStringify(objProp, stringified[prop]);
            } else if ((0, import_types.isArray)(objProp)) {
              stringified[prop] = [];
              objProp.forEach((v, i) => {
                if ((0, import_types.isObject)(v)) {
                  stringified[prop][i] = {};
                  deepStringify(v, stringified[prop][i]);
                } else if ((0, import_types.isFunction)(v)) {
                  stringified[prop][i] = v.toString();
                } else {
                  stringified[prop][i] = v;
                }
              });
            } else {
              stringified[prop] = objProp;
            }
          }
          return stringified;
        };
        var objectToString = (obj, indent = 0) => {
          const spaces = "  ".repeat(indent);
          let str = "{\n";
          for (const [key, value] of Object.entries(obj)) {
            const keyAllowdChars = (0, import_string.stringIncludesAny)(key, ["-", ":", "@", ".", "!"]);
            const stringedKey = keyAllowdChars ? `'${key}'` : key;
            str += `${spaces}  ${stringedKey}: `;
            if ((0, import_types.isArray)(value)) {
              str += "[\n";
              for (const element of value) {
                if ((0, import_types.isObject)(element) && element !== null) {
                  str += `${spaces}    ${objectToString(element, indent + 2)},
`;
                } else if ((0, import_types.isString)(element)) {
                  str += `${spaces}    '${element}',
`;
                } else {
                  str += `${spaces}    ${element},
`;
                }
              }
              str += `${spaces}  ]`;
            } else if ((0, import_types.isObject)(value)) {
              str += objectToString(value, indent + 1);
            } else if ((0, import_types.isString)(value)) {
              str += (0, import_string.stringIncludesAny)(value, ["\n", "'"]) ? `\`${value}\`` : `'${value}'`;
            } else {
              str += value;
            }
            str += ",\n";
          }
          str += `${spaces}}`;
          return str;
        };
        var detachFunctionsFromObject = (obj, detached = {}) => {
          for (const prop in obj) {
            const objProp = obj[prop];
            if ((0, import_types.isFunction)(objProp))
              continue;
            else if ((0, import_types.isObject)(objProp)) {
              detached[prop] = {};
              deepStringify(objProp, detached[prop]);
            } else if ((0, import_types.isArray)(objProp)) {
              detached[prop] = [];
              objProp.forEach((v, i) => {
                if ((0, import_types.isFunction)(v))
                  return;
                if ((0, import_types.isObject)(v)) {
                  detached[prop][i] = {};
                  detachFunctionsFromObject(v, detached[prop][i]);
                } else {
                  detached[prop][i] = v;
                }
              });
            } else {
              detached[prop] = objProp;
            }
          }
          return detached;
        };
        var deepDestringify = (obj, stringified = {}) => {
          for (const prop in obj) {
            const hasOwnProperty = Object.prototype.hasOwnProperty.call(obj, prop);
            if (!hasOwnProperty)
              continue;
            const objProp = obj[prop];
            if ((0, import_types.isString)(objProp)) {
              if (objProp.includes("=>") || objProp.includes("function") || objProp.startsWith("(")) {
                try {
                  const evalProp = import_globals3.window.eval(`(${objProp})`);
                  stringified[prop] = evalProp;
                } catch (e) {
                  if (e)
                    stringified[prop] = objProp;
                }
              } else {
                stringified[prop] = objProp;
              }
            } else if ((0, import_types.isArray)(objProp)) {
              stringified[prop] = [];
              objProp.forEach((arrProp) => {
                if ((0, import_types.isString)(arrProp)) {
                  if (arrProp.includes("=>") || arrProp.includes("function") || arrProp.startsWith("(")) {
                    try {
                      const evalProp = import_globals3.window.eval(`(${arrProp})`);
                      stringified[prop].push(evalProp);
                    } catch (e) {
                      if (e)
                        stringified[prop].push(arrProp);
                    }
                  } else {
                    stringified[prop].push(arrProp);
                  }
                } else if ((0, import_types.isObject)(arrProp)) {
                  stringified[prop].push(deepDestringify(arrProp));
                } else {
                  stringified[prop].push(arrProp);
                }
              });
            } else if ((0, import_types.isObject)(objProp)) {
              stringified[prop] = deepDestringify(objProp, stringified[prop]);
            } else {
              stringified[prop] = objProp;
            }
          }
          return stringified;
        };
        var stringToObject = (str) => {
          let obj;
          try {
            obj = import_globals3.window.eval("(" + str + ")");
          } catch (e) {
            console.warn(e);
          }
          if (obj)
            return obj;
        };
        var diffObjects = (original, objToDiff, cache) => {
          for (const e in objToDiff) {
            if (e === "ref")
              continue;
            const originalProp = original[e];
            const objToDiffProp = objToDiff[e];
            if ((0, import_types.isObject)(originalProp) && (0, import_types.isObject)(objToDiffProp)) {
              cache[e] = {};
              diff2(originalProp, objToDiffProp, cache[e]);
            } else if (objToDiffProp !== void 0) {
              cache[e] = objToDiffProp;
            }
          }
          return cache;
        };
        var diffArrays = (original, objToDiff, cache) => {
          if (original.length !== objToDiff.length) {
            cache = objToDiff;
          } else {
            const diffArr = [];
            for (let i = 0; i < original.length; i++) {
              const diffObj = diff2(original[i], objToDiff[i]);
              if (Object.keys(diffObj).length > 0) {
                diffArr.push(diffObj);
              }
            }
            if (diffArr.length > 0) {
              cache = diffArr;
            }
          }
          return cache;
        };
        var diff2 = (original, objToDiff, cache = {}) => {
          if ((0, import_types.isArray)(original) && (0, import_types.isArray)(objToDiff)) {
            cache = [];
            diffArrays(original, objToDiff, cache);
          } else {
            diffObjects(original, objToDiff, cache);
          }
          return cache;
        };
        var overwrite = (element, params, excludeFrom = []) => {
          const { ref } = element;
          const changes = {};
          for (const e in params) {
            if (excludeFrom.includes(e) || e.startsWith("__"))
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
        var overwriteShallow2 = (obj, params, excludeFrom = []) => {
          for (const e in params) {
            if (excludeFrom.includes(e) || e.startsWith("__"))
              continue;
            obj[e] = params[e];
          }
          return obj;
        };
        var overwriteDeep2 = (obj, params, excludeFrom = []) => {
          for (const e in params) {
            if (e === "__proto__")
              continue;
            if (excludeFrom.includes(e) || e.startsWith("__"))
              continue;
            const objProp = obj[e];
            const paramsProp = params[e];
            if ((0, import_types.isObjectLike)(objProp) && (0, import_types.isObjectLike)(paramsProp)) {
              overwriteDeep2(objProp, paramsProp);
            } else if (paramsProp !== void 0) {
              obj[e] = paramsProp;
            }
          }
          return obj;
        };
        var mergeIfExisted = (a, b) => {
          if ((0, import_types.isObjectLike)(a) && (0, import_types.isObjectLike)(b))
            return deepMerge3(a, b);
          return a || b;
        };
        var flattenRecursive = (param, prop, stack = []) => {
          const objectized = (0, import_array.mergeAndCloneIfArray)(param);
          stack.push(objectized);
          const extendOfExtend = objectized[prop];
          if (extendOfExtend)
            flattenRecursive(extendOfExtend, prop, stack);
          delete objectized[prop];
          return stack;
        };
        var isEqualDeep = (param, element) => {
          if (param === element)
            return true;
          if (!param || !element)
            return false;
          for (const prop in param) {
            const paramProp = param[prop];
            const elementProp = element[prop];
            if ((0, import_types.isObjectLike)(paramProp)) {
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
        var removeFromObject = (obj, props) => {
          if (props === void 0 || props === null)
            return obj;
          if ((0, import_types.is)(props)("string", "number")) {
            delete obj[props];
          } else if ((0, import_types.isArray)(props)) {
            props.forEach((prop) => delete obj[prop]);
          } else {
            throw new Error("Invalid input: props must be a string or an array of strings");
          }
          return obj;
        };
      }
    });
    var require_function2 = __commonJS2({
      "../../node_modules/@domql/utils/dist/cjs/function.js"(exports2, module22) {
        "use strict";
        var __defProp22 = Object.defineProperty;
        var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
        var __getOwnPropNames22 = Object.getOwnPropertyNames;
        var __hasOwnProp22 = Object.prototype.hasOwnProperty;
        var __export22 = (target, all) => {
          for (var name in all)
            __defProp22(target, name, { get: all[name], enumerable: true });
        };
        var __copyProps22 = (to, from2, except, desc) => {
          if (from2 && typeof from2 === "object" || typeof from2 === "function") {
            for (let key of __getOwnPropNames22(from2))
              if (!__hasOwnProp22.call(to, key) && key !== except)
                __defProp22(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc22(from2, key)) || desc.enumerable });
          }
          return to;
        };
        var __toCommonJS22 = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
        var function_exports = {};
        __export22(function_exports, {
          debounce: () => debounce,
          memoize: () => memoize2
        });
        module22.exports = __toCommonJS22(function_exports);
        var debounce = (element, func, timeout = 300) => {
          let timer;
          return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
              func.apply(element, args);
            }, timeout);
          };
        };
        var memoize2 = (fn) => {
          const cache = {};
          return (...args) => {
            const n = args[0];
            if (n in cache) {
              return cache[n];
            } else {
              const result = fn(n);
              cache[n] = result;
              return result;
            }
          };
        };
      }
    });
    var require_log2 = __commonJS2({
      "../../node_modules/@domql/utils/dist/cjs/log.js"(exports2, module22) {
        "use strict";
        var __defProp22 = Object.defineProperty;
        var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
        var __getOwnPropNames22 = Object.getOwnPropertyNames;
        var __hasOwnProp22 = Object.prototype.hasOwnProperty;
        var __export22 = (target, all) => {
          for (var name in all)
            __defProp22(target, name, { get: all[name], enumerable: true });
        };
        var __copyProps22 = (to, from2, except, desc) => {
          if (from2 && typeof from2 === "object" || typeof from2 === "function") {
            for (let key of __getOwnPropNames22(from2))
              if (!__hasOwnProp22.call(to, key) && key !== except)
                __defProp22(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc22(from2, key)) || desc.enumerable });
          }
          return to;
        };
        var __toCommonJS22 = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
        var log_exports = {};
        __export22(log_exports, {
          logGroupIf: () => logGroupIf,
          logIf: () => logIf
        });
        module22.exports = __toCommonJS22(log_exports);
        var logIf = (bool, ...arg) => {
          if (bool)
            arg.map((v) => console.log(v));
        };
        var logGroupIf = (bool, key, ...arg) => {
          if (bool) {
            console.group(key);
            arg.map((v) => console.log(v));
            console.groupEnd(key);
          }
        };
      }
    });
    var require_cookie2 = __commonJS2({
      "../../node_modules/@domql/utils/dist/cjs/cookie.js"(exports2, module22) {
        "use strict";
        var __defProp22 = Object.defineProperty;
        var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
        var __getOwnPropNames22 = Object.getOwnPropertyNames;
        var __hasOwnProp22 = Object.prototype.hasOwnProperty;
        var __export22 = (target, all) => {
          for (var name in all)
            __defProp22(target, name, { get: all[name], enumerable: true });
        };
        var __copyProps22 = (to, from2, except, desc) => {
          if (from2 && typeof from2 === "object" || typeof from2 === "function") {
            for (let key of __getOwnPropNames22(from2))
              if (!__hasOwnProp22.call(to, key) && key !== except)
                __defProp22(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc22(from2, key)) || desc.enumerable });
          }
          return to;
        };
        var __toCommonJS22 = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
        var cookie_exports = {};
        __export22(cookie_exports, {
          getCookie: () => getCookie,
          isMobile: () => isMobile,
          setCookie: () => setCookie
        });
        module22.exports = __toCommonJS22(cookie_exports);
        var import_types = require_types2();
        var isMobile = (() => typeof navigator === "undefined" ? false : /Mobi/.test(navigator.userAgent))();
        var setCookie = (cname, cvalue, exdays = 365) => {
          if ((0, import_types.isUndefined)(document) || (0, import_types.isUndefined)(document.cookie))
            return;
          const d = /* @__PURE__ */ new Date();
          d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1e3);
          const expires = `expires=${d.toUTCString()}`;
          document.cookie = `${cname}=${cvalue};${expires};path=/`;
        };
        var getCookie = (cname) => {
          if ((0, import_types.isUndefined)(document) || (0, import_types.isUndefined)(document.cookie))
            return;
          const name = `${cname}=`;
          const decodedCookie = decodeURIComponent(document.cookie);
          const ca = decodedCookie.split(";");
          for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === " ")
              c = c.substring(1);
            if (c.indexOf(name) === 0)
              return c.substring(name.length, c.length);
          }
          return "";
        };
      }
    });
    var require_tags2 = __commonJS2({
      "../../node_modules/@domql/utils/dist/cjs/tags.js"(exports2, module22) {
        "use strict";
        var __defProp22 = Object.defineProperty;
        var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
        var __getOwnPropNames22 = Object.getOwnPropertyNames;
        var __hasOwnProp22 = Object.prototype.hasOwnProperty;
        var __export22 = (target, all) => {
          for (var name in all)
            __defProp22(target, name, { get: all[name], enumerable: true });
        };
        var __copyProps22 = (to, from2, except, desc) => {
          if (from2 && typeof from2 === "object" || typeof from2 === "function") {
            for (let key of __getOwnPropNames22(from2))
              if (!__hasOwnProp22.call(to, key) && key !== except)
                __defProp22(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc22(from2, key)) || desc.enumerable });
          }
          return to;
        };
        var __toCommonJS22 = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
        var tags_exports = {};
        __export22(tags_exports, {
          HTML_TAGS: () => HTML_TAGS,
          isValidHtmlTag: () => isValidHtmlTag
        });
        module22.exports = __toCommonJS22(tags_exports);
        var HTML_TAGS = {
          root: [
            "body",
            "html"
          ],
          head: [
            "title",
            "base",
            "meta",
            "style"
          ],
          body: [
            "string",
            "fragment",
            "a",
            "abbr",
            "acronym",
            "address",
            "applet",
            "area",
            "article",
            "aside",
            "audio",
            "b",
            "basefont",
            "bdi",
            "bdo",
            "big",
            "blockquote",
            "br",
            "button",
            "canvas",
            "caption",
            "center",
            "cite",
            "code",
            "col",
            "colgroup",
            "data",
            "datalist",
            "dd",
            "del",
            "details",
            "dfn",
            "dialog",
            "dir",
            "div",
            "dl",
            "dt",
            "em",
            "embed",
            "fieldset",
            "figcaption",
            "figure",
            "font",
            "footer",
            "form",
            "frame",
            "frameset",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "head",
            "header",
            "hr",
            "i",
            "iframe",
            "img",
            "input",
            "ins",
            "kbd",
            "label",
            "legend",
            "li",
            "link",
            "main",
            "map",
            "mark",
            "meter",
            "nav",
            "noframes",
            "noscript",
            "object",
            "ol",
            "optgroup",
            "option",
            "output",
            "p",
            "param",
            "picture",
            "pre",
            "progress",
            "q",
            "rp",
            "rt",
            "ruby",
            "s",
            "samp",
            "script",
            "section",
            "select",
            "small",
            "source",
            "span",
            "strike",
            "strong",
            "sub",
            "summary",
            "sup",
            "table",
            "tbody",
            "td",
            "template",
            "textarea",
            "tfoot",
            "th",
            "thead",
            "time",
            "tr",
            "track",
            "tt",
            "u",
            "ul",
            "var",
            "video",
            "wbr",
            // SVG
            "svg",
            "path"
          ]
        };
        var isValidHtmlTag = (arg) => HTML_TAGS.body.includes(arg);
      }
    });
    var require_cjs22 = __commonJS2({
      "../../node_modules/@domql/utils/dist/cjs/index.js"(exports2, module22) {
        "use strict";
        var __defProp22 = Object.defineProperty;
        var __getOwnPropDesc22 = Object.getOwnPropertyDescriptor;
        var __getOwnPropNames22 = Object.getOwnPropertyNames;
        var __hasOwnProp22 = Object.prototype.hasOwnProperty;
        var __copyProps22 = (to, from2, except, desc) => {
          if (from2 && typeof from2 === "object" || typeof from2 === "function") {
            for (let key of __getOwnPropNames22(from2))
              if (!__hasOwnProp22.call(to, key) && key !== except)
                __defProp22(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc22(from2, key)) || desc.enumerable });
          }
          return to;
        };
        var __reExport = (target, mod, secondTarget) => (__copyProps22(target, mod, "default"), secondTarget && __copyProps22(secondTarget, mod, "default"));
        var __toCommonJS22 = (mod) => __copyProps22(__defProp22({}, "__esModule", { value: true }), mod);
        var utils_exports2 = {};
        module22.exports = __toCommonJS22(utils_exports2);
        __reExport(utils_exports2, require_key2(), module22.exports);
        __reExport(utils_exports2, require_env2(), module22.exports);
        __reExport(utils_exports2, require_types2(), module22.exports);
        __reExport(utils_exports2, require_object2(), module22.exports);
        __reExport(utils_exports2, require_function2(), module22.exports);
        __reExport(utils_exports2, require_array2(), module22.exports);
        __reExport(utils_exports2, require_node2(), module22.exports);
        __reExport(utils_exports2, require_log2(), module22.exports);
        __reExport(utils_exports2, require_string2(), module22.exports);
        __reExport(utils_exports2, require_globals2(), module22.exports);
        __reExport(utils_exports2, require_cookie2(), module22.exports);
        __reExport(utils_exports2, require_tags2(), module22.exports);
      }
    });
    var src_exports = {};
    __export2(src_exports, {
      ANIMATION: () => ANIMATION,
      BREAKPOINTS: () => BREAKPOINTS,
      CASES: () => CASES,
      COLOR: () => COLOR,
      CONFIG: () => CONFIG3,
      CSS_VARS: () => CSS_VARS,
      DEVICES: () => DEVICES,
      DOCUMENT: () => DOCUMENT,
      FACTORY: () => FACTORY,
      FONT: () => FONT,
      FONT_FACE: () => FONT_FACE,
      FONT_FAMILY: () => FONT_FAMILY,
      FONT_FAMILY_TYPES: () => FONT_FAMILY_TYPES,
      GRADIENT: () => GRADIENT,
      ICONS: () => ICONS,
      MEDIA: () => MEDIA,
      RESET: () => RESET,
      SEQUENCE: () => SEQUENCE,
      SPACING: () => SPACING,
      SVG: () => SVG,
      SVG_DATA: () => SVG_DATA,
      TEMPLATES: () => TEMPLATES,
      THEME: () => THEME,
      TIMING: () => TIMING,
      TYPOGRAPHY: () => TYPOGRAPHY,
      UNIT: () => UNIT,
      VALUE_TRANSFORMERS: () => VALUE_TRANSFORMERS,
      activateConfig: () => activateConfig,
      appendIconsSprite: () => appendIconsSprite2,
      appendSVGSprite: () => appendSVGSprite2,
      applyDocument: () => applyDocument,
      applyHeadings: () => applyHeadings,
      applyReset: () => applyReset,
      applySequenceVars: () => applySequenceVars,
      applySpacingSequence: () => applySpacingSequence,
      applyTimingSequence: () => applyTimingSequence,
      applyTypographySequence: () => applyTypographySequence,
      changeLightness: () => changeLightness,
      colorStringToRgbaArray: () => colorStringToRgbaArray,
      convertSvgToSymbol: () => convertSvgToSymbol,
      findHeadingLetter: () => findHeadingLetter,
      findHeadings: () => findHeadings,
      generateSequence: () => generateSequence,
      generateSprite: () => generateSprite,
      generateSubSequence: () => generateSubSequence,
      getActiveConfig: () => getActiveConfig3,
      getColor: () => getColor2,
      getColorShade: () => getColorShade,
      getDefaultOrFirstKey: () => getDefaultOrFirstKey,
      getFontFace: () => getFontFace,
      getFontFaceEach: () => getFontFaceEach,
      getFontFaceEachString: () => getFontFaceEachString,
      getFontFaceString: () => getFontFaceString2,
      getFontFamily: () => getFontFamily2,
      getFontFormat: () => getFontFormat,
      getFontSizeByKey: () => getFontSizeByKey2,
      getMediaColor: () => getMediaColor3,
      getMediaTheme: () => getMediaTheme2,
      getRgbTone: () => getRgbTone,
      getSequenceValue: () => getSequenceValue,
      getSequenceValuePropertyPair: () => getSequenceValuePropertyPair,
      getSpacingBasedOnRatio: () => getSpacingBasedOnRatio4,
      getSpacingByKey: () => getSpacingByKey3,
      getTheme: () => getTheme,
      getTimingByKey: () => getTimingByKey2,
      getTimingFunction: () => getTimingFunction3,
      hexToRgb: () => hexToRgb,
      hexToRgbArray: () => hexToRgbArray,
      hexToRgba: () => hexToRgba,
      hslToRgb: () => hslToRgb,
      mixTwoColors: () => mixTwoColors,
      mixTwoRgb: () => mixTwoRgb,
      mixTwoRgba: () => mixTwoRgba,
      numToLetterMap: () => numToLetterMap,
      opacify: () => opacify,
      returnSubThemeOrDefault: () => returnSubThemeOrDefault,
      rgbArrayToHex: () => rgbArrayToHex,
      rgbToHSL: () => rgbToHSL,
      rgbToHex: () => rgbToHex,
      runThroughMedia: () => runThroughMedia,
      scratchSystem: () => system_exports,
      scratchUtils: () => utils_exports,
      set: () => set2,
      setActiveConfig: () => setActiveConfig,
      setColor: () => setColor,
      setCustomFont: () => setCustomFont,
      setCustomFontMedia: () => setCustomFontMedia,
      setEach: () => setEach,
      setFont: () => setFont,
      setFontFamily: () => setFontFamily,
      setGradient: () => setGradient,
      setIcon: () => setIcon,
      setInCustomFontMedia: () => setInCustomFontMedia,
      setMediaTheme: () => setMediaTheme,
      setSVG: () => setSVG,
      setTheme: () => setTheme,
      setValue: () => setValue,
      setVariables: () => setVariables,
      splitTransition: () => splitTransition2,
      transformBackgroundImage: () => transformBackgroundImage2,
      transformBorder: () => transformBorder2,
      transformDuration: () => transformDuration2,
      transformShadow: () => transformShadow2,
      transformTextStroke: () => transformTextStroke2,
      transformTransition: () => transformTransition,
      transfromGap: () => transfromGap2
    });
    module2.exports = __toCommonJS2(src_exports);
    var utils_exports = {};
    __export2(utils_exports, {
      applySequenceVars: () => applySequenceVars,
      changeLightness: () => changeLightness,
      colorStringToRgbaArray: () => colorStringToRgbaArray,
      convertSvgToSymbol: () => convertSvgToSymbol,
      findHeadingLetter: () => findHeadingLetter,
      findHeadings: () => findHeadings,
      generateSequence: () => generateSequence,
      generateSprite: () => generateSprite,
      generateSubSequence: () => generateSubSequence,
      getColorShade: () => getColorShade,
      getDefaultOrFirstKey: () => getDefaultOrFirstKey,
      getFontFace: () => getFontFace,
      getFontFaceEach: () => getFontFaceEach,
      getFontFaceEachString: () => getFontFaceEachString,
      getFontFaceString: () => getFontFaceString2,
      getFontFormat: () => getFontFormat,
      getRgbTone: () => getRgbTone,
      getSequenceValue: () => getSequenceValue,
      getSequenceValuePropertyPair: () => getSequenceValuePropertyPair,
      hexToRgb: () => hexToRgb,
      hexToRgbArray: () => hexToRgbArray,
      hexToRgba: () => hexToRgba,
      hslToRgb: () => hslToRgb,
      mixTwoColors: () => mixTwoColors,
      mixTwoRgb: () => mixTwoRgb,
      mixTwoRgba: () => mixTwoRgba,
      numToLetterMap: () => numToLetterMap,
      opacify: () => opacify,
      returnSubThemeOrDefault: () => returnSubThemeOrDefault,
      rgbArrayToHex: () => rgbArrayToHex,
      rgbToHSL: () => rgbToHSL,
      rgbToHex: () => rgbToHex,
      setCustomFont: () => setCustomFont,
      setCustomFontMedia: () => setCustomFontMedia,
      setInCustomFontMedia: () => setInCustomFontMedia,
      setVariables: () => setVariables
    });
    var import_globals = __toESM2(require_cjs6(), 1);
    var import_utils7 = __toESM2(require_cjs22(), 1);
    var ENV = "development";
    var colorStringToRgbaArray = (color) => {
      if (color === "")
        return;
      if (color.toLowerCase() === "transparent")
        return [0, 0, 0, 0];
      if (color[0] === "#") {
        if (color.length < 7) {
          color = "#" + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + (color.length > 4 ? color[4] + color[4] : "");
        }
        return [
          parseInt(color.substr(1, 2), 16),
          parseInt(color.substr(3, 2), 16),
          parseInt(color.substr(5, 2), 16),
          color.length > 7 ? parseInt(color.substr(7, 2), 16) / 255 : 1
        ];
      }
      if (color.indexOf("rgb") === -1) {
        if (import_globals.document && import_globals.window) {
          const elem = import_globals.document.body.appendChild(import_globals.document.createElement("fictum"));
          const flag = "rgb(1, 2, 3)";
          elem.style.color = flag;
          if (elem.style.color !== flag)
            return;
          elem.style.color = color;
          if (elem.style.color === flag || elem.style.color === "")
            return;
          color = import_globals.window.getComputedStyle(elem).color;
          import_globals.document.body.removeChild(elem);
        }
      }
      if (color.indexOf("rgb") === 0) {
        if (color.indexOf("rgba") === -1)
          color = `${color}, 1`;
        return color.match(/[\.\d]+/g).map((a) => +a);
      }
      return [];
    };
    var mixTwoColors = (colorA, colorB, range = 0.5) => {
      colorA = colorStringToRgbaArray(colorA);
      colorB = colorStringToRgbaArray(colorB);
      return mixTwoRgba(colorA, colorB, range);
    };
    var hexToRgb = (hex, alpha = 1) => {
      const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
      return `rgb(${r},${g},${b})`;
    };
    var hexToRgbArray = (hex, alpha = 1) => {
      const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
      return [r, g, b];
    };
    var rgbToHex = (r, g, b) => {
      return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
    };
    var rgbArrayToHex = ([r, g, b]) => {
      return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };
    var hexToRgba = (hex, alpha = 1) => {
      const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
      return `rgba(${r},${g},${b},${alpha})`;
    };
    var mixTwoRgb = (colorA, colorB, range = 0.5) => {
      const arr = [];
      for (let i = 0; i < 3; i++) {
        arr[i] = ~~(colorA[i] + (colorB[i] - colorA[i]) * range);
      }
      return `rgb(${arr})`;
    };
    var changeLightness = (delta, hsl) => {
      const [hue, saturation, lightness] = hsl;
      const newLightness = Math.max(
        0,
        Math.min(100, lightness + parseFloat(delta))
      );
      return [hue, saturation, newLightness];
    };
    var rgbToHSL = (r, g, b) => {
      const a = Math.max(r, g, b);
      const n = a - Math.min(r, g, b);
      const f = 1 - Math.abs(a + a - n - 1);
      const h = n && (a == r ? (g - b) / n : a == g ? 2 + (b - r) / n : 4 + (r - g) / n);
      return [60 * (h < 0 ? h + 6 : h), f ? n / f : 0, (a + a - n) / 2];
    };
    var hslToRgb = (h, s, l, a = s * Math.min(l, 1 - l), f = (n, k = (n + h / 30) % 12) => l - a * Math.max(
      Math.min(k - 3, 9 - k, 1),
      -1
    )) => [f(0), f(8), f(4)];
    var getColorShade = (col, amt) => {
      const num = parseInt(col, 16);
      let r = (num >> 16) + amt;
      if (r > 255)
        r = 255;
      else if (r < 0)
        r = 0;
      let b = (num >> 8 & 255) + amt;
      if (b > 255)
        b = 255;
      else if (b < 0)
        b = 0;
      let g = (num & 255) + amt;
      if (g > 255)
        g = 255;
      else if (g < 0)
        g = 0;
      return ((g | b << 8 | r << 16) + 16777216).toString(16).slice(1);
    };
    var mixTwoRgba = (colorA, colorB, range = 0.5) => {
      const arr = [];
      for (let i = 0; i < 4; i++) {
        const round = i === 3 ? (x) => x : Math.round;
        arr[i] = round(
          colorA[i] + (colorB[i] - colorA[i]) * range
        );
      }
      return `rgba(${arr})`;
    };
    var opacify = (color, opacity) => {
      const arr = colorStringToRgbaArray(color);
      if (!arr) {
        if (ENV === "test" || ENV === "development")
          console.warn(color + "color is not rgba");
        return;
      }
      arr[3] = opacity;
      return `rgba(${arr})`;
    };
    var getRgbTone = (rgb, tone) => {
      if ((0, import_utils7.isString)(rgb))
        rgb = rgb.split(", ").map((v) => parseFloat(v));
      if ((0, import_utils7.isNumber)(tone))
        tone += "";
      const toHex = rgbArrayToHex(rgb);
      const abs2 = tone.slice(0, 1);
      if (abs2 === "-" || abs2 === "+") {
        const colorShade = getColorShade(toHex, parseFloat(tone));
        return hexToRgbArray(colorShade).join(", ");
      } else {
        const [r, g, b] = rgb;
        const hsl = rgbToHSL(r, g, b);
        const [h, s, l] = hsl;
        const newRgb = hslToRgb(h, s, parseFloat(tone) / 100 * 255);
        return newRgb;
      }
    };
    var returnSubThemeOrDefault = (orig, theme) => {
      if (!orig)
        return;
      if (orig.themes && orig.themes[theme])
        return orig.themes[theme];
      if (orig[theme])
        return [orig, orig[theme]];
      return orig;
    };
    var getDefaultOrFirstKey = (LIBRARY, key) => {
      if (LIBRARY[key])
        return LIBRARY[key].value;
      if (LIBRARY.default)
        return LIBRARY[LIBRARY.default].value;
      const hasValue = Object.keys(LIBRARY)[0];
      return hasValue && LIBRARY[hasValue] && LIBRARY[hasValue].value;
    };
    var getFontFormat = (url) => url.split(/[#?]/)[0].split(".").pop().trim();
    var setInCustomFontMedia = (str) => `@font-face { ${str} }`;
    var setCustomFont = (name, url, weight) => `
  font-family: '${name}';
  font-style: normal;
  ${weight && `font-weight: ${weight};`}
  src: url('${url}') format('${getFontFormat(url)}');`;
    var setCustomFontMedia = (name, url, weight) => `@font-face {
  ${setCustomFont(name, url, weight)}
}`;
    var getFontFaceEach = (name, weights) => {
      const keys = Object.keys(weights);
      return keys.map((key) => {
        const { url, fontWeight } = weights[key];
        return setCustomFont(name, url, fontWeight);
      });
    };
    var getFontFace = (LIBRARY) => {
      const keys = Object.keys(LIBRARY);
      return keys.map((key) => getFontFaceEach(key, LIBRARY[key].value));
    };
    var getFontFaceEachString = (name, weights) => {
      const isArr = weights[0];
      if (isArr)
        return getFontFaceEach(name, weights).map(setInCustomFontMedia);
      return setCustomFontMedia(name, weights.url);
    };
    var getFontFaceString2 = (LIBRARY) => {
      const keys = Object.keys(LIBRARY);
      return keys.map((key) => getFontFaceEachString(key, LIBRARY[key].value));
    };
    var import_utils52 = __toESM2(require_cjs22(), 1);
    var import_utils32 = __toESM2(require_cjs22());
    var import_utils22 = __toESM2(require_cjs22());
    var toCamelCase = (str) => {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      }).replaceAll(/\s+/g, "");
    };
    var toDashCase = (val) => val.replace(/[^a-zA-Z0-9]/g, " ").trim().toLowerCase().replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
    var arrayzeValue = (val) => {
      if ((0, import_utils32.isString)(val))
        return val.split(" ");
      if ((0, import_utils32.isObject)(val))
        return Object.keys(val).map((v) => val[v]);
      if ((0, import_utils32.isArray)(val))
        return val;
    };
    var import_utils42 = __toESM2(require_cjs22(), 1);
    var defaultConfig_exports = {};
    __export2(defaultConfig_exports, {
      ANIMATION: () => ANIMATION,
      BREAKPOINTS: () => BREAKPOINTS,
      CASES: () => CASES,
      COLOR: () => COLOR,
      DEVICES: () => DEVICES,
      DOCUMENT: () => DOCUMENT,
      FONT: () => FONT,
      FONT_FACE: () => FONT_FACE,
      FONT_FAMILY: () => FONT_FAMILY,
      FONT_FAMILY_TYPES: () => FONT_FAMILY_TYPES,
      GRADIENT: () => GRADIENT,
      ICONS: () => ICONS,
      MEDIA: () => MEDIA,
      RESET: () => RESET,
      SEQUENCE: () => SEQUENCE,
      SPACING: () => SPACING,
      SVG: () => SVG,
      SVG_DATA: () => SVG_DATA,
      TEMPLATES: () => TEMPLATES,
      THEME: () => THEME,
      TIMING: () => TIMING,
      TYPOGRAPHY: () => TYPOGRAPHY,
      UNIT: () => UNIT
    });
    var SEQUENCE = {
      "minor-second": 1.067,
      "major-second": 1.125,
      "minor-third": 1.2,
      "major-third": 1.25,
      "perfect-fourth": 1.333,
      "augmented-fourth": 1.414,
      "perfect-fifth": 1.5,
      "minor-sixth": 1.6,
      phi: 1.618,
      // golden-ratio
      "major-sixth": 1.667,
      "square-root-3": 1.732,
      // theodorus
      "minor-seventh": 1.778,
      "major-seventh": 1.875,
      octave: 2,
      "square-root-5": 2.23,
      // pythagoras
      "major-tenth": 2.5,
      "major-eleventh": 2.667,
      "major-twelfth": 3,
      pi: 3.14,
      // archimedes
      "double-octave": 4
    };
    var UNIT = {
      default: "em"
    };
    var defaultProps = {
      browserDefault: 16,
      base: 16,
      type: "font-size",
      ratio: SEQUENCE["minor-third"],
      range: [-3, 12],
      h1Matches: 6,
      lineHeight: 1.5,
      subSequence: true,
      unit: "em",
      templates: {},
      sequence: {},
      scales: {},
      vars: {}
    };
    var TYPOGRAPHY = defaultProps;
    var FONT = {};
    var FONT_FAMILY = {};
    var FONT_FAMILY_TYPES = {
      "sans-serif": "Helvetica, Arial, sans-serif, --system-default",
      serif: "Times New Roman, Georgia, serif, --system-default",
      monospace: "Courier New, monospace, --system-default"
    };
    var FONT_FACE = {};
    var MEDIA = {
      tv: "(min-width: 2780px)",
      screenL: "(max-width: 1920px)",
      "screenL<": "(min-width: 1920px)",
      screenM: "(max-width: 1680px)",
      "screenM<": "(min-width: 1680px)",
      screenS: "(max-width: 1440px)",
      "screenS<": "(min-width: 1440px)",
      tabletL: "(max-width: 1366px)",
      "tabletL<": "(min-width: 1366px)",
      tabletM: "(max-width: 1280px)",
      "tabletM<": "(min-width: 1280px)",
      tabletS: "(max-width: 1024px)",
      "tabletS<": "(min-width: 1024px)",
      mobileL: "(max-width: 768px)",
      "mobileL<": "(min-width: 768px)",
      mobileM: "(max-width: 560px)",
      "mobileM<": "(min-width: 560px)",
      mobileS: "(max-width: 480px)",
      "mobileS<": "(min-width: 480px)",
      mobileXS: "(max-width: 375px)",
      "mobileXS<": "(min-width: 375px)",
      light: "(prefers-color-scheme: light)",
      dark: "(prefers-color-scheme: dark)",
      print: "print"
    };
    var defaultProps2 = {
      base: TYPOGRAPHY.base,
      type: "spacing",
      ratio: SEQUENCE.phi,
      range: [-5, 15],
      subSequence: true,
      unit: "em",
      sequence: {},
      scales: {},
      vars: {}
    };
    var SPACING = defaultProps2;
    var COLOR = {};
    var GRADIENT = {};
    var THEME = {};
    var ICONS = {};
    var defaultProps3 = {
      default: 150,
      base: 150,
      type: "timing",
      ratio: SEQUENCE["perfect-fourth"],
      range: [-3, 12],
      unit: "ms",
      sequence: {},
      scales: {},
      vars: {}
    };
    var TIMING = defaultProps3;
    var DOCUMENT = {};
    var BREAKPOINTS = {
      screenL: 1920,
      screenM: 1680,
      screenS: 1440,
      tabletL: 1366,
      tabletM: 1280,
      tabletS: 1024,
      mobileL: 768,
      mobileM: 560,
      mobileS: 480,
      mobileXS: 375
    };
    var DEVICES = {
      screenL: [1920, 1024],
      screenM: [1680, 1024],
      screenS: [1440, 978],
      tabletL: [1366, 926],
      tabletM: [1280, 768],
      tabletS: [1024, 768],
      mobileL: [768, 375],
      mobileM: [560, 768],
      mobileS: [480, 768],
      mobileXS: [375, 768]
    };
    var CASES = {};
    var ANIMATION = {};
    var SVG = {};
    var SVG_DATA = {};
    var TEMPLATES = {};
    var RESET = {};
    var CSS_VARS = {};
    var CONFIG3 = {
      verbose: false,
      useVariable: true,
      useReset: true,
      CSS_VARS,
      ...defaultConfig_exports
    };
    var cachedConfig = (0, import_utils42.deepClone)(CONFIG3);
    var FACTORY = {
      active: "0",
      0: CONFIG3
    };
    var activateConfig = (def) => {
      if ((0, import_utils42.isDefined)(def)) {
        FACTORY.active = def;
      }
      return FACTORY[def || FACTORY.active];
    };
    var getActiveConfig3 = (def) => {
      return FACTORY[def || FACTORY.active];
    };
    var setActiveConfig = (newConfig) => {
      if (!(0, import_utils42.isObject)(newConfig))
        return;
      FACTORY.active = "1";
      FACTORY["1"] = (0, import_utils42.deepMerge)(newConfig, (0, import_utils42.deepClone)(cachedConfig));
      return newConfig;
    };
    var numToLetterMap = {
      "-6": "U",
      "-5": "V",
      "-4": "W",
      "-3": "X",
      "-2": "Y",
      "-1": "Z",
      0: "A",
      1: "B",
      2: "C",
      3: "D",
      4: "E",
      5: "F",
      6: "G",
      7: "H",
      8: "I",
      9: "J",
      10: "K",
      11: "L",
      12: "M",
      13: "N",
      14: "O",
      15: "P",
      16: "Q",
      17: "R",
      18: "S",
      19: "T"
    };
    var setSequenceValue = (props, sequenceProps) => {
      const { key, variable, value, scaling, index } = props;
      sequenceProps.sequence[key] = {
        key,
        decimal: ~~(value * 100) / 100,
        val: ~~value,
        scaling,
        index,
        variable
      };
      sequenceProps.scales[key] = scaling;
      sequenceProps.vars[variable] = scaling + sequenceProps.unit;
    };
    var generateSubSequence = (props, sequenceProps) => {
      const { key, base, value, ratio, variable, index } = props;
      const next2 = value * ratio;
      const diff2 = next2 - value;
      const smallscale = diff2 / 1.618;
      const valueRounded = ~~value;
      const nextRounded = ~~next2;
      const diffRounded = nextRounded - valueRounded;
      let arr = [];
      const first = next2 - smallscale;
      const second = value + smallscale;
      const middle = (first + second) / 2;
      if (diffRounded > 16)
        arr = [first, middle, second];
      else
        arr = [first, second];
      arr.map((v, k) => {
        const scaling = ~~(v / base * 1e3) / 1e3;
        const newVar = variable + (k + 1);
        const props2 = {
          key: key + (k + 1),
          variable: newVar,
          value: v,
          scaling,
          index: index + (k + 1) / 10
        };
        return setSequenceValue(props2, sequenceProps);
      });
    };
    var switchSequenceOnNegative = (key, base, ratio) => {
      return base * Math.pow(ratio, key);
    };
    var generateSequence = (sequenceProps) => {
      const { type, base, ratio, range, subSequence } = sequenceProps;
      const n = Math.abs(range[0]) + Math.abs(range[1]);
      const prefix2 = "--" + (type && type.replace(".", "-")) + "-";
      for (let i = 0; i <= n; i++) {
        const key = range[1] - i;
        const letterKey = numToLetterMap[key];
        const value = switchSequenceOnNegative(key, base, ratio);
        const scaling = ~~(value / base * 100) / 100;
        const variable = prefix2 + letterKey;
        const props = {
          key: letterKey,
          variable,
          value,
          base,
          scaling,
          ratio,
          index: key
        };
        setSequenceValue(props, sequenceProps);
        if (subSequence)
          generateSubSequence(props, sequenceProps);
      }
      return sequenceProps;
    };
    var getSequenceValue = (value = "A", sequenceProps) => {
      const CONFIG22 = getActiveConfig3();
      const { UNIT: UNIT2 } = CONFIG22;
      const {
        sequence,
        unit = UNIT2.default,
        useVariable
      } = sequenceProps;
      if ((0, import_utils52.isString)(value) && value.slice(0, 2) === "--")
        return `var(${value})`;
      const prefix2 = `--${toDashCase(sequenceProps.type.replace(".", "-"))}-`;
      const startsWithDashOrLetterRegex = /^-?[a-zA-Z]/i;
      const startsWithDashOrLetter = startsWithDashOrLetterRegex.test(value);
      if (value === "none" || value === "auto" || value === "unset" || value === "inherit" || value === "fit-content" || value === "min-content" || value === "max-content" || value.includes("calc") || !startsWithDashOrLetter)
        return value;
      const letterVal = value.toUpperCase();
      const isNegative = letterVal.slice(0, 1) === "-" ? "-" : "";
      let absValue = isNegative ? letterVal.slice(1) : letterVal;
      let mediaName = "";
      if (absValue.includes("-")) {
        mediaName = "-" + absValue.split("-")[1].toLowerCase();
        absValue = absValue.split("-")[0];
      }
      const varValue = (v) => `var(${prefix2}${v}${mediaName})`;
      if (absValue.includes("+")) {
        const args = absValue.split("+");
        const [first, second] = args;
        const joint = `${varValue(first)} + ${varValue(second)}`;
        return isNegative ? `calc((${joint}) * -1)` : `calc(${joint})`;
      } else if (absValue.includes("-")) {
        const args = absValue.split("-");
        const [first, second] = args;
        const joint = `${varValue(first)} - ${varValue(second)}`;
        return isNegative ? `calc((${joint}) * -1)` : `calc(${joint})`;
      }
      if (!sequence[absValue] && absValue.length === 2) {
        if (CONFIG22.verbose)
          console.warn(absValue, "- value is not found because `subSequence` is set to false");
        absValue = absValue.slice(0, 1);
      }
      if (useVariable || CONFIG22.useVariable) {
        const varValue2 = `var(${prefix2}${absValue}${mediaName})`;
        return isNegative ? `calc(${varValue2} * -1)` : varValue2;
      }
      const sequenceItem = sequence ? sequence[absValue] : null;
      if (!sequenceItem)
        return console.warn("can't find", sequence, absValue);
      if (unit === "ms" || unit === "s") {
        return isNegative + sequenceItem.val + unit;
      }
      return isNegative + sequenceItem.scaling + unit;
    };
    var getSequenceValuePropertyPair = (value, propertyName, sequenceProps) => {
      if (typeof value !== "string") {
        console.warn(propertyName, value, "is not a string");
        return {};
      }
      if (value === "-" || value === "")
        return {};
      return { [propertyName]: getSequenceValue(value, sequenceProps) };
    };
    var findHeadingLetter = (h1Matches, index) => numToLetterMap[h1Matches - index];
    var findHeadings = (propertyNames) => {
      const { h1Matches, sequence } = propertyNames;
      return new Array(6).fill(null).map((_, i) => {
        const findLetter = findHeadingLetter(h1Matches, i);
        return sequence[findLetter];
      });
    };
    var import_utils72 = __toESM2(require_cjs22(), 1);
    var setVariables = (result, key) => {
      const CONFIG22 = getActiveConfig3();
      const { CSS_VARS: CSS_VARS2 } = CONFIG22;
      if ((0, import_utils72.isObjectLike)(result.value)) {
      } else {
        CSS_VARS2[result.var] = result.value;
      }
    };
    var applySequenceVars = (props, mediaName, options = {}) => {
      const CONFIG22 = getActiveConfig3();
      const { UNIT: UNIT2, MEDIA: MEDIA2, TIMING: TIMING2, CSS_VARS: CSS_VARS2 } = CONFIG22;
      const unit = props.unit || UNIT2.default;
      const { sequence, scales } = props;
      for (const key in sequence) {
        const item = sequence[key];
        const value = (props.type === TIMING2.type ? sequence[key].val : scales[key]) + unit;
        if (mediaName) {
          const query = MEDIA2[mediaName];
          if (!query) {
            if (CONFIG22.verbose)
              console.warn("Can't find query ", query);
          }
          let underMediaQuery = CSS_VARS2[`@media ${query}`];
          if (!underMediaQuery)
            underMediaQuery = CSS_VARS2[`@media ${query}`] = {};
          underMediaQuery[item.variable] = `var(${item.variable + "-" + mediaName})`;
          CSS_VARS2[item.variable + "-" + mediaName] = value;
        } else {
          if (options.useDefault === false) {
            CSS_VARS2[item.variable] = value;
          } else {
            CSS_VARS2[item.variable + "-default"] = value;
            CSS_VARS2[item.variable] = `var(${item.variable + "-default"})`;
          }
        }
      }
    };
    var import_utils8 = __toESM2(require_cjs22(), 1);
    var generateSprite = (icons) => {
      const CONFIG22 = getActiveConfig3();
      let sprite = "";
      for (const key in icons) {
        if (CONFIG22.__svg_cache[key])
          continue;
        else
          CONFIG22.__svg_cache[key] = true;
        sprite += icons[key];
      }
      return sprite;
    };
    var parseRootAttributes = (htmlString) => {
      if (!(0, import_utils8.isString)(htmlString)) {
        return console.warn(`parseRootAttributes: ${htmlString} is not a string`);
      }
      const match2 = htmlString.match(/<svg\s+(.*?)>/);
      if (!match2 || !match2[1]) {
        return {};
      }
      const attrString = match2[1];
      const attrs = attrString.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?/gm);
      return attrs.reduce((acc, attr) => {
        const [key, value] = attr.split("=");
        acc[key] = value.replace(/['"]/g, "");
        return acc;
      }, {});
    };
    var replaceIdsAndUrls = (code, key) => {
      const idRegex = /id="([^"]*)"/;
      const urlRegex = /url\(#([^)]*)\)/g;
      const matches = code.match(/id="([^"]*)"/g);
      let replacedCode = code;
      if ((0, import_utils8.isArray)(matches)) {
        matches.forEach(() => {
          const randomKey = Math.floor(Math.random() * 1e5);
          replacedCode = code.replace(idRegex, `id="${key}-${randomKey}"`).replace(urlRegex, `url(#${key}-${randomKey})`);
        });
      }
      return replacedCode;
    };
    var convertSvgToSymbol = (key, code) => {
      const extractAttrs = parseRootAttributes(code);
      const { width, height } = extractAttrs;
      const viewBox = extractAttrs.viewBox || `0 0 ${width || 24} ${height || 24}`;
      const xmlns = "http://www.w3.org/2000/svg";
      const replacedCode = replaceIdsAndUrls(code, key);
      let symbol = replacedCode.replace(
        "<svg",
        `<symbol id="${key}" xmlns="${xmlns}" viewBox="${viewBox}"`
      );
      symbol = symbol.replace(/width="[^"]*"/, "");
      symbol = symbol.replace(/height="[^"]*"/, "");
      symbol = symbol.replace("</svg", "</symbol");
      return symbol;
    };
    var system_exports = {};
    __export2(system_exports, {
      appendIconsSprite: () => appendIconsSprite2,
      appendSVGSprite: () => appendSVGSprite2,
      applyDocument: () => applyDocument,
      applyHeadings: () => applyHeadings,
      applyReset: () => applyReset,
      applySpacingSequence: () => applySpacingSequence,
      applyTimingSequence: () => applyTimingSequence,
      applyTypographySequence: () => applyTypographySequence,
      getColor: () => getColor2,
      getFontFamily: () => getFontFamily2,
      getFontSizeByKey: () => getFontSizeByKey2,
      getMediaColor: () => getMediaColor3,
      getMediaTheme: () => getMediaTheme2,
      getSpacingBasedOnRatio: () => getSpacingBasedOnRatio4,
      getSpacingByKey: () => getSpacingByKey3,
      getTheme: () => getTheme,
      getTimingByKey: () => getTimingByKey2,
      getTimingFunction: () => getTimingFunction3,
      runThroughMedia: () => runThroughMedia,
      setColor: () => setColor,
      setFont: () => setFont,
      setFontFamily: () => setFontFamily,
      setGradient: () => setGradient,
      setIcon: () => setIcon,
      setMediaTheme: () => setMediaTheme,
      setSVG: () => setSVG,
      setTheme: () => setTheme
    });
    var import_utils9 = __toESM2(require_cjs22(), 1);
    var getColor2 = (value, key, config) => {
      const CONFIG22 = config || getActiveConfig3();
      if (!(0, import_utils9.isString)(value)) {
        if (CONFIG22.verbose)
          console.warn(value, "- type for color is not valid");
        return;
      }
      if (value.slice(0, 2) === "--")
        return `var(${value})`;
      if (key && value[key])
        value = value[key];
      const [name, alpha, tone] = (0, import_utils9.isArray)(value) ? value : value.split(" ");
      const { COLOR: COLOR2, GRADIENT: GRADIENT2 } = CONFIG22;
      let val = COLOR2[name] || GRADIENT2[name];
      if (!val) {
        if (CONFIG22.verbose)
          console.warn("Can't find color ", name);
        return value;
      }
      if (key) {
        if (val[key])
          val = val[key];
        else if (CONFIG22.verbose)
          console.warn(value, " - does not have ", key);
      }
      let rgb = val.rgb;
      if (!rgb) {
        return CONFIG22.useVariable ? `var(${val.var})` : val.value;
      }
      if (tone && !val[tone]) {
        rgb = getRgbTone(rgb, tone);
        val[tone] = { rgb, var: `${val.var}-${tone}` };
      }
      if (val[tone])
        rgb = val[tone].rgb;
      if (alpha)
        return `rgba(${rgb}, ${alpha})`;
      return CONFIG22.useVariable ? `var(${val.var})` : `rgb(${rgb})`;
    };
    var getMediaColor3 = (value, globalTheme, config) => {
      const CONFIG22 = config || getActiveConfig3();
      if (!globalTheme)
        globalTheme = CONFIG22.globalTheme;
      if (!(0, import_utils9.isString)(value)) {
        if (CONFIG22.verbose)
          console.warn(value, "- type for color is not valid");
        return;
      }
      if (value.slice(0, 2) === "--")
        return `var(${value})`;
      const [name] = (0, import_utils9.isArray)(value) ? value : value.split(" ");
      const { COLOR: COLOR2, GRADIENT: GRADIENT2 } = CONFIG22;
      const val = COLOR2[name] || GRADIENT2[name];
      const isObj = (0, import_utils9.isObject)(val);
      if (isObj && val.value)
        return getColor2(value, `@${globalTheme}`, config);
      else if (isObj) {
        if (globalTheme)
          return getColor2(value, `@${globalTheme}`, config);
        else {
          const obj = {};
          for (const mediaName in val) {
            const query = CONFIG22.MEDIA[mediaName.slice(1)];
            const media = `@media screen and ${query}`;
            obj[media] = getColor2(value, mediaName, config);
          }
          return obj;
        }
      } else {
        if (CONFIG22.verbose)
          console.warn("Can't find color", value);
        return value;
      }
    };
    var setColor = (val, key, suffix) => {
      const CONFIG22 = getActiveConfig3();
      if ((0, import_utils9.isString)(val) && val.slice(0, 2) === "--")
        val = getColor2(val.slice(2));
      if ((0, import_utils9.isArray)(val)) {
        return {
          "@light": setColor(val[0], key, "light"),
          "@dark": setColor(val[1], key, "dark")
        };
      }
      if ((0, import_utils9.isObject)(val)) {
        const obj = {};
        for (const variant in val)
          obj[variant] = setColor(val[variant], key, variant.slice(0, 1) === "@" ? variant.slice(1) : variant);
        return obj;
      }
      const CSSVar = `--color-${key}` + (suffix ? `-${suffix}` : "");
      const [r, g, b, a = 1] = colorStringToRgbaArray(val.value || val);
      const alpha = parseFloat(a.toFixed(2));
      const rgb = `${r}, ${g}, ${b}`;
      const value = `rgba(${rgb}, ${alpha})`;
      if (CONFIG22.useVariable) {
        CONFIG22.CSS_VARS[CSSVar] = value;
      }
      return {
        var: CSSVar,
        rgb,
        alpha,
        value
      };
    };
    var setGradient = (val, key, suffix) => {
      const CONFIG22 = getActiveConfig3();
      if ((0, import_utils9.isString)(val) && val.slice(0, 2) === "--")
        val = getColor2(val.slice(2));
      if ((0, import_utils9.isArray)(val)) {
        return {
          "@light": setGradient(val[0], key, "light"),
          "@dark": setGradient(val[0], key, "dark")
        };
      }
      if ((0, import_utils9.isObject)(val)) {
        const obj = {};
        for (const variant in val)
          obj[variant] = setGradient(val[variant], key, variant.slice(0, 1) === "@" ? variant.slice(1) : variant);
        return obj;
      }
      const CSSVar = `--gradient-${key}` + (suffix ? `-${suffix}` : "");
      if (CONFIG22.useVariable) {
        CONFIG22.CSS_VARS[CSSVar] = val.value || val;
      }
      return {
        var: CSSVar,
        value: val.value || val
      };
    };
    var import_utils11 = __toESM2(require_cjs22(), 1);
    var setThemeValue = (theme) => {
      const value = {};
      const { state, media, helpers, ...rest } = theme;
      const keys = Object.keys(rest);
      keys.map((key) => {
        const conditions = ["color", "Color", "background", "border"];
        const isColor = conditions.some((k) => key.includes(k));
        return value[key] = isColor ? getColor2(theme[key]) : theme[key];
      });
      return value;
    };
    var getThemeValue = (theme) => {
      if (theme.value)
        return theme.value;
      theme.value = setThemeValue(theme);
      return theme.value;
    };
    var getTheme = (value, modifier) => {
      const CONFIG22 = getActiveConfig3();
      if (CONFIG22.useVariable)
        return getMediaTheme2(value, modifier);
      const { THEME: THEME2 } = CONFIG22;
      if ((0, import_utils11.isString)(value)) {
        const [theme, subtheme] = value.split(" ");
        const isOurTheme = THEME2[theme];
        if (isOurTheme) {
          if (!subtheme && !modifier)
            return getThemeValue(isOurTheme);
          value = [theme, subtheme || modifier];
        }
      }
      if ((0, import_utils11.isObjectLike)(value) && value[1]) {
        const themeName = value[0];
        const subThemeName = value[1];
        const { helpers, media, state } = THEME2[themeName];
        if (media && media[subThemeName])
          return getThemeValue(media[subThemeName]);
        if (helpers && helpers[subThemeName])
          return getThemeValue(helpers[subThemeName]);
        if (state && state[subThemeName])
          return getThemeValue(state[subThemeName]);
      } else if ((0, import_utils11.isObject)(value))
        return setThemeValue(value);
    };
    var setInverseTheme = (theme, variant, value) => {
      if ((0, import_utils11.isObject)(variant)) {
        theme.variants.inverse.value = setThemeValue(variant);
      } else if (variant === true) {
        const { color, background } = value;
        theme.variants.inverse = {
          value: {
            color: background,
            background: color
          }
        };
      }
    };
    var setPseudo = (theme, key, variant, themeValue) => {
      const result = getTheme(variant);
      themeValue[`&:${key}`] = result;
      if ((0, import_utils11.isObject)(variant) && !variant.value)
        variant.value = result;
    };
    var setSelectors = (theme, value) => {
      const { state } = theme;
      if (!state)
        return;
      const keys = Object.keys(state);
      keys.map((key) => {
        const variant = state[key];
        setPseudo(theme, key, variant, value);
        return theme;
      });
      return theme;
    };
    var setPrefersScheme = (theme, key, variant, themeValue) => {
      const result = getTheme(variant);
      themeValue[`@media (prefers-color-scheme: ${key})`] = result;
      if ((0, import_utils11.isObject)(variant) && !variant.value)
        variant.value = result;
    };
    var setMedia = (theme, value) => {
      const { media } = theme;
      if (!media)
        return;
      const keys = Object.keys(media);
      keys.map((key) => {
        const variant = media[key];
        if (key === "dark" || key === "light")
          setPrefersScheme(theme, key, variant, value);
        if (key === "inverse")
          setInverseTheme(theme, variant, value);
        return theme;
      });
      return theme;
    };
    var setHelpers = (theme, value) => {
      const CONFIG22 = getActiveConfig3();
      const { helpers } = theme;
      if (!helpers)
        return;
      const keys = Object.keys(helpers);
      keys.map((key) => {
        const helper = helpers[key];
        if ((0, import_utils11.isString)(helper))
          helpers[key] = CONFIG22.THEME[helper];
        else
          getThemeValue(helpers[key]);
        return theme;
      });
      return theme;
    };
    var setTheme = (val, key) => {
      const CONFIG22 = getActiveConfig3();
      if (CONFIG22.useVariable)
        return setMediaTheme(val, key);
      const { state, media, helpers } = val;
      const value = setThemeValue(val, key);
      const CSSvar = `--theme-${key}`;
      setSelectors(val, value);
      setMedia(val, value);
      setHelpers(val, value);
      return { var: CSSvar, value, state, media, helpers };
    };
    var setMediaTheme = (val, key, suffix, prefers) => {
      const CONFIG22 = getActiveConfig3();
      const { CSS_VARS: CSS_VARS2 } = CONFIG22;
      const theme = { value: val };
      if ((0, import_utils11.isObjectLike)(val)) {
        for (const param in val) {
          const symb = param.slice(0, 1);
          const value = val[param];
          if (symb === "@" || symb === ":" || symb === ".") {
            const hasPrefers = symb === "@" && param;
            theme[param] = setMediaTheme(value, key, param, prefers || hasPrefers);
          } else {
            const color = getColor2(value, prefers);
            const metaSuffixes = [...new Set([prefers, suffix].filter((v) => v).map((v) => v.slice(1)))];
            const varmetaSuffixName = metaSuffixes.length ? "-" + metaSuffixes.join("-") : "";
            const CSSVar = `--theme-${key}${varmetaSuffixName}-${param}`;
            if (CONFIG22.useVariable) {
              CSS_VARS2[CSSVar] = color;
              theme[param] = `var(${CSSVar})`;
            } else {
              theme[param] = color;
            }
            theme[`.${param}`] = { [param]: theme[param] };
          }
        }
        if (theme.background || theme.color || theme.backgroundColor) {
          theme[".inversed"] = {
            color: theme.background || theme.backgroundColor,
            background: theme.color
          };
        }
      }
      if ((0, import_utils11.isString)(val) && val.slice(0, 2) === "--") {
        const { THEME: THEME2 } = CONFIG22;
        const value = THEME2[val.slice(2)];
        const getReferenced = getMediaTheme2(value, prefers);
        return getReferenced;
      }
      return theme;
    };
    var recursiveTheme = (val) => {
      const CONFIG22 = getActiveConfig3();
      const obj = {};
      for (const param in val) {
        const symb = param.slice(0, 1);
        if ((0, import_utils11.isObjectLike)(val[param])) {
          if (symb === "@") {
            const query = CONFIG22.MEDIA[param.slice(1)];
            const media = `@media screen and ${query}`;
            obj[media] = recursiveTheme(val[param]);
          } else if (symb === ":") {
            obj[`&${param}`] = recursiveTheme(val[param]);
          }
        } else
          obj[param] = val[param];
      }
      return obj;
    };
    var findModifierFromArray = (val, modifierArray) => {
      const currentMod = modifierArray.shift();
      if (val[currentMod])
        return findModifierFromArray(val[currentMod], modifierArray);
      return val;
    };
    var findModifier = (val, modifier) => {
      if ((0, import_utils11.isArray)(modifier))
        return findModifierFromArray(val, modifier);
      else if ((0, import_utils11.isString)(modifier) && val[modifier])
        return val[modifier];
      else
        return val;
    };
    var getMediaTheme2 = (val, mod) => {
      const CONFIG22 = getActiveConfig3();
      if ((0, import_utils11.isString)(val) && val.slice(0, 2) === "--")
        val = getMediaTheme2(val.slice(2));
      if (!val || !(0, import_utils11.isString)(val)) {
        if (CONFIG22.verbose)
          console.warn(val, "- theme is not string");
        return;
      }
      const [name, ...modifier] = (0, import_utils11.isArray)(val) ? val : val.split(" ");
      let value = CONFIG22.THEME[name];
      if (value && (modifier || mod)) {
        value = findModifier(value, modifier.length ? modifier : mod);
      }
      const r = recursiveTheme(value);
      return r;
    };
    var import_utils12 = __toESM2(require_cjs22(), 1);
    var setFont = (val, key) => {
      const CSSvar = `--font-${key}`;
      const fontFace = val[0] ? getFontFaceEach(key, val) : setCustomFontMedia(key, val.url);
      return { var: CSSvar, value: val, fontFace };
    };
    var getFontFamily2 = (key, factory) => {
      const CONFIG22 = getActiveConfig3();
      const { FONT_FAMILY: FONT_FAMILY2 } = CONFIG22;
      return getDefaultOrFirstKey(factory || FONT_FAMILY2, key);
    };
    var setFontFamily = (val, key) => {
      const CONFIG22 = getActiveConfig3();
      const { FONT_FAMILY: FONT_FAMILY2, FONT_FAMILY_TYPES: FONT_FAMILY_TYPES2 } = CONFIG22;
      let { value, type } = val;
      if (val.isDefault)
        FONT_FAMILY2.default = key;
      if ((0, import_utils12.isObject)(value))
        value = arrayzeValue(value);
      const CSSvar = `--font-family-${key}`;
      const str = `${value.join(", ")}, ${FONT_FAMILY_TYPES2[type]}`;
      return { var: CSSvar, value: str, arr: value, type };
    };
    var import_utils15 = __toESM2(require_cjs22(), 1);
    var runThroughMedia = (props) => {
      const CONFIG22 = getActiveConfig3();
      const { TYPOGRAPHY: TYPOGRAPHY2, MEDIA: MEDIA2 } = CONFIG22;
      for (const prop in props) {
        const mediaProps = props[prop];
        if (prop.slice(0, 1) === "@") {
          const { type, base, ratio, range, subSequence, h1Matches, unit } = props;
          (0, import_utils15.merge)(mediaProps, {
            type,
            base,
            ratio,
            range,
            subSequence,
            h1Matches,
            unit,
            sequence: {},
            scales: {},
            templates: {},
            vars: {}
          });
          generateSequence(mediaProps);
          const mediaName = prop.slice(1);
          applySequenceVars(mediaProps, mediaName);
          const query = MEDIA2[mediaName];
          TYPOGRAPHY2.templates[`@media screen and ${query}`] = {
            fontSize: mediaProps.base / TYPOGRAPHY2.browserDefault + unit
          };
        }
      }
    };
    var applyHeadings = (props) => {
      const CONFIG22 = getActiveConfig3();
      if (props.h1Matches) {
        const unit = props.unit;
        const HEADINGS = findHeadings(props);
        const { templates } = props;
        for (const k in HEADINGS) {
          const headerName = `h${parseInt(k) + 1}`;
          const headerStyle = templates[headerName];
          templates[headerName] = {
            fontSize: CONFIG22.useVariable ? `var(${HEADINGS[k].variable})` : `${HEADINGS[k].scaling}${unit}`,
            margin: headerStyle ? headerStyle.margin : 0,
            lineHeight: headerStyle ? headerStyle.lineHeight : props.lineHeight,
            letterSpacing: headerStyle ? headerStyle.letterSpacing : props.letterSpacing,
            fontWeight: headerStyle ? headerStyle.fontWeight : 900 - k * 100
          };
        }
      }
    };
    var applyTypographySequence = () => {
      const CONFIG22 = getActiveConfig3();
      const { TYPOGRAPHY: TYPOGRAPHY2 } = CONFIG22;
      generateSequence(TYPOGRAPHY2);
      applyHeadings(TYPOGRAPHY2);
      applySequenceVars(TYPOGRAPHY2);
      runThroughMedia(TYPOGRAPHY2);
    };
    var getFontSizeByKey2 = (value) => {
      const CONFIG22 = getActiveConfig3();
      const { TYPOGRAPHY: TYPOGRAPHY2 } = CONFIG22;
      return getSequenceValuePropertyPair(
        value,
        "fontSize",
        TYPOGRAPHY2
      );
    };
    var import_utils18 = __toESM2(require_cjs22(), 1);
    var runThroughMedia2 = (sequenceProps) => {
      for (const prop in sequenceProps) {
        const mediaProps = sequenceProps[prop];
        if (prop.slice(0, 1) === "@") {
          const { type, base, ratio, range, subSequence, h1Matches, unit } = sequenceProps;
          (0, import_utils18.merge)(mediaProps, {
            type,
            base,
            ratio,
            range,
            subSequence,
            h1Matches,
            unit,
            sequence: {},
            scales: {},
            templates: {},
            vars: {}
          });
          generateSequence(mediaProps);
          const mediaName = prop.slice(1);
          applySequenceVars(mediaProps, mediaName);
        }
      }
    };
    var applySpacingSequence = () => {
      const CONFIG22 = getActiveConfig3();
      const { SPACING: SPACING2 } = CONFIG22;
      generateSequence(SPACING2);
      applySequenceVars(SPACING2);
      runThroughMedia2(SPACING2);
    };
    var getSequence = (sequenceProps) => {
      const CONFIG22 = getActiveConfig3();
      const { SPACING: SPACING2 } = CONFIG22;
      if (!sequenceProps)
        return SPACING2;
      const hasGenerated = Object.keys(sequenceProps.sequence).length > 0;
      return hasGenerated ? sequenceProps : generateSequence(sequenceProps);
    };
    var getSpacingByKey3 = (value, propertyName = "padding", sequenceProps) => {
      const sequence = getSequence(sequenceProps);
      const stack = arrayzeValue(value);
      if (!stack)
        return;
      if ((0, import_utils18.isString)(value) && value.includes("calc")) {
        return { [propertyName]: value };
      }
      if (stack.length > 1) {
        let suffix = "";
        if (propertyName === "borderWidth") {
          propertyName = "border";
          suffix = "Width";
        }
        const directions = {
          2: ["Block", "Inline"],
          3: ["BlockStart", "Inline", "BlockEnd"],
          4: ["BlockStart", "InlineEnd", "BlockEnd", "InlineStart"]
        };
        const wrapSequenceValueByDirection = (direction, i) => getSequenceValuePropertyPair(
          stack[i],
          propertyName + direction + suffix,
          sequence
        );
        return directions[stack.length].map((dir, key) => wrapSequenceValueByDirection(dir, key));
      }
      return getSequenceValuePropertyPair(
        value,
        propertyName,
        sequence
      );
    };
    var getSpacingBasedOnRatio4 = (props, propertyName, val) => {
      const CONFIG22 = getActiveConfig3();
      const { SPACING: SPACING2 } = CONFIG22;
      const { spacingRatio, unit } = props;
      const value = val || props[propertyName];
      if (spacingRatio) {
        let sequenceProps = SPACING2[spacingRatio];
        if (!sequenceProps) {
          const { type, base, range, subSequence } = SPACING2;
          sequenceProps = SPACING2[spacingRatio] = (0, import_utils18.merge)({
            ratio: spacingRatio,
            type: type + "-" + spacingRatio,
            unit,
            sequence: {},
            scales: {},
            templates: {},
            vars: {}
          }, {
            base,
            range,
            subSequence,
            ratio: SPACING2.ratio,
            unit: SPACING2.unit
          });
        }
        applySequenceVars(sequenceProps, null, { useDefault: false });
        return getSpacingByKey3(value, propertyName, sequenceProps);
      }
      return getSpacingByKey3(value, propertyName);
    };
    var applyTimingSequence = () => {
      const CONFIG22 = getActiveConfig3();
      const { TIMING: TIMING2 } = CONFIG22;
      generateSequence(TIMING2);
      applySequenceVars(TIMING2);
    };
    var getTimingFunction3 = (value) => {
      const CONFIG22 = getActiveConfig3();
      const { TIMING: TIMING2 } = CONFIG22;
      return TIMING2[value] || TIMING2[toCamelCase(value)] || value;
    };
    var getTimingByKey2 = (value, property = "timing") => {
      const CONFIG22 = getActiveConfig3();
      const { TIMING: TIMING2 } = CONFIG22;
      return getSequenceValuePropertyPair(
        value,
        property,
        TIMING2
      );
    };
    var import_utils222 = __toESM2(require_cjs22(), 1);
    var applyDocument = () => {
      const CONFIG22 = getActiveConfig3();
      const { DOCUMENT: DOCUMENT2, FONT_FAMILY: FONT_FAMILY2, THEME: THEME2, TYPOGRAPHY: TYPOGRAPHY2 } = CONFIG22;
      return (0, import_utils222.merge)(DOCUMENT2, {
        theme: THEME2.document,
        fontFamily: getDefaultOrFirstKey(FONT_FAMILY2),
        fontSize: TYPOGRAPHY2.base,
        lineHeight: TYPOGRAPHY2.lineHeight
      });
    };
    var import_globals2 = __toESM2(require_cjs6(), 1);
    var DEF_OPTIONS = {
      document: import_globals2.document
    };
    var setSVG = (val, key) => {
      const CONFIG22 = getActiveConfig3();
      if (!val) {
        if (CONFIG22.verbose)
          console.warn("setSVG: val is not defined", key);
        return;
      }
      if (CONFIG22.useSvgSprite) {
        return convertSvgToSymbol(key, val);
      }
      return val;
    };
    var appendSVGSprite2 = (LIBRARY, options = DEF_OPTIONS) => {
      const CONFIG22 = getActiveConfig3();
      const lib = Object.keys(LIBRARY).length ? {} : CONFIG22.SVG;
      for (const key in LIBRARY)
        lib[key] = CONFIG22.SVG[key];
      appendSVG(lib, options);
    };
    var setIcon = (val, key) => {
      const CONFIG22 = getActiveConfig3();
      if (CONFIG22.useIconSprite) {
        return setSVG(val, key);
      }
      return val;
    };
    var appendIconsSprite2 = (LIBRARY, options = DEF_OPTIONS) => {
      const CONFIG22 = getActiveConfig3();
      const lib = Object.keys(LIBRARY).length ? {} : CONFIG22.ICONS;
      for (const key in LIBRARY)
        lib[key] = CONFIG22.ICONS[key];
      appendSVG(lib, options);
    };
    var createSVGSpriteElement = (options = { isRoot: true }) => {
      if (!import_globals2.document || !import_globals2.document.createElementNS)
        return;
      const svgElem = import_globals2.document.createElementNS("http://www.w3.org/2000/svg", "svg");
      if (options.isRoot) {
        svgElem.setAttribute("aria-hidden", "true");
        svgElem.setAttribute("width", "0");
        svgElem.setAttribute("height", "0");
        svgElem.setAttribute("style", "position:absolute");
        svgElem.setAttribute("id", "svgSprite");
      }
      return svgElem;
    };
    var appendSVG = (lib, options = DEF_OPTIONS) => {
      const CONFIG22 = getActiveConfig3();
      const doc = options.document || import_globals2.document;
      if (!doc || !doc.documentElement) {
        if (CONFIG22.verbose) {
          console.warn("To append SVG sprites it should be run in browser environment");
        }
        return generateSprite(lib);
      }
      const exists = doc.querySelector("#svgSprite");
      const SVGsprite = generateSprite(lib);
      if (exists) {
        const tempSVG = createSVGSpriteElement({ isRoot: false });
        tempSVG.innerHTML = SVGsprite;
        exists.append(...tempSVG.children);
      } else {
        const svgSpriteDOM = createSVGSpriteElement();
        if (svgSpriteDOM && svgSpriteDOM.nodeType) {
          svgSpriteDOM.innerHTML = SVGsprite;
          doc.body.prepend(svgSpriteDOM);
        }
      }
    };
    var import_utils25 = __toESM2(require_cjs22(), 1);
    var applyReset = (reset = {}) => {
      const CONFIG22 = getActiveConfig3();
      const { RESET: RESET2, TYPOGRAPHY: TYPOGRAPHY2, DOCUMENT: DOCUMENT2 } = CONFIG22;
      if (RESET2) {
        if (RESET2[":root"]) {
          const configReset = RESET2;
          const configTemplates = TYPOGRAPHY2.templates;
          configReset.body = {
            ...CONFIG22.useDocumentTheme ? getMediaTheme2("document", `@${CONFIG22.globalTheme}`) : {},
            ...configTemplates.body
          };
          configReset.h1 = configTemplates.h1;
          configReset.h2 = configTemplates.h2;
          configReset.h3 = configTemplates.h3;
          configReset.h4 = configTemplates.h4;
          configReset.h5 = configTemplates.h5;
          configReset.h6 = configTemplates.h6;
        }
        const { body, ...templates } = TYPOGRAPHY2.templates;
        const globalTheme = CONFIG22.useDocumentTheme ? getMediaTheme2("document", `@${CONFIG22.globalTheme}`) : {};
        if (RESET2.html)
          (0, import_utils25.overwriteDeep)(RESET2.html, globalTheme);
        return (0, import_utils25.deepMerge)((0, import_utils25.merge)(RESET2, reset), {
          html: {
            position: "absolute",
            // overflow: 'hidden',
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
            margin: "0",
            WebkitFontSmoothing: "subpixel-antialiased",
            scrollBehavior: "smooth",
            ...globalTheme,
            fontSize: TYPOGRAPHY2.browserDefault + "px",
            fontFamily: DOCUMENT2.fontFamily,
            lineHeight: DOCUMENT2.lineHeight
          },
          body: {
            boxSizing: "border-box",
            height: "100%",
            margin: 0,
            fontFamily: DOCUMENT2.fontFamily,
            fontSize: TYPOGRAPHY2.base / TYPOGRAPHY2.browserDefault + CONFIG22.UNIT.default,
            ...templates,
            ...body
          },
          // form elements
          fieldset: {
            border: 0,
            padding: 0,
            margin: 0
          },
          "select, input": {
            fontFamily: DOCUMENT2.fontFamily
          }
        });
      }
    };
    var import_utils26 = __toESM2(require_cjs22(), 1);
    var isBorderStyle = (str) => [
      "none",
      "hidden",
      "dotted",
      "dashed",
      "solid",
      "double",
      "groove",
      "ridge",
      "inset",
      "outset",
      "initial"
    ].some((v) => str.includes(v));
    var transformBorder2 = (border) => {
      const arr = border.split(", ");
      return arr.map((v) => {
        v = v.trim();
        if (v.slice(0, 2) === "--")
          return `var(${v})`;
        else if (isBorderStyle(v))
          return v || "solid";
        else if (v.slice(-2) === "px" || v.slice(-2) === "em")
          return v;
        else if (getColor2(v).length > 2)
          return getColor2(v);
        return getSpacingByKey3(v, "border").border;
      }).join(" ");
    };
    var transformTextStroke2 = (stroke) => {
      return stroke.split(", ").map((v) => {
        if (v.slice(0, 2) === "--")
          return `var(${v})`;
        if (v.includes("px"))
          return v;
        else if (getColor2(v))
          return getColor2(v);
        return v;
      }).join(" ");
    };
    var transformShadow2 = (shadows) => shadows.split("|").map((shadow) => {
      return shadow.split(", ").map((v) => {
        v = v.trim();
        if (v.slice(0, 2) === "--")
          return `var(${v})`;
        if (getColor2(v).length > 2)
          return getColor2(v);
        if (v.includes("px") || v.slice(-2) === "em")
          return v;
        const arr = v.split(" ");
        if (!arr.length)
          return v;
        return arr.map((v2) => getSpacingByKey3(v2, "shadow").shadow).join(" ");
      }).join(" ");
    }).join(",");
    var transformBackgroundImage2 = (backgroundImage, globalTheme) => {
      const CONFIG22 = getActiveConfig3();
      return backgroundImage.split(", ").map((v) => {
        if (v.slice(0, 2) === "--")
          return `var(${v})`;
        if (v.includes("url") || v.includes("gradient"))
          return v;
        else if (CONFIG22.GRADIENT[backgroundImage]) {
          return {
            backgroundImage: getMediaColor3(backgroundImage, globalTheme || CONFIG22.globalTheme)
          };
        } else if (v.includes("/") || v.includes("http"))
          return `url(${v})`;
        return v;
      }).join(" ");
    };
    var transfromGap2 = (gap) => (0, import_utils26.isString)(gap) && gap.split(" ").map((v) => getSpacingByKey3(v, "gap").gap).join(" ");
    var transformTransition = (transition) => {
      const arr = transition.split(" ");
      if (!arr.length)
        return transition;
      return arr.map((v) => {
        if (v.slice(0, 2) === "--")
          return `var(${v})`;
        if (v.length < 3 || v.includes("ms")) {
          const mapWithSequence = getTimingByKey2(v);
          return mapWithSequence.timing || v;
        }
        if (getTimingFunction3(v))
          return getTimingFunction3(v);
        return v;
      }).join(" ");
    };
    var transformDuration2 = (duration, props, propertyName) => {
      if (!(0, import_utils26.isString)(duration))
        return;
      return duration.split(",").map((v) => getTimingByKey2(v).timing || v).join(",");
    };
    var splitTransition2 = (transition) => {
      const arr = transition.split(",");
      if (!arr.length)
        return;
      return arr.map(transformTransition).join(",");
    };
    var import_utils27 = __toESM2(require_cjs22(), 1);
    var setCases = (val, key) => {
      if ((0, import_utils27.isFunction)(val))
        return val();
      return val;
    };
    var setSameValue = (val, key) => val;
    var VALUE_TRANSFORMERS = {
      color: setColor,
      gradient: setGradient,
      font: setFont,
      font_family: setFontFamily,
      theme: setTheme,
      icons: setIcon,
      svg: setSVG,
      svg_data: setSameValue,
      typography: setSameValue,
      cases: setCases,
      spacing: setSameValue,
      media: setSameValue,
      timing: setSameValue,
      reset: setSameValue,
      unit: setSameValue,
      animation: setSameValue
    };
    var setValue = (FACTORY_NAME, value, key) => {
      const CONFIG22 = getActiveConfig3();
      const factoryName = FACTORY_NAME.toLowerCase();
      const FACTORY2 = CONFIG22[FACTORY_NAME];
      if (VALUE_TRANSFORMERS[factoryName]) {
        const result = VALUE_TRANSFORMERS[factoryName](value, key);
        FACTORY2[key] = result;
        return FACTORY2;
      }
      if (CONFIG22.verbose)
        console.warn("Can not find", factoryName, "method in scratch");
    };
    var setEach = (factoryName, props) => {
      const CONFIG22 = getActiveConfig3();
      const FACTORY_NAME = factoryName.toUpperCase();
      const keys = Object.keys(props);
      keys.map((key) => setValue(FACTORY_NAME, props[key], key));
      return CONFIG22[FACTORY_NAME];
    };
    var SET_OPTIONS = {};
    var set2 = (recivedConfig, options = SET_OPTIONS) => {
      let CONFIG22 = getActiveConfig3();
      const {
        version,
        verbose,
        useVariable,
        useReset,
        useSvgSprite,
        useFontImport,
        useIconSprite,
        globalTheme,
        useDocumentTheme,
        ...config
      } = recivedConfig;
      if (options.newConfig) {
        CONFIG22 = setActiveConfig(options.newConfig);
      }
      if (verbose !== void 0)
        CONFIG22.verbose = verbose;
      if (useVariable !== void 0)
        CONFIG22.useVariable = useVariable;
      if (useReset !== void 0)
        CONFIG22.useReset = useReset;
      if (useFontImport !== void 0)
        CONFIG22.useFontImport = useFontImport;
      if (useSvgSprite !== void 0)
        CONFIG22.useSvgSprite = useSvgSprite;
      if (useIconSprite !== void 0)
        CONFIG22.useIconSprite = useIconSprite;
      if (useDocumentTheme !== void 0)
        CONFIG22.useDocumentTheme = useDocumentTheme;
      if (globalTheme !== void 0)
        CONFIG22.globalTheme = globalTheme;
      if (CONFIG22.verbose)
        console.log(CONFIG22);
      if (!CONFIG22.__svg_cache)
        CONFIG22.__svg_cache = {};
      const keys = Object.keys(config);
      keys.map((key) => setEach(key, config[key]));
      applyTypographySequence();
      applySpacingSequence();
      applyTimingSequence();
      applyDocument();
      applyReset();
      return CONFIG22;
    };
  }
});
var require_key = __commonJS({
  "../smbls/node_modules/@domql/utils/dist/cjs/key.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var key_exports = {};
    __export2(key_exports, {
      createSnapshotId: () => createSnapshotId,
      generateKey: () => generateKey
    });
    module2.exports = __toCommonJS2(key_exports);
    var generateKey = function() {
      let index = 0;
      function newId() {
        index++;
        return index;
      }
      return newId;
    }();
    var createSnapshotId = generateKey;
  }
});
var require_env = __commonJS({
  "../smbls/node_modules/@domql/utils/dist/cjs/env.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var env_exports = {};
    __export2(env_exports, {
      NODE_ENV: () => NODE_ENV,
      getNev: () => getNev,
      isDevelopment: () => isDevelopment,
      isProduction: () => isProduction,
      isTest: () => isTest
    });
    module2.exports = __toCommonJS2(env_exports);
    var NODE_ENV = "development";
    var isProduction = (env = NODE_ENV) => env === "production" || env === "prod" || env !== "development" && env !== "dev" && env !== "test";
    var isTest = (env = NODE_ENV) => env === "test";
    var isDevelopment = (env = NODE_ENV) => env === "development" || env === "dev";
    var getNev = (key, env = NODE_ENV) => env[key];
  }
});
var require_globals = __commonJS({
  "../smbls/node_modules/@domql/utils/dist/cjs/globals.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var globals_exports = {};
    __export2(globals_exports, {
      document: () => document2,
      global: () => global,
      self: () => self,
      window: () => window
    });
    module2.exports = __toCommonJS2(globals_exports);
    var global = globalThis;
    var self = globalThis;
    var window = globalThis;
    var document2 = window.document;
  }
});
var require_node = __commonJS({
  "../smbls/node_modules/@domql/utils/dist/cjs/node.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var node_exports = {};
    __export2(node_exports, {
      isHtmlElement: () => isHtmlElement,
      isNode: () => isNode
    });
    module2.exports = __toCommonJS2(node_exports);
    var import_globals = require_globals();
    var isNode = (obj) => {
      return (typeof Node === "object" ? obj instanceof import_globals.window.Node : obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName === "string") || false;
    };
    var isHtmlElement = (obj) => {
      return (typeof HTMLElement === "object" ? obj instanceof import_globals.window.HTMLElement : obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string") || false;
    };
  }
});
var require_types = __commonJS({
  "../smbls/node_modules/@domql/utils/dist/cjs/types.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var types_exports = {};
    __export2(types_exports, {
      TYPES: () => TYPES,
      is: () => is,
      isArray: () => isArray3,
      isBoolean: () => isBoolean,
      isDefined: () => isDefined,
      isFunction: () => isFunction,
      isNot: () => isNot2,
      isNull: () => isNull,
      isNumber: () => isNumber,
      isObject: () => isObject4,
      isObjectLike: () => isObjectLike2,
      isString: () => isString3,
      isUndefined: () => isUndefined
    });
    module2.exports = __toCommonJS2(types_exports);
    var import_node = require_node();
    var isObject4 = (arg) => {
      if (arg === null)
        return false;
      return typeof arg === "object" && arg.constructor === Object;
    };
    var isString3 = (arg) => typeof arg === "string";
    var isNumber = (arg) => typeof arg === "number";
    var isFunction = (arg) => typeof arg === "function";
    var isBoolean = (arg) => arg === true || arg === false;
    var isNull = (arg) => arg === null;
    var isArray3 = (arg) => Array.isArray(arg);
    var isObjectLike2 = (arg) => {
      if (arg === null)
        return false;
      return typeof arg === "object";
    };
    var isDefined = (arg) => {
      return isObject4(arg) || isObjectLike2(arg) || isString3(arg) || isNumber(arg) || isFunction(arg) || isArray3(arg) || isObjectLike2(arg) || isBoolean(arg) || isNull(arg);
    };
    var isUndefined = (arg) => {
      return arg === void 0;
    };
    var TYPES = {
      boolean: isBoolean,
      array: isArray3,
      object: isObject4,
      string: isString3,
      number: isNumber,
      null: isNull,
      function: isFunction,
      objectLike: isObjectLike2,
      node: import_node.isNode,
      htmlElement: import_node.isHtmlElement,
      defined: isDefined
    };
    var is = (arg) => {
      return (...args) => {
        return args.map((val) => TYPES[val](arg)).filter((v) => v).length > 0;
      };
    };
    var isNot2 = (arg) => {
      return (...args) => {
        return args.map((val) => TYPES[val](arg)).filter((v) => v).length === 0;
      };
    };
  }
});
var require_array = __commonJS({
  "../smbls/node_modules/@domql/utils/dist/cjs/array.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var array_exports = {};
    __export2(array_exports, {
      arrayContainsOtherArray: () => arrayContainsOtherArray,
      createNestedObject: () => createNestedObject,
      cutArrayAfterValue: () => cutArrayAfterValue,
      cutArrayBeforeValue: () => cutArrayBeforeValue,
      joinArrays: () => joinArrays,
      mergeAndCloneIfArray: () => mergeAndCloneIfArray,
      mergeArray: () => mergeArray,
      removeFromArray: () => removeFromArray,
      swapItemsInArray: () => swapItemsInArray
    });
    module2.exports = __toCommonJS2(array_exports);
    var import_object = require_object();
    var import_types = require_types();
    var arrayContainsOtherArray = (arr1, arr2) => {
      return arr2.every((val) => arr1.includes(val));
    };
    var removeFromArray = (arr, index) => {
      if ((0, import_types.isString)(index))
        index = parseInt(index);
      if ((0, import_types.isNumber)(index)) {
        if (index < 0 || index >= arr.length || isNaN(index)) {
          throw new Error("Invalid index");
        }
        arr.splice(index, 1);
      } else if ((0, import_types.isArray)(index)) {
        index.forEach((idx) => removeFromArray(arr, idx));
      } else {
        throw new Error("Invalid index");
      }
      return arr;
    };
    var swapItemsInArray = (arr, i, j) => {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    };
    var joinArrays = (...arrays) => {
      return [].concat(...arrays);
    };
    var mergeArray = (arr, excludeFrom = []) => {
      return arr.reduce((a, c) => (0, import_object.deepMerge)(a, (0, import_object.deepClone)(c, excludeFrom), excludeFrom), {});
    };
    var mergeAndCloneIfArray = (obj) => {
      return (0, import_types.isArray)(obj) ? mergeArray(obj) : (0, import_object.deepClone)(obj);
    };
    var cutArrayBeforeValue = (arr, value) => {
      const index = arr.indexOf(value);
      if (index !== -1) {
        return arr.slice(0, index);
      }
      return arr;
    };
    var cutArrayAfterValue = (arr, value) => {
      const index = arr.indexOf(value);
      if (index !== -1) {
        return arr.slice(index + 1);
      }
      return arr;
    };
    var createNestedObject = (arr, lastValue) => {
      const nestedObject = {};
      if (arr.length === 0) {
        return lastValue;
      }
      arr.reduce((obj, value, index) => {
        if (!obj[value]) {
          obj[value] = {};
        }
        if (index === arr.length - 1 && lastValue) {
          obj[value] = lastValue;
        }
        return obj[value];
      }, nestedObject);
      return nestedObject;
    };
  }
});
var require_string = __commonJS({
  "../smbls/node_modules/@domql/utils/dist/cjs/string.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var string_exports = {};
    __export2(string_exports, {
      replaceLiteralsWithObjectFields: () => replaceLiteralsWithObjectFields,
      stringIncludesAny: () => stringIncludesAny
    });
    module2.exports = __toCommonJS2(string_exports);
    var stringIncludesAny = (str, characters2) => {
      for (const char2 of characters2) {
        if (str.includes(char2)) {
          return true;
        }
      }
      return false;
    };
    var brackRegex = /\{\{\s*((?:\.\.\/)+)?([^}\s]+)\s*\}\}/g;
    var replaceLiteralsWithObjectFields = (str, state) => {
      if (!str.includes("{{"))
        return str;
      return str.replace(brackRegex, (_, parentPath, variable) => {
        if (parentPath) {
          const parentLevels = parentPath.match(/\.\.\//g).length;
          let parentState = state;
          for (let i = 0; i < parentLevels; i++) {
            parentState = parentState.parent;
            if (!parentState) {
              return "";
            }
          }
          const value = parentState[variable.trim()];
          return value !== void 0 ? `${value}` : "";
        } else {
          const value = state[variable.trim()];
          return value !== void 0 ? `${value}` : "";
        }
      });
    };
  }
});
var require_object = __commonJS({
  "../smbls/node_modules/@domql/utils/dist/cjs/object.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var object_exports = {};
    __export2(object_exports, {
      clone: () => clone,
      deepClone: () => deepClone3,
      deepCloneExclude: () => deepCloneExclude,
      deepDestringify: () => deepDestringify,
      deepMerge: () => deepMerge2,
      deepStringify: () => deepStringify,
      detachFunctionsFromObject: () => detachFunctionsFromObject,
      diff: () => diff2,
      diffArrays: () => diffArrays,
      diffObjects: () => diffObjects,
      exec: () => exec2,
      flattenRecursive: () => flattenRecursive,
      isEqualDeep: () => isEqualDeep,
      map: () => map,
      merge: () => merge3,
      mergeArrayExclude: () => mergeArrayExclude,
      mergeIfExisted: () => mergeIfExisted,
      objectToString: () => objectToString,
      overwrite: () => overwrite,
      overwriteDeep: () => overwriteDeep,
      overwriteShallow: () => overwriteShallow2,
      removeFromObject: () => removeFromObject,
      stringToObject: () => stringToObject
    });
    module2.exports = __toCommonJS2(object_exports);
    var import_globals = require_globals();
    var import_types = require_types();
    var import_array = require_array();
    var import_string = require_string();
    var exec2 = (param, element, state, context) => {
      if ((0, import_types.isFunction)(param)) {
        return param(
          element,
          state || element.state,
          context || element.context
        );
      }
      return param;
    };
    var map = (obj, extention, element) => {
      for (const e in extention) {
        obj[e] = exec2(extention[e], element);
      }
    };
    var merge3 = (element, obj, excludeFrom = []) => {
      for (const e in obj) {
        const hasOwnProperty = Object.prototype.hasOwnProperty.call(obj, e);
        if (!hasOwnProperty || excludeFrom.includes(e) || e.startsWith("__"))
          continue;
        const elementProp = element[e];
        const objProp = obj[e];
        if (elementProp === void 0) {
          element[e] = objProp;
        }
      }
      return element;
    };
    var deepMerge2 = (element, extend, excludeFrom = []) => {
      for (const e in extend) {
        const hasOwnProperty = Object.prototype.hasOwnProperty.call(extend, e);
        if (!hasOwnProperty || excludeFrom.includes(e) || e.startsWith("__"))
          continue;
        const elementProp = element[e];
        const extendProp = extend[e];
        if ((0, import_types.isObjectLike)(elementProp) && (0, import_types.isObjectLike)(extendProp)) {
          deepMerge2(elementProp, extendProp);
        } else if (elementProp === void 0) {
          element[e] = extendProp;
        }
      }
      return element;
    };
    var clone = (obj, excludeFrom = []) => {
      const o = {};
      for (const prop in obj) {
        const hasOwnProperty = Object.prototype.hasOwnProperty.call(obj, prop);
        if (!hasOwnProperty || excludeFrom.includes(prop) || prop.startsWith("__"))
          continue;
        o[prop] = obj[prop];
      }
      return o;
    };
    var deepCloneExclude = (obj, excludeFrom = []) => {
      if ((0, import_types.isArray)(obj)) {
        return obj.map((x) => deepCloneExclude(x, excludeFrom));
      }
      const o = {};
      for (const k in obj) {
        const hasOwnProperty = Object.prototype.hasOwnProperty.call(obj, k);
        if (!hasOwnProperty || excludeFrom.includes(k) || k.startsWith("__"))
          continue;
        let v = obj[k];
        if (k === "extend" && (0, import_types.isArray)(v)) {
          v = mergeArrayExclude(v, excludeFrom);
        }
        if ((0, import_types.isArray)(v)) {
          o[k] = v.map((x) => deepCloneExclude(x, excludeFrom));
        } else if ((0, import_types.isObject)(v)) {
          o[k] = deepCloneExclude(v, excludeFrom);
        } else
          o[k] = v;
      }
      return o;
    };
    var mergeArrayExclude = (arr, excl = []) => {
      return arr.reduce((acc, curr) => deepMerge2(acc, deepCloneExclude(curr, excl)), {});
    };
    var deepClone3 = (obj, excludeFrom = []) => {
      const o = (0, import_types.isArray)(obj) ? [] : {};
      for (const prop in obj) {
        if (prop === "__proto__")
          continue;
        if (excludeFrom.includes(prop) || prop.startsWith("__"))
          continue;
        let objProp = obj[prop];
        if (prop === "extend" && (0, import_types.isArray)(objProp)) {
          objProp = (0, import_array.mergeArray)(objProp);
        }
        if ((0, import_types.isObjectLike)(objProp)) {
          o[prop] = deepClone3(objProp, excludeFrom);
        } else
          o[prop] = objProp;
      }
      return o;
    };
    var deepStringify = (obj, stringified = {}) => {
      for (const prop in obj) {
        const objProp = obj[prop];
        if ((0, import_types.isFunction)(objProp)) {
          stringified[prop] = objProp.toString();
        } else if ((0, import_types.isObject)(objProp)) {
          stringified[prop] = {};
          deepStringify(objProp, stringified[prop]);
        } else if ((0, import_types.isArray)(objProp)) {
          stringified[prop] = [];
          objProp.forEach((v, i) => {
            if ((0, import_types.isObject)(v)) {
              stringified[prop][i] = {};
              deepStringify(v, stringified[prop][i]);
            } else if ((0, import_types.isFunction)(v)) {
              stringified[prop][i] = v.toString();
            } else {
              stringified[prop][i] = v;
            }
          });
        } else {
          stringified[prop] = objProp;
        }
      }
      return stringified;
    };
    var objectToString = (obj, indent = 0) => {
      const spaces = "  ".repeat(indent);
      let str = "{\n";
      for (const [key, value] of Object.entries(obj)) {
        const keyAllowdChars = (0, import_string.stringIncludesAny)(key, ["-", ":", "@", ".", "!"]);
        const stringedKey = keyAllowdChars ? `'${key}'` : key;
        str += `${spaces}  ${stringedKey}: `;
        if ((0, import_types.isArray)(value)) {
          str += "[\n";
          for (const element of value) {
            if ((0, import_types.isObject)(element) && element !== null) {
              str += `${spaces}    ${objectToString(element, indent + 2)},
`;
            } else if ((0, import_types.isString)(element)) {
              str += `${spaces}    '${element}',
`;
            } else {
              str += `${spaces}    ${element},
`;
            }
          }
          str += `${spaces}  ]`;
        } else if ((0, import_types.isObject)(value)) {
          str += objectToString(value, indent + 1);
        } else if ((0, import_types.isString)(value)) {
          str += (0, import_string.stringIncludesAny)(value, ["\n", "'"]) ? `\`${value}\`` : `'${value}'`;
        } else {
          str += value;
        }
        str += ",\n";
      }
      str += `${spaces}}`;
      return str;
    };
    var detachFunctionsFromObject = (obj, detached = {}) => {
      for (const prop in obj) {
        const objProp = obj[prop];
        if ((0, import_types.isFunction)(objProp))
          continue;
        else if ((0, import_types.isObject)(objProp)) {
          detached[prop] = {};
          deepStringify(objProp, detached[prop]);
        } else if ((0, import_types.isArray)(objProp)) {
          detached[prop] = [];
          objProp.forEach((v, i) => {
            if ((0, import_types.isFunction)(v))
              return;
            if ((0, import_types.isObject)(v)) {
              detached[prop][i] = {};
              detachFunctionsFromObject(v, detached[prop][i]);
            } else {
              detached[prop][i] = v;
            }
          });
        } else {
          detached[prop] = objProp;
        }
      }
      return detached;
    };
    var deepDestringify = (obj, stringified = {}) => {
      for (const prop in obj) {
        const hasOwnProperty = Object.prototype.hasOwnProperty.call(obj, prop);
        if (!hasOwnProperty)
          continue;
        const objProp = obj[prop];
        if ((0, import_types.isString)(objProp)) {
          if (objProp.includes("=>") || objProp.includes("function") || objProp.startsWith("(")) {
            try {
              const evalProp = import_globals.window.eval(`(${objProp})`);
              stringified[prop] = evalProp;
            } catch (e) {
              if (e)
                stringified[prop] = objProp;
            }
          } else {
            stringified[prop] = objProp;
          }
        } else if ((0, import_types.isArray)(objProp)) {
          stringified[prop] = [];
          objProp.forEach((arrProp) => {
            if ((0, import_types.isString)(arrProp)) {
              if (arrProp.includes("=>") || arrProp.includes("function") || arrProp.startsWith("(")) {
                try {
                  const evalProp = import_globals.window.eval(`(${arrProp})`);
                  stringified[prop].push(evalProp);
                } catch (e) {
                  if (e)
                    stringified[prop].push(arrProp);
                }
              } else {
                stringified[prop].push(arrProp);
              }
            } else if ((0, import_types.isObject)(arrProp)) {
              stringified[prop].push(deepDestringify(arrProp));
            } else {
              stringified[prop].push(arrProp);
            }
          });
        } else if ((0, import_types.isObject)(objProp)) {
          stringified[prop] = deepDestringify(objProp, stringified[prop]);
        } else {
          stringified[prop] = objProp;
        }
      }
      return stringified;
    };
    var stringToObject = (str) => {
      let obj;
      try {
        obj = import_globals.window.eval("(" + str + ")");
      } catch (e) {
        console.warn(e);
      }
      if (obj)
        return obj;
    };
    var diffObjects = (original, objToDiff, cache) => {
      for (const e in objToDiff) {
        if (e === "ref")
          continue;
        const originalProp = original[e];
        const objToDiffProp = objToDiff[e];
        if ((0, import_types.isObject)(originalProp) && (0, import_types.isObject)(objToDiffProp)) {
          cache[e] = {};
          diff2(originalProp, objToDiffProp, cache[e]);
        } else if (objToDiffProp !== void 0) {
          cache[e] = objToDiffProp;
        }
      }
      return cache;
    };
    var diffArrays = (original, objToDiff, cache) => {
      if (original.length !== objToDiff.length) {
        cache = objToDiff;
      } else {
        const diffArr = [];
        for (let i = 0; i < original.length; i++) {
          const diffObj = diff2(original[i], objToDiff[i]);
          if (Object.keys(diffObj).length > 0) {
            diffArr.push(diffObj);
          }
        }
        if (diffArr.length > 0) {
          cache = diffArr;
        }
      }
      return cache;
    };
    var diff2 = (original, objToDiff, cache = {}) => {
      if ((0, import_types.isArray)(original) && (0, import_types.isArray)(objToDiff)) {
        cache = [];
        diffArrays(original, objToDiff, cache);
      } else {
        diffObjects(original, objToDiff, cache);
      }
      return cache;
    };
    var overwrite = (element, params, excludeFrom = []) => {
      const { ref } = element;
      const changes = {};
      for (const e in params) {
        if (excludeFrom.includes(e) || e.startsWith("__"))
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
    var overwriteShallow2 = (obj, params, excludeFrom = []) => {
      for (const e in params) {
        if (excludeFrom.includes(e) || e.startsWith("__"))
          continue;
        obj[e] = params[e];
      }
      return obj;
    };
    var overwriteDeep = (obj, params, excludeFrom = []) => {
      for (const e in params) {
        if (e === "__proto__")
          continue;
        if (excludeFrom.includes(e) || e.startsWith("__"))
          continue;
        const objProp = obj[e];
        const paramsProp = params[e];
        if ((0, import_types.isObjectLike)(objProp) && (0, import_types.isObjectLike)(paramsProp)) {
          overwriteDeep(objProp, paramsProp);
        } else if (paramsProp !== void 0) {
          obj[e] = paramsProp;
        }
      }
      return obj;
    };
    var mergeIfExisted = (a, b) => {
      if ((0, import_types.isObjectLike)(a) && (0, import_types.isObjectLike)(b))
        return deepMerge2(a, b);
      return a || b;
    };
    var flattenRecursive = (param, prop, stack = []) => {
      const objectized = (0, import_array.mergeAndCloneIfArray)(param);
      stack.push(objectized);
      const extendOfExtend = objectized[prop];
      if (extendOfExtend)
        flattenRecursive(extendOfExtend, prop, stack);
      delete objectized[prop];
      return stack;
    };
    var isEqualDeep = (param, element) => {
      if (param === element)
        return true;
      if (!param || !element)
        return false;
      for (const prop in param) {
        const paramProp = param[prop];
        const elementProp = element[prop];
        if ((0, import_types.isObjectLike)(paramProp)) {
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
    var removeFromObject = (obj, props) => {
      if (props === void 0 || props === null)
        return obj;
      if ((0, import_types.is)(props)("string", "number")) {
        delete obj[props];
      } else if ((0, import_types.isArray)(props)) {
        props.forEach((prop) => delete obj[prop]);
      } else {
        throw new Error("Invalid input: props must be a string or an array of strings");
      }
      return obj;
    };
  }
});
var require_function = __commonJS({
  "../smbls/node_modules/@domql/utils/dist/cjs/function.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var function_exports = {};
    __export2(function_exports, {
      debounce: () => debounce,
      memoize: () => memoize2
    });
    module2.exports = __toCommonJS2(function_exports);
    var debounce = (element, func, timeout = 300) => {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(element, args);
        }, timeout);
      };
    };
    var memoize2 = (fn) => {
      const cache = {};
      return (...args) => {
        const n = args[0];
        if (n in cache) {
          return cache[n];
        } else {
          const result = fn(n);
          cache[n] = result;
          return result;
        }
      };
    };
  }
});
var require_log = __commonJS({
  "../smbls/node_modules/@domql/utils/dist/cjs/log.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var log_exports = {};
    __export2(log_exports, {
      logGroupIf: () => logGroupIf,
      logIf: () => logIf
    });
    module2.exports = __toCommonJS2(log_exports);
    var logIf = (bool, ...arg) => {
      if (bool)
        arg.map((v) => console.log(v));
    };
    var logGroupIf = (bool, key, ...arg) => {
      if (bool) {
        console.group(key);
        arg.map((v) => console.log(v));
        console.groupEnd(key);
      }
    };
  }
});
var require_cookie = __commonJS({
  "../smbls/node_modules/@domql/utils/dist/cjs/cookie.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var cookie_exports = {};
    __export2(cookie_exports, {
      getCookie: () => getCookie,
      isMobile: () => isMobile,
      setCookie: () => setCookie
    });
    module2.exports = __toCommonJS2(cookie_exports);
    var import_types = require_types();
    var isMobile = (() => typeof navigator === "undefined" ? false : /Mobi/.test(navigator.userAgent))();
    var setCookie = (cname, cvalue, exdays = 365) => {
      if ((0, import_types.isUndefined)(document) || (0, import_types.isUndefined)(document.cookie))
        return;
      const d = /* @__PURE__ */ new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1e3);
      const expires = `expires=${d.toUTCString()}`;
      document.cookie = `${cname}=${cvalue};${expires};path=/`;
    };
    var getCookie = (cname) => {
      if ((0, import_types.isUndefined)(document) || (0, import_types.isUndefined)(document.cookie))
        return;
      const name = `${cname}=`;
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ")
          c = c.substring(1);
        if (c.indexOf(name) === 0)
          return c.substring(name.length, c.length);
      }
      return "";
    };
  }
});
var require_tags = __commonJS({
  "../smbls/node_modules/@domql/utils/dist/cjs/tags.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var tags_exports = {};
    __export2(tags_exports, {
      HTML_TAGS: () => HTML_TAGS,
      isValidHtmlTag: () => isValidHtmlTag
    });
    module2.exports = __toCommonJS2(tags_exports);
    var HTML_TAGS = {
      root: [
        "body",
        "html"
      ],
      head: [
        "title",
        "base",
        "meta",
        "style"
      ],
      body: [
        "string",
        "fragment",
        "a",
        "abbr",
        "acronym",
        "address",
        "applet",
        "area",
        "article",
        "aside",
        "audio",
        "b",
        "basefont",
        "bdi",
        "bdo",
        "big",
        "blockquote",
        "br",
        "button",
        "canvas",
        "caption",
        "center",
        "cite",
        "code",
        "col",
        "colgroup",
        "data",
        "datalist",
        "dd",
        "del",
        "details",
        "dfn",
        "dialog",
        "dir",
        "div",
        "dl",
        "dt",
        "em",
        "embed",
        "fieldset",
        "figcaption",
        "figure",
        "font",
        "footer",
        "form",
        "frame",
        "frameset",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "head",
        "header",
        "hr",
        "i",
        "iframe",
        "img",
        "input",
        "ins",
        "kbd",
        "label",
        "legend",
        "li",
        "link",
        "main",
        "map",
        "mark",
        "meter",
        "nav",
        "noframes",
        "noscript",
        "object",
        "ol",
        "optgroup",
        "option",
        "output",
        "p",
        "param",
        "picture",
        "pre",
        "progress",
        "q",
        "rp",
        "rt",
        "ruby",
        "s",
        "samp",
        "script",
        "section",
        "select",
        "small",
        "source",
        "span",
        "strike",
        "strong",
        "sub",
        "summary",
        "sup",
        "table",
        "tbody",
        "td",
        "template",
        "textarea",
        "tfoot",
        "th",
        "thead",
        "time",
        "tr",
        "track",
        "tt",
        "u",
        "ul",
        "var",
        "video",
        "wbr",
        // SVG
        "svg",
        "path"
      ]
    };
    var isValidHtmlTag = (arg) => HTML_TAGS.body.includes(arg);
  }
});
var require_cjs2 = __commonJS({
  "../smbls/node_modules/@domql/utils/dist/cjs/index.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __reExport = (target, mod, secondTarget) => (__copyProps2(target, mod, "default"), secondTarget && __copyProps2(secondTarget, mod, "default"));
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var utils_exports = {};
    module2.exports = __toCommonJS2(utils_exports);
    __reExport(utils_exports, require_key(), module2.exports);
    __reExport(utils_exports, require_env(), module2.exports);
    __reExport(utils_exports, require_types(), module2.exports);
    __reExport(utils_exports, require_object(), module2.exports);
    __reExport(utils_exports, require_function(), module2.exports);
    __reExport(utils_exports, require_array(), module2.exports);
    __reExport(utils_exports, require_node(), module2.exports);
    __reExport(utils_exports, require_log(), module2.exports);
    __reExport(utils_exports, require_string(), module2.exports);
    __reExport(utils_exports, require_globals(), module2.exports);
    __reExport(utils_exports, require_cookie(), module2.exports);
    __reExport(utils_exports, require_tags(), module2.exports);
  }
});
var require_ignore = __commonJS({
  "../smbls/node_modules/@domql/state/dist/cjs/ignore.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var ignore_exports = {};
    __export2(ignore_exports, {
      IGNORE_STATE_PARAMS: () => IGNORE_STATE_PARAMS
    });
    module2.exports = __toCommonJS2(ignore_exports);
    var IGNORE_STATE_PARAMS = [
      "update",
      "parse",
      "clean",
      "create",
      "destroy",
      "add",
      "toggle",
      "remove",
      "apply",
      "set",
      "rootUpdate",
      "parentUpdate",
      "parent",
      "__element",
      "__depends",
      "__ref",
      "__children",
      "__root"
    ];
  }
});
var require_on = __commonJS({
  "../smbls/node_modules/@domql/event/dist/cjs/on.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var on_exports = {};
    __export2(on_exports, {
      applyEvent: () => applyEvent,
      applyEventUpdate: () => applyEventUpdate,
      applyEventsOnNode: () => applyEventsOnNode,
      triggerEventOn: () => triggerEventOn,
      triggerEventOnUpdate: () => triggerEventOnUpdate
    });
    module2.exports = __toCommonJS2(on_exports);
    var import_utils7 = require_cjs2();
    var applyEvent = (param, element, state, context, options) => {
      return param(element, state || element.state, context || element.context, options);
    };
    var triggerEventOn = (param, element, options) => {
      if (element.on && (0, import_utils7.isFunction)(element.on[param])) {
        const { state, context } = element;
        return applyEvent(element.on[param], element, state, context, options);
      }
    };
    var applyEventUpdate = (param, updatedObj, element, state, context, options) => {
      return param(updatedObj, element, state || element.state, context || element.context, options);
    };
    var triggerEventOnUpdate = (param, updatedObj, element, options) => {
      if (element.on && (0, import_utils7.isFunction)(element.on[param])) {
        const { state, context } = element;
        return applyEventUpdate(element.on[param], updatedObj, element, state, context, options);
      }
    };
    var applyEventsOnNode = (element) => {
      const { node: node2, on } = element;
      for (const param in on) {
        if (param === "init" || param === "beforeClassAssign" || param === "render" || param === "renderRouter" || param === "attachNode" || param === "stateInit" || param === "stateCreated" || param === "initStateUpdated" || param === "stateUpdated" || param === "initUpdate" || param === "update")
          continue;
        const appliedFunction = element.on[param];
        if ((0, import_utils7.isFunction)(appliedFunction)) {
          const { state, context } = element;
          node2.addEventListener(param, (event) => appliedFunction(event, element, state, context));
        }
      }
    };
  }
});
var require_cjs3 = __commonJS({
  "../smbls/node_modules/@domql/report/dist/cjs/index.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var report_exports = {};
    __export2(report_exports, {
      ERRORS_REGISTRY: () => ERRORS_REGISTRY,
      report: () => report
    });
    module2.exports = __toCommonJS2(report_exports);
    var ERRORS_REGISTRY = {
      en: {
        DocumentNotDefined: {
          title: "Document is undefined",
          description: "To tweak with DOM, you should use browser."
        },
        OverwriteToBuiltin: {
          title: "Overwriting to builtin method",
          description: "Overwriting a builtin method in the window define is not possible, please choose different name"
        },
        BrowserNotDefined: {
          title: "Can't recognize environment",
          description: "Environment should be browser application, that can run Javascript"
        },
        SetQuickPreferancesIsNotObject: {
          title: "Quick preferances object is required",
          description: 'Please pass a plain object with "lang", "culture" and "area" properties'
        },
        InvalidParams: {
          title: "Params are invalid",
          description: 'Please pass a plain object with "lang", "culture" and "area" properties'
        },
        CantCreateWithoutNode: {
          title: "You must provide node",
          description: "Can't create DOM element without setting node or text"
        },
        HTMLInvalidTag: {
          title: "Element tag name (or DOM nodeName) is invalid",
          description: "To create element, you must provide valid DOM node. See full list of them at here: http://www.w3schools.com/tags/"
        },
        HTMLInvalidAttr: {
          title: "Attibutes object is invalid",
          description: "Please pass a valid plain object to apply as an attributes for a DOM node"
        },
        HTMLInvalidData: {
          title: "Data object is invalid",
          description: "Please pass a valid plain object to apply as an dataset for a DOM node"
        },
        HTMLInvalidStyles: {
          title: "Styles object is invalid",
          description: "Please pass a valid plain object to apply as an style for a DOM node"
        },
        HTMLInvalidText: {
          title: "Text string is invalid",
          description: "Please pass a valid string to apply text to DOM node"
        },
        ElementOnStateIsNotDefined: {
          title: "Element on state is not defined",
          description: "Please check the element object"
        }
      }
    };
    var report = (err, arg, element) => {
      const currentLang = "en";
      let errObj;
      if (err && typeof err === "string")
        errObj = ERRORS_REGISTRY[currentLang][err];
      return new Error(
        `"${err}", "${arg}"

`,
        `${errObj.description}`,
        element ? `

${element}` : ""
      );
    };
  }
});
var require_can = __commonJS({
  "../smbls/node_modules/@domql/event/dist/cjs/can.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var can_exports = {};
    __export2(can_exports, {
      canRender: () => canRender
    });
    module2.exports = __toCommonJS2(can_exports);
    var import_report = require_cjs3();
    var import_utils7 = require_cjs2();
    var canRender = (element) => {
      const tag = element.tag || "div";
      return (0, import_utils7.isValidHtmlTag)(tag) || (0, import_report.report)("HTMLInvalidTag");
    };
  }
});
var require_cjs4 = __commonJS({
  "../smbls/node_modules/@domql/event/dist/cjs/index.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __reExport = (target, mod, secondTarget) => (__copyProps2(target, mod, "default"), secondTarget && __copyProps2(secondTarget, mod, "default"));
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var event_exports = {};
    module2.exports = __toCommonJS2(event_exports);
    __reExport(event_exports, require_on(), module2.exports);
    __reExport(event_exports, require_can(), module2.exports);
  }
});
var require_methods = __commonJS({
  "../smbls/node_modules/@domql/state/dist/cjs/methods.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var methods_exports = {};
    __export2(methods_exports, {
      add: () => add,
      apply: () => apply,
      clean: () => clean,
      destroy: () => destroy,
      parentUpdate: () => parentUpdate,
      parse: () => parse2,
      remove: () => remove,
      rootUpdate: () => rootUpdate,
      set: () => set2,
      toggle: () => toggle
    });
    module2.exports = __toCommonJS2(methods_exports);
    var import_utils7 = require_cjs2();
    var import_ignore = require_ignore();
    var parse2 = function() {
      const state = this;
      if ((0, import_utils7.isObject)(state)) {
        const obj = {};
        for (const param in state) {
          if (!import_ignore.IGNORE_STATE_PARAMS.includes(param)) {
            obj[param] = state[param];
          }
        }
        return obj;
      } else if ((0, import_utils7.isArray)(state)) {
        return state.filter((item) => !import_ignore.IGNORE_STATE_PARAMS.includes(item));
      }
    };
    var clean = function(options = {}) {
      const state = this;
      for (const param in state) {
        if (!import_ignore.IGNORE_STATE_PARAMS.includes(param)) {
          delete state[param];
        }
      }
      if (!options.preventStateUpdate) {
        state.update(state, { replace: true, options });
      }
      return state;
    };
    var destroy = function(options = {}) {
      const state = this;
      const element = state.__element;
      const stateKey = element.__ref.__state;
      if ((0, import_utils7.isString)(stateKey)) {
        element.parent.state.remove(stateKey, { isHoisted: true, ...options });
        return element.state;
      }
      delete element.state;
      element.state = state.parent;
      if (state.parent) {
        delete state.parent.__children[element.key];
      }
      if (state.__children) {
        for (const key in state.__children) {
          const child = state.__children[key];
          if (child.state) {
            child.parent = state.parent;
          }
        }
      }
      element.state.update({}, { isHoisted: true, ...options });
      return element.state;
    };
    var parentUpdate = function(obj, options = {}) {
      const state = this;
      if (!state || !state.parent)
        return;
      return state.parent.update(obj, { isHoisted: true, ...options });
    };
    var rootUpdate = function(obj, options = {}) {
      const state = this;
      if (!state)
        return;
      const rootState = state.__element.__ref.__root.state;
      return rootState.update(obj, { isHoisted: false, options });
    };
    var add = function(value, options = {}) {
      const state = this;
      if ((0, import_utils7.isArray)(state)) {
        state.push(value);
        state.update(state.parse(), { overwrite: "replace", ...options });
      } else if ((0, import_utils7.isObject)(state)) {
        const key = Object.keys(state).length;
        state.update({ [key]: value }, options);
      }
    };
    var toggle = function(key, options = {}) {
      const state = this;
      state.update({ [key]: !state[key] }, options);
    };
    var remove = function(key, options = {}) {
      const state = this;
      if ((0, import_utils7.isArray)(state))
        (0, import_utils7.removeFromArray)(state, key);
      if ((0, import_utils7.isObject)(state))
        (0, import_utils7.removeFromObject)(state, key);
      return state.update(state.parse(), { replace: true, ...options });
    };
    var set2 = function(value, options = {}) {
      const state = this;
      return state.clean({ preventStateUpdate: true }).update(value, { replace: true, ...options });
    };
    var apply = function(func, options = {}) {
      const state = this;
      if ((0, import_utils7.isFunction)(func)) {
        func(state);
        return state.update(state, { replace: true, ...options });
      }
    };
  }
});
var require_inherit = __commonJS({
  "../smbls/node_modules/@domql/state/dist/cjs/inherit.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var inherit_exports = {};
    __export2(inherit_exports, {
      checkIfInherits: () => checkIfInherits,
      createChangesByKey: () => createChangesByKey,
      createInheritedState: () => createInheritedState,
      findInheritedState: () => findInheritedState,
      getChildStateInKey: () => getChildStateInKey2,
      getParentStateInKey: () => getParentStateInKey,
      isState: () => isState2
    });
    module2.exports = __toCommonJS2(inherit_exports);
    var import_utils7 = require_cjs2();
    var import_ignore = require_ignore();
    var getParentStateInKey = (stateKey, parentState) => {
      if (!stateKey.includes("../"))
        return;
      const arr = stateKey.split("../");
      const arrLength = arr.length - 1;
      for (let i = 0; i < arrLength; i++) {
        if (!parentState.parent)
          return null;
        parentState = parentState.parent;
      }
      return parentState;
    };
    var getChildStateInKey2 = (stateKey, parentState, options = {}) => {
      const arr = stateKey.split("/");
      const arrLength = arr.length - 1;
      for (let i = 0; i < arrLength; i++) {
        const childKey = arr[i];
        const grandChildKey = arr[i + 1];
        if (childKey === "__proto__" || grandChildKey === "__proto__")
          return;
        let childInParent = parentState[childKey];
        if (!childInParent)
          childInParent = parentState[childKey] = {};
        if (!childInParent[grandChildKey])
          childInParent[grandChildKey] = {};
        stateKey = grandChildKey;
        parentState = childInParent;
      }
      if (options.returnParent)
        return parentState;
      return parentState[stateKey];
    };
    var findInheritedState = (element, parent, options = {}) => {
      const ref = element.__ref;
      let stateKey = ref.__state;
      if (!checkIfInherits(element))
        return;
      let parentState = parent.state;
      const findGrandParentState = getParentStateInKey(stateKey, parent.state);
      if (findGrandParentState) {
        parentState = findGrandParentState;
        stateKey = stateKey.replaceAll("../", "");
      }
      if (!parentState)
        return;
      return getChildStateInKey2(stateKey, parentState, options);
    };
    var createInheritedState = (element, parent) => {
      const ref = element.__ref;
      const inheritedState = findInheritedState(element, parent);
      if (!inheritedState)
        return element.state;
      if ((0, import_utils7.is)(inheritedState)("object", "array")) {
        return (0, import_utils7.deepClone)(inheritedState, import_ignore.IGNORE_STATE_PARAMS);
      } else if ((0, import_utils7.is)(inheritedState)("string", "number")) {
        ref.__stateType = "string";
        return { value: inheritedState };
      }
      console.warn(ref.__state, "is not present. Replacing with", {});
    };
    var checkIfInherits = (element) => {
      const ref = element.__ref;
      const stateKey = ref.__state;
      if (!stateKey || (0, import_utils7.isNot)(stateKey)("number", "string"))
        return false;
      return true;
    };
    var isState2 = function(state) {
      if (!(0, import_utils7.isObjectLike)(state))
        return false;
      return state.update && state.parse && state.clean && state.create && state.parent && state.destroy && state.rootUpdate && state.parentUpdate && state.toggle && state.add && state.apply && state.__element && state.__children;
    };
    var createChangesByKey = (path, value) => {
      if (!path) {
        return value || {};
      }
      const keys = path.split("/");
      const obj = {};
      let ref = obj;
      keys.forEach((key, index) => {
        ref[key] = index === keys.length - 1 ? value || {} : {};
        ref = ref[key];
      });
      return obj;
    };
  }
});
var require_updateState = __commonJS({
  "../smbls/node_modules/@domql/state/dist/cjs/updateState.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var updateState_exports = {};
    __export2(updateState_exports, {
      updateState: () => updateState
    });
    module2.exports = __toCommonJS2(updateState_exports);
    var import_report = require_cjs3();
    var import_event = require_cjs4();
    var import_ignore = require_ignore();
    var import_utils7 = require_cjs2();
    var import_inherit = require_inherit();
    var STATE_UPDATE_OPTIONS = {
      overwrite: true,
      preventHoistElementUpdate: false,
      updateByState: true,
      isHoisted: true,
      execStateFunction: true,
      stateFunctionOverwrite: true
    };
    var updateState = function(obj, options = STATE_UPDATE_OPTIONS) {
      const state = this;
      const element = state.__element;
      if (!options.updateByState)
        (0, import_utils7.merge)(options, STATE_UPDATE_OPTIONS);
      if (!state.__element)
        (0, import_report.report)("ElementOnStateIsNotDefined");
      if (options.preventInheritAtCurrentState === true) {
        options.preventInheritAtCurrentState = state;
      } else if (options.preventInheritAtCurrentState)
        return;
      if (!options.preventInitStateUpdateListener) {
        const initStateUpdateReturns = (0, import_event.triggerEventOnUpdate)("initStateUpdated", obj, element, options);
        if (initStateUpdateReturns === false)
          return element;
      }
      applyOverwrite(state, obj, options);
      const updateIsHoisted = hoistStateUpdate(state, obj, options);
      if (updateIsHoisted)
        return state;
      updateDependentState(state, obj, options);
      applyElementUpdate(state, obj, options);
      if (!options.preventStateUpdateListener) {
        (0, import_event.triggerEventOnUpdate)("stateUpdated", obj, element, options);
      }
      return state;
    };
    var applyOverwrite = (state, obj, options) => {
      const { overwrite } = options;
      if (!overwrite)
        return;
      const shallow = overwrite === "shallow";
      const merge22 = overwrite === "merge";
      if (merge22) {
        (0, import_utils7.deepMerge)(state, obj, import_ignore.IGNORE_STATE_PARAMS);
        return;
      }
      const overwriteFunc = shallow ? import_utils7.overwriteShallow : import_utils7.overwriteDeep;
      overwriteFunc(state, obj, import_ignore.IGNORE_STATE_PARAMS);
    };
    var hoistStateUpdate = (state, obj, options) => {
      const element = state.__element;
      const { parent, __ref: ref } = element;
      const stateKey = ref.__state;
      if (!stateKey)
        return;
      const asksForInherit = (0, import_inherit.checkIfInherits)(element);
      const inheritedState = (0, import_inherit.findInheritedState)(element, parent, { returnParent: true });
      const shouldPropagateState = asksForInherit && inheritedState && !options.stopStatePropagation;
      if (!shouldPropagateState)
        return;
      const isStringState = ref.__stateType === "string";
      const value = isStringState ? state.value : state.parse();
      const passedValue = isStringState ? state.value : obj;
      const findGrandParentState = (0, import_inherit.getParentStateInKey)(stateKey, parent.state);
      const changesValue = (0, import_inherit.createChangesByKey)(stateKey, passedValue);
      const targetParent = findGrandParentState || parent.state;
      if (options.replace)
        targetParent[stateKey] = value;
      targetParent.update(changesValue, {
        execStateFunction: false,
        stateFunctionOverwrite: false,
        isHoisted: true,
        ...options,
        preventUpdate: options.preventHoistElementUpdate,
        overwrite: !options.replace
      });
      const hasNotUpdated = options.preventUpdate !== true || !options.preventHoistElementUpdate;
      if (!options.preventStateUpdateListener && hasNotUpdated) {
        (0, import_event.triggerEventOnUpdate)("stateUpdated", obj, element, options);
      }
      return true;
    };
    var updateDependentState = (state, obj, options) => {
      if (!state.__depends)
        return;
      for (const el in state.__depends) {
        const dependentState = state.__depends[el];
        dependentState.clean().update(state.parse(), options);
      }
    };
    var applyElementUpdate = (state, obj, options) => {
      const element = state.__element;
      if (options.preventUpdate !== true) {
        element.update({}, {
          ...options,
          updateByState: true
        });
      } else if (options.preventUpdate === "recursive") {
        element.update({}, {
          ...options,
          isHoisted: false,
          updateByState: true,
          preventUpdate: true
        });
      }
    };
  }
});
var require_create = __commonJS({
  "../smbls/node_modules/@domql/state/dist/cjs/create.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var create_exports = {};
    __export2(create_exports, {
      applyInitialState: () => applyInitialState,
      createState: () => createState
    });
    module2.exports = __toCommonJS2(create_exports);
    var import_event = require_cjs4();
    var import_utils7 = require_cjs2();
    var import_ignore = require_ignore();
    var import_methods = require_methods();
    var import_updateState = require_updateState();
    var import_inherit = require_inherit();
    var createState = function(element, parent, options) {
      element.state = applyInitialState(element, parent, options);
      return element.state;
    };
    var applyInitialState = function(element, parent, options) {
      const objectizeState = checkForTypes(element);
      if (objectizeState === false)
        return parent.state || {};
      else
        element.state = (0, import_utils7.deepClone)(objectizeState, import_ignore.IGNORE_STATE_PARAMS);
      const whatInitReturns = (0, import_event.triggerEventOn)("stateInit", element, options);
      if (whatInitReturns === false)
        return element.state;
      if ((0, import_inherit.checkIfInherits)(element)) {
        const inheritedState = (0, import_inherit.createInheritedState)(element, parent);
        element.state = inheritedState || {};
      }
      const dependentState = applyDependentState(element, element.state);
      if (dependentState)
        element.state = dependentState;
      applyMethods(element);
      (0, import_event.triggerEventOn)("stateCreated", element);
      return element.state;
    };
    var applyDependentState = (element, state) => {
      const { __ref: ref } = state;
      if (!ref)
        return;
      const dependentState = (0, import_utils7.deepClone)(ref, import_ignore.IGNORE_STATE_PARAMS);
      const newDepends = { [element.key]: dependentState };
      ref.__depends = (0, import_utils7.isObject)(ref.__depends) ? { ...ref.__depends, ...newDepends } : newDepends;
      return dependentState;
    };
    var checkForTypes = (element) => {
      const { state, __ref: ref } = element;
      if ((0, import_utils7.isFunction)(state)) {
        ref.__state = state;
        return (0, import_utils7.exec)(state, element);
      } else if ((0, import_utils7.is)(state)("string", "number")) {
        ref.__state = state;
        return {};
      } else if (state === true) {
        ref.__state = element.key;
        return {};
      } else if (state) {
        ref.__hasRootState = true;
        return state;
      } else {
        return false;
      }
    };
    var addProtoToArray = (state, proto) => {
      for (const key in proto) {
        Object.defineProperty(state, key, {
          value: proto[key],
          enumerable: false,
          // Set this to true if you want the method to appear in for...in loops
          configurable: true,
          // Set this to true if you want to allow redefining/removing the property later
          writable: true
          // Set this to true if you want to allow changing the function later
        });
      }
    };
    var applyMethods = (element) => {
      const state = element.state;
      const ref = element.__ref;
      const proto = {
        clean: import_methods.clean.bind(state),
        parse: import_methods.parse.bind(state),
        destroy: import_methods.destroy.bind(state),
        update: import_updateState.updateState.bind(state),
        rootUpdate: import_methods.rootUpdate.bind(state),
        parentUpdate: import_methods.parentUpdate.bind(state),
        create: createState.bind(state),
        add: import_methods.add.bind(state),
        toggle: import_methods.toggle.bind(state),
        remove: import_methods.remove.bind(state),
        apply: import_methods.apply.bind(state),
        set: import_methods.set.bind(state),
        parent: element.parent.state,
        __element: element,
        __children: {},
        __root: ref.__root ? ref.__root.state : state
      };
      if ((0, import_utils7.isArray)(state)) {
        addProtoToArray(state, proto);
      } else {
        Object.setPrototypeOf(state, proto);
      }
      if (state.parent && state.parent.__children) {
        state.parent.__children[element.key] = state;
      }
    };
  }
});
var require_cjs5 = __commonJS({
  "../smbls/node_modules/@domql/state/dist/cjs/index.js"(exports, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 === "object" || typeof from2 === "function") {
        for (let key of __getOwnPropNames2(from2))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      }
      return to;
    };
    var __reExport = (target, mod, secondTarget) => (__copyProps2(target, mod, "default"), secondTarget && __copyProps2(secondTarget, mod, "default"));
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var state_exports = {};
    module2.exports = __toCommonJS2(state_exports);
    __reExport(state_exports, require_ignore(), module2.exports);
    __reExport(state_exports, require_create(), module2.exports);
    __reExport(state_exports, require_updateState(), module2.exports);
    __reExport(state_exports, require_methods(), module2.exports);
    __reExport(state_exports, require_inherit(), module2.exports);
  }
});
var Tooltip_exports = {};
__export(Tooltip_exports, {
  Tooltip: () => Tooltip,
  TooltipHidden: () => TooltipHidden,
  TooltipParent: () => TooltipParent
});
module.exports = __toCommonJS(Tooltip_exports);
var import_scratch = __toESM(require_cjs());
var Flex = {
  props: {
    display: "flex"
  },
  class: {
    flow: ({ props }) => props.flow && { flexFlow: props.flow },
    wrap: ({ props }) => props.wrap && { flexWrap: props.wrap },
    align: ({ props }) => {
      if (typeof props.align !== "string")
        return;
      const [alignItems, justifyContent] = props.align.split(" ");
      return { alignItems, justifyContent };
    }
  }
};
var import_scratch2 = __toESM(require_cjs());
var import_utils = __toESM(require_cjs2());
var import_scratch5 = __toESM(require_cjs());
var import_scratch4 = __toESM(require_cjs());
var import_scratch3 = __toESM(require_cjs());
var CONFIG = (0, import_scratch4.getActiveConfig)();
var depth = {
  4: { boxShadow: `rgba(0,0,0,.10) 0 2${CONFIG.UNIT.default} 4${CONFIG.UNIT.default}` },
  6: { boxShadow: `rgba(0,0,0,.10) 0 3${CONFIG.UNIT.default} 6${CONFIG.UNIT.default}` },
  10: { boxShadow: `rgba(0,0,0,.10) 0 4${CONFIG.UNIT.default} 10${CONFIG.UNIT.default}` },
  16: { boxShadow: `rgba(0,0,0,.10) 0 8${CONFIG.UNIT.default} 16${CONFIG.UNIT.default}` },
  26: { boxShadow: `rgba(0,0,0,.10) 0 14${CONFIG.UNIT.default} 26${CONFIG.UNIT.default}` },
  42: { boxShadow: `rgba(0,0,0,.10) 0 20${CONFIG.UNIT.default} 42${CONFIG.UNIT.default}` }
};
var import_state = __toESM(require_cjs5());
var import_utils2 = __toESM(require_cjs2());
var import_scratch6 = __toESM(require_cjs());
var import_scratch7 = __toESM(require_cjs());
var import_utils4 = __toESM(require_cjs2());
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}
function createStyleElement(options) {
  var tag = document.createElement("style");
  tag.setAttribute("data-emotion", options.key);
  if (options.nonce !== void 0) {
    tag.setAttribute("nonce", options.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  tag.setAttribute("data-s", "");
  return tag;
}
var StyleSheet = /* @__PURE__ */ function() {
  function StyleSheet2(options) {
    var _this = this;
    this._insertTag = function(tag) {
      var before;
      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }
      _this.container.insertBefore(tag, before);
      _this.tags.push(tag);
    };
    this.isSpeedy = options.speedy === void 0 ? false : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce;
    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }
  var _proto = StyleSheet2.prototype;
  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };
  _proto.insert = function insert(rule) {
    if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }
    var tag = this.tags[this.tags.length - 1];
    if (true) {
      var isImportRule3 = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;
      if (isImportRule3 && this._alreadyInsertedOrderInsensitiveRule) {
        console.error("You're attempting to insert the following rule:\n" + rule + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.");
      }
      this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule3;
    }
    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
        if (!/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(rule)) {
          console.error('There was a problem inserting the following rule: "' + rule + '"', e);
        }
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }
    this.ctr++;
  };
  _proto.flush = function flush() {
    this.tags.forEach(function(tag) {
      return tag.parentNode && tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
    if (true) {
      this._alreadyInsertedOrderInsensitiveRule = false;
    }
  };
  return StyleSheet2;
}();
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
  return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "" };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0), root, { length: -root.length }, props);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (ampersand == -1)
              characters2 = replace(characters2, /\f/g, "");
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
      if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
        props[k++] = z;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2);
}
function comment(value, root, parent) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root, parent, length2) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}
function serialize(children, callback) {
  var output = "";
  var length2 = sizeof(children);
  for (var i = 0; i < length2; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length)
        break;
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      element.value = element.props.join(",");
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index, children, callback) || "";
    return output;
  };
}
function memoize(fn) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function(arg) {
    if (cache[arg] === void 0)
      cache[arg] = fn(arg);
    return cache[arg];
  };
}
var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
  var previous = 0;
  var character2 = 0;
  while (true) {
    previous = character2;
    character2 = peek();
    if (previous === 38 && character2 === 12) {
      points[index] = 1;
    }
    if (token(character2)) {
      break;
    }
    next();
  }
  return slice(begin, position);
};
var toRules = function toRules2(parsed, points) {
  var index = -1;
  var character2 = 44;
  do {
    switch (token(character2)) {
      case 0:
        if (character2 === 38 && peek() === 12) {
          points[index] = 1;
        }
        parsed[index] += identifierWithPointTracking(position - 1, points, index);
        break;
      case 2:
        parsed[index] += delimit(character2);
        break;
      case 4:
        if (character2 === 44) {
          parsed[++index] = peek() === 58 ? "&\f" : "";
          points[index] = parsed[index].length;
          break;
        }
      default:
        parsed[index] += from(character2);
    }
  } while (character2 = next());
  return parsed;
};
var getRules = function getRules2(value, points) {
  return dealloc(toRules(alloc(value), points));
};
var fixedElements = /* @__PURE__ */ new WeakMap();
var compat = function compat2(element) {
  if (element.type !== "rule" || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }
  var value = element.value, parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;
  while (parent.type !== "rule") {
    parent = parent.parent;
    if (!parent)
      return;
  }
  if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
    return;
  }
  if (isImplicitRule) {
    return;
  }
  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;
  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel2(element) {
  if (element.type === "decl") {
    var value = element.value;
    if (
      // charcode for l
      value.charCodeAt(0) === 108 && // charcode for b
      value.charCodeAt(2) === 98
    ) {
      element["return"] = "";
      element.value = "";
    }
  }
};
var ignoreFlag = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason";
var isIgnoringComment = function isIgnoringComment2(element) {
  return element.type === "comm" && element.children.indexOf(ignoreFlag) > -1;
};
var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm2(cache) {
  return function(element, index, children) {
    if (element.type !== "rule" || cache.compat)
      return;
    var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);
    if (unsafePseudoClasses) {
      var isNested = !!element.parent;
      var commentContainer = isNested ? element.parent.children : (
        // global rule at the root level
        children
      );
      for (var i = commentContainer.length - 1; i >= 0; i--) {
        var node2 = commentContainer[i];
        if (node2.line < element.line) {
          break;
        }
        if (node2.column < element.column) {
          if (isIgnoringComment(node2)) {
            return;
          }
          break;
        }
      }
      unsafePseudoClasses.forEach(function(unsafePseudoClass) {
        console.error('The pseudo class "' + unsafePseudoClass + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + unsafePseudoClass.split("-child")[0] + '-of-type".');
      });
    }
  };
};
var isImportRule = function isImportRule2(element) {
  return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};
var isPrependedWithRegularRules = function isPrependedWithRegularRules2(index, children) {
  for (var i = index - 1; i >= 0; i--) {
    if (!isImportRule(children[i])) {
      return true;
    }
  }
  return false;
};
var nullifyElement = function nullifyElement2(element) {
  element.type = "";
  element.value = "";
  element["return"] = "";
  element.children = "";
  element.props = "";
};
var incorrectImportAlarm = function incorrectImportAlarm2(element, index, children) {
  if (!isImportRule(element)) {
    return;
  }
  if (element.parent) {
    console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
    nullifyElement(element);
  } else if (isPrependedWithRegularRules(index, children)) {
    console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
    nullifyElement(element);
  }
};
function prefix(value, length2) {
  switch (hash(value, length2)) {
    case 5103:
      return WEBKIT + "print-" + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/, "") + value;
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/, "") + value;
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6)
        switch (charat(value, length2 + 1)) {
          case 109:
            if (charat(value, length2 + 4) !== 45)
              break;
          case 102:
            return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
          case 115:
            return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2) + value : value;
        }
      break;
    case 4949:
      if (charat(value, length2 + 1) !== 115)
        break;
    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
        case 107:
          return replace(value, ":", ":" + WEBKIT) + value;
        case 101:
          return replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
      }
      break;
    case 5936:
      switch (charat(value, length2 + 11)) {
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
      return WEBKIT + value + MS + value + value;
  }
  return value;
}
var prefixer = function prefixer2(element, index, children, callback) {
  if (element.length > -1) {
    if (!element["return"])
      switch (element.type) {
        case DECLARATION:
          element["return"] = prefix(element.value, element.length);
          break;
        case KEYFRAMES:
          return serialize([copy(element, {
            value: replace(element.value, "@", "@" + WEBKIT)
          })], callback);
        case RULESET:
          if (element.length)
            return combine(element.props, function(value) {
              switch (match(value, /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  return serialize([copy(element, {
                    props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")]
                  })], callback);
                case "::placeholder":
                  return serialize([copy(element, {
                    props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")]
                  }), copy(element, {
                    props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")]
                  }), copy(element, {
                    props: [replace(value, /:(plac\w+)/, MS + "input-$1")]
                  })], callback);
              }
              return "";
            });
      }
  }
};
var defaultStylisPlugins = [prefixer];
var createCache = function createCache2(options) {
  var key = options.key;
  if (!key) {
    throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");
  }
  if (key === "css") {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(ssrStyles, function(node2) {
      var dataEmotionAttribute = node2.getAttribute("data-emotion");
      if (dataEmotionAttribute.indexOf(" ") === -1) {
        return;
      }
      document.head.appendChild(node2);
      node2.setAttribute("data-s", "");
    });
  }
  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
  if (true) {
    if (/[^a-z-]/.test(key)) {
      throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + key + '" was passed');
    }
  }
  var inserted = {};
  var container;
  var nodesToHydrate = [];
  {
    container = options.container || document.head;
    Array.prototype.forEach.call(
      // this means we will ignore elements which don't have a space in them which
      // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
      document.querySelectorAll('style[data-emotion^="' + key + ' "]'),
      function(node2) {
        var attrib = node2.getAttribute("data-emotion").split(" ");
        for (var i = 1; i < attrib.length; i++) {
          inserted[attrib[i]] = true;
        }
        nodesToHydrate.push(node2);
      }
    );
  }
  var _insert;
  var omnipresentPlugins = [compat, removeLabel];
  if (true) {
    omnipresentPlugins.push(createUnsafeSelectorsAlarm({
      get compat() {
        return cache.compat;
      }
    }), incorrectImportAlarm);
  }
  {
    var currentSheet;
    var finalizingPlugins = [stringify, true ? function(element) {
      if (!element.root) {
        if (element["return"]) {
          currentSheet.insert(element["return"]);
        } else if (element.value && element.type !== COMMENT) {
          currentSheet.insert(element.value + "{}");
        }
      }
    } : rulesheet(function(rule) {
      currentSheet.insert(rule);
    })];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
    var stylis = function stylis2(styles) {
      return serialize(compile(styles), serializer);
    };
    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;
      if (serialized.map !== void 0) {
        currentSheet = {
          insert: function insert2(rule) {
            sheet.insert(rule + serialized.map);
          }
        };
      }
      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  }
  var cache = {
    key,
    sheet: new StyleSheet({
      key,
      container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};
function murmur2(str) {
  var h = 0;
  var k, i = 0, len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
    k ^= /* k >>> r: */
    k >>> 24;
    h = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 255;
      h = /* Math.imul(h, m): */
      (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  h ^= h >>> 13;
  h = /* Math.imul(h, m): */
  (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}
var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var ILLEGAL_ESCAPE_SEQUENCE_ERROR = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty2(property) {
  return property.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue2(value) {
  return value != null && typeof value !== "boolean";
};
var processStyleName = /* @__PURE__ */ memoize(function(styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
});
var processStyleValue = function processStyleValue2(key, value) {
  switch (key) {
    case "animation":
    case "animationName": {
      if (typeof value === "string") {
        return value.replace(animationRegex, function(match2, p1, p2) {
          cursor = {
            name: p1,
            styles: p2,
            next: cursor
          };
          return p1;
        });
      }
    }
  }
  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
    return value + "px";
  }
  return value;
};
if (true) {
  contentValuePattern = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
  contentValues = ["normal", "none", "initial", "inherit", "unset"];
  oldProcessStyleValue = processStyleValue;
  msPattern = /^-ms-/;
  hyphenPattern = /-(.)/g;
  hyphenatedCache = {};
  processStyleValue = function processStyleValue3(key, value) {
    if (key === "content") {
      if (typeof value !== "string" || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
        throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
      }
    }
    var processed = oldProcessStyleValue(key, value);
    if (processed !== "" && !isCustomProperty(key) && key.indexOf("-") !== -1 && hyphenatedCache[key] === void 0) {
      hyphenatedCache[key] = true;
      console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, "ms-").replace(hyphenPattern, function(str, _char) {
        return _char.toUpperCase();
      }) + "?");
    }
    return processed;
  };
}
var contentValuePattern;
var contentValues;
var oldProcessStyleValue;
var msPattern;
var hyphenPattern;
var hyphenatedCache;
var noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return "";
  }
  if (interpolation.__emotion_styles !== void 0) {
    if (interpolation.toString() === "NO_COMPONENT_SELECTOR") {
      throw new Error(noComponentSelectorMessage);
    }
    return interpolation;
  }
  switch (typeof interpolation) {
    case "boolean": {
      return "";
    }
    case "object": {
      if (interpolation.anim === 1) {
        cursor = {
          name: interpolation.name,
          styles: interpolation.styles,
          next: cursor
        };
        return interpolation.name;
      }
      if (interpolation.styles !== void 0) {
        var next2 = interpolation.next;
        if (next2 !== void 0) {
          while (next2 !== void 0) {
            cursor = {
              name: next2.name,
              styles: next2.styles,
              next: cursor
            };
            next2 = next2.next;
          }
        }
        var styles = interpolation.styles + ";";
        if (interpolation.map !== void 0) {
          styles += interpolation.map;
        }
        return styles;
      }
      return createStringFromObject(mergedProps, registered, interpolation);
    }
    case "function": {
      if (mergedProps !== void 0) {
        var previousCursor = cursor;
        var result = interpolation(mergedProps);
        cursor = previousCursor;
        return handleInterpolation(mergedProps, registered, result);
      } else if (true) {
        console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
      }
      break;
    }
    case "string":
      if (true) {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function(match2, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, "") + "`");
          return "${" + fakeVarName + "}";
        });
        if (matched.length) {
          console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(matched, ["`" + replaced + "`"]).join("\n") + "\n\nYou should wrap it with `css` like this:\n\n" + ("css`" + replaced + "`"));
        }
      }
      break;
  }
  if (registered == null) {
    return interpolation;
  }
  var cached = registered[interpolation];
  return cached !== void 0 ? cached : interpolation;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string = "";
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];
      if (typeof value !== "object") {
        if (registered != null && registered[value] !== void 0) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === "NO_COMPONENT_SELECTOR" && true) {
          throw new Error(noComponentSelectorMessage);
        }
        if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);
          switch (_key) {
            case "animation":
            case "animationName": {
              string += processStyleName(_key) + ":" + interpolated + ";";
              break;
            }
            default: {
              if (_key === "undefined") {
                console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
              }
              string += _key + "{" + interpolated + "}";
            }
          }
        }
      }
    }
  }
  return string;
}
var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var sourceMapPattern;
if (true) {
  sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
}
var cursor;
var serializeStyles = function serializeStyles2(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
    return args[0];
  }
  var stringMode = true;
  var styles = "";
  cursor = void 0;
  var strings = args[0];
  if (strings == null || strings.raw === void 0) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    if (strings[0] === void 0) {
      console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
    }
    styles += strings[0];
  }
  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);
    if (stringMode) {
      if (strings[i] === void 0) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
      }
      styles += strings[i];
    }
  }
  var sourceMap;
  if (true) {
    styles = styles.replace(sourceMapPattern, function(match3) {
      sourceMap = match3;
      return "";
    });
  }
  labelPattern.lastIndex = 0;
  var identifierName = "";
  var match2;
  while ((match2 = labelPattern.exec(styles)) !== null) {
    identifierName += "-" + // $FlowFixMe we know it's not null
    match2[1];
  }
  var name = murmur2(styles) + identifierName;
  if (true) {
    return {
      name,
      styles,
      map: sourceMap,
      next: cursor,
      toString: function toString() {
        return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
      }
    };
  }
  return {
    name,
    styles,
    next: cursor
  };
};
var isBrowser = true;
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = "";
  classNames.split(" ").forEach(function(className) {
    if (registered[className] !== void 0) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles2(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;
  if (
    // we only need to add the styles to the registered cache if the
    // class name could be used further down
    // the tree but if it's a string tag, we know it won't
    // so we don't have to add it to registered cache.
    // this improves memory usage since we can avoid storing the whole style string
    (isStringTag === false || // we need to always store it if we're in compat mode and
    // in node since emotion-server relies on whether a style is in
    // the registered cache to know whether a style is global or not
    // also, note that this check will be dead code eliminated in the browser
    isBrowser === false) && cache.registered[className] === void 0
  ) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles2(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;
  if (cache.inserted[serialized.name] === void 0) {
    var current = serialized;
    do {
      cache.insert(serialized === current ? "." + className : "", current, cache.sheet, true);
      current = current.next;
    } while (current !== void 0);
  }
};
function insertWithoutScoping(cache, serialized) {
  if (cache.inserted[serialized.name] === void 0) {
    return cache.insert("", serialized, cache.sheet, true);
  }
}
function merge2(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);
  if (registeredStyles.length < 2) {
    return className;
  }
  return rawClassName + css(registeredStyles);
}
var createEmotion = function createEmotion2(options) {
  var cache = createCache(options);
  cache.sheet.speedy = function(value) {
    if (this.ctr !== 0) {
      throw new Error("speedy must be changed before any rules are inserted");
    }
    this.isSpeedy = value;
  };
  cache.compat = true;
  var css = function css2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var serialized = serializeStyles(args, cache.registered, void 0);
    insertStyles(cache, serialized, false);
    return cache.key + "-" + serialized.name;
  };
  var keyframes = function keyframes2() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    var serialized = serializeStyles(args, cache.registered);
    var animation = "animation-" + serialized.name;
    insertWithoutScoping(cache, {
      name: serialized.name,
      styles: "@keyframes " + animation + "{" + serialized.styles + "}"
    });
    return animation;
  };
  var injectGlobal = function injectGlobal2() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    var serialized = serializeStyles(args, cache.registered);
    insertWithoutScoping(cache, serialized);
  };
  var cx = function cx2() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return merge2(cache.registered, css, classnames(args));
  };
  return {
    css,
    cx,
    injectGlobal,
    keyframes,
    hydrate: function hydrate(ids) {
      ids.forEach(function(key) {
        cache.inserted[key] = true;
      });
    },
    flush: function flush() {
      cache.registered = {};
      cache.inserted = {};
      cache.sheet.flush();
    },
    // $FlowFixMe
    sheet: cache.sheet,
    cache,
    getRegisteredStyles: getRegisteredStyles.bind(null, cache.registered),
    merge: merge2.bind(null, cache.registered, css)
  };
};
var classnames = function classnames2(args) {
  var cls = "";
  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (arg == null)
      continue;
    var toAdd = void 0;
    switch (typeof arg) {
      case "boolean":
        break;
      case "object": {
        if (Array.isArray(arg)) {
          toAdd = classnames2(arg);
        } else {
          toAdd = "";
          for (var k in arg) {
            if (arg[k] && k) {
              toAdd && (toAdd += " ");
              toAdd += k;
            }
          }
        }
        break;
      }
      default: {
        toAdd = arg;
      }
    }
    if (toAdd) {
      cls && (cls += " ");
      cls += toAdd;
    }
  }
  return cls;
};
var createEmotion3 = (key = "smbls", container) => {
  const cleanKey = key.replaceAll(/\./g, "-");
  return createEmotion({ key: cleanKey, container });
};
var emotion = createEmotion3();
var CONFIG2 = (0, import_scratch7.getActiveConfig)();
var import_utils5 = __toESM(require_cjs2());
var import_scratch8 = __toESM(require_cjs());
var import_scratch9 = __toESM(require_cjs());
var import_scratch10 = __toESM(require_cjs());
var import_utils6 = __toESM(require_cjs2());
var Tooltip = {
  extend: Flex,
  props: {
    background: "black",
    color: "white",
    flow: "column",
    shape: "tooltip",
    shapeDirection: "left",
    padding: "Z1 A",
    round: "Y2",
    width: "fit-content",
    minWidth: "D2",
    maxWidth: "F2",
    gap: "X",
    textAlign: "center"
  },
  attr: { tooltip: true },
  Title: {
    props: {
      fontWeight: 500,
      color: "gray12",
      text: "And tooltip is coming"
    }
  },
  P: {
    props: {
      fontSize: "Z2",
      margin: "0",
      color: "gray6",
      text: "and winter too",
      fontWeight: "400"
    }
  }
};
var TooltipHidden = {
  extend: Tooltip,
  props: ({ props }) => ({
    position: "absolute",
    pointerEvents: "none",
    opacity: "0",
    visibility: "hidden",
    transition: "C defaultBezier opacity, C defaultBezier visibility, B defaultBezier transform",
    ...props.shapeDirection === "top" ? {
      top: "112%",
      left: "50%",
      transform: "translate3d(-50%,10%,0)",
      ".active": {
        transform: "translate3d(-50%,0,0)",
        opacity: 1,
        visibility: "visible"
      }
    } : props.shapeDirection === "right" ? {
      transform: "translate3d(10%,-50%,0)",
      right: "112%",
      top: "50%",
      ".active": {
        transform: "translate3d(0%,-50%,0)",
        opacity: 1,
        visibility: "visible"
      }
    } : props.shapeDirection === "bottom" ? {
      transform: "translate3d(-50%,-10%,0)",
      bottom: "112%",
      left: "50%",
      ".active": {
        transform: "translate3d(-50%,0,0)",
        opacity: 1,
        visibility: "visible"
      }
    } : {
      transform: "translate3d(10%,-50%,0)",
      left: "112%",
      top: "50%",
      ".active": {
        transform: "translate3d(0%,-50%,0)",
        opacity: 1,
        visibility: "visible"
      }
    }
  })
};
var TooltipParent = {
  props: ({ Tooltip: Tooltip2, TooltipHidden: TooltipHidden2 }) => {
    var _a;
    return {
      position: "relative",
      zIndex: 999,
      style: {
        "&:hover, &:focus-visible": {
          zIndex: 1e3,
          "& [tooltip]": ((_a = Tooltip2 || TooltipHidden2) == null ? void 0 : _a[".active"]) || {
            transform: "translate3d(-50%,0,0)",
            opacity: 1,
            visibility: "visible"
          }
        }
      }
    };
  }
};
const orig = {
  extend: {
    extend: {
      props: {display: 'flex'},
      class: {
        flow: ({ props }) => props.flow && { flexFlow: props.flow },
        wrap: ({ props }) => props.wrap && { flexWrap: props.wrap },
        align: ({ props }) => {
      if (typeof props.align !== "string")
        return;
      const [alignItems, justifyContent] = props.align.split(" ");
      return { alignItems, justifyContent };
    }
      }
    },
    props: {
      background: 'black',
      color: 'white',
      flow: 'column',
      shape: 'tooltip',
      shapeDirection: 'left',
      padding: 'Z1 A',
      round: 'Y2',
      width: 'fit-content',
      minWidth: 'D2',
      maxWidth: 'F2',
      gap: 'X',
      textAlign: 'center'
    },
    attr: {tooltip: true},
    Title: {
      props: {
        fontWeight: 500,
        color: 'gray12',
        text: 'And tooltip is coming'
      }
    },
    P: {
      props: {
        fontSize: 'Z2',
        margin: '0',
        color: 'gray6',
        text: 'and winter too',
        fontWeight: '400'
      }
    }
  },
  props: ({ props }) => ({
    position: "absolute",
    pointerEvents: "none",
    opacity: "0",
    visibility: "hidden",
    transition: "C defaultBezier opacity, C defaultBezier visibility, B defaultBezier transform",
    ...props.shapeDirection === "top" ? {
      top: "112%",
      left: "50%",
      transform: "translate3d(-50%,10%,0)",
      ".active": {
        transform: "translate3d(-50%,0,0)",
        opacity: 1,
        visibility: "visible"
      }
    } : props.shapeDirection === "right" ? {
      transform: "translate3d(10%,-50%,0)",
      right: "112%",
      top: "50%",
      ".active": {
        transform: "translate3d(0%,-50%,0)",
        opacity: 1,
        visibility: "visible"
      }
    } : props.shapeDirection === "bottom" ? {
      transform: "translate3d(-50%,-10%,0)",
      bottom: "112%",
      left: "50%",
      ".active": {
        transform: "translate3d(-50%,0,0)",
        opacity: 1,
        visibility: "visible"
      }
    } : {
      transform: "translate3d(10%,-50%,0)",
      left: "112%",
      top: "50%",
      ".active": {
        transform: "translate3d(0%,-50%,0)",
        opacity: 1,
        visibility: "visible"
      }
    }
  }),
  __name: 'TooltipHidden'
};
export function TooltipHidden(props) {
  const ref_Box = useRef(null);
  const ref_Box_2 = useRef(null);
  const ref_P = useRef(null);
  function flow({ props }) {
    return (
      props.flow && {
        flexFlow: props.flow,
      }
    );
  }

  function wrap({ props }) {
    return (
      props.wrap && {
        flexWrap: props.wrap,
      }
    );
  }

  function align({ props }) {
    if (typeof props.align !== "string") return;
    const [alignItems, justifyContent] = props.align.split(" ");
    return {
      alignItems,
      justifyContent,
    };
  }

  const context = useContext(SymbolsProvider);
  const dobj = {
    ...createSync({ ...orig, context }, { domqlOptions: { onlyResolveExtends: true } }),
    node: ref_Box.current
  }
  dobj.props = {
    ...dobj.props,
    ...props
  }
  const dobj_Box = dobj["Title"]
  dobj_Box.node = ref_Box_2.current
  const dobj_P = dobj["P"]
  dobj_P.node = ref_P.current
  if (props.logElement)
    console.log(dobj)

  return (
    <Box
      position="absolute"
      pointerEvents="none"
      opacity="0"
      visibility="hidden"
      transition="C defaultBezier opacity, C defaultBezier visibility, B defaultBezier transform"
      transform="translate3d(10%,-50%,0)"
      left="112%"
      top="50%"
      background="black"
      color="white"
      flow="column"
      shape="tooltip"
      shapeDirection="left"
      padding="Z1 A"
      round="Y2"
      width="fit-content"
      minWidth="D2"
      maxWidth="F2"
      gap="X"
      textAlign="center"
      display="flex"
      tag="div"
      tooltip="true"
      ref={ref_Box}
      className={`${css(flow(dobj))} ${css(wrap(dobj))} ${css(align(dobj))}`}
      {...dobj.props}
      domqlElementObject={dobj}
    >
      <Box
        color="gray12"
        text="And tooltip is coming"
        tag="div"
        ref={ref_Box_2}
        fontWeight={500}
        {...dobj_Box.props}
        domqlElementObject={dobj_Box}
      />
      <P
        fontSize="Z2"
        margin="0"
        color="gray6"
        text="and winter too"
        fontWeight="400"
        ref={ref_P}
        {...dobj_P.props}
        domqlElementObject={dobj_P}
      />
    </Box>
  );
}
const orig_2 = {
  props: ({ Tooltip: Tooltip2, TooltipHidden: TooltipHidden2 }) => {
    const TooltipElem = Tooltip2 || TooltipHidden2;
    const TooltipActive = TooltipElem && TooltipElem[".active"];
    return {
      position: "relative",
      zIndex: 999,
      style: {
        "&:hover, &:focus-visible": {
          zIndex: 1e3,
          "& [tooltip]": TooltipActive || {
            transform: "translate3d(-50%,0,0)",
            opacity: 1,
            visibility: "visible"
          }
        }
      }
    };
  },
  __name: 'TooltipParent'
};
export function TooltipParent(props) {
  const ref_Box = useRef(null);

  const context = useContext(SymbolsProvider);
  const dobj = {
    ...createSync({ ...orig_2, context }, { domqlOptions: { onlyResolveExtends: true } }),
    node: ref_Box.current
  }
  dobj.props = {
    ...dobj.props,
    ...props
  }
  if (props.logElement)
    console.log(dobj)

  return (
    <Box
      position="relative"
      tag="div"
      ref={ref_Box}
      zIndex={999}
      style={{
        "&:hover, &:focus-visible": {
          zIndex: 1000,
          "& [tooltip]": {
            transform: "translate3d(-50%,0,0)",
            opacity: 1,
            visibility: "visible",
          },
        },
      }}
      {...dobj.props}
      domqlElementObject={dobj}
    />
  );
}