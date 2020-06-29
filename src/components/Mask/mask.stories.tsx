import React from "react";
import { storiesOf } from "@storybook/react";
import Mask from "./index";
import { action } from "@storybook/addon-actions";

const handleMask = () => (
  <Mask
    visible
    onMouseUp={action('点击')}
  />
);

storiesOf("遮照", module).add("操作遮照", handleMask);
