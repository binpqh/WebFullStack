import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CreateCategory, DeteleCategory, GetAllCategory, UpdateCategory } from "../../Services/Category.Services";
import { ICategoryResult } from "./../../Interfaces/ICategoryServices";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Button, Modal, Table } from "antd";
import ModalPopup from "./CUCategory";

const HeaderPageCategory = styled.div`
  background-color: #f5f6fa;
  width: 100%;
  max-width: 70%;
  margin: 20px auto;
  display: "flex";
  flex-direction: "column";
  padding: 0;
  border-radius: 5px;
  box-shadow: 0 0 7px 0 #ccc;
  overflow: hidden;
`;

const Wrapper = styled.div`
  background-color: #435d7d;
  color: #fff;
  padding: 0px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const HeaderLeft = styled.div`
  padding-bottom: 4px;
  margin: 0;
  color: #fff;
  h2 {
    color: #fff;
    font-weight: 500;
    margin: 5px 0;
  }
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
`;

const Category = () => {
  const [categories, setCategories] = useState<ICategoryResult[]>([]);
  const [categoryEdit, setcategoryEdit] = useState({});
  const [isOpenModal, setisOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const results = await GetAllCategory();
      setCategories(results);
    };
    fetchData();
  }, []);

  const columns = [
    {
      key: "categoryId",
      title: "Id",
      dataIndex: "categoryId",
    },
    {
      key: "categoryName",
      title: "Category name",
      dataIndex: "categoryName",
    },
    {
      key: "action",
      title: "Action",
      render: (record: any) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                showModal(record);
              }}
            />
            <DeleteOutlined onClick={() => handleDeleteCategory(record)} style={{ color: "orange", marginLeft: 12 }} />
          </>
        );
      },
    },
  ];
  const showModal = (record: any) => {
    console.log("chekc có id hon nè" + record.categoryId + record.categoryName);

    setisOpenModal(true);
    setcategoryEdit(record);
  };
  const hideModal = () => {
    setisOpenModal(false);
  };
  const handleDeleteCategory = (record: any) => {
    Modal.confirm({
      title: "Are u sure?",
      okText: "Sure",
      okType: "danger",
      onOk: async () => {
        await console.log(record.categoryId);
        await DeteleCategory(record);
      },
    });
  };
  const handleFinish = async (id: number, values: any) => {
    const isEdit = categories.findIndex((item) => item.categoryId === id);

    if (isEdit >= 0) {
      await UpdateCategory({ categoryId: id, ...values })
        .then((res) => {
          const newlistCate = categories.map((item) => {
            if (item.categoryId === id) {
              item.categoryName = values.categoryName;
            }
            return item;
          });
          setCategories(newlistCate);
        })
        .catch((error) => {})
        .finally(() => {
          setisOpenModal(false);
        });
    } else {
      await CreateCategory(values);
      setisOpenModal(false);
    }
  };
  return (
    <HeaderPageCategory>
      <Wrapper>
        <HeaderLeft>
          <h2>List Categories</h2>
        </HeaderLeft>

        <HeaderRight>
          <Wrapper>
            <Button onClick={showModal}>Create Employee</Button>
            {isOpenModal && (
              <ModalPopup
                isCreate={isOpenModal}
                item={categoryEdit}
                title="edwq"
                onCancel={hideModal}
                onFinish={handleFinish}
              ></ModalPopup>
            )}
          </Wrapper>
        </HeaderRight>
      </Wrapper>

      <Table columns={columns} dataSource={categories} rowKey="categoryId" />
    </HeaderPageCategory>
  );
};

export default Category;
