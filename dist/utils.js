"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireTypes = exports.optionalRequire = exports.isUrl = exports.isInstalled = void 0;
function isInstalled(packageName) {
    try {
        require(packageName);
        return true;
    }
    catch (_a) {
        return false;
    }
}
exports.isInstalled = isInstalled;
function isUrl(string) {
    try {
        new URL(string);
        return true;
    }
    catch (_a) {
        return false;
    }
}
exports.isUrl = isUrl;
function optionalRequire(packageName) {
    if (isInstalled(packageName)) {
        return require(packageName);
    }
    return undefined;
}
exports.optionalRequire = optionalRequire;
var RequireTypes = {
    async: ['async', 'requireAsync', '_requireAsync'],
    sync: ['sync', 'requireSync', '_requireSync'],
};
exports.RequireTypes = RequireTypes;
