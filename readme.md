# urlRequire
> Easy to use module to require scripts over urls 

* This does exactly what it says on the tin, it allows you to require scripts over urls
* It is a very simple module, and it is very easy to use
* It is not safe, and it is not meant to be
* It is not meant to be used for anything other than testing
* However if your dumb enough you can use this in production : )


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

* if you want to use it for a script that uses a lot of files, you may first want to convert that script to use urlRequire methods (so you can load the files it wants using url to them) or use **patchRequire** option

* If you pass a direct package name instead of a url, it will try to resolve that url to a [unpkg](https://unpkg.com) one (https://unpkg.com/[package-name]). however this would only work for a package that only has 1 file and (possibly no dependencies or dependencies that only have 1 file, **and with patchRequire enabled**)

### async

* This uses requireAsync 
#### Requiring Npm package :: [ms](https://www.npmjs.com/package/ms)

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
# Tests

> Tests are found in the [test folder](https://github.com/typicalninja493/urlrequire/tree/main/tests)

* [Mocha](https://mochajs.org/) is required to run the tests

* run the tests with below command

```
npm run test
```