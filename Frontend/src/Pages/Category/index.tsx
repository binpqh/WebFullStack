import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import ModalPopup from "./ModalCategory";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, deleteCategory, fetchListCategory, listCategorySelect, updateCategory } from "./categorySlice";
import { ICategoryResult } from "./../../Interfaces/ICategoryServices";
import { useAppSelector } from "../../app/hook";

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
  const dispatch = useDispatch<any>();
  const [categoryEdit, setcategoryEdit] = useState({});
  const [categories, setCategories] = useState<ICategoryResult[]>([]);
  const [isOpenModal, setisOpenModal] = useState(false);

  const getCategory = useSelector(listCategorySelect);

  useEffect(() => {
    dispatch(fetchListCategory());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await setCategories(getCategory);
    };
    fetchData();
    console.log("listcate : ", getCategory);
  }, [getCategory]);

  useEffect(() => {
    const fetchData = async () => {
      await setCategories(getCategory);
    };
    fetchData();
    console.log("listcate : ", getCategory);
  }, [getCategory]);
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
    console.log("chekc c?? id hon n??" + record.categoryId + record.categoryName);

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
        await dispatch(deleteCategory(record));
      },
    });
  };
  const handleFinish = async (id: number, values: any) => {
    const isEdit = categories.findIndex((item: any) => item.categoryId === id);
    if (isEdit >= 0) {
      const payload: ICategoryResult = {
        categoryId: id,
        categoryName: values.categoryName,
      };

      await dispatch(updateCategory(payload));
    } else {
      await dispatch(createCategory(values));
    }
    setisOpenModal(false);
  };
  return (
    <HeaderPageCategory>
      <Wrapper>
        <HeaderLeft>
          <h2>List Categories</h2>
        </HeaderLeft>

        <HeaderRight>
          <Wrapper>
            <Button onClick={showModal}>Create Category</Button>
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
