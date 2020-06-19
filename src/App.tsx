import React from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import Alert from "./components/Alert/alert";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import TabItem from "./components/Tabs/tabsItem";
import Tabs from "./components/Tabs/tabs";
import Icon from "./components/Icon/icon";
import Bg from "./components/Bg";
import Spider from "./components/Spider";
import Table from "./components/Table";
import Animation from "./components/Animation";
import Commission from "./components/Commission";

import "./index.css";
// import Spin from './components/Spin'

const dataSource = [
  {
    id: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
    type: 1,
    description: "胡彦斌是西湖区湖底公园1号的",
    Pic:
      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
  },
  {
    id: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
    type: 2,
    description: "胡彦祖是西湖区湖底公园1号的",
    Pic:
      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
  },
  {
    id: "3",
    name: "王祖蓝",
    age: 22,
    address: "西湖区湖底公园1号",
    type: 3,
    description: "王祖蓝是西湖区湖底公园1号的",
    Pic:
      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
  },
  {
    id: "4",
    name: "王祖蓝",
    age: 22,
    address: "西湖区湖底公园1号",
    type: 3,
    description: "王祖蓝是西湖区湖底公园1号的",
    Pic:
      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
  },
  {
    id: "5",
    name: "王祖蓝",
    age: 22,
    address: "西湖区湖底公园1号",
    type: 3,
    description: "王祖蓝是西湖区湖底公园1号的",
    Pic:
      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
  },
];

// columns
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    // width:100
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    // width:100
  },
  {
    title: "图片",
    dataIndex: "Pic",
    key: "Pic",
    // width:300,
    render: (t: string) => (
      <img style={{ width: 150, height: 150 }} src={t} alt={t}></img>
    ),
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
    width: 100,
    // sorter: {
    //   compare: (a: { age: number; }, b: { age: number; }) => a.age - b.age
    // }
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
    // width:300
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
    // width:100,
    render(t: number, r: any, i: any) {
      // console.log(t,r,i)
      return (
        <span style={{ color: "#f00" }}>
          {t === 1 ? "蔬菜" : t === 2 ? "水果" : "主食"}
        </span>
      );
    },
  },
];

const data1 = [
  {
    id: 1,
    title: "2020年",
    content: "工作总结",
    children: [
      {
        id: 2,
        title: "markdown语法测试",
        content: "# 一级标题  ## 二级标题  ### 三级标题",
      },
      {
        id: 3,
        title: "语法",
        content:
          "![图片](http://img0.imgtn.bdimg.com/it/u=2624811453,2350881067&fm=26&gp=0.jpg)",
      },
      {
        id: 4,
        title: "百度",
        content: "[百度]](http://www.baidu.com)",
      },
      {
        id: 6,
        title: "百度",
        content: (
          <div>
            <Button btnType="default">toggle Animate</Button>
          </div>
        ),
      },
      {
        id: 5,
        title: "表格",
        content:
          "name | 价格 |  数量  \r  -|-|-    \r 香蕉 | $1 | 5 |   \r 苹果 | $1 | 6 |   \r 草莓 | $1 | 7 |",
      },
    ],
  },
];

// name | 价格 |  数量
// -|-|-
// 香蕉 | $1 | 5 |
// 苹果 | $1 | 6 |
// 草莓 | $1 | 7 |

