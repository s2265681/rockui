import React from 'react';
import { storiesOf } from '@storybook/react';
import Spider from "./spider";

const defaultSpider =()=>(
      <Spider>
          <img src="http://img3.imgtn.bdimg.com/it/u=1553709961,3652782060&fm=26&gp=0.jpg" alt="图一"/>
          <img src="http://img4.imgtn.bdimg.com/it/u=3471735586,1899139408&fm=26&gp=0.jpg" alt="图二"/>
          <img src="http://img2.imgtn.bdimg.com/it/u=1303806583,1572175195&fm=26&gp=0.jpg" alt="图三"/>
      </Spider>
)

const noSpider =()=>(
  <Spider   
      autoplay={false}
    >
      <img src="http://img3.imgtn.bdimg.com/it/u=1553709961,3652782060&fm=26&gp=0.jpg" alt="图一"/>
      <img src="http://img4.imgtn.bdimg.com/it/u=3471735586,1899139408&fm=26&gp=0.jpg" alt="图二"/>
      <img src="http://img2.imgtn.bdimg.com/it/u=1303806583,1572175195&fm=26&gp=0.jpg" alt="图三"/>
  </Spider>
)


const threeSpider =()=>(
  <Spider   
      autoplay={false}
      deployTime={3000}
    >
      <img src="http://img3.imgtn.bdimg.com/it/u=1553709961,3652782060&fm=26&gp=0.jpg" alt="图一"/>
      <img src="http://img4.imgtn.bdimg.com/it/u=3471735586,1899139408&fm=26&gp=0.jpg" alt="图二"/>
      <img src="http://img2.imgtn.bdimg.com/it/u=1303806583,1572175195&fm=26&gp=0.jpg" alt="图三"/>
  </Spider>
)


storiesOf('Spider 轮播图',module)
.add('自动播放',defaultSpider)
.add('手动滑动',noSpider)
.add('播放延迟时间3s',threeSpider)
