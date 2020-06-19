import React from "react";
import { configure,addDecorator,addParameters } from "@storybook/react";
import '../src/styles/index.scss';

import {withInfo} from '@storybook/addon-info';


// 配置全局的居中 addDecorator 中添加插件
const wrapperStyles: React.CSSProperties={
   padding:"20px 40px"
}
const CenterDecorator=(storyFn:any)=><div style={wrapperStyles}>
<h3>组件演示</h3>
{storyFn()}
</div>
addDecorator(CenterDecorator)
addDecorator(withInfo)
addParameters({
    info:{
        header:false,
        inline:true
    }
})

const loaderFn = () => {
    const allExports = [require('../src/welcome.stories.tsx')];
    const req = require.context('../src/components', true, /\.stories\.tsx$/);
    req.keys().forEach(fname => allExports.push(req(fname)));
    return allExports;
  };

// https://storybook.js.org/docs/basics/writing-stories/
//指定story的位置
// configure(require.context('../src',true,/\.stories\.tsx$/), module);

configure(loaderFn, module);

