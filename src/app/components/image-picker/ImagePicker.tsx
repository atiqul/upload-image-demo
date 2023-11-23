import { CloudUploadOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";

const ImagePicker = ({ onChange }: ImagePickerProps): React.JSX.Element => {
  return (
    <div className="col-lg-8 offset-lg-2">
      <label className="py-6 px-5 cursor-pointer border-2 border-blue-700 bg-blue-500 w-5 text-center rounded-md">
        <CloudUploadOutlined className="text-2xl text-white" />
        <Input
          className="bg-transparent hidden"
          type="file"
          accept="image/*"
          placeholder="Select file to upload"
          onChange={(e) => e.target.files && onChange(e.target.files[0])}
        />
        <span className="text-white pl-2 align-top">Upload Image</span>
      </label>
    </div>
  );
};

export default ImagePicker;
