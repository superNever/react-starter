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

TODO...

