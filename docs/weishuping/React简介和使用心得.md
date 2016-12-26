### React
#### 起步：
因为网上许多文档都是用ES5语法写的，所以在此之前我整理了一下ES5语法和ES6语法的区别[enter link description here](https://app.yinxiang.com/shard/s64/nl/14192373/3d873692-af57-4ee0-97a6-a54a03958e5a?title=React%20Native%E4%B8%ADES6%2b%20%E4%B8%8EES5%E8%AF%AD%E6%B3%95%E5%8C%BA%E5%88%AB)，看了会多一点了解，把ES5改为ES6语法就方便许多。
##### ReactDOM.render()
ReactDOM.render是React的最基本方法，**用于将模板转为HTML语言，并插入指定的DOM节点**。

##### JSX语法
允许HTML与js混写，HTML语言不需要加任何引号。

    var names = ['A','B','C'];
    ReactDOM.render(
		<div>
		{
		names.map(function (name) {
			return <div>Hello,{name}!</div>
		})
		}
		</div>,
		document.getElementById('example')
	);
上面代码体现了JSX基本语法规则：遇到HTML标签`<`开头的就是用HTML规则解析；遇到代码块`{`开头，就用js规则解析。
##### 组件
React允许将代码封装成组件，然后像插入HTML标签一样，在网页中插入这个组件。
ES5中React.createClass方法就用于生成一个组件类。

	var HelloMessage = React.createClass({
	    render: function() {
		    return <h1>Hello {this.props.name}</h1>;}
	    });

    ReactDOM.render(
		<HelloMessage name="wei"/>,document.getElementById('example');
	);
变量HeLLoMessage就是一个组件类。模板插入`<HelloMessage/>`时，会自动生成HelloMessage的一个实例。所有组件类都必须有自己的`render`方法，用于输出组件。
**组件类的第一个字母必须大写，否则会报错； 另外，组件类只能包含一个顶层标签（可能是为了父元素的唯一性吧）**

**添加组件属性，有需要注意的地方，为了避免javascript的保留字。class属性需要写成className，for属性需要写成 htmlFor**
##### this.props.children
this.props 对象的属性与组件的属性一一对应。但是有一个例外，就是`this.porps.children`属性，它表示组件的所有子节点。

this.props.children的值有三种可能，如果当前没有子节点，那就是`undefined`,如果有一个值，就是`Object`,如果有多个那数据类型就是 `Array`
##### PropTypes
组件类的PropTypes属性就是用来验证组件实例的属性是否符合要求。

    var My = React.createClass({
		propTypes: {
			title: React.PropTypes.string.isRequired,
		},
		render: function() {
			return <h1>{this.props.title}</h1>;
		}
	})
	//
	var data = 123;
	ReactDOM.render(<My title={data}/>, document.body);
此外，`getDefaultProps`方法可以用来设置组件属性的默认值。

##### 获取真实的DOM节点
组件并不是真实的DOM节点，而是存在于内存之中的一种数据结构，叫做 虚拟DOM。只有当它插入文档之后，才会变成真实的DOM。
有时候需要获取真实DOM节点，就要用到`ref`属性。

    var MyComponent = React.createClass({
	handleClick: function() {
		return this.refs.focus();
	},
	render: function() {
		return (
			<div>
			<input type="text" ref="myTextInput"/>
			<input type="button" value="" onclick={this.handleClick}
			</div>
		);
	}
	});
	//
	ReactDOM.render(
		<MyComponent/>,
		document.body
	);
##### this.state
组件需要和用户互动啊，导致状态变化，从而触发重新渲染UI。你可以把他想象成 专属于react的全局变量。但是很特殊，它是一个异步过程。
	
    //在构造方法中初始 this.state = {
	    id: '1'
    }
    if(this.state.id) {
	    this.setState({id : '2'});
	    //console.log(this.state.id)//输出1
    }
 我理解的异步过程是，他不会立即改变值，但是如果这个属性已经经历到了 render()方法那一步，他的值一定会更新。在除render之外是异步的。
 还有如果有多个state需要同时赋值，好的做法是

    this.setState({
	    a1: '1',
	    a2: '2',
	    a3: '3'
    })
不好的做法是

    this.setState({a1: '1'});
    this.setState({a2: '2'});
    this.setState({a3: '3'})

因为这样会使页面刷新三次，并不是我们想要的。
##### props
一个js对象，对应于dom的属性
原生属性：`className` 、`style`
新增属性：this.props.children 表示组件的所有子节点。
传递属性值：
**设置默认属性**
在ES6中： `defaultProps`(可以标识static定义在class内，也可以定义在class外)。
属性的读取： `this.props['propName']`
**属性类型**： 属性校验器propTypes
##### 表单

    class Example extends Component {
		constructor(props) {
			super(props);
			this.state = {
				value: 'hello'
			}//定义的时候就是以对象的方式，所以注定它就是对象。赋值不能是纯粹的=，而是setState
			handleChange(e) {
				this.setState({value: e.target.value})
			}	
			render() {
				let value = this.state.value;
				return (
					<input type="text" value={value} onChange={this.handleChange} />
			        <p>{value}</p>
				);
			}	
			}
	}

