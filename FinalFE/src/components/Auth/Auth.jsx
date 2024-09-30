import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { login, register } from "../../../api/authApi";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { getUser } from "../../../api/userApi";

const Auth = (props) => {
  const navigate = useNavigate();

  const onFinishLogin = async (values) => {
    const req = await login(values.email, values.password);
    const token = req.data.token;
    const userId = req.data.id;
    console.log(userId);
    localStorage.setItem("token", token);
    const user = await getUser(userId);
    console.log(user.data.userName);
    localStorage.setItem("User", JSON.stringify(user.data));
    navigate("/home");
  };

  const onFinishRegister = async (values) => {
    const req = await register(values.userName, values.email, values.password);
    console.log("Registration successful");
    navigate("/login");
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
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

  return (
    <div>
      {props.signal == "1" && (
        <div className="login">
          <img src="./logo.jpg" alt="" />
          <h1>Welcome Back</h1>
          <p>Login to your account using email and password</p>
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 360 }}
            onFinish={onFinishLogin}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit" danger>
                Log in
              </Button>
              or{" "}
              <a
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register now
              </a>
            </Form.Item>
          </Form>
        </div>
      )}

      {props.signal == "2" && (
        <div className="register">
          <img src="./logo.jpg" alt="" />
          <h1>Create New Account</h1>
          <p>
            Set up your username, email and password. You always can change it
            later
          </p>
          <Form
            name="register"
            initialValues={{ remember: true }}
            style={{ maxWidth: 360 }}
            onFinish={onFinishRegister}
          >
            <Form.Item
              name="userName"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              hasFeedback
            >
              <Input.Password prefix="🔒" placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="confirm"
              placeholder="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password prefix="🔒" placeholder="Confirm Password" />
            </Form.Item>
            <Form.Item {...tailFormItemLayout} style={{ width: "150%" }}>
              <Button
                block
                type="primary"
                htmlType="submit"
                danger
                size="larger"
              >
                Register
              </Button>
            </Form.Item>
            <span>or </span>
            <a
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </a>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Auth;
