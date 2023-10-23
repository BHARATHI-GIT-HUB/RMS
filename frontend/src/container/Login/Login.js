import React, { useEffect, useState, useCallback } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space, Alert, Spin } from "antd";
import { useLogin } from "../../hooks/useLogin";

export const Login = () => {
  const { login, isloading, error } = useLogin();
  const onFinish = async (values) => {
    await login(values);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      {isloading && <Spin size="large" />}
      {error && (
        <Alert
          message="Warning"
          description={error}
          type="warning"
          showIcon
          closable
          className="absolute top-10 right-10"
        />
      )}
      <Form
        name="normal_login"
        className="login-form max-w-[250px] sm:min-w-[350px] p-5 py-9 sm:p-10 border-2 border-black-100 rounded-2xl mx-4 "
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
