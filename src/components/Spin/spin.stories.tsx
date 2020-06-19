import React from 'react';
import { storiesOf } from '@storybook/react';
import Spin from "./spin";

const defaultSpin =()=>(
    <Spin delay={1000} loading={true}/>
)

storiesOf('Spin 加载中',module)
.add('显示Loading',defaultSpin)
