## 组件与Props

---

组件可以将UI页面分割成为许多相互独立的、可复用的片段，从而使得考虑每一部分的设计时可以独立考虑。

概念上讲，组件类似于Javascript中的函数。组件接受任意的输入（称为`props`）并最终返回在屏幕上显示的React元素。

### 函数式与类形式的组件

最简单定义一个组件的方式是用Javascript的function:

```javascript
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
```

上边这个函数是一个合法的React组件，它接受一个"props"对象作为参数，并返回一个React元素。我们称这种组件为"函数式的组件"，因为它就是字面上的Javascrit函数。

另一种定义组件的方法是使用ES6中的`class`:

```javascript
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
```
以上两种组件在React里是完全等价的。利用`class`定义的组件会有一些额外的特性，下一章会重点讨论，目前为止都用函数式的组件来举例，因为简明一点。

### 渲染组件

之前我们只遇到过React元素代表DOM标签的情况:

```javascript
const element = <div />;
```

其实，元素也可以表示用户自定义的组件:

```javascript
const element = <Welcome name="Sara" />;
```

当React检测到一个元素代表的是一个用户自定义的组件的时候，它会将JSX的属性当做一个单对象传递给组件。我们称这个对象叫做"props"。

举个例子，下面的例子在页面上展示"Hello, Sara":

```javascript
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
    element,
    document.getElementById('root')
);
```

现在重点来看下在这个例子中发生了什么：

1. 通过调用`ReactDOM.render()`来渲染`<Welcome name="Sara" />`元素。
2. React 调用`Welcome`组件，并且将`{name: 'Sara'}`作为props对象传入。
3. `Welcome`组件返回`<h1>Hello, Sara</h1>`元素作为组件输出结果。
4. ReactDOM最终更新DOM，将`<h1>Hello, Sara</h1>`元素显示。

> 警告：通常情况下，组件名称都以大写开头。举个例子，`<div />`代表了一个普通的DOM元素标签，但是`<Welcome />`代表的是一个组件，并且需要`Welcome`在作用域内。

### 编写组件

组件在输出的时候也可以引用其他的组件。这可以让我们用组件抽象出各种层级的细节。一个按钮，一个表单，一个对话框等：在React应用中，所有的这些都是通过组件来表达的。

举个例子，我们可以通过创建一个`APP`组件来渲染多次`Welcome`组件:

```javascript
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

function App() {
    return (
        <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
```
TODO
