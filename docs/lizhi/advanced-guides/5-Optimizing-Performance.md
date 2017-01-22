### 性能优化
***
正如我们所知，频繁的DOM操作是实际应用中消耗性能的主要因素，然而在`React`内部，设计者们使用了一些聪明的技巧，他们在更新UI时减少了DOM操作的数量。所以对于某些应用来说，使用`React`即便我们没有在性能优化上下功夫，我们也得到了较为流畅的用户界面。话虽如此，下面还是有一些方法能够使得你的React应用更加流畅。
### 使用生产模式打包
如果您正在进行基准测试或正在体会`React App`中的性能问题，请先确保您测试的是通过生产模式打包产出的文件，处理后文件将变小：
- 对于创建`React App`,你需要运行`npm run bulid`并且按照如下的指导配置。
- 对于单一文件的打包，我们提供生产产出的`.min.js`版本。
- 对于工具`Browserify`，你需要运行配置`NODE_ENV=production`。
- 对于`Webpack`工具，你需要把下面这段代码添加到你的生产配置中去：
```bash
new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
}),
new webpack.optimize.UglifyJsPlugin()
```
开发模式中的打包过程包含额外的警告信息，这对于打包校验`app`基本错误非常有用，但是由于这种额外的检验方式也会导致`App`的响应速度变慢。
### 通过`Chrome Timeline`分析组件性能
在开发模式中，你可以可视化组件的挂载，更新和卸载，使用浏览器支持的性能工具，例如：
![image](./img/react-perf-chrome-timeline.png)
在Chrome中这样操作：
1.使用`?react_perf`匹配需要查询的字符串来登录你的`app`（例如,`http://localhost:3000/?react_perf`）。
2.打开Chrome的开发工具切换tab页签到**Timeline**并且点击**Record**圆钮。
3.执行你想要分析的操作，但是请不要记录超过20秒否则Chrome可能会卡死。
4.停止记录。
5.react事件将会根据使用时间进行分组。
注意，这些数字与组件能否渲染的更快有关。尽管如此，这也会帮你意识到不相关的组件何时会被更新，你的UI发生更新时有多深入且频率有多高。目前虽然只有Chrome,Edge和IE浏览器支持此功能，但是我们可以使用标准`User Timing API`以便于我们期待日后能够有更多的浏览器来支持它。
### Avoid Reconciliation
React构建和维护用来渲染UI的内部表现。它包括你的组件返回的React元素。这种表现使React避免创建DOM节点，只访问一些存在的并且必要更新的节点，因为在JavaScript对象上做这些操作要更慢。一般我们称这些节点为“虚拟DOM”，但是它和在React原生上的工作原理是一样的。
当组件的`props`或者`state`状态改变时，通过对比新返回的元素和之前呈现的元素，React将决定更新一个实际的DOM更新是否是必要的。当对比出两者的不同时，React将更新DOM。
在某些情况下，你的组件可以通过重写生命周期函数`shouldComponentUpdate`使这些操作的速度有所提升，它将在重新开始渲染的过程前被触发。此函数默认返回值为'true',React渲染完成后时执行更新：
```bash
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
```
如果你知道有些情况下你的组件是不需要更新时，你可以通过`shouldComponentUpdate`函数返回`false`来代替，跳过整个渲染过程，包括此组件中调用的`render()`和下面的方法。
### shouldComponentUpdate的运行过程
下面是一张树状子树的描述图。对于每个点，`scu`指出了`shouldComponentUpdate`返回什么值，`vDOMEq`表明虚拟DOM与已渲染的React元素是否相同。最后，圆的颜色表明组件是否必须重新渲染。
![image](./img/should-component-update.png)
因为`shouldComponentUpdate`对于子树C2的根节点返回的值是`false`，所以React将不会尝试渲染C2，也不会再调用C4和C5上的`shouldComponentUpdate`。
至于C1和C3，`shouldComponentUpdate`返回的值为`true`，所以React必须要向下执行到子叶节点继续查看。对于节点C6`shouldComponentUpdate`返回的值为`true`，因为与已经渲染的元素不同所以React必须要更新DOM。
最后一个比较有趣的例子是C8。React必须要渲染这个组件，但是因为返回的React元素与之前渲染的相同，所以它们不需要更新DOM。
需要注意的是，React仅需要操作C6节点改变后必须要更新的DOM。C8节点则通过与已经渲染的节点对比避免更新，而对于从C2的子树节点和C7节点，我们甚至不需要去对比元素，因为我们已经通过属性`shouldComponentUpdate`避免了，并且我们也不需要再调用`render`。
### 示例
如果当`props.color`或`state.count`的值改变是你组件改变的唯一方法，你可以通过`shouldComponentUpdate`来校验它：
```bash
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```
在这段代码中，如果`props.color`或`state.count`的值变了`shouldComponentUpdate`才会被检测。如果这些值不会改变，那么组件将不会更新。如果组件变得更为复杂，你可以用类似的方式在`props`和`state`的所有字段之间做一个“浅比较”来确定组件是否应该更新。这是一个很常见的模式，React通过使用从`React.PureComponent`继承的逻辑来提供帮助。所以下面的这段代码是实现同样效果的一种简单方式：
```bash
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

