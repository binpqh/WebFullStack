import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Input, Typography, Form, Button } from "antd";
import { useState } from "react";

import { WrapForm, FormFooter } from "../../../Components/StyleForm";
import { WrapButton } from "../../../Components/StyleButton";
import { WrapInput } from "../../../Components/StyleInput";

const Wrapper = styled.div`
  background-color: #57606f;
  width: 100%;
  max-width: 50%;
  margin: 20px auto;
  display: "flex";
  flex-direction: "column";
  padding: 0;
  border-radius: 5px;
  box-shadow: 0 0 7px 0 #ccc;
  overflow: hidden;
`;

const AddCategory = () => {
  const { Title } = Typography;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const handleCancel = () => {
    navigate("/category");
  };

  const onSubmit = (data: any) => {
    console.log("data: ", getValues("category-name"));
  };

  return (
    <Wrapper>
      <Title level={2} style={{ paddingTop: 15, color: "white" }}>
        Add Category
      </Title>

      <WrapForm>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Item key="formItemCategoryForm">
            <Typography.Paragraph
              style={{
                fontWeight: "bold",
                fontSize: 16,
                padding: 0,
                margin: 0,
                marginLeft: 5,
                textAlign: "left",
                color: "white",
              }}
            >
              Category Name
            </Typography.Paragraph>

            <WrapInput>
              <input
                style={{ margin: 0, padding: 5, paddingLeft: 8, marginTop: 3 }}
                type="text"
                {...register("category-name", {
                  required: "This field is required",
                })}
                placeholder="enter the category name"
              />
              <ErrorMessage errors={errors} name="category-name" />
            </WrapInput>
          </Form.Item>

          <FormFooter>
            <WrapButton>
              <Button onClick={handleCancel}>Cancel</Button>
            </WrapButton>
            <WrapButton isSuccess>
              <Button htmlType="submit">Create</Button>
            </WrapButton>
          </FormFooter>
        </form>
      </WrapForm>
    </Wrapper>
  );
};

export default AddCategory;
