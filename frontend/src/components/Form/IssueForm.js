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
  Alert,
} from "antd";
import React, { useEffect, useState } from "react";

import { usePost } from "../../hooks/usePost";
import { useGet } from "../../hooks/useGet";

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

  if (e && e.fileList) {
    return e.fileList;
  }
  return e;
};

export const IssueForm = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState();
  const { postDataIssue, responseMessage, isloading, error } = usePost();

  const {
    getData,
    data: departmentData,
    isLoading: isDepartmentLoading,
    error: departmentError,
  } = useGet();
  const {
    getData: getEmpData,
    data: EmpData,
    isLoading: isEmpLoading,
    error: isEmpError,
  } = useGet();

  const onFinish = async (values) => {
    setFormData(values);
    values.employeeId = EmpData[0].id;
    await postDataIssue("http://localhost:8087/api/issues", values);
  };

  useEffect(() => {
    async function fetch() {
      const user = localStorage.getItem("user");
      const data = JSON.parse(user);
      await getData("http://localhost:8087/api/department");
      if (data) {
        await getEmpData(`http://localhost:8087/api/employee/${data.id}`);
      }
    }
    fetch();
  }, [0]);

  return (
    <div className="container w-full text-center">
      {responseMessage && (
        <Alert
          message="Success Message"
          discription={"Submitted Issue Successfully"}
          type="success"
          showIcon
          closable
          className="absolute top-10 right-10"
        />
      )}
      {error && (
        <Alert
          message="Error Message"
          discription={error}
          type="error"
          showIcon
          closable
          className="absolute top-10 right-10"
        />
      )}
      <h1 className="text-3xl sm:text-4xl font-semibold my-10">Issue Form</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        className="sm:max-w-[500px] mx-auto"
      >
        <Form.Item
          name="title"
          label="Title"
          tooltip="What is your issue"
          className=""
          rules={[
            {
              required: true,
              message: "Please input your issue!",
              whitespace: true,
            },
          ]}
        >
          <AutoComplete
            //   options={websiteOptions}
            //   onChange={onDesignationChange}
            placeholder="Title"
          >
            <Input />
          </AutoComplete>
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
          rules={[
            {
              required: true,
              message: "Please input Description!",
            },
          ]}
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

        <Form.Item label="Department" name="departmentId">
          <Select
            // !!fuck what they say
            options={
              departmentData.length > 0 &&
              departmentData[0].map((value) => ({
                value: value.id,
                label: value.department_name,
              }))
            }
          ></Select>
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select>
            <Select.Option value="Create Issue" />
          </Select>
        </Form.Item>

        <Form.Item
          {...tailFormItemLayout}
          className="flex justify-center items-center mt-10"
        >
          {/* <Primary text="Register" onClick={onFinish} /> */}
          <Button
            type="primary"
            htmlType="submit"
            className="px-5 sm:px-20 !bg-[#1677ff] !hover-bg-[#fff]"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
