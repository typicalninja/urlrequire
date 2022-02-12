const path = require('path');
/*
// url => path
// require files over url
// similar to nodes require
// but supports requiring packages / javascript scripts over a url
// like in deno
const url = require('url');

const t = './git-host-info.js';
const base = "https://www.google.com/";
const l = 'https://www.google.com/git.js';
//const joined = path.join(base, t);
console.log(path.dirname(l))*/
//console.log(new URL(joined));


//const Require = require('./require.js');
//const _ = Require('request', { patchRequire: true });


const { requireAsync, requireCache, requireSync } = require('./dist/index.js');

console.log(requireSync('ms')('1m'))