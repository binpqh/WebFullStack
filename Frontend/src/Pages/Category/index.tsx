import React, { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import ModalPopup from "./ModalCategory";
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, deteleCategory, fetchListCategory, listCategorySelect, updateCategory } from "./categorySlice";

const Category = () => {
  const dispatch = useDispatch<any>();
  const categories = useSelector(listCategorySelect)
  const [categoryEdit, setcategoryEdit] = useState({});
  const [isOpenModal, setisOpenModal] = useState(false);
  useEffect(() => {
    // const fetchData = async () => {
    //   const results = await GetAllCategory();
    //   setCategories(results);
    // };
    // fetchData();
    dispatch(fetchListCategory())
  });
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
        await dispatch(deteleCategory(record))
      },
    });
  };
  const handleFinish = async (id: number, values: any) => {
    const isEdit = categories.findIndex((item : any) => item.categoryId === id);

    if (isEdit >= 0) {
      await dispatch(updateCategory(values));
      // await UpdateCategory({ categoryId: id, ...values })
      //   .then((res) => {
      //     const newlistCate = categories.map((item : any) => {
      //       if (item.categoryId === id) {
      //         item.categoryName = values.categoryName;
      //       }
      //       return item;
      //     });
      //     //setCategories(newlistCate);
      //   })
      //   .catch((error) => {})
      //   .finally(() => {
      //     setisOpenModal(false);
      //   });
    } else {
      await dispatch(createCategory(values));
    }
    setisOpenModal(false);
  };
  return (
    <>
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
      <Table columns={columns} dataSource={categories} rowKey="categoryId" />
    </>
  );
};

export default Category;
