import React, { FC, useRef, ChangeEvent, useState } from "react";
import axois from "axios";
import Button from "../Button";
import UploadList from './uploadList'
export type fileStatus = "ready" | "success" | "error" | "uploading";

export interface UploadFile {
  uid: string;
  name: string;
  size: number;
  status?: fileStatus;
  percent: number;
  raw: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string;
  defaultFileList?:UploadFile[];
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onChange?: (file: File) => void;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onRemove?:(file:UploadFile)=> void
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onChange,
    onProgress,
    onSuccess,
    onError,
    onRemove
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList||[]);

  const updateFileList = (
    updatefile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updatefile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };

  const removeFile = (file:UploadFile)=>{
    setFileList((prevList)=>
      prevList.filter(item=>item.uid!==file.uid)
    )
    if(onRemove)onRemove(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFiles(files);
    if (fileInput.current) fileInput.current.value = "";
  };

  const uploadFiles = (files: FileList) => {
    // files 是一个类数组 [...files] | Array.from(files)
    let postFile = Array.from(files);
    postFile.forEach((file) => {
      // 上传之前处理
      if (beforeUpload) {
        let result = beforeUpload(file);
        if (result === true) post(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        }
      }
    });
  };

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      raw: file,
      percent: 0,
    };
    setFileList([_file, ...fileList]);
    const formData = new FormData();
    formData.append(file.name, file);
    axois
      .post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          // 计算上传百分比
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: "uploading" });
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((resp) => {
        updateFileList(_file, {
          percent: 100,
          status: "success",
          response: resp.data,
        });
        if (onSuccess) onSuccess(resp.data, file);
        if (onChange) onChange(file);
      })
      .catch((err) => {
        updateFileList(_file, { percent: 100, status: "error", error: err });
        if (onError) onError(err, file);
        if (onChange) onChange(file);
      });
  };

  const handleUpload = () => {
    if (fileInput.current) {
      // 点击input
      fileInput.current.click();
    }
  };

  console.log(fileList, "fileList");

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
        style={{ display: "none" }}
      ></input>
      <UploadList
         fileList={fileList}
         onRemove={removeFile}
      />
    </div>
  );
};

Upload.defaultProps = {
  // name: 'file'
};
export default Upload;
