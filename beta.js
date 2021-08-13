const fetch = require('sync-fetch');
const findRequires = require("find-requires");
const path = require('path');
const urljoin = require('url-join');

const registryUrl = 'https://registry.npmjs.org'


// can we find a better one?
const exp = /^(?:\w+:)?\/\/(\S+)$/;
const isPathExp = /[<>:"/\\|?*]/

const regex = new RegExp(exp);
// create a object to act as our cache
const RequireCache = Object.create(null);

// quite original ; )
const packageExists = (pkgName) => {
    try {
       const fData = fetch(`${registryUrl}/${pkgName}`).json()
       if(fData.error && fData.error == 'Not found') return false;
       // if pkgName == '.' or something like that, validate it didnt written something else
       if(!fData._id) return false;
       return true;
    }
    catch(err) {}
    return false;
}


const formatScript = ({ script, enabled = true, preData = [], pkgName, options = {} }) => {
    let code = script;
if(!enabled) return script;
// ik its longggggggg
const metaDataUrl = regex.test(pkgName) ? path.extname(path.basename(pkgName.replace('https://unpkg.com/', ''))) == '' ? pkgName + '.js?meta' : pkgName + '?meta' : `https://unpkg.com/${isPathExp.test(pkgName) && path.extname(path.basename(pkgName)) == '' ? pkgName + '.js' : pkgName + '/'}?meta`;
//const metaDataUrl = regex.test(pkgName)
// isPathExp.test(pkgName) && path.extname(path.basename(pkgName)) == '' ? pkgName + '?meta' : pkgName + '?meta'
const fetchedData = fetch(metaDataUrl).json();
const relativePath = fetchedData?.path.split('/').slice(0, fetchedData.path.split('/').length - 1).join('/')
const formedUrl = `${pkgName}${relativePath}`

const allRequires = findRequires(script);

allRequires.forEach((req) => {
    const formatString = `require('${req}')`
    if(isPathExp.test(req) && !packageExists(req.split('/')[0])) {
        const fPath = urljoin(formedUrl, req)
        // add .js ext or it will break
       // console.log(fPath)
        let finalPath = path.extname(path.basename(fPath)) == '' ? `${fPath}.js` : fPath
        finalPath = `${path.join(options.URL ? options.URL + '/' : `https://unpkg.com`, finalPath).replace('https:\\', 'https://').replace(/\\/g, '/')}`;
        code = code.replace(formatString, `urlRequire({ url: '${finalPath}' })`)
    }
    // its not a path
    else {
        let pkgN = isPathExp.test(req) ? path.extname(req) == '' ? req + '.js' : req : req;
      //console.log('2:', pkgN)
       // const pkgUrl = `https://unpkg.com/${pkgN}`
     code = code.replace(formatString, `urlRequire({ url: '${pkgN}' })`)
    }
});

return code;
}



const urlRequire = ({ url, options = { formatCode: false } }) => {
    let finalUrl = url;
    if(typeof url !== 'string') throw new Error('url must be a string');
    if(!regex.test(finalUrl)) {
        if(packageExists(finalUrl)) {
            finalUrl = `https://unpkg.com/${finalUrl}`
        }
        else if(isPathExp.test(finalUrl) && packageExists(finalUrl.split('/')[0])) {
            const restPath = finalUrl.split('/').slice(1).join('/')
            finalUrl = `https://unpkg.com/${finalUrl.split('/')[0]}/${path.extname(path.basename(restPath)) == '' ? `${restPath}.js` : restPath}`
        }
        else {
            throw new Error(`Package ${url} Does not exist`)
        }
    }
    if (!(url in RequireCache)) {
        // fetch and convert the script to text
      let code = fetch(finalUrl).text()
      if(options.formatCode) {
        code = formatScript({ script: code, enabled: true, pkgName: url })
      }
       let module = {exports: {}};
       RequireCache[url] = module;
       let wrapper = Function("require, exports, module, urlRequire", code);
       wrapper(require, module.exports, module, urlRequire);
      }
      return RequireCache[url].exports;
}

// exports
module.exports = urlRequire;
module.exports.cache = RequireCache;