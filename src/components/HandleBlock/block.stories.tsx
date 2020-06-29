import React from "react";
import { storiesOf } from "@storybook/react";
import HandleBlock from "./index";
import { action } from "@storybook/addon-actions";
const handleBlock = () => (
  <div style={{height:'500px',width:'100%'}}>
  <HandleBlock
    blockInfo={{
      width: 200,
      height: 200,
      pointX: 300,
      pointY: 100,
    }}
    onChange={() => action("onCange")}
  />
  </div>
);

storiesOf("操作元素", module).add("操作元素的移动拉伸", handleBlock);
