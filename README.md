# Vuetify-Blog

一个纯前端的个人博客项目：

- 基于 `vue` + `vuetify`
- 采用 `markdown` 语法解析，可直接以 `md` 文件形式线上写博客
- 采用 `mockjs` 模拟数据，也可接入后台 `api` (默认无需后台即可使用)
- `Material` 风格，支持亮暗两种模式，支持自定义主题
- 支持代码高亮
- 使用 `vue-router` 管理路由
- 基于 `vuex` 快速响应数据
- 响应式布局，支持 `mobile` 手机模式

## 快速开始

### 安装依赖包

推荐使用 `yarn`

```js
yarn install
```

或者你也可以使用 `npm` 等其他类似方式：

```js
npm install
```

### 开始体验

开启服务，之后进入首页就可以看到几个演示的文稿了

```js
yarn serve
```

### 生产环境打包

```js
yarn build
```

## 如何使用

### 目录结构

```bash
├── babel.config.js
├── package-lock.json
├── package.json
├── public  # 静态资源
│   ├── favicon.ico
│   ├── images # 图片资源
│   │   ├── 1.jpg
│   │   ├── 2.jpg
│   │   ├── 3.jpg
│   │   ├── article.png
│   │   ├── dark.png
│   │   └── light.png
│   ├── index.html
│   ├── json # 模拟后台 api 数据
│   │   ├── articles.json # 文章接口数据
│   │   ├── categories.json # 分类接口数据
│   │   ├── pages.json # 页面接口数据
│   │   └── topics.json # 主题接口数据
│   └── markdown_files # markdown 博客文章和页面
│       ├── 1.md
│       ├── 2.md
│       ├── 3.md
│       ├── about.md
│       └── link.md
├── src # 代码源文件
│   ├── App.vue # 主入口
│   ├── api # api 接口
│   │   └── index.js
│   ├── assets
│   │   ├── logo.png
│   │   └── logo.svg
│   ├── components # 组件
│   │   ├── MyImageViewer.vue
│   │   ├── MyMarkDown.vue
│   │   └── layouts # layout 页面结构
│   │       ├── BottomFooter.vue
│   │       ├── GoTo.vue
│   │       ├── Home.vue
│   │       ├── Layout.vue
│   │       ├── MainContent.vue
│   │       └── TopHeader.vue
│   ├── main.js
│   ├── mock # 模拟数据接口
│   │   ├── api.js
│   │   └── index.js
│   ├── plugins # vuetify 主题配置
│   │   └── vuetify.js
│   ├── router # 路由
│   │   ├── index.js
│   │   └── routes.js
│   ├── scss # 自定义 css 样式
│   │   ├── custom-markdown.scss
│   │   └── custom.scss
│   ├── store # vuex 数据
│   │   └── index.js
│   ├── utils # 自定义工具类
│   │   └── request.js
│   └── views # 页面
│       ├── Article.vue
│       ├── Articles.vue
│       └── Page.vue
├── vue.config.js
└── yarn.lock
```

### 基本原理

本博客默认为纯前端，没有后台编辑界面和接口。其工作基本流程如下：

1. 访问主界面
2. `mock` 识别，加载本地 `public/json` 目录下的 `json` 数据，并使用 `vuex` 缓存
3. `api` 接口获取菜单、文章列表、文章详情等数据
4. `mock` 拦截，`src/mock/api.js` 里根据 `api` 从 `vuex` 里获取数据，并规范格式响应
5. 页面根据获取到的数据加载页面

### 编辑/添加内容

#### 添加一篇文章

在 `public/markdown_files` 目录下新建一个 `md` 文件，例如 `4.md`，然后将你想写的内容放入其中，这里没有提供网页形式的编辑器，需要你在自己的本地编辑器里面编辑内容，如 `vscode`。之后在 `public/json/articles.json` 里面按默认的格式把自己的文章链接、图片、分类、主题等信息放入其中，就可以在首页刷新看到内容了。如果你使用 `yarn build` 打包了内容，就把上述文件和修改文件放置到 `dist` 相应目录下，或者重新打包一次即可。

#### 添加一个分类

在 `public/json/categories.json` 中按既定格式添加一条 json 数据即可。

#### 添加一个系列主题

在 `public/json/topics.json` 中按既定格式添加一条 json 数据即可。

#### 添加一个页面

在 `public/json/pages.json` 中按既定格式添加一条 json 数据即可。

### API 接口

`src/api/index.js` 下定义了博客的一些接口，包含菜单栏、文章列表、文章详情、独立页面等。该博客为纯前端，无后台和数据库等，`src/main.js` 里使用了 `mock.js` 进行了 `api` 拦截，并返回本地 `public/json` 里的参数，拦截响应的代码在 `src/mock/index.js` 和 `src/mock/mock.js`。如果你想添加并响应后台 `API`，可以在 `env.development` 和 `env.production` 里将 `VUE_APP_MOCK` 参数修改为 `0`：

```js
// .env.development
VUE_APP_MOCK = 0  // 是否开启 mock，1 为是，其他为否
```

### 修改主题

只需在 `src/plugins/vuetify.js` 里修改相应的颜色参数即可，默认颜色使用了自带的 `material` 风格，具体颜色参照这里：[https://vuetifyjs.com/zh-Hans/styles/colors](https://vuetifyjs.com/zh-Hans/styles/colors)：

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'
import store from '../store'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.lightGreen,
        secondary: colors.teal,
        tertiary: colors.orange,
        accent: colors.shades,
        error: colors.red,
        grey: colors.grey,
      },
      dark: {
        primary: colors.shades,
        secondary: colors.blueGrey,
        tertiary: colors.orange,
        accent: colors.shades,
        error: colors.red,
        grey: colors.grey,
      },
    },
    dark: store.getters.dark,
    options: {
      customProperties: true,
    },
  },
})
```
