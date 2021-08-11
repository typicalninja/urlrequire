const fetch = require('sync-fetch')

// can we find a better one?
const exp = /^(?:\w+:)?\/\/(\S+)$/;

const regex = new RegExp(exp);
// create a object to act as our cache
const RequireCache = Object.create(null);

// simple function
const UrlRequire = (name) => {
  if(typeof name !== 'string') throw new Error(`UrlRequire: Received ${typeof name} Expected String (url)`)
  if(!name.match(regex)) return require(name);
    if (!(name in RequireCache)) {
        let code = fetch(name).text()
//console.log(code)
        let module = {exports: {}};
        RequireCache[name] = module;
        let wrapper = Function("require, exports, module, UrlRequire", code);
        wrapper(require, module.exports, module, UrlRequire);
      }
      return RequireCache[name].exports;
};

module.exports = UrlRequire;

module.exports.cache = RequireCache;