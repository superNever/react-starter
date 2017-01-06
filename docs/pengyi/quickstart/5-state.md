## State和生命周期

---

考虑之前时钟的例子，目前为止我们只学习了一种更新UI的方式，那就是通过调用`ReactDOM.render()`来渲染新的页面：

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

这一章，我们将学习如何让`Clock`组件变成可复用的和可封装的，它将会自己设置计时器并且每一秒更新自己。

首先先对clock进行组件封装：

```javascript
function Clock(props) {
    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {props.date.toLocaleTimeString()}.</h2>
        </div>
    );
}

function tick() {
    ReactDOM.render(
        <Clock date={new Date()} />,
        document.getElementById('root')
    );
}

setInterval(tick, 1000);
```
但是，这个组件忽略了一个关键的需求：应该由`Clock`自己来设置一个计时器并且每秒更新UI，这是`Clock`的实现细节。

理想状态下，我们想要的效果是只写一次`Clock`，并让其自己进行更新：

```javascript
ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);
```

要实现这个效果，我们需要给`Clock`组件添加"state"。

State和props很像，但是State是私有的，并且完全由组件自己来控制。

之前我们曾谈到过，组件以类的方式来定义的话有一些额外的特性。本地的state就属于这种特性，只有类方式定义的组件才有。

### 将函数式组件改写为类方式

将一个函数式组件改写为类组件需要五步：

1. 用相同的名字创建一个`ES6`的`class`，并且继承自`React.Component`。
2. 添加一个空的方法`render()`。 
3. 将函数组件的内部代码转移到`render()`方法内部。
4. 替换`render()`方法内部的`props`属性为`this.props`。
5. 删除空的函数声明。

```javascript
class Clock extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}
```

如上所示，`Clock`组件现在已经从函数式定义转变为了类定义。这样一来，我们就可以使用一些额外的特性了，比如state和生命周期钩子。

### 添加本地State

将`date`从props变为state需要三步：

1. 将`render()`方法中的`this.props.date`替换为`this.state.date`：

```javascript
class Clock extends React.Component {
    render() {
        return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
        );
    }
}
```

2. 为类添加一个构造函数`constructor`，并且声明和初始化`this.state`：

```javascript
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    render() {
        return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
        );
    }
}
```
注意，我们传递了`props`给基类构造函数：

```javascript
constructor(props) {
    super(props);
    this.state = {date: new Date()};
}
```
类组件应该在任何时候都传递`props`参数给基类构造函数并且调用。

3. 移除`<Clock />`元素里边的`date`属性：

```javascript
ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);
```
我们稍后添加回来计时器相关的代码。

目前的组件如下：

```javascript
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    render() {
        return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
        );
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);
```
下一步，我们将给`Clock`逐渐设置计时器，并且让它每一秒都进行更新。

### 添加生命周期函数



