## 高阶指南
### 深入了解 JSX
#### 从根本上讲，JSX仅仅是方法React.createElement(component, props, ...children)的语法糖，JSX的代码如下：

```bash
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```
#### 编译后：
```bash
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```
#### 如果没有子元素，你也可以使用自闭合的标签形式书写，如：
```bash
<div className="sidebar" />
```
#### 编译后：
```bash
React.createElement(
  'div',
  {className: 'sidebar'},
  null
)
```
#### 如果你想彻底了解一些特殊的JSX是如何转换成JavaScript的，你可以尝试使用[在线babel编译器](https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-0&code=function%20hello()%20%7B%0A%20%20return%20%3Cdiv%3EHello%20world!%3C%2Fdiv%3E%3B%0A%7D);

### React 元素类型的具体说明：
#### JSX标签的头部确定了其是否是react元素。
#### 大写的JSX标签类型指的是一个React组件，这些标签被编译为直接引用的命名变量，所以如果你使用了JSX`<Foo/>`表达，`Foo` 必须是已经在作用域当中可以调用了。

### 使用前先在作用域中引入React
#### 既然JSX被编译后使用的是`React.createElement`,那么我们的 `React`库必须已经在我们的JSX代码的作用域中引用了。
#### 例如，所有的imports导入在代码中都是非常重要的，虽然`React`和`CustomButton`不是在JavaScript中直接引用的：
```bash
import React from 'react';
import CustomButton from './CustomButton';

function WarningButton() {
  // return React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color="red" />;
}
```
#### 如果你没有使用JavaScript打包工具也没有通过script标签引入React，那么通过导入它已经在作用域中作为全局的`React`存在了。
###
### 使用点的方法调用JSX属性
#### 你也可以参考在一个react组件中的JSX内部使用点的方法调用，如果你有一个单一的模块用来输出多个组件，这将非常方便。例如，如果`MyComponents.DatePicker`是一个组件，你可以直接在JSX中使用它：

```bash
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
```
### 自定义的组件必须大写
#### 当一个元素类型首字母是小写的时候，它指的是像`<div>`或`<span>`一样的固定组件，并且作为字符串`div`或`span`传入`React.createElement`方法中。首字母大写的类型例如：`<Foo/>` 将会编译为`React.createElement(Foo)`，这相当于一个已经定义的组件或者是已经导入的javaScript文件。
#### 我们建议命名组件采用首字母大写的方式，如果你有一个组件是以首字母小写命名的，在JSX中使用它之前请将它赋值给一个大写的变量。
#### 例如，下面的这段代码就不能如期运行：
```bash
import React from 'react';

// Wrong! This is a component and should have been capitalized:
function hello(props) {
  // Correct! This use of <div> is legitimate because div is a valid HTML tag:
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // Wrong! React thinks <hello /> is an HTML tag because it's not capitalized:
  return <hello toWhat="World" />;
}
```

#### 让我们来修改一下，我们把`hello`重新命名为`Hello`，调用的时候使用`<Hello/>`：
```bash
import React from 'react';

// Correct! This is a component and should be capitalized:
function Hello(props) {
  // Correct! This use of <div> is legitimate because div is a valid HTML tag:
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // Correct! React knows <Hello /> is a component because it's capitalized.
  return <Hello toWhat="World" />;
}
```
### 选择执行时的类型
#### 你不能使用一个常用表达式作为react元素，如果你想使用一个表达式表示这个元素类型，你需要先把它赋值给一个首字母大写的变量，在你需要通过prop的传入值来渲染不同组件的时候，我们时常会采取这种方式。
```bash
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Wrong! JSX type can't be an expression.
  return <components[props.storyType] story={props.story} />;
}
```
#### 让我们来纠正一下，我们先把这个表达式赋值给一个首字母大写的变量
```bash
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Correct! JSX type can be a capitalized variable.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```
### JSX中的Props
#### 对于JSX中指定的props有几种不同的方式.
### JavaScrit 表达式
#### 你可以把一个JavaScript表达式通过`{}`括起来作为prop传递。例如，在JSX中：
```bash
<MyComponent foo={1 + 2 + 3 + 4} />
```
#### 对于`MyComponent`,得到`props.fo`的值将是10，因为表达式`1 + 2 + 3 + 4`已经运算。
#### `if`条件语句和`for`循环语句在JavaScript中不属于表达式，所以它们不能在JSX中直接使用。但是你可以把他们放在作用域中来代替，例如：
```bash
function NumberDescriber(props) {
  let description;
  if (props.number % 2 == 0) {
    description = <strong>even</strong>;
  } else {
    description = <i>odd</i>;
  }
  return <div>{props.number} is an {description} number</div>;
}
```
### 字符串常量
#### 你可以传一个字符串常量作为prop值，下面两种JSX表达式是相同的：
```bash
<MyComponent message="hello world" />

<MyComponent message={'hello world'} />
```
#### 当你传了一个字符串常量，它的值是HTML-unescaped（非转义）。这两种JSX的表达式是相同的。
```bash
<MyComponent message="&lt;3" />

<MyComponent message={'<3'} />
```
#### 这种写法通常是没有什么意义的。我们在这里只是为了完整性而提及的。
### Props的默认值是“True”
#### 如果你没有给prop传值，它默认的值是`true`.这两种JSX的表达式是相同：
```bash
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```
#### 通常，我们不建议这么使用，因为ES6的对象`{foo}`为`{foo:foo}`的简写而不是`{foo:true}`，很容易相互混淆。这写法仅仅是用来匹配HTML的行为。

### 展开属性
#### 如果你已经有了一个`props`对象，你想在JSX中传递，你可以使用`...`作为一个扩展的运算符传递整个props对象。这两种组件是相同的：
```bash
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```
#### 当你正在创建一个公共容器的时候展开属性会非常有用。然而，这种写法也会让你的代码更加凌乱，因为对于组件它更容易传递很多组件并不关心的props。所以我们建议你尽量减少这种语法的使用。
