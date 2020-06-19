import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Table from "./table";
import Button from '../Button';
import Animation from "../Animation"
// import { addDecorator } from '@storybook/react';
// import {withInfo} from '@storybook/addon-info';

const dataSource = [
  {
    id: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
    type: 1,
    description: "胡彦斌是西湖区湖底公园1号的",
    Pic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg',

  },
  {
    id: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
    type: 2,
    description: "胡彦祖是西湖区湖底公园1号的",
    Pic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg',

  },
  {
    id: "3",
    name: "王祖蓝",
    age: 22,
    address: "西湖区湖底公园1号",
    type: 3,
    description: "王祖蓝是西湖区湖底公园1号的",
    Pic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg',

  },
  {
    id: "4",
    name: "王祖蓝",
    age: 22,
    address: "西湖区湖底公园1号",
    type: 3,
    description: "王祖蓝是西湖区湖底公园1号的",    
    Pic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg',

  },
  {
    id: "5",
    name: "王祖蓝",
    age: 22,
    address: "西湖区湖底公园1号",
    type: 3,
    description: "王祖蓝是西湖区湖底公园1号的",
    Pic:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
  },
];

const dataSource2 = [
  {
    id: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
    type: 1,
    description: "胡彦斌是西湖区湖底公园1号的",
    Pic:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
  },
  {
    id: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
    type: 2,
    description: "胡彦祖是西湖区湖底公园1号的",
    Pic:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
  },
  {
    id: "3",
    name: "王祖蓝",
    age: 22,
    address: "西湖区湖底公园1号",
    type: 3,
    description: "王祖蓝是西湖区湖底公园1号的",
    Pic:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
  },
  {
    id: "4",
    name: "王祖蓝",
    age: 22,
    address: "西湖区湖底公园1号",
    type: 3,
    description: "王祖蓝是西湖区湖底公园1号的",
    Pic:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
  },
  {
    id: "5",
    name: "王祖蓝",
    age: 22,
    address: "西湖区湖底公园1号",
    type: 3,
    description: "王祖蓝是西湖区湖底公园1号的",
    Pic:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
  },
  {
    id: "6",
    name: "王祖蓝",
    age: 22,
    address: "西湖区湖底公园1号",
    type: 3,
    description: "王祖蓝是西湖区湖底公园1号的",
    Pic:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
  },
  {
    id: "7",
    name: "王祖蓝",
    age: 22,
    address: "西湖区湖底公园1号",
    type: 3,
    description: "王祖蓝是西湖区湖底公园1号的",
    Pic:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
  },
  {
    id: "8",
    name: "王祖蓝",
    age: 22,
    address: "西湖区湖底公园1号",
    type: 3,
    description: "王祖蓝是西湖区湖底公园1号的",
    Pic:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
  },
];

// columns1 正常
const columns1 = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
    width: 300,
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
  },
];

// columns2 排序
const columns2 = [
  { 
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: {
      compare: (a: { id: number }, b: { id: number }) => a.id - b.id,
    }
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  // {
  //   title:'图片',
  //   dataIndex:'Pic',
  //   key:'Pic',
  //   width:200,
  //   render:(t:string)=><img style={{width:150,height:150}} src={t} alt={t}></img>
  //  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
    sorter: {
      compare: (a: { age: number }, b: { age: number }) => a.age - b.age,
    },
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
    width: 300,
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
    render(t: number, r: any, i: any) {
      return (
        <span style={{ color: "#f00" }}>
          {t === 1 ? "蔬菜" : t === 2 ? "水果" : "主食"}
        </span>
      );
    },
  },
  {
    title: "操作",
      dataIndex: "wrok",
      render(t: number, r: any, i: any) {
        return (
          <Button btnType="primary" >删除</Button>
        );
    }
  }
];

// columns3 自定义render
const columns3 = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
    width: 300,
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
    render(t: number, r: any, i: any) {
      return (
        <span style={{ color: "#f00" }}>
          {t === 1 ? "蔬菜" : t === 2 ? "水果" : "主食"}
        </span>
      );
    }
  },
    {
    title: "操作",
    dataIndex: "wrok",
    render(t: number, r: any, i: any) {
      return (
        <Button btnType="primary" >删除</Button>
      );
  }
}
];

const easyTable1 = () => <Animation><Table dataSource={dataSource} columns={columns1} /></Animation> ;
const easyTable2 = () => (
  <Animation><Table dataSource={dataSource} columns={columns1} borderd /></Animation>
);
const easyTable3 = () => (
  <Animation>
  <Table
    dataSource={dataSource}
    columns={columns1}
    borderd
    isTheme={"sepia(.6)"}
  />
  </Animation>
);

const rowTypeTable1 = () => (
  <Animation>
  <Table
    dataSource={dataSource}
    columns={columns1}
    borderd
    isTheme={"sepia(.6)"}
    rowSelection={{
      type: "radio",
    }}
  />
  </Animation>
);