表单输入框的值，只能通过回调函数中的 `event.target.value`读取用户输入的值。

##### 组件的生命周期
组件的生命周期分为三个状态：

```
Mounting：已插入真实 DOM
Updating：正在被重新渲染
Unmounting：已移出真实 DOM
```

 
每个状态有两种处理函数，will是进入状态之前调用，did是之后调用。

```
componentWillMount() 将要插入真实dom
componentDidMount() 已经插入真实dom
//前两个一般发生在当前页面没有改组件，需要加载组件
componentWillUpdate(object nextProps, object nextState)在要加载组件的props或者state发生变化前即更新之前调用。
componentDidUpdate(object prevProps, object prevState)在要加载组件的props或者state发生变化后已经更新之后调用。
//这俩个一般发生在页面已经有了该组件并且需要更新，，或者初次加载组件
componentWillUnmount()
//这货是发生在要移除该页面啦，一般要取消定时器啊什么的，释放资源和内存吧
```
举例：
父组件加载过程。
![Alt text](./img/1482713740711.png)

父组件更新过程，一般发生在state或者props发生改变。
![Alt text](./img/1482714001598.png)
子组件加载和更新过程

![Alt text](./img/1482714894967.png)

这个有三部分：第一部分是正常加载。第二部分是我在willComponent更改了state。第三部分呢是didComponent更改了state
此外，React 还提供两种特殊状态的处理函数。

    componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用（一般就是 别的组件（比如说 父组件）传给他的值发生了变化，这个方法就会被触发）
	shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用（这个没用过，以后再补上）
	

    //父组件中有个子组件
    
    Class 父组件...
    this.state ={
	    parentid: '1'
    }
    //比如这里有个方法是改变parentid的
    method() {
	    this.setState({parentid: '2'});
    }
    return (
    //之前说过，setState是异步的，但是他一定会走到这里来的。这里parentid 是2
	    <div>
		    <Child id={this.state.parentid} />
	    </div>
    )
    //子组件
    class Child...
    //这个子组件的 componentWillReceiveProps(object nextProps) 会被触发。
    通过nextProps.id 拿到传来的值。如果没有触发父组件的method方法，这时候拿到的是1，如果触发了method方法，那么就是2.
栗子：
![Alt text](./img/1482716271812.png)

说一下传值吧。
上述只是传了一个值，其实父组件还可以传多个值和方法作为属性给子组件。
比如说，父组件有两个方法 m1(){...},m2(params1,params2){...},还有两个值 a,b需要传给子组件。其实不需要一个一个穿，把这四个作为一个对象传递。

    <Child parentProps={{a:this.state.a,b:this.state.b,m1:this.m1,m2:this.m2}} />

这样就简洁许多。
子组件 componentWillReceiveProps(object nextProps)接受参数。通过`nextProps.parentProps.a`和`nextProps.parentProps.a`获取参数值。
至于传来的方法，在子组件任何地方都可以调用，我认为的调用就是给父组件传值（或者父组件获取子组件的值）。要不然子组件直接调用父组件不符合常理。
调用方式通过`this.props.parentProps.m1`
传父组件参数过去就是`this.props.parentProps.m2(当前页面选中的id,当前页面选中的name)`
网上的列子：

    //子组件
	var Child = React.createClass({
	    render: function(){
	        return (
	            <div>
	                请输入邮箱：<input onChange={this.props.handleEmail}/>
	            </div>
	        )
	    }
	});
	//父组件，此处通过event.target.value获取子组件的值
	var Parent = React.createClass({
	    getInitialState: function(){
	        return {
	            email: ''
	        }
	    },
	    handleEmail: function(event){
	        this.setState({email: event.target.value});
	    },
	    render: function(){
	        return (
	            <div>
	                <div>用户邮箱：{this.state.email}</div>
	                <Child name="email" handleEmail={this.handleEmail}/>
	            </div>
	        )
	    }
	});
	//如果子组件需要处理或者不直接在属性里面调用。那么
	//子组件，handleVal函数处理用户输入的字符，再传给父组件的handelEmail函数
	var Child = React.createClass({
	    handleVal: function() {
	        var val = this.refs.emailDom.value;
	        val = val.replace(/[^0-9|a-z|\@|\.]/ig,"");
	        this.props.handleEmail(val);//调用父组件并传值
	    },
	    render: function(){
	        return (
	            <div>
	                请输入邮箱：<input ref="emailDom" onChange={this.handleVal}/>
	            </div>
	        )
	    }
	});
##### style
因为react把对象看的很重要，一切即对象，所以定义的行内样式也是对象。

    style={{height: '100px'}}
##### ajax
组件的数据来源，通常是通过 Ajax 请求从服务器获取，可以使用`componentDidMount` 方法设置 Ajax 请求，等到请求成功，再用 this.setState 方法重新渲染 UI。
