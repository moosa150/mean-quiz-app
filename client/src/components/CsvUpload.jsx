import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { sync as csvParseSync } from "csv-parse"; // Import CSV parsing library

const CsvUpload = ({ onUpload }) => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = (file) => {
    try {
      const data = file.originFileObj; // Access the uploaded file
      const parsedData = csvParseSync(data, { columns: true }); // Parse CSV data synchronously
      onUpload(parsedData); // Send parsed data to parent component
      message.success("CSV file uploaded successfully!");
    } catch (error) {
      console.error("Error parsing CSV:", error);
      message.error("Error uploading CSV file.");
    }
  };

  const handleChange = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1); // Limit to only one file
    setFileList(fileList);
  };

  return (
    <Upload
      fileList={fileList}
      onChange={handleChange}
      beforeUpload={(file) => {
        handleUpload(file);
        return false; // Prevent default upload behavior
      }}
    >
      <Button icon={<UploadOutlined />}>Upload CSV</Button>
    </Upload>
  );
};

export default CsvUpload;