const App: React.FC = () => {
  // const [toggle, setToggle] = useState(true);
  // const [_newData, setNewDate] = useState(data1);

  // const planChange = (e: any, itemId: any, _newData: any) => {
  // setNewDate(_newData);
  // };

  return (
    <div className="App">
      <Table
        dataSource={dataSource}
        columns={columns}
        borderd
        // isTheme={"sepia(.6)"}
        scroll={{ y: 800 }}
        isDrag
      />
      {/**
     <Commission 
              dataSource={data1} 
              isHandle 
              theme="info"
              isEditable
          />
        

        // 主题色 theme "success" | "warning" | 'info' | 'danger'
        // dataSource [
            {dot:'第一个节点内容', id:'1', isDone:false},
            {dot:"第二个节点内容",id:"2",isDone:false},
            {dot:'我属于第一个节点',parentId:1, id:3 , isDone:true}
           ]
        // 
       
    */}
      {/*<div style={{display:'flex'}}>
          
          </div>

    <Menu
        defaultIndex={'0'}
        onSelect={(index) => console.log(index)}
        mode="vertical"
        defaultOpenSubMenus={['2']}
      >
        <MenuItem>项目1</MenuItem>
        <MenuItem disabled>项目2</MenuItem>
        <MenuItem>项目3</MenuItem>
        <SubMenu title="dropdown" >
          <MenuItem>dropdown1</MenuItem>
          <MenuItem>dropdown2</MenuItem>
          <MenuItem>dropdown3</MenuItem>
        </SubMenu>
      </Menu>

      
    <Menu defaultIndex={'0'} onSelect={(index) => console.log(index)}>
        <MenuItem>项目1</MenuItem>
        <MenuItem>项目2</MenuItem>
        <MenuItem disabled>项目3</MenuItem>
        <SubMenu title="dropdown">
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
            <MenuItem>dropdown3</MenuItem>
        </SubMenu>
      </Menu>


      
    <h2>选项卡组件</h2>
    <div className="block tab">
       <Tabs defaultIndex={0} onSelect={(index)=>console.log(index)}>
          <TabItem label="选项卡一">
            <p style={{width:300,height:300,background:'#f00'}}> 
                this is tab1
            </p>
          </TabItem>
          <TabItem label="选项卡二" disabled>
            <p style={{width:300,height:300,background:'#f00'}}> 
              this is tab2
            </p>
          </TabItem>
          <TabItem label="选项卡三">
            <p style={{width:300,height:300,background:'#f00'}}> 
                this is tab3
            </p>
          </TabItem>
       </Tabs>
    </div>


 
  */}

      {/* 

             
    <Animation 
      isShow={toggle} 
      name="fade" 
      delayTime="fast"
      intDir="left"
      outDir="bottom"
    >
      <div className="animate-demo" style={{color:'#f00'}}>
          我是div
      </div>
    </Animation>
    <Tabs defaultIndex={0} onSelect={(index) => console.log(index)}>
    <TabItem label="Button">
        <Button btnType="primary" size="lg">
            primary-btn
        </Button>
          <br />
          <br />
        <Button btnType="danger" size="lg">
            danger-btn
        </Button>
          <br />
          <br />
          <Button btnType="danger" size="lg">
          danger-btn
          </Button>
          <br />
        <br />
        <Button btnType="link" size="lg">
          link-btn
        </Button>
    </TabItem>
    <TabItem label="Alert">
          <Alert message="Alert Success" type="success"/>
          <Alert message="Alert Success" type="info"/>
          <Alert message="Alert Success" type="error"/>
    </TabItem>
    <TabItem label="Icon">
             <a href="https://fontawesome.com/icons?d=gallery" target="_blank">您可以使用这里面的icon</a>
             <br/>
             <br/>
            <Icon icon="coffee" theme="warning" size="2x" />
            <br />
            <br/>
            <Icon icon="angle-down" theme="info" size="2x" />
            <br />
            <br/>
            <Icon icon="bell-slash" theme="success" size="2x" />
            <br />
            <br/>
            <Icon icon="allergies" theme="danger" size="2x" />
            <br />
            <br/>
            <Icon icon="ambulance" theme="success" size="3x" />

    </TabItem>
  </Tabs>

   
        
      <header className="App-header">
        <h2>Button组件</h2>
        <div className="block buttons">
          <Button
            size={ButtonSize.Small}
            autoFocus
            onClick={(e) => {
              e.preventDefault();
              // alert("123");
            }}
            className="tok"
          >
            hello
          </Button>
        <Button btnType={ButtonType.Primary}>Primary</Button>
          <Button btnType={ButtonType.Dashed}>Dashed</Button>
          <Button btnType={ButtonType.Default} size={ButtonSize.Large}>
            Default
          </Button>
          <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>
            Danger
          </Button>
          <Button
            btnType={ButtonType.Link}
            href="http://www.baidu.com"
            target="_blank"
            size={ButtonSize.Large}
          >
            BaiduLink
          </Button>
          <Button btnType={ButtonType.Primary} disabled size={ButtonSize.Large}>
            BaiduLink
          </Button>
       
       
          </div>
        <h2>Alert组件</h2>
        <div className="block alerts">
          <Alert type={AlertType.Success} message="Alert Success" />
          <Alert type={AlertType.Error} message="Alert Error" />
          <Alert type={AlertType.Info} message="Alert Info" />
          <Alert type={AlertType.Warning} message="Alert Warning" />
        </div>
        <h2>Menu组件</h2>
        <div className="block menus">
          <Menu defaultIndex={'0'} onSelect={(index) => console.log(index)}>
            <MenuItem>项目1</MenuItem>
            <MenuItem>项目2</MenuItem>
            <MenuItem disabled>项目3</MenuItem>
            <SubMenu title="dropdown">
                <MenuItem>dropdown1</MenuItem>
                <MenuItem>dropdown2</MenuItem>
                <MenuItem>dropdown3</MenuItem>
            </SubMenu>
          </Menu>
          <Menu
            defaultIndex={'0'}
            onSelect={(index) => console.log(index)}
            mode="vertical"
            defaultOpenSubMenus={['2']}
          >
            <MenuItem>项目1</MenuItem>
            <MenuItem disabled>项目2</MenuItem>
            <MenuItem>项目3</MenuItem>
            <SubMenu title="dropdown" >
               <MenuItem>dropdown1</MenuItem>
               <MenuItem>dropdown2</MenuItem>
               <MenuItem>dropdown3</MenuItem>
            </SubMenu>
          </Menu>
        </div>
       
             <Bg animationType="left" type="start"/>
        <h2>Icon组件</h2>
        <Icon icon='coffee' theme="warning" size="2x"/>
        <Icon icon='coffee' theme="danger" size="3x"/>
        <Icon icon='arrow-down' theme="primary" size="4x"/>
        <Icon icon='arrow-up' theme="success" size="5x"/>
       
      </header>
          */}
    </div>
  );
};

export default App;
