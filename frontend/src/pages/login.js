import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space, Alert } from "antd";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const onFinish = async (values) => {
    const username = values.username;
    const password = values.password;

    const response = await fetch("http://localhost:8087/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.employee) {
      localStorage.setItem("token", data.token);

      if (data.employee.role === "EMPLOYEE") {
        window.location.href = "/employee";
      } else if (data.employee.role === "ADMIN") {
        window.location.href = "/department";
      }

      // if (data.employee.role === "ADMIN" || data.employee.role === "EMPLOYEE") {
      //   window.location.href = "/employee";
      // } else if (data.employee.role === "DEPARTMENT") {
      //   window.location.href = "/department";
      // }
    } else {
      setErrorMessage("Check username and password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {errorMessage && (
        <Alert
          message="Warning"
          description="This is a warning notice about copywriting."
          type="warning"
          showIcon
          closable
          className="absolute top-10 right-10"
        />
      )}
      <Form
        name="normal_login"
        className="login-form min-w-[350px] p-10 border-2 border-black-100 rounded-2xl"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
          className="mb-2"
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item className="mb-2">
          <a className="login-form-forgot flex justify-end text-[13px]" href="">
            Forgot password ?
          </a>
        </Form.Item>

        <Form.Item className="mb-0">
          <Button
            htmlType="submit"
            type="primary"
            className="!bg-blue-400 w-full"
          >
            Log in
          </Button>
          <a href="/register" className="flex justify-end mt-1">
            Register Now
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
