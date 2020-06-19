import React from 'react';
import { storiesOf } from '@storybook/react';

storiesOf('Welcome page',module)

.add('welcome',()=>{
    return(
    <>
        <h1>欢迎来到rockui组件库</h1>
        <p>rockui是使用React hooks 和 typeScript 打造的react组件库</p>
        <p>npm地址： <a href="https://www.npmjs.com/package/rockui" target="_blank">链接</a></p>
        <p>
        <img width="400" src="https://img-blog.csdnimg.cn/202005272236562.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70"/>
        </p>
        <h3>安装试试</h3>
        <code>
            npm install rockui --save
        </code>
        <br/>
<code>
 使用:
 <br/>
{
`
import { Button } from "rockui"
`
}<br/>
{
    `
import "rockui/dist/index.css"
`
}<br/>
{
    `
<Button btnType="primary">Primary</Button>
`
}<br/>
</code>
</>
    )
},{ info:{ disabled:true }})