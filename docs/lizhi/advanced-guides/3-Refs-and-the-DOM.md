### Refs and the DOM
***
在React特有的数据流中，`props`是父组件影响子组件的唯一方式。你可以通过新的`props`使子组件重新渲染从而修改它。然而也有一些情况，我们需要不通过数据流来修改一个子组件。要修改的子组件可能是一个`React`组件也可能是一个`DOM`元素。对于这两种情况，`React`提供了解决方法。
### `ref`回调属性
`React`提供了一个特殊的属性，你可以把它放到一些组件当中。使用`ref`属性调用函数，函数将会在`mounted`装载和`unmounter`卸载后被立即执行。当`ref`属性在HTML元素中被使用时，属性回调将接收底层的DOM元素作为它的参数。例如：下面这段代码就使用了`ref`回调来存储一个DOM节点的引用：
```bash
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  focus() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in this.textInput.
    return (
      <div>
        <input
          type="text"
          ref={(input) => { this.textInput = input; }} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focus}
        />
      </div>
    );
  }
}
```
当组件装载时，`React`会将DOM元素作为参数调用`ref`属性的回调函数，当组件卸载的时候，`ref`属性的回调函数依然会被调用，而此时的参数为`null`。
仅仅是在`class`上设置一个属性去调用`ref`回调函数是使用`DOM`元素时的常见方式，如果你当前使用的是`this.refs.myRefName`这种方式来应用`refs`，我们建议您使用这种模式来替代。
当`ref`属性是被使用在一个自定义组件中时，`ref`回调函数将接收已装载组件的实例作为它的参数。例如，如果我们想把`CustomTextInput`封装起来，并在其上模拟组件装载后被点击时立即执行的效果，代码如下：
```bash
function CustomTextInput(props) {
  // textInput must be declared here so the ref callback can refer to it
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={(input) => { textInput = input; }} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );  
}
```
### 不要过度使用`Refs`
在你的应用中，你的第一反应也许是使用`refs`"让一些事情发生"。如果是这种情况，请你多花些时间并且认真的思考在组件的层级结构中哪里应该应用`state`。通常来讲，应用state最合适的地方显然是在它更高一级的层级结构中。想要了解与之有关的更多例子请看此节"[状态提升](https://facebook.github.io/react/docs/lifting-state-up.html)"。