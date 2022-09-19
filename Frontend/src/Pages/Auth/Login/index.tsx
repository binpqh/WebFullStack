import styled from "styled-components";
import { useState, useEffect } from "react";
import { Modal, Form, Input, Typography } from "antd";
import LoginDataRequest from "../../../Interfaces/Auth/LoginDataRequest";

import { WrapForm, FormFooter } from "../../../Components/StyleForm";
import { WrapInput } from "../../../Components/StyleInput";
import { Card } from "../../../Components/Card";
import { Button } from "../../../Components/StyleButton";

const Title = styled.h1`
  color: #3d3d3d;
  font-weight: 700;
  padding-top: 14px;
  background-clip: text;
  -webkit-background-clip: text;
`;

const Login = () => {
  const [data, setData] = useState<LoginDataRequest>();

  const handleFinish = (user: LoginDataRequest) => {
    console.log(user);
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
