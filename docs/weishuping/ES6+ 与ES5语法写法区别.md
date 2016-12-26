#### React Native中ES6+ 与ES5语法写法区别
##### 1、模块
1.1.引用
ES5中使用require引入外部模块
ES6中使用import
1.2导出单个类

    //ES5
	var ES5 React.createClass({//类名一定要大写
	...
	});
	//使用module.exports给某个类给别的模块使用。
	module.exports = ES5;
	//ES6
	class ES6 extends Component { //类名一定要大写
	
	...
	};
	//使用export default ES6给别的模块使用。
	export default ES6
备注： 但是实际应用中（mwap），定义组件两者不一样，但是输出组件的方式可以灵活使用。像是通过路由访问的组件可以用ES5的写法，给不同模块使用可以用ES6的写法。
##### 2、组件
定义组件

    // 通过React.createClass来定义一个组件类

	var ES5 = React.createClass({
	     //输出组件
	     render: fuunction() {
	          return (
	          <View style={styles.container}>
	              ...//子组件
	          </View>
	);
	     },
	})
	//继承
	class ES6 extends Component {
	     render() {//开头花括号一定要和小括号隔一个空格，否则识别不出来
	         return (
	              <View />
	          ) ;
	     }
	}
定义组件方法
//ES5中，组件方法为 functionName： function(param1,...) {...}, 定义属性的标准写法。属性之间用逗号隔开，方法也是属性

```
var ES5 = React.createClass ({
     componentWillMount: function() {
     },
     render: function() {
    ...
     },
});
```

//ES6，组件方法为 functionName(param1,...) {...}方法之间没有用逗号隔开

```
class ES6 extends Component {
     componentWillMount: function() {
     }
     render() {
         return (
               ...
          );
     }
}
```

定义组件的属性类型和默认类型
ES5中，属性类型和默认属性分别通过propsType成员和getDefaultProps方法来实现。
需要对传入或赋值的数据进行类型规范，便于数据有效性检查。

    var ES5 = React.createClass({
     getDefaultProps: function() {
          return {
               name: 'xiaoming',
               year: 2014,
               label: 'wei',
          };
     },
      propTypes: {
          name: React.PropsTypes.string.isRequired,
          year: React.PropsTypes.number.isRequired,
          label: React.PropsTypes.string
     },
     render: function() {
          reture (
              <View />
          );
     },
	});
//ES6 属性类型和属性默认值属于类本身的静态属性，所以可以使用static成员来实现

    export default ES6 extends Component {
     static defaultProps = {
               name: 'xiaoming',
               year: 2014,
               label: 'wei',
     }; //分号，用class定义的类内部属性需要用分号
     static propTypes = {
        name: React.PropTypes.string.isRequired,
        year: React.PropTypes.number.isRequired,
        label: React.PropTypes.string.isRequired,

     };//分号
     render() {
          ...
     }
	}
	//或者
	ES6.propTypes={//属性校验器，表示改属性必须是bool，否则报错
	  title: React.PropTypes.bool,
	}
	ES6.defaultProps={title:'133'};//设置默认属性
2.4初始化组件的state

    //ES5
	var ES5 = React.createClass({
	     getInitState: function() {
	          return {
	              esVersion: `${this.props.name} V1.0`,
	               clickCounts: 0,
	          };
	     },
	});
	//ES6 第一中写法
	export default class ES6 extends Component {
	     state = {
          esVersion: `${this.props.name} V1.0`,
          clickCounts: 0
     }
	}
	//第二种写法
	export default class ES6 extends Component {
	     constructor(props) {
	          super(props);
	          this.state = {
	
	
	               esVersion: `${this.props.name} V1.0`,
	               clickCounts: 0
	          };
	     };
	};
##### 3、将方法作为回调函数/胖箭头函数
//ES5中，React.createClass 会把所有的方法bind一遍，这样可以提交到任意的地方作为回调函数，而this不会变化。但是官方逐步认为这反而是不标准的。

    var ES5Syntax = React.createClass({
    buttonClick: function(e) {
        // Here, 'this' refers to the component instance.
        this.setState({clickCounts: this.state.clickCounts + 1});
    },
    render: function() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.buttonClick}>
                    <Text>{this.props.label}</Text>
                </TouchableHighlight>
            </View>
        );
    },
	});
//ES6下，需要通过bind来绑定this引用，或者使用箭头函数（它会绑定当前scope的this引用）来调用

	//方法1: 在constructor手动绑定
	export default class ES6Syntax extends Component {
    constructor(props) {
        super(props);
        this.buttonClick = this.buttonClick.bind(this);
        this.state = {
            esVersion: `${this.props.name} v1.0`,
            clickCounts: 0,
        };
        // Operations usually carried out in componentWillMount go here
    };
    buttonClick(e) {
        this.setState({clickCounts: this.state.clickCounts + 1});
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    onPress={this.buttonClick}>
                    <Text>{this.props.label}</Text>
                </TouchableHighlight>
            </View>
        );
    }
	}
	// 方法2. 利用箭头函数自动绑定
	export default class ES6Syntax extends Component {
	    buttonClick = (e) => {
	        // Here, 'this' refers to the component instance.
	        this.setState({clickCounts: this.state.clickCounts + 1});
	        // this.state.clickCounts += 1; // state 必须用 this.setState() 修改
	    }; // 注意这里有分号
	    render() {
	        return (
	            <View style={styles.container}>
	                <TouchableHighlight
	                    onPress={this.buttonClick}>
	                    <Text>{this.props.label}</Text>
	                </TouchableHighlight>
	            </View>
	        );
	    }
	}
补充: 组件的属性:
一个js对象，对应于dom属性。
原生属性： 1、class 要写成 className。<a className="center"></a> 2、style 属性接受由css属性构成的js对象。对于jsx来说，第一重要是变量，第二重要是对象，所以要使用两个花括号。key值用驼峰命名法转化了，value值用引号括起来了。
新增属性： this.props.children 表示组件的所有子节点。