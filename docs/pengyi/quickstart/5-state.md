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

TODO....