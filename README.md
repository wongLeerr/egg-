### eggjs 🥚

基于 koa,koa 是由 express 原班人马打造的框架。

### koa 的洋葱圈模型是啥？

洋葱圈模型指的是对中间件执行顺序的处理机制，koa 通过 await 和 async 可以非常灵活的控制中间件的执行顺序，使得请求在通过中间件处理时呈现请求穿透洋葱，直达洋葱心，随后又从洋葱心出来直达洋葱外表皮的状态，称之为洋葱圈模型。

### koa 跟 express 比优势在哪？

1. 更轻量，自身不集成一些路由、静态资源处理、模版等库。
2. 对异步的处理和支持更先进，采用 async await 语法代替 express 的异步回调方式。

### TODO:模版引擎怎么渲染的？ 为什么使用 vue 脚手架初始化不需要，为什么我们需要？

### 怎么控制项目环境变量的

1. 第一种方法：指定 config/env
2. 第二种方法：运行 egg app 时：注入环境变量：package.json 中：`"dev:production": "EGG_SERVER_ENV=production egg-bin dev"`

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

该目录下可以写这么几个文件：application.js context.js request.js response.js helper.js 这些文件的作用都是为了扩展 Koa 中对应的原型，例如扩展 app 原型、ctx 原型、req 原型、res 原型、helper 原型

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
