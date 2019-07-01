# Spider Adapters
🕷️ Adapter for spiders, using [Cheerio](https://www.npmjs.com/package/cheerio) to parse HTML response.  
泛用型爬虫适配器，使用 [Cheerio](https://www.npmjs.com/package/cheerio) 进行 HTML 返回内容的解析。
- - -

List for existing adapters:
已有适配器列表：
- [Github Trending](./adapter/github_trend.js)
- [PPMSG](./adapter/ppmsg.detail.js)

- - -
How to create your own one?
如何创建你自己的适配器？

Add a file (any name is acceptable), in [`/adapter/`](./adapter/) folder. Define its name and pattern, then define a handler function. Pass these to [`Adapter`](./lib/Adapter.js) class, then you got it.  
在 [`/adapter/`](./adapter/) 文件夹下创建一个文件。定义它的名字和匹配正则
，然后定义一个 handler 函数。将这些传给 Adapter 类。搞定。
