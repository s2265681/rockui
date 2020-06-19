import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import Icon from "./icon";

const MIcon =()=>(
  <>
        <Icon icon='coffee' theme="warning" size="2x"/>
        <Icon icon='coffee' theme="danger" size="3x"/>
        <Icon icon='arrow-down' theme="primary" size="4x"/>
        <Icon icon='arrow-up' theme="success" size="5x"/>
        <br/>
        <a href="https://fontawesome.com/icons?d=gallery&c=vehicles" target="_blank">查看更多Icon</a>
   </>
)


storiesOf('Icon 图标库',module)
.add('Icon',MIcon)
