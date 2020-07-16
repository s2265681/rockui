var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useState } from "react";
import axois from "axios";
import UploadList from "./uploadList";
import Dragger from "./dragger";
export var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, beforeUpload = props.beforeUpload, onChange = props.onChange, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onRemove = props.onRemove, headers = props.headers, data = props.data, name = props.name, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, drag = props.drag, children = props.children;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updatefile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updatefile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var removeFile = function (file) {
        setFileList(function (prevList) { return prevList.filter(function (item) { return item.uid !== file.uid; }); });
        if (onRemove)
            onRemove(file);
    };
    // input change get file
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files)
            return;
        uploadFiles(files);
        if (fileInput.current)
            fileInput.current.value = "";
    };
    // upload file
    var uploadFiles = function (files) {
        // files 是一个类数组 [...files] | Array.from(files)
        var postFile = Array.from(files);
        postFile.forEach(function (file) {
            // 上传之前处理
            if (beforeUpload) {
                var result = beforeUpload(file);
                if (result === true)
                    post(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
            }
        });
    };
    // upload api
    var post = function (file) {
        var _file = {
            uid: Date.now() + "upload-file",
            status: "ready",
            name: file.name,
            size: file.size,
            raw: file,
            percent: 0,
        };
        // 无法获取最新值
        //setFileList([_file, ...fileList])
        setFileList(function (prevList) {
            return __spreadArrays([_file], prevList);
        });
        var formData = new FormData();
        formData.append(name || "file", file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axois
            .post(action, formData, {
            headers: __assign(__assign({}, headers), { "Content-Type": "multipart/form-data" }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                // 计算上传百分比
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: "uploading" });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            },
        })
            .then(function (resp) {
            updateFileList(_file, {
                percent: 100,
                status: "success",
                response: resp.data,
            });
            if (onSuccess)
                onSuccess(resp.data, file);
            if (onChange)
                onChange(file);
        })
            .catch(function (err) {
            updateFileList(_file, { percent: 100, status: "error", error: err });
            if (onError)
                onError(err, file);
            if (onChange)
                onChange(file);
        });
    };
    // click upload btn or else element
    var handleUpload = function () {
        if (fileInput.current) {
            // 点击input
            fileInput.current.click();
        }
    };
    return (React.createElement("div", { className: "rock-upload-component" },
        React.createElement("div", { className: "rock-upload-input", style: { display: "inline-block" }, onClick: handleUpload },
            drag ? (React.createElement(Dragger, { onFile: function (files) {
                    uploadFiles(files);
                } }, children)) : (children),
            React.createElement("input", { type: "file", name: "myFile", ref: fileInput, onChange: handleFileChange, style: { display: "none" }, accept: accept, multiple: multiple })),
        React.createElement(UploadList, { fileList: fileList, onRemove: removeFile })));
};
Upload.defaultProps = {
    name: "file",
};
export default Upload;
