


## Spider 组件



## 参数列表

属性 | 说明 | 类型| 是否必填 | 默认值 | 可选参数 
|-|-|-|-|-|-|
autoplay | 是否自动轮播 | | Boolean |  false |  true\|false | "true" 
deployTime | 延迟时间 |  Number | 否 | 1000  | "--" 
initIdx| 第几个开始 | Boolean |否  | true \| false | false 
height | 轮播图高度| Number | 否 | 300 | ""  


## 使用
```js
  <Spider   
      autoplay={false}
    >
      <img src="http://img3.imgtn.bdimg.com/it/u=1553709961,3652782060&fm=26&gp=0.jpg" alt="图一"/>
      <img src="http://img4.imgtn.bdimg.com/it/u=3471735586,1899139408&fm=26&gp=0.jpg" alt="图二"/>
      <img src="http://img2.imgtn.bdimg.com/it/u=1303806583,1572175195&fm=26&gp=0.jpg" alt="图三"/>
  </Spider>
  ```
