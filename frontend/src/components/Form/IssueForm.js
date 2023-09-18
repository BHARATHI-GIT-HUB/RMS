import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
} from "antd";
import React, { useState } from "react";

import {
  useMutation,
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
const { Option } = Select;

const queryClient = new QueryClient();

export const IssueForm = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Register />
    </QueryClientProvider>
  );
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 10,
    },
    sm: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  // Ant Design's Upload component stores file information in 'file' property
  if (e && e.fileList) {
    return e.fileList;
  }
  return e;
};

const Register = () => {
  const [form] = Form.useForm();

  const postData = useMutation(
    (data) => {
      return axios.post(`http://localhost:8086/api/issues/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    {
      onSuccess: () => {
        console.log("posted");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  const onFinish = (values) => {
    postData.mutate(values);
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="title"
        label="Title"
        tooltip="What is your issue"
        className="text-start"
        rules={[
          {
            required: true,
            message: "Please input your issue!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="place"
        label="Place"
        rules={[
          {
            required: true,
            message: "Please input place of issue!",
          },
        ]}
      >
        <AutoComplete
          //   options={websiteOptions}
          //   onChange={onDesignationChange}
          placeholder="Place"
        >
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: "Please input Description!",
          },
        ]}
      >
        <AutoComplete
          //   options={websiteOptions}
          //   onChange={onDesignationChange}
          placeholder="Description"
        >
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        name="photo"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        {/* The "action" prop should point to your backend's file upload endpoint */}
        <Upload action="/api/upload" listType="picture-card" accept="image/*">
          <div>
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item label="Your Name" name="name">
        <Select>
          <Select.Option value="sri">Demo</Select.Option>
          <Select.Option value="kamal">Demo</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Department" name="department">
        <Select>
          <Select.Option value="electrical">Electrical</Select.Option>
          <Select.Option value="carpentery">Carpentery</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Status" name="status">
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        {...tailFormItemLayout}
        className="flex justify-start items-start"
      >
        <Button htmlType="submit" className="w-[250px]">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
