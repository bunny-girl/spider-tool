# Spider Adapters
🕷️ Adapter for spiders, using [Cheerio](https://www.npmjs.com/package/cheerio) to parse HTML response.  
[[中文版]](./README_CN.md)  |  [NPM](https://www.npmjs.com/package/spider-adapters)
- - -
How to install?

```shell script
npm i spider-adapters
```
- - -
How to use?

```$javascript
//My testing code in test/index.js
const adapters = require('spider-adapters');

let links = [
    'https://github.com/trending/',
];

links.map(async link => {
    let data = await adapters.deal(link);
    console.log(data);
});
```
Or simply use it as:
```$javascript
let source = 'https://github.com/trending/';
let data = require('spider-adapters').deal(link)
```
- - -
List for existing adapters:
- [Github Trending](./adapter/github_trend.js)
<<<<<<< HEAD
- [PPMSG](./adapter/ppmsg.detail.js)
- Yandere [List](./adapter/yandere.list.js) & [Detail](./adapter/yandere.detail.js)
=======
- [Yandere](./adapter/yandere.detail.js)
- [CNBeta](./adapter/cnbeta.list.js)
>>>>>>> 354973cbb8af586a0e9d58648af8ec0ae48906c7

- - -
How to create your own one?  

Add a file (any name is acceptable), in [`/adapter/`](./adapter/) folder. Define its name and pattern, then define a handler function. Pass these to [`Adapter`](./lib/Adapter.js) class, then you got it.  
