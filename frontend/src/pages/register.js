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
  Space,
} from "antd";
import React, { useState } from "react";

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

const Register = () => {
  const [form] = Form.useForm();
  const [showdepartement, setshowdepartement] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const name = values.nickname;
    const password = values.password;
    const email = values.email;
    const role = !showdepartement ? values.designation : values.department_name;

    const response = await fetch("http://localhost:3005/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.employee) {
      localStorage.setItem("token", data.token);
      console.log(data.employee);

      if (data.employee.role === "ADMIN" || data.employee.role === "EMPLOYEE") {
        window.location.href = "/employee";
      } else if (data.employee.role === "DEPARTMENT") {
        window.location.href = "/department";
      }
    } else {
      setErrorMessage("Check username and password");
    }
  };

  const handleChange = (value) => {
    if (value === "department_admin") {
      setshowdepartement(true);
    } else {
      setshowdepartement(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        className="login-form p-10 border-2 border-black-100 rounded-2xl"
        style={{
          maxWidth: 450,
          minWidth: 450,
          display: "block",
        }}
        scrollToFirstError
      >
        <h1 className="font-extrabold text-3xl text-center pb-5">REGISTER</h1>

        <Space wrap className="py-5">
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
            <AutoComplete
              //   options={websiteOptions}
              //   onChange={onDesignationChange}
              placeholder="Designation"
            >
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
export default Register;
