import React, { useEffect, useState, useCallback } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Space, Alert, Spin } from "antd";

import { usePost } from "../../hooks/usePost";

export const ForgetPassword = () => {
  const { postData, responseMessage, isLoading, error } = usePost();

  const onFinish = async (values) => {
    await postData("http://localhost:8087/forgetpassword", values);
  };

  if (error) {
    console.log(error);
  }

  if (responseMessage) {
    window.location.href = "/resetPassword";
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      {isLoading && <Spin size="large" />}
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
        <h1 className="text-center mb-6 text-2xl">Reset Password</h1>
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

        <Form.Item className="mb-0">
          <Button
            htmlType="submit"
            type="primary"
            className="!bg-blue-400 w-full"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export const ResetPassword = () => {
  const [successMessage, setSuccessMessage] = useState(null);

  const { postData, error, responseMessage, isLoading } = usePost();

  const onFinish = async (values) => {
    try {
      //   setIsLoading(true);
      // Make a POST request to reset the password
      await postData("http://localhost:8087/resetPassword/", values);

      // If the request is successful, set a success message
      setSuccessMessage("Password reset successful!");
    } catch (error) {
      // Handle errors here
      //   setError(
      //     error.message || "An error occurred while processing the request."
      //   );
    } finally {
      //   setIsLoading(false);
    }
  };

  if (responseMessage) {
    window.location.href = "/";
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
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
      {successMessage && (
        <Alert
          message="Success"
          description={successMessage}
          type="success"
          showIcon
          closable
          className="absolute top-10 right-10"
        />
      )}{" "}
      <Form
        name="reset_password"
        className="login-form max-w-[250px] sm:min-w-[350px] p-5 py-9 sm:p-10 border-2 border-black-100 rounded-2xl mx-4"
        onFinish={onFinish}
      >
        <h1 className="text-center mb-6 text-2xl">Reset Password</h1>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please enter your new Email.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please enter your new password.",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="otp"
          label="OTP"
          rules={[
            {
              required: true,
              message: "Please enter the OTP sent to your email.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item className="mb-0">
          <Button
            htmlType="submit"
            type="primary"
            loading={isLoading}
            className="!bg-blue-400 w-full"
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
