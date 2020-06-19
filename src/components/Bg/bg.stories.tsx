import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import  Bg from './bg'
import Button from '../Button';
// import { addDecorator } from '@storybook/react';
// import {withInfo} from '@storybook/addon-info';



const defaultBg =()=>(
    <Bg 
    animationType="down" 
    type="start"
    style={{zIndex:1,height:'50vh',position:'relative'}}
    />
 )

 const startBg =()=>(
    <Bg 
    animationType="left" 
    type="start"
    style={{zIndex:1,height:'50vh',position:'relative'}}
    />
 )

 const downBg =()=>(
    <Bg 
    animationType="down" 
    type="start"
    style={{zIndex:1,height:'50vh',position:'relative'}}
    />
 )

storiesOf('Bg 背景',module)


.add('defaultBg',defaultBg)
.add('startSpace',startBg)
.add('downBg',downBg)
