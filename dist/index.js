"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAsync = exports.requireCache = exports.requireSync = void 0;
var utils_1 = require("./utils");
// using Axios to do async requests
var axios_1 = __importDefault(require("axios"));
// using sync-fetch to do sync requests, user needs to install sync-fetch them self
var syncFetch = (0, utils_1.optionalRequire)("sync-fetch");
// module cache
var Cache = Object.create(null);
exports.requireCache = Cache;
function getRequireWithOptions(passedOptions, _function) {
    return function (pkgName, options) { return _function(pkgName, Object.assign(passedOptions, options)); };
}
function getRequire(options) {
    var patchRequire = options.patchRequire, passOptions = options.passOptions;
    // check if patchRequire is either _requireAsync or _requireSync, if it is return it
    if (typeof patchRequire === "function" &&
        (patchRequire === _requireAsync || patchRequire === _requireSync))
        return passOptions ? getRequireWithOptions(options, patchRequire) : patchRequire;
    // else if its === true return _requireAsync
    else if (patchRequire === true)
        return passOptions ? getRequireWithOptions(options, _requireAsync) : _requireAsync;
    // users can pass in a string
    else if (typeof patchRequire === "string") {
        if (utils_1.RequireTypes.async.includes(patchRequire))
            return passOptions ? getRequireWithOptions(options, _requireAsync) : _requireAsync;
        else if (utils_1.RequireTypes.sync.includes(patchRequire))
            return passOptions ? getRequireWithOptions(options, _requireSync) : _requireSync;
        else
            return require;
    }
    // else return the default require
    else
        return require;
}
// require using sync fetch (not recommended)
function _requireAsync(scriptUrl, options) {
    if (options === void 0) { options = {
        requestOptions: {},
        patchRequire: false,
        passOptions: false
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
        axios_1.default.get(parsedScriptUrl, options.requestOptions || {})
            .then(function (_a) {
            var scriptData = _a.data;
            var module = { exports: {} };
            Cache[parsedScriptUrl] = module;
            var wrapper = Function("require, exports, module, requireAsync, requireSync", scriptData);
            var _require = getRequire(options);
            wrapper(_require, module.exports, module, _requireAsync, _requireSync);
            resolve(Cache[parsedScriptUrl].exports);
        })
            .catch(reject);
    });
}
exports.requireAsync = _requireAsync;
function _requireSync(scriptUrl, options) {
    if (options === void 0) { options = { patchRequire: false, requestOptions: {}, passOptions: false }; }
    // user needs to install sync-fetch them self
    if (!syncFetch)
        throw new Error("sync-fetch (https://www.npmjs.com/package/sync-fetch) is not installed, we do not install sync-fetch by default in new versions (or use requireAsync)");
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
    var _require = getRequire(options);
    wrapper(_require, module.exports, module, _requireAsync, _requireSync);
    return Cache[parsedScriptUrl].exports;
}
exports.requireSync = _requireSync;
exports.default = _requireAsync;
