import { FC } from "react";
export declare type fileStatus = "ready" | "success" | "error" | "uploading";
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
    headers?: {
        [key: string]: any;
    };
    data?: {
        [key: string]: any;
    };
    name?: string;
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
}
export declare const Upload: FC<UploadProps>;
export default Upload;
