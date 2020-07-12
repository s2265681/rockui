import React, { FC, useRef, ChangeEvent, useState } from "react";
import axois from "axios";
import Button from "../Button";
export interface UploadProps {
  action:string;
  beforeUpload?:(file:File)=> boolean | Promise<File>;
  onChange?:(file:File)=>void;
  onProgress?:(percentage:number,file:File)=>void;
  onSuccess?:(data:any,file:File)=>void;
  onError?:(err:any,file:File)=>void;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    beforeUpload,
    onChange,
    onProgress,
    onSuccess,
    onError,
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if(!files)return
    uploadFiles(files)
    if(fileInput.current)fileInput.current.value = ""
    // if (files) {
    //   const uploadedFile = files[0];
    //   const formData = new FormData(); // 模拟表单数据，xhr，创建form的一些数据
    //   formData.append(uploadedFile.name, uploadedFile);
    //   axois.post("https://jsonplaceholder.typicode.com/posts", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    // }
  };

  const uploadFiles =(files:FileList)=>{
      // files 是一个类数组 [...files] | Array.from(files)
      let postFile = Array.from(files)
      postFile.forEach(file=>{
        // 上传之前处理
        if(beforeUpload){
          let result = beforeUpload(file)
          if(result === true)post(file)
          if(result && result instanceof Promise){
            result.then(processedFile=>{
              // console.log(processedFile,'processedFile>>');
              post(processedFile)
            })
          }
        }
      })
  }

  const post=(file:File)=>{
    const formData = new FormData()
    formData.append(file.name,file)
    axois.post(action,formData,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress:(e) =>{
      // 计算上传百分比
      let percentage  = Math.round((e.loaded * 100) / e.total) || 0;
      if(percentage < 100){
        if(onProgress) onProgress(percentage,file)
      }
    }
    }).then(resp => {
      console.log(resp,'resp');
      if(onSuccess)onSuccess(resp.data,file)
      if(onChange)onChange(file)
    }).catch(err=>{
      if(onError) onError(err,file)
      if(onChange)onChange(file)
    })
  }

  const handleUpload = () => {
    if(fileInput.current){
      console.log(fileInput.current,'fileInput.current');
       // 点击input
       fileInput.current.click()
    }
  };

  return (
    <div className="rock-upload-component">
      <Button btnType="primary" onClick={handleUpload}>
        Upload
      </Button>
      <input 
        type="file" 
        name="myFile" 
        ref={fileInput}
        onChange={handleFileChange}
        style={{display:'none'}}
        >
      </input>
    </div>
  );
};

Upload.defaultProps = {
  // name: 'file'
};
export default Upload;
