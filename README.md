### eggjs 🥚

基于 koa,koa 是由 express 原班人马打造的框架。

### koa 的洋葱圈模型是啥？

洋葱圈模型指的是对中间件执行顺序的处理机制，koa 通过 await 和 async 可以非常灵活的控制中间件的执行顺序，使得请求在通过中间件处理时呈现请求穿透洋葱，直达洋葱心，随后又从洋葱心出来直达洋葱外表皮的状态，称之为洋葱圈模型。

### koa 跟 express 比优势在哪？

1. 更轻量，自身不集成一些路由、静态资源处理、模版等库。
2. 对异步的处理和支持更先进，采用 async await 语法代替 express 的异步回调方式。

### TODO:模版引擎怎么渲染的？ 为什么使用 vue 脚手架初始化不需要，为什么我们需要？

### 反向代理是怎么回事？作用是？怎么跟这个项目打交道。

### 怎么控制项目环境变量的

1. 第一种方法：指定 config/env
2. 第二种方法：运行 egg app 时：注入环境变量：package.json 中：`"dev:production": "EGG_SERVER_ENV=production egg-bin dev"`

### 订阅模型

Subscription 基类：订阅模型是一种比较常见的开发模式，egg 提供了 Subscription 基类来规范化这个模式。

```javascript
const Subscription = require("egg").Subscription;

class Schedule extends Subscription {
  // 需要实现此方法
  // subscribe 可以为 async function 或 generator function
  async subscribe() {}
}
```

## 运行环境

### 指定运行环境

1. 通过 config/env 文件指定，该文件的文本内容就是运行环境，如：production、simulation
2. 通过在启动 egg 应用时注入环境变量：EGG_SERVER_ENV=production npm start

### 获取运行环境

`app.config.env`

### EGG_SERVER_ENV 与 NODE_ENV 的区别

前者对于环境变量的管理更加精细，建议在 egg 应用中使用前者。

### controller

controller 文件中，函数中的 this 身上都有什么？
`const { ctx, app, config, service } = this;`

### context

写在 app/extend/context.js 里面
context 是啥，其实就是为了丰富 ctx 上下文对象的，比如这文件里面写了一个变量叫 isIos，则此变量会挂载到 ctx 身上。

### helper

写在 app/extend/helper.js 里面

helper 是啥？ 可以理解为工具函数，在 egg 上下文 ctx 中可通过 ctx.helper 访问工具函数。

### middleware

写在 app/middleware 里面，配置在 config/config.default.js 里面。

### 关于 app/extend

该目录下可以写这么几个文件：application.js context.js request.js response.js helper.js 这些文件的作用都是为了扩展 Koa 中对应的原型，例如扩展 app 原型、ctx 原型、req 原型、res 原型、helper 原型等

### plugins 插件

最好是建一个目录 plugins: 该目录都是通用的插件。

插件的注册：
config/plugin.js

```
  myplugin: {
    enable: true,
    path: path.join(__dirname, "../plugins/egg-myplugin"), // 插件的注册分两种方式：path和package，path顾名思义就是通过路径的方式使用插件，package就是以装包的形式去使用插件。
  },
```

抽离成独立的插件：

```
1. 完善package.json，这是npm所需要的，对于egg插件，npm包名和插件名不同，规范：包名egg-xx-xx，插件名：eggXxxXxx
    1. 增加字段
    "eggPlugin": {
      "name": "myplugin",
      "dependencies": []
    },
2. 切到插件目录，无需打包
  1. `$ npm login`
  2. `$ npm publish`
```

修改插件在项目中的用法，应把 path 改成 package 用法。

### 框架内置基础对象

egg 包含很多内置对象：application、context、request、response、controller、servive、logger、helper、config，其中前四个是继承于 Koa 的，后面的是 egg 自行扩展的。

### app

egg 实例，几乎可以在任何场景获取到 app 实例，在其上可以挂载一些方法和属性。

### context

context 实际上是一个请求级别的对象，每当收到一次请求时，都会重新包装成一个 context 对象，里面包含有请求信息以及可以设置响应信息，所有的 service 也会被挂载到 context 上，还有另外的一些属性和方法。

也可以手动创建 ctx 对象：`const ctx = app.createAnonymousContext();`

### helper

helper 中方法也可以拿到当前请求的上下文信息。

### config

遵循配置和代码分离的原则，项目启动后会把合并后的最终配置输出到 `run/application_config.json（worker 进程）`和 `run/agent_config.json（agent 进程）`中，以供问题分析。

### middleware

编写中间件：本质上是一个函数，有 next 和 ctx 参数可对请求或者响应或者上下文对象做处理。
使用中间件：中间件必须手动挂载并且指定中间件的先后执行顺序。