const rowTypeTable2 = () => (
  <Animation>
  <Table
    dataSource={dataSource}
    columns={columns1}
    borderd
    isTheme={"sepia(.6)"}
    rowSelection={{
      type: "radio",
      rowKey: "id",
      rowChoosed: true, // 点击行是否选中
      onChange: (selectedRowKeys: any) =>
        console.log(selectedRowKeys, "selectedRowKeys>>"),
    }}
  />
  </Animation>
);
const rowTypeTable3 = () => (
  <Animation>
  <Table
    dataSource={dataSource}
    columns={columns1}
    borderd
    isTheme={"sepia(.6)"}
    rowSelection={{
      type: "checkbox",
      rowKey: "id",
      onChange: (selectedRowKeys: any) =>
        console.log(selectedRowKeys, "selectedRowKeys>>"),
    }}
  />
  </Animation>
);

const rowTypeTable4 = () => (
  <Animation>
  <Table
    dataSource={dataSource}
    columns={columns1}
    borderd
    isTheme={"sepia(.6)"}
    rowSelection={{
      type: "checkbox",
      rowKey: "id",
      rowChoosed: true, // 点击行是否选中
      onChange: (selectedRowKeys: any) =>
        console.log(selectedRowKeys, "selectedRowKeys>>"),
    }}
  />
  </Animation>
);

const extendTable1 = () => (
  <Animation>
  <Table
    dataSource={dataSource}
    columns={columns1}
    borderd
    isTheme={"sepia(.6)"}
    expandable={{
      expandedRowRender: (record) => (
        <span style={{ color: "rgb(100, 155, 0)" }}>{record.description}</span>
      ),
      onExpand: (key) => console.log(key, "key1111"),
    }}
  />
  </Animation>
);

const extendTable3 = () => (
  <Animation>
  <Table
    dataSource={dataSource}
    columns={columns1}
    borderd
    isTheme={"sepia(.6)"}
    expandable={{
      expandedRowRender: (record) => (
        <span style={{ color: "rgb(100, 155, 0)" }}>{record.description}</span>
      ),
      onExpand: (key) => console.log(key, "key1111"),
      isSingExped:false
    }}
  />
  </Animation>
);

const extendTable2 = () => (
  <Animation>
  <Table
    dataSource={dataSource}
    columns={columns1}
    borderd
    isTheme={"sepia(.6)"}
    expandable={{
      expandedRowRender: (record) => (
        <span style={{ color: "rgb(100, 155, 0)" }}>{record.description}</span>
      ),
      onExpand: (key) => console.log(key, "key1111"),
      rowExpandable: (record) => record.name !== "王祖蓝",
    }}
  />
  </Animation>
);

const sortTable1 = () => (
  <Animation>
  <Table
    dataSource={dataSource}
    columns={columns2}
    borderd
    isTheme={"sepia(.6)"}
  />
  </Animation>
);

const renderTable1 = () => (
  <Animation>
  <Table
    dataSource={dataSource}
    columns={columns3}
    borderd
    isTheme={"sepia(.6)"}
  />
  </Animation>
);

const scrollTable1 = () => (
  <Animation>
  <Table
    dataSource={dataSource2}
    columns={columns3}
    borderd
    isTheme={"sepia(.6)"}
    scroll={{ y: 200 }}
  />
  </Animation>
);

const withLoadingTable = () => (
  <Animation>
  <Table
    dataSource={dataSource2}
    columns={columns3}
    borderd
    scroll={{ y: 200 }}
    loading
  />
  </Animation>
);


const dragTable = () => (
  <Animation>
  <Table
    dataSource={dataSource2}
    columns={columns2}
    borderd
    isDrag
  />
  </Animation>
);

const allTable = () => (
  <Animation>
  <Table
    dataSource={dataSource2}
    columns={columns2}
    borderd
    isTheme={"sepia(.6)"}
    scroll={{ y: 600 }}
    isDrag
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
  </Animation>
);
storiesOf("Table 表格", module)
  .add("简单Table", easyTable1)
  .add("带边框的Table", easyTable2)
  .add("带Loading的Table", withLoadingTable)
  .add("选择不同filter的Table", easyTable3)
  .add("带radio的Table", rowTypeTable1)
  .add("带radio的Table,点击行选中", rowTypeTable2)
  .add("带checkbox的Table", rowTypeTable3)
  .add("带checkbox的Table,点击行选中", rowTypeTable4)
  .add("带展开行的Table(单行展开)", extendTable1)
  .add("带展开行的Table（多行展开）", extendTable3)
  .add("带过滤条件的展开行Table", extendTable2)
  .add("带过排序的Table", sortTable1)
  .add("带过render操作的Table，类型转换，获取行数据", renderTable1)
  .add("可设置超出高度滚动的Table", scrollTable1)
  .add("可设置拖拽Table", dragTable)
  .add("所有功能展示Table", allTable);
