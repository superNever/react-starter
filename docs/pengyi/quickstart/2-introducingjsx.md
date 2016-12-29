## JSX 简介
---
先看下这句声明：
```javascript
const element = <h1>Hello, world</h1>;
```
以上这种标签语法既不是一个字符串也不是HTML。

这就是`JSX`，一种Javascript语法的一种扩展。官方推荐使用`JSX`和`React`搭配来描述UI组件。

`JSX`产出`React`的`元素`。下边主要介绍`JSX`的基本使用。

### 将表达式嵌入JSX

在`JSX`中可以使用`{}`来包含任何javascript表达式，比如说`2+2`，`user.name`或者方法调用`formatName(user)`等都是合法的表达式：

```javascript
function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: 'Harper',
    lastName: 'Perez'
};

const element = (
    <h1>
        Hello, {formatName(user)}!
    </h1>
);

ReactDOM.render(
    element,
    document.getElementById('root')
);
```

### 将JSX放入表达式中

经过编译，`JSX`表达式会变为普通的Javascript对象。
这意味着你可以在if语句中和for循环中插入`JSX`语法，也可以将`JSX`赋值给变量、接受其为参数或者从函数中返回`JSX`表达式。
```javascript
function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
}
```
### 为JSX设定属性

可以通过双引号包括的字符串字面量来作为`JSX`的属性：

```javascript
const element = <div tabIndex="0"></div>;
```

当然也可以通过`{}`包裹的Javascript表达式来作为属性：

```javascript
const element = <img src={user.avatarUrl}></img>;
```

### 为JSX设定子元素

如果一个标签是空标签，可以使用闭合标签`/>`来结束标签，像XML一样：

```javascript
const element = <img src={user.avatarUrl} />;
```

`JSX`标签可以包含子元素：

```javascript
const element = (
    <div>
        <h1>Hello!</h1>
        <h2>Good to see you here.</h2>
    </div>
);
```
> 注意：由于JSX语法较之HTML更加接近于Javascript，所以React DOM使用驼峰命名的方式来命名属性名，以此来替换HTML中的属性。
> 举个例子比如`class`在JSX中必须写成`className`，`tabindex`必须写成`tabIndex`。下边主要介绍

### JSX可以阻止注入攻击

将用户输入嵌入JSX是安全的：

```javascript
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
);
```

默认情况下，对于任何嵌入到JSX中的值，React DOM在渲染之前都会进行编码。因此，它确保了在你的应用中你无法注入任何没有明确写明的代码，因为任何东西都会在渲染前被转化成字符串。
这种方式可以阻止XSS（跨域站点攻击）。

### JSX代表了一种对象

Babel通过转码会将JSX编译为`React.createElement()`的调用：

以下两种方式是等价的：

```javascript
const element = (
    <h1 className="greeting">
        Hello, world!
    </h1>
);
```

```javascript
const element = React.createElement(
    'h1',
        {className: 'greeting'},
    'Hello, world!'
);
```

`React.createElement()`可以确保你写出bug更少的代码，它创造出的对象像这样：

```javascript
// Note: this structure is simplified
const element = {
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'Hello, world'
    }
};
```

这种对象称为`React元素`，你可以理解为他们就是页面上UI元素的描述信息。React解析这些对象，并通过他们来构建和更新DOM树。 






















