import { isInstalled, isUrl, optionalRequire, RequireTypes } from "./utils";
// using Axios to do async requests
import axios, { AxiosRequestConfig } from "axios";
// using sync-fetch to do sync requests, user needs to install sync-fetch them self
const syncFetch = optionalRequire("sync-fetch");

type RequireOptions = {
  requestOptions: AxiosRequestConfig | undefined | { [key: string]: any }; 
  patchRequire: boolean | Function | string, 
  passOptions: boolean | undefined
}

// module cache
const Cache = Object.create(null);


function getRequireWithOptions(passedOptions: RequireOptions, _function: Function) {
  return (pkgName: string, options: RequireOptions) => _function(pkgName, Object.assign(passedOptions, options));
}


function getRequire(options: RequireOptions) {
  const { patchRequire, passOptions } = options;
  // check if patchRequire is either _requireAsync or _requireSync, if it is return it
  if (
    typeof patchRequire === "function" &&
    (patchRequire === _requireAsync || patchRequire === _requireSync)
  )
    return passOptions ? getRequireWithOptions(options, patchRequire) : patchRequire;
  // else if its === true return _requireAsync
  else if (patchRequire === true) return passOptions ? getRequireWithOptions(options, _requireAsync) : _requireAsync;
  // users can pass in a string
  else if(typeof patchRequire === "string") {
    if(RequireTypes.async.includes(patchRequire)) return passOptions ? getRequireWithOptions(options, _requireAsync) : _requireAsync;
    else if(RequireTypes.sync.includes(patchRequire)) return passOptions ? getRequireWithOptions(options, _requireSync) : _requireSync;
    else return require
    
  }
  // else return the default require
  else return require;
}

// require using sync fetch (not recommended)
function _requireAsync(
  scriptUrl: string,
  options: RequireOptions = {
    requestOptions: {},
    patchRequire: false,
    passOptions: false
  }
) {
  if (typeof scriptUrl !== "string")
    throw new Error(`scriptUrl must be a string, received ${typeof scriptUrl}`);
  if (options.requestOptions && typeof options.requestOptions !== "object")
    throw new Error(
      `requestOptions must be an object, received ${typeof options.requestOptions}`
    );
  if(options.passOptions && typeof options.passOptions !== "boolean") throw new Error(`passOptions must be a boolean, received ${typeof options.passOptions}`)
  let parsedScriptUrl = scriptUrl;
  return new Promise((resolve, reject) => {
    // user did not provide a url, probably a package name was given
    if (!isUrl(parsedScriptUrl)) {
      if (isInstalled(parsedScriptUrl)) return require(parsedScriptUrl);
      else parsedScriptUrl = `https://unpkg.com/${parsedScriptUrl}`;
    }
    if (Cache[parsedScriptUrl]) return resolve(Cache[parsedScriptUrl].exports);
    axios.get(parsedScriptUrl, options.requestOptions || {})
      .then(({ data: scriptData }) => {
        let module = { exports: {} };
        Cache[parsedScriptUrl] = module;
        let wrapper = Function(
          "require, exports, module, requireAsync, requireSync",
          scriptData
        );
        const _require = getRequire(options);
        wrapper(_require, module.exports, module, _requireAsync, _requireSync);
        resolve(Cache[parsedScriptUrl].exports);
      })
      .catch(reject);
  });
}

function _requireSync(
  scriptUrl: string,
  options: RequireOptions = { patchRequire: false, requestOptions: {}, passOptions: false }
) {
  // user needs to install sync-fetch them self
  if (!syncFetch)
    throw new Error(
      "sync-fetch (https://www.npmjs.com/package/sync-fetch) is not installed, we do not install sync-fetch by default in new versions (or use requireAsync)"
    );
  // only strings are allowed
  if (typeof scriptUrl !== "string")
    throw new Error(
      `PackageName must be a string, received ${typeof scriptUrl}`
    );
  if (options.requestOptions && typeof options.requestOptions !== "object")
    throw new Error(
      `requestOptions must be an object, received ${typeof options.requestOptions}`
    );
  if(options.passOptions && typeof options.passOptions !== "boolean") throw new Error(`passOptions must be a boolean, received ${typeof options.passOptions}`)
  let parsedScriptUrl = scriptUrl;
  if (!isUrl(parsedScriptUrl)) {
    if (isInstalled(parsedScriptUrl)) return require(parsedScriptUrl);
    else parsedScriptUrl = `https://unpkg.com/${parsedScriptUrl}`;
  }
  if (Cache[parsedScriptUrl]) return Cache[parsedScriptUrl].exports;

  const Script: string = syncFetch(
    parsedScriptUrl,
    options.requestOptions || {}
  ).text();

  let module = { exports: {} };
  Cache[parsedScriptUrl] = module;
  let wrapper = Function(
    "require, exports, module, requireAsync, requireSync",
    Script
  );
  const _require = getRequire(options);
  wrapper(_require, module.exports, module, _requireAsync, _requireSync);

  return Cache[parsedScriptUrl].exports;
}

export default _requireAsync;
export {
  _requireSync as requireSync,
  Cache as requireCache,
  _requireAsync as requireAsync,
};
