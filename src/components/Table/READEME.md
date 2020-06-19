


## Table 组件


## 参数列表

属性 | 说明 | 类型| 是否必填 | 默认值 | 可选参数 
|-|-|-|-|-|-|
dataSource | 数据源 | | Array |  true |  -- | -- 
columns | 列内容 |  Array | true | --  | --
rowSelection| 设置行 | Object | 否  | {} | --
borderd | 设置table边框 | Boolean | 否 | -- | -- 
loading | 设置table Loading | Boolean | 否 | -- | -- 
isTheme | 设置table filter的属性 | string | 否 | -- | -- 
expandable| 设置行展开 | Object | 否  | {} | --
scroll| 设置超出高度滚动| Object | 否 | {x:300,y:300} | --



## 使用
```js
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
     sorter: {
      compare: (a: { id: number }, b: { id: number }) => a.id - b.id,
    },
    render:(t:string)=><img style={{width:150,height:150}} src={t} alt={t}></img>
  }]
const dataSource = [
  {
    id: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
    type: 1,
    description: "胡彦斌是西湖区湖底公园1号的",
    Pic:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
  }
]

  <Table
    dataSource={dataSource}
    columns={columns}
    borderd
    isTheme={"sepia(.6)"}
    scroll={{ y: 600 }}
    expandable={{
      expandedRowRender: (record) => (
        <span style={{ color: "rgb(100, 155, 0)" }}>{record.description}</span>
      ),
      onExpand: (key) => console.log(key, "key1111"),
      rowExpandable: (record) => record.name !== "王祖蓝",
    }}
    rowSelection={{
      type: "checkbox",
      rowKey: "id",
      rowChoosed: false, // 点击行是否选中
      onChange: (selectedRowKeys: any) =>
        console.log(selectedRowKeys, "selectedRowKeys>>"),
    }}
  />
  ```