- 在应用中使用中间件：

  - 在 config.default.js 中声明

    ```js
    module.exports = {
      // 配置需要的中间件，数组顺序即为中间件的加载顺序
      middleware: ["gzip"],

      // 配置 gzip 中间件的配置
      gzip: {
        threshold: 1024, // 小于 1k 的响应体不压缩
      },
    };
    ```

  ```

  ```

- 在框架和插件中使用中间件，这时候不支持在 config.default.js 中进行配置，要在 app.js 中进行配置

  ```js
  // app.js
  module.exports = (app) => {
    // 在中间件最前面统计请求时间
    app.config.coreMiddleware.unshift("report");
  };
  ```

- 在路由中使用中间件，无论是应用中间件还是插件或者框架中间件，本质上都是全局中间件，路由中间件支持对于特定的请求应用中间件：
  ```js
  // app/router.js
  module.exports = (app) => {
    const gzip = app.middleware.gzip({ threshold: 1024 });
    app.router.get("/needgzip", gzip, app.controller.handler);
  };
  ```

#### 配置 middleware

- enable：控制中间件是否开启。
- match：设置只有符合某些规则的请求才会经过这个中间件。
- ignore：设置符合某些规则的请求不经过这个中间件。

```js
module.exports = {
  bodyParser: {
    enable: false, // 关闭 bodyParser 这个中间件
  },
};
```

`match和ignore不可同时开启，两者都支持相同的配置方式：字符串、正则、函数`;

- 字符串：当参数为字符串类型时，配置的是一个 url 的路径前缀，所有以配置的字符串作为前缀的 url 都会匹配上。当然，你也可以直接使用字符串数组。
- 正则：当参数为正则时，直接匹配满足正则验证的 url 的路径。
- 函数：当参数为一个函数时，会将请求上下文传递给这个函数，最终取函数返回的结果（true/false）来判断是否匹配。

### router

基本用法：

```js
// app/router.js
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/user/:id", controller.user.info);
  router.post("/user", controller.user.create);
  router.post("/admin", isAdmin, controller.admin); // 此路由使用了isAdmin中间件
};
```

重定向：

1. 内部重定向
   ```js
   // app/router.js
   module.exports = (app) => {
     app.router.get("index", "/home/index", app.controller.home.index);
     app.router.redirect("/", "/home/index", 302);
   };
   ```
2. 外部重定向

   ```js
   // app/controller/search.js
   exports.index = async (ctx) => {
     const type = ctx.query.type;
     const q = ctx.query.q || "nodejs";

     if (type === "bing") {
       ctx.redirect(`http://cn.bing.com/search?q=${q}`);
     } else {
       ctx.redirect(`https://www.google.co.kr/search?q=${q}`);
     }
   };
   ```

### controller

作用：

1. 对于处理数据的接口服务，controller 负责解析用户传来的参数，调用 service 进行数据库的增删改查操作。或者转发请求给其他服务，并返回给用户处理后的结果。
2. 对于处理页面的 HTML 服务，controller 通过借助模版引擎等工具（如 nunjucks）动态构造渲染模版返回给前端，前端可以进行渲染页面。

从 ctx 中获取参数：

1. /posts?category=egg&language=node `ctx.query.xxx`
2. /projects/:projectId/app/:appId `ctx.params.xxx`
3. 对于 post 请求: `ctx.request.body`
4. 获取 headers: `ctx.request.headers` 或 `ctx.headers`都可； `ctx.get(name)` 同样可以获取某个 header 字段，当然可以通过 headers['name']获取，但是前者会处理字段的大小写。
5. 千万注意：ctx.body 指的是 ctx.response.body
6. 设置响应单个 header：`ctx.set('show-response-time', used.toString());` 设置响应多个 header：`ctx.set(headers)`

### service

service 即为高度抽象和独立的业务逻辑封装，抽象出的 Service 可以被多个 Controller 重复使用

### 插件

一个插件就是一个 mini 的应用，几乎和应用一模一样，只是没有 router.js 和 plugin.js 和 controller，因为本质上我们编写一个插件，一般都是为了在主应用中安装这个插件，丰富一下上下文之类的，不至于让主应用逻辑过于复杂，并且这个插件逻辑可能还可以复用在其他地方。

对于插件的安装声明，一般声明在 config/pligin.js 中。  
对于插件的配置说明一般说明在 config/config.default.js 中。

### 定时任务

统一存放在 app/schedule 目录下，每一个文件是一个独立的定时任务，可以配置定时任务的属性和要执行的方法。

定时任务可以指定 interval 或者 cron 两种不同的定时方式。

interval 一般就是指定 '10s' '100m' 这样

corn 表达式是一套规则，例如：cron: '0 0 \*/3 \* \* \*', 表示每三小时执行一次。
