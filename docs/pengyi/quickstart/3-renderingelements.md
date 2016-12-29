## 渲染元素

---

`元素（Elements）`是构建React应用的最小单元。

一个元素来描述你希望屏幕上展现的UI元素：

```javascript
const element = <h1>Hello, world</h1>;
```

与DOM元素不同的是，React元素是普通的对象，创建简单。React DOM更加关注更新与React元素匹配的DOM树。

> Tips: 一个常见的误区是将元素与组件(Components)弄混淆。元素只是构成组件的零部件。

