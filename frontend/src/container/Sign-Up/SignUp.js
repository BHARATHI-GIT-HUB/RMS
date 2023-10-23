import { AutoComplete, Button, Form, Input, Select, Space, Alert } from "antd";
import React, { useEffect, useState } from "react";
import { useRegister } from "../../hooks/useRegister";
import Loading from "../../components/Loading";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 0,
    },
    sm: {
      span: 0,
    },
  },
};

export const Register = () => {
  const [form] = Form.useForm();
  const [showdepartement, setshowdepartement] = useState(false);
  const { register, isLoading, responseMessage, error } = useRegister();

  const onFinish = async (values) => {
    await register(values, showdepartement);
  };

  const handleChange = (value) => {
    if (value === "department_admin") {
      setshowdepartement(true);
    } else {
      setshowdepartement(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          closable
          className="absolute top-10 right-10"
        />
      )}
      {responseMessage && (
        <Alert
          message="Success"
          description={responseMessage}
          type="success"
          showIcon
          closable
          className="absolute top-10 right-10"
        />
      )}
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        className="login-form p-6 sm:p-10 border-2 border-black-100 rounded-2xl block sm:min-w-[450px]"
        scrollToFirstError
      >
        <h1 className="font-extrabold text-2xl sm:text-3xl text-center  mb-3 sm:mb-5">
          REGISTER
        </h1>

        <Space wrap className="py-3 sm:py-5">
          <Select
            defaultValue="Employee"
            style={{
              width: 175,
            }}
            onChange={handleChange}
            options={[
              {
                value: "employee",
                label: "Employee",
              },
              {
                value: "department_admin",
                label: "Department Admin",
              },
            ]}
          />
        </Space>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              required: true,
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: false,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          className="py-1 block"
          hasFeedback
          rules={[
            {
              required: false,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("password do not match!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="Nickname"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: false,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          tooltip="What's your Number"
          rules={[
            {
              required: false,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {showdepartement ? (
          <Form.Item
            name="department_name"
            label="Department Name"
            rules={[
              {
                required: false,
                message: "Please input designation!",
              },
            ]}
          >
            <AutoComplete
              //   options={websiteOptions}
              //   onChange={onDesignationChange}
              placeholder="Department"
            >
              <Input />
            </AutoComplete>
          </Form.Item>
        ) : (
          <Form.Item
            name="designation"
            label="Designation"
            rules={[
              {
                required: false,
                message: "Please input designation!",
              },
            ]}
          >
            <AutoComplete placeholder="Designation">
              <Input />
            </AutoComplete>
          </Form.Item>
        )}

        <Form.Item {...tailFormItemLayout}>
          <Button
            htmlType="submit"
            type="primary"
            className="!bg-blue-400 w-full"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
