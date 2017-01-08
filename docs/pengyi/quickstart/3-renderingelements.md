## 渲染元素

---

`元素（Elements）`是构建React应用的最小单元。

一个元素来描述你希望屏幕上展现的UI元素：

```javascript
const element = <h1>Hello, world</h1>;
```

与DOM元素不同的是，React元素是普通的对象，创建简单。React DOM更加关注更新与React元素匹配的DOM树。

> Tips: 一个常见的误区是将元素与组件(Components)弄混淆。元素只是构成组件的零部件。

### 渲染一个元素到DOM树中

首先假定在html文档中有一个`<div>`：

```javascript
<div id="root"></div>
```
我们把这个称为"root"DOM结点，其中嵌套的所有东西都将被React DOM来接管。

通过React构建的应用通常只有一个单root结点。如果要将React集成在一个已存在的应用里，那么可以拥有多个相互独立的DOM根节点。

将一个React元素渲染到根DOM结点中，需要借助`ReactDOM.render()`函数：

```javascript
const element = <h1>Hello, world</h1>;
ReactDOM.render(
    element,
    document.getElementById('root')
);
```

这会在页面上展示"Hello World"。

### 更新已渲染的元素

React的元素是`不可变`的。一旦创建了一个元素后就无法改变它的子节点或者属性。

一个元素就像是电影里边的一帧：它代表了一个UI元素在某一刻的展现。

就我们现在了解到的，唯一可以更新UI元素的方式就是创建一个新的元素，并通过`ReactDOM.render()`函数来渲染。

下边是一个时钟的例子：

```javascript
function tick() {
    const element = (
        <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(
        element,
        document.getElementById('root')
    );
}

setInterval(tick, 1000);
```

这个例子中，`setInterval()`函数每过一秒就会重新调用`ReactDOM.render()`来渲染一个新的元素到页面上。

> 注意：实践中，大多数情况下React APP只调用`ReactDOM.render()`一次，在后边的章节中会学习如何利用具有状态的组件来封装代码。

### React只在必要的时候才会更新

React DOM会将当前元素以及其子元素和之前的状态进行比对，只有在状态确实改变的情况下才会做出必要的更新。
