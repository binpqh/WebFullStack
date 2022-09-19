<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import ModalPopup from "./ModalCategory";
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, deteleCategory, fetchListCategory, listCategorySelect, updateCategory } from "./categorySlice";
import { ICategoryResult } from './../../Interfaces/ICategoryServices';
import { useAppSelector } from "../../app/hook";
=======
<<<<<<< HEAD
import React,{useState,useEffect} from 'react';
import { CreateCategory, DeteleCategory, GetAllCategory, UpdateCategory } from '../../Services/Category.Services';
import { ICategoryResult } from './../../Interfaces/ICategoryServices';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';

import { Button, Modal, Table } from 'antd';
import ModalPopup from './ModelCategory';
>>>>>>> LyCRUDStore

const Category = () => {
  const dispatch = useDispatch<any>();
  const [categoryEdit, setcategoryEdit] = useState({});
  const [categories, setCategories] = useState<ICategoryResult[] | undefined>([]);
  const [isOpenModal, setisOpenModal] = useState(false);
  const getCategory = useAppSelector(listCategorySelect);
  useEffect(() => {
    //console.log(fetchListCategory);
   
    // hỏng api
    dispatch(fetchListCategory());
    setCategories(getCategory);
  },[]);
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
<<<<<<< HEAD
=======
        Modal.confirm(
            {
                title :"Are u sure?",
                okText :'Sure',
                okType : 'danger',
                onOk : async ()=>
                {
                    await console.log(record.categoryId);
                    await DeteleCategory(record);
                }
            })
    }
    const handleFinish = async(id:number,values : any) =>{
        const isEdit = categories.findIndex((item)=> item.categoryId === id)
        
         if(isEdit >= 0)
         {
            await UpdateCategory({categoryId: id,...values})
            .then((res) =>
            {
                const newlistCate = categories.map((item)=>
                {
                    if(item.categoryId === id)
                    {
                        item.categoryName = values.categoryName;
                    }
                    return item;
                })
                setCategories(newlistCate);
            }).catch((error)=>
            {
            }).finally(() => {
                setisOpenModal(false);
              });
         }
         else
         {
            await CreateCategory(values);
            setisOpenModal(false);
         }
     }
=======
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
>>>>>>> LyCRUDStore
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
<<<<<<< HEAD
    // const isEdit = categories.findIndex((item : any) => item.categoryId === id);

    // if (isEdit >= 0) {
    //   await dispatch(updateCategory(values));
    //   // await UpdateCategory({ categoryId: id, ...values })
    //   //   .then((res) => {
    //   //     const newlistCate = categories.map((item : any) => {
    //   //       if (item.categoryId === id) {
    //   //         item.categoryName = values.categoryName;
    //   //       }
    //   //       return item;
    //   //     });
    //   //     //setCategories(newlistCate);
    //   //   })
    //   //   .catch((error) => {})
    //   //   .finally(() => {
    //   //     setisOpenModal(false);
    //   //   });
    // } else {
    //   await dispatch(createCategory(values));
    // }
    // setisOpenModal(false);
  };
=======
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
>>>>>>> ef0839e (error createThunk call API)
>>>>>>> LyCRUDStore
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
