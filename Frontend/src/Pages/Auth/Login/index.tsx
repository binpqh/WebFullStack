import styled from "styled-components";
import { useState, useEffect } from "react";
import {  Form, Input, Typography } from "antd";
import LoginDataRequest from "../../../Interfaces/Auth/LoginDataRequest";

import { WrapForm } from "../../../Components/StyleForm";
//import { WrapInput } from "../../../Components/StyleInput";
import { Card } from "../../../Components/Card";
import { Button } from "../../../Components/StyleButton";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { isLogin, login } from "./AuthSlice/authSlice";

const Title = styled.h1`
  color: #3d3d3d;
  font-weight: 700;
  padding-top: 14px;
  background-clip: text;
  -webkit-background-clip: text;
`;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isLogin);
  const [data, setData] = useState<LoginDataRequest>();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  });

  const handleFinish = async (user: LoginDataRequest) => {
    console.log(user);
    try {
      await dispatch(
        login({
          username: user.uid,
          password: user.password,
        })
      )
    } catch (error: any) {
      console.log(error.desc);
    }
  };

  return (
    <Card>
      <Title>ACCOUNT LOGIN</Title>

      <Form name="user-login" initialValues={data} onFinish={handleFinish}>
        <WrapForm>
          <Typography.Paragraph
            style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10, textAlign: "left", marginLeft: 13 }}
          >
            UID
          </Typography.Paragraph>

          <Form.Item name="uid" rules={[{ required: true, message: "You must fill in this form!" }]}>
            <Input placeholder="enter the uid" type="text" />
          </Form.Item>

          <Typography.Paragraph
            style={{ fontWeight: "bold", marginBottom: 3, marginTop: -10, textAlign: "left", marginLeft: 13 }}
          >
            PASSWORD
          </Typography.Paragraph>
          <Form.Item name="password" rules={[{ required: true, message: "You must fill in this form!" }]}>
            <Input placeholder="enter the password" type="password" />
          </Form.Item>
          <Button background="#1B9CFC" hoverBackground="#25CCF7" type="submit">
            Login
          </Button>
        </WrapForm>
      </Form>
    </Card>
  );
};

export default Login;
