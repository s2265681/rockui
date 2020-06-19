import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import Alert from "./alert";

const MAlert =()=>(
  <div className="block alerts">
          <Alert type="success" message="Alert Success" />
          <Alert type="error" message="Alert Error" />
          <Alert type="info" message="Alert Info" />
          <Alert type="warning" message="Alert Warning" />
        </div>
)


storiesOf('Alert 提醒',module)
.add('MAlert',MAlert)
