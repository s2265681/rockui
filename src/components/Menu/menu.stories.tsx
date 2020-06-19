import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import Menu from "./menu";
import MenuItem from "./menuItem"
import SubMenu from "./subMenu";

const RowMenus =()=>(
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
)

const ColumnMenus =()=>(
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
)

storiesOf('Menu 菜单',module)

.add('横向Menu',RowMenus)
.add('纵向Menu',ColumnMenus)
