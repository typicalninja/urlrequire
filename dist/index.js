"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAsync = exports.requireCache = exports.requireSync = void 0;
var utils_1 = require("./utils");
// using miniget as we only need to do GET requests
var miniget_1 = __importDefault(require("miniget"));
// no ts stuff for syncFetch, and user need to install sync fetch them self
var syncFetch = (0, utils_1.optionalRequire)("sync-fetch");
// module cache
var Cache = Object.create(null);
exports.requireCache = Cache;
function getRequire(patchRequire) {
    // check if patchRequire is either _requireAsync or _requireSync, if it is return it
    if (typeof patchRequire === "function" &&
        (patchRequire === _requireAsync || patchRequire === _requireSync))
        return patchRequire;
    // else if its === true return _requireAsync
    else if (patchRequire === true)
        return _requireAsync;
    // else return the default require
    else
        return require;
}
// require using sync fetch (not recommended)
function _requireAsync(scriptUrl, options) {
    if (options === void 0) { options = {
        requestOptions: {},
        patchRequire: false,
    }; }
    if (typeof scriptUrl !== "string")
        throw new Error("scriptUrl must be a string, received " + typeof scriptUrl);
    if (options.requestOptions && typeof options.requestOptions !== "object")
        throw new Error("requestOptions must be an object, received " + typeof options.requestOptions);
    var parsedScriptUrl = scriptUrl;
    return new Promise(function (resolve, reject) {
        // user did not provide a url, probably a package name was given
        if (!(0, utils_1.isUrl)(parsedScriptUrl)) {
            if ((0, utils_1.isInstalled)(parsedScriptUrl))
                return require(parsedScriptUrl);
            else
                parsedScriptUrl = "https://unpkg.com/" + parsedScriptUrl;
        }
        if (Cache[parsedScriptUrl])
            return resolve(Cache[parsedScriptUrl].exports);
        (0, miniget_1.default)(parsedScriptUrl, options.requestOptions || {})
            .text()
            .then(function (scriptData) {
            var module = { exports: {} };
            Cache[parsedScriptUrl] = module;
            var wrapper = Function("require, exports, module, requireAsync, requireSync", scriptData);
            var _require = getRequire(options.patchRequire);
            wrapper(_require, module.exports, module, _requireAsync, _requireSync);
            resolve(Cache[parsedScriptUrl].exports);
        })
            .catch(reject);
    });
}
exports.requireAsync = _requireAsync;
function _requireSync(scriptUrl, options) {
    if (options === void 0) { options = { patchRequire: false, requestOptions: {} }; }
    // user needs to install sync-fetch them self
    if (!syncFetch)
        throw new Error("sync-fetch (https://www.npmjs.com/package/sync-fetch) is not installed, we do not install sync-fetch package ourself in new versions (or use requireAsync)");
    // only strings are allowed
    if (typeof scriptUrl !== "string")
        throw new Error("PackageName must be a string, received " + typeof scriptUrl);
    if (options.requestOptions && typeof options.requestOptions !== "object")
        throw new Error("requestOptions must be an object, received " + typeof options.requestOptions);
    var parsedScriptUrl = scriptUrl;
    if (!(0, utils_1.isUrl)(parsedScriptUrl)) {
        if ((0, utils_1.isInstalled)(parsedScriptUrl))
            return require(parsedScriptUrl);
        else
            parsedScriptUrl = "https://unpkg.com/" + parsedScriptUrl;
    }
    if (Cache[parsedScriptUrl])
        return Cache[parsedScriptUrl].exports;
    var Script = syncFetch(parsedScriptUrl, options.requestOptions || {}).text();
    var module = { exports: {} };
    Cache[parsedScriptUrl] = module;
    var wrapper = Function("require, exports, module, requireAsync, requireSync", Script);
    var _require = getRequire(options.patchRequire);
    wrapper(_require, module.exports, module, _requireAsync, _requireSync);
    return Cache[parsedScriptUrl].exports;
}
exports.requireSync = _requireSync;
exports.default = _requireAsync;
