
##### state：
赋值不是this.state.id = '123'，而是`this.setState({id: '123'})`
因为API是：

    void setState(
		  function|object nextState,
		  [function callback]
	)
第二个方法会在设置完值后立即执行，当然也可以拿到新值。

    this.setState({content: 'abcd'},function(){
		console.log(this.state.content);
	})

在其他情况下，this.setState 是在 render 时， state 才会改变调用的。也就是说setState 是异步的。组件在还没有渲染之前， this.setState 还没有被调用。这么做的目的是为了提升性能，在批量执行 State 转变时让 DOM 渲染更快。
##### 输出组件的问题
1：声明的组件类名必须是大写。
因为： 规范。
组件的变量名必须大写，用于区分原生的Html标签和自定义组件。
2：添加组件属性，为了避免javascript的保留字。class属性需要写成className，for属性需要写成 htmlFor。
3：行内样式：有三处注意事项：驼峰式、引号、对象型。不是`style="margin-top: 10px;"`而是`style={{marginTop: '10px'}}`
因为: React 组件样式是一个对象，所以第一重大括号表示这是 JavaScript 语法，第二重大括号表示样式对象。
4：组件类只能包含一个顶层标签。不能在render()面

    return (
	    <div>1</div>
	    <p>2</p>
    );
而应该是：

    return (
	    <div>1</div>
    );
##### key
无论是循环，还是push到一个数组中，都需要唯一的key值来标识。否则会有warning。

    if(staffJob) {
            staffJob.forEach((e) => {
                newStaffJob.push(
                    <div className = "info-date" key={e.id + 'a'}>{this.getTime(e.begindate,'begin')} - {this.getTime(e.enddate,'end')}</div>
                )
                newStaffJob.push(
                    <ul key={e.id}>
                        <li><span className = "info-item">变动类型</span><span>{e.trnstype_showname}</span></li>
                        <li><span className = "info-item">组织</span><span>{e.org_id_showname}</span></li>
                       
                    </ul>
                )
            })
        }
刚开始我并没有给外层div给key，一直warning。所以我自己给第一个push进去的div拼了一个key。
##### 关于方法绑定 this
ES6中，如果需要用到this，手动在构造方法里面绑定。
`this.getInfo = this.getInfo.bind(this);`
含有参数的方法：`onClick={this.getInfo.bind(this,jj.staff_id,jj.name)}`
##### 组件之间传多个值
说一下传值吧。其实父组件还可以传多个值和方法作为属性给子组件。
比如说，父组件有两个方法 m1(){...},m2(params1,params2){...}，还有两个值 a,b需要传给子组件。其实不需要一个一个穿，把这四个作为一个对象传递。

    <Child parentProps={{a:this.state.a,b:this.state.b,m1:this.m1,m2:this.m2}} />

这样就简洁许多。子组件调用`this.props.parentProps.a`
##### setState尽量一次完成
![Alt text](./1482912134201.png)
##### 注释
在组件中作为属性的属性 使用`{/**/}`。属性或者其他代码块使用`/**/`或者`//`都行。