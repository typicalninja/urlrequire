
const pkgMetaDataUrl = regex.test(pkgName) ? `${pkgName}.js?meta` : `https://unpkg.com/${pkgName}?meta`;
const data = fetch(pkgMetaDataUrl).json()
const path = data.path.split('/')[1];
console.log(path, data.path.split('/'))
//console.log(path, data.path)
const UrlWithFolder = path !== pkgName && path !== '' ? `https://unpkg.com/${pkgName}/${path}` : `https://unpkg.com/${pkgName}`
//console.log('dd:', UrlWithFolder)
const allRequires = findRequires(script, enabled);
allRequires.forEach((req) => {
 const formatString = `require('${req}')`
 if(isPathExp.test(req)) {
    console.log('p:', req, req.replace('.', ''))
    code = code.replace(formatString, `urlRequire({ url: '${UrlWithFolder + req.replace('.', '')}' })`)
 }
 else {
  //  console.log('n:', req)
    code = code.replace(formatString, `urlRequire({ url: '${req}' })`)
 }
})
