# UrlRequire
> Welcome to my most stupid package : )

with this package you can require packages over a url, instead of installing them and filling up your pc (or server or whatever) with "node_modules" folders

> definitely **Don't** suggest to be used in production.

# Usage

> For this example we will be using `jsdelivr.com` (https://www.jsdelivr.com/package/npm/[packageName]) 
> it will be a example for [node-fetch](https://www.npmjs.com/package/node-fetch)
> We will be using https://jsonplaceholder.typicode.com/todos/2 As a placeholder api for testing

### Example: node-fetch

```js
const UrlRequire = require('@typicalninja21/urlRequire');
let fetch = UrlRequire('https://cdn.jsdelivr.net/npm/node-fetch@2.6.1/lib/index.js');

(async () => {
    console.log(await fetch('https://jsonplaceholder.typicode.com/todos/2').then(r => r.json()))
})()
```

#### Returned Object
```json
{
  userId: 1,
  id: 2,
  title: 'quis ut nam facilis et officia qui',
  completed: false
}
```


# Limits/disadvantages

* If a package you want to require (from npm) requires a file, it will error with a `cannot find module` error as the file the package requires is not present (due to it not being installed locally) [*]

* If the server you get the file from goes down, or has a temporary/short issue, you might have slight issues of `UrlRequire` not being able to require those files (can cause some serious issues)

* Not safe!! (The package will not try to validate anything it receives as a url)

etc,


[*] maybe fixed/supported in newer version (if you can help me, i appreciate it)


# Features

* Require a package over a url 
* No need to await any of the `UrlRequire` calls (pre Version needed to be awaited to be required correctly, fixed by using sync-fetch)

More are planned


> Note: it would be better if you or some one modify each of these packages and change all require to maybe use this package, and make them require the file/package over a url (this will make it so the User not having to install any sort of dependency)**

[**] i will probably make this sort of thing, if i do, ill update these parts : )


