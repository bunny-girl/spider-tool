# Spider Adapters
🕷️ 泛用型爬虫适配器，使用 [Cheerio](https://www.npmjs.com/package/cheerio) 进行 HTML 返回内容的解析。
[[English version]](./README.md)  |  [NPM](https://www.npmjs.com/package/spider-adapters)
- - -
如何安装?

```shell script
npm i spider-adapters
```
- - -
如何使用？

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
或者简单的用：
```$javascript
let source = 'https://github.com/trending/';
let data = require('spider-adapters').deal(link)
```
- - -
已有适配器列表：
- [Github Trending](./adapter/github_trend.js)
- [Yandere](./adapter/yandere.detail.js)
- [CNBeta](./adapter/cnbeta.list.js)

- - -
如何创建你自己的适配器？

在 [`/adapter/`](./adapter/) 文件夹下创建一个文件。定义它的名字和匹配正则
，然后定义一个 handler 函数。将这些传给 Adapter 类。搞定。
