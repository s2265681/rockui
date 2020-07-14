import React, { FC, useRef, useState } from "react";
import axois from "axios";
import Button from "../Button";
import UploadList from "./uploadList";
import Dragger from "./dragger";

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
  defaultFileList?: UploadFile[];
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onChange?: (file: File) => void;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onRemove?: (file: UploadFile) => void;
  headers?: { [key: string]: any };
  data?: { [key: string]: any };
  name?: string;
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  // children?: any;
  drag?: boolean;
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
    onRemove,
    headers,
    data,
    name,
    withCredentials,
    accept,
    multiple,
    drag,
    children,
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

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

  const removeFile = (file: UploadFile) => {
    setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
    if (onRemove) onRemove(file);
  };

  // input change get file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFiles(files);
    if (fileInput.current) fileInput.current.value = "";
  };

  // upload file
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

  // upload api
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      raw: file,
      percent: 0,
    };
    // 无法获取最新值
    //setFileList([_file, ...fileList])
    setFileList((prevList) => {
      return [_file, ...prevList];
    });
    const formData = new FormData();
    formData.append(name || "file", file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axois
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials, // 是否携带cooki，默认不携带
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

  // click upload btn or else element
  const handleUpload = () => {
    if (fileInput.current) {
      // 点击input
      fileInput.current.click();
    }
  };

  return (
    <div className="rock-upload-component">
      <div
        className="rock-upload-input"
        style={{ display: "inline-block" }}
        onClick={handleUpload}
      >
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files);
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
        <input
          type="file"
          name="myFile"
          ref={fileInput}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList fileList={fileList} onRemove={removeFile} />
    </div>
  );
};

Upload.defaultProps = {
  name: "file",
  // children: <span>Upload File</span>,
};
export default Upload;
