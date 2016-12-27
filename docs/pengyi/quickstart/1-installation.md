## 安装
---
### 安装React

官方推荐使用`Yarn`或者`npm`来管理前端依赖。

如果使用`Yarn`，可以这样安装：
```bash
yarn add react react-dom
```

如果使用`npm`，可以这样安装：
```bash
npm install --save react react-dom
```

### 使用ES6和JSX

官方推荐使用[`Babel`](https://babeljs.io/)转义器来编译React代码，这样可以在React中使用`ES6`和`JSX`的语法。
`ES6`是最新一代的Javascript，它拥有诸多全新的特性与语法，能够使开发更加便捷轻松。
`JSX`是Javascript语言的一种扩展，可以与React友好地进行协作。

在使用`babel`之前确保已经安装了`babel-preset-react`和`babel-preset-es2015`，并且在`.bablerc`中做好了配置。

### Hello World

官方推荐使用`webpack`或者`Browserify`等打包器来管理代码，一来可以让代码模块化，二来可以打包加载以减少加载时间。

下边是最小的一个React应用Hello World：
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
);
```

这段代码构造了一个包含`Hello, world!`字样的`h1`Dom元素,并且将这个元素渲染进了页面上一个id为root的元素里。