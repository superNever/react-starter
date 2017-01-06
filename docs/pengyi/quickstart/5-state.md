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

在拥有很多组件的应用中，有一点非常重要，那就是当组件摧毁的时候一定要释放其占用的资源。

我们想在`Clock`第一次渲染在DOM树中的时候设置一个定时器，这在react中叫做"挂载(monting)"。

同样的，我们也想在`Clock`在DOM树中移除的时候清除掉定时器，这在react中叫做"卸载(unmounting)"。

我们可以在组件类中声明一些特殊的方法，这些方法可以在组件挂载或者卸载的时候运行：

```javascript
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {

    }

    componentWillUnmount() {

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

这些方法统称为"生命周期挂钩"。

`componentDidMount()`挂钩函数会在组件渲染到DOM中之后执行，将计时器放到这里非常合适：

```javascript
componentDidMount() {
    this.timerID = setInterval(
        () => this.tick(),
        1000
    );
}
```

注意这里我们将计时器的ID附在了`this`上边。

`this.props`、由React来设置，`this.state`相比而言有着特殊的意义，你可以任意添加额外的字段到class中如果你需要存储一些额外信息，并且不需要用来作为显示输出。

如果不需要在`render()`方法中使用一些变量，那么不就应该放置到state中。

此外，我们还需要在`componentWillUnmount()`生命周期挂钩中清除掉计时器：

```javascript
componentWillUnmount() {
    clearInterval(this.timerID);
}
```

最后，我们来实现`tich()`方法，用来每秒更新时间。

这个方法将会使用`this.setState()`来更新组件的本地state状态：

```javascript
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
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
到现在，这个时钟就可以正常工作了。

现在来快速回顾一下发生了什么以及这些方法调用的顺序：

1. 当`<Clock />`传递给`ReactDOM.render()`的时候，React会调用`Clock`组件的构造函数。因为`Clock`需要显示当前时间，所以它用一个包含当前时间的对象来初始化`this.state`。之后我们还会更新这个state。
2. 之后React调用`Clock`组件的`render()`方法。这一步React才知道需要在屏幕上展示什么内容。React接着更新DOM去匹配`Clock`的渲染输出。
3. 当`Clock`组件的输出插入到DOM中的时候，React调用`componentDidMount()`方法。在这个方法中，`Clock`组件请求浏览器来设置一个定时器，每一秒钟调用一次`tick()`方法。
4. 每一秒钟，浏览器都会调用`tick()`方法。这个方法中，`Clock`组件将一个包含当前时间的对象传递给`setState()`,以此来更新UI。通过`setState()`调用，React会知道state已经改变，然后再次调用`render()`方法去了解下一步要在屏幕上展示什么样的内容。这个时候，`render()`方法中的`this.state.date`会变化，所以渲染出来的结果将会包含更新过的时间。相应地，React更新DOM。
5. 如果`Clock`组件从DOM中移除的话，React会调用`componentWillUnmount()`方法，这个时候计时器停止。

### 正确使用State

关于`setState()`,以下三点你必须知道。

#### 不要直接去更改State

举个例子，直接去修改state的话不会重新渲染组件：

```javascript
// Wrong
this.state.comment = 'Hello';
```

如果要修改state，请使用`setState()`:

```javascript
// Correct
this.setState({comment: 'Hello'});
```

**唯一可以直接对`this.state`直接赋值的地方是构造函数。**

#### State的更新可能是异步的

React可能会在一次更新操作中批处理多个`setState()`调用。

因为`this.props`和`this.state`可能异步更新，所以你不应该依赖他们当前的值去计算将来的状态（state）。

举个例子，下边的代码更新计数器可能会失败：

```javascript
// Wrong
this.setState({
    counter: this.state.counter + this.props.increment,
});
```

为了针对这种情况，有另一种调用`setState()`方法的方式，那就是不再传递一个对象给它，而是传递一个函数。这个函数接受前一个状态值作为第一个参数，第二个参数是执行更新操作的时候的props属性：

```javascript
// Correct
this.setState((prevState, props) => ({
    counter: prevState.counter + props.increment
}));
```
上边使用的是箭头函数，当然使用常规的函数也可以：

```javascript
// Correct
this.setState(function(prevState, props) {
    return {
        counter: prevState.counter + props.increment
    };
});
```

#### State的更新会被合并

当调用`setState()`的时候，React会合并你提供给当前state的所有对象。

举个例子，你的state可能包含若干相互独立的变量：

```javascript
constructor(props) {
    super(props);
    this.state = {
        posts: [],
        comments: []
    };
}
```

之后你可能会分别调用`setState()`来互不影响地更新它们：

```javascript
componentDidMount() {
    fetchPosts().then(response => {
        this.setState({
            posts: response.posts
        });
    });

    fetchComments().then(response => {
        this.setState({
            comments: response.comments
        });
    });
}
```
合并只是表面的，所以`this.setState({comments})`保证了`this.state.posts`的独立完整，但是完整替换了`this.state.comments`。

### 数据流自上而下流动

无论是父组件还是子组件都无法知道一个确定的组件是有状态的还是无状态的，而且它们也不应该关注组件是以何种方式定义。

正因为如此，所以说state经常被认为是本地的或者封装的。对于任何组件，无论谁拥有它或设置它，都无法访问它的内部。

一个组件可以将其state以props的方式向下传递给其子组件：

```javascript
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

这种方式也适用于自定义组件：

```javascript
<FormattedDate date={this.state.date} />
```

`FormattedDate`组件可以接受`date`参数在其props中，并且不需要知道是否来自`Clock`组件的state或者props或者仅仅是被手动输入的：

```javascript
function FormattedDate(props) {
    return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```
这通常被称为"自顶向下"或者"单向"的数据流。任何state都属于一些特定的组件，任何组件中的数据或者源于state的UI元素都只能影响该组件下游的子组件。

如果将一棵组件树想象成为props的瀑布，每一个组件的state都是一个额外的水源，这个水源可以并入瀑布任意一点，并且只能向下流动。

为了表示所有组件确实是相互隔离的，我们可以创建一个`App`组件来渲染三个`Clock`：

```javascript
function App() {
    return (
        <div>
            <Clock />
            <Clock />
            <Clock />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
```

每一个时钟都会设置自己的计时器，并且互不影响地进行更新。

在React应用中，无论一个组件是有状态的还是无状态的都被认为是一个组件的实现细节，都可能随着时间而改变。你可以在有状态的组件中使用无状态的组件，反过来也一样。

