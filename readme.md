# urlRequire
> Easy to use module to require scripts over urls 

* This does exactly what it says on the tin, it allows you to require scripts over urls
* It is a very simple module, and it is very easy to use
* It is not safe, and it is not meant to be
* However if your dumb enough you can use this in production : )


# Table of Contents

 1. [Installation](#install)
 2. [Usage](#usage)
    1. [requireAsync](#async)
    2. [requireSync](#sync)
    3. [options](#options)
 3. [Tests](#tests)

# Install

#### Main Package

###### Even though you use this to require scripts over url, you cant require the package itself (so install it please)

```
npm i @typicalninja21/urlrequire
```

#### Optional package

* For requireSync (not recommended, use requireAsync when possible) support, you **MUST** to install the following package

> [sync-fetch](https://www.npmjs.com/package/sync-fetch)

```
npm i sync-fetch
```

# Usage

> This package is written in typescript, so you can use it with typescript, and the below examples will be in typescript, however you can use it with javascript if you want to.

##### Few Notes before using

* The package is mostly great for 1 file scripts that is not too big

* if you want to use it for a script that uses a lot of files, you may first want to convert that script to use urlRequire methods (so you can load the files/dependencies it wants using an url to them) or use **patchRequire** option

* If you pass a direct package name instead of a url, it will try to resolve that url to a [unpkg](https://unpkg.com) one (https://unpkg.com/[package-name]). however this would **only** work for a package that only has 1 file and (possibly no dependencies or have dependencies that only have 1 file, **and with patchRequire enabled**)


### async

* This uses requireAsync 
#### Requiring Npm package :: [ms](https://www.npmjs.com/package/ms)

> **You can use a direct link to raw source code of the package if you want** (ex: https://unpkg.com/ms@2.1.3/index.js)
###### Typescript

```ts
import { requireAsync } from '@typicalninja21/urlrequire';

requireAsync('ms').then((ms) => {
    console.log(`Loaded ms`, ms)
    console.log(ms(20000))
}).catch((err) => {
    console.log(`Error loading ms`, err)
})
```

###### Javascript

```js
const { requireAsync } = require('@typicalninja21/urlrequire');

requireAsync('ms').then((ms) => {
    console.log(`Loaded ms`, ms)
    console.log(ms(20000))
}).catch((err) => {
    console.log(`Error loading ms`, err)
})
```

#### Requiring a custom-script

* Script used is hosted on [Github](https://github.com/typicalninja493/urlrequire/blob/main/example/example.js)

###### Typescript

```ts
const url = 'https://raw.githubusercontent.com/typicalninja493/urlrequire/main/example/example.js'
import { requireAsync } from '@typicalninja21/urlrequire';

requireAsync(url).then((myCustomScript) => {
    console.log(`Loaded myCustomScript`, myCustomScript)
    // stuff provided by our custom script
    console.log('#add()', myCustomScript.add(1, 2, 3, 4, 5))
    console.log('#multiply()', myCustomScript.multiply(1, 2, 3, 4, 5));
    console.log('#divide()', myCustomScript.divide(1, 2, 3, 4, 5))
    console.log('#subtract()', myCustomScript.subtract(1, 2, 3, 4, 5))
    console.log('#addStrings()', myCustomScript.addStrings('This is', ' ', 'cool', '', 'ngl'))
}).catch((err) => {
    console.log(`Error loading myCustomScript`, err)
})
```

###### Javascript

```js
const url = 'https://raw.githubusercontent.com/typicalninja493/urlrequire/main/example/example.js'
const { requireAsync } = require('@typicalninja21/urlrequire');


requireAsync(url).then((myCustomScript) => {
    console.log(`Loaded myCustomScript`, myCustomScript)
    // stuff provided by our custom script
    console.log('#add()', myCustomScript.add(1, 2, 3, 4, 5))
    console.log('#multiply()', myCustomScript.multiply(1, 2, 3, 4, 5));
    console.log('#divide()', myCustomScript.divide(1, 2, 3, 4, 5))
    console.log('#subtract()', myCustomScript.subtract(1, 2, 3, 4, 5))
    console.log('#addStrings()', myCustomScript.addStrings('This is', ' ', 'cool', '', 'ngl'))
}).catch((err) => {
    console.log(`Error loading myCustomScript`, err)
})
```
### sync

> Using requireSync **is NOT recommended** (if possible please use **[requireAsync](#async)**), however if your are the guy who wants to get the native node.js require feel from this. you are **free to use this**. (no awaits. no promises. just requiring)

* **requireSync** requires optional dependency **[sync-fetch](https://www.npmjs.com/package/sync-fetch)**

#### Requiring Npm package :: [ms](https://www.npmjs.com/package/ms)

> **You can use a direct link to raw source code of the package if you want** (ex: `https://unpkg.com/ms@2.1.3/index.js`)
###### Typescript

```ts
import { requireSync } from '@typicalninja21/urlrequire';
// its almost similar to normal require
const ms = requireSync('ms')
console.log(ms(20000))
```

###### Javascript

```js
const { requireSync } = require('@typicalninja21/urlrequire');

// its almost similar to normal require
const ms = requireSync('ms')
console.log(ms(20000))
```

#### Requiring a custom-script

* Script used is hosted on [Github](https://github.com/typicalninja493/urlrequire/blob/main/example/example.js)

###### Typescript

```ts
const url = 'https://raw.githubusercontent.com/typicalninja493/urlrequire/main/example/example.js'
import { requireSync } from '@typicalninja21/urlrequire';
const myCustomScript = requireSync(url)
    console.log('#add()', myCustomScript.add(1, 2, 3, 4, 5))
    console.log('#multiply()', myCustomScript.multiply(1, 2, 3, 4, 5));
    console.log('#divide()', myCustomScript.divide(1, 2, 3, 4, 5))
    console.log('#subtract()', myCustomScript.subtract(1, 2, 3, 4, 5))
    console.log('#addStrings()', myCustomScript.addStrings('This is', ' ', 'cool', '', 'ngl'))
```

###### Javascript

```js
const url = 'https://raw.githubusercontent.com/typicalninja493/urlrequire/main/example/example.js'
const { requireSync } = require('@typicalninja21/urlrequire');

const myCustomScript = requireSync(url)
    console.log('#add()', myCustomScript.add(1, 2, 3, 4, 5))
    console.log('#multiply()', myCustomScript.multiply(1, 2, 3, 4, 5));
    console.log('#divide()', myCustomScript.divide(1, 2, 3, 4, 5))
    console.log('#subtract()', myCustomScript.subtract(1, 2, 3, 4, 5))
    console.log('#addStrings()', myCustomScript.addStrings('This is', ' ', 'cool', '', 'ngl'))
```

## Options

> Second argument for **[requireAsync](#async)** and **[requireSync](#sync)** is **options** which is an object.

* `options.requestOptions` - Is a Object (default: `{}`).for requireAsync it takes a `requestConfig` of **[axios](https://www.npmjs.com/package/axios#request-config)**.
for requireSync it takes a {} that will be passed to **[sync-fetch](https://www.npmjs.com/package/sync-fetch)**, sync-fetch runs node-fetch under the hood please refer docs for node-fetch for the **[requestConfig](https://github.com/node-fetch/node-fetch#options)**.

* `options.patchRequire` - Is a boolean (default: `true`), a function (takes [requireAsync](async) or [requireSync](#sync)). If set to `true` the package will attempt to replace the native require function with the one provided by the package (or if provided a function, that function) in the required script.**if this is set to false, the native require will be used, if you want to use require methods by this package, we also add requireSync and requireAsync to the global context of the required script**.

* `options.passOptions` - Is a Boolean.only works with above `options.patchRequire` is enabled.If set to `true` the package will the pass the same options you provided to the script you required

# Tests

> Tests are found in the [test folder](https://github.com/typicalninja493/urlrequire/tree/main/tests)

* [Mocha](https://mochajs.org/) is required to run the tests

* run the tests with below command

```
npm run test
```

# License

This Project is licensed under MIT license.View [License] for more info