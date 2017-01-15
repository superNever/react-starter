### Uncontrolled Components
***
在大部分情况下,我们建议使用[controlled components](https://facebook.github.io/react/docs/forms.html)可通过事件控制的组件来操作`forms`。在可控制的组件中，form的数据是通过`React`组件来处理的。而另一种选择是通过不受控制的组件处理,表单数据的操作是由DOM本身完成的。
在书写`uncontrolled component`不可控制的组件时，你可以使用`ref`属性来从DOM元素中获取表单值，用来代替我们之前在每一次`state`状态更新时书写事件处理函数的方式。
例如下面这段代码，在`uncontrolled component`不可控制的组件中，我们通过这种方式接收一个name的值：
```bash
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
因为不可控制的组件在其DOM元素中保留着实际数据源，所以有时我们使用`uncontrolled component`将更加容易整合`React`和（非）`non-React`代码。如果你想要快速并且不顾质量的随意编写，这种方式到是会稍微缩减下代码量。否则，你应该在更多的时候选择`controlled components`。
如果你对于在特定的情况下该使用什么类型的组件还不够清楚，你可以参考这篇文章[可控制与不可控制的inputs](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)来解惑。
###默认值
在`React`的生命周期里，form元素中的`value`属性将会重写DOM元素的值。在`uncontrolled component`中，你通常需要`React`指定一个初始值，但是指定后不影响后续的更新。为了处理这种情况，你可以指定一个`defaultValue`属性来代替`value`属性。
```bash
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={(input) => this.input = input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```
同理，`<input type="checkbox">`和`<input type="radio">`是支持`defaultChecked`属性的，并且`<select>`也支持`defaultValue`。