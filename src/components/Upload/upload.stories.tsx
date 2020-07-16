import React, { useEffect } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Upload } from "./upload";
import axios from "axios";
import Button from '../Button/button'
import Icon from "../Icon/icon";

// const defaultFileList: UploadFile[] = [
//   {
//     uid: "123",
//     size: 1234,
//     name: "hello.md",
//     status: "uploading",
//     percent: 30,
//   },
//   { uid: "122", size: 1234, name: "xyz.md", status: "success", percent: 30 },
//   { uid: "121", size: 1234, name: "eyiha.md", status: "error", percent: 30 },
// ];
// const checkFileSize = (file: File) => {
//   if (Math.round(file.size / 1024) > 50) {
//     alert('file too big')
//     return false;
//   }
//   return true;
// }
const filePromise = (file: File) => {
  const newFile = new File([file], "new_name.png", { type: file.type });
  return Promise.resolve(newFile);
};
const SimpleUpload = () => {
  // useEffect(()=>{
  //   axios.get('http://jsonplaceholder.typicode.com/users')
  //   .then(res=>{
  //     console.log(res,'res');
  //   })
  // })
  return (
    <Upload
      // action = "https://jsonplaceholder.typicode.com/posts"
      beforeUpload={filePromise}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action("changed")}
      onRemove={action("removed")}
      name="fileName"
      multiple
      // drag
      // defaultFileList={defaultFileList}
    >
      <Button>上传</Button>
    </Upload>
  );
};

const DragUpload = () => {
  return (
    <Upload
      // action = "https://jsonplaceholder.typicode.com/posts"
      beforeUpload={filePromise}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action("changed")}
      onRemove={action("removed")}
      name="fileName"
      multiple
      drag
      // defaultFileList={defaultFileList}
    >
      <Icon icon="upload" size="5x" theme="secondary" />
      <br />
      <p>Drag file over to upload</p>
    </Upload>
  );
};




storiesOf("Upload 上传组件", module).add("Upload", SimpleUpload);
storiesOf("拖拽上传", module).add("Upload", DragUpload);

